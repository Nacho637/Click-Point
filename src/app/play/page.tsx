import { GameCanvas } from "@/game/GameCanvas";

export const metadata = {
  title: "Spielen | Erbsen-Chip Heist",
  description: "Pixel-Adventure im Retro-Stil, direkt im Browser",
};

export default function PlayPage() {
  return <GameCanvas />;
}
