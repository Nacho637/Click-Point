"use client";

import { Environment, Lightformer, Sky } from "@react-three/drei";

/** Eine Quelle für Sonnenrichtung: Sky-Shader, Schattenlicht und Env-Sonne bleiben synchron. */
export const SUN_POSITION: [number, number, number] = [-10, 18, 9];

const SUN_LENGTH = Math.hypot(...SUN_POSITION);
const SUN_DIR = SUN_POSITION.map((v) => v / SUN_LENGTH) as [
  number,
  number,
  number,
];

/**
 * Himmel, Nebel und bildbasiertes Umgebungslicht (IBL).
 *
 * Statt einer HDR-Datei rendert <Environment> einmalig einen prozeduralen
 * Licht-Dom aus Lightformern in eine PMREM-Cubemap: kühles Himmelslicht von
 * oben, warme Sonnenscheibe, grüner Boden-Bounce. Das gibt Materialien
 * (besonders roughness/metalness und die Augen) realistische Reflexe ohne
 * ein einziges Asset-Byte.
 */
export function Atmosphere() {
  return (
    <>
      <Sky
        sunPosition={SUN_POSITION}
        distance={200}
        turbidity={6}
        rayleigh={1.1}
        mieCoefficient={0.004}
        mieDirectionalG={0.85}
      />
      <fogExp2 attach="fog" args={["#cfdfe6", 0.01]} />

      <Environment
        resolution={256}
        frames={1}
        background={false}
        environmentIntensity={0.45}
      >
        {/* Himmelsdom: kühles Fülllicht von oben */}
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#bcd8ea"
          scale={[20, 20, 1]}
          position={[0, 12, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        {/* Sonne: warmer Hauptreflex aus der Schattenlicht-Richtung */}
        <Lightformer
          form="circle"
          intensity={9}
          color="#ffdfa0"
          scale={3.5}
          position={[SUN_DIR[0] * 9, SUN_DIR[1] * 9, SUN_DIR[2] * 9]}
          target={[0, 0, 0]}
        />
        {/* Horizontband gegenüber der Sonne: verhindert schwarze Reflex-Seiten */}
        <Lightformer
          form="rect"
          intensity={0.8}
          color="#d7e6ee"
          scale={[24, 5, 1]}
          position={[6, 2.5, -9]}
          target={[0, 2, 0]}
        />
        {/* Boden-Bounce: Wiese färbt Licht von unten leicht grün */}
        <Lightformer
          form="rect"
          intensity={0.7}
          color="#6f9a58"
          scale={[20, 20, 1]}
          position={[0, -8, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </Environment>
    </>
  );
}
