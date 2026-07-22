import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "@/components/BrandMark";
import { getPublishedPosts, localizePost } from "@/lib/posts";
import type { Locale } from "@/i18n/routing";

export const revalidate = false;

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("blog");

  const posts = await getPublishedPosts();
  const localized = posts.map((p) => localizePost(p, locale as Locale));

  return (
    <main id="main">
      <section className="section-head" style={{ borderBottom: "none" }}>
        <p className="kicker">{t("kicker")}</p>
        <h1>{t("indexTitle")}</h1>
        <p className="section-head__intro">{t("indexIntro")}</p>
      </section>

      {localized.length === 0 ? (
        <p className="blog-empty">{t("empty")}</p>
      ) : (
        <div className="blog-grid">
          {localized.map((post) => (
            <article className="blog-card" key={post.id}>
              <Link href={`/blog/${post.slug}`} className={`blog-card__thumb${post.coverImageUrl ? "" : " blog-card__thumb--empty"}`}>
                {post.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImageUrl} alt={post.title} loading="lazy" />
                ) : (
                  <BrandMark size={56} />
                )}
              </Link>
              <div className="blog-card__body">
                <h2 className="blog-card__title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && <p className="blog-card__excerpt">{post.excerpt}</p>}
                <Link href={`/blog/${post.slug}`} className="blog-card__read">
                  {t("readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
