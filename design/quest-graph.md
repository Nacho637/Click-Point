# Quest-Graph — Erbsen-Chip Heist

## Hauptpfad

```
Start Garten
  → Gartentor öffnen (Pfad A oder B)
  → Hofhund überwinden (Pfad A oder B)
  → Ins Haus (Pfad A oder B)
  → Treppe freimachen (Pfad A oder B)
  → Tresor öffnen (Pfad A oder B)
  → Win
```

## Flags (Maschinenlesbar in `src/game/quests/flags.ts`)

| Flag | Bedeutung |
|---|---|
| `has_talked_to_hedgehog` | Igel-Intro gehört |
| `pot_examined` | Blumentopf angeschaut |
| `gate_open` | Gartentor offen |
| `dug_near_gate` | Am Tor gebuddelt (Pfad B) |
| `dog_cleared` | Hund weg / abgelenkt |
| `entered_house` | Im Haus |
| `stairs_clear` | Treppe frei |
| `vault_open` | Tresor offen |
| `won` | Spiel gewonnen |

## Garten (MVP / aktueller Build)

### Pfad A — Schlüssel

1. Mit Igel reden → Hinweis auf Blumentopf  
2. Blumentopf anklicken → `key_flowerpot` ins Inventar  
3. Schlüssel auf Gartentor anwenden → `gate_open`

### Pfad B — Buddeln

1. Krümel aufheben  
2. Krümel dem Spatz geben → `shovel`  
3. Spaten am lockeren Erdreich am Tor anwenden → `gate_open`

Beide Pfade setzen dasselbe Flag `gate_open`.

## Optionale Gartenpfade (bewusste Sackgassen)

Diese Interaktionen belohnen Erkundung und verbrauchen Zeit bzw. Inventarplatz, setzen
aber **kein** Fortschritts-Flag:

| Fund / Objekt | Experiment | Reaktion |
|---|---|---|
| Glatter Stein | Auf Teich oder Frosch anwenden | Platscher + Bewertung vom Frosch |
| Rotes Blatt | Schnecke geben | Suse nimmt Reiseproviant |
| Blauer Kronkorken | Gartenzwerg geben | Günter trägt ihn als Orden |
| Rostiger Schlüssel | Am Schuppen testen | Passt ausdrücklich nicht |
| Bank / Vogelbad / Kompost | Untersuchen | Eigener kurzer Dialog |
| Gießkanne / Schubkarre | Bewegen oder prüfen | Zu schwer, leer oder fest |

Die Sackgassen sind fair: Jede reagiert sofort und sagt klar, dass sie das Gartentor
nicht verändert. Alle drei Ablenkungs-Items können über das Inventar wieder abgelegt werden.

## Hof (geplant)

- Hund blockiert: Hundekeks **oder** Blechdose werfen  
- Haustür: Katzenklappe + Schlüsselband **oder** Briefschlitz + Schnur  

## Haus (geplant)

- Treppe: Wäschekorb verschieben **oder** Staubsauger-Stecker ziehen  
- Tresor: Code aus Notiz+Magnet **oder** Passwort vom Papagei  
