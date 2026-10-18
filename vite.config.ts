import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Caminhos relativos: o build funciona em qualquer hospedagem estática (GitHub Pages, Netlify...).
  base: "./",
  plugins: [react(), tailwindcss()],
});
