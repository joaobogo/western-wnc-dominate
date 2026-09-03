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

// Deep link to a Job inside the JobTread web app.
const JOBTREAD_APP =
  (Deno.env.get("JOBTREAD_APP_BASE_URL") ?? "https://app.jobtread.com").replace(/\/+$/, "");

/** Threshold for the distinct "hot lead" alert style. */
const HOT_LEAD_SCORE = 70;

type TierLabel = "Hot" | "Warm" | "Engaged" | "Cool";

/** Mirrors leadTierLabel() in src/lib/lead-scoring.ts. */
function leadTierLabel(score: number): TierLabel {
  if (score >= HOT_LEAD_SCORE) return "Hot";
  if (score >= 50) return "Warm";
  if (score >= 30) return "Engaged";
  return "Cool";
}

const TIER_ICON: Record<TierLabel, string> = {
  Hot: "🔥",
  Warm: "🌤️",
  Engaged: "📋",
  Cool: "❄️",
};

function jobtreadLink(jobtreadId: unknown): string {
  const id = String(jobtreadId ?? "").trim();
  if (!id) return "";
  return `${JOBTREAD_APP}/jobs/${encodeURIComponent(id)}`;
}

function linkLine(label: string, url: string, text: string): string {
  if (!url) return "";
  return `<li><b>${esc(label)}:</b> <a href="${esc(url)}">${esc(text)}</a></li>`;
}

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
    // No Teams connection linked: skip the notification instead of failing the run.
    console.warn("Teams notification skipped: Microsoft Teams connection is not configured");
    return;
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

/** Direct link to the lead detail view in the admin dashboard. */
function adminLink(table: string, id: unknown): string {
  const leadId = String(id ?? "").trim();
  if (!leadId) return "";
  return table === "leads"
    ? `${SITE}/admin/leads?lead=${encodeURIComponent(leadId)}`
    : `${SITE}/admin/leads`;
}

function buildLeadMessage(kind: string, row: Record<string, any>, table = "leads") {
  const name = row.name || "Name not provided";
  const town = row.property_town || row.town || "";
  const service =
    row.service_category || row.lead_type || row.project_type || "General inquiry";
  const score = Number(row.lead_score ?? 0) || 0;
  const tier = leadTierLabel(score);
  const hot = tier === "Hot";
  const urgent = /emergency|urgent|asap|active leak/i.test(
    `${row.urgency ?? ""} ${row.project_description ?? ""} ${row.roofing_issue_type ?? ""}`,
  );
  const jobUrl = jobtreadLink(row.jobtread_id);

  // Hot leads get their own alert style so they stand out in the channel.
  const header = hot
    ? `🔥 HOT LEAD (${score}/100) — ${esc(town || "Western NC")}`
    : `${urgent ? "🚨 URGENT " : "🟢 "}New ${kind}${town ? ` — ${esc(town)}` : ""}`;

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
    line("Lead score", `${score}/100`),
    line("Tier", `${TIER_ICON[tier]} ${tier}`),
    line("Preferred contact", row.preferred_contact_method),
    line("Property type", row.property_type),
    line("Details", clip(row.project_description || row.summary || row.chat_summary)),
    line("Source", row.source),
    line("Source page", clip(row.page_url || row.page_path, 300)),
    line("Campaign", row.utm_campaign || row.utm_source),
    line("Received", easternTime(row.created_at)),
    linkLine("Open lead", adminLink(table, row.id), "View in admin dashboard"),
    linkLine("JobTread Job", jobUrl, "Open in JobTread"),
  ]
    .filter(Boolean)
    .join("");

  const footer = hot
    ? `<p><b>Call this lead first — score ${score}/100. Aim to respond within the hour.</b></p>`
    : `<p><i>Highlander website intake — also synced to JobTread.</i></p>`;
  const body = `<h3>${header}</h3><ul>${items}</ul>${footer}`;
  // Hot leads are wrapped in an attention block so Teams renders them distinctly.
  return hot ? `<blockquote>${body}</blockquote>` : body;
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

/**
 * Alert raised when a website rollback is performed via GitHub Actions or the
 * Netlify dashboard. Includes the reason, method, and actor so the team can
 * verify the live site and investigate the root cause.
 */
function buildRollbackMessage(input: Record<string, any>) {
  const items = [
    line("Reason", input.reason),
    line("Method", input.method),
    line("Deploy ID", input.deploy_id),
    line("Actor", input.actor),
    line("Commit", input.commit),
    line("Site", input.site || SITE),
    line("Time", easternTime()),
  ]
    .filter(Boolean)
    .join("");
  return `<h3>🔄 Website rollback executed</h3><ul>${items}</ul><p><i>The live site has been rolled back. Please verify the homepage, conversion paths, and business information, then investigate the root cause before re-deploying.</i></p>`;
}

/**
 * Alert raised when a lead exhausts every JobTread sync retry. The lead is
 * safely stored in the database — this tells the team to enter it manually.
 */
function buildSyncExhaustedMessage(row: Record<string, any>, input: Record<string, any>) {
  const items = [
    line("Name", row.name || row.first_name || "Name not provided"),
    line("Phone", row.phone),
    line("Email", row.email),
    line("Town", row.property_town || row.town),
    line("Service", row.service_category || row.lead_type || row.project_type),
    line("Source", row.source),
    line("Attempts", input.attempts),
    line("Last error", clip(row.jobtread_error_message, 300)),
    line("Record", `${input.table ?? "leads"} / ${row.id}`),
    line("Received", easternTime(row.created_at)),
  ]
    .filter(Boolean)
    .join("");
  return `<h3>⚠️ Lead could not reach JobTread</h3><ul>${items}</ul><p><i>The lead is saved on the website database and was NOT lost, but automatic CRM sync failed after every retry. Please add it to JobTread manually.</i></p>`;
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

    // --- Site rollback / deployment alert ---
    if (body?.event === "site_rollback") {
      const html = buildRollbackMessage(body);
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

    if (body?.event === "sync_exhausted") {
      await postToTeams(
        buildSyncExhaustedMessage(row, { table, attempts: body.attempts }),
      );
    } else {
      // The CRM sync runs in parallel with this notification, so the JobTread
      // job id is often written a second or two later. Re-read once so the
      // message can carry a direct link instead of nothing.
      let notifyRow = row;
      if (!row.jobtread_id) {
        await new Promise((r) => setTimeout(r, 6000));
        const { data: fresh } = await supabase
          .from(table)
          .select("*")
          .eq("id", body[key])
          .maybeSingle();
        if (fresh) notifyRow = fresh;
      }
      await postToTeams(buildLeadMessage(label, notifyRow, table));
    }
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