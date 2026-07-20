"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useDetailMaps } from "@/game/rendering/textures";
import { applyWind } from "@/game/rendering/wind";

/**
 * Die Baum-/Buschgrenze als Instanz-Meshes: statt ~200 einzelner Meshes
 * (28 Bäume x 4 Teile + 30 Büsche x 3 Teile) nur 7 Draw Calls.
 * Silhouetten, Positionen und Farben sind identisch zur alten
 * JSX-Version; dazu kommt ein sanftes Wind-Schwanken der Kronen.
 */

type Vec3 = [number, number, number];
type TreeEntry = [Vec3, number, number]; // [position, scale, rotationY]
type BushEntry = [Vec3, number, string]; // [position, scale, color]

type Part = {
  offset: Vec3;
  rotation?: Vec3;
};

function composeMatrices(
  entries: Array<{ position: Vec3; scale: number; rotationY: number }>,
  part: Part,
): THREE.Matrix4[] {
  const result: THREE.Matrix4[] = [];
  const group = new THREE.Matrix4();
  const local = new THREE.Matrix4();
  const localQuat = new THREE.Quaternion();
  for (const { position, scale, rotationY } of entries) {
    localQuat.setFromEuler(
      new THREE.Euler(...(part.rotation ?? ([0, 0, 0] as Vec3))),
    );
    local.compose(
      new THREE.Vector3(...part.offset),
      localQuat,
      new THREE.Vector3(1, 1, 1),
    );
    group.compose(
      new THREE.Vector3(...position),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotationY, 0)),
      new THREE.Vector3(scale, scale, scale),
    );
    result.push(group.clone().multiply(local));
  }
  return result;
}

function InstancedPart({
  matrices,
  colors,
  geometry,
  material,
  castShadow = true,
}: {
  matrices: THREE.Matrix4[];
  colors?: string[];
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  castShadow?: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    if (colors) {
      const c = new THREE.Color();
      colors.forEach((hex, i) => mesh.setColorAt(i, c.set(hex)));
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [matrices, colors]);

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, matrices.length]}
      castShadow={castShadow}
      receiveShadow
      frustumCulled={false}
      // Deko-Grenze: nie Klicks abfangen, Instanz-Raycasts sparen.
      raycast={() => null}
    />
  );
}

const CROWN_SWAY = { amplitude: 0.05, heightRange: [-1.2, 1.4] as [number, number], frequency: 0.8 };

export function InstancedForest({
  trees,
  bushes,
}: {
  trees: TreeEntry[];
  bushes: BushEntry[];
}) {
  const bark = useDetailMaps("bark", 2, 1.2);

  const treeEntries = useMemo(
    () =>
      trees.map(([position, scale, rotationY]) => ({ position, scale, rotationY })),
    [trees],
  );
  const bushEntries = useMemo(
    () =>
      bushes.map(([position, scale]) => ({ position, scale, rotationY: 0 })),
    [bushes],
  );
  const bushColors = useMemo(() => bushes.map(([, , color]) => color), [bushes]);

  const geometries = useMemo(
    () => ({
      trunk: new THREE.CylinderGeometry(0.34, 0.5, 2.9, 7),
      crownA: new THREE.DodecahedronGeometry(1.25, 0),
      crownB: new THREE.DodecahedronGeometry(1.4, 0),
      crownC: new THREE.IcosahedronGeometry(1.15, 1),
      bushA: new THREE.DodecahedronGeometry(0.62, 0),
      bushB: new THREE.DodecahedronGeometry(0.72, 0),
      bushC: new THREE.IcosahedronGeometry(0.55, 0),
    }),
    [],
  );

  const materials = useMemo(() => {
    const trunk = new THREE.MeshStandardMaterial({
      color: "#725033",
      roughness: 0.95,
      map: bark.map,
      normalMap: bark.normalMap,
      normalScale: new THREE.Vector2(0.6, 0.6),
    });
    const crown = (color: string) => {
      const m = new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
      applyWind(m, CROWN_SWAY);
      return m;
    };
    const bush = (color: string) => {
      const m = new THREE.MeshStandardMaterial({ color, roughness: 0.95 });
      applyWind(m, { amplitude: 0.03, heightRange: [-0.4, 0.7], frequency: 1.1 });
      return m;
    };
    return {
      trunk,
      crownA: crown("#4f853f"),
      crownB: crown("#5d9548"),
      crownC: crown("#6aa252"),
      bushTinted: bush("#ffffff"),
      bushFixed: bush("#548a43"),
    };
  }, [bark]);

  const treeParts = useMemo(
    () => ({
      trunk: composeMatrices(treeEntries, { offset: [0, 1.45, 0] }),
      crownA: composeMatrices(treeEntries, {
        offset: [-0.6, 3.05, 0.05],
        rotation: [0.1, 0, -0.1],
      }),
      crownB: composeMatrices(treeEntries, { offset: [0.55, 3.25, -0.15] }),
      crownC: composeMatrices(treeEntries, { offset: [0.1, 4.05, 0.15] }),
    }),
    [treeEntries],
  );
  const bushParts = useMemo(
    () => ({
      a: composeMatrices(bushEntries, { offset: [-0.38, 0.5, 0] }),
      b: composeMatrices(bushEntries, { offset: [0.3, 0.62, -0.08] }),
      c: composeMatrices(bushEntries, { offset: [0.05, 0.42, 0.48] }),
    }),
    [bushEntries],
  );

  return (
    <group>
      <InstancedPart matrices={treeParts.trunk} geometry={geometries.trunk} material={materials.trunk} />
      <InstancedPart matrices={treeParts.crownA} geometry={geometries.crownA} material={materials.crownA} />
      <InstancedPart matrices={treeParts.crownB} geometry={geometries.crownB} material={materials.crownB} />
      <InstancedPart matrices={treeParts.crownC} geometry={geometries.crownC} material={materials.crownC} />
      <InstancedPart matrices={bushParts.a} colors={bushColors} geometry={geometries.bushA} material={materials.bushTinted} />
      <InstancedPart matrices={bushParts.b} colors={bushColors} geometry={geometries.bushB} material={materials.bushTinted} />
      <InstancedPart matrices={bushParts.c} geometry={geometries.bushC} material={materials.bushFixed} />
    </group>
  );
}
