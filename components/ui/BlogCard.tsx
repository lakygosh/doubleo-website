import { Link } from "@/i18n/navigation";
import type { LocalizedPost } from "@/lib/posts";

/** Short date in the reader's locale, or null for an unpublished post. */
export function postDate(post: LocalizedPost, locale: string): string | null {
  if (!post.publishedAt) return null;
  return new Date(post.publishedAt).toLocaleDateString(locale === "sr" ? "sr-RS" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Cover art, or the aurora wash for posts that don't have one. */
function Media({ post, className }: { post: LocalizedPost; className: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className={className}>
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt="" loading="lazy" />
      ) : (
        <span className="bcard__fallback" aria-hidden="true">
          <span className="u-noise" />
        </span>
      )}
    </Link>
  );
}

/**
 * Blog card in the reference's style: image panel with a floating tag, then
 * date + title beneath. Posts without a cover fall back to an aurora wash.
 */
export function BlogCard({
  post,
  locale,
  tag,
}: {
  post: LocalizedPost;
  locale: string;
  tag?: string;
}) {
  const date = postDate(post, locale);

  return (
    <article className="bcard">
      <Link href={`/blog/${post.slug}`} className="bcard__media">
        {post.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImageUrl} alt="" loading="lazy" />
        ) : (
          <span className="bcard__fallback" aria-hidden="true">
            <span className="u-noise" />
          </span>
        )}
        {tag && <span className="bcard__tag">{tag}</span>}
      </Link>

      <div className="bcard__body">
        {date && <time className="bcard__date">{date}</time>}
        <h3 className="bcard__title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.excerpt && <p className="bcard__excerpt">{post.excerpt}</p>}
      </div>
    </article>
  );
}

/**
 * The wide opener that leads each block of posts on the index: cover on one
 * side, meta + title + excerpt on the other. Collapses to a stacked card on
 * mobile, where it reads as a slightly larger `BlogCard`.
 */
export function BlogLead({
  post,
  locale,
  headingLevel = "h2",
}: {
  post: LocalizedPost;
  locale: string;
  headingLevel?: "h2" | "h3";
}) {
  const date = postDate(post, locale);
  const Heading = headingLevel;

  return (
    <article className="blead bcard">
      <Media post={post} className="blead__media bcard__media" />

      <div className="blead__body">
        {date && <time className="bcard__date">{date}</time>}
        <Heading className="blead__title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </Heading>
        {post.excerpt && <p className="blead__excerpt">{post.excerpt}</p>}
      </div>
    </article>
  );
}

/**
 * Compact row for the "start here" strip at the top of the index: a small
 * square thumbnail beside the date and title. The thumbnail is deliberately
 * much smaller than the cards below, so the strip stays a quiet index rather
 * than competing with the picture-led sections.
 */
export function BlogRow({ post, locale }: { post: LocalizedPost; locale: string }) {
  const date = postDate(post, locale);

  return (
    <article className="brow">
      <Media post={post} className="brow__media" />

      <div className="brow__body">
        {date && <time className="bcard__date">{date}</time>}
        <h3 className="brow__title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
      </div>
    </article>
  );
}
