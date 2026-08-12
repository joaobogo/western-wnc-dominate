import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowRight, Bot, FileWarning, Link2, LoaderCircle, SearchX, ShieldAlert, Siren, TrendingDown, Target, MousePointer2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { monitoringRoutes, buildReportDrivenIssues, buildSitemapCoverageReport, buildWeeklyPriorityMonitoringNarrative, buildWeeklyPriorityMonitoringSummary, auditMonitoringPage, groupIssuesByType, fetchSitemapEntries, normalizePath, type MonitoringIssue, type MonitoringPageCheck, type MonitoringReportSnapshot, type WeeklyPriorityMonitoringSummary } from "@/lib/seo-monitoring";

const issueStyles = {
  critical: "bg-destructive text-destructive-foreground",
  warning: "bg-accent text-accent-foreground",
  info: "bg-secondary text-secondary-foreground",
} as const;

const tabConfig = [
  { key: "notFound", label: "New 404s", icon: Link2 },
  { key: "conversions", label: "Conversions", icon: Target },
  { key: "crawl", label: "Crawl & Robots", icon: ShieldAlert },
  { key: "sitemap", label: "Sitemap Gaps", icon: FileWarning },
  { key: "index", label: "Index Loss", icon: SearchX },
  { key: "keyword", label: "Keyword Shifts", icon: TrendingDown },
] as const;

const waitForReady = async (iframe: HTMLIFrameElement, path: string) => {
  const started = Date.now();
  while (Date.now() - started < 6000) {
    const doc = iframe.contentDocument;
    const canonical = doc?.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (doc?.readyState === "complete" && canonical?.href?.endsWith(path) && doc.title.trim()) {
      return true;
    }
    await new Promise((resolve) => window.setTimeout(resolve, 150));
  }
  return false;
};

const SeverityBadge = ({ severity }: { severity: MonitoringIssue["severity"] }) => (
  <span className={`inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${issueStyles[severity]}`}>
    {severity}
  </span>
);

const IssueList = ({ items }: { items: MonitoringIssue[] }) => {
  if (items.length === 0) {
    return (
      <div className="rounded-sm border border-border bg-card p-6 text-sm text-muted-foreground">
        No issues detected in this category right now.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((issue) => (
        <article key={issue.id} className="rounded-sm border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{issue.type}</p>
              <h3 className="mt-2 text-xl font-heading font-bold text-foreground">{issue.title}</h3>
            </div>
            <SeverityBadge severity={issue.severity} />
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{issue.detail}</p>
          {issue.path && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground">{issue.path}</span>
              {issue.href && issue.href.startsWith("/") && (
                <Link to={issue.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  Drill down <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

const AlertCenter = ({ items }: { items: MonitoringIssue[] }) => {
  if (items.length === 0) {
    return (
      <section className="rounded-sm border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <Siren className="mt-1 h-5 w-5 text-primary" />
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Alert center</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">No active threshold-based alerts are firing right now.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-sm border border-border bg-card p-6">
      <div className="flex items-start gap-3">
        <Siren className="mt-1 h-5 w-5 text-destructive" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Alert center</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">Dashboard alerts fire when indexation drops 10%, 404s rise 25% above baseline, sitemap signals go stale, or keyword rankings move ±10 positions.</p>
            </div>
            <span className="inline-flex items-center rounded-sm bg-destructive px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-destructive-foreground">
              {items.length} active
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {items.map((issue) => (
              <article key={issue.id} className="rounded-sm border border-border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{issue.type} alert</p>
                    <h3 className="mt-2 text-lg font-heading font-bold text-foreground">{issue.title}</h3>
                  </div>
                  <SeverityBadge severity={issue.severity} />
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{issue.detail}</p>
                {issue.href && issue.href.startsWith("/") && (
                  <Link to={issue.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                    Open drill-down <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PriorityMonitoringPanel = ({ summary }: { summary: WeeklyPriorityMonitoringSummary | null }) => {
  if (!summary) return null;

  return (
    <section className="rounded-sm border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Weekly priority monitoring</p>
          <h2 className="mt-2 text-2xl font-heading font-bold text-foreground">Priority service + town page coverage</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Tracking every service and town URL for keyword movement and internal-link impact so the weekly SEO report can flag rank shifts with supporting-link changes.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Priority pages", value: summary.totals.monitoredPages },
          { label: "Pages with keyword shifts", value: summary.totals.pagesWithKeywordMovement },
          { label: "Link-count changes", value: summary.totals.pagesWithInternalLinkChanges },
          { label: "Severity changes", value: summary.totals.pagesWithSeverityChanges },
        ].map((item) => (
          <div key={item.label} className="rounded-sm border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
            <p className="mt-3 text-3xl font-heading font-bold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {summary.pages.slice(0, 10).map((page) => (
          <article key={page.path} className="rounded-sm border border-border bg-background p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{page.category}</p>
                <h3 className="mt-2 text-lg font-heading font-bold text-foreground">{page.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{page.path}</p>
              </div>
              <Link to={page.path} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Open page <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-sm border border-border bg-card p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Tracked keywords</p>
                <p className="mt-2 text-xl font-heading font-bold text-foreground">{page.keywordCount}</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {page.movedKeywords.length > 0
                    ? page.movedKeywords.slice(0, 2).map((keyword) => `${keyword.keyword} ${keyword.change === null ? `entered at ${keyword.currentPosition}` : `${keyword.change > 0 ? "+" : ""}${keyword.change}`}`).join(" · ")
                    : "No ±10+ position shifts in the latest window."}
                </p>
              </div>
              <div className="rounded-sm border border-border bg-card p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Internal-link count</p>
                <p className="mt-2 text-xl font-heading font-bold text-foreground">{page.internalLinkCount}</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {page.internalLinkDelta === null
                    ? "Baseline captured this week."
                    : page.internalLinkDelta === 0
                      ? "No change from last report."
                      : `${page.internalLinkDelta > 0 ? "+" : ""}${page.internalLinkDelta} vs prior week`}
                </p>
              </div>
              <div className="rounded-sm border border-border bg-card p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Internal-link severity</p>
                <p className="mt-2 text-xl font-heading font-bold capitalize text-foreground">{page.internalLinkSeverity}</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {page.previousInternalLinkSeverity ? `${page.previousInternalLinkSeverity} → ${page.internalLinkSeverity}` : "No prior weekly baseline yet."}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const SEOMonitoring = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [pageChecks, setPageChecks] = useState<MonitoringPageCheck[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [currentPath, setCurrentPath] = useState(monitoringRoutes[0]?.path ?? "/");
  const [manual404s, setManual404s] = useState<MonitoringIssue[]>([]);
  const [sitemapIssues, setSitemapIssues] = useState<MonitoringIssue[]>([]);
  const [indexIssues, setIndexIssues] = useState<MonitoringIssue[]>([]);
  const [reportDrivenIssues, setReportDrivenIssues] = useState<MonitoringIssue[]>([]);
  const [prioritySummary, setPrioritySummary] = useState<WeeklyPriorityMonitoringSummary | null>(null);
  const [conversions, setConversions] = useState<any[]>([]);
  const [reports, setReports] = useState<MonitoringReportSnapshot[]>([]);

  useEffect(() => {
    const loadMonitoringData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("seo-monitoring");
        if (error) throw error;

        const rows = ((data?.recent404s ?? []) as Array<{ path: string; created_at: string }>);
        const deduped = Array.from(new Map(rows.map((row) => [normalizePath(row.path), row])).values());
        setManual404s(deduped.map((row) => ({
          id: `404-${row.path}`,
          type: "404",
          severity: "warning",
          title: "New 404 URL logged",
          detail: `A not-found hit was recorded for ${row.path} at ${new Date(row.created_at).toLocaleString()}.`,
          path: normalizePath(row.path),
          href: normalizePath(row.path),
        })));

        const reports = (data?.latestReports ?? []) as MonitoringReportSnapshot[];
        setReports(reports);
        setConversions(data?.conversions ?? []);
        setReportDrivenIssues(buildReportDrivenIssues(reports));
        setPrioritySummary(buildWeeklyPriorityMonitoringSummary(reports));
      } catch {
        setManual404s([]);
        setReportDrivenIssues([]);
        setPrioritySummary(null);
        setReports([]);
      }
    };

    void loadMonitoringData();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsRunning(true);
      setPageChecks([]);

      try {
        const sitemapEntries = await fetchSitemapEntries();
        if (!cancelled) {
          const coverage = buildSitemapCoverageReport(sitemapEntries);
          setSitemapIssues([...coverage.missingEntries, ...coverage.staleEntries]);
        }
      } catch (error) {
        if (!cancelled) {
          setSitemapIssues([
            {
              id: "sitemap-load-failed",
              type: "sitemap",
              severity: "critical",
              title: "Unable to read sitemap.xml",
              detail: error instanceof Error ? error.message : "Sitemap fetch failed.",
              path: "/sitemap.xml",
            },
          ]);
        }
      }

      for (const route of monitoringRoutes) {
        if (cancelled || !iframeRef.current) break;
        setCurrentPath(route.path);
        iframeRef.current.src = route.path;
        const ready = await waitForReady(iframeRef.current, route.path);
        if (!ready || cancelled) continue;

        const doc = iframeRef.current.contentDocument;
        if (!doc) continue;

        const check = auditMonitoringPage(doc, route);
        if (!cancelled) {
          setPageChecks((prev) => [...prev, check]);
        }
      }

      if (!cancelled) setIsRunning(false);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const knownPaths = new Set(monitoringRoutes.map((route) => route.path));
    const dropped = pageChecks
      .filter((check) => !check.robots || !/noindex/i.test(check.robots))
      .filter((check) => check.issues.some((issue) => issue.type === "crawl" && issue.severity === "critical"))
      .filter((check) => knownPaths.has(check.path))
      .map((check) => ({
        id: `index-drop-${check.path}`,
        type: "index" as const,
        severity: "critical" as const,
        title: "Page may have dropped out of the index",
        detail: `${check.path} is expected to be indexable but rendered a crawl-critical issue during the live audit.`,
        path: check.path,
        href: check.path,
      }));
    setIndexIssues(dropped);
  }, [pageChecks]);

  const allIssues = useMemo(() => {
    const crawlIssues = pageChecks.flatMap((check) => check.issues);
    return [...manual404s, ...crawlIssues, ...sitemapIssues, ...reportDrivenIssues, ...indexIssues];
  }, [manual404s, pageChecks, sitemapIssues, reportDrivenIssues, indexIssues]);

  const grouped = useMemo(() => groupIssuesByType(allIssues), [allIssues]);
  const activeAlerts = useMemo(
    () => reportDrivenIssues.filter((issue) => ["404", "sitemap", "index", "keyword"].includes(issue.type)),
    [reportDrivenIssues],
  );
  const weeklyNarrative = useMemo(() => buildWeeklyPriorityMonitoringNarrative(reports), [reports]);

  const statCards = [
    { label: "New 404 URLs", value: grouped.notFound.length, icon: Link2 },
    { label: "Crawl / robots issues", value: grouped.crawl.length, icon: ShieldAlert },
    { label: "Sitemap gaps", value: grouped.sitemap.length, icon: FileWarning },
    { label: "Potential index losses", value: grouped.index.length, icon: SearchX },
    { label: "Keyword shifts", value: grouped.keyword.length, icon: TrendingDown },
  ];

  return (
    <>
      <SEOHead
        title="SEO Monitoring Dashboard"
        description="Monitor fresh 404 URLs, robots and crawl issues, stale or missing sitemap entries, and pages that may have dropped from the index."
        path="/seo-monitoring"
        noindex
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "SEO Monitoring", url: "/seo-monitoring" },
        ])}
      />
      <Header />
      <main id="main-content" className="pt-20 md:pt-28">
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-tight">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">Active SEO Monitoring</p>
              <h1 className="text-display font-heading font-bold text-white">SEO Monitoring Dashboard</h1>
              <p className="mt-6 text-body-lg md:text-body-xl text-primary-foreground/85 leading-relaxed max-w-2xl font-medium">
                Surface new 404s, crawl blockers, sitemap drift, and suspected index-loss pages with direct links for investigation.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background tartan-bg">
          <div className="container-tight space-y-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-sm border border-border bg-card p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p>
                        <p className="mt-3 text-4xl font-heading font-bold text-foreground">{stat.value}</p>
                      </div>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                );
              })}
            </section>

            <AlertCenter items={activeAlerts} />
            <PriorityMonitoringPanel summary={prioritySummary} />

            {weeklyNarrative.highlights.length > 0 && (
              <section className="rounded-sm border border-border bg-card p-6">
                <h2 className="text-2xl font-heading font-bold text-foreground">Weekly report preview</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {weeklyNarrative.totals.monitoredPages} priority pages monitored · {weeklyNarrative.totals.pagesWithKeywordMovement} with keyword movement · {weeklyNarrative.totals.pagesWithInternalLinkChanges} with link-count changes · {weeklyNarrative.totals.pagesWithSeverityChanges} with severity changes.
                </p>
                <div className="mt-6 space-y-4">
                  {weeklyNarrative.highlights.slice(0, 6).map((item) => (
                    <article key={item.path} className="rounded-sm border border-border bg-background p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.category}</p>
                          <h3 className="mt-2 text-lg font-heading font-bold text-foreground">{item.label}</h3>
                        </div>
                        <Link to={item.path} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                          Open page <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-sm border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">Live monitoring sweep</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {isRunning ? `Scanning ${currentPath} now.` : `Monitoring sweep complete across ${pageChecks.length} public routes.`}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground">
                  {isRunning ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4 text-primary" />}
                  {isRunning ? "Scanning" : "Scan finished"}
                </div>
              </div>
            </section>

            <Tabs defaultValue="notFound" className="space-y-6">
              <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-secondary p-2 md:grid-cols-6">
                {tabConfig.map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key} className="h-auto min-h-12 rounded-sm px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] md:text-sm">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="notFound" className="mt-0 space-y-4">
                <IssueList items={grouped.notFound} />
              </TabsContent>
              <TabsContent value="conversions" className="mt-0 space-y-4">
                {conversions.length === 0 ? (
                  <div className="rounded-sm border border-border bg-card p-6 text-sm text-muted-foreground">
                    No conversion events logged in the last 100 hits.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {conversions.map((event, i) => (
                      <article key={i} className="rounded-sm border border-border bg-card p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <MousePointer2 className="mt-1 h-5 w-5 text-primary" />
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{event.event_type}</p>
                              <h3 className="mt-1 text-lg font-heading font-bold text-foreground">{event.label || "Unnamed Action"}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{new Date(event.created_at).toLocaleString()}</p>
                            </div>
                          </div>
                          <span className="rounded-sm border border-border bg-background px-3 py-1 text-[11px] font-semibold text-foreground uppercase tracking-wider">{event.path}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="crawl" className="mt-0 space-y-4">
                <IssueList items={grouped.crawl} />
              </TabsContent>
              <TabsContent value="sitemap" className="mt-0 space-y-4">
                <IssueList items={grouped.sitemap} />
              </TabsContent>
              <TabsContent value="index" className="mt-0 space-y-4">
                <IssueList items={grouped.index} />
              </TabsContent>
              <TabsContent value="keyword" className="mt-0 space-y-4">
                <IssueList items={grouped.keyword} />
              </TabsContent>
            </Tabs>

            <section className="rounded-sm border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 text-[hsl(var(--gold-ink))]" />
                <p className="text-sm leading-7 text-muted-foreground">
                  This dashboard combines logged 404 hits with a live rendered-page crawl, sitemap diff, and weekly priority-page monitoring for all service and town URLs. Weekly reporting can now summarize keyword shifts alongside internal-link count and severity changes.
                </p>
              </div>
            </section>
          </div>
        </section>
      </main>
      <iframe ref={iframeRef} title="SEO monitoring runner" className="hidden" src={currentPath} />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default SEOMonitoring;