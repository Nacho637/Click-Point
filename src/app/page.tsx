import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,#9fd0a8_0%,transparent_45%),radial-gradient(ellipse_at_80%_0%,#87b7d9_0%,transparent_40%),linear-gradient(165deg,#1c2e22_0%,#2f4a28_42%,#5f8f4e_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(115deg,transparent_0_14px,rgba(255,255,255,0.04)_14px_15px)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between text-sm text-[#d9e8d0]/90">
          <span className="tracking-[0.2em] uppercase">Browser Adventure</span>
          <a
            href="https://github.com/Nacho637/Click-Point"
            className="rounded-full border border-white/15 px-3 py-1 hover:border-[#f0c75e]/60"
          >
            GitHub
          </a>
        </nav>

        <section className="flex flex-1 flex-col justify-center gap-8 py-16">
          <div className="max-w-2xl">
            <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-[#f4f7ef] sm:text-7xl">
              Erbsen-Chip Heist
            </h1>
            <p className="mt-5 max-w-xl font-[family-name:var(--font-story)] text-xl text-[#d9e8d0] sm:text-2xl">
              Ein Meerschweinchen. Ein Tresor voller Erbsen-Chips. Ein Garten voller
              Rätsel.
            </p>
            <p className="mt-4 max-w-lg text-[#c5ddb8]">
              Blue-Rabbit-Style: mit WASD durch die 3D-Welt laufen, NPCs anklicken,
              Items im 4-Slot-Inventar kombinieren — direkt im Browser.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/play"
              className="rounded-full bg-[#f0c75e] px-7 py-3 text-base font-semibold text-[#1a2418] shadow-lg transition hover:translate-y-[-1px] hover:bg-[#ffd76a]"
            >
              Jetzt spielen
            </Link>
            <a
              href="#steuern"
              className="rounded-full border border-white/20 px-5 py-3 text-[#d9e8d0] transition hover:border-[#f0c75e]/60"
            >
              Steuerung
            </a>
          </div>
        </section>

        <section
          id="steuern"
          className="mb-10 grid gap-4 border-t border-white/10 pt-8 text-[#d9e8d0] sm:grid-cols-3"
        >
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg text-[#f0c75e]">
              Bewegen
            </h2>
            <p className="mt-1 text-sm text-[#c5ddb8]">
              W A S D oder Pfeiltasten — durch den Garten schleichen.
            </p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg text-[#f0c75e]">
              Interagieren
            </h2>
            <p className="mt-1 text-sm text-[#c5ddb8]">
              Nah rangehen, gelben Punkt sehen, anklicken.
            </p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg text-[#f0c75e]">
              Inventar
            </h2>
            <p className="mt-1 text-sm text-[#c5ddb8]">
              4 Slots. Item wählen, dann auf Tor, Spatz oder Erde anwenden.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
