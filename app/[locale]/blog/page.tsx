import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPublishedPosts, localizePost, type LocalizedPost } from "@/lib/posts";
import { BlogCard, BlogLead, BlogRow } from "@/components/ui/BlogCard";
import { BlogCtaCard } from "@/components/blog/BlogCta";
import { FinalCta } from "@/components/sections/FinalCta";
import { AuroraBackdrop } from "@/components/motion/AuroraBackdrop";
import { Shape } from "@/components/motion/Shapes";
import { Appear } from "@/components/motion/Appear";
import { SplitWords } from "@/components/motion/SplitWords";
import type { Locale } from "@/i18n/routing";

/**
 * Hourly ISR rather than `false`.
 *
 * `revalidate = false` pins the segment's data cache to Infinity, and Vercel
 * restores `.next/cache` between deploys — so this page kept rendering a
 * fetch response from days earlier and silently dropped the three newest
 * posts. A TTL keeps the route static while letting n8n's published posts
 * appear without a redeploy.
 */
export const revalidate = 3600;

/** A featured strip only earns its place once it isn't just repeating the page. */
const FEATURED_MIN_POSTS = 6;
const FEATURED_COUNT = 3;
/** Posts per block: one wide lead, then a grid row of five beside the CTA tile. */
const GRID_PER_BLOCK = 5;

type Block = { lead: LocalizedPost; grid: LocalizedPost[] };

/**
 * Splits the feed into the reference's repeating rhythm — a wide lead article
 * followed by a grid of smaller cards — instead of one flat wall of cards.
 */
function toBlocks(posts: LocalizedPost[]): Block[] {
  const blocks: Block[] = [];
  const size = GRID_PER_BLOCK + 1;

  for (let i = 0; i < posts.length; i += size) {
    blocks.push({ lead: posts[i], grid: posts.slice(i + 1, i + size) });
  }

  return blocks;
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("blog");

  const posts = await getPublishedPosts();
  const localized = posts.map((p) => localizePost(p, locale as Locale));

  const featured = localized.length >= FEATURED_MIN_POSTS ? localized.slice(0, FEATURED_COUNT) : [];
  const blocks = toBlocks(localized);

  return (
    <main id="main">
      {/* Hero */}
      <header className="bloghero">
        <div className="bloghero__bg">
          <AuroraBackdrop />
          <Shape name={1} size={120} className="bloghero__shape" />
        </div>

        <div className="wrap bloghero__inner">
          <Appear trigger="load" delay={0.25} y={16}>
            <span className="pill">{t("kicker")}</span>
          </Appear>
          <SplitWords as="h1" text={t("indexTitle")} trigger="load" delay={0.35} />
          <Appear trigger="load" delay={0.6} y={20}>
            <p className="bloghero__sub">{t("indexIntro")}</p>
          </Appear>
        </div>
      </header>

      {localized.length === 0 ? (
        <section className="section">
          <div className="wrap">
            <p className="blog-empty">{t("empty")}</p>
          </div>
        </section>
      ) : (
        <>
          {/* Start here */}
          {featured.length > 0 && (
            <section className="section--tight">
              <div className="wrap">
                <div className="brail">
                  <span className="kicker">{t("featuredLabel")}</span>
                </div>
                <div className="browgrid">
                  {featured.map((post, i) => (
                    <Appear key={post.id} y={20} delay={0.06 * i}>
                      <BlogRow post={post} locale={locale} />
                    </Appear>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* The feed */}
          <section className="section--tight">
            <div className="wrap">
              <div className="brail">
                <span className="kicker">{t("recentLabel")}</span>
              </div>

              <div className="bfeed">
                {blocks.map((block, b) => (
                  <div key={block.lead.id} className="bblock">
                    <Appear y={30}>
                      <BlogLead post={block.lead} locale={locale} />
                    </Appear>

                    {block.grid.length > 0 && (
                      <div className="bgrid">
                        {block.grid.map((post, i) => (
                          <Appear key={post.id} y={26} delay={0.05 * (i % 3)}>
                            <BlogCard post={post} locale={locale} />
                          </Appear>
                        ))}
                        {/* One promo tile per block, filling the sixth slot. */}
                        {b === 0 && (
                          <Appear y={26} delay={0.1}>
                            <BlogCtaCard />
                          </Appear>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <FinalCta />
    </main>
  );
}
