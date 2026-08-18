"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Stack({ dict }: { dict: Dictionary["stack"] }) {
  const [active, setActive] = useState("all");

  const items = useMemo(
    () => (active === "all" ? dict.items : dict.items.filter((item) => item.category === active)),
    [active, dict.items]
  );

  return (
    <Section id="stack">
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} />
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 flex flex-wrap gap-2">
          {dict.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              aria-pressed={active === category.id}
              className={cn(
                "border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors",
                active === category.id
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-mist-500 hover:border-ink hover:text-ink"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 border-b border-r border-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal
            key={item.name}
            delay={Math.min(index, 8) * 40}
            className="border-l border-t border-line bg-paper"
          >
            <div className="flex h-full items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-display text-base uppercase tracking-tight">{item.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-mist-500">{item.description}</p>
              </div>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-mist-400">
                {dict.levels[item.level as keyof typeof dict.levels]}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
