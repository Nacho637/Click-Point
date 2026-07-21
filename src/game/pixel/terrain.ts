import type { SceneId } from "@/game/quests/flags";
import { SCENE_BOUNDS, TILE } from "@/game/pixel/constants";

// Baut die komplette Bodenkarte einer Szene einmalig in ein Offscreen-Canvas.
// Später wird nur der sichtbare Ausschnitt pro Frame herauskopiert.

type Terrain = {
  canvas: HTMLCanvasElement;
  minX: number;
  minZ: number;
};

const cache = new Map<string, Terrain>();

/** Deterministischer Pseudo-Zufall pro Kachel (kein Flackern zwischen Frames). */
function hash(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function grassTile(ctx: CanvasRenderingContext2D, px: number, py: number, tx: number, ty: number) {
  const r = hash(tx, ty);
  ctx.fillStyle = r > 0.5 ? "#63b24f" : "#5aa848";
  ctx.fillRect(px, py, TILE, TILE);
  // ein paar Grashalme
  ctx.fillStyle = "#3f8f3f";
  for (let i = 0; i < 3; i++) {
    const bx = px + Math.floor(hash(tx + i * 3, ty) * TILE);
    const by = py + Math.floor(hash(tx, ty + i * 5) * TILE);
    ctx.fillRect(bx, by, 1, 2);
  }
  if (r > 0.93) {
    ctx.fillStyle = "#8ad06a";
    ctx.fillRect(px + 4, py + 6, 2, 2);
  }
}

function dirtTile(ctx: CanvasRenderingContext2D, px: number, py: number, tx: number, ty: number) {
  const r = hash(tx * 2, ty * 2);
  ctx.fillStyle = r > 0.5 ? "#b8935a" : "#ad8850";
  ctx.fillRect(px, py, TILE, TILE);
  ctx.fillStyle = "#8a5a34";
  for (let i = 0; i < 4; i++) {
    const bx = px + Math.floor(hash(tx + i, ty * 2) * TILE);
    const by = py + Math.floor(hash(tx * 2, ty + i) * TILE);
    ctx.fillRect(bx, by, 1, 1);
  }
}

function gravelTile(ctx: CanvasRenderingContext2D, px: number, py: number, tx: number, ty: number) {
  const r = hash(tx * 3, ty * 3);
  ctx.fillStyle = r > 0.5 ? "#8f9498" : "#84898d";
  ctx.fillRect(px, py, TILE, TILE);
  ctx.fillStyle = "#6b7378";
  for (let i = 0; i < 4; i++) {
    const bx = px + Math.floor(hash(tx + i * 2, ty) * TILE);
    const by = py + Math.floor(hash(tx, ty + i * 2) * TILE);
    ctx.fillRect(bx, by, 1, 1);
  }
  if (r > 0.9) {
    ctx.fillStyle = "#a9aeb1";
    ctx.fillRect(px + 5, py + 5, 2, 2);
  }
}

function woodTile(ctx: CanvasRenderingContext2D, px: number, py: number, tx: number, ty: number) {
  ctx.fillStyle = (tx + ty) % 2 === 0 ? "#9c6b3b" : "#8f6136";
  ctx.fillRect(px, py, TILE, TILE);
  // Diele: dunkle Fuge oben
  ctx.fillStyle = "#6e4a26";
  ctx.fillRect(px, py, TILE, 1);
  ctx.fillRect(px, py, 1, TILE);
}

function hedgeStrip(ctx: CanvasRenderingContext2D, px: number, py: number, tx: number, ty: number) {
  ctx.fillStyle = hash(tx, ty) > 0.5 ? "#3c7a38" : "#357033";
  ctx.fillRect(px, py, TILE, TILE);
  ctx.fillStyle = "#5ea653";
  for (let i = 0; i < 5; i++) {
    const bx = px + Math.floor(hash(tx + i, ty) * TILE);
    const by = py + Math.floor(hash(tx, ty + i) * TILE);
    ctx.fillRect(bx, by, 2, 2);
  }
  ctx.fillStyle = "#2b5a2a";
  ctx.fillRect(px, py + TILE - 1, TILE, 1);
}

function wallStrip(ctx: CanvasRenderingContext2D, px: number, py: number) {
  ctx.fillStyle = "#8a9591";
  ctx.fillRect(px, py, TILE, TILE);
  ctx.fillStyle = "#6f7a76";
  ctx.fillRect(px, py, TILE, 2);
  ctx.fillStyle = "#9aa5a1";
  ctx.fillRect(px, py + 6, TILE, 1);
}

function buildGarden(ctx: CanvasRenderingContext2D, cols: number, rows: number, minX: number, minZ: number) {
  for (let ty = 0; ty < rows; ty++) {
    for (let tx = 0; tx < cols; tx++) {
      const px = tx * TILE;
      const py = ty * TILE;
      const wx = minX + tx;
      const wz = minZ + ty;

      // Hecken-Ring an den Rändern, mit Lücke am Tor (Norden, x≈0)
      const edge = tx <= 1 || tx >= cols - 2 || ty <= 1 || ty >= rows - 2;
      const gateGap = ty <= 1 && Math.abs(wx) < 2.5;
      if (edge && !gateGap) {
        hedgeStrip(ctx, px, py, tx, ty);
        continue;
      }

      // Trampelpfad von der Startposition (x≈0) hoch zum Tor
      const onPath = Math.abs(wx) < 1.6 && wz < 9;
      if (onPath) {
        dirtTile(ctx, px, py, tx, ty);
        continue;
      }
      grassTile(ctx, px, py, tx, ty);
    }
  }
}

function buildYard(ctx: CanvasRenderingContext2D, cols: number, rows: number, minX: number, minZ: number) {
  for (let ty = 0; ty < rows; ty++) {
    for (let tx = 0; tx < cols; tx++) {
      const px = tx * TILE;
      const py = ty * TILE;
      const wz = minZ + ty;

      // Hauswand-Streifen ganz im Norden
      if (ty <= 2) {
        wallStrip(ctx, px, py);
        continue;
      }
      // Grasstreifen an den seitlichen Rändern
      const edge = tx <= 1 || tx >= cols - 2 || ty >= rows - 2;
      if (edge) {
        hedgeStrip(ctx, px, py, tx, ty);
        continue;
      }
      void wz;
      gravelTile(ctx, px, py, tx, ty);
    }
  }
}

function buildInterior(ctx: CanvasRenderingContext2D, cols: number, rows: number) {
  for (let ty = 0; ty < rows; ty++) {
    for (let tx = 0; tx < cols; tx++) {
      const px = tx * TILE;
      const py = ty * TILE;
      // Wände: Norden + linke/rechte Kante
      if (ty <= 2 || tx <= 1 || tx >= cols - 2) {
        wallStrip(ctx, px, py);
        continue;
      }
      woodTile(ctx, px, py, tx, ty);
    }
  }
}

export function getTerrain(sceneId: SceneId): Terrain {
  const key = sceneId;
  const hit = cache.get(key);
  if (hit) return hit;

  const b = SCENE_BOUNDS[sceneId];
  const cols = b.w;
  const rows = b.h;
  const canvas = document.createElement("canvas");
  canvas.width = cols * TILE;
  canvas.height = rows * TILE;
  const ctx = canvas.getContext("2d")!;

  if (sceneId === "garden") buildGarden(ctx, cols, rows, b.minX, b.minZ);
  else if (sceneId === "yard") buildYard(ctx, cols, rows, b.minX, b.minZ);
  else buildInterior(ctx, cols, rows);

  const terrain: Terrain = { canvas, minX: b.minX, minZ: b.minZ };
  cache.set(key, terrain);
  return terrain;
}
