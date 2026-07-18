"use client";

import { ITEM_CATALOG, INVENTORY_SIZE } from "@/game/items/catalog";
import { useGameStore } from "@/game/store";

export function InventoryBar() {
  const inventory = useGameStore((s) => s.inventory);
  const selectedSlot = useGameStore((s) => s.selectedSlot);
  const selectSlot = useGameStore((s) => s.selectSlot);
  const dropSelected = useGameStore((s) => s.dropSelected);
  const dialogueOpen = useGameStore((s) => s.dialogue !== null);

  return (
    <div className="pointer-events-auto flex flex-col items-center gap-2">
      <div className="flex items-end gap-2 rounded-2xl border border-[#2f4a28]/55 bg-[#142018]/80 px-3 py-2 shadow-lg backdrop-blur-md">
        {Array.from({ length: INVENTORY_SIZE }).map((_, i) => {
          const itemId = inventory[i];
          const item = itemId ? ITEM_CATALOG[itemId] : null;
          const selected = selectedSlot === i;
          return (
            <button
              key={i}
              type="button"
              disabled={dialogueOpen}
              onClick={() => selectSlot(i)}
              className={`flex h-16 w-16 flex-col items-center justify-center rounded-xl border text-center transition ${
                selected
                  ? "border-[#f0c75e] bg-[#3a5c32] ring-2 ring-[#f0c75e]/70"
                  : "border-[#4d6b42] bg-[#1c2e22] hover:border-[#8fb87a]"
              } disabled:opacity-50`}
              title={item ? `${item.name}: ${item.description}` : `Slot ${i + 1}`}
            >
              <span className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-[#f0c75e]">
                {item?.glyph ?? "·"}
              </span>
              <span className="mt-1 max-w-[3.5rem] truncate text-[10px] text-[#d9e8d0]">
                {item?.name ?? ""}
              </span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        disabled={dialogueOpen || selectedSlot === null || !inventory[selectedSlot ?? -1]}
        onClick={dropSelected}
        className="rounded-full border border-[#4d6b42] bg-[#1c2e22]/90 px-3 py-1 text-xs text-[#d9e8d0] transition hover:border-[#f0c75e] disabled:opacity-40"
      >
        Ausgewähltes ablegen
      </button>
    </div>
  );
}
