/**
 * Page-level primary action hierarchy (CRO Phase 1).
 *
 * Every page gets exactly ONE primary action. Everything else on the page is
 * secondary. This module is the single source of truth so the sticky bar,
 * closing CTAs and measurement all agree on what "converted" means per page.
 *
 * Language follows src/lib/cta-config.ts rules — no banned terms.
 */

export type PrimaryIntent = "call" | "form";

export interface PagePrimaryAction {
  /** Stable key used in analytics (primary_cta_click.page_key). */
  pageKey: string;
  /** The one action this page is optimized for. */
  intent: PrimaryIntent;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const PHONE_HREF = "tel:+18285247773";

const callFirst = (pageKey: string, label = "Call Direct"): PagePrimaryAction => ({
  pageKey,
  intent: "call",
  primaryLabel: label,
  primaryHref: PHONE_HREF,
  secondaryLabel: "Request Estimate",
  secondaryHref: "/consultation",
});

const formFirst = (
  pageKey: string,
  label = "Request Estimate",
  href = "/consultation",
): PagePrimaryAction => ({
  pageKey,
  intent: "form",
  primaryLabel: label,
  primaryHref: href,
  secondaryLabel: "Call Direct",
  secondaryHref: PHONE_HREF,
});

/**
 * Urgent, high-intent routes convert far better on a phone call than on a
 * form. Everything else leads with the estimate request.
 */
export function getPagePrimaryAction(pathname: string): PagePrimaryAction {
  const path = pathname.replace(/\/+$/, "") || "/";

  // Urgent roofing intent → call first.
  if (path.startsWith("/roofing/roof-repair")) return callFirst("roof_repair");
  if (path.startsWith("/roofing/storm-damage")) return callFirst("storm_damage");
  if (path.startsWith("/storm-center")) return callFirst("storm_center");

  // Local intent → call first (local searchers expect to reach a person).
  if (path.startsWith("/service-areas/")) return callFirst("town");
  if (path.startsWith("/counties/")) return callFirst("county");
  if (/^\/[a-z0-9-]+-(roofing|roof-repair|roof-replacement|metal-roofing)-[a-z0-9-]+$/.test(path)) {
    return callFirst("town_service");
  }

  // Considered / planning intent → form first.
  if (path.startsWith("/construction")) {
    return formFirst("construction", "Schedule a Project Consultation", "/construction-intake");
  }
  if (path.startsWith("/roofing")) {
    return formFirst("roofing", "Request a Roof Consultation", "/roofing-intake");
  }
  if (path.startsWith("/blog")) return formFirst("blog", "Talk With Our Team");
  if (path.startsWith("/projects") || path.startsWith("/recent-projects") || path.startsWith("/gallery")) {
    return formFirst("gallery", "Start a Similar Project");
  }
  if (path === "/") return formFirst("home", "Request Estimate");

  return formFirst("general");
}
