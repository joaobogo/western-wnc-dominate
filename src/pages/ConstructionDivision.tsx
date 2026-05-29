import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, Hammer, Ruler, PenTool, Compass, Mountain,
  ChevronRight, Eye, ClipboardCheck, Layers, Users,
  BadgeCheck, TreePine, Fence, DoorOpen, HardHat,
  Wrench, MessageSquare, CalendarCheck, Sparkles
} from "lucide-react";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

import {
  ConstructionServiceGrid,
  ConstructionObjectionBuster,
  ConstructionMidCTA,
  ConstructionClosingCTA,
  ConstructionCredentialStrip,
  WNCRelevanceDark,
  ConstructionFAQs,
  ConstructionProcess, compactConstructionProcess,
  ConstructionTrust,
  DisciplinesBridge,
} from "@/components/construction";

import heroImg from "@/assets/gallery/cedar-001.jpg";
const divisionContextImg = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000";
const constructionDetailImg = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200";
const planningFocusImg = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200";
const siteCoordinationImg = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200";
const wncTerrainImg = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200";

import proj1 from "@/assets/gallery/asphalt-006.webp";
import proj2 from "@/assets/gallery/cedar-002.jpg";
import proj3 from "@/assets/gallery/metal-008.webp";
import proj4 from "@/assets/gallery/asphalt-004.jpg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ═══════════════════════════════════════════
   DATA — Page-specific
   ═══════════════════════════════════════════ */

const philosophy = [
  { icon: Compass, title: "Design Sensitivity", detail: "Every project starts with understanding your home's design theme, its setting, and the visual language that connects them. We don't impose a style — we extend the one your home already speaks." },
  { icon: ClipboardCheck, title: "Planning Depth", detail: "We invest in planning because it eliminates surprises. Detailed scoping, material specifications, timeline mapping, and permit coordination happen before we break ground — not while we're building." },
  { icon: HardHat, title: "Execution Quality", detail: "Our crews are trained craftsmen — not subcontracted labor rotated between contractors. We understand sequencing, tolerances, and the standard we hold. Every phase is supervised and verified." },
  { icon: MessageSquare, title: "Communication Clarity", detail: "You'll have a single project manager, a defined communication schedule, and real-time updates on progress, decisions needed, and timeline changes. No guessing, no chasing for answers." },
];

const whyHighlander = [
  { icon: Shield, title: "Licensed, Insured, and Established", detail: "We're a permanent, licensed construction company with comprehensive liability and workers' comp coverage — not a pickup-truck outfit that disappears after the check clears." },
  { icon: Users, title: "In-House Crews", detail: "Our core crews work for Highlander. We're trained to our standards, familiar with our process, and accountable to our quality expectations. No anonymous subcontractor rotation." },
  { icon: Mountain, title: "Built for WNC", detail: "We've worked across the region's unique terrain, microclimates, and building conditions for years. We don't learn on your project — we bring institutional knowledge of mountain construction." },
  { icon: BadgeCheck, title: "Unified Company", detail: "Because we also handle roofing, we coordinate roof-to-structure transitions, weatherproofing, and exterior envelope integrity better than any standalone contractor. One company, one standard, zero finger-pointing." },
];

const galleryImages = [
  { src: proj1, alt: "Custom deck addition on a mountain home", label: "Covered Deck — Mountain Residence" },
  { src: proj2, alt: "Exterior renovation with cedar siding", label: "Exterior Renovation — Custom Home" },
  { src: proj3, alt: "Room addition with standing seam metal roof", label: "Room Addition — Ridgeline Property" },
  { src: proj4, alt: "Outdoor living space construction", label: "Outdoor Living — Screened Porch" },
];

const faqsForSEO = [
  { question: "What types of construction projects does Highlander handle?", answer: "We specialize in residential additions, renovations, structural upgrades, exterior improvements, outdoor living spaces, and custom project work." },
  { question: "Do you handle both roofing and construction on the same project?", answer: "Yes — and this is one of our key advantages. When a project involves both roof work and structural or exterior construction, having one company manage both eliminates coordination gaps." },
  { question: "How long does a typical construction project take?", answer: "Timelines vary significantly by scope. A deck or porch project typically takes 2–4 weeks. A room addition may take 6–12 weeks. A major renovation can run 3–6 months." },
  { question: "Do you handle permits and inspections?", answer: "Yes. Permit acquisition, code compliance, and inspection scheduling are part of our standard project management." },
  { question: "How do you price construction projects?", answer: "We provide detailed, grouped-cost proposals with defined scope, material specifications, and labor costs. No vague allowances, no hidden fees." },
  { question: "Can you work with my designer or project lead?", answer: "Absolutely. We regularly collaborate with designers, project planners, and engineering professionals across Western North Carolina." },
  { question: "What sets Highlander apart from other contractors in WNC?", answer: "Three things: planning depth, in-house crews, and communication standards." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const ConstructionDivision = () => {
  return (
    <>
      <SEOHead
        title="Construction in Western NC | Additions & Renovations"
        description="Premium construction in Western North Carolina. Home additions, renovations, outdoor living, structural upgrades, and custom projects. Licensed general contractor."
        path="/construction"
        jsonLd={[
          serviceSchema({ name: "Construction Services", description: "Home additions, renovations, outdoor living, and custom construction across Western NC.", url: "/construction" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }]),
          faqSchema(faqsForSEO),
        ]}
      />
      <Header />
      <main>
        {/* ═══ HERO — Cinematic construction hero with gold accents ═══ */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Custom construction project in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.35)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.1)] to-[hsl(var(--hero-overlay)/0.25)]" />
          </div>

          {/* Gold accent lines */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2.2, delay: 0.5, ease: HIGHLAND_EASE }} />
          <motion.div className="absolute right-0 bottom-0 w-[2px] z-20" style={{ background: "linear-gradient(to top, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "40%" }} transition={{ duration: 1.5, delay: 1.2, ease: HIGHLAND_EASE }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-16 md:pb-24 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-none bg-[hsl(var(--highland-gold)/0.15)] flex items-center justify-center border border-[hsl(var(--highland-gold)/0.2)]">
                  <HardHat className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                </div>
                <span className="text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Construction Division</span>
                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0.4)] to-transparent" />
              </motion.div>

              <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: HIGHLAND_EASE }} className="text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-heading font-bold text-primary-foreground leading-[1.0] tracking-tight mb-2">
                Mountain Construction
              </motion.h1>
              <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: HIGHLAND_EASE }} className="text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-heading font-bold tracking-tight leading-[1.0] mb-8">
                <span className="text-[hsl(var(--highland-gold))]">Masterfully Planned.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-xl text-primary-foreground/45 max-w-2xl mb-12 leading-relaxed font-body">
                From home additions to luxury outdoor living, we combine architectural sensitivity with Western North Carolina's highest construction standards. Licensed, insured, and owner-led.
              </motion.p>


              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-[15px] px-10 py-4.5 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8283979211" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" /> (828) 397-9211
                </a>
              </motion.div>

              {/* Division scope — unique to landing */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="mt-10 pt-8 border-t border-white/6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-6">
                  {[
                    { value: "6", label: "Service Categories" },
                    { value: "In-House", label: "Crew Model" },
                    { value: "Design-Build", label: "Capability" },
                    { value: "WNC", label: "Exclusive Focus" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-lg font-heading font-bold text-[hsl(var(--highland-gold))]">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-primary-foreground/30 font-body mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                  {["Licensed General Contractor", "In-House Crews", "WNC Specialists", "Planning & Scoping Clarity"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[hsl(var(--highland-gold)/0.4)]" />
                      <span className="text-primary-foreground/25 text-[11px] font-body font-medium tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ OPENING STATEMENT — Premium editorial positioning ═══ */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
            <img src={divisionContextImg} alt="Mountain home background" className="w-full h-full object-cover" />
          </div>

          <div className="container-tight max-w-4xl">
            <ScrollReveal variant="fade">
              <div className="text-center">
                <GoldLine width="3rem" className="mx-auto mb-8" />
                <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-heading font-bold text-foreground leading-[1.15] mb-6 text-balance">
                  Highlander builds more than roofs. We build the spaces that define how families live in these mountains — with the same planning depth, craft standards, and communication discipline we bring to every project we accept.
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mb-4">
                  Our Construction division serves Western North Carolina homeowners who refuse to settle for "good enough" — people who value <Link to="/layouts-planning" className="text-primary font-bold hover:underline">planning over rushing</Link>, documentation over handshakes, and craftsmanship that holds up at elevation.

                </p>
                <p className="text-muted-foreground/60 text-sm leading-relaxed font-body max-w-xl mx-auto">
                  We're selective about the projects we take on — because the work we do reflects who we are.
                </p>
                <GoldLine width="3rem" className="mx-auto mt-8" delay={0.3} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ STANDARDS TRANSFER — Roofing credentials prove construction quality ═══ */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Proven Standards</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-dark-section-foreground leading-[1.15] mb-6">
                    Owner-Led Quality Built Our<br className="hidden md:block" /> Construction Standards.
                  </h2>
                  <p className="text-dark-section-foreground/40 text-base leading-relaxed font-body mb-6">
                    Highlander didn't start construction from scratch. We applied the same project discipline, crew standards, and communication systems that earned CertainTeed Master Applicator status to every construction project we take on.
                  </p>
                  <p className="text-dark-section-foreground/30 text-sm leading-relaxed font-body mb-8">
                    When you hire Highlander for construction, you get a company that already knows how to plan meticulously, execute precisely, document everything, and communicate proactively — because we've been doing it on roofs for years.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "4.9★", label: "Google Rating" },
                      { value: "Top 1%", label: "CertainTeed Certified" },
                      { value: "4.9★", label: "Google Rating" },
                      { value: "Rapid", label: "Response Time" },
                    ].map((stat, i) => (
                      <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }} className="border border-dark-section-foreground/6 rounded-none p-4 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
                        <span className="text-xl font-heading font-bold text-[hsl(var(--highland-gold))] block">{stat.value}</span>
                        <span className="text-[10px] font-body text-dark-section-foreground/30 uppercase tracking-[0.1em]">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="relative">
                  <div className="aspect-[4/3] rounded-none overflow-hidden border border-dark-section-foreground/6">
                    <img src={proj3} alt="Room addition with standing seam metal roof integration" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute -bottom-5 -left-4 md:-left-6 bg-card border border-border rounded-none p-5 shadow-lg max-w-[240px]">
                    <span className="text-xs font-heading font-bold text-[hsl(var(--highland-gold))] uppercase tracking-[0.1em] mb-1 block">One Company Advantage</span>
                    <p className="text-muted-foreground text-xs font-body leading-snug">
                      Design-first coordination, layout verification, and unified accountability — under one team.
                    </p>
                    <div className="mt-4 relative aspect-video overflow-hidden border border-border">
                       <img src={planningFocusImg} alt="Project scoping and planning" className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ DISCIPLINES BRIDGE — Roofing → Construction skill transfer ═══ */}
        <DisciplinesBridge />

        {/* ═══ SERVICE GRID — Using shared component with detailed variant ═══ */}
        <ConstructionServiceGrid
          variant="detailed"
          heading="What We Build."
          subheading="Four focused construction capabilities — each backed by the same project discipline, craft quality, and communication standards."
          eyebrow="Construction Services"
        />

        {/* ═══ ARCHITECTURAL DETAIL — Visual break ═══ */}
        <section className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <img src={constructionDetailImg} alt="Construction detail and craftsmanship" className="w-full h-full object-cover grayscale opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
          <div className="absolute bottom-10 left-10 flex items-center gap-4">
             <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)]" />
             <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Craftsmanship in Detail</span>
          </div>
        </section>

        {/* ═══ PHILOSOPHY — How we approach construction ═══ */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <ScrollReveal variant="fade">
              <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
                <span className="eyebrow mb-3 block">Our Approach</span>
                <h2 className="section-heading mb-4">How Highlander<br className="hidden md:block" /> Approaches Construction.</h2>
                <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                  Every project begins with four commitments that define how we work — and why the outcome is different.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {philosophy.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-none p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift">
                  <div className="w-10 h-10 rounded-none bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors border border-[hsl(var(--highland-gold)/0.1)]">
                    <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WNC RELEVANCE — Dark variant ═══ */}
        <WNCRelevanceDark
          heading="Construction in WNC&#10;Is Different."
          subheading="Building in Western North Carolina isn't the same as building anywhere else. The terrain, the weather, and the homes themselves demand a contractor who understands the region."
          eyebrow="Built for These Mountains"
        />

        {/* ═══ MID CTA ═══ */}
        <ConstructionMidCTA
          headline="Have a project in mind?"
          subheadline="Let's discuss scope, timeline, and whether Highlander is the right fit."
          ctaText="Schedule a Project Consultation"
        />

        {/* ═══ FEATURED PROJECTS ═══ */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <ScrollReveal variant="fade">
              <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
                <span className="eyebrow mb-3 block">Featured Work</span>
                <h2 className="section-heading">Projects That Speak<br className="hidden md:block" /> for Themselves.</h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-none overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="w-6 h-px bg-[hsl(var(--highland-gold)/0.5)] mb-2" />
                    <p className="text-white text-xs md:text-sm font-body font-medium tracking-wide">{img.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY HIGHLANDER — Trust cards ═══ */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <ScrollReveal variant="fade">
              <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
                <span className="eyebrow mb-3 block">Why Highlander</span>
                <h2 className="section-heading mb-4">What Makes This<br className="hidden md:block" /> Different.</h2>
                <p className="text-muted-foreground text-sm font-body max-w-lg mx-auto">
                  Not just another name on a truck. A company built on documented systems, staffed with in-house craftsmen, and rooted in Western North Carolina's mountains.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {whyHighlander.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-none p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift">
                  <div className="w-10 h-10 rounded-none bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors border border-[hsl(var(--highland-gold)/0.1)]">
                    <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ OBJECTION BUSTER — Concern → Response pairs ═══ */}
        <ConstructionObjectionBuster
          heading={"We Know What\nHolds You Back."}
          subheading="Every homeowner has concerns before a major construction project. Here's how we address each one — with systems, not promises."
        />

        {/* ═══ PROCESS — 6-step compact ═══ */}
        <ConstructionProcess
          steps={compactConstructionProcess}
          heading={"How a Construction Project\nWorks With Highlander."}
          subheading="Structured, transparent, and designed to eliminate surprises."
        />

        {/* ═══ TRUST — Full 8-pillar dark with objections ═══ */}
        <ConstructionTrust
          variant="dark"
          showObjections
          heading={"The Highlander\nConstruction Standard."}
          subheading="Construction projects are significant investments — financially and emotionally. Here's how we earn and protect your trust at every stage."
        />

        {/* ═══ FAQs — Division category ═══ */}
        <ConstructionFAQs
          category="division"
          heading="Common Questions."
          eyebrow="Construction FAQs"
          maxItems={10}
        />

        <BuilderPromoBlock mode="construction" variant="band" />

        {/* ═══ CLOSING CTA ═══ */}
        <ConstructionClosingCTA
          headline={"Your Home Deserves a Builder\nWho Treats It Like Their Own."}
          subheadline="Whether you're planning an addition, considering a renovation, or have a custom project in mind — let's have a straightforward conversation about what's possible."
          ctaText="Schedule a Project Consultation"
          eyebrow="Start the Conversation"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ConstructionDivision;
