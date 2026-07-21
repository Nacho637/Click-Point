"use client";

import { ITEM_CATALOG, type ItemId } from "@/game/items/catalog";
import { useGameStore } from "@/game/store";
import type { SpriteKey } from "@/game/pixel/sprites";

/** Ein platziertes Element auf der 2D-Karte. Ohne `id` reine Deko. */
export type Placed = {
  id?: string;
  key: SpriteKey;
  x: number;
  z: number;
  radius?: number;
  /** Flach auf dem Boden (mittig) statt aufrecht (Fußpunkt). */
  flat?: boolean;
  onInteract?: () => void;
  onLook?: () => void;
};

const S = () => useGameStore.getState();

export const ITEM_SPRITE: Record<ItemId, SpriteKey> = {
  smooth_stone: "stone",
  red_leaf: "leaf",
  bottle_cap: "cap",
  crumbs: "crumbs",
  key_flowerpot: "key",
  shovel: "shovel",
  magnet: "magnet",
  tin_can: "tinCan",
  oil_can: "oilCan",
  note: "note",
  string: "string",
  dog_biscuit: "biscuit",
  crowbar: "crowbar",
  rusty_key: "rustyKey",
};

function droppedPlaced(): Placed[] {
  const { droppedItems, pickUpDropped, showToast } = S();
  return droppedItems.map((d) => ({
    id: `dropped-${d.item}`,
    key: ITEM_SPRITE[d.item],
    x: d.position[0],
    z: d.position[2],
    radius: 1.4,
    flat: true,
    onInteract: () => pickUpDropped(d.item),
    onLook: () => showToast(ITEM_CATALOG[d.item].description),
  }));
}

// ── Garten ───────────────────────────────────────────────────────────────────

function gardenScene(): Placed[] {
  const st = useGameStore.getState();
  const { flags } = st;
  const gateOpen = flags.gate_open;
  const has = (i: ItemId) => st.hasItem(i);
  const dropped = (i: ItemId) => st.droppedItems.some((d) => d.item === i);

  const start = (id: Parameters<typeof st.startDialogue>[0]) => st.startDialogue(id);

  const pickUp = (item: ItemId, dlg: "stone_pickup" | "leaf_pickup" | "cap_pickup") => {
    const s = S();
    if (s.hasItem(item)) return;
    if (!s.addItem(item)) return;
    s.startDialogue(dlg);
  };

  const onHedgehog = () => {
    const s = S();
    if (!s.hasFlag("has_talked_to_hedgehog")) {
      s.setFlag("has_talked_to_hedgehog");
      s.startDialogue("hedgehog_intro");
      return;
    }
    s.startDialogue("hedgehog_hint");
  };
  const onFlowerPot = () => {
    const s = S();
    if (s.hasItem("key_flowerpot") || s.hasFlag("pot_examined")) {
      s.startDialogue("pot_empty");
      return;
    }
    if (!s.addItem("key_flowerpot")) return;
    s.setFlag("pot_examined");
    s.startDialogue("pot_found_key");
  };
  const onCrumbs = () => {
    const s = S();
    if (s.hasItem("crumbs") || s.hasItem("shovel") || s.hasFlag("dug_near_gate")) return;
    if (!s.addItem("crumbs")) return;
    s.startDialogue("crumbs_pickup");
  };
  const onSparrow = () => {
    const s = S();
    const selected = s.getSelectedItem();
    if (s.hasItem("shovel") || s.hasFlag("dug_near_gate") || s.flags.gate_open) {
      s.startDialogue("sparrow_thanks");
      return;
    }
    if (selected === "crumbs") {
      s.removeItem("crumbs");
      if (!s.addItem("shovel")) return;
      s.startDialogue("sparrow_thanks");
      return;
    }
    s.startDialogue("sparrow_hungry");
  };
  const onGate = () => {
    const s = S();
    if (s.flags.gate_open) {
      s.showToast("Du schlüpfst in den Hof …");
      s.goToScene("yard");
      s.startDialogue("yard_intro");
      return;
    }
    const selected = s.getSelectedItem();
    if (selected === "key_flowerpot") {
      s.removeItem("key_flowerpot");
      s.setFlag("gate_open");
      s.startDialogue("gate_opened");
      s.showToast("Gartentor geöffnet!");
      return;
    }
    s.startDialogue(selected ? "gate_wrong_item" : "gate_locked");
  };
  const onDigSpot = () => {
    const s = S();
    if (s.flags.gate_open) {
      s.startDialogue("yard_teaser");
      return;
    }
    if (s.getSelectedItem() === "shovel") {
      s.removeItem("shovel");
      s.setFlag("dug_near_gate");
      s.setFlag("gate_open");
      s.startDialogue("dig_success");
      s.showToast("Gartentor geöffnet!");
      return;
    }
    s.startDialogue("need_item");
  };
  const talker = (
    flag: Parameters<typeof st.hasFlag>[0],
    menu: Parameters<typeof st.openTopics>[0],
    intro: Parameters<typeof st.startDialogue>[0],
  ) => () => {
    const s = S();
    if (!s.hasFlag(flag)) {
      s.setFlag(flag);
      s.openTopicsAfterDialogue(menu, intro);
      return;
    }
    s.openTopics(menu);
  };

  const crumbsGone =
    has("crumbs") || dropped("crumbs") || has("shovel") || flags.dug_near_gate || gateOpen;

  const placed: Placed[] = [
    // Deko-Rand (Bäume/Büsche für Tiefe)
    { key: "tree", x: -15, z: -8 },
    { key: "tree", x: 15, z: -9 },
    { key: "tree", x: -16, z: 12 },
    { key: "tree", x: 16, z: 13 },
    { key: "bush", x: -12, z: -10 },
    { key: "bush", x: 12, z: -10 },
    { key: "bush", x: -10, z: 15 },
    { key: "bush", x: 10, z: 15 },

    { id: "gate", key: gateOpen ? "gateOpen" : "gateClosed", x: 0, z: -10.4, radius: 2.4,
      onInteract: onGate, onLook: () => start("look_gate") },

    { id: "hedgehog", key: "hedgehog", x: -2.8, z: 6.2, radius: 1.9,
      onInteract: onHedgehog, onLook: () => start("look_hedgehog") },
    { id: "flowerpot", key: "flowerpot", x: -6.8, z: 4.2, radius: 1.8,
      onInteract: onFlowerPot, onLook: () => start("look_flowerpot") },
    { id: "sparrow", key: "sparrow", x: 7.2, z: -1.6, radius: 1.9,
      onInteract: onSparrow, onLook: () => start("look_sparrow") },
    { id: "digspot", key: "digspot", x: 1.35, z: -9.55, radius: 1.6, flat: true,
      onInteract: onDigSpot, onLook: () => start("look_digspot") },

    { key: "pond", x: -7.9, z: -2.2, flat: true },
    { id: "pond", key: "birdbath", x: -8.15, z: -2.9, radius: 1.9,
      onInteract: () => start(S().getSelectedItem() === "smooth_stone" ? "pond_splash" : "pond_idle"),
      onLook: () => start("look_pond") },
    { id: "frog", key: "frog", x: -5.55, z: -2.55, radius: 1.5,
      onInteract: () => start(S().getSelectedItem() === "smooth_stone" ? "frog_splash" : "frog_idle"),
      onLook: () => start("look_frog") },

    { id: "snail", key: "snail", x: -5.2, z: 8.5, radius: 1.6,
      onInteract: () => start(S().getSelectedItem() === "red_leaf" ? "snail_leaf" : "snail_idle"),
      onLook: () => start("look_snail") },
    { id: "gnome", key: "gnome", x: 7, z: 3.2, radius: 1.7,
      onInteract: () => start(S().getSelectedItem() === "bottle_cap" ? "gnome_cap" : "gnome_idle"),
      onLook: () => start("look_gnome") },
    { id: "shed", key: "shed", x: 8.6, z: -7.3, radius: 2.6,
      onInteract: () => start(S().getSelectedItem() === "key_flowerpot" ? "shed_key" : "shed_locked"),
      onLook: () => start("look_shed") },
    { id: "bench", key: "bench", x: 3.7, z: 4.1, radius: 1.9,
      onInteract: () => start("bench"), onLook: () => start("look_bench") },
    { id: "birdbath", key: "birdbath", x: -3.8, z: 0.5, radius: 1.7,
      onInteract: () => start("birdbath"), onLook: () => start("look_birdbath") },
    { id: "compost", key: "compost", x: 9.5, z: 7.6, radius: 1.8, flat: true,
      onInteract: () => start("compost"), onLook: () => start("look_compost") },
    { id: "watering-can", key: "wateringCan", x: -8.9, z: 6.3, radius: 1.6,
      onInteract: () => start("watering_can"), onLook: () => start("look_wateringcan") },
    { id: "wheelbarrow", key: "wheelbarrow", x: 5.7, z: -7.1, radius: 1.9,
      onInteract: () => start("wheelbarrow"), onLook: () => start("look_wheelbarrow") },
    { id: "meadow", key: "flowers", x: -14.5, z: 4.5, radius: 2.4,
      onInteract: () => start("meadow_idle"), onLook: () => start("look_meadow") },
    { id: "beet", key: "vegbed", x: 14, z: 7, radius: 2.6, flat: true,
      onInteract: () => start("beet_idle"), onLook: () => start("look_beet") },
    { id: "oak", key: "tree", x: 2.5, z: 16, radius: 2.6,
      onInteract: () => start("oak_idle"), onLook: () => start("look_oak") },

    { id: "mouse", key: "mouse", x: -15.2, z: 2.6, radius: 1.6,
      onInteract: talker("met_mouse", "mouse_topics", "mouse_intro"), onLook: () => start("look_mouse") },
    { id: "bee", key: "bee", x: -13.4, z: 6.8, radius: 1.7,
      onInteract: talker("met_bee", "bee_topics", "bee_intro"), onLook: () => start("look_bee") },
    { id: "worm", key: "worm", x: 13.6, z: 8.6, radius: 1.6, flat: true,
      onInteract: talker("met_worm", "worm_topics", "worm_intro"), onLook: () => start("look_worm") },
    { id: "squirrel", key: "squirrel", x: 2.8, z: 14.6, radius: 1.8,
      onInteract: talker("met_squirrel", "squirrel_topics", "squirrel_intro"), onLook: () => start("look_squirrel") },
    { id: "blackbird", key: "blackbird", x: 15.8, z: 3.4, radius: 1.7,
      onInteract: talker("met_blackbird", "blackbird_topics", "blackbird_intro"), onLook: () => start("look_blackbird") },
  ];

  if (!crumbsGone) {
    placed.push({ id: "crumbs", key: "crumbs", x: 4.8, z: 7.5, radius: 1.5, flat: true, onInteract: onCrumbs });
  }
  if (!has("smooth_stone") && !dropped("smooth_stone")) {
    placed.push({ id: "smooth-stone", key: "stone", x: -9.5, z: 0.2, radius: 1.5, flat: true,
      onInteract: () => pickUp("smooth_stone", "stone_pickup") });
  }
  if (!has("red_leaf") && !dropped("red_leaf")) {
    placed.push({ id: "red-leaf", key: "leaf", x: -3.4, z: 9.7, radius: 1.4, flat: true,
      onInteract: () => pickUp("red_leaf", "leaf_pickup") });
  }
  if (!has("bottle_cap") && !dropped("bottle_cap")) {
    placed.push({ id: "bottle-cap", key: "cap", x: 8.7, z: 0.7, radius: 1.4, flat: true,
      onInteract: () => pickUp("bottle_cap", "cap_pickup") });
  }

  return [...placed, ...droppedPlaced()];
}

// ── Hof ──────────────────────────────────────────────────────────────────────

function yardScene(): Placed[] {
  const st = useGameStore.getState();
  const { flags } = st;
  const has = (i: ItemId) => st.hasItem(i);
  const dropped = (i: ItemId) => st.droppedItems.some((d) => d.item === i);
  const start = (id: Parameters<typeof st.startDialogue>[0]) => st.startDialogue(id);

  const onFox = () => {
    const s = S();
    if (!s.hasFlag("met_fox")) {
      s.setFlag("met_fox");
      s.openTopicsAfterDialogue("fox_topics", "fox_intro");
      return;
    }
    s.openTopics("fox_topics");
  };
  const onDoormat = () => {
    const s = S();
    if (s.hasItem("rusty_key") || s.droppedItems.some((d) => d.item === "rusty_key") || s.hasFlag("door_booger")) {
      s.startDialogue("look_doormat");
      return;
    }
    if (!s.addItem("rusty_key")) return;
    s.startDialogue("rusty_key_found");
  };
  const onDoor = () => {
    const s = S();
    const selected = s.getSelectedItem();
    if (selected === "rusty_key") {
      s.setFlag("door_booger");
      s.startDialogue("door_booger");
      return;
    }
    if (s.hasFlag("door_booger")) {
      s.startDialogue("door_booger_stuck");
      return;
    }
    s.startDialogue("door_locked");
  };
  const onCrowbar = () => {
    const s = S();
    if (s.hasItem("crowbar")) return;
    if (!s.addItem("crowbar")) return;
    s.startDialogue("crowbar_found");
  };
  const onTinCan = () => {
    const s = S();
    if (s.hasItem("tin_can")) return;
    if (!s.addItem("tin_can")) return;
    s.startDialogue("tin_can_found");
  };
  const onOilPuddle = () => {
    const s = S();
    if (s.getSelectedItem() === "tin_can") {
      s.removeItem("tin_can");
      if (!s.addItem("oil_can")) return;
      s.startDialogue("oil_scooped");
      return;
    }
    s.startDialogue("oil_puddle_idle");
  };
  const onChock = () => {
    const s = S();
    if (s.getSelectedItem() === "crowbar") {
      s.setFlag("chock_removed");
      s.startDialogue("chock_removed");
      return;
    }
    s.startDialogue("bin_chock_hint");
  };
  const onBin = () => {
    const s = S();
    if (s.flags.bin_moved) {
      s.startDialogue("bin_gone");
      return;
    }
    if (!s.flags.chock_removed) {
      s.startDialogue("bin_blocked");
      return;
    }
    if (!s.flags.wheel_oiled) {
      if (s.getSelectedItem() === "oil_can") {
        s.removeItem("oil_can");
        s.setFlag("wheel_oiled");
        s.startDialogue("wheel_oiled");
        return;
      }
      s.startDialogue("bin_wheel_rusty");
      return;
    }
    s.setFlag("bin_moved");
    s.startDialogue("bin_rolled");
    s.showToast("Loch entdeckt!");
  };
  const onHole = () => {
    const s = S();
    if (!s.flags.hole_open) {
      s.setFlag("hole_open");
      s.startDialogue("hole_plugged");
      return;
    }
    s.setFlag("entered_house");
    s.startDialogue("house_entered");
    s.goToScene("hallway");
  };

  const placed: Placed[] = [
    { key: "tree", x: -15.5, z: 2 },
    { key: "tree", x: 15.5, z: 3 },
    { key: "bush", x: -14, z: 6 },
    { key: "bush", x: 14, z: 7 },
    { key: "bush", x: -4, z: 15.5 },
    { key: "bush", x: 3, z: 15.5 },

    { key: "doghouse", x: -8, z: -8.4 },
    { id: "fox", key: "fox", x: -8, z: -6.9, radius: 2.0,
      onInteract: onFox, onLook: () => start("look_fox") },

    { key: "door", x: 3.2, z: -10.6 },
    { id: "door", key: "door", x: 3.2, z: -10.0, radius: 2.1,
      onInteract: onDoor, onLook: () => start("look_door") },
    { id: "doormat", key: "doormat", x: 3.2, z: -9.0, radius: 1.6, flat: true,
      onInteract: onDoormat, onLook: () => start("look_doormat") },

    { key: "car", x: 8, z: -3 },
    { id: "car", key: "car", x: 8, z: -3, radius: 2.8,
      onInteract: () => start("look_car"), onLook: () => start("look_car") },
    { id: "oil", key: "puddle", x: 8, z: -1.4, radius: 1.8, flat: true,
      onInteract: onOilPuddle, onLook: () => start("look_oil") },

    { id: "bin", key: "bin", x: flags.bin_moved ? -9 : -4, z: flags.bin_moved ? 4 : -9.1, radius: 2.0,
      onInteract: onBin, onLook: () => start("look_bin") },
  ];

  if (!has("crowbar") && !dropped("crowbar")) {
    placed.push({ id: "crowbar", key: "crowbar", x: 5.6, z: -1.4, radius: 1.5, flat: true,
      onInteract: onCrowbar, onLook: () => start("look_car") });
  }
  if (!has("tin_can") && !has("oil_can") && !dropped("tin_can")) {
    placed.push({ id: "tin-can", key: "tinCan", x: 0.5, z: 1.5, radius: 1.4, flat: true, onInteract: onTinCan });
  }
  if (!flags.chock_removed) {
    placed.push({ id: "chock", key: "brick", x: -4.55, z: -9.6, radius: 1.5, flat: true,
      onInteract: onChock, onLook: () => start("look_chock") });
  }
  if (flags.bin_moved) {
    placed.push({ id: "hole", key: "hole", x: -4, z: -9.9, radius: 1.8, flat: true,
      onInteract: onHole, onLook: () => start("look_hole") });
  }

  return [...placed, ...droppedPlaced()];
}

// ── Innenraum (Platzhalter) ───────────────────────────────────────────────────

function hallwayScene(): Placed[] {
  const st = useGameStore.getState();
  const start = (id: Parameters<typeof st.startDialogue>[0]) => st.startDialogue(id);
  return [
    { key: "hole", x: -4, z: -10.4, flat: true },
    { key: "stairs", x: 5, z: -9 },
    { id: "hallway-sign", key: "sign", x: -4, z: -3, radius: 2.2,
      onInteract: () => start("hallway_sign"), onLook: () => start("hallway_sign") },
  ];
}

/** Aktuelle Szene als Liste platzierter Sprites (mit gebundenen Handlern). */
export function usePixelScene(): Placed[] {
  const sceneId = useGameStore((s) => s.sceneId);
  // Auf relevante Zustände lauschen, damit Sichtbarkeit/Positionen neu berechnet werden.
  useGameStore((s) => s.flags);
  useGameStore((s) => s.inventory);
  useGameStore((s) => s.droppedItems);

  if (sceneId === "yard") return yardScene();
  if (sceneId === "hallway" || sceneId === "upstairs" || sceneId === "ending") return hallwayScene();
  return gardenScene();
}
