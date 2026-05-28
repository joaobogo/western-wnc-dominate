import { motion } from "framer-motion";
import { 
  ArrowRight, Phone, Ruler, Compass, Layers, 
  ClipboardCheck, PenTool, Mountain, Shield, 
  MapPin, CheckCircle, Search, Lightbulb
} from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GoldLine from "@/components/motion/GoldLine";
import { ScrollReveal } from "@/components/motion";
import { Link } from "react-router-dom";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1];

const capabilities = [
  {
    icon: Compass,
    title: "Scope Development",
    desc: "Transforming vague ideas into a defined, buildable scope of work that aligns with your budget and property constraints."
  },
  {
    icon: PenTool,
    title: "Layout Coordination",
    desc: "Optimizing how your home flows. We help visualize how additions or interior changes interact with your existing structure."
  },
  {
    icon: Ruler,
    title: "Floor Plan Support",
    desc: "Practical floor plan thinking that prioritizes structural integrity and mountain-grade building science from the start."
  },
  {
    icon: ClipboardCheck,
    title: "Preconstruction Thinking",
    desc: "Meticulous planning that identifies terrain, utility, and permitting hurdles before they become construction delays."
  }
];

const LayoutsPlanning = () => {
  return (
    <>
      <SEOHead 
        title="Layouts & Planning | Preconstruction Support in WNC"
        description="Intelligent planning and layout support for Western North Carolina homeowners. High-detail preconstruction thinking to strengthen your build."
        path="/layouts-planning"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Layouts & Planning", url: "/layouts-planning" }
        ])}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-primary overflow-hidden tartan-dark">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto" }} />
          <div className="container-tight relative z-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-9 h-9 rounded-none bg-[hsl(var(--highland-gold)/0.15)] flex items-center justify-center border border-[hsl(var(--highland-gold)/0.2)]">
                  <Compass className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                </div>
                <span className="text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold))]">Supporting Branch</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight tracking-tight"
              >
                Think Thoroughly.<br />
                <span className="text-[hsl(var(--highland-gold))]">Build Decisively.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white/50 mb-10 max-w-xl leading-relaxed"
              >
                Intelligent planning and layout support that strengthens Highlander’s construction projects. We solve the technical hurdles before the first board is cut.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-none inline-flex items-center justify-center gap-2">
                  Discuss Your Project <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:8283979211" className="bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-none inline-flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> (828) 397-9211
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Positioning Statement */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl text-center">
            <ScrollReveal variant="fade">
              <GoldLine width="3rem" centered className="mb-8" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-balance">
                Layouts & Planning is our specialized preconstruction capability — designed to ensure every Highlander construction project starts with a perfect plan.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                We aren't a standalone design firm. We are builders who believe that the quality of the result is determined by the depth of the plan. This branch provides the intelligence your project needs to succeed in the challenging terrain of Western North Carolina.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {capabilities.map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border p-8 hover:border-[hsl(var(--highland-gold)/0.3)] transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-[hsl(var(--highland-gold)/0.1)] transition-colors">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-[hsl(var(--highland-gold))] transition-colors" />
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Points */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="eyebrow text-[hsl(var(--highland-gold))] mb-4 block">Proven Process</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">Eliminating Construction Surprises.</h2>
                <div className="space-y-6">
                  {[
                    { title: "Terrain Intelligence", detail: "Accounting for slope, rock, and drainage during the layout phase." },
                    { title: "Structural Reality", detail: "Thinking like builders so our plans don't rely on impossible structural assumptions." },
                    { title: "Budget Alignment", detail: "Developing a scope that respects your investment goals from day one." }
                  ].map((point) => (
                    <div key={point.title} className="flex gap-4">
                      <CheckCircle className="w-5 h-5 text-[hsl(var(--highland-gold))] shrink-0 mt-1" />
                      <div>
                        <h4 className="font-heading font-bold text-base mb-1">{point.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{point.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary p-10 md:p-12 text-white tartan-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "200px auto" }} />
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading font-bold mb-4">Start Planning</h3>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    Have a project in mind but not sure about the layout? Talk with our planning team to explore what's possible for your property.
                  </p>
                  <Link to="/consultation" className="cta-gradient text-accent-foreground font-bold px-8 py-3.5 rounded-none inline-flex items-center gap-2 w-full justify-center">
                    Request a Planning Session <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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

export default LayoutsPlanning;
