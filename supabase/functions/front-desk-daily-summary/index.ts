// deno-lint-ignore-file no-explicit-any
// 5 PM front-desk recap for the Highlander Teams channel.
// pg_cron calls this at 21:05 and 22:05 UTC on weekdays; it posts only when it
// is 5 PM in Franklin (so daylight saving needs no schedule change) and only
// once per day. Auth: the x-admin-secret header must match
// internal_config.front_desk_summary_token. { "force": true } posts now
// (for a manual test); { "dry_run": true } returns the numbers without posting.

import { createClient } from "npm:@supabase/supabase-js@2.112.3";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
const TEAMS_API_KEY = Deno.env.get("MICROSOFT_TEAMS_API_KEY") ?? "";
const GATEWAY = "https://connector-gateway.lovable.dev/microsoft_teams";
const TEAM_ID = Deno.env.get("TEAMS_TEAM_ID") ?? "23502890-88dc-4bf9-9c15-7257018e2a47";
const CHANNEL_ID =
  Deno.env.get("TEAMS_CHANNEL_ID") ?? "19:nIJeqUKA79SIyW6vfYoNvVKUzc1Vv-DAZzuT-erYcl01@thread.tacv2";
const SITE = "https://highlandernc.com";
const TIME_ZONE = "America/New_York";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Wall-clock date (YYYY-MM-DD) and hour in Franklin. */
function franklinNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: `${get("year")}-${get("month")}-${get("day")}`, hour: Number(get("hour")) % 24 };
}

/** UTC instant of local midnight for a Franklin calendar day. */
function franklinMidnight(day: string): Date {
  const [y, m, d] = day.split("-").map(Number);
  // Try both possible offsets (EST -5, EDT -4); keep the one that lands on local 00:00.
  for (const offset of [4, 5]) {
    const guess = new Date(Date.UTC(y, m - 1, d, offset, 0, 0));
    const local = franklinNow(guess);
    if (local.day === day && local.hour === 0) return guess;
  }
  return new Date(Date.UTC(y, m - 1, d, 5, 0, 0));
}

async function isSchedulerToken(client: any, provided: string): Promise<boolean> {
  if (!provided) return false;
  const { data } = await client
    .from("internal_config")
    .select("value")
    .eq("key", "front_desk_summary_token")
    .maybeSingle();
  return Boolean(data?.value) && data.value === provided;
}

async function postToTeams(html: string) {
  if (!LOVABLE_API_KEY || !TEAMS_API_KEY) {
    console.warn("Front-desk summary skipped: Microsoft Teams connection is not configured");
    return false;
  }
  const res = await fetch(`${GATEWAY}/teams/${TEAM_ID}/channels/${CHANNEL_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TEAMS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: { contentType: "html", content: html } }),
  });
  if (!res.ok) throw new Error(`Teams post failed [${res.status}]: ${await res.text()}`);
  return true;
}

const avg = (xs: number[]) => Math.round(xs.reduce((a, b) => a + b, 0) / xs.length);

type Person = { name: string; calls: number; missed: number; booked: number; callbacks: number; strong: number; scores: number[] };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const client = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false, autoRefreshToken: false } });

  if (!(await isSchedulerToken(client, req.headers.get("x-admin-secret") ?? ""))) {
    return json({ error: "unauthorized" }, 401);
  }
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const now = franklinNow();
  if (!body.force && !body.dry_run && now.hour !== 17) {
    return json({ ok: true, skipped: `not 5 PM in Franklin (hour ${now.hour})` });
  }
  if (!body.force && !body.dry_run) {
    const { data: already } = await client.from("front_desk_summaries").select("day").eq("day", now.day).maybeSingle();
    if (already) return json({ ok: true, skipped: "already posted today" });
  }

  const since = franklinMidnight(now.day).toISOString();
  const [{ data: members }, { data: calls }, { data: missed }] = await Promise.all([
    client.from("team_members").select("user_id, display_name, active"),
    client
      .from("intake_leads")
      .select("taken_by_user, taken_by, grade, score, outcome, first_name, town, job_type")
      .gte("created_at", since),
    client.from("missed_calls").select("user_id").gte("created_at", since),
  ]);

  const people = new Map<string, Person>();
  const nameOf = new Map((members ?? []).map((m: any) => [m.user_id, m.display_name as string]));
  for (const m of members ?? []) {
    if (m.active) people.set(m.user_id, { name: m.display_name, calls: 0, missed: 0, booked: 0, callbacks: 0, strong: 0, scores: [] });
  }
  const bucket = (userId: string | null, fallback: string | null) => {
    const key = userId ?? `name:${fallback ?? "Other"}`;
    if (!people.has(key)) {
      people.set(key, {
        name: (userId && nameOf.get(userId)) || fallback || "Other",
        calls: 0, missed: 0, booked: 0, callbacks: 0, strong: 0, scores: [],
      });
    }
    return people.get(key)!;
  };

  let best: any = null;
  for (const c of calls ?? []) {
    const p = bucket(c.taken_by_user, c.taken_by);
    p.calls++;
    if (c.outcome === "booked") p.booked++;
    if (c.outcome === "callback") p.callbacks++;
    if (c.grade === "A" || c.grade === "B") p.strong++;
    if (c.grade !== "DQ" && typeof c.score === "number") p.scores.push(c.score);
    if (c.grade !== "DQ" && (best === null || (c.score ?? 0) > (best.score ?? 0))) best = c;
  }
  for (const m of missed ?? []) bucket(m.user_id, null).missed++;

  // Every active team member is listed (a zero day is worth seeing), plus anyone else who logged a call.
  const rows = [...people.values()];
  const totals = rows.reduce(
    (t, p) => ({ calls: t.calls + p.calls, missed: t.missed + p.missed, booked: t.booked + p.booked, strong: t.strong + p.strong }),
    { calls: 0, missed: 0, booked: 0, strong: 0 },
  );

  const dateLabel = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, weekday: "long", month: "short", day: "numeric" }).format(new Date());
  const html = [
    `<p><b>📞 Front desk · ${esc(dateLabel)}</b></p>`,
    `<p><b>${totals.calls}</b> calls logged · <b>${totals.missed}</b> missed · <b>${totals.booked}</b> appointments booked · <b>${totals.strong}</b> A/B leads</p>`,
    "<ul>",
    ...rows.map(
      (p) =>
        `<li><b>${esc(p.name)}</b>: ${p.calls} calls, ${p.missed} missed, ${p.booked} booked${p.callbacks ? `, ${p.callbacks} to call back` : ""}${p.scores.length ? `, average score ${avg(p.scores)}/100` : ""}</li>`,
    ),
    "</ul>",
    best
      ? `<p>⭐ Best lead: ${esc(best.first_name ?? "Caller")}${best.town ? ` in ${esc(best.town)}` : ""}${best.job_type ? ` · ${esc(String(best.job_type).replace(/_/g, " "))}` : ""} (grade ${esc(best.grade)}, score ${esc(best.score)}/100)</p>`
      : "",
    `<p><a href="${SITE}/front-desk/team">Open the team page</a></p>`,
  ].join("");

  if (body.dry_run) return json({ ok: true, day: now.day, totals, people: rows, html });

  const posted = await postToTeams(html);
  if (!body.force) {
    await client.from("front_desk_summaries").upsert({ day: now.day, totals });
  }
  return json({ ok: true, posted, day: now.day, totals });
});
