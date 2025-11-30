import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../docs", // baue eine Ebene höher in den Ordner "docs"
  },
  base: "/", // passt gut für deine spätere eigene Domain
});
