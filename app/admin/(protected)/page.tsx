import { getAllPostsForAdmin } from "@/lib/posts";
import { getAutoPublishForAdmin } from "@/lib/settings";
import { AdminDashboard } from "./AdminDashboard";

export default async function AdminPage() {
  const [posts, autoPublish] = await Promise.all([getAllPostsForAdmin(), getAutoPublishForAdmin()]);
  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  return <AdminDashboard drafts={drafts} published={published} autoPublish={autoPublish} />;
}
