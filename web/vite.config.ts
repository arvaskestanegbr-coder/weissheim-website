import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/weissheim-website/",   // <-- wichtig für GitHub Project Pages
  build: {
    outDir: "../docs",            // baut in den docs-Ordner für GitHub Pages
  },
});
