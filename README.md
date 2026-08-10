# Double O — doubleo.agency

Marketing site + blog for the Double O AI automation agency. Bilingual (Serbian default / English),
built with Next.js (App Router, SSR/SSG) and deployed on Vercel. The blog is fed by an n8n
automation via a bearer-token-protected API and stored in Supabase (Postgres).

## Stack

- **Next.js 15** (App Router) — homepage + blog, SSR/SSG for SEO
- **next-intl** — `/sr` and `/en` locale routing; UI copy lives in `messages/sr.json` / `messages/en.json`
- **Supabase** (Postgres + Auth) — blog post storage, RLS, admin login
- **Vercel** — hosting, on-demand revalidation

## Config

Defaults for everything below live in `lib/config.ts`; the env var only overrides them.

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project + public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only, used by the ingestion API and admin actions |
| `POSTS_API_BEARER_TOKEN` | secret n8n sends as `Authorization: Bearer <token>` to `POST /api/posts` |
| `NEXT_PUBLIC_SITE_URL` | canonical/OG/sitemap base URL |
| `NEXT_PUBLIC_CALCOM_URL` / `NEXT_PUBLIC_FORM_ENDPOINT` | booking link + contact form relay (unchanged from the old site) |
| `NEXT_PUBLIC_CHAT_WEBHOOK_URL` | n8n chat agent, reached through `/api/chat` — never called from the browser directly |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` | GA4 + Tag Manager. Empty value disables either tag (use that on previews) |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `_LINKEDIN_URL` / `_X_URL` / `_FACEBOOK_URL` | footer social links, each shown only when set |

Copy `.env.local.example` to `.env.local` and fill in real values for local dev. Set the same vars
on the Vercel project (Production + Preview) before deploying.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

Two gates before anything merges: `npx tsc --noEmit` and `npm run lint` (ESLint flat
config, `next/core-web-vitals`). `npm run icons` / `og` / `team` regenerate derived
assets in `public/` from the masters in `public/logos/` and `assets/team-photos/` —
one-time scripts, not part of the build.

## Database setup (one-time, in the Supabase SQL editor)

Run `supabase/migrations/0001_init.sql` — creates the `posts` and `settings` tables with RLS.
Then create at least one admin user manually in the Supabase dashboard
(Authentication → Users → Add user) — there is no self-signup for `/admin`.

## Blog content pipeline

1. n8n generates a post (Markdown, bilingual SR/EN) and uploads any images to Cloudflare R2.
2. n8n `POST`s to `/api/posts` with an `Authorization: Bearer <POSTS_API_BEARER_TOKEN>` header.
3. The post lands as a **draft** unless the `auto_publish` toggle in `/admin` is on.
4. Review drafts and publish them from `/admin` (Supabase Auth login required).

See `app/api/posts/route.ts` for the exact request/response shape.

## Where things live

- `app/[locale]/` — homepage, `/solutions`, `/solutions/[slug]`, `/blog`, `/blog/[slug]`,
  `/contact`, `/privacy-policy` (all locale-prefixed, SSR/SSG)
- `app/admin/` — login-gated admin panel (drafts, publish/unpublish/delete, auto-publish toggle)
- `app/api/posts/route.ts` — n8n ingestion endpoint
- `app/api/chat/route.ts` — server-side proxy to the n8n chat agent (the webhook only
  allows the production origin, so the browser must not call it directly)
- `lib/posts.ts`, `lib/settings.ts` — Supabase data access
- `lib/supabase/` — Supabase client helpers (server, browser, middleware session refresh)
- `lib/solutions.ts` — the solution catalogue that drives the nav, `/solutions` and the sitemap
- `messages/sr.json`, `messages/en.json` — all UI copy, every page
- `app/globals.css` — import manifest only; the design system lives in `app/styles/*.css`
  (tokens first, then base → motion → ui → layout → sections → chat → pages → blog → admin)
- `DESIGN-SYSTEM.md` — the tokens and components written out for reuse elsewhere,
  plus the rules for vendoring third-party components into `components/lightswind/`
- `public/assets/widget.js` — standalone floating chat widget, shares `CHAT_WEBHOOK_URL`
- `supabase/migrations/0001_init.sql` — schema + RLS
