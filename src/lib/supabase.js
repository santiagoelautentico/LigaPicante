import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: "liga-picante-auth",
    },
  },
);

// Devuelve { user, profile, team } del usuario logueado, o null
export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, team_id, teams(id, name, budget)")
    .eq("id", user.id)
    .single();

  return { user, profile, team: profile?.teams ?? null };
}
