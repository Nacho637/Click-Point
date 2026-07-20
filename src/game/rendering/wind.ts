"use client";

import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

/**
 * Ein einziges geteiltes Zeit-Uniform für alle Wind-/Wasser-Shader:
 * ein useFrame aktualisiert es, alle Materialien lesen dieselbe Referenz.
 */
export const windTime = { value: 0 };

export function WindDriver() {
  useFrame((state) => {
    windTime.value = state.clock.elapsedTime;
  });
  return null;
}

type WindOptions = {
  /** Maximale seitliche Auslenkung in Weltmetern. */
  amplitude: number;
  /** position.y-Spanne, über die die Auslenkung von 0 auf 1 anwächst. */
  heightRange: [number, number];
  /** Grundfrequenz des Schwankens. */
  frequency?: number;
};

/**
 * Injiziert Wind-Auslenkung in ein Standard-Material (onBeforeCompile,
 * keine Zusatz-Dependency). Instanzen bekommen ihre Phase aus der
 * Instanz-Weltposition, damit nicht alles synchron wippt.
 */
export function applyWind(
  material: THREE.Material,
  { amplitude, heightRange, frequency = 1.5 }: WindOptions,
) {
  const [minY, maxY] = heightRange;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = windTime;
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform float uTime;",
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        {
          #ifdef USE_INSTANCING
            vec2 windRef = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);
          #else
            vec2 windRef = position.xz;
          #endif
          float windPhase = windRef.x * 0.35 + windRef.y * 0.45;
          float windBend = pow(clamp((position.y - ${minY.toFixed(3)}) / ${(maxY - minY).toFixed(3)}, 0.0, 1.0), 1.6);
          float windGust = sin(uTime * ${frequency.toFixed(3)} + windPhase)
            + 0.45 * sin(uTime * ${(frequency * 2.63).toFixed(3)} + windPhase * 1.7);
          transformed.x += windBend * windGust * ${amplitude.toFixed(3)};
          transformed.z += windBend * cos(uTime * ${(frequency * 0.77).toFixed(3)} + windPhase) * ${(amplitude * 0.55).toFixed(3)};
        }`,
      );
  };
  // Cache-Key, damit three die Shader-Varianten nicht verwechselt.
  material.customProgramCacheKey = () =>
    `wind-${amplitude}-${minY}-${maxY}-${frequency}`;
}
