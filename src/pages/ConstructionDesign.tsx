import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ClipboardCheck, PenTool, FileCheck, CheckCircle,
  Layers, Ruler, Compass, ShieldCheck, MessageSquare, HardHat,
  Sparkles, Phone, ChevronRight,
} from "lucide-react";
import SEOHead, { breadcrumbSchema, faqSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ScrollReveal } from "@/components/motion";
import GoldLine from "@/components/motion/GoldLine";
import { ConstructionClosingCTA, ConstructionMidCTA } from "@/components/construction";

const heroImg = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const phases = [
  {
    icon: ClipboardCheck,
    label: "Phase 1",
    title: "Discovery & Scope",
    detail: "We walk the site, document goals and constraints, and produce a written construction scope. You leave Phase 1 with a clear definition of what the project actually is — before anyone draws a line or quotes a number.",
    deliverables: [
      "On-site review with our design lead",
      "Documented goals, constraints, and priorities",
      "Written scope of work",
      "Preliminary budget range",
    ],
  },
  {
    icon: PenTool,
    label: "Phase 2",
    title: "Plans, 3D Views & Material Direction",
    detail: "Our in-house design team produces layouts, plans, 3D views, and material direction. You see — and refine — the project before it ever becomes a construction proposal.",
    deliverables: [
      "Floor plans and elevations",
      "3D views of the proposed build",
      "Material direction and finish guidance",
      "Revisions until the direction is right",
    ],
  },
  {
    icon: FileCheck,
    label: "Phase 3",
    title: "Permit Set & Construction Documents",
    detail: "Permit-ready drawings and construction documents your crew can actually build from — and your county will actually approve. This is the bridge from design to a firm construction agreement.",
    deliverables: [
      "Permit set drawings",
      "Construction documents for the build crew",
      "Coordination with permitting officials",
      "Final construction scope and pricing",
    ],
  },
];

const whoItsFor = [
  { icon: Layers, title: "Home Additions", detail: "Master suites, garages, sunrooms, two-story expansions, and in-law suites where structural tie-ins and layout flow matter." },
  { icon: Compass, title: "Major Renovations", detail: "Whole-home and multi-room renovations that need a coordinated plan instead of decisions made on the fly." },
  { icon: Ruler, title: "Outdoor Living Builds", detail: "Screened porches, covered decks, outdoor kitchens, and multi-phase outdoor spaces that need real planning for slope and weather." },
  { icon: HardHat, title: "Custom & New Construction", detail: "Ground-up mountain builds and complex custom projects where a proper design phase prevents expensive mistakes." },
];

const whyPaid = [
  { icon: ShieldCheck, title: "Real time, real deliverables", detail: "A paid design phase means our team is dedicated to your project — producing real drawings, real 3D views, and real construction documents, not napkin sketches." },
  { icon: MessageSquare, title: "No vague estimates", detail: "By the end of Phase 3, you know exactly what is being built. Construction pricing is based on a defined scope, not guesses." },
  { icon: Sparkles, title: "Design-build advantage", detail: "A portion of design fees can credit toward your construction agreement when you build with Highlander. Planning becomes part of the build, not extra cost." },
];

const faqs = [
  { question: "Is the Design & Consultation Agreement free?", answer: "No. It is a paid, three-phase planning program. We invest real design time, on-site review, drawings, 3D views, and construction documents — and we price that work transparently before you commit." },
  { question: "What do I get for the design fee?", answer: "A documented scope of work, layouts and plans, 3D views, material direction, and (in Phase 3) a permit set and construction documents your county and our build crews can actually use." },
  { question: "Can I use the plans with another builder?", answer: "Yes. You own the deliverables from your design phases. We design them so any qualified builder could use them — but the design-build advantage applies only when Highlander builds the project." },
  { question: "How does the credit toward construction work?", answer: "When you move forward with Highlander as your builder, a portion of your design fees can credit toward your construction agreement. Specific amounts are confirmed in writing in your Design & Consultation Agreement." },
  { question: "Do I have to commit to all three phases up front?", answer: "No. The phases are designed to be sequential — you decide at each step whether to continue. Many projects only need Phase 1 and Phase 2; others need the full permit set in Phase 3." },
  { question: "Is your design lead a licensed professional?", answer: "Our in-house design lead and design team produce layouts, plans, 3D views, and construction documents for Highlander projects. Where a project legally requires a licensed design professional or engineer, we coordinate with the appropriate licensed partner." },
  { question: "How long does the design process take?", answer: "Phase 1 typically takes 1–3 weeks. Phase 2 usually runs 3–8 weeks depending on revisions. Phase 3 timing depends on scope and county permitting. Your design lead provides a project-specific schedule before Phase 1 begins." },
];

const ConstructionDesign = () => {
  return (
    <>
      <SEOHead
        title="Design & Consultation Agreement | Highlander Construction"
        description="Highlander's paid three-phase design program for additions, renovations, and custom builds in Western North Carolina. Scope, plans, 3D views, and a permit set — before construction begins."
        path="/construction/design"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Construction", url: "/construction" },
            { name: "Design & Consultation", url: "/construction/design" },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Header />
      <main>
        {/* HERO */}
        <section className="relative min-h-[60vh] md:min-h-[72vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Construction plans and 3D views for a Western North Carolina home build" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.85)] via-[hsl(var(--hero-overlay)/0.55)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.6)] to-transparent z-10" />
          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-16 md:pb-24 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-5 text-white/85 text-[12px] font-body">
                <Link to="/construction" className="hover:text-[hsl(var(--highland-gold))] transition-colors">Construction</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[hsl(var(--highland-gold))]">Design & Consultation Agreement</span>
              </div>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: HIGHLAND_EASE }} className="text-4xl md:text-5xl lg:text-[4.25rem] font-heading font-bold text-white leading-[1.02] tracking-tight mb-3">
                Plan the build before
              </motion.h1>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: HIGHLAND_EASE }} className="text-4xl md:text-5xl lg:text-[4.25rem] font-heading font-bold leading-[1.02] tracking-tight mb-7">
                <span className="text-[hsl(var(--highland-gold))]">you price the build.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-[17px] md:text-[20px] text-white/90 max-w-2xl mb-9 leading-relaxed font-body">
                Our Design &amp; Consultation Agreement is a paid, three-phase planning program for serious additions, renovations, outdoor living projects, and custom builds. Scope. Plans &amp; 3D views. A permit set. Then a real construction agreement — not a guess.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-col sm:flex-row gap-3">
                <Link to="/design-intake?mode=long" className="cta-gradient text-accent-foreground font-heading font-bold text-[15px] px-10 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-95 transition-all uppercase tracking-[0.1em]">
                  Start with a Design Agreement <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+18285247773" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/15 transition-all">
                  <Phone className="w-4 h-4 text-[hsl(var(--highland-gold))]" /> (828) 524-7773
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OPENING */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-3xl text-center">
            <ScrollReveal variant="fade">
              <GoldLine width="3rem" className="mx-auto mb-7" />
              <h2 className="text-2xl md:text-3xl lg:text-[2.25rem] font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                The reason projects go sideways isn't construction. It's the absence of a real planning phase.
              </h2>
              <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-body">
                Vague scopes become surprise change orders. Napkin sketches become permit delays. Our paid Design &amp; Consultation Agreement exists so that by the time we talk price, the project is defined, drawn, and ready to build.
              </p>
              <GoldLine width="3rem" className="mx-auto mt-7" delay={0.3} />
            </ScrollReveal>
          </div>
        </section>

        {/* THREE PHASES */}
        <section className="section-padding bg-secondary/40 tartan-bg">
          <div className="container-tight">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="eyebrow text-[hsl(var(--highland-gold))] mb-3 block">The Three Phases</span>
              <h2 className="section-heading mb-4">How a Design Agreement Works.</h2>
              <p className="text-foreground/75 text-base font-body">Sequential. Transparent. You decide at each step whether to continue.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
              {phases.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-none p-7 md:p-8 relative overflow-hidden group hover:border-[hsl(var(--highland-gold)/0.3)] card-lift">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.5)] to-transparent" />
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-[hsl(var(--highland-gold)/0.08)] border border-[hsl(var(--highland-gold)/0.25)] flex items-center justify-center">
                      <p.icon className="w-6 h-6 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <div className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">{p.label}</div>
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-xl mb-3 leading-tight">{p.title}</h3>
                  <p className="text-foreground/75 text-[14.5px] font-body leading-relaxed mb-5">{p.detail}</p>
                  <ul className="space-y-2 border-t border-border pt-4">
                    {p.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[13px] text-foreground/70 font-body">
                        <CheckCircle className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))] mt-0.5 flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="eyebrow mb-3 block">Who It's For</span>
              <h2 className="section-heading mb-4">A Smart First Step for Serious Projects.</h2>
              <p className="text-foreground/75 text-base font-body">A Design Agreement is the right starting point any time the build is complex enough that guessing would be expensive.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {whoItsFor.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-card border border-border rounded-none p-6 md:p-7 card-lift hover:border-[hsl(var(--highland-gold)/0.25)]">
                  <div className="w-10 h-10 bg-[hsl(var(--highland-gold)/0.06)] border border-[hsl(var(--highland-gold)/0.15)] flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-foreground/75 text-[14.5px] font-body leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY PAID */}
        <section className="section-dark tartan-dark">
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow text-[hsl(var(--highland-gold))] mb-3 block">Why a Paid Design Phase</span>
                <h2 className="text-2xl md:text-4xl font-heading font-bold text-dark-section-foreground mb-4 leading-tight">Real Planning Is Worth Paying For.</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {whyPaid.map((item) => (
                  <div key={item.title} className="border border-dark-section-foreground/15 p-7 hover:border-[hsl(var(--highland-gold)/0.4)] transition-colors">
                    <div className="w-10 h-10 bg-[hsl(var(--highland-gold)/0.1)] border border-[hsl(var(--highland-gold)/0.3)] flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-lg mb-2">{item.title}</h3>
                    <p className="text-dark-section-foreground/80 text-[14.5px] font-body leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ConstructionMidCTA
          headline="Ready to plan the project properly?"
          subheadline="Start a Design & Consultation Agreement and we'll define the scope before we ever talk construction pricing."
          ctaText="Start with a Design Agreement"
        />

        {/* FAQs */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-3xl">
            <div className="text-center mb-10">
              <span className="eyebrow mb-3 block">Design Agreement FAQs</span>
              <h2 className="section-heading">Common Questions.</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.question} className="group bg-card border border-border rounded-none p-5 open:border-[hsl(var(--highland-gold)/0.3)]">
                  <summary className="font-heading font-bold text-foreground text-base cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{f.question}</span>
                    <ChevronRight className="w-4 h-4 text-[hsl(var(--highland-gold))] group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <p className="text-foreground/75 text-[14.5px] font-body leading-relaxed mt-3">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ConstructionClosingCTA
          headline={"Plan the Build.\nThen Build It Right."}
          subheadline="Tell us about your project. We'll review your goals and walk you through whether a Design & Consultation Agreement is the right starting point."
          ctaText="Plan Your Construction Project"
          eyebrow="Start the Conversation"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ConstructionDesign;