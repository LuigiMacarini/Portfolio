import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Section } from "@/components/layout/Section";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <Section contentClassName="pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-mist-500">{dict.eyebrow}</p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {dict.kicker}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 break-words font-display text-4xl font-medium uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-7xl lg:text-6xl xl:text-8xl">
              {dict.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-md font-display text-xl text-mist-600">{dict.tagline}</p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-mist-600">{dict.bio}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#projects" variant="solid">
                {dict.ctaPrimary}
              </Button>
              <Button href="#contact" variant="outline">
                {dict.ctaSecondary}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-14 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
                {dict.principlesLabel}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {dict.principles.map((principle, index) => (
                  <li
                    key={principle}
                    className="flex items-start gap-2 font-mono text-xs text-mist-500"
                  >
                    <span className="text-signal">{String(index + 1).padStart(2, "0")}</span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pl-4">
          <Reveal delay={120}>
            <PhotoFrame label={dict.photoLabel} caption={dict.photoCaption} />
          </Reveal>
          <Reveal delay={200}>
            <dl className="mt-6 divide-y divide-line border border-line">
              {dict.panel.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
                    {row.label}
                  </dt>
                  <dd className="text-right font-mono text-[11px] uppercase tracking-wide text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
