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
      <color attach="background" args={["#93c1d8"]} />
      <fog attach="fog" args={["#a9c9d1", 30, 64]} />
      <ambientLight intensity={0.5} color="#fff1d0" />
      <directionalLight
        castShadow
        position={[-10, 18, 9]}
        intensity={1.35}
        color="#ffe8b2"
        shadow-mapSize-width={1536}
        shadow-mapSize-height={1536}
        shadow-camera-left={-19}
        shadow-camera-right={19}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-camera-far={55}
      />
      <hemisphereLight args={["#c6e3ef", "#4b703b", 0.45]} />
    </>
  );
}

export function GameCanvas() {
  useSaveSync(true);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#87b7d9]">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 9.5, 19.5], fov: 48, near: 0.1, far: 95 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
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
