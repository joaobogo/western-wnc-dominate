import { PHONE_TEL, PRIMARY_HOURS_LABEL, REVIEW_COUNT, REVIEW_RATING } from "@/data/business";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Phone, Mountain, Compass, Users, CloudLightning, Clock } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";

import StickyMobileCTA from "@/components/StickyMobileCTA";
import { towns } from "@/data/towns";
import { counties } from "@/data/counties";
import ProofKit from "@/components/conversion/ProofKit";
import InspectionForm from "@/components/InspectionForm";
import { CTA, CTA_SECONDARY } from "@/lib/cta-config";
import serviceAreasHeroAsset from "@/assets/service-areas-hero-smokies.jpg.asset.json";
// Illustrative regional photo (generated, Nov 2026): a mountain home above autumn
// ridgelines. It makes no claim about a Highlander job; real jobs are in the proof strip.
const SERVICE_AREAS_HERO = "/media/highlander-wnc-ridge-home-autumn.webp";
const SERVICE_AREAS_HERO_SET = "/media/highlander-wnc-ridge-home-autumn-640.webp 640w, /media/highlander-wnc-ridge-home-autumn-960.webp 960w, /media/highlander-wnc-ridge-home-autumn.webp 1600w";
const SERVICE_AREAS_HERO_FALLBACK = serviceAreasHeroAsset.url;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const whyLocal = [
  { icon: Mountain, title: "We Know the Terrain", detail: "Elevation, slope, soil composition, and microclimates affect every project. We've built across this region long enough to know what each town demands." },
  { icon: CloudLightning, title: "We Know the Weather", detail: "From Highlands' 80+ inches of annual rain to Waynesville's ice storms — we spec materials and methods for your area's exact exposure profile." },
  { icon: Users, title: "Western NC Team", detail: "Highlander serves mountain communities from its Franklin and Sylva showrooms with locally coordinated project teams." },
  { icon: Clock, title: "Two Local Points of Contact", detail: "Franklin and Sylva provide clear contact points for homeowners across Highlander's Western North Carolina service area." },
];

// Markets Highlander dropped stay reachable but are not promoted here.
const activeTowns = towns.filter((t) => t.indexable !== false);
const primaryTowns = activeTowns.slice(0, 6);
const secondaryTowns = activeTowns.slice(6);
const activeCounties = counties.filter((c) => c.indexable !== false);

const ServiceAreas = () => {
  return (
    <>
      <SEOHead
        title="Roofing & Construction Service Areas in Western NC"
        description="Roofing and construction service areas across Western North Carolina, coordinated from Highlander's Franklin and Sylva showrooms."
        path="/service-areas"
        jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }])}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }]} />
      <main id="main-content">
        {/* ═══ HERO: one photo, one headline, call first ═══ */}
        <section className="relative isolate overflow-hidden bg-[hsl(var(--dark-section))]">
          <div className="absolute inset-0 -z-10">
            <img
              src={SERVICE_AREAS_HERO}
              srcSet={SERVICE_AREAS_HERO_SET}
              sizes="100vw"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.endsWith(SERVICE_AREAS_HERO_FALLBACK)) {
                  img.removeAttribute("srcset");
                  img.src = SERVICE_AREAS_HERO_FALLBACK;
                }
              }}
              alt="Mountain home on a ridge above autumn Blue Ridge ridgelines in Western North Carolina"
              className="h-full w-full object-cover object-[70%_center]"
              width={1600}
              height={900}
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(160_45%_6%/0.88)_0%,hsl(160_45%_6%/0.6)_48%,hsl(160_45%_6%/0.15)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(160_45%_6%/0.7)] to-transparent" />
          </div>
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24 lg:py-28">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: HIGHLAND_EASE }} className="max-w-3xl">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">
                <Compass className="h-4 w-4" aria-hidden="true" />
                Service areas · Western North Carolina
              </p>
              <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight !text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl">
                Roofing &amp; Construction Across Western North Carolina
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
                From our Franklin and Sylva showrooms, Highlander crews work in {activeTowns.length} mountain communities. Find your town below, or call and we'll confirm we cover your address.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={PHONE_TEL} data-cta="service-areas-hero" data-gtm-location="hero" className="btn btn-primary btn-md w-full justify-center sm:w-auto sm:whitespace-nowrap">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {CTA_SECONDARY.callLabel}
                </a>
                <a href="#estimate-form" className="btn btn-secondary btn-md btn-on-dark w-full justify-center sm:w-auto sm:whitespace-nowrap">
                  {CTA.mobileSticky}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
                <li>{REVIEW_RATING}★ · {REVIEW_COUNT} Google reviews</li>
                <li>Showrooms in Franklin &amp; Sylva</li>
                <li>Office {PRIMARY_HOURS_LABEL}</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ═══ FIND YOUR TOWN: every town one tap away ═══ */}
        <section aria-labelledby="find-your-town" className="border-b border-border bg-card">
          <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-12">
            <h2 id="find-your-town" className="font-heading text-2xl font-bold md:text-3xl">Find your town</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {activeTowns.map((town) => (
                <li key={town.slug}>
                  <Link
                    to={`/service-areas/${town.slug}`}
                    className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    {town.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">By county: </span>
              {activeCounties.map((county, i) => (
                <span key={county.slug}>
                  {i > 0 && " · "}
                  <Link to={`/service-areas/county/${county.slug}`} className="underline underline-offset-4 hover:text-primary">
                    {county.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ═══ PRIMARY TOWNS — Detailed cards ═══ */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12"
            >
              <span className="eyebrow mb-3 block">Primary Service Areas</span>
              <h2 className="section-heading mb-4">Home Base Towns</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground text-sm max-w-lg mx-auto font-body">
                Our core service area, where our offices, crews, and local relationships are deepest.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {primaryTowns.map((town, i) => (
                <motion.div
                  key={town.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={`/service-areas/${town.slug}`}
                    className="group block bg-card border border-border p-6 md:p-8 hover:border-primary/25 hover:shadow-raised transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">{town.name}, NC</h3>
                        </div>
                        <p className="text-muted-foreground text-body-xs font-body font-bold">{town.county}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 shrink-0">
                        <span className="text-caption font-body font-bold uppercase tracking-[0.12em] px-2 py-1 bg-primary/8 text-primary rounded-sm">Roofing</span>
                        <span className="text-caption font-body font-bold uppercase tracking-[0.12em] px-2 py-1 bg-[hsl(var(--highland-gold)/0.1)] text-[hsl(var(--gold-ink))] rounded-sm">Construction</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 line-clamp-3">{town.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {town.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-body-xs font-body font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-sm">{f}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all font-body">
                      View {town.name} Services <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECONDARY TOWNS — Compact grid ═══ */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="eyebrow mb-3 block">Extended Coverage</span>
              <h2 className="section-heading mb-4">Additional Communities We Serve</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground text-sm max-w-lg mx-auto font-body">
                Roofing and construction availability varies by project and location; applicable scope and warranty terms are confirmed in writing.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {secondaryTowns.map((town, i) => (
                <motion.div
                  key={town.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/service-areas/${town.slug}`}
                    className="group block bg-card border border-border p-5 hover:border-primary/20 hover:shadow-flat transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary/80" aria-hidden="true" />
                      <h3 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors">{town.name}, NC</h3>
                    </div>
                    <p className="text-muted-foreground text-xs font-body mb-3">{town.county}</p>
                    <p className="text-muted-foreground text-body-xs font-body leading-relaxed line-clamp-2 mb-4 font-bold">{town.description.slice(0, 100)}…</p>
                    <span className="inline-flex items-center gap-1 text-primary/70 font-medium text-xs group-hover:gap-2 group-hover:text-primary transition-all font-body">
                      View Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY LOCAL MATTERS — Dark section ═══ */}
        <section className="section-padding section-dark tartan-dark">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Local Knowledge</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                Why &#8220;Local&#8221; Isn't Just<br /> a Marketing Claim.
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {whyLocal.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-[hsl(var(--dark-section-foreground)/0.04)] border border-dark-section-border p-6"
                >
                  <item.icon className="w-6 h-6 text-[hsl(var(--highland-gold)/0.6)] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[hsl(var(--dark-section-foreground))] mb-2">{item.title}</h3>
                  <p className="text-dark-section-muted text-sm font-body leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROOF: real work and reviews ═══ */}
        <ProofKit topic="all" photos reviews articles />

        {/* ═══ FORM: 3 fields ═══ */}
        <div id="estimate-form">
          <InspectionForm />
        </div>

        {/* ═══ CLOSING CTA — Location-aware ═══ */}
        <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 tartan-dark opacity-30" />
          <div className="container-tight relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">Your Town, Our Team</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1]">
                Serving Mountain Communities<br />
                Across Western NC.
              </h2>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body leading-relaxed">
                Not sure we cover your address? Call the Franklin office and we'll tell you, then set up the next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={PHONE_TEL} data-cta="service-areas-closing" data-gtm-location="closing" className="btn btn-primary btn-lg justify-center">
                  <Phone className="w-4 h-4" aria-hidden="true" /> {CTA_SECONDARY.callLabel}
                </a>
                <a href="#estimate-form" className="btn btn-secondary btn-lg btn-on-dark justify-center">
                  <span className="relative z-10">{CTA.mobileSticky}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" aria-hidden="true" />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-primary-foreground text-sm font-bold uppercase tracking-wider">
                <span>Franklin & Sylva Offices</span>
                <span className="text-primary-foreground/15">•</span>
                <span>Requests Reviewed During Staffed Hours</span>
                <span className="text-primary-foreground/15">•</span>
                <span>Roofing & Construction</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ServiceAreas;
