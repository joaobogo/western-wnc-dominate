import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, Gem, Ruler, Palette, Compass, PenTool,
  ChevronRight, Eye, ClipboardCheck, Hammer,
  BadgeCheck, Layers, Mountain, Sparkles
} from "lucide-react";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import heroImg from "@/assets/gallery/cedar-005.jpg";
import cedar001 from "@/assets/gallery/cedar-001.jpg";
import cedar002 from "@/assets/gallery/cedar-002.jpg";
import metal009 from "@/assets/gallery/metal-010.jpg";
import metal010 from "@/assets/gallery/metal-010.jpg";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const complexRooflines = [
  { title: "Multi-Gable & Cross-Hip Intersections", detail: "Complex rooflines create dozens of valleys, transitions, and flashing points where precision is essential. Each intersection is a potential failure point if not executed with exact geometry and proper waterproofing sequence." },
  { title: "Steep-Slope & High-Pitch Applications", detail: "Mountain homes often feature dramatic pitches that require specialized safety systems, staging techniques, and material handling. The visual impact of steep slopes makes every line, every course, and every detail visible." },
  { title: "Curved, Turret, & Conical Rooflines", detail: "Turret roofs, eyebrow dormers, and curved transitions require hand-cut materials, custom flashing fabrication, and craftsmen who understand compound geometry — not just standard installation patterns." },
  { title: "Mixed-Material Transitions", detail: "Where shingle meets standing seam, where copper meets slate, where flat roof meets steep slope — these transitions define the visual and waterproofing integrity of the entire system." },
];

const premiumMaterials = [
  { title: "Natural Cedar Shake & Shingle", detail: "Hand-split cedar shakes and precision-cut shingles deliver a warmth and texture that no synthetic can replicate. We source premium grades and install with proper ventilation detailing to maximize the 30–40 year lifespan these materials can deliver in mountain conditions." },
  { title: "Design-Oriented Standing Seam Metal", detail: "Custom-fabricated standing seam panels in copper, zinc, galvalume, and painted steel. We work with panels formed on-site to exact measurements — no pre-cut compromises, no exposed fasteners, and clean lines that define your project's aesthetic." },
  { title: "Synthetic Slate & Designer Shingles", detail: "For homes where the slate aesthetic matters but weight or budget constraints apply, we install premium synthetic slate and designer-class dimensional shingles that deliver genuine visual presence." },
  { title: "Copper Accents & Custom Metal Work", detail: "Copper ridge caps, finials, custom chimney shrouds, and decorative flashings add the kind of hand-crafted detail that separates exceptional roofing from standard installation. We fabricate in-house." },
];

const detailExecution = [
  { icon: PenTool, title: "Custom Flashing Fabrication", detail: "Every specialty roof requires custom-fabricated flashing — step flashing profiles, counter-flashing receivers, cricket assemblies, and transition details designed for the specific geometry of your roof." },
  { icon: Ruler, title: "Precision Layout & Coursing", detail: "On steep, visible rooflines, shingle coursing and panel alignment are immediately apparent. We lay out every course with string lines and laser reference to ensure visually perfect alignment across the entire plane." },
  { icon: Compass, title: "Valley & Transition Engineering", detail: "Valleys, hips, and transitions are where roofs succeed or fail. We engineer each transition for both waterproofing performance and visual continuity — because on a specialty roof, both matter equally." },
  { icon: Palette, title: "Color & Material Coordination", detail: "We work with designers, builders, and homeowners to select materials, finishes, and accent metals that complement the home's layout, landscaping, and site context — not just what's available at the supply house." },
];

const whyHigherStandard = [
  "Standard installation methods fail on complex geometry — every cut, every angle, every transition requires custom fitting",
  "Visible rooflines expose every imperfection — misaligned courses, uneven reveals, and inconsistent overhangs are immediately apparent",
  "Premium materials demand premium handling — cedar, copper, and natural slate are unforgiving of careless installation",
  "Warranty coverage requires manufacturer-specified installation — and on specialty systems, those specifications are more exacting",
  "Mistakes on specialty roofs are exponentially more expensive to correct than on standard installations",
];

const galleryImages = [
  { src: cedar001, alt: "Cedar shake roof on a custom mountain home", label: "Cedar Shake — Custom Mountain Residence" },
  { src: cedar002, alt: "Natural cedar shingle detail work", label: "Cedar Shingle — Precision Detail" },
  { src: metal009, alt: "Standing seam metal on a custom mountain home", label: "Standing Seam — Custom Application" },
  { src: metal010, alt: "Metal roof with mountain backdrop", label: "Metal Roof — Mountain Integration" },
];

const processSteps = [
  { number: "01", title: "Design Consultation", description: "We meet with you — and your designer or lead project planner if involved — to understand the vision, review plans, and discuss material options that serve both the aesthetic and the environment." },
  { number: "02", title: "Site & Structure Assessment", description: "We evaluate roof geometry, structural capacity, ventilation requirements, and access logistics. Complex rooflines require detailed planning before a single material is ordered." },
  { number: "03", title: "Material Selection & Sourcing", description: "Premium materials often require advance ordering and specification. We confirm colors, profiles, grades, and quantities — and coordinate delivery timing with the project schedule." },
  { number: "04", title: "Custom Fabrication", description: "Flashing, trim, accent metals, and transition components are fabricated to exact specifications before installation begins. Nothing is improvised on-site." },
  { number: "05", title: "Precision Installation", description: "Our specialty crews install with the care these materials and designs demand — string lines, laser alignment, documented quality checkpoints, and daily progress review." },
  { number: "06", title: "Final Walk-Through", description: "Every detail is reviewed with you. Every transition, every accent, every line — verified for visual perfection and waterproofing integrity before we consider the project complete." },
];

const faqs = [
  { q: "What qualifies as specialty roofing?", a: "Specialty roofing includes any project involving premium or non-standard materials (cedar shake, natural slate, copper, custom metal), complex roof geometry (turrets, eyebrow dormers, steep pitches above 8:12), mixed-material transitions, or visually complex installations where the final look matters as much as weather performance." },
  { q: "How much more does specialty roofing cost compared to standard?", a: "Specialty roofing typically costs 2–4x more than standard dimensional shingle installation, depending on materials, complexity, and custom fabrication requirements. Cedar shake and standing seam metal are in the mid-premium range; copper accents and natural slate are at the higher end. We provide detailed proposals so you know exactly what you're investing in." },
  { q: "Do you work with designers and builders?", a: "Yes. Many of our specialty projects involve coordination with designers, project planners, and general contractors. We're comfortable reading plans, participating in planning discussions, and integrating our scope with the broader construction schedule." },
  { q: "How long does a specialty roofing project take?", a: "Specialty projects typically take longer than standard installations due to custom fabrication, material lead times, and the precision required. A complex cedar shake or standing seam project may take 2–4 weeks depending on size and geometry. We provide a detailed timeline during the proposal phase." },
  { q: "Can you match existing specialty materials for repairs or additions?", a: "In most cases, yes. We source matching cedar grades, metal profiles, and slate to blend seamlessly with existing installations. For older or discontinued materials, we'll source the closest available match and discuss options before proceeding." },
  { q: "Do specialty materials require more maintenance?", a: "Some do. Cedar shake benefits from periodic cleaning and treatment every 3–5 years. Copper develops a natural patina that most homeowners prefer to leave untreated. Standing seam metal is essentially maintenance-free. We'll provide material-specific maintenance guidance as part of your project documentation." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const SpecialtyRoofing = () => {
  return (
    <>
      <SEOHead
        title="Specialty Roofing in WNC | Custom & Designer Systems"
        description="Specialty roofing for custom homes and visually distinctive properties in Western North Carolina. Cedar shake, copper, standing seam metal, and complex roofline expertise."
        path="/roofing/specialty"
        jsonLd={[
          serviceSchema({ name: "Specialty Roofing", description: "Specialty roofing for custom homes and visually distinctive properties across Western North Carolina.", url: "/roofing/specialty" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Specialty", url: "/roofing/specialty" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Specialty cedar roof on a custom home in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.65)] via-[hsl(var(--hero-overlay)/0.35)] to-[hsl(var(--hero-overlay)/0.15)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/roofing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="flex flex-col">
                    <span className="text-[18px] md:text-[20px] font-heading font-bold text-white tracking-[0.1em] uppercase">Highlander</span>
                    <span className="text-[10px] md:text-[11px] font-body font-bold text-[hsl(var(--highland-gold))] uppercase tracking-[0.3em] -mt-1">Specialty Division</span>
                  </div>
                </Link>
                <ChevronRight className="w-3 h-3 text-white/30" />
                <span className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Specialty Roofing</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Where Craft
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Meets Design.
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-body-lg md:text-body-xl text-white/85 max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Specialty roofing for custom homes, visually distinctive properties, and projects where precision and aesthetics matter as much as weather protection. Cedar, copper, standing seam, complex rooflines — built to be seen.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+18285247773" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
              </motion.div>

              {/* Material preview thumbnails — unique to Specialty */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-10 flex gap-2"
              >
                {[cedar001, metal009, cedar002].map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.7 + i * 0.15 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border border-white/15"
                  >
                    <img src={img} alt="Specialty roofing detail" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                  </motion.div>
                ))}
                <Link to="/recent-projects" className="w-16 h-16 md:w-20 md:h-20 rounded-sm border border-white/15 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-[10px] text-primary-foreground/95 font-body text-center leading-tight">View<br/>Portfolio</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── OPENING — Artisan editorial with generous whitespace ─── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container-tight max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <Gem className="w-6 h-6 text-[hsl(var(--highland-gold)/0.85)] mx-auto mb-8" />
              <h2 className="text-2xl md:text-3xl lg:text-[2.75rem] font-heading font-bold text-foreground leading-[1.15] mb-8 text-balance tracking-tight">
                Some roofs are meant to be noticed. They deserve a team that treats every line, every material, and every detail as a reflection of the home itself.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-[1.8] font-body max-w-2xl mx-auto">
                Highlander's specialty roofing work serves homeowners, designers, and builders who demand more than standard installation. Complex rooflines, premium materials, custom metalwork, and the kind of precision that only matters when you care deeply about the outcome.
              </p>
              <div className="flex items-center justify-center gap-2 mt-10">
                <div className="w-1.5 h-1.5 rotate-45 bg-[hsl(var(--highland-gold)/0.3)]" />
                <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.15)]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[hsl(var(--highland-gold)/0.3)]" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── COMPLEX ROOFLINES ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Complex Rooflines</span>
              <h2 className="section-heading mb-4">Built for Geometry<br className="hidden md:block" /> That Demands Precision.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Western North Carolina's custom homes feature some of the most demanding roof geometry in the Southeast. We thrive on the complexity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {complexRooflines.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PREMIUM MATERIALS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Premium Materials</span>
              <h2 className="section-heading mb-4">Materials That Define<br className="hidden md:block" /> Your Project's Aesthetic.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {premiumMaterials.map((mat, i) => (
                <motion.div key={mat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-8 h-8 rounded-sm bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center mb-4">
                    <Gem className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{mat.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{mat.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DESIGN DETAIL ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Detail Execution</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  The Details That Separate<br className="hidden md:block" /> Good From Exceptional.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {detailExecution.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-dark-section-foreground/12 transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
                    <p className="text-dark-section-foreground/95 text-[13px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY HIGHER STANDARD ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Higher Standard</span>
                <h2 className="section-heading mb-5">Why Specialty Roofing<br /> Can't Be Standard Work.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  The gap between standard roofing and specialty work isn't just about better materials — it's about a fundamentally different approach to planning, execution, and quality verification.
                </p>
              </motion.div>

              <div className="lg:col-span-3 space-y-3">
                {whyHigherStandard.map((reason, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3 p-4 bg-card border border-border rounded-sm">
                    <Sparkles className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-[13px] leading-snug font-body">{reason}</span>
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
              <span className="eyebrow mb-3 block">Specialty Portfolio</span>
              <h2 className="section-heading">Craft in Context.</h2>
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
              <span className="eyebrow mb-3 block">Specialty Process</span>
              <h2 className="section-heading mb-4">How a Specialty Project<br className="hidden md:block" /> Comes Together.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">{step.number}</span>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Specialty Roofing FAQs</span>
              <h2 className="section-heading mb-4">Questions About<br className="hidden md:block" /> Premium Roofing Work.</h2>
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
                  <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">Start the Conversation</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Roof Should Be as Considered<br className="hidden md:block" /> as the Home Beneath It.
                  </h2>
                  <p className="text-dark-section-foreground/95 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    If you're building, renovating, or reimagining a home where the roof is part of the design statement — let's talk about what's possible.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Discuss Your Project</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="tel:+18285247773" className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all">
                      <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" /> (828) 524-7773
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
                    {[
                      { icon: Gem, text: "Premium Material Specialists" },
                      { icon: Award, text: "CertainTeed Certified" },
                      { icon: Mountain, text: "WNC Custom Home Experience" },
                      { icon: Star, text: "Detail-Obsessed Crews" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                        <span className="text-dark-section-foreground/90 text-xs font-body font-medium">{item.text}</span>
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

export default SpecialtyRoofing;
