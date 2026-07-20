"use client";

import { Interactable } from "@/game/entities/Interactable";
import { Player } from "@/game/entities/Player";
import { ITEM_CATALOG, type ItemId } from "@/game/items/catalog";
import { Bush, Tree } from "@/game/scenes/GardenEnvironment";
import {
  BrickChock,
  Doghouse,
  Doormat,
  HouseWall,
  OilPuddle,
  ParkedCar,
  WheelieBin,
  YardGround,
} from "@/game/scenes/YardEnvironment";
import { useGameStore } from "@/game/store";

type Vec3 = [number, number, number];

/** Fuchs Ferdinand — der einzige andere Charakter im Hof, ein charmanter Verwirrer. */
function Fox() {
  return (
    <group rotation={[0, 0.2, 0]}>
      {/* Körper */}
      <mesh castShadow position={[0, 0.3, 0]} scale={[1, 1, 1.35]}>
        <sphereGeometry args={[0.26, 14, 12]} />
        <meshStandardMaterial color="#d0662a" roughness={0.9} />
      </mesh>
      {/* helle Brust */}
      <mesh castShadow position={[0, 0.2, 0.24]} scale={[0.7, 0.8, 0.7]}>
        <sphereGeometry args={[0.2, 12, 10]} />
        <meshStandardMaterial color="#f0e6d6" roughness={0.85} />
      </mesh>
      {/* Kopf */}
      <mesh castShadow position={[0, 0.5, 0.28]}>
        <sphereGeometry args={[0.2, 14, 12]} />
        <meshStandardMaterial color="#d0662a" roughness={0.9} />
      </mesh>
      {/* spitze Schnauze */}
      <mesh castShadow position={[0, 0.44, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.11, 0.28, 10]} />
        <meshStandardMaterial color="#e7d8c4" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.44, 0.62]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1b1512" />
      </mesh>
      {/* spitze Ohren */}
      {[-0.11, 0.11].map((x) => (
        <mesh key={x} castShadow position={[x, 0.72, 0.24]} rotation={[0, 0, x > 0 ? -0.2 : 0.2]}>
          <coneGeometry args={[0.09, 0.24, 8]} />
          <meshStandardMaterial color="#b9531f" roughness={0.9} />
        </mesh>
      ))}
      {/* Augen */}
      {[-0.09, 0.09].map((x) => (
        <mesh key={x} position={[x, 0.54, 0.42]}>
          <sphereGeometry args={[0.028, 8, 6]} />
          <meshStandardMaterial color="#20180f" />
        </mesh>
      ))}
      {/* buschiger Schwanz mit weißer Spitze */}
      <mesh castShadow position={[0, 0.32, -0.42]} rotation={[0.5, 0, 0]} scale={[0.8, 0.8, 1.5]}>
        <sphereGeometry args={[0.2, 12, 10]} />
        <meshStandardMaterial color="#c25e26" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0, 0.5, -0.66]} scale={[0.6, 0.6, 0.8]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <meshStandardMaterial color="#f2ece1" roughness={0.95} />
      </mesh>
    </group>
  );
}

// ── Boden-Modelle für aufhebbare / abgelegte Gegenstände ─────────────
function CrowbarModel() {
  return (
    <group rotation={[0, 0.5, 0.4]} position={[0, 0.1, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 6]} />
        <meshStandardMaterial color="#5c3f34" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 0.32, 0.05]} rotation={[0.9, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.14, 6]} />
        <meshStandardMaterial color="#5c3f34" metalness={0.5} roughness={0.6} />
      </mesh>
    </group>
  );
}

function TinCanModel({ oily = false }: { oily?: boolean }) {
  return (
    <mesh castShadow position={[0, 0.16, 0]}>
      <cylinderGeometry args={[0.16, 0.16, 0.32, 14]} />
      <meshStandardMaterial
        color={oily ? "#2a2320" : "#9aa7ac"}
        metalness={oily ? 0.3 : 0.5}
        roughness={oily ? 0.5 : 0.4}
      />
    </mesh>
  );
}

function RustyKeyModel() {
  return (
    <group rotation={[Math.PI / 2, 0, 0.35]} position={[0, 0.06, 0]}>
      <mesh castShadow position={[0, 0.13, 0]}>
        <torusGeometry args={[0.1, 0.028, 8, 16]} />
        <meshStandardMaterial color="#8a6a3a" metalness={0.4} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 0.34, 6]} />
        <meshStandardMaterial color="#8a6a3a" metalness={0.4} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0.06, -0.21, 0]}>
        <boxGeometry args={[0.1, 0.06, 0.035]} />
        <meshStandardMaterial color="#8a6a3a" metalness={0.4} roughness={0.7} />
      </mesh>
    </group>
  );
}

function GenericItemModel({ color }: { color: string }) {
  return (
    <mesh castShadow position={[0, 0.13, 0]} rotation={[0.3, 0.6, 0.1]}>
      <boxGeometry args={[0.3, 0.24, 0.3]} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}

function DroppedItemModel({ item }: { item: ItemId }) {
  switch (item) {
    case "crowbar":
      return <CrowbarModel />;
    case "tin_can":
      return <TinCanModel />;
    case "oil_can":
      return <TinCanModel oily />;
    case "rusty_key":
      return <RustyKeyModel />;
    default:
      return <GenericItemModel color="#b9a06a" />;
  }
}

/** Ein paar Bäume/Büsche an den Seiten und im Süden — Nachbargrundstück-Gefühl. */
function YardBoundary() {
  const trees: Array<[Vec3, number, number]> = [
    [[-15.5, 0, 2], 1.1, 0.4],
    [[-16, 0, 9], 0.95, -0.5],
    [[15.5, 0, 3], 1.15, 0.7],
    [[16, 0, 10], 1, -0.3],
    [[-8, 0, 16], 1.05, 0.2],
    [[8, 0, 16.5], 1.1, -0.6],
  ];
  const bushes: Array<[Vec3, number, string]> = [
    [[-14, 0, -2], 1, "#3f7438"],
    [[-14.5, 0, 6], 1.1, "#4b823f"],
    [[14, 0, -1], 1.05, "#397138"],
    [[14.5, 0, 7], 0.95, "#4a7c3e"],
    [[-4, 0, 15.5], 1, "#4c8240"],
    [[3, 0, 15.5], 1.1, "#3c7639"],
  ];
  return (
    <group>
      {trees.map(([position, scale, rotation], index) => (
        <Tree key={`tree-${index}`} position={position} scale={scale} rotation={rotation} />
      ))}
      {bushes.map(([position, scale, color], index) => (
        <Bush key={`bush-${index}`} position={position} scale={scale} color={color} />
      ))}
    </group>
  );
}

export function YardScene() {
  const startDialogue = useGameStore((s) => s.startDialogue);
  const setFlag = useGameStore((s) => s.setFlag);
  const hasFlag = useGameStore((s) => s.hasFlag);
  const hasItem = useGameStore((s) => s.hasItem);
  const addItem = useGameStore((s) => s.addItem);
  const removeItem = useGameStore((s) => s.removeItem);
  const getSelectedItem = useGameStore((s) => s.getSelectedItem);
  const droppedItems = useGameStore((s) => s.droppedItems);
  const pickUpDropped = useGameStore((s) => s.pickUpDropped);
  const showToast = useGameStore((s) => s.showToast);
  const goToScene = useGameStore((s) => s.goToScene);
  const openTopics = useGameStore((s) => s.openTopics);
  const openTopicsAfterDialogue = useGameStore((s) => s.openTopicsAfterDialogue);

  const chockRemoved = useGameStore((s) => s.flags.chock_removed);
  const wheelOiled = useGameStore((s) => s.flags.wheel_oiled);
  const binMoved = useGameStore((s) => s.flags.bin_moved);
  const holeOpen = useGameStore((s) => s.flags.hole_open);

  const isDropped = (item: ItemId) => droppedItems.some((d) => d.item === item);

  const onFox = () => {
    if (!hasFlag("met_fox")) {
      setFlag("met_fox");
      openTopicsAfterDialogue("fox_topics", "fox_intro");
      return;
    }
    openTopics("fox_topics");
  };

  const onDoormat = () => {
    if (hasItem("rusty_key") || isDropped("rusty_key") || hasFlag("door_booger")) {
      startDialogue("look_doormat");
      return;
    }
    if (!addItem("rusty_key")) return;
    startDialogue("rusty_key_found");
  };

  const onDoor = () => {
    const selected = getSelectedItem();
    if (selected === "rusty_key") {
      // Der Schlüssel passt, aber der Popel blockiert — bewusste Sackgasse.
      setFlag("door_booger");
      startDialogue("door_booger");
      return;
    }
    if (hasFlag("door_booger")) {
      startDialogue("door_booger_stuck");
      return;
    }
    startDialogue("door_locked");
  };

  const onCrowbar = () => {
    if (hasItem("crowbar")) return;
    if (!addItem("crowbar")) return;
    startDialogue("crowbar_found");
  };

  const onTinCan = () => {
    if (hasItem("tin_can")) return;
    if (!addItem("tin_can")) return;
    startDialogue("tin_can_found");
  };

  const onOilPuddle = () => {
    if (getSelectedItem() === "tin_can") {
      removeItem("tin_can");
      if (!addItem("oil_can")) return;
      startDialogue("oil_scooped");
      return;
    }
    startDialogue("oil_puddle_idle");
  };

  const onChock = () => {
    if (getSelectedItem() === "crowbar") {
      setFlag("chock_removed");
      startDialogue("chock_removed");
      return;
    }
    startDialogue("bin_chock_hint");
  };

  const onBin = () => {
    if (binMoved) {
      startDialogue("bin_gone");
      return;
    }
    if (!chockRemoved) {
      startDialogue("bin_blocked");
      return;
    }
    if (!wheelOiled) {
      if (getSelectedItem() === "oil_can") {
        removeItem("oil_can");
        setFlag("wheel_oiled");
        startDialogue("wheel_oiled");
        return;
      }
      startDialogue("bin_wheel_rusty");
      return;
    }
    // Rad geölt & Klotz weg → Tonne rollt weg und legt das Loch frei.
    setFlag("bin_moved");
    startDialogue("bin_rolled");
    showToast("Loch entdeckt!");
  };

  const onHole = () => {
    if (!holeOpen) {
      setFlag("hole_open");
      startDialogue("hole_plugged");
      return;
    }
    // Loch ist frei → durchschlüpfen und ins Haus wechseln.
    setFlag("entered_house");
    startDialogue("house_entered");
    goToScene("hallway");
  };

  return (
    <group>
      <YardGround />
      <YardBoundary />
      <HouseWall holeOpen={holeOpen} />
      <Player />

      {/* Hundehütte + Fuchs (einziger Charakter) */}
      <group position={[-8, 0, -8]}>
        <Doghouse />
      </group>
      <Interactable
        id="fox"
        position={[-8, 0, -6.9]}
        radius={1.9}
        onInteract={onFox}
        onLook={() => startDialogue("look_fox")}
      >
        <Fox />
      </Interactable>

      {/* Haustür + Fußmatte (roter Faden / Sackgasse) */}
      <Interactable
        id="door"
        position={[3.2, 0, -10.0]}
        radius={2.1}
        onInteract={onDoor}
        onLook={() => startDialogue("look_door")}
      >
        <mesh position={[0, 1.7, 0]}>
          <boxGeometry args={[1.8, 3.4, 0.6]} />
          <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
        </mesh>
      </Interactable>
      <group position={[3.2, 0, -9.0]}>
        <Doormat />
      </group>
      <Interactable
        id="doormat"
        position={[3.2, 0, -9.0]}
        radius={1.5}
        onInteract={onDoormat}
        onLook={() => startDialogue("look_doormat")}
      >
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.9]} />
          <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
        </mesh>
      </Interactable>

      {/* Auto + Öllache + Brecheisen (rechte Hofseite) */}
      <group position={[8, 0, -3]}>
        <ParkedCar />
      </group>
      <Interactable
        id="car"
        position={[8, 0, -3]}
        radius={2.6}
        onInteract={() => startDialogue("look_car")}
        onLook={() => startDialogue("look_car")}
      >
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[3.8, 2, 2]} />
          <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
        </mesh>
      </Interactable>
      <group position={[8, 0, -1.9]}>
        <OilPuddle />
      </group>
      <Interactable
        id="oil"
        position={[8, 0, -1.4]}
        radius={1.7}
        onInteract={onOilPuddle}
        onLook={() => startDialogue("look_oil")}
      >
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[2, 0.2, 1.4]} />
          <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
        </mesh>
      </Interactable>
      {!hasItem("crowbar") && !isDropped("crowbar") && (
        <Interactable
          id="crowbar"
          position={[5.6, 0, -1.4]}
          radius={1.4}
          onInteract={onCrowbar}
          onLook={() => startDialogue("look_car")}
        >
          <CrowbarModel />
        </Interactable>
      )}

      {/* Blechdose zum Aufheben (Hofmitte) */}
      {!hasItem("tin_can") && !hasItem("oil_can") && !isDropped("tin_can") && (
        <Interactable
          id="tin-can"
          position={[0.5, 0, 1.5]}
          radius={1.3}
          onInteract={onTinCan}
        >
          <TinCanModel />
        </Interactable>
      )}

      {/* Mülltonne, die das Loch verdeckt */}
      <group position={binMoved ? [-9, 0, 4] : [-4, 0, -9.4]}>
        <WheelieBin toppled={binMoved} />
      </group>
      <Interactable
        id="bin"
        position={binMoved ? [-9, 0, 4] : [-4, 0, -9.1]}
        radius={2.0}
        onInteract={onBin}
        onLook={() => startDialogue("look_bin")}
      >
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1.5, 2.2, 1.3]} />
          <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
        </mesh>
      </Interactable>

      {/* Bremsklotz unter dem Rad (nur solange nicht entfernt) */}
      {!chockRemoved && (
        <>
          <group position={[-4.55, 0, -9.9]}>
            <BrickChock />
          </group>
          <Interactable
            id="chock"
            position={[-4.55, 0, -9.6]}
            radius={1.4}
            onInteract={onChock}
            onLook={() => startDialogue("look_chock")}
          >
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.7, 0.5, 0.6]} />
              <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
            </mesh>
          </Interactable>
        </>
      )}

      {/* Das Loch — erst erreichbar, wenn die Tonne weg ist */}
      {binMoved && (
        <Interactable
          id="hole"
          position={[-4, 0, -9.9]}
          radius={1.7}
          onInteract={onHole}
          onLook={() => startDialogue("look_hole")}
        >
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.1, 0.9, 0.6]} />
            <meshBasicMaterial transparent opacity={0.002} depthWrite={false} />
          </mesh>
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
