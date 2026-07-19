"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/game/store";
import { getOrCreatePlayerKey } from "@/lib/playerKey";

/** Lightweight save stub — autosave throttled for later Phase 4 polish. */
export function useSaveSync(enabled = true) {
  const timer = useRef<number | null>(null);
  const inventory = useGameStore((s) => s.inventory);
  const droppedItems = useGameStore((s) => s.droppedItems);
  const flags = useGameStore((s) => s.flags);
  const sceneId = useGameStore((s) => s.sceneId);

  useEffect(() => {
    if (!enabled) return;

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      const player_key = getOrCreatePlayerKey();
      if (!player_key) return;
      const payload = useGameStore.getState().getSavePayload();
      try {
        await fetch("/api/save", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ player_key, ...payload }),
        });
      } catch {
        // Offline / not configured — local play still works
      }
    }, 1500);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [enabled, inventory, droppedItems, flags, sceneId]);
}
