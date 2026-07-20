"use client";

import {
  Bloom,
  EffectComposer,
  N8AO,
  SMAA,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useQuality } from "@/game/rendering/quality";

/**
 * Post-Processing-Kette. Reihenfolge: AO → Bloom → Vignette → Tone Mapping.
 *
 * Das Canvas läuft mit `flat` (kein eingebautes Tone Mapping), damit ACES
 * genau einmal hier am Ende der Kette greift — sonst würden Farben doppelt
 * komprimiert. Bloom-Threshold liegt über 1: nur echt emissive Objekte
 * (Interactable-Marker) glühen, niemals sonnenbeschienene Flächen.
 * Kein Depth of Field — Klick-Lesbarkeit geht vor Filmlook.
 *
 * Qualitätsstufen: "low" verzichtet auf N8AO und MSAA (SMAA übernimmt),
 * "medium" rechnet AO in niedriger Qualität mit halbem MSAA.
 */
export function Effects() {
  const tier = useQuality((s) => s.tier);

  const effects =
    tier === "low"
      ? [<SMAA key="smaa" />]
      : [
          <N8AO
            key="n8ao"
            halfRes
            aoRadius={1.5}
            intensity={2.5}
            distanceFalloff={0.4}
            quality={tier === "high" ? "medium" : "low"}
          />,
        ];

  return (
    <EffectComposer
      key={tier}
      multisampling={tier === "high" ? 4 : tier === "medium" ? 2 : 0}
    >
      {[
        ...effects,
        <Bloom key="bloom" mipmapBlur luminanceThreshold={1.05} intensity={0.35} />,
        <Vignette key="vignette" eskil={false} offset={0.28} darkness={0.55} />,
        <ToneMapping key="tonemap" mode={ToneMappingMode.ACES_FILMIC} />,
      ]}
    </EffectComposer>
  );
}
