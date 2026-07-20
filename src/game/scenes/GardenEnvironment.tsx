"use client";

import type { ReactNode } from "react";
import { useDetailMaps } from "@/game/rendering/textures";
import { InstancedForest } from "@/game/scenes/vegetation/InstancedForest";

type Vec3 = [number, number, number];

const treePositions: Array<[Vec3, number, number]> = [
  [[-14.4, 0, -10.5], 1.15, 0.2],
  [[-14.1, 0, -5.6], 0.9, -0.5],
  [[-14.7, 0, -0.5], 1.25, 0.9],
  [[-21.2, 0, 8], 1, 0.3],
  [[-12.4, 0, 11.4], 1.2, -0.6],
  [[-7.2, 0, 13.2], 0.9, 0.5],
  [[6.7, 0, 13.3], 1.1, -0.4],
  [[12.1, 0, 11.2], 1.25, 0.7],
  [[21, 0, 7.6], 0.95, -0.7],
  [[14.5, 0, 0.8], 1.2, 0.1],
  [[14.1, 0, -5.2], 1, 0.8],
  [[13.7, 0, -10.4], 1.15, -0.3],
  [[-8.7, 0, -13.1], 0.95, 0.4],
  [[8.5, 0, -13.2], 1.05, -0.5],
  [[-20.2, 0, -8], 1.1, 0.6],
  [[-20.5, 0, -2], 0.95, -0.3],
  [[-19.8, 0, 4.5], 1.2, 0.4],
  [[-18.6, 0, 11], 1, -0.6],
  [[-13, 0, 16.5], 1.15, 0.2],
  [[-6.5, 0, 19.2], 0.9, -0.4],
  [[6.8, 0, 19.4], 1.1, 0.7],
  [[13.2, 0, 16.8], 1, -0.2],
  [[19.9, 0, -8.5], 1.05, 0.5],
  [[20.4, 0, -2.5], 1.2, -0.7],
  [[19.6, 0, 4], 0.95, 0.3],
  [[18.8, 0, 11.5], 1.15, -0.5],
  [[-17.5, 0, -12.6], 1, 0.8],
  [[17.2, 0, -12.8], 1.1, -0.6],
];

const bushPositions: Array<[Vec3, number, string]> = [
  [[-12.7, 0, -8.1], 1.1, "#3f7438"],
  [[-13.1, 0, -3.2], 0.9, "#4b823f"],
  [[-12.9, 0, 2.3], 1.2, "#376d35"],
  [[-12.6, 0, 8.4], 1, "#4a7c3e"],
  [[-9.7, 0, 11.8], 0.85, "#3c7639"],
  [[-3.8, 0, 13.1], 1.1, "#4c8240"],
  [[3.5, 0, 13], 0.95, "#397138"],
  [[9.8, 0, 11.8], 1.15, "#4a7c3e"],
  [[12.8, 0, 8.4], 0.9, "#3f7438"],
  [[12.9, 0, 3.1], 1.1, "#4b823f"],
  [[12.7, 0, -2.6], 0.95, "#376d35"],
  [[12.4, 0, -8.2], 1.2, "#4a7c3e"],
  [[-11.1, 0, -11.8], 0.8, "#3c7639"],
  [[-5.2, 0, -12.8], 1.05, "#4c8240"],
  [[5.1, 0, -12.8], 0.9, "#397138"],
  [[10.8, 0, -11.7], 1.05, "#4a7c3e"],
  [[-18.6, 0, -5.5], 1.1, "#3f7438"],
  [[-17.9, 0, 1.5], 0.95, "#4b823f"],
  [[-16.8, 0, 9], 1.15, "#376d35"],
  [[-15.6, 0, 13.8], 0.9, "#4a7c3e"],
  [[-11, 0, 17.2], 1.05, "#3c7639"],
  [[-3.5, 0, 18.6], 1.2, "#4c8240"],
  [[4, 0, 18.5], 0.95, "#397138"],
  [[10.5, 0, 17.4], 1.1, "#4a7c3e"],
  [[15.2, 0, 14.2], 0.9, "#3f7438"],
  [[17.6, 0, 9.2], 1.15, "#4b823f"],
  [[18.3, 0, 2], 1, "#376d35"],
  [[18.1, 0, -5.8], 1.1, "#4a7c3e"],
  [[-15.2, 0, -11.4], 0.85, "#3c7639"],
  [[15, 0, -11.6], 0.95, "#4c8240"],
];

const stonePositions: Vec3[] = [
  [-11.6, 0.22, 10.2],
  [-13.1, 0.18, 6.5],
  [11.9, 0.2, 9.1],
  [13, 0.17, -0.2],
  [-12.3, 0.19, -6.6],
  [11.5, 0.23, -9.5],
  [-17.8, 0.2, 7.4],
  [-15.5, 0.19, 14.2],
  [16.8, 0.21, 12.5],
  [18.4, 0.18, -4.1],
];

export function Tree({
  position,
  scale = 1,
  rotation = 0,
}: {
  position: Vec3;
  scale?: number;
  rotation?: number;
}) {
  const bark = useDetailMaps("bark", 2, 1.2);
  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      <mesh castShadow position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.34, 0.5, 2.9, 7]} />
        <meshStandardMaterial
          color="#725033"
          roughness={0.95}
          map={bark.map}
          normalMap={bark.normalMap}
          normalScale={[0.6, 0.6]}
        />
      </mesh>
      <mesh castShadow position={[-0.6, 3.05, 0.05]} rotation={[0.1, 0, -0.1]}>
        <dodecahedronGeometry args={[1.25, 0]} />
        <meshStandardMaterial color="#4f853f" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.55, 3.25, -0.15]}>
        <dodecahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color="#5d9548" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.1, 4.05, 0.15]}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color="#6aa252" roughness={0.88} />
      </mesh>
    </group>
  );
}

export function Bush({
  position,
  scale = 1,
  color = "#3f7438",
}: {
  position: Vec3;
  scale?: number;
  color?: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[-0.38, 0.5, 0]}>
        <dodecahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0.3, 0.62, -0.08]}>
        <dodecahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0.05, 0.42, 0.48]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#548a43" roughness={0.95} />
      </mesh>
    </group>
  );
}

export function GardenGround() {
  const steppingStones = Array.from({ length: 9 }, (_, index) => ({
    x: Math.sin(index * 0.8) * 0.35,
    z: 7.5 - index * 2,
    rotation: index * 0.7,
  }));

  const lawn = useDetailMaps("grass", 16);
  // Zweite Lage mit anderem Repeat + Drehung bricht sichtbares Kacheln.
  const lawnBreakup = useDetailMaps("grass", 9.7);
  const meadow = useDetailMaps("grass", 4.5);
  const pathMain = useDetailMaps("dirt", 1.4, 9);
  const pathSide = useDetailMaps("dirt", 1, 5);
  const stone = useDetailMaps("stone", 1);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.04, 0]}>
        <circleGeometry args={[26, 56]} />
        <meshStandardMaterial
          color="#659451"
          roughness={1}
          map={lawn.map}
          normalMap={lawn.normalMap}
          normalScale={[0.4, 0.4]}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0.75]}
        position={[0, -0.035, 0]}
        raycast={() => null}
      >
        <circleGeometry args={[26, 56]} />
        <meshStandardMaterial
          color="#659451"
          roughness={1}
          map={lawnBreakup.map}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0.08]}
        receiveShadow
        position={[-7, -0.02, 0.8]}
        scale={[7.2, 5.4, 1]}
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color="#5b8a49"
          roughness={1}
          map={meadow.map}
          normalMap={meadow.normalMap}
          normalScale={[0.4, 0.4]}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, -0.15]}
        receiveShadow
        position={[7.4, -0.015, -2.5]}
        scale={[6.6, 6.3, 1]}
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color="#709d58"
          roughness={1}
          map={meadow.map}
          normalMap={meadow.normalMap}
          normalScale={[0.4, 0.4]}
        />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.002, -1]}
        scale={[1.55, 10.7, 1]}
        receiveShadow
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color="#b99367"
          roughness={1}
          map={pathMain.map}
          normalMap={pathMain.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, -0.55]}
        position={[-4.9, 0.003, -1.8]}
        scale={[1.15, 6.2, 1]}
        receiveShadow
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color="#b28b61"
          roughness={1}
          map={pathSide.map}
          normalMap={pathSide.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0.65]}
        position={[5.5, 0.004, -3.1]}
        scale={[1.1, 6, 1]}
        receiveShadow
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color="#b28b61"
          roughness={1}
          map={pathSide.map}
          normalMap={pathSide.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>

      {steppingStones.map((stone_, index) => (
        <mesh
          key={index}
          castShadow
          receiveShadow
          position={[stone_.x, 0.035, stone_.z]}
          rotation={[0, stone_.rotation, 0]}
          scale={[1, 0.18, 0.7]}
        >
          <dodecahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial
            color={index % 2 ? "#9b927f" : "#a8a08c"}
            roughness={1}
            map={stone.map}
            normalMap={stone.normalMap}
            normalScale={[0.55, 0.55]}
          />
        </mesh>
      ))}

      <mesh
        rotation={[-Math.PI / 2, 0, 0.3]}
        receiveShadow
        position={[1.5, -0.018, 14]}
        scale={[7.5, 4.8, 1]}
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color="#6b9a54"
          roughness={1}
          map={meadow.map}
          normalMap={meadow.normalMap}
          normalScale={[0.4, 0.4]}
        />
      </mesh>

      <FlowerPatch position={[-6.8, 0, 4.2]} colors={["#e56b62", "#f0c75e", "#d978b4"]} />
      <FlowerPatch position={[6.7, 0, 2.4]} colors={["#f0c75e", "#efe8d4", "#8d71ba"]} />
      <FlowerPatch position={[-4.6, 0, -6.5]} colors={["#d978b4", "#e56b62", "#f0c75e"]} />
    </group>
  );
}

function FlowerPatch({ position, colors }: { position: Vec3; colors: string[] }) {
  const offsets: Vec3[] = [
    [-0.7, 0, -0.3],
    [-0.2, 0, 0.4],
    [0.35, 0, -0.35],
    [0.75, 0, 0.25],
    [0.05, 0, -0.8],
  ];
  const soil = useDetailMaps("dirt", 1.5);
  return (
    <group position={position}>
      <mesh position={[0, 0.06, 0]} scale={[1.6, 0.12, 1.15]} castShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#60462d"
          roughness={1}
          map={soil.map}
          normalMap={soil.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      {offsets.map((offset, index) => (
        <group key={index} position={offset}>
          <mesh position={[0, 0.32, 0]}>
            <cylinderGeometry args={[0.025, 0.035, 0.5, 6]} />
            <meshStandardMaterial color="#44753d" />
          </mesh>
          <mesh castShadow position={[0, 0.62, 0]}>
            <dodecahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial color={colors[index % colors.length]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function NaturalBoundary() {
  const rock = useDetailMaps("stone", 1.2);
  const bark = useDetailMaps("bark", 2, 1.2);
  return (
    <group>
      <InstancedForest trees={treePositions} bushes={bushPositions} />
      {stonePositions.map((position, index) => (
        <mesh
          key={`rock-${index}`}
          castShadow
          position={position}
          rotation={[0.1, index * 0.8, -0.08]}
          scale={[1.3, 0.75, 1]}
        >
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color={index % 2 ? "#76766d" : "#8b8778"}
            roughness={1}
            map={rock.map}
            normalMap={rock.normalMap}
            normalScale={[0.55, 0.55]}
          />
        </mesh>
      ))}
      <group position={[-8.4, 0.35, 12.2]} rotation={[0, 0.35, -0.12]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.32, 0.42, 3.4, 8]} />
          <meshStandardMaterial
            color="#735136"
            roughness={1}
            map={bark.map}
            normalMap={bark.normalMap}
            normalScale={[0.6, 0.6]}
          />
        </mesh>
        <mesh castShadow position={[1.4, 0.2, 0.25]}>
          <cylinderGeometry args={[0.08, 0.13, 1.2, 6]} />
          <meshStandardMaterial
            color="#735136"
            roughness={1}
            map={bark.map}
            normalMap={bark.normalMap}
            normalScale={[0.6, 0.6]}
          />
        </mesh>
      </group>
    </group>
  );
}

export function DistantBackdrop() {
  return (
    <group>
      <mesh position={[-15, 1.5, -28]} scale={[13, 4, 4]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#789b65" roughness={1} />
      </mesh>
      <mesh position={[12, 2.2, -30]} scale={[16, 5, 5]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#6f925e" roughness={1} />
      </mesh>
      <mesh position={[0, 3, -27]} scale={[10, 5, 4]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#85a76d" roughness={1} />
      </mesh>

      <group position={[0, 0, -24]}>
        <mesh position={[0, 3.2, 0]} castShadow>
          <boxGeometry args={[7, 5.5, 2.5]} />
          <meshStandardMaterial color="#d8c29d" roughness={0.95} />
        </mesh>
        <mesh position={[0, 6.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[5.2, 3.1, 4]} />
          <meshStandardMaterial color="#744839" roughness={1} />
        </mesh>
        <mesh position={[-1.9, 3.5, 1.3]}>
          <boxGeometry args={[1.1, 1.5, 0.08]} />
          <meshStandardMaterial color="#8bb7cc" emissive="#8bb7cc" emissiveIntensity={0.1} />
        </mesh>
        <mesh position={[1.9, 3.5, 1.3]}>
          <boxGeometry args={[1.1, 1.5, 0.08]} />
          <meshStandardMaterial color="#8bb7cc" emissive="#8bb7cc" emissiveIntensity={0.1} />
        </mesh>
      </group>

      <Cloud position={[-12, 12, -26]} scale={2.2} />
      <Cloud position={[10, 14, -32]} scale={2.7} />
      <Cloud position={[2, 16, -38]} scale={1.8} />
    </group>
  );
}

function Cloud({ position, scale }: { position: Vec3; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[-0.65, 0, 0]}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#e8eee4" roughness={1} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#f2f3ea" roughness={1} />
      </mesh>
      <mesh position={[0.8, 0, 0]}>
        <dodecahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial color="#e8eee4" roughness={1} />
      </mesh>
    </group>
  );
}

export function Gate({ open }: { open: boolean }) {
  const post = useDetailMaps("bark", 1, 1);
  const plank = useDetailMaps("planks", 1, 1);
  return (
    <group position={[0, 0, -10.4]}>
      <mesh position={[-1.65, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.28, 2, 8]} />
        <meshStandardMaterial
          color="#63482f"
          roughness={1}
          map={post.map}
          normalMap={post.normalMap}
          normalScale={[0.6, 0.6]}
        />
      </mesh>
      <mesh position={[1.65, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.28, 2, 8]} />
        <meshStandardMaterial
          color="#63482f"
          roughness={1}
          map={post.map}
          normalMap={post.normalMap}
          normalScale={[0.6, 0.6]}
        />
      </mesh>
      <group position={[-2.2, 0, 0.1]} scale={[1.2, 1.2, 1.2]}>
        <Bush position={[0, 0, 0]} />
      </group>
      <group position={[2.2, 0, 0.1]} scale={[1.2, 1.2, 1.2]}>
        <Bush position={[0, 0, 0]} />
      </group>
      {!open && (
        <group position={[0, 0.95, 0]}>
          {[0, 1, 2, 3, 4].map((index) => (
            <mesh key={index} castShadow position={[(index - 2) * 0.62, 0, 0]}>
              <boxGeometry args={[0.45, index % 2 ? 1.55 : 1.75, 0.14]} />
              <meshStandardMaterial
                color="#89663d"
                roughness={1}
                map={plank.map}
                normalMap={plank.normalMap}
                normalScale={[0.5, 0.5]}
              />
            </mesh>
          ))}
          <mesh castShadow position={[0, 0.2, 0.08]}>
            <boxGeometry args={[3, 0.2, 0.18]} />
            <meshStandardMaterial
              color="#765635"
              roughness={1}
              map={plank.map}
              normalMap={plank.normalMap}
              normalScale={[0.5, 0.5]}
            />
          </mesh>
          <mesh castShadow position={[0, -0.35, 0.08]}>
            <boxGeometry args={[3, 0.2, 0.18]} />
            <meshStandardMaterial
              color="#765635"
              roughness={1}
              map={plank.map}
              normalMap={plank.normalMap}
              normalScale={[0.5, 0.5]}
            />
          </mesh>
        </group>
      )}
      {open && (
        <group position={[1.8, 0.95, 1.15]} rotation={[0, -1.05, 0]}>
          {[0, 1, 2, 3, 4].map((index) => (
            <mesh key={index} castShadow position={[(index - 2) * 0.62, 0, 0]}>
              <boxGeometry args={[0.45, index % 2 ? 1.55 : 1.75, 0.14]} />
              <meshStandardMaterial
                color="#89663d"
                roughness={1}
                map={plank.map}
                normalMap={plank.normalMap}
                normalScale={[0.5, 0.5]}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

export function Pond({ children }: { children?: ReactNode }) {
  const rock = useDetailMaps("stone", 1);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, -0.2]} position={[0, 0.04, 0]} scale={[2.6, 1.7, 1]}>
        <circleGeometry args={[1, 36]} />
        <meshStandardMaterial
          color="#4d9aa5"
          roughness={0.38}
          metalness={0.05}
        />
      </mesh>
      {[
        [-2.2, 0.14, -0.5],
        [-1.65, 0.12, 1],
        [1.7, 0.15, 0.85],
        [2.15, 0.13, -0.55],
      ].map((position, index) => (
        <mesh
          key={index}
          castShadow
          position={position as Vec3}
          scale={[0.9, 0.45, 0.65]}
          rotation={[0, index * 0.8, 0]}
        >
          <dodecahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial
            color="#85867d"
            roughness={1}
            map={rock.map}
            normalMap={rock.normalMap}
            normalScale={[0.55, 0.55]}
          />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.7, 0.075, 0.2]}>
        <circleGeometry args={[0.42, 18, 0, Math.PI * 1.75]} />
        <meshStandardMaterial color="#5b8c45" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.4]} position={[0.95, 0.075, -0.35]}>
        <circleGeometry args={[0.34, 18, 0, Math.PI * 1.75]} />
        <meshStandardMaterial color="#6b9c4f" roughness={0.9} />
      </mesh>
      {children}
    </group>
  );
}

export function GardenShed() {
  const wall = useDetailMaps("planks", 2, 1);
  const door = useDetailMaps("planks", 1, 1);
  return (
    <group>
      <mesh castShadow position={[0, 1.35, 0]}>
        <boxGeometry args={[4, 2.7, 3.2]} />
        <meshStandardMaterial
          color="#806044"
          roughness={1}
          map={wall.map}
          normalMap={wall.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      <mesh castShadow position={[0, 3.15, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.15, 1.5, 4]} />
        <meshStandardMaterial color="#4f7045" roughness={1} />
      </mesh>
      <mesh position={[0, 1.2, 1.63]}>
        <boxGeometry args={[1.45, 2.25, 0.1]} />
        <meshStandardMaterial
          color="#5c412f"
          roughness={1}
          map={door.map}
          normalMap={door.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      <mesh position={[0.5, 1.2, 1.72]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#c2a65d" metalness={0.4} />
      </mesh>
      <mesh position={[-1.25, 1.7, 1.63]}>
        <boxGeometry args={[0.72, 0.72, 0.08]} />
        <meshStandardMaterial color="#8db3bf" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Bench() {
  const wood = useDetailMaps("planks", 1.6, 0.6);
  return (
    <group>
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[2.6, 0.18, 0.65]} />
        <meshStandardMaterial
          color="#8a633e"
          roughness={1}
          map={wood.map}
          normalMap={wood.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      <mesh castShadow position={[0, 1.1, 0.28]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[2.6, 0.85, 0.14]} />
        <meshStandardMaterial
          color="#8a633e"
          roughness={1}
          map={wood.map}
          normalMap={wood.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      {[-0.95, 0.95].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.25, -0.18]}>
            <boxGeometry args={[0.14, 0.6, 0.14]} />
            <meshStandardMaterial color="#51483d" metalness={0.25} />
          </mesh>
          <mesh position={[x, 0.25, 0.22]}>
            <boxGeometry args={[0.14, 0.6, 0.14]} />
            <meshStandardMaterial color="#51483d" metalness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function BirdBath() {
  const stone = useDetailMaps("stone", 1.2);
  return (
    <group>
      <mesh castShadow position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.18, 0.34, 1.35, 10]} />
        <meshStandardMaterial
          color="#a5a095"
          roughness={1}
          map={stone.map}
          normalMap={stone.normalMap}
          normalScale={[0.55, 0.55]}
        />
      </mesh>
      <mesh castShadow position={[0, 1.38, 0]} scale={[1, 0.25, 1]}>
        <sphereGeometry args={[0.68, 16, 8]} />
        <meshStandardMaterial
          color="#aaa59a"
          roughness={1}
          map={stone.map}
          normalMap={stone.normalMap}
          normalScale={[0.55, 0.55]}
        />
      </mesh>
      <mesh position={[0, 1.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.52, 24]} />
        <meshStandardMaterial color="#74aeb6" roughness={0.3} />
      </mesh>
    </group>
  );
}

export function GardenGnome() {
  return (
    <group>
      <mesh castShadow position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.38, 12, 10]} />
        <meshStandardMaterial color="#47749a" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.88, 0.08]}>
        <sphereGeometry args={[0.3, 12, 10]} />
        <meshStandardMaterial color="#e5ba99" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 1.33, 0]} rotation={[0, 0, 0.08]}>
        <coneGeometry args={[0.38, 1, 12]} />
        <meshStandardMaterial color="#b9483e" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0, 0.7, 0.3]}>
        <coneGeometry args={[0.28, 0.7, 10]} />
        <meshStandardMaterial color="#eee5d5" roughness={1} />
      </mesh>
    </group>
  );
}

export function CompostPile() {
  return (
    <group>
      <mesh castShadow position={[0, 0.4, 0]} scale={[1.4, 0.7, 1.1]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#66523a" roughness={1} />
      </mesh>
      <mesh castShadow position={[-0.3, 0.85, 0.05]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.15, 1.2, 0.1]} />
        <meshStandardMaterial color="#94713c" roughness={1} />
      </mesh>
      <mesh castShadow position={[0.45, 0.7, -0.15]} rotation={[0, 0, 0.65]}>
        <boxGeometry args={[0.12, 0.9, 0.1]} />
        <meshStandardMaterial color="#4e7b3d" roughness={1} />
      </mesh>
    </group>
  );
}

export function Snail() {
  return (
    <group>
      <mesh castShadow position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.18, 10, 8]} />
        <meshStandardMaterial color="#8a9b56" roughness={1} />
      </mesh>
      <mesh castShadow position={[-0.18, 0.28, 0]}>
        <sphereGeometry args={[0.28, 12, 10]} />
        <meshStandardMaterial color="#a76d42" roughness={1} />
      </mesh>
      <mesh position={[0.14, 0.38, 0.09]} rotation={[0.25, 0, -0.2]}>
        <cylinderGeometry args={[0.015, 0.018, 0.35, 5]} />
        <meshStandardMaterial color="#718046" />
      </mesh>
      <mesh position={[0.14, 0.38, -0.09]} rotation={[-0.25, 0, -0.2]}>
        <cylinderGeometry args={[0.015, 0.018, 0.35, 5]} />
        <meshStandardMaterial color="#718046" />
      </mesh>
    </group>
  );
}

export function Wildblumenwiese() {
  const meadow = useDetailMaps("grass", 3);
  const flowers: Array<[Vec3, string]> = [
    [[-1.9, 0, -0.8], "#e56b62"],
    [[-1.2, 0, 0.9], "#f0c75e"],
    [[-0.4, 0, -1.4], "#d978b4"],
    [[0.3, 0, 0.4], "#8d71ba"],
    [[1.1, 0, -0.6], "#f0c75e"],
    [[1.8, 0, 0.8], "#e56b62"],
    [[-2.4, 0, 0.2], "#8d71ba"],
    [[0.9, 0, 1.4], "#d978b4"],
    [[2.3, 0, -0.1], "#efe8d4"],
    [[-0.8, 0, -0.2], "#f0c75e"],
    [[1.6, 0, -1.5], "#8d71ba"],
    [[-1.6, 0, 1.7], "#e56b62"],
  ];
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0.2]} receiveShadow position={[0, -0.01, 0]} scale={[3.6, 2.8, 1]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color="#7fa85f"
          roughness={1}
          map={meadow.map}
          normalMap={meadow.normalMap}
          normalScale={[0.4, 0.4]}
        />
      </mesh>
      {flowers.map(([offset, color], index) => (
        <group key={index} position={offset}>
          <mesh position={[0, 0.26, 0]}>
            <cylinderGeometry args={[0.02, 0.03, 0.45, 5]} />
            <meshStandardMaterial color="#44753d" />
          </mesh>
          <mesh castShadow position={[0, 0.52, 0]}>
            <dodecahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Gemuesebeet() {
  const soil = useDetailMaps("dirt", 1.8, 1.2);
  const lettuce: Vec3[] = [
    [-1.4, 0.22, -0.7],
    [-0.4, 0.22, -0.7],
    [0.6, 0.22, -0.7],
    [1.5, 0.22, -0.7],
  ];
  const carrots: Vec3[] = [
    [-1.5, 0.2, 0.6],
    [-0.6, 0.2, 0.6],
    [0.4, 0.2, 0.6],
    [1.3, 0.2, 0.6],
  ];
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.09, 0]}>
        <boxGeometry args={[4.2, 0.18, 3]} />
        <meshStandardMaterial
          color="#6b4c30"
          roughness={1}
          map={soil.map}
          normalMap={soil.normalMap}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      {lettuce.map((position, index) => (
        <mesh key={`lettuce-${index}`} castShadow position={position} scale={[1, 0.75, 1]}>
          <dodecahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color={index % 2 ? "#5e9448" : "#6da653"} roughness={0.9} />
        </mesh>
      ))}
      {carrots.map((position, index) => (
        <mesh key={`carrot-${index}`} castShadow position={position}>
          <coneGeometry args={[0.1, 0.32, 6]} />
          <meshStandardMaterial color="#4e8340" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function AlteEiche() {
  const bark = useDetailMaps("bark", 2.5, 1.4);
  return (
    <group>
      <Tree position={[0, 0, 0]} scale={2.4} rotation={0.4} />
      <mesh castShadow position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.65, 0.95, 2.2, 9]} />
        <meshStandardMaterial
          color="#6a4a2f"
          roughness={1}
          map={bark.map}
          normalMap={bark.normalMap}
          normalScale={[0.7, 0.7]}
        />
      </mesh>
      <mesh castShadow position={[0.9, 0.12, 0.4]} scale={[1.4, 0.4, 0.8]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#6a4a2f" roughness={1} />
      </mesh>
      <mesh castShadow position={[-0.8, 0.1, -0.3]} scale={[1.2, 0.35, 0.7]}>
        <dodecahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color="#725033" roughness={1} />
      </mesh>
    </group>
  );
}

export function Frog() {
  return (
    <group>
      <mesh castShadow position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.25, 12, 10]} />
        <meshStandardMaterial color="#5e9948" roughness={0.9} />
      </mesh>
      {[-0.13, 0.13].map((x) => (
        <group key={x}>
          <mesh castShadow position={[x, 0.42, 0.08]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#72ad56" />
          </mesh>
          <mesh position={[x, 0.45, 0.16]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#182419" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

