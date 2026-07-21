// Gemeinsame Pixel-Palette im GBA-/Pokémon-Stil. Jeder Sprite ist ein Raster aus
// einzelnen Zeichen; jedes Zeichen verweist auf eine Farbe hier. "." ist transparent.

export const TRANSPARENT = ".";

export const PALETTE: Record<string, string> = {
  // Neutraltöne
  o: "#f4f4ec", // Weiß
  L: "#dfe7d8", // Wolken-/Off-Weiß
  k: "#2b2320", // Outline (dunkelbraun)
  K: "#100c0a", // Schwarz
  x: "#4a4038", // Schatten

  // Gras
  a: "#8ad06a", // hell
  g: "#63b24f", // mittel
  G: "#3f8f3f", // dunkel

  // Wasser
  b: "#67bae6",
  B: "#3a7fc0",
  n: "#275f9c",

  // Erde / Weg
  d: "#dcbd7c", // Sand hell
  D: "#b8935a", // Weg
  e: "#8a5a34", // dunkle Erde

  // Holz
  w: "#9c6b3b",
  m: "#6e4a26",

  // Fell / Creme (Meerschweinchen)
  f: "#eccfa2",
  F: "#cf9f6b",
  c: "#a8784f",
  p: "#f2b8a8", // Ohr-innen / Wange
  P: "#e08a7a", // Nase

  // Stein / Grau
  s: "#9aa2a6",
  S: "#6b7378",
  z: "#464c50",

  // Laub / Baum
  t: "#5ea653",
  T: "#3c7a38",
  u: "#7a5233", // Stamm
  U: "#5a3a1e", // Stamm dunkel

  // Akzente
  y: "#f5cf5a", // Gelb (Highlight, Schnabel, Schlüssel)
  Y: "#d8a83c", // Gold dunkel
  r: "#d1503f", // Rot
  R: "#9c3326", // Rot dunkel
  i: "#5a86d0", // Blau
  I: "#39599c", // Blau dunkel
  v: "#8a5ea8", // Lila
  q: "#e08a3c", // Orange (Fuchs)
  Q: "#b9531f", // Orange dunkel
  j: "#b95542", // Blatt-Rot
  E: "#2a1c14", // Auge
};

export type Sprite = {
  /** Breite in Pixeln (Zeichen pro Zeile). */
  w: number;
  /** Höhe in Pixeln (Anzahl Zeilen). */
  h: number;
  /** Zeilen aus Palettenzeichen; "." = transparent. */
  rows: string[];
  /** Optionale Palettenüberschreibung (z. B. für Farbvarianten). */
  palette?: Record<string, string>;
};

const cache = new WeakMap<Sprite, HTMLCanvasElement>();

/** Rastert einen Sprite einmalig in ein Offscreen-Canvas (1 Zeichen = 1 Pixel). */
export function rasterize(sprite: Sprite): HTMLCanvasElement {
  const hit = cache.get(sprite);
  if (hit) return hit;

  const canvas = document.createElement("canvas");
  canvas.width = sprite.w;
  canvas.height = sprite.h;
  const ctx = canvas.getContext("2d")!;
  const pal = sprite.palette
    ? { ...PALETTE, ...sprite.palette }
    : PALETTE;

  for (let y = 0; y < sprite.h; y++) {
    const row = sprite.rows[y] ?? "";
    for (let px = 0; px < sprite.w; px++) {
      const ch = row[px] ?? TRANSPARENT;
      if (ch === TRANSPARENT || ch === " ") continue;
      const color = pal[ch];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(px, y, 1, 1);
    }
  }

  cache.set(sprite, canvas);
  return canvas;
}

/** Hilfsfunktion: baut einen Sprite aus einem mehrzeiligen String. */
export function sprite(art: string, palette?: Record<string, string>): Sprite {
  const rows = art.replace(/^\n/, "").replace(/\n$/, "").split("\n");
  const w = rows.reduce((max, r) => Math.max(max, r.length), 0);
  return { w, h: rows.length, rows, palette };
}
