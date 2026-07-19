"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, type ReactNode } from "react";
import type { Group } from "three";
import * as THREE from "three";
import { useGameStore } from "@/game/store";

type InteractableProps = {
  id: string;
  position: [number, number, number];
  radius?: number;
  onInteract: () => void;
  children: ReactNode;
  disabled?: boolean;
};

export function Interactable({
  id,
  position,
  radius = 1.6,
  onInteract,
  children,
  disabled = false,
}: InteractableProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const dialogueOpen = useGameStore((s) => s.dialogue !== null);
  const setNearby = useGameStore((s) => s.setNearby);
  const nearbyId = useGameStore((s) => s.nearbyId);

  const playerVec = useMemo(() => new THREE.Vector3(), []);
  const selfVec = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(() => {
    const { playerPosition, nearbyId: currentNearby } = useGameStore.getState();
    if (disabled) {
      if (currentNearby === id) setNearby(null);
      return;
    }
    playerVec.set(playerPosition[0], 0, playerPosition[2]);
    const dist = playerVec.distanceTo(selfVec);
    const near = dist <= radius;
    if (near && currentNearby !== id) setNearby(id);
    if (!near && currentNearby === id) setNearby(null);

    if (group.current) {
      const pulse = near ? 1 + Math.sin(performance.now() * 0.006) * 0.03 : 1;
      group.current.scale.setScalar(pulse);
    }
  });

  const isNearby = nearbyId === id && !disabled;

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        if (!isNearby || dialogueOpen) return;
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        if (!isNearby || dialogueOpen || disabled) return;
        e.stopPropagation();
        onInteract();
      }}
    >
      {children}
      {isNearby && (
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial
            color={hovered ? "#f0c75e" : "#ffe08a"}
            emissive="#f0c75e"
            emissiveIntensity={0.6}
          />
        </mesh>
      )}
    </group>
  );
}
