// deno-lint-ignore-file no-explicit-any
// Front-desk team management (admin only).
// The owner creates each login (email + password) in Lovable Cloud → Users.
// This function then ties that login to a display name and daily goal and
// grants the front_desk role, so the call sheet knows who took each call.
//
// Actions (POST JSON, caller must be a signed-in admin):
//   { action: "list" }
//   { action: "add", email, display_name, daily_goal? }
//   { action: "update", user_id, display_name?, daily_goal?, active? }

import { createClient } from "npm:@supabase/supabase-js@2.112.3";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const admin = () =>
  createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false, autoRefreshToken: false } });

/** The signed-in caller, only when they hold the admin role. */
async function callerAdminId(req: Request): Promise<string | null> {
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const client = admin();
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return null;
  const { data: isAdmin } = await client.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
  return isAdmin ? data.user.id : null;
}

const cleanName = (value: unknown) => String(value ?? "").trim().replace(/\s+/g, " ").slice(0, 40);
const cleanGoal = (value: unknown) => {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? Math.min(100, Math.max(1, n)) : 8;
};

async function findUserByEmail(email: string): Promise<{ id: string; email: string } | null> {
  const client = admin();
  const wanted = email.trim().toLowerCase();
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await client.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(error.message);
    const hit = data.users.find((u) => (u.email ?? "").toLowerCase() === wanted);
    if (hit) return { id: hit.id, email: hit.email ?? wanted };
    if (data.users.length < 200) break;
  }
  return null;
}

async function listTeam() {
  const client = admin();
  const { data: members, error } = await client
    .from("team_members")
    .select("user_id, display_name, daily_goal, active, created_at")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  const { data: roles } = await client.from("user_roles").select("user_id, role");
  const out = [];
  for (const m of members ?? []) {
    const { data: user } = await client.auth.admin.getUserById(m.user_id);
    const userRoles = (roles ?? []).filter((r: any) => r.user_id === m.user_id).map((r: any) => r.role);
    out.push({
      ...m,
      email: user?.user?.email ?? null,
      last_sign_in_at: user?.user?.last_sign_in_at ?? null,
      is_admin: userRoles.includes("admin"),
      is_front_desk: userRoles.includes("front_desk"),
    });
  }
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const adminId = await callerAdminId(req);
  if (!adminId) return json({ error: "unauthorized" }, 401);

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  try {
    const client = admin();

    if (body.action === "list") {
      return json({ ok: true, members: await listTeam() });
    }

    if (body.action === "add") {
      const email = String(body.email ?? "").trim();
      const displayName = cleanName(body.display_name);
      if (!email || !displayName) return json({ ok: false, error: "Email and name are both needed." }, 400);
      const user = await findUserByEmail(email);
      if (!user) {
        return json({
          ok: false,
          error: "No login with that email yet. Create it in Lovable Cloud → Users first, then add the person here.",
        }, 404);
      }
      const { error: roleError } = await client
        .from("user_roles")
        .upsert({ user_id: user.id, role: "front_desk" }, { onConflict: "user_id,role", ignoreDuplicates: true });
      if (roleError) throw new Error(roleError.message);
      const { error: memberError } = await client
        .from("team_members")
        .upsert({ user_id: user.id, display_name: displayName, daily_goal: cleanGoal(body.daily_goal), active: true });
      if (memberError) throw new Error(memberError.message);
      return json({ ok: true, members: await listTeam() });
    }

    if (body.action === "update") {
      const userId = String(body.user_id ?? "");
      if (!userId) return json({ ok: false, error: "user_id is required" }, 400);
      const patch: Record<string, unknown> = {};
      if (body.display_name !== undefined) {
        const name = cleanName(body.display_name);
        if (!name) return json({ ok: false, error: "Name can't be empty." }, 400);
        patch.display_name = name;
      }
      if (body.daily_goal !== undefined) patch.daily_goal = cleanGoal(body.daily_goal);
      if (body.active !== undefined) patch.active = Boolean(body.active);
      if (Object.keys(patch).length) {
        const { error } = await client.from("team_members").update(patch).eq("user_id", userId);
        if (error) throw new Error(error.message);
      }
      // Deactivating removes call-sheet access; reactivating restores it.
      if (body.active === false) {
        await client.from("user_roles").delete().eq("user_id", userId).eq("role", "front_desk");
      } else if (body.active === true) {
        await client
          .from("user_roles")
          .upsert({ user_id: userId, role: "front_desk" }, { onConflict: "user_id,role", ignoreDuplicates: true });
      }
      return json({ ok: true, members: await listTeam() });
    }

    return json({ ok: false, error: "unknown_action" }, 400);
  } catch (err) {
    console.error("front-desk-team failed:", err);
    return json({ ok: false, error: err instanceof Error ? err.message : "failed" }, 500);
  }
});
