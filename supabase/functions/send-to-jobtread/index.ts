// Backward-compatible receptionist handoff. The canonical mapper, safeguards,
// status updates, and retry schedule all live in jobtread-sync.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const record = (body ?? {}) as Record<string, unknown>;
  const leadId = String(record.intake_lead_id ?? record.lead_id ?? "");
  if (!UUID_RE.test(leadId)) {
    return new Response(JSON.stringify({ error: "A valid intake_lead_id is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return new Response(JSON.stringify({ ok: false, error: "sync_config_missing" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/jobtread-sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Forward the caller's own credentials so jobtread-sync applies its
      // authorization rules (public callers: fresh, untouched records only).
      Authorization: req.headers.get("authorization") ?? "",
      apikey: req.headers.get("apikey") ?? "",
    },
    body: JSON.stringify({
      intake_lead_id: leadId,
      idempotency_key: record.idempotency_key ?? null,
    }),
  });
  const responseBody = await response.text();
  return new Response(responseBody, {
    status: response.status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
