import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, Ruler, PenTool, Compass, DoorOpen,
  ChevronRight, Eye, ClipboardCheck, Hammer, Users,
  BadgeCheck, Mountain, Layers, CalendarCheck, Sparkles,
  BedDouble, Car, Sofa, Baby, MessageSquare,
  TrendingUp, Wrench, FileCheck, TreePine
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ConstructionClosingCTA } from "@/components/construction/ConstructionShared";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";

const heroImg = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000";
const expansionContextImg = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200";
const structuralTieImg = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200";
const mountainSiteImg = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200";

import proj1 from "@/assets/gallery/cedar-001.jpg";
import proj2 from "@/assets/gallery/metal-008.webp";
import proj3 from "@/assets/gallery/asphalt-006.webp";
import proj4 from "@/assets/gallery/cedar-002.jpg";

/* ═══════════════════════════════════════════ DATA ═══════════════════════════════════════════ */

const whyAdditions = [
  { icon: Baby, title: "A Growing Family", detail: "More bedrooms, a playroom, an expanded kitchen — your family is growing and your home needs to grow with it, without the disruption and cost of moving." },
  { icon: BedDouble, title: "Aging in Place", detail: "A main-level primary suite, wider doorways, an accessible bathroom — additions that let you stay in the home you love as your needs evolve." },
  { icon: Users, title: "Multi-Generational Living", detail: "Guest suites, in-law apartments, and semi-independent living spaces that provide proximity and privacy for extended family under one roof." },
  { icon: Sofa, title: "Lifestyle & Function", detail: "A home office that's actually a room. A sunroom that captures the mountain view. A mudroom that handles real mountain life. Space designed for how you actually live." },
];

const expansionTypes = [
  { icon: BedDouble, title: "Guest Suites & In-Law Apartments", detail: "Self-contained or semi-independent living spaces with private entry, bedroom, bathroom, and kitchenette options. Designed for privacy while maintaining connection to the main home." },
  { icon: DoorOpen, title: "Expanded Living Areas", detail: "Great room extensions, kitchen expansions, open-concept conversions, and family room additions that transform how your home flows and functions." },
  { icon: Car, title: "Garage Additions & Conversions", detail: "Attached or detached garages, workshops, and storage buildings. Also garage-to-living-space conversions for homes that need interior square footage more than parking." },
  { icon: Layers, title: "Bonus Rooms & Flex Spaces", detail: "Second-floor additions, attic conversions, and above-garage bonus rooms that maximize your property's footprint without expanding the foundation." },
  { icon: Compass, title: "Main-Level Primary Suites", detail: "Purpose-built primary bedroom and bathroom additions on the main level — one of the most requested additions for WNC homeowners planning to age in place." },
  { icon: TreePine, title: "Sunrooms & Four-Season Rooms", detail: "Enclosed or semi-enclosed rooms that bring the mountain landscape inside. From screened porches to fully conditioned four-season living spaces." },
];

const designContinuity = [
  { icon: Compass, title: "Design Matching", detail: "Rooflines, pitch, overhang proportions, window rhythm, and exterior materials are matched to the existing home — not just approximated. The addition should look like it was part of the original design." },
  { icon: PenTool, title: "Interior Flow", detail: "The connection between existing space and new space matters as much as the addition itself. We design transitions — hallways, openings, floor level changes — so movement between old and new feels natural." },
  { icon: Layers, title: "Material Continuity", detail: "Matching siding profiles, trim details, roofing materials, and color palettes requires sourcing and sometimes custom fabrication. We don't accept 'close enough' on visible transitions." },
  { icon: Ruler, title: "Proportional Integrity", detail: "An addition that's too large overwhelms the original structure. One that's too small feels like an afterthought. We design to proportions that enhance the home's overall presence." },
];

const whyHighlander = [
  { icon: Shield, title: "Licensed General Contractor", detail: "Full GC oversight on every addition. Structural engineering, code compliance, and permit management handled as part of our standard scope." },
  { icon: Users, title: "In-House Crews", detail: "Our framing, roofing, and finish crews work for Highlander — not as subcontracted labor. That means accountability, communication, and consistent quality." },
  { icon: FileCheck, title: "Documented Process", detail: "Written scope, defined deliverables, specified materials, confirmed timeline, and transparent cost groupings before any commitment. You see exactly what you're getting." },
  { icon: Wrench, title: "Roofing-Proven Standards", detail: "Our extensive roofing background built our construction discipline. The same material standards, crew training, and project documentation now apply to every addition we build." },
  { icon: Mountain, title: "WNC Site Expertise", detail: "Steep lots, rock outcroppings, variable soils, high-elevation wind exposure — we've built on the challenging terrain that defines Western North Carolina properties." },
  { icon: Star, title: "Planning & Design Support", detail: "From concept through completion, we manage the full scope. For complex projects requiring specialized design services, we collaborate with local professionals we've partnered with successfully." },
];

const planningPermitting = [
  { title: "Zoning & Setback Review", detail: "We verify your property's zoning classification, setback requirements, lot coverage limits, and any deed restrictions before design begins — so you know what's buildable before investing in plans." },
  { title: "Structural Engineering", detail: "Additions require structural analysis — foundation design, load calculations, connection to existing structure, and compliance with current building codes. We coordinate engineering as part of our standard process." },
  { title: "Permit Acquisition", detail: "We prepare and submit permit applications, manage the review process, and schedule required inspections throughout construction. You don't have to navigate county offices." },
  { title: "Utility Coordination", detail: "Electrical, plumbing, HVAC, and potentially septic capacity must be evaluated and extended into the new space. We coordinate all trade work within the project timeline." },
];

const processSteps = [
  { number: "01", icon: Phone, title: "Vision Conversation", description: "We listen to what you need, how you live, and what you want the addition to accomplish. This conversation shapes everything that follows." },
  { number: "02", icon: Eye, title: "Site & Structure Assessment", description: "We evaluate your existing home's structure, foundation, roofline, and site conditions to understand what's possible and what needs engineering attention." },
  { number: "03", icon: Ruler, title: "Design & Scope Development", description: "Conceptual layout, material selections, and detailed proposal with defined scope, timeline, and cost. You see exactly what you're getting before we start." },
  { number: "04", icon: CalendarCheck, title: "Permitting & Pre-Construction", description: "Engineering, permits, material ordering, and detailed scheduling. Every detail confirmed before mobilizing." },
  { number: "05", icon: Hammer, title: "Construction", description: "Foundation, framing, roofing, exterior, mechanical systems, insulation, interior finishes — executed in sequence with daily oversight and communication." },
  { number: "06", icon: Sparkles, title: "Completion & Handover", description: "Final inspections, walk-through, punch list resolution, and complete documentation. Your new space, ready to live in." },
];

const galleryImages = [
  { src: proj1, alt: "Room addition on mountain home", label: "Guest Suite Addition", location: "Mountain Residence, Asheville" },
  { src: proj2, alt: "Expanded living area with metal roof integration", label: "Great Room Expansion", location: "Ridgeline Property, Weaverville" },
  { src: proj3, alt: "Sunroom addition with mountain views", label: "Four-Season Room", location: "Valley Home, Black Mountain" },
  { src: proj4, alt: "Garage addition matching existing design theme", label: "Detached Garage Build", location: "Custom Build, Fairview" },
];

const wncChallenges = [
  { title: "Steep & Variable Terrain", detail: "Many WNC lots present grade changes of 15–40%. Additions on slope require specialized foundation engineering, retaining systems, and drainage planning that flat-land builders don't encounter." },
  { title: "Elevation & Weather Exposure", detail: "At 2,000–5,000 ft, mountain properties face higher wind loads, greater freeze-thaw cycling, and more moisture than piedmont homes. Every addition must be designed for this exposure." },
  { title: "Aging Mountain Housing Stock", detail: "Many WNC homes were built in the 1970s–90s with construction methods and materials that differ from current code. Tying new construction to existing framing requires careful structural analysis." },
  { title: "Septic & Well Considerations", detail: "Unlike municipal systems, many mountain properties rely on wells and septic. Adding square footage and plumbing fixtures often requires system evaluation and potential upgrades." },
];

const faqs = [
  { q: "How is a home addition priced?", a: "Additions are priced from the actual scope — square footage, structural complexity, finish level, site access, and how the addition ties into the existing home. Instead of a generic per-foot range, we provide a detailed, grouped-cost proposal during the design phase so the number reflects your real project." },
  { q: "How long does an addition project take?", a: "Most residential additions take 3–6 months from permit approval to completion. Simple single-room additions may be faster; complex multi-room or second-story additions may take longer. We provide a detailed timeline during the proposal phase and communicate proactively about progress and any changes." },
  { q: "Will the addition match my existing home?", a: "This is one of our primary focuses. We match rooflines, siding profiles, trim details, window proportions, and exterior materials to ensure the addition looks like it was always part of the home. When exact material matches aren't available, we source the closest alternatives or recommend design approaches that create intentional, attractive transitions." },
  { q: "Do I need to move out during construction?", a: "In most cases, no. We plan construction to minimize disruption to your daily life, including dust barriers, dedicated access routes, and coordinated noisy-work schedules. For major whole-home renovations that affect essential living areas, we'll discuss temporary relocation options during planning." },
  { q: "Can you build on a steep or challenging lot?", a: "Yes. Many WNC properties have challenging terrain — steep slopes, rock outcroppings, limited access, and variable soil conditions. We have experience building on difficult sites and coordinate with structural engineers and excavation specialists as part of our standard process." },
  { q: "Do you handle the project design?", a: "We offer planning and design-build services for additions that don't require external professionals. For more complex or design-sensitive projects, we collaborate with local designers and project planners. We can work with any design team you've already engaged." },
  { q: "Will an addition increase my home's value?", a: "Well-designed additions typically increase home value — often returning 50–70% of cost at resale, with primary suites and functional living space additions at the higher end. Beyond financial return, a well-executed addition eliminates the need to move and the associated costs and disruption." },
  { q: "How do you handle the connection between old and new construction?", a: "The connection point is the most critical detail in any addition. We tie into existing framing with proper structural connections, match floor levels precisely, integrate rooflines with proper flashing and waterproofing, and ensure the interior transition feels seamless — not like walking through a doorway into a different building." },
];

/* ═══════════════════════════════════════════ PAGE ═══════════════════════════════════════════ */

const HomeAdditions = () => {
  return (
    <>
      <SEOHead
        title="Home Additions in Western NC | Suites & Expansions"
        description="Premium home additions for Western North Carolina. Guest suites, in-law apartments, room expansions, and second-story additions that integrate seamlessly with your existing home."
        path="/construction/additions"
        jsonLd={[
          serviceSchema({ name: "Home Additions", description: "Home additions and expansions for Western North Carolina homeowners.", url: "/construction/additions" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Home Additions", url: "/construction/additions" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Home addition project in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
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
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Construction</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/25" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Home Additions</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  More Space.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
                  <span className="text-[hsl(var(--highland-gold))]">Same Home.</span>
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Guest suites, layout changes, floor plans, and sunrooms — supported by our Design & Planning branch to integrate seamlessly with your existing home's design theme.
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

              {/* Project scope indicator — unique to Additions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="mt-10 grid grid-cols-3 gap-3 max-w-sm"
              >
                {[
                  { value: "200–2,000", unit: "sq ft", label: "Typical Addition Size" },
                  { value: "Per", unit: "scope", label: "Detailed Proposal" },
                  { value: "3–6", unit: "mo", label: "Typical Timeline" },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-white/5 border border-white/8 rounded-sm text-center">
                    <div className="text-sm font-heading font-bold text-[hsl(var(--highland-gold))]">{item.value}<span className="text-[10px] text-primary-foreground/30 ml-0.5">{item.unit}</span></div>
                    <div className="text-[9px] text-primary-foreground/30 font-body uppercase tracking-wider mt-0.5">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── OPENING — Design editorial with scope sidebar ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-8">
                  <Compass className="w-5 h-5 text-[hsl(var(--highland-gold)/0.4)]" />
                  <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.2)]" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.15] mb-6">
                  The best additions don't look like additions. We build rooms that look like your home always had them — because we match the rooflines, materials, and proportions.
                </h2>
                <p className="text-foreground/70 text-base md:text-lg leading-relaxed font-body mb-4">
                  Highlander builds home additions that integrate with your existing design theme — structurally, visually, and in the way the space flows.
                </p>
                <div className="mt-10 relative aspect-[16/7] overflow-hidden border border-border">
                  <img src={expansionContextImg} alt="Integrated home expansion" className="w-full h-full object-cover grayscale opacity-40 hover:opacity-60 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
                <p className="text-muted-foreground/60 text-sm leading-relaxed font-body italic">
                  Every addition starts with understanding your home and ends with a space that elevates the entire property.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="lg:col-span-4">
                <div className="border border-[hsl(var(--highland-gold)/0.15)] rounded-sm p-6 bg-secondary/30">
                  <h3 className="text-xs font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold)/0.6)] mb-4">Addition Types We Build</h3>
                  {["Guest Suites & In-Law Apartments", "Expanded Living Areas", "Main-Level Master Suites", "Garage Additions", "Sunrooms & Four-Season Rooms", "Second-Story Additions"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 py-2 border-b border-border/50 last:border-0">
                      <div className="w-1 h-1 rounded-full bg-[hsl(var(--highland-gold)/0.4)]" />
                      <span className="text-sm text-muted-foreground font-body">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── WHY HOMEOWNERS BUILD ADDITIONS ─── */}
        <section className="section-padding bg-background/50 relative">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Why Add On</span>
              <h2 className="section-heading mb-4">The Reasons<br className="hidden md:block" /> Homeowners Expand.</h2>
              <p className="text-foreground/70 text-base font-body max-w-lg mx-auto leading-relaxed">Every addition project starts with a real need — not a trend. These are the situations that bring homeowners to us.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {whyAdditions.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.25)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EXPANSION TYPES ─── */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] pointer-events-none hidden lg:block">
            <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800" alt="Home architecture" className="w-full h-full object-cover" />
          </div>

          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Addition Types</span>
              <h2 className="section-heading mb-4">What We Build.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {expansionTypes.map((type, i) => (
                <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <div className="w-9 h-9 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <type.icon className="w-4.5 h-4.5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{type.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{type.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DESIGN CONTINUITY (dark) ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Design Continuity</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Making It Look Like<br className="hidden md:block" /> It Was Always There.
                </h2>
                <p className="text-dark-section-foreground/40 text-base font-body max-w-lg mx-auto">
                  The hardest part of any addition isn't building the new space — it's making it belong.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {designContinuity.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
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
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Thinking about adding on?</h3>
                <p className="text-primary-foreground/50 text-sm font-body">We'll help you evaluate what's possible — structurally, visually, and within your budget.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-sm px-6 py-3.5 rounded-none inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a href="tel:8283979211" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  <Phone className="w-4 h-4" /> Call Direct
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY HIGHLANDER (trust section) ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Why Highlander</span>
              <h2 className="section-heading mb-4">What Makes This Different.</h2>
              <p className="text-muted-foreground text-sm font-body max-w-lg mx-auto">
                Years of high-elevation roofing experience built our construction standards. The same documented process, the same in-house crews, the same warranty — now applied to every addition.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {whyHighlander.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PLANNING & PERMITTING ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Planning & Permits</span>
                <h2 className="section-heading mb-5">We Handle the<br /> Complexity.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6">
                  Home additions involve zoning, structural engineering, permits, inspections, and utility coordination. We manage all of it as part of our standard process — so you focus on the vision while we navigate the logistics.
                </p>
                <div className="bg-card border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-5">
                  <h4 className="font-heading font-bold text-foreground text-sm mb-2">Not sure where to start?</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed font-body mb-3">Describe what you're thinking, and we'll help you evaluate feasibility, approach, and budget range — before you commit to anything.</p>
                  <Link to="/consultation" className="group text-sm font-semibold text-[hsl(var(--highland-gold))] inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body">
                    Talk With Our Construction Team <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {planningPermitting.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                    <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── WNC RELEVANCE ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Mountain Building</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Building Additions in WNC<br className="hidden md:block" /> Is Different.
                </h2>
                <p className="text-dark-section-foreground/40 text-base font-body max-w-lg mx-auto">
                  The Western North Carolina landscape demands more from every build. Not every contractor understands why.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {wncChallenges.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Mountain className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" />
                      <h3 className="font-heading font-bold text-dark-section-foreground text-sm">{item.title}</h3>
                    </div>
                    <p className="text-dark-section-foreground/40 text-[13px] leading-relaxed font-body">{item.detail}</p>
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
              <h2 className="section-heading mb-4">From Vision to<br className="hidden md:block" /> Move-In Ready.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-[hsl(var(--highland-gold)/0.1)] transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <step.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Featured Additions</span>
              <h2 className="section-heading mb-3">Integrated by Design.</h2>
              <p className="text-muted-foreground text-sm font-body max-w-md mx-auto">Each addition was designed to look like it was part of the original home — because that's the standard.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-sm font-heading font-bold tracking-wide mb-0.5">{img.label}</p>
                    <p className="text-white/50 text-xs font-body">{img.location}</p>
                  </div>
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[hsl(var(--highland-gold))] group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
              <Link to="/gallery" className="group text-sm font-heading font-semibold text-[hsl(var(--highland-gold))] inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                View Full Project Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── VALUE / ROI CALLOUT ─── */}
        <section className="bg-background">
          <div className="container-tight max-w-4xl px-5 md:px-8 py-12 md:py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
              <div className="md:col-span-2">
                <span className="eyebrow mb-3 block">Long-Term Value</span>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-3 leading-snug">An Addition Is an Investment — Not Just an Expense.</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  Well-designed additions typically return 50–70% of cost at resale, with primary suites and functional living spaces at the higher end. But the real return is staying in the home and community you've already invested in — without the disruption, transaction costs, and compromise of moving.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-card border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-5 text-center">
                  <TrendingUp className="w-5 h-5 text-[hsl(var(--highland-gold))] mx-auto mb-2" />
                  <span className="text-2xl font-heading font-bold text-foreground">50–70%</span>
                  <p className="text-muted-foreground text-xs font-body mt-1">Typical cost recovery at resale</p>
                </div>
                <div className="bg-card border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-5 text-center">
                  <Home className="w-5 h-5 text-[hsl(var(--highland-gold))] mx-auto mb-2" />
                  <span className="text-2xl font-heading font-bold text-foreground">None</span>
                  <p className="text-muted-foreground text-xs font-body mt-1">No realtor fees, no moving costs, no community disruption</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Addition FAQs</span>
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

        <BuilderPromoBlock
          mode="construction"
          variant="band"
          preset="addition"
          title="Plan Your Addition or Extension"
          body="Optional guided pathway for homeowners thinking through an addition. Scope, integration with the existing home, planning stage, timing — all in one place, before our first walkthrough."
          ctaLabel="Build Your Addition Plan"
        />

        {/* ─── CLOSING CTA ─── */}
        <ConstructionClosingCTA
          headline={"Your Home Has More\nto Give."}
          subheadline="Whether it's a guest suite, a main-level master, or a room you haven't even named yet — let's talk about what your home could become."
          eyebrow="Start Planning"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default HomeAdditions;
