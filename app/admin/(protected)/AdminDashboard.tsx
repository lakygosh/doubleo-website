"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { publishPost, unpublishPost, deletePost, toggleAutoPublish } from "./actions";
import type { Post } from "@/lib/posts";

export function AdminDashboard({
  drafts,
  published,
  autoPublish,
}: {
  drafts: Post[];
  published: Post[];
  autoPublish: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [auto, setAuto] = useState(autoPublish);

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Blog admin</h1>
        <button onClick={signOut}>Sign out</button>
      </div>

      <section style={{ margin: "1.5rem 0", padding: "1rem", border: "1px solid #ddd", borderRadius: 8 }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={auto}
            disabled={pending}
            onChange={(e) => {
              const next = e.target.checked;
              setAuto(next);
              run(() => toggleAutoPublish(next));
            }}
          />
          Auto-publish new posts from n8n immediately (skip draft review)
        </label>
      </section>

      <section>
        <h2>Drafts ({drafts.length})</h2>
        {drafts.length === 0 && <p>No drafts waiting for review.</p>}
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
          {drafts.map((post) => (
            <li key={post.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: "0.75rem 1rem" }}>
              <strong>{post.title_sr}</strong> / {post.title_en}
              <div style={{ color: "#666", fontSize: "0.85rem" }}>/{post.slug}</div>
              <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                <button disabled={pending} onClick={() => run(() => publishPost(post.id, post.slug))}>
                  Publish
                </button>
                <button disabled={pending} onClick={() => run(() => deletePost(post.id, post.slug))}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Published ({published.length})</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
          {published.map((post) => (
            <li key={post.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: "0.75rem 1rem" }}>
              <strong>{post.title_sr}</strong> / {post.title_en}
              <div style={{ color: "#666", fontSize: "0.85rem" }}>/{post.slug}</div>
              <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                <button disabled={pending} onClick={() => run(() => unpublishPost(post.id, post.slug))}>
                  Unpublish
                </button>
                <button disabled={pending} onClick={() => run(() => deletePost(post.id, post.slug))}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
