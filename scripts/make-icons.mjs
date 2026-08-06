/**
 * Derives the site icons from the master logo in public/logos/.
 * Trims the transparent margin off the source, then writes a tight mark for
 * the nav/footer lockups plus the favicon / PWA / apple-touch sizes.
 *
 *   node scripts/make-icons.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "public/logos/DoubleO_logo_finalbgfree.png");
const out = path.join(root, "public");

await mkdir(out, { recursive: true });

// Tight, transparent mark — everything else is derived from this.
const mark = await sharp(src).trim({ threshold: 1 }).png().toBuffer();
const { width, height } = await sharp(mark).metadata();

await sharp(mark).resize({ width: 512 }).png().toFile(path.join(out, "logo-mark.png"));

/** Square canvas with the mark centred and a little breathing room. */
async function square(size, pad, background, file) {
  const inner = Math.round(size * (1 - pad * 2));
  const scaled = await sharp(mark)
    .resize({ width: inner, height: Math.round((inner * height) / width), fit: "inside" })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: scaled, gravity: "center" }])
    .png()
    .toFile(path.join(out, file));
}

const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const white = { r: 255, g: 255, b: 255, alpha: 1 };

await square(32, 0.02, clear, "favicon-32.png");
await square(192, 0.06, clear, "icon-192.png");
await square(512, 0.06, clear, "icon-512.png");
await square(180, 0.12, white, "apple-touch-icon.png");

console.log(`trimmed source ${width}×${height} → icons written to public/`);
