/**
 * Urgent-intent routing + analytics page typing (CRO Prompt 12).
 *
 * Urgent roofing buyers (active leak, storm damage) call — they don't fill
 * forms. This module is the single source of truth for which routes are
 * urgent, and it also derives the `page_type` / `town` dimensions every
 * phone_click is reported with.
 */

/** Service slugs that carry urgent, "it's happening right now" intent. */
const URGENT_SERVICE_SLUGS = ["roof-repair", "storm-damage", "emergency-roof-repair"];

const clean = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

/** True for roof repair, storm damage, emergency and town+service repair pages. */
export function isUrgentIntentPath(pathname: string): boolean {
  const path = clean(pathname);
  if (path.startsWith("/roofing/roof-repair")) return true;
  if (path.startsWith("/roofing/storm-damage")) return true;
  if (path.startsWith("/storm-damage")) return true;
  if (path.startsWith("/storm-center")) return true;
  if (path.includes("emergency")) return true;
  // /service-areas/:town/:service and flat /:town-roof-repair-nc style URLs
  if (URGENT_SERVICE_SLUGS.some((s) => path.includes(`/${s}`))) return true;
  if (/-(roof-repair|storm-damage|emergency-roof-repair)-/.test(path)) return true;
  return false;
}

/** Coarse page type used as an analytics dimension on phone_click. */
export function getAnalyticsPageType(pathname: string): string {
  const path = clean(pathname);
  if (path === "/") return "home";
  if (path.startsWith("/blog")) return "blog";
  if (path.startsWith("/counties/")) return "county";
  if (/^\/service-areas\/[^/]+\/[^/]+$/.test(path)) return "town_service";
  if (path.startsWith("/service-areas/")) return "town";
  if (path.startsWith("/service-areas")) return "service_areas";
  if (path.startsWith("/storm-center") || path.startsWith("/storm-damage")) return "storm";
  if (path.startsWith("/roofing")) return "service_roofing";
  if (path.startsWith("/construction")) return "service_construction";
  if (/^\/[a-z0-9-]+-(roofing|roof-repair|roof-replacement|metal-roofing|storm-damage)-[a-z0-9-]+$/.test(path)) {
    return "town_service";
  }
  if (/intake|consultation|quote|request-inspection|contact/.test(path)) return "intake";
  return "other";
}

/** Best-effort town slug from the URL, used to segment phone_click by market. */
export function getTownSlugFromPath(pathname: string): string | null {
  const path = clean(pathname);
  const areas = path.match(/^\/service-areas\/([a-z0-9-]+)/);
  if (areas) return areas[1];
  const flat = path.match(/^\/([a-z0-9-]+?)-(?:roofing|roof-repair|roof-replacement|metal-roofing|storm-damage)-[a-z0-9-]+$/);
  if (flat) return flat[1];
  return null;
}

/** One-line reason to call rather than write, tuned to the urgent context. */
export function getCallReason(pathname: string, townName?: string | null): string {
  const path = clean(pathname);
  const where = townName ? ` in ${townName}` : "";
  if (path.includes("storm")) {
    return `Storm damage moves fast — calling gets a real person who can prioritize your assessment${where} and start the insurance documentation today.`;
  }
  if (path.includes("emergency")) {
    return `An active emergency is faster by phone — we can triage the roof${where} and dispatch the nearest crew while you're on the line.`;
  }
  if (!townName) {
    return "An active leak can't wait on email — call and we'll triage on the phone and get an inspection on the schedule.";
  }
  return `An active leak can't wait on email — call and we'll triage the roof${where} on the phone and get an inspection on the schedule.`;
}
