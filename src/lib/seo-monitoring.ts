import { seoAuditRoutes, type AuditRoute } from "@/lib/seo-launch-qa";

export type MonitoringIssueType = "404" | "crawl" | "robots" | "sitemap" | "index" | "keyword";
export type MonitoringSeverity = "critical" | "warning" | "info";

export interface MonitoringReportSnapshot {
  created_at: string;
  period_start: string;
  period_end: string;
  sitemap_status?: string | null;
  sitemap_url_count?: number | null;
  total_404s?: number | null;
  gsc_indexed_pages?: number | null;
  gsc_top_keywords?: unknown;
}

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

const INDEXATION_DROP_THRESHOLD = 0.1;
const SPIKE_THRESHOLD = 0.25;
const KEYWORD_MOVEMENT_THRESHOLD = 10;
const SITEMAP_STALE_DAYS = 7;

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
  keyword: issues.filter((issue) => issue.type === "keyword"),
});

const round = (value: number) => Math.round(value * 10) / 10;

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
};

const pickNumber = (entry: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = entry[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
};

const pickString = (entry: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = entry[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
};

const parseKeywordRows = (value: unknown) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      const entry = asRecord(item);
      if (!entry) return null;

      const keyword = pickString(entry, ["keyword", "query", "term", "search_term"]);
      const position = pickNumber(entry, ["position", "avg_position", "average_position", "rank"]);
      const page = pickString(entry, ["page", "url", "path", "landing_page"]);

      if (!keyword || position === null) return null;

      return {
        keyword,
        position,
        path: page ? normalizePath(page) : undefined,
      };
    })
    .filter(Boolean) as Array<{ keyword: string; position: number; path?: string }>;
};

export const buildReportDrivenIssues = (reports: MonitoringReportSnapshot[]): MonitoringIssue[] => {
  if (reports.length === 0) return [];

  const [latest, previous, ...older] = reports;
  const issues: MonitoringIssue[] = [];

  if (previous) {
    const latestPages = latest.gsc_indexed_pages ?? 0;
    const previousPages = previous.gsc_indexed_pages ?? 0;
    if (previousPages > 0) {
      const dropRatio = (previousPages - latestPages) / previousPages;
      if (dropRatio >= INDEXATION_DROP_THRESHOLD) {
        issues.push({
          id: `indexed-pages-drop-${latest.period_end}`,
          type: "index",
          severity: "critical",
          title: "Indexation dropped beyond threshold",
          detail: `Indexed pages fell ${round(dropRatio * 100)}% from ${previousPages} to ${latestPages} compared with the prior reporting window.`,
          path: "/seo-monitoring",
          href: "/seo-monitoring",
          meta: { drilldownTab: "index" },
        });
      }
    }
  }

  const baselineReports = [previous, ...older].filter(Boolean) as MonitoringReportSnapshot[];
  const baseline404s = baselineReports
    .map((report) => report.total_404s ?? null)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const latest404s = latest.total_404s ?? 0;
  if (baseline404s.length > 0) {
    const average404s = baseline404s.reduce((sum, value) => sum + value, 0) / baseline404s.length;
    if (average404s > 0) {
      const spikeRatio = (latest404s - average404s) / average404s;
      if (spikeRatio >= SPIKE_THRESHOLD) {
        issues.push({
          id: `404-spike-${latest.period_end}`,
          type: "404",
          severity: "critical",
          title: "404 volume spiked above baseline",
          detail: `404 counts reached ${latest404s}, which is ${round(spikeRatio * 100)}% above the recent baseline of ${round(average404s)}.`,
          path: "/seo-monitoring",
          href: "/seo-monitoring",
          meta: { drilldownTab: "notFound" },
        });
      }
    }
  }

  const sitemapAgeMs = Date.now() - new Date(latest.period_end).getTime();
  const sitemapAgeDays = sitemapAgeMs / (1000 * 60 * 60 * 24);
  if (sitemapAgeDays > SITEMAP_STALE_DAYS) {
    issues.push({
      id: `sitemap-stale-${latest.period_end}`,
      type: "sitemap",
      severity: "warning",
      title: "Sitemap fetch signal is stale",
      detail: `The latest sitemap status is ${round(sitemapAgeDays)} day(s) old. Refresh the monitoring source if the sitemap has not been fetched recently.`,
      path: "/sitemap.xml",
      href: "/sitemap.xml",
      meta: { drilldownTab: "sitemap" },
    });
  }

  if (latest.sitemap_status && !/(success|ok|submitted|read|fetched|healthy)/i.test(latest.sitemap_status)) {
    issues.push({
      id: `sitemap-status-${latest.period_end}`,
      type: "sitemap",
      severity: "critical",
      title: "Sitemap status needs attention",
      detail: `The latest sitemap status was reported as “${latest.sitemap_status}”.`,
      path: "/sitemap.xml",
      href: "/sitemap.xml",
      meta: { drilldownTab: "sitemap" },
    });
  }

  if (previous) {
    const latestKeywords = parseKeywordRows(latest.gsc_top_keywords);
    const previousKeywords = new Map(
      parseKeywordRows(previous.gsc_top_keywords).map((entry) => [entry.keyword.toLowerCase(), entry]),
    );

    latestKeywords.forEach((entry) => {
      const prior = previousKeywords.get(entry.keyword.toLowerCase());
      if (!prior) return;

      const delta = round(entry.position - prior.position);
      if (Math.abs(delta) < KEYWORD_MOVEMENT_THRESHOLD) return;

      const movedWorse = delta > 0;
      issues.push({
        id: `keyword-${entry.keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        type: "keyword",
        severity: movedWorse ? "critical" : "warning",
        title: `Keyword ${movedWorse ? "dropped" : "rose"} beyond threshold`,
        detail: `“${entry.keyword}” moved from position ${round(prior.position)} to ${round(entry.position)} (${delta > 0 ? "+" : ""}${delta}).`,
        path: entry.path,
        href: entry.path,
        meta: { drilldownTab: "keyword", keyword: entry.keyword, previousPosition: prior.position, currentPosition: entry.position },
      });
    });
  }

  return issues;
};