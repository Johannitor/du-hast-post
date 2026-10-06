import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" -> funktioniert auf GitHub Pages unter jedem Repo-Pfad
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
