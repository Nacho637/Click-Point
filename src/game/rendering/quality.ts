"use client";

import { create } from "zustand";

/**
 * Grafik-Qualitätsstufen. Start-Heuristik: Touch-Geräte und schwache CPUs
 * beginnen auf "medium"; der TierMonitor stuft in der Produktion anhand
 * der gemessenen Framerate weiter herab (oder wieder hinauf).
 */
export type QualityTier = "high" | "medium" | "low";

function initialTier(): QualityTier {
  if (typeof window === "undefined") return "high";
  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (coarsePointer || cores <= 4) return "medium";
  return "high";
}

type QualityState = {
  tier: QualityTier;
  decline: () => void;
  incline: () => void;
};

export const useQuality = create<QualityState>((set, get) => ({
  tier: initialTier(),
  decline: () => {
    const { tier } = get();
    if (tier === "high") set({ tier: "medium" });
    else if (tier === "medium") set({ tier: "low" });
  },
  incline: () => {
    // Bewusst nur low → medium: verhindert Auf/Ab-Flattern am oberen Ende.
    if (get().tier === "low") set({ tier: "medium" });
  },
}));

export const GRASS_COUNT: Record<QualityTier, number> = {
  high: 34000,
  medium: 18000,
  low: 8000,
};
