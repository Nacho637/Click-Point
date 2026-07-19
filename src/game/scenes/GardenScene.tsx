"use client";

import { Interactable } from "@/game/entities/Interactable";
import { Player } from "@/game/entities/Player";
import type { ItemId } from "@/game/items/catalog";
import {
  Bench,
  BirdBath,
  CompostPile,
  DistantBackdrop,
  Frog,
  GardenGnome,
  GardenGround,
  GardenShed,
  Gate,
  NaturalBoundary,
  Pond,
  Snail,
} from "@/game/scenes/GardenEnvironment";
import { useGameStore } from "@/game/store";

function Hedgehog() {
  return (
    <group>
      <mesh castShadow position={[-0.08, 0.3, 0]} scale={[1.2, 0.9, 1]}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial color="#514033" roughness={1} />
      </mesh>
      <mesh castShadow position={[0.28, 0.25, 0.18]}>
        <sphereGeometry args={[0.2, 12, 10]} />
        <meshStandardMaterial color="#7b614b" roughness={0.95} />
      </mesh>
      <mesh position={[0.42, 0.28, 0.31]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#1b1a17" />
      </mesh>
      <mesh position={[0.48, 0.21, 0.23]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#3a2620" />
      </mesh>
    </group>
  );
}

function FlowerPot() {
  return (
    <group>
      <mesh castShadow position={[0, 0.27, 0]}>
        <cylinderGeometry args={[0.34, 0.25, 0.48, 12]} />
        <meshStandardMaterial color="#b85c38" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0, 0.58, 0]}>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#4f8747" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.18, 0.72, 0.04]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#659b50" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Sparrow() {
  return (
    <group>
      <mesh castShadow position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.21, 12, 10]} />
        <meshStandardMaterial color="#716b60" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0.03, 1.2, 0.12]}>
        <sphereGeometry args={[0.14, 10, 8]} />
        <meshStandardMaterial color="#8a8171" roughness={0.95} />
      </mesh>
      <mesh position={[0.03, 1.18, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.045, 0.18, 6]} />
        <meshStandardMaterial color="#d7a448" />
      </mesh>
      <mesh castShadow position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.85, 7]} />
        <meshStandardMaterial color="#76583a" roughness={1} />
      </mesh>
    </group>
  );
}

function PickupModel({ item }: { item: "stone" | "leaf" | "cap" | "crumbs" }) {
  if (item === "stone") {
    return (
      <mesh castShadow position={[0, 0.11, 0]} scale={[1.1, 0.55, 0.85]}>
        <dodecahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#7e8581" roughness={0.85} />
      </mesh>
    );
  }
  if (item === "leaf") {
    return (
      <group rotation={[0, 0.4, -0.25]}>
        <mesh castShadow position={[0, 0.1, 0]} scale={[1.7, 0.18, 0.8]}>
          <dodecahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#b95542" roughness={0.9} />
        </mesh>
        <mesh position={[0.28, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.02, 0.35, 5]} />
          <meshStandardMaterial color="#784633" />
        </mesh>
      </group>
    );
  }
  if (item === "cap") {
    return (
      <mesh castShadow position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 12]} />
        <meshStandardMaterial color="#3d78a0" metalness={0.35} roughness={0.6} />
      </mesh>
    );
  }
  return (
    <group>
      {[-0.12, 0.02, 0.14].map((x, index) => (
        <mesh key={index} castShadow position={[x, 0.06, index % 2 ? 0.08 : -0.04]}>
          <dodecahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#e4cc91" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function WateringCan() {
  return (
    <group>
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.72, 12]} />
        <meshStandardMaterial color="#668d91" metalness={0.15} roughness={0.75} />
      </mesh>
      <mesh
        castShadow
        position={[0.55, 0.48, 0]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <coneGeometry args={[0.18, 0.9, 10]} />
        <meshStandardMaterial color="#668d91" metalness={0.15} roughness={0.75} />
      </mesh>
      <mesh position={[-0.05, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.06, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#587b7e" />
      </mesh>
    </group>
  );
}

function Wheelbarrow() {
  return (
    <group rotation={[0, -0.5, 0]}>
      <mesh castShadow position={[0, 0.55, 0]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[1.5, 0.5, 0.85]} />
        <meshStandardMaterial color="#68816a" metalness={0.1} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 0.23, 0.64]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.1, 8, 14]} />
        <meshStandardMaterial color="#34362f" roughness={1} />
      </mesh>
      {[-0.35, 0.35].map((x) => (
        <mesh
          key={x}
          castShadow
          position={[x, 0.48, -0.9]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.045, 0.055, 1.2, 6]} />
          <meshStandardMaterial color="#70583e" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

export function GardenScene() {
  const startDialogue = useGameStore((state) => state.startDialogue);
  const setFlag = useGameStore((state) => state.setFlag);
  const hasFlag = useGameStore((state) => state.hasFlag);
  const hasItem = useGameStore((state) => state.hasItem);
  const addItem = useGameStore((state) => state.addItem);
  const removeItem = useGameStore((state) => state.removeItem);
  const getSelectedItem = useGameStore((state) => state.getSelectedItem);
  const gateOpen = useGameStore((state) => state.flags.gate_open);
  const showToast = useGameStore((state) => state.showToast);

  const pickUp = (
    item: ItemId,
    dialogue: "stone_pickup" | "leaf_pickup" | "cap_pickup",
  ) => {
    if (hasItem(item)) return;
    if (!addItem(item)) return;
    startDialogue(dialogue);
  };

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
    if (hasItem("crumbs") || hasItem("shovel") || hasFlag("dug_near_gate")) return;
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
    startDialogue(selected ? "gate_wrong_item" : "gate_locked");
  };

  const onDigSpot = () => {
    if (gateOpen) {
      startDialogue("yard_teaser");
      return;
    }
    if (getSelectedItem() === "shovel") {
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
      <DistantBackdrop />
      <GardenGround />
      <NaturalBoundary />
      <Gate open={gateOpen} />
      <Player />

      <Interactable
        id="hedgehog"
        position={[-2.8, 0, 6.2]}
        radius={1.7}
        onInteract={onHedgehog}
      >
        <Hedgehog />
      </Interactable>

      <Interactable
        id="flowerpot"
        position={[-6.8, 0, 4.2]}
        radius={1.6}
        onInteract={onFlowerPot}
      >
        <FlowerPot />
      </Interactable>

      {!crumbsGone && (
        <Interactable
          id="crumbs"
          position={[4.8, 0, 7.5]}
          radius={1.35}
          onInteract={onCrumbs}
        >
          <PickupModel item="crumbs" />
        </Interactable>
      )}

      <Interactable
        id="sparrow"
        position={[7.2, 0, -1.6]}
        radius={1.7}
        onInteract={onSparrow}
      >
        <Sparrow />
      </Interactable>

      <Interactable
        id="gate"
        position={[0, 0, -10.4]}
        radius={2.1}
        onInteract={onGate}
      >
        <mesh position={[0, 0.9, 0.15]}>
          <boxGeometry args={[3.3, 2, 0.5]} />
          <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
        </mesh>
      </Interactable>

      <Interactable
        id="digspot"
        position={[1.35, 0, -9.55]}
        radius={1.5}
        onInteract={onDigSpot}
        disabled={gateOpen}
      >
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <circleGeometry args={[0.58, 20]} />
          <meshStandardMaterial color="#795737" roughness={1} />
        </mesh>
        <mesh position={[0.25, 0.09, 0.15]} scale={[1.2, 0.35, 0.8]}>
          <dodecahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#6c4e32" roughness={1} />
        </mesh>
      </Interactable>

      <group position={[-7.9, 0, -2.2]}>
        <Pond />
      </group>
      <Interactable
        id="frog"
        position={[-5.55, 0.08, -2.55]}
        radius={1.35}
        onInteract={() =>
          startDialogue(
            getSelectedItem() === "smooth_stone" ? "frog_splash" : "frog_idle",
          )
        }
      >
        <Frog />
      </Interactable>
      <Interactable
        id="pond"
        position={[-8.15, 0, -2.2]}
        radius={1.75}
        onInteract={() =>
          startDialogue(
            getSelectedItem() === "smooth_stone" ? "pond_splash" : "pond_idle",
          )
        }
      >
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[2.25, 1.45, 1]}>
          <circleGeometry args={[1, 24]} />
          <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
        </mesh>
      </Interactable>

      <Interactable
        id="snail"
        position={[-5.2, 0, 8.5]}
        radius={1.45}
        onInteract={() =>
          startDialogue(getSelectedItem() === "red_leaf" ? "snail_leaf" : "snail_idle")
        }
      >
        <Snail />
      </Interactable>

      <Interactable
        id="gnome"
        position={[7, 0, 3.2]}
        radius={1.55}
        onInteract={() =>
          startDialogue(getSelectedItem() === "bottle_cap" ? "gnome_cap" : "gnome_idle")
        }
      >
        <GardenGnome />
      </Interactable>

      <Interactable
        id="shed"
        position={[8.6, 0, -7.3]}
        radius={2.3}
        onInteract={() =>
          startDialogue(
            getSelectedItem() === "key_flowerpot" ? "shed_key" : "shed_locked",
          )
        }
      >
        <GardenShed />
      </Interactable>

      <Interactable
        id="bench"
        position={[3.7, 0, 4.1]}
        radius={1.8}
        onInteract={() => startDialogue("bench")}
      >
        <Bench />
      </Interactable>

      <Interactable
        id="birdbath"
        position={[-3.8, 0, 0.5]}
        radius={1.6}
        onInteract={() => startDialogue("birdbath")}
      >
        <BirdBath />
      </Interactable>

      <Interactable
        id="compost"
        position={[9.5, 0, 7.6]}
        radius={1.65}
        onInteract={() => startDialogue("compost")}
      >
        <CompostPile />
      </Interactable>

      <Interactable
        id="watering-can"
        position={[-8.9, 0, 6.3]}
        radius={1.55}
        onInteract={() => startDialogue("watering_can")}
      >
        <WateringCan />
      </Interactable>

      <Interactable
        id="wheelbarrow"
        position={[5.7, 0, -7.1]}
        radius={1.8}
        onInteract={() => startDialogue("wheelbarrow")}
      >
        <Wheelbarrow />
      </Interactable>

      {!hasItem("smooth_stone") && (
        <Interactable
          id="smooth-stone"
          position={[-9.5, 0, 0.2]}
          radius={1.35}
          onInteract={() => pickUp("smooth_stone", "stone_pickup")}
        >
          <PickupModel item="stone" />
        </Interactable>
      )}

      {!hasItem("red_leaf") && (
        <Interactable
          id="red-leaf"
          position={[-3.4, 0, 9.7]}
          radius={1.3}
          onInteract={() => pickUp("red_leaf", "leaf_pickup")}
        >
          <PickupModel item="leaf" />
        </Interactable>
      )}

      {!hasItem("bottle_cap") && (
        <Interactable
          id="bottle-cap"
          position={[8.7, 0, 0.7]}
          radius={1.3}
          onInteract={() => pickUp("bottle_cap", "cap_pickup")}
        >
          <PickupModel item="cap" />
        </Interactable>
      )}
    </group>
  );
}
