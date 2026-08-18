interface GithubUser {
  public_repos: number;
  followers: number;
  html_url: string;
}

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  pushed_at: string;
}

export interface GithubStats {
  repos: number;
  followers: number;
  stars: number;
  languages: { name: string; percent: number }[];
  featured: { name: string; description: string | null; url: string; stars: number }[];
  profileUrl: string;
}

const GITHUB_API_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "luigi-portfolio",
};

// Uses the repo list endpoint's single primary `language` field, weighted by repo
// count, instead of the per repo languages endpoint (which would need one request
// per repo and risks the 60 req/hr unauthenticated rate limit).
export async function getGithubStats(username: string): Promise<GithubStats | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: GITHUB_API_HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
        headers: GITHUB_API_HEADERS,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as GithubUser;
    const repos = (await reposRes.json()) as GithubRepo[];
    const ownRepos = repos.filter((repo) => !repo.fork);

    const stars = ownRepos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);

    const languageCounts = new Map<string, number>();
    for (const repo of ownRepos) {
      if (!repo.language) continue;
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }
    const totalWithLanguage = Array.from(languageCounts.values()).reduce((a, b) => a + b, 0);
    const languages = Array.from(languageCounts.entries())
      .map(([name, count]) => ({
        name,
        percent: totalWithLanguage ? Math.round((count / totalWithLanguage) * 100) : 0,
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 5);

    const featured = [...ownRepos]
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      })
      .slice(0, 4)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
      }));

    return {
      repos: user.public_repos ?? ownRepos.length,
      followers: user.followers ?? 0,
      stars,
      languages,
      featured,
      profileUrl: user.html_url ?? `https://github.com/${username}`,
    };
  } catch {
    return null;
  }
}
