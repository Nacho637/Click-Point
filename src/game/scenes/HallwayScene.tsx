"use client";

import { Interactable } from "@/game/entities/Interactable";
import { Player } from "@/game/entities/Player";
import { useGameStore } from "@/game/store";

/** Platzhalter-Innenraum: Meeri ist durchs Loch ins Haus geschlüpft. */
function HallwayRoom() {
  return (
    <group>
      {/* Dielenboden */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.04, 0]}>
        <planeGeometry args={[26, 34]} />
        <meshStandardMaterial color="#6b543c" roughness={0.95} />
      </mesh>
      {/* Fugen der Dielen */}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-8 + i * 2, -0.03, 0]}
          scale={[0.05, 34, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#4f3e2c" roughness={1} />
        </mesh>
      ))}

      {/* Rückwand (Norden) mit dem Loch, durch das wir kamen */}
      <mesh position={[0, 3, -11]} receiveShadow>
        <boxGeometry args={[26, 6, 0.5]} />
        <meshStandardMaterial color="#7d8a86" roughness={0.95} />
      </mesh>
      <mesh position={[-4, 0.45, -10.7]}>
        <circleGeometry args={[0.5, 24, 0, Math.PI]} />
        <meshStandardMaterial color="#0b0a08" roughness={1} />
      </mesh>

      {/* Seitenwände */}
      <mesh position={[-13, 3, 0]}>
        <boxGeometry args={[0.5, 6, 34]} />
        <meshStandardMaterial color="#8a9591" roughness={0.95} />
      </mesh>
      <mesh position={[13, 3, 0]}>
        <boxGeometry args={[0.5, 6, 34]} />
        <meshStandardMaterial color="#8a9591" roughness={0.95} />
      </mesh>

      {/* Treppen-Andeutung im Norden (nächste Ebene) */}
      <group position={[5, 0, -9.5]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} castShadow position={[0, 0.25 + i * 0.35, i * 0.5]}>
            <boxGeometry args={[3, 0.35, 0.6]} />
            <meshStandardMaterial color="#6f5a44" roughness={1} />
          </mesh>
        ))}
      </group>

      {/* „Fortsetzung folgt"-Schild */}
      <group position={[-4, 0, -3]}>
        <mesh castShadow position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.8, 6]} />
          <meshStandardMaterial color="#4f3e2c" roughness={1} />
        </mesh>
        <mesh castShadow position={[0, 1.7, 0]}>
          <boxGeometry args={[1.8, 0.8, 0.08]} />
          <meshStandardMaterial color="#e8dcc0" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.7, 0.05]}>
          <boxGeometry args={[1.5, 0.5, 0.04]} />
          <meshStandardMaterial color="#c94f3a" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

export function HallwayScene() {
  const startDialogue = useGameStore((s) => s.startDialogue);

  return (
    <group>
      <HallwayRoom />
      <Player />

      <Interactable
        id="hallway-sign"
        position={[-4, 0, -3]}
        radius={2.2}
        onInteract={() => startDialogue("hallway_sign")}
        onLook={() => startDialogue("hallway_sign")}
      >
        <mesh position={[0, 1.7, 0]}>
          <boxGeometry args={[2, 1, 0.4]} />
          <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
        </mesh>
      </Interactable>
    </group>
  );
}
