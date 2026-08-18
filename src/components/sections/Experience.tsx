import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { Section } from "@/components/layout/Section";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Experience({ dict }: { dict: Dictionary["experience"] }) {
  return (
    <Section id="experience" tone="ink">
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} muted />
      </Reveal>

      <div className="mt-12 flex flex-col divide-y divide-paper/15 border-y border-paper/15">
        {dict.items.map((item, index) => (
          <Reveal key={item.company} delay={index * 80}>
            <article className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-paper/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-tight">
                  {item.company}
                </h3>
                <p className="mt-1 text-sm text-paper/70">{item.role}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-paper/40">
                  {item.location}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-wide text-paper/60">
                    {item.range}
                  </span>
                  <StatusBadge label={item.status} active={item.active} />
                </div>
              </div>

              <div className="lg:col-span-8">
                <ul className="flex flex-col gap-2">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-paper/70"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 bg-paper/40" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Tag key={tag} tone="ink">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
