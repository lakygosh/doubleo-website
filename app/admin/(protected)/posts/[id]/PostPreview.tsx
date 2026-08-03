"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Markdown } from "@/lib/markdown";
import { publishPost, unpublishPost, deletePost } from "../../actions";
import type { Post } from "@/lib/posts";

export function PostPreview({ post }: { post: Post }) {
  const router = useRouter();
  const [locale, setLocale] = useState<"sr" | "en">("sr");
  const [pending, startTransition] = useTransition();

  const title = locale === "sr" ? post.title_sr : post.title_en;
  const excerpt = locale === "sr" ? post.excerpt_sr : post.excerpt_en;
  const content = locale === "sr" ? post.content_sr : post.content_en;
  const seoTitle = (locale === "sr" ? post.seo_title_sr : post.seo_title_en) ?? title;
  const seoDescription = (locale === "sr" ? post.seo_description_sr : post.seo_description_en) ?? excerpt ?? "";

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      await action();
      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <p>
        <Link href="/admin">&larr; Back to dashboard</Link>
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className={`admin__badge admin__badge--${post.status === "published" ? "published" : "draft"}`}>
            {post.status}
          </span>
          <span style={{ marginLeft: "0.75rem", color: "#6b706a", fontSize: "0.85rem" }}>/{post.slug}</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="button" onClick={() => setLocale("sr")} disabled={locale === "sr"}>
            Serbian
          </button>
          <button type="button" onClick={() => setLocale("en")} disabled={locale === "en"}>
            English
          </button>
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        {post.status === "draft" ? (
          <button className="admin__primary" disabled={pending} onClick={() => run(() => publishPost(post.id, post.slug))}>
            Publish
          </button>
        ) : (
          <button disabled={pending} onClick={() => run(() => unpublishPost(post.id, post.slug))}>
            Unpublish
          </button>
        )}
        <button className="admin__danger" disabled={pending} onClick={() => run(() => deletePost(post.id, post.slug))}>
          Delete
        </button>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      <article>
        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image_url} alt={title} style={{ width: "100%", height: "auto", borderRadius: 16 }} />
        )}
        <h1>{title}</h1>
        {excerpt && <p style={{ color: "#6b706a", fontStyle: "italic" }}>{excerpt}</p>}
        <div style={{ fontSize: "0.85rem", color: "#6b706a", marginBottom: "1.5rem" }}>
          <div>
            <strong>SEO title:</strong> {seoTitle}
          </div>
          <div>
            <strong>SEO description:</strong> {seoDescription}
          </div>
        </div>
        <Markdown content={content} />
      </article>
    </main>
  );
}
