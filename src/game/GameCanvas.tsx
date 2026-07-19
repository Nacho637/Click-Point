"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DevPerf } from "@/game/rendering/DevPerf";
import { GardenScene } from "@/game/scenes/GardenScene";
import { FollowCamera } from "@/game/systems/FollowCamera";
import { useSaveSync } from "@/game/systems/useSaveSync";
import { GameHUD } from "@/game/ui/GameHUD";

function SceneLights() {
  return (
    <>
      <color attach="background" args={["#93c1d8"]} />
      <fog attach="fog" args={["#a9c9d1", 34, 72]} />
      <ambientLight intensity={0.5} color="#fff1d0" />
      <directionalLight
        castShadow
        position={[-10, 18, 9]}
        intensity={1.35}
        color="#ffe8b2"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-27}
        shadow-camera-right={27}
        shadow-camera-top={26}
        shadow-camera-bottom={-24}
        shadow-camera-far={62}
        shadow-bias={-0.0002}
        shadow-normalBias={0.03}
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
        shadows="soft"
        dpr={[1, 1.75]}
        camera={{ position: [0, 9.5, 19.5], fov: 48, near: 0.1, far: 110 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.1;
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <DevPerf />
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
