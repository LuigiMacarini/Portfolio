import { SOCIALS, RESUME_EMAIL } from "@/lib/socials";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DecryptText } from "@/components/ui/DecryptText";
import { Clock } from "@/components/layout/Clock";
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
    <Section as="footer" tone="ink" contentClassName="py-16 md:py-20">
      <div className="border-b border-paper/15 pb-16">
        <h2 className="font-display text-4xl font-medium uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          {dict.footer.ctaHeading.map((line, index) => (
            <DecryptText key={line} text={line} delay={index * 120} className="block" />
          ))}
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/60">{dict.footer.tagline}</p>
        <Button href="#contact" variant="signal" className="mt-8">
          {dict.footer.ctaButton}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-10 border-b border-paper/15 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
            {dict.footer.navHeading}
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {SECTION_KEYS.map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className="font-mono text-xs uppercase tracking-wide text-paper/70 hover:text-paper"
                >
                  {dict.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
            {dict.footer.networksHeading}
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {activeSocials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="font-mono text-xs uppercase tracking-wide text-paper/70 hover:text-paper"
                >
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume/curriculo-luigi.pdf"
                className="font-mono text-xs uppercase tracking-wide text-paper/70 hover:text-paper"
              >
                {dict.nav.resume}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${RESUME_EMAIL}`}
                className="break-all font-mono text-xs uppercase tracking-wide text-paper/70 hover:text-paper"
              >
                {RESUME_EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
            {dict.footer.systemHeading}
          </p>
          <ul className="mt-4 flex flex-col gap-2 font-mono text-xs uppercase tracking-wide text-paper/70">
            <li>NODE_001</li>
            <li>
              <StatusBadge label="ONLINE" />
            </li>
            <li>
              <Clock />
            </li>
            <li>{year}</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-8 font-mono text-[10px] uppercase tracking-wider text-paper/40 md:flex-row md:items-center md:justify-between">
        <p>{dict.footer.systemComplete}</p>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
          {dict.footer.statusStrip}
        </div>
        <p>
          © {year} Luigi Macarini. {dict.footer.rights}
        </p>
        <a href="#top" className="text-paper/60 hover:text-paper">
          {dict.footer.backToTop} ↑
        </a>
      </div>
    </Section>
  );
}
