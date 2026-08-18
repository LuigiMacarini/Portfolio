import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/layout/Section";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Process({ dict }: { dict: Dictionary["process"] }) {
  return (
    <Section id="process">
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} />
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-6 max-w-md text-sm text-mist-600">{dict.intro}</p>
      </Reveal>

      <ol className="mt-14 border-l border-line pl-8 md:pl-12">
        {dict.steps.map((step, index) => (
          <Reveal key={step.index} delay={index * 50}>
            <li className="pb-10 last:pb-0">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="inline-block bg-signal px-1 py-0.5 font-mono text-xs text-signal-ink">
                  {step.index}
                </span>
                <h3 className="font-display text-xl uppercase tracking-tight sm:text-2xl">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-mist-600">
                {step.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
