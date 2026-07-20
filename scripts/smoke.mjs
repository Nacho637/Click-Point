/**
 * Gameplay-Smoke-Test: läuft zum Igel, klickt ihn an und prüft, dass der
 * Dialog erscheint — der Beweis, dass Raycasting/Interaktion die
 * Post-Processing-Kette überlebt hat.
 *
 * Nutzung: node scripts/smoke.mjs [--url http://localhost:3000/play]
 */
import { chromium } from "playwright-core";
import * as THREE from "three";

const args = process.argv.slice(2);
const urlIdx = args.indexOf("--url");
const url = urlIdx >= 0 ? args[urlIdx + 1] : "http://localhost:3000/play";

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  headless: true,
  args: [
    "--no-sandbox",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--disable-dev-shm-usage",
  ],
});

const DIALOG = "div.bottom-28";

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForSelector("canvas", { timeout: 30_000 });
  // Hydration abwarten, sonst verpuffen Tastatur-Events.
  await page.waitForFunction(() => Boolean(window.__gameStore), null, {
    timeout: 30_000,
  });
  // SwiftShader braucht lange für den ersten Shader-Compile; Frames können
  // anfangs >500ms dauern. Großzügig warten, Tasten lang halten.
  await page.waitForTimeout(8000);

  const getState = () =>
    page.evaluate(() => {
      const s = window.__gameStore.getState();
      return {
        playerPosition: s.playerPosition,
        nearbyId: s.nearbyId,
        uiOpen: s.dialogue !== null || s.choices !== null,
      };
    });
  const press = async (key, ms) => {
    await page.keyboard.down(key);
    await page.waitForTimeout(ms);
    await page.keyboard.up(key);
    await page.waitForTimeout(150);
  };

  // Alle Interactables (Positionen aus GardenScene) — jeder Zufallshalt
  // ist damit ein gültiges Klick-Ziel. Hauptziel bleibt die Alte Eiche:
  // größter Trigger-Radius (2.6) direkt an der z-Klemme.
  const KNOWN = {
    oak: [2.5, 16],
    squirrel: [2.8, 14.6],
    hedgehog: [-2.8, 6.2],
    flowerpot: [-6.8, 4.2],
    snail: [-5.2, 8.5],
    "watering-can": [-8.9, 6.3],
    crumbs: [4.8, 7.5],
    compost: [9.5, 7.6],
    "smooth-stone": [-9.5, 0.2],
    "red-leaf": [-3.4, 9.7],
    "bottle-cap": [8.7, 0.7],
    sparrow: [7.2, -1.6],
    gnome: [7, 3.2],
    bench: [3.7, 4.1],
    birdbath: [-3.8, 0.5],
    wheelbarrow: [5.7, -7.1],
    shed: [8.6, -7.3],
    beet: [14, 7],
    meadow: [-14.5, 4.5],
    mouse: [-15.2, 2.6],
    bee: [-13.4, 6.8],
    worm: [13.6, 8.6],
    blackbird: [15.8, 3.4],
  };

  // Warm-up: warten, bis Tastatur-Input wirklich Bewegung erzeugt
  // (Hydration/Listener-Registrierung ist zeitlich nicht deterministisch).
  {
    const [, , z0] = (await getState()).playerPosition;
    let moved = false;
    for (let i = 0; i < 15 && !moved; i++) {
      await press("s", 600);
      const [, , z] = (await getState()).playerPosition;
      moved = Math.abs(z - z0) > 0.01;
      if (!moved) await page.waitForTimeout(1000);
    }
    if (!moved) throw new Error("Keine Bewegung nach 15 Versuchen — Input tot?");
  }

  // SwiftShader-Frametimes streuen extrem (ein Frame kann mehrere Einheiten
  // Bewegung bedeuten). Deshalb: erst nach hinten laufen, bis die
  // Spielfeld-Klemme z=17 exakt fixiert, dann seitlich ins breite
  // Eichen-Fenster (x ≈ 0.1–4.9) pendeln, bis nearby anschlägt.
  for (let i = 0; i < 6; i++) await press("s", 500);
  let state = await getState();
  for (let i = 0; i < 40 && !(state.nearbyId in KNOWN); i++) {
    const x = state.playerPosition[0];
    await press(x > 2.5 ? "a" : "d", 200);
    state = await getState();
  }
  await page.waitForTimeout(400);
  state = await getState();
  console.log("Spieler:", state.playerPosition, "nearby:", state.nearbyId);
  if (!(state.nearbyId in KNOWN)) {
    await page.screenshot({ path: "screenshots/smoke-fail.png" });
    throw new Error(`Kein bekanntes Interactable erreicht (${state.nearbyId})`);
  }
  const [tx, tz] = KNOWN[state.nearbyId];

  // Ziel exakt auf den Bildschirm projizieren — gleiche Kamera-Mathematik
  // wie FollowCamera (Offset [0,9.5,11.5], LookAt Spieler+[0,0.4,0]).
  const [px, py, pz] = state.playerPosition;
  const camera = new THREE.PerspectiveCamera(48, 1280 / 720, 0.1, 250);
  camera.position.set(px, py + 9.5, pz + 11.5);
  camera.lookAt(px, py + 0.4, pz);
  camera.updateMatrixWorld();

  // Mehrere Höhen anklicken, bis der Raycast das Mesh trifft
  // (bei der Eiche sitzt der dicke Stamm deutlich höher als ein Pickup).
  const candidates = [];
  for (const ty of [0.9, 0.45, 1.6, 0.25, 0.7]) {
    const projected = new THREE.Vector3(tx, ty, tz).project(camera);
    candidates.push([
      Math.round((projected.x + 1) * 640),
      Math.round((1 - projected.y) * 360),
    ]);
  }
  // Fallback: grobes Raster über die Bildmitte. Nicht-nahe Interactables
  // schlucken Klicks nicht (ihr Guard feuert vor stopPropagation), es kann
  // also nur das nahe Ziel antworten.
  for (let sy = 150; sy <= 450; sy += 100) {
    for (let sx = 400; sx <= 900; sx += 100) {
      candidates.push([sx, sy]);
    }
  }

  let clicked = null;
  for (const [sx, sy] of candidates) {
    await page.mouse.click(sx, sy);
    await page.waitForTimeout(350);
    if (await page.$(DIALOG)) {
      clicked = [sx, sy];
      break;
    }
  }
  if (!clicked) {
    await page.screenshot({ path: "screenshots/smoke-fail.png" });
    throw new Error(`Kein Dialog nach Klick auf ${state.nearbyId}`);
  }
  console.log(`Linksklick-Dialog OK (${state.nearbyId})`);

  // Dialog per Klick auf die Box weiterschalten/schließen.
  for (let i = 0; i < 8 && (await page.$(DIALOG)); i++) {
    await page.click(DIALOG);
    await page.waitForTimeout(250);
  }
  const stillOpen = await page.$(DIALOG);
  console.log(stillOpen ? "Dialog noch offen (Choices?)" : "Dialog geschlossen");

  // Rechtsklick = „Anschauen" — gleicher Kandidaten-Durchlauf wie links.
  if (!stillOpen) {
    let lookOk = false;
    for (const [sx, sy] of [clicked, ...candidates]) {
      await page.mouse.click(sx, sy, { button: "right" });
      await page.waitForTimeout(350);
      if (await page.$(DIALOG)) {
        lookOk = true;
        break;
      }
    }
    if (!lookOk) throw new Error("Rechtsklick öffnete keinen Dialog");
    console.log("Rechtsklick-Anschauen OK");
  }

  console.log("Smoke-Test bestanden");
} finally {
  await browser.close();
}
