import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Markdown } from "@/lib/markdown";
import { getPublishedPostBySlug, getPublishedPosts, localizePost } from "@/lib/posts";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/config";

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return routing.locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};

  const localized = localizePost(post, locale as Locale);
  const url = `${SITE_URL}/${locale}/blog/${slug}`;

  return {
    title: localized.seoTitle,
    description: localized.seoDescription,
    alternates: {
      canonical: url,
      languages: {
        sr: `${SITE_URL}/sr/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: localized.seoTitle,
      description: localized.seoDescription,
      url,
      images: localized.coverImageUrl ? [{ url: localized.coverImageUrl, width: 1200, height: 630 }] : undefined,
      locale: locale === "sr" ? "sr_RS" : "en_US",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("blog");

  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const localized = localizePost(post, locale as Locale);
  const url = `${SITE_URL}/${locale}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: localized.title,
    datePublished: localized.publishedAt,
    dateModified: localized.updatedAt,
    image: localized.coverImageUrl ?? undefined,
    inLanguage: locale,
    mainEntityOfPage: url,
    publisher: { "@id": `${SITE_URL}/#org` },
  };

  return (
    <main id="main">
      <article style={{ maxWidth: "72ch", margin: "0 auto", padding: "4rem var(--gutter)" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Link href="/blog">{t("back")}</Link>
        <h1>{localized.title}</h1>
        {localized.coverImageUrl && (
          <Image
            src={localized.coverImageUrl}
            alt={localized.title}
            width={1200}
            height={630}
            priority
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius, 8px)" }}
          />
        )}
        <Markdown content={localized.content} />
      </article>
    </main>
  );
}
