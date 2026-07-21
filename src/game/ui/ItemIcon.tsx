"use client";

import { useEffect, useRef } from "react";
import { rasterize } from "@/game/pixel/palette";
import { ITEM_SPRITE } from "@/game/pixel/scenes";
import { SPR } from "@/game/pixel/sprites";
import type { ItemId } from "@/game/items/catalog";

/** Zeichnet den Pixel-Sprite eines Items scharf skaliert in ein kleines Canvas. */
export function ItemIcon({ item, size = 40 }: { item: ItemId; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, size, size);
    const img = rasterize(SPR[ITEM_SPRITE[item]]);
    const scale = Math.floor(Math.min(size / img.width, size / img.height));
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, Math.floor((size - w) / 2), Math.floor((size - h) / 2), w, h);
  }, [item, size]);

  return <canvas ref={ref} style={{ width: size, height: size, imageRendering: "pixelated" }} />;
}
