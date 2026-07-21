"use client";

import { PixelGame } from "@/game/pixel/PixelGame";
import { useSaveSync } from "@/game/systems/useSaveSync";
import { GameHUD } from "@/game/ui/GameHUD";

export function GameCanvas() {
  useSaveSync(true);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#10140f]">
      <PixelGame />
      <GameHUD />
    </div>
  );
}
