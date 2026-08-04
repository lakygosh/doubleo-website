import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPublishedPosts, localizePost } from "@/lib/posts";
import { BlogCard } from "@/components/ui/BlogCard";
import { ArrowIcon } from "@/components/ui/Button";
import type { Locale } from "@/i18n/routing";

/** Three most recent posts. Renders nothing at all if the blog is empty. */
export async function BlogTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations("home.blog");
  const posts = (await getPublishedPosts()).slice(0, 3).map((p) => localizePost(p, locale));

  if (posts.length === 0) return null;

  return (
    <section className="section blogteaser">
      <div className="wrap">
        <div className="blogteaser__head">
          <div>
            <span className="pill">{t("kicker")}</span>
            <h2 className="blogteaser__title">{t("h2")}</h2>
          </div>
          <Link href="/blog" className="btn btn--secondary">
            {t("cta")}
            <ArrowIcon />
          </Link>
        </div>

        <div className="bgrid">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
