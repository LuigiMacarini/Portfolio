import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { getGithubStats } from "@/lib/github";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export async function GithubPanel({ dict }: { dict: Dictionary["github"] }) {
  const stats = await getGithubStats(dict.username);
  const profileUrl = stats?.profileUrl ?? `https://github.com/${dict.username}`;

  return (
    <Section id="github" tone="ink">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} muted />
        </Reveal>
        <Reveal delay={80}>
          <Button href={profileUrl} target="_blank" rel="noreferrer noopener" variant="signal">
            {dict.viewProfile}
          </Button>
        </Reveal>
      </div>

      {!stats ? (
        <Reveal delay={120}>
          <p className="mt-10 max-w-md font-mono text-xs uppercase tracking-wide text-paper/50">
            {dict.unavailable}
          </p>
        </Reveal>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal delay={100} className="lg:col-span-4">
            <dl className="grid grid-cols-3 divide-x divide-paper/15 border border-paper/15 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
              <div className="px-4 py-5 text-center lg:text-left">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
                  {dict.stats.repos}
                </dt>
                <dd className="mt-2 font-display text-3xl">{stats.repos}</dd>
              </div>
              <div className="px-4 py-5 text-center lg:text-left">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
                  {dict.stats.followers}
                </dt>
                <dd className="mt-2 font-display text-3xl">{stats.followers}</dd>
              </div>
              <div className="px-4 py-5 text-center lg:text-left">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
                  {dict.stats.stars}
                </dt>
                <dd className="mt-2 font-display text-3xl">{stats.stars}</dd>
              </div>
            </dl>

            {stats.languages.length > 0 && (
              <div className="mt-6 border border-paper/15 p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
                  {dict.languagesLabel}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {stats.languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-paper/70">
                        <span>{lang.name}</span>
                        <span>{lang.percent}%</span>
                      </div>
                      <div className="mt-1.5 h-1 w-full bg-paper/10">
                        <div className="h-1 bg-signal" style={{ width: `${lang.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={160} className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
              {dict.featuredLabel}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2">
              {stats.featured.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-col gap-2 bg-ink p-5 transition-colors hover:bg-paper/5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-base uppercase tracking-tight">
                      {repo.name}
                    </span>
                    <span className="inline-block shrink-0 bg-signal px-1 py-0.5 font-mono text-[10px] text-signal-ink">
                      ★ {repo.stars}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-xs leading-relaxed text-paper/50">{repo.description}</p>
                  )}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      )}

      <Reveal delay={200}>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-wider text-paper/30">
          {dict.note}
        </p>
      </Reveal>
    </Section>
  );
}
