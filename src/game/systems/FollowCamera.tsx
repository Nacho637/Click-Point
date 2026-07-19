"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { useGameStore } from "@/game/store";

const OFFSET = new THREE.Vector3(0, 9.5, 11.5);
const LOOK_LIFT = new THREE.Vector3(0, 0.4, 0);

export function FollowCamera() {
  const { camera } = useThree();
  const playerPosition = useGameStore((s) => s.playerPosition);
  const scratch = useMemo(
    () => ({
      target: new THREE.Vector3(),
      desired: new THREE.Vector3(),
      look: new THREE.Vector3(),
    }),
    [],
  );

  useFrame(() => {
    scratch.target.set(playerPosition[0], playerPosition[1], playerPosition[2]);
    scratch.desired.copy(scratch.target).add(OFFSET);
    camera.position.lerp(scratch.desired, 0.08);
    scratch.look.copy(scratch.target).add(LOOK_LIFT);
    camera.lookAt(scratch.look);
  });

  return null;
}
