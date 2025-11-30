import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  // WICHTIG: relative Pfade nutzen, damit es überall funktioniert
  base: "./",
  build: {
    outDir: "../docs",   // in /docs bauen (für GitHub Pages)
    emptyOutDir: true,   // docs vorher leeren, damit kein alter Kram drin bleibt
  },
});
