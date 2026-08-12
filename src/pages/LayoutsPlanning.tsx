import { motion } from "framer-motion";
import designHero from "@/assets/design-planning-hero.webp";
import { 
  ArrowRight, Phone, Ruler, Compass, Layers, 
  ClipboardCheck, PenTool, CheckCircle, Search, 
  Lightbulb, HelpCircle, Layout, PlusSquare, 
  Home, Trees, ArrowUpRight, DraftingCompass, 
  FileText, Sparkles, MessageSquare, Map, 
  Mountain, Scale, Zap
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GoldLine from "@/components/motion/GoldLine";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { Link } from "react-router-dom";
import SectionDivider from "@/components/SectionDivider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import blueprintImg from "@/assets/division-design.webp";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const supports = [
  {
    icon: PlusSquare,
    title: "Additions & Extensions",
    desc: "Thinking through footprints, structural ties, and elevation changes before construction begins."
  },
  {
    icon: Home,
    title: "Porches & Decks",
    desc: "Visualizing outdoor flow and ensuring your new space perfectly aligns with your home's character."
  },
  {
    icon: Trees,
    title: "Outdoor Living",
    desc: "Planning multi-phase exterior projects including hardscapes, pergolas, and mountain-grade structures."
  },
  {
    icon: Layout,
    title: "Complex Renovations",
    desc: "Developing a cohesive plan for projects that span across different rooms or exterior sections."
  }
];

const guidancePoints = [
  { title: "Project Design Guidance", desc: "Refining your aesthetic goals with buildable reality." },
  { title: "Layout Planning", desc: "Solving how spaces connect and flow for mountain living." },
  { title: "Floor-Plan Support", desc: "Drafting practical layouts prioritizing structural feasibility." },
  { title: "Scope Definition", desc: "Translating ideas into a buildable list of requirements." },
  { title: "Early Site Planning", desc: "Identifying terrain and permitting hurdles early." },
  { title: "Structural Feasibility", desc: "Determining what is viable for your specific property." }
];

const LayoutsPlanning = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Design | Layouts & Preconstruction Support WNC"
        description="Professional layout support and project planning for Western North Carolina construction. Additions, porches, and outdoor living planned with intention."
        path="/layouts-planning"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Design", url: "/layouts-planning" }
        ])}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Design & Planning", url: "/construction/design-planning" }]} />
      
      <main id="main-content">
        {/* 1. Hero — Refined */}
        <section className="relative pt-32 pb-24 md:pt-56 md:pb-40 bg-primary overflow-hidden">
          {/* Blueprint background image — mountain-home construction drawings */}
          <img width={1600} height={1067} decoding="async" loading="lazy"
            src={designHero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none select-none"
          />
          {/* Readability gradient — darker at left where text sits */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/70 pointer-events-none" />

          {/* Subtle Tartan Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />

          {/* Blueprint-style grid lines overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />

          <div className="container-tight relative z-10">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -16 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: HIGHLAND_EASE }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-10 h-[1px] bg-[hsl(var(--highland-gold))]" />
                <span className="text-[11px] font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))]">Pre-Construction & Design Support</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.1, ease: HIGHLAND_EASE }}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-[0.95] tracking-tightest"
              >
                Measure Twice. <br />
                <span className="text-[hsl(var(--gold-ink))] italic font-medium">Build Once.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.2, ease: HIGHLAND_EASE }}
                className="text-xl md:text-2xl text-white/85 mb-12 max-w-2xl leading-relaxed font-body font-light"
              >
                The foundational step for every successful build. Our Design branch provides the technical bridge between a vision and a buildable reality—mapping every detail before construction begins.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.3, ease: HIGHLAND_EASE }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Link to="/design-intake?mode=long" className="cta-gradient text-accent-foreground font-bold px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 group transition-all duration-300">
                  <FileText className="w-5 h-5" /> Start Detailed Planning Brief
                </Link>
                <Link to="/design-intake?mode=short" className="bg-white/5 border border-white/10 text-white font-bold px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                  <Sparkles className="w-5 h-5" /> Quick Planning Inquiry
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Floating Element: Drafting Compass Icon */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -right-20 w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none hidden xl:block"
          />
        </section>

        {/* 2. The Planning Gap — Value Proposition */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal variant="slide-right">
                <div className="relative">
                  <div className="aspect-[4/5] relative z-10 overflow-hidden border border-border">
                    <img width={1600} height={1067} loading="lazy" decoding="async" src={blueprintImg} alt="Technical drafting and planning" className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                  </div>
                  {/* Tartan Accent Box */}
                  <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary z-0 p-1">
                    <div className="w-full h-full border border-white/10 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "100px auto" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <DraftingCompass className="w-12 h-12 text-[hsl(var(--gold-ink))]" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade" delay={0.2}>
                <GoldLine width="4rem" className="mb-8" />
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight tracking-tight">
                  Bridging the gap between <br />
                  <span className="italic text-primary font-medium">Idea and Implementation.</span>
                </h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-body">
                  <p>
                    Most mountain projects fail not in the building, but in the planning. Terrain challenges, structural integration, and multi-phase complexity require a disciplined first step.
                  </p>
                  <p>
                    Highlander provides professional layout planning and design guidance that respects both your aesthetic goals and the technical realities of Western North Carolina building codes and mountain landscapes.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-12">
                  <div>
                    <h4 className="text-2xl font-heading font-bold mb-2">35+</h4>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">Years Construction Experience</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-heading font-bold mb-2">100%</h4>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">Technical Feasibility Check</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3. Service Pillar: The Triage — Short vs Long */}
        <section className="py-24 md:py-32 bg-secondary/30 relative">
          {/* Subtle Tartan Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "320px auto" }} />
          
          <div className="container-tight">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="eyebrow mb-4 block">Project Intake</span>
              <h2 className="section-heading mb-6">Which path is right for you?</h2>
              <p className="text-muted-foreground font-body">We offer two levels of engagement for the Design branch, depending on how far along your project is.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Short Path */}
              <ScrollReveal variant="rise">
                <div className="bg-card border border-border p-10 h-full flex flex-col hover:border-primary/20 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] -translate-x-12 -translate-y-12 rotate-45" />
                  
                  <div className="mb-8">
                    <div className="w-14 h-14 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                      <Sparkles className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-4">Quick Planning Inquiry</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      For those with a simple idea who want to know if their project is a fit for Highlander. A low-friction first step to start the technical conversation.
                    </p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {[
                      "Fast 10-minute form",
                      "Conceptual feedback",
                      "High-level feasibility check",
                      "Direct follow-up call"
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3 text-xs font-medium font-body text-foreground/80">
                        <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link to="/design-intake?mode=short" className="inline-flex items-center justify-center gap-2 w-full py-4 border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300">
                    Send Quick Inquiry <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Long Path */}
              <ScrollReveal variant="rise" delay={0.1}>
                <div className="bg-primary border border-primary p-10 h-full flex flex-col shadow-xl group relative overflow-hidden text-white">
                  {/* Tartan subtle overlay in dark card */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
                  
                  <div className="relative z-10">
                    <div className="mb-8">
                      <div className="w-14 h-14 bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                        <FileText className="w-7 h-7 text-[hsl(var(--gold-ink))]" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4">Detailed Planning Brief</h3>
                      <p className="text-white/85 font-body text-sm leading-relaxed">
                        For major additions, complex outdoor living, or multi-phase renovations. A comprehensive dive into your goals, constraints, and specific layout needs.
                      </p>
                    </div>

                    <ul className="space-y-4 mb-10 flex-grow">
                      {[
                        "Full scope documentation",
                        "Layout & flow assessment",
                        "Structural tie-in analysis",
                        "Materiality & aesthetic goals",
                        "Detailed project roadmap"
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-xs font-medium font-body text-white/95">
                          <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link to="/design-intake?mode=long" className="inline-flex items-center justify-center gap-2 w-full py-4 cta-gradient text-accent-foreground font-bold hover:opacity-90 transition-all duration-300">
                      Send Detailed Brief <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 4. Core Capabilities — Visual Grid */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <ScrollReveal variant="fade">
                <span className="eyebrow mb-4 block">Scope of Work</span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-10 leading-tight">
                  Where we provide <br />
                  <span className="text-primary">Technical Guidance.</span>
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                  {guidancePoints.map((point) => (
                    <div key={point.title} className="group">
                      <div className="flex items-center gap-3 mb-3 border-b border-border pb-3 group-hover:border-[hsl(var(--highland-gold)/0.4)] transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />
                        <h4 className="font-heading font-bold text-lg">{point.title}</h4>
                      </div>
                      <p className="text-[14px] text-muted-foreground leading-relaxed font-body">{point.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="rise-subtle" delay={0.2} className="lg:sticky lg:top-32">
                <div className="bg-card border border-border p-12 relative">
                  <div className="absolute top-0 right-0 w-full h-1 bg-[hsl(var(--highland-gold))]" />

                  <h3 className="text-2xl font-heading font-bold mb-8">Highlander Process Logic</h3>
                  <div className="space-y-12">
                    {[
                      { icon: MessageSquare, title: "Intent & Vision", desc: "We document exactly what the space needs to achieve for your lifestyle." },
                      { icon: Scale, title: "Feasibility Review", desc: "Our construction leads evaluate structural requirements and mountain terrain constraints." },
                      { icon: Map, title: "Layout Definition", desc: "We draft conceptual floor plans that bridge current home footprint with new additions." },
                      { icon: Zap, title: "Final Build Scope", desc: "Your project plan is finalized into a buildable technical document for our construction crews." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 relative group">
                        {i < 3 && <div className="absolute top-10 left-[1.125rem] bottom-[-2.5rem] w-px bg-border group-hover:bg-[hsl(var(--highland-gold)/0.3)] transition-colors" />}
                        <div className="w-9 h-9 rounded-none bg-primary text-white flex items-center justify-center flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform">
                          <step.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-[16px] mb-1">{step.title}</h4>
                          <p className="text-[13px] text-muted-foreground font-body leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 5. Mountain-Grade Planning — Local Expertise */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          {/* Subtle Tartan Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          
          <div className="container-tight relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal variant="fade">
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm">
                  <Mountain className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Built for the Blue Ridge</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-10 leading-[1.1]">
                  Planning for the <span className="text-[hsl(var(--gold-ink))]">Unique Physics</span> of the Mountains.
                </h2>
                <p className="text-xl text-white/85 mb-12 font-body max-w-3xl mx-auto leading-relaxed">
                  Western North Carolina isn't flat. We plan for soil types, slope stability, heavy snow loads, and extreme temperature swings. A plan from a flat-land designer won't work here. A Highlander plan will.
                </p>
                <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300">
                  Discuss Your Mountain Project <ArrowRight className="w-5 h-5" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <div className="text-center mb-16">
              <span className="eyebrow mb-3 block">Questions</span>
              <h2 className="section-heading">Planning Support FAQs</h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "What is included in design & planning support?",
                  a: "Our support includes layout visualization, floor plan thinking, and detailed scope development. We help bridge the gap between your vision and a buildable reality, ensuring all technical and functional requirements are documented."
                },
                {
                  q: "Do I need drawings or plans already?",
                  a: "No. While we can work from existing sketches, our team is here to help you develop the initial plan and layout. We specialize in taking projects from concept through to a refined scope of work."
                },
                {
                  q: "Can Highlander help with layouts and floor plans?",
                  a: "Yes. Layout and floor plan coordination is a core part of this branch. We focus on how spaces flow and how structural additions integrate with your current home's footprint."
                },
                {
                  q: "How does this connect to construction?",
                  a: "This is a pre-construction capability. By defining the scope and layout first, we eliminate surprises during the build. Once the plan is set, it moves directly to our construction division for execution."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-left font-heading font-bold text-lg hover:text-primary transition-colors py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body text-base leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="py-20 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-border" />
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "320px auto" }} />
          
          <div className="container-tight text-center relative z-10">
            <h2 className="text-3xl font-heading font-bold mb-8">Ready to define your project?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/design-intake?mode=long" className="text-sm font-bold flex items-center gap-2 text-primary hover:text-primary/70 transition-colors">
                Detailed Brief <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="w-1.5 h-1.5 rounded-full bg-border hidden sm:block" />
              <Link to="/design-intake?mode=short" className="text-sm font-bold flex items-center gap-2 text-primary hover:text-primary/70 transition-colors">
                Quick Inquiry <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="w-1.5 h-1.5 rounded-full bg-border hidden sm:block" />
              <a href="tel:+18285247773" className="text-sm font-bold flex items-center gap-2 text-primary hover:text-primary/70 transition-colors">
                Call the Office <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default LayoutsPlanning;
