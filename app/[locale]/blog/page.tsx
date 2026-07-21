import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
      <section className="section-head" style={{ padding: "4rem var(--gutter) 2rem" }}>
        <p className="kicker">{t("kicker")}</p>
        <h1>{t("indexTitle")}</h1>
        <p className="section-head__intro">{t("indexIntro")}</p>
      </section>

      <section style={{ padding: "0 var(--gutter) 4rem", display: "grid", gap: "2rem" }}>
        {localized.length === 0 && <p>{t("empty")}</p>}
        {localized.map((post) => (
          <article key={post.id}>
            {post.coverImageUrl && (
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                width={1200}
                height={630}
                style={{ width: "100%", height: "auto", borderRadius: "var(--radius, 8px)" }}
              />
            )}
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.excerpt && <p>{post.excerpt}</p>}
            <Link href={`/blog/${post.slug}`}>{t("readMore")}</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
