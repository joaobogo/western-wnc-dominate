import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ClipboardCheck, PenTool, FileCheck, CheckCircle,
  Layers, Compass, ShieldCheck, MessageSquare, HardHat, Ruler,
 Sparkles, Phone, ChevronRight, FileText, Clock,
  Home, Trees, PlusSquare, DoorOpen,
} from "lucide-react";
import SEOHead, { breadcrumbSchema, faqSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ScrollReveal } from "@/components/motion";
import GoldLine from "@/components/motion/GoldLine";
import { ConstructionClosingCTA, ConstructionMidCTA } from "@/components/construction";
import RelatedLinks from "@/components/RelatedLinks";

/**
 * /construction/design — Design Services for Construction Projects
 *
 * Approved vocabulary only. NEVER use "architect / architectural / free design".
 *
 * NOTE: Public-facing design pricing has been removed per Highlander policy.
 * Pricing is determined by project scope and confirmed during the Design &
 * Consultation Agreement process. Do NOT reintroduce fee ranges, dollar
 * amounts, "starting at", or "typical fee range" copy on this page.
 */

const heroImg = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const DESIGN_PHASES = [
  {
    icon: ClipboardCheck,
    label: "Phase 1",
    title: "Schematic Design",
    forWho: "Homeowners deciding what to build, what direction makes sense, and what level of investment may be realistic.",
    bestFit: "Early-stage additions, remodels, outdoor living projects, and construction ideas that need to become clearer before estimating.",
    deliverables: [
      "Measured existing conditions",
      "Concept floor plans and elevations",
      "3D views",
      "Material direction",
      "Preliminary budget guidance",
    ],
    timeline: "2–3 weeks to concept meeting",
    ctaLabel: "Start With a Design Agreement",
    ctaHref: "/construction-intake",
  },
  {
    icon: PenTool,
    label: "Phase 2",
    title: "Design Development & Permit Set",
    forWho: "Clients who are ready to move toward approval and need more complete drawings for permitting and coordination.",
    bestFit: "Projects with a defined scope that need to move toward jurisdiction review and construction preparation.",
    deliverables: [
      "Fully dimensioned permit-ready drawings",
      "Code and zoning summary",
      "Engineering coordination",
      "Permit submittal support",
    ],
    timeline: "3–4 weeks plus jurisdiction review",
    ctaLabel: "Plan Your Construction Project",
    ctaHref: "/construction-intake",
  },
  {
    icon: FileCheck,
    label: "Phase 3",
    title: "Full Construction Documents",
    forWho: "Clients who want bid-ready documentation or are planning new construction.",
    bestFit: "New construction, larger projects, and clients who need full documentation before final construction pricing.",
    deliverables: [
      "Complete construction set",
      "Full schedules",
      "Specifications",
      "Trade-by-trade scopes of work",
    ],
    timeline: "4–6 weeks",
    ctaLabel: "Talk to Highlander About Your Project",
    ctaHref: "/construction-intake",
  },
];

const whyDesignFirst = [
  "Clarifies what you actually want to build",
  "Helps Highlander understand the existing conditions of your home and site",
  "Creates drawings and 3D views you can react to and refine",
  "Supports honest budget conversations early — before commitments",
  "Moves qualified projects smoothly toward permitting and construction",
  "Gives you deliverables you keep, even if you pause after a phase",
];

const fixedFeeBullets = [
  "Pricing determined by project scope",
  "Clear deliverables for each phase",
  "Defined timeline expectations",
  "Drawings, 3D views, scopes, and permit support — depending on phase",
  "Better information before construction pricing is set",
  "A more professional path from idea to build",
];

const whoStarts = [
  { icon: Home, label: "Home Additions" },
  { icon: HardHat, label: "Garages" },
  { icon: DoorOpen, label: "Guest & In-Law Suites" },
  { icon: Trees, label: "Screened Porches" },
  { icon: PlusSquare, label: "Covered Porches" },
  { icon: Sparkles, label: "Sunrooms" },
  { icon: Layers, label: "Two-Story Additions" },
  { icon: Compass, label: "Outdoor Living Projects" },
  { icon: Ruler, label: "Remodels" },
  { icon: HardHat, label: "New Construction" },
  { icon: FileText, label: "Projects Without Complete Plans" },
  { icon: MessageSquare, label: "Anyone Needing Scope & Budget Clarity" },
];

const faqs = [
  { question: "Why does Highlander charge for design?", answer: "Design produces real deliverables — measured conditions, concept plans, 3D views, permit-ready drawings, and construction documents — and requires serious planning work from our in-house design team. A paid program ensures the work is dedicated to your project and produced to a professional standard." },
  { question: "Can I stop after Phase 1?", answer: "Yes. The phases are sequential and you decide at each step whether to continue. Many remodel and addition clients only need Phases 1 and 2. You keep the deliverables from any phase you complete." },
  { question: "Do I keep the drawings and deliverables?", answer: "Yes. You own the deliverables from any phase you complete, including concept plans, 3D views, permit drawings, and construction documents." },
  { question: "What if I already have plans?", answer: "If your plans are complete and permit-ready, our team can review them and determine whether your project is ready to move toward estimating. If your plans are incomplete or still conceptual, we'll recommend the appropriate design phase to start with." },
  { question: "What does \"permit set\" mean?", answer: "A permit set is a fully dimensioned set of drawings — with the code and zoning details required — that your local jurisdiction can review and approve for construction. It's the deliverable from Phase 2." },
  { question: "How does the design fee credit work?", answer: "Clients who complete design with Highlander and then move forward with Highlander for construction may receive a portion of their design fees as a credit on the final construction invoice at project completion. Final credit details are confirmed in your Design & Consultation Agreement." },
  { question: "Is this required for every construction project?", answer: "No. Smaller, well-defined projects may not need a full design phase. But for additions, major remodels, outdoor living builds, garages, suites, and new construction, a Design & Consultation Agreement is the most reliable starting point." },
  { question: "Can I start if I'm still exploring ideas?", answer: "Absolutely. Early-stage clients are welcome. Phase 1 is specifically designed for homeowners who are still deciding what to build and roughly what it costs." },
  { question: "How long does the design process take?", answer: "Phase 1 is typically 2–3 weeks to a concept meeting. Phase 2 is typically 3–4 weeks plus jurisdiction review. Phase 3 is typically 4–6 weeks. Your design lead provides a project-specific schedule before Phase 1 begins." },
  { question: "Does this apply to roofing projects?", answer: "Roofing-only projects usually do not need the full design program. The Design & Consultation Agreement is for construction scopes — additions, remodels, outdoor living, and new builds — including projects where roofing work ties into a larger construction package." },
];

const ConstructionDesign = () => {
  return (
    <>
      <SEOHead
        title="Design Services for Construction Projects | Highlander WNC"
        description="Highlander's in-house design services for additions, remodels, outdoor living, and new construction in Western North Carolina. Three design phases — scope, permit set, and construction documents — with real budget guidance before you build."
        path="/construction/design"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Construction", url: "/construction" },
            { name: "Design Services", url: "/construction/design" },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[62vh] md:min-h-[74vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img decoding="async" src={heroImg} alt="Design drawings and 3D views for a Western North Carolina construction project" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.88)] via-[hsl(var(--hero-overlay)/0.55)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.6)] to-transparent z-10" />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-16 md:pb-24 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-5 text-white/95 text-[12px] font-body">
                <Link to="/construction" className="hover:text-[hsl(var(--gold-ink))] transition-colors">Construction</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[hsl(var(--gold-ink))]">Design Services</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: HIGHLAND_EASE }}
                className="text-3xl md:text-5xl lg:text-[3.75rem] font-heading font-bold text-white leading-[1.05] tracking-tight mb-7"
              >
                Design Services for Construction Projects in <span className="text-[hsl(var(--gold-ink))]">Western North Carolina.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-[17px] md:text-[20px] text-white/90 max-w-2xl mb-8 leading-relaxed font-body"
              >
                Serious construction projects start with a clear plan. Highlander's in-house design services help homeowners define scope, understand realistic budget ranges, prepare permit-ready drawings, and move confidently toward construction.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <Link
                  to="/construction-intake"
                  className="cta-gradient text-accent-foreground font-heading font-bold text-[15px] px-10 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-95 transition-all uppercase tracking-[0.1em]"
                >
                  Plan Your Construction Project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/design-intake?mode=long"
                  className="bg-white/10 backdrop-blur-sm border border-white/25 text-white font-heading font-bold text-[15px] px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/15 transition-all uppercase tracking-[0.1em]"
                >
                  Start with a Design Agreement <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex items-center gap-3 pt-6 border-t border-white/15"
              >
                <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.6)]" />
                <p className="text-[12px] md:text-[13px] font-body font-bold text-[hsl(var(--gold-ink))] uppercase tracking-[0.18em]">
                  Fixed fees · Defined deliverables · Real budget guidance before you build
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 1: WHY DESIGN COMES FIRST ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
              <ScrollReveal variant="fade">
                <GoldLine width="3rem" className="mb-6" />
                <span className="eyebrow mb-3 block">Why Design Comes First</span>
                <h2 className="section-heading mb-6">An instant quote isn't realistic for serious builds.</h2>
                <div className="space-y-5 text-foreground/80 text-base md:text-lg font-body leading-relaxed">
                  <p>
                    For additions, remodels, outdoor living projects, garages, guest suites, and new construction, an instant quote is rarely realistic. Real budgets — and real timelines — come from real planning.
                  </p>
                  <p>
                    Design helps define the project before pricing and construction decisions are made. Whether you're still exploring ideas or ready to draw a permit set, the design phase meets you where you are.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="rise-subtle" delay={0.15}>
                <ul className="space-y-3">
                  {whyDesignFirst.map((item) => (
                    <li key={item} className="flex items-start gap-3 bg-card border border-border rounded-none p-4 hover:border-[hsl(var(--highland-gold)/0.25)] transition-colors">
                      <CheckCircle className="w-5 h-5 text-[hsl(var(--gold-ink))] mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/85 text-[14.5px] font-body leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-muted-foreground text-[13.5px] italic font-body">
                  Still exploring? You're welcome here. Phase 1 is built for homeowners who are still figuring out what to build and what it might cost.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: THE THREE DESIGN PHASES ─── */}
        <section className="section-padding bg-secondary/40 tartan-bg relative">
          <div className="container-tight">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="eyebrow text-[hsl(var(--gold-ink))] mb-3 block">The Three Design Phases</span>
              <h2 className="section-heading mb-4">A Clear, Sequential Path From Idea to Build.</h2>
              <p className="text-muted-foreground text-base font-body">Each phase has fixed pricing, defined deliverables, and a clear timeline. You decide at each step whether to continue.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {DESIGN_PHASES.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-none p-7 md:p-8 relative overflow-hidden group hover:border-[hsl(var(--highland-gold)/0.35)] card-lift flex flex-col"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.5)] to-transparent" />

                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-[hsl(var(--highland-gold)/0.08)] border border-[hsl(var(--highland-gold)/0.25)] flex items-center justify-center">
                      <p.icon className="w-6 h-6 text-[hsl(var(--gold-ink))]" />
                    </div>
                    <div className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">{p.label}</div>
                  </div>

                  <h3 className="font-heading font-bold text-foreground text-xl md:text-[1.4rem] mb-3 leading-tight">{p.title}</h3>

                  <div className="mb-5">
                    <div className="text-[10px] font-body font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1">Who it's for</div>
                    <p className="text-foreground/80 text-[14px] font-body leading-relaxed">{p.forWho}</p>
                  </div>

                  <div className="mb-5 flex-1">
                    <div className="text-[10px] font-body font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">What you get</div>
                    <ul className="space-y-1.5">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[13.5px] text-foreground/80 font-body">
                          <CheckCircle className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))] mt-0.5 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4 space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-body font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                        <CheckCircle className="w-3 h-3" /> Best fit
                      </div>
                      <p className="text-foreground/80 text-[13px] font-body leading-snug">{p.bestFit}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-body font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                        <Clock className="w-3 h-3" /> Timeline
                      </div>
                      <div className="font-heading font-bold text-foreground text-sm leading-tight">{p.timeline}</div>
                    </div>
                  </div>

                  <Link
                    to={p.ctaHref}
                    className="mt-5 group/cta inline-flex items-center justify-center gap-2 w-full border border-[hsl(var(--highland-gold)/0.45)] bg-transparent text-foreground font-heading font-bold text-[12.5px] px-5 py-3 rounded-none uppercase tracking-[0.12em] hover:bg-[hsl(var(--highland-gold)/0.08)] hover:border-[hsl(var(--highland-gold))] transition-all"
                  >
                    {p.ctaLabel} <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-10 bg-card border-l-2 border-[hsl(var(--highland-gold))] p-5 md:p-6">
              <p className="text-foreground/80 text-[14.5px] font-body leading-relaxed">
                <span className="font-heading font-bold text-foreground">Clients can stop after any phase and keep their deliverables.</span> Phases can also stack when a project needs to move from concept to permitting and construction documentation.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mt-4 bg-secondary/40 border border-border p-5 md:p-6">
              <p className="text-muted-foreground text-[14px] font-body leading-relaxed">
                <span className="font-heading font-bold text-foreground">Pricing is determined by project scope.</span> The appropriate design phase depends on project type, readiness, and existing documentation. Fixed phase pricing and deliverables are reviewed and confirmed during the Design &amp; Consultation Agreement process — after Highlander reviews your project details.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: DESIGN-BUILD ADVANTAGE ─── */}
        <section className="section-dark tartan-dark">
          <div className="section-padding">
            <div className="container-tight max-w-4xl">
              <ScrollReveal variant="fade">
                <div className="text-center mb-10">
                  <span className="eyebrow text-[hsl(var(--gold-ink))] mb-3 block">Design-Build Advantage</span>
                  <h2 className="text-2xl md:text-4xl lg:text-[2.75rem] font-heading font-bold text-dark-section-foreground leading-[1.15] mb-6">
                    Design Fees Can Credit Back When You Build With Highlander.
                  </h2>
                  <div className="max-w-2xl mx-auto space-y-5 text-dark-section-foreground/85 text-base md:text-lg font-body leading-relaxed">
                    <p>
                      Clients who complete design with Highlander and move forward with Highlander for construction may receive a portion of their design fees as a credit on the final construction invoice at project completion.
                    </p>
                    <p className="text-dark-section-foreground/90 text-[14px] italic">
                      Final credit details are confirmed in your Design &amp; Consultation Agreement.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/construction-intake"
                    className="cta-gradient text-accent-foreground font-heading font-bold text-[14px] px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-95 transition-all uppercase tracking-[0.1em]"
                  >
                    Plan Your Construction Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: FIXED FEES & DEFINED DELIVERABLES ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <ScrollReveal variant="fade">
                <span className="eyebrow mb-3 block">How We Structure Design</span>
                <h2 className="section-heading mb-6">No Hourly Guesswork. Clear Phases. Defined Deliverables.</h2>
                <div className="space-y-5 text-foreground/80 text-base font-body leading-relaxed">
                  <p>
                    Highlander's design process uses defined phases and itemized deliverables instead of vague hourly design work. You know exactly what each phase includes before you begin. Fixed phase pricing is confirmed for your specific project during the Design &amp; Consultation Agreement process.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="rise-subtle" delay={0.15}>
                <div className="bg-card border border-border rounded-none p-7 md:p-8 relative">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[hsl(var(--highland-gold))]" />
                  <ul className="space-y-3">
                    {fixedFeeBullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-foreground/85 text-[14.5px] font-body leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] mt-1 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: REAL BUDGET HONESTY EARLY ─── */}
        <section className="section-padding bg-secondary/40">
          <div className="container-tight max-w-3xl text-center">
            <ScrollReveal variant="fade">
              <GoldLine width="3rem" className="mx-auto mb-6" />
              <span className="eyebrow mb-3 block">Real Budget Honesty</span>
              <h2 className="section-heading mb-6">Real Budget Guidance Before You Commit to the Full Build.</h2>
              <div className="space-y-5 text-foreground/80 text-base md:text-lg font-body leading-relaxed">
                <p>
                  Phase 1 includes preliminary budget guidance, giving homeowners a more realistic understanding of the project before committing to larger design phases, permitting, or construction.
                </p>
                <p>
                  This supports Highlander's "no instant quote" discipline for serious construction projects. Instead of guessing at a number, we help you define the project first — then price it honestly.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── SECTION 6: WHO SHOULD START WITH DESIGN ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="eyebrow mb-3 block">Who Should Start With Design</span>
              <h2 className="section-heading mb-4">If Your Project Fits Here, Start With a Design Agreement.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {whoStarts.map((w, i) => (
                <motion.div
                  key={w.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-card border border-border rounded-none p-4 md:p-5 flex flex-col items-start gap-3 hover:border-[hsl(var(--highland-gold)/0.3)] transition-colors"
                >
                  <div className="w-9 h-9 bg-[hsl(var(--highland-gold)/0.08)] border border-[hsl(var(--highland-gold)/0.2)] flex items-center justify-center">
                    <w.icon className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <span className="font-heading font-bold text-foreground text-[13.5px] leading-tight">{w.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: ALREADY HAVE PLANS ─── */}
        <section className="section-padding bg-secondary/40 tartan-bg">
          <div className="container-tight max-w-3xl">
            <ScrollReveal variant="fade">
              <div className="bg-card border border-border rounded-none p-8 md:p-10 relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[hsl(var(--highland-gold))]" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[hsl(var(--highland-gold)/0.1)] border border-[hsl(var(--highland-gold)/0.25)] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <span className="text-[11px] font-body font-bold uppercase tracking-[0.22em] text-[hsl(var(--gold-ink))]">Already Have Plans?</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-5 leading-tight">
                  Send Them Over — We'll Tell You Where Your Project Stands.
                </h2>
                <div className="space-y-4 text-foreground/80 text-base font-body leading-relaxed mb-7">
                  <p>
                    If you already have complete, permit-ready plans, Highlander can review the documents and determine whether your project is ready to move toward estimating.
                  </p>
                  <p>
                    If your plans are incomplete or still conceptual, your project may begin with the appropriate design phase.
                  </p>
                </div>
                <Link
                  to="/design-intake?mode=long"
                  className="cta-gradient text-accent-foreground font-heading font-bold text-[14px] px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-95 transition-all uppercase tracking-[0.1em]"
                >
                  Send Your Plans <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <ConstructionMidCTA
          headline="Ready to define your project the right way?"
          subheadline="Start with a Design & Consultation Agreement and we'll scope, draw, and document the build before construction pricing is set."
          ctaText="Start with a Design Agreement"
        />

        {/* ─── SECTION 8: FAQs ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-3xl">
            <div className="text-center mb-10">
              <span className="eyebrow mb-3 block">Design Services FAQs</span>
              <h2 className="section-heading">Common Questions.</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.question} className="group bg-card border border-border rounded-none p-5 open:border-[hsl(var(--highland-gold)/0.35)] transition-colors">
                  <summary className="font-heading font-bold text-foreground text-base cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{f.question}</span>
                    <ChevronRight className="w-4 h-4 text-[hsl(var(--gold-ink))] group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <p className="text-muted-foreground text-[14.5px] font-body leading-relaxed mt-3">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <div className="section-padding">
            <div className="container-tight max-w-3xl text-center">
              <span className="eyebrow text-[hsl(var(--gold-ink))] mb-4 block">Start the Conversation</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-dark-section-foreground leading-[1.1] mb-6">
                Ready to Plan Your<br className="hidden md:block" /> Construction Project?
              </h2>
              <p className="text-dark-section-foreground/95 text-base md:text-lg font-body leading-relaxed max-w-2xl mx-auto mb-9">
                Tell us what you're considering, whether you already have plans, and how soon you hope to build. Our team will help determine whether your project is ready for estimating — or should begin with a Design &amp; Consultation Agreement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <Link
                  to="/construction-intake"
                  className="cta-gradient text-accent-foreground font-heading font-bold text-[15px] px-10 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-95 transition-all uppercase tracking-[0.1em]"
                >
                  Plan Your Construction Project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/design-intake?mode=long"
                  className="bg-white/10 backdrop-blur-sm border border-white/25 text-dark-section-foreground font-heading font-bold text-[15px] px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/15 transition-all uppercase tracking-[0.1em]"
                >
                  Start with a Design Agreement <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <a href="tel:+18285247773" className="inline-flex items-center gap-2.5 text-dark-section-foreground/95 hover:text-[hsl(var(--gold-ink))] transition-colors font-heading font-bold text-[14px]">
                <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                (828) 524-7773
              </a>
            </div>
          </div>
        </section>
      <RelatedLinks
          eyebrow="Keep Exploring"
          heading="Related pages you may find useful"
          columns={2}
          links={[
            { label: "Construction Division", href: "/construction", description: "Additions, renovations, and full builds" },
            { label: "Outdoor Living Projects", href: "/construction/outdoor-living", description: "Porches, decks, and outdoor rooms" },
            { label: "Construction & Renovation FAQ", href: "/faq", description: "Answers to common planning questions" },
            { label: "Recent Highlander Projects", href: "/recent-projects", description: "See recent construction work" },
            { label: "Request a Project Consultation", href: "/request-inspection", description: "Start with a design conversation" },
            { label: "Contact Highlander", href: "/contact", description: "Reach a project advisor" }
          ]}
        />
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ConstructionDesign;