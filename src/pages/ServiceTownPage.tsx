import { HERO_SIZES, mediaSrcSet } from "@/lib/media-srcset";
import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import AnswerBlock from "@/components/seo/AnswerBlock";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, MapPin } from "lucide-react";
import SEOHead, {
  businessGraph,
  townServiceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageContext from "@/components/PageContext";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import NearbyTowns from "@/components/NearbyTowns";
import { getTownBySlug, towns } from "@/data/towns";
import {
  getServiceTownEntry,
  getServiceTownEntriesForTown,
  isServiceTownIndexable,
  serviceTownHref,
} from "@/data/service-town-content";
import { linkableBlogPosts } from "@/data/blogs";
import { getServiceParentPath } from "@/data/service-town-generated";
import LocalLinkWeb from "@/components/LocalLinkWeb";
import CallFirstCTA from "@/components/CallFirstCTA";
import { isUrgentIntentPath } from "@/lib/urgent-intent";
import { getServiceTownLinkWeb } from "@/lib/local-link-graph";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import AttributedReviews from "@/components/trust/AttributedReviews";
import LocalProjectProof from "@/components/trust/LocalProjectProof";
import RelatedLinks from "@/components/RelatedLinks";
import ServiceTownProofPoints from "@/components/servicetown/ServiceTownProofPoints";
import { getServiceTownFAQs } from "@/lib/service-town-faqs";
import { getCountyHubLink, getTownBlogLinks, estimateLink } from "@/lib/internal-links";
import { resolveServiceTownHero } from "@/lib/service-town-hero";

// Hero images come from real data (src/lib/service-town-hero.ts): a Highlander
// project in this town or county when one exists, else the town's own
// self-hosted image, else one regional fallback — never a third-party stock host.

interface ServiceTownPageProps {
  townSlug?: string;
  serviceSlug?: string;
}

const ServiceTownPage = ({
  townSlug: propTownSlug,
  serviceSlug: propServiceSlug,
}: ServiceTownPageProps = {}) => {
  const params = useParams();
  const townSlug = propTownSlug ?? params.townSlug ?? "";
  const serviceSlug = propServiceSlug ?? params.serviceSlug ?? "";
  const town = getTownBySlug(townSlug);
  const entry = getServiceTownEntry(townSlug, serviceSlug);

  if (!town || !entry) {
    return <Navigate to={town ? `/service-areas/${town.slug}` : "/service-areas"} replace />;
  }

  const hero = resolveServiceTownHero(town, serviceSlug, entry.serviceLabel);
  const urgent = isUrgentIntentPath(`/service-areas/${townSlug}/${serviceSlug}`);

  // One URL per page: the legacy flat slugs (e.g. /roofing-highlands-nc) 301 to
  // this nested route at the edge, so the canonical always self-references the
  // nested URL that is actually served.
  const resolvedCanonical = `/service-areas/${townSlug}/${serviceSlug}`;

  const relatedForTown = getServiceTownEntriesForTown(townSlug).filter(
    (e) => e.serviceSlug !== serviceSlug,
  );
  const otherTowns = towns.filter((t) => t.slug !== townSlug).slice(0, 4);
  const faqs = getServiceTownFAQs(town, entry.serviceLabel, entry.faqs);

  return (
    <>
      <SEOHead
        title={entry.metaTitle}
        description={entry.metaDescription}
        path={resolvedCanonical}
        // Templated coverage pages (town name swapped into a shared frame) are
        // crawlable for their links but not indexable — only hand-written
        // service × town pages compete in search.
        noindex={isServiceTownIndexable(entry.townSlug, entry.serviceSlug) ? false : "follow"}
        preloadImage={hero.src}
        preloadImageSrcSet={mediaSrcSet(hero.src)}
        preloadImageSizes={HERO_SIZES}
        jsonLd={[
          ...businessGraph(),
          // A service in a town is a Service with areaServed — not another
          // LocalBusiness with a made-up address.
          townServiceSchema(
            {
              name: town.name,
              slug: town.slug,
              county: town.county,
              state: town.state,
              description: entry.intro,
            },
            {
              url: resolvedCanonical,
              name: `${entry.serviceLabel} in ${town.name}, ${town.state}`,
              description: entry.metaDescription,
            },
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/service-areas" },
            { name: `${town.name}, ${town.state}`, url: `/service-areas/${town.slug}` },
            { name: entry.serviceLabel, url: resolvedCanonical },
          ]),
          ...(faqs.length
            ? [faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))]
            : []),
        ]}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: `${town.name}, ${town.state}`, url: `/service-areas/${town.slug}` },
          { name: entry.serviceLabel, url: resolvedCanonical },
        ]}
      />
      <main id="main-content">
        {/* Hero */}
        <section className="dark-surface relative min-h-[60svh] flex flex-col items-center justify-center overflow-hidden hero-clears-header pb-32 md:pb-48">
          <div className="absolute inset-0">
            <img
              width={hero.width}
              height={hero.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              src={hero.src}
              srcSet={mediaSrcSet(hero.src)}
              sizes={HERO_SIZES}
              alt={hero.alt}
              data-hero-source={hero.source}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.4)] via-[hsl(var(--hero-overlay)/0.2)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.35)] via-transparent to-transparent" />
            
            {/* Heritage Tartan Accent — Restrained and Subtle */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
            
            {/* Subtle Bottom Heritage Trim */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[url('/tartan.png')] bg-repeat-x bg-[length:100px_auto] opacity-30 z-30" />
          </div>

          <div className="container-tight relative z-10 pb-20">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-[hsl(var(--gold-ink))] mb-6">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span className="font-bold text-sm uppercase tracking-[0.2em]">
                  {town.county}, {town.state}
                </span>
              </div>
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold mb-4 text-balance leading-[0.95] tracking-tightest text-white">
                {entry.h1}
              </h1>
              <PageContext
                division={`${entry.serviceLabel} · Roofing Division`}
                area={`${town.name}, ${town.state} · ${town.county}`}
                tone="dark"
              />
              <p className="text-body-lg md:text-body-xl text-white/85 max-w-2xl mb-10 leading-relaxed font-medium drop-shadow-sm">
                {entry.intro}
              </p>
              {/* CRO Prompt 32 — call-first CTA in every town+service hero */}
              <div className="mb-16">
                <CallFirstCTA
                  townName={town.name}
                  townSlug={town.slug}
                  location="hero"
                  reason={
                    urgent
                      ? undefined
                      : `Fastest way to get ${entry.serviceLabel.toLowerCase()} in ${town.name} on the schedule.`
                  }
                  secondaryLabel={`Request a ${entry.serviceLabel} Assessment`}
                  secondaryTo="/consultation"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom Trust bar — Balanced for all devices */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-lg">
            <div className="container-tight px-4 sm:px-6 py-4 md:py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[
                  { label: "Service Area", value: `${town.name}, NC` },
                  { label: "Response", value: "Priority" },
                  { label: "Warranty", value: "Highlander Certified" },
                  { label: "Status", value: "Active Division" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-caption md:text-caption uppercase tracking-widest text-white/85 font-bold mb-0.5 md:mb-1">{stat.label}</span>
                    <span className="text-xs md:text-sm font-heading font-bold text-white uppercase tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceTownProofPoints
          town={town}
          serviceLabel={entry.serviceLabel}
          proofNote={entry.proofNote}
        />

        <AnswerBlock
          question={`Who handles ${entry.serviceLabel.toLowerCase()} in ${town.name}, ${town.state}?`}
          answer={entry.intro}
          points={[
            `${entry.serviceLabel} in ${town.name} and across ${town.county}`,
            `Call ${PHONE_PLAIN} for a direct answer`,
            "Scoped on site by Highlander crews",
          ]}
        />

        {/* Local context */}
        <section className="section-padding bg-background">
          <div className="container-tight grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Why this matters in {town.name}
                </h2>
                <p className="text-foreground/80 leading-relaxed">{entry.localContext}</p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Who this is for
                </h2>
                <p className="text-foreground/80 leading-relaxed">{entry.whoItsFor}</p>
              </div>
              <div className="border-l-2 border-accent pl-6 py-2">
                <p className="text-foreground/90 italic leading-relaxed">{entry.proofNote}</p>
              </div>

              {entry.sections?.map((s, i) => (
                <div key={i}>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">{s.heading}</h2>
                  <p className="text-foreground/80 leading-relaxed">{s.body}</p>
                </div>
              ))}

              {/* Contextual internal links */}
              <div className="border-t border-border pt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <Link to={getServiceParentPath(serviceSlug)} className="text-primary font-semibold hover:underline">
                  More on {entry.serviceLabel.toLowerCase()} across Western NC
                </Link>
                <Link to={`/service-areas/${town.slug}`} className="text-primary font-semibold hover:underline">
                  {town.name}, NC service overview
                </Link>
                <Link to="/consultation" className="text-primary font-semibold hover:underline">
                  Request a {town.name} consultation
                </Link>
              </div>
            </div>

            {/* Inline lead form */}
            <aside className="bg-muted/30 rounded-lg p-6 h-fit sticky top-24">
              <h3 className="font-heading font-bold text-xl mb-2">
                {entry.serviceLabel} in {town.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tell us the basics. A project advisor responds the same business day — most {town.name} assessments are on the calendar within 48 hours.
              </p>
              <InspectionForm />
            </aside>
          </div>

          <div className="mt-16 md:mt-20 space-y-14">
            <LocalProjectProof
              town={{ name: town.name, slug: town.slug, county: town.county }}
              category="roofing"
              limit={3}
              heading={`Recent work near ${town.name}`}
            />
            <AttributedReviews town={town.name} />
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-muted/20">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              {entry.serviceLabel} in {town.name} — Frequently Asked
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final Conversion Pathway */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10 text-center">
            <span className="eyebrow mb-6 block text-[hsl(var(--gold-ink))]">Start Your Project</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">
              Ready to Upgrade Your <br className="hidden md:block" /> {town.name} Property?
            </h2>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-12 font-body leading-relaxed font-bold drop-shadow-sm">
              Our {town.name} division specializes in {entry.serviceLabel} and residential construction. Let's discuss your scope and timing today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/consultation" className="btn btn-primary btn-lg md:text-xl min-w-[320px]">
                Request a {entry.serviceLabel} Assessment <ArrowRight className="w-6 h-6" aria-hidden="true" />
              </Link>
              <a href={PHONE_TEL} className="btn btn-secondary btn-lg btn-on-dark md:text-xl min-w-[240px]">
                <Phone className="w-6 h-6 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* Knowledge Base Integration */}
        <section className="section-padding bg-muted/10 border-t border-border">
          <div className="container-tight">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="eyebrow mb-3 block">Expertise</span>
                <h3 className="text-3xl font-heading font-bold">{entry.serviceLabel} Insights</h3>
                <p className="text-muted-foreground mt-2 font-body">Expert guidance on {entry.serviceLabel.toLowerCase()} in {town.name}.</p>
              </div>
              <Link to="/blog" className="text-sm font-bold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all border-b border-primary/20 pb-1 group">
                Full Knowledge Base <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {linkableBlogPosts()
                .filter(b => b.category.toLowerCase().includes(entry.serviceLabel.toLowerCase().split(' ')[0]) || b.town === town.name)
                .slice(0, 3)
                .map((post) => (
                  <Link 
                    key={post.slug} 
                    to={`/blog/${post.slug}`}
                    className="group bg-card border border-border p-6 hover:border-primary/30 transition-all flex flex-col h-full shadow-flat hover:shadow-raised"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-none bg-primary/5 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-primary rotate-[-45deg]" aria-hidden="true" />
                      </div>
                      <span className="text-caption uppercase tracking-widest font-bold text-muted-foreground">{post.category}</span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">{post.title}</h4>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3 font-body flex-grow">{post.excerpt}</p>
                    <span className="text-caption uppercase tracking-widest font-bold text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Related — same town */}
        {relatedForTown.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-tight">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                Other services we provide in {town.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedForTown.map((r) => (
                  <Link
                    key={r.serviceSlug}
                    to={serviceTownHref(town.slug, r.serviceSlug)}
                    className="border border-border rounded-lg p-5 hover:border-accent transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-[hsl(var(--gold-ink))] mb-1 text-sm">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      <span>{town.name}, NC</span>
                    </div>
                    <div className="font-heading font-bold group-hover:text-[hsl(var(--gold-ink))] transition-colors">
                      {r.serviceLabel}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to={`/service-areas/${town.slug}`}
                  className="text-[hsl(var(--gold-ink))] font-semibold inline-flex items-center gap-2 hover:underline"
                >
                  See full {town.name} overview <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* 8. Internal Linking Engine - Nearby Areas */}
        <NearbyTowns currentTown={town} />
        <LocalLinkWeb
          heading={`${entry.serviceLabel} and more across ${town.county}`}
          intro={`Related ${town.name} services, the same work in neighboring towns, and local guides for ${town.name} homeowners.`}
          groups={getServiceTownLinkWeb(town, serviceSlug, entry.serviceLabel, resolvedCanonical)}
        />
        <RelatedLinks
          eyebrow="Keep Exploring"
          heading={`More for ${town.name} homeowners`}
          columns={2}
          links={[
            ...(getCountyHubLink(town.county) ? [getCountyHubLink(town.county)!] : []),
            { label: `${town.name} Service Area`, href: `/service-areas/${town.slug}`, description: `Local overview, projects, and coverage for ${town.name}.` },
            ...getTownBlogLinks(town.name, 3),
            estimateLink,
          ]}
        />
      </main>
      <ConversionTrustBlock variant="band" town={town.name} />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ServiceTownPage;