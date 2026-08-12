/**
 * Lead scoring — server-agnostic, deterministic, always 0–100.
 *
 * The score is built from weighted factors, each capped at its own maximum so
 * no single answer can dominate the result:
 *
 *   Timeline / urgency ....... 30
 *   Service + project type ... 18
 *   Budget range ............. 14
 *   Insurance status ......... 10
 *   Property type ............ 10
 *   Plans / documents ........ 10
 *   Engagement signals ....... 8   (photos, detail, decision maker)
 *   Market priority .......... 5
 *   Optional intent bonus .... caller-supplied (builders, quote flows)
 *
 * 70+ is the "Hot" band that triggers the urgent response workflow: a
 * distinct Teams alert and top placement in the admin leads dashboard.
 */

export type ScoreInput = {
  serviceCategory?: string;        // roofing | construction | commercial | ...
  projectType?: string;            // replacement | repair | storm | metal | synthetic | addition | outdoor | renovation
  timeline?: string;               // emergency | 30days | 90days | 6months | exploring
  urgency?: string;                // free text: emergency, active leak, asap, planning...
  hasPhotos?: boolean;
  hasPlans?: boolean | null;
  insuranceStatus?: string;        // active_claim | considering | none
  propertyType?: string;           // primary | second_home | rental | commercial
  town?: string;
  budgetRange?: string;            // "under_10k" | "10k_25k" | "$25,000 - $50,000" | "100k+" ...
  budgetReadiness?: string;        // ready | exploring | researching
  decisionMakerOnSite?: boolean;
  description?: string;
  /** Extra intent points for higher-commitment entry points (e.g. builders). */
  bonus?: number;
};

/** Score at or above which a lead is treated as urgent. */
export const HOT_LEAD_SCORE = 70;

// Tier-1 priority towns from the SEO strategy.
const TIER_1_TOWNS = ["highlands", "cashiers", "franklin", "sylva", "cullowhee"];

const URGENT_RE = /emergency|urgent|asap|active leak|leaking|storm damage|immediately|right away/i;

const norm = (v: unknown) =>
  String(v ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");

/** Timeline + urgency wording, max 30. */
function timelineScore(input: ScoreInput): number {
  const t = norm(input.timeline);
  let s = 0;
  if (t.includes("emergency") || t.includes("asap")) s = 30;
  else if (t.includes("30") || t.includes("1_month") || t.includes("this_month")) s = 25;
  else if (t.includes("90") || t.includes("3_month")) s = 17;
  else if (t.includes("6_month") || t.includes("this_year")) s = 10;
  else if (t.includes("explor") || t.includes("research") || t.includes("plan")) s = 4;

  if (URGENT_RE.test(`${input.urgency ?? ""} ${input.description ?? ""}`)) {
    s = Math.max(s, 26);
  }
  return Math.min(30, s);
}

/** Service category + project type, max 18. */
function projectScore(input: ScoreInput): number {
  const p = norm(input.projectType);
  const c = norm(input.serviceCategory);
  let s = 0;
  if (p.includes("storm")) s = 16;
  else if (p.includes("replacement") || p.includes("metal") || p.includes("synthetic") || p.includes("new_roof")) s = 14;
  else if (p.includes("addition") || p.includes("renovation") || p.includes("outdoor") || p.includes("remodel")) s = 11;
  else if (p.includes("repair")) s = 9;
  else if (p.includes("inspection") || p.includes("maintenance")) s = 6;

  // Roofing and commercial work convert faster than general inquiries.
  if (c.includes("roofing") || c.includes("commercial")) s += 2;
  else if (c) s += 1;
  return Math.min(18, s);
}

/** Budget range, max 14. Accepts labelled ranges or raw dollar text. */
function budgetScore(input: ScoreInput): number {
  const raw = String(input.budgetRange ?? "");
  const b = norm(raw);
  let s = 0;
  if (b) {
    // Highest number mentioned in the range drives the weight.
    const nums = (raw.match(/\d[\d,]*\s*k?/gi) ?? []).map((m) => {
      const n = Number(m.replace(/[,\s]/g, "").replace(/k$/i, ""));
      return /k$/i.test(m.trim()) ? n * 1000 : n;
    });
    const top = nums.length ? Math.max(...nums) : 0;
    if (top >= 100000) s = 14;
    else if (top >= 50000) s = 12;
    else if (top >= 25000) s = 10;
    else if (top >= 10000) s = 7;
    else if (top > 0) s = 4;
    else if (b.includes("not_sure") || b.includes("unsure") || b.includes("unknown")) s = 2;
  }
  // Stated readiness is worth points even without a dollar range.
  const r = norm(input.budgetReadiness);
  if (r === "ready") s = Math.max(s, 10);
  else if (r === "exploring") s = Math.max(s, 5);
  else if (r === "researching") s = Math.max(s, 3);
  return Math.min(14, s);
}

/** Insurance status, max 10. */
function insuranceScore(input: ScoreInput): number {
  const i = norm(input.insuranceStatus);
  if (i.includes("active") || i.includes("filed") || i.includes("approved")) return 10;
  if (i.includes("consider") || i.includes("planning") || i.includes("maybe")) return 5;
  return 0;
}

/** Property type, max 10. */
function propertyScore(input: ScoreInput): number {
  const p = norm(input.propertyType);
  if (p.includes("commercial")) return 10;
  if (p.includes("primary")) return 8;
  if (p.includes("second")) return 7;
  if (p.includes("rental") || p.includes("investment")) return 5;
  return 0;
}

/** Plans / drawings on hand, max 10. */
function plansScore(input: ScoreInput): number {
  if (input.hasPlans === true) return 10;
  if (input.hasPlans === false) return 2;
  return 0;
}

/** Engagement signals, max 8. */
function engagementScore(input: ScoreInput): number {
  let s = 0;
  if (input.hasPhotos) s += 4;
  if ((input.description ?? "").trim().length >= 120) s += 2;
  if (input.decisionMakerOnSite) s += 2;
  return Math.min(8, s);
}

/** Priority market, max 5. */
function marketScore(input: ScoreInput): number {
  const t = norm(input.town);
  return TIER_1_TOWNS.some((x) => t.includes(x)) ? 5 : 0;
}

export function scoreLead(input: ScoreInput): number {
  const total =
    timelineScore(input) +
    projectScore(input) +
    budgetScore(input) +
    insuranceScore(input) +
    propertyScore(input) +
    plansScore(input) +
    engagementScore(input) +
    marketScore(input) +
    (Number.isFinite(input.bonus) ? Number(input.bonus) : 0);

  return Math.max(0, Math.min(100, Math.round(total)));
}

/** Per-factor breakdown, useful for debugging triage decisions. */
export function scoreBreakdown(input: ScoreInput) {
  return {
    timeline: timelineScore(input),
    project: projectScore(input),
    budget: budgetScore(input),
    insurance: insuranceScore(input),
    property: propertyScore(input),
    plans: plansScore(input),
    engagement: engagementScore(input),
    market: marketScore(input),
    total: scoreLead(input),
  };
}

/** True when the lead should enter the urgent response workflow. */
export function isUrgentLead(score: number | null | undefined): boolean {
  return (typeof score === "number" ? score : 0) >= HOT_LEAD_SCORE;
}

export function leadTier(score: number): "hot" | "warm" | "nurture" {
  if (score >= 60) return "hot";
  if (score >= 35) return "warm";
  return "nurture";
}

/**
 * Four-tier triage label used by the Teams alerts and the admin dashboard.
 * Hot (70+) is the threshold that triggers the urgent response workflow.
 * `leadTier` above stays as-is because lead routing depends on its 3 tiers.
 */
export type LeadTierLabel = "Hot" | "Warm" | "Engaged" | "Cool";

export function leadTierLabel(score: number | null | undefined): LeadTierLabel {
  const s = typeof score === "number" ? score : 0;
  if (s >= HOT_LEAD_SCORE) return "Hot";
  if (s >= 50) return "Warm";
  if (s >= 30) return "Engaged";
  return "Cool";
}
