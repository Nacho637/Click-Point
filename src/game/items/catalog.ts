export type ItemId =
  | "key_flowerpot"
  | "crumbs"
  | "shovel"
  | "dog_biscuit"
  | "tin_can"
  | "string"
  | "note"
  | "magnet";

export type ItemDef = {
  id: ItemId;
  name: string;
  description: string;
  /** Short label shown in inventory slots */
  glyph: string;
};

export const ITEM_CATALOG: Record<ItemId, ItemDef> = {
  key_flowerpot: {
    id: "key_flowerpot",
    name: "Blumentopf-Schlüssel",
    description: "Ein rostiger Schlüssel, der unter dem Topf lag.",
    glyph: "KEY",
  },
  crumbs: {
    id: "crumbs",
    name: "Krümel",
    description: "Knusprige Brotkrümel. Vögel lieben die.",
    glyph: "KRU",
  },
  shovel: {
    id: "shovel",
    name: "Mini-Spaten",
    description: "Klein genug für Pfoten. Gut zum Buddeln.",
    glyph: "SPA",
  },
  dog_biscuit: {
    id: "dog_biscuit",
    name: "Hundekeks",
    description: "Riecht verdächtig nach Hofhund-Bestechung.",
    glyph: "KEK",
  },
  tin_can: {
    id: "tin_can",
    name: "Blechdose",
    description: "Macht Krach, wenn man sie wirft.",
    glyph: "DOS",
  },
  string: {
    id: "string",
    name: "Schnur",
    description: "Dünn, aber zäh. Ideal für Tricks.",
    glyph: "SCH",
  },
  note: {
    id: "note",
    name: "Notizzettel",
    description: "Kritzelige Zahlen. Vielleicht ein Code?",
    glyph: "NOT",
  },
  magnet: {
    id: "magnet",
    name: "Magnet",
    description: "Zieht metallische Geheimnisse an.",
    glyph: "MAG",
  },
};

export const INVENTORY_SIZE = 4;
