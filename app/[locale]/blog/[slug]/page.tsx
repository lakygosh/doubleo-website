import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Markdown } from "@/lib/markdown";
import { extractHeadings, readingMinutes } from "@/lib/toc";
import { getPublishedPostBySlug, getPublishedPosts, localizePost } from "@/lib/posts";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/config";
import { alternates } from "@/lib/seo";
import { BrandMark } from "@/components/layout/BrandMark";
import { BlogCard } from "@/components/ui/BlogCard";
import { BlogCtaPanel } from "@/components/blog/BlogCta";
import { PostToc } from "@/components/blog/PostToc";
import { FinalCta } from "@/components/sections/FinalCta";
import { Appear } from "@/components/motion/Appear";

export const dynamicParams = true;
/** Matches the index, so a post and the "keep reading" list can't drift apart. */
export const revalidate = 3600;

/** How many other posts to show under the article. */
const MORE_POSTS = 3;

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
    alternates: alternates(locale, `/blog/${slug}`),
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

  const headings = extractHeadings(localized.content);
  const minutes = readingMinutes(localized.content);

  const more = (await getPublishedPosts())
    .filter((p) => p.slug !== slug)
    .slice(0, MORE_POSTS)
    .map((p) => localizePost(p, locale as Locale));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: localized.title,
    description: localized.seoDescription || undefined,
    datePublished: localized.publishedAt,
    dateModified: localized.updatedAt,
    image: localized.coverImageUrl ?? undefined,
    inLanguage: locale,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Double O", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
  };

  const dateFormat = { day: "numeric", month: "long", year: "numeric" } as const;
  const dateLocale = locale === "sr" ? "sr-RS" : "en-GB";
  const published = localized.publishedAt
    ? new Date(localized.publishedAt).toLocaleDateString(dateLocale, dateFormat)
    : null;
  const updated = new Date(localized.updatedAt).toLocaleDateString(dateLocale, dateFormat);
  // Only worth surfacing when the post has actually been revised since publishing.
  const showUpdated =
    localized.publishedAt !== null &&
    new Date(localized.updatedAt).getTime() - new Date(localized.publishedAt).getTime() > 864e5;

  return (
    <main id="main">
      <article className="post">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Header */}
        <div className="wrap">
          <div className="posthead">
            <Link href="/blog" className="post__back">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
              {t("back")}
            </Link>

            <h1 className="post__title">{localized.title}</h1>
            {localized.excerpt && <p className="posthead__lead">{localized.excerpt}</p>}

            <div className="postmeta">
              <span className="postmeta__by">
                <BrandMark size={26} />
                Double O
              </span>
              <span className="postmeta__dot" aria-hidden="true" />
              <span className="postmeta__facts">
                {published && (
                  <time dateTime={localized.publishedAt ?? undefined}>{published}</time>
                )}
                {showUpdated && (
                  <>
                    {published && <span aria-hidden="true"> · </span>}
                    {t("updatedOn")}{" "}
                    <time dateTime={localized.updatedAt}>{updated}</time>
                  </>
                )}
                {published && <span aria-hidden="true"> · </span>}
                {t("readingTime", { minutes })}
              </span>
            </div>
          </div>
        </div>

        {/* Cover */}
        {localized.coverImageUrl && (
          <div className="wrap">
            <figure className="postcover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={localized.coverImageUrl} alt="" />
            </figure>
          </div>
        )}

        {/* Body, between the contents rail and the CTA rail */}
        <div className="wrap postgrid">
          <div className="postgrid__toc">
            <PostToc headings={headings} label={t("tocLabel")} />
          </div>

          <div className="postgrid__body">
            <div className="post__body prose">
              <Markdown content={localized.content} />
            </div>
          </div>

          <div className="postgrid__aside">
            <div className="postgrid__sticky">
              <BlogCtaPanel />
            </div>
          </div>
        </div>
      </article>

      {/* More posts */}
      {more.length > 0 && (
        <section className="section--tight">
          <div className="wrap">
            <div className="brail">
              <span className="kicker">{t("moreLabel")}</span>
            </div>
            <div className="bgrid">
              {more.map((p, i) => (
                <Appear key={p.id} y={26} delay={0.05 * i}>
                  <BlogCard post={p} locale={locale} />
                </Appear>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </main>
  );
}
