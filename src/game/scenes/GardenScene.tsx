"use client";

import { Interactable } from "@/game/entities/Interactable";
import { Player } from "@/game/entities/Player";
import { useGameStore } from "@/game/store";

function GrassGround() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#5f8f4e" />
      </mesh>
      {/* Path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[2.2, 14]} />
        <meshStandardMaterial color="#c2a07a" />
      </mesh>
      {/* Flower beds */}
      <mesh position={[-3.5, 0.08, 1.5]} castShadow>
        <boxGeometry args={[2.2, 0.16, 1.4]} />
        <meshStandardMaterial color="#6b4f2a" />
      </mesh>
      <mesh position={[3.2, 0.08, -0.5]} castShadow>
        <boxGeometry args={[1.8, 0.16, 1.2]} />
        <meshStandardMaterial color="#6b4f2a" />
      </mesh>
    </>
  );
}

function Fence() {
  const posts: [number, number, number][] = [];
  for (let x = -8; x <= 8; x += 1.2) {
    posts.push([x, 0.5, -8], [x, 0.5, 8]);
  }
  for (let z = -8; z <= 8; z += 1.2) {
    posts.push([-8, 0.5, z], [8, 0.5, z]);
  }
  return (
    <group>
      {posts.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <boxGeometry args={[0.12, 1, 0.12]} />
          <meshStandardMaterial color="#8b6914" />
        </mesh>
      ))}
    </group>
  );
}

function Gate({ open }: { open: boolean }) {
  return (
    <group position={[0, 0, -3.4]}>
      <mesh position={[-1.5, 0.7, 0]} castShadow>
        <boxGeometry args={[0.25, 1.4, 0.25]} />
        <meshStandardMaterial color="#6e5320" />
      </mesh>
      <mesh position={[1.5, 0.7, 0]} castShadow>
        <boxGeometry args={[0.25, 1.4, 0.25]} />
        <meshStandardMaterial color="#6e5320" />
      </mesh>
      {!open && (
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[2.6, 1.3, 0.12]} />
          <meshStandardMaterial color="#8a6a2f" />
        </mesh>
      )}
      {open && (
        <mesh position={[1.8, 0.75, 0.9]} rotation={[0, -0.9, 0]} castShadow>
          <boxGeometry args={[2.6, 1.3, 0.12]} />
          <meshStandardMaterial color="#8a6a2f" />
        </mesh>
      )}
    </group>
  );
}

export function GardenScene() {
  const startDialogue = useGameStore((s) => s.startDialogue);
  const setFlag = useGameStore((s) => s.setFlag);
  const hasFlag = useGameStore((s) => s.hasFlag);
  const hasItem = useGameStore((s) => s.hasItem);
  const addItem = useGameStore((s) => s.addItem);
  const removeItem = useGameStore((s) => s.removeItem);
  const getSelectedItem = useGameStore((s) => s.getSelectedItem);
  const gateOpen = useGameStore((s) => s.flags.gate_open);
  const showToast = useGameStore((s) => s.showToast);

  const onHedgehog = () => {
    if (!hasFlag("has_talked_to_hedgehog")) {
      setFlag("has_talked_to_hedgehog");
      startDialogue("hedgehog_intro");
      return;
    }
    startDialogue("hedgehog_hint");
  };

  const onFlowerPot = () => {
    if (hasItem("key_flowerpot") || hasFlag("pot_examined")) {
      startDialogue("pot_empty");
      return;
    }
    if (!addItem("key_flowerpot")) return;
    setFlag("pot_examined");
    startDialogue("pot_found_key");
  };

  const onCrumbs = () => {
    if (hasItem("crumbs") || hasItem("shovel") || hasFlag("dug_near_gate")) {
      return;
    }
    if (!addItem("crumbs")) return;
    startDialogue("crumbs_pickup");
  };

  const onSparrow = () => {
    const selected = getSelectedItem();
    if (hasItem("shovel") || hasFlag("dug_near_gate") || gateOpen) {
      startDialogue("sparrow_thanks");
      return;
    }
    if (selected === "crumbs") {
      removeItem("crumbs");
      if (!addItem("shovel")) return;
      startDialogue("sparrow_thanks");
      return;
    }
    startDialogue("sparrow_hungry");
  };

  const onGate = () => {
    if (gateOpen) {
      startDialogue("yard_teaser");
      return;
    }
    const selected = getSelectedItem();
    if (selected === "key_flowerpot") {
      removeItem("key_flowerpot");
      setFlag("gate_open");
      startDialogue("gate_opened");
      showToast("Gartentor geöffnet!");
      return;
    }
    startDialogue("gate_locked");
  };

  const onDigSpot = () => {
    if (gateOpen) {
      startDialogue("yard_teaser");
      return;
    }
    const selected = getSelectedItem();
    if (selected === "shovel") {
      removeItem("shovel");
      setFlag("dug_near_gate");
      setFlag("gate_open");
      startDialogue("dig_success");
      showToast("Gartentor geöffnet!");
      return;
    }
    startDialogue("need_item");
  };

  const crumbsGone =
    hasItem("crumbs") || hasItem("shovel") || hasFlag("dug_near_gate") || gateOpen;

  return (
    <group>
      <GrassGround />
      <Fence />
      <Gate open={gateOpen} />

      {/* Decorative flowers */}
      <mesh position={[-3.2, 0.35, 1.5]} castShadow>
        <sphereGeometry args={[0.2, 10, 10]} />
        <meshStandardMaterial color="#e85d4c" />
      </mesh>
      <mesh position={[-3.7, 0.3, 1.2]} castShadow>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshStandardMaterial color="#f2c14e" />
      </mesh>
      <mesh position={[3.4, 0.32, -0.4]} castShadow>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#d94f70" />
      </mesh>

      <Player />

      <Interactable id="hedgehog" position={[-2.2, 0, 3.2]} onInteract={onHedgehog}>
        <mesh castShadow position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.32, 14, 12]} />
          <meshStandardMaterial color="#5a4632" roughness={1} />
        </mesh>
        <mesh castShadow position={[0.2, 0.2, 0.2]}>
          <sphereGeometry args={[0.14, 10, 10]} />
          <meshStandardMaterial color="#6b5340" />
        </mesh>
      </Interactable>

      <Interactable id="flowerpot" position={[-3.5, 0, 1.5]} onInteract={onFlowerPot}>
        <mesh castShadow position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.28, 0.22, 0.4, 12]} />
          <meshStandardMaterial color="#b85c38" />
        </mesh>
        <mesh castShadow position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshStandardMaterial color="#3f8f4a" />
        </mesh>
      </Interactable>

      {!crumbsGone && (
        <Interactable id="crumbs" position={[1.8, 0, 2.4]} radius={1.3} onInteract={onCrumbs}>
          <mesh castShadow position={[0, 0.06, 0]}>
            <boxGeometry args={[0.25, 0.08, 0.25]} />
            <meshStandardMaterial color="#e8d5a3" />
          </mesh>
        </Interactable>
      )}

      <Interactable id="sparrow" position={[4.2, 0, -1.2]} onInteract={onSparrow}>
        <mesh castShadow position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.16, 10, 10]} />
          <meshStandardMaterial color="#6d6a63" />
        </mesh>
        <mesh castShadow position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 6]} />
          <meshStandardMaterial color="#8b6914" />
        </mesh>
      </Interactable>

      <Interactable id="gate" position={[0, 0, -3.4]} radius={1.8} onInteract={onGate}>
        <mesh visible={false}>
          <boxGeometry args={[2.8, 1.5, 0.6]} />
          <meshBasicMaterial />
        </mesh>
      </Interactable>

      <Interactable
        id="digspot"
        position={[1.1, 0, -2.8]}
        radius={1.4}
        onInteract={onDigSpot}
        disabled={gateOpen}
      >
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <circleGeometry args={[0.45, 16]} />
          <meshStandardMaterial color="#7a5a32" />
        </mesh>
      </Interactable>

      {/* Soft fill light props: bush */}
      <mesh position={[5.5, 0.4, 3]} castShadow>
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshStandardMaterial color="#3f7a3a" />
      </mesh>
      <mesh position={[-5.8, 0.5, -2]} castShadow>
        <sphereGeometry args={[0.9, 12, 12]} />
        <meshStandardMaterial color="#356b34" />
      </mesh>
    </group>
  );
}
