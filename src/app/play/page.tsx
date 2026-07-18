import { GameCanvas } from "@/game/GameCanvas";

export const metadata = {
  title: "Spielen | Erbsen-Chip Heist",
  description: "3D Point-and-Click Adventure im Browser",
};

export default function PlayPage() {
  return <GameCanvas />;
}
