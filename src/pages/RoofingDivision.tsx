import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Mountain,
  Home, Layers, Wrench, CloudLightning, Building2, CheckCircle,
  Thermometer, Wind, Droplets, MapPin, FileText, Hammer,
  ChevronRight, TreePine, Zap
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-004.webp";
import asphaltRoof from "@/assets/gallery/asphalt-hero.webp";
import metalCabin from "@/assets/gallery/metal-006.webp";
import asphaltLarge from "@/assets/gallery/asphalt-006.webp";
import cedarDetail from "@/assets/gallery/cedar-003.jpg";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const roofingServices = [
  {
    icon: Home,
    title: "Residential Roofing",
    slug: "/services/roof-replacement",
    description: "Complete roof systems for mountain homes — from material selection through final walkthrough. Engineered for your elevation, exposure, and decades of WNC weather.",
    features: ["Full replacements", "New construction", "Re-roofing", "Ventilation design"],
  },
  {
    icon: Wrench,
    title: "Roof Repair",
    slug: "/services/roof-repair",
    description: "Targeted, warrantied repairs that stop leaks and prevent escalation. We diagnose accurately, fix permanently, and document everything.",
    features: ["Leak detection", "Flashing repair", "Shingle replacement", "Chimney seals"],
  },
  {
    icon: CloudLightning,
    title: "Storm Damage & Insurance",
    slug: "/services/storm-damage",
    description: "24-hour emergency response with full damage documentation, insurance coordination, and priority scheduling — not storm chasing.",
    features: ["Emergency tarping", "Insurance documentation", "Adjuster meetings", "Priority repairs"],
  },
  {
    icon: Building2,
    title: "Commercial Roofing",
    slug: "/commercial-roofing",
    description: "Inspections, maintenance programs, and full-scope solutions for property managers, HOAs, and facility owners across Western NC.",
    features: ["Flat & low-slope systems", "TPO & EPDM", "Maintenance programs", "Multi-property"],
  },
  {
    icon: Layers,
    title: "Metal Roofing",
    slug: "/services/metal-roofing",
    description: "Standing seam and architectural metal systems rated for 140mph winds and 50+ years of mountain performance. The premium choice.",
    features: ["Standing seam", "Concealed fastener", "Snow guards", "Custom colors"],
  },
  {
    icon: TreePine,
    title: "Specialty Roofing",
    slug: "/services/roof-replacement",
    description: "Cedar shake, slate, copper accents, and architectural details for properties that demand distinctive craftsmanship and heritage character.",
    features: ["Cedar shake", "Slate systems", "Copper work", "Historic restoration"],
  },
];

const materials = [
  {
    name: "Architectural Shingles",
    brand: "CertainTeed Landmark PRO",
    lifespan: "30–50 years",
    best: "Most residential projects",
    detail: "Impact-resistant, algae-resistant, and available in 20+ color profiles. Our most-installed product for WNC homes.",
  },
  {
    name: "Standing Seam Metal",
    brand: "Custom-fabricated panels",
    lifespan: "50–70 years",
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
  { image: asphaltRoof, title: "Architectural Shingles — Franklin", category: "Shingle" },
  { image: metalCabin, title: "Metal + Deck — Bryson City", category: "Metal" },
  { image: asphaltLarge, title: "Full Renovation — Sylva", category: "Shingle" },
  { image: cedarDetail, title: "Cedar Restoration — Highlands", category: "Cedar" },
];

const faqs = [
  { q: "How long does a roof replacement take in WNC?", a: "Most residential replacements are completed in 2–5 days depending on size, complexity, and weather. We provide a clear timeline before work begins and communicate daily throughout the project." },
  { q: "What roofing materials work best for mountain homes?", a: "It depends on your elevation, wind exposure, aesthetic preference, and budget. We typically recommend CertainTeed Landmark PRO architectural shingles or standing seam metal for WNC homes — both handle high winds, heavy rain, and snow loads exceptionally well." },
  { q: "Do you handle insurance claims for storm damage?", a: "Yes. We provide complete damage documentation with photos and measurements, meet with your adjuster on-site, and coordinate the entire repair or replacement process through your insurance claim." },
  { q: "What does a new roof cost in Western North Carolina?", a: "Residential roof replacements in WNC typically range from $8,000 to $25,000+ depending on size, materials, and complexity. We provide detailed, transparent proposals after assessing your specific property." },
  { q: "Are you certified to install specific roofing brands?", a: "Yes. We are CertainTeed Master Shingle Applicator certified — a designation held by fewer than 1% of roofing contractors nationally. This means enhanced warranties and factory-backed installation quality." },
  { q: "Do you offer warranties on your roofing work?", a: "Every project includes both the manufacturer's material warranty and Highlander's labor warranty. You receive a complete warranty package at your final walkthrough — documentation you can hold in your hands." },
  { q: "Can I finance a new roof?", a: "Yes. We offer flexible financing options to make roof replacement accessible. Ask about payment plans during your consultation — there's no obligation and no pressure." },
  { q: "How do I know if I need a repair or full replacement?", a: "We'll assess your roof honestly and explain both options with their pros, cons, and costs. We never recommend a replacement when a repair will solve the problem — and we'll document our reasoning so you can decide with confidence." },
];

const trustSignals = [
  { icon: Award, label: "CertainTeed Master Shingle Applicator", detail: "Top 1% nationally" },
  { icon: Shield, label: "Licensed General Contractor", detail: "State of North Carolina" },
  { icon: FileText, label: "Full Warranty Documentation", detail: "Material + labor coverage" },
  { icon: Clock, label: "24-Hour Storm Response", detail: "Emergency priority service" },
];

/* ═══════════════════════════════════════════
   ROOFLINE SVG — architectural motif
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
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={metalRoof}
              alt="Premium standing seam metal roof on a mountain estate in Cashiers, NC"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.15)] to-[hsl(var(--hero-overlay)/0.3)]" />
          </div>

          {/* Roofline SVG overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-[1] text-background">
            <RooflineSVG className="w-full h-[40px] md:h-[60px]" />
          </div>

          {/* Division accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />

          {/* Gold side accent */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] z-20"
            style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }}
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {/* Content */}
          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-16 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-8 rounded-sm bg-primary/20 flex items-center justify-center">
                  <Home className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                  Roofing Division
                </span>
                <div className="h-px flex-1 max-w-[60px] bg-[hsl(var(--highland-gold)/0.3)]" />
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight"
                >
                  Mountain-Grade Roofing.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight"
                >
                  Built to Outlast the Weather.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="text-base md:text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed font-body"
              >
                Residential, commercial, and specialty roofing systems engineered for
                Western North Carolina's elevation, wind, and climate — installed by
                certified crews and backed by warranties we stand behind personally.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  to="/request-inspection"
                  className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Schedule a Roofing Consultation</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:8283979211"
                  className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  (828) 397-9211
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
                  <span className="text-[10px] text-primary-foreground/35 font-body">{item.detail}</span>
                </motion.div>
              ))}
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
                    className="group block h-full bg-card border border-border rounded-sm overflow-hidden hover:border-primary/20 card-lift"
                  >
                    {/* Green top accent */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.3)] to-[hsl(var(--heritage-green)/0)]" />

                    <div className="p-6 md:p-7 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-sm bg-primary/8 flex items-center justify-center group-hover:bg-primary/14 transition-colors">
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

                      {/* Feature tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.features.map((f) => (
                          <span key={f} className="text-[10px] font-body font-medium text-primary/60 bg-primary/5 px-2 py-0.5 rounded-sm">
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
                  className="bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-base text-foreground">{mat.name}</h3>
                    <span className="text-[10px] font-body font-semibold text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.08)] px-2.5 py-1 rounded-sm">
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

        {/* ─── CLIMATE EDUCATION ─── */}
        <section className="section-padding bg-background">
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
                <div className="p-4 rounded-sm border border-border bg-card">
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
                    className="group flex gap-4 p-5 md:p-6 rounded-sm bg-card border border-border hover:border-primary/20 card-lift"
                  >
                    <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
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

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-secondary/30">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="group relative aspect-[4/3] rounded-sm overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.8)] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3 text-[9px] font-body font-semibold uppercase tracking-[0.14em] bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-sm">
                    {item.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-semibold text-white text-sm">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQS ─── */}
        <section className="section-padding bg-background">
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
                    className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300"
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
                    Discuss Your Roof With Our Team
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Roof Protects Everything<br className="hidden md:block" /> That Matters. Choose a Team<br className="hidden md:block" /> That Builds Accordingly.
                  </h2>
                  <p className="text-dark-section-foreground/45 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    Whether it's time for a replacement, a repair, or an honest second opinion —
                    the conversation starts with a local expert who knows mountain roofing firsthand.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link
                      to="/request-inspection"
                      className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Request a Quote Call</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href="tel:8283979211"
                      className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all"
                    >
                      <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" />
                      (828) 397-9211
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Award, text: "CertainTeed Certified" },
                      { icon: Clock, text: "24-Hour Response" },
                      { icon: Star, text: "4.7★ Google Rating" },
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

export default RoofingDivision;
