# Double O — doubleo.agency

Marketing site for the Double O AI automation agency. Bilingual (Serbian default / English),
fully static, built with Vite + TypeScript — no server runtime, no database.

## Config — `src/config.ts`

| Value | Status |
|---|---|
| `CALCOM_URL` | still `<<CALCOM_URL>>` — set your Cal.com link; until then "book a call" buttons fall back to the contact form |
| `FORM_ENDPOINT` | set to FormSubmit → emails go to `lazar.gosic@doubleo.agency`. **One-time activation:** submit the form once, then click the confirmation link FormSubmit emails you. After activation, FormSubmit shows a random alias endpoint — swap it in to keep the raw address out of the public bundle. |

## Run locally

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run og         # regenerate public/og.png + apple-touch-icon.png (only if you change branding)
```

## Deploy to Hostinger (shared hosting)

1. Set the two values in `src/config.ts`.
2. `npm run build` → everything you need is in `dist/`.
3. hPanel → **File Manager** → open `public_html`, delete the default placeholder files.
4. Upload the **contents** of `dist/` (not the folder itself) into `public_html`:
   - File Manager: zip `dist`'s contents, upload the zip, right-click → Extract, then delete the zip; or
   - FTP (FileZilla): host/user/pass from hPanel → *Files → FTP Accounts*, drag the contents of `dist/` into `public_html`.
5. Check `https://doubleo.agency/` — the site is a single `index.html` plus `assets/`, `og.png`, `favicon.svg`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`.

All asset paths are relative (`base: "./"` in `vite.config.ts`), so it also works from a subfolder.

## Where things live

- `index.html` — full page, Serbian copy baked in (SEO default), JSON-LD Organization + Service schema
- `src/i18n.ts` — every line of copy in both languages; edit copy here (SR also needs the matching text in `index.html`)
- `src/style.css` — design system ("night shift": ink / warm off-white / signal green / leak amber)
- `src/main.ts` — language toggle, live ops-log ticker, scroll reveals, mobile menu, contact form
- `scripts/make-og.mjs` — regenerates the Open Graph image and touch icon
- Real social proof: search `ADD_REAL_PROOF` in `index.html` — add case studies there when they exist; do not invent testimonials.
