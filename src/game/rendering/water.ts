"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useDetailMaps } from "@/game/rendering/textures";
import { windTime } from "@/game/rendering/wind";

/**
 * Animiertes Wasser: MeshPhysicalMaterial, dessen Normal-Sampling durch
 * zwei gegenläufig scrollende Abtastungen derselben prozeduralen
 * Kräusel-Map ersetzt wird. Zusammen mit der Environment-Reflexion aus
 * <Atmosphere> liest sich das als lebendige, spiegelnde Oberfläche.
 */
export function useWaterMaterial({
  color = "#3f8a96",
  repeat = 3,
}: {
  color?: string;
  repeat?: number;
} = {}) {
  const { normalMap } = useDetailMaps("water", 1);

  return useMemo(() => {
    const material = new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.15,
      metalness: 0,
      normalMap,
      normalScale: new THREE.Vector2(0.6, 0.6),
      envMapIntensity: 1.3,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = windTime;
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          "#include <common>\nuniform float uTime;",
        )
        .replace(
          "#include <normal_fragment_maps>",
          `{
            vec2 uvA = vNormalMapUv * ${repeat.toFixed(2)} + vec2(uTime * 0.021, uTime * 0.013);
            vec2 uvB = vNormalMapUv * ${(repeat * 1.37).toFixed(2)} - vec2(uTime * 0.016, uTime * 0.024);
            vec3 nA = texture2D( normalMap, uvA ).xyz * 2.0 - 1.0;
            vec3 nB = texture2D( normalMap, uvB ).xyz * 2.0 - 1.0;
            vec3 mapN = normalize( vec3( nA.xy + nB.xy, nA.z * nB.z ) );
            mapN.xy *= normalScale;
            normal = normalize( tbn * mapN );
          }`,
        );
    };
    material.customProgramCacheKey = () => `water-${repeat}`;
    return material;
  }, [color, repeat, normalMap]);
}
