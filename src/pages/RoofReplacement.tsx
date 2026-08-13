import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, AlertTriangle, Layers, Eye, Ruler,
  ClipboardCheck, Hammer, BadgeCheck, Droplets, Wind,
  Thermometer, ChevronRight, ShieldCheck, Users,
  TrendingDown, DollarSign, Zap, FileText, MessageSquare
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageContext from "@/components/PageContext";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";

import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import asphalt001 from "@/assets/gallery/asphalt-001.webp";
import asphalt005 from "@/assets/gallery/asphalt-005.webp";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import asphalt008Avif from "@/assets/gallery/asphalt-008.webp?w=640;1024;1600&format=avif&as=srcset";
import asphalt008Webp from "@/assets/gallery/asphalt-008.webp?w=640;1024;1600&format=webp&as=srcset";
import HeroImage from "@/components/media/HeroImage";
import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-005.webp";
import metalCabin from "@/assets/gallery/metal-006.webp";
import replacementMobileHero from "@/assets/heroes/replacement-mobile.webp";
import RelatedLinks from "@/components/RelatedLinks";
import RealWorkWidget from "@/components/RealWorkWidget";
import AnswerBlock from "@/components/seo/AnswerBlock";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import TieredOffer from "@/components/conversion/TieredOffer";
import CostContextBlock from "@/components/conversion/CostContextBlock";
import SchedulingReality from "@/components/conversion/SchedulingReality";
import FinancingTeaser from "@/components/conversion/FinancingTeaser";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import AttributedReviews from "@/components/trust/AttributedReviews";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import ServiceInternalLinks from "@/components/ServiceInternalLinks";
import ConsultationCTA from "@/components/replacement/ConsultationCTA";
import MaterialComparison from "@/components/replacement/MaterialComparison";
import WrittenScopeIncludes from "@/components/replacement/WrittenScopeIncludes";
import HeroTrustLine from "@/components/hero/HeroTrustLine";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const replacementSigns = [
  { icon: Layers, title: "Widespread Granule Loss", detail: "When gutters consistently fill with granule material, it means the UV-protective layer across your shingles is failing systemically — not in one spot, but across the entire roof." },
  { icon: AlertTriangle, title: "Curling, Buckling, or Cracking", detail: "Shingles that curl at the edges, buckle in the center, or show widespread cracking have exhausted their structural integrity. Repairs at this stage are temporary at best." },
  { icon: Droplets, title: "Recurring or Multi-Point Leaks", detail: "A single leak may be repairable. But when water intrusion appears in multiple locations or keeps returning after repair, the underlying system has failed." },
  { icon: TrendingDown, title: "Visible Sagging or Decking Damage", detail: "A sagging roofline or soft, spongy decking beneath your feet indicates moisture has compromised the structural layer — a condition that worsens rapidly without intervention." },
  { icon: Clock, title: "Age Beyond Expected Lifespan", detail: "Asphalt shingles in WNC typically last 20–30 years. If your roof is approaching or past that window, proactive replacement lets you control timing, budget, and material choice." },
  { icon: DollarSign, title: "Rising Repair Costs", detail: "When annual repair expenses begin approaching the cost of amortized replacement, the math shifts. At some point, continued patching becomes the more expensive option." },
];

const risksOfWaiting = [
  { icon: Droplets, title: "Water Damage Escalation", detail: "A failing roof doesn't just leak — it allows moisture into insulation, framing, and interior finishes. What starts as a stain becomes mold, rot, and structural compromise." },
  { icon: DollarSign, title: "Increased Total Project Cost", detail: "Waiting until emergency failure means emergency pricing, limited material availability, and potential structural repairs that wouldn't have been needed six months earlier." },
  { icon: Thermometer, title: "Energy Efficiency Loss", detail: "A deteriorating roof compromises insulation and ventilation performance, driving up heating and cooling costs throughout the year — especially at mountain elevations." },
  { icon: TrendingDown, title: "Property Value Decline", detail: "Roof condition is one of the first things buyers, appraisers, and inspectors evaluate. A visibly aging roof directly impacts your home's market value and saleability." },
];

const rightWayPillars = [
  {
    icon: Eye,
    title: "Thorough Assessment Before Anything Else",
    detail: "We don't quote from the driveway. Every replacement begins with a comprehensive on-site evaluation — measuring, photographing, and documenting every condition that will shape the scope of work.",
  },
  {
    icon: Ruler,
    title: "Site-Specific Material Specification",
    detail: "Your roof's materials are selected based on your property's actual conditions — elevation, wind exposure, sun orientation, pitch, and snow load potential. Not from a price list.",
  },
  {
    icon: FileText,
    title: "Transparent, Detailed Proposals",
    detail: "You receive a grouped-cost proposal that explains exactly what's included, what materials will be used, what the timeline looks like, and what the total cost will be. No ambiguity.",
  },
  {
    icon: Users,
    title: "Our Crews, Our Standards",
    detail: "Your replacement is installed by Highlander employees — trained, certified, and directly accountable. The crew that shows up on day one is the same team you met during your consultation.",
  },
  {
    icon: ShieldCheck,
    title: "Quality at Every Layer",
    detail: "From decking inspection to ice shield placement to final fastener patterns — every layer is installed to manufacturer specification, verified by our quality checklist, and documented.",
  },
  {
    icon: MessageSquare,
    title: "Communication Throughout",
    detail: "Daily updates. Named project contacts. Clear answers to every question. You'll never wonder what's happening on your property — because we'll tell you before you have to ask.",
  },
];

const materials = [
  {
    name: "CertainTeed Landmark PRO",
    type: "Dimensional Asphalt",
    lifespan: "Long service life",
    detail: "Our most-installed residential shingle. Impact-resistant, algae-resistant, 20+ designer colors. The best value-to-performance ratio for WNC mountain homes.",
    image: asphalt006,
  },
  {
    name: "Standing Seam Metal",
    type: "Custom-Fabricated Panels",
    lifespan: "Premium long-term system",
    detail: "Concealed fastener systems rated for 140mph wind uplift. Zero maintenance, superior snow shedding, and energy-efficient reflectivity. The premium long-term investment.",
    image: metalRoof,
  },
  {
    name: "Premium Cedar Shake",
    type: "Western Red Cedar",
    lifespan: "30–40 years",
    detail: "Natural insulation, distinctive mountain character, and a timeless aesthetic that ages beautifully. Ideal for estate and heritage properties across Highlands and Cashiers.",
    image: cedarRoof,
  },
];

const timelineSteps = [
  { number: "01", title: "Consultation Call", duration: "15–30 min", description: "We discuss your situation, answer initial questions, and schedule a convenient time for your property assessment." },
  { number: "02", title: "On-Site Assessment", duration: "60–90 min", description: "Complete roof evaluation with documentation — surface condition, flashing, ventilation, decking visibility, and measurements." },
  { number: "03", title: "Proposal Delivery", duration: "2–5 business days", description: "Detailed, grouped-cost proposal with material specifications, scope, timeline, warranty details, and total investment." },
  { number: "04", title: "Material Ordering & Scheduling", duration: "1–3 weeks", description: "Once approved, materials are ordered to your specification and installation is scheduled at a date that works for you." },
  { number: "05", title: "Installation", duration: "2–5 days typical", description: "Complete tear-off, decking inspection, underlayment, new material installation, flashing, ventilation, and cleanup — daily." },
  { number: "06", title: "Final Walkthrough & Warranty", duration: "Same day", description: "Multi-point quality inspection followed by a personal walkthrough. You receive your complete warranty package before we leave." },
];

const trustProof = [
  { value: "4.9★", label: "Google Rating", detail: "Across Highlands, Cashiers, Franklin, Sylva & surrounding communities" },
  { value: "Top 1%", label: "CertainTeed Certification", detail: "ShingleMaster Credentialed Contractor — held by fewer than 1% of contractors nationally" },
  { value: "4.7★", label: "Google Rating", detail: "Earned through consistent quality, communication, and follow-through" },
  { value: "Rapid", label: "Storm Response", detail: "Emergency tarping and priority scheduling when weather strikes" },
];

const galleryItems = [
  { image: asphaltHero, title: "Complete Replacement — Highlands", category: "Shingle" },
  { image: metalRoof, title: "Standing Seam — Cashiers Estate", category: "Metal" },
  { image: asphalt005, title: "Dimensional Shingles — Franklin", category: "Shingle" },
  { image: metalCabin, title: "Metal Roof — Bryson City", category: "Metal" },
  { image: asphalt007, title: "Re-Roof — Mountain Home", category: "Shingle" },
  { image: cedarRoof, title: "Cedar Shake — Highlands", category: "Cedar" },
];

const faqs = [
  { q: "How much does a roof replacement cost in Western North Carolina?", a: "Replacement pricing is scope-based — it depends on roof size, material choice, pitch complexity, and access conditions. Rather than publish a generic range, we provide a detailed, grouped-cost proposal after assessing your specific property — no ballpark figures, no surprises." },
  { q: "How long does a full roof replacement take?", a: "Most residential replacements are completed in 2–5 days depending on size, complexity, and weather. Steep-pitch and complex multi-gable homes may take slightly longer. We'll provide a specific timeline in your proposal and communicate daily throughout the project." },
  { q: "Can I put a new roof over my existing shingles?", a: "We generally recommend full tear-off rather than layering. Overlay hides potential decking damage, adds excessive weight, voids many warranties, and shortens the new roof's lifespan. A clean tear-off lets us inspect every square foot of decking and install to full manufacturer specification." },
  { q: "What's the best roofing material for mountain homes?", a: "It depends on your property's elevation, wind exposure, design theme, and budget. CertainTeed Landmark PRO dimensional shingles offer the best value-to-performance ratio for most WNC homes. Standing seam metal is the premium long-term choice. We'll recommend based on your specific conditions." },
  { q: "Do you handle the old roof removal and disposal?", a: "Yes. We handle complete tear-off, debris removal, and disposal. Your property is cleaned daily with magnetic nail sweeps and full debris removal. We leave your property cleaner than we found it." },
  { q: "What warranties come with a roof replacement?", a: "Every replacement includes the manufacturer's material warranty (per the manufacturer's terms for the specified product line) plus Highlander's labor warranty. You receive a complete physical warranty package at your final walkthrough — documentation you can file and reference for decades." },
  { q: "Will my homeowner's insurance cover roof replacement?", a: "If your roof was damaged by a covered event (storm, hail, fallen tree), your insurance may cover part or all of the replacement. We provide complete damage documentation, meet with your adjuster on-site, and coordinate the claim process from start to finish." },
  { q: "How do I know when it's time to replace rather than repair?", a: "If damage is isolated and your roof is under 15 years old, repair may be the right call. If you're seeing widespread shingle deterioration, recurring leaks, or your roof is 20+ years old, replacement is typically the better long-term investment. We'll assess honestly and explain both options." },
  { q: "Do you offer financing for roof replacement?", a: "Yes. We offer flexible financing options to make roof replacement accessible regardless of timing. Ask about payment plans during your consultation — there's no obligation and no pressure." },
  { q: "Can I stay in my home during the replacement?", a: "Yes. While roof replacement involves significant noise, most homeowners stay in their homes throughout. We'll brief you on what to expect each day and take every precaution to minimize disruption to your household." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const RoofReplacement = () => {
  return (
    <>
      <SEOHead
        title="Roof Replacement for Mountain Homes in Western NC"
        description="Roof replacement for Western North Carolina homes: site-specific material specification, certified installation, and transparent written proposals."
        path="/roofing/roof-replacement"
        jsonLd={[
          serviceSchema({ name: "Roof Replacement", description: "Full roof replacement for mountain homes across Western North Carolina.", url: "/roofing/roof-replacement" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Roof Replacement", url: "/roofing/roof-replacement" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Roof Replacement", url: "/roofing/roof-replacement" }]} />
      <main id="main-content">
        <ServicePageTemplate
          alternateSurfaces={false}
          hero={
            <>
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 767px)" srcSet={replacementMobileHero} />
              <HeroImage src={asphalt008} avifSrcSet={asphalt008Avif} webpSrcSet={asphalt008Webp} alt="Roof replacement in progress on a mountain home in Western North Carolina" className="w-full h-full object-cover object-[50%_35%] md:object-center" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 0.4, delay: 0.3 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-10 md:pb-20 pt-24 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex items-center gap-3 mb-4 md:mb-6">
                <Link to="/roofing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-4 h-4 text-primary-foreground" aria-hidden="true" /></div>
                  <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground">Roofing</span>
                </Link>
                <ChevronRight className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
                <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))]">Roof Replacement</span>
              </motion.div>

              <div className="overflow-hidden mb-3 md:mb-4">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-heading md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.0] md:leading-[1.05] tracking-tight">
                  Roof Replacement Across{" "}
                  <span className="text-[hsl(var(--gold-ink))]">Western NC</span>
                </motion.h1>
                <PageContext division="Roofing Division" area="Western North Carolina" tone="dark" className="mt-3" />
              </div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="text-body-lg md:text-body-xl text-white/85 max-w-xl mb-5 md:mb-10 leading-snug md:leading-relaxed font-body font-medium drop-shadow-sm">
                We measure your home, spec a system for your elevation, and hand you a firm written price.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="btn btn-primary btn-md group relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                   <span className="relative">See What My Roof Needs</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <a href="tel:+18285247773" className="btn btn-secondary btn-lg btn-on-dark group">
                  <Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773
                </a>
              </motion.div>

              <HeroTrustLine className="mt-4 md:mt-6" />

              {/* Investment callout — desktop only; keeps the mobile fold clean */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="hidden md:block mt-10 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm max-w-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-primary-foreground font-body font-semibold">How We Price Replacement</span>
                </div>
                <div className="text-2xl font-heading font-bold text-primary-foreground">Scope-based, grouped-cost</div>
                <p className="text-xs text-primary-foreground mt-1 font-body">Every roof is priced from its real scope after on-site assessment — no generic ranges, no allowances disguised as estimates.</p>
              </motion.div>
            </div>
          </div>
        </section>
            </>
          }
          quickAnswer={
            <>
        <AnswerBlock
          question="What is a roof replacement, and who needs one?"
          answer="A roof replacement removes the existing roof down to the deck, repairs damaged sheathing, and installs a new system — underlayment, flashing, ventilation, and finish material. Homeowners typically need one when the roof is at end of life, has widespread damage, or keeps failing after repeated repairs. Highlander replaces roofs on mountain homes throughout Western North Carolina."
          points={["Full tear-off with deck inspection and repair", "Underlayment, flashing, and ventilation rebuilt", "Asphalt, metal, and specialty systems available"]}
        />
            </>
          }
          whatWeDo={
            <>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center">
              <div className="w-12 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                A roof replacement isn't a repair. It's a generational investment in your home — one that determines how your property performs, looks, and holds value for decades to come.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mb-4">
                At Highlander, we treat every replacement with the weight it deserves. We don't rush proposals, cut corners on materials, or skip the steps that separate a roof that lasts from one that merely passes inspection. This is the most important exterior investment you'll make — and we build accordingly.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Know the Signs</span>
              <h2 className="section-heading mb-4">Signs Your Roof<br className="hidden md:block" /> Needs Replacement.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Not every problem means replacement. But when multiple signs appear together, they tell a clear story about your roof's remaining life.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {replacementSigns.map((sign, i) => (
                <motion.div key={sign.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <sign.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{sign.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{sign.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Our Approach</span>
              <h2 className="section-heading mb-4">Replacing the Roof<br className="hidden md:block" /> the Right Way.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                The difference between a roof that lasts 20 years and one that lasts 50 isn't just material — it's planning, specification, installation discipline, and accountability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {rightWayPillars.map((pillar, i) => (
                <motion.div key={pillar.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <pillar.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{pillar.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{pillar.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
            </>
          }
          whatsIncluded={
            <>
        <BuilderPromoBlock
          variant="band"
          preset="replacement"
          title="Plan your full replacement in detail"
          body="Optional guided builder for homeowners ready to specify materials, system features, and priorities. We use it to prepare a sharper proposal before we walk the roof."
          ctaLabel="Get My Replacement Scoped"
        />
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Materials</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Materials That Perform<br className="hidden md:block" /> at Elevation.
                </h2>
                <p className="text-dark-section-foreground text-base font-body max-w-lg mx-auto">
                  We specify materials based on where your home sits — not what's cheapest to install. Here are the three systems we recommend most for WNC roof replacements.
                </p>
              </motion.div>

              <div className="space-y-5">
                {materials.map((mat, i) => (
                  <motion.div key={mat.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group border border-dark-section-border rounded-sm overflow-hidden hover:border-[hsl(var(--highland-gold)/0.15)] bg-dark-section-foreground/[0.02] hover:bg-dark-section-foreground/[0.04] transition-all duration-300">
                    <div className="grid md:grid-cols-5 gap-0">
                      <div className="md:col-span-2 aspect-[16/10] md:aspect-auto">
                        <img width={1600} height={1067} decoding="async" src={mat.image} alt={mat.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
                      </div>
                      <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-heading font-bold text-dark-section-foreground text-lg group-hover:text-[hsl(var(--gold-ink))] transition-colors">{mat.name}</h3>
                          <span className="text-caption font-body font-semibold text-[hsl(var(--gold-ink))] bg-[hsl(var(--highland-gold)/0.06)] px-2.5 py-1 rounded-sm">{mat.lifespan}</span>
                        </div>
                        <span className="text-caption font-body text-dark-section-foreground mb-3">{mat.type}</span>
                        <p className="text-dark-section-foreground text-sm font-body leading-relaxed">{mat.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <MaterialComparison />
        <ConsultationCTA
          heading="Want the material call made for your specific roof?"
          subline="We spec by elevation, pitch, wind exposure, and how long you plan to hold the home — then put it in writing."
          label="Get My Material Recommendation"
        />
        <WrittenScopeIncludes />
            </>
          }
          costContext={
            <>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Why Timing Matters</span>
                <h2 className="section-heading mb-5">The Real Cost<br /> of Waiting.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
                  Delaying a necessary replacement rarely saves money. In most cases, it increases total project cost, expands the scope of damage, and removes your ability to plan on your own terms.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  The best time to replace a roof is before it fails — when you can choose materials deliberately, schedule around weather windows, and avoid emergency pricing.
                </p>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {risksOfWaiting.map((risk, i) => (
                  <motion.div key={risk.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group flex gap-4 p-5 md:p-6 rounded-sm bg-card border border-border hover:border-primary/15 card-lift">
                    <div className="w-10 h-10 rounded-sm bg-destructive/6 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/10 transition-colors">
                      <risk.icon className="w-5 h-5 text-destructive/70" />
                    </div>
                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-foreground transition-colors">{risk.title}</h3>
                      <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{risk.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <ConsultationCTA
          heading="Not sure whether you're at repair or replacement?"
          subline="A consultation gets you an honest read on your roof's remaining life and a written scope if replacement is the right call."
          label="See What My Roof Needs"
        />
        <CostContextBlock serviceLabel="roof replacement" />
        <section className="section-padding bg-background">
          <div className="container-tight">
            <FinancingTeaser serviceLabel="roof replacement" />
          </div>
        </section>
        <ConsultationCTA
          heading="Get the number for your roof, not a range."
          subline="Written, grouped-cost proposal after an on-site assessment — with payment options reviewed at the same visit."
          label="Get My Written Estimate"
        />
        <SchedulingReality serviceLabel="roof replacement" />
            </>
          }
          process={
            <>
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Timeline & Process</span>
              <h2 className="section-heading mb-4">From First Call to<br className="hidden md:block" /> Finished Roof.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                A structured process that removes uncertainty at every stage. Here's exactly what to expect — and roughly how long each phase takes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {timelineSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">{step.number}</span>
                  <span className="inline-block text-caption font-body font-semibold uppercase tracking-[0.12em] text-[hsl(var(--gold-ink))] bg-[hsl(var(--highland-gold)/0.08)] px-2 py-0.5 rounded-sm mb-4">{step.duration}</span>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
            </>
          }
          proof={
            <>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <span className="eyebrow mb-3 block">Why Homeowners Choose Highlander</span>
              <h2 className="section-heading">Built on Results,<br className="hidden md:block" /> Not Promises.</h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trustProof.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center p-5 md:p-6 bg-card border border-border rounded-sm">
                  <span className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--gold-ink))] block mb-2">{item.value}</span>
                  <span className="font-heading font-semibold text-foreground text-sm block mb-1">{item.label}</span>
                  <span className="text-muted-foreground text-caption font-body leading-snug">{item.detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="section-padding bg-secondary/30">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <span className="eyebrow mb-3 block">Replacement Projects</span>
                <h2 className="section-heading">Recent Roof<br className="hidden md:block" /> Replacements.</h2>
              </div>
              <Link to="/recent-projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--gold-ink))] hover:text-[hsl(var(--gold-ink))]/80 transition-colors font-body">
                Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img width={1600} height={1067} decoding="async" src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.8)] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3 text-caption font-body font-semibold uppercase tracking-[0.14em] bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-sm">{item.category}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-semibold text-white text-sm">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-tight">
            <AttributedReviews category="roofing" heading="What homeowners say about our roof replacement work" />
          </div>
        </section>
        <ConsultationCTA
          heading="See the work, then get your own scope."
          subline="We'll walk your roof, document conditions with photos, and hand you a written replacement plan."
          label="Get My Replacement Scoped"
        />
        <WhoShowsUp />
        <TieredOffer context="roof-replacement" primaryLabel="Get My Replacement Scope" />
        <CommonConcerns />
      <ConversionTrustBlock variant="band" category="roofing" />
            </>
          }
          faq={
            <>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Roof Replacement FAQs</span>
              <h2 className="section-heading mb-4">Common Questions About<br className="hidden md:block" /> Roof Replacement.</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-flat transition-all duration-300">
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                      <span className="font-heading font-semibold text-foreground text-body-sm leading-snug text-left">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pr-2">
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>
            </>
          }
          coverage={
            <>
      <RelatedLinks
          eyebrow="Keep Exploring"
          heading="Related pages you may find useful"
          columns={2}
          links={[
            { label: "Roofing Services Hub", href: "/roofing", description: "Full roofing division overview" },
            { label: "Residential Roofing Services", href: "/roofing/residential", description: "Materials and process overview" },
            { label: "Metal Roofing for Mountain Homes", href: "/roofing/metal", description: "Standing seam and metal options" },
            { label: "Metal vs Shingle Roof in Western NC", href: "/blog/metal-vs-shingle-roof-western-nc", description: "Compare materials before you decide" },
            { label: "Best Roofing Materials in Highlands, NC", href: "/blog/best-roofing-materials-highlands-nc", description: "Local climate and material guide" },
            { label: "Request an Inspection", href: "/request-inspection", description: "Start your replacement estimate" }
          ]}
        />
        <ServiceInternalLinks title="Roof Replacement" slug="roof-replacement" />
            </>
          }
          cta={
            <>
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">Ready to Move Forward?</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    When You're Ready to Replace<br className="hidden md:block" /> Your Roof the Right Way —<br className="hidden md:block" /> We're Ready to Build It.
                  </h2>
                  <p className="text-dark-section-foreground text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    No pressure. No obligation. Just a conversation with a local roofing expert who will assess your property honestly and help you make the right decision for your home.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link to="/consultation" className="btn btn-primary btn-lg group relative">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Get My Written Estimate</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                    <a href="tel:+18285247773" className="btn btn-secondary btn-lg btn-on-dark group">
                      <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" aria-hidden="true" /> (828) 524-7773
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-border">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Award, text: "CertainTeed Certified" },
                      { icon: Clock, text: "Rapid Response" },
                      { icon: Star, text: "Financing Available" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                        <span className="text-dark-section-foreground text-xs font-body font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
            </>
          }
          afterCta={
            <>
      <RealWorkWidget />
            </>
          }
        />
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RoofReplacement;
