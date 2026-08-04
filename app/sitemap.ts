import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { routing } from "@/i18n/routing";
import { SOLUTIONS } from "@/lib/solutions";
import { SITE_URL } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) => [
    { url: `${SITE_URL}/${locale}`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/${locale}/solutions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/${locale}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/${locale}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/${locale}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
  ]);

  const solutionEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    SOLUTIONS.map((s) => ({
      url: `${SITE_URL}/${locale}/solutions/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: s.featured ? 0.9 : 0.8,
    }))
  );

  const postEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: post.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...solutionEntries, ...postEntries];
}
