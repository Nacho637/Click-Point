"use client";

import { ITEM_CATALOG, INVENTORY_SIZE } from "@/game/items/catalog";
import { useGameStore } from "@/game/store";
import { ItemIcon } from "@/game/ui/ItemIcon";

export function InventoryBar() {
  const inventory = useGameStore((s) => s.inventory);
  const selectedSlot = useGameStore((s) => s.selectedSlot);
  const selectSlot = useGameStore((s) => s.selectSlot);
  const dropSelected = useGameStore((s) => s.dropSelected);
  const dialogueOpen = useGameStore((s) => s.dialogue !== null);

  return (
    <div className="pointer-events-auto flex flex-col items-center gap-2">
      <div className="flex items-end gap-2 rounded-lg bg-[#171b16] px-3 py-2 shadow-[0_0_0_3px_#171b16,0_0_0_5px_#f5cf5a,0_0_0_7px_#0c0e12]">
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
              className={`flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-md border-2 text-center transition ${
                selected
                  ? "border-[#f5cf5a] bg-[#3a4a2e]"
                  : "border-[#3a4636] bg-[#0f130e] hover:border-[#8fb87a]"
              } disabled:opacity-50`}
              title={item ? `${item.name}: ${item.description}` : `Slot ${i + 1}`}
            >
              {itemId ? (
                <ItemIcon item={itemId} size={34} />
              ) : (
                <span className="font-[family-name:var(--font-story)] text-2xl text-[#4a5a3e]">·</span>
              )}
              <span className="max-w-[3.6rem] truncate font-[family-name:var(--font-story)] text-sm leading-none text-[#d9e8d0]">
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
        title="Legt den Gegenstand vor dir auf den Boden – du kannst ihn jederzeit wieder aufheben."
        className="rounded-md border-2 border-[#3a4636] bg-[#171b16]/90 px-3 py-1 font-[family-name:var(--font-story)] text-lg text-[#d9e8d0] transition hover:border-[#f5cf5a] disabled:opacity-40"
      >
        Ausgewähltes ablegen
      </button>
    </div>
  );
}
