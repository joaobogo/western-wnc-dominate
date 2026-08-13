import { AlertTriangle, CheckCircle2, FileWarning, Link2, Network, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateInternalLinkingReport, type QAAuditItem, type QACategory } from "@/lib/internal-linking-qa";

const report = generateInternalLinkingReport();

const categoryLabels: Record<QACategory, string> = {
  template: "Templates",
  service: "Services",
  town: "Town Pages",
  blog: "Blog Posts",
};

const severityStyles = {
  pass: {
    label: "Healthy",
    icon: CheckCircle2,
    badge: "bg-primary text-primary-foreground",
    card: "border-border bg-card",
  },
  warning: {
    label: "Weak",
    icon: AlertTriangle,
    badge: "bg-accent text-accent-foreground",
    card: "border-border bg-card",
  },
  fail: {
    label: "Missing",
    icon: FileWarning,
    badge: "bg-destructive text-destructive-foreground",
    card: "border-destructive/30 bg-card",
  },
} as const;

const AuditCard = ({ item }: { item: QAAuditItem }) => {
  const style = severityStyles[item.severity];
  const Icon = style.icon;

  return (
    <article className={`rounded-sm border p-5 ${style.card}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.path}</p>
          <h3 className="mt-2 text-xl font-heading font-bold text-foreground">{item.name}</h3>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-caption font-semibold uppercase tracking-[0.12em] ${style.badge}`}>
          <Icon className="h-4 w-4" aria-hidden="true"> {style.label}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>
      <p className="mt-3 text-sm leading-7 text-foreground"><span className="font-semibold">Next step:</span> {item.recommendation}</p>

      {item.supportingLinks.length > 0 && (
        <div className="mt-4 rounded-sm border border-border bg-background p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary">Observed linked targets</p>
          <div className="flex flex-wrap gap-2">
            {item.supportingLinks.map((link) => (
              <span key={link} className="rounded-sm border border-border bg-card px-3 py-1.5 text-xs text-foreground">
                {link}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

const InternalLinkingQA = () => {
  const categories: QACategory[] = ["template", "service", "town", "blog"];

  return (
    <>
      <SEOHead
        title="Internal Linking QA"
        description="Audit services, town pages, and blog posts for missing or weak internal links before launch."
        path="/internal-linking-qa"
        noindex
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Internal Linking QA", url: "/internal-linking-qa" },
        ])}
      />
      <Header />
      <main id="main-content" className="pt-20 md:pt-28">
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-tight">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">Pre-Launch QA</p>
              <h1 className="text-display font-heading font-bold text-white">Internal Linking QA</h1>
              <p className="mt-6 text-body-lg md:text-body-xl text-primary-foreground/85 leading-relaxed max-w-2xl font-medium">
                Review missing and weak link relationships between service pages, town pages, blog posts, and shared templates before publish.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background tartan-bg">
          <div className="container-tight space-y-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Missing", value: report.summary.failures, icon: FileWarning, tone: "text-destructive" },
                { label: "Weak", value: report.summary.warnings, icon: AlertTriangle, tone: "text-[hsl(var(--gold-ink))]" },
                { label: "Healthy", value: report.summary.passes, icon: CheckCircle2, tone: "text-primary" },
                { label: "Audits", value: report.summary.total, icon: Network, tone: "text-foreground" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-sm border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p>
                        <p className="mt-3 text-4xl font-heading font-bold text-foreground">{stat.value}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.tone}`} aria-hidden="true">
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="rounded-sm border border-border bg-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-secondary text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden="true">
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">Audit Scope</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    The report checks whether service pages receive blog support, whether town pages are backed by local content, whether blog posts push authority into service and location pages, and whether shared templates expose those link paths clearly.
                  </p>
                </div>
              </div>
            </section>

            <Tabs defaultValue="template" className="space-y-6">
              <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-secondary p-2 md:grid-cols-4">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="h-auto min-h-12 rounded-sm px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] md:text-sm"
                  >
                    {categoryLabels[category]} ({report.countsByCategory[category]})
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0 space-y-4">
                  {report.items
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <AuditCard key={item.id} item={item} />
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default InternalLinkingQA;