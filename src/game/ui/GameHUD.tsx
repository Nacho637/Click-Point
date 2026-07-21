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
        <div className="pk-chip px-3 py-2">
          <p className="font-[family-name:var(--font-display)] text-sm text-[#f5cf5a]">
            Erbsen-Chip Heist
          </p>
          <p className="mt-1 font-[family-name:var(--font-story)] text-lg leading-none text-[#c5ddb8]">
            WASD/Pfeile laufen · Leertaste oder Klick
          </p>
          {sceneId === "garden" && !gateOpen && (
            <p className="mt-2 max-w-xs font-[family-name:var(--font-story)] text-base leading-tight text-[#d9e8d0]">
              Ziel: Finde einen Weg durchs Gartentor. Nicht alles ist nützlich.
            </p>
          )}
          {sceneId === "yard" && (
            <p className="mt-2 max-w-xs font-[family-name:var(--font-story)] text-base leading-tight text-[#d9e8d0]">
              Ziel: Finde einen Weg ins Haus. Trau nicht jedem Ratschlag.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVerbMode}
            title="Anschauen-Modus: Klicks zeigen Beschreibungen statt Aktionen (Rechtsklick schaut immer)"
            className={`rounded-md border-2 px-3 py-1.5 font-[family-name:var(--font-story)] text-lg transition ${
              lookMode
                ? "border-[#f5cf5a] bg-[#f5cf5a]/20 text-[#f5cf5a]"
                : "border-[#3a4636] bg-[#171b16]/90 text-[#d9e8d0] hover:border-[#f5cf5a]"
            }`}
          >
            👁 Anschauen
          </button>
          <Link
            href="/"
            className="rounded-md border-2 border-[#3a4636] bg-[#171b16]/90 px-3 py-1.5 font-[family-name:var(--font-story)] text-lg text-[#d9e8d0] transition hover:border-[#f5cf5a]"
          >
            Menü
          </Link>
        </div>
      </header>

      {!uiOpen && nearbyId && (
        <div className="pk-chip absolute left-1/2 top-28 -translate-x-1/2 px-4 py-1.5 font-[family-name:var(--font-story)] text-lg text-[#f5cf5a]">
          {lookMode ? "🔍 Anschauen (Leertaste)" : "▶ Interagieren (Leertaste)"}
        </div>
      )}

      {toast && (
        <div className="absolute left-1/2 top-40 -translate-x-1/2 rounded-md bg-[#f5cf5a] px-4 py-1.5 font-[family-name:var(--font-story)] text-xl text-[#20242a] shadow-[0_0_0_3px_#0c0e12]">
          {toast}
        </div>
      )}

      {sceneId === "garden" && gateOpen && (
        <div className="pk-chip pointer-events-auto absolute right-4 top-28 max-w-xs px-3 py-2">
          <p className="font-[family-name:var(--font-display)] text-[11px] text-[#f5cf5a]">Tor offen!</p>
          <p className="mt-1 font-[family-name:var(--font-story)] text-lg leading-tight text-[#d9e8d0]">
            Geh zum Tor und schlüpf hindurch in den Hof.
          </p>
        </div>
      )}

      {enteredHouse && sceneId !== "garden" && sceneId !== "yard" && (
        <div className="pk-chip pointer-events-auto absolute right-4 top-28 max-w-xs px-3 py-2">
          <p className="font-[family-name:var(--font-display)] text-[11px] text-[#f5cf5a]">Im Haus!</p>
          <p className="mt-1 font-[family-name:var(--font-story)] text-lg leading-tight text-[#d9e8d0]">
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
