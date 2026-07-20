"use client";

import { StatsGl } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

function DrawCallLogger() {
  const gl = useThree((s) => s.gl);
  const last = useRef(0);

  useEffect(() => {
    // Der EffectComposer rendert mehrere Passes pro Frame; autoReset würde
    // nach jedem Pass nullen. Manuell einmal pro Frame resetten, damit die
    // Summe über alle Passes sichtbar wird.
    gl.info.autoReset = false;
    return () => {
      gl.info.autoReset = true;
    };
  }, [gl]);

  useFrame(() => {
    const now = performance.now();
    if (now - last.current >= 2000) {
      last.current = now;
      const { calls, triangles } = gl.info.render;
      console.info(`[perf] draw calls: ${calls}, triangles: ${triangles}`);
    }
    gl.info.reset();
  });

  return null;
}

/** Perf-HUD nur im Dev-Modus und nur mit ?perf in der URL — bleibt aus dem Prod-Pfad raus. */
export function DevPerf() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      window.location.search.includes("perf")
    ) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;
  return (
    <>
      <StatsGl className="stats-gl" />
      <DrawCallLogger />
    </>
  );
}
