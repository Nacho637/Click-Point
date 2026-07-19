"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";
import { useGameStore } from "@/game/store";
import { useKeyboard } from "@/game/systems/keyboard";

const SPEED = 3.2;
const BOUNDS = { minX: -12.4, maxX: 12.4, minZ: -10.8, maxZ: 11.8 };
const START_POSITION: [number, number, number] = [0, 0.35, 8];

const FUR = "#d8b48a";
const FUR_WARM = "#c99a6b";
const FUR_DARK = "#a8784f";
const BELLY = "#f3e2c8";
const CHEEK = "#efc4a8";
const EAR_OUTER = "#b8895c";
const EAR_INNER = "#f2b8a8";
const NOSE = "#e08a7a";
const PAW = "#b8895c";
const EYE_WHITE = "#fff8ef";
const EYE_DARK = "#2a1c14";
const HIGHLIGHT = "#ffffff";

/** Soft rounded guinea-pig hero: warm cream tones that pop against garden greens. */
export function Player() {
  const group = useRef<Group>(null);
  const body = useRef<Group>(null);
  const keys = useKeyboard();
  const dialogueOpen = useGameStore((s) => s.dialogue !== null);
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);
  const gateOpen = useGameStore((s) => s.flags.gate_open);
  const input = useMemo(() => new THREE.Vector3(), []);
  const moving = useRef(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || dialogueOpen) return;

    const { forward, backward, left, right } = keys.current;
    input.set(
      (right ? 1 : 0) - (left ? 1 : 0),
      0,
      (backward ? 1 : 0) - (forward ? 1 : 0),
    );

    moving.current = input.lengthSq() > 0;
    if (moving.current) {
      input.normalize().multiplyScalar(SPEED * delta);
      g.position.add(input);
      g.rotation.y = Math.atan2(input.x, input.z);
    }

    // The visible hedge continues beyond the gate; this keeps the closed route honest.
    if (!gateOpen && g.position.z < -10.05 && Math.abs(g.position.x) < 1.65) {
      g.position.z = -10.05;
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

    // Idle breath + tiny walk bounce keep the silhouette lively without a rig.
    const t = state.clock.elapsedTime;
    const mesh = body.current;
    if (mesh) {
      const breath = 1 + Math.sin(t * 2.4) * 0.018;
      const bob = moving.current ? Math.abs(Math.sin(t * 10)) * 0.045 : Math.sin(t * 2.4) * 0.012;
      const sway = moving.current ? Math.sin(t * 10) * 0.06 : Math.sin(t * 1.3) * 0.02;
      mesh.scale.set(breath, 1 / Math.sqrt(breath), breath);
      mesh.position.y = bob;
      mesh.rotation.z = sway;
    }

    setPlayerPosition([g.position.x, g.position.y, g.position.z]);
  });

  return (
    <group ref={group} position={START_POSITION} name="player">
      <group ref={body}>
        {/* Plush oval body */}
        <mesh castShadow position={[0, 0.02, -0.02]} scale={[1.15, 0.92, 1.35]}>
          <sphereGeometry args={[0.36, 22, 18]} />
          <meshStandardMaterial color={FUR} roughness={0.88} />
        </mesh>
        {/* Warm saddle stripe */}
        <mesh castShadow position={[0, 0.16, -0.06]} scale={[0.95, 0.55, 1.1]}>
          <sphereGeometry args={[0.28, 16, 12]} />
          <meshStandardMaterial color={FUR_WARM} roughness={0.9} />
        </mesh>
        {/* Cream belly */}
        <mesh castShadow position={[0, -0.1, 0.06]} scale={[0.95, 0.7, 1.05]}>
          <sphereGeometry args={[0.26, 16, 12]} />
          <meshStandardMaterial color={BELLY} roughness={0.82} />
        </mesh>

        {/* Rounded head */}
        <mesh castShadow position={[0, 0.18, 0.34]} scale={[1.05, 0.95, 1]}>
          <sphereGeometry args={[0.24, 20, 16]} />
          <meshStandardMaterial color={FUR} roughness={0.85} />
        </mesh>
        {/* Soft cheeks */}
        <mesh castShadow position={[-0.16, 0.12, 0.42]} scale={[0.7, 0.65, 0.7]}>
          <sphereGeometry args={[0.12, 12, 10]} />
          <meshStandardMaterial color={CHEEK} roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0.16, 0.12, 0.42]} scale={[0.7, 0.65, 0.7]}>
          <sphereGeometry args={[0.12, 12, 10]} />
          <meshStandardMaterial color={CHEEK} roughness={0.8} />
        </mesh>
        {/* Forehead tuft */}
        <mesh castShadow position={[0, 0.36, 0.3]} scale={[0.9, 0.55, 0.7]}>
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshStandardMaterial color={FUR_DARK} roughness={0.95} />
        </mesh>

        {/* Ears — outer + pink inner */}
        <group position={[-0.14, 0.36, 0.28]} rotation={[0.15, 0.2, -0.35]}>
          <mesh castShadow scale={[1, 1.15, 0.45]}>
            <sphereGeometry args={[0.09, 12, 10]} />
            <meshStandardMaterial color={EAR_OUTER} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.01, 0.03]} scale={[0.7, 0.8, 0.35]}>
            <sphereGeometry args={[0.08, 10, 8]} />
            <meshStandardMaterial color={EAR_INNER} roughness={0.75} />
          </mesh>
        </group>
        <group position={[0.14, 0.36, 0.28]} rotation={[0.15, -0.2, 0.35]}>
          <mesh castShadow scale={[1, 1.15, 0.45]}>
            <sphereGeometry args={[0.09, 12, 10]} />
            <meshStandardMaterial color={EAR_OUTER} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.01, 0.03]} scale={[0.7, 0.8, 0.35]}>
            <sphereGeometry args={[0.08, 10, 8]} />
            <meshStandardMaterial color={EAR_INNER} roughness={0.75} />
          </mesh>
        </group>

        {/* Big shiny eyes */}
        <group position={[-0.09, 0.22, 0.52]}>
          <mesh>
            <sphereGeometry args={[0.055, 12, 10]} />
            <meshStandardMaterial color={EYE_WHITE} roughness={0.35} />
          </mesh>
          <mesh position={[0.01, 0, 0.03]}>
            <sphereGeometry args={[0.038, 10, 8]} />
            <meshStandardMaterial color={EYE_DARK} roughness={0.25} />
          </mesh>
          <mesh position={[0.02, 0.015, 0.055]}>
            <sphereGeometry args={[0.012, 8, 6]} />
            <meshStandardMaterial
              color={HIGHLIGHT}
              emissive={HIGHLIGHT}
              emissiveIntensity={0.35}
              roughness={0.2}
            />
          </mesh>
        </group>
        <group position={[0.09, 0.22, 0.52]}>
          <mesh>
            <sphereGeometry args={[0.055, 12, 10]} />
            <meshStandardMaterial color={EYE_WHITE} roughness={0.35} />
          </mesh>
          <mesh position={[-0.01, 0, 0.03]}>
            <sphereGeometry args={[0.038, 10, 8]} />
            <meshStandardMaterial color={EYE_DARK} roughness={0.25} />
          </mesh>
          <mesh position={[-0.015, 0.015, 0.055]}>
            <sphereGeometry args={[0.012, 8, 6]} />
            <meshStandardMaterial
              color={HIGHLIGHT}
              emissive={HIGHLIGHT}
              emissiveIntensity={0.35}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Snout + nose */}
        <mesh castShadow position={[0, 0.12, 0.54]} scale={[1.1, 0.85, 1]}>
          <sphereGeometry args={[0.09, 14, 12]} />
          <meshStandardMaterial color={BELLY} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.13, 0.62]}>
          <sphereGeometry args={[0.038, 10, 8]} />
          <meshStandardMaterial color={NOSE} roughness={0.55} />
        </mesh>
        {/* Tiny nostrils */}
        <mesh position={[-0.012, 0.125, 0.655]}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial color="#c46a5c" roughness={0.7} />
        </mesh>
        <mesh position={[0.012, 0.125, 0.655]}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshStandardMaterial color="#c46a5c" roughness={0.7} />
        </mesh>

        {/* Whisker dots */}
        {(
          [
            [-0.12, 0.12, 0.5],
            [-0.14, 0.08, 0.48],
            [0.12, 0.12, 0.5],
            [0.14, 0.08, 0.48],
          ] as const
        ).map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.012, 6, 6]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>
        ))}

        {/* Stubby front paws */}
        <mesh castShadow position={[-0.18, -0.22, 0.22]} scale={[1.15, 0.5, 1.35]}>
          <sphereGeometry args={[0.1, 10, 8]} />
          <meshStandardMaterial color={PAW} roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0.18, -0.22, 0.22]} scale={[1.15, 0.5, 1.35]}>
          <sphereGeometry args={[0.1, 10, 8]} />
          <meshStandardMaterial color={PAW} roughness={0.9} />
        </mesh>
        {/* Rear haunches / feet */}
        <mesh castShadow position={[-0.2, -0.18, -0.22]} scale={[1.2, 0.7, 1.1]}>
          <sphereGeometry args={[0.13, 12, 10]} />
          <meshStandardMaterial color={FUR_WARM} roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0.2, -0.18, -0.22]} scale={[1.2, 0.7, 1.1]}>
          <sphereGeometry args={[0.13, 12, 10]} />
          <meshStandardMaterial color={FUR_WARM} roughness={0.9} />
        </mesh>
        <mesh castShadow position={[-0.22, -0.26, -0.28]} scale={[1.1, 0.4, 1.2]}>
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshStandardMaterial color={PAW} roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0.22, -0.26, -0.28]} scale={[1.1, 0.4, 1.2]}>
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshStandardMaterial color={PAW} roughness={0.9} />
        </mesh>

        {/* Soft round rump */}
        <mesh castShadow position={[0, 0.05, -0.38]} scale={[1.05, 0.9, 0.85]}>
          <sphereGeometry args={[0.22, 14, 12]} />
          <meshStandardMaterial color={FUR} roughness={0.88} />
        </mesh>
      </group>
    </group>
  );
}
