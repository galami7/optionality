import { createClient } from "@supabase/supabase-js";

// Server-side: uses service role key — call inside request handlers, never at module level
export function createServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server env vars not set.");
  return createClient(url, key);
}

// Client-side helper — call inside components or hooks, not at module level
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase public env vars not set.");
  return createClient(url, key);
}
