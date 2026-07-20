"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GRASS_COUNT, useQuality } from "@/game/rendering/quality";
import { mulberry32 } from "@/game/rendering/textures";
import { applyWind } from "@/game/rendering/wind";

/**
 * Zehntausende instanzierte Grashalme mit Wind-Shader — der größte
 * Einzelschritt weg vom "flachen Teppich". Ein Draw Call, kein
 * Schattenwurf, Halme empfangen aber Schatten und Umgebungslicht.
 */

const FIELD_RADIUS = 24;
const BLADE_HEIGHT = 0.32;

/** Gedrehte Ellipsen der Erdwege (aus GardenGround übernommen). */
const PATH_ELLIPSES: Array<[number, number, number, number, number]> = [
  // [cx, cz, rx, rz, rotY]
  [0, -1, 1.55, 10.7, 0],
  [-4.9, -1.8, 1.15, 6.2, -0.55],
  [5.5, -3.1, 1.1, 6, 0.65],
];

/** Kreisförmige Aussparungen: Teich, Schuppen, Beete, Bodenobjekte/Quest-Items. */
const CLEARINGS: Array<[number, number, number]> = [
  // [cx, cz, radius]
  [-7.9, -2.2, 3.1], // Teich
  [8.6, -7.3, 3.2], // Schuppen
  [3.7, 4.1, 1.5], // Bank
  [-3.8, 0.5, 1.0], // Vogelbad
  [9.5, 7.6, 1.5], // Kompost
  [14, 7, 2.8], // Gemüsebeet
  [2.5, 16, 1.7], // Alte Eiche (Stammfuß)
  [-6.8, 4.2, 1.9], // Blumenbeete
  [6.7, 2.4, 1.9],
  [-4.6, -6.5, 1.9],
  [1.35, -9.55, 1.0], // Grabestelle
  [4.8, 7.5, 0.9], // Krümel
  [-9.5, 0.2, 0.9], // Glatter Stein
  [-3.4, 9.7, 0.9], // Rotes Blatt
  [8.7, 0.7, 0.9], // Kronkorken
  [-8.9, 6.3, 1.2], // Gießkanne
  [5.7, -7.1, 1.6], // Schubkarre
];

function isBlocked(x: number, z: number): boolean {
  for (const [cx, cz, rx, rz, rot] of PATH_ELLIPSES) {
    const dx = x - cx;
    const dz = z - cz;
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);
    const lx = dx * cos - dz * sin;
    const lz = dx * sin + dz * cos;
    // Etwas Rand (+0.25), damit Halme nicht in die Wegkante ragen.
    if ((lx / (rx + 0.25)) ** 2 + (lz / (rz + 0.25)) ** 2 < 1) return true;
  }
  for (const [cx, cz, r] of CLEARINGS) {
    const dx = x - cx;
    const dz = z - cz;
    if (dx * dx + dz * dz < r * r) return true;
  }
  return false;
}

function buildBladeGeometry(): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  // Ein einzelnes, leicht gebogenes Dreieck pro Halm: billigst möglich.
  const positions = new Float32Array([
    -0.04, 0, 0,
    0.04, 0, 0,
    0.005, BLADE_HEIGHT, 0.02,
  ]);
  // Normale zeigt nach oben: Halme shaden wie der Rasen darunter —
  // keine dunklen Rückseiten, klassischer Stilisierte-Wiese-Trick.
  const normals = new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0]);
  // Wurzel etwas dunkler als der Rasen, Spitze deutlich heller —
  // Farbverlauf über Vertex-Colors, Werte > 1 lassen Spitzen leuchten.
  const colors = new Float32Array([
    0.62, 0.78, 0.5,
    0.62, 0.78, 0.5,
    1.28, 1.42, 1.0,
  ]);
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return g;
}

export function GrassField() {
  const tier = useQuality((s) => s.tier);
  const count = GRASS_COUNT[tier];
  const ref = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => buildBladeGeometry(), []);
  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: "#7ba55c",
      roughness: 0.95,
      vertexColors: true,
      side: THREE.DoubleSide,
    });
    applyWind(m, { amplitude: 0.055, heightRange: [0, BLADE_HEIGHT] });
    return m;
  }, []);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const rand = mulberry32(7777);
    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const euler = new THREE.Euler();
    const scale = new THREE.Vector3();

    let placed = 0;
    let guard = 0;
    while (placed < count && guard++ < count * 25) {
      const r = FIELD_RADIUS * Math.sqrt(rand());
      const angle = rand() * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      if (isBlocked(x, z)) continue;

      euler.set((rand() - 0.5) * 0.3, rand() * Math.PI * 2, (rand() - 0.5) * 0.3);
      quat.setFromEuler(euler);
      const s = 0.65 + rand() * 0.75;
      pos.set(x, 0, z);
      scale.set(s, s * (0.75 + rand() * 0.6), s);
      matrix.compose(pos, quat, scale);
      mesh.setMatrixAt(placed, matrix);
      placed++;
    }
    mesh.count = placed;
    mesh.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, count]}
      receiveShadow
      frustumCulled={false}
      // Gras darf niemals Klicks abfangen (und 34k Instanzen zu raycasten
      // würde jeden Pointer-Move teuer machen).
      raycast={() => null}
    />
  );
}
