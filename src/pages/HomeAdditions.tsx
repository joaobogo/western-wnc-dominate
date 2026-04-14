import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, Ruler, PenTool, Compass, DoorOpen,
  ChevronRight, Eye, ClipboardCheck, Hammer, Users,
  BadgeCheck, Mountain, Layers, CalendarCheck, Sparkles,
  BedDouble, Car, Sofa, Baby, MessageSquare
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import heroImg from "@/assets/gallery/asphalt-004.jpg";
import proj1 from "@/assets/gallery/cedar-001.jpg";
import proj2 from "@/assets/gallery/metal-008.webp";
import proj3 from "@/assets/gallery/asphalt-006.webp";
import proj4 from "@/assets/gallery/cedar-002.jpg";

/* ═══════════════════════════════════════════ */

const whyAdditions = [
  { icon: Baby, title: "A Growing Family", detail: "More bedrooms, a playroom, an expanded kitchen — your family is growing and your home needs to grow with it, without the disruption and cost of moving." },
  { icon: BedDouble, title: "Aging in Place", detail: "A main-level master suite, wider doorways, an accessible bathroom — additions that let you stay in the home you love as your needs evolve." },
  { icon: Users, title: "Multi-Generational Living", detail: "Guest suites, in-law apartments, and semi-independent living spaces that provide proximity and privacy for extended family under one roof." },
  { icon: Sofa, title: "Lifestyle & Function", detail: "A home office that's actually a room. A sunroom that captures the mountain view. A mudroom that handles real mountain life. Space designed for how you actually live." },
];

const expansionTypes = [
  { title: "Guest Suites & In-Law Apartments", detail: "Self-contained or semi-independent living spaces with private entry, bedroom, bathroom, and kitchenette options. Designed for privacy while maintaining connection to the main home." },
  { title: "Expanded Living Areas", detail: "Great room extensions, kitchen expansions, open-concept conversions, and family room additions that transform how your home flows and functions." },
  { title: "Garage Additions & Conversions", detail: "Attached or detached garages, workshops, and storage buildings. Also garage-to-living-space conversions for homes that need interior square footage more than parking." },
  { title: "Bonus Rooms & Flex Spaces", detail: "Second-floor additions, attic conversions, and above-garage bonus rooms that maximize your property's footprint without expanding the foundation." },
  { title: "Main-Level Master Suites", detail: "Purpose-built master bedroom and bathroom additions on the main level — one of the most requested additions for WNC homeowners planning to age in place." },
  { title: "Sunrooms & Four-Season Rooms", detail: "Enclosed or semi-enclosed rooms that bring the mountain landscape inside. From screened porches to fully conditioned four-season living spaces." },
];

const designContinuity = [
  { icon: Compass, title: "Architectural Matching", detail: "Rooflines, pitch, overhang proportions, window rhythm, and exterior materials are matched to the existing home — not just approximated. The addition should look like it was part of the original plan." },
  { icon: PenTool, title: "Interior Flow", detail: "The connection between existing space and new space matters as much as the addition itself. We design transitions — hallways, openings, floor level changes — so movement between old and new feels natural." },
  { icon: Layers, title: "Material Continuity", detail: "Matching siding profiles, trim details, roofing materials, and color palettes requires sourcing and sometimes custom fabrication. We don't accept 'close enough' on visible transitions." },
  { icon: Ruler, title: "Proportional Integrity", detail: "An addition that's too large overwhelms the original structure. One that's too small feels like an afterthought. We design to proportions that enhance the home's overall presence." },
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
  { src: proj1, alt: "Room addition on mountain home", label: "Guest Suite Addition — Mountain Residence" },
  { src: proj2, alt: "Expanded living area with metal roof integration", label: "Great Room Expansion — Ridgeline Property" },
  { src: proj3, alt: "Sunroom addition with mountain views", label: "Four-Season Room — Valley Home" },
  { src: proj4, alt: "Garage addition matching existing architecture", label: "Detached Garage — Custom Build" },
];

const faqs = [
  { q: "How much does a home addition typically cost?", a: "Addition costs in Western North Carolina typically range from $150–$350 per square foot depending on complexity, finishes, and site conditions. A simple bump-out may start around $40,000, while a full guest suite or second-story addition can range from $100,000–$300,000+. We provide detailed, line-item pricing during the proposal phase." },
  { q: "How long does an addition project take?", a: "Most residential additions take 3–6 months from permit approval to completion. Simple single-room additions may be faster; complex multi-room or second-story additions may take longer. We provide a detailed timeline during the proposal phase and communicate proactively about progress and any changes." },
  { q: "Will the addition match my existing home?", a: "This is one of our primary focuses. We match rooflines, siding profiles, trim details, window proportions, and exterior materials to ensure the addition looks like it was always part of the home. When exact material matches aren't available, we source the closest alternatives or recommend design approaches that create intentional, attractive transitions." },
  { q: "Do I need to move out during construction?", a: "In most cases, no. We plan construction to minimize disruption to your daily life, including dust barriers, dedicated access routes, and coordinated noisy-work schedules. For major whole-home renovations that affect essential living areas, we'll discuss temporary relocation options during planning." },
  { q: "Can you build on a steep or challenging lot?", a: "Yes. Many WNC properties have challenging terrain — steep slopes, rock outcroppings, limited access, and variable soil conditions. We have experience building on difficult sites and coordinate with structural engineers and excavation specialists as part of our standard process." },
  { q: "Do you handle the architectural design?", a: "We offer design-build services for additions that don't require an independent architect. For more complex or architecturally significant projects, we collaborate with local architects and designers. We can recommend architects we've worked with successfully." },
  { q: "Will an addition increase my home's value?", a: "Well-designed additions typically increase home value — often returning 50–70% of cost at resale, with primary suites and functional living space additions at the higher end. Beyond financial return, a well-executed addition eliminates the need to move and the associated costs and disruption." },
  { q: "How do you handle the connection between old and new construction?", a: "The connection point is the most critical detail in any addition. We tie into existing framing with proper structural connections, match floor levels precisely, integrate rooflines with proper flashing and waterproofing, and ensure the interior transition feels seamless — not like walking through a doorway into a different building." },
];

/* ═══════════════════════════════════════════ */
const HomeAdditions = () => {
  return (
    <>
      <SEOHead
        title="Home Additions | Room Additions, Expansions & Guest Suites in Western NC"
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
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Home Additions</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  More Space.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Same Home.
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed font-body">
                Home additions and expansions for Western North Carolina homeowners who want more room without leaving the home they love. Designed to integrate, built to last.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/request-inspection" className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Addition</span>
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
                The best addition is the one that feels like it was always there — architecturally, structurally, and in the way it changes how you live.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto">
                Highlander builds home additions that integrate seamlessly with your existing home — matching rooflines, materials, proportions, and interior flow so the result feels unified, not bolted on. Every addition we build starts with understanding your home's architecture and ends with a space that elevates the entire property.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ─── WHY HOMEOWNERS PURSUE ADDITIONS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Why Add On</span>
              <h2 className="section-heading mb-4">The Reasons<br className="hidden md:block" /> Homeowners Expand.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {whyAdditions.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EXPANSION TYPES ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Addition Types</span>
              <h2 className="section-heading mb-4">What We Build.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {expansionTypes.map((type, i) => (
                <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{type.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{type.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DESIGN CONTINUITY ─── */}
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
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Thinking about adding on?</h3>
                <p className="text-primary-foreground/50 text-sm font-body">Let's discuss what's possible for your home, your lot, and your goals.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/request-inspection" className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
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

        {/* ─── PLANNING & PERMITTING ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Planning & Permits</span>
                <h2 className="section-heading mb-5">We Handle the<br /> Complexity.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  Home additions involve zoning, structural engineering, permits, inspections, and utility coordination. We manage all of it as part of our standard process — so you focus on the vision while we navigate the logistics.
                </p>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {planningPermitting.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-primary/15 card-lift">
                    <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Our Process</span>
              <h2 className="section-heading mb-4">From Vision to<br className="hidden md:block" /> Move-In Ready.</h2>
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

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Featured Additions</span>
              <h2 className="section-heading">Integrated by Design.</h2>
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
                  <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">Start Planning</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Home Has More<br className="hidden md:block" /> to Give.
                  </h2>
                  <p className="text-dark-section-foreground/45 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    Whether it's a guest suite, a main-level master, or a room you haven't even named yet — let's talk about what your home could become.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link to="/request-inspection" className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Schedule a Project Consultation</span>
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
                      { icon: Star, text: "Design-Build Capable" },
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

export default HomeAdditions;
