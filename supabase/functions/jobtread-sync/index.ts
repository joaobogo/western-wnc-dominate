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
  const firstName = name.split(/\s+/)[0]?.trim() ?? "";
  return firstName ? `${label} - ${town} - ${firstName}` : `${label} - ${town}`;
}

// Returns "construction" when the customer has complete permit-ready plans,
// "design" when they only have ideas/sketches/no plans/unsure, or null when
// the lead is not a construction/design project.
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
    try {
      const res = await signer(entry.path!);
      if (res?.url) files.push({ name: entry.name, url: res.url });
      else failures.push({ name: entry.name, reason: String(res?.error ?? "Could not generate download link") });
    } catch (e) {
      failures.push({ name: entry.name, reason: (e as Error)?.message ?? "Could not generate download link" });
    }
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

  // ── ORDER IS CONTRACTUAL (Highlander spec, prompt 08):
  // source page → service requested → timeline/urgency → property details →
  // budget → insurance (storm) → customer's verbatim description →
  // contact preferences → UTM attribution. Do not reorder.

  section("Source Page");
  lines.push("Lead Source: Website");
  kv("Form", row.source);
  kv("Page URL", row.page_url);
  kv("Lead Type", row.lead_type);
  kv("Submitted At", row.created_at);
  kv("Referred By", (row as any).referral_source ?? meta.referral_source ?? meta.referred_by ?? meta.how_did_you_hear ?? null);

  section("Service Requested");
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

  section("Timeline & Urgency");
  kv("Urgency", urgentRoofing ? `HIGH — ${humanizeValue(row.urgency) || "urgent"}` : row.urgency);
  kv("Timeline", timelineValue);
  if (isRoofingCategory) {
    lines.push(`Water Actively Entering: ${waterEntering ? "Yes" : "No"}`);
  }

  section("Property");
  kv("Town", row.property_town);
  kv("Address", row.property_address);
  kv("Community/Subdivision", communityOrSubdivision);
  kv("Gate Code", gateCode);
  kv("Property Type", row.property_type);

  if (has(budgetValue)) {
    section("Budget");
    kv("Budget", budgetValue);
  }

  if (isStormLead && (has(insuranceValue) || has(insuranceCarrier) || has(claimNumber))) {
    section("Insurance");
    kv("Insurance Status", insuranceValue);
    if (has(insuranceCarrier)) kv("Carrier", insuranceCarrier);
    if (has(claimNumber)) kv("Claim Number", claimNumber);
  }

  const customerMessage = (row.project_description ?? "").toString().trim();
  section("Customer Message");
  lines.push(customerMessage || NP);

  section("Contact");
  kv("Name", row.name);
  kv("Phone", row.phone);
  kv("Secondary Phone", (row as any).secondary_phone ?? meta.secondary_phone ?? meta.phone2 ?? null);
  kv("Email", row.email);
  kv("Preferred Contact Method", row.preferred_contact_method);
  kv("Best Time to Contact", meta.best_time ?? meta.best_time_to_call ?? meta.contact_time ?? null);

  section("Tracking");
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
  kv("First Visit", row.first_seen_at);

  section("Consent");
  lines.push(`Consent Given: ${row.consent_given === true ? "true" : row.consent_given === false ? "false" : NP}`);
  kv("Consent Text", row.consent_text);
  lines.push("Privacy Policy: https://highlandernc.com/privacy-policy");

  // Attachments: signed download links when available, plus an explicit list
  // of files that failed so the team knows what to ask the customer to resend.
  const resolved: AttachmentInfo = attachments ?? {
    files: attachmentEntries(row)
      .filter((e) => e.url)
      .map((e) => ({ name: e.name, url: e.url! })),
    failures: uploadFailures(row),
  };
  section("Files");
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

  if (isChatbotLead) {
    section("Chatbot");
    const summaryText = String(row.chat_summary ?? row.summary ?? "").trim();
    lines.push(`Chat Summary: ${summaryText || NP}`);
    const transcript = row.full_chat_transcript ?? row.full_transcript;
    if (transcript) {
      lines.push("Transcript:");
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
 * Returns the JobTread Customer / Account Name.
 *   Commercial + company submitted → company name
 *   Otherwise                      → customer full name
 *
 * If no valid name exists, returns "" so the caller can mark the lead as
 * `retry_needed` instead of creating a malformed Customer account.
 * Never falls back to job_name, address, location display, or category.
 */
function buildCustomerAccountName(row: LeadRow): string {
  const company = getSubmittedCompanyName(row);
  if (company && isCommercialLead(row)) return cleanName(company);

  const fullName = cleanName(row.name);
  if (fullName) return fullName;

  const first = cleanName((row as any).first_name);
  const last = cleanName((row as any).last_name);
  const combined = cleanName(`${first} ${last}`);
  if (combined) return combined;

  // Commercial company as last-resort even if not flagged commercial
  if (company) return company;

  return ""; // no valid customer name — caller must retry, never invent one
}

function buildContactPayload(row: LeadRow) {
  const meta: any = row.metadata ?? {};
  return {
    name: cleanName(row.name) || null,
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
  return "Website Lead";
}

/** Job name = human-readable "[Service] - [Town] - [First Name]". */
export function buildJobName(row: LeadRow): string {
  return humanizeLeadName(row);
}

/** Lead Notes = full intake summary. Stored ONLY on Job custom field. */
function buildLeadNotes(row: LeadRow, attachments?: AttachmentInfo): string {
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
    [JT_CF.location.gate_code]: opts.gateCodeBool,
    [JT_CF.location.contact_name]: opts.contactName,
    [JT_CF.location.phone]: opts.phone || "",
    [JT_CF.location.email]: opts.email || "",
  };
}

export function buildJobCustomFieldValues(payload: any, noteShort: string): Record<string, unknown> {
  return {
    [JT_CF.job.status]: "01 New Lead (Needs Appointment)",
    [JT_CF.job.job_type]: mapJobType(payload),
    [JT_CF.job.scope_type]: mapScopeType(payload),
    [JT_CF.job.comm_pref]: mapCommPref(payload.contact?.preferred_contact_method),
    [JT_CF.job.customer_present]: false,
    [JT_CF.job.lead_notes]: noteShort,
  };
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
    // Kept for backward compatibility with any downstream mapper still reading `location`.
    location: {
      town,
      address: row.property_address ?? null,
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
// "Highlander Roofing Services Inc" (org id 22P5uYkUSP8F).
// Custom-field IDs are stable per JobTread org, so hardcoding here is safe
// and avoids an extra API roundtrip on every sync.
const JT_CF = {
  account: {
    service_area: "22P72GvSrBgk", // option: Franklin | Sylva | Asheville
    lead_source: "22P75KEjYCfa",  // option: Website (and many others)
  },
  location: {
    gate_code: "22PNwBiMbUzf",    // boolean, required
    contact_name: "22PPzwDNUYjN", // text
    phone: "22PPzw5sqRSX",        // phoneNumber
    email: "22PTWFAtwzqx",        // emailAddress
    sales_notes: "22P6KUiJD3EJ",  // text
  },
  job: {
    status: "22P5uYmYTED2",       // option, "01 New Lead (Needs Appointment)"
    job_type: "22PNawhnSXmW",     // option, required
    scope_type: "22P6NLAkTWjs",   // option, required
    comm_pref: "22PPQYu3uBCx",    // option, required
    customer_present: "22PNm2NKGREB", // boolean, required
    lead_notes: "22PYx7PBhE56",   // text
  },
} as const;

function mapServiceArea(town: string | null | undefined): string {
  const t = (town ?? "").toLowerCase();
  if (/franklin|highlands|cashiers|scaly|otto|clayton/.test(t)) return "Franklin";
  if (/sylva|cullowhee|bryson|waynesville|dillsboro|webster|balsam|maggie|cherokee/.test(t)) return "Sylva";
  if (/asheville|hendersonville|weaverville|black mountain|arden|fletcher/.test(t)) return "Asheville";
  return "Franklin"; // safe default matching HQ service area
}

function mapJobType(payload: any): string {
  const key = (payload?.project?.service_category || payload?.source?.lead_type || "")
    .toString()
    .toLowerCase();
  if (/gutter/.test(key)) return "Gutters";
  if (/construction|addition|design|renovation|outdoor/.test(key)) return "Builder Service";
  if (/repair|storm|maintenance|inspection|leak/.test(key)) return "Maintenance / Repair";
  return "Roofing Service";
}

function mapScopeType(payload: any): string {
  const key = (payload?.project?.service_category || payload?.source?.lead_type || "")
    .toString()
    .toLowerCase();
  const desc = (payload?.project?.description || "").toString().toLowerCase();
  if (/storm|emergency|active water|water coming/.test(key + " " + desc)) return "Emergency Tarp/Patch";
  if (/metal/.test(key)) return "Roofing - Metal";
  if (/synthetic|cedur|brava/.test(key)) return "Roofing - Synthetic CeDUR/Brava";
  if (/commercial/.test(key)) return "Roofing - TRI-BUILT® SA / Flintlastic style Roofing";
  if (/repair|leak|inspection/.test(key)) return "Roofing Repairs";
  if (/replacement|shingle|roof/.test(key)) return "Roofing - Shingles";
  if (/gutter/.test(key)) return "Gutters";
  if (/addition/.test(key)) return "Construction - Addition";
  if (/renovation|remodel/.test(key)) return "Construction - Remodel";
  if (/design/.test(key)) return "Design & Planning";
  if (/construction/.test(key)) return "Construction";
  return "Still Needs";
}

function mapCommPref(pref: string | null | undefined): string {
  const p = (pref ?? "").toLowerCase();
  if (/text|sms/.test(p)) return "Texting";
  if (/email/.test(p)) return "Email";
  return "Phone Call";
}

async function paveFetch(query: any): Promise<any> {
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
 * FILES block (signed attachment links + failed uploads) intact.
 */
export function truncateNotePreservingFiles(note: string, max = 1000): string {
  if (!note || note.length <= max) return note;
  const lines = note.split("\n");
  const start = lines.findIndex((l) => l.trim().toLowerCase() === "files");
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

export async function sendToPaveApi(payload: any): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const orgId = JOBTREAD_ORG_ID;
    if (!orgId) {
      return { ok: false, error: "Missing JOBTREAD_ORG_ID (Highlander org). Cannot create JobTread records." };
    }

    const contactName = payload.contact?.name || "Website Lead";
    const town = payload.location?.town;
    const address = payload.location?.address;

    // ── SAFEGUARD: refuse to send a malformed Customer / Account Name.
    // If validation fails, the caller marks the lead retry_needed so the
    // Highlander team can supply a real name — we never invent one from
    // job title, address, or category.
    const accountName = cleanName(payload.account_name);
    const acctErr = validateCustomerAccountName(accountName, {
      jobName: payload.job_name,
      locationName: payload.location_display_name,
      propertyAddress: address,
      serviceCategory: payload.project?.service_category,
    });
    if (acctErr) {
      return { ok: false, error: `retry_needed: invalid customer name (${acctErr}). Provide a valid full name or company name before retrying.` };
    }

    const noteFull: string = payload.note ?? "";
    // JobTread text custom fields cap at 1024 chars. Attachment links must
    // survive truncation — they are the only way the crew reaches the files.
    const noteShort = truncateNotePreservingFiles(noteFull, 1000);

    // Step 1 — dedupe by account name. JobTread enforces unique account
    // names within an org, so look up first and reuse the existing account
    // when possible; otherwise create a new one.
    let accountId: string | undefined;
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
          nodes: { id: {}, name: {} },
        },
      },
    });
    accountId = lookupRes?.organization?.accounts?.nodes?.[0]?.id;
    let accountIsNew = false;
    if (!accountId) {
      const accountRes = await paveFetch({
        $: { grantKey: JOBTREAD_API_KEY },
        createAccount: {
          $: {
            organizationId: orgId,
            name: accountName,
            type: "customer",
            customFieldValues: {
              [JT_CF.account.service_area]: mapServiceArea(town),
              // Lead Source picklist in JobTread only accepts "Website" for
              // website-originated leads. Chatbot origin is preserved in the
              // Job name prefix and inside Lead Notes → Source section so
              // Highlander can still filter/search for chatbot leads.
              [JT_CF.account.lead_source]: "Website",
            },
          },
          createdAccount: { id: {}, name: {} },
        },
      });
      const apiErrA = accountRes?.error?.message || accountRes?.error;
      if (apiErrA) return { ok: false, error: `createAccount: ${String(apiErrA).slice(0, 400)}` };
      accountId = accountRes?.createAccount?.createdAccount?.id;
      if (!accountId) return { ok: false, error: `createAccount returned no id` };
      accountIsNew = true;
    }
    // ── EXISTING CUSTOMER PROTECTION ──────────────────────────────────────
    // When we reuse an existing Account (matched by name above), we NEVER
    // issue an updateAccount / rename mutation from this function. New Jobs
    // and Locations attach under the existing correct Customer. Do not add
    // account-rename logic here without explicit Highlander sign-off.
    // ─────────────────────────────────────────────────────────────────────

    // Step 1b — create a Contact under the Account so JobTread's
    // "Contact Details" section (Name / Email / Phone) is populated,
    // not just the Location custom fields. Only run on brand-new accounts
    // to avoid duplicate contacts on re-synced leads. Guarded: any Pave
    // schema mismatch is swallowed so it never blocks the job creation.
    if (accountIsNew) {
      const contactName = (payload.contact?.name ?? "").toString().trim();
      const contactEmail = (payload.contact?.email ?? "").toString().trim();
      const contactPhone = (payload.contact?.phone ?? "").toString().trim();
      const contactPhone2 = (payload.contact?.secondary_phone ?? "").toString().trim();
      const contactTitle = (payload.contact?.title ?? "").toString().trim();
      if (contactName || contactEmail || contactPhone) {
        try {
          await paveFetch({
            $: { grantKey: JOBTREAD_API_KEY },
            createContact: {
              $: {
                accountId,
                name: contactName || payload.lead_name,
                email: contactEmail || undefined,
                phone: contactPhone || undefined,
                secondaryPhone: contactPhone2 || undefined,
                title: contactTitle || undefined,
              },
              createdContact: { id: {} },
            },
          });
        } catch (contactErr) {
          // Non-fatal — Location custom fields still carry contact info.
          console.warn("createContact (non-fatal) failed:", (contactErr as Error).message);
        }
      }
    }

    // Step 2 — create Location under the Account. JobTread caps name at 30 chars.
    // Display Name (per Highlander spec, in priority order):
    //   1. Property address ("53 Mountain Rd, Franklin, NC 28734")
    //   2. "[Town] Property"     → "Franklin Property"
    //   3. Fallback "Website Lead"
    // Never uses the Job Name, Customer Name, or Lead Notes.
    const rawLocName = payload.location_display_name
      || (address ? String(address) : (town ? `${town} Property` : "Website Lead"));
    const locName = rawLocName.length > 30 ? rawLocName.slice(0, 30) : rawLocName;
    const gateCodeSubmitted = payload.property?.gate_code;
    const gateCodeBool = gateCodeSubmitted === true
      || (typeof gateCodeSubmitted === "string" && gateCodeSubmitted.trim() !== "" && !/^(no|false|0|none)$/i.test(gateCodeSubmitted.trim()));
    const locRes = await paveFetch({
      $: { grantKey: JOBTREAD_API_KEY },
      createLocation: {
        $: {
          accountId,
          name: locName,
          address: address || null,
          // JobTread requires the "Is There a Gate Code?" boolean on every
          // Location. Sales Notes intentionally OMITTED — full website intake
          // summary lives ONLY in Job → Lead Notes (single-write rule).
          customFieldValues: buildLocationCustomFieldValues({
            gateCodeBool,
            contactName,
            phone: payload.contact?.phone,
            email: payload.contact?.email,
          }),
        },
        createdLocation: { id: {}, name: {} },
      },
    });
    const apiErrL = locRes?.error?.message || locRes?.error;
    if (apiErrL) return { ok: false, error: `createLocation: ${String(apiErrL).slice(0, 400)}` };
    const locationId: string | undefined = locRes?.createLocation?.createdLocation?.id;
    if (!locationId) return { ok: false, error: `createLocation returned no id: ${JSON.stringify(locRes).slice(0, 300)}` };

    // Step 3 — create Job under the Location
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
    if (apiErrJ) return { ok: false, error: `createJob: ${String(apiErrJ).slice(0, 400)}` };
    const jobId: string | undefined = jobRes?.createJob?.createdJob?.id;
    return { ok: true, id: jobId ?? accountId };
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let body: any = {};
  try { body = await req.json(); } catch { /* empty */ }

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
    const { data: failed } = await admin
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

  // Idempotency: a repeat submission carrying the same client key inside the
  // 10-minute window is ignored instead of creating duplicate CRM records.
  if (!body.force && isDuplicateSubmission(row as any, body.idempotency_key)) {
    return new Response(JSON.stringify({ ok: true, duplicate_ignored: true }), {
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