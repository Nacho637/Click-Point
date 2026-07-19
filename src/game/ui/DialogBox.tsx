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
        className="w-full max-w-2xl cursor-pointer rounded-2xl border border-[#f0c75e]/40 bg-[#101810]/92 px-5 py-4 text-left shadow-xl backdrop-blur-md transition hover:border-[#f0c75e]/70"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0c75e]">
          {line.speaker}
        </p>
        {line.symbols ? (
          <>
            <p className="font-[family-name:var(--font-story)] text-3xl leading-relaxed tracking-wide text-[#f4f7ef]">
              {line.symbols}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTranslatedLine(showTranslation ? null : line);
              }}
              className="mt-2 rounded-full border border-[#f0c75e]/40 px-3 py-1 text-xs text-[#c5ddb8] transition hover:border-[#f0c75e] hover:text-[#f0c75e]"
            >
              {showTranslation ? "Übersetzung verbergen" : "Übersetzen"}
            </button>
            {showTranslation && line.translation && (
              <p className="mt-2 font-[family-name:var(--font-story)] text-sm italic text-[#c5ddb8]">
                {line.translation}
              </p>
            )}
          </>
        ) : (
          <p className="font-[family-name:var(--font-story)] text-lg leading-relaxed text-[#f4f7ef]">
            {line.text}
          </p>
        )}
        <p className="mt-3 text-right text-xs text-[#a8c09a]">
          {isLast ? "Klicken zum Schließen" : "Weiter ›"}
        </p>
      </div>
    </div>
  );
}
