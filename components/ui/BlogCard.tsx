import { Link } from "@/i18n/navigation";
import type { LocalizedPost } from "@/lib/posts";

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
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === "sr" ? "sr-RS" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

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
