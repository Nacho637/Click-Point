/**
 * Headless-Screenshot der Spielszene für Vorher/Nachher-Vergleiche.
 *
 * Nutzung:  node scripts/screenshot.mjs --name phase1 [--url http://localhost:3000/play] [--wait 5000]
 * Ergebnis: screenshots/<name>.png (1280x720)
 *
 * Läuft gegen das vorinstallierte Chromium; SwiftShader-Flags, damit WebGL
 * auch ohne GPU im Container rendert.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
function arg(flag, fallback) {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const name = arg("--name", "shot");
const url = arg("--url", "http://localhost:3000/play");
const extraWait = Number(arg("--wait", "5000"));
// Am Spawn verdeckt die Alte Eiche viel vom Bild; kurz vorlaufen ergibt eine offene Vergleichsansicht.
const walkMs = Number(arg("--walk", "2200"));
const outDir = path.resolve("screenshots");

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

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on("pageerror", (err) => console.error("[pageerror]", err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") console.error("[console]", msg.text());
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForSelector("canvas", { timeout: 30_000 });
  // Assets (HDRI/Texturen) laden asynchron nach; ein paar Sekunden rendern lassen.
  await page.waitForTimeout(extraWait);

  if (walkMs > 0) {
    await page.keyboard.down("w");
    await page.waitForTimeout(walkMs);
    await page.keyboard.up("w");
    await page.waitForTimeout(600);
  }

  await mkdir(outDir, { recursive: true });
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file });
  console.log(`Screenshot gespeichert: ${file}`);
} finally {
  await browser.close();
}
