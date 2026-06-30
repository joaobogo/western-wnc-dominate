/**
 * Lead scoring — server-agnostic.
 * Higher = hotter. Range roughly 0–100.
 * Used for triage in the consultation_requests dashboard.
 */

export type ScoreInput = {
  serviceCategory?: string;        // "roofing" | "construction"
  projectType?: string;            // replacement | repair | storm | metal | synthetic | addition | outdoor | renovation
  timeline?: string;               // emergency | 30days | 90days | 6months | exploring
  hasPhotos?: boolean;
  hasPlans?: boolean | null;
  insuranceStatus?: string;        // active_claim | considering | none
  propertyType?: string;           // primary | second_home | rental | commercial
  town?: string;
  budgetReadiness?: string;        // ready | exploring | researching
  decisionMakerOnSite?: boolean;
  description?: string;
};

// Tier-1 priority towns from SEO strategy
const TIER_1_TOWNS = ["highlands", "cashiers", "franklin", "sylva"];

export function scoreLead(input: ScoreInput): number {
  let score = 0;

  // Timeline (intent strength)
  switch (input.timeline) {
    case "emergency": score += 35; break;
    case "30days":    score += 28; break;
    case "90days":    score += 18; break;
    case "6months":   score += 10; break;
    case "exploring": score += 4;  break;
  }

  // Active insurance claim = high-intent storm/replacement lead
  if (input.insuranceStatus === "active_claim") score += 15;

  // Project type weighting
  if (input.projectType === "replacement" || input.projectType === "metal" || input.projectType === "synthetic") score += 12;
  if (input.projectType === "storm") score += 14;
  if (input.projectType === "addition" || input.projectType === "outdoor") score += 10;

  // Construction: budget readiness + decision maker + plans
  if (input.budgetReadiness === "ready") score += 12;
  else if (input.budgetReadiness === "exploring") score += 6;
  if (input.decisionMakerOnSite) score += 6;
  if (input.hasPlans === true) score += 6;

  // Photos uploaded — concrete inspection signal
  if (input.hasPhotos) score += 8;

  // Property type
  if (input.propertyType === "primary") score += 6;
  if (input.propertyType === "second_home") score += 5;
  if (input.propertyType === "commercial") score += 4;

  // Tier-1 SEO market
  const t = (input.town || "").toLowerCase();
  if (TIER_1_TOWNS.some(x => t.includes(x))) score += 8;

  // Detailed description = serious shopper
  if ((input.description || "").trim().length >= 120) score += 6;

  return Math.max(0, Math.min(100, score));
}

export function leadTier(score: number): "hot" | "warm" | "nurture" {
  if (score >= 60) return "hot";
  if (score >= 35) return "warm";
  return "nurture";
}