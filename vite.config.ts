import { defineConfig } from "vite";

export default defineConfig({
  // Relative paths so the build works when dropped into Hostinger public_html
  base: "./",
  build: {
    target: "es2019",
    assetsInlineLimit: 2048,
    cssMinify: true,
  },
});
