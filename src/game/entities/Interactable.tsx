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
  /** „Anschauen“-Verb: Beschreibung statt normaler Interaktion. */
  onLook?: () => void;
  children: ReactNode;
  disabled?: boolean;
};

export function Interactable({
  id,
  position,
  radius = 1.6,
  onInteract,
  onLook,
  children,
  disabled = false,
}: InteractableProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const uiOpen = useGameStore((s) => s.dialogue !== null || s.choices !== null);
  const lookMode = useGameStore((s) => s.verbMode === "look");
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
        if (!isNearby || uiOpen) return;
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        if (!isNearby || uiOpen || disabled) return;
        e.stopPropagation();
        if (lookMode && onLook) {
          onLook();
          return;
        }
        onInteract();
      }}
      onContextMenu={(e) => {
        // Rechtsklick schaut immer an — klassisches Zwei-Verben-Muster.
        if (!isNearby || uiOpen || disabled) return;
        e.stopPropagation();
        (onLook ?? onInteract)();
      }}
    >
      {children}
      {isNearby && (
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial
            color={lookMode ? "#8bb7cc" : hovered ? "#f0c75e" : "#ffe08a"}
            emissive={lookMode ? "#8bb7cc" : "#f0c75e"}
            emissiveIntensity={0.6}
          />
        </mesh>
      )}
    </group>
  );
}
