# Erbsen-Chip Heist — Game Design Doc (Kurz)

## Pitch

Du bist ein kleines Meerschweinchen. Irgendwo im Haus der Herrchen steht ein Tresor voller Erbsen-Chips. Zwischen dir und den Chips liegen Garten, Hof, Haustür, Treppe und ein paar streitbare Mitbewohner.

## Referenzgefühl

Blue Rabbit’s Climate Chaos: WASD-Bewegung in 3D, Punkt-und-Klick für NPCs/Objekte, kleines Inventar, Item-auf-Ziel.

## Kern-Loop

1. In der Szene herumlaufen  
2. Nahe Objekte/NPCs anklicken  
3. Hinweise lesen, Items aufheben  
4. Items auf Ziele anwenden (max. 4 Inventarplätze)  
5. Flags setzen → neue Wege / Szenen öffnen  

## Szenen-Roadmap

| ID | Name | Ziel |
|---|---|---|
| `garden` | Garten | Tor öffnen |
| `yard` | Hof | Hund überwinden, Haustür erreichen |
| `hallway` | Erdgeschoss | Treppe freimachen |
| `upstairs` | Obergeschoss | Tresor öffnen |
| `ending` | Finale | Erbsen-Chips |

## Steuerung

- Bewegen: `W A S D` / Pfeiltasten  
- Interagieren: Linksklick (nur in Reichweite)  
- Inventar: Slot anklicken zum Auswählen  
- Item benutzen: Item wählen, dann Ziel anklicken  

## Ton

Warm, leicht absurd, kinderfreundlich ohne Kindischkeit. Deutsche UI.
