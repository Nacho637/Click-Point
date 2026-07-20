"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { GardenScene } from "@/game/scenes/GardenScene";
import { HallwayScene } from "@/game/scenes/HallwayScene";
import { YardScene } from "@/game/scenes/YardScene";
import type { SceneId } from "@/game/quests/flags";
import { FollowCamera } from "@/game/systems/FollowCamera";
import { useSaveSync } from "@/game/systems/useSaveSync";
import { useGameStore } from "@/game/store";
import { GameHUD } from "@/game/ui/GameHUD";

function SceneLights({ sceneId }: { sceneId: SceneId }) {
  if (sceneId === "hallway" || sceneId === "upstairs") {
    // Innenraum: kühler, gedämpfter, ohne Himmel.
    return (
      <>
        <color attach="background" args={["#1c1f22"]} />
        <fog attach="fog" args={["#1c1f22", 18, 46]} />
        <ambientLight intensity={0.45} color="#cdd6dd" />
        <directionalLight
          castShadow
          position={[-6, 14, 8]}
          intensity={0.9}
          color="#e8ead0"
          shadow-mapSize-width={1536}
          shadow-mapSize-height={1536}
          shadow-camera-left={-22}
          shadow-camera-right={22}
          shadow-camera-top={22}
          shadow-camera-bottom={-22}
          shadow-camera-far={58}
        />
        <hemisphereLight args={["#9aa7b0", "#2c2620", 0.4]} />
      </>
    );
  }

  // Außen (garden/yard/ending): warmes Tageslicht. Der Hof ist etwas grauer.
  const isYard = sceneId === "yard";
  return (
    <>
      <color attach="background" args={[isYard ? "#aab4bb" : "#93c1d8"]} />
      <fog attach="fog" args={[isYard ? "#b3bcc1" : "#a9c9d1", 34, 72]} />
      <ambientLight intensity={0.5} color="#fff1d0" />
      <directionalLight
        castShadow
        position={[-10, 18, 9]}
        intensity={1.35}
        color="#ffe8b2"
        shadow-mapSize-width={1536}
        shadow-mapSize-height={1536}
        shadow-camera-left={-27}
        shadow-camera-right={27}
        shadow-camera-top={26}
        shadow-camera-bottom={-24}
        shadow-camera-far={62}
      />
      <hemisphereLight args={["#c6e3ef", "#4b703b", 0.45]} />
    </>
  );
}

function ActiveScene() {
  const sceneId = useGameStore((s) => s.sceneId);
  if (sceneId === "yard") return <YardScene />;
  if (sceneId === "hallway" || sceneId === "upstairs" || sceneId === "ending")
    return <HallwayScene />;
  return <GardenScene />;
}

function CanvasContents() {
  const sceneId = useGameStore((s) => s.sceneId);
  return (
    <Suspense fallback={null}>
      <SceneLights sceneId={sceneId} />
      <FollowCamera />
      <ActiveScene />
    </Suspense>
  );
}

export function GameCanvas() {
  useSaveSync(true);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#87b7d9]">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 9.5, 19.5], fov: 48, near: 0.1, far: 110 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <CanvasContents />
      </Canvas>
      <GameHUD />
    </div>
  );
}
