"use client";

import Link from "next/link";
import { useGameStore } from "@/game/store";
import { DialogBox } from "@/game/ui/DialogBox";
import { InventoryBar } from "@/game/ui/InventoryBar";

export function GameHUD() {
  const nearbyId = useGameStore((s) => s.nearbyId);
  const toast = useGameStore((s) => s.toast);
  const gateOpen = useGameStore((s) => s.flags.gate_open);
  const dialogueOpen = useGameStore((s) => s.dialogue !== null);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <header className="pointer-events-auto flex items-start justify-between gap-3 p-4">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[#f4f7ef] drop-shadow">
            Erbsen-Chip Heist
          </p>
          <p className="text-sm text-[#c5ddb8]">
            WASD bewegen · Nah sein · Anklicken
          </p>
          {!gateOpen && (
            <p className="mt-2 max-w-xs rounded-full border border-white/10 bg-[#142018]/65 px-3 py-1 text-xs text-[#d9e8d0] backdrop-blur">
              Ziel: Finde einen Weg durchs Gartentor. Nicht alles ist nützlich.
            </p>
          )}
        </div>
        <Link
          href="/"
          className="rounded-full border border-[#4d6b42] bg-[#142018]/80 px-3 py-1.5 text-sm text-[#d9e8d0] backdrop-blur hover:border-[#f0c75e]"
        >
          Menü
        </Link>
      </header>

      {!dialogueOpen && nearbyId && (
        <div className="absolute left-1/2 top-24 -translate-x-1/2 rounded-full border border-[#f0c75e]/50 bg-[#142018]/85 px-4 py-1.5 text-sm text-[#f0c75e] backdrop-blur">
          Klicken zum Interagieren
        </div>
      )}

      {toast && (
        <div className="absolute left-1/2 top-36 -translate-x-1/2 rounded-full bg-[#f0c75e] px-4 py-1.5 text-sm font-medium text-[#1a2418] shadow">
          {toast}
        </div>
      )}

      {gateOpen && (
        <div className="pointer-events-auto absolute right-4 top-24 max-w-xs rounded-2xl border border-[#8fb87a]/50 bg-[#142018]/85 p-3 text-sm text-[#d9e8d0] backdrop-blur">
          <p className="font-semibold text-[#f0c75e]">Tor offen!</p>
          <p className="mt-1">
            MVP geschafft. Als Nächstes: Hof, Hund und Haustür.
          </p>
        </div>
      )}

      <DialogBox />

      <div className="absolute inset-x-0 bottom-4 flex justify-center px-3">
        <InventoryBar />
      </div>
    </div>
  );
}
