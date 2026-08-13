import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Sun, Droplets, Wrench, Shield, Award } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { towns } from "@/data/towns";
import veluxLogo from "@/assets/velux-certified-logo.jpg";
import VeluxProof from "@/components/VeluxProof";
import skylightsMobileHero from "@/assets/heroes/skylights-mobile.webp";
import CTABlock from "@/components/CTABlock";
import RelatedLinks from "@/components/RelatedLinks";
import VeluxWidget from "@/components/VeluxWidget";
import AnswerBlock from "@/components/seo/AnswerBlock";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import TieredOffer from "@/components/conversion/TieredOffer";
import CostContextBlock from "@/components/conversion/CostContextBlock";
import SchedulingReality from "@/components/conversion/SchedulingReality";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import AttributedReviews from "@/components/trust/AttributedReviews";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import ServiceInternalLinks from "@/components/ServiceInternalLinks";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";

const faqs = [
  { q: "Are you a certified VELUX installer?", a: "Yes. Highlander is a VELUX Certified Installer — trained and accredited by VELUX to install their skylights and Sun Tunnels to manufacturer specification. That accreditation is what unlocks VELUX's installation warranty on top of the product warranty." },
  { q: "Do skylights leak?", a: "Properly installed VELUX skylights with their engineered flashing kit don't leak. Almost every leak we're called out to inspect traces back to a non-kit flashing job, an aging seal on a 20+ year unit, or surrounding roof failure — not the skylight itself." },
  { q: "Can a skylight be added to an existing roof?", a: "In most cases, yes. We coordinate the cut, framing, flashing, and interior light shaft as a single scope so the skylight and the roof system are warrantied together — not handed off between trades." },
  { q: "How long does a VELUX skylight last?", a: "VELUX deck-mounted skylights typically run 20–25 years before the seals and flashings warrant replacement. We document install date and unit IDs at handoff so future service work is straightforward." },
  { q: "Do you replace skylights during a roof replacement?", a: "We strongly recommend it. Reflashing an aging skylight under a brand-new roof is the most common source of preventable leaks we see in the field. Replacement is far cheaper now than a callback later." },
];

const issues = [
  { icon: Droplets, title: "Active leaks around the curb", body: "Usually a flashing kit issue, failed seal on an aging unit, or improper underlayment integration — not the skylight glass itself." },
  { icon: Sun, title: "Condensation on the interior glass", body: "Often a ventilation and humidity issue inside the home, not a skylight defect. We diagnose before we replace." },
  { icon: Wrench, title: "Cracked or fogged glazing", body: "Failed insulating glass unit. The skylight frame can stay; the glazing is replaced as a serviceable component on most VELUX models." },
  { icon: Shield, title: "Old skylights under a new roof", body: "If your skylights are 15+ years old and you're re-roofing, replace them in the same scope. Re-flashing aged units under a new roof is the #1 preventable leak source we see." },
];

const services = [
  "VELUX deck-mounted skylights (fixed, venting, electric, solar-powered)",
  "VELUX Sun Tunnel installation for interior rooms with no roof access",
  "Engineered VELUX flashing kits — never a field-fabricated substitute",
  "Full interior light shaft framing, drywall, and finish coordination",
  "Skylight replacement during roof replacement (single scope, single warranty)",
  "Leak diagnosis, flashing repair, and glazing replacement on existing units",
];

const Skylights = () => {
  return (
    <>
      <SEOHead
        title="VELUX Skylight Installation in Western NC"
        description="VELUX Certified Installer for Franklin, Highlands, Cashiers, and Sylva — skylight installation, replacement, leak repair, and Sun Tunnels."
        path="/roofing/skylights"
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: "VELUX Skylight Installation",
            description: "VELUX Certified skylight installation, replacement, and repair across Western North Carolina.",
            url: "/roofing/skylights",
            areaServed: "Western North Carolina",
          },
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Roofing", url: "/roofing" },
            { name: "Skylights", url: "/roofing/skylights" },
          ],
          faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <ServicePageTemplate
        alternateSurfaces={false}
        beforeHero={
          <PageBreadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Roofing", url: "/roofing" },
              { name: "Skylights", url: "/roofing/skylights" },
            ]}
          />
        }
        hero={
          <section className="relative min-h-[65vh] md:min-h-[80vh] flex items-end overflow-hidden pt-32 md:pt-40 pb-14 md:pb-20">
            <div className="absolute inset-0">
              <picture>
                <source media="(max-width: 767px)" srcSet={skylightsMobileHero} />
                <img width={1600} height={1067} decoding="async" src={skylightsMobileHero} alt="Interior mountain great room with VELUX skylights and warm sunlight in Western North Carolina" className="w-full h-full object-cover object-center" loading="eager" />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.72)] via-[hsl(var(--hero-overlay)/0.45)] to-[hsl(var(--hero-overlay)/0.15)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.55)] via-transparent to-transparent" />
            </div>
            <div className="container-tight relative z-10">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/10">
                    <img loading="lazy" decoding="async" src={veluxLogo} alt="VELUX Certified Installer" className="w-full h-full object-contain p-2" />
                  </div>
                  <span className="text-caption md:text-caption font-body font-semibold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">
                    VELUX Certified Installer
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-balance">
                  Skylight Installation & Repair, Done Right.
                </h1>
                <p className="text-white/90 max-w-2xl text-base md:text-lg mb-8">
                  Team-led, VELUX Certified skylight installation across Western NC. Deck-mounted units, Sun Tunnels, and full leak diagnosis — coordinated with the roof system so the warranty actually holds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/consultation" className="btn btn-primary btn-md">
                    See What My Skylights Need <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="tel:+18285247773" className="btn btn-secondary btn-md btn-on-dark">
                    <Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        }
        quickAnswer={
          <AnswerBlock
            question="What is skylight installation and replacement?"
            answer="Skylight work covers installing new units, replacing aging or leaking units, and rebuilding the curb and flashing that keeps them watertight. Most skylight leaks trace back to flashing and surrounding roof detail rather than the glass itself. Highlander installs and replaces skylights as part of roofing projects across Western North Carolina."
            points={["New installs, replacements, and flashing rebuilds", "Leak diagnosis at the curb and flashing, not guesswork", "Handled together with the surrounding roof system"]}
          />
        }
        whatWeDo={
          <section className="section-padding bg-muted/20">
            <div className="container-tight">
              <div className="max-w-2xl mb-10">
                <div className="text-[hsl(var(--gold-ink))] text-sm font-semibold uppercase tracking-wider mb-3">Common Skylight Issues</div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">What we actually see in the field</h2>
                <p className="text-muted-foreground">
                  Most "bad skylight" calls aren't a defective skylight. Here's what's really happening — and how we diagnose it before recommending a replacement.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {issues.map((i) => (
                  <div key={i.title} className="border border-border rounded-lg p-6 bg-background">
                    <i.icon className="w-7 h-7 text-[hsl(var(--gold-ink))] mb-3" />
                    <div className="font-heading font-bold text-lg mb-2">{i.title}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{i.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
        whatsIncluded={
          <section className="section-padding bg-background">
            <div className="container-tight space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[hsl(var(--gold-ink))] text-sm font-semibold uppercase tracking-wider">
                  <Award className="w-4 h-4" aria-hidden="true" /> Manufacturer-Accredited Scope
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold">What VELUX Certified installation includes</h2>
                <p className="text-muted-foreground">
                  A VELUX Certified Installer is trained and accredited by VELUX to install their skylights to spec — flashing kit, underlayment integration, fasteners, and interior shaft all coordinated as one assembly. That's what makes the VELUX installation warranty stick.
                </p>
                <ul className="space-y-3">
                  {services.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        }
        costContext={<CostContextBlock serviceLabel="skylight" />}
        process={<SchedulingReality serviceLabel="skylight" />}
        proof={
          <>
            <VeluxProof />
            <TieredOffer context="skylights" primaryLabel="Get My Skylight Assessed" />
            <CommonConcerns />
            <WhoShowsUp />
            <section className="section-padding bg-muted/20">
              <div className="container-tight">
                <AttributedReviews category="roofing" heading="What homeowners say about our skylight work" />
              </div>
            </section>
            <ConversionTrustBlock variant="band" category="roofing" />
          </>
        }
        faq={
          <section className="section-padding bg-background">
            <div className="container-tight max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Skylight FAQs</h2>
              <Accordion type="single" collapsible>
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`sk-${i}`}>
                    <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        }
        coverage={
          <>
            <section className="section-padding bg-background">
              <div className="container-tight">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Related roofing services</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { href: "/roofing/roof-replacement", title: "Roof Replacement", desc: "Replace skylights in the same scope as the roof." },
                    { href: "/roofing/roof-repair", title: "Roof Repair", desc: "Targeted flashing and leak repair around penetrations." },
                    { href: "/roofing/metal", title: "Metal Roofing", desc: "Standing seam systems with skylight integration." },
                    { href: "/roofing/storm-damage", title: "Storm Damage", desc: "Hail and impact damage on skylight glazing." },
                    { href: "/roofing/brava-synthetic", title: "Brava / Synthetic", desc: "Premium composite roofs with VELUX integration." },
                    { href: "/roofing", title: "All Roofing Services", desc: "Browse our full roofing division." },
                  ].map((s) => (
                    <Link key={s.href} to={s.href} className="border border-border rounded-lg p-5 hover:border-accent transition-colors group">
                      <div className="font-heading font-bold mb-1 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{s.title}</div>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="section-padding bg-muted/20">
              <div className="container-tight">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Skylight service across the Western NC mountains</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">VELUX Certified skylight installation and repair throughout our 10-county service area in Western North Carolina.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {towns.map((t) => (
                    <Link
                      key={t.slug}
                      to={`/service-areas/${t.slug}`}
                      className="bg-background border border-border rounded-lg p-4 text-center hover:border-accent/40 hover:shadow transition-all"
                    >
                      <div className="font-heading font-semibold text-foreground">{t.name}</div>
                      <p className="text-muted-foreground text-xs mt-1">{t.county}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <RelatedLinks
              eyebrow="Keep Exploring"
              heading="Related pages you may find useful"
              columns={2}
              links={[
                { label: "Roofing Services Hub", href: "/roofing", description: "Full roofing division overview" },
                { label: "Metal Roofing for Mountain Homes", href: "/roofing/metal", description: "Standing seam and metal panel options" },
                { label: "Roof Replacement Options", href: "/roofing/roof-replacement", description: "Plan a re-roof around your skylights" },
                { label: "Highlands, NC Service Area", href: "/service-areas/highlands-nc", description: "Roofing and skylight service in Highlands" },
                { label: "Recent Highlander Projects", href: "/recent-projects", description: "Skylight and roofing project gallery" },
                { label: "Request an Inspection", href: "/request-inspection", description: "Get a written scope and estimate" }
              ]}
            />
            <ServiceInternalLinks title="Skylights" slug="skylights" />
          </>
        }
        cta={<CTABlock />}
        afterCta={<VeluxWidget />}
      />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Skylights;
