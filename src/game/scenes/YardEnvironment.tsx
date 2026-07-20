"use client";

type Vec3 = [number, number, number];

/** Betongrauer Parkplatz-Boden mit Markierung, Rissen und einer Hang-Andeutung. */
export function YardGround() {
  const cracks: Array<[Vec3, number, number]> = [
    [[-3, 0.002, 2], 0.6, 5.5],
    [[5.5, 0.002, 4.5], -0.4, 4],
    [[-8, 0.002, -3], 0.2, 6],
    [[2, 0.002, -6], 1.1, 3.5],
  ];
  return (
    <group>
      {/* Asphaltfläche */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.04, 0]}>
        <circleGeometry args={[26, 56]} />
        <meshStandardMaterial color="#7b7d80" roughness={1} />
      </mesh>
      {/* Ölig-dunkle Verfärbungen für Parkplatz-Stimmung */}
      <mesh rotation={[-Math.PI / 2, 0, 0.3]} receiveShadow position={[8, -0.03, -3]} scale={[3.2, 2.2, 1]}>
        <circleGeometry args={[1, 28]} />
        <meshStandardMaterial color="#6b6d70" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, -0.2]} receiveShadow position={[-6, -0.03, 5]} scale={[3.6, 2.8, 1]}>
        <circleGeometry args={[1, 28]} />
        <meshStandardMaterial color="#83858a" roughness={1} />
      </mesh>
      {/* Weiße Parkplatz-Markierung */}
      {[-2.4, 2.4].map((x) => (
        <mesh
          key={x}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, -0.02, 1.5]}
          scale={[0.16, 8.5, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#c9cbc7" roughness={1} />
        </mesh>
      ))}
      {/* Feine Risse */}
      {cracks.map(([position, rotation, length], index) => (
        <mesh
          key={index}
          rotation={[-Math.PI / 2, 0, rotation]}
          position={position}
          scale={[0.06, length, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#4f5153" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/** Die Hauswand am Nordrand mit Tür, Fenster und dem kleinen Loch am Wandfuß. */
export function HouseWall({ holeOpen }: { holeOpen: boolean }) {
  return (
    <group position={[0, 0, -10.6]}>
      {/* Wandfläche */}
      <mesh castShadow receiveShadow position={[0, 3, 0]}>
        <boxGeometry args={[30, 6, 0.6]} />
        <meshStandardMaterial color="#c7b8a1" roughness={0.95} />
      </mesh>
      {/* Sockel-Streifen */}
      <mesh position={[0, 0.5, 0.32]}>
        <boxGeometry args={[30, 1, 0.05]} />
        <meshStandardMaterial color="#8f8371" roughness={1} />
      </mesh>
      {/* Dachkante */}
      <mesh castShadow position={[0, 6.1, 0.15]}>
        <boxGeometry args={[30, 0.5, 1.1]} />
        <meshStandardMaterial color="#6f5a44" roughness={1} />
      </mesh>

      {/* Haustür (rechts von der Mitte) */}
      <group position={[3.2, 0, 0.32]}>
        <mesh castShadow position={[0, 1.7, 0]}>
          <boxGeometry args={[1.7, 3.4, 0.16]} />
          <meshStandardMaterial color="#5c3f2a" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.7, 0.1]}>
          <boxGeometry args={[1.3, 3, 0.05]} />
          <meshStandardMaterial color="#6d4c33" roughness={0.9} />
        </mesh>
        {/* Türklinke */}
        <mesh position={[0.55, 1.7, 0.16]}>
          <sphereGeometry args={[0.11, 12, 10]} />
          <meshStandardMaterial color="#d8c46a" metalness={0.6} roughness={0.35} />
        </mesh>
        {/* Schlüsselloch mit steckendem Popel */}
        <mesh position={[0.5, 1.4, 0.14]}>
          <cylinderGeometry args={[0.05, 0.05, 0.06, 8]} />
          <meshStandardMaterial color="#1c140d" roughness={1} />
        </mesh>
        <mesh position={[0.5, 1.4, 0.17]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#7c9147" roughness={0.9} />
        </mesh>
      </group>

      {/* Fenster (links) */}
      <group position={[-4.5, 3.1, 0.3]}>
        <mesh>
          <boxGeometry args={[2, 1.6, 0.12]} />
          <meshStandardMaterial color="#6f5a44" roughness={1} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.7, 1.3, 0.05]} />
          <meshStandardMaterial
            color="#9ec3d2"
            emissive="#8bb7cc"
            emissiveIntensity={0.12}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[0.06, 1.3, 0.03]} />
          <meshStandardMaterial color="#6f5a44" />
        </mesh>
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[1.7, 0.06, 0.03]} />
          <meshStandardMaterial color="#6f5a44" />
        </mesh>
      </group>

      {/* Das kleine Loch am Wandfuß (links, hinter der Mülltonne) */}
      <group position={[-4, 0, 0.31]}>
        {/* dunkle Öffnung als Halbkreis am Boden */}
        <mesh position={[0, 0.05, 0.03]}>
          <circleGeometry args={[0.5, 24, 0, Math.PI]} />
          <meshStandardMaterial color="#0b0a08" roughness={1} />
        </mesh>
        {/* bröckelige Kante (Bogen) */}
        <mesh position={[0, 0.05, 0.05]}>
          <torusGeometry args={[0.5, 0.06, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#9c8f79" roughness={1} />
        </mesh>
        {/* Lappen, der das Loch verstopft — verschwindet, sobald frei */}
        {!holeOpen && (
          <mesh position={[0, 0.28, 0.1]} rotation={[0.1, 0, 0.3]}>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color="#8a8577" roughness={1} />
          </mesh>
        )}
      </group>
    </group>
  );
}

/** Hundehütte, in der (absurderweise) der Fuchs wohnt. */
export function Doghouse() {
  return (
    <group>
      <mesh castShadow position={[0, 0.75, 0]}>
        <boxGeometry args={[1.9, 1.5, 1.9]} />
        <meshStandardMaterial color="#8a5a38" roughness={0.95} />
      </mesh>
      {/* Satteldach */}
      <mesh castShadow position={[0, 1.75, 0]} rotation={[0, Math.PI / 2, 0]}>
        <coneGeometry args={[1.5, 1, 4]} />
        <meshStandardMaterial color="#6e4327" roughness={1} />
      </mesh>
      {/* runder Eingang */}
      <mesh position={[0, 0.62, 0.97]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.12, 20]} />
        <meshStandardMaterial color="#140f0a" roughness={1} />
      </mesh>
      {/* Namensschild */}
      <mesh position={[0, 1.28, 0.97]}>
        <boxGeometry args={[0.7, 0.22, 0.04]} />
        <meshStandardMaterial color="#c9b487" roughness={0.9} />
      </mesh>
    </group>
  );
}

/** Altes, abgestelltes Auto mit Öllache darunter. */
export function ParkedCar() {
  return (
    <group rotation={[0, -0.35, 0]}>
      {/* Karosserie */}
      <mesh castShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[3.6, 0.9, 1.7]} />
        <meshStandardMaterial color="#7a3f3a" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Kabine */}
      <mesh castShadow position={[-0.2, 1.35, 0]}>
        <boxGeometry args={[2, 0.8, 1.5]} />
        <meshStandardMaterial color="#8c4c45" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Scheiben */}
      <mesh position={[-0.2, 1.36, 0.76]}>
        <boxGeometry args={[1.7, 0.6, 0.03]} />
        <meshStandardMaterial color="#4d6b74" roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[-0.2, 1.36, -0.76]}>
        <boxGeometry args={[1.7, 0.6, 0.03]} />
        <meshStandardMaterial color="#4d6b74" roughness={0.3} metalness={0.3} />
      </mesh>
      {/* Räder */}
      {[
        [1.2, 0.35, 0.85],
        [1.2, 0.35, -0.85],
        [-1.2, 0.35, 0.85],
        [-1.2, 0.35, -0.85],
      ].map((position, index) => (
        <mesh
          key={index}
          castShadow
          position={position as Vec3}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.36, 0.36, 0.28, 16]} />
          <meshStandardMaterial color="#2a2724" roughness={1} />
        </mesh>
      ))}
      {/* Stoßstange */}
      <mesh position={[1.85, 0.55, 0]}>
        <boxGeometry args={[0.2, 0.35, 1.7]} />
        <meshStandardMaterial color="#b9bcbe" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Dunkle Öllache — Ziel zum Aufsammeln mit der Blechdose. */
export function OilPuddle() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0.2]} position={[0, 0.01, 0]} scale={[1.6, 1.1, 1]}>
        <circleGeometry args={[1, 28]} />
        <meshStandardMaterial color="#151212" roughness={0.25} metalness={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, -0.4]} position={[0.5, 0.012, 0.4]} scale={[0.6, 0.4, 1]}>
        <circleGeometry args={[1, 20]} />
        <meshStandardMaterial color="#221d1c" roughness={0.3} metalness={0.35} />
      </mesh>
    </group>
  );
}

/** Große Mülltonne auf Rädern. Kippt/rollt weg, sobald `toppled`. */
export function WheelieBin({ toppled = false }: { toppled?: boolean }) {
  return (
    <group rotation={toppled ? [Math.PI / 2.1, 0.3, 0] : [0, 0, 0]}>
      {/* Korpus */}
      <mesh castShadow position={[0, 1, 0]}>
        <boxGeometry args={[1.3, 2, 1.1]} />
        <meshStandardMaterial color="#2f6b4a" roughness={0.9} />
      </mesh>
      {/* Deckel */}
      <mesh castShadow position={[0, 2.05, 0.05]} rotation={[toppled ? -0.5 : -0.1, 0, 0]}>
        <boxGeometry args={[1.36, 0.16, 1.2]} />
        <meshStandardMaterial color="#255840" roughness={0.9} />
      </mesh>
      {/* Räder */}
      {[-0.45, 0.45].map((x) => (
        <mesh
          key={x}
          castShadow
          position={[x, 0.18, -0.5]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.2, 0.2, 0.16, 12]} />
          <meshStandardMaterial color="#1c1a18" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/** Ziegelstein, der als Bremsklotz unter dem Tonnenrad klemmt. */
export function BrickChock() {
  return (
    <mesh castShadow position={[0, 0.12, 0]} rotation={[0, 0.2, 0]}>
      <boxGeometry args={[0.5, 0.24, 0.3]} />
      <meshStandardMaterial color="#9a4f38" roughness={1} />
    </mesh>
  );
}

/** Abgewetzte Fußmatte vor der Tür — darunter liegt der rostige Schlüssel. */
export function Doormat() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
      <planeGeometry args={[1.5, 0.9]} />
      <meshStandardMaterial color="#5b5147" roughness={1} />
    </mesh>
  );
}
