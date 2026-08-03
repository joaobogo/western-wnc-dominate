// deno-lint-ignore-file no-explicit-any
// Scheduled retry worker for CRM (JobTread) syncing.
//
// Runs on a cron. Picks up every lead-bearing row whose sync failed and whose
// backoff window has elapsed, and re-invokes `jobtread-sync`. The sync function
// owns the backoff schedule, the attempt counter, and the Teams alert that
// fires when a lead exhausts all 5 attempts over ~24 hours.
//
// No customer data is returned — only counts — so it is safe to expose.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const MAX_SYNC_ATTEMPTS = 5;
const RETRYABLE = ["failed", "retry_needed", "pending"];

const TABLES: Array<{ table: string; idKey: string }> = [
  { table: "leads", idKey: "lead_id" },
  { table: "chatbot_conversations", idKey: "chatbot_conversation_id" },
  { table: "consultation_requests", idKey: "consultation_request_id" },
  { table: "designer_leads", idKey: "designer_lead_id" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const body = await req.json().catch(() => ({} as any));
  const limitPerTable = Math.min(Number(body?.limit) || 25, 100);
  const nowIso = new Date().toISOString();
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const summary: Record<string, { due: number; retried: number; succeeded: number }> = {};

  for (const { table, idKey } of TABLES) {
    const { data, error } = await admin
      .from(table)
      .select("id")
      .eq("jobtread_synced", false)
      .in("jobtread_sync_status", RETRYABLE)
      .lt("jobtread_retry_count", MAX_SYNC_ATTEMPTS)
      .or(`jobtread_next_retry_at.is.null,jobtread_next_retry_at.lte.${nowIso}`)
      .order("created_at", { ascending: true })
      .limit(limitPerTable);

    if (error) {
      console.error(`retry scan failed for ${table}: ${error.message}`);
      summary[table] = { due: 0, retried: 0, succeeded: 0 };
      continue;
    }

    const rows = data ?? [];
    let succeeded = 0;
    for (const r of rows) {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/jobtread-sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SERVICE_ROLE}`,
            apikey: SERVICE_ROLE,
          },
          body: JSON.stringify({ [idKey]: r.id, force: true }),
        });
        const j = await res.json().catch(() => ({ ok: false }));
        if (j?.ok) succeeded++;
      } catch (e) {
        console.error(`retry invoke failed for ${table}/${r.id}: ${(e as Error).message}`);
      }
    }
    summary[table] = { due: rows.length, retried: rows.length, succeeded };
  }

  return new Response(JSON.stringify({ ok: true, ran_at: nowIso, summary }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
