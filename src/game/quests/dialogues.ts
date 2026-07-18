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
  | "gate_opened"
  | "pot_empty"
  | "pot_found_key"
  | "crumbs_pickup"
  | "dig_success"
  | "need_item"
  | "inventory_full"
  | "yard_teaser";

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
      text: "Blumentopf. Oder Spatz + Krümel + Buddeln. Zwei Wege, ein Tor.",
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
      text: "Das Gartentor ist fest verriegelt. Vielleicht hilft ein Schlüssel… oder ein Spaten.",
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
      text: "Das funktioniert so nicht. Wähle das passende Item im Inventar.",
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
};
