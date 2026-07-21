"use client";

import { useGameStore } from "@/game/store";

export function ChoiceBox() {
  const choices = useGameStore((s) => s.choices);
  const askedTopics = useGameStore((s) => s.askedTopics);
  const chooseTopic = useGameStore((s) => s.chooseTopic);

  if (!choices) return null;

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-28 z-20 flex justify-center px-4">
      <div className="pk-box relative w-full max-w-2xl px-6 py-5">
        <span className="absolute -top-3 left-4 rounded bg-[#2b3a8c] px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] uppercase tracking-wider text-[#f8f4e6] shadow">
          Worüber reden?
        </span>
        <div className="flex flex-col gap-1">
          {choices.map((choice) => {
            const asked = !choice.bye && askedTopics.includes(choice.dialogueId);
            return (
              <button
                key={choice.dialogueId}
                type="button"
                onClick={() => chooseTopic(choice)}
                className={`group flex items-center gap-2 rounded px-2 py-1 text-left font-[family-name:var(--font-story)] text-2xl leading-tight transition hover:bg-[#2b3a8c]/10 ${
                  choice.bye
                    ? "mt-1 border-t-2 border-t-[#2b3a8c]/30 pt-2 text-[#2b3a8c]"
                    : asked
                      ? "text-[#20242a] opacity-55"
                      : "text-[#20242a]"
                }`}
              >
                <span className="w-4 shrink-0 text-[#2b3a8c] opacity-0 group-hover:opacity-100">▶</span>
                <span>{asked ? `✓ ${choice.label}` : choice.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
