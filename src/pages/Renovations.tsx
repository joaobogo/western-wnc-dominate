import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Star, Home,
  CheckCircle, Hammer, Ruler, PenTool,
  ChevronRight, Eye, ClipboardCheck, Users,
  Mountain, Layers, CalendarCheck, Sparkles,
  DoorOpen, Paintbrush, Wrench, Bath, UtensilsCrossed, Sofa,
  FileCheck, Gauge, Droplets, ThermometerSun, TrendingUp
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ConstructionClosingCTA } from "@/components/construction/ConstructionShared";
import { DesignProgramPromo } from "@/components/construction";
import VeluxWidget from "@/components/VeluxWidget";

import heroImg from "@/assets/gallery/asphalt-007.webp";
import proj1 from "@/assets/gallery/asphalt-008.webp";
import proj2 from "@/assets/gallery/metal-010.webp";
import proj3 from "@/assets/gallery/cedar-005.webp";
import proj4 from "@/assets/gallery/metal-005.webp";

/* ═══════════════════════════════════════════ DATA ═══════════════════════════════════════════ */

const renovationGoals = [
  { icon: Gauge, title: "Improve How It Functions", detail: "Kitchens that don't work for how you cook. Bathrooms that fight you every morning. Layouts that waste space. Renovation starts with fixing what doesn't serve you anymore." },
  { icon: Layers, title: "Update What's Worn", detail: "Outdated finishes, failing fixtures, and materials past their lifespan. Some renovations aren't about style — they're about replacing components that are no longer performing." },
  { icon: ThermometerSun, title: "Address Hidden Problems", detail: "Water damage behind tile, insufficient insulation, outdated wiring, failing subfloors. Often the most important renovation work is what you can't see until demo day." },
  { icon: Star, title: "Protect Long-Term Value", detail: "A well-executed renovation increases your home's value, reduces maintenance costs, and extends the life of your largest asset. Done poorly, it does the opposite." },
];

const renovationTypes = [
  { icon: UtensilsCrossed, title: "Kitchen Remodels", detail: "Complete kitchen transformations — layout reconfiguration, cabinetry, countertops, plumbing, electrical, and finish work. Designed for how you actually cook and live, not just how it photographs." },
  { icon: Bath, title: "Bathroom Renovations", detail: "Master baths, guest baths, and powder rooms — tile work, vanities, plumbing relocation, ventilation upgrades, and waterproofing that prevents the hidden moisture damage we see constantly in WNC homes." },
  { icon: Sofa, title: "Living Space Transformations", detail: "Open-concept conversions, room reconfigurations, built-in cabinetry, and living area upgrades that change how your home flows and functions without adding square footage." },
  { icon: DoorOpen, title: "Basement Finishing", detail: "Converting unfinished basements into functional living space — framing, insulation, moisture management, electrical, plumbing, and finish work. Critical in WNC where basement moisture is a constant consideration." },
  { icon: Wrench, title: "Structural Modifications", detail: "Load-bearing wall removal, floor leveling, foundation repairs, and structural reinforcement. We involve a structural engineer on every modification that touches the home's skeleton." },
  { icon: Paintbrush, title: "Whole-Home Renovations", detail: "Coordinated multi-room or full-home renovation projects managed as a single scope — ensuring trades don't conflict, timelines stay integrated, and finishes are consistent throughout." },
];

const finishQuality = [
  { title: "Tile & Stone", detail: "Precise layout planning, consistent grout lines, proper waterproofing layers, and substrate preparation. Tile work that looks right in year one and stays right in year ten." },
  { title: "Cabinetry & Millwork", detail: "Plumb, level, and aligned — with consistent reveals, soft-close hardware, and finish carpentry that holds up to daily use. We don't accept gaps, misalignment, or shortcuts." },
  { title: "Material Transitions", detail: "Where flooring changes, where trim meets tile, where old wall meets new — these transition points define whether a renovation looks professional or improvised." },
  { title: "Paint & Surface Prep", detail: "Proper prep, proper primer, proper technique. Smooth walls, clean edges, and finish coats that last. Paint quality is directly proportional to preparation quality." },
];

const whyHighlander = [
  { icon: ClipboardCheck, title: "Same Planning Discipline", detail: "We scope renovation work with the same detail and documentation we bring to roofing — written proposals, material specifications, defined timelines, and no vague allowances." },
  { icon: Eye, title: "Same Quality Standards", detail: "Our renovation crews are held to the same quality checkpoints, material handling standards, and supervision protocols as our roofing and construction teams." },
  { icon: Users, title: "Same In-House Crews", detail: "The same trained, employed craftsmen who build our additions and install our roofs handle renovation work." },
  { icon: Ruler, title: "Same Attention to Detail", detail: "Trim reveals, caulk lines, material transitions, and tile work matter. We treat visible details as quality indicators — because you'll notice them every day." },
  { icon: FileCheck, title: "Documented Everything", detail: "Written scope, transparent cost groupings, specified materials, confirmed timeline. You receive a complete proposal — not an estimate with vague allowances and vague 'to be determined' items." },
  { icon: Mountain, title: "WNC Material Knowledge", detail: "Mountain humidity, temperature swings, and elevation affect material performance. We specify products rated for WNC conditions — not what's cheapest at the supply house." },
];

const processSteps = [
  { number: "01", icon: Eye, title: "On-Site Assessment", description: "We walk your home, discuss your goals, and identify structural, mechanical, and aesthetic considerations that will shape the scope." },
  { number: "02", icon: PenTool, title: "Design & Scope Development", description: "Detailed scope of work with material selections, layout options, and a fixed price. You see exactly what you're getting before work begins." },
  { number: "03", icon: ClipboardCheck, title: "Permitting & Preparation", description: "We handle all permitting, trade coordination, and material procurement so you're not managing logistics." },
  { number: "04", icon: CalendarCheck, title: "Material Sourcing & Scheduling", description: "Materials ordered, delivery coordinated, and your project locked into the production calendar with a defined start date." },
  { number: "05", icon: Hammer, title: "Execution", description: "Professional renovation with daily quality checks, clean work zones, dust barriers, and proactive communication throughout." },
  { number: "06", icon: Sparkles, title: "Walk-Through & Completion", description: "Final review, touch-ups, cleanup, and documentation. Your home, refined." },
];

const galleryImages = [
  { src: proj1, alt: "Kitchen renovation in WNC home", label: "Kitchen Remodel", location: "Complete Transformation, Asheville" },
  { src: proj2, alt: "Bathroom renovation with custom tile", label: "Master Bath", location: "Custom Tile & Vanity, Sylva" },
  { src: proj3, alt: "Living space open concept renovation", label: "Open Concept Conversion", location: "Wall Removal & Refinish, Franklin" },
  { src: proj4, alt: "Whole home multi-room renovation", label: "Whole-Home Renovation", location: "Multi-Room Scope, Fairview" },
];

const faqs = [
  { q: "What types of renovations does Highlander handle?", a: "We handle kitchen remodels, bathroom renovations, basement finishing, open-concept conversions, structural modifications, and whole-home renovation projects. We focus on work that involves structural, plumbing, or electrical systems — not cosmetic painting or flooring-only projects." },
  { q: "How long does a typical kitchen renovation take?", a: "A full kitchen remodel typically takes 6–10 weeks depending on scope. Layout changes, plumbing relocation, and custom cabinetry add time. We provide a specific timeline during the proposal phase and update you weekly on progress." },
  { q: "Can we live in our home during a renovation?", a: "In most cases, yes — with some inconvenience. Kitchen renovations are the most disruptive. We'll discuss staging, temporary solutions, and phasing options during planning to minimize daily-life impact." },
  { q: "How do you handle discovering hidden problems during demolition?", a: "It's common — especially in older WNC homes. When we find hidden water damage, outdated wiring, or structural issues behind walls, we stop, document, discuss scope and cost with you, and proceed only after approval. No surprise charges." },
  { q: "Do you handle design or just construction?", a: "We manage the construction scope, including layout and material recommendations. For complex design work, we collaborate with local project planners and designers and manage the construction coordination so you don't have to." },
  { q: "What's included in a renovation proposal?", a: "A written scope with transparent cost groupings, material specifications, timeline, and payment schedule. Every element is defined before work begins — no vague allowances or vague 'to be determined' items." },
  { q: "How do you protect the rest of our home during renovation?", a: "Dust barriers, floor protection, dedicated entry/exit routes for crews, and daily cleanup are standard. We treat the non-renovation areas of your home with the same care we'd want in our own." },
  { q: "Do renovations in older WNC homes require special considerations?", a: "Yes. Many mountain homes built before 2000 have unique framing methods, non-standard electrical, plaster instead of drywall, and moisture issues specific to elevation and terrain. We assess these factors before scoping work." },
];

/* ═══════════════════════════════════════════ PAGE ═══════════════════════════════════════════ */

const Renovations = () => {
  return (
    <>
      <SEOHead
        title="Renovations in Western NC | Kitchen, Bath & Whole-Home"
        description="Premium renovations for Western North Carolina homes. Kitchen remodels, bathroom renovations, basement finishing, and whole-home transformations with in-house crews and documented quality."
        path="/construction/renovations"
        jsonLd={[
          serviceSchema({ name: "Renovations", description: "Interior renovations and remodeling for Western North Carolina homeowners.", url: "/construction/renovations" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Renovations", url: "/construction/renovations" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Renovations", url: "/construction/renovations" }]} />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img decoding="async" src={heroImg} alt="Home renovation in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.4)] via-[hsl(var(--hero-overlay)/0.2)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.35)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/construction" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="flex flex-col">
                    <span className="text-[18px] md:text-[20px] font-heading font-bold text-white tracking-[0.1em] uppercase">Highlander</span>
                    <span className="text-[10px] md:text-[11px] font-body font-bold text-[hsl(var(--gold-ink))] uppercase tracking-[0.3em] -mt-1">Construction Division</span>
                  </div>
                </Link>
                <ChevronRight className="w-3 h-3 text-white/30" />
                <span className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))]">Renovations</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Refine What's There.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
                  <span className="text-[hsl(var(--gold-ink))]">Protect What Matters.</span>
                </motion.h2>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-body-lg md:text-body-xl text-white/90 max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Renovation isn't demolition. It's the discipline of improving what exists while preserving what works — structure, character, and the investment you've already made.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-[14px] px-9 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+18285247773" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
              </motion.div>

              {/* Transformation indicator — unique to Renovations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="mt-10 flex items-center gap-4"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm">
                  <TrendingUp className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" />
                  <span className="text-xs font-body text-primary-foreground/95">Avg. ROI: 60–80% at resale</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm">
                  <Eye className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" />
                  <span className="text-xs font-body text-primary-foreground/95">Hidden damage protocol included</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── OPENING — Lifestyle-focused with warm visual treatment ─── */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 h-2/3 opacity-[0.03] pointer-events-none hidden lg:block">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200" alt="Interior detail" className="w-full h-full object-cover" />
          </div>

          <div className="container-tight max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.3)]" />
                <Gauge className="w-6 h-6 text-[hsl(var(--highland-gold)/0.85)]" />
                <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.3)]" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-heading font-bold text-foreground leading-[1.15] mb-6 text-balance tracking-tight">
                Renovation isn't about tearing things apart. It's the discipline of improving what exists while preserving what works — structure, character, and the investment you've already made.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-[1.8] font-body max-w-2xl mx-auto">
                Highlander approaches renovation the way we approach every project: with documented scope, defined materials, honest timelines, and the same in-house crews who build our additions and install our roofs. The result is renovation work that feels intentional — not improvised.
              </p>
              <div className="flex items-center justify-center gap-2 mt-10">
                <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.15)]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[hsl(var(--highland-gold)/0.2)]" />
                <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.15)]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── RENOVATION GOALS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Why Renovate</span>
              <h2 className="section-heading mb-4">The Real Reasons<br className="hidden md:block" /> Homeowners Renovate.</h2>
              <p className="text-muted-foreground text-sm font-body max-w-lg mx-auto">Not every renovation is about aesthetics. Most start with a functional problem that's gone unaddressed too long.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {renovationGoals.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.25)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RENOVATION CATEGORIES ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Renovation Services</span>
              <h2 className="section-heading mb-4">What We Renovate.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {renovationTypes.map((type, i) => (
                <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <div className="w-9 h-9 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <type.icon className="w-4.5 h-4.5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{type.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{type.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINISH QUALITY (dark) ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Finish Quality</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  The Details You Live With<br className="hidden md:block" /> Every Day.
                </h2>
                <p className="text-dark-section-foreground/95 text-base font-body max-w-lg mx-auto">
                  Renovation quality isn't about the big reveal — it's about what you notice six months later. Grout lines. Trim joints. How a drawer closes. We build for the long view.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {finishQuality.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-8 bg-[hsl(var(--highland-gold)/0.3)] rounded-full mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2">{item.title}</h3>
                        <p className="text-dark-section-foreground/95 text-[13px] leading-relaxed font-body">{item.detail}</p>
                      </div>
                    </div>
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
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Ready to discuss your renovation?</h3>
                <p className="text-primary-foreground/85 text-sm font-body">We respond rapidly with a direct call — not a form email.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-sm px-6 py-3.5 rounded-none inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a href="tel:+18285247773" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  <Phone className="w-4 h-4" /> Call Direct
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY HIGHLANDER ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Why Highlander</span>
              <h2 className="section-heading mb-4">Renovation With<br className="hidden md:block" /> Roofing-Grade Standards.</h2>
              <p className="text-muted-foreground text-sm font-body max-w-lg mx-auto">
                Our heritage in high-elevation roofing built our construction discipline. The same documented process, the same in-house crews, the same material standards — now applied to every renovation we accept.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {whyHighlander.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{item.title}</h3>
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
              <h2 className="section-heading mb-4">Renovation,<br className="hidden md:block" /> Systematized.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-[hsl(var(--highland-gold)/0.1)] transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <step.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Recent Work</span>
              <h2 className="section-heading mb-3">Renovation Projects.</h2>
              <p className="text-muted-foreground text-sm font-body max-w-md mx-auto">Each project was scoped, documented, and executed with the same discipline we bring to every build.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img decoding="async" src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-sm font-heading font-bold tracking-wide mb-0.5">{img.label}</p>
                    <p className="text-white/85 text-xs font-body">{img.location}</p>
                  </div>
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[hsl(var(--highland-gold))] group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
              <Link to="/recent-projects" className="group text-sm font-heading font-semibold text-[hsl(var(--gold-ink))] inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                View Full Project Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        <VeluxWidget
          variant="remodeler"
          eyebrow="VELUX Certified Installer"
          heading="Add Daylight to Your Remodel"
          description="Browse the VELUX skylight and Sun Tunnel lineup for renovations — then tell us which rooms you want brightened."
        />

        {/* ─── FAQs ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Renovation FAQs</span>
              <h2 className="section-heading mb-4">Common Questions.</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-[hsl(var(--highland-gold)/0.2)] data-[state=open]:shadow-sm transition-all duration-300">
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
        <DesignProgramPromo
          heading="Serious Renovations Start With a Design Phase."
          subheading="Whole-home and multi-room renovations need a coordinated plan, not decisions made on the fly. Our paid Design & Consultation Agreement scopes, draws, and documents the renovation before construction pricing is finalized."
          variant="band"
          className="mt-4"
        />

        <ConstructionClosingCTA
          headline={"Your Home Deserves\nBetter Than 'Good Enough.'"}
          subheadline="Whether it's a kitchen that finally works, a bathroom that lasts, or a whole-home renovation done right — let's have a straightforward conversation about what's possible."
          eyebrow="Start Planning"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Renovations;
