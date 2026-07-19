export type ItemId =
  | "key_flowerpot"
  | "crumbs"
  | "shovel"
  | "dog_biscuit"
  | "tin_can"
  | "string"
  | "note"
  | "magnet"
  | "smooth_stone"
  | "red_leaf"
  | "bottle_cap";

export type ItemDef = {
  id: ItemId;
  name: string;
  description: string;
  /** Short label shown in inventory slots */
  glyph: string;
  /**
   * Rätsel-relevante Gegenstände sind wichtig: Sie lassen sich nicht ablegen,
   * damit man sich das Spiel nicht durch versehentliches Wegwerfen verbaut.
   * Reine Ablenkungs-/Deko-Items bleiben ablegbar (Inventar-Management).
   */
  important?: boolean;
};

export const ITEM_CATALOG: Record<ItemId, ItemDef> = {
  key_flowerpot: {
    id: "key_flowerpot",
    name: "Blumentopf-Schlüssel",
    description: "Ein rostiger Schlüssel, der unter dem Topf lag.",
    glyph: "KEY",
    important: true,
  },
  crumbs: {
    id: "crumbs",
    name: "Krümel",
    description: "Knusprige Brotkrümel. Vögel lieben die.",
    glyph: "KRU",
    important: true,
  },
  shovel: {
    id: "shovel",
    name: "Mini-Spaten",
    description: "Klein genug für Pfoten. Gut zum Buddeln.",
    glyph: "SPA",
    important: true,
  },
  dog_biscuit: {
    id: "dog_biscuit",
    name: "Hundekeks",
    description: "Riecht verdächtig nach Hofhund-Bestechung.",
    glyph: "KEK",
    important: true,
  },
  tin_can: {
    id: "tin_can",
    name: "Blechdose",
    description: "Macht Krach, wenn man sie wirft.",
    glyph: "DOS",
    important: true,
  },
  string: {
    id: "string",
    name: "Schnur",
    description: "Dünn, aber zäh. Ideal für Tricks.",
    glyph: "SCH",
    important: true,
  },
  note: {
    id: "note",
    name: "Notizzettel",
    description: "Kritzelige Zahlen. Vielleicht ein Code?",
    glyph: "NOT",
    important: true,
  },
  magnet: {
    id: "magnet",
    name: "Magnet",
    description: "Zieht metallische Geheimnisse an.",
    glyph: "MAG",
    important: true,
  },
  smooth_stone: {
    id: "smooth_stone",
    name: "Glatter Stein",
    description: "Schön rund. Vielleicht kann man ihn irgendwo hineinwerfen.",
    glyph: "STE",
  },
  red_leaf: {
    id: "red_leaf",
    name: "Rotes Blatt",
    description: "Knistert interessant und riecht nach Herbst.",
    glyph: "BLT",
  },
  bottle_cap: {
    id: "bottle_cap",
    name: "Blauer Kronkorken",
    description: "Glänzt wie ein winziger Hut.",
    glyph: "KRO",
  },
};

export const INVENTORY_SIZE = 4;

/** Wichtige (rätselrelevante) Items dürfen nicht abgelegt/weggeworfen werden. */
export function isImportantItem(item: ItemId): boolean {
  return ITEM_CATALOG[item].important === true;
}
