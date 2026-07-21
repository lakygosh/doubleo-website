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

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project + public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only, used by the ingestion API and admin actions |
| `POSTS_API_BEARER_TOKEN` | secret n8n sends as `Authorization: Bearer <token>` to `POST /api/posts` |
| `NEXT_PUBLIC_SITE_URL` | canonical/OG/sitemap base URL |
| `NEXT_PUBLIC_CALCOM_URL` / `NEXT_PUBLIC_FORM_ENDPOINT` | booking link + contact form relay (unchanged from the old site) |

Copy `.env.local.example` to `.env.local` and fill in real values for local dev. Set the same vars
on the Vercel project (Production + Preview) before deploying.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

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

- `app/[locale]/` — homepage, `/blog`, `/blog/[slug]` (locale-prefixed, SSR/SSG)
- `app/admin/` — login-gated admin panel (drafts, publish/unpublish/delete, auto-publish toggle)
- `app/api/posts/route.ts` — n8n ingestion endpoint
- `lib/posts.ts`, `lib/settings.ts` — Supabase data access
- `lib/supabase/` — Supabase client helpers (server, browser, middleware session refresh)
- `messages/sr.json`, `messages/en.json` — all homepage UI copy
- `app/globals.css` — design system ("night shift": ink / warm off-white / signal green / leak amber), ported unchanged from the old Vite site
- `supabase/migrations/0001_init.sql` — schema + RLS
