"use client";

import { useGameStore } from "@/game/store";

export function ChoiceBox() {
  const choices = useGameStore((s) => s.choices);
  const askedTopics = useGameStore((s) => s.askedTopics);
  const chooseTopic = useGameStore((s) => s.chooseTopic);

  if (!choices) return null;

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-28 z-20 flex justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-[#f0c75e]/40 bg-[#101810]/92 px-5 py-4 shadow-xl backdrop-blur-md">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0c75e]">
          Worüber willst du reden?
        </p>
        <div className="flex flex-col gap-1.5">
          {choices.map((choice) => {
            const asked =
              !choice.bye && askedTopics.includes(choice.dialogueId);
            return (
              <button
                key={choice.dialogueId}
                type="button"
                onClick={() => chooseTopic(choice)}
                className={`rounded-xl border border-transparent px-3 py-2 text-left font-[family-name:var(--font-story)] text-base transition hover:border-[#f0c75e]/60 hover:bg-[#f0c75e]/10 ${
                  choice.bye
                    ? "mt-1 border-t border-t-[#f0c75e]/25 pt-3 text-[#f0c75e]"
                    : asked
                      ? "text-[#f4f7ef] opacity-60"
                      : "text-[#f4f7ef]"
                }`}
              >
                {asked ? `✓ ${choice.label}` : choice.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
