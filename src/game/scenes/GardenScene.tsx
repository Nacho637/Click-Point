"use client";

import { Interactable } from "@/game/entities/Interactable";
import { Player } from "@/game/entities/Player";
import { ITEM_CATALOG, type ItemId } from "@/game/items/catalog";
import {
  AlteEiche,
  Bench,
  BirdBath,
  CompostPile,
  DistantBackdrop,
  Frog,
  GardenGnome,
  GardenGround,
  GardenShed,
  Gate,
  Gemuesebeet,
  NaturalBoundary,
  Pond,
  Snail,
  Wildblumenwiese,
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

function Mouse() {
  return (
    <group rotation={[0, 0.6, 0]}>
      <mesh castShadow position={[0, 0.16, 0]} scale={[1, 0.85, 1.3]}>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial color="#8d8578" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0, 0.22, 0.2]}>
        <sphereGeometry args={[0.11, 12, 10]} />
        <meshStandardMaterial color="#9a9184" roughness={0.95} />
      </mesh>
      {[-0.07, 0.07].map((x) => (
        <mesh key={x} castShadow position={[x, 0.34, 0.16]} scale={[1, 1, 0.3]}>
          <sphereGeometry args={[0.07, 10, 8]} />
          <meshStandardMaterial color="#b3a99a" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.2, 0.31]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#e08a7a" />
      </mesh>
      {[-0.04, 0.04].map((x) => (
        <mesh key={x} position={[x, 0.26, 0.29]}>
          <sphereGeometry args={[0.018, 8, 6]} />
          <meshStandardMaterial color="#1b1a17" />
        </mesh>
      ))}
      <mesh position={[0.05, 0.08, -0.28]} rotation={[0.5, 0.3, 1.2]}>
        <cylinderGeometry args={[0.012, 0.022, 0.42, 5]} />
        <meshStandardMaterial color="#c4a58e" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Bee() {
  return (
    <group position={[0, 0.85, 0]}>
      <mesh castShadow scale={[1.25, 1, 1]}>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial color="#e0b23e" roughness={0.85} />
      </mesh>
      <mesh scale={[1.28, 1.02, 1.02]} position={[0.02, 0, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.07, 12]} />
        <meshStandardMaterial color="#3a3123" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.2, 0.02, 0]}>
        <sphereGeometry args={[0.09, 10, 8]} />
        <meshStandardMaterial color="#3a3123" roughness={0.9} />
      </mesh>
      {[-0.07, 0.07].map((z) => (
        <mesh
          key={z}
          position={[-0.02, 0.14, z]}
          rotation={[z > 0 ? 0.5 : -0.5, 0, 0]}
          scale={[1.6, 0.25, 0.9]}
        >
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshStandardMaterial
            color="#e8f0f2"
            transparent
            opacity={0.6}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function Worm() {
  const segments: Array<[number, number, number, number]> = [
    [-0.28, 0.05, 0.1, 0.09],
    [-0.12, 0.09, 0.02, 0.1],
    [0.05, 0.12, -0.06, 0.1],
    [0.22, 0.2, 0, 0.09],
  ];
  return (
    <group>
      {segments.map(([x, y, z, r], index) => (
        <mesh key={index} castShadow position={[x, y, z]}>
          <sphereGeometry args={[r, 10, 8]} />
          <meshStandardMaterial
            color={index === 2 ? "#c47672" : "#d98a86"}
            roughness={0.8}
          />
        </mesh>
      ))}
      {[-0.03, 0.03].map((z) => (
        <mesh key={z} position={[0.28, 0.24, z]}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial color="#1b1a17" />
        </mesh>
      ))}
    </group>
  );
}

function Squirrel() {
  return (
    <group rotation={[0, -0.5, 0]}>
      <mesh castShadow position={[0, 0.28, 0]} scale={[1, 1.15, 1.1]}>
        <sphereGeometry args={[0.2, 12, 10]} />
        <meshStandardMaterial color="#a5552f" roughness={0.92} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0.12]}>
        <sphereGeometry args={[0.14, 12, 10]} />
        <meshStandardMaterial color="#b16238" roughness={0.92} />
      </mesh>
      {[-0.07, 0.07].map((x) => (
        <mesh key={x} castShadow position={[x, 0.7, 0.08]}>
          <coneGeometry args={[0.04, 0.12, 6]} />
          <meshStandardMaterial color="#8f4826" roughness={0.9} />
        </mesh>
      ))}
      {[-0.05, 0.05].map((x) => (
        <mesh key={x} position={[x, 0.58, 0.24]}>
          <sphereGeometry args={[0.022, 8, 6]} />
          <meshStandardMaterial color="#1b1a17" />
        </mesh>
      ))}
      <mesh castShadow position={[0, 0.18, 0.14]} scale={[0.8, 0.9, 0.7]}>
        <sphereGeometry args={[0.13, 10, 8]} />
        <meshStandardMaterial color="#e8cdb2" roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 0.45, -0.26]} scale={[0.7, 1.6, 0.7]}>
        <sphereGeometry args={[0.18, 12, 10]} />
        <meshStandardMaterial color="#c06b3c" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0, 0.78, -0.3]} scale={[0.6, 1, 0.6]}>
        <sphereGeometry args={[0.15, 12, 10]} />
        <meshStandardMaterial color="#cd7a48" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Blackbird() {
  return (
    <group rotation={[0, 0.9, 0]}>
      <mesh castShadow position={[0, 0.18, 0]} scale={[1, 0.9, 1.35]}>
        <sphereGeometry args={[0.17, 12, 10]} />
        <meshStandardMaterial color="#25211f" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.34, 0.16]}>
        <sphereGeometry args={[0.11, 12, 10]} />
        <meshStandardMaterial color="#2c2725" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.33, 0.29]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.035, 0.14, 6]} />
        <meshStandardMaterial color="#e8a83c" />
      </mesh>
      {[-0.055, 0.055].map((x) => (
        <group key={x} position={[x, 0.38, 0.23]}>
          <mesh>
            <sphereGeometry args={[0.028, 8, 6]} />
            <meshStandardMaterial color="#e8a83c" />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <sphereGeometry args={[0.018, 8, 6]} />
            <meshStandardMaterial color="#141210" />
          </mesh>
        </group>
      ))}
      <mesh castShadow position={[0, 0.2, -0.26]} rotation={[0.6, 0, 0]} scale={[0.6, 0.2, 1]}>
        <sphereGeometry args={[0.14, 10, 8]} />
        <meshStandardMaterial color="#1c1917" roughness={0.95} />
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

function KeyModel() {
  return (
    <group rotation={[Math.PI / 2, 0, 0.35]} position={[0, 0.06, 0]}>
      <mesh castShadow position={[0, 0.13, 0]}>
        <torusGeometry args={[0.1, 0.028, 8, 16]} />
        <meshStandardMaterial color="#b8973f" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 0.34, 6]} />
        <meshStandardMaterial color="#b8973f" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.06, -0.21, 0]}>
        <boxGeometry args={[0.1, 0.06, 0.035]} />
        <meshStandardMaterial color="#b8973f" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function ShovelModel() {
  return (
    <group rotation={[0, 0.4, -0.18]} position={[0, 0.05, 0]}>
      <mesh castShadow position={[0, 0.08, -0.18]} rotation={[0.12, 0, 0]}>
        <cylinderGeometry args={[0.024, 0.03, 0.5, 6]} />
        <meshStandardMaterial color="#8a6b45" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.06, 0.2]}>
        <boxGeometry args={[0.18, 0.04, 0.26]} />
        <meshStandardMaterial color="#7d8a92" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

/** Neutrales Bündel für Gegenstände ohne eigenes Bodenmodell. */
function GenericItemModel({ color }: { color: string }) {
  return (
    <mesh castShadow position={[0, 0.13, 0]} rotation={[0.3, 0.6, 0.1]}>
      <boxGeometry args={[0.3, 0.24, 0.3]} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}

/** Wählt für einen abgelegten Gegenstand das passende Bodenmodell. */
function DroppedItemModel({ item }: { item: ItemId }) {
  switch (item) {
    case "smooth_stone":
      return <PickupModel item="stone" />;
    case "red_leaf":
      return <PickupModel item="leaf" />;
    case "bottle_cap":
      return <PickupModel item="cap" />;
    case "crumbs":
      return <PickupModel item="crumbs" />;
    case "key_flowerpot":
      return <KeyModel />;
    case "shovel":
      return <ShovelModel />;
    case "magnet":
      return <GenericItemModel color="#a23b32" />;
    case "tin_can":
      return <GenericItemModel color="#9aa7ac" />;
    case "note":
      return <GenericItemModel color="#e6dcc0" />;
    case "string":
      return <GenericItemModel color="#cbb98f" />;
    case "dog_biscuit":
      return <GenericItemModel color="#c69a5b" />;
    default:
      return <GenericItemModel color="#c8a15a" />;
  }
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
  const droppedItems = useGameStore((state) => state.droppedItems);
  const pickUpDropped = useGameStore((state) => state.pickUpDropped);
  const getSelectedItem = useGameStore((state) => state.getSelectedItem);
  const gateOpen = useGameStore((state) => state.flags.gate_open);
  const showToast = useGameStore((state) => state.showToast);
  const goToScene = useGameStore((state) => state.goToScene);
  const openTopics = useGameStore((state) => state.openTopics);
  const openTopicsAfterDialogue = useGameStore(
    (state) => state.openTopicsAfterDialogue,
  );

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
      // Tor ist offen → in den Hof wechseln.
      showToast("Du schlüpfst in den Hof …");
      goToScene("yard");
      startDialogue("yard_intro");
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

  const onMouse = () => {
    if (!hasFlag("met_mouse")) {
      setFlag("met_mouse");
      openTopicsAfterDialogue("mouse_topics", "mouse_intro");
      return;
    }
    openTopics("mouse_topics");
  };

  const onBee = () => {
    if (!hasFlag("met_bee")) {
      setFlag("met_bee");
      openTopicsAfterDialogue("bee_topics", "bee_intro");
      return;
    }
    openTopics("bee_topics");
  };

  const onWorm = () => {
    if (!hasFlag("met_worm")) {
      setFlag("met_worm");
      openTopicsAfterDialogue("worm_topics", "worm_intro");
      return;
    }
    openTopics("worm_topics");
  };

  const onSquirrel = () => {
    if (!hasFlag("met_squirrel")) {
      setFlag("met_squirrel");
      openTopicsAfterDialogue("squirrel_topics", "squirrel_intro");
      return;
    }
    openTopics("squirrel_topics");
  };

  const onBlackbird = () => {
    if (!hasFlag("met_blackbird")) {
      setFlag("met_blackbird");
      openTopicsAfterDialogue("blackbird_topics", "blackbird_intro");
      return;
    }
    openTopics("blackbird_topics");
  };

  // Liegt der Gegenstand gerade als abgelegtes Objekt am Boden?
  const isDropped = (item: ItemId) => droppedItems.some((d) => d.item === item);

  const crumbsGone =
    hasItem("crumbs") ||
    isDropped("crumbs") ||
    hasItem("shovel") ||
    hasFlag("dug_near_gate") ||
    gateOpen;

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
        onLook={() => startDialogue("look_hedgehog")}
      >
        <Hedgehog />
      </Interactable>

      <Interactable
        id="flowerpot"
        position={[-6.8, 0, 4.2]}
        radius={1.6}
        onInteract={onFlowerPot}
        onLook={() => startDialogue("look_flowerpot")}
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
        onLook={() => startDialogue("look_sparrow")}
      >
        <Sparrow />
      </Interactable>

      <Interactable
        id="gate"
        position={[0, 0, -10.4]}
        radius={2.1}
        onInteract={onGate}
        onLook={() => startDialogue("look_gate")}
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
        onLook={() => startDialogue("look_digspot")}
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
        onLook={() => startDialogue("look_frog")}
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
        onLook={() => startDialogue("look_pond")}
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
        onLook={() => startDialogue("look_snail")}
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
        onLook={() => startDialogue("look_gnome")}
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
        onLook={() => startDialogue("look_shed")}
      >
        <GardenShed />
      </Interactable>

      <Interactable
        id="bench"
        position={[3.7, 0, 4.1]}
        radius={1.8}
        onInteract={() => startDialogue("bench")}
        onLook={() => startDialogue("look_bench")}
      >
        <Bench />
      </Interactable>

      <Interactable
        id="birdbath"
        position={[-3.8, 0, 0.5]}
        radius={1.6}
        onInteract={() => startDialogue("birdbath")}
        onLook={() => startDialogue("look_birdbath")}
      >
        <BirdBath />
      </Interactable>

      <Interactable
        id="compost"
        position={[9.5, 0, 7.6]}
        radius={1.65}
        onInteract={() => startDialogue("compost")}
        onLook={() => startDialogue("look_compost")}
      >
        <CompostPile />
      </Interactable>

      <Interactable
        id="watering-can"
        position={[-8.9, 0, 6.3]}
        radius={1.55}
        onInteract={() => startDialogue("watering_can")}
        onLook={() => startDialogue("look_wateringcan")}
      >
        <WateringCan />
      </Interactable>

      <Interactable
        id="wheelbarrow"
        position={[5.7, 0, -7.1]}
        radius={1.8}
        onInteract={() => startDialogue("wheelbarrow")}
        onLook={() => startDialogue("look_wheelbarrow")}
      >
        <Wheelbarrow />
      </Interactable>

      <Interactable
        id="meadow"
        position={[-14.5, 0, 4.5]}
        radius={2.4}
        onInteract={() => startDialogue("meadow_idle")}
        onLook={() => startDialogue("look_meadow")}
      >
        <Wildblumenwiese />
      </Interactable>

      <Interactable
        id="beet"
        position={[14, 0, 7]}
        radius={2.6}
        onInteract={() => startDialogue("beet_idle")}
        onLook={() => startDialogue("look_beet")}
      >
        <Gemuesebeet />
      </Interactable>

      <Interactable
        id="oak"
        position={[2.5, 0, 16]}
        radius={2.6}
        onInteract={() => startDialogue("oak_idle")}
        onLook={() => startDialogue("look_oak")}
      >
        <AlteEiche />
      </Interactable>

      <Interactable
        id="mouse"
        position={[-15.2, 0, 2.6]}
        radius={1.5}
        onInteract={onMouse}
        onLook={() => startDialogue("look_mouse")}
      >
        <Mouse />
      </Interactable>

      <Interactable
        id="bee"
        position={[-13.4, 0, 6.8]}
        radius={1.6}
        onInteract={onBee}
        onLook={() => startDialogue("look_bee")}
      >
        <Bee />
      </Interactable>

      <Interactable
        id="worm"
        position={[13.6, 0, 8.6]}
        radius={1.5}
        onInteract={onWorm}
        onLook={() => startDialogue("look_worm")}
      >
        <Worm />
      </Interactable>

      <Interactable
        id="squirrel"
        position={[2.8, 0, 14.6]}
        radius={1.7}
        onInteract={onSquirrel}
        onLook={() => startDialogue("look_squirrel")}
      >
        <Squirrel />
      </Interactable>

      <Interactable
        id="blackbird"
        position={[15.8, 0, 3.4]}
        radius={1.6}
        onInteract={onBlackbird}
        onLook={() => startDialogue("look_blackbird")}
      >
        <Blackbird />
      </Interactable>

      {!hasItem("smooth_stone") && !isDropped("smooth_stone") && (
        <Interactable
          id="smooth-stone"
          position={[-9.5, 0, 0.2]}
          radius={1.35}
          onInteract={() => pickUp("smooth_stone", "stone_pickup")}
        >
          <PickupModel item="stone" />
        </Interactable>
      )}

      {!hasItem("red_leaf") && !isDropped("red_leaf") && (
        <Interactable
          id="red-leaf"
          position={[-3.4, 0, 9.7]}
          radius={1.3}
          onInteract={() => pickUp("red_leaf", "leaf_pickup")}
        >
          <PickupModel item="leaf" />
        </Interactable>
      )}

      {!hasItem("bottle_cap") && !isDropped("bottle_cap") && (
        <Interactable
          id="bottle-cap"
          position={[8.7, 0, 0.7]}
          radius={1.3}
          onInteract={() => pickUp("bottle_cap", "cap_pickup")}
        >
          <PickupModel item="cap" />
        </Interactable>
      )}

      {/* Abgelegte Gegenstände liegen am Boden und können wieder aufgehoben werden. */}
      {droppedItems.map((dropped) => (
        <Interactable
          key={`dropped-${dropped.item}`}
          id={`dropped-${dropped.item}`}
          position={dropped.position}
          radius={1.3}
          onInteract={() => pickUpDropped(dropped.item)}
          onLook={() => showToast(ITEM_CATALOG[dropped.item].description)}
        >
          <DroppedItemModel item={dropped.item} />
        </Interactable>
      ))}
    </group>
  );
}
