import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { Section } from "@/components/layout/Section";
import type { Dictionary } from "@/app/[locale]/dictionaries";

function namesFor(items: Dictionary["stack"]["items"], categories: string[]) {
  return items.filter((item) => categories.includes(item.category)).map((item) => item.name.toUpperCase());
}

export function Stack({ dict }: { dict: Dictionary["stack"] }) {
  const row1 = namesFor(dict.items, ["frontend"]);
  const row2 = namesFor(dict.items, ["backend", "database"]);
  const row3 = namesFor(dict.items, ["tools", "ai"]);

  return (
    <Section id="stack" tone="ink">
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} muted />
      </Reveal>

      <div className="mt-14 flex flex-col gap-6 border-y border-paper/15 py-6 sm:gap-8 sm:py-8">
        <Marquee items={row1} direction="right" duration={34} />
        <Marquee items={row2} direction="left" duration={26} />
        <Marquee items={row3} direction="right" duration={30} />
      </div>
    </Section>
  );
}
