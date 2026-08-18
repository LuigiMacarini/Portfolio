"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/layout/Section";
import { FallbackStack } from "./FallbackStack";
import { buildStackLevels } from "./content";
import type { Dictionary } from "@/app/[locale]/dictionaries";

const Scene = dynamic(() => import("./Scene").then((mod) => mod.Scene), { ssr: false });

const LEVEL_VH = 100;

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function StackMap({ dict }: { dict: Dictionary["stack"] }) {
  const levels = useMemo(() => buildStackLevels(dict), [dict]);
  const trackRef = useRef<HTMLDivElement>(null);

  const [capable, setCapable] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<"loading" | "online" | "active">("loading");
  const [activeLevel, setActiveLevel] = useState(0);
  const [activePoi, setActivePoi] = useState<string | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // WebGL/matchMedia only exist client-side, and the result must differ
    // from the server-rendered "loading" state to avoid a hydration
    // mismatch, so this can only be resolved from an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapable(hasWebGL() && !reducedMotion);
  }, []);

  useEffect(() => {
    if (phase !== "online") return;
    const timeout = window.setTimeout(() => setPhase("active"), 1100);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  const levelLabels = dict.levels;

  return (
    <Section id="stack" tone="ink" contentClassName="py-20 md:py-28">
      <Reveal>
        <SectionHeading eyebrow={dict.eyebrow} heading={dict.heading} muted />
      </Reveal>

      {capable === false && (
        <div className="mt-14">
          <FallbackStack
            levels={levels}
            levelLabel={dict.map.panelLevel}
            levelLabels={levelLabels}
            note={dict.map.fallbackNote}
          />
        </div>
      )}

      {capable === true && (
        <div ref={trackRef} className="relative mt-14" style={{ height: `${levels.length * LEVEL_VH}vh` }}>
          <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden border border-paper/15">
            <Scene
              levels={levels}
              trackRef={trackRef}
              onLevelChange={(index) => setActiveLevel(index)}
              activePoi={activePoi}
              onPoiToggle={setActivePoi}
              levelLabel={dict.map.panelLevel}
              levelLabels={levelLabels}
              onMounted={() => setPhase((current) => (current === "loading" ? "online" : current))}
            />

            <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-wider text-paper/60">
              {phase === "loading" && dict.map.loading}
              {phase === "online" && dict.map.online}
              {phase === "active" && (
                <div>
                  <p className="text-paper/40">{dict.map.progressLabel}</p>
                  <p className="mt-1 text-sm text-paper">
                    {String(activeLevel + 1).padStart(2, "0")} / {String(levels.length).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-signal">{levels[activeLevel]?.label}</p>
                  <ul className="mt-3 flex flex-col gap-1">
                    {levels.map((level, index) => (
                      <li key={level.id} className="flex items-center gap-2">
                        <span
                          className={index === activeLevel ? "h-1.5 w-1.5 bg-signal" : "h-1.5 w-1.5 bg-paper/20"}
                          aria-hidden
                        />
                        {level.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
