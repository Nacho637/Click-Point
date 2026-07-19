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
  await page.waitForTimeout(3000);

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

  // Bekannte Interactables rund um den Spawn (Positionen aus GardenScene).
  const KNOWN = {
    hedgehog: [-2.8, 6.2],
    flowerpot: [-6.8, 4.2],
    snail: [-5.2, 8.5],
    "watering-can": [-8.9, 6.3],
    crumbs: [4.8, 7.5],
    compost: [9.5, 7.6],
    "smooth-stone": [-9.5, 0.2],
  };

  // Loslaufen, bis irgendein bekanntes Interactable in Reichweite ist.
  // SwiftShader-Frametimes streuen zu stark für punktgenaues Ansteuern,
  // daher pendeln wir auf der Spawn-Höhe (z≈8) durch die Trigger-Radien
  // von Schnecke/Blumentopf/Gießkanne, bis nearby anschlägt.
  let state = await getState();
  let dir = "a";
  for (let i = 0; i < 60 && !(state.nearbyId in KNOWN); i++) {
    const x = state.playerPosition[0];
    if (x < -10.5) dir = "d";
    else if (x > -3) dir = "a";
    await press(dir, 70);
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

  // Mehrere Höhen anklicken, bis der Raycast das Mesh trifft.
  let clicked = null;
  for (const ty of [0.45, 0.25, 0.7, 0.1]) {
    const projected = new THREE.Vector3(tx, ty, tz).project(camera);
    const sx = Math.round((projected.x + 1) * 640);
    const sy = Math.round((1 - projected.y) * 360);
    await page.mouse.click(sx, sy);
    await page.waitForTimeout(400);
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

  // Rechtsklick = „Anschauen" am selben Punkt.
  if (!stillOpen) {
    await page.mouse.click(clicked[0], clicked[1], { button: "right" });
    await page.waitForTimeout(500);
    if (await page.$(DIALOG)) {
      console.log("Rechtsklick-Anschauen OK");
    } else {
      throw new Error("Rechtsklick öffnete keinen Dialog");
    }
  }

  console.log("Smoke-Test bestanden");
} finally {
  await browser.close();
}
