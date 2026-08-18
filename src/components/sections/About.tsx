import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/layout/Section";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal delay={80} className="lg:col-span-6">
          <p className="max-w-lg text-base leading-relaxed text-mist-600">{dict.body}</p>

          <div className="mt-10 border border-line p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
              {dict.education.label}
            </p>
            <p className="mt-2 font-display text-lg">{dict.education.degree}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-mist-500">
              {dict.education.school}
            </p>
            <p className="mt-1 inline-block bg-signal px-1.5 py-0.5 font-mono text-xs uppercase tracking-wide text-signal-ink">
              {dict.education.range}
            </p>
          </div>

          <div className="mt-4 border border-line p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
              {dict.certifications.label}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {dict.certifications.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs uppercase tracking-wide text-mist-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-1 divide-y divide-line border border-line">
            {dict.differentiators.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="p-6">
                  <span className="inline-block bg-signal px-1 py-0.5 font-mono text-xs text-signal-ink">
                    {item.index}
                  </span>
                  <h3 className="mt-3 font-display text-xl uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
