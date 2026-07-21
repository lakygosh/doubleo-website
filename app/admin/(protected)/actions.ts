"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { setAutoPublish } from "@/lib/settings";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
}

function revalidatePostPaths(slug: string) {
  revalidatePath("/sr/blog");
  revalidatePath("/en/blog");
  revalidatePath(`/sr/blog/${slug}`);
  revalidatePath(`/en/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
}

export async function publishPost(id: string, slug: string) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("posts")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePostPaths(slug);
}

export async function unpublishPost(id: string, slug: string) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("posts").update({ status: "draft" }).eq("id", id);
  if (error) throw error;
  revalidatePostPaths(slug);
}

export async function deletePost(id: string, slug: string) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  revalidatePostPaths(slug);
}

export async function toggleAutoPublish(next: boolean) {
  await requireAdmin();
  await setAutoPublish(next);
  revalidatePath("/admin");
}
