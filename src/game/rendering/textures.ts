"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Prozedurale Detail-Texturen, zur Laufzeit per Canvas erzeugt.
 *
 * Die Diffuse-Maps sind bewusst neutral-hell (Luminanz um 1.0): Sie
 * multiplizieren sich mit der bestehenden Materialfarbe, sodass die
 * Low-Poly-Farbpalette unangetastet bleibt und nur Struktur dazukommt.
 * Dazu passende Normal-Maps aus demselben Höhenfeld für echtes Relief.
 * Kein einziges Asset-Byte im Repo, kein Netzwerk-Fetch.
 */

export type DetailKind = "grass" | "dirt" | "bark" | "planks" | "stone";

const SIZE = 512;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Nahtlos kachelbares Value-Noise: Gitterwerte mit Modulo-Wrap, bilinear interpoliert. */
function addNoiseOctave(
  field: Float32Array,
  grid: number,
  amplitude: number,
  rand: () => number,
  stretchX = 1,
  stretchY = 1,
) {
  const lattice = new Float32Array(grid * grid);
  for (let i = 0; i < lattice.length; i++) lattice[i] = rand();
  const smooth = (t: number) => t * t * (3 - 2 * t);

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const gx = ((x * stretchX) / SIZE) * grid;
      const gy = ((y * stretchY) / SIZE) * grid;
      const x0 = Math.floor(gx) % grid;
      const y0 = Math.floor(gy) % grid;
      const x1 = (x0 + 1) % grid;
      const y1 = (y0 + 1) % grid;
      const fx = smooth(gx - Math.floor(gx));
      const fy = smooth(gy - Math.floor(gy));
      const v =
        lattice[y0 * grid + x0] * (1 - fx) * (1 - fy) +
        lattice[y0 * grid + x1] * fx * (1 - fy) +
        lattice[y1 * grid + x0] * (1 - fx) * fy +
        lattice[y1 * grid + x1] * fx * fy;
      field[y * SIZE + x] += (v - 0.5) * amplitude;
    }
  }
}

/** Kleine radiale Beule/Delle ins Höhenfeld stempeln (Kiesel, Noppen). */
function stampBump(
  field: Float32Array,
  cx: number,
  cy: number,
  radius: number,
  height: number,
) {
  const r2 = radius * radius;
  const x0 = Math.floor(cx - radius);
  const y0 = Math.floor(cy - radius);
  for (let y = y0; y <= cy + radius; y++) {
    for (let x = x0; x <= cx + radius; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;
      const wx = ((x % SIZE) + SIZE) % SIZE;
      const wy = ((y % SIZE) + SIZE) % SIZE;
      field[wy * SIZE + wx] += height * (1 - d2 / r2) ** 2;
    }
  }
}

type Built = { height: Float32Array; tint?: Float32Array };

function buildHeightField(kind: DetailKind): Built {
  const rand = mulberry32(
    { grass: 101, dirt: 202, bark: 303, planks: 404, stone: 505 }[kind],
  );
  const h = new Float32Array(SIZE * SIZE);

  switch (kind) {
    case "grass": {
      addNoiseOctave(h, 4, 0.34, rand);
      addNoiseOctave(h, 8, 0.22, rand);
      addNoiseOctave(h, 32, 0.14, rand);
      // Kurze vertikale Halm-Striche für die typische Rasen-Anmutung.
      for (let i = 0; i < 2600; i++) {
        const x = Math.floor(rand() * SIZE);
        const y = Math.floor(rand() * SIZE);
        const len = 3 + Math.floor(rand() * 7);
        const amp = (rand() - 0.42) * 0.22;
        for (let j = 0; j < len; j++) {
          const wy = (y + j) % SIZE;
          h[wy * SIZE + x] += amp;
        }
      }
      break;
    }
    case "dirt": {
      addNoiseOctave(h, 3, 0.3, rand);
      addNoiseOctave(h, 9, 0.16, rand);
      addNoiseOctave(h, 40, 0.1, rand);
      // Eingedrückte Kiesel und kleine Erdklumpen.
      for (let i = 0; i < 240; i++) {
        stampBump(
          h,
          rand() * SIZE,
          rand() * SIZE,
          2 + rand() * 5,
          (rand() - 0.35) * 0.5,
        );
      }
      break;
    }
    case "bark": {
      // Vertikal gestreckte Rillen: X fein, Y grob.
      addNoiseOctave(h, 12, 0.42, rand, 1, 0.18);
      addNoiseOctave(h, 28, 0.2, rand, 1, 0.3);
      addNoiseOctave(h, 6, 0.18, rand);
      break;
    }
    case "planks": {
      const boards = 4;
      const boardH = SIZE / boards;
      // Pro Brett ein Helligkeits-Offset + horizontale Maserung.
      const offsets = Array.from({ length: boards }, () => (rand() - 0.5) * 0.24);
      addNoiseOctave(h, 20, 0.18, rand, 0.25, 1);
      for (let y = 0; y < SIZE; y++) {
        const b = Math.floor(y / boardH);
        const inBoard = y - b * boardH;
        for (let x = 0; x < SIZE; x++) {
          let v = offsets[b];
          // Dunkle Fuge an den Brettkanten.
          if (inBoard < 3 || inBoard > boardH - 3) v -= 0.5;
          h[y * SIZE + x] += v;
        }
      }
      // Vereinzelte Astlöcher.
      for (let i = 0; i < 7; i++) {
        stampBump(h, rand() * SIZE, rand() * SIZE, 4 + rand() * 6, -0.5);
      }
      break;
    }
    case "stone": {
      addNoiseOctave(h, 3, 0.4, rand);
      addNoiseOctave(h, 10, 0.2, rand);
      addNoiseOctave(h, 44, 0.12, rand);
      for (let i = 0; i < 130; i++) {
        stampBump(
          h,
          rand() * SIZE,
          rand() * SIZE,
          1.5 + rand() * 3,
          (rand() - 0.5) * 0.4,
        );
      }
      break;
    }
  }
  return { height: h };
}

function makeCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D-Canvas nicht verfügbar");
  return [canvas, ctx];
}

function diffuseFrom(height: Float32Array, contrast: number): THREE.CanvasTexture {
  const [canvas, ctx] = makeCanvas();
  const img = ctx.createImageData(SIZE, SIZE);
  for (let i = 0; i < height.length; i++) {
    // Mittelwert nahe Weiß, damit die Multiplikation mit der Materialfarbe
    // die Palette nicht abdunkelt — das Detail lebt von den dunklen Ausschlägen.
    const v = Math.max(0, Math.min(255, Math.round(246 + height[i] * contrast * 255)));
    img.data[i * 4] = v;
    img.data[i * 4 + 1] = v;
    img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function normalFrom(height: Float32Array, strength: number): THREE.CanvasTexture {
  const [canvas, ctx] = makeCanvas();
  const img = ctx.createImageData(SIZE, SIZE);
  const at = (x: number, y: number) =>
    height[(((y % SIZE) + SIZE) % SIZE) * SIZE + (((x % SIZE) + SIZE) % SIZE)];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
      const inv = 1 / Math.hypot(dx, dy, 1);
      const i = (y * SIZE + x) * 4;
      img.data[i] = Math.round((-dx * inv * 0.5 + 0.5) * 255);
      img.data[i + 1] = Math.round((dy * inv * 0.5 + 0.5) * 255);
      img.data[i + 2] = Math.round(inv * 255);
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

const DIFFUSE_CONTRAST: Record<DetailKind, number> = {
  grass: 0.34,
  dirt: 0.3,
  bark: 0.34,
  planks: 0.3,
  stone: 0.3,
};

const NORMAL_STRENGTH: Record<DetailKind, number> = {
  grass: 1.6,
  dirt: 2.2,
  bark: 3.0,
  planks: 2.4,
  stone: 2.6,
};

const cache = new Map<DetailKind, { map: THREE.CanvasTexture; normalMap: THREE.CanvasTexture }>();

function getBaseMaps(kind: DetailKind) {
  let entry = cache.get(kind);
  if (!entry) {
    const { height } = buildHeightField(kind);
    entry = {
      map: diffuseFrom(height, DIFFUSE_CONTRAST[kind]),
      normalMap: normalFrom(height, NORMAL_STRENGTH[kind]),
    };
    cache.set(kind, entry);
  }
  return entry;
}

/**
 * Detail-Maps für ein Material: geteilte Basistextur, eigener Repeat.
 * Clones teilen sich das Pixel-Bild (eine GPU-Textur pro Kind).
 */
export function useDetailMaps(
  kind: DetailKind,
  repeatX: number,
  repeatY: number = repeatX,
) {
  return useMemo(() => {
    const base = getBaseMaps(kind);
    const map = base.map.clone();
    map.repeat.set(repeatX, repeatY);
    const normalMap = base.normalMap.clone();
    normalMap.repeat.set(repeatX, repeatY);
    return { map, normalMap };
  }, [kind, repeatX, repeatY]);
}
