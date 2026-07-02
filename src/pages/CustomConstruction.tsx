import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Star, Home,
  ChevronRight, Eye, Ruler, Hammer, Users,
  Mountain, CalendarCheck, Sparkles, Compass,
  PenTool, ClipboardCheck, Layers, MessageSquare,
  CheckCircle, Award, Gem, Lock, FileCheck
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ConstructionClosingCTA } from "@/components/construction/ConstructionShared";

const heroImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000";
const specialtyContextImg = "https://images.unsplash.com/photo-1518005020251-58296d87ba60?auto=format&fit=crop&q=80&w=1000";
const detailOversightImg = "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1000";
const complexityImg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000";

import proj1 from "@/assets/gallery/metal-003.webp";
import proj2 from "@/assets/gallery/asphalt-002.jpg";
import proj3 from "@/assets/gallery/cedar-002.jpg";
import proj4 from "@/assets/gallery/metal-010.jpg";

/* ═══════════════════════════════════════════ DATA ═══════════════════════════════════════════ */

const complexProjects = [
  { icon: Gem, title: "Multi-Phase Renovations", detail: "Large-scale projects that must be executed in sequences — with the homeowner living in the home. Requires detailed phasing, temporary systems, and continuous communication about what's happening and when." },
  { icon: Layers, title: "Structural Modifications", detail: "Removing load-bearing walls, altering roof structures, reinforcing foundations, and creating large openings. Work where engineering, sequencing, and temporary shoring are critical to safety." },
  { icon: Award, title: "Visually Significant Homes", detail: "Homes with distinctive character — Arts & Crafts, mid-century, mountain lodge, or contemporary — where modifications must honor the original design language while meeting modern performance standards." },
  { icon: Lock, title: "High-Coordination Builds", detail: "Projects involving multiple specialty trades, custom fabrication, imported materials, or tight timelines where precise scheduling and proactive problem-solving prevent costly delays." },
];

const customPlanning = [
  { icon: Compass, title: "Discovery & Vision Alignment", detail: "We start by understanding what you're trying to achieve — functionally, aesthetically, and emotionally. Custom projects require more listening and more questions before the first line is drawn." },
  { icon: PenTool, title: "Conceptual Design & Feasibility", detail: "We develop conceptual approaches, evaluate structural feasibility, and identify constraints early — before you've invested in detailed plans for something that can't be built." },
  { icon: ClipboardCheck, title: "Detailed Scope & Specification", detail: "Every material, finish, dimension, and detail is specified in writing. Custom work can't rely on 'standard' — every element must be explicitly defined and agreed upon." },
  { icon: Ruler, title: "Engineering & Coordination", detail: "Structural engineering, trade coordination, permitting, and supplier management are all handled within our project management framework. You manage the vision; we manage the logistics." },
];

const structuralDesign = [
  { title: "Design Sensitivity", detail: "Custom projects often involve existing homes with design character worth preserving. We evaluate rooflines, material languages, proportions, and period details before proposing changes — ensuring new work respects and enhances the original intent." },
  { title: "Structural Complexity", detail: "Load paths, cantilevers, large openings, unusual spans, and connections to existing structures all require engineering attention. We coordinate with structural engineers as a standard part of custom project delivery." },
  { title: "Material Integration", detail: "When custom work meets existing construction, the interface must be invisible. We source matching materials, fabricate custom trim profiles when needed, and obsess over transition details that most contractors treat as afterthoughts." },
  { title: "Building Science", detail: "Vapor barriers, thermal bridging, moisture management, and ventilation design become more critical as projects become more complex. We design building envelope systems that perform — not just assemblies that pass inspection." },
];

const communicationOversight = [
  { icon: MessageSquare, title: "Single Point of Contact", detail: "Every custom project has a dedicated project manager who knows every detail of your scope, schedule, and preferences. You never have to re-explain your project to a new person." },
  { icon: Eye, title: "Daily Quality Verification", detail: "Our project managers verify work quality at the end of each day — checking dimensions, material installation, and finish quality against specifications before crews move to the next phase." },
  { icon: ClipboardCheck, title: "Proactive Issue Communication", detail: "When we discover something unexpected — and on custom projects, we always do — you're informed immediately with options, cost implications, and our recommendation. No surprises at walk-through." },
  { icon: CheckCircle, title: "Documented Progress", detail: "Regular photo updates, milestone confirmations, and written status reports keep you informed whether you're on-site daily or checking in from a distance." },
];

const processSteps = [
  { number: "01", icon: Phone, title: "Initial Conversation", description: "We discuss your vision, goals, property, and timeline. This conversation determines whether Highlander is the right fit for your project — and whether your project is the right fit for our team." },
  { number: "02", icon: Eye, title: "Site Assessment & Feasibility", description: "Detailed evaluation of existing conditions, structural capacity, site constraints, and design opportunities. We identify what's possible before you invest in detailed plans." },
  { number: "03", icon: PenTool, title: "Design Development", description: "Conceptual design, material selection, engineering coordination, and detailed scope documentation. Every element defined, specified, and priced." },
  { number: "04", icon: CalendarCheck, title: "Pre-Construction Planning", description: "Permitting, material procurement, trade scheduling, and project timeline finalization. Every detail confirmed before mobilization." },
  { number: "05", icon: Hammer, title: "Precision Execution", description: "Construction with daily oversight, quality checkpoints, and continuous communication. Custom work demands custom attention — and our supervision reflects that." },
  { number: "06", icon: Sparkles, title: "Completion & Documentation", description: "Final walk-through, punch list resolution, warranty documentation, and maintenance guidance. Your custom project, delivered to the standard it deserves." },
];

const galleryImages = [
  { src: proj1, alt: "Custom construction project with metal roofing", label: "Custom Exterior Build", location: "Mountain Modern, Asheville" },
  { src: proj2, alt: "Visually sensitive renovation", label: "Structural Renovation", location: "Heritage Home, Franklin" },
  { src: proj3, alt: "Complex addition with cedar integration", label: "Multi-Phase Addition", location: "Cedar & Stone, Sylva" },
  { src: proj4, alt: "High-coordination specialty build", label: "Specialty Build", location: "Custom Timber Frame, Fairview" },
];

const faqs = [
  { q: "What makes a project 'custom' versus standard construction?", a: "Custom projects involve non-standard design requirements, unusual materials, complex structural work, visually sensitive details, or high coordination demands. They require more planning, more communication, and more supervision than standard builds — and they're priced accordingly." },
  { q: "Do you work with designers and project planners?", a: "Yes. For complex or design-forward projects, we collaborate with local designers and planners. We can work from plans you've developed with your design team or participate in the planning process from the beginning. Our design-build capability also handles many projects that don't require external design services." },
  { q: "How do you price custom work?", a: "Custom projects receive detailed, grouped-cost proposals with specified materials, defined scope, and clear inclusions/exclusions. We don't use vague allowances or cost-plus pricing. You know what you're paying for and what you're getting before work begins." },
  { q: "What's the typical timeline for a custom project?", a: "Timelines vary significantly — from 2 months for a focused specialty project to 6–12 months for a major multi-phase renovation. We provide detailed schedules during the proposal phase and update them proactively as the project progresses." },
  { q: "Can you handle projects while I'm living in the home?", a: "Yes — most of our custom projects involve occupied homes. We design phasing plans that maintain livable conditions, install dust barriers and temporary systems, and coordinate disruptive work around your schedule." },
  { q: "How do you handle changes during construction?", a: "Changes are documented with written change orders that include scope description, cost impact, and timeline impact. We discuss options and implications before proceeding. Change management is one of the most important parts of custom project delivery." },
  { q: "Do you take on every project that comes to you?", a: "No. We're selective about the custom projects we accept. We look for projects where our skills, experience, and approach are genuinely the right fit — and where the scope, timeline, and budget are aligned. This selectivity protects our quality and your investment." },
  { q: "What sets Highlander apart on complex projects?", a: "Three things: project management discipline, in-house craft quality, and honest communication. We plan thoroughly, execute with our own trained crews, and communicate proactively — especially when things don't go as planned." },
];

/* ═══════════════════════════════════════════ PAGE ═══════════════════════════════════════════ */

const CustomConstruction = () => {
  return (
    <>
      <SEOHead
        title="Custom Construction in Western NC | Specialty Builds"
        description="Custom construction and specialty projects for visually distinctive Western North Carolina homes. Multi-phase renovations, structural modifications, and high-coordination builds."
        path="/construction/custom"
        jsonLd={[
          serviceSchema({ name: "Custom Construction", description: "Custom and specialty construction projects for Western North Carolina homeowners.", url: "/construction/custom" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Custom Projects", url: "/construction/custom" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Custom construction project in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/construction" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-primary-foreground" /></div>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">Construction</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/90" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Custom & Specialty</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  For Projects That
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
                  <span className="text-[hsl(var(--highland-gold))]">Demand More.</span>
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Multi-phase renovations, structural modifications, and high-coordination projects that demand precision, planning, and craft quality.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-[14px] px-9 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Project Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+18285247773" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
              </motion.div>

              {/* Selectivity indicator — unique to Custom */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="mt-10 p-5 bg-white/5 backdrop-blur-sm border border-[hsl(var(--highland-gold)/0.15)] rounded-sm max-w-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Gem className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  <span className="text-xs uppercase tracking-wider text-primary-foreground/85 font-body font-semibold">By Selection Only</span>
                </div>
                <p className="text-sm text-primary-foreground/85 font-body leading-relaxed">
                  We accept approximately 30% of custom project inquiries. Not every project is the right fit — and that selectivity protects your investment.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── OPENING — Premium minimal with gem accent ─── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container-tight max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <Gem className="w-6 h-6 text-[hsl(var(--highland-gold)/0.85)] mx-auto mb-8" />
              <h2 className="text-2xl md:text-3xl lg:text-[2.75rem] font-heading font-bold text-foreground leading-[1.12] mb-8 text-balance tracking-tight">
                Some projects don't fit categories. They require more planning, more coordination, and more craft. Those are the projects we're built for.
              </h2>
              <p className="text-foreground/70 text-base md:text-lg leading-[1.8] font-body max-w-2xl mx-auto">
                Highlander takes on custom and specialty construction work where our planning discipline, in-house craft quality, and communication standards make a meaningful difference.
              </p>
              <div className="mt-12 relative aspect-[16/7] overflow-hidden border border-border">
                <img src={specialtyContextImg} alt="Specialty construction detail" className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── PROJECT TYPES (dark) ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Project Types</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Projects That Require<br className="hidden md:block" /> a Higher Standard.
                </h2>
                <p className="text-dark-section-foreground/90 text-base font-body max-w-lg mx-auto">
                  Not every contractor can manage these. We build systems specifically for complex, high-stakes work.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {complexProjects.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
                    <p className="text-dark-section-foreground/90 text-[13.5px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CUSTOM PLANNING ─── */}
        <section className="section-padding bg-background/50 relative">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Custom Planning</span>
              <h2 className="section-heading mb-4">Planning Is the<br className="hidden md:block" /> Product.</h2>
              <p className="text-foreground/70 text-base font-body max-w-lg mx-auto leading-relaxed">On custom projects, the quality of the plan determines the quality of the result. We invest heavily in the front end so execution is precise.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {customPlanning.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.25)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{item.title}</h3>
                  <p className="text-foreground/75 text-[13.5px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── STRUCTURAL & DESIGN (asymmetric) ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Structural & Design</span>
                <h2 className="section-heading mb-5">Where Craft<br /> Meets Engineering.</h2>
                <p className="text-foreground/70 text-base font-body mb-6 leading-relaxed">
                  Custom projects live at the intersection of design vision and structural reality. We navigate both — ensuring what's beautiful is also buildable, durable, and code-compliant.
                </p>
                <div className="bg-card border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-5">
                  <h4 className="font-heading font-bold text-foreground text-sm mb-2">Working with a designer?</h4>
                  <p className="text-foreground/60 text-[13px] leading-relaxed font-body mb-3">We collaborate with local designers and project planners regularly. We can work from your plans or recommend firms we've partnered with successfully.</p>
                  <Link to="/consultation" className="group text-sm font-semibold text-[hsl(var(--highland-gold))] inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body">
                    Talk With Our Construction Team <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {structuralDesign.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-8 bg-[hsl(var(--highland-gold)/0.3)] rounded-full mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{item.title}</h3>
                        <p className="text-foreground/75 text-[13.5px] leading-relaxed font-body">{item.detail}</p>
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
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Have a project that needs this level of attention?</h3>
                <p className="text-primary-foreground/85 text-sm font-body">Let's talk about scope, feasibility, and whether Highlander is the right fit.</p>
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

        {/* ─── COMMUNICATION & OVERSIGHT ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Communication</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Built on<br className="hidden md:block" /> Transparency.
                </h2>
                <p className="text-dark-section-foreground/90 text-base font-body max-w-lg mx-auto leading-relaxed">
                  Custom projects fail more often from communication breakdowns than construction defects. Our communication systems are as disciplined as our build quality.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {communicationOversight.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
                    <p className="text-dark-section-foreground/90 text-[13.5px] leading-relaxed font-body">{item.detail}</p>
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
              <h2 className="section-heading mb-4">How Custom Projects<br className="hidden md:block" /> Work With Highlander.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-[hsl(var(--highland-gold)/0.1)] transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <step.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--highland-gold))] transition-colors">{step.title}</h3>
                  <p className="text-foreground/75 text-[13.5px] leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-background/50 relative">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Selected Work</span>
              <h2 className="section-heading mb-3">Precision in Practice.</h2>
              <p className="text-foreground/70 text-base font-body max-w-md mx-auto leading-relaxed">Custom projects where planning discipline, craft quality, and communication made the difference.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
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
              <Link to="/gallery" className="group text-sm font-heading font-semibold text-[hsl(var(--highland-gold))] inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                View Full Project Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Custom Project FAQs</span>
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
        <ConstructionClosingCTA
          headline={"The Right Builder Makes\nAll the Difference."}
          subheadline="If your project demands precision, coordination, and craft quality that goes beyond standard construction — let's talk about whether Highlander is the right team for the job."
          eyebrow="Start the Conversation"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default CustomConstruction;
