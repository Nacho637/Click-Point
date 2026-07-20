export type QuestFlag =
  | "has_talked_to_hedgehog"
  | "pot_examined"
  | "gate_open"
  | "dug_near_gate"
  | "dog_cleared"
  | "entered_house"
  | "stairs_clear"
  | "vault_open"
  | "won"
  | "met_mouse"
  | "met_bee"
  | "met_worm"
  | "met_squirrel"
  | "met_blackbird"
  | "met_fox"
  | "door_booger"
  | "chock_removed"
  | "wheel_oiled"
  | "bin_moved"
  | "hole_open";

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
  met_mouse: false,
  met_bee: false,
  met_worm: false,
  met_squirrel: false,
  met_blackbird: false,
  met_fox: false,
  door_booger: false,
  chock_removed: false,
  wheel_oiled: false,
  bin_moved: false,
  hole_open: false,
};

export type SceneId = "garden" | "yard" | "hallway" | "upstairs" | "ending";
