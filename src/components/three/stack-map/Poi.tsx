"use client";

import { useEffect, useRef, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Mesh } from "three";
import type { StackPoiData } from "./content";

export function Poi({
  item,
  position,
  active,
  onToggle,
  levelLabel,
  levelLabels,
}: {
  item: StackPoiData;
  position: [number, number, number];
  active: boolean;
  onToggle: (name: string | null) => void;
  levelLabel: string;
  levelLabels: Record<string, string>;
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const open = hovered || active;

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const target = open ? 1.7 : 1;
    const current = mesh.scale.x;
    mesh.scale.setScalar(current + (target - current) * 0.2);
  });

  function handlePointerOver(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  }

  function handlePointerOut(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  }

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    onToggle(active ? null : item.name);
  }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <octahedronGeometry args={[0.15, 0]} />
        <meshBasicMaterial color={open ? "#d7ff3e" : "#f7f7f3"} />
      </mesh>

      <Html distanceFactor={10} position={[0, 0.4, 0]} center occlude={false}>
        <div className="pointer-events-none select-none whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-paper/80">
          {item.name}
        </div>
      </Html>

      {open && (
        <Html distanceFactor={9} position={[0.4, 0.7, 0]} occlude={false}>
          <div className="pointer-events-none w-44 border border-paper/20 bg-ink/95 p-3">
            <p className="font-mono text-[11px] uppercase tracking-wide text-signal">{item.name}</p>
            <p className="mt-2 font-sans text-[11px] normal-case leading-relaxed text-paper/70">
              {item.description}
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-wide text-paper/40">
              {levelLabel}: {levelLabels[item.level] ?? item.level}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}
