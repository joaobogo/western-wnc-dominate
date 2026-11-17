import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import AnswerBlock from "@/components/seo/AnswerBlock";
import { LICENSE_NUMBER, PHONE_DISPLAY, PHONE_TEL, PRIMARY_HOURS_LABEL, REVIEW_COUNT, REVIEW_RATING } from "@/data/business";
import { CTA, CTA_SECONDARY } from "@/lib/cta-config";
import { ALL_SERVICE_LINKS, FAST_ESTIMATE_PAGES, TOP_SERVICES, type HubService } from "@/data/services-hub";
import { smallSrc } from "@/lib/gallery-srcset";

const SITE = "https://highlandernc.com";
const PATH = "/services";

type Filter = "all" | "roofing" | "construction" | "indoor";
const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "roofing", label: "Roofing" },
  { id: "construction", label: "Construction" },
  { id: "indoor", label: "Indoor projects (winter)" },
];

const matches = (service: HubService, filter: Filter) =>
  filter === "all" ? true : filter === "indoor" ? Boolean(service.indoor) : service.division === filter;

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Highlander roofing and construction services",
  itemListElement: TOP_SERVICES.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: service.name,
    url: `${SITE}${service.href}`,
  })),
};

const ServicesHub = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = TOP_SERVICES.filter((service) => matches(service, filter));

  return (
    <>
      <SEOHead
        title="Roofing & Construction Services | Highlander"
        description="Roofing and construction services in Western North Carolina: roof replacement and repair, metal roofing, gutters, additions, renovations and outdoor living."
        path={PATH}
        jsonLd={[itemListSchema, breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: PATH }])]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Services", url: PATH }]} />

      <main id="main-content" className="bg-background">
        {/* Hero */}
        <section className="section-dark relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[url(/tartan.webp)] bg-[length:auto_100%] bg-repeat-x" />
          <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
            <p className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Highlander Building Services</p>
            <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.06] text-primary-foreground md:text-6xl">
              Roofing &amp; Construction Services in Western North Carolina
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
              One Franklin team for the roof over your head and the space under it. Pick a service below, or call and we'll point you to the right one.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_TEL} data-cta="services-hero" data-gtm-location="services_hero" className="btn btn-primary btn-md justify-center">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CTA_SECONDARY.callLabel}
              </a>
              <Link to="/request-inspection" data-gtm-cta="request_inspection" data-gtm-location="services_hero" className="btn btn-secondary btn-md btn-on-dark justify-center">
                {CTA.mobileSticky}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-5 text-sm text-primary-foreground/80">
              {REVIEW_RATING}★ from {REVIEW_COUNT} Google reviews · {LICENSE_NUMBER} · Office {PRIMARY_HOURS_LABEL}, Eastern Time
            </p>
          </div>
        </section>

        <AnswerBlock
          question="What services does Highlander offer?"
          answer="Highlander Building Services is a Franklin, NC roofing company and licensed general contractor serving Western North Carolina. The roofing team handles roof replacement, repair, metal roofing, gutters, skylights and storm damage. The construction team builds additions, renovations, decks, porches and exterior updates. Every project starts with a call and a written scope."
        />

        {/* Top 10 */}
        <section aria-labelledby="top-services" className="section-padding bg-secondary/40">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-2 block">Most requested</p>
                <h2 id="top-services" className="section-heading">The 10 services homeowners ask us for most</h2>
              </div>
              <div role="group" aria-label="Filter services" className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filter === f.id}
                    onClick={() => setFilter(f.id)}
                    className={`min-h-12 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      filter === f.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
              {shown.map((service) => (
                <li key={service.href} className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
                  <Link to={service.href} className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" tabIndex={-1} aria-hidden="true">
                    <img
                      src={smallSrc(service.image.src)}
                      srcSet={service.image.srcSet}
                      sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                      alt={service.image.alt}
                      width={service.image.width}
                      height={service.image.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                        service.division === "roofing" ? "bg-primary text-primary-foreground" : "bg-[hsl(var(--highland-gold))] text-foreground"
                      }`}
                    >
                      {service.division === "roofing" ? "Roofing" : "Construction"}
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-xl font-bold">
                      <Link to={service.href} className="hover:underline underline-offset-4">
                        {service.name}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{service.outcome}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <Link to={service.href} className="inline-flex min-h-12 items-center gap-1.5 font-bold text-primary underline-offset-4 hover:underline">
                        See {service.name.toLowerCase()}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <a
                        href={PHONE_TEL}
                        data-cta={`services-card-${service.href.split("/").pop()}`}
                        data-gtm-location="services_card"
                        className="inline-flex min-h-12 items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                      >
                        <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                        Call about this
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Fast estimate pages (the paid landing pages, now part of the site) */}
        <section aria-labelledby="fast-estimate" className="section-padding">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <p className="eyebrow mb-2 block">Ready to talk numbers?</p>
            <h2 id="fast-estimate" className="section-heading">Get a written estimate fast</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Short pages built for one job: call the Franklin office or leave three details and we call you back.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FAST_ESTIMATE_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    to={page.href}
                    data-gtm-cta="fast_estimate"
                    data-gtm-location="services_hub"
                    className="flex h-full min-h-16 items-center justify-between gap-3 rounded-sm border border-border bg-card px-5 py-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span>
                      <span className="block font-heading text-lg font-bold">{page.label}</span>
                      <span className="block text-sm text-muted-foreground">{page.desc}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Every service page */}
        <section aria-labelledby="all-services" className="section-padding bg-secondary/40">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <h2 id="all-services" className="section-heading">Every service, by team</h2>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {(["roofing", "construction"] as const).map((division) => (
                <div key={division}>
                  <h3 className={`font-heading text-2xl font-bold ${division === "roofing" ? "text-primary" : "text-[hsl(var(--gold-ink))]"}`}>
                    {division === "roofing" ? "Roofing" : "Construction"}
                  </h3>
                  <ul className="mt-4 grid gap-1 sm:grid-cols-2">
                    {ALL_SERVICE_LINKS[division].map((link) => (
                      <li key={link.href}>
                        <Link to={link.href} className="inline-flex min-h-11 items-center gap-2 text-foreground underline-offset-4 hover:underline">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-primary text-primary-foreground">
          <div aria-hidden="true" className="h-1 w-full bg-[url(/tartan.webp)] bg-[length:auto_100%] bg-repeat-x" />
          <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="font-heading text-3xl font-bold">Not sure which service you need?</h2>
              <p className="mt-2 max-w-xl text-primary-foreground/90">
                Call and describe what's going on. The Franklin office answers {PRIMARY_HOURS_LABEL}, Eastern Time.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_TEL} data-cta="services-closing" data-gtm-location="services_closing" className="btn btn-secondary btn-md btn-on-dark justify-center" aria-label={`Call Highlander at ${PHONE_DISPLAY}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CTA_SECONDARY.callLabel}
              </a>
              <Link to="/request-inspection" data-gtm-cta="request_inspection" data-gtm-location="services_closing" className="btn btn-ghost btn-md justify-center">
                {CTA.mobileSticky}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicesHub;
