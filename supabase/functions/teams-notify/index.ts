// deno-lint-ignore-file no-explicit-any
// Microsoft Teams notifier.
// Posts a formatted message to the Highlander Teams channel whenever a new
// lead/form submission arrives, or when a visitor taps a click-to-call link.
// Reads the source row with the service role so no customer data is trusted
// from the browser (only the row id is accepted).

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const TEAMS_API_KEY = Deno.env.get("MICROSOFT_TEAMS_API_KEY") ?? "";
const GATEWAY = "https://connector-gateway.lovable.dev/microsoft_teams";

// Target Teams channel (overridable via secrets without a code change).
const TEAM_ID =
  Deno.env.get("TEAMS_TEAM_ID") ?? "23502890-88dc-4bf9-9c15-7257018e2a47";
const CHANNEL_ID =
  Deno.env.get("TEAMS_CHANNEL_ID") ??
  "19:nIJeqUKA79SIyW6vfYoNvVKUzc1Vv-DAZzuT-erYcl01@thread.tacv2";

const SITE = "https://highlandernc.com";

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function clip(v: unknown, max = 600): string {
  const s = String(v ?? "").trim();
  return s.length > max ? `${s.slice(0, max)}…` : s;
}

function line(label: string, value: unknown): string {
  const s = String(value ?? "").trim();
  if (!s) return "";
  return `<li><b>${esc(label)}:</b> ${esc(s)}</li>`;
}

function easternTime(iso?: string | null): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

async function postToTeams(html: string) {
  if (!LOVABLE_API_KEY || !TEAMS_API_KEY) {
    throw new Error("Microsoft Teams connection is not configured");
  }
  const res = await fetch(
    `${GATEWAY}/teams/${TEAM_ID}/channels/${CHANNEL_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TEAMS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: { contentType: "html", content: html } }),
    },
  );
  if (!res.ok) {
    const detail = await res.text();
    console.error(`Teams post failed [${res.status}]: ${detail}`);
    throw new Error(`[${res.status}] ${detail}`);
  }
  return await res.json();
}

function buildLeadMessage(kind: string, row: Record<string, any>) {
  const name = row.name || "Name not provided";
  const town = row.property_town || row.town || "";
  const service =
    row.service_category || row.lead_type || row.project_type || "General inquiry";
  const urgent = /emergency|urgent|asap|active leak/i.test(
    `${row.urgency ?? ""} ${row.project_description ?? ""} ${row.roofing_issue_type ?? ""}`,
  );

  const header = `${urgent ? "🚨 URGENT " : "🟢 "}New ${kind}${town ? ` — ${esc(town)}` : ""}`;

  const items = [
    line("Name", name),
    line("Phone", row.phone),
    line("Email", row.email),
    line("Town", town),
    line("Address", row.property_address),
    line("Service", service),
    line("Project type", row.project_type),
    line("Urgency", row.urgency),
    line("Timeline", row.timeline),
    line("Preferred contact", row.preferred_contact_method),
    line("Property type", row.property_type),
    line("Details", clip(row.project_description || row.summary || row.chat_summary)),
    line("Source", row.source),
    line("Page", row.page_url),
    line("Campaign", row.utm_campaign || row.utm_source),
    line("Received", easternTime(row.created_at)),
  ]
    .filter(Boolean)
    .join("");

  return `<h3>${header}</h3><ul>${items}</ul><p><i>Highlander website intake — also synced to JobTread.</i></p>`;
}

function buildCallMessage(input: Record<string, any>) {
  const items = [
    line("Number tapped", clip(input.phone_number, 40)),
    line("Page", clip(input.page_url, 300)),
    line("Location on page", clip(input.click_location, 80)),
    line("Device", /Mobi|Android|iPhone/i.test(String(input.user_agent ?? "")) ? "Mobile" : "Desktop"),
    line("Time", easternTime()),
  ]
    .filter(Boolean)
    .join("");
  return `<h3>📞 Call started from the website</h3><ul>${items}</ul><p><i>A visitor tapped a click-to-call link on ${esc(SITE)}. Expect an inbound call.</i></p>`;
}

const SOURCES: Record<string, { table: string; label: string }> = {
  lead_id: { table: "leads", label: "website lead" },
  chatbot_conversation_id: {
    table: "chatbot_conversations",
    label: "chatbot lead",
  },
  consultation_request_id: {
    table: "consultation_requests",
    label: "consultation request",
  },
  designer_lead_id: { table: "designer_leads", label: "roof designer lead" },
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));

    // --- Click-to-call notification ---
    if (body?.event === "phone_click") {
      const html = buildCallMessage({
        phone_number: body.phone_number,
        page_url: body.page_url,
        click_location: body.click_location,
        user_agent: req.headers.get("user-agent"),
      });
      await postToTeams(html);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Lead / form notification ---
    const key = Object.keys(SOURCES).find((k) => body?.[k]);
    if (!key || !UUID_RE.test(String(body[key]))) {
      return new Response(
        JSON.stringify({ error: "A valid record id or phone_click event is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const { table, label } = SOURCES[key];
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: row, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", body[key])
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!row) {
      return new Response(JSON.stringify({ error: "Record not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await postToTeams(buildLeadMessage(label, row));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("teams-notify failed:", err);
    return new Response(
      JSON.stringify({ error: "Notification failed" }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});