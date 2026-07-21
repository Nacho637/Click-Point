"use client";

import { useEffect, useRef } from "react";
import { rasterize } from "@/game/pixel/palette";
import { SCENE_BOUNDS, SCENE_START, TILE } from "@/game/pixel/constants";
import { getTerrain } from "@/game/pixel/terrain";
import { usePixelScene, type Placed } from "@/game/pixel/scenes";
import { HERO_FRAMES, SPR, type Facing } from "@/game/pixel/sprites";
import { useKeyboard } from "@/game/systems/keyboard";
import { useGameStore } from "@/game/store";

const SPEED = 4.2; // Welteinheiten pro Sekunde

type Camera = {
  left: number; // interne Pixel: Weltursprung-Versatz
  top: number;
  minX: number;
  minZ: number;
  zoom: number;
  dpr: number;
  rectW: number;
  rectH: number;
  offX: number; // Letterbox-Versatz (interne Pixel)
  offY: number;
};

export function PixelGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useKeyboard();
  const placed = usePixelScene();
  const placedRef = useRef<Placed[]>(placed);
  placedRef.current = placed;

  const facing = useRef<Facing>("down");
  const walkTimer = useRef(0);
  const cam = useRef<Camera>({
    left: 0, top: 0, minX: 0, minZ: 0, zoom: 3, dpr: 1, rectW: 0, rectH: 0, offX: 0, offY: 0,
  });
  const lastScene = useRef<string>("");

  // Szenenwechsel: Spieler an den Startpunkt setzen.
  const sceneId = useGameStore((s) => s.sceneId);
  useEffect(() => {
    const [sx, sz] = SCENE_START[sceneId];
    useGameStore.getState().setPlayerPosition([sx, 0.35, sz]);
    useGameStore.getState().setNearby(null);
    facing.current = "up";
    lastScene.current = sceneId;
  }, [sceneId]);

  // Interaktion mit dem gerade nächsten Objekt auslösen.
  const interactNearby = (look: boolean) => {
    const st = useGameStore.getState();
    if (st.dialogue || st.choices) return;
    const id = st.nearbyId;
    if (!id) return;
    const obj = placedRef.current.find((p) => p.id === id);
    if (!obj) return;
    if (look && obj.onLook) obj.onLook();
    else obj.onInteract?.();
  };

  // Tastatur: Leertaste/E interagieren, im Dialog weiterschalten.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter" || e.code === "KeyE") {
        const st = useGameStore.getState();
        if (st.dialogue) {
          e.preventDefault();
          st.advanceDialogue();
          return;
        }
        if (st.choices) return; // Auswahl per Klick
        e.preventDefault();
        interactNearby(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Klick auf ein Objekt in Reichweite.
  const handlePointer = (clientX: number, clientY: number, look: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const st = useGameStore.getState();
    if (st.dialogue || st.choices) return;
    const rect = canvas.getBoundingClientRect();
    const c = cam.current;
    // Bildschirm → interne Pixel → Welt
    const ix = (clientX - rect.left) / c.zoom - c.offX + c.left;
    const iy = (clientY - rect.top) / c.zoom - c.offY + c.top;
    const wx = ix / TILE + c.minX;
    const wz = iy / TILE + c.minZ;

    const [pxw, , pzw] = st.playerPosition;
    let best: Placed | null = null;
    let bestZ = -Infinity;
    for (const p of placedRef.current) {
      if (!p.id || !p.radius) continue;
      const d = Math.hypot(wx - p.x, wz - p.z);
      const near = Math.hypot(pxw - p.x, pzw - p.z) <= p.radius + 0.6;
      if (d <= p.radius && near && p.z > bestZ) {
        best = p;
        bestZ = p.z;
      }
    }
    if (!best) return;
    if (look && best.onLook) best.onLook();
    else best.onInteract?.();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let prev = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const st = useGameStore.getState();
      const b = SCENE_BOUNDS[st.sceneId];
      const uiOpen = st.dialogue !== null || st.choices !== null;

      // ── Bewegung ──
      const k = keys.current;
      let vx = (k.right ? 1 : 0) - (k.left ? 1 : 0);
      let vz = (k.backward ? 1 : 0) - (k.forward ? 1 : 0);
      let moving = false;
      if (!uiOpen && (vx !== 0 || vz !== 0)) {
        const len = Math.hypot(vx, vz);
        vx /= len;
        vz /= len;
        let [px, , pz] = st.playerPosition;
        px += vx * SPEED * dt;
        pz += vz * SPEED * dt;
        // Spielfeldgrenzen (Hecke/Wand eingerückt)
        const topInset = st.sceneId === "garden" ? 3 : 3.5;
        px = Math.max(b.minX + 2.5, Math.min(b.minX + b.w - 2.5, px));
        pz = Math.max(b.minZ + topInset, Math.min(b.minZ + b.h - 2.5, pz));
        st.setPlayerPosition([px, 0.35, pz]);
        moving = true;
        if (Math.abs(vx) > Math.abs(vz)) facing.current = vx > 0 ? "right" : "left";
        else facing.current = vz > 0 ? "down" : "up";
      }
      walkTimer.current = moving ? walkTimer.current + dt : 0;

      // ── nächstes interagierbares Objekt bestimmen ──
      const [pxw, , pzw] = st.playerPosition;
      let nearId: string | null = null;
      let nearDist = Infinity;
      for (const p of placedRef.current) {
        if (!p.id || !p.radius) continue;
        const d = Math.hypot(pxw - p.x, pzw - p.z);
        if (d <= p.radius && d < nearDist) {
          nearDist = d;
          nearId = p.id;
        }
      }
      if (nearId !== st.nearbyId) st.setNearby(nearId);

      // ── Kamera ──
      const dpr = window.devicePixelRatio || 1;
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const zoom = Math.max(2, Math.round(cssH / 224));
      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
      }
      const viewW = cssW / zoom;
      const viewH = cssH / zoom;
      const mapW = b.w * TILE;
      const mapH = b.h * TILE;

      let camLeft = (pxw - b.minX) * TILE - viewW / 2;
      let camTop = (pzw - b.minZ) * TILE - viewH / 2;
      let offX = 0;
      let offY = 0;
      if (mapW <= viewW) {
        camLeft = 0;
        offX = (viewW - mapW) / 2;
      } else {
        camLeft = Math.max(0, Math.min(mapW - viewW, camLeft));
      }
      if (mapH <= viewH) {
        camTop = 0;
        offY = (viewH - mapH) / 2;
      } else {
        camTop = Math.max(0, Math.min(mapH - viewH, camTop));
      }

      cam.current = {
        left: camLeft, top: camTop, minX: b.minX, minZ: b.minZ,
        zoom, dpr, rectW: cssW, rectH: cssH, offX, offY,
      };

      // ── Zeichnen ──
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      // Hintergrund (Letterbox / Himmel)
      ctx.fillStyle = st.sceneId === "hallway" ? "#1c1f22" : "#3c7a38";
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.setTransform(dpr * zoom, 0, 0, dpr * zoom, dpr * offX * zoom, dpr * offY * zoom);
      ctx.imageSmoothingEnabled = false;

      const terrain = getTerrain(st.sceneId);
      const sw = Math.min(viewW, mapW);
      const sh = Math.min(viewH, mapH);
      ctx.drawImage(terrain.canvas, camLeft, camTop, sw, sh, 0, 0, sw, sh);

      // Objekte + Spieler tiefen-sortiert
      type Draw = { z: number; fn: () => void };
      const draws: Draw[] = [];
      for (const p of placedRef.current) {
        draws.push({ z: p.z + (p.flat ? -0.4 : 0), fn: () => drawPlaced(ctx, p, camLeft, camTop, b.minX, b.minZ, now) });
      }
      draws.push({
        z: pzw,
        fn: () => drawHero(ctx, pxw, pzw, camLeft, camTop, b.minX, b.minZ, facing.current, walkTimer.current, moving),
      });
      draws.sort((a, d) => a.z - d.z);
      for (const d of draws) d.fn();

      // Marker über dem nächsten Objekt
      if (nearId && !uiOpen) {
        const obj = placedRef.current.find((p) => p.id === nearId);
        if (obj) {
          const sx = (obj.x - b.minX) * TILE - camLeft;
          const sy = (obj.z - b.minZ) * TILE - camTop;
          drawMarker(ctx, sx, sy - 26, now, st.verbMode === "look");
        }
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full touch-none select-none"
      style={{ imageRendering: "pixelated" }}
      onClick={(e) => handlePointer(e.clientX, e.clientY, useGameStore.getState().verbMode === "look")}
      onContextMenu={(e) => {
        e.preventDefault();
        handlePointer(e.clientX, e.clientY, true);
      }}
    />
  );
}

// ── Zeichen-Helfer (in internen Pixeln) ──────────────────────────────────────

function drawPlaced(
  ctx: CanvasRenderingContext2D,
  p: Placed,
  camLeft: number,
  camTop: number,
  minX: number,
  minZ: number,
  now: number,
) {
  const img = rasterize(SPR[p.key]);
  const sx = (p.x - minX) * TILE - camLeft;
  const sy = (p.z - minZ) * TILE - camTop;
  if (p.flat) {
    // flach & mittig auf dem Boden
    const dx = Math.round(sx - img.width / 2);
    const dy = Math.round(sy - img.height / 2);
    ctx.drawImage(img, dx, dy);
    return;
  }
  // aufrecht: Fußpunkt auf der z-Linie, leichte Schwebe für Tiere
  const bob = p.id && (p.key === "bee" || p.key === "sparrow" || p.key === "blackbird")
    ? Math.round(Math.sin(now * 0.004 + p.x) * 1.5)
    : 0;
  const dx = Math.round(sx - img.width / 2);
  const dy = Math.round(sy - img.height + 2 + bob);
  // weicher Schatten
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(Math.round(sx), Math.round(sy), img.width / 3, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.drawImage(img, dx, dy);
}

function drawHero(
  ctx: CanvasRenderingContext2D,
  px: number,
  pz: number,
  camLeft: number,
  camTop: number,
  minX: number,
  minZ: number,
  facing: Facing,
  timer: number,
  moving: boolean,
) {
  const frame = moving && Math.floor(timer * 7) % 2 === 1 ? 1 : 0;
  const img = rasterize(HERO_FRAMES[facing][frame]);
  const sx = (px - minX) * TILE - camLeft;
  const sy = (pz - minZ) * TILE - camTop;
  const dx = Math.round(sx - img.width / 2);
  const dy = Math.round(sy - img.height + 2);

  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(Math.round(sx), Math.round(sy), img.width / 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  if (facing === "left") {
    ctx.save();
    ctx.translate(dx + img.width, dy);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  } else {
    ctx.drawImage(img, dx, dy);
  }
}

function drawMarker(ctx: CanvasRenderingContext2D, sx: number, sy: number, now: number, look: boolean) {
  const bob = Math.round(Math.sin(now * 0.006) * 2);
  const x = Math.round(sx);
  const y = Math.round(sy) + bob;
  ctx.fillStyle = look ? "#8bb7cc" : "#f5cf5a";
  // kleines nach unten zeigendes Dreieck (Pixel)
  ctx.fillRect(x - 3, y, 6, 1);
  ctx.fillRect(x - 2, y + 1, 4, 1);
  ctx.fillRect(x - 1, y + 2, 2, 1);
  ctx.fillStyle = "#2b2320";
  ctx.fillRect(x - 4, y - 1, 8, 1);
}
