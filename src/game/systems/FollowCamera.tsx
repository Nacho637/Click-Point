"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "@/game/store";

const OFFSET = new THREE.Vector3(0, 9.5, 11.5);
const LOOK_LIFT = new THREE.Vector3(0, 0.4, 0);
/** Higher = snappier follow. Exponential damping keeps motion frame-rate independent. */
const FOLLOW_SPEED = 10;

export function FollowCamera() {
  const { camera } = useThree();
  const initialized = useRef(false);
  const scratch = useMemo(
    () => ({
      target: new THREE.Vector3(),
      smoothed: new THREE.Vector3(),
      look: new THREE.Vector3(),
    }),
    [],
  );

  // Priority -1 runs after the player (default 0) so we track this frame's pose.
  useFrame((_, delta) => {
    const [x, y, z] = useGameStore.getState().playerPosition;
    scratch.target.set(x, y, z);

    if (!initialized.current) {
      scratch.smoothed.copy(scratch.target);
      initialized.current = true;
    } else {
      const t = 1 - Math.exp(-FOLLOW_SPEED * delta);
      scratch.smoothed.lerp(scratch.target, t);
    }

    // Keep camera/look locked to the same smoothed point so orientation never micro-rotates.
    camera.position.copy(scratch.smoothed).add(OFFSET);
    scratch.look.copy(scratch.smoothed).add(LOOK_LIFT);
    camera.lookAt(scratch.look);
  }, -1);

  return null;
}
