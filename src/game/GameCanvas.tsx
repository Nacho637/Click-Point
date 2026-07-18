"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { GardenScene } from "@/game/scenes/GardenScene";
import { FollowCamera } from "@/game/systems/FollowCamera";
import { useSaveSync } from "@/game/systems/useSaveSync";
import { GameHUD } from "@/game/ui/GameHUD";

function SceneLights() {
  return (
    <>
      <color attach="background" args={["#87b7d9"]} />
      <fog attach="fog" args={["#87b7d9", 18, 36]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        position={[8, 14, 6]}
        intensity={1.15}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight args={["#b8d9f0", "#4f7a3a", 0.35]} />
    </>
  );
}

export function GameCanvas() {
  useSaveSync(true);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#87b7d9]">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 7.5, 8.5], fov: 45, near: 0.1, far: 80 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <FollowCamera />
          <GardenScene />
        </Suspense>
      </Canvas>
      <GameHUD />
    </div>
  );
}
