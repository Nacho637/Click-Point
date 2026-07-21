import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#10140f]">
      {/* Pixeliger Gras-Hintergrund */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "#5aa848",
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.25), transparent 55%), repeating-linear-gradient(0deg, rgba(63,143,63,0.35) 0 8px, transparent 8px 16px), repeating-linear-gradient(90deg, rgba(63,143,63,0.35) 0 8px, transparent 8px 16px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(180deg, #67bae6 0%, transparent 100%)" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-4xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <span className="pk-chip px-3 py-1.5 font-[family-name:var(--font-display)] text-[10px] uppercase tracking-wider text-[#f5cf5a]">
            Pixel Adventure
          </span>
          <a
            href="https://github.com/Nacho637/Click-Point"
            className="pk-chip px-3 py-1.5 font-[family-name:var(--font-story)] text-lg text-[#d9e8d0] hover:text-[#f5cf5a]"
          >
            GitHub
          </a>
        </nav>

        <section className="flex flex-1 flex-col justify-center gap-8 py-16">
          <div className="pk-box max-w-2xl px-7 py-6">
            <h1 className="font-[family-name:var(--font-display)] text-2xl leading-relaxed text-[#20242a] sm:text-4xl">
              Erbsen-Chip Heist
            </h1>
            <p className="mt-4 font-[family-name:var(--font-story)] text-2xl leading-tight text-[#3a4048]">
              Ein Meerschweinchen. Ein Tresor voller Erbsen-Chips. Ein Garten voller Rätsel —
              in knackiger Pixel-Optik.
            </p>
            <p className="mt-3 font-[family-name:var(--font-story)] text-xl leading-tight text-[#5a626a]">
              Top-Down-Pixel-Welt im Retro-Stil: mit WASD durch den Garten laufen, NPCs
              ansprechen, Items im 4-Slot-Beutel kombinieren — direkt im Browser.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/play"
              className="rounded-md bg-[#f5cf5a] px-7 py-3 font-[family-name:var(--font-display)] text-sm text-[#20242a] shadow-[0_0_0_3px_#0c0e12,0_6px_0_rgba(0,0,0,0.35)] transition hover:translate-y-[-1px] hover:bg-[#ffdd6a]"
            >
              ▶ Jetzt spielen
            </Link>
            <a
              href="#steuern"
              className="pk-chip px-5 py-3 font-[family-name:var(--font-story)] text-xl text-[#d9e8d0] hover:text-[#f5cf5a]"
            >
              Steuerung
            </a>
          </div>
        </section>

        <section
          id="steuern"
          className="mb-10 grid gap-3 sm:grid-cols-3"
        >
          {[
            ["Bewegen", "W A S D oder Pfeiltasten — durch den Garten schleichen."],
            ["Interagieren", "Nah rangehen, gelben Pfeil sehen, Leertaste oder Klick."],
            ["Beutel", "4 Slots. Item wählen, dann auf Tor, Spatz oder Erde anwenden."],
          ].map(([title, body]) => (
            <div key={title} className="pk-chip px-4 py-3">
              <h2 className="font-[family-name:var(--font-display)] text-[11px] text-[#f5cf5a]">
                {title}
              </h2>
              <p className="mt-2 font-[family-name:var(--font-story)] text-lg leading-tight text-[#c5ddb8]">
                {body}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
