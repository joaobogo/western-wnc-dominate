import { CheckCircle2, FileText, LayoutTemplate, Link2, Search, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { seoChecklists, seoPageTypeOrder, type SeoPageType, type ChecklistGroupItem } from "@/data/seo-checklists";

const groupStyles = {
  requiredSections: {
    icon: LayoutTemplate,
    title: "Required Sections",
    description: "Core on-page content blocks that should appear before a page is publish-ready.",
  },
  schema: {
    icon: FileText,
    title: "Structured Data",
    description: "Schema types that reinforce entity clarity and search-result eligibility.",
  },
  internalLinks: {
    icon: Link2,
    title: "Internal Links",
    description: "Links that support crawl paths, topical depth, and conversion flow.",
  },
} as const;

const ChecklistSection = ({
  title,
  description,
  icon: Icon,
  items,
}: {
  title: string;
  description: string;
  icon: typeof CheckCircle2;
  items: ChecklistGroupItem[];
}) => (
  <section className="rounded-sm border border-border bg-card p-6 md:p-7">
    <div className="mb-5 flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>

    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.title} className="rounded-sm border border-border bg-background p-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-heading font-semibold text-foreground">{item.title}</h3>
            {item.priority && (
              <span className="inline-flex items-center rounded-sm bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
                {item.priority}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.detail}</p>
        </div>
      ))}
    </div>
  </section>
);

const SEOChecklist = () => {
  const defaultType: SeoPageType = "home";

  return (
    <>
      <SEOHead
        title="SEO Checklist Tool"
        description="Select a page type and review required sections, schema, internal links, and target keywords before publishing."
        path="/seo-checklist"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "SEO Checklist", url: "/seo-checklist" },
        ])}
      />
      <Header />
      <main className="pt-20 md:pt-28">
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-tight">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-body font-semibold uppercase tracking-[0.2em] text-accent">Publishing Workflow</p>
              <h1 className="text-balance font-heading text-4xl font-bold md:text-5xl">SEO Checklist</h1>
              <p className="mt-4 text-base leading-8 text-primary-foreground/75 md:text-lg">
                Switch page types to review what each page needs before it goes live: structure, schema, internal links, and keyword targets.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background tartan-bg">
          <div className="container-tight">
            <Tabs defaultValue={defaultType} className="space-y-8">
              <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-secondary p-2 md:grid-cols-5">
                {seoPageTypeOrder.map((pageType) => (
                  <TabsTrigger
                    key={pageType}
                    value={pageType}
                    className="h-auto min-h-12 rounded-sm px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] md:text-sm"
                  >
                    {seoChecklists[pageType].label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {seoPageTypeOrder.map((pageType) => {
                const checklist = seoChecklists[pageType];

                return (
                  <TabsContent key={pageType} value={pageType} className="mt-0 space-y-8">
                    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                      <div className="rounded-sm border border-border bg-card p-6 md:p-8">
                        <div className="mb-4 inline-flex items-center rounded-sm bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                          {checklist.label} Page
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-foreground">{checklist.objective}</h2>
                        <p className="mt-4 text-base leading-8 text-muted-foreground">{checklist.intro}</p>
                      </div>

                      <div className="rounded-sm border border-border bg-card p-6 md:p-8">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-secondary text-primary">
                            <Target className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-heading font-bold text-foreground">Target Keywords</h2>
                            <p className="text-sm text-muted-foreground">Primary terms to anchor the page and supporting modifiers to widen coverage.</p>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                          <div className="rounded-sm border border-border bg-background p-4">
                            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                              <Search className="h-4 w-4" /> Primary
                            </div>
                            <ul className="space-y-2 text-sm text-foreground">
                              {checklist.keywords.primary.map((keyword) => (
                                <li key={keyword} className="rounded-sm border border-border bg-card px-3 py-2">{keyword}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-sm border border-border bg-background p-4">
                            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                              <Search className="h-4 w-4" /> Secondary
                            </div>
                            <ul className="space-y-2 text-sm text-foreground">
                              {checklist.keywords.secondary.map((keyword) => (
                                <li key={keyword} className="rounded-sm border border-border bg-card px-3 py-2">{keyword}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    <div className="grid gap-6 xl:grid-cols-3">
                      <ChecklistSection
                        title={groupStyles.requiredSections.title}
                        description={groupStyles.requiredSections.description}
                        icon={groupStyles.requiredSections.icon}
                        items={checklist.requiredSections}
                      />
                      <ChecklistSection
                        title={groupStyles.schema.title}
                        description={groupStyles.schema.description}
                        icon={groupStyles.schema.icon}
                        items={checklist.schema}
                      />
                      <ChecklistSection
                        title={groupStyles.internalLinks.title}
                        description={groupStyles.internalLinks.description}
                        icon={groupStyles.internalLinks.icon}
                        items={checklist.internalLinks}
                      />
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default SEOChecklist;