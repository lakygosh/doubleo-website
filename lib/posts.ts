import "server-only";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { Locale } from "@/i18n/routing";

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title_sr: string;
  title_en: string;
  excerpt_sr: string | null;
  excerpt_en: string | null;
  content_sr: string;
  content_en: string;
  cover_image_url: string | null;
  seo_title_sr: string | null;
  seo_title_en: string | null;
  seo_description_sr: string | null;
  seo_description_en: string | null;
  status: PostStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type LocalizedPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  seoTitle: string;
  seoDescription: string;
  status: PostStatus;
  updatedAt: string;
  publishedAt: string | null;
};

export function localizePost(post: Post, locale: Locale): LocalizedPost {
  const title = locale === "sr" ? post.title_sr : post.title_en;
  const excerpt = locale === "sr" ? post.excerpt_sr : post.excerpt_en;
  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt,
    content: locale === "sr" ? post.content_sr : post.content_en,
    coverImageUrl: post.cover_image_url,
    seoTitle: (locale === "sr" ? post.seo_title_sr : post.seo_title_en) ?? title,
    seoDescription: (locale === "sr" ? post.seo_description_sr : post.seo_description_en) ?? excerpt ?? "",
    status: post.status,
    updatedAt: post.updated_at,
    publishedAt: post.published_at,
  };
}

/** Public read: published posts only, newest first. No request scope required (safe at build time). */
export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/** Public read: a single published post by slug, or null if it doesn't exist / isn't published. */
export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data;
}

/** Admin read: all posts regardless of status (RLS allows this for authenticated users). */
export async function getAllPostsForAdmin(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export type NewPostInput = {
  slug: string;
  title_sr: string;
  title_en: string;
  excerpt_sr?: string | null;
  excerpt_en?: string | null;
  content_sr: string;
  content_en: string;
  cover_image_url?: string | null;
  seo_title_sr?: string | null;
  seo_title_en?: string | null;
  seo_description_sr?: string | null;
  seo_description_en?: string | null;
};

/** Service-role insert used by POST /api/posts. */
export async function insertPost(input: NewPostInput, status: PostStatus) {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({
      ...input,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select("id, slug, status")
    .single();

  return { data, error };
}
