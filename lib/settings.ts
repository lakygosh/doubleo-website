import "server-only";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";

/** Public/session-scoped read of the singleton auto_publish flag (service-role, since anon has no select policy on settings). */
export async function getAutoPublish(): Promise<boolean> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("settings").select("auto_publish").eq("id", 1).single();
  if (error) throw error;
  return data.auto_publish;
}

/** Admin read (session-scoped, RLS allows authenticated select). */
export async function getAutoPublishForAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("settings").select("auto_publish").eq("id", 1).single();
  if (error) throw error;
  return data.auto_publish;
}

export async function setAutoPublish(value: boolean) {
  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("settings")
    .update({ auto_publish: value, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) throw error;
}
