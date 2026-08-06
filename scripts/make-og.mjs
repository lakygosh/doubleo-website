/**
 * Generates public/og.png (1200×630) from inline SVG using @resvg/resvg-js.
 * Run once: `npm run og`. The favicon/app icons come from scripts/make-icons.mjs.
 * Text uses system fonts (Segoe UI/Arial) — the OG card is geometry-led.
 *
 * The card is deliberately language-neutral: one image is served for both
 * locales, so baked-in Serbian or English copy would be wrong half the time.
 */
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public");
mkdirSync(out, { recursive: true });

// The logo mark, inlined so resvg needs no external file access.
const markUri =
  "data:image/png;base64," +
  readFileSync(join(out, "logo-mark.png")).toString("base64");

// The aurora gradient from app/styles/tokens.css.
const aurora = `
  <linearGradient id="aurora" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%"   stop-color="#80a9fc"/>
    <stop offset="31%"  stop-color="#d37bff"/>
    <stop offset="70%"  stop-color="#fcab83"/>
    <stop offset="100%" stop-color="#ff49d4"/>
  </linearGradient>`;

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    ${aurora}
    <radialGradient id="glowA" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#d37bff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#d37bff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fcab83" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#fcab83" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0b0510"/>
  <ellipse cx="1080" cy="90" rx="440" ry="360" fill="url(#glowA)"/>
  <ellipse cx="80" cy="600" rx="420" ry="340" fill="url(#glowB)"/>
  <rect x="36" y="36" width="1128" height="558" rx="28" fill="none" stroke="#ffffff" stroke-opacity="0.14"/>

  <!-- Logo mark -->
  <image href="${markUri}" x="96" y="118" width="155" height="96"/>
  <text x="279" y="176" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="52" fill="#ffffff" letter-spacing="-1">Double O</text>

  <text x="96" y="356" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="72" fill="#ffffff" letter-spacing="-2">AI systems that answer,</text>
  <text x="96" y="436" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="72" fill="#ffffff" letter-spacing="-2">follow up and book.</text>

  <circle cx="103" cy="530" r="7" fill="url(#aurora)"/>
  <text x="124" y="540" font-family="Segoe UI, Arial, sans-serif" font-weight="600" font-size="26" fill="#d37bff" letter-spacing="2">CHATBOT · OUTREACH · VOICE · 24/7</text>
  <text x="1104" y="540" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-weight="400" font-size="26" fill="#ffffff" fill-opacity="0.6">doubleo.agency</text>
</svg>`;

for (const [name, svg, width] of [["og.png", og, 1200]]) {
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { loadSystemFonts: true },
  }).render().asPng();
  writeFileSync(join(out, name), png);
  console.log(`✓ public/${name} (${png.length} bytes)`);
}
