import { getPriorityInternalLinkImpact, type PriorityInternalLinkImpact } from "@/lib/internal-linking-qa";
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
  raw_data?: unknown;
}

export interface PriorityKeywordMovement {
  keyword: string;
  currentPosition: number;
  previousPosition: number | null;
  change: number | null;
}

export interface PriorityPageSummary {
  path: string;
  label: string;
  category: "service" | "town";
  keywordCount: number;
  movedKeywords: PriorityKeywordMovement[];
  internalLinkCount: number;
  previousInternalLinkCount: number | null;
  internalLinkDelta: number | null;
  internalLinkSeverity: string;
  previousInternalLinkSeverity: string | null;
}

export interface WeeklyPriorityMonitoringSummary {
  pages: PriorityPageSummary[];
  totals: {
    monitoredPages: number;
    pagesWithKeywordMovement: number;
    pagesWithInternalLinkChanges: number;
    pagesWithSeverityChanges: number;
  };
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
const PRIORITY_PAGE_TYPES = new Set<AuditRoute["pageType"]>(["service", "commercial", "town"]);
const severityWeight: Record<string, number> = { fail: 0, warning: 1, pass: 2 };

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
  // Canonicals are emitted in the trailing-slash form the server serves.
  const expectedCanonical = `${window.location.origin}${route.path === "/" ? "/" : `${route.path.replace(/\/+$/, "")}/`}`;
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

const parsePrioritySnapshot = (value: unknown) => {
  const root = asRecord(value);
  const priority = asRecord(root?.priorityMonitoring);
  const pages = Array.isArray(priority?.pages) ? priority.pages : [];

  return pages
    .map((item) => {
      const entry = asRecord(item);
      if (!entry) return null;

      const path = pickString(entry, ["path"]);
      const internalLinkCount = pickNumber(entry, ["internalLinkCount", "supportingLinkCount"]);
      const internalLinkSeverity = pickString(entry, ["internalLinkSeverity", "severity"]);

      if (!path) return null;

      return {
        path: normalizePath(path),
        internalLinkCount,
        internalLinkSeverity,
      };
    })
    .filter(Boolean) as Array<{ path: string; internalLinkCount: number | null; internalLinkSeverity: string | null }>;
};

export const priorityMonitoringRoutes = monitoringRoutes.filter((route) => PRIORITY_PAGE_TYPES.has(route.pageType));

export const buildWeeklyPriorityMonitoringSummary = (reports: MonitoringReportSnapshot[]): WeeklyPriorityMonitoringSummary => {
  const priorityLinkImpact = getPriorityInternalLinkImpact();
  const routeMap = new Map(priorityMonitoringRoutes.map((route) => [route.path, route]));
  const latest = reports[0];
  const previous = reports[1];

  const latestKeywordsByPath = new Map<string, Array<{ keyword: string; position: number }>>();
  parseKeywordRows(latest?.gsc_top_keywords).forEach((entry) => {
    const normalizedPath = normalizePath(entry.path);
    if (!normalizedPath || !routeMap.has(normalizedPath)) return;

    const list = latestKeywordsByPath.get(normalizedPath) ?? [];
    list.push({ keyword: entry.keyword, position: entry.position });
    latestKeywordsByPath.set(normalizedPath, list);
  });

  const previousKeywordIndex = new Map(
    parseKeywordRows(previous?.gsc_top_keywords).map((entry) => [`${normalizePath(entry.path)}::${entry.keyword.toLowerCase()}`, entry.position]),
  );

  const previousPrioritySnapshot = new Map(
    parsePrioritySnapshot(previous?.raw_data).map((entry) => [entry.path, entry]),
  );

  const pages = priorityLinkImpact
    .map((page): PriorityPageSummary | null => {
      const route = routeMap.get(page.path);
      if (!route) return null;

      const keywords = latestKeywordsByPath.get(page.path) ?? [];
      const movedKeywords = keywords
        .map((keyword) => {
          const previousPosition = previousKeywordIndex.get(`${page.path}::${keyword.keyword.toLowerCase()}`) ?? null;
          const change = previousPosition === null ? null : round(keyword.position - previousPosition);
          return {
            keyword: keyword.keyword,
            currentPosition: round(keyword.position),
            previousPosition: previousPosition === null ? null : round(previousPosition),
            change,
          };
        })
        .filter((entry) => entry.change === null || Math.abs(entry.change) >= KEYWORD_MOVEMENT_THRESHOLD)
        .sort((a, b) => Math.abs(b.change ?? 0) - Math.abs(a.change ?? 0));

      const previousPriority = previousPrioritySnapshot.get(page.path);
      const previousInternalLinkCount = previousPriority?.internalLinkCount ?? null;
      const previousInternalLinkSeverity = previousPriority?.internalLinkSeverity ?? null;
      const internalLinkDelta = previousInternalLinkCount === null ? null : page.supportingLinkCount - previousInternalLinkCount;

      return {
        path: page.path,
        label: page.name,
        category: page.category,
        keywordCount: keywords.length,
        movedKeywords,
        internalLinkCount: page.supportingLinkCount,
        previousInternalLinkCount,
        internalLinkDelta,
        internalLinkSeverity: page.severity,
        previousInternalLinkSeverity,
      };
    })
    .filter(Boolean) as PriorityPageSummary[];

  return {
    pages,
    totals: {
      monitoredPages: pages.length,
      pagesWithKeywordMovement: pages.filter((page) => page.movedKeywords.length > 0).length,
      pagesWithInternalLinkChanges: pages.filter((page) => page.internalLinkDelta !== null && page.internalLinkDelta !== 0).length,
      pagesWithSeverityChanges: pages.filter((page) => {
        if (!page.previousInternalLinkSeverity) return false;
        return severityWeight[page.previousInternalLinkSeverity] !== severityWeight[page.internalLinkSeverity];
      }).length,
    },
  };
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

export const buildWeeklyPriorityMonitoringNarrative = (reports: MonitoringReportSnapshot[]) => {
  const summary = buildWeeklyPriorityMonitoringSummary(reports);

  const highlights = summary.pages
    .filter((page) => page.movedKeywords.length > 0 || page.internalLinkDelta !== null || page.previousInternalLinkSeverity)
    .slice(0, 12)
    .map((page) => {
      const keywordSummary = page.movedKeywords.slice(0, 2).map((keyword) => {
        if (keyword.change === null) return `${keyword.keyword} entered tracking at ${keyword.currentPosition}`;
        return `${keyword.keyword} ${keyword.change > 0 ? "fell" : "rose"} ${Math.abs(keyword.change)} to ${keyword.currentPosition}`;
      });

      const linkSummary = [
        page.internalLinkDelta === null
          ? `internal-link baseline is ${page.internalLinkCount}`
          : `internal links ${page.internalLinkDelta > 0 ? `increased by ${page.internalLinkDelta}` : page.internalLinkDelta < 0 ? `decreased by ${Math.abs(page.internalLinkDelta)}` : "held steady"} (${page.internalLinkCount})`,
        page.previousInternalLinkSeverity
          ? `severity ${page.previousInternalLinkSeverity} → ${page.internalLinkSeverity}`
          : `severity ${page.internalLinkSeverity}`,
      ];

      return {
        path: page.path,
        label: page.label,
        category: page.category,
        summary: [...keywordSummary, ...linkSummary].join(" · "),
      };
    });

  return {
    totals: summary.totals,
    highlights,
  };
};