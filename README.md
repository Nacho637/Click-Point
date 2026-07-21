# Erbsen-Chip Heist

Browserbasiertes Pixel-Point-and-Click-Adventure im Top-Down-Retro-Look (Pokémon-Stil): Du spielst ein Meerschweinchen auf dem Weg zum Erbsen-Chip-Tresor.

**WASD/Pfeiltasten** laufen, **Leertaste/E** oder **Mausklick** für NPCs/Objekte (nur in Reichweite), **4 Inventar-Slots**. Die komplette Grafik ist eine eigene 2D-Pixel-Engine auf HTML-Canvas — Sprites, Kacheln und Kamera prozedural, ohne externe Assets.

## Spielen

1. `npm install`
2. `cp .env.example .env.local` und Supabase-Keys eintragen
3. `npm run dev`
4. Öffne [http://localhost:3000](http://localhost:3000) → **Jetzt spielen**

Produktiv: Deploy auf **Vercel** (GitHub-Integration, Projekt `click-point`).  
Öffentliche URL: [click-point-gamma.vercel.app](https://click-point-gamma.vercel.app)  
Falls die Seite SSO/Login zeigt: in Vercel unter **Deployment Protection** den Schutz für Production deaktivieren (sonst ist es kein Spieleaffe-Direktzugriff).

Supabase-Env auf Vercel setzen (Project → Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Werte stehen lokal in `.env.local` / Vorlage in `.env.example`. Speicherstände liegen in Supabase-Tabelle `saves`.

## Steuerung

| Aktion | Eingabe |
|---|---|
| Bewegen | `W` `A` `S` `D` oder Pfeiltasten |
| Interagieren | Leertaste/`E` oder Linksklick (nur in Reichweite) |
| Anschauen | Rechtsklick oder Anschauen-Modus |
| Item wählen | Inventar-Slot unten |
| Item benutzen | Item wählen, dann Ziel anklicken |
| Ablegen | „Ausgewähltes ablegen“ |

## Garten-MVP (aktuell spielbar)

Erkunde eine große Gartenlichtung mit Teich, Schuppen, Sitzplatz, natürlicher Baum- und
Buschgrenze sowie einer sichtbaren Hintergrundlandschaft. Nicht jedes auffällige Item
bringt dich weiter: Stein, Blatt und Kronkorken laden zu Experimenten ein und belegen
wertvollen Inventarplatz.

Zwei Wege öffnen wirklich das Gartentor:

1. **Schlüssel:** Mit dem Igel reden → Blumentopf anklicken → Schlüssel aufs Tor
2. **Buddeln:** Krümel aufheben → dem Spatz geben → Spaten am lockeren Erdreich am Tor

Details: [`design/quest-graph.md`](design/quest-graph.md), [`design/gdd.md`](design/gdd.md)

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Eigene 2D-Pixel-Engine auf HTML-Canvas (`src/game/pixel/`) — Kachel-Terrain, Sprite-Rasterizer, Kamera & Kollision, alles prozedural
- Retro-Pixel-Fonts (Press Start 2P / VT323)
- Zustand (Spielzustand, render-unabhängig)
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
