import { PHONE_DISPLAY } from "@/data/business";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Droplets, Shield, Wind, Home, ChevronRight } from "lucide-react";
import guttersImg from "@/assets/gallery/gutters-002.jpg";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import AttributedReviews from "@/components/trust/AttributedReviews";
import CTABlock from "@/components/CTABlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import RelatedLinks from "@/components/RelatedLinks";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import AnswerBlock from "@/components/seo/AnswerBlock";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import TieredOffer from "@/components/conversion/TieredOffer";
import CostOfWaiting from "@/components/conversion/CostOfWaiting";
import CostContextBlock from "@/components/conversion/CostContextBlock";
import SchedulingReality from "@/components/conversion/SchedulingReality";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import ServiceInternalLinks from "@/components/ServiceInternalLinks";

const faqs = [
  { q: "What size gutters do mountain homes need?", a: "Most WNC homes benefit from 6-inch gutters with oversized 3x4 downspouts. The steep terrain and heavy rainfall here demand higher-capacity systems than standard 5-inch gutters provide." },
  { q: "How much do new gutters cost in Western NC?", a: "Pricing is based on linear footage, drop count, material, and whether guards are added. We provide a tailored estimate after measuring your home." },
  { q: "Do you install gutter guards?", a: "Yes. We install micro-mesh and reverse-curve gutter guards that prevent leaves, pine needles, and debris from clogging your gutters — especially important in WNC's heavily wooded areas." },
  { q: "Can you repair existing gutters instead of replacing them?", a: "Often, yes. We repair leaking seams, rehang sagging sections, and replace damaged segments. We'll recommend repair vs. replacement based on your gutter's age and overall condition." },
  { q: "Do you install seamless gutters?", a: "Yes — seamless aluminum is our standard. Seams are the most common failure point on older gutter runs, so we roll continuous lengths on-site to match each elevation of the home." },
  { q: "Can you coordinate gutters with a new roof install?", a: "Yes. When we replace a roof, we detail the eaves, drip edge, and gutter attachment as one system. Gutters installed after a fresh roof by a separate crew often leak at the transition — we plan the two together." },
];

const Gutters = () => {
  return (
    <>
      <SEOHead
        title="Seamless Gutter Installation in Western NC | Highlander"
        description="Gutter installation, seamless gutters, replacement, and drainage support for homes in Franklin, Highlands, Cashiers, Sylva, and Western NC."
        path="/roofing/gutters"
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: "Gutter Services",
            description: "Seamless gutter installation, gutter guards, repair, and drainage coordination across Western North Carolina.",
            url: "/roofing/gutters",
            areaServed: "Western North Carolina",
          },
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Roofing", url: "/roofing" },
            { name: "Gutters", url: "/roofing/gutters" },
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
            { name: "Gutters", url: "/roofing/gutters" },
          ]}
        />
        }
        hero={<>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden hero-clears-header pb-32 md:pb-48">
          <div className="absolute inset-0">
            <img width={1600} height={1067} decoding="async"
              src={guttersImg}
              alt="Seamless aluminum gutters on a Western North Carolina mountain home"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.75)] via-[hsl(var(--hero-overlay)/0.45)] to-[hsl(var(--hero-overlay)/0.2)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.65)] via-transparent to-[hsl(var(--hero-overlay)/0.25)]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 0.4, delay: 0.3 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/roofing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-white/10 flex items-center justify-center"><Home className="w-4 h-4 text-white" aria-hidden="true" /></div>
                  <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-white/85">Roofing</span>
                </Link>
                <ChevronRight className="w-4 h-4 text-white/90" aria-hidden="true" />
                <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))]">Gutters</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  Seamless Gutters
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  Built for Mountain Rain.
                </motion.div>
              </div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="text-base md:text-lg text-white/90 max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Seamless aluminum and copper gutter systems, gutter guards, and drainage coordination — sized for Western NC's heavy rainfall, steep terrain, and heavily wooded lots.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="btn btn-primary btn-md group">
                  See What My Gutters Need <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <a href="tel:+18285247773" className="btn btn-secondary btn-lg btn-on-dark">
                  <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
              </motion.div>
            </div>
          </div>
        </section>
        </>}
        quickAnswer={<>
        <AnswerBlock
          question="What do gutters do on a mountain home, and who needs them?"
          answer="Gutters and downspouts move roof runoff away from the fascia, siding, and foundation. In Western North Carolina, where rainfall is heavy and lots are often sloped, sizing and discharge placement matter as much as the gutter itself. Highlander installs and replaces gutter systems as part of roof and exterior work throughout the region."
          points={["Sizing matched to roof area and local rainfall", "Downspout routing that protects foundations on sloped lots", "Coordinated with roof edge, drip edge, and fascia detail"]}
        />
        </>}
        whatWeDo={<>
        {/* ─── WHY GUTTERS MATTER IN WNC ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl text-center">
            <span className="eyebrow mb-3 block">Why It Matters</span>
            <h2 className="section-heading mb-6">Water Management Is a<br className="hidden md:block" /> Mountain-Home Problem.</h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto">
              Western NC gets some of the highest rainfall totals east of the Cascades, on steep lots surrounded by hardwoods and pines. Undersized or clogged gutters push water back under the eaves, saturate foundations, ice over walkways in winter, and quietly rot fascia and trim. A properly sized system solves all of it.
            </p>
          </div>
        </section>

        {/* ─── SERVICES GRID ─── */}
        <section className="section-padding bg-muted/20">
          <div className="container-tight grid md:grid-cols-3 gap-6">
            {[
              { icon: Droplets, title: "Seamless installation", body: "Continuous aluminum runs rolled on-site — no factory seams, no leaks between drops. Copper available for premium homes and historic details." },
              { icon: Shield, title: "Guards & protection", body: "Micro-mesh and reverse-curve guards that actually hold up under pine needle load, so gutters stay clear year-round in wooded WNC lots." },
              { icon: Wind, title: "Repair & replacement", body: "Reseal leaking seams, rehang sagging runs, replace damaged sections, or fully replace an undersized system with a properly capacitized one." },
            ].map((b) => (
              <div key={b.title} className="border border-border rounded-lg p-6">
                <b.icon className="w-8 h-8 text-[hsl(var(--gold-ink))] mb-3" />
                <div className="font-heading font-bold text-xl mb-2">{b.title}</div>
                <p className="text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </section>
        </>}
        whatsIncluded={<>
        {/* ─── WHAT'S INCLUDED ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <div className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">What We Install</span>
              <h2 className="section-heading mb-4">A Complete Gutter &<br className="hidden md:block" /> Drainage System.</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "Seamless aluminum gutters — 6\" standard for WNC rainfall",
                "Copper gutter systems for premium and historic homes",
                "Oversized 3×4 downspouts sized to peak-storm volume",
                "Micro-mesh and reverse-curve gutter guards",
                "Custom downspout routing and splash-block or extension planning",
                "Gutter repair, resealing, and rehanging",
                "Coordination with roof replacement — eaves, drip edge, and attachment as one detail",
                "French drain and grading coordination where site drainage is the real problem",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-foreground/80 font-body leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        </>}
        costContext={<>
        <CostOfWaiting variant="gutters" />
        <CostContextBlock serviceLabel="gutter" variant="gutters" />
        </>}
        process={<>
        <SchedulingReality serviceLabel="gutter" />
        <InspectionForm />
        </>}
        proof={<>
        <TieredOffer context="gutters" primaryLabel="Get My Gutters Assessed" />
        <div className="container-tight pt-16 md:pt-20">
          <AttributedReviews category="roofing" heading="What homeowners say about our gutter work" />
        </div>
        <WhoShowsUp />
        </>}
        faq={<>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Gutter FAQs</span>
              <h2 className="section-heading mb-4">Common Questions About<br className="hidden md:block" /> Gutters in WNC.</h2>
            </motion.div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`g-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-flat transition-all duration-300">
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                      <span className="font-heading font-semibold text-foreground text-body-sm leading-snug text-left">{f.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pr-2">
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">{f.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>
        </>}
        coverage={<>
      <RelatedLinks
          eyebrow="Keep Exploring"
          heading="Related pages you may find useful"
          columns={2}
          links={[
            { label: "Roofing Services Hub", href: "/roofing", description: "Full roofing division overview" },
            { label: "Roof Repair in Western NC", href: "/roofing/roof-repair", description: "Leaks, storm damage, and repair options" },
            { label: "Roof Replacement Options", href: "/roofing/roof-replacement", description: "Materials, planning, and process" },
            { label: "Recent Highlander Projects", href: "/recent-projects", description: "See gutter and roofing work across WNC" },
            { label: "Request an Inspection", href: "/request-inspection", description: "Get a written scope and estimate" },
            { label: "Get My Questions Answered", href: "/contact", description: "Talk to a project advisor" }
          ]}
        />
        <ServiceInternalLinks title="Seamless Gutters" slug="gutters" />
        </>}
        cta={<>
        <CommonConcerns />
        <CTABlock />
        <ConversionTrustBlock variant="band" category="roofing" />
        </>}
      />

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Gutters;