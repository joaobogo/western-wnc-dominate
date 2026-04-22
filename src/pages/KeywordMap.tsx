import { BookOpen, MapPinned, Search, Sparkles, Target, Wrench } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateKeywordMap, type KeywordMapCategory, type KeywordMapEntry } from "@/lib/keyword-map";

const keywordMap = generateKeywordMap();

const categoryMeta: Record<KeywordMapCategory, { icon: typeof Wrench; label: string }> = {
  service: { icon: Wrench, label: "Services" },
  town: { icon: MapPinned, label: "Town Pages" },
  blog: { icon: BookOpen, label: "Blog Posts" },
};

const KeywordList = ({ title, icon: Icon, items }: { title: string; icon: typeof Search; items: string[] }) => (
  <div className="rounded-sm border border-border bg-background p-4">
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
      <Icon className="h-4 w-4" /> {title}
    </div>
    <ul className="space-y-2 text-sm text-foreground">
      {items.map((keyword) => (
        <li key={keyword} className="rounded-sm border border-border bg-card px-3 py-2 leading-6">
          {keyword}
        </li>
      ))}
    </ul>
  </div>
);

const KeywordCard = ({ entry }: { entry: KeywordMapEntry }) => {
  const meta = categoryMeta[entry.category];
  const Icon = meta.icon;

  return (
    <article className="rounded-sm border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-sm bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            <Icon className="h-3.5 w-3.5" /> {meta.label}
          </div>
          <h2 className="mt-3 text-2xl font-heading font-bold text-foreground">{entry.label}</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{entry.path}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <KeywordList title="Primary" icon={Target} items={entry.primary} />
        <KeywordList title="Secondary" icon={Search} items={entry.secondary} />
        <KeywordList title="Long-tail" icon={Sparkles} items={entry.longTail} />
      </div>
    </article>
  );
};

const KeywordMap = () => {
  const categories: KeywordMapCategory[] = ["service", "town", "blog"];

  return (
    <>
      <SEOHead
        title="Keyword Map Generator"
        description="Generate primary, secondary, and long-tail keyword targets for every service, town, and blog URL using the site's SEO architecture rules."
        path="/keyword-map"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Keyword Map Generator", url: "/keyword-map" },
        ])}
      />
      <Header />
      <main className="pt-20 md:pt-28">
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-tight">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-body font-semibold uppercase tracking-[0.2em] text-accent">SEO Workflow</p>
              <h1 className="text-balance font-heading text-4xl font-bold md:text-5xl">Keyword Map Generator</h1>
              <p className="mt-4 text-base leading-8 text-primary-foreground/75 md:text-lg">
                Review page-level keyword targets for every service, town, and blog URL based on the current town-plus-service architecture and blog support rules.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background tartan-bg">
          <div className="container-tight space-y-8">
            <section className="grid gap-4 md:grid-cols-3">
              {categories.map((category) => {
                const meta = categoryMeta[category];
                const Icon = meta.icon;
                const count = keywordMap.filter((entry) => entry.category === category).length;

                return (
                  <div key={category} className="rounded-sm border border-border bg-card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{meta.label}</p>
                        <p className="mt-3 text-4xl font-heading font-bold text-foreground">{count}</p>
                      </div>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                );
              })}
            </section>

            <Tabs defaultValue="service" className="space-y-6">
              <TabsList className="grid h-auto w-full grid-cols-3 gap-2 bg-secondary p-2">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="h-auto min-h-12 rounded-sm px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] md:text-sm"
                  >
                    {categoryMeta[category].label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0 space-y-4">
                  {keywordMap
                    .filter((entry) => entry.category === category)
                    .map((entry) => (
                      <KeywordCard key={entry.id} entry={entry} />
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

export default KeywordMap;