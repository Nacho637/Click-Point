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

Die Sackgassen reagieren sofort mit eigener Flavor — ohne im Text zu spoilern, dass sie
das Gartentor nicht öffnen. Alle drei Ablenkungs-Items können über das Inventar wieder
abgelegt werden.

## Hof / Parkplatz (aktueller Build)

Ziel: ins Haus. Der **Fuchs Ferdinand** (wohnt in der Hundehütte) ist der einzige
Charakter und **verwirrt**: er beharrt auf „Schlüssel finden, durch die Tür".

### Sackgasse — Tür & Schlüssel
1. Fußmatte anklicken → `rusty_key` ins Inventar  
2. Schlüssel auf Haustür → passt, dreht aber nicht: **Popel** im Schloss (`door_booger`)  
3. Tür bleibt zu — bewusste Sackgasse, öffnet nie

### Echter Weg — Loch freilegen (Mülltonne-Öl-Kette)
1. **Brecheisen** am Auto aufheben  
2. Brecheisen auf **Bremsklotz** unterm Tonnenrad → `chock_removed`  
3. **Blechdose** aufheben → auf **Öllache** unterm Auto → `oil_can`  
4. `oil_can` auf **Tonnenrad** → `wheel_oiled`  
5. Tonne anklicken → rollt weg, **Loch** erscheint (`bin_moved`)  
6. Loch anklicken → Lappen raus (`hole_open`) → erneut anklicken → `entered_house` → Szene `hallway`

| Flag | Bedeutung |
|---|---|
| `met_fox` | Fuchs kennengelernt |
| `door_booger` | Popel im Schloss entdeckt (Sackgasse) |
| `chock_removed` | Bremsklotz herausgehebelt |
| `wheel_oiled` | Tonnenrad geölt |
| `bin_moved` | Tonne weg, Loch freigelegt |
| `hole_open` | Lappen raus, Loch offen |

## Haus (geplant)

- Treppe: Wäschekorb verschieben **oder** Staubsauger-Stecker ziehen  
- Tresor: Code aus Notiz+Magnet **oder** Passwort vom Papagei  
