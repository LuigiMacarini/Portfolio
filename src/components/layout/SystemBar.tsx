import Link from "next/link";
import { Clock } from "@/components/layout/Clock";
import { MobileNav } from "@/components/layout/MobileNav";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Dictionary, Locale } from "@/app/[locale]/dictionaries";

const SECTION_KEYS = [
  "about",
  "process",
  "experience",
  "projects",
  "stack",
  "github",
  "contact",
] as const;

export function SystemBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const navItems = SECTION_KEYS.map((key) => ({ href: `#${key}`, label: dict.nav[key] }));

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="font-display text-lg font-semibold uppercase tracking-tight">
          LM<span className="text-signal">_</span>
        </a>

        <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-wider lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-mist-500 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <StatusBadge label={dict.systemBar.status} className="text-mist-500" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-mist-400">
            <Clock />
          </span>
          <div className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
            <Link href="/pt" className={locale === "pt" ? "text-ink" : "text-mist-400 hover:text-ink"}>
              PT
            </Link>
            <span className="text-mist-300">/</span>
            <Link href="/en" className={locale === "en" ? "text-ink" : "text-mist-400 hover:text-ink"}>
              EN
            </Link>
          </div>
          <a
            href="#contact"
            className="border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
          >
            {dict.systemBar.cta}
          </a>
        </div>

        <MobileNav
          items={navItems}
          resumeHref="/resume/curriculo-luigi.pdf"
          resumeLabel={dict.nav.resume}
        />
      </div>
    </header>
  );
}
