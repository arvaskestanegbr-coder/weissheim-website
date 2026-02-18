import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
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
  assert.match(html, /<div id="root"><\/div>/, "Root-Container fehlt.");
  assert.match(html, /assets\/index-[^"]+\.js/, "Gebündelte JS-Datei fehlt.");
  assert.match(html, /assets\/index-[^"]+\.css/, "Gebündelte CSS-Datei fehlt.");
}

async function checkNavigationAndCta() {
  const headerPath = path.join(webDir, "src/sections/SiteHeader.tsx");
  const configPath = path.join(webDir, "src/config/site.ts");

  const header = await readFile(headerPath, "utf8");
  const config = await readFile(configPath, "utf8");

  assert.match(
    header,
    /href=\{`#\$\{item\.id\}`\}/,
    "Navigation nutzt keine dynamischen Section-Links.",
  );

  for (const sectionId of ["produkt", "vorteile", "ueber-uns"]) {
    assert.match(
      config,
      new RegExp(`id: "${sectionId}"`),
      `Section-Konfiguration für ${sectionId} fehlt.`,
    );
  }

  assert.match(
    config,
    /AMAZON_PRODUCT_URL[\s\S]*https:\/\/www\.amazon\.de\//,
    "Amazon-CTA-URL fehlt oder ist ungültig.",
  );
}

async function checkContactSubmitContract() {
  const formPath = path.join(webDir, "src/components/ContactForm.tsx");
  const form = await readFile(formPath, "utf8");

  assert.match(form, /api\.web3forms\.com\/submit/, "Web3Forms-Endpunkt fehlt.");
  assert.match(form, /company_name/, "Honeypot-Feld fehlt.");
  assert.match(form, /SUBMIT_COOLDOWN_MS/, "Cooldown-Logik fehlt.");
  assert.match(form, /trackContactSubmit\("success"\)/, "Success-Tracking fehlt.");
  assert.match(form, /trackContactSubmit\("error"\)/, "Error-Tracking fehlt.");
}

async function main() {
  runBuild();
  await checkRenderOutput();
  await checkNavigationAndCta();
  await checkContactSubmitContract();
  console.log("Smoke-Checks erfolgreich.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
