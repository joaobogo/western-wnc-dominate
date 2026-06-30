import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Mountain,
  Home, Layers, Wrench, CloudLightning, Building2, CheckCircle,
  Thermometer, Wind, Droplets, MapPin, FileText, Hammer,
  ChevronRight, TreePine, Zap, Users, Eye, MessageSquare,
  Target, Ruler, ClipboardCheck, Truck, BadgeCheck, HeartHandshake
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";

import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-005.jpg";
import asphaltRoof from "@/assets/gallery/asphalt-hero.webp";
import metalCabin from "@/assets/gallery/metal-006.webp";
import asphaltLarge from "@/assets/gallery/asphalt-006.webp";
import cedarDetail from "@/assets/gallery/cedar-001.jpg";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const roofingServices = [
  {
    icon: Home,
    title: "Residential Roofing",
    slug: "/roofing/residential",
    description: "Complete roof systems for mountain homes — from material selection through final walkthrough. Engineered for your elevation, exposure, and decades of WNC weather.",
    features: ["Full replacements", "New construction", "Re-roofing", "Ventilation design"],
  },
  {
    icon: Wrench,
    title: "Roof Repair",
    slug: "/roofing/roof-repair",
    description: "Targeted, warrantied repairs that stop leaks and prevent escalation. We diagnose accurately, fix permanently, and document everything.",
    features: ["Leak detection", "Flashing repair", "Shingle replacement", "Chimney seals"],
  },
  {
    icon: CloudLightning,
    title: "Storm Damage & Insurance",
    slug: "/roofing/storm-damage",
    description: "Rapid emergency response with full damage documentation, insurance coordination, and priority scheduling — not storm chasing.",
    features: ["Emergency tarping", "Insurance documentation", "Adjuster meetings", "Priority repairs"],
  },
  {
    icon: Building2,
    title: "Commercial Roofing",
    slug: "/roofing/commercial",
    description: "Inspections, maintenance programs, and full-scope solutions for property managers, HOAs, and facility owners across Western NC.",
    features: ["Flat & low-slope systems", "TPO & EPDM", "Maintenance programs", "Multi-property"],
  },
  {
    icon: Layers,
    title: "Metal Roofing",
    slug: "/roofing/metal",
    description: "Standing seam and visually complex metal systems rated for 140mph winds and 50+ years of mountain performance. The premium choice.",
    features: ["Standing seam", "Concealed fastener", "Snow guards", "Custom colors"],
  },
  {
    icon: TreePine,
    title: "Specialty Roofing",
    slug: "/roofing/specialty",
    description: "Cedar shake, slate, copper accents, and custom details for properties that demand distinctive craftsmanship and heritage character.",
    features: ["Cedar shake", "Slate systems", "Copper work", "Historic restoration"],
  },
];

const materials = [
  {
    name: "Dimensional Shingles",
    brand: "CertainTeed Landmark PRO",
    lifespan: "Long service life",
    best: "Most residential projects",
    detail: "Impact-resistant, algae-resistant, and available in 20+ color profiles. Our most-installed product for WNC homes.",
  },
  {
    name: "Standing Seam Metal",
    brand: "Custom-fabricated panels",
    lifespan: "Premium long-term system",
    best: "Premium & mountain estates",
    detail: "Concealed fastener systems rated for 140mph wind uplift. Superior snow shedding, energy efficiency, and zero-maintenance longevity.",
  },
  {
    name: "Cedar Shake",
    brand: "Premium Western Red Cedar",
    lifespan: "30–40 years",
    best: "Estate & heritage homes",
    detail: "Natural insulation, distinctive character, and mountain-appropriate aesthetics. Requires periodic maintenance but ages beautifully.",
  },
  {
    name: "Flat/Low-Slope Systems",
    brand: "TPO, EPDM, Modified Bitumen",
    lifespan: "20–30 years",
    best: "Commercial properties",
    detail: "Single-ply and multi-ply systems for flat and low-slope applications. Energy-reflective options available.",
  },
];

const climateFactors = [
  { icon: Wind, title: "High-Altitude Wind", detail: "Ridge-top homes face sustained gusts that test every fastener and edge detail. We engineer for uplift resistance at elevation." },
  { icon: Droplets, title: "Heavy Rainfall & Snow", detail: "60+ inches of annual rainfall plus significant snow loads require proper drainage, ice shield, and load-rated systems." },
  { icon: Thermometer, title: "Temperature Extremes", detail: "Single-digit winters to 90°F summers — constant expansion and contraction demands materials and methods built for the swing." },
  { icon: Mountain, title: "Steep Terrain Access", detail: "Mountain lots with limited access require logistics planning as careful as the roof work itself. Our crews are equipped for it." },
];

const galleryItems = [
  { image: metalRoof, title: "Standing Seam — Cashiers", category: "Metal" },
  { image: cedarRoof, title: "Cedar Shake — Highlands", category: "Cedar" },
  { image: asphaltRoof, title: "Dimensional Shingles — Franklin", category: "Shingle" },
  { image: metalCabin, title: "Metal + Deck — Bryson City", category: "Metal" },
  { image: asphaltLarge, title: "Full Renovation — Sylva", category: "Shingle" },
  { image: cedarDetail, title: "Cedar Restoration — Highlands", category: "Cedar" },
];

const faqs = [
  { q: "How long does a roof replacement take in WNC?", a: "Most residential replacements are completed in 2–5 days depending on size, complexity, and weather. We provide a clear timeline before work begins and communicate daily throughout the project." },
  { q: "What roofing materials work best for mountain homes?", a: "It depends on your elevation, wind exposure, aesthetic preference, and budget. We typically recommend CertainTeed Landmark PRO dimensional shingles or standing seam metal for WNC homes — both handle high winds, heavy rain, and snow loads exceptionally well." },
  { q: "Do you handle insurance claims for storm damage?", a: "Yes. We provide complete damage documentation with photos and measurements, meet with your adjuster on-site, and coordinate the entire repair or replacement process through your insurance claim." },
  { q: "What does a new roof cost in Western North Carolina?", a: "Replacement pricing is scope-based — every proposal reflects size, material system, pitch complexity, and access conditions. We provide a detailed, grouped-cost proposal after assessing your specific property rather than publishing a generic range." },
  { q: "Are you certified to install specific roofing brands?", a: "Yes. We are CertainTeed Master Shingle Applicator certified — a designation held by fewer than 1% of roofing contractors nationally. This means enhanced warranties and factory-backed installation quality." },
  { q: "Do you offer warranties on your roofing work?", a: "Every project includes both the manufacturer's material warranty and Highlander's labor warranty. You receive a complete warranty package at your final walkthrough — documentation you can hold in your hands." },
  { q: "Can I finance a new roof?", a: "Yes. We offer flexible financing options to make roof replacement accessible. Ask about payment plans during your consultation — there's no obligation and no pressure." },
  { q: "How do I know if I need a repair or full replacement?", a: "We'll assess your roof honestly and explain both options with their pros, cons, and costs. We never recommend a replacement when a repair will solve the problem — and we'll document our reasoning so you can decide with confidence." },
];

const trustSignals = [
  { icon: Award, label: "CertainTeed Master Shingle Applicator", detail: "Top 1% nationally" },
  { icon: Shield, label: "Licensed General Contractor", detail: "State of North Carolina" },
  { icon: FileText, label: "Full Warranty Documentation", detail: "Material + labor coverage" },
  { icon: Clock, label: "Rapid Storm Response", detail: "Emergency priority service" },
];

const processSteps = [
  {
    number: "01",
    title: "Consultation & Assessment",
    icon: Eye,
    description: "We begin with a thorough on-site evaluation — measuring, photographing, and documenting every condition that will inform your proposal. No surprises, no guesswork.",
  },
  {
    number: "02",
    title: "Material Specification",
    icon: Ruler,
    description: "Based on your property's elevation, exposure, layout, and budget, we recommend materials engineered for your specific conditions — not pulled from a generic catalog.",
  },
  {
    number: "03",
    title: "Detailed Proposal & Timeline",
    icon: ClipboardCheck,
    description: "You receive a transparent, grouped-cost proposal with scope, materials, timeline, and warranty details. Everything documented. Everything explained.",
  },
  {
    number: "04",
    title: "Precision Installation",
    icon: Hammer,
    description: "Our certified crews install to manufacturer specification — every fastener pattern, every flashing detail, every ventilation calculation. No shortcuts at any elevation.",
  },
  {
    number: "05",
    title: "Quality Inspection & Walkthrough",
    icon: CheckCircle,
    description: "Before we call a project complete, we conduct a multi-point quality inspection. Then we walk the project with you so you see exactly what was done and why.",
  },
  {
    number: "06",
    title: "Warranty Package Delivery",
    icon: BadgeCheck,
    description: "You receive a physical warranty package — manufacturer and labor coverage, project photos, maintenance recommendations. Documentation you can hold in your hands.",
  },
];

const whyHighlander = [
  {
    icon: Award,
    title: "CertainTeed Master Applicator",
    detail: "Fewer than 1% of roofing contractors hold this designation. It means factory-trained installation, enhanced warranties, and a commitment to quality that's been independently verified.",
  },
  {
    icon: Mountain,
    title: "Built for Mountain Conditions",
    detail: "We don't apply coastal methods at 4,000 feet. Every specification accounts for WNC's unique wind loads, snow accumulation, temperature swings, and terrain challenges.",
  },
  {
    icon: MessageSquare,
    title: "Communication as a Standard",
    detail: "Daily project updates, named project contacts, clear timelines, and a phone that gets answered. Communication isn't a bonus — it's how we operate.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Relationships, Not Transactions",
    detail: "We're not a crew passing through. We live here, we build here, and your roof is our reputation. That reality shapes every decision we make on your property.",
  },
  {
    icon: FileText,
    title: "Documented Everything",
    detail: "Before/after photos, material specifications, inspection checklists, warranty packages. Every project leaves a paper trail that protects you for decades.",
  },
  {
    icon: Users,
    title: "Our In-House Crews",
    detail: "The people on your roof are Highlander employees — trained, certified, and accountable. The same standard on every project.",
  },
];

/* ═══════════════════════════════════════════
   ROOFLINE SVG — designer motif
   ═══════════════════════════════════════════ */
const RooflineSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={className}>
    <motion.path
      d="M0,60 L0,40 L180,10 L360,40 L480,8 L600,40 L720,5 L840,35 L960,12 L1080,38 L1200,6 L1320,32 L1440,15 L1440,60 Z"
      fill="currentColor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    <motion.path
      d="M0,40 L180,10 L360,40 L480,8 L600,40 L720,5 L840,35 L960,12 L1080,38 L1200,6 L1320,32 L1440,15"
      fill="none"
      stroke="hsl(var(--highland-gold))"
      strokeWidth="1"
      strokeOpacity="0.3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, delay: 0.8, ease: "easeOut" }}
    />
  </svg>
);

/* ═══════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════ */
const RoofingDivision = () => {
  return (
    <>
      <SEOHead
        title="Roofing Services in Western NC | Highlander"
        description="Premium roofing in Western North Carolina. Shingle, metal & cedar roofing, storm damage, commercial systems. CertainTeed Master Applicator. Schedule a consultation."
        path="/roofing"
        jsonLd={[
          serviceSchema({ name: "Roofing Services", description: "Expert residential and commercial roofing across Western North Carolina.", url: "/roofing" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main className="md:pt-0">
        {/* ─── HERO ─── */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={metalRoof}
              alt="Premium standing seam metal roof on a mountain estate in Cashiers, NC"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.65)] via-[hsl(var(--hero-overlay)/0.35)] to-[hsl(var(--hero-overlay)/0.1)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.4)] via-transparent to-transparent opacity-80" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-[1] text-background">
            <RooflineSVG className="w-full h-[40px] md:h-[60px]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />

          <motion.div
            className="absolute left-0 top-0 w-[2px] z-20"
            style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }}
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-16 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col gap-6 mb-8"
              >
                <div className="inline-flex items-center gap-4">
                  <div className="h-10 w-px bg-[hsl(var(--highland-gold)/0.5)]" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-heading font-bold text-white tracking-[0.1em]">Highlander</span>
                    <span className="text-[9px] font-body font-bold text-[hsl(var(--highland-gold)/0.8)] uppercase tracking-[0.2em] -mt-1">Roofing Division</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-primary/20 flex items-center justify-center">
                    <Home className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">
                    Authority Since 2017
                  </span>
                </div>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-heading font-bold text-primary-foreground leading-[1.0] tracking-tight"
                >
                  Premium Roofing.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-heading font-bold text-primary-foreground leading-[1.0] tracking-tight"
                >
                  Masterfully <span className="text-[hsl(var(--highland-gold))]">Executed.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="text-[19px] md:text-[22px] text-primary-foreground/90 max-w-2xl mb-12 leading-relaxed font-body font-medium"
              >
                Team-led roofing systems engineered for Western North Carolina's ridgelines. From CertainTeed ShingleMaster-credentialed shingle replacements to premium standing seam metal, we deliver structural security with family-business integrity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  to="/consultation"
                  className="group cta-gradient text-accent-foreground font-semibold text-sm px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Plan Your Roof With Confidence</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+18285247773"
                  className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  (828) 524-7773
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── TRUST STRIP ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-6 md:py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-primary-foreground/8">
              {trustSignals.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center text-center md:px-6"
                >
                  <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold)/0.7)] mb-2" />
                  <span className="text-xs font-heading font-semibold text-primary-foreground/85 mb-0.5">{item.label}</span>
                  <span className="text-[10px] text-primary-foreground/95 font-body">{item.detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TRUST OPENING STATEMENT ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="w-12 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                Your roof is the single most important investment protecting your home, your family, and your mountain way of life.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mb-4">
                Highlander Roofing & Construction has earned the trust of homeowners across
                Highlands, Cashiers, Franklin, Sylva, and the surrounding mountain communities —
                not through advertising, but through the quality of the roofs we've installed and
                the relationships we've built along the way.
              </p>
              <p className="text-muted-foreground/70 text-sm leading-relaxed font-body max-w-2xl mx-auto">
                Every roof we install reflects a commitment to craftsmanship, honest communication,
                and materials specified for the actual conditions your property faces.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ─── ROOFING PHILOSOPHY ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="eyebrow mb-3 block">Our Roofing Philosophy</span>
                <h2 className="section-heading mb-6">
                  We Don't Just Install Roofs.<br className="hidden md:block" />
                  We Engineer Protection.
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">
                    A roof in Western North Carolina faces conditions that most roofing
                    companies never have to consider. Elevation changes everything — wind loads,
                    moisture patterns, temperature differentials, UV exposure, and snow
                    accumulation all behave differently at 3,000 feet than they do in the
                    flatlands.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">
                    That's why every Highlander roofing project begins with a site-specific
                    assessment. We evaluate your property's actual exposure — not just its
                    square footage — and specify materials, ventilation, and installation
                    methods that match the conditions your roof will face over its full
                    service life.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">
                    We believe roofing is a craft, not a commodity. And in these mountains,
                    cutting corners isn't just unprofessional — it's a failure that shows up
                    in the first hard winter.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-none overflow-hidden">
                  <img
                    src={cedarRoof}
                    alt="Cedar shake roof installation on a mountain home in Highlands, NC"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-6 -left-4 md:left-auto md:-right-6 bg-card border border-border rounded-none p-5 shadow-lg max-w-[220px]"
                >
                  <span className="text-3xl font-heading font-bold text-[hsl(var(--highland-gold))]">4.9★</span>
                  <p className="text-muted-foreground text-xs font-body mt-1 leading-snug">
                    Mountain roofs installed across Highlands, Cashiers, Franklin & Sylva.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── ROOFING SERVICES ECOSYSTEM ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
            >
              <span className="eyebrow mb-3 block">Roofing Services</span>
              <h2 className="section-heading mb-4">
                A Complete Roofing<br className="hidden md:block" /> Service Ecosystem.
              </h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                From your first phone call to your warranty package delivery — every roofing
                need is handled under one roof, with one standard.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {roofingServices.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <Link
                    to={service.slug}
                    className="group block h-full bg-card border border-border rounded-none overflow-hidden hover:border-primary/20 card-lift spotlight-hover"
                  >
                    <div className="h-[2px] w-full bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.3)] to-[hsl(var(--heritage-green)/0)]" />

                    <div className="p-6 md:p-7 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-none bg-primary/8 flex items-center justify-center group-hover:bg-primary/14 transition-colors">
                          <service.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[9px] font-body font-semibold uppercase tracking-[0.14em] text-primary/40 group-hover:text-primary/60 transition-opacity">
                          Roofing
                        </span>
                      </div>

                      <h3 className="text-lg font-heading font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-[13px] leading-relaxed font-body mb-5 flex-grow">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.features.map((f) => (
                          <span key={f} className="text-[10px] font-body font-medium text-primary/60 bg-primary/5 px-2 py-0.5 rounded-none">
                            {f}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1.5 font-semibold text-sm text-primary group-hover:gap-2.5 transition-all font-body mt-auto">
                        Explore Service <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY HIGHLANDER ROOFING ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-px"
            style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
              >
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Why Highlander</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  What Sets Highlander<br className="hidden md:block" /> Roofing Apart.
                </h2>
                <p className="text-dark-section-foreground/95 text-base font-body max-w-lg mx-auto">
                  The difference between a roof that lasts and a roof that fails is the team
                  that installs it. Here's what you get with Highlander.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {whyHighlander.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                    className="group p-6 md:p-7 rounded-none border border-dark-section-foreground/6 hover:border-[hsl(var(--highland-gold)/0.15)] bg-dark-section-foreground/[0.02] hover:bg-dark-section-foreground/[0.04] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-none bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                      <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold)/0.6)]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5 group-hover:text-[hsl(var(--highland-gold))] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-dark-section-foreground/95 text-[13px] leading-relaxed font-body">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── MATERIALS GUIDANCE ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12 md:mb-14"
            >
              <span className="eyebrow mb-3 block">Materials & Systems</span>
              <h2 className="section-heading mb-4">
                Specified for Your<br className="hidden md:block" /> Elevation & Exposure.
              </h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                We don't recommend materials from a brochure. Every specification is based on your
                property's actual conditions — elevation, wind exposure, sun orientation, and snow loads.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {materials.map((mat, i) => (
                <motion.div
                  key={mat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-none p-6 md:p-7 hover:border-primary/15 card-lift spotlight-hover"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-base text-foreground">{mat.name}</h3>
                    <span className="text-[10px] font-body font-semibold text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.08)] px-2.5 py-1 rounded-none">
                      {mat.lifespan}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[13px] font-body leading-relaxed mb-4">
                    {mat.detail}
                  </p>
                  <div className="flex items-center gap-4 pt-3 border-t border-border/60">
                    <div>
                      <span className="text-[9px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">Brand</span>
                      <p className="text-xs font-body font-medium text-foreground/70">{mat.brand}</p>
                    </div>
                    <div className="h-6 w-px bg-border" />
                    <div>
                      <span className="text-[9px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">Best For</span>
                      <p className="text-xs font-body font-medium text-foreground/70">{mat.best}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR PROCESS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
            >
              <span className="eyebrow mb-3 block">Our Process</span>
              <h2 className="section-heading mb-4">
                From First Call to<br className="hidden md:block" /> Final Walkthrough.
              </h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                A clear, structured process that removes uncertainty and delivers a roof you can
                trust for decades. Six steps. Zero surprises.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="group relative bg-card border border-border rounded-none p-6 md:p-7 hover:border-primary/15 card-lift spotlight-hover"
                >
                  {/* Step number watermark */}
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">
                    {step.number}
                  </span>

                  <div className="w-10 h-10 rounded-none bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CLIMATE EDUCATION ─── */}
        <section className="section-padding bg-secondary/30">
          <div className="container-tight">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <span className="eyebrow mb-3 block">Climate-Informed Roofing</span>
                <h2 className="section-heading mb-5">
                  Why Mountain<br /> Roofing Is Different.
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
                  Roofing at 2,000–5,000 feet isn't the same as roofing in the Piedmont. Elevation
                  changes the wind, the moisture, the temperature range, and the material demands.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6">
                  Every Highlander roofing specification accounts for the actual conditions your
                  property faces — not generic manufacturer guidelines written for sea level.
                </p>
                <div className="p-4 rounded-none border border-border bg-card">
                  <span className="text-2xl font-heading font-bold text-[hsl(var(--highland-gold))]">2,000–5,000 ft</span>
                  <p className="text-muted-foreground text-xs font-body mt-1">
                    Elevation range across our service area — from Franklin's valley to Cashiers' ridgelines.
                  </p>
                </div>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {climateFactors.map((factor, i) => (
                  <motion.div
                    key={factor.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="group flex gap-4 p-5 md:p-6 rounded-none bg-card border border-border hover:border-primary/20 card-lift spotlight-hover"
                  >
                    <div className="w-10 h-10 rounded-none bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                      <factor.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                        {factor.title}
                      </h3>
                      <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
                        {factor.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── REPAIR VS. REPLACEMENT GUIDANCE ─── */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="roofline-pattern" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
                  <path d="M0,60 L60,20 L120,60" fill="none" stroke="hsl(var(--heritage-green))" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#roofline-pattern)" />
            </svg>
          </div>
          <div className="container-tight relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
            >
              <span className="eyebrow mb-3 block">Repair or Replace?</span>
              <h2 className="section-heading mb-4">
                An Honest Assessment.<br className="hidden md:block" /> Not a Sales Pitch.
              </h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Not every roof needs to be replaced. We'll tell you when a repair makes sense — and
                explain clearly when it doesn't.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-5 md:gap-6">
              {/* Repair column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-card border border-border rounded-none overflow-hidden hover:border-primary/15 card-lift"
              >
                <div className="h-[3px] w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-none bg-primary/8 flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-foreground">Targeted Repair</h3>
                      <span className="text-[10px] font-body font-semibold uppercase tracking-[0.14em] text-primary/50">When it makes sense</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Isolated leak from specific flashing or penetration failure",
                      "Localized wind damage — fewer than 20% of shingles affected",
                      "Roof is under 15 years old with otherwise sound condition",
                      "Minor ridge cap or vent boot deterioration",
                      "Budget constraint with plan to replace within 2–5 years",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-[13px] font-body leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-5 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">Typical range</span>
                        <p className="text-lg font-heading font-bold text-foreground">Scope-based pricing</p>
                      </div>
                      <Link to="/roofing/roof-repair" className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary font-body hover:gap-2.5 transition-all">
                        Roof Repair <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Replacement column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group bg-card border border-border rounded-none overflow-hidden hover:border-[hsl(var(--highland-gold)/0.2)] card-lift"
              >
                <div className="h-[3px] w-full bg-gradient-to-r from-[hsl(var(--highland-gold)/0.4)] via-[hsl(var(--highland-gold))] to-[hsl(var(--highland-gold)/0.4)]" />
                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-none bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center">
                      <Layers className="w-6 h-6 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-foreground">Full Replacement</h3>
                      <span className="text-[10px] font-body font-semibold uppercase tracking-[0.14em] text-[hsl(var(--highland-gold)/0.6)]">When it's time</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Roof is 20+ years old with widespread granule loss or curling",
                      "Multiple prior repairs without lasting improvement",
                      "Storm damage affecting more than 30% of the roof surface",
                      "Visible sagging, deck deterioration, or structural concerns",
                      "Selling your home and roof condition affects value or insurability",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Target className="w-4 h-4 text-[hsl(var(--highland-gold))] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-[13px] font-body leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-5 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">Typical range</span>
                        <p className="text-lg font-heading font-bold text-foreground">Detailed grouped-cost proposal</p>
                      </div>
                      <Link to="/roofing/roof-replacement" className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--highland-gold))] font-body hover:gap-2.5 transition-all">
                        Roof Replacement <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decision CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center bg-primary/[0.03] border border-primary/10 rounded-none p-6 md:p-8"
            >
              <p className="text-foreground font-heading font-semibold text-base mb-2">
                Not sure which you need?
              </p>
              <p className="text-muted-foreground text-sm font-body mb-5 max-w-md mx-auto">
                We'll assess your roof honestly and recommend repair or replacement based on what's actually best for your property — not our revenue.
              </p>
              <Link
                to="/consultation"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary font-body hover:gap-3 transition-all"
              >
                Request a Repair Assessment <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── MID CTA ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Ready to discuss your roof?</h3>
                <p className="text-primary-foreground/85 text-sm font-body">We respond rapidly with a direct call — not a form email.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-none inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Talk With a Roofing Advisor</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a href="tel:+18285247773" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-none inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  <Phone className="w-4 h-4" /> Call Direct
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── EDITORIAL GALLERY ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
            >
              <div>
                <span className="eyebrow mb-3 block">Roofing Portfolio</span>
                <h2 className="section-heading">
                  Recent Roofing<br className="hidden md:block" /> Projects.
                </h2>
              </div>
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-body"
              >
                Full Gallery
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Editorial layout: large feature + grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Featured large image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] lg:aspect-auto lg:row-span-2 rounded-none overflow-hidden"
              >
                <img src={galleryItems[0].image} alt={galleryItems[0].title} className="w-full h-full object-cover img-zoom-dramatic transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.85)] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 text-[9px] font-body font-semibold uppercase tracking-[0.14em] bg-[hsl(var(--highland-gold))] text-accent-foreground px-3 py-1.5 rounded-none">Featured</div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-white/85 mb-1 block">{galleryItems[0].category}</span>
                  <h3 className="font-heading font-bold text-white text-lg md:text-xl">{galleryItems[0].title}</h3>
                </div>
              </motion.div>

              {/* Grid of smaller images */}
              <div className="grid grid-cols-2 gap-4">
                {galleryItems.slice(1, 5).map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    className="group relative aspect-[4/3] rounded-none overflow-hidden"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover img-zoom-dramatic transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.8)] via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 left-2 text-[8px] font-body font-semibold uppercase tracking-[0.12em] bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-none">{item.category}</div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-heading font-semibold text-white text-xs">{item.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 md:mb-14"
            >
              <span className="eyebrow mb-3 block">Roofing FAQs</span>
              <h2 className="section-heading mb-4">
                Common Questions<br className="hidden md:block" /> About Roofing in WNC.
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  <AccordionItem
                    value={`faq-${i}`}
                    className="bg-card border border-border rounded-none px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300"
                  >
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                      <span className="font-heading font-semibold text-foreground text-[15px] leading-snug text-left">
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pr-2">
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">
                        {faq.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Optional advanced roofing builder */}
        <BuilderPromoBlock variant="band" />

        {/* ─── CLOSING CTA ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-px"
            style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">
                    Your Roof, Our Expertise
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Roof Protects Everything<br className="hidden md:block" /> That Matters. Plan It With<br className="hidden md:block" /> a Team That Knows.
                  </h2>
                  <p className="text-dark-section-foreground/95 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    Whether it's time for a replacement, a repair, or an honest second opinion —
                    let's build a plan that gives you confidence for the next 30 years.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link
                      to="/consultation"
                      className="group cta-gradient text-accent-foreground font-heading font-bold text-sm px-10 py-4.5 rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Let's Protect What Matters Most</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href="tel:+18285247773"
                      className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all"
                    >
                      <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" />
                      (828) 524-7773
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Award, text: "CertainTeed Certified" },
                      { icon: Clock, text: "Rapid Response" },
                      { icon: Star, text: "4.7★ Google Rating" },
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

export default RoofingDivision;
