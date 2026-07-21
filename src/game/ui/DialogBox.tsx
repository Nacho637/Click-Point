"use client";

import { useState } from "react";
import { useGameStore } from "@/game/store";
import type { DialogueLine } from "@/game/quests/dialogues";

export function DialogBox() {
  const dialogue = useGameStore((s) => s.dialogue);
  const dialogueIndex = useGameStore((s) => s.dialogueIndex);
  const advanceDialogue = useGameStore((s) => s.advanceDialogue);
  // Die Übersetzung ist an die konkrete Zeile gebunden — beim Weiterschalten
  // zeigt die nächste Symbolzeile automatisch wieder nur Piktogramme.
  const [translatedLine, setTranslatedLine] = useState<DialogueLine | null>(null);

  if (!dialogue) return null;
  const line = dialogue[dialogueIndex];
  const isLast = dialogueIndex >= dialogue.length - 1;
  const showTranslation = translatedLine === line;

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-28 z-20 flex justify-center px-4">
      <div
        role="button"
        tabIndex={0}
        onClick={advanceDialogue}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") advanceDialogue();
        }}
        className="pk-box relative w-full max-w-2xl cursor-pointer px-6 py-5 text-left"
      >
        <span className="absolute -top-3 left-4 rounded bg-[#2b3a8c] px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] uppercase tracking-wider text-[#f8f4e6] shadow">
          {line.speaker}
        </span>
        {line.symbols ? (
          <>
            <p className="font-[family-name:var(--font-story)] text-4xl leading-snug tracking-wide text-[#20242a]">
              {line.symbols}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTranslatedLine(showTranslation ? null : line);
              }}
              className="mt-2 rounded border-2 border-[#2b3a8c] px-3 py-0.5 font-[family-name:var(--font-story)] text-lg text-[#2b3a8c] transition hover:bg-[#2b3a8c] hover:text-[#f8f4e6]"
            >
              {showTranslation ? "Übersetzung verbergen" : "Übersetzen"}
            </button>
            {showTranslation && line.translation && (
              <p className="mt-2 font-[family-name:var(--font-story)] text-xl italic text-[#4a5568]">
                {line.translation}
              </p>
            )}
          </>
        ) : (
          <p className="font-[family-name:var(--font-story)] text-2xl leading-snug text-[#20242a]">
            {line.text}
          </p>
        )}
        <span className="pk-arrow absolute bottom-2 right-4 font-[family-name:var(--font-display)] text-xs text-[#2b3a8c]">
          {isLast ? "✕" : "▼"}
        </span>
      </div>
    </div>
  );
}
