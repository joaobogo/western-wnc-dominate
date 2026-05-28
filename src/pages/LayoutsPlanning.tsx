import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, Ruler, Compass, Layers, 
  ClipboardCheck, PenTool, CheckCircle, Search, 
  Lightbulb, HelpCircle, Layout, PlusSquare, 
  Home, Trees, ArrowUpRight
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
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

const planningImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000";
const sketchImg = "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&q=80&w=2000";
const scopeImg = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const supports = [
  {
    icon: PlusSquare,
    title: "Additions",
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
    title: "Multi-Phase Home Projects",
    desc: "Developing a cohesive plan for projects that span across different rooms or exterior sections."
  }
];

const guidancePoints = [
  { title: "Project Design Guidance", desc: "Helping you refine your aesthetic and functional goals." },
  { title: "Layout Planning", desc: "Solving how spaces connect and flow for modern mountain living." },
  { title: "Floor-Plan Support", desc: "Drafting practical layouts that prioritize structural feasibility." },
  { title: "Project Scope Definition", desc: "Translating ideas into a documented, buildable list of requirements." },
  { title: "Early Planning", desc: "Identifying terrain and permitting hurdles before they impact your timeline." },
  { title: "Clarifying Possibility", desc: "Determining what is structurally and financially viable for your property." }
];

const processSteps = [
  { step: "01", title: "Discuss the Idea", desc: "We listen to your vision and functional needs for the space." },
  { step: "02", title: "Clarify Layout & Scope", desc: "We refine the project structure, defining exactly what will be built." },
  { step: "03", title: "Review Next Steps", desc: "We present a clear path forward, aligning the plan with construction logic." },
  { step: "04", title: "Move to Construction", desc: "Once finalized, your project moves seamlessly into our build queue." }
];

const audiences = [
  "Homeowners exploring a significant addition",
  "Clients planning complex outdoor living spaces",
  "People who need help organizing a project before building",
  "Clients who have ideas but need help defining the next technical step"
];

const faqs = [
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
    q: "Is this only for larger projects?",
    a: "While most beneficial for additions and multi-phase renovations, our planning support is available for any construction project where a defined plan is critical to success."
  },
  {
    q: "How does this connect to construction?",
    a: "This is a pre-construction capability. By defining the scope and layout first, we eliminate surprises during the build. Once the plan is set, it moves directly to our construction division for execution."
  }
];

const LayoutsPlanning = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Design & Planning | Preconstruction Support in WNC"
        description="Intelligent planning and layout support for Western North Carolina construction projects. Defined plans, documented scope, and mountain-grade building science."
        path="/layouts-planning"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Design & Planning", url: "/layouts-planning" }
        ])}
      />
      <Header />
      
      <main>
        {/* 1. Hero */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-primary overflow-hidden tartan-dark">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 16 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, ease: HIGHLAND_EASE }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-8 h-8 rounded-none bg-[hsl(var(--highland-gold)/0.15)] flex items-center justify-center border border-[hsl(var(--highland-gold)/0.2)]">
                    <Compass className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <span className="text-[10px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Pre-Construction Capability</span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, delay: 0.1, ease: HIGHLAND_EASE }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight"
                >
                  Intelligent <span className="text-[hsl(var(--highland-gold))]">Design & Planning</span>.
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, delay: 0.2, ease: HIGHLAND_EASE }}
                  className="text-lg text-white/50 mb-10 max-w-xl leading-relaxed font-body"
                >
                  Before the first board is cut, we ensure the logic is sound. Supporting Highlander’s construction division with detailed layouts, floor plans, and project planning support.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, delay: 0.3, ease: HIGHLAND_EASE }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/design-intake?mode=long" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform duration-300">
                    Start Your Project Plan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>


                  <a href="tel:8283979211" className="bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                    Talk With Highlander
                  </a>
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: HIGHLAND_EASE }}
                className="relative hidden lg:block"
              >
                <div className="aspect-[4/3] relative">
                  <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4" />
                  <img src={planningImg} alt="Detailed project planning and measured drawings" className="w-full h-full object-cover relative z-10" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-20" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Intro Block: What this is */}
        <section className="section-padding bg-background relative">
          <div className="container-tight max-w-4xl text-center">
            <ScrollReveal variant="fade">
              <GoldLine width="4rem" centered className="mb-8" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-foreground leading-snug">
                We help you think through a project thoroughly before construction begins.
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto font-body">
                <p>
                  At Highlander, we believe the success of a build is determined in the planning phase. Our Design & Planning branch provides the disciplined coordination required for complex mountain construction.
                </p>
                <p>
                  From clarifying your project’s scope to defining layouts and floor plans, we bridge the gap between your initial ideas and a construction-ready blueprint. This ensures your project is structurally sound, functionally optimized, and ready for a predictable build phase.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <SectionDivider variant="diamond" />

        {/* 3. What this supports */}
        <section className="section-padding bg-secondary/50">
          <div className="container-tight">
            <div className="text-center mb-16">
              <span className="eyebrow mb-3 block">Project Capabilities</span>
              <h2 className="section-heading">Core Support Areas</h2>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supports.map((item) => (
                <StaggerItem key={item.title} className="bg-card border border-border p-8 group hover:border-[hsl(var(--highland-gold)/0.3)] transition-all duration-500">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-[hsl(var(--highland-gold)/0.1)] transition-colors">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-[hsl(var(--highland-gold))] transition-colors" />
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-4">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-body">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* 4. What Highlander helps with */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <ScrollReveal variant="slide-left">
                <span className="eyebrow mb-4 block">Our Guidance</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 leading-tight">
                  Solving technical hurdles early.
                </h2>
                <p className="text-muted-foreground mb-10 leading-relaxed font-body">
                  Planning in Western North Carolina requires more than just a drawing. We account for the unique terrain, weather, and structural requirements of the mountains.
                </p>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  {guidancePoints.map((point) => (
                    <div key={point.title} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                        <h4 className="font-heading font-bold text-[15px]">{point.title}</h4>
                      </div>
                      <p className="text-[13px] text-muted-foreground leading-relaxed font-body pl-6">{point.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade" delay={0.2} className="relative">
                <div className="bg-primary/5 border border-border p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--highland-gold)/0.05)] translate-x-16 -translate-y-16 rotate-45" />
                  <h3 className="text-xl font-heading font-bold mb-6">Planning for Permanence</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-body">
                    We help homeowners visualize the potential of their property while ensuring every proposal is grounded in building science and structural integrity.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {["Structural Feasibility", "Terrain-Responsive Layouts", "Aesthetic Cohesion"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highland-gold))]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/consultation" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-[hsl(var(--highland-gold))] transition-colors group">
                    Plan Your Addition or Outdoor Project <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 5. How it connects to construction */}
        <section className="section-padding bg-primary tartan-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581439645268-ad7bb4cfcebb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.03] mix-blend-overlay" />

          <div className="container-tight max-w-4xl text-center relative z-10">
            <ScrollReveal>
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))] mb-6 block">The Build Connection</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
                Designed for <span className="text-[hsl(var(--highland-gold))]">Predictable Build Quality.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed font-body mx-auto max-w-2xl">
                This branch exists to strengthen our construction work. By defining layout, floor plans, and project scope before build scope is finalized, we eliminate the ambiguities that typically cause delays or budget creep. You get a clearer plan, and our build teams get a meticulous roadmap for execution.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* 6. The process */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="text-center mb-16">
              <span className="eyebrow mb-3 block">Predictable Steps</span>
              <h2 className="section-heading">How We Work</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 0.1} variant="rise-subtle" className="relative">
                  <div className="text-[4rem] font-heading font-black text-secondary leading-none absolute -top-8 -left-2 z-0 opacity-50">
                    {step.step}
                  </div>
                  <div className="relative z-10 pt-4">
                    <h3 className="text-xl font-heading font-bold mb-4">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Who this is for */}
        <section className="section-padding bg-secondary/30 relative">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal variant="slide-right">
                <div className="aspect-square bg-card border border-border p-1 md:p-2 rotate-1 relative group">
                  <img src={sketchImg} alt="Initial project layout and floor-plan support" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                </div>
              </ScrollReveal>
              <ScrollReveal variant="slide-left" delay={0.2}>
                <h2 className="text-3xl font-heading font-bold mb-8">Supporting Your Vision.</h2>
                <ul className="space-y-6">
                  {audiences.map((audience, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium font-body">{audience}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-3xl">
            <div className="text-center mb-16">
              <HelpCircle className="w-10 h-10 text-[hsl(var(--highland-gold)/0.3)] mx-auto mb-4" />
              <h2 className="section-heading">Common Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-heading font-bold py-6 hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 font-body">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 9. Final CTA */}
        <section className="section-padding bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "320px auto" }} />
          <div className="container-tight max-w-4xl text-center relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                Ready to Organize <br />
                <span className="text-[hsl(var(--highland-gold))]">Your Next Step?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto font-body">
                Whether you're starting a master suite addition or a multi-phase outdoor living project, let's clarify the layout and scope first.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/design-intake?mode=long" className="cta-gradient text-accent-foreground font-bold px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 group hover:scale-[1.02] transition-transform duration-300 shadow-lg">
                  Start Your Project Plan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a href="tel:8283979211" className="bg-white border border-border text-foreground font-bold px-10 py-5 rounded-none inline-flex items-center justify-center gap-3 hover:bg-muted transition-colors">
                  <Phone className="w-5 h-5" /> (828) 397-9211
                </a>
              </div>
              <p className="mt-8 text-[11px] font-body font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                Supporting Western North Carolina Homeowners
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default LayoutsPlanning;
