import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);
const assets = new Map([
  ["weissheim-logo.webp", fileURLToPath(new URL("../src/assets/weissheim-logo.webp", import.meta.url))],
  ...[
    ["space-grotesk", "400-normal"],
    ["space-grotesk", "600-normal"],
    ["cormorant-garamond", "700-normal"],
  ].map(([family, variant]): [string, string] => {
    const filename = `${family}-latin-${variant}.woff2`;
    return [filename, require.resolve(`@fontsource/${family}/files/${filename}`)];
  }),
]);

// Reuse the landing page's source assets for the static legal pages in dev and builds.
export function legalAssets(): Plugin {
  return {
    name: "weissheim-legal-assets",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = request.url?.split("?")[0];
        const filename = pathname?.startsWith("/legal-assets/") ? pathname.slice("/legal-assets/".length) : undefined;
        const source = filename ? assets.get(filename) : undefined;
        if (!source || !filename || !["GET", "HEAD"].includes(request.method ?? "")) {
          next();
          return;
        }
        response.setHeader("Content-Type", filename.endsWith(".woff2") ? "font/woff2" : "image/webp");
        response.end(request.method === "HEAD" ? undefined : readFileSync(source));
      });
    },
    generateBundle() {
      for (const [filename, source] of assets) {
        this.emitFile({ type: "asset", fileName: `legal-assets/${filename}`, source: readFileSync(source) });
      }
    },
  };
}
