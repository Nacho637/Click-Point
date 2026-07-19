"use client";

import { create } from "zustand";
import {
  INVENTORY_SIZE,
  ITEM_CATALOG,
  type ItemId,
} from "@/game/items/catalog";
import {
  DIALOGUES,
  type DialogueId,
  type DialogueLine,
} from "@/game/quests/dialogues";
import {
  TOPIC_MENUS,
  type DialogueChoice,
  type TopicMenuId,
} from "@/game/quests/dialogueTrees";
import {
  INITIAL_FLAGS,
  type FlagMap,
  type QuestFlag,
  type SceneId,
} from "@/game/quests/flags";

export type InventorySlot = ItemId | null;

/** Ein Gegenstand, der auf dem Boden liegt und wieder aufgehoben werden kann. */
export type DroppedItem = { item: ItemId; position: [number, number, number] };

type GameState = {
  sceneId: SceneId;
  flags: FlagMap;
  inventory: InventorySlot[];
  droppedItems: DroppedItem[];
  selectedSlot: number | null;
  dialogue: DialogueLine[] | null;
  dialogueIndex: number;
  choices: DialogueChoice[] | null;
  choiceMenuId: TopicMenuId | null;
  askedTopics: string[];
  verbMode: "use" | "look";
  nearbyId: string | null;
  toast: string | null;
  playerPosition: [number, number, number];

  setNearby: (id: string | null) => void;
  setPlayerPosition: (pos: [number, number, number]) => void;
  selectSlot: (index: number | null) => void;
  startDialogue: (id: DialogueId) => void;
  advanceDialogue: () => void;
  openTopics: (menuId: TopicMenuId) => void;
  openTopicsAfterDialogue: (menuId: TopicMenuId, introId: DialogueId) => void;
  chooseTopic: (choice: DialogueChoice) => void;
  closeChoices: () => void;
  toggleVerbMode: () => void;
  setFlag: (flag: QuestFlag, value?: boolean) => void;
  hasFlag: (flag: QuestFlag) => boolean;
  hasItem: (item: ItemId) => boolean;
  addItem: (item: ItemId) => boolean;
  removeItem: (item: ItemId) => void;
  getSelectedItem: () => ItemId | null;
  showToast: (message: string) => void;
  clearToast: () => void;
  goToScene: (scene: SceneId) => void;
  dropSelected: () => void;
  pickUpDropped: (item: ItemId) => void;
  isDropped: (item: ItemId) => boolean;
  getSavePayload: () => {
    scene_id: SceneId;
    inventory: InventorySlot[];
    dropped_items: DroppedItem[];
    flags: FlagMap;
  };
  loadSave: (data: {
    scene_id: SceneId;
    inventory: InventorySlot[];
    dropped_items?: DroppedItem[];
    flags: Partial<FlagMap>;
  }) => void;
};

function emptyInventory(): InventorySlot[] {
  return Array.from({ length: INVENTORY_SIZE }, () => null);
}

export const useGameStore = create<GameState>((set, get) => ({
  sceneId: "garden",
  flags: { ...INITIAL_FLAGS },
  inventory: emptyInventory(),
  droppedItems: [],
  selectedSlot: null,
  dialogue: null,
  dialogueIndex: 0,
  choices: null,
  choiceMenuId: null,
  askedTopics: [],
  verbMode: "use",
  nearbyId: null,
  toast: null,
  playerPosition: [0, 0.35, 8],

  setNearby: (id) => set({ nearbyId: id }),
  setPlayerPosition: (pos) => set({ playerPosition: pos }),

  selectSlot: (index) =>
    set((state) => ({
      selectedSlot: state.selectedSlot === index ? null : index,
    })),

  startDialogue: (id) =>
    set({
      dialogue: DIALOGUES[id],
      dialogueIndex: 0,
    }),

  advanceDialogue: () => {
    const { dialogue, dialogueIndex, choiceMenuId } = get();
    if (!dialogue) return;
    if (dialogueIndex + 1 >= dialogue.length) {
      // Nach einem Themen-Dialog kehrt das Gespräch zum Themenmenü zurück.
      set({
        dialogue: null,
        dialogueIndex: 0,
        choices: choiceMenuId ? TOPIC_MENUS[choiceMenuId] : null,
      });
      return;
    }
    set({ dialogueIndex: dialogueIndex + 1 });
  },

  openTopics: (menuId) =>
    set({ choices: TOPIC_MENUS[menuId], choiceMenuId: menuId }),

  openTopicsAfterDialogue: (menuId, introId) =>
    set({
      choiceMenuId: menuId,
      dialogue: DIALOGUES[introId],
      dialogueIndex: 0,
    }),

  chooseTopic: (choice) => {
    const { askedTopics } = get();
    set({
      choices: null,
      askedTopics: askedTopics.includes(choice.dialogueId)
        ? askedTopics
        : [...askedTopics, choice.dialogueId],
      ...(choice.bye ? { choiceMenuId: null } : {}),
    });
    get().startDialogue(choice.dialogueId);
  },

  closeChoices: () => set({ choices: null, choiceMenuId: null }),

  toggleVerbMode: () =>
    set((state) => ({ verbMode: state.verbMode === "use" ? "look" : "use" })),

  setFlag: (flag, value = true) =>
    set((state) => ({
      flags: { ...state.flags, [flag]: value },
    })),

  hasFlag: (flag) => get().flags[flag],

  hasItem: (item) => get().inventory.includes(item),

  addItem: (item) => {
    const { inventory, hasItem } = get();
    if (hasItem(item)) return true;
    const slot = inventory.findIndex((s) => s === null);
    if (slot === -1) {
      get().startDialogue("inventory_full");
      return false;
    }
    const next = [...inventory];
    next[slot] = item;
    set({ inventory: next });
    get().showToast(`${ITEM_CATALOG[item].name} erhalten`);
    return true;
  },

  removeItem: (item) => {
    const next = get().inventory.map((slot) => (slot === item ? null : slot));
    set({
      inventory: next,
      selectedSlot: null,
    });
  },

  getSelectedItem: () => {
    const { selectedSlot, inventory } = get();
    if (selectedSlot === null) return null;
    return inventory[selectedSlot];
  },

  showToast: (message) => {
    set({ toast: message });
    window.setTimeout(() => {
      if (get().toast === message) set({ toast: null });
    }, 2200);
  },

  clearToast: () => set({ toast: null }),

  goToScene: (scene) => set({ sceneId: scene }),

  dropSelected: () => {
    const { selectedSlot, inventory, droppedItems, playerPosition } = get();
    if (selectedSlot === null || inventory[selectedSlot] === null) return;
    const item = inventory[selectedSlot];
    if (!item) return;
    const next = [...inventory];
    next[selectedSlot] = null;
    // Der Gegenstand wird nicht mehr endgültig entfernt, sondern fällt vor dem
    // Spieler zu Boden. Mehrere abgelegte Dinge fächern sich leicht auf, damit
    // sie sich nicht exakt überlagern und einzeln wieder aufgehoben werden können.
    const angle = droppedItems.length * 1.1;
    const spot: [number, number, number] = [
      playerPosition[0] + Math.cos(angle) * 0.95,
      0,
      playerPosition[2] + Math.sin(angle) * 0.95,
    ];
    set({
      inventory: next,
      selectedSlot: null,
      droppedItems: [...droppedItems, { item, position: spot }],
    });
    get().showToast(`${ITEM_CATALOG[item].name} liegt jetzt am Boden`);
  },

  pickUpDropped: (item) => {
    const { droppedItems } = get();
    if (!droppedItems.some((d) => d.item === item)) return;
    // Nur aus dem Boden entfernen, wenn wirklich Platz im Inventar war.
    if (!get().addItem(item)) return;
    set({
      droppedItems: get().droppedItems.filter((d) => d.item !== item),
    });
  },

  isDropped: (item) => get().droppedItems.some((d) => d.item === item),

  getSavePayload: () => {
    const { sceneId, inventory, droppedItems, flags } = get();
    return {
      scene_id: sceneId,
      inventory,
      dropped_items: droppedItems,
      flags,
    };
  },

  loadSave: (data) =>
    set({
      sceneId: data.scene_id,
      inventory: data.inventory.length
        ? data.inventory
        : emptyInventory(),
      droppedItems: data.dropped_items ?? [],
      flags: { ...INITIAL_FLAGS, ...data.flags },
    }),
}));

// Dev-only: Store für Debugging/E2E-Tests in der Konsole erreichbar machen.
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  (window as unknown as { __gameStore?: typeof useGameStore }).__gameStore =
    useGameStore;
}
