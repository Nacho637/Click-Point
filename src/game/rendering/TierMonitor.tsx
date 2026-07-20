"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { useQuality } from "@/game/rendering/quality";

/**
 * Framerate-Wächter: stuft die Qualität bei anhaltend niedrigen FPS herab
 * und von "low" wieder auf "medium" hinauf. Nur in der Produktion aktiv —
 * im Dev-Container (Software-Rendering) würde er sofort herabstufen und
 * jede visuelle Verifikation verfälschen.
 */
export function TierMonitor() {
  const decline = useQuality((s) => s.decline);
  const incline = useQuality((s) => s.incline);

  if (process.env.NODE_ENV !== "production") return null;
  return (
    <PerformanceMonitor
      bounds={() => [40, 58]}
      flipflops={4}
      onDecline={decline}
      onIncline={incline}
    />
  );
}
