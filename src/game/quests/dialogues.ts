export type DialogueLine = {
  speaker: string;
  text: string;
};

export type DialogueId =
  | "hedgehog_intro"
  | "hedgehog_hint"
  | "sparrow_hungry"
  | "sparrow_thanks"
  | "gate_locked"
  | "gate_wrong_item"
  | "gate_opened"
  | "pot_empty"
  | "pot_found_key"
  | "crumbs_pickup"
  | "dig_success"
  | "need_item"
  | "inventory_full"
  | "yard_teaser"
  | "stone_pickup"
  | "leaf_pickup"
  | "cap_pickup"
  | "pond_idle"
  | "pond_splash"
  | "frog_idle"
  | "frog_splash"
  | "snail_idle"
  | "snail_leaf"
  | "gnome_idle"
  | "gnome_cap"
  | "shed_locked"
  | "shed_key"
  | "birdbath"
  | "bench"
  | "compost"
  | "watering_can"
  | "wheelbarrow";

export const DIALOGUES: Record<DialogueId, DialogueLine[]> = {
  hedgehog_intro: [
    {
      speaker: "Igel Ignatz",
      text: "Psst… Meerschweinchen. Du willst zu den Erbsen-Chips, oder?",
    },
    {
      speaker: "Igel Ignatz",
      text: "Das Gartentor ist zu. Unter dem Blumentopf liegt oft ein Schlüssel. Oder du buddelst… Spatzen wissen sowas.",
    },
  ],
  hedgehog_hint: [
    {
      speaker: "Igel Ignatz",
      text: "Manche Töpfe verbergen mehr als Erde. Und Pip der Spatz wird bei einem guten Tausch erstaunlich gesprächig.",
    },
  ],
  sparrow_hungry: [
    {
      speaker: "Spatz Pip",
      text: "Piep! Ich tausch meinen Mini-Spaten… aber nur gegen leckere Krümel!",
    },
  ],
  sparrow_thanks: [
    {
      speaker: "Spatz Pip",
      text: "Mmmh! Hier, nimm den Spaten. Am Tor ist die Erde ganz weich.",
    },
  ],
  gate_locked: [
    {
      speaker: "System",
      text: "Das Gartentor ist fest verriegelt. Der alte Riegel sitzt tief und bewegt sich keinen Millimeter.",
    },
  ],
  gate_wrong_item: [
    {
      speaker: "System",
      text: "Netter Versuch, aber damit lässt sich der schwere Riegel nicht bewegen.",
    },
  ],
  gate_opened: [
    {
      speaker: "System",
      text: "Das Tor knarrt auf! Der Hof wartet – und irgendwo dahinter die Erbsen-Chips.",
    },
  ],
  pot_empty: [
    {
      speaker: "System",
      text: "Unter dem Topf ist nichts mehr. Du hast den Schlüssel schon.",
    },
  ],
  pot_found_key: [
    {
      speaker: "System",
      text: "Unter dem Blumentopf blitzt ein rostiger Schlüssel!",
    },
  ],
  crumbs_pickup: [
    {
      speaker: "System",
      text: "Du sammelst ein paar Brotkrümel auf.",
    },
  ],
  dig_success: [
    {
      speaker: "System",
      text: "Buddel, buddel… der Riegel gibt nach! Das Tor ist offen.",
    },
  ],
  need_item: [
    {
      speaker: "System",
      text: "Die Erde hier ist auffällig locker. Mit bloßen Pfoten kommst du trotzdem nicht tief genug.",
    },
  ],
  inventory_full: [
    {
      speaker: "System",
      text: "Inventar voll (4 Plätze)! Lege etwas ab oder benutze ein Item zuerst.",
    },
  ],
  yard_teaser: [
    {
      speaker: "System",
      text: "Hof-Szene kommt als Nächstes. Für jetzt: Tor offen = MVP geschafft!",
    },
  ],
  stone_pickup: [
    {
      speaker: "System",
      text: "Ein ungewöhnlich glatter Stein. Er sieht wichtig aus. Das muss aber nichts heißen.",
    },
  ],
  leaf_pickup: [
    {
      speaker: "System",
      text: "Du hebst ein besonders rotes Blatt auf. Es riecht nach Herbst und ein bisschen nach Schnecke.",
    },
  ],
  cap_pickup: [
    {
      speaker: "System",
      text: "Ein blauer Kronkorken funkelt im Gras. Viel zu klein für einen normalen Kopf.",
    },
  ],
  pond_idle: [
    {
      speaker: "System",
      text: "Im Teich schwimmen Seerosen. Unter der Oberfläche glitzert etwas — nur Sonnenlicht.",
    },
  ],
  pond_splash: [
    {
      speaker: "System",
      text: "Platsch! Der glatte Stein hüpft zweimal übers Wasser. Das Tor zeigt sich unbeeindruckt.",
    },
  ],
  frog_idle: [
    {
      speaker: "Frosch Fridolin",
      text: "Quak. Ich kenne mich mit Fliegen aus, nicht mit Gartentoren.",
    },
  ],
  frog_splash: [
    {
      speaker: "Frosch Fridolin",
      text: "Eine solide Acht von zehn für den Platscher. Für einen Schlüssel gibt es trotzdem null Punkte.",
    },
  ],
  snail_idle: [
    {
      speaker: "Schnecke Suse",
      text: "Ich bin unterwegs zum Salatbeet. Frag mich morgen noch mal, ob ich angekommen bin.",
    },
  ],
  snail_leaf: [
    {
      speaker: "Schnecke Suse",
      text: "Oh, ein Blatt! Nicht mein Lieblingsgericht, aber perfekte Reiseverpflegung. Danke!",
    },
    {
      speaker: "System",
      text: "Suse ist glücklich. Am Gartentor ändert das rein gar nichts.",
    },
  ],
  gnome_idle: [
    {
      speaker: "Gartenzwerg Günter",
      text: "Ich bewache die Tulpen. Geheimnisse? Nein. Ich stehe hier wirklich nur dekorativ herum.",
    },
  ],
  gnome_cap: [
    {
      speaker: "Gartenzwerg Günter",
      text: "Der Kronkorken passt als Orden an meinen Mantel. Endlich erkennt jemand meinen Einsatz!",
    },
    {
      speaker: "System",
      text: "Günter sieht wichtiger aus. Das Tor bleibt zu.",
    },
  ],
  shed_locked: [
    {
      speaker: "System",
      text: "Der Gartenschuppen ist abgeschlossen. Durch das Fenster siehst du nur Töpfe und eine sehr müde Harke.",
    },
  ],
  shed_key: [
    {
      speaker: "System",
      text: "Der rostige Schlüssel passt nicht ins Schuppenschloss. Gut, dass er nicht abgebrochen ist.",
    },
  ],
  birdbath: [
    {
      speaker: "System",
      text: "Klares Wasser, drei Federn und kein geheimer Hebel. Du hast gründlich nachgesehen.",
    },
  ],
  bench: [
    {
      speaker: "System",
      text: "Eine gemütliche Bank — für Menschen. Du ruhst kurz im Schatten darunter aus.",
    },
  ],
  compost: [
    {
      speaker: "System",
      text: "Der Kompost riecht nach Abenteuer, aber eher nach der unangenehmen Sorte. Kein brauchbares Item.",
    },
  ],
  watering_can: [
    {
      speaker: "System",
      text: "Die Gießkanne ist fast so groß wie du und leider leer. Schieben kannst du sie auch nicht.",
    },
  ],
  wheelbarrow: [
    {
      speaker: "System",
      text: "Die Schubkarre quietscht eindrucksvoll, fährt aber keinen Zentimeter. Sackgasse.",
    },
  ],
};
