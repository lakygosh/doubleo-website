-- Blog posts + site settings for the n8n-fed blog.
-- Run this once in the Supabase SQL editor (or via `supabase db push`).

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_sr text not null,
  title_en text not null,
  excerpt_sr text,
  excerpt_en text,
  content_sr text not null,
  content_en text not null,
  cover_image_url text,
  seo_title_sr text,
  seo_title_en text,
  seo_description_sr text,
  seo_description_en text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists posts_status_published_at_idx on public.posts (status, published_at desc);

create table if not exists public.settings (
  id int primary key check (id = 1),
  auto_publish boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.settings (id, auto_publish)
values (1, false)
on conflict (id) do nothing;

alter table public.posts enable row level security;
alter table public.settings enable row level security;

-- Public can only ever read published posts.
create policy "public read published posts"
  on public.posts for select
  to anon, authenticated
  using (status = 'published');

-- The single admin (authenticated) can read everything, including drafts.
create policy "authenticated read all posts"
  on public.posts for select
  to authenticated
  using (true);

-- No insert/update/delete policies for anon or authenticated: all writes go through
-- server-side code using the service-role key, after their own auth checks
-- (bearer token for the ingestion API, Supabase Auth session for admin actions).

create policy "authenticated read settings"
  on public.settings for select
  to authenticated
  using (true);

create policy "authenticated update settings"
  on public.settings for update
  to authenticated
  using (true)
  with check (true);
