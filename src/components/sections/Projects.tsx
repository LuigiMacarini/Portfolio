import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Projects({ dict }: { dict: Dictionary["projects"] }) {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
        {dict.items.map((project, index) => (
          <Reveal key={project.name} delay={index * 70} className="bg-paper">
            <article className="flex h-full flex-col p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-mist-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-2xl uppercase tracking-tight">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-mist-600">{project.subtitle}</p>
                </div>
                <StatusBadge label={project.status} active={project.active} className="shrink-0" />
              </div>

              <dl className="mt-6 flex flex-col gap-4">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
                    {dict.labels.problem}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-mist-600">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
                    {dict.labels.solution}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-mist-600">{project.solution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-mist-400">
                    {dict.labels.challenge}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-mist-600">{project.challenge}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                {project.links.github ? (
                  <Button href={project.links.github} target="_blank" rel="noreferrer noopener">
                    {dict.labels.github}
                  </Button>
                ) : null}
                {project.links.live ? (
                  <Button href={project.links.live} target="_blank" rel="noreferrer noopener" variant="solid">
                    {dict.labels.live}
                  </Button>
                ) : (
                  <span className="inline-flex items-center border border-dashed border-line px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-mist-400">
                    {dict.labels.soon}
                  </span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
