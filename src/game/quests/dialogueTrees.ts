import type { DialogueId } from "@/game/quests/dialogues";

export type TopicMenuId =
  | "mouse_topics"
  | "bee_topics"
  | "worm_topics"
  | "squirrel_topics"
  | "blackbird_topics";

export type DialogueChoice = {
  label: string;
  dialogueId: DialogueId;
  /** Beendet das Gespräch, statt zum Themenmenü zurückzukehren. */
  bye?: boolean;
};

export const TOPIC_MENUS: Record<TopicMenuId, DialogueChoice[]> = {
  mouse_topics: [
    { label: "Erzähl mir von der Wiese", dialogueId: "mouse_meadow" },
    { label: "Wer wohnt hier noch?", dialogueId: "mouse_neighbors" },
    { label: "Hast du ein Geheimnis?", dialogueId: "mouse_secret" },
    { label: "Tschüss, Mila", dialogueId: "mouse_bye", bye: true },
  ],
  bee_topics: [
    { label: "Was machst du den ganzen Tag?", dialogueId: "bee_work" },
    { label: "Wie wird das Wetter?", dialogueId: "bee_weather" },
    { label: "Tschüss, Berta", dialogueId: "bee_bye", bye: true },
  ],
  worm_topics: [
    { label: "Was tust du im Beet?", dialogueId: "worm_job" },
    { label: "Warum kommst du bei Regen raus?", dialogueId: "worm_rain" },
    { label: "Tschüss, Willi", dialogueId: "worm_bye", bye: true },
  ],
  squirrel_topics: [
    { label: "Erzähl mir von der Eiche", dialogueId: "squirrel_oak" },
    { label: "Wo sind deine Nüsse?", dialogueId: "squirrel_nuts" },
    { label: "Weißt du was über das Tor?", dialogueId: "squirrel_gate" },
    { label: "Tschüss, Fritzi", dialogueId: "squirrel_bye", bye: true },
  ],
  blackbird_topics: [
    { label: "Warum singst du so früh?", dialogueId: "blackbird_song" },
    { label: "Erzähl mir vom Gemüsebeet", dialogueId: "blackbird_beet" },
    { label: "Tschüss, Toni", dialogueId: "blackbird_bye", bye: true },
  ],
};
