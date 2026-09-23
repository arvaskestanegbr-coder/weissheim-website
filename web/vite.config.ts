import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { legalAssets } from "./plugins/legal-assets";

export default defineConfig({
  plugins: [react(), legalAssets()],
  base: "./",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
