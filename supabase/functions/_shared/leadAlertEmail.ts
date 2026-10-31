// Lead alert email to the office inbox, sent from the Highlander Microsoft 365
// mailbox through the Microsoft Outlook connector. Called from jobtread-sync
// after a sync finishes. Never throws: an email problem must not affect sync.

export const LEAD_ALERT_TO = "info@highlandernc.com";
/** Leads created before this moment never get an alert (prevents an inbox flood). */
export const LEAD_ALERT_EMAIL_SINCE = "2026-10-31T12:45:00Z";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/microsoft_outlook";

export type LeadAlertKind = "success" | "exhausted";

type Row = Record<string, any>;

export function escapeHtml(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BLANK = /^(not provided|n\/a|na|none|unknown|null|undefined|-)$/i;
function pick(...vals: unknown[]): string {
  for (const v of vals) {
    if (v == null) continue;
    const s = String(v).replace(/\s+/g, " ").trim();
    if (s && !BLANK.test(s)) return s;
  }
  return "";
}

function oneLine(s: string): string {
  return s.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function humanize(s: string): string {
  return s.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function countFiles(row: Row): number {
  let n = 0;
  for (const k of ["photos_uploaded", "files_uploaded", "attachments"]) {
    const v = row[k];
    if (Array.isArray(v)) n += v.length;
  }
  return n;
}

export function formatEastern(iso: unknown): string {
  const d = new Date(String(iso ?? ""));
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

export interface LeadAlertFields {
  isFrontDesk: boolean;
  name: string;
  phone: string;
  email: string;
  address: string;
  town: string;
  jobType: string;
  source: string;
  preferredContact: string;
  bestTime: string;
  urgency: string;
  message: string;
  photos: number;
  submitted: string;
  takenBy: string;
  grade: string;
  score: string;
  outcome: string;
}

/** Pulls the alert fields out of any of the five lead tables' rows. */
export function leadAlertFields(table: string, row: Row): LeadAlertFields {
  const isFrontDesk = table === "intake_leads";
  const name = pick(row.name, [row.first_name, row.last_name].filter(Boolean).join(" "));
  const score = row.score ?? row.lead_score;
  return {
    isFrontDesk,
    name,
    phone: pick(row.phone),
    email: pick(row.email),
    address: pick(row.property_address, row.address),
    town: pick(row.property_town, row.town),
    jobType: humanize(pick(row.job_type, row.project_type, row.service_category, row.lead_type)),
    source: pick(
      isFrontDesk ? [row.source, row.source_detail].filter(Boolean).join(" · ") : "",
      row.utm_source && row.page_path ? `${row.utm_source} · ${row.page_path}` : "",
      row.page_path,
      row.landing_page,
      row.page_url,
      row.source,
      table === "chatbot_conversations" ? "Chatbot" : "",
      table === "designer_leads" ? "Roof designer" : "",
      table === "consultation_requests" ? "Consultation form" : "",
    ),
    preferredContact: pick(row.preferred_contact_method, row.preferred_contact, row.contact_path),
    bestTime: pick(row.best_time, row.timeline, row.timing),
    urgency: pick(row.urgency),
    message: pick(row.project_description, row.details, row.summary, row.chat_summary, row.notes),
    photos: countFiles(row),
    submitted: formatEastern(row.submitted_at ?? row.created_at),
    takenBy: isFrontDesk ? pick(row.taken_by) : "",
    grade: isFrontDesk ? pick(row.grade) : "",
    score: isFrontDesk && score != null && score !== "" ? `${score}/100` : "",
    outcome: isFrontDesk ? humanize(pick(row.outcome)) : "",
  };
}

export function buildLeadAlertSubject(f: LeadAlertFields): string {
  const lead = f.isFrontDesk ? "Front desk call" : "New lead";
  const parts = [f.name || "Unknown name", f.town || "No town", f.jobType || "General inquiry", f.source || "Website"];
  if (f.isFrontDesk && (f.grade || f.score)) parts.push([f.grade, f.score].filter(Boolean).join(" "));
  return oneLine(`${lead}: ${parts.join(" · ")}`).slice(0, 250);
}

export interface LeadAlertOptions {
  kind: LeadAlertKind;
  jobId?: string | null;
}

/** Pure HTML builder. Every customer value is escaped. */
export function buildLeadAlertHtml(f: LeadAlertFields, opts: LeadAlertOptions): string {
  const jobId = opts.jobId && /^[A-Za-z0-9_-]{4,64}$/.test(opts.jobId) ? opts.jobId : "";
  const top =
    opts.kind === "exhausted"
      ? `<p style="margin:0 0 16px;padding:12px;background:#fde8e8;color:#b00020;font-weight:bold;border-left:4px solid #b00020">NOT in JobTread — please call this person and enter them by hand.</p>`
      : `<p style="margin:0 0 16px;padding:12px;background:#e8f5e9;color:#1b5e20;font-weight:bold">✅ Already in JobTread${
          jobId ? ` — <a href="https://app.jobtread.com/jobs/${jobId}" style="color:#1b5e20">open job</a>` : ""
        }</p>`;

  const rows: Array<[string, string]> = [];
  const add = (label: string, value: string, html?: string) => {
    if (value) rows.push([label, html ?? escapeHtml(value)]);
  };
  add("Name", f.name);
  const tel = f.phone.replace(/[^\d+]/g, "");
  add("Phone", f.phone, `<a href="tel:${escapeHtml(tel)}">${escapeHtml(f.phone)}</a>`);
  add("Email", f.email, `<a href="mailto:${escapeHtml(f.email)}">${escapeHtml(f.email)}</a>`);
  add("Address / town", [f.address, f.town && !f.address.includes(f.town) ? f.town : ""].filter(Boolean).join(", "));
  add("Job type", f.jobType);
  add("Source", f.source);
  add("Preferred contact", f.preferredContact);
  add("Best time", f.bestTime);
  add("Urgency", f.urgency);
  add("Message / notes", f.message, escapeHtml(f.message).replace(/\n/g, "<br>"));
  if (f.photos > 0) add("Photos / files", String(f.photos));
  add("Submitted", f.submitted);
  if (f.isFrontDesk) {
    add("Taken by", f.takenBy);
    add("Grade", f.grade);
    add("Score", f.score);
    add("Outcome", f.outcome);
  }

  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px 6px 0;color:#555;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;vertical-align:top">${v}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#222;max-width:600px;margin:0 auto;padding:12px">${top}<table style="border-collapse:collapse;width:100%">${table}</table><p style="margin-top:24px;color:#888;font-size:12px">Sent automatically by highlandernc.com</p></body></html>`;
}

/** True when this row should get an alert of this kind right now. */
export function shouldSendLeadAlert(
  row: Row,
  kind: LeadAlertKind,
  isTest: boolean,
  since: string = LEAD_ALERT_EMAIL_SINCE,
): boolean {
  if (isTest) return false;
  const created = Date.parse(String(row.created_at ?? ""));
  if (!Number.isFinite(created) || created < Date.parse(since)) return false;
  return kind === "success" ? !row.alert_email_sent_at : !row.alert_email_exhausted_at;
}

export interface SendResult {
  sent: boolean;
  skipped?: string;
  error?: string;
  subject?: string;
  html?: string;
}

/** Sends one alert through the Outlook connector. Never throws. */
export async function sendLeadAlertEmail(
  table: string,
  row: Row,
  opts: LeadAlertOptions & { dryRun?: boolean },
): Promise<SendResult> {
  try {
    const f = leadAlertFields(table, row);
    const subject = buildLeadAlertSubject(f);
    const html = buildLeadAlertHtml(f, opts);
    if (opts.dryRun) return { sent: false, skipped: "dry_run", subject, html };

    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const outlookKey = Deno.env.get("MICROSOFT_OUTLOOK_API_KEY");
    if (!lovableKey || !outlookKey) {
      console.warn("lead alert email skipped: Outlook connection not linked");
      return { sent: false, skipped: "not_configured" };
    }
    const res = await fetch(`${GATEWAY_URL}/me/sendMail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": outlookKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "HTML", content: html },
          toRecipients: [{ emailAddress: { address: LEAD_ALERT_TO } }],
        },
        saveToSentItems: true,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error(`lead alert email failed [${res.status}]: ${text.slice(0, 500)}`);
      return { sent: false, error: `status_${res.status}` };
    }
    await res.text();
    return { sent: true };
  } catch (e) {
    console.error("lead alert email failed:", (e as Error).message);
    return { sent: false, error: "exception" };
  }
}
