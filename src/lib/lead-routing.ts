/**
 * Lead routing & qualification — derives a normalized routing payload
 * from builder/intake submissions. Used to populate metadata.routing
 * and metadata.jobtread inside consultation_requests so the internal
 * team (and a future JobTread sync) receives consistent structure.
 */

import { leadTier } from "./lead-scoring";

const TIER_1_TOWNS = ["highlands", "cashiers", "franklin", "sylva"];

export type Lane =
  | "emergency"     // active leak / storm — same-day call
  | "express"       // 30d timeline, hot score — 24h call
  | "qualified"     // plans/photos/architect involvement — senior PM
  | "concierge"     // signature tier, second home, ARB community
  | "standard"      // normal pipeline
  | "nurture";      // exploring, no urgency

export type RoutingPayload = {
  source: "roofing_intake" | "construction_intake" | "roofing_builder" | "construction_builder";
  division: "roofing" | "construction";
  lane: Lane;
  tier: ReturnType<typeof leadTier>;
  score: number;
  assigned_queue: string;        // who picks it up internally
  priority: "P1" | "P2" | "P3";
  tags: string[];                // searchable triage tags
  qualification_notes: string[]; // human-readable bullets for the team
  internal_summary: string;      // one-line summary surfaced in notifications
};

export type JobTreadPayload = {
  job_type: string;              // maps to JobTread job_type field
  job_name: string;              // "Smith — Standing Seam Replacement (Highlands)"
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  location: {
    town: string;
    property_type: string;
  };
  custom_fields: Record<string, unknown>;
  source_form: string;
  estimated_priority: "P1" | "P2" | "P3";
};

/* ───────────────── ROOFING ───────────────── */

export type RoofingRoutingInput = {
  source: "roofing_intake" | "roofing_builder";
  score: number;
  contact: { name: string; email: string; phone: string };
  projectType?: string;            // replacement | metal_upgrade | synthetic_upgrade | repair | storm
  material?: string;
  priorities?: string[];
  features?: string[];
  investment?: string;
  timeline?: string;
  propertyType?: string;
  town?: string;
  hasPhotos?: boolean;
  insuranceStatus?: string;
};

export function deriveRoofingRouting(input: RoofingRoutingInput): {
  routing: RoutingPayload;
  jobtread: JobTreadPayload;
} {
  const tags: string[] = [`source:${input.source}`];
  const notes: string[] = [];
  let lane: Lane = "standard";

  // Emergency / storm
  if (input.timeline === "emergency") {
    lane = "emergency";
    notes.push("Active issue — same-day callback required.");
    tags.push("urgency:emergency");
  } else if (input.timeline === "30days") {
    lane = "express";
    tags.push("urgency:30d");
  }

  // Insurance / storm pathway
  if (input.insuranceStatus === "active_claim" || input.projectType === "storm") {
    tags.push("insurance:active");
    notes.push("Insurance involvement — route to storm specialist for documentation support.");
    if (lane === "standard") lane = "express";
  }

  // Premium signals → concierge
  const isPremiumMaterial = ["standing_seam_metal", "stamped_metal", "synthetic_brava", "cedar"].includes(input.material || "");
  const isPremiumProject = ["metal_upgrade", "synthetic_upgrade"].includes(input.projectType || "");
  const isSecondHome = input.propertyType === "second_home";
  if ((isPremiumMaterial || isPremiumProject || input.investment === "signature") && lane !== "emergency") {
    lane = "concierge";
    notes.push("Premium material / Signature tier — assign concierge advisor.");
    tags.push("tier:concierge");
  }

  if (isSecondHome) {
    tags.push("property:second_home");
    notes.push("Second home — flag for ARB documentation prep if Highlands/Cashiers club community.");
  }

  if (input.source === "roofing_builder") {
    tags.push("channel:builder");
    notes.push("Submitted via Roofing Builder — full scope brief attached in metadata.builder.");
  }

  if (input.hasPhotos) {
    tags.push("has:photos");
    notes.push("Photos uploaded — pre-review before site visit.");
  }

  const tier = leadTier(input.score);
  if (tier === "nurture" && lane === "standard") lane = "nurture";

  const t = (input.town || "").toLowerCase();
  if (TIER_1_TOWNS.some((x) => t.includes(x))) tags.push("market:tier1");

  const priority: RoutingPayload["priority"] =
    lane === "emergency" ? "P1" : lane === "express" || lane === "concierge" ? "P2" : "P3";

  const assigned_queue =
    lane === "emergency" ? "roofing-emergency"
    : lane === "concierge" ? "roofing-concierge"
    : lane === "express" ? "roofing-express"
    : lane === "nurture" ? "roofing-nurture"
    : "roofing-standard";

  const projectLabel = humanizeRoofingProject(input.projectType, input.material);
  const townLabel = input.town?.trim() || "WNC";
  const internal_summary = `${tier.toUpperCase()} · ${lane.toUpperCase()} · ${projectLabel} · ${townLabel} · ${input.contact.name}`;

  const routing: RoutingPayload = {
    source: input.source,
    division: "roofing",
    lane,
    tier,
    score: input.score,
    assigned_queue,
    priority,
    tags,
    qualification_notes: notes,
    internal_summary,
  };

  const jobtread: JobTreadPayload = {
    job_type: jobTreadRoofingType(input.projectType, input.material),
    job_name: `${input.contact.name} — ${projectLabel} (${townLabel})`,
    contact: input.contact,
    location: { town: townLabel, property_type: input.propertyType || "" },
    custom_fields: {
      material_system: input.material || null,
      system_features: input.features || [],
      priorities: input.priorities || [],
      investment_tier: input.investment || null,
      insurance_status: input.insuranceStatus || null,
      lead_score: input.score,
      lane,
      tier,
    },
    source_form: input.source,
    estimated_priority: priority,
  };

  return { routing, jobtread };
}

function humanizeRoofingProject(type?: string, material?: string): string {
  const t: Record<string, string> = {
    replacement: "Full Replacement",
    metal_upgrade: "Metal Upgrade",
    synthetic_upgrade: "Synthetic / Brava Upgrade",
    repair: "Targeted Repair",
    storm: "Storm Damage",
  };
  const m: Record<string, string> = {
    standing_seam_metal: "Standing Seam",
    stamped_metal: "Stamped Metal Shake",
    synthetic_brava: "Brava",
    architectural_asphalt: "Architectural Asphalt",
    premium_asphalt: "Designer Asphalt",
    cedar: "Cedar",
  };
  const baseLabel = t[type || ""] || "Roofing Project";
  const matLabel = m[material || ""];
  return matLabel ? `${matLabel} ${baseLabel}` : baseLabel;
}

function jobTreadRoofingType(type?: string, material?: string): string {
  if (type === "repair") return "Roofing — Repair";
  if (type === "storm") return "Roofing — Storm / Insurance";
  if (material === "standing_seam_metal" || material === "stamped_metal" || type === "metal_upgrade") return "Roofing — Metal";
  if (material === "synthetic_brava" || type === "synthetic_upgrade") return "Roofing — Synthetic/Brava";
  if (material === "cedar") return "Roofing — Cedar";
  return "Roofing — Replacement";
}

/* ─────────────── CONSTRUCTION ─────────────── */

export type ConstructionRoutingInput = {
  source: "construction_intake" | "construction_builder";
  score: number;
  contact: { name: string; email: string; phone: string };
  projectType?: string;             // addition | porch | deck | outdoor_living | flatwork | renovation | not_sure
  scopeItems?: string[];
  style?: string;
  priorities?: string[];
  investment?: string;
  timeline?: string;
  propertyType?: string;
  planningStage?: string;           // just_exploring | have_ideas | concept_sketches | full_plans
  decisionMakers?: string;          // solo | couple | family | architect
  hasPlans?: boolean;
  hasPhotos?: boolean;
  town?: string;
};

export function deriveConstructionRouting(input: ConstructionRoutingInput): {
  routing: RoutingPayload;
  jobtread: JobTreadPayload;
} {
  const tags: string[] = [`source:${input.source}`];
  const notes: string[] = [];
  let lane: Lane = "standard";

  if (input.timeline === "30days") {
    lane = "express";
    tags.push("urgency:30d");
  }

  // Plans uploaded OR architect involvement = qualified — assign senior PM
  const architectInvolved = input.decisionMakers === "architect";
  const hasFullPlans = input.planningStage === "full_plans" || input.hasPlans === true;
  if (architectInvolved || hasFullPlans) {
    lane = "qualified";
    tags.push("qualified:plans-or-architect");
    notes.push(
      hasFullPlans
        ? "Full plans / drawings uploaded — fast-track to senior PM for review before walkthrough."
        : "Working with an architect — route to senior PM for design coordination.",
    );
  }

  // Additions, structural integration, and Signature tier → concierge
  const isAddition = input.projectType === "addition";
  const hasStructural = (input.scopeItems || []).some((s) =>
    ["attached_addition", "roof_tie_in", "site_work"].includes(s),
  );
  if (isAddition || hasStructural) {
    notes.push("Addition / structural-integration scope — design-heavy qualification required.");
    tags.push("design:additions");
    if (lane === "standard") lane = "qualified";
  }

  if (input.investment === "signature") {
    lane = "concierge";
    notes.push("Signature investment tier — assign concierge advisor.");
    tags.push("tier:concierge");
  }

  // Not-sure / exploring → nurture
  if (input.projectType === "not_sure" || input.planningStage === "just_exploring" || input.timeline === "exploring") {
    if (lane === "standard") lane = "nurture";
    notes.push("Early-stage — schedule a discovery conversation, not a full walkthrough.");
    tags.push("stage:early");
  }

  if (input.source === "construction_builder") {
    tags.push("channel:builder");
    notes.push("Submitted via Construction Builder — full scope brief attached in metadata.builder.");
  }

  if (input.hasPhotos) {
    tags.push("has:files");
    notes.push("Files / inspiration uploaded — review before first call.");
  }

  if (input.propertyType === "second_home") {
    tags.push("property:second_home");
    notes.push("Second home — confirm access logistics during scheduling.");
  }

  const t = (input.town || "").toLowerCase();
  if (TIER_1_TOWNS.some((x) => t.includes(x))) tags.push("market:tier1");

  const tier = leadTier(input.score);
  const priority: RoutingPayload["priority"] =
    lane === "express" || lane === "concierge" ? "P2" : lane === "qualified" ? "P2" : "P3";

  const assigned_queue =
    lane === "concierge" ? "construction-concierge"
    : lane === "qualified" ? "construction-senior-pm"
    : lane === "express" ? "construction-express"
    : lane === "nurture" ? "construction-nurture"
    : "construction-standard";

  const projectLabel = humanizeConstructionProject(input.projectType);
  const townLabel = input.town?.trim() || "WNC";
  const internal_summary = `${tier.toUpperCase()} · ${lane.toUpperCase()} · ${projectLabel} · ${townLabel} · ${input.contact.name}`;

  const routing: RoutingPayload = {
    source: input.source,
    division: "construction",
    lane,
    tier,
    score: input.score,
    assigned_queue,
    priority,
    tags,
    qualification_notes: notes,
    internal_summary,
  };

  const jobtread: JobTreadPayload = {
    job_type: jobTreadConstructionType(input.projectType),
    job_name: `${input.contact.name} — ${projectLabel} (${townLabel})`,
    contact: input.contact,
    location: { town: townLabel, property_type: input.propertyType || "" },
    custom_fields: {
      scope_items: input.scopeItems || [],
      style: input.style || null,
      priorities: input.priorities || [],
      investment_tier: input.investment || null,
      planning_stage: input.planningStage || null,
      decision_makers: input.decisionMakers || null,
      has_plans: !!hasFullPlans,
      architect_involved: architectInvolved,
      lead_score: input.score,
      lane,
      tier,
    },
    source_form: input.source,
    estimated_priority: priority,
  };

  return { routing, jobtread };
}

function humanizeConstructionProject(type?: string): string {
  const t: Record<string, string> = {
    addition: "Addition / Extension",
    porch: "Porch",
    deck: "Deck",
    outdoor_living: "Outdoor Living",
    flatwork: "Fire Pit / Flatwork",
    renovation: "Targeted Remodel",
    not_sure: "Discovery (Project Undecided)",
  };
  return t[type || ""] || "Construction Project";
}

function jobTreadConstructionType(type?: string): string {
  if (type === "addition") return "Construction — Addition";
  if (type === "porch") return "Construction — Porch";
  if (type === "deck") return "Construction — Deck";
  if (type === "outdoor_living") return "Construction — Outdoor Living";
  if (type === "flatwork") return "Construction — Flatwork / Hardscape";
  if (type === "renovation") return "Construction — Remodel";
  return "Construction — Discovery";
}