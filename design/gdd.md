# Erbsen-Chip Heist — Game Design Doc (Kurz)

## Pitch

Du bist ein kleines Meerschweinchen. Irgendwo im Haus der Herrchen steht ein Tresor voller Erbsen-Chips. Zwischen dir und den Chips liegen Garten, Hof, Haustür, Treppe und ein paar streitbare Mitbewohner.

## Referenzgefühl

Blue Rabbit’s Climate Chaos: WASD-Bewegung in 3D, Punkt-und-Klick für NPCs/Objekte, kleines Inventar, Item-auf-Ziel.

## Kern-Loop

1. In der Szene herumlaufen  
2. Nahe Objekte/NPCs anklicken  
3. Hinweise, Atmosphäre und bewusst nutzlose Spuren unterscheiden  
4. Items aufheben und mit begrenzten 4 Inventarplätzen abwägen  
5. Items auf Ziele anwenden; auch falsche Kombinationen geben eine konkrete Reaktion  
6. Flags setzen → neue Wege / Szenen öffnen  

## Garten-MVP: Erkundung statt Lösungskorridor

Die Startkarte ist eine größere, offene Gartenlichtung mit drei Seitenpfaden:

- **Teich:** Frosch, Steinwurf und reine Atmosphäre
- **Schuppen:** falsches Schloss, Schubkarre und Gartengeräte
- **Ruhebereich:** Bank, Vogelbad, Gartenzwerg und Schnecke

Stein, Blatt und Kronkorken belegen Inventarplätze, öffnen aber nicht das Tor. Sie haben
eigene passende Reaktionen (Teich/Frosch, Schnecke, Gartenzwerg), damit Experimente
nicht wie kaputte Interaktionen wirken. Ablegen bleibt jederzeit möglich.

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
