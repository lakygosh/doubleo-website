/**
 * Team portraits — cut-outs onto brand backgrounds.
 *
 *   node scripts/make-team.mjs        (or: npm run team)
 *
 * The source files in assets/team-photos are transparent PNGs of 1–3 MB
 * each, which is far too heavy to ship on the landing page, and the gallery
 * renders them through a plain <img> so next/image never gets a chance to
 * optimise them. This bakes each cut-out onto an aurora background from
 * tokens.css and writes a ~640×800 webp instead.
 *
 * Backgrounds are the light end of the palette on purpose: everyone is
 * wearing black, and on a dark aurora the silhouette would disappear.
 *
 * Re-run it when a photo or a brand colour changes; the output is committed.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const W = 640;
const H = 800;

/** One gradient per member, walking the aurora the way the bento cards do. */
const PEOPLE = [
  {
    src: "assets/team-photos/Lazar_Gosic_CoFounder_Automation_Engineerbgfree.png",
    out: "public/team/lazar.webp",
    stops: ["#efe8f6", "#e6c9f7", "#ffb8ea"],
  },
  {
    src: "assets/team-photos/Nevena_AI_Automation_engineer_bgfree.png",
    out: "public/team/nevena.webp",
    stops: ["#eef2fd", "#cfd9fb", "#f6cfe9"],
  },
  {
    src: "assets/team-photos/Pavle_Automation_Engineerbgfree.png",
    out: "public/team/pavle.webp",
    stops: ["#fdf0e8", "#f8d8c4", "#eec2ee"],
  },
];

const backdrop = ([a, b, c]) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="${a}"/>
         <stop offset="55%" stop-color="${b}"/>
         <stop offset="100%" stop-color="${c}"/>
       </linearGradient>
     </defs>
     <rect width="${W}" height="${H}" fill="url(#g)"/>
   </svg>`
);

for (const { src, out, stops } of PEOPLE) {
  await mkdir("public/team", { recursive: true });

  // The cut-outs arrive with a lot of empty space around them, and at wildly
  // different framings — one full-length shot, two head-and-shoulders. Trim
  // to the subject first, then crop from the top to a fixed portrait: that
  // lands every head at a similar size instead of shrinking the full-length
  // shot to a speck. Bottom-aligned, so all three stand on the same line.
  const person = await sharp(src)
    .trim({ threshold: 0 })
    .resize({ width: Math.round(W * 0.86), height: Math.round(H * 0.92), fit: "cover", position: "top" })
    .toBuffer();

  const info = await sharp(backdrop(stops))
    .composite([{ input: person, gravity: "south" }])
    .webp({ quality: 82 })
    .toFile(out);

  console.log(`${out}  ${(info.size / 1024).toFixed(0)} KB`);
}
