import { SOCIALS, RESUME_EMAIL } from "@/lib/socials";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const SECTION_KEYS = [
  "about",
  "process",
  "experience",
  "projects",
  "stack",
  "github",
  "contact",
] as const;

export function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();
  const activeSocials = SOCIALS.filter((social) => social.href);

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-6">
            <p className="max-w-lg font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
              {dict.footer.navHeading}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {SECTION_KEYS.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="font-mono text-xs uppercase tracking-wide text-mist-600 hover:text-ink"
                  >
                    {dict.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
              {dict.footer.networksHeading}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {activeSocials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="font-mono text-xs uppercase tracking-wide text-mist-600 hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
              {dict.footer.otherHeading}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href="/resume/curriculo-luigi.pdf"
                  className="font-mono text-xs uppercase tracking-wide text-mist-600 hover:text-ink"
                >
                  {dict.nav.resume}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${RESUME_EMAIL}`}
                  className="break-all font-mono text-xs uppercase tracking-wide text-mist-600 hover:text-ink"
                >
                  {RESUME_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-wider text-mist-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
            {dict.footer.statusStrip}
          </div>
          <p>
            © {year} Luigi Macarini. {dict.footer.rights}
          </p>
          <a href="#top" className="text-mist-500 hover:text-ink">
            {dict.footer.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
