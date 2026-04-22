import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Download, LoaderCircle, Rocket, SearchCheck, XCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auditRenderedPage, buildSEOAuditCsv, seoAuditRoutes, type PageAuditResult, type QAStatus } from "@/lib/seo-launch-qa";

const statusStyles = {
  pass: {
    label: "Ready",
    icon: CheckCircle2,
    badge: "bg-primary text-primary-foreground",
  },
  warning: {
    label: "Review",
    icon: AlertTriangle,
    badge: "bg-accent text-accent-foreground",
  },
  fail: {
    label: "Fix",
    icon: XCircle,
    badge: "bg-destructive text-destructive-foreground",
  },
} as const;

const waitForAuditReady = async (iframe: HTMLIFrameElement, path: string) => {
  const started = Date.now();
  while (Date.now() - started < 6000) {
    const doc = iframe.contentDocument;
    const title = doc?.title?.trim();
    const canonical = doc?.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (doc?.readyState === "complete" && canonical?.href?.endsWith(path) && title) {
      return true;
    }
    await new Promise((resolve) => window.setTimeout(resolve, 150));
  }
  return false;
};

const triggerCsvDownload = (results: PageAuditResult[]) => {
  const blob = new Blob([buildSEOAuditCsv(results)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "seo-launch-qa-report.csv";
  link.click();
  URL.revokeObjectURL(url);
};

const CheckBadge = ({ status }: { status: QAStatus }) => {
  const style = statusStyles[status];
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${style.badge}`}>
      <Icon className="h-3.5 w-3.5" /> {style.label}
    </span>
  );
};

const SEOLaunchQA = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [results, setResults] = useState<PageAuditResult[]>([]);
  const [currentPath, setCurrentPath] = useState<string>(seoAuditRoutes[0]?.path ?? "/");
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const runAudit = async () => {
      setIsRunning(true);
      setResults([]);

      for (const route of seoAuditRoutes) {
        if (cancelled || !iframeRef.current) break;
        setCurrentPath(route.path);
        iframeRef.current.src = route.path;
        const ready = await waitForAuditReady(iframeRef.current, route.path);
        if (!ready || cancelled) continue;

        const doc = iframeRef.current.contentDocument;
        const win = iframeRef.current.contentWindow ?? undefined;
        if (!doc) continue;

        const result = auditRenderedPage(doc, route, win);
        if (!cancelled) {
          setResults((prev) => [...prev, result]);
        }
      }

      if (!cancelled) setIsRunning(false);
    };

    void runAudit();

    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => ({
    all: results,
    failing: results.filter((result) => result.status === "fail"),
    warnings: results.filter((result) => result.status === "warning"),
    healthy: results.filter((result) => result.status === "pass"),
  }), [results]);

  const summary = useMemo(() => ({
    total: results.length,
    failures: grouped.failing.length,
    warnings: grouped.warnings.length,
    passes: grouped.healthy.length,
  }), [grouped, results.length]);

  return (
    <>
      <SEOHead
        title="SEO Launch QA Report"
        description="Run an end-to-end launch audit across site pages for meta tags, canonical tags, breadcrumbs, schema coverage, and performance basics."
        path="/seo-launch-qa"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "SEO Launch QA", url: "/seo-launch-qa" },
        ])}
      />
      <Header />
      <main className="pt-20 md:pt-28">
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-tight">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Pre-Launch SEO QA</p>
              <h1 className="font-heading text-4xl font-bold md:text-5xl">SEO Launch QA Report</h1>
              <p className="mt-4 text-base leading-8 text-primary-foreground/75 md:text-lg">
                Automatically scan live page output for core launch signals and export a checklist-ready summary before publish.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background tartan-bg">
          <div className="container-tight space-y-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Fix", value: summary.failures, icon: XCircle, tone: "text-destructive" },
                { label: "Review", value: summary.warnings, icon: AlertTriangle, tone: "text-accent" },
                { label: "Ready", value: summary.passes, icon: CheckCircle2, tone: "text-primary" },
                { label: "Audited", value: `${summary.total}/${seoAuditRoutes.length}`, icon: SearchCheck, tone: "text-foreground" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-sm border border-border bg-card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p>
                        <p className="mt-3 text-4xl font-heading font-bold text-foreground">{stat.value}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.tone}`} />
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="flex flex-col gap-4 rounded-sm border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">Audit status</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {isRunning
                    ? `Scanning ${currentPath} now. The report checks meta tags, canonicals, breadcrumb signals, JSON-LD, and lightweight performance heuristics.`
                    : `Scan complete across ${results.length} page${results.length === 1 ? "" : "s"}. Export the CSV to review or hand off as a launch checklist.`}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  {isRunning ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />} {isRunning ? "Running" : "Run again"}
                </button>
                <button
                  type="button"
                  onClick={() => triggerCsvDownload(results)}
                  disabled={results.length === 0}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" /> Export CSV
                </button>
              </div>
            </section>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-secondary p-2 md:grid-cols-4">
                {[
                  { value: "all", label: `All (${grouped.all.length})` },
                  { value: "failing", label: `Fix (${grouped.failing.length})` },
                  { value: "warnings", label: `Review (${grouped.warnings.length})` },
                  { value: "healthy", label: `Ready (${grouped.healthy.length})` },
                ].map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="h-auto min-h-12 rounded-sm px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] md:text-sm">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(grouped).map(([key, items]) => (
                <TabsContent key={key} value={key} className="mt-0 space-y-4">
                  {items.map((result) => (
                    <article key={result.path} className="rounded-sm border border-border bg-card p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{result.pageType} · {result.path}</p>
                          <h3 className="mt-2 text-2xl font-heading font-bold text-foreground">{result.label}</h3>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{result.title || "No document title detected."}</p>
                        </div>
                        <CheckBadge status={result.status} />
                      </div>

                      <div className="mt-6 grid gap-4 xl:grid-cols-2">
                        {result.checks.map((check) => (
                          <div key={check.key} className="rounded-sm border border-border bg-background p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">{check.label}</h4>
                              <CheckBadge status={check.status} />
                            </div>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">{check.detail}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-sm border border-border bg-background p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Schema types detected</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {result.schemaTypes.length > 0 ? result.schemaTypes.map((type) => (
                            <span key={`${result.path}-${type}`} className="rounded-sm border border-border bg-card px-3 py-1.5 text-xs text-foreground">
                              {type}
                            </span>
                          )) : <span className="text-sm text-muted-foreground">No JSON-LD types detected.</span>}
                        </div>
                      </div>
                    </article>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <iframe ref={iframeRef} title="SEO audit runner" className="hidden" src={currentPath} />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default SEOLaunchQA;