import AnswerBlock from "@/components/seo/AnswerBlock";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, MapPin } from "lucide-react";
import SEOHead, {
  townSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import NearbyTowns from "@/components/NearbyTowns";
import { getTownBySlug, towns } from "@/data/towns";
import {
  getServiceTownEntry,
  getServiceTownEntriesForTown,
  tier1FlatEntries,
  tier2FlatEntries,
} from "@/data/service-town-content";
import { blogPosts } from "@/data/blogs";
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

// Per-service hero overrides so the same town's services don't all show the
// identical photo. Each image is a regionally-themed mountain/home stock
// photo — alt text remains region-honest ("Western North Carolina").
// Replace with real Highlander project photos before launch.
const SERVICE_HERO_VARIANTS: Record<string, string> = {
  "roof-replacement":
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2000",
  "roof-repair":
    "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=2000",
  "metal-roofing":
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=2000",
  "synthetic-brava":
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=2000",
  "additions":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  "renovations":
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
  "outdoor-living":
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000",
  "roofing":
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=2000",
  "construction":
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000",
  "home-repairs":
    "https://images.unsplash.com/photo-1581091012184-5c8a7f5e4f7f?auto=format&fit=crop&q=80&w=2000",
  "roofing-construction":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
};

interface ServiceTownPageProps {
  townSlug?: string;
  serviceSlug?: string;
  canonicalPath?: string;
}

const ServiceTownPage = ({
  townSlug: propTownSlug,
  serviceSlug: propServiceSlug,
  canonicalPath,
}: ServiceTownPageProps = {}) => {
  const params = useParams();
  const townSlug = propTownSlug ?? params.townSlug ?? "";
  const serviceSlug = propServiceSlug ?? params.serviceSlug ?? "";
  const town = getTownBySlug(townSlug);
  const entry = getServiceTownEntry(townSlug, serviceSlug);

  if (!town || !entry) {
    return <Navigate to={town ? `/service-areas/${town.slug}` : "/service-areas"} replace />;
  }

  const heroImage = SERVICE_HERO_VARIANTS[serviceSlug] ?? town.heroImage;
  const urgent = isUrgentIntentPath(`/service-areas/${townSlug}/${serviceSlug}`);

  // If this town+service is a Tier 1 pair, the flat URL is canonical
  // regardless of which route the user arrived on.
  const tier1 = tier1FlatEntries.find(
    (t) => t.townSlug === townSlug && t.serviceSlug === serviceSlug,
  );
  const tier2 = tier2FlatEntries.find(
    (t) => t.townSlug === townSlug && t.serviceSlug === serviceSlug,
  );
  const resolvedCanonical =
    canonicalPath ??
    (tier1
      ? `/${tier1.flatSlug}`
      : tier2
        ? `/${tier2.flatSlug}`
        : `/service-areas/${townSlug}/${serviceSlug}`);

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
        jsonLd={[
          townSchema({
            name: town.name,
            slug: town.slug,
            county: town.county,
            state: town.state,
            description: entry.intro,
          }),
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
        <section className="dark-surface relative min-h-[60svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img width={1600} height={1067} loading="eager" fetchPriority="high" decoding="async" 
              src={heroImage}
              alt={`${entry.serviceLabel} on a mountain home in Western North Carolina — Highlander Building Services service area: ${town.name}, ${town.state}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.4)] via-[hsl(var(--hero-overlay)/0.2)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.35)] via-transparent to-transparent" />
            
            {/* Heritage Tartan Accent — Restrained and Subtle */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }} />
            
            {/* Subtle Bottom Heritage Trim */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[url('/tartan.png')] bg-repeat-x bg-[length:100px_auto] opacity-30 z-30" />
          </div>

          <div className="container-tight relative z-10 pt-32 md:pt-40 pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-[hsl(var(--gold-ink))] mb-6">
                <MapPin className="w-4 h-4" />
                <span className="font-bold text-sm uppercase tracking-[0.2em]">
                  {town.county}, {town.state}
                </span>
              </div>
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold mb-4 text-balance leading-[0.95] tracking-tightest text-white">
                {entry.h1}
              </h1>
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
                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-white/85 font-bold mb-0.5 md:mb-1">{stat.label}</span>
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
            `${entry.serviceLabel} in ${town.name} and across ${town.county} County`,
            "Call 828-524-7773 for a direct answer",
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
                Tell us the basics. A project advisor responds within as soon as possible — most {town.name} assessments are on the calendar inside 48 hours.
              </p>
              <InspectionForm />
            </aside>
          </div>

          <div className="mt-16 md:mt-20 space-y-14">
            <LocalProjectProof
              town={{ name: town.name, slug: town.slug, county: town.county }}
              category="roofing"
              heading={`${entry.serviceLabel} work near ${town.name}`}
            />
            <AttributedReviews town={town.name} category="roofing" />
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
              <Link to="/consultation" className="cta-gradient text-accent-foreground font-heading font-bold text-lg md:text-xl px-12 py-7 rounded-none inline-flex items-center gap-3 hover:scale-105 transition-all shadow-2xl min-w-[320px] justify-center uppercase tracking-wider">
                Request a {entry.serviceLabel} Assessment <ArrowRight className="w-6 h-6" />
              </Link>
              <a href="tel:+18285247773" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg md:text-xl px-12 py-7 rounded-none inline-flex items-center justify-center gap-3 hover:bg-white/20 transition-all min-w-[240px]">
                <Phone className="w-6 h-6 text-[hsl(var(--gold-ink))]" /> (828) 524-7773
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
                Full Knowledge Base <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts
                .filter(b => b.category.toLowerCase().includes(entry.serviceLabel.toLowerCase().split(' ')[0]) || b.town === town.name)
                .slice(0, 3)
                .map((post) => (
                  <Link 
                    key={post.slug} 
                    to={`/blog/${post.slug}`}
                    className="group bg-card border border-border p-6 hover:border-primary/30 transition-all flex flex-col h-full shadow-sm hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-none bg-primary/5 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-primary rotate-[-45deg]" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{post.category}</span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">{post.title}</h4>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3 font-body flex-grow">{post.excerpt}</p>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
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
                    to={`/service-areas/${town.slug}/${r.serviceSlug}`}
                    className="border border-border rounded-lg p-5 hover:border-accent transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-[hsl(var(--gold-ink))] mb-1 text-sm">
                      <CheckCircle className="w-4 h-4" />
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
                  See full {town.name} overview <ArrowRight className="w-4 h-4" />
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