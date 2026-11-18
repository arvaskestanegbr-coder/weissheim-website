import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.resolve(scriptDir, "..");
const docsDir = path.resolve(webDir, "../docs");

function runBuild() {
  const result = spawnSync("npm", ["run", "build"], {
    cwd: webDir,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  assert.equal(result.status, 0, "Build fehlgeschlagen.");
}

async function checkRenderOutput() {
  const indexPath = path.join(docsDir, "index.html");
  assert.ok(existsSync(indexPath), "docs/index.html fehlt nach dem Build.");

  const html = await readFile(indexPath, "utf8");
  assert.match(html, /<main id="main-content"/, "Statischer Seiteninhalt fehlt.");
  assert.match(html, /<h1>Mehr Struktur\.<br>Weniger Chaos\.<\/h1>/, "Startseite enthält die Produktgeschichte nicht.");
  assert.match(html, /assets\/index-[^"]+\.js/, "Gebündelter Moduleinstieg fehlt.");
  assert.match(html, /wb4\/style\.css/, "Stylesheet der Startseite fehlt.");

  for (const media of ["einhaengen.mp4", "aufbau-quer.mp4", "aufbau-hoch.mp4"]) {
    const file = await readFile(path.join(docsDir, "wb4/assets", media));
    assert.equal(file.toString("ascii", 4, 8), "ftyp", `Film fehlt oder ist keine MP4-Datei: ${media}`);
  }
  for (const size of ["d", "m"]) {
    const frames = await readdir(path.join(docsDir, "wb4/assets/seq", size));
    for (let i = 0; i < 140; i++) {
      const name = `${String(i).padStart(4, "0")}.webp`;
      assert.ok(frames.includes(name), `Bildfolge ${size}: ${name} fehlt.`);
    }
  }
}

async function checkProductionOutput() {
  const html = await readFile(path.join(docsDir, "index.html"), "utf8");
  assert.match(html, /<link\s+rel="canonical"\s+href="https:\/\/weissheim\.com\/"/, "Produktions-Canonical fehlt.");
  assert.doesNotMatch(html, /noindex|netlify\.app|Designvorschau/i, "Vorschau-Metadaten sind im Produktions-HTML enthalten.");
  assert.equal((await readFile(path.join(docsDir, "CNAME"), "utf8")).trim(), "weissheim.com", "Produktions-Domain fehlt.");

  const robots = await readFile(path.join(docsDir, "robots.txt"), "utf8");
  assert.match(robots, /^Allow:\s*\/\s*$/m, "robots.txt erlaubt die Produktionsseite nicht.");
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m, "robots.txt sperrt die Produktionsseite.");
  assert.match(robots, /Sitemap:\s*https:\/\/weissheim\.com\/sitemap\.xml/, "Produktions-Sitemap fehlt in robots.txt.");
  assert.ok(existsSync(path.join(docsDir, "sitemap.xml")), "Produktions-Sitemap wurde nicht gebaut.");

  const assetNames = await readdir(path.join(docsDir, "assets"));
  assert.ok(!assetNames.some((name) => /^(?:PreviewPage|PreviewProduct|PreviewStory|interior-preview-2026)-/.test(name)), "2026-Designvorschau ist im Produktions-Build enthalten.");
  for (const name of assetNames.filter((asset) => asset.endsWith(".js"))) {
    const bundle = await readFile(path.join(docsDir, "assets", name), "utf8");
    assert.doesNotMatch(bundle, /Designvorschau 2026|weissheim-designvorschau-2026\.netlify\.app|interior-preview-2026/, "Vorschau-Inhalte sind im Produktions-Bundle enthalten.");
  }
}

async function checkLegalAssets() {
  for (const filename of ["impressum.html", "datenschutz.html", "agb.html"]) {
    const html = await readFile(path.join(docsDir, filename), "utf8");
    assert.match(html, /<link\s+rel="stylesheet"\s+href="\/legal\.css"/, `Rechteseiten-Stylesheet fehlt in ${filename}.`);
    assert.match(html, /src="\/legal-assets\/weissheim-logo\.webp"/, `Markenlogo fehlt in ${filename}.`);
  }

  const stylesheet = await readFile(path.join(docsDir, "legal.css"), "utf8");
  const fontUrls = Array.from(stylesheet.matchAll(/url\(["']?([^"')]+)["']?\)/g), (match) => match[1]);
  assert.ok(fontUrls.length >= 3, "Die lokalen Rechteseiten-Schriften fehlen im Stylesheet.");
  for (const assetUrl of ["/legal-assets/weissheim-logo.webp", ...fontUrls]) {
    const pathname = new URL(assetUrl, "https://weissheim.com/legal.css").pathname;
    const assetPath = path.join(docsDir, pathname);
    assert.ok(existsSync(assetPath), `Referenziertes Rechteseiten-Asset fehlt: ${pathname}`);
    assert.ok((await readFile(assetPath)).length > 0, `Rechteseiten-Asset ist leer: ${pathname}`);
  }
}

async function checkNavigationAndCta() {
  const html = await readFile(path.join(docsDir, "index.html"), "utf8");
  for (const target of ["produkt", "vorteile", "ueber-uns", "stimmen", "kontakt", "zahl", "farben", "hilfe"]) {
    assert.ok(html.includes(`id="${target}"`), `Sprungziel #${target} fehlt im HTML.`);
  }
  for (const asin of ["B0F3ZBN75C", "B0F3YS8JHV"]) {
    const url = `https://www.amazon.de/dp/${asin}?th=1`;
    assert.ok(html.includes(`href="${url}"`), `Amazon-Angebot fehlt: ${asin}`);
    assert.ok(html.includes(`href="${url}#customerReviews"`), `Amazon-Bewertungen fehlen: ${asin}`);
  }
  assert.match(html, /href="mailto:info@weissheim\.com" data-kontakt-oeffnen/, "Kontaktalternative fehlt.");
}

async function checkContactSubmitContract() {
  const formPath = path.join(webDir, "src/kontakt-startseite.ts");
  const form = await readFile(formPath, "utf8");
  const markup = await readFile(path.join(webDir, "src/kontakt-dialog.html"), "utf8");

  assert.match(form, /api\.web3forms\.com\/submit/, "Web3Forms-Endpunkt fehlt.");
  for (const field of ["name", "email", "subject", "order_number", "message", "from", "company_name"]) {
    assert.ok(markup.includes(`name="${field}"`), `Formularfeld ${field} fehlt.`);
  }
  assert.match(markup, /name="from" value="Kontaktformular weissheim\.com"/, "Gmail-Filterkennung fehlt.");
  assert.match(markup, /href="\/datenschutz\.html#kontakt"/, "Datenschutzhinweis vor dem Senden fehlt.");
  assert.match(form, /SUBMIT_COOLDOWN_MS/, "Cooldown-Logik fehlt.");
  assert.match(form, /trackContactSubmit\("success"\)/, "Success-Tracking fehlt.");
  assert.match(form, /trackContactSubmit\("error"\)/, "Error-Tracking fehlt.");
}

async function checkContactKeyBundled() {
  const assetsDir = path.join(docsDir, "assets");
  const bundleName = (await readdir(assetsDir)).find(
    (file) => file.startsWith("index-") && file.endsWith(".js"),
  );
  assert.ok(bundleName, "Gebündelte JS-Datei fehlt in docs/assets.");

  const bundle = await readFile(path.join(assetsDir, bundleName), "utf8");
  assert.ok(bundle.includes("https://api.web3forms.com/submit"), "Kontaktversand fehlt im gebauten Einstieg.");
  assert.match(
    bundle,
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
    "Web3Forms-Key fehlt im Bundle — VITE_WEB3FORMS_ACCESS_KEY war beim Build nicht gesetzt. " +
      "Das Kontaktformular waere live funktionslos.",
  );
}

async function main() {
  runBuild();
  await checkRenderOutput();
  await checkProductionOutput();
  await checkLegalAssets();
  await checkNavigationAndCta();
  await checkContactSubmitContract();
  await checkContactKeyBundled();
  console.log("Smoke-Checks erfolgreich.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
