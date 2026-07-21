import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertPost } from "@/lib/posts";
import { getAutoPublish } from "@/lib/settings";

const bodySchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase, alphanumeric, hyphen-separated"),
  title_sr: z.string().min(1),
  title_en: z.string().min(1),
  content_sr: z.string().min(1),
  content_en: z.string().min(1),
  excerpt_sr: z.string().nullish(),
  excerpt_en: z.string().nullish(),
  cover_image_url: z.string().url().nullish(),
  seo_title_sr: z.string().nullish(),
  seo_title_en: z.string().nullish(),
  seo_description_sr: z.string().nullish(),
  seo_description_en: z.string().nullish(),
});

function revalidatePostPaths(slug: string) {
  revalidatePath("/sr/blog");
  revalidatePath("/en/blog");
  revalidatePath(`/sr/blog/${slug}`);
  revalidatePath(`/en/blog/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.POSTS_API_BEARER_TOKEN}`;
  if (!process.env.POSTS_API_BEARER_TOKEN || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }

  const autoPublish = await getAutoPublish();
  const status = autoPublish ? "published" : "draft";

  const { data, error } = await insertPost(parsed.data, status);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: `A post with slug "${parsed.data.slug}" already exists` }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (status === "published") {
    revalidatePostPaths(parsed.data.slug);
  }

  return NextResponse.json(data, { status: 201 });
}
