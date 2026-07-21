import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Plain anon-key client for public reads (published posts, sitemap, generateStaticParams).
 * No cookies/session involved — safe to call at build time or outside a request scope.
 * RLS still applies: this can only ever see status = 'published' rows.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
