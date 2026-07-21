import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

// Retro-Pixel-Fonts im Game-Boy-/Pokémon-Stil.
const display = Press_Start_2P({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const story = VT323({
  variable: "--font-story",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Erbsen-Chip Heist",
  description:
    "Point-and-Click Adventure: Ein Meerschweinchen auf dem Weg zum Erbsen-Chip-Tresor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${display.variable} ${story.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-story)]">
        {children}
      </body>
    </html>
  );
}
