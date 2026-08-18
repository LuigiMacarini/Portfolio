"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LevelPlane } from "./LevelPlane";
import type { StackLevel } from "./content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LEVEL_GAP = 7;
const START_Y = 3.4;
const START_Z = 6.4;

function CameraRig({
  trackRef,
  levelCount,
  onLevelChange,
}: {
  trackRef: RefObject<HTMLDivElement | null>;
  levelCount: number;
  onLevelChange: (index: number) => void;
}) {
  const { camera, invalidate } = useThree();
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    camera.position.set(0, START_Y, START_Z);
    camera.rotation.set(-0.4, 0, 0);
    invalidate();

    const totalDepth = (levelCount - 1) * LEVEL_GAP;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        camera.position.y = START_Y - self.progress * totalDepth;
        camera.position.z = START_Z - self.progress * 1.6;
        camera.rotation.x = -0.4 - self.progress * 0.05;
        invalidate();

        const index = Math.min(levelCount - 1, Math.round(self.progress * (levelCount - 1)));
        if (index !== activeIndexRef.current) {
          activeIndexRef.current = index;
          onLevelChange(index);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [camera, invalidate, levelCount, onLevelChange, trackRef]);

  return null;
}

export function Scene({
  levels,
  trackRef,
  onLevelChange,
  activePoi,
  onPoiToggle,
  levelLabel,
  levelLabels,
  onMounted,
}: {
  levels: StackLevel[];
  trackRef: RefObject<HTMLDivElement | null>;
  onLevelChange: (index: number) => void;
  activePoi: string | null;
  onPoiToggle: (name: string | null) => void;
  levelLabel: string;
  levelLabels: Record<string, string>;
  onMounted?: () => void;
}) {
  useEffect(() => {
    onMounted?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => onPoiToggle(null)}
    >
      <ambientLight intensity={1.3} />
      <CameraRig trackRef={trackRef} levelCount={levels.length} onLevelChange={onLevelChange} />
      {levels.map((level, index) => (
        <LevelPlane
          key={level.id}
          level={level}
          index={index}
          y={-index * LEVEL_GAP}
          activePoi={activePoi}
          onPoiToggle={onPoiToggle}
          levelLabel={levelLabel}
          levelLabels={levelLabels}
        />
      ))}
    </Canvas>
  );
}
