"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { StackLevel } from "./content";

export function FallbackStack({
  levels,
  levelLabel,
  levelLabels,
  note,
}: {
  levels: StackLevel[];
  levelLabel: string;
  levelLabels: Record<string, string>;
  note: string;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="border-t border-paper/15">
      <p className="border-b border-paper/15 py-4 font-mono text-[10px] uppercase tracking-wider text-paper/40">
        {note}
      </p>
      {levels.map((level, index) => (
        <div key={level.id} className="border-b border-paper/15 py-6">
          <p className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 font-display text-xl uppercase tracking-tight">{level.label}</h3>
          <ul className="mt-4 flex flex-col gap-2">
            {level.items.map((item) => {
              const open = openItem === item.name;
              return (
                <li key={item.name} className="border border-paper/15">
                  <button
                    type="button"
                    onClick={() => setOpenItem(open ? null : item.name)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-paper/80"
                  >
                    <span>{item.name}</span>
                    <span className="text-paper/40">{open ? "−" : "+"}</span>
                  </button>
                  {open && (
                    <div className="border-t border-paper/15 px-4 py-3">
                      <p className="text-sm normal-case leading-relaxed text-paper/70">
                        {item.description}
                      </p>
                      <p className={cn("mt-2 font-mono text-[10px] uppercase tracking-wide text-paper/40")}>
                        {levelLabel}: {levelLabels[item.level] ?? item.level}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
