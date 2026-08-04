import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPublishedPosts, localizePost } from "@/lib/posts";
import { BlogCard } from "@/components/ui/BlogCard";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
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
      <section className="section pagehead">
        <div className="wrap">
          <div className="sec-head sec-head--start">
            <Appear trigger="load" delay={0.25} y={16}>
              <span className="pill">{t("kicker")}</span>
            </Appear>
            <SplitWords as="h1" text={t("indexTitle")} trigger="load" delay={0.35} />
            <Appear trigger="load" delay={0.6} y={20}>
              <p className="sec-head__sub">{t("indexIntro")}</p>
            </Appear>
          </div>

          {localized.length === 0 ? (
            <p className="blog-empty">{t("empty")}</p>
          ) : (
            <div className="bgrid">
              {localized.map((post, i) => (
                <Appear key={post.id} y={26} delay={0.05 * (i % 3)}>
                  <BlogCard post={post} locale={locale} />
                </Appear>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
