/**
 * Generates public/og.png (1200×630) and public/apple-touch-icon.png (180×180)
 * from inline SVG using @resvg/resvg-js. Run once: `npm run og`.
 * Text uses system fonts (Segoe UI/Arial) — the OG card is geometry-led.
 */
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public");
mkdirSync(out, { recursive: true });

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0e1210"/>
  <!-- hairline frame -->
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#ede9df" stroke-opacity="0.18"/>
  <!-- the 00 mark -->
  <g transform="translate(96,120)">
    <circle cx="90" cy="90" r="72" fill="none" stroke="#ede9df" stroke-width="18"/>
    <circle cx="236" cy="90" r="72" fill="none" stroke="#ede9df" stroke-width="18"/>
    <circle cx="236" cy="90" r="26" fill="#8ce2a4"/>
  </g>
  <text x="96" y="420" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="76" fill="#ede9df" letter-spacing="-1">Double O</text>
  <text x="96" y="486" font-family="Segoe UI, Arial, sans-serif" font-weight="400" font-size="34" fill="#a8b0a6">AI sistemi koji pretvaraju pažnju u prihod — 24/7</text>
  <!-- status line -->
  <circle cx="106" cy="546" r="7" fill="#8ce2a4"/>
  <text x="126" y="556" font-family="Segoe UI, Arial, sans-serif" font-weight="600" font-size="26" fill="#8ce2a4" letter-spacing="2">SISTEM AKTIVAN · 00:00–24:00</text>
  <text x="1104" y="556" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-weight="400" font-size="26" fill="#a8b0a6">doubleo.agency</text>
</svg>`;

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0e1210"/>
  <circle cx="24" cy="32" r="13" fill="none" stroke="#ede9df" stroke-width="4"/>
  <circle cx="44" cy="32" r="13" fill="none" stroke="#ede9df" stroke-width="4"/>
  <circle cx="44" cy="32" r="5" fill="#8ce2a4"/>
</svg>`;

for (const [name, svg, width] of [
  ["og.png", og, 1200],
  ["apple-touch-icon.png", icon, 180],
]) {
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { loadSystemFonts: true },
  }).render().asPng();
  writeFileSync(join(out, name), png);
  console.log(`✓ public/${name} (${png.length} bytes)`);
}
