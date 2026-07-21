import type { SceneId } from "@/game/quests/flags";

/** Kantenlänge einer Weltkachel in internen Pixeln. */
export const TILE = 16;

export type WorldBounds = {
  minX: number;
  minZ: number;
  /** Breite/Höhe in Welteinheiten. */
  w: number;
  h: number;
};

/** Bewegungsgrenzen & Kartengröße je Szene (in Welteinheiten). */
export const SCENE_BOUNDS: Record<SceneId, WorldBounds> = {
  garden: { minX: -18, minZ: -12, w: 36, h: 30 },
  yard: { minX: -18, minZ: -12, w: 36, h: 30 },
  hallway: { minX: -14, minZ: -12, w: 28, h: 26 },
  upstairs: { minX: -14, minZ: -12, w: 28, h: 26 },
  ending: { minX: -14, minZ: -12, w: 28, h: 26 },
};

/** Startposition des Spielers beim Betreten einer Szene. */
export const SCENE_START: Record<SceneId, [number, number]> = {
  garden: [0, 8],
  yard: [0, 9],
  hallway: [0, 7],
  upstairs: [0, 7],
  ending: [0, 7],
};
