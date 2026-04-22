import { seoAuditRoutes, type AuditRoute } from "@/lib/seo-launch-qa";

export type MonitoringIssueType = "404" | "crawl" | "robots" | "sitemap" | "index";
export type MonitoringSeverity = "critical" | "warning" | "info";

export interface MonitoringIssue {
  id: string;
  type: MonitoringIssueType;
  severity: MonitoringSeverity;
  title: string;
  detail: string;
  path?: string;
  href?: string;
  meta?: Record<string, unknown>;
}

export interface MonitoringPageCheck {
  path: string;
  label: string;
  title: string;
  robots: string;
  canonical: string;
  issues: MonitoringIssue[];
}

export interface SitemapCoverageReport {
  missingEntries: MonitoringIssue[];
  staleEntries: MonitoringIssue[];
  discoveredEntries: string[];
}

const INTERNAL_MONITORING_EXCLUSIONS = new Set([
  "/seo-checklist",
  "/internal-linking-qa",
  "/keyword-map",
  "/seo-launch-qa",
  "/seo-monitoring",
]);

export const monitoringRoutes = seoAuditRoutes.filter((route) => !INTERNAL_MONITORING_EXCLUSIONS.has(route.path));

export const normalizePath = (value?: string | null) => {
  if (!value) return "";

  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(value, window.location.origin);
    return `${url.pathname.replace(/\/$/, "") || "/"}${url.search}`;
  } catch {
    return value.startsWith("/") ? value.replace(/\/$/, "") || "/" : value;
  }
};

export const fetchSitemapEntries = async () => {
  const response = await fetch("/sitemap.xml", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load sitemap.xml (${response.status})`);
  }

  const xml = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  return Array.from(doc.querySelectorAll("url > loc"))
    .map((node) => normalizePath(node.textContent))
    .filter(Boolean);
};

export const buildSitemapCoverageReport = (sitemapEntries: string[], routes: AuditRoute[] = monitoringRoutes): SitemapCoverageReport => {
  const expectedEntries = routes.map((route) => normalizePath(route.path)).filter(Boolean);
  const expectedSet = new Set(expectedEntries);
  const sitemapSet = new Set(sitemapEntries.map((entry) => normalizePath(entry)).filter(Boolean));

  const missingEntries = expectedEntries
    .filter((entry) => !sitemapSet.has(entry))
    .map((entry) => ({
      id: `missing-${entry}`,
      type: "sitemap" as const,
      severity: "critical" as const,
      title: "Missing from sitemap",
      detail: `${entry} exists in the route inventory but is not present in sitemap.xml.`,
      path: entry,
      href: entry,
    }));

  const staleEntries = Array.from(sitemapSet)
    .filter((entry) => entry.startsWith("/") && !expectedSet.has(entry))
    .map((entry) => ({
      id: `stale-${entry}`,
      type: "sitemap" as const,
      severity: "warning" as const,
      title: "Stale sitemap URL",
      detail: `${entry} appears in sitemap.xml but is not part of the current public route inventory.`,
      path: entry,
      href: entry,
    }));

  return {
    missingEntries,
    staleEntries,
    discoveredEntries: Array.from(sitemapSet),
  };
};

export const auditMonitoringPage = (doc: Document, route: AuditRoute): MonitoringPageCheck => {
  const title = doc.title.trim();
  const robots = (doc.querySelector('meta[name="robots"]') as HTMLMetaElement | null)?.content?.trim() || "";
  const canonical = (doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href?.trim() || "";
  const expectedCanonical = `${window.location.origin}${route.path}`;
  const issues: MonitoringIssue[] = [];

  if (/404|not found/i.test(title)) {
    issues.push({
      id: `crawl-404-${route.path}`,
      type: "crawl",
      severity: "critical",
      title: "Route resolves to a 404 state",
      detail: `${route.path} rendered a not-found page during the monitoring crawl.`,
      path: route.path,
      href: route.path,
    });
  }

  if (!canonical) {
    issues.push({
      id: `canonical-missing-${route.path}`,
      type: "crawl",
      severity: "warning",
      title: "Canonical tag missing",
      detail: `${route.path} does not expose a canonical tag in the rendered document head.`,
      path: route.path,
      href: route.path,
    });
  } else if (canonical !== expectedCanonical) {
    issues.push({
      id: `canonical-mismatch-${route.path}`,
      type: "crawl",
      severity: "warning",
      title: "Canonical mismatch",
      detail: `${route.path} points canonical to ${canonical} instead of ${expectedCanonical}.`,
      path: route.path,
      href: route.path,
    });
  }

  if (robots && /(noindex|nofollow)/i.test(robots)) {
    issues.push({
      id: `robots-blocked-${route.path}`,
      type: "robots",
      severity: "critical",
      title: "Robots directive blocks crawling or indexing",
      detail: `${route.path} is publishing robots directives: ${robots}.`,
      path: route.path,
      href: route.path,
    });
  }

  return {
    path: route.path,
    label: route.label,
    title,
    robots,
    canonical,
    issues,
  };
};

export const groupIssuesByType = (issues: MonitoringIssue[]) => ({
  notFound: issues.filter((issue) => issue.type === "404"),
  crawl: issues.filter((issue) => issue.type === "crawl" || issue.type === "robots"),
  sitemap: issues.filter((issue) => issue.type === "sitemap"),
  index: issues.filter((issue) => issue.type === "index"),
});