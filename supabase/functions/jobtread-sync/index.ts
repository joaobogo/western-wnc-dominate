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

function buildHumanNote(row: LeadRow): string {
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

  section("Contact");
  kv("Name", row.name);
  kv("Phone", row.phone);
  kv("Secondary Phone", (row as any).secondary_phone ?? meta.secondary_phone ?? meta.phone2 ?? null);
  kv("Email", row.email);
  kv("Preferred Contact Method", row.preferred_contact_method);

  // Metadata fields that may carry extra property/project details submitted
  // by newer form variants without dedicated columns.
  const communityOrSubdivision =
    row.community_or_subdivision ?? meta.community_or_subdivision ?? meta.community ?? meta.subdivision ?? null;
  const gateCode = row.gate_code ?? meta.gate_code ?? meta.entry_code ?? null;
  const roofType = row.roof_type ?? meta.roof_type ?? null;
  const materialColor = row.material_color ?? meta.material_color ?? meta.color ?? null;
  const foundationType = row.foundation_type ?? meta.foundation_type ?? null;

  section("Property");
  kv("Town", row.property_town);
  kv("Address", row.property_address);
  kv("Community/Subdivision", communityOrSubdivision);
  kv("Gate Code", gateCode);
  kv("Property Type", row.property_type);

  section("Project");
  kv("Service Category", row.service_category);
  kv("Project Type", row.project_type);
  kv("Urgency", urgentRoofing ? `HIGH — ${humanizeValue(row.urgency) || "urgent"}` : row.urgency);
  if (isRoofingCategory) {
    kv("Roof Type", roofType);
    kv("Roofing Issue", row.roofing_issue_type ?? row.project_type);
    lines.push(`Water Actively Entering: ${waterEntering ? "Yes" : "No"}`);
    kv("Material Color", materialColor);
    kv("Approximate Roof Age", (row as any).roof_age ?? meta.roof_age ?? meta.date_of_roof ?? meta.roof_installed ?? null);
    kv("Material Interest", meta.material_interest ?? meta.material ?? null);
  }
  if (isConstructionCategory) {
    lines.push(`Plan Status: ${planStatusLabel || NP}`);
    kv("Foundation Type", foundationType);
  }

  const customerMessage = (row.project_description ?? "").toString().trim();
  section("Customer Message");
  lines.push(customerMessage || NP);

  section("Source");
  lines.push("Lead Source: Website");
  kv("Form", row.source);
  kv("Page URL", row.page_url);
  kv("Lead Type", row.lead_type);
  kv("Submitted At", row.created_at);
  kv("Referred By", (row as any).referral_source ?? meta.referral_source ?? meta.referred_by ?? meta.how_did_you_hear ?? null);

  section("Consent");
  lines.push(`Consent Given: ${row.consent_given === true ? "true" : row.consent_given === false ? "false" : NP}`);
  kv("Consent Text", row.consent_text);
  lines.push("Privacy Policy: https://highlandernc.com/privacy-policy");

  section("Tracking");
  kv("UTM Source", row.utm_source);
  kv("UTM Medium", row.utm_medium);
  kv("UTM Campaign", row.utm_campaign);
  kv("GCLID", row.gclid);
  kv("FBCLID", row.fbclid);
  kv("LinkedIn Attribution", row.li_fat_id);

  const photos = Array.isArray(row.photos_uploaded) ? row.photos_uploaded : [];
  const files = Array.isArray(row.files_uploaded) ? row.files_uploaded : [];
  const uploadLinks = [...photos, ...files]
    .map((v: any) => (typeof v === "string" ? v : v?.url ?? null))
    .filter(Boolean) as string[];
  section("Files");
  if (uploadLinks.length) {
    lines.push("Uploaded Files:");
    uploadLinks.forEach((link) => lines.push(`  • ${link}`));
  } else {
    lines.push("Uploaded Files: None");
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

function buildPayload(row: LeadRow, kind: "lead" | "chatbot") {
  const leadName = humanizeLeadName(row);
  const { urgent, waterEntering } = detectUrgentRoofing(row);
  // Derive a smart category from the readable lead name when the customer
  // did not pick one on the form. Keeps JobTread's job_type useful even for
  // generic contact/quote submissions.
  const inferredCategory = leadName.split(" - ")[0]?.trim() || "Website Lead";
  const jobType = row.service_category || row.lead_type || inferredCategory;
  const town = row.property_town ?? null;
  const serviceArea = town ? mapServiceAreaSafe(town) : null;
  // Detect city/service-area landing pages by URL pattern.
  const pageUrl: string = row.page_url ?? "";
  const cityPageMatch = pageUrl.match(/\/(?:service-area|areas|towns|locations|cities)\/([a-z0-9-]+)/i);
  const serviceAreaOrCityPage = cityPageMatch?.[1] ?? serviceArea ?? null;
  const photos = Array.isArray(row.photos_uploaded) ? row.photos_uploaded : [];
  const files = Array.isArray(row.files_uploaded) ? row.files_uploaded : [];
  const uploadedFileUrls = [...photos, ...files]
    .map((v: any) => (typeof v === "string" ? v : v?.url ?? null))
    .filter(Boolean);
  return {
    // Top-level fields most webhook receivers will look for
    lead_name: leadName,
    job_name: leadName,
    job_type: jobType,
    priority: urgent ? "P1" : "P3",
    urgency_level: urgent ? "high" : (row.urgency ?? "normal"),
    water_actively_entering: waterEntering,
    org_id: JOBTREAD_ORG_ID || null,
    // Structured sections
    contact: {
      name: row.name ?? null,
      phone: row.phone ?? null,
      email: row.email ?? null,
      preferred_contact_method: row.preferred_contact_method ?? null,
    },
    property: {
      property_address: row.property_address ?? null,
      property_town: town,
      service_area_or_city_page: serviceAreaOrCityPage,
      property_type: row.property_type ?? null,
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
      li_fat_id: row.li_fat_id ?? null,
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
    note: buildHumanNote(row),
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
  if (/design/.test(key)) return "Architectural Design";
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
]);
function scrubDescription<T extends Record<string, any>>(input: T): T {
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

async function sendToPaveApi(payload: any): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const orgId = JOBTREAD_ORG_ID;
    if (!orgId) {
      return { ok: false, error: "Missing JOBTREAD_ORG_ID (Highlander org). Cannot create JobTread records." };
    }

    const contactName = payload.contact?.name || "Website Lead";
    const town = payload.location?.town;
    const address = payload.location?.address;

    const noteFull: string = payload.note ?? "";
    // JobTread text custom fields cap at 1024 chars.
    const noteShort = noteFull.length > 1000
      ? noteFull.slice(0, 990) + "\n…[truncated]"
      : noteFull;

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
                { "=": [{ field: "name" }, { value: payload.lead_name }] },
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
            name: payload.lead_name,
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

    // Step 1b — create a Contact under the Account so JobTread's
    // "Contact Details" section (Name / Email / Phone) is populated,
    // not just the Location custom fields. Only run on brand-new accounts
    // to avoid duplicate contacts on re-synced leads. Guarded: any Pave
    // schema mismatch is swallowed so it never blocks the job creation.
    if (accountIsNew) {
      const contactName = (payload.contact?.name ?? "").toString().trim();
      const contactEmail = (payload.contact?.email ?? "").toString().trim();
      const contactPhone = (payload.contact?.phone ?? "").toString().trim();
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
    // Display Name format (per Highlander spec):
    //   "[Customer Name] - [Town] Property"  → e.g. "John Smith - Highlands Property"
    // If customer name is missing:
    //   "[Town] Property"                    → e.g. "Highlands Property"
    // Final fallback: "Website Lead".
    const rawLocName = (() => {
      if (contactName && town) return `${contactName} - ${town} Property`;
      if (town) return `${town} Property`;
      if (contactName) return `${contactName} Property`;
      return "Website Lead";
    })();
    const locName = rawLocName.length > 30 ? rawLocName.slice(0, 30) : rawLocName;
    const locRes = await paveFetch({
      $: { grantKey: JOBTREAD_API_KEY },
      createLocation: {
        $: {
          accountId,
          name: locName,
          address: address || null,
          customFieldValues: {
            // JobTread requires the "Is There a Gate Code?" boolean field on
            // every Location. The website form does not collect gate access,
            // so we send `false` as the safe default; Highlander updates it
            // manually if the property actually has a gate.
            [JT_CF.location.gate_code]: false,
            [JT_CF.location.contact_name]: contactName,
            [JT_CF.location.phone]: payload.contact?.phone || "",
            [JT_CF.location.email]: payload.contact?.email || "",
            // Sales Notes intentionally OMITTED from the payload — full
            // website intake summary lives ONLY in Job → Lead Notes
            // (per Highlander/Robert). Sending the same note here made it
            // appear twice in JobTread.
          },
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
          customFieldValues: {
            [JT_CF.job.status]: "01 New Lead (Needs Appointment)",
            [JT_CF.job.job_type]: mapJobType(payload),
            [JT_CF.job.scope_type]: mapScopeType(payload),
            [JT_CF.job.comm_pref]: mapCommPref(payload.contact?.preferred_contact_method),
            [JT_CF.job.customer_present]: false,
            [JT_CF.job.lead_notes]: noteShort,
          },
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
      .lt("jobtread_retry_count", 5)
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
      jobtread_error_message: sanitizeError(missing),
      jobtread_retry_count: (row.jobtread_retry_count ?? 0) + 1,
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
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
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
  } else {
    await admin.from(table).update({
      jobtread_sync_status: "failed",
      jobtread_last_attempt_at: nowIso,
      jobtread_error_message: sanitizeError(result.error ?? "Unknown JobTread error"),
      jobtread_retry_count: (row.jobtread_retry_count ?? 0) + 1,
      ...(supportsPayloadCol ? { jobtread_payload: payload } : {}),
    }).eq("id", id);
  }

  // Never leak raw upstream error text back to the caller.
  const safeResult = result.ok
    ? result
    : { ok: false, error: "sync_failed", retryable: true };
  return new Response(JSON.stringify(safeResult), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});