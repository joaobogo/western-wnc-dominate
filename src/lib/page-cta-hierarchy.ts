import { PHONE_TEL } from "@/data/business";
import { isUrgentIntentPath } from "@/lib/urgent-intent";

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

const PHONE_HREF = PHONE_TEL;

/** Where the ESTIMATE action lands. A roofing visitor tapping ESTIMATE used to
 *  go to the /consultation chooser and then 2.7 screens of preamble before the
 *  first question (mobile re-audit M-2). Send them to the matching intake. */
const ROOFING_INTAKE = "/roofing-intake";
const CONSTRUCTION_INTAKE = "/construction-intake";

const callFirst = (
  pageKey: string,
  label = "Call Direct",
  estimateHref = ROOFING_INTAKE,
): PagePrimaryAction => ({
  pageKey,
  intent: "call",
  primaryLabel: label,
  primaryHref: PHONE_HREF,
  secondaryLabel: "Get My Written Estimate",
  secondaryHref: estimateHref,
});

const formFirst = (
  pageKey: string,
  label = "Get My Written Estimate",
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

  // Urgent intent anywhere (incl. town+service repair / storm pages) → call.
  if (isUrgentIntentPath(path)) {
    if (path.startsWith("/roofing/roof-repair")) return callFirst("roof_repair");
    if (path.includes("storm")) return callFirst("storm_damage");
    if (path.startsWith("/service-areas/") || /-(roof-repair|storm-damage)-/.test(path)) {
      return callFirst("town_service_urgent");
    }
    return callFirst("urgent");
  }

  // Urgent roofing intent → call first.
  if (path.startsWith("/roofing/roof-repair")) return callFirst("roof_repair");
  if (path.startsWith("/roofing/storm-damage")) return callFirst("storm_damage");
  if (path.startsWith("/storm-center")) return callFirst("storm_center");

  // Cost and planning guides are research intent — someone comparing numbers is
  // not ready to dial. These stay form-first even though they sit under /roofing.
  if (path.includes("-cost") || path.endsWith("/cost") || path.startsWith("/roofing-cost")) {
    return formFirst("cost_guide", "Get My Written Estimate", "/request-inspection");
  }
  // /construction/consultation is itself the booking step; leading it with a
  // phone call would send people away from the form they came to complete.
  if (path.startsWith("/construction/consultation")) {
    return formFirst("consultation", "Book My Consultation", "/consultation");
  }

  // Money pages lead with the phone (João, 2026-09-08: calls are where the
  // conversions come from). The estimate request stays as the secondary action
  // on every one of them, so the high-intent form path is never removed.
  if (path.startsWith("/service-areas/")) return callFirst("town");
  if (path.startsWith("/counties/")) return callFirst("county");
  if (/^\/[a-z0-9-]+-(roofing|roof-repair|roof-replacement|metal-roofing)-[a-z0-9-]+$/.test(path)) {
    return callFirst("town_service");
  }
  if (path.startsWith("/construction")) return callFirst("construction", "Call Direct", CONSTRUCTION_INTAKE);
  if (path.startsWith("/roofing")) return callFirst("roofing");
  if (path.startsWith("/blog")) return formFirst("blog", "Get My Questions Answered");
  if (path.startsWith("/projects") || path.startsWith("/recent-projects") || path.startsWith("/gallery")) {
    return formFirst("gallery", "Get My Project Scoped");
  }
  // Home: the hero and header already lead with the call on phones; the bar and
  // the closing CTAs now agree (mobile re-audit M-1 — home was the one page
  // where the bar showed ESTIMATE filled and CALL outlined).
  if (path === "/") return callFirst("home");

  return formFirst("general");
}
