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

// Isometric-style orbit: rotated ~40° around the level (azimuth) and tilted
// down ~33° (elevation), pulled back further than a straight top-down shot
// so the whole plane reads as a rotated diamond, like the reference map.
const AZIMUTH = 0.72;
const ELEVATION = 0.58;
const RADIUS = 11.5;
const OFFSET_X = Math.sin(AZIMUTH) * RADIUS * Math.cos(ELEVATION);
const OFFSET_Z = Math.cos(AZIMUTH) * RADIUS * Math.cos(ELEVATION);
const OFFSET_Y = RADIUS * Math.sin(ELEVATION);

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

    camera.position.set(OFFSET_X, OFFSET_Y, OFFSET_Z);
    camera.lookAt(0, 0, 0);
    invalidate();

    const totalDepth = (levelCount - 1) * LEVEL_GAP;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        const targetY = -self.progress * totalDepth;
        camera.position.set(OFFSET_X, targetY + OFFSET_Y, OFFSET_Z);
        camera.lookAt(0, targetY, 0);
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
