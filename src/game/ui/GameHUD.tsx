"use client";

import Link from "next/link";
import { useGameStore } from "@/game/store";
import { ChoiceBox } from "@/game/ui/ChoiceBox";
import { DialogBox } from "@/game/ui/DialogBox";
import { InventoryBar } from "@/game/ui/InventoryBar";

export function GameHUD() {
  const nearbyId = useGameStore((s) => s.nearbyId);
  const toast = useGameStore((s) => s.toast);
  const sceneId = useGameStore((s) => s.sceneId);
  const gateOpen = useGameStore((s) => s.flags.gate_open);
  const enteredHouse = useGameStore((s) => s.flags.entered_house);
  const uiOpen = useGameStore((s) => s.dialogue !== null || s.choices !== null);
  const lookMode = useGameStore((s) => s.verbMode === "look");
  const toggleVerbMode = useGameStore((s) => s.toggleVerbMode);

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
          {sceneId === "garden" && !gateOpen && (
            <p className="mt-2 max-w-xs rounded-full border border-white/10 bg-[#142018]/65 px-3 py-1 text-xs text-[#d9e8d0] backdrop-blur">
              Ziel: Finde einen Weg durchs Gartentor. Nicht alles ist nützlich.
            </p>
          )}
          {sceneId === "yard" && (
            <p className="mt-2 max-w-xs rounded-full border border-white/10 bg-[#142018]/65 px-3 py-1 text-xs text-[#d9e8d0] backdrop-blur">
              Ziel: Finde einen Weg ins Haus. Trau nicht jedem Ratschlag.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVerbMode}
            title="Anschauen-Modus: Klicks zeigen Beschreibungen statt Aktionen (Rechtsklick schaut immer)"
            className={`rounded-full border px-3 py-1.5 text-sm backdrop-blur transition ${
              lookMode
                ? "border-[#f0c75e] bg-[#f0c75e]/20 text-[#f0c75e]"
                : "border-[#4d6b42] bg-[#142018]/80 text-[#d9e8d0] hover:border-[#f0c75e]"
            }`}
          >
            👁 Anschauen
          </button>
          <Link
            href="/"
            className="rounded-full border border-[#4d6b42] bg-[#142018]/80 px-3 py-1.5 text-sm text-[#d9e8d0] backdrop-blur hover:border-[#f0c75e]"
          >
            Menü
          </Link>
        </div>
      </header>

      {!uiOpen && nearbyId && (
        <div className="absolute left-1/2 top-24 -translate-x-1/2 rounded-full border border-[#f0c75e]/50 bg-[#142018]/85 px-4 py-1.5 text-sm text-[#f0c75e] backdrop-blur">
          {lookMode ? "Klicken zum Anschauen" : "Klicken zum Interagieren"}
        </div>
      )}

      {toast && (
        <div className="absolute left-1/2 top-36 -translate-x-1/2 rounded-full bg-[#f0c75e] px-4 py-1.5 text-sm font-medium text-[#1a2418] shadow">
          {toast}
        </div>
      )}

      {sceneId === "garden" && gateOpen && (
        <div className="pointer-events-auto absolute right-4 top-24 max-w-xs rounded-2xl border border-[#8fb87a]/50 bg-[#142018]/85 p-3 text-sm text-[#d9e8d0] backdrop-blur">
          <p className="font-semibold text-[#f0c75e]">Tor offen!</p>
          <p className="mt-1">
            Geh zum Tor und schlüpf hindurch in den Hof.
          </p>
        </div>
      )}

      {enteredHouse && sceneId !== "garden" && sceneId !== "yard" && (
        <div className="pointer-events-auto absolute right-4 top-24 max-w-xs rounded-2xl border border-[#8fb87a]/50 bg-[#142018]/85 p-3 text-sm text-[#d9e8d0] backdrop-blur">
          <p className="font-semibold text-[#f0c75e]">Im Haus!</p>
          <p className="mt-1">
            Durchs Loch geschafft — der Fuchs mit seiner Tür hatte keine Chance. Fortsetzung folgt.
          </p>
        </div>
      )}

      <DialogBox />
      <ChoiceBox />

      <div className="absolute inset-x-0 bottom-4 flex justify-center px-3">
        <InventoryBar />
      </div>
    </div>
  );
}
