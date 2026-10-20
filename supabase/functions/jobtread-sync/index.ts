// deno-lint-ignore-file no-explicit-any
// JobTread sync edge function.
// - Reads a lead (or chatbot_conversations) row by id using the service role.
// - Builds a clean, human-readable payload.
// - POSTs to JOBTREAD_WEBHOOK_URL when set (preferred; grant key + org id sent inside body/header).
// - Falls back to JobTread Pave API (https://api.jobtread.com/pave) when only grant key + org id are set.
// - Updates jobtread_* columns with success/failure state. Never throws to the caller in a way that would lose the lead.

import { createClient } from "npm:@supabase/supabase-js@2.112.3";

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

function detectUrgentRoofing(row: LeadRow): { urgent: boolean; waterEntering: boolean } {
  const urgencyStr = String(row.urgency ?? "").toLowerCase();
  const desc = String(row.project_description ?? "").toLowerCase();
  const issue = String(row.roofing_issue_type ?? "").toLowerCase();
  const projectType = String(row.project_type ?? "").toLowerCase();
  const category = String(row.service_category ?? row.lead_type ?? "").toLowerCase();
  const metaBlob = row.metadata ? JSON.stringify(row.metadata).toLowerCase() : "";
  const isRoofing = /roof|storm|leak|gutter|skylight/.test(category + " " + projectType + " " + issue);
  const waterEntering = /water (?:is )?(?:coming in|entering|dripping|pouring)|active(?:ly)? (?:leak|water)|actively coming in|leak(?:ing)? (?:inside|through|into)|ceiling (?:leak|drip)/.test(
    desc + " " + issue + " " + metaBlob,
  );
  const urgent =
    /emergency|urgent|asap|high|p1|active|storm|water/.test(urgencyStr) ||
    /leak|storm|emergency/.test(issue) ||
    /storm|leak/.test(projectType) ||
    waterEntering;
  return { urgent: isRoofing && urgent, waterEntering: isRoofing && waterEntering };
}

function humanizeLeadName(row: LeadRow): string {
  const name = (row.name || "").trim();
  const town = (row.property_town || "").trim() || "Western NC";
  const { urgent, waterEntering } = detectUrgentRoofing(row);
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
    design_planning: "Design Services Inquiry",
    design_services: "Design Services Inquiry",
    design_agreement: "Design Agreement Inquiry",
    gutters: "Gutter Inquiry",
    skylights: "Skylight Inquiry",
    outdoor_living: "Outdoor Living Inquiry",
    metal_roofing: "Metal Roofing Inquiry",
    synthetic_roofing: "Synthetic Roofing Inquiry",
  };
  const key = (row.service_category || row.lead_type || "").toString().toLowerCase();
  let label = serviceMap[key] || "Website Lead";
  if (key === "roofing") {
    const pt = String(row.project_type ?? "").toLowerCase();
    if (/storm|hail|wind/.test(pt)) label = "Storm Damage Lead";
    else if (/repair|leak/.test(pt)) label = "Roof Repair Lead";
    else if (/replac|new_roof/.test(pt)) label = "Roof Replacement Inquiry";
  }

  // Detect specialty leads (gutters, skylights, outdoor living, deck/patio/pergola)
  // from page_url, referrer, project_description and metadata when the
  // service_category is generic (e.g. "roofing" or "construction" coming from
  // the intake chooser). This produces a readable JobTread name even when the
  // customer landed on a specialty page and went through a generic intake.
  const specialtyBlob = (
    String(row.page_url ?? "") + " " +
    String(row.referrer ?? "") + " " +
    String(row.project_type ?? "") + " " +
    String(row.project_description ?? "") + " " +
    (row.metadata ? JSON.stringify(row.metadata) : "")
  ).toLowerCase();
  if (/skylight|velux/.test(specialtyBlob)) label = "Skylight Inquiry";
  else if (/gutter/.test(specialtyBlob)) label = "Gutter Inquiry";
  else if (/outdoor[- ]?living|pergola|deck|patio|firepit|outdoor kitchen/.test(specialtyBlob)) {
    label = "Outdoor Living Inquiry";
  }

  // Smart categorization: if the customer did not choose a category, try to
  // infer one from the source page URL / referrer so JobTread never receives
  // an unlabeled "Website Lead" when the page context makes the service clear.
  if (label === "Website Lead") {
    if (/storm|hail|wind[- ]damage/.test(specialtyBlob)) label = "Storm Damage Lead";
    else if (/roof[- ]?repair|leak/.test(specialtyBlob)) label = "Roof Repair Lead";
    else if (/roof[- ]?replac/.test(specialtyBlob)) label = "Roof Replacement Inquiry";
    else if (/commercial/.test(specialtyBlob)) label = "Commercial Roofing Inquiry";
    else if (/metal[- ]?roof/.test(specialtyBlob)) label = "Metal Roofing Inquiry";
    else if (/synthetic|davinci|brava/.test(specialtyBlob)) label = "Synthetic Roofing Inquiry";
    else if (/roof/.test(specialtyBlob)) label = "Roofing Inquiry";
    else if (/design|planning|layout/.test(specialtyBlob)) label = "Design Services Inquiry";
    else if (/construction|addition|renovation|remodel|custom[- ]?home/.test(specialtyBlob)) label = "Construction Inquiry";
  }

  // Paid landing pages already know the service the visitor chose (or did not).
  const landingLabel = landingLeadLabel(row);
  if (landingLabel) label = landingLabel;

  // Refine construction leads by project type: Addition / Garage / Porch /
  // Sunroom / Deck / Patio / Pergola / Outdoor Living / Renovation.
  if (/construction|design|addition|garage|porch|sunroom|deck|patio|pergola|outdoor|renovation|remodel/.test(key)) {
    const pt = String(row.project_type ?? "").toLowerCase();
    if (/addition/.test(pt)) label = "Construction Addition Inquiry";
    else if (/garage/.test(pt)) label = "Garage Inquiry";
    else if (/porch/.test(pt)) label = "Porch Inquiry";
    else if (/sunroom|solarium/.test(pt)) label = "Sunroom Inquiry";
    else if (/pergola/.test(pt)) label = "Pergola Inquiry";
    else if (/deck/.test(pt)) label = "Deck Inquiry";
    else if (/patio/.test(pt)) label = "Patio Inquiry";
    else if (/outdoor|kitchen|firepit/.test(pt)) label = "Outdoor Living Inquiry";
    else if (/renovation|remodel/.test(pt)) label = "Renovation Inquiry";
    else if (/whole[- ]?home|custom[- ]?home|new[- ]?build/.test(pt)) label = "Custom Home Inquiry";
  }

  // Lead classification: if this is a construction/design project, decide
  // whether it should be organized as a Design/Planning inquiry or a
  // Construction/Build inquiry based on plan status.
  const classification = classifyConstructionDesign(row);
  if (classification === "design") {
    // Route to Design Services when plans are missing/unclear — but preserve
    // specialty and roofing labels (gutter/skylight/outdoor living/roof/storm)
    // which are their own service categories and shouldn't be relabeled.
    if (!/roof|storm|gutter|skylight|design|outdoor living|deck|patio|porch|pergola|sunroom|garage/i.test(label)) {
      label = "Design Services Inquiry";
    }
  }

  if (waterEntering) {
    label = "Urgent Roof Leak Lead";
  } else if (urgent && /roof/i.test(label)) {
    label = `Urgent ${label}`;
  }

  // Chatbot-originated leads get a "Chatbot" prefix so Highlander can spot
  // them at a glance in JobTread.
  const isChatbot =
    /chatbot|chat[-_ ]?bot/.test(String(row.source ?? "").toLowerCase()) ||
    /chatbot|chat[-_ ]?bot/.test(String(row.lead_type ?? "").toLowerCase()) ||
    !!row.chat_summary || !!row.summary || !!row.full_chat_transcript || !!row.full_transcript;
  if (isChatbot && !/chatbot/i.test(label)) {
    if (label === "Website Lead") label = "Chatbot Website Lead";
    else if (/roof|storm|gutter|skylight/i.test(label)) label = `Chatbot ${label}`.replace(/Chatbot Urgent /, "Urgent Chatbot ");
    else label = `Chatbot ${label}`;
  }

  // Only include the customer's first name (or first initial) so job names
  // stay short and scannable in JobTread. Never leak full name, phone,
  // email, message, or tracking values into the title.
  // Prefer the parsed `first_name` column written by the canonical name parser;
  // fall back to the first token of the display name for legacy rows.
  const firstName =
    cleanName((row as any).first_name) || (name.split(/\s+/)[0]?.trim() ?? "");
  if (isTestLead(row)) label = `TEST ${label}`;
  return firstName ? `${label} - ${town} - ${firstName}` : `${label} - ${town}`;
}

/** A lead whose name clearly says it is a test (e.g. "JOAO OMNIFLOW KASPRZAK TEST"). */
export function isTestLead(row: LeadRow): boolean {
  const n = [row.name, (row as any).first_name, (row as any).last_name].map((v) => String(v ?? "")).join(" ");
  return /\btest\b/i.test(n);
}

const BLANK_ANSWER_RE = /^(not provided|n\/a|na|none|unknown|unsure|not sure|-|null|undefined)$/i;
function answer(...values: unknown[]): string {
  for (const v of values) {
    const s = cleanName(v == null ? "" : String(v));
    if (s && !BLANK_ANSWER_RE.test(s)) return s;
  }
  return "";
}

export function mapRoofType(v: string): string {
  const t = v.toLowerCase();
  if (!t) return "";
  if (/slate|tile/.test(t)) return "Slate / Tile";
  if (/shake|cedar|wood/.test(t)) return "Shake";
  if (/flat|tpo|epdm|low[ _-]?slope|membrane/.test(t)) return "Flat";
  if (/metal|standing|steel/.test(t)) return "Metal";
  if (/shingle|asphalt|dimensional|3[ _-]?tab/.test(t)) return "Shingle";
  return "";
}

export function mapPropertyType(v: string): string {
  const t = v.toLowerCase();
  if (!t) return "";
  if (/second|cabin|vacation/.test(t)) return "Second Home / Cabin";
  if (/rental|investment/.test(t)) return "Rental (Owned)";
  if (/hoa|multi|condo|apartment/.test(t)) return "HOA / Multi - Family";
  if (/non[ _-]?profit|church/.test(t)) return "Non-Profit";
  if (/government|municipal/.test(t)) return "Government";
  if (/commercial|business|office|retail/.test(t)) return "Commercial";
  if (/primary|residential|home|house/.test(t)) return "Primary Home";
  return "";
}

export function mapStories(v: string): string {
  const t = v.toLowerCase();
  if (!t) return "";
  if (/^1\b|one|single/.test(t)) return "1";
  if (/^2\b|two/.test(t)) return "2";
  if (/3|three|plus|more/.test(t)) return "3+";
  return "";
}

const FRONT_DESK_SOURCE: Record<string, string> = {
  google: "Google", gbp: "Google", referral: "Referral", past_customer: "Existing Customer",
  social: "Facebook", yard_sign: "Marked Presence (Trucks, Trailers, Job Signs)", ad: "Web Ad",
  trade: "Real Estate Agent", angi: "Angi", home_advisor: "Home Advisor", hibu: "Hibu", other: "Other",
};

/**
 * Javi's structured JobTread fields, filled only when the form actually
 * collected a real answer. Blank / "Not provided" answers stay blank in
 * JobTread. Rep, crew and project-manager fields are assigned by the office.
 */
export function buildStructuredFields(row: LeadRow) {
  const meta: any = row.metadata ?? {};
  const appt: any = meta.appointment ?? (row as any).appointment ?? {};
  const job: Record<string, unknown> = {};
  const location: Record<string, unknown> = {};
  const account: Record<string, unknown> = {};

  const roofType = mapRoofType(answer((row as any).roof_type, meta.roof_type, meta.current_roof, appt.roofType));
  if (roofType) job[JT_CF.job.roof_type] = roofType;
  const roofColor = answer((row as any).material_color, meta.roofing_color, meta.material_color, meta.color);
  if (roofColor) job[JT_CF.job.roofing_color] = roofColor;
  const gutterColor = answer(meta.gutter_color);
  if (gutterColor) job[JT_CF.job.gutter_color] = gutterColor;
  const dripColor = answer(meta.drip_edge_color);
  if (dripColor) job[JT_CF.job.drip_edge_color] = dripColor;
  const insurance = answer(row.insurance_status, meta.insurance_status).toLowerCase();
  if (insurance && !/^(no|none|not)/.test(insurance) && /yes|filed|claim|approved|open|adjuster/.test(insurance)) {
    job[JT_CF.job.insurance_claim] = true;
  }

  const propertyType = mapPropertyType(answer(row.property_type, meta.property_type));
  if (propertyType) location[JT_CF.location.property_type] = propertyType;
  const stories = mapStories(answer(meta.stories, appt.stories));
  if (stories) location[JT_CF.location.stories] = stories;

  const isFrontDesk = !!meta.receptionist || (meta.lead_score != null && !!meta.score_version);
  const rawSource = String(row.source ?? "").toLowerCase();
  if (isFrontDesk && FRONT_DESK_SOURCE[rawSource]) account[JT_CF.account.lead_source] = FRONT_DESK_SOURCE[rawSource];
  const referredBy = answer((row as any).referred_by, meta.referred_by, rawSource === "referral" ? meta.source_detail : "");
  if (referredBy) account[JT_CF.account.referred_by] = referredBy;
  const community = answer((row as any).community_or_subdivision, meta.community_or_subdivision, meta.community, meta.subdivision);
  if (community) account[JT_CF.account.community] = community;

  return { job, location, account };
}

// Returns "construction" when the customer has complete permit-ready plans,
// "design" when they only have ideas/sketches/no plans/unsure, or null when
// the lead is not a construction/design project.
/** Form source written by the three paid landing pages (/lp/*). */
export const LANDING_SOURCE = "highlander_landing_page";

/**
 * Readable JobTread label for a paid-landing lead, derived from the routing the
 * landing page stored (service_category / project_type). Null = use the generic rules.
 */
export function landingLeadLabel(row: LeadRow): string | null {
  if (row.source !== LANDING_SOURCE) return null;
  const category = String(row.service_category ?? "").toLowerCase();
  const projectType = String(row.project_type ?? "").toLowerCase();
  if (category === "roofing_and_construction") return "Roofing & Construction Inquiry";
  if (category === "general") return "Home Project Inquiry";
  if (category === "roofing") {
    if (projectType === "roof_repair") return "Roof Repair Lead";
    if (projectType === "roof_replacement") return "Roof Replacement Inquiry";
    if (projectType === "metal_roofing") return "Metal Roofing Inquiry";
    return "Roofing Inquiry";
  }
  return null;
}

function classifyConstructionDesign(row: LeadRow): "construction" | "design" | null {
  const catBlob = (
    String(row.service_category ?? "") + " " +
    String(row.lead_type ?? "") + " " +
    String(row.project_type ?? "")
  ).toLowerCase();
  const isCd = /construction|design|planning|outdoor|addition|garage|porch|sunroom|deck|patio|pergola|renovation|remodel|whole[- ]?home|custom[- ]?home/.test(catBlob);
  if (!isCd) return null;
  const meta: any = row.metadata ?? {};
  const raw = String(
    meta.plan_status ?? meta.planStatus ?? meta.planningStage ?? "",
  ).toLowerCase();
  const completePlans =
    /pro[- ]?plans|permit|full[_-]?plans|complete|stamped|approved/.test(raw) ||
    raw === "yes-pro-plans";
  const explicitNoPlans =
    /sketch|inspiration|idea|no[- ]?plans|not[- ]?sure|unsure|have[_-]?ideas|^no$/.test(raw);
  if (completePlans || row.has_plans === true && !explicitNoPlans) return "construction";
  // The paid landing forms never ask about plans, so "unknown" must not be read
  // as "no plans yet" and silently routed to Design Services.
  if (row.source === LANDING_SOURCE && !raw && row.has_plans == null) return "construction";
  return "design";
}

function humanizeKey(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function humanizeValue(value: any): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    return value.map((v) => humanizeValue(v)).filter(Boolean).join(", ");
  }
  if (typeof value === "object") {
    // Uploaded-file object like {url, name}
    if ((value as any).url) return String((value as any).url);
    return JSON.stringify(value);
  }
  return String(value);
}

export function normalizeIntakeLead(row: LeadRow): LeadRow {
  const payload = row.payload && typeof row.payload === "object" ? row.payload : {};
  const appointment = row.appointment && typeof row.appointment === "object" ? row.appointment : {};
  const scoreSummary = {
    lead_score: row.score ?? null,
    lead_grade: row.grade ?? null,
    score_version: row.score_version ?? null,
    score_breakdown: row.breakdown ?? {},
    score_gates: row.gates ?? [],
    score_flags: row.flags ?? [],
    call_by: row.call_by ?? null,
    receptionist: row.taken_by ?? null,
    source_detail: row.source_detail ?? null,
    location_tier: row.location_tier ?? null,
    relationship: row.relationship ?? null,
    owner_name: row.owner_name ?? null,
    owner_contact: row.owner_contact ?? null,
    appointment,
  };

  return {
    ...row,
    name: row.name ?? ([row.first_name, row.last_name].filter(Boolean).join(" ") || null),
    property_town: row.property_town ?? row.town ?? null,
    property_address: row.property_address ?? row.address ?? null,
    project_description: row.project_description ?? row.details ?? null,
    service_category: row.service_category ?? row.job_type ?? null,
    project_type: row.project_type ?? row.job_type ?? null,
    urgency: row.urgency ?? row.timing ?? null,
    timeline: row.timeline ?? row.timing ?? null,
    budget: row.budget ?? row.budget_range ?? null,
    preferred_contact_method: row.preferred_contact_method ?? row.preferred_contact ?? null,
    source: row.source ?? "front_desk",
    metadata: { ...payload, ...scoreSummary },
  };
}

function flattenFormAnswers(
  metadata: any,
  prefix = "",
  out: Array<[string, string]> = [],
): Array<[string, string]> {
  if (!metadata || typeof metadata !== "object") return out;
  for (const [k, v] of Object.entries(metadata)) {
    if (v === null || v === undefined || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    const label = prefix ? `${prefix} — ${humanizeKey(k)}` : humanizeKey(k);
    if (v && typeof v === "object" && !Array.isArray(v) && !(v as any).url) {
      flattenFormAnswers(v, label, out);
    } else {
      const rendered = humanizeValue(v);
      if (rendered) out.push([label, rendered]);
    }
  }
  return out;
}

/** Resolved attachment (signed URL) or a failure we must report in the note. */
export type ResolvedAttachment = { name: string; url: string };
export type AttachmentFailure = { name: string; reason: string };
export type AttachmentInfo = { files: ResolvedAttachment[]; failures: AttachmentFailure[] };

export const ATTACHMENT_URL_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function attachmentEntries(row: LeadRow): Array<{ path?: string; url?: string; name: string }> {
  const raw = [
    ...(Array.isArray(row.photos_uploaded) ? row.photos_uploaded : []),
    ...(Array.isArray(row.files_uploaded) ? row.files_uploaded : []),
    ...(Array.isArray((row as any).attachments) ? (row as any).attachments : []),
  ];
  const out: Array<{ path?: string; url?: string; name: string }> = [];
  const seen = new Set<string>();
  for (const v of raw) {
    const value = typeof v === "string" ? { path: v } : (v ?? {});
    const url = (value as any).url as string | undefined;
    const path = (value as any).path as string | undefined;
    const key = url ?? path;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const name = String((value as any).name ?? key.split("/").pop() ?? "attachment");
    if (url && /^https?:\/\//i.test(url)) out.push({ url, name });
    else if (path) out.push({ path, name });
  }
  return out;
}

/** Failed client-side uploads recorded on the lead metadata. */
function uploadFailures(row: LeadRow): AttachmentFailure[] {
  const meta: any = row.metadata ?? {};
  const raw = meta.attachment_errors ?? meta.upload_errors ?? [];
  if (!Array.isArray(raw)) return [];
  return raw
    .map((e: any) => ({
      name: String(e?.name ?? "file"),
      reason: String(e?.reason ?? e?.message ?? "Upload failed"),
    }))
    .filter((e) => e.name);
}

/**
 * Turns storage paths into signed, shareable URLs so Highlander can open the
 * customer's photos/plans straight from the JobTread Job. Any file we cannot
 * sign is reported as a failure in Lead Notes — it never blocks the sync.
 */
export async function resolveAttachments(
  row: LeadRow,
  signer: (path: string) => Promise<{ url?: string | null; error?: string | null }>,
): Promise<AttachmentInfo> {
  const files: ResolvedAttachment[] = [];
  const failures: AttachmentFailure[] = uploadFailures(row);
  for (const entry of attachmentEntries(row)) {
    if (entry.url) {
      files.push({ name: entry.name, url: entry.url });
      continue;
    }
    // Retry signing so a transient storage hiccup never drops an attachment
    // from the CRM note.
    let reason = "Could not generate download link";
    let signed = false;
    for (let attempt = 1; attempt <= 3 && !signed; attempt++) {
      try {
        const res = await signer(entry.path!);
        if (res?.url) {
          files.push({ name: entry.name, url: res.url });
          signed = true;
        } else if (res?.error) {
          reason = String(res.error);
        }
      } catch (e) {
        reason = (e as Error)?.message ?? reason;
      }
    }
    if (!signed) failures.push({ name: entry.name, reason });
  }
  return { files, failures };
}

function buildHumanNote(row: LeadRow, attachments?: AttachmentInfo): string {
  const lines: string[] = [];
  const NP = "Not provided";
  const val = (v: any): string => {
    const r = humanizeValue(v);
    return r ? r : NP;
  };
  const has = (v: any): boolean => humanizeValue(v).length > 0;
  const kv = (label: string, v: any) => lines.push(`${label}: ${val(v)}`);
  const section = (title: string) => {
    if (lines.length) lines.push("");
    lines.push(title);
  };

  const { urgent: urgentRoofing, waterEntering } = detectUrgentRoofing(row);
  const catStr =
    String(row.service_category ?? row.lead_type ?? "") +
    " " + String(row.project_type ?? "") +
    " " + String(row.roofing_issue_type ?? "");
  const isRoofingCategory = /roof|storm|gutter|skylight|leak/i.test(catStr);
  const catBlob = String(row.service_category ?? row.lead_type ?? "").toLowerCase();
  const isConstructionCategory =
    !isRoofingCategory &&
    /construction|design|planning|outdoor|addition|garage|porch|sunroom|deck|patio|pergola|renovation|remodel/.test(
      catBlob + " " + String(row.project_type ?? "").toLowerCase(),
    );
  const meta: any = row.metadata ?? {};
  const planStatusRaw = meta.plan_status ?? meta.planStatus ?? meta.planningStage ?? null;
  const planStatusMap: Record<string, string> = {
    "yes-pro-plans": "Complete permit-ready plans",
    "full_plans": "Complete permit-ready plans",
    "yes-sketches": "Rough sketches / inspiration only",
    "have_ideas": "Rough sketches / inspiration only",
    "yes": "Has plans",
    "no": "No plans yet",
    "not-sure": "Not sure",
    "unsure": "Not sure",
  };
  const planStatusLabel = planStatusRaw
    ? planStatusMap[String(planStatusRaw).toLowerCase()] ?? humanizeValue(planStatusRaw)
    : row.has_plans === true
    ? "Has plans"
    : row.has_plans === false
    ? "No plans yet"
    : "";

  const isChatbotLead =
    /chatbot|chat[-_ ]?bot/.test(String(row.source ?? "").toLowerCase()) ||
    /chatbot|chat[-_ ]?bot/.test(String(row.lead_type ?? "").toLowerCase()) ||
    !!row.chat_summary || !!row.summary ||
    !!row.full_chat_transcript || !!row.full_transcript;

  lines.push("=== Highlander Website Lead ===");

  if (urgentRoofing) {
    lines.push("");
    lines.push("*** URGENT ROOFING LEAD ***");
    if (waterEntering) lines.push("*** WATER ACTIVELY ENTERING PROPERTY ***");
  }

  // Metadata fields that may carry extra property/project details submitted
  // by newer form variants without dedicated columns.
  const communityOrSubdivision =
    row.community_or_subdivision ?? meta.community_or_subdivision ?? meta.community ?? meta.subdivision ?? null;
  const gateCode = row.gate_code ?? meta.gate_code ?? meta.entry_code ?? null;
  const roofType = row.roof_type ?? meta.roof_type ?? null;
  const materialColor = row.material_color ?? meta.material_color ?? meta.color ?? null;
  const foundationType = row.foundation_type ?? meta.foundation_type ?? null;
  const budgetValue =
    (row as any).budget ?? meta.budget ?? meta.budget_range ?? meta.budgetRange ??
    meta.project_budget ?? meta.investment_range ?? null;
  const timelineValue =
    (row as any).timeline ?? meta.timeline ?? meta.project_timeline ?? meta.start_timeline ??
    meta.timeframe ?? meta.when ?? null;
  const stormBlob = (catStr + " " + String(row.source ?? "") + " " + String(row.page_url ?? "")).toLowerCase();
  const isStormLead = /storm|hail|wind[- ]?damage|insurance|leak/.test(stormBlob);
  const insuranceValue =
    (row as any).insurance_status ?? meta.insurance_status ?? meta.insurance ??
    meta.insurance_claim ?? meta.has_insurance_claim ?? meta.filed_claim ?? null;
  const insuranceCarrier = meta.insurance_carrier ?? meta.carrier ?? null;
  const claimNumber = meta.claim_number ?? meta.claimNumber ?? null;

  // ── SECTION ORDER IS CONTRACTUAL (Highlander spec, prompt 08). Exactly six
  // sections, in this order, written ONCE into the single Lead Notes field:
  //   Contact Info → Project Summary → Source/Attribution →
  //   Timeline/Urgency → Property Details → Attachments.
  // Never append a second note and never duplicate a value across sections.

  section("Contact Info");
  kv("Name", row.name);
  kv("Phone", row.phone);
  kv("Secondary Phone", (row as any).secondary_phone ?? meta.secondary_phone ?? meta.phone2 ?? null);
  kv("Email", row.email);
  kv("Preferred Contact Method", row.preferred_contact_method);
  kv("Best Time to Contact", meta.best_time ?? meta.best_time_to_call ?? meta.contact_time ?? null);
  lines.push(`Consent Given: ${row.consent_given === true ? "true" : row.consent_given === false ? "false" : NP}`);
  if (has(row.consent_text)) kv("Consent Text", row.consent_text);

  section("Project Summary");
  kv("Service Category", row.service_category);
  kv("Project Type", row.project_type);
  if (isRoofingCategory) {
    kv("Roof Type", roofType);
    kv("Roofing Issue", row.roofing_issue_type ?? row.project_type);
    kv("Material Color", materialColor);
    kv("Approximate Roof Age", (row as any).roof_age ?? meta.roof_age ?? meta.date_of_roof ?? meta.roof_installed ?? null);
    kv("Material Interest", meta.material_interest ?? meta.material ?? null);
  }
  if (isConstructionCategory) {
    lines.push(`Plan Status: ${planStatusLabel || NP}`);
    kv("Foundation Type", foundationType);
  }
  if (has(budgetValue)) kv("Budget", budgetValue);
  if (isStormLead && (has(insuranceValue) || has(insuranceCarrier) || has(claimNumber))) {
    kv("Insurance Status", insuranceValue);
    if (has(insuranceCarrier)) kv("Insurance Carrier", insuranceCarrier);
    if (has(claimNumber)) kv("Claim Number", claimNumber);
  }
  const customerMessage = (row.project_description ?? "").toString().trim();
  lines.push(`Customer Message: ${customerMessage || NP}`);
  if (isChatbotLead) {
    const summaryText = String(row.chat_summary ?? row.summary ?? "").trim();
    lines.push(`Chat Summary: ${summaryText || NP}`);
    const transcript = row.full_chat_transcript ?? row.full_transcript;
    if (transcript) {
      lines.push("Chat Transcript:");
      if (Array.isArray(transcript)) {
        for (const turn of transcript) {
          const role = String(turn?.role ?? "user");
          const content = String(turn?.content ?? turn?.text ?? "").trim();
          if (content) lines.push(`  ${role}: ${content}`);
        }
      } else if (typeof transcript === "string") {
        lines.push(transcript);
      }
    }
  }

  section("Source/Attribution");
  lines.push("Lead Source: Website");
  kv("Form", row.source);
  kv("Page URL", row.page_url);
  kv("Lead Type", row.lead_type);
  kv("Submitted At", row.created_at);
  kv("Referred By", (row as any).referral_source ?? meta.referral_source ?? meta.referred_by ?? meta.how_did_you_hear ?? null);
  kv("UTM Source", row.utm_source);
  kv("UTM Medium", row.utm_medium);
  kv("UTM Campaign", row.utm_campaign);
  kv("UTM Term", row.utm_term);
  kv("UTM Content", row.utm_content);
  kv("GCLID", row.gclid);
  kv("FBCLID", row.fbclid);
  kv("MSCLKID", row.msclkid);
  kv("LinkedIn Attribution", row.li_fat_id);
  kv("Referrer", row.referrer);
  kv("Landing Page", row.landing_page);
  if (row.source === LANDING_SOURCE) {
    kv("Service Intent", meta.service_intent);
    kv("Form Location", meta.form_location);
  }
  kv("First Visit", row.first_seen_at);

  section("Timeline/Urgency");
  kv("Urgency", urgentRoofing ? `HIGH — ${humanizeValue(row.urgency) || "urgent"}` : row.urgency);
  kv("Timeline", timelineValue);
  if (has(meta.lead_score)) kv("Lead Score", `${meta.lead_score}/100`);
  if (has(meta.lead_grade)) kv("Lead Grade", meta.lead_grade);
  if (has(meta.score_version)) kv("Score Version", meta.score_version);
  if (meta.score_breakdown && typeof meta.score_breakdown === "object") {
    kv("Score Breakdown", meta.score_breakdown);
  }
  if (has(meta.call_by)) kv("Call By", meta.call_by);
  if (has(meta.receptionist)) kv("Taken By", meta.receptionist);
  if (Array.isArray(meta.score_gates) && meta.score_gates.length) kv("Score Gates", meta.score_gates);
  if (Array.isArray(meta.score_flags) && meta.score_flags.length) kv("Score Flags", meta.score_flags);
  if (isRoofingCategory) {
    lines.push(`Water Actively Entering: ${waterEntering ? "Yes" : "No"}`);
  }

  section("Property Details");
  kv("Town", row.property_town);
  kv("County", (row as any).property_county);
  kv("Address", row.property_address);
  kv("Community/Subdivision", communityOrSubdivision);
  kv("Gate Code", gateCode);
  kv("Property Type", row.property_type);

  // Attachments: signed download links when available, plus an explicit list
  // of files that failed so the team knows what to ask the customer to resend.
  const resolved: AttachmentInfo = attachments ?? {
    files: attachmentEntries(row)
      .filter((e) => e.url)
      .map((e) => ({ name: e.name, url: e.url! })),
    failures: uploadFailures(row),
  };
  section("Attachments");
  if (resolved.files.length) {
    lines.push(`Uploaded Files: ${resolved.files.length}`);
    resolved.files.forEach((f) => lines.push(`  • ${f.name} — ${f.url}`));
  } else {
    lines.push("Uploaded Files: None");
  }
  if (resolved.failures.length) {
    lines.push(`Files That Failed To Upload: ${resolved.failures.length} — ask the customer to resend`);
    resolved.failures.forEach((f) => lines.push(`  • ${f.name} — ${f.reason}`));
  }

  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// PERMANENT SAFEGUARD — JobTread entity builders.
//
// Each JobTread entity (Customer, Contact, Location, Job, Lead Notes) has its
// OWN builder. Never reuse a builder across entities. In particular, the
// Customer / Account Name must never receive:
//   - the Job Name           (buildJobName)
//   - the Location Display   (buildLocationDisplayName)
//   - the service category / project type
//   - the property address / town / state / ZIP
//   - the Lead Notes summary
// These rules exist because concatenated Customer names (e.g.
// "Roofing Inquiry - 123 Main St - Jane") pollute QuickBooks and merge
// unrelated leads. See scripts/jobtread-regression-test.md.
// ─────────────────────────────────────────────────────────────────────────────
function cleanName(raw: string | null | undefined): string {
  return String(raw ?? "").replace(/\s+/g, " ").trim();
}

const COMMERCIAL_CATEGORY_RE =
  /commercial|business|office|retail|industrial|hoa|multifamily|apartment|condo/i;

function isCommercialLead(row: LeadRow): boolean {
  const blob = [
    row.service_category, row.lead_type, row.project_type, row.property_type,
  ].map((v) => String(v ?? "")).join(" ");
  return COMMERCIAL_CATEGORY_RE.test(blob);
}

function getSubmittedCompanyName(row: LeadRow): string {
  const meta: any = row.metadata ?? {};
  return cleanName(
    (row as any).company_name ??
    (row as any).company ??
    meta.company_name ??
    meta.company ??
    meta.business_name ??
    meta.organization ??
    "",
  );
}

/**
 * CUSTOMER / ACCOUNT NAME RULE — LOCKED. Do not change without Highlander
 * sign-off.
 *
 *   1. Commercial lead that submitted a company name → the company name.
 *   2. Everyone else → "<parsed first name> <parsed last name>" from the
 *      canonical name parser (first_name / last_name columns). The raw
 *      `name` column is only a fallback for legacy rows that predate the
 *      parser.
 *   3. Identity for matching is "full name + town" (see resolveAccount in
 *      sendToPaveApi). An existing Customer is NEVER renamed and NEVER
 *      merged: when the name matches but the town does not, a new Customer
 *      is created as "Full Name (Town)".
 *   4. Never derived from job name, location display, address, or category.
 *
 * If no valid name exists, returns "" so the caller can mark the lead as
 * `retry_needed` instead of creating a malformed Customer account.
 */
export function buildCustomerAccountName(row: LeadRow): string {
  const company = getSubmittedCompanyName(row);
  if (company && isCommercialLead(row)) return cleanName(company);

  const first = cleanName((row as any).first_name);
  const last = cleanName((row as any).last_name);
  const combined = cleanName(`${first} ${last}`);
  if (combined) return combined;

  // Legacy rows written before the canonical name parser existed.
  const fullName = cleanName(row.name);
  if (fullName) return fullName;

  // Commercial company as last-resort even if not flagged commercial
  if (company) return company;

  return ""; // no valid customer name — caller must retry, never invent one
}

/**
 * Disambiguated Customer name used when an Account with the same name already
 * exists in a DIFFERENT town. Keeps two unrelated "John Smith" customers
 * apart instead of merging them onto one account.
 */
/**
 * The paid landing forms collect a first name only and no town. With nothing
 * else to match on, "Mike" would be attached to ANY existing customer called
 * Mike, merging unrelated people. Disambiguate by phone number so the same
 * person re-submitting still lands on one customer, and different people never
 * share one. Leads with a last name or a town are untouched.
 */
export function buildFirstNameOnlyAccountName(
  accountName: string,
  contact: { last_name?: string | null; phone?: string | null } | null | undefined,
  town?: string | null,
): string {
  if (cleanName(contact?.last_name) || cleanName(town)) return accountName;
  const digits = String(contact?.phone ?? "").replace(/\D/g, "");
  if (digits.length < 7) return accountName;
  const tail = digits.slice(-10);
  const pretty = tail.length === 10 ? `${tail.slice(0, 3)}-${tail.slice(3, 6)}-${tail.slice(6)}` : tail;
  if (accountName.endsWith(`(${pretty})`)) return accountName;
  return `${accountName} (${pretty})`;
}

export function buildTownScopedAccountName(accountName: string, town?: string | null): string {
  const t = cleanName(town);
  if (!t) return accountName;
  if (new RegExp(`\\(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)$`, "i").test(accountName)) {
    return accountName;
  }
  return `${accountName} (${t})`;
}

/**
 * True when an existing JobTread Account belongs to the same town as this
 * lead. Matching is intentionally loose (town name appearing in any location
 * name or address) because JobTread stores towns inside free-text addresses.
 */
export function accountMatchesTown(
  locations: Array<{ name?: string | null; address?: string | null }> | null | undefined,
  town?: string | null,
): boolean {
  const t = cleanName(town).toLowerCase();
  if (!t) return true; // no town on the lead — never split the customer
  if (!locations || locations.length === 0) return false;
  return locations.some((l) =>
    `${l?.name ?? ""} ${l?.address ?? ""}`.toLowerCase().includes(t),
  );
}

function buildContactPayload(row: LeadRow) {
  const meta: any = row.metadata ?? {};
  // First/last come from the canonical client-side name parser (multi-word
  // surnames, particles and suffixes already resolved). Recompose the display
  // name from them when the row has no stored full name.
  const first = cleanName((row as any).first_name);
  const last = cleanName((row as any).last_name);
  return {
    name: cleanName(row.name) || cleanName(`${first} ${last}`) || null,
    first_name: first || null,
    last_name: last || null,
    phone: row.phone ?? null,
    secondary_phone:
      (row as any).secondary_phone ?? meta.secondary_phone ?? meta.phone2 ?? null,
    email: row.email ?? null,
    title:
      (row as any).contact_title ?? meta.contact_title ?? meta.title ?? meta.role ?? null,
    preferred_contact_method: row.preferred_contact_method ?? null,
  };
}

/**
 * Location display: property address → "[Town] Property" → "Website Lead".
 * Never uses Customer, Job Name, or Lead Notes.
 */
export function buildLocationDisplayName(row: LeadRow): string {
  const address = cleanName(row.property_address);
  if (address) return address;
  const town = cleanName(row.property_town);
  if (town) return `${town} Property`;
  const who = cleanName(row.name) || cleanName(`${(row as any).first_name ?? ""} ${(row as any).last_name ?? ""}`);
  return who ? `${who} Property`.slice(0, 30) : "Property";
}

/** Job name = human-readable "[Service] - [Town] - [First Name]". */
export function buildJobName(row: LeadRow): string {
  return humanizeLeadName(row);
}

/** Lead Notes = full intake summary. Stored ONLY on Job custom field. */
export function buildLeadNotes(row: LeadRow, attachments?: AttachmentInfo): string {
  return buildHumanNote(row, attachments);
}

/**
 * SINGLE-WRITE RULE — the Lead Notes summary is written to exactly ONE
 * JobTread field: Job → JT_CF.job.lead_notes. It must never be copied into
 * Location Sales Notes (JT_CF.location.sales_notes) or the Job Description.
 */
export function buildLocationCustomFieldValues(opts: {
  gateCodeBool: boolean;
  contactName: string;
  phone?: string | null;
  email?: string | null;
}): Record<string, unknown> {
  // Sales Notes intentionally OMITTED — see SINGLE-WRITE RULE above.
  return {
    [JT_CF.location.contact_name]: opts.contactName,
    [JT_CF.location.phone]: opts.phone || "",
  };
}

export function buildAccountCustomFieldValues(town?: string | null, county?: string | null): Record<string, unknown> {
  return {
    [JT_CF.account.service_area]: mapServiceArea(town, county),
    [JT_CF.account.lead_source]: "Highlander Website",
  };
}

export function buildJobCustomFieldValues(payload: any, noteShort: string): Record<string, unknown> {
  return {
    [JT_CF.job.status]: "01 New Lead (Needs Appointment)",
    [JT_CF.job.divisions]: [mapJobType(payload)],
    [JT_CF.job.job_notes]: noteShort,
    ...(payload?.structured?.job ?? {}),
  };
}

/**
 * Contact custom fields. JobTread's createContact takes only accountId, name,
 * title and customFieldValues, so email and phones travel here. Empty values
 * and an unchosen communication preference are left out (blank in JobTread).
 */
export function buildContactCustomFieldValues(contact: any): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const email = (contact?.email ?? "").toString().trim();
  const phone = (contact?.phone ?? "").toString().trim();
  const phone2 = (contact?.secondary_phone ?? "").toString().trim();
  const pref = mapCommPref(contact?.preferred_contact_method);
  if (email) out[JT_CF.contact.email] = email;
  if (phone) out[JT_CF.contact.phone] = phone;
  if (phone2) out[JT_CF.contact.secondary_phone] = phone2;
  if (pref) out[JT_CF.contact.comm_pref] = pref;
  return out;
}

/** Full street address for createLocation.address: street, town, NC, ZIP. */
export function buildFullAddress(row: LeadRow): string | null {
  const street = cleanName(row.property_address);
  if (!street) return null;
  const meta: any = row.metadata ?? {};
  const town = cleanName(row.property_town ?? row.town);
  const zip = cleanName((row as any).property_zip ?? (row as any).zip ?? meta.zip ?? meta.postal_code);
  const lower = street.toLowerCase();
  const parts = [street];
  if (town && !lower.includes(town.toLowerCase())) parts.push(town);
  if (!/\b(nc|north carolina)\b/i.test(street)) parts.push(zip ? `NC ${zip}` : "NC");
  else if (zip && !street.includes(zip)) parts.push(zip);
  return parts.join(", ");
}

/** Deep-counts how many times `note` appears as a value anywhere in `obj`. */
export function countNoteWrites(obj: unknown, note: string): number {
  if (!note) return 0;
  let n = 0;
  const walk = (v: unknown) => {
    if (typeof v === "string") {
      if (v === note || v.includes(note.slice(0, 200))) n += 1;
      return;
    }
    if (Array.isArray(v)) return v.forEach(walk);
    if (v && typeof v === "object") Object.values(v as Record<string, unknown>).forEach(walk);
  };
  walk(obj);
  return n;
}

/**
 * Validates a candidate Customer / Account Name. Returns null if OK, or a
 * short error string describing the violation. Used both at send-time (to
 * refuse malformed writes) and by the regression checks.
 */
/**
 * Service words that may never START a Customer / Account Name. A person or
 * company name never begins with the service they asked about.
 */
const SERVICE_CATEGORY_PREFIXES = [
  "roof", "roofing", "reroof", "re-roof", "roof repair", "roof replacement",
  "metal roofing", "synthetic roofing", "commercial roofing", "residential roofing",
  "storm", "storm damage", "hail", "wind damage", "leak", "emergency",
  "construction", "renovation", "remodel", "remodeling", "addition", "additions",
  "custom home", "design", "design services", "design planning", "planning",
  "gutter", "gutters", "skylight", "skylights", "siding", "windows", "doors",
  "deck", "decks", "patio", "pergola", "outdoor living", "home repairs",
  "repair", "repairs", "replacement", "inspection", "estimate", "quote",
  "maintenance", "service", "general contracting",
];

/** Any street suffix — only address-y when the name also carries a number. */
const STREET_SUFFIXES =
  "st|street|rd|road|ave|avenue|dr|drive|ln|lane|way|blvd|boulevard|ct|court|cir|circle|hwy|highway|pkwy|parkway|ter|terrace|trl|trail|pl|place|loop|run|ridge|holw|hollow";
/**
 * Suffixes that are address-only even without a house number. Ambiguous ones
 * that double as personal names (Lane, Court, Place, Way, Ridge, Run) are
 * deliberately excluded to avoid rejecting real customers.
 */
const STRONG_STREET_SUFFIXES =
  "street|road|avenue|boulevard|highway|parkway|terrace|drive|circle";

/**
 * Validates a candidate Customer / Account Name against the six locked rules:
 *
 *   1. Never equal to the Job name.
 *   2. Never equal to the Location display name.
 *   3. Never contains the street address.
 *   4. Never contains a 5-digit ZIP.
 *   5. Never starts with a service category.
 *   6. Never contains "Inquiry" or "Website Lead".
 *
 * Returns null when the name is clean, or a short error string describing the
 * violation. Used at send-time to refuse malformed writes (the lead is then
 * marked `retry_needed` and stays queued locally) and by regression checks.
 */
export function validateCustomerAccountName(
  name: string,
  ctx: { jobName?: string; locationName?: string; propertyAddress?: string; serviceCategory?: string } = {},
): string | null {
  const n = cleanName(name);
  if (!n) return "empty customer name";

  // Compare ignoring case, punctuation and spacing so cosmetic differences
  // ("Roofing - Highlands - John" vs "Roofing – Highlands – John") still match.
  const norm = (v: string) =>
    cleanName(v).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const nNorm = norm(n);

  // Rule 6 — never a lead/job label.
  if (/inquiry/i.test(n)) return "customer name contains 'Inquiry'";
  if (/website\s*lead/i.test(n)) return "customer name contains 'Website Lead'";
  if (/\blead\b/i.test(n)) return "customer name contains 'Lead'";

  // Rule 5 — never starts with a service category (static list + submitted one).
  const startsWithCategory = SERVICE_CATEGORY_PREFIXES.some((cat) => {
    const c = norm(cat);
    return nNorm === c || nNorm.startsWith(c + " ");
  });
  if (startsWithCategory) return "customer name starts with service category";
  if (ctx.serviceCategory) {
    const c = norm(ctx.serviceCategory);
    if (c && (nNorm === c || nNorm.startsWith(c + " ")))
      return "customer name starts with service category";
  }

  // Rule 4 — never a ZIP (5-digit, or ZIP+4).
  if (/(?<!\d)\d{5}(?:-\d{4})?(?!\d)/.test(n)) return "customer name contains ZIP code";

  // Rule 3 — never a street address: leading house number, any street suffix,
  // PO boxes, or unit designators.
  const hasNumber = /\d/.test(n);
  if (hasNumber && new RegExp(`\\b(${STREET_SUFFIXES})\\b`, "i").test(n))
    return "customer name contains a street address";
  if (new RegExp(`\\b(${STRONG_STREET_SUFFIXES})\\b`, "i").test(n))
    return "customer name contains a street address";
  if (/^\s*\d+\s+\S+/.test(n)) return "customer name contains a street address";
  if (/\bp\.?\s*o\.?\s*box\b/i.test(n)) return "customer name contains a street address";
  if (/\b(apt|apartment|suite|ste|unit|lot|#\s*\d+)\b/i.test(n))
    return "customer name contains a street address";
  if (ctx.propertyAddress) {
    const addr = norm(ctx.propertyAddress);
    if (addr.length > 4 && nNorm.includes(addr))
      return "customer name contains property address";
  }

  // Rules 1 & 2 — never the Job or Location name.
  if (ctx.jobName && norm(ctx.jobName) === nNorm) return "customer name equals job name";
  if (ctx.locationName && norm(ctx.locationName) === nNorm)
    return "customer name equals location display name";

  return null;
}

export function buildPayload(row: LeadRow, kind: "lead" | "chatbot", attachments?: AttachmentInfo) {
  const leadName = humanizeLeadName(row);
  const town = row.property_town ?? null;
  const meta: any = row.metadata ?? {};
  // Independent builders — one per JobTread entity. Never reuse across
  // entities. See buildCustomerAccountName() docs for the safeguard rules.
  const accountName = buildCustomerAccountName(row);
  const { urgent, waterEntering } = detectUrgentRoofing(row);
  // Derive a smart category from the readable lead name when the customer
  // did not pick one on the form. Keeps JobTread's job_type useful even for
  // generic contact/quote submissions.
  const inferredCategory = leadName.split(" - ")[0]?.trim() || "Website Lead";
  const jobType = row.service_category || row.lead_type || inferredCategory;
  const serviceArea = town ? mapServiceAreaSafe(town) : null;
  // Detect city/service-area landing pages by URL pattern.
  const pageUrl: string = row.page_url ?? "";
  const cityPageMatch = pageUrl.match(/\/(?:service-area|areas|towns|locations|cities)\/([a-z0-9-]+)/i);
  const serviceAreaOrCityPage = cityPageMatch?.[1] ?? serviceArea ?? null;
  const photos = Array.isArray(row.photos_uploaded) ? row.photos_uploaded : [];
  const files = Array.isArray(row.files_uploaded) ? row.files_uploaded : [];
  const resolvedAttachments: AttachmentInfo = attachments ?? { files: [], failures: uploadFailures(row) };
  const uploadedFileUrls = resolvedAttachments.files.length
    ? resolvedAttachments.files.map((f) => f.url)
    : [...photos, ...files]
        .map((v: any) => (typeof v === "string" ? v : v?.url ?? null))
        .filter(Boolean);
  return {
    // Top-level fields most webhook receivers will look for
    lead_name: leadName,
    job_name: buildJobName(row),
    account_name: accountName,
    location_display_name: buildLocationDisplayName(row),
    job_type: jobType,
    priority: urgent ? "P1" : "P3",
    urgency_level: urgent ? "high" : (row.urgency ?? "normal"),
    water_actively_entering: waterEntering,
    org_id: JOBTREAD_ORG_ID || null,
    // Structured sections
    contact: buildContactPayload(row),
    property: {
      property_address: row.property_address ?? null,
      property_town: town,
      service_area_or_city_page: serviceAreaOrCityPage,
      property_type: row.property_type ?? null,
      community_or_subdivision: (row as any).community_or_subdivision ?? meta.community_or_subdivision ?? meta.community ?? meta.subdivision ?? null,
      gate_code: (row as any).gate_code ?? meta.gate_code ?? meta.entry_code ?? null,
      roof_type: (row as any).roof_type ?? meta.roof_type ?? null,
      material_color: (row as any).material_color ?? meta.material_color ?? meta.color ?? null,
      foundation_type: (row as any).foundation_type ?? meta.foundation_type ?? null,
    },
    // Location mapping — the JobTread Location is placed by the lead's
    // town/county (address when we have it). County comes from the canonical
    // lead payload and is used for service-area routing when the town alone
    // is not one of the mapped markets.
    location: {
      town,
      county: (row as any).property_county ?? null,
      address: buildFullAddress(row),
      property_type: row.property_type ?? null,
    },
    project: {
      service_category: row.service_category ?? null,
      project_type: row.project_type ?? null,
      roofing_issue_type: row.roofing_issue_type ?? null,
      urgency: row.urgency ?? null,
      has_plans: row.has_plans ?? null,
      lead_classification: classifyConstructionDesign(row),
      project_description: row.project_description ?? null,
      description: row.project_description ?? null, // legacy alias
      all_form_specific_answers: row.metadata ?? null,
      uploaded_file_urls: uploadedFileUrls,
    },
    source: {
      source_form: row.source ?? null,
      source_page_url: row.page_url ?? null,
      referrer: row.referrer ?? null,
      landing_page: row.landing_page ?? null,
      landing_url: row.landing_url ?? null,
      first_seen_at: row.first_seen_at ?? null,
      submitted_at: row.created_at ?? null,
      user_agent: row.user_agent ?? null,
      form: row.source ?? null, // legacy alias
      page_url: row.page_url ?? null, // legacy alias
      lead_type: row.lead_type ?? null,
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
      msclkid: row.msclkid ?? null,
      li_fat_id: row.li_fat_id ?? null,
      referrer: row.referrer ?? null,
      landing_page: row.landing_page ?? null,
      first_seen_at: row.first_seen_at ?? null,
    },
    consent: {
      consent_given: row.consent_given ?? false,
      consent_text: row.consent_text ?? null,
      privacy_policy_url: "https://highlandernc.com/privacy-policy",
      given: row.consent_given ?? false, // legacy alias
      text: row.consent_text ?? null, // legacy alias
    },
    uploads: {
      photos,
      files,
      uploaded_file_urls: uploadedFileUrls,
      attachments: resolvedAttachments.files,
      failed_uploads: resolvedAttachments.failures,
    },
    chat: kind === "chatbot" || row.chat_summary
      ? {
          chat_summary: row.chat_summary ?? row.summary ?? null,
          chat_transcript: row.full_chat_transcript ?? row.full_transcript ?? null,
          recommended_next_step: row.recommended_next_step ?? null,
          summary: row.chat_summary ?? row.summary ?? null, // legacy alias
          transcript: row.full_chat_transcript ?? row.full_transcript ?? null, // legacy alias
        }
      : null,
    metadata: row.metadata ?? null,
    // Human-readable note the Highlander team can read at a glance
    note: buildLeadNotes(row, resolvedAttachments),
    structured: buildStructuredFields(row),
  };
}

function mapServiceAreaSafe(town: string | null | undefined): string | null {
  if (!town) return null;
  try { return mapServiceArea(town); } catch { return null; }
}

async function sendToWebhook(payload: any): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (JOBTREAD_API_KEY) headers["Authorization"] = `Bearer ${JOBTREAD_API_KEY}`;
    if (JOBTREAD_ORG_ID) headers["X-JobTread-Org"] = JOBTREAD_ORG_ID;
    // Do not populate JobTread Description from website leads. Highlander
    // uses this field in QuickBooks invoice flow. Website intake details
    // belong in Lead Notes only. Scrub before dispatch.
    const body = scrubDescription({
      api_key: JOBTREAD_API_KEY || undefined,
      org_id: JOBTREAD_ORG_ID || undefined,
      ...payload,
    });
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

// ---------- JobTread Highlander org constants ----------
// Discovered via Pave introspection against the live org
// "Highlander Building Services, Inc." (org id 22P5uYkUSP8F).
// Custom-field IDs are stable per JobTread org, so hardcoding here is safe
// and avoids an extra API roundtrip on every sync.
//
// Field map per Highlander's JobTread field update (16 Oct 2026):
//  - Communication Preference moved from the job (22PPQYmK3SXB is a customer
//    account field a job cannot hold — it blocked every job) to the contact.
//  - Email / phone / secondary phone are contact CUSTOM fields; createContact
//    accepts only accountId, name, title and customFieldValues.
//  - Divisions (was Job Type) is a multi-select list; Job Notes was Lead Notes.
//  - Deleted / retired, never sent: Job Scope Type 22P6NLAkTWjs, job Comm Pref
//    22PPQYu3uBCx, Will Customer Be Present 22PNm2NKGREB, Sales Rep
//    22P9zdkEzDpv, property Gate Code 22PNwBiMbUzf, property Email
//    22PTWFAtwzqx, property Sales Notes 22P6KUiJD3EJ.
const JT_CF = {
  account: {
    service_area: "22P72GvSrBgk", // option: Franklin | Sylva | Asheville
    lead_source: "22P75KEjYCfa",  // option: Highlander Website
    referred_by: "22P75KDSW7iP",  // text
    community: "22PPQaQrDp8h",    // text: Community or Subdivision Name
  },
  contact: {
    email: "22P5uYmYEAkx",           // email
    phone: "22P5uYmnWzne",           // phone
    secondary_phone: "22P6KUNyV3jy", // phone
    comm_pref: "22PgE4a3Qn6X",       // option: Phone | Text | Email | Mail | Any
  },
  location: {
    contact_name: "22PPzwDNUYjN", // text
    phone: "22PPzw5sqRSX",        // phoneNumber
    stories: "22PgCuQ9Qdjx",      // option: 1 | 2 | 3+
    property_type: "22PgCue6AFVm", // option: Primary Home | Second Home / Cabin | ...
  },
  job: {
    status: "22P5uYmYTED2",       // option, "01 New Lead (Needs Appointment)"
    divisions: "22PNawhnSXmW",    // list: Roofing | Gutters | Construction | Repair
    job_notes: "22PYx7PBhE56",    // text (was Lead Notes, same ID)
    roof_type: "22PgCu9jhtAA",    // option: Shingle | Metal | Shake | Slate / Tile | Flat
    roofing_color: "22PgCuC3sTWg", // text
    gutter_color: "22PgCuDm46uM", // text
    drip_edge_color: "22PgCuF45LBK", // text
    insurance_claim: "22PNawMp3BLV", // boolean
  },
} as const;

export function mapServiceArea(town: string | null | undefined, county?: string | null): string {
  const t = `${town ?? ""} ${county ?? ""}`.toLowerCase();
  if (/franklin|highlands|cashiers|scaly|otto|clayton/.test(t)) return "Franklin";
  if (/sylva|cullowhee|bryson|waynesville|dillsboro|webster|balsam|maggie|cherokee/.test(t)) return "Sylva";
  if (/asheville|hendersonville|weaverville|black mountain|arden|fletcher/.test(t)) return "Asheville";
  // County-level routing when the town is not one of the mapped markets.
  const c = (county ?? "").toLowerCase();
  if (/jackson|swain|haywood/.test(c)) return "Sylva";
  if (/buncombe|henderson|madison|transylvania/.test(c)) return "Asheville";
  return "Franklin"; // safe default matching HQ service area
}

function mapJobType(payload: any): string {
  const key = [payload?.project?.service_category, payload?.project?.project_type, payload?.source?.lead_type]
    .filter(Boolean).join(" ").toLowerCase();
  if (/gutter/.test(key)) return "Gutters";
  if (/construction|addition|design|renovation|remodel|outdoor|new_build|exterior/.test(key)) return "Construction";
  if (/repair|storm|leak|hail/.test(key)) return "Repair";
  return "Roofing";
}

/** Contact "Communication Preference": Phone | Text | Email | Mail | Any, or "" when not chosen. */
export function mapCommPref(pref: string | null | undefined): string {
  const p = (pref ?? "").toLowerCase().trim();
  if (!p) return "";
  if (/text|sms/.test(p)) return "Text";
  if (/e-?mail/.test(p)) return "Email";
  if (/\bmail\b|postal|letter/.test(p)) return "Mail";
  if (/any|either|no pref|whichever/.test(p)) return "Any";
  if (/phone|call/.test(p)) return "Phone";
  return "";
}

/**
 * NEVER RENAME OR MERGE — hard guard. This function may only create records.
 * Any mutation that could rename, merge, or overwrite an existing Customer /
 * Account / Contact is refused before it leaves the edge function.
 */
const FORBIDDEN_MUTATIONS = [
  "updateAccount",
  "renameAccount",
  "mergeAccount",
  "mergeAccounts",
  "updateContact",
  "mergeContacts",
  "deleteAccount",
];

export function assertNoCustomerRewrite(query: any): void {
  const keys = new Set<string>();
  const walk = (node: any, depth = 0) => {
    if (!node || typeof node !== "object" || depth > 6) return;
    for (const k of Object.keys(node)) {
      keys.add(k);
      walk(node[k], depth + 1);
    }
  };
  walk(query);
  const hit = FORBIDDEN_MUTATIONS.find((m) => keys.has(m));
  if (hit) {
    throw new Error(
      `blocked: ${hit} — existing JobTread customers are never renamed or merged from a website lead.`,
    );
  }
}

async function paveFetch(query: any): Promise<any> {
  assertNoCustomerRewrite(query);
  const res = await fetch(JOBTREAD_PAVE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Pave HTTP ${res.status}: ${text.slice(0, 400)}`);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON Pave response: ${text.slice(0, 300)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PERMANENT SAFEGUARD — QuickBooks-safe JobTread Description field.
//
// Do not populate JobTread Description from website leads. Highlander uses
// this field in QuickBooks invoice flow. Website intake details belong in
// Lead Notes only. Any accidental future edit that introduces `description`,
// `jobDescription`, `job_description`, `desc`, `summary`, `long_description`,
// or a nested `customFieldValues.description` on a createJob/updateJob
// payload will be stripped here before the payload leaves this function.
//
// If Highlander later decides Description should carry a specific short
// value, add an explicit allowlist here — never bypass this scrubber.
// ─────────────────────────────────────────────────────────────────────────────
const FORBIDDEN_DESCRIPTION_KEYS = new Set([
  "description",
  "jobDescription",
  "job_description",
  "desc",
  "long_description",
  "longDescription",
  // Job numbers must ALWAYS be auto-generated by JobTread. Never send one.
  "jobNumber",
  "job_number",
  "number",
]);
export function scrubDescription<T extends Record<string, any>>(input: T): T {
  if (!input || typeof input !== "object") return input;
  const out: Record<string, any> = { ...input };
  for (const key of Object.keys(out)) {
    if (FORBIDDEN_DESCRIPTION_KEYS.has(key)) {
      delete out[key];
    }
  }
  if (out.customFieldValues && typeof out.customFieldValues === "object") {
    const cf: Record<string, any> = { ...out.customFieldValues };
    for (const key of Object.keys(cf)) {
      if (FORBIDDEN_DESCRIPTION_KEYS.has(key)) delete cf[key];
    }
    out.customFieldValues = cf;
  }
  return out as T;
}

/**
 * Truncates the Lead Notes to JobTread's field cap while always keeping the
 * ATTACHMENTS block (signed links + failed uploads) intact. It is the last
 * section of the note, so everything above it absorbs the truncation.
 */
export function truncateNotePreservingFiles(note: string, max = 1000): string {
  if (!note || note.length <= max) return note;
  const lines = note.split("\n");
  const start = lines.findIndex((l) => {
    const t = l.trim().toLowerCase();
    return t === "attachments" || t === "files";
  });
  if (start === -1) return note.slice(0, max - 10) + "\n…[truncated]";
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].trim() === "") { end = i; break; }
  }
  const filesBlock = lines.slice(start, end).join("\n");
  const head = lines.slice(0, start).join("\n");
  const marker = "\n…[truncated]\n";
  const budget = max - filesBlock.length - marker.length;
  if (budget <= 0) return filesBlock.slice(0, max);
  return head.slice(0, budget) + marker + filesBlock;
}

/**
 * IDs created so far for one lead. Saved on the lead row after every step so a
 * retry reuses them and redoes only the step that failed (an account made by an
 * earlier try of the same lead IS that lead's account).
 */
export type JobTreadProgress = { accountId?: string; contactId?: string; locationId?: string; jobId?: string };

export type PaveSendOptions = {
  progress?: JobTreadProgress | null;
  /** Earlier attempts recorded on the lead row (jobtread_retry_count). */
  priorAttempts?: number;
  /** Persist progress as each step succeeds. Never throws into the sync. */
  onProgress?: (progress: JobTreadProgress) => Promise<void> | void;
};

export async function sendToPaveApi(
  payload: any,
  opts: PaveSendOptions = {},
): Promise<{ ok: boolean; id?: string; error?: string; progress?: JobTreadProgress }> {
  const progress: JobTreadProgress = { ...(opts.progress ?? {}) };
  const save = async () => {
    try {
      await opts.onProgress?.({ ...progress });
    } catch (e) {
      console.warn("jobtread progress save failed (non-fatal):", (e as Error).message);
    }
  };
  const fail = (error: string) => ({ ok: false, error, progress: { ...progress } });
  try {
    const orgId = JOBTREAD_ORG_ID;
    if (!orgId) {
      return fail("Missing JOBTREAD_ORG_ID (Highlander org). Cannot create JobTread records.");
    }
    // The job already exists from an earlier try: never create a second one.
    if (progress.jobId) return { ok: true, id: progress.jobId, progress: { ...progress } };

    const contactName = payload.contact?.name || "Website Lead";
    const town = payload.location?.town;
    const county = payload.location?.county;
    const address = payload.location?.address;

    // ── SAFEGUARD: refuse to send a malformed Customer / Account Name.
    // If validation fails, the caller marks the lead retry_needed so the
    // Highlander team can supply a real name — we never invent one from
    // job title, address, or category.
    let accountName = cleanName(payload.account_name);
    const acctErr = validateCustomerAccountName(accountName, {
      jobName: payload.job_name,
      locationName: payload.location_display_name,
      propertyAddress: payload.property?.property_address ?? address,
      serviceCategory: payload.project?.service_category,
    });
    if (acctErr) {
      return fail(`retry_needed: invalid customer name (${acctErr}). Provide a valid full name or company name before retrying.`);
    }

    accountName = buildFirstNameOnlyAccountName(accountName, payload.contact, town);

    const noteFull: string = payload.note ?? "";
    // JobTread text custom fields cap at 1024 chars. Attachment links must
    // survive truncation — they are the only way the crew reaches the files.
    const noteShort = truncateNotePreservingFiles(noteFull, 1000);

    // Location display name, capped at JobTread's 30 characters:
    //   1. Property address  2. "[Town] Property"  3. "Website Lead"
    // Never the Job Name, Customer Name, or Job Notes.
    const rawLocName = payload.location_display_name
      || (address ? String(address) : (town ? `${town} Property` : "Website Lead"));
    const locName = rawLocName.length > 30 ? rawLocName.slice(0, 30) : rawLocName;

    // Step 1 — the Customer. Reuse the account an earlier try of THIS lead
    // created; otherwise resolve by "full name + town". JobTread enforces
    // unique account names within an org, so we look the name up first. An
    // existing account with a location in this lead's town is reused; one in
    // a different town gets a separate "Full Name (Town)" account. We never
    // rename or merge an existing customer.
    let accountId: string | undefined = progress.accountId;
    // The account belongs to this lead (created by it now or by an earlier
    // try): it may still need its contact and property.
    let ownAccount = !!accountId;
    let existingLocations: Array<{ id?: string; name?: string; address?: string }> = [];
    if (!accountId) {
      const lookupRes = await paveFetch({
        $: { grantKey: JOBTREAD_API_KEY },
        organization: {
          $: { id: orgId },
          accounts: {
            $: {
              where: {
                and: [
                  { "=": [{ field: "name" }, { value: accountName }] },
                ],
              },
              size: 1,
            },
            nodes: {
              id: {},
              name: {},
              locations: { $: { size: 20 }, nodes: { id: {}, name: {}, address: {} } },
            },
          },
        },
      });
      const existing = lookupRes?.organization?.accounts?.nodes?.[0];
      if (existing?.id) {
        const locs = existing?.locations?.nodes ?? null;
        // A lead that already failed here before made this account on its
        // earlier try (the 2nd-account-on-retry bug): it is this lead's account.
        const earlierTryOfThisLead = Number(opts.priorAttempts ?? 0) > 0;
        if (earlierTryOfThisLead || accountMatchesTown(locs, town)) {
          accountId = existing.id;
          existingLocations = locs ?? [];
          ownAccount = earlierTryOfThisLead;
        } else {
          // Same name, different town → distinct customer. Never rename/merge.
          accountName = buildTownScopedAccountName(accountName, town);
          const scopedRes = await paveFetch({
            $: { grantKey: JOBTREAD_API_KEY },
            organization: {
              $: { id: orgId },
              accounts: {
                $: {
                  where: { and: [{ "=": [{ field: "name" }, { value: accountName }] }] },
                  size: 1,
                },
                nodes: { id: {}, name: {}, locations: { $: { size: 20 }, nodes: { id: {}, name: {}, address: {} } } },
              },
            },
          });
          const scoped = scopedRes?.organization?.accounts?.nodes?.[0];
          accountId = scoped?.id;
          existingLocations = scoped?.locations?.nodes ?? [];
        }
      }
      if (!accountId) {
        const accountRes = await paveFetch({
          $: { grantKey: JOBTREAD_API_KEY },
          createAccount: {
            $: {
              organizationId: orgId,
              name: accountName,
              type: "customer",
              customFieldValues: { ...buildAccountCustomFieldValues(town, county), ...(payload.structured?.account ?? {}) },
            },
            createdAccount: { id: {}, name: {} },
          },
        });
        const apiErrA = accountRes?.error?.message || accountRes?.error;
        if (apiErrA) return fail(`createAccount: ${String(apiErrA).slice(0, 400)}`);
        accountId = accountRes?.createAccount?.createdAccount?.id;
        if (!accountId) return fail(`createAccount returned no id`);
        ownAccount = true;
      }
      progress.accountId = accountId;
      await save();
    }
    // ── EXISTING CUSTOMER PROTECTION ──────────────────────────────────────
    // When we reuse an existing Account (matched by name above), we NEVER
    // issue an updateAccount / rename mutation from this function. New Jobs
    // and Locations attach under the existing correct Customer. Do not add
    // account-rename logic here without explicit Highlander sign-off.
    // ─────────────────────────────────────────────────────────────────────

    // Step 2 — the Contact (Name + email / phones / communication preference
    // as custom fields). Created once for the lead's own account; an existing
    // customer keeps its contacts untouched. A failure now fails the attempt —
    // it is no longer swallowed — and the retry redoes only this step.
    if (ownAccount && !progress.contactId) {
      const name = (payload.contact?.name ?? "").toString().trim() || payload.lead_name;
      const title = (payload.contact?.title ?? "").toString().trim();
      const contactRes = await paveFetch({
        $: { grantKey: JOBTREAD_API_KEY },
        createContact: {
          $: {
            accountId,
            name,
            ...(title ? { title } : {}),
            customFieldValues: buildContactCustomFieldValues(payload.contact),
          },
          createdContact: { id: {} },
        },
      });
      const apiErrC = contactRes?.error?.message || contactRes?.error;
      if (apiErrC) return fail(`createContact: ${String(apiErrC).slice(0, 400)}`);
      const contactId: string | undefined = contactRes?.createContact?.createdContact?.id;
      if (!contactId) return fail(`createContact returned no id`);
      progress.contactId = contactId;
      await save();
    }

    // Step 3 — the Property (JobTread Location) with the full street address.
    // Reuse one the lead's earlier try (or the customer) already has with the
    // same name or address instead of adding another.
    let locationId: string | undefined = progress.locationId;
    if (!locationId) {
      const sameProperty = existingLocations.find((l) =>
        (l?.name && l.name === locName) || (!!address && !!l?.address && l.address === address),
      );
      locationId = sameProperty?.id;
    }
    if (!locationId) {
      const locRes = await paveFetch({
        $: { grantKey: JOBTREAD_API_KEY },
        createLocation: {
          $: {
            accountId,
            name: locName,
            address: address || null,
            // Sales Notes, Gate Code and Email are retired Location fields.
            customFieldValues: buildLocationCustomFieldValues({
              gateCodeBool: false,
              contactName,
              phone: payload.contact?.phone,
              email: payload.contact?.email,
            }),
            ...(payload.structured?.location ?? {}),
          },
          createdLocation: { id: {}, name: {} },
        },
      });
      const apiErrL = locRes?.error?.message || locRes?.error;
      if (apiErrL) return fail(`createLocation: ${String(apiErrL).slice(0, 400)}`);
      locationId = locRes?.createLocation?.createdLocation?.id;
      if (!locationId) return fail(`createLocation returned no id: ${JSON.stringify(locRes).slice(0, 300)}`);
    }
    if (progress.locationId !== locationId) {
      progress.locationId = locationId;
      await save();
    }

    // Step 4 — create Job under the Location
    // JobTread caps job.name at 30 chars as well.
    // JobTread caps job.name at 30 chars. Prefer graceful degradation over a
    // hard slice so we never leave a truncated word (e.g. "... - Q") in the
    // title. Try full name → first initial → drop name entirely.
    const jobNameShort = (() => {
      const full = payload.job_name;
      if (full.length <= 30) return full;
      const parts = full.split(" - ");
      if (parts.length === 3) {
        const withInitial = `${parts[0]} - ${parts[1]} - ${parts[2].charAt(0)}`;
        if (withInitial.length <= 30) return withInitial;
        const noName = `${parts[0]} - ${parts[1]}`;
        if (noName.length <= 30) return noName;
      }
      return full.slice(0, 30);
    })();
    const jobRes = await paveFetch({
      $: { grantKey: JOBTREAD_API_KEY },
      createJob: {
        $: scrubDescription({
          locationId,
          name: jobNameShort,
          // Description intentionally OMITTED from the payload — Highlander
          // uses JobTread Description for internal scope, not for the
          // website intake summary. Full summary goes into Lead Notes only.
          customFieldValues: buildJobCustomFieldValues(payload, noteShort),
        }),
        createdJob: { id: {}, name: {} },
      },
    });
    const apiErrJ = jobRes?.error?.message || jobRes?.error;
    if (apiErrJ) return fail(`createJob: ${String(apiErrJ).slice(0, 400)}`);
    const jobId: string | undefined = jobRes?.createJob?.createdJob?.id;
    if (!jobId) return fail(`createJob returned no id`);
    progress.jobId = jobId;
    await save();
    return { ok: true, id: jobId, progress: { ...progress } };
  } catch (e) {
    return fail(`Pave error: ${(e as Error).message}`);
  }
}

function validateSecrets(): string | null {
  // Only the API key is truly required. Base URL has a default. Webhook /
  // org id are optional and only used when present.
  if (JOBTREAD_API_KEY) return null;
  return "Missing JobTread environment variable: JOBTREAD_API_KEY";
}

// Strip secrets, URLs, and any bearer/grant-key material out of upstream error
// text before persisting to the database or returning it to callers. Keeps a
// short, safe reason team members can read without leaking API details.
function sanitizeError(input: unknown): string {
  const raw = typeof input === "string" ? input : (input as any)?.message ?? JSON.stringify(input ?? "");
  return String(raw)
    .replace(/https?:\/\/\S+/gi, "[url]")
    .replace(/bearer\s+[A-Za-z0-9._~+/=-]+/gi, "[token]")
    .replace(/(grantKey|api_key|apikey|authorization)\s*[:=]\s*"?[A-Za-z0-9._~+/=-]+"?/gi, "$1=[redacted]")
    .replace(/[A-Za-z0-9]{20,}\.[A-Za-z0-9._-]{20,}/g, "[token]")
    .slice(0, 500);
}

/**
 * Exponential backoff schedule for CRM sync retries.
 * 5 attempts spread over ~24 hours: 5m, 30m, 2h, 6h, 16h.
 * Returns null once the schedule is exhausted.
 */
export const MAX_SYNC_ATTEMPTS = 5;
export const RETRY_DELAYS_MS = [
  5 * 60_000,
  30 * 60_000,
  2 * 60 * 60_000,
  6 * 60 * 60_000,
  16 * 60 * 60_000,
];

export function nextRetryAt(attempt: number, from: Date = new Date()): string | null {
  if (attempt >= MAX_SYNC_ATTEMPTS) return null;
  const delay = RETRY_DELAYS_MS[Math.max(0, Math.min(attempt - 1, RETRY_DELAYS_MS.length - 1))];
  return new Date(from.getTime() + delay).toISOString();
}

/** Idempotency: ignore a repeat submission with the same key inside this window. */
export const IDEMPOTENCY_WINDOW_MS = 10 * 60_000;

export function isDuplicateSubmission(
  row: { idempotency_key?: string | null; jobtread_last_attempt_at?: string | null; created_at?: string | null },
  incomingKey: string | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!incomingKey || !row.idempotency_key) return false;
  if (row.idempotency_key !== incomingKey) return false;
  const seenAt = row.jobtread_last_attempt_at ?? row.created_at;
  if (!seenAt) return false;
  // Only a *repeat* attempt counts — the first attempt has no last_attempt_at.
  if (!row.jobtread_last_attempt_at) return false;
  return now.getTime() - new Date(seenAt).getTime() < IDEMPOTENCY_WINDOW_MS;
}

/** Fires the Teams alert for a lead that used up every retry. Never throws. */
async function alertSyncExhausted(table: string, id: string, attempts: number) {
  const idKey =
    table === "leads"
      ? "lead_id"
      : table === "chatbot_conversations"
        ? "chatbot_conversation_id"
        : table === "consultation_requests"
          ? "consultation_request_id"
          : "designer_lead_id";
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/teams-notify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SERVICE_ROLE}`,
        apikey: SERVICE_ROLE,
      },
      body: JSON.stringify({ event: "sync_exhausted", attempts, [idKey]: id }),
    });
    if (!res.ok) console.error(`teams-notify exhausted alert failed [${res.status}]`);
  } catch (e) {
    console.error("teams-notify exhausted alert failed:", (e as Error).message);
  }
}

/** Public callers may only sync a brand-new, never-attempted record. */
const PUBLIC_SYNC_WINDOW_MS = 30 * 60 * 1000;

/** True for internal service-role calls or a signed-in admin. */
async function callerIsPrivileged(req: Request): Promise<boolean> {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  if (!token) return false;
  if (SERVICE_ROLE && token === SERVICE_ROLE) return true;
  try {
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await admin.auth.getUser(token);
    if (error || !data?.user) return false;
    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
    return isAdmin === true;
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let body: any = {};
  try { body = await req.json(); } catch { /* empty */ }
  const privileged = await callerIsPrivileged(req);
  if (!privileged) {
    if (body.retry_failed === true || body.force) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // Bulk retry mode: find failed / retry_needed leads and re-run them. Meant
  // for admin/scheduled use — protected by an internal admin token so it
  // cannot be triggered from the public site.
  if (body.retry_failed === true) {
    const adminToken = body.admin_token ?? req.headers.get("x-admin-token");
    if (!adminToken || adminToken !== (Deno.env.get("JOBTREAD_ADMIN_TOKEN") ?? SERVICE_ROLE)) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const limit = Math.min(Number(body.limit) || 25, 100);
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    // `ids`: re-run exactly these leads once (e.g. the backlog from the
    // 16 Oct field change, minus internal tests), including leads whose
    // automatic retries are exhausted. Already-synced leads are skipped.
    const ids: string[] = Array.isArray(body.ids)
      ? body.ids.filter((v: unknown) => typeof v === "string").slice(0, 100)
      : [];
    const { data: failed } = ids.length
      ? await admin
          .from("leads")
          .select("id, jobtread_retry_count")
          .in("id", ids)
          .eq("jobtread_synced", false)
          .order("created_at", { ascending: true })
      : await admin
          .from("leads")
          .select("id, jobtread_retry_count")
          .in("jobtread_sync_status", ["failed", "retry_needed"])
          .lt("jobtread_retry_count", MAX_SYNC_ATTEMPTS)
          .order("created_at", { ascending: true })
          .limit(limit);
    const results: Array<{ id: string; ok: boolean }> = [];
    for (const r of failed ?? []) {
      try {
        const url = new URL(req.url);
        const res = await fetch(`${url.origin}${url.pathname}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": req.headers.get("authorization") ?? "" },
          body: JSON.stringify({ lead_id: r.id, force: true }),
        });
        const j = await res.json().catch(() => ({ ok: false }));
        results.push({ id: r.id, ok: !!j.ok });
      } catch {
        results.push({ id: r.id, ok: false });
      }
    }
    return new Response(JSON.stringify({ ok: true, retried: results.length, results }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const leadId: string | undefined = body.lead_id;
  const convId: string | undefined = body.chatbot_conversation_id;
  const consultId: string | undefined = body.consultation_request_id;
  const designerId: string | undefined = body.designer_lead_id;
  const intakeLeadId: string | undefined = body.intake_lead_id;

  if (!leadId && !convId && !consultId && !designerId && !intakeLeadId) {
    return new Response(JSON.stringify({ error: "lead_id, chatbot_conversation_id, consultation_request_id, designer_lead_id, or intake_lead_id required" }), {
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
    : intakeLeadId
    ? "intake_leads"
    : "designer_leads";
  const id = leadId ?? convId ?? consultId ?? intakeLeadId ?? designerId;
  if (!id) {
    return new Response(JSON.stringify({ error: "A valid record id is required" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const kind: "lead" | "chatbot" =
    convId ? "chatbot" : "lead";
  const supportsPayloadCol = table === "leads" || table === "consultation_requests" || table === "designer_leads" || table === "intake_leads";
  const { data: row, error: fetchErr } = await admin
    .from(table)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr || !row) {
    return new Response(JSON.stringify({ error: "Row not found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Anonymous website callers can only kick off the first sync of a record
  // they just created. Older or previously attempted records need an admin.
  if (!privileged) {
    const createdMs = Date.parse(String(row.created_at ?? ""));
    const fresh = Number.isFinite(createdMs) && Date.now() - createdMs <= PUBLIC_SYNC_WINDOW_MS;
    const untouched = !row.jobtread_synced && Number(row.jobtread_retry_count ?? 0) === 0 && !row.jobtread_last_attempt_at;
    if (!fresh || !untouched) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // Short-circuit if already synced (unless caller passed force=true)
  if (row.jobtread_synced && !body.force) {
    return new Response(JSON.stringify({ ok: true, already_synced: true, id: row.jobtread_id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Idempotency: a repeat submission carrying the same client key inside the
  // 10-minute window is ignored instead of creating duplicate CRM records.
  if (!body.force && isDuplicateSubmission(row as any, body.idempotency_key)) {
    return new Response(JSON.stringify({ ok: true, duplicate_ignored: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // consultation_requests uses `town` instead of `property_town` — normalize
  // a couple of aliases so the payload builder emits the same shape.
  const normalizedBase = {
    ...row,
    property_town: row.property_town ?? row.town ?? null,
    project_description: row.project_description ?? row.description ?? null,
    source: row.source ?? row.source_form ?? table,
  };
  const normalized = table === "intake_leads"
    ? normalizeIntakeLead(normalizedBase)
    : normalizedBase;
  // Sign attachment URLs with the service role so the CRM note carries real,
  // openable links. Failures are reported inside the note, never fatal.
  let attachmentInfo: AttachmentInfo = { files: [], failures: [] };
  try {
    attachmentInfo = await resolveAttachments(normalized, async (path: string) => {
      const { data, error } = await admin.storage
        .from("lead-uploads")
        .createSignedUrl(path, ATTACHMENT_URL_TTL_SECONDS);
      return { url: data?.signedUrl ?? null, error: error?.message ?? null };
    });
  } catch (e) {
    console.warn("attachment signing failed (non-fatal):", (e as Error).message);
  }
  const payload = buildPayload(normalized, kind, attachmentInfo);

  const missing = validateSecrets();
  const nowIso = new Date().toISOString();
  const attempt = (row.jobtread_retry_count ?? 0) + 1;
  const retryAt = nextRetryAt(attempt);
  const exhausted = retryAt === null;

  if (missing) {
    await admin.from(table).update({
      jobtread_sync_status: exhausted ? "exhausted" : "retry_needed",
      jobtread_last_attempt_at: nowIso,
      jobtread_error_message: sanitizeError(missing),
      jobtread_retry_count: attempt,
      jobtread_next_retry_at: retryAt,
      jobtread_exhausted_at: exhausted ? nowIso : null,
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
    if (exhausted && !row.jobtread_alerted) {
      await alertSyncExhausted(table, id, attempt);
      await admin.from(table).update({ jobtread_alerted: true }).eq("id", id);
    }
    return new Response(JSON.stringify({ ok: false, error: "sync_config_missing", retryable: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Resume from whatever an earlier try of this lead already created in
  // JobTread (account / contact / property), so a retry never duplicates them.
  const savedProgress: JobTreadProgress | null =
    row.jobtread_progress && typeof row.jobtread_progress === "object" ? row.jobtread_progress : null;
  const result = JOBTREAD_WEBHOOK_URL
    ? await sendToWebhook(payload)
    : await sendToPaveApi(payload, {
        progress: savedProgress,
        priorAttempts: Number(row.jobtread_retry_count ?? 0),
        onProgress: async (progress) => {
          // Separate write: if the column is not migrated yet this fails
          // quietly and the sync itself carries on.
          const { error } = await admin.from(table).update({ jobtread_progress: progress }).eq("id", id);
          if (error) console.warn("jobtread_progress not saved:", error.message);
        },
      });

  if (result.ok) {
    await admin.from(table).update({
      jobtread_synced: true,
      jobtread_sync_status: "success",
      jobtread_id: result.id ?? null,
      jobtread_last_attempt_at: nowIso,
      jobtread_error_message: null,
      jobtread_next_retry_at: null,
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
  } else {
    // A name-rule violation is not a transport failure: keep the lead queued
    // locally as `retry_needed` so the team can supply a real customer name.
    const nameViolation = String(result.error ?? "").startsWith("retry_needed:");
    await admin.from(table).update({
      jobtread_sync_status: exhausted ? "exhausted" : nameViolation ? "retry_needed" : "failed",
      jobtread_last_attempt_at: nowIso,
      jobtread_error_message: sanitizeError(result.error ?? "Unknown JobTread error"),
      jobtread_retry_count: attempt,
      jobtread_next_retry_at: retryAt,
      jobtread_exhausted_at: exhausted ? nowIso : null,
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
    // Every retry is spent and the lead still isn't in the CRM — page the team.
    if (exhausted && !row.jobtread_alerted) {
      await alertSyncExhausted(table, id, attempt);
      await admin.from(table).update({ jobtread_alerted: true }).eq("id", id);
    }
  }

  // Never leak raw upstream error text back to the caller.
  const safeResult = result.ok
    ? result
    : {
        ok: false,
        error: String(result.error ?? "").startsWith("retry_needed:")
          ? "retry_needed"
          : "sync_failed",
        retryable: true,
      };
  return new Response(JSON.stringify(safeResult), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});