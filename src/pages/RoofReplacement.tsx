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
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";

import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import asphalt001 from "@/assets/gallery/asphalt-001.jpg";
import asphalt005 from "@/assets/gallery/asphalt-005.jpg";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-004.webp";
import metalCabin from "@/assets/gallery/metal-006.webp";

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
    detail: "Your replacement is installed by Highlander employees — trained, certified, and directly accountable. No subcontractor roulette, no crew you've never met showing up on day one.",
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
    lifespan: "30–50 years",
    detail: "Our most-installed residential shingle. Impact-resistant, algae-resistant, 20+ designer colors. The best value-to-performance ratio for WNC mountain homes.",
    image: asphalt006,
  },
  {
    name: "Standing Seam Metal",
    type: "Custom-Fabricated Panels",
    lifespan: "50–70 years",
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
  { value: "500+", label: "Mountain Roofs Installed", detail: "Across Highlands, Cashiers, Franklin, Sylva & surrounding communities" },
  { value: "Top 1%", label: "CertainTeed Certification", detail: "Master Shingle Applicator — held by fewer than 1% of contractors nationally" },
  { value: "4.7★", label: "Google Rating", detail: "Earned through consistent quality, communication, and follow-through" },
  { value: "24hr", label: "Storm Response", detail: "Emergency tarping and priority scheduling when weather strikes" },
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
  { q: "What warranties come with a roof replacement?", a: "Every replacement includes the manufacturer's material warranty (up to lifetime limited on CertainTeed products) plus Highlander's labor warranty. You receive a complete physical warranty package at your final walkthrough — documentation you can file and reference for decades." },
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
        description="Complete roof replacement for Western North Carolina homes. Site-specific material specification, certified installation, transparent proposals, and warranties you can count on."
        path="/roofing/roof-replacement"
        jsonLd={[
          serviceSchema({ name: "Roof Replacement", description: "Full roof replacement for mountain homes across Western North Carolina.", url: "/roofing/roof-replacement" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Roof Replacement", url: "/roofing/roof-replacement" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[75vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={asphalt008} alt="Roof replacement in progress on a mountain home in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.15)] to-[hsl(var(--hero-overlay)/0.3)]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/roofing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-primary-foreground" /></div>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Roofing</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/25" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Roof Replacement</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Replace It Once.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Replace It Right.
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed font-body">
                Full roof replacement for mountain homes across Western North Carolina — engineered for your elevation, installed by certified crews, and backed by warranties that mean something.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                   <span className="relative">Request a Roof Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8283979211" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 397-9211
                </a>
              </motion.div>

              {/* Investment callout — unique to Replacement */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="mt-10 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm max-w-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  <span className="text-xs uppercase tracking-wider text-primary-foreground/50 font-body font-semibold">How We Price Replacement</span>
                </div>
                <div className="text-2xl font-heading font-bold text-primary-foreground">Scope-based, grouped-cost</div>
                <p className="text-xs text-primary-foreground/40 mt-1 font-body">Every roof is priced from its real scope after on-site assessment — no generic ranges, no allowances disguised as estimates.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── OPENING STATEMENT ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
              <div className="w-12 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                A roof replacement isn't a repair. It's a generational investment in your home — one that determines how your property performs, looks, and holds value for the next 30 to 50 years.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mb-4">
                At Highlander, we treat every replacement with the weight it deserves. We don't rush proposals, cut corners on materials, or skip the steps that separate a roof that lasts from one that merely passes inspection. This is the most important exterior investment you'll make — and we build accordingly.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ─── SIGNS YOU NEED REPLACEMENT ─── */}
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
                <motion.div key={sign.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <sign.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{sign.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{sign.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <BuilderPromoBlock
          variant="band"
          preset="replacement"
          title="Plan your full replacement in detail"
          body="Optional guided builder for homeowners ready to specify materials, system features, and priorities. We use it to prepare a sharper proposal before we walk the roof."
          ctaLabel="Build Your Replacement Scope"
        />

        {/* ─── RISKS OF WAITING ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
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
                      <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{risk.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── MID-PAGE CTA ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Concerned about your roof's condition?</h3>
                <p className="text-primary-foreground/50 text-sm font-body">Schedule a consultation — we'll assess honestly and explain your options clearly.</p>
              </div>
              <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-7 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden flex-shrink-0">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── REPLACING THE ROOF THE RIGHT WAY ─── */}
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
                <motion.div key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <pillar.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{pillar.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{pillar.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MATERIALS GUIDANCE ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Materials</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Materials That Perform<br className="hidden md:block" /> at Elevation.
                </h2>
                <p className="text-dark-section-foreground/40 text-base font-body max-w-lg mx-auto">
                  We specify materials based on where your home sits — not what's cheapest to install. Here are the three systems we recommend most for WNC roof replacements.
                </p>
              </motion.div>

              <div className="space-y-5">
                {materials.map((mat, i) => (
                  <motion.div key={mat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group border border-dark-section-foreground/6 rounded-sm overflow-hidden hover:border-[hsl(var(--highland-gold)/0.15)] bg-dark-section-foreground/[0.02] hover:bg-dark-section-foreground/[0.04] transition-all duration-300">
                    <div className="grid md:grid-cols-5 gap-0">
                      <div className="md:col-span-2 aspect-[16/10] md:aspect-auto">
                        <img src={mat.image} alt={mat.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
                      </div>
                      <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-heading font-bold text-dark-section-foreground text-lg group-hover:text-[hsl(var(--highland-gold))] transition-colors">{mat.name}</h3>
                          <span className="text-[10px] font-body font-semibold text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.06)] px-2.5 py-1 rounded-sm">{mat.lifespan}</span>
                        </div>
                        <span className="text-[11px] font-body text-dark-section-foreground/35 mb-3">{mat.type}</span>
                        <p className="text-dark-section-foreground/45 text-sm font-body leading-relaxed">{mat.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── TIMELINE & PROCESS ─── */}
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
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">{step.number}</span>
                  <span className="inline-block text-[9px] font-body font-semibold uppercase tracking-[0.12em] text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.08)] px-2 py-0.5 rounded-sm mb-4">{step.duration}</span>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TRUST PROOF ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <span className="eyebrow mb-3 block">Why Homeowners Choose Highlander</span>
              <h2 className="section-heading">Built on Results,<br className="hidden md:block" /> Not Promises.</h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trustProof.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center p-5 md:p-6 bg-card border border-border rounded-sm">
                  <span className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--highland-gold))] block mb-2">{item.value}</span>
                  <span className="font-heading font-semibold text-foreground text-sm block mb-1">{item.label}</span>
                  <span className="text-muted-foreground text-[11px] font-body leading-snug">{item.detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-secondary/30">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <span className="eyebrow mb-3 block">Replacement Projects</span>
                <h2 className="section-heading">Recent Roof<br className="hidden md:block" /> Replacements.</h2>
              </div>
              <Link to="/gallery" className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-body">
                Full Gallery <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.8)] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3 text-[9px] font-body font-semibold uppercase tracking-[0.14em] bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-sm">{item.category}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-semibold text-white text-sm">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Roof Replacement FAQs</span>
              <h2 className="section-heading mb-4">Common Questions About<br className="hidden md:block" /> Roof Replacement.</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300">
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                      <span className="font-heading font-semibold text-foreground text-[15px] leading-snug text-left">{faq.q}</span>
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

        {/* ─── CLOSING CTA ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">Ready to Move Forward?</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    When You're Ready to Replace<br className="hidden md:block" /> Your Roof the Right Way —<br className="hidden md:block" /> We're Ready to Build It.
                  </h2>
                  <p className="text-dark-section-foreground/45 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    No pressure. No obligation. Just a conversation with a local roofing expert who will assess your property honestly and help you make the right decision for your home.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Request a Quote Call</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="tel:8283979211" className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all">
                      <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" /> (828) 397-9211
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Award, text: "CertainTeed Certified" },
                      { icon: Clock, text: "24-Hour Response" },
                      { icon: Star, text: "Financing Available" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                        <span className="text-dark-section-foreground/25 text-xs font-body font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RoofReplacement;
