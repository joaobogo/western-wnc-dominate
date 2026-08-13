import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Star, Home,
  Hammer, Ruler, PenTool,
  ChevronRight, Eye, ClipboardCheck, Users,
  Mountain, Layers, CalendarCheck, Sparkles,
  DoorOpen, Paintbrush, Wrench, TrendingUp, Fence,
  CloudRain, Thermometer, Wind, FileCheck, Droplets
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TieredOffer from "@/components/conversion/TieredOffer";
import { ConstructionClosingCTA } from "@/components/construction/ConstructionShared";

const heroImg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000";
import proj1 from "@/assets/gallery/asphalt-008.webp";
import proj2 from "@/assets/gallery/metal-010.webp";
import proj3 from "@/assets/gallery/cedar-005.webp";
import proj4 from "@/assets/gallery/metal-005.webp";
import AnswerBlock from "@/components/seo/AnswerBlock";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import WhoShowsUp from "@/components/trust/WhoShowsUp";

/* ═══════════════════════════════════════════ DATA ═══════════════════════════════════════════ */

const serviceCategories = [
  { icon: Paintbrush, title: "Siding Replacement & Upgrades", detail: "Complete siding removal and replacement with premium materials — fiber cement, engineered wood, cedar, or vinyl. Includes proper weather barrier installation, trim detailing, and color coordination." },
  { icon: DoorOpen, title: "Entry & Door Enhancements", detail: "Front entry upgrades, custom door installations, sidelight additions, and covered entry construction that improves curb appeal, security, and first impressions." },
  { icon: Layers, title: "Window Replacement & Installation", detail: "Energy-efficient window upgrades, new window openings, and window-to-door conversions. Proper flashing, trim, and interior finishing included." },
  { icon: Fence, title: "Trim, Fascia & Soffit Work", detail: "Replacement and upgrades to exterior trim, fascia boards, soffits, and decorative elements. Properly detailed trim work defines the home's character and protects vulnerable transition points." },
  { icon: Wrench, title: "Structural Exterior Repairs", detail: "Rotted framing, damaged load-bearing elements, foundation interface problems, and structural deficiencies that affect both safety and building integrity." },
  { icon: Hammer, title: "Exterior Envelope Upgrades", detail: "Comprehensive exterior improvement projects that address multiple systems — siding, windows, trim, flashing, and weather barriers — as one coordinated scope." },
];

const weatherResilience = [
  { icon: CloudRain, title: "Moisture & Rain Management", detail: "WNC receives 40–60 inches of rain annually. Every exterior detail — flashing, weather barriers, caulk joints, and drainage paths — must manage this volume without allowing moisture into the building envelope." },
  { icon: Thermometer, title: "Freeze-Thaw Cycling", detail: "Mountain elevations experience 80+ freeze-thaw cycles per year. Materials and fasteners that can't handle thermal expansion destroy caulk joints, crack rigid materials, and create entry points for water." },
  { icon: Wind, title: "Wind & UV Exposure", detail: "Ridge-top and exposed properties face significantly higher wind loads and UV degradation. Material selection and fastening methods must account for sustained exposure that valley homes never experience." },
  { icon: Droplets, title: "Humidity & Condensation", detail: "Mountain humidity creates condensation risks at material transitions. Proper vapor management and ventilation behind siding prevents the hidden rot we frequently discover in older WNC homes." },
];

const approachPillars = [
  { icon: Shield, title: "Roofing-Construction Coordination", detail: "Exterior renovation frequently overlaps with roofing at fascia, soffit, and flashing transitions. Having one company manage both eliminates coordination gaps and ensures waterproofing continuity." },
  { icon: ClipboardCheck, title: "Documented Scope & Pricing", detail: "Written proposals with transparent cost groupings, specified materials, defined timeline, and no vague allowances. You know exactly what you're getting before we mobilize." },
  { icon: Users, title: "In-House Installation Crews", detail: "The same trained, employed craftsmen who build our additions and install our roofs handle exterior work." },
  { icon: FileCheck, title: "Hidden Damage Protocol", detail: "When we find rot, insect damage, or moisture issues behind siding — and we often do — we stop, document, discuss scope and cost, and proceed only after your approval. No surprise charges." },
  { icon: Mountain, title: "WNC Material Expertise", detail: "We specify materials rated for mountain conditions — not what's cheapest at the supply house. Fiber cement, engineered wood, and metal that handle elevation, UV, and moisture." },
  { icon: Eye, title: "Daily Quality Verification", detail: "Trim reveals, caulk lines, material transitions, and paint edges matter on exterior work. We treat visible details as quality indicators — because your neighbors will too." },
];

const valueImpact = [
  { title: "Curb Appeal & First Impressions", detail: "New siding, a refreshed entry, and clean trim work transform how your home presents from the street. First impressions drive perceived value — for buyers, appraisers, and you." },
  { title: "Energy Efficiency", detail: "Modern windows, properly installed weather barriers, and sealed building envelope reduce heating and cooling costs — meaningful savings at WNC elevations where heating seasons are long." },
  { title: "Preventive Protection", detail: "Replacing aged siding, rotted trim, and failing windows before they compromise structural elements saves exponentially more than the repair cost. Moisture behind siding is silent and destructive." },
  { title: "Resale Positioning", detail: "Exterior condition is the first thing buyers evaluate. Updated exteriors consistently rank among the highest-ROI home improvements nationally — siding returns 70–80%, windows return 60–70%." },
];

const processSteps = [
  { number: "01", icon: Phone, title: "Initial Discussion", description: "You describe what you want to improve. We discuss scope, priorities, budget range, and whether a phased approach makes sense for your goals." },
  { number: "02", icon: Eye, title: "On-Site Assessment", description: "We evaluate the current condition of your exterior — identifying damage, underlying issues, and opportunities. Photographs and findings documented." },
  { number: "03", icon: Ruler, title: "Detailed Proposal", description: "Written scope with material specifications, color/style selections, timeline, and transparent cost groupings. You know exactly what you're getting." },
  { number: "04", icon: CalendarCheck, title: "Material Sourcing & Scheduling", description: "Materials ordered, delivery coordinated, and your project locked into the production calendar." },
  { number: "05", icon: Hammer, title: "Execution", description: "Professional installation with daily quality verification, clean work zones, and proactive communication." },
  { number: "06", icon: Sparkles, title: "Walk-Through & Completion", description: "Final review, touch-ups, cleanup, and documentation. Your home's exterior, transformed." },
];

const galleryImages = [
  { src: proj1, alt: "Complete exterior renovation", label: "Full Exterior Upgrade", location: "Siding & Trim, Asheville" },
  { src: proj2, alt: "Entry enhancement with new door", label: "Entry Enhancement", location: "Custom Door Installation, Franklin" },
  { src: proj3, alt: "Cedar siding renovation", label: "Cedar Siding", location: "Mountain Home Renovation, Sylva" },
  { src: proj4, alt: "Window replacement project", label: "Window Replacement", location: "Energy Upgrade, Fairview" },
];

const faqs = [
  { q: "What exterior renovation services does Highlander provide?", a: "We handle siding replacement, window and door installations, trim and fascia work, exterior structural repairs, entry enhancements, and comprehensive exterior envelope upgrades. We focus on work where our construction quality and project management make a meaningful difference — not painting or cosmetic touch-ups." },
  { q: "How long does a siding replacement project take?", a: "A typical whole-home siding replacement takes 2–4 weeks depending on the home's size, the number of stories, and the complexity of trim detailing. We provide a specific timeline during the proposal phase." },
  { q: "What siding materials do you recommend for WNC?", a: "Fiber cement (James Hardie) is our most recommended siding for WNC — it handles moisture, temperature swings, and UV exposure better than most alternatives. Engineered wood and premium vinyl are also strong options depending on your budget and aesthetic goals." },
  { q: "Can you match existing siding if I only need partial replacement?", a: "In many cases, yes. If your current siding profile is still manufactured, we can source matching material. If it's been discontinued, we'll discuss whether a partial replacement with a complementary profile is feasible or whether a full replacement makes more sense." },
  { q: "Do you coordinate with your roofing team on combined projects?", a: "Yes — this is one of our key advantages. When exterior renovation work overlaps with roofing (which it often does at fascia, soffit, and flashing transitions), having one company manage both eliminates coordination gaps and ensures waterproofing continuity." },
  { q: "How do renovation projects affect my daily life?", a: "Exterior work has less daily-life impact than interior renovation. Expect noise during working hours, temporary removal of outdoor furniture near work areas, and occasional access to electrical panels or utility connections. We brief you on what to expect before each phase." },
  { q: "Will exterior renovations increase my home's value?", a: "Consistently, yes. Siding replacement typically returns 70–80% of cost at resale. New windows return 60–70%. A refreshed entry and clean trim work improve perceived value disproportionately to their cost." },
  { q: "How do you handle discovering hidden damage during renovation?", a: "Rotted sheathing, insect damage, or moisture issues behind siding are common findings during exterior renovation. When we discover hidden damage, we stop, document it, discuss the scope and cost of repair with you, and proceed only after you approve the additional work." },
];

/* ═══════════════════════════════════════════ PAGE ═══════════════════════════════════════════ */

const ExteriorImprovements = () => {
  return (
    <>
      <SEOHead
        title="Exterior Improvements in WNC | Siding & Windows"
        description="Exterior renovations for Western NC homes: siding replacement, window upgrades, structural repair, and full envelope work by in-house crews."
        path="/construction/exterior"
        jsonLd={[
          serviceSchema({ name: "Exterior Improvements", description: "Exterior renovations and structural upgrades for Western North Carolina homes.", url: "/construction/exterior" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Exterior Improvements", url: "/construction/exterior" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Construction", url: "/construction" },
          { name: "Exterior Improvements", url: "/construction/exterior" },
        ]}
      />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img width={1600} height={1067} decoding="async" src={heroImg} alt="Exterior renovation project in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.65)] via-[hsl(var(--hero-overlay)/0.35)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.8)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/construction" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-primary-foreground" /></div>
                  <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">Construction</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/90" />
                <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))]">Exterior Improvements</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Defend the Envelope.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
                  <span className="text-[hsl(var(--gold-ink))]">Define the Character.</span>
                </motion.h2>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Siding replacement, window upgrades, trim work, and comprehensive building envelope improvements that protect and define your home.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-body-xs px-9 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Exterior Project</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+18285247773" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
              </motion.div>

              {/* Weather resilience strip — unique to Exterior */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="mt-10 flex flex-wrap gap-2"
              >
                {[
                  { icon: CloudRain, label: "40–60\" Annual Rain" },
                  { icon: Thermometer, label: "80+ Freeze Cycles/yr" },
                  { icon: Wind, label: "Ridge Wind Exposure" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/8 rounded-sm">
                    <item.icon className="w-3 h-3 text-primary-foreground/90" />
                    <span className="text-caption font-body text-primary-foreground/90 uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <AnswerBlock
          question="What are exterior improvements?"
          answer="Exterior improvements bundle the work that protects and finishes the outside of a home — roofing, siding, gutters, trim, windows, doors, and outdoor structures. Handling them together keeps flashing details continuous and avoids gaps between separate trades. Highlander handles full exterior scopes across Western North Carolina."
          points={["Roofing, siding, gutters, and trim in one scope", "Continuous flashing detail between systems", "Single point of accountability for the exterior"]}
        />

        {/* ─── OPENING — Protection-focused with left-aligned editorial ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-8">
                <div className="w-10 h-[3px] mb-8 bg-[hsl(var(--highland-gold)/0.3)]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.15] mb-6">
                  Your home's exterior is the first thing people see and the last line of defense against everything Western North Carolina throws at it.
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body">
                  Highlander approaches exterior work with the same project discipline, material standards, and quality verification we bring to roofing and new construction. Whether it's a full siding replacement or a targeted structural repair — we deliver results that hold up for decades.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="lg:col-span-4">
                <div className="bg-secondary border border-border rounded-sm p-6 space-y-4">
                  <h3 className="text-xs font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Typical ROI</h3>
                  {[
                    { label: "Siding Replacement", value: "70–80%" },
                    { label: "Window Upgrades", value: "60–70%" },
                    { label: "Entry Enhancement", value: "75%+" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm text-muted-foreground font-body">{item.label}</span>
                      <span className="text-sm font-heading font-bold text-[hsl(var(--gold-ink))]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SERVICE CATEGORIES ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Exterior Services</span>
              <h2 className="section-heading mb-4">What We Improve.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {serviceCategories.map((svc, i) => (
                <motion.div key={svc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <svc.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{svc.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{svc.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WEATHER RESILIENCE (dark) ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Weather Resilience</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  WNC Exteriors Face<br className="hidden md:block" /> More Than Most.
                </h2>
                <p className="text-dark-section-foreground/95 text-base font-body max-w-lg mx-auto">
                  The mountains test every material, fastener, and joint on your home's exterior. We build for the conditions — not just the appearance.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {weatherResilience.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
                    <p className="text-dark-section-foreground/95 text-body-xs leading-relaxed font-body">{item.detail}</p>
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
                <p className="text-primary-foreground/85 text-sm font-body">Let's discuss what would make the biggest impact for your property.</p>
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
              <h2 className="section-heading mb-4">Exterior Work,<br className="hidden md:block" /> Construction Standards.</h2>
              <p className="text-muted-foreground text-sm font-body max-w-lg mx-auto">
                Renovation isn't a side hustle for us. It's built on the same foundation of planning, quality, and accountability that defines every Highlander project.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {approachPillars.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VALUE IMPACT (asymmetric) ─── */}
        <section className="section-padding bg-secondary tartan-bg">
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
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{item.title}</h3>
                        <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-[hsl(var(--highland-gold)/0.1)] transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <step.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Featured Renovations</span>
              <h2 className="section-heading mb-3">Transformations.</h2>
              <p className="text-muted-foreground text-sm font-body max-w-md mx-auto">Exterior projects that improved curb appeal, weather resilience, and long-term property value.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img width={1600} height={1067} decoding="async" src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
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

        {/* ─── FAQs ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Exterior FAQs</span>
              <h2 className="section-heading mb-4">Common Questions.</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-[hsl(var(--highland-gold)/0.2)] data-[state=open]:shadow-flat transition-all duration-300">
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

        <WhoShowsUp />

        {/* ─── CLOSING CTA ─── */}
        <ConstructionClosingCTA
          headline={"Your Home's Best Days\nDon't Have to Be Behind It."}
          subheadline="Whether it's siding that's seen better days, windows that don't perform anymore, or an exterior that needs protection — let's talk about what's possible."
          eyebrow="Transform Your Exterior"
        />
        <TieredOffer context="exterior-improvements" primaryLabel="Get My Exterior Scoped" />
      </main>
      <ConversionTrustBlock variant="band" category="construction" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ExteriorImprovements;
