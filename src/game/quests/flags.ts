export type QuestFlag =
  | "has_talked_to_hedgehog"
  | "pot_examined"
  | "gate_open"
  | "dug_near_gate"
  | "dog_cleared"
  | "entered_house"
  | "stairs_clear"
  | "vault_open"
  | "won";

export type FlagMap = Record<QuestFlag, boolean>;

export const INITIAL_FLAGS: FlagMap = {
  has_talked_to_hedgehog: false,
  pot_examined: false,
  gate_open: false,
  dug_near_gate: false,
  dog_cleared: false,
  entered_house: false,
  stairs_clear: false,
  vault_open: false,
  won: false,
};

export type SceneId = "garden" | "yard" | "hallway" | "upstairs" | "ending";
