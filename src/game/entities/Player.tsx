"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";
import { useGameStore } from "@/game/store";
import { useKeyboard } from "@/game/systems/keyboard";

const SPEED = 3.2;
const BOUNDS = { minX: -7.5, maxX: 7.5, minZ: -7.5, maxZ: 7.5 };

export function Player() {
  const group = useRef<Group>(null);
  const keys = useKeyboard();
  const dialogueOpen = useGameStore((s) => s.dialogue !== null);
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);
  const gateOpen = useGameStore((s) => s.flags.gate_open);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g || dialogueOpen) return;

    const { forward, backward, left, right } = keys.current;
    const input = new THREE.Vector3(
      (right ? 1 : 0) - (left ? 1 : 0),
      0,
      (backward ? 1 : 0) - (forward ? 1 : 0),
    );

    if (input.lengthSq() > 0) {
      input.normalize().multiplyScalar(SPEED * delta);
      g.position.add(input);
      g.rotation.y = Math.atan2(input.x, input.z);
    }

    // Soft wall: closed gate blocks north path around z = -3.2, x near 0
    if (!gateOpen && g.position.z < -3.05 && Math.abs(g.position.x) < 1.4) {
      g.position.z = -3.05;
    }

    g.position.x = THREE.MathUtils.clamp(
      g.position.x,
      BOUNDS.minX,
      BOUNDS.maxX,
    );
    g.position.z = THREE.MathUtils.clamp(
      g.position.z,
      BOUNDS.minZ,
      BOUNDS.maxZ,
    );

    setPlayerPosition([g.position.x, g.position.y, g.position.z]);
  });

  return (
    <group ref={group} position={[0, 0.35, 2]} name="player">
      {/* Body */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.38, 18, 14]} />
        <meshStandardMaterial color="#c4a484" roughness={0.85} />
      </mesh>
      {/* Head bump */}
      <mesh castShadow position={[0, 0.28, 0.22]}>
        <sphereGeometry args={[0.22, 14, 12]} />
        <meshStandardMaterial color="#b8956e" roughness={0.8} />
      </mesh>
      {/* Ears */}
      <mesh castShadow position={[-0.12, 0.42, 0.18]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      <mesh castShadow position={[0.12, 0.42, 0.18]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.08, 0.32, 0.4]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.08, 0.32, 0.4]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
