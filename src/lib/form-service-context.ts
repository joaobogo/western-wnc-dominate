/**
 * Page-aware service preselect for intake forms.
 *
 * The visitor already told us what they need by landing on a service page,
 * so the form should not ask again. We resolve the project type from the
 * current path (and from ?service= when a CTA passes one explicitly).
 */
export type ProjectTypeValue =
  | "roof-repair"
  | "roof-replacement"
  | "metal-roofing"
  | "storm-damage"
  | "addition"
  | "outdoor-living"
  | "commercial"
  | "not-sure";

const PATH_RULES: Array<[RegExp, ProjectTypeValue]> = [
  [/^\/roofing\/(roof-)?repair/, "roof-repair"],
  [/^\/roofing\/(roof-)?replacement/, "roof-replacement"],
  [/^\/roofing\/(metal|standing-seam)/, "metal-roofing"],
  [/^\/roofing\/(storm|emergency|hail|wind)/, "storm-damage"],
  [/^\/storm/, "storm-damage"],
  [/^\/roofing\/commercial/, "commercial"],
  [/^\/commercial/, "commercial"],
  [/^\/roofing\/(brava-synthetic|specialty|residential|skylights|gutters)/, "roof-replacement"],
  [/^\/roofing/, "roof-repair"],
  [/^\/construction\/(additions|renovations|siding)/, "addition"],
  [/^\/construction\/outdoor-living/, "outdoor-living"],
  [/^\/construction/, "addition"],
];

const VALID = new Set<string>([
  "roof-repair", "roof-replacement", "metal-roofing", "storm-damage",
  "addition", "outdoor-living", "commercial", "not-sure",
]);

/** Resolve the project type implied by the page the form is rendered on. */
export function projectTypeFromPage(pathname?: string, search?: string): ProjectTypeValue | "" {
  if (typeof window === "undefined" && pathname === undefined) return "";
  const path = (pathname ?? window.location.pathname ?? "").toLowerCase();
  const qs = search ?? (typeof window !== "undefined" ? window.location.search : "");

  try {
    const explicit = new URLSearchParams(qs).get("service");
    if (explicit && VALID.has(explicit)) return explicit as ProjectTypeValue;
  } catch { /* ignore malformed query strings */ }

  // Service-town landing pages: /roofing/<service>/<town> style slugs.
  for (const [pattern, value] of PATH_RULES) {
    if (pattern.test(path)) return value;
  }
  if (/repair|leak/.test(path)) return "roof-repair";
  if (/storm|hail/.test(path)) return "storm-damage";
  return "";
}

export const PROJECT_TYPE_LABELS: Record<ProjectTypeValue, string> = {
  "roof-repair": "Roof Repair or Leak",
  "roof-replacement": "Roof Replacement",
  "metal-roofing": "Metal Roofing",
  "storm-damage": "Storm or Insurance",
  addition: "Addition or Remodel",
  "outdoor-living": "Deck, Porch, Outdoor",
  commercial: "Commercial Property",
  "not-sure": "Not Sure Yet",
};
