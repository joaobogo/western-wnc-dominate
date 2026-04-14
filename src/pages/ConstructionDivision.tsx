import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, Hammer, Ruler, PenTool, Compass, Mountain,
  ChevronRight, Eye, ClipboardCheck, Layers, Users,
  BadgeCheck, TreePine, Fence, DoorOpen, HardHat,
  Wrench, MessageSquare, CalendarCheck, Sparkles
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import heroImg from "@/assets/gallery/cedar-001.jpg";
import proj1 from "@/assets/gallery/asphalt-006.webp";
import proj2 from "@/assets/gallery/cedar-002.jpg";
import proj3 from "@/assets/gallery/metal-008.webp";
import proj4 from "@/assets/gallery/asphalt-004.jpg";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const services = [
  { icon: DoorOpen, title: "Additions & Expansions", detail: "Room additions, second-story expansions, and bump-outs that integrate seamlessly with your existing home — architecturally, structurally, and aesthetically." },
  { icon: Hammer, title: "Renovations & Remodeling", detail: "Interior and exterior renovations that transform spaces while preserving architectural character. Kitchens, bathrooms, living spaces, and whole-home updates." },
  { icon: Layers, title: "Structural Upgrades", detail: "Foundation reinforcement, load-bearing wall modifications, beam installation, and structural remediation for aging mountain homes and properties on challenging terrain." },
  { icon: TreePine, title: "Outdoor Living", detail: "Decks, covered porches, screened rooms, pergolas, outdoor kitchens, and hardscaped gathering spaces designed for the Western North Carolina climate and landscape." },
  { icon: Fence, title: "Exterior Improvements", detail: "Siding replacement, window and door installations, trim and fascia work, and complete exterior envelope upgrades that protect and define your home." },
  { icon: PenTool, title: "Custom Project Work", detail: "Unique builds that don't fit standard categories — from custom garages and workshops to guest houses, home offices, and creative residential projects." },
];

const philosophy = [
  { icon: Compass, title: "Architectural Sensitivity", detail: "Every project starts with understanding your home's architecture, its setting, and the design language that connects them. We don't impose a style — we extend the one your home already speaks." },
  { icon: ClipboardCheck, title: "Planning Depth", detail: "We invest in planning because it eliminates surprises. Detailed scoping, material specifications, timeline mapping, and permit coordination happen before we break ground — not while we're building." },
  { icon: HardHat, title: "Execution Quality", detail: "Our crews are trained craftsmen — not subcontracted labor rotated between contractors. They understand sequencing, tolerances, and the standard we hold. Every phase is supervised and verified." },
  { icon: MessageSquare, title: "Communication Clarity", detail: "You'll have a single project manager, a defined communication schedule, and real-time updates on progress, decisions needed, and timeline changes. No guessing, no chasing for answers." },
];

const wncRealities = [
  { title: "Steep & Challenging Terrain", detail: "Mountain lots present foundation, drainage, and access challenges that flatland contractors don't understand. We've built on slopes, ridgelines, and remote properties across the region." },
  { title: "Aging Mountain Homes", detail: "Many WNC homes were built 30–60+ years ago with methods and materials that need careful assessment before renovation. We understand post-and-pier foundations, balloon framing, and the structural realities of mountain construction." },
  { title: "Weather & Elevation Factors", detail: "Snow load, freeze-thaw cycling, wind exposure, and moisture management vary dramatically by elevation and aspect in Western North Carolina. We design and build for your specific microclimate." },
  { title: "Permitting & Code Realities", detail: "Building codes, zoning requirements, and permitting processes vary by county and municipality across WNC. We navigate these requirements as part of our standard project coordination — not as an afterthought." },
];

const processSteps = [
  { number: "01", icon: Phone, title: "Initial Conversation", description: "We listen to your vision, understand your goals, and discuss scope, timeline, and budget range. This conversation determines whether we're the right fit — for both of us." },
  { number: "02", icon: Eye, title: "Site Assessment", description: "We visit your property to evaluate existing conditions, structural considerations, access logistics, and any site-specific factors that will influence planning and execution." },
  { number: "03", icon: Ruler, title: "Scope Development & Proposal", description: "You receive a detailed proposal with defined scope, material specifications, timeline, cost breakdown, and payment schedule. Every line item is explained — nothing is vague." },
  { number: "04", icon: CalendarCheck, title: "Pre-Construction Planning", description: "Permits, material ordering, subcontractor coordination, and detailed scheduling. We confirm every detail before mobilizing — because changes are cheap on paper and expensive on-site." },
  { number: "05", icon: Hammer, title: "Construction Execution", description: "Our crews execute with daily oversight, quality checkpoints, and proactive communication. If anything changes, you know immediately — and you approve before we proceed." },
  { number: "06", icon: Sparkles, title: "Completion & Handover", description: "Final walk-through, punch list resolution, complete documentation, warranty information, and a clean property. We don't consider it done until you're completely satisfied." },
];

const whyHighlander = [
  { icon: Shield, title: "Licensed, Insured, and Established", detail: "We're a permanent, licensed construction company with comprehensive liability and workers' comp coverage — not a pickup-truck outfit that disappears after the check clears." },
  { icon: Users, title: "In-House Crews", detail: "Our core crews work for Highlander. They're trained to our standards, familiar with our process, and accountable to our quality expectations. No anonymous subcontractor rotation." },
  { icon: Mountain, title: "Built for WNC", detail: "We've worked across the region's unique terrain, microclimates, and building conditions for years. We don't learn on your project — we bring institutional knowledge of mountain construction." },
  { icon: BadgeCheck, title: "Unified Company", detail: "Because we also handle roofing, we coordinate roof-to-structure transitions, weatherproofing, and exterior envelope integrity better than any standalone contractor. One company, one standard, zero finger-pointing." },
];

const galleryImages = [
  { src: proj1, alt: "Custom deck addition on a mountain home", label: "Covered Deck — Mountain Residence" },
  { src: proj2, alt: "Exterior renovation with cedar siding", label: "Exterior Renovation — Custom Home" },
  { src: proj3, alt: "Room addition with standing seam metal roof", label: "Room Addition — Ridgeline Property" },
  { src: proj4, alt: "Outdoor living space construction", label: "Outdoor Living — Screened Porch" },
];

const faqs = [
  { q: "What types of construction projects does Highlander handle?", a: "We specialize in residential additions, renovations, structural upgrades, exterior improvements, outdoor living spaces, and custom project work. We're selective about the projects we take on — we focus on work where our craftsmanship and planning approach deliver the most value." },
  { q: "Do you handle both roofing and construction on the same project?", a: "Yes — and this is one of our key advantages. When a project involves both roof work and structural or exterior construction, having one company manage both eliminates coordination gaps, ensures weatherproofing continuity, and simplifies your experience. One team, one standard." },
  { q: "How long does a typical construction project take?", a: "Timelines vary significantly by scope. A deck or porch project typically takes 2–4 weeks. A room addition may take 6–12 weeks. A major renovation can run 3–6 months. We provide a detailed timeline during the proposal phase and communicate proactively if anything changes." },
  { q: "Do you handle permits and inspections?", a: "Yes. Permit acquisition, code compliance, and inspection scheduling are part of our standard project management. We handle the paperwork and coordination so you don't have to navigate county offices and inspection scheduling yourself." },
  { q: "How do you price construction projects?", a: "We provide detailed, line-item proposals with defined scope, material specifications, and labor costs. No vague allowances, no hidden fees, no surprise change orders for work that should have been anticipated. If scope changes during the project, we document and approve adjustments before proceeding." },
  { q: "Can you work with my architect or designer?", a: "Absolutely. We regularly collaborate with architects, designers, and engineers across Western North Carolina. We can also provide design-build services for projects that don't require an independent architect — bringing design and construction under one roof." },
  { q: "Do you build new homes from the ground up?", a: "Our focus is on additions, renovations, and custom project work for existing properties — not ground-up new construction. This specialization allows us to maintain the quality standard and project management depth that our clients expect." },
  { q: "What sets Highlander apart from other contractors in WNC?", a: "Three things: planning depth, in-house crews, and communication standards. We invest more time in pre-construction planning than most contractors, our core crews are employed by Highlander (not subcontracted), and we maintain a communication standard that keeps you informed without requiring you to chase for updates." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const ConstructionDivision = () => {
  return (
    <>
      <SEOHead
        title="Construction Services | Additions, Renovations & Outdoor Living in Western NC"
        description="Premium construction in Western North Carolina. Home additions, renovations, outdoor living, structural upgrades, and custom projects. Licensed general contractor."
        path="/construction"
        jsonLd={[
          serviceSchema({ name: "Construction Services", description: "Home additions, renovations, outdoor living, and custom construction across Western NC.", url: "/construction" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[75vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Custom construction project in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.15)] to-[hsl(var(--hero-overlay)/0.3)]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Construction Division</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Build With Intention.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Build to Last.
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed font-body">
                Additions, renovations, structural work, outdoor living, and custom construction for Western North Carolina homeowners who value craftsmanship, planning, and doing the project right.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/request-inspection" className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8283979211" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 397-9211
                </a>
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
                Highlander builds more than roofs. We build the spaces that define how you live — with the same craftsmanship, communication, and long-term thinking we bring to every project.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto">
                Our Construction division serves homeowners across Western North Carolina who want thoughtful planning, skilled execution, and a contractor who treats their home with the same care they do. We're selective about the projects we take on — because the work we do reflects who we are.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ─── CONSTRUCTION PHILOSOPHY ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Our Approach</span>
              <h2 className="section-heading mb-4">How Highlander<br className="hidden md:block" /> Approaches Construction.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Every project begins with four commitments that define how we work — and why the outcome is different.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {philosophy.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-none p-6 md:p-7 hover:border-primary/15 card-lift spotlight-hover">
                  <div className="w-10 h-10 rounded-none bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICE GRID ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Construction Services</span>
              <h2 className="section-heading mb-4">What We Build.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Curated capabilities for homeowners who want quality, not just completion.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {services.map((svc, i) => (
                <motion.div key={svc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-none p-6 hover:border-primary/15 card-lift spotlight-hover">
                  <div className="w-10 h-10 rounded-none bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <svc.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{svc.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{svc.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WNC REALITIES ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Built for These Mountains</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Construction in WNC<br className="hidden md:block" /> Is Different.
                </h2>
                <p className="text-dark-section-foreground/40 text-base font-body max-w-lg mx-auto">
                  Building in Western North Carolina isn't the same as building anywhere else. The terrain, the weather, and the homes themselves demand a contractor who understands the region.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {wncRealities.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-none p-6 hover:border-dark-section-foreground/12 transition-colors">
                    <h3 className="font-heading font-bold text-dark-section-foreground text-sm mb-2">{item.title}</h3>
                    <p className="text-dark-section-foreground/40 text-[13px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── MID CTA ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Have a project in mind?</h3>
                <p className="text-primary-foreground/50 text-sm font-body">Let's discuss scope, timeline, and whether Highlander is the right fit.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/request-inspection" className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-none inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a href="tel:8283979211" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-none inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURED PROJECTS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Featured Work</span>
              <h2 className="section-heading">Projects That Speak<br className="hidden md:block" /> for Themselves.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-none overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover img-zoom-dramatic transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-xs font-body font-medium tracking-wide">{img.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY HIGHLANDER ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Why Highlander</span>
              <h2 className="section-heading mb-4">What Makes This<br className="hidden md:block" /> Different.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {whyHighlander.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-none p-6 md:p-7 hover:border-primary/15 card-lift spotlight-hover">
                  <div className="w-10 h-10 rounded-none bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Our Process</span>
              <h2 className="section-heading mb-4">How a Construction Project<br className="hidden md:block" /> Works With Highlander.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Structured, transparent, and designed to eliminate surprises.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-none p-6 md:p-7 hover:border-primary/15 card-lift spotlight-hover">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-none bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Construction FAQs</span>
              <h2 className="section-heading mb-4">Common Questions.</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-none px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300">
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
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">Start the Conversation</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Home Deserves a Builder<br className="hidden md:block" /> Who Treats It Like Their Own.
                  </h2>
                  <p className="text-dark-section-foreground/45 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    Whether you're planning an addition, considering a renovation, or have a custom project in mind — let's have a straightforward conversation about what's possible, what it takes, and whether Highlander is the right partner.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link to="/request-inspection" className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Schedule a Project Consultation</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="tel:8283979211" className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all">
                      <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" /> (828) 397-9211
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Users, text: "In-House Crews" },
                      { icon: Mountain, text: "WNC Specialists" },
                      { icon: Star, text: "Planning-First Approach" },
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

export default ConstructionDivision;
