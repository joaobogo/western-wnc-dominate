// deno-lint-ignore-file no-explicit-any
// JobTread sync edge function.
// - Reads a lead (or chatbot_conversations) row by id using the service role.
// - Builds a clean, human-readable payload.
// - POSTs to JOBTREAD_WEBHOOK_URL when set (preferred; grant key + org id sent inside body/header).
// - Falls back to JobTread Pave API (https://api.jobtread.com/pave) when only grant key + org id are set.
// - Updates jobtread_* columns with success/failure state. Never throws to the caller in a way that would lose the lead.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Required: API key + base URL. Everything else is optional.
// JobTread's Pave API calls the API key a "grantKey"; we accept either name
// so nothing breaks if the secret was already saved under the legacy name.
const JOBTREAD_API_KEY =
  Deno.env.get("JOBTREAD_API_KEY") ?? Deno.env.get("JOBTREAD_GRANT_KEY") ?? "";
// JobTread's Pave API lives at `${host}/pave`. Accept either form of BASE_URL
// and normalize so a plain `https://api.jobtread.com` still works.
const JOBTREAD_BASE_URL_RAW =
  Deno.env.get("JOBTREAD_BASE_URL") ?? "https://api.jobtread.com";
const JOBTREAD_PAVE_URL = JOBTREAD_BASE_URL_RAW.replace(/\/+$/, "").endsWith("/pave")
  ? JOBTREAD_BASE_URL_RAW.replace(/\/+$/, "")
  : `${JOBTREAD_BASE_URL_RAW.replace(/\/+$/, "")}/pave`;
// Optional. Used only if actually set — never blocks the integration.
const JOBTREAD_ORG_ID = Deno.env.get("JOBTREAD_ORG_ID") ?? "";
const JOBTREAD_WEBHOOK_URL = Deno.env.get("JOBTREAD_WEBHOOK_URL") ?? "";

type LeadRow = Record<string, any>;
type ConvRow = Record<string, any>;

function humanizeLeadName(row: LeadRow): string {
  const name = (row.name || "").trim();
  const town = (row.property_town || "").trim() || "Western NC";
  const serviceMap: Record<string, string> = {
    roofing: "Roofing Inquiry",
    roof_repair: "Roof Repair Lead",
    roof_replacement: "Roof Replacement Inquiry",
    storm: "Storm Damage Lead",
    storm_damage: "Storm Damage Lead",
    commercial: "Commercial Roofing Inquiry",
    commercial_roofing: "Commercial Roofing Inquiry",
    construction: "Construction Inquiry",
    addition: "Construction Addition Inquiry",
    design: "Design Services Inquiry",
    gutters: "Gutter Inquiry",
    skylights: "Skylight Inquiry",
    outdoor_living: "Outdoor Living Inquiry",
    metal_roofing: "Metal Roofing Inquiry",
    synthetic_roofing: "Synthetic Roofing Inquiry",
  };
  const key = (row.service_category || row.lead_type || "").toString().toLowerCase();
  const label = serviceMap[key] || "Website Lead";
  return name ? `${label} - ${town} - ${name}` : `${label} - ${town}`;
}

function buildHumanNote(row: LeadRow): string {
  const lines: string[] = [];
  const push = (label: string, value: any) => {
    if (value === null || value === undefined || value === "") return;
    if (Array.isArray(value) && value.length === 0) return;
    lines.push(`${label}: ${typeof value === "string" ? value : JSON.stringify(value)}`);
  };
  lines.push("=== Highlander Website Lead ===");
  push("Name", row.name);
  push("Phone", row.phone);
  push("Email", row.email);
  push("Preferred contact", row.preferred_contact_method);
  push("Town", row.property_town);
  push("Address", row.property_address);
  lines.push("");
  lines.push("--- Project ---");
  push("Service", row.service_category);
  push("Project type", row.project_type);
  push("Property type", row.property_type);
  push("Roofing issue", row.roofing_issue_type);
  push("Urgency", row.urgency);
  push("Has plans", row.has_plans);
  push("Description", row.project_description);
  lines.push("");
  lines.push("--- Source ---");
  push("Form", row.source);
  push("Lead type", row.lead_type);
  push("Page URL", row.page_url);
  push("Referrer", row.referrer);
  push("Submitted at", row.created_at);
  push("User agent", row.user_agent);
  const tracking = [
    ["UTM source", row.utm_source],
    ["UTM medium", row.utm_medium],
    ["UTM campaign", row.utm_campaign],
    ["UTM content", row.utm_content],
    ["UTM term", row.utm_term],
    ["gclid", row.gclid],
    ["fbclid", row.fbclid],
    ["li_fat_id", row.li_fat_id],
  ].filter(([, v]) => v);
  if (tracking.length) {
    lines.push("");
    lines.push("--- Tracking ---");
    for (const [k, v] of tracking) push(k as string, v);
  }
  lines.push("");
  lines.push("--- Consent ---");
  push("Consent given", row.consent_given);
  push("Consent text", row.consent_text);
  push("Privacy policy", "https://highlandernc.com/privacy-policy");
  const photos = Array.isArray(row.photos_uploaded) ? row.photos_uploaded : [];
  const files = Array.isArray(row.files_uploaded) ? row.files_uploaded : [];
  if (photos.length || files.length) {
    lines.push("");
    lines.push("--- Uploads ---");
    photos.forEach((p: any, i: number) =>
      push(`Photo ${i + 1}`, typeof p === "string" ? p : JSON.stringify(p))
    );
    files.forEach((f: any, i: number) =>
      push(`File ${i + 1}`, typeof f === "string" ? f : JSON.stringify(f))
    );
  }
  if (row.chat_summary) {
    lines.push("");
    lines.push("--- Chatbot Summary ---");
    lines.push(String(row.chat_summary));
  }
  if (row.metadata && Object.keys(row.metadata).length) {
    lines.push("");
    lines.push("--- Additional Details ---");
    lines.push(JSON.stringify(row.metadata, null, 2));
  }
  return lines.join("\n");
}

function buildPayload(row: LeadRow, kind: "lead" | "chatbot") {
  const leadName = humanizeLeadName(row);
  const urgent =
    (row.urgency && /emergency|urgent|active|water/i.test(String(row.urgency))) ||
    /leak|water coming in|active/i.test(String(row.project_description || ""));
  return {
    // Top-level fields most webhook receivers will look for
    lead_name: leadName,
    job_name: leadName,
    job_type: row.service_category || row.lead_type || "Website Lead",
    priority: urgent ? "P1" : "P3",
    org_id: JOBTREAD_ORG_ID || null,
    // Structured sections
    contact: {
      name: row.name ?? null,
      phone: row.phone ?? null,
      email: row.email ?? null,
      preferred_contact_method: row.preferred_contact_method ?? null,
    },
    location: {
      town: row.property_town ?? null,
      address: row.property_address ?? null,
      property_type: row.property_type ?? null,
    },
    project: {
      service_category: row.service_category ?? null,
      project_type: row.project_type ?? null,
      roofing_issue_type: row.roofing_issue_type ?? null,
      urgency: row.urgency ?? null,
      has_plans: row.has_plans ?? null,
      description: row.project_description ?? null,
    },
    source: {
      form: row.source ?? null,
      lead_type: row.lead_type ?? null,
      page_url: row.page_url ?? null,
      referrer: row.referrer ?? null,
      submitted_at: row.created_at ?? null,
      user_agent: row.user_agent ?? null,
      kind,
    },
    tracking: {
      utm_source: row.utm_source ?? null,
      utm_medium: row.utm_medium ?? null,
      utm_campaign: row.utm_campaign ?? null,
      utm_content: row.utm_content ?? null,
      utm_term: row.utm_term ?? null,
      gclid: row.gclid ?? null,
      fbclid: row.fbclid ?? null,
      li_fat_id: row.li_fat_id ?? null,
    },
    consent: {
      given: row.consent_given ?? false,
      text: row.consent_text ?? null,
      privacy_policy_url: "https://highlandernc.com/privacy-policy",
    },
    uploads: {
      photos: Array.isArray(row.photos_uploaded) ? row.photos_uploaded : [],
      files: Array.isArray(row.files_uploaded) ? row.files_uploaded : [],
    },
    chat: kind === "chatbot" || row.chat_summary
      ? {
          summary: row.chat_summary ?? row.summary ?? null,
          transcript: row.full_chat_transcript ?? row.full_transcript ?? null,
          recommended_next_step: row.recommended_next_step ?? null,
        }
      : null,
    metadata: row.metadata ?? null,
    // Human-readable note the Highlander team can read at a glance
    note: buildHumanNote(row),
  };
}

async function sendToWebhook(payload: any): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (JOBTREAD_API_KEY) headers["Authorization"] = `Bearer ${JOBTREAD_API_KEY}`;
    if (JOBTREAD_ORG_ID) headers["X-JobTread-Org"] = JOBTREAD_ORG_ID;
    const body = {
      api_key: JOBTREAD_API_KEY || undefined,
      org_id: JOBTREAD_ORG_ID || undefined,
      ...payload,
    };
    const res = await fetch(JOBTREAD_WEBHOOK_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      return { ok: false, error: `Webhook HTTP ${res.status}: ${text.slice(0, 400)}` };
    }
    let id: string | undefined;
    try {
      const j = JSON.parse(text);
      id = j.id ?? j.record_id ?? j.job_id ?? j.lead_id ?? undefined;
    } catch { /* not JSON, ignore */ }
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: `Webhook error: ${(e as Error).message}` };
  }
}

async function sendToPaveApi(payload: any): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    // JobTread's Pave API uses a `grantKey` field for auth — the value the
    // user provides as JOBTREAD_API_KEY is that grant key. If ORG_ID is
    // set we include it; otherwise the API will error and we surface that
    // exact message back to the admin.
    const accountFields: any = {
      name: payload.contact?.name || payload.lead_name,
      type: "customer",
    };
    if (payload.contact?.phone) {
      accountFields.phones = [{ label: "primary", number: payload.contact.phone }];
    }
    if (payload.contact?.email) {
      accountFields.emails = [{ label: "primary", address: payload.contact.email }];
    }
    const createAccount: any = {
      $: accountFields,
      id: {},
      createJob: {
        $: { name: payload.job_name, description: payload.note },
        id: {},
      },
    };
    const query: any = { $: { grantKey: JOBTREAD_API_KEY } };
    if (JOBTREAD_ORG_ID) {
      query.organization = { $: { id: JOBTREAD_ORG_ID }, createAccount };
    } else {
      // No org id supplied — try the current-organization shortcut. If the
      // API rejects it, the exact message is surfaced in jobtread_error_message.
      query.currentGrant = { organization: { createAccount } };
    }
    const res = await fetch(JOBTREAD_PAVE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const text = await res.text();
    if (!res.ok) {
      return { ok: false, error: `Pave HTTP ${res.status}: ${text.slice(0, 400)}` };
    }
    let id: string | undefined;
    let apiError: string | undefined;
    try {
      const j = JSON.parse(text);
      // Pave returns 200 with an { error } body when the query itself is invalid.
      apiError = j?.error?.message || j?.error || j?.errors?.[0]?.message;
      id =
        j?.organization?.createAccount?.createJob?.id ??
        j?.currentGrant?.organization?.createAccount?.createJob?.id ??
        j?.data?.organization?.createAccount?.createJob?.id;
    } catch { /* ignore */ }
    if (apiError && !id) {
      return { ok: false, error: `JobTread API: ${String(apiError).slice(0, 400)}` };
    }
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: `Pave error: ${(e as Error).message}` };
  }
}

function validateSecrets(): string | null {
  // Only the API key is truly required. Base URL has a default. Webhook /
  // org id are optional and only used when present.
  if (JOBTREAD_API_KEY) return null;
  return "Missing JobTread environment variable: JOBTREAD_API_KEY";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let body: any = {};
  try { body = await req.json(); } catch { /* empty */ }
  const leadId: string | undefined = body.lead_id;
  const convId: string | undefined = body.chatbot_conversation_id;
  const consultId: string | undefined = body.consultation_request_id;
  const designerId: string | undefined = body.designer_lead_id;

  if (!leadId && !convId && !consultId && !designerId) {
    return new Response(JSON.stringify({ error: "lead_id, chatbot_conversation_id, consultation_request_id, or designer_lead_id required" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const table = leadId
    ? "leads"
    : convId
    ? "chatbot_conversations"
    : consultId
    ? "consultation_requests"
    : "designer_leads";
  const id = (leadId ?? convId ?? consultId ?? designerId)!;
  const kind: "lead" | "chatbot" =
    convId ? "chatbot" : "lead";
  const supportsPayloadCol = table === "leads" || table === "consultation_requests" || table === "designer_leads";
  const { data: row, error: fetchErr } = await admin
    .from(table)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr || !row) {
    return new Response(JSON.stringify({ error: fetchErr?.message ?? "Row not found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Short-circuit if already synced (unless caller passed force=true)
  if (row.jobtread_synced && !body.force) {
    return new Response(JSON.stringify({ ok: true, already_synced: true, id: row.jobtread_id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // consultation_requests uses `town` instead of `property_town` — normalize
  // a couple of aliases so the payload builder emits the same shape.
  const normalized = {
    ...row,
    property_town: row.property_town ?? row.town ?? null,
    project_description: row.project_description ?? row.description ?? null,
    source: row.source ?? row.source_form ?? table,
  };
  const payload = buildPayload(normalized, kind);

  const missing = validateSecrets();
  const nowIso = new Date().toISOString();

  if (missing) {
    await admin.from(table).update({
      jobtread_sync_status: "retry_needed",
      jobtread_last_attempt_at: nowIso,
      jobtread_error_message: missing,
      jobtread_retry_count: (row.jobtread_retry_count ?? 0) + 1,
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
    return new Response(JSON.stringify({ ok: false, error: missing, retryable: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const result = JOBTREAD_WEBHOOK_URL
    ? await sendToWebhook(payload)
    : await sendToPaveApi(payload);

  if (result.ok) {
    await admin.from(table).update({
      jobtread_synced: true,
      jobtread_sync_status: "success",
      jobtread_id: result.id ?? null,
      jobtread_last_attempt_at: nowIso,
      jobtread_error_message: null,
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
  } else {
    await admin.from(table).update({
      jobtread_sync_status: "failed",
      jobtread_last_attempt_at: nowIso,
      jobtread_error_message: result.error ?? "Unknown JobTread error",
      jobtread_retry_count: (row.jobtread_retry_count ?? 0) + 1,
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
  }

  return new Response(JSON.stringify(result), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});