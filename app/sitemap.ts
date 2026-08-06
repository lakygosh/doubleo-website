import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { SOLUTIONS } from "@/lib/solutions";
import { SITE_URL } from "@/lib/config";
import { languageAlternates } from "@/lib/seo";

/**
 * Google ignores <priority> and <changefreq> outright, so neither is emitted.
 * <lastmod> is the one hint it reads — and only for as long as it stays
 * honest, which rules out stamping build time on everything. Bump this by hand
 * when the marketing pages change; posts carry their own date from the DB.
 */
const PAGES_UPDATED = "2026-08-06";

/**
 * Locale-less paths, so a URL and its hreflang set can't drift apart.
 *
 * /privacy-policy is deliberately absent: it renders `noindex`, and submitting
 * a noindex URL only buys a Search Console warning.
 */
const STATIC_PATHS = ["", "/solutions", "/blog", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  /** The index is only ever as fresh as the newest post on it. */
  const blogUpdated = posts.reduce(
    (latest, post) => (post.updated_at > latest ? post.updated_at : latest),
    PAGES_UPDATED
  );

  const pages = [
    ...STATIC_PATHS.map((path) => ({
      path,
      lastModified: path === "/blog" ? blogUpdated : PAGES_UPDATED,
    })),
    ...SOLUTIONS.map((s) => ({ path: `/solutions/${s.slug}`, lastModified: PAGES_UPDATED })),
    ...posts.map((post) => ({ path: `/blog/${post.slug}`, lastModified: post.updated_at })),
  ];

  return routing.locales.flatMap((locale) =>
    pages.map(({ path, lastModified }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      alternates: { languages: languageAlternates(path) },
    }))
  );
}
