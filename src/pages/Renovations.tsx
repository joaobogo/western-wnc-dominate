import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Star, Home,
  CheckCircle, Hammer, Ruler, PenTool,
  ChevronRight, Eye, ClipboardCheck, Users,
  Mountain, Layers, CalendarCheck, Sparkles,
  DoorOpen, Paintbrush, Wrench, Bath, UtensilsCrossed, Sofa, MessageSquare
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import heroImg from "@/assets/gallery/asphalt-007.webp";
import proj1 from "@/assets/gallery/asphalt-008.webp";
import proj2 from "@/assets/gallery/metal-010.jpg";
import proj3 from "@/assets/gallery/cedar-004.webp";
import proj4 from "@/assets/gallery/metal-005.webp";

/* ═══════════════════════════════════════════ */

const renovationTypes = [
  { icon: UtensilsCrossed, title: "Kitchen Remodels", detail: "Complete kitchen transformations — layout reconfiguration, cabinetry, countertops, plumbing, electrical, and finish work. Designed for how you actually cook and live, not just how it photographs." },
  { icon: Bath, title: "Bathroom Renovations", detail: "Master baths, guest baths, and powder rooms — tile work, vanities, plumbing relocation, ventilation upgrades, and waterproofing that prevents the hidden moisture damage we see constantly in WNC homes." },
  { icon: Sofa, title: "Living Space Transformations", detail: "Open-concept conversions, room reconfigurations, built-in cabinetry, and living area upgrades that change how your home flows and functions without adding square footage." },
  { icon: DoorOpen, title: "Basement Finishing", detail: "Converting unfinished basements into functional living space — framing, insulation, moisture management, electrical, plumbing, and finish work. Critical in WNC where basement moisture is a constant consideration." },
  { icon: Wrench, title: "Structural Modifications", detail: "Load-bearing wall removal, floor leveling, foundation repairs, and structural reinforcement. We involve a structural engineer on every modification that touches the home's skeleton." },
  { icon: Paintbrush, title: "Whole-Home Renovations", detail: "Coordinated multi-room or full-home renovation projects managed as a single scope — ensuring trades don't conflict, timelines stay integrated, and finishes are consistent throughout." },
];

const whyRenovate = [
  { icon: ClipboardCheck, title: "Same Planning Discipline", detail: "We scope renovation work with the same detail and documentation we bring to roofing — written proposals, material specifications, defined timelines, and no vague allowances." },
  { icon: Eye, title: "Same Quality Standards", detail: "Our renovation crews are held to the same quality checkpoints, material handling standards, and supervision protocols as our roofing and construction teams." },
  { icon: Users, title: "Same In-House Crews", detail: "The same trained, employed craftsmen who build our additions and install our roofs handle renovation work. No anonymous subcontractor rotation." },
  { icon: Ruler, title: "Same Attention to Detail", detail: "Trim reveals, caulk lines, material transitions, and tile work matter. We treat visible details as quality indicators — because you'll notice them every day." },
];

const processSteps = [
  { number: "01", icon: Eye, title: "On-Site Assessment", description: "We walk your home, discuss your goals, and identify structural, mechanical, and aesthetic considerations." },
  { number: "02", icon: PenTool, title: "Design & Scope Development", description: "Detailed scope of work with material selections, layout options, and a fixed price before work begins." },
  { number: "03", icon: ClipboardCheck, title: "Permitting & Preparation", description: "We handle all permitting, trade coordination, and material procurement so you're not managing logistics." },
  { number: "04", icon: CalendarCheck, title: "Material Sourcing & Scheduling", description: "Materials ordered, delivery coordinated, and your project locked into the production calendar." },
  { number: "05", icon: Hammer, title: "Execution", description: "Professional renovation with daily quality checks, clean work zones, and proactive communication." },
  { number: "06", icon: Sparkles, title: "Walk-Through & Completion", description: "Final review, touch-ups, cleanup, and documentation. Your home, transformed." },
];

const galleryImages = [
  { src: proj1, alt: "Kitchen renovation", label: "Kitchen Remodel — Complete Transformation" },
  { src: proj2, alt: "Bathroom renovation", label: "Master Bath — Custom Tile & Vanity" },
  { src: proj3, alt: "Living space renovation", label: "Open Concept — Wall Removal & Refinish" },
  { src: proj4, alt: "Whole home renovation", label: "Whole-Home — Multi-Room Renovation" },
];

const faqs = [
  { q: "What types of renovations does Highlander handle?", a: "We handle kitchen remodels, bathroom renovations, basement finishing, open-concept conversions, structural modifications, and whole-home renovation projects. We focus on work that involves structural, plumbing, or electrical systems — not cosmetic painting or flooring-only projects." },
  { q: "How long does a typical kitchen renovation take?", a: "A full kitchen remodel typically takes 6–10 weeks depending on scope. Layout changes, plumbing relocation, and custom cabinetry add time. We provide a specific timeline during the proposal phase and update you weekly on progress." },
  { q: "Can we live in our home during a renovation?", a: "In most cases, yes — with some inconvenience. Kitchen renovations are the most disruptive. We'll discuss staging, temporary solutions, and phasing options during planning to minimize daily-life impact." },
  { q: "How do you handle discovering hidden problems during demolition?", a: "It's common — especially in older WNC homes. When we find hidden water damage, outdated wiring, or structural issues behind walls, we stop, document, discuss scope and cost with you, and proceed only after approval. No surprise charges." },
  { q: "Do you handle design or just construction?", a: "We manage the construction scope, including layout and material recommendations. For complex design work, we collaborate with local architects and designers and manage the construction coordination so you don't have to." },
  { q: "What's included in a renovation proposal?", a: "A written scope with line-item pricing, material specifications, timeline, and payment schedule. Every element is defined before work begins — no vague allowances or 'to be determined' line items." },
];

/* ═══════════════════════════════════════════ */
const Renovations = () => {
  return (
    <>
      <SEOHead
        title="Renovations | Kitchen, Bathroom & Whole-Home Remodeling in Western NC"
        description="Premium renovations for Western North Carolina homes. Kitchen remodels, bathroom renovations, basement finishing, and whole-home transformations with in-house crews."
        path="/construction/renovations"
        jsonLd={[
          serviceSchema({ name: "Renovations", description: "Interior renovations and remodeling for Western North Carolina homeowners.", url: "/construction/renovations" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Renovations", url: "/construction/renovations" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Home renovation in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.15)] to-[hsl(var(--hero-overlay)/0.3)]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/construction" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-primary-foreground" /></div>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Construction</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/25" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Renovations</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Transform What's Inside.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Keep What Works.
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed font-body">
                Kitchen remodels, bathroom renovations, basement finishing, structural modifications, and whole-home transformations for Western North Carolina homeowners who want craftsmanship that lasts.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-[14px] px-8 py-[14px] md:py-[16px] rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8283979211" className="group border border-primary-foreground/15 text-primary-foreground font-heading font-bold text-[14px] px-8 py-[14px] md:py-[16px] rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-primary-foreground/5 transition-all duration-200 tracking-wide">
                  <Phone className="w-4 h-4 opacity-60" />
                  <span>(828) 397-9211</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── RENOVATION TYPES ─── */}
        <section className="section-padding bg-background tartan-bg">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Construction Division</span>
              <h2 className="section-heading mb-4">Interior Renovation Services</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="max-w-2xl mx-auto text-muted-foreground">From single-room remodels to whole-home transformations — the same planning discipline and quality standards we bring to every project.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {renovationTypes.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }} className="card-premium p-5 md:p-6">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-3 bg-primary/8">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-2 text-foreground">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed font-body text-muted-foreground">{s.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY HIGHLANDER ─── */}
        <section className="section-padding section-dark tartan-dark">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Why Highlander</span>
              <h2 className="section-heading text-dark-section-foreground mb-4">Renovation With Roofing-Grade Standards</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyRenovate.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="border border-[hsl(var(--highland-gold)/0.1)] bg-[hsl(var(--dark-section-foreground)/0.03)] p-5 rounded-sm">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-3 bg-[hsl(var(--highland-gold)/0.1)]">
                    <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-2 text-dark-section-foreground">{item.title}</h3>
                  <p className="text-[13px] leading-relaxed font-body text-dark-section-foreground/60">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="section-padding bg-background">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="eyebrow mb-3 block">Our Process</span>
              <h2 className="section-heading mb-4">Renovation, Systematized</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="card-premium p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-stat-sm text-[hsl(var(--highland-gold)/0.15)] font-heading font-bold">{step.number}</span>
                    <step.icon className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-[13px] text-muted-foreground font-body leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-secondary/40">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="eyebrow mb-3 block">Recent Work</span>
              <h2 className="section-heading mb-4">Renovation Projects</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {galleryImages.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group card-premium overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover img-zoom-dramatic" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <p className="text-body-sm font-body font-medium text-foreground">{img.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
              <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-body font-medium text-accent hover:underline">
                View All Projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="section-padding bg-background">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="eyebrow mb-3 block">Common Questions</span>
              <h2 className="section-heading mb-4">Renovation FAQs</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="card-premium px-5 py-1 accordion-premium">
                  <AccordionTrigger className="text-sm font-heading font-semibold text-foreground hover:no-underline py-4 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[13px] text-muted-foreground font-body leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="section-padding section-dark tartan-dark">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Ready to Start</span>
              <h2 className="section-heading text-dark-section-foreground mb-4">Let's Talk About Your Renovation</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-6" />
              <p className="text-dark-section-foreground/60 font-body mb-8 max-w-xl mx-auto">
                Every renovation starts with a conversation about what you want, what's possible, and what it'll take. No pressure, no sales pitch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-[14px] px-10 py-[16px] rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Request a Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+18283550093" className="group border border-dark-section-foreground/15 text-dark-section-foreground font-heading font-bold text-[14px] px-8 py-[16px] rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all duration-200 tracking-wide">
                  <Phone className="w-4 h-4 opacity-60" />
                  <span>(828) 355-0093</span>
                </a>
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

export default Renovations;
