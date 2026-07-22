import { notFound } from "next/navigation";
import { getPostByIdForAdmin } from "@/lib/posts";
import { PostPreview } from "./PostPreview";

export default async function AdminPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostByIdForAdmin(id);
  if (!post) notFound();

  return <PostPreview post={post} />;
}
