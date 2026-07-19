"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Atmosphere, SUN_POSITION } from "@/game/rendering/Atmosphere";
import { DevPerf } from "@/game/rendering/DevPerf";
import { GardenScene } from "@/game/scenes/GardenScene";
import { FollowCamera } from "@/game/systems/FollowCamera";
import { useSaveSync } from "@/game/systems/useSaveSync";
import { GameHUD } from "@/game/ui/GameHUD";

function SceneLights() {
  return (
    <>
      {/* IBL aus <Atmosphere> übernimmt das Füllen; Ambient/Hemisphere nur noch als Rest-Aufheller. */}
      <ambientLight intensity={0.1} color="#fff1d0" />
      <directionalLight
        castShadow
        position={SUN_POSITION}
        intensity={2.2}
        color="#ffe3ae"
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
      <hemisphereLight args={["#c6e3ef", "#4b703b", 0.2]} />
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
        camera={{ position: [0, 9.5, 19.5], fov: 48, near: 0.1, far: 250 }}
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
          <Atmosphere />
          <SceneLights />
          <FollowCamera />
          <GardenScene />
        </Suspense>
      </Canvas>
      <GameHUD />
    </div>
  );
}
