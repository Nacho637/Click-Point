"use client";

import {
  Bloom,
  EffectComposer,
  N8AO,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/**
 * Post-Processing-Kette. Reihenfolge: AO → Bloom → Vignette → Tone Mapping.
 *
 * Das Canvas läuft mit `flat` (kein eingebautes Tone Mapping), damit ACES
 * genau einmal hier am Ende der Kette greift — sonst würden Farben doppelt
 * komprimiert. Bloom-Threshold liegt über 1: nur echt emissive Objekte
 * (Interactable-Marker) glühen, niemals sonnenbeschienene Flächen.
 * Kein Depth of Field — Klick-Lesbarkeit geht vor Filmlook.
 */
export function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <N8AO
        halfRes
        aoRadius={1.5}
        intensity={2.5}
        distanceFalloff={0.4}
        quality="medium"
      />
      <Bloom mipmapBlur luminanceThreshold={1.05} intensity={0.35} />
      <Vignette eskil={false} offset={0.28} darkness={0.55} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
