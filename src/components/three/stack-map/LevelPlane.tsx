"use client";

import { useMemo } from "react";
import { Grid, Html, Line } from "@react-three/drei";
import { Poi } from "./Poi";
import type { StackLevel } from "./content";

const PLANE_WIDTH = 9;
const PLANE_DEPTH = 6;

function layoutPositions(count: number): [number, number][] {
  const cols = Math.max(1, Math.ceil(Math.sqrt(count)));
  const rows = Math.max(1, Math.ceil(count / cols));
  const positions: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jitterX = Math.sin(i * 12.9898) * 0.45;
    const jitterZ = Math.cos(i * 78.233) * 0.45;
    const x = (col - (cols - 1) / 2) * (PLANE_WIDTH / (cols + 0.6)) + jitterX;
    const z = (row - (rows - 1) / 2) * (PLANE_DEPTH / (rows + 0.6)) + jitterZ;
    positions.push([x, z]);
  }
  return positions;
}

export function LevelPlane({
  level,
  index,
  y,
  activePoi,
  onPoiToggle,
  levelLabel,
  levelLabels,
}: {
  level: StackLevel;
  index: number;
  y: number;
  activePoi: string | null;
  onPoiToggle: (name: string | null) => void;
  levelLabel: string;
  levelLabels: Record<string, string>;
}) {
  const positions = useMemo(() => layoutPositions(level.items.length), [level.items.length]);
  const halfX = PLANE_WIDTH / 2;
  const halfZ = PLANE_DEPTH / 2;

  const outline = useMemo(
    () =>
      [
        [-halfX, 0.01, -halfZ],
        [halfX, 0.01, -halfZ],
        [halfX, 0.01, halfZ],
        [-halfX, 0.01, halfZ],
        [-halfX, 0.01, -halfZ],
      ] as [number, number, number][],
    [halfX, halfZ]
  );

  return (
    <group position={[0, y, 0]}>
      <Grid
        args={[PLANE_WIDTH, PLANE_DEPTH]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#3a3a36"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#72726a"
        fadeDistance={22}
        fadeStrength={1}
        infiniteGrid={false}
      />

      <Line points={outline} color="#d7ff3e" lineWidth={1} />

      <Html position={[-halfX, 0.5, -halfZ]} distanceFactor={12} occlude={false}>
        <div className="pointer-events-none select-none whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-paper/70">
          {String(index + 1).padStart(2, "0")} · {level.label}
        </div>
      </Html>

      {level.items.map((item, i) => (
        <Poi
          key={item.name}
          item={item}
          position={[positions[i][0], 0, positions[i][1]]}
          active={activePoi === item.name}
          onToggle={onPoiToggle}
          levelLabel={levelLabel}
          levelLabels={levelLabels}
        />
      ))}
    </group>
  );
}
