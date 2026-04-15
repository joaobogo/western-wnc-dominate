import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Star, Home,
  CheckCircle, Hammer, Ruler, PenTool,
  ChevronRight, Eye, ClipboardCheck, Users,
  Mountain, Layers, CalendarCheck, Sparkles,
  DoorOpen, Paintbrush, Wrench, TrendingUp, Fence
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

const serviceCategories = [
  { icon: Paintbrush, title: "Siding Replacement & Upgrades", detail: "Complete siding removal and replacement with premium materials — fiber cement, engineered wood, cedar, or vinyl. Includes proper weather barrier installation, trim detailing, and color coordination." },
  { icon: DoorOpen, title: "Entry & Door Enhancements", detail: "Front entry upgrades, custom door installations, sidelight additions, and covered entry construction that improves curb appeal, security, and first impressions." },
  { icon: Layers, title: "Window Replacement & Installation", detail: "Energy-efficient window upgrades, new window openings, and window-to-door conversions. Proper flashing, trim, and interior finishing included." },
  { icon: Fence, title: "Trim, Fascia & Soffit Work", detail: "Replacement and upgrades to exterior trim, fascia boards, soffits, and decorative elements. Properly detailed trim work defines the home's character and protects vulnerable transition points." },
  { icon: Wrench, title: "Structural Exterior Repairs", detail: "Rotted framing, damaged load-bearing elements, foundation interface problems, and structural deficiencies that affect both safety and building integrity." },
  { icon: Hammer, title: "Exterior Envelope Upgrades", detail: "Comprehensive exterior improvement projects that address multiple systems — siding, windows, trim, flashing, and weather barriers — as one coordinated scope." },
];

const approachPillars = [
  { icon: ClipboardCheck, title: "Same Planning Discipline", detail: "We scope renovation work with the same detail and documentation we bring to roofing — written proposals, material specifications, defined timelines, and no vague allowances." },
  { icon: Eye, title: "Same Quality Standards", detail: "Our renovation crews are held to the same quality checkpoints, material handling standards, and supervision protocols as our roofing and construction teams." },
  { icon: Users, title: "Same In-House Crews", detail: "The same trained, employed craftsmen who build our additions and install our roofs handle renovation work. No anonymous subcontractor rotation." },
  { icon: Ruler, title: "Same Attention to Detail", detail: "Trim reveals, caulk lines, material transitions, and paint edges matter on renovation work. We treat visible details as quality indicators — because your neighbors will too." },
];

const valueImpact = [
  { title: "Curb Appeal & First Impressions", detail: "New siding, a refreshed entry, and clean trim work transform how your home presents from the street. First impressions drive perceived value — for buyers, appraisers, and you." },
  { title: "Energy Efficiency", detail: "Modern windows, properly installed weather barriers, and sealed building envelope reduce heating and cooling costs — meaningful savings at WNC elevations where heating seasons are long." },
  { title: "Preventive Protection", detail: "Replacing aged siding, rotted trim, and failing windows before they compromise structural elements saves exponentially more than the repair cost. Moisture behind siding is silent and destructive." },
  { title: "Resale Positioning", detail: "Exterior condition is the first thing buyers evaluate and the fastest way to lose a showing. Updated exteriors consistently rank among the highest-ROI home improvements nationally." },
];

const processSteps = [
  { number: "01", icon: Phone, title: "Initial Discussion", description: "You describe what you want to improve. We discuss scope, priorities, budget range, and whether a phased approach makes sense for your goals." },
  { number: "02", icon: Eye, title: "On-Site Assessment", description: "We evaluate the current condition of your exterior — identifying damage, underlying issues, and opportunities. Photographs and findings documented." },
  { number: "03", icon: Ruler, title: "Detailed Proposal", description: "Written scope with material specifications, color/style selections, timeline, and line-item pricing. You know exactly what you're getting." },
  { number: "04", icon: CalendarCheck, title: "Material Sourcing & Scheduling", description: "Materials ordered, delivery coordinated, and your project locked into the production calendar." },
  { number: "05", icon: Hammer, title: "Execution", description: "Professional installation with daily quality verification, clean work zones, and proactive communication." },
  { number: "06", icon: Sparkles, title: "Walk-Through & Completion", description: "Final review, touch-ups, cleanup, and documentation. Your home's exterior, transformed." },
];

const galleryImages = [
  { src: proj1, alt: "Complete exterior renovation", label: "Full Exterior — Siding & Trim Upgrade" },
  { src: proj2, alt: "Entry enhancement with new door", label: "Entry Enhancement — Custom Door Installation" },
  { src: proj3, alt: "Cedar siding renovation", label: "Cedar Siding — Mountain Home Renovation" },
  { src: proj4, alt: "Window replacement project", label: "Window Replacement — Energy Upgrade" },
];

const faqs = [
  { q: "What exterior renovation services does Highlander provide?", a: "We handle siding replacement, window and door installations, trim and fascia work, exterior structural repairs, entry enhancements, and comprehensive exterior envelope upgrades. We focus on work where our construction quality and project management make a meaningful difference — not painting or cosmetic touch-ups." },
  { q: "How long does a siding replacement project take?", a: "A typical whole-home siding replacement takes 2–4 weeks depending on the home's size, the number of stories, and the complexity of trim detailing. We provide a specific timeline during the proposal phase." },
  { q: "What siding materials do you recommend for WNC?", a: "Fiber cement (James Hardie) is our most recommended siding for WNC — it handles moisture, temperature swings, and UV exposure better than most alternatives. Engineered wood and premium vinyl are also strong options depending on your budget and aesthetic goals. We'll recommend based on your home's architecture and your long-term plans." },
  { q: "Can you match existing siding if I only need partial replacement?", a: "In many cases, yes. If your current siding profile is still manufactured, we can source matching material. If it's been discontinued, we'll discuss whether a partial replacement with a complementary profile is feasible or whether a full replacement makes more sense aesthetically and financially." },
  { q: "Do you coordinate with your roofing team on combined projects?", a: "Yes — this is one of our key advantages. When exterior renovation work overlaps with roofing (which it often does at fascia, soffit, and flashing transitions), having one company manage both eliminates coordination gaps and ensures waterproofing continuity." },
  { q: "How do renovation projects affect my daily life?", a: "Exterior work has less daily-life impact than interior renovation. Expect noise during working hours, temporary removal of outdoor furniture or landscaping near work areas, and occasional access to electrical panels or utility connections. We brief you on what to expect before each phase." },
  { q: "Will exterior renovations increase my home's value?", a: "Consistently, yes. Siding replacement typically returns 70–80% of cost at resale. New windows return 60–70%. A refreshed entry and clean trim work improve perceived value disproportionately to their cost. Beyond resale, these improvements protect your home from ongoing damage." },
  { q: "How do you handle discovering hidden damage during renovation?", a: "Rotted sheathing, insect damage, or moisture issues behind siding are common findings during exterior renovation. When we discover hidden damage, we stop, document it, discuss the scope and cost of repair with you, and proceed only after you approve the additional work." },
];

/* ═══════════════════════════════════════════ */
const ExteriorImprovements = () => {
  return (
    <>
      <SEOHead
        title="Exterior Improvements | Siding, Windows, Trim & Structural Repairs in WNC"
        description="Premium exterior renovations for Western North Carolina homes. Siding replacement, window upgrades, structural repairs, and complete exterior envelope improvements."
        path="/construction/exterior"
        jsonLd={[
          serviceSchema({ name: "Exterior Improvements", description: "Exterior renovations and structural upgrades for Western North Carolina homes.", url: "/construction/exterior" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Exterior Improvements", url: "/construction/exterior" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Exterior renovation project in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.15)] to-[hsl(var(--hero-overlay)/0.3)]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/construction" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-primary-foreground" /></div>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Construction</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/25" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Exterior Improvements</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Refine What's There.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
                  <span className="text-[hsl(var(--highland-gold))]">Protect What Matters.</span>
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed font-body">
                Exterior renovations, siding upgrades, window replacements, structural repairs, and property improvements for Western North Carolina homeowners who want quality that lasts.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-[14px] px-9 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8283979211" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 397-9211
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── OPENING ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="w-12 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                Your home's exterior is the first thing people see and the last line of defense against everything Western North Carolina throws at it.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto">
                Highlander approaches renovation work with the same project discipline, material standards, and quality verification we bring to roofing and new construction. Whether it's a full siding replacement, a structural repair, or a targeted exterior upgrade — we treat your property with the care it deserves and deliver results that hold up for decades.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ─── SERVICE CATEGORIES ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Renovation Services</span>
              <h2 className="section-heading mb-4">What We Improve.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {serviceCategories.map((svc, i) => (
                <motion.div key={svc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <svc.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{svc.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{svc.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── APPROACH / SAME STANDARDS ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Our Approach</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Renovation Work,<br className="hidden md:block" /> Construction Standards.
                </h2>
                <p className="text-dark-section-foreground/40 text-base font-body max-w-lg mx-auto">
                  Renovation isn't a side hustle for us. It's built on the same foundation of planning, quality, and accountability that defines every Highlander project.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {approachPillars.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-dark-section-foreground/12 transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
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
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Ready to improve your home's exterior?</h3>
                <p className="text-primary-foreground/50 text-sm font-body">Let's discuss what would make the biggest impact for your property.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a href="tel:8283979211" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  <Phone className="w-4 h-4" /> Call Direct
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── VALUE IMPACT ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Long-Term Value</span>
                <h2 className="section-heading mb-5">Renovation That<br /> Pays for Itself.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  The right exterior improvements don't just look better — they protect your home from ongoing damage, reduce energy costs, and position your property for stronger resale value.
                </p>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {valueImpact.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-primary/15 card-lift">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-primary/40 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Featured Renovations</span>
              <h2 className="section-heading">Transformations.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-xs font-body font-medium tracking-wide">{img.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Our Process</span>
              <h2 className="section-heading mb-4">How a Renovation<br className="hidden md:block" /> Works With Highlander.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
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
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Renovation FAQs</span>
              <h2 className="section-heading mb-4">Common Questions.</h2>
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
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">Transform Your Exterior</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Home's Best Days<br className="hidden md:block" /> Don't Have to Be Behind It.
                  </h2>
                  <p className="text-dark-section-foreground/45 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    Whether it's siding that's seen better days, windows that don't perform anymore, or an exterior that just doesn't reflect the home you want — let's talk about what's possible.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Schedule a Renovation Consultation</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="tel:8283979211" className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all">
                      <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" /> (828) 397-9211
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Users, text: "In-House Crews" },
                      { icon: Mountain, text: "WNC Specialists" },
                      { icon: Star, text: "Roofing + Construction Coordination" },
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

export default ExteriorImprovements;
