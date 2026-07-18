# Erbsen-Chip Heist

Browserbasiertes 3D-Point-and-Click-Adventure: Du spielst ein Meerschweinchen auf dem Weg zum Erbsen-Chip-Tresor.

Steuerung wie bei Blue Rabbit’s Climate Chaos — **WASD** laufen, **Mausklick** für NPCs/Objekte, **4 Inventar-Slots**.

## Spielen

1. `npm install`
2. `cp .env.example .env.local` und Supabase-Keys eintragen
3. `npm run dev`
4. Öffne [http://localhost:3000](http://localhost:3000) → **Jetzt spielen**

Produktiv: Deploy auf **Vercel** (dieses Repo). Speicherstände liegen in **Supabase** (`saves`).

## Steuerung

| Aktion | Eingabe |
|---|---|
| Bewegen | `W` `A` `S` `D` oder Pfeiltasten |
| Interagieren | Linksklick (nur in Reichweite) |
| Item wählen | Inventar-Slot unten |
| Item benutzen | Item wählen, dann Ziel anklicken |
| Ablegen | „Ausgewähltes ablegen“ |

## Garten-MVP (aktuell spielbar)

Zwei Wege, das Gartentor zu öffnen:

1. **Schlüssel:** Mit dem Igel reden → Blumentopf anklicken → Schlüssel aufs Tor
2. **Buddeln:** Krümel aufheben → dem Spatz geben → Spaten am lockeren Erdreich am Tor

Details: [`design/quest-graph.md`](design/quest-graph.md), [`design/gdd.md`](design/gdd.md)

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- React Three Fiber / Three.js
- Zustand (Spielzustand)
- Supabase (Save-API unter `/api/save`)
- Vercel (Hosting)

## Projektstruktur

```text
app/                  Landing, /play, API
src/game/             Engine, Szenen, UI, Quests
design/               GDD + Quest-Graph
supabase/migrations/  DB-Schema
```

## Nächste Phasen

- Hof + Hund + Haustür
- Haus / Treppe / Tresor
- Autosave + „Weiter spielen“
- Assets & Feinschliff
