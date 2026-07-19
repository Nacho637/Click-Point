export type DialogueLine = {
  speaker: string;
  /** Normale gesprochene Zeile. Entfällt, wenn `symbols` gesetzt ist. */
  text?: string;
  /** Lautschrift: reine Piktogramm-Zeile, groß statt Text gerendert. */
  symbols?: string;
  /** Deutsche Übersetzung einer Symbolzeile, per „Übersetzen“-Knopf einblendbar. */
  translation?: string;
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
  | "wheelbarrow"
  | "mouse_intro"
  | "mouse_meadow"
  | "mouse_neighbors"
  | "mouse_secret"
  | "mouse_bye"
  | "bee_intro"
  | "bee_work"
  | "bee_weather"
  | "bee_bye"
  | "worm_intro"
  | "worm_job"
  | "worm_rain"
  | "worm_bye"
  | "squirrel_intro"
  | "squirrel_oak"
  | "squirrel_nuts"
  | "squirrel_gate"
  | "squirrel_bye"
  | "blackbird_intro"
  | "blackbird_song"
  | "blackbird_beet"
  | "blackbird_bye"
  | "oak_idle"
  | "meadow_idle"
  | "beet_idle"
  | "look_hedgehog"
  | "look_sparrow"
  | "look_frog"
  | "look_snail"
  | "look_gnome"
  | "look_shed"
  | "look_pond"
  | "look_gate"
  | "look_bench"
  | "look_birdbath"
  | "look_compost"
  | "look_wateringcan"
  | "look_wheelbarrow"
  | "look_digspot"
  | "look_flowerpot"
  | "look_mouse"
  | "look_bee"
  | "look_worm"
  | "look_squirrel"
  | "look_blackbird"
  | "look_oak"
  | "look_meadow"
  | "look_beet";

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
      text: "Ein ungewöhnlich glatter Stein. Er liegt genau richtig in der Pfote.",
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
      text: "Platsch! Der glatte Stein hüpft zweimal übers Wasser — ein sauberer Bogen.",
    },
  ],
  frog_idle: [
    {
      speaker: "Frosch Fridolin",
      text: "Quak. Ich kenne mich mit Fliegen aus — und mit richtig guten Platschern.",
    },
  ],
  frog_splash: [
    {
      speaker: "Frosch Fridolin",
      text: "Eine solide Acht von zehn für den Platscher. Technik, Höhe, Nachhall — respektabel!",
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
      text: "Suse nimmt das Blatt mit und schlängelt zufrieden weiter.",
    },
  ],
  gnome_idle: [
    {
      speaker: "Gartenzwerg Günter",
      text: "Ich bewache die Tulpen. Tag und Nacht. Vor allem die gelben.",
    },
  ],
  gnome_cap: [
    {
      speaker: "Gartenzwerg Günter",
      text: "Der Kronkorken passt als Orden an meinen Mantel. Endlich erkennt jemand meinen Einsatz!",
    },
    {
      speaker: "System",
      text: "Günter strafft die Schultern. Der Orden sitzt perfekt.",
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
      text: "Klares Wasser und drei Federn. Du hast gründlich nachgesehen.",
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
      text: "Der Kompost riecht nach Abenteuer, aber eher nach der unangenehmen Sorte.",
    },
  ],
  watering_can: [
    {
      speaker: "System",
      text: "Die Gießkanne ist fast so groß wie du und leider leer.",
    },
  ],
  wheelbarrow: [
    {
      speaker: "System",
      text: "Die Schubkarre quietscht eindrucksvoll, fährt aber keinen Zentimeter.",
    },
  ],

  mouse_intro: [
    {
      speaker: "Maus Mila",
      text: "Ein Meerschweinchen! Endlich mal jemand in meiner Gewichtsklasse. Ich bin Mila.",
    },
    {
      speaker: "Maus Mila",
      text: "Ich wohne hier in der Wildblumenwiese. Frag mich ruhig aus — ich kenne jeden Halm.",
    },
  ],
  mouse_meadow: [
    {
      speaker: "Maus Mila",
      text: "Die Wildblumenwiese ist mein Supermarkt: Samen unten, Nektar oben — und dazwischen wohne ich.",
    },
    {
      speaker: "Maus Mila",
      text: "Wo Menschen nicht mähen, wächst das beste Zeug. Merk dir das.",
    },
  ],
  mouse_neighbors: [
    {
      speaker: "Maus Mila",
      text: "Berta brummt den ganzen Tag über den Blüten. Versteht kein Wort Deutsch, aber jedes Herz.",
    },
    {
      speaker: "Maus Mila",
      text: "Und pass auf, wo du hintrittst: Willi wohnt praktisch überall unter uns.",
    },
  ],
  mouse_secret: [
    {
      speaker: "Maus Mila",
      text: "Psst. Unter der alten Eiche vergräbt Fritzi mehr Nüsse, als er je wiederfindet.",
    },
    {
      speaker: "Maus Mila",
      text: "Ich… helfe gelegentlich beim Wiederfinden. Sag ihm nichts.",
    },
  ],
  mouse_bye: [
    {
      speaker: "Maus Mila",
      text: "Bis bald! Und lass keine Krümel rumliegen — das lockt die Falschen an.",
    },
  ],

  bee_intro: [
    {
      speaker: "Hummel Berta",
      symbols: "🐝❓🐹",
      translation: "Berta wundert sich: Was macht denn ein Meerschweinchen hier in der Wiese?",
    },
    {
      speaker: "Hummel Berta",
      symbols: "🐝💛🌼",
      translation: "Aber willkommen ist hier jeder, der die Blumen in Ruhe lässt.",
    },
  ],
  bee_work: [
    {
      speaker: "Hummel Berta",
      symbols: "🐝 ➡️ 🌸 🌸 🌸 ➡️ 🏠🍯",
      translation: "Ich fliege von Blüte zu Blüte und bringe den Nektar nach Hause.",
    },
    {
      speaker: "Hummel Berta",
      symbols: "🌸 ➡️ 🍓🍎🥕",
      translation: "Ohne uns Bestäuber gäbe es kaum Obst und Gemüse im Garten.",
    },
  ],
  bee_weather: [
    {
      speaker: "Hummel Berta",
      symbols: "☀️ ✅ 🐝",
      translation: "Bei Sonne fliege ich den ganzen Tag.",
    },
    {
      speaker: "Hummel Berta",
      symbols: "🌧️ ➡️ 🐝 💤",
      translation: "Bei Regen halte ich ein Nickerchen unter einem großen Blatt.",
    },
  ],
  bee_bye: [
    {
      speaker: "Hummel Berta",
      symbols: "🐝 👋 💛",
      translation: "Tschüss, und danke für den Plausch!",
    },
  ],

  worm_intro: [
    {
      speaker: "Regenwurm Willi",
      symbols: "🪱 ⬆️ 🌍 👀",
      translation: "Ein Regenwurm lugt aus der Erde und mustert dich neugierig.",
    },
  ],
  worm_job: [
    {
      speaker: "Regenwurm Willi",
      symbols: "🍂 ➕ 🪱 ➡️ ✨🌱",
      translation: "Ich verwandle alte Blätter in beste, lockere Erde.",
    },
    {
      speaker: "Regenwurm Willi",
      symbols: "✨🌱 ➡️ 🥕💪",
      translation: "Davon werden die Möhren im Beet richtig stark.",
    },
  ],
  worm_rain: [
    {
      speaker: "Regenwurm Willi",
      symbols: "🌧️ ➡️ 🌍💦 ➡️ 🪱 ⬆️ 😮‍💨",
      translation: "Wenn die Erde voll Wasser läuft, brauche ich oben frische Luft.",
    },
  ],
  worm_bye: [
    {
      speaker: "Regenwurm Willi",
      symbols: "🪱 👋 ⬇️",
      translation: "Der Wurm winkt kurz und verschwindet wieder in der Erde.",
    },
  ],

  squirrel_intro: [
    {
      speaker: "Eichhörnchen Fritzi",
      text: "Huch! Ich dachte, du wärst eine besonders große Nuss. Ich bin Fritzi — willkommen an meiner Eiche.",
    },
  ],
  squirrel_oak: [
    {
      speaker: "Eichhörnchen Fritzi",
      text: "Die alte Eiche stand hier schon, als der Schuppen noch ein Bretterstapel war.",
    },
    {
      speaker: "Eichhörnchen Fritzi",
      text: "Beste Aussicht im ganzen Garten. Von ganz oben sieht man sogar über das Tor.",
    },
  ],
  squirrel_nuts: [
    {
      speaker: "Eichhörnchen Fritzi",
      text: "Vergraben. Überall. Frag nicht wo — das weiß ich selbst nicht mehr.",
    },
    {
      speaker: "Eichhörnchen Fritzi",
      text: "Deshalb wachsen hier übrigens so viele kleine Bäume. Gern geschehen, Garten.",
    },
  ],
  squirrel_gate: [
    {
      speaker: "Eichhörnchen Fritzi",
      text: "Vom obersten Ast sehe ich den Hof: ein Hund, eine Tür…",
    },
    {
      speaker: "Eichhörnchen Fritzi",
      text: "…und ein Napf, aus dem es verdächtig nach Erbsen-Chips duftet. Nur so als Info.",
    },
  ],
  squirrel_bye: [
    {
      speaker: "Eichhörnchen Fritzi",
      text: "Mach's gut! Und falls du eine Haselnuss findest: Die gehört vermutlich mir.",
    },
  ],

  blackbird_intro: [
    {
      speaker: "Amsel Toni",
      text: "Zwitscher! Du bist neu auf dem Boden hier, oder? Ich bin Toni, ich singe hier abends die Charts.",
    },
  ],
  blackbird_song: [
    {
      speaker: "Amsel Toni",
      text: "Wer zuerst singt, dem gehört die Antenne. So sind die Regeln — ich habe sie nicht gemacht.",
    },
    {
      speaker: "Amsel Toni",
      text: "Morgens um fünf klingt mein Solo am besten. Frag die Nachbarn. Oder besser nicht.",
    },
  ],
  blackbird_beet: [
    {
      speaker: "Amsel Toni",
      text: "Das Beet ist Teamarbeit: Der Mensch gießt, Willi lockert die Erde, ich hole die Schnecken raus.",
    },
    {
      speaker: "Amsel Toni",
      text: "Nur Suse hat Immunität. Ehrensache unter Nachbarn.",
    },
  ],
  blackbird_bye: [
    {
      speaker: "Amsel Toni",
      text: "Zwitscher! Grüß den Igel — er schuldet mir noch einen Wurm. Nichts für ungut, Willi.",
    },
  ],

  oak_idle: [
    {
      speaker: "System",
      text: "Die alte Eiche rauscht leise. In der Rinde stecken erstaunlich viele halb vergessene Nüsse.",
    },
  ],
  meadow_idle: [
    {
      speaker: "System",
      text: "Die Wildblumenwiese summt und duftet. Irgendwo raschelt es freundlich.",
    },
  ],
  beet_idle: [
    {
      speaker: "System",
      text: "Ordentliche Reihen aus Salat und Möhrengrün. Die Erde ist frisch gelockert — Willis Werk.",
    },
  ],

  look_hedgehog: [
    {
      speaker: "Meeri",
      text: "Ein Igel. Im Grunde ein Meerschweinchen mit Verteidigungsbudget.",
    },
  ],
  look_sparrow: [
    {
      speaker: "Meeri",
      text: "Pip sitzt auf seinem Pfosten wie auf einem Thron. Für einen Spatzen sehr viel Attitüde.",
    },
  ],
  look_frog: [
    {
      speaker: "Meeri",
      text: "Fridolin sieht aus, als würde er gleich etwas Weises sagen. Oder eine Fliege essen. Eins von beidem.",
    },
  ],
  look_snail: [
    {
      speaker: "Meeri",
      text: "Suse trägt ihr Haus immer dabei. Praktisch — aber der Umzug dauert trotzdem ewig.",
    },
  ],
  look_gnome: [
    {
      speaker: "Meeri",
      text: "Er zwinkert nicht. Er blinzelt nicht. Respekt. Oder Keramik.",
    },
  ],
  look_shed: [
    {
      speaker: "Meeri",
      text: "Ein Schuppen voller Werkzeug, das keiner benutzt. Menschen sammeln seltsame Dinge.",
    },
  ],
  look_pond: [
    {
      speaker: "Meeri",
      text: "Wasser, so weit die Pfote reicht. Zum Trinken gut, zum Schwimmen bitte jemand anderes.",
    },
  ],
  look_gate: [
    {
      speaker: "Meeri",
      text: "Von hier riecht man die Erbsen-Chips fast. Fast ist das grausamste Wort der Welt.",
    },
  ],
  look_bench: [
    {
      speaker: "Meeri",
      text: "Eine Bank für Riesen. Unten drunter ist der beste Schattenplatz des Gartens — Insiderwissen.",
    },
  ],
  look_birdbath: [
    {
      speaker: "Meeri",
      text: "Ein Pool in Kopfhöhe. Vögel haben schon einen seltsamen Begriff von Barrierefreiheit.",
    },
  ],
  look_compost: [
    {
      speaker: "Meeri",
      text: "Riecht streng, aber Willi schwärmt davon wie von einem Fünf-Sterne-Buffet.",
    },
  ],
  look_wateringcan: [
    {
      speaker: "Meeri",
      text: "Fast so groß wie ich. Wenn es regnet, wäre das hier meine Notunterkunft erster Wahl.",
    },
  ],
  look_wheelbarrow: [
    {
      speaker: "Meeri",
      text: "Ein Fahrzeug mit nur einem Rad. Mutig. Würde ich trotzdem sofort mitfahren.",
    },
  ],
  look_digspot: [
    {
      speaker: "Meeri",
      text: "Auffällig lockere Erde. Hier hat jemand gebuddelt — oder wartet darauf, dass ich es tue.",
    },
  ],
  look_flowerpot: [
    {
      speaker: "Meeri",
      text: "Ein Blumentopf. Menschen verstecken Schlüssel darunter und wundern sich über Einbrüche.",
    },
  ],
  look_mouse: [
    {
      speaker: "Meeri",
      text: "Mila ist wie ich, nur in klein und mit Schwanz. Und deutlich besser informiert.",
    },
  ],
  look_bee: [
    {
      speaker: "Meeri",
      text: "Fliegt wie ein Wollknäuel mit Turbo. Physik ist ihr sichtlich egal.",
    },
  ],
  look_worm: [
    {
      speaker: "Meeri",
      text: "Kein Anfang, kein Ende, aber eine klare Meinung. Beeindruckend.",
    },
  ],
  look_squirrel: [
    {
      speaker: "Meeri",
      text: "Fritzis Schwanz ist größer als er selbst. Vermutlich ist da auch Stauraum drin.",
    },
  ],
  look_blackbird: [
    {
      speaker: "Meeri",
      text: "Schwarzer Frack, gelber Schnabel — Toni ist der einzige hier, der ständig im Abendanzug rumläuft.",
    },
  ],
  look_oak: [
    {
      speaker: "Meeri",
      text: "Ein Baum wie ein Hochhaus. Von oben sieht man angeblich die Erbsen-Chips. Ich glaube es ungeprüft.",
    },
  ],
  look_meadow: [
    {
      speaker: "Meeri",
      text: "Hohe Halme, bunte Punkte, überall Gesumm. Wie ein Wimmelbild zum Reinlaufen.",
    },
  ],
  look_beet: [
    {
      speaker: "Meeri",
      text: "Salat in Reih und Glied. Ich salutiere — und knabbere ausdrücklich nichts an. Noch.",
    },
  ],
};
