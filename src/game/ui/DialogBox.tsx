"use client";

import { useGameStore } from "@/game/store";

export function DialogBox() {
  const dialogue = useGameStore((s) => s.dialogue);
  const dialogueIndex = useGameStore((s) => s.dialogueIndex);
  const advanceDialogue = useGameStore((s) => s.advanceDialogue);

  if (!dialogue) return null;
  const line = dialogue[dialogueIndex];
  const isLast = dialogueIndex >= dialogue.length - 1;

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-28 z-20 flex justify-center px-4">
      <button
        type="button"
        onClick={advanceDialogue}
        className="w-full max-w-2xl rounded-2xl border border-[#f0c75e]/40 bg-[#101810]/92 px-5 py-4 text-left shadow-xl backdrop-blur-md transition hover:border-[#f0c75e]/70"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0c75e]">
          {line.speaker}
        </p>
        <p className="font-[family-name:var(--font-story)] text-lg leading-relaxed text-[#f4f7ef]">
          {line.text}
        </p>
        <p className="mt-3 text-right text-xs text-[#a8c09a]">
          {isLast ? "Klicken zum Schließen" : "Weiter ›"}
        </p>
      </button>
    </div>
  );
}
