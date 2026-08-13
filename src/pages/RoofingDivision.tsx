import AnswerBlock from "@/components/seo/AnswerBlock";
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
import Section from "@/components/layout/Section";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TieredOffer from "@/components/conversion/TieredOffer";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";

import metalRoof from "@/assets/gallery/metal-005.webp";
import roofingMobileHero from "@/assets/heroes/roofing-mobile.webp";
import roofingMobileHeroSet from "@/assets/heroes/roofing-mobile.webp?w=480;640;828&format=webp&as=srcset";
import roofingMobileHeroAvif from "@/assets/heroes/roofing-mobile.webp?w=480;640;828&format=avif&as=srcset";
import metalRoofSet from "@/assets/gallery/metal-005.webp?w=1024;1600&format=webp&as=srcset";
import metalRoofAvif from "@/assets/gallery/metal-005.webp?w=1024;1600&format=avif&as=srcset";
import cedarRoof from "@/assets/gallery/cedar-005.webp";
import asphaltRoof from "@/assets/gallery/asphalt-hero.webp";
import metalCabin from "@/assets/gallery/metal-006.webp";
import asphaltLarge from "@/assets/gallery/asphalt-006.webp";
import cedarDetail from "@/assets/gallery/cedar-001.webp";
import RealWorkWidget from "@/components/RealWorkWidget";
import VeluxWidget from "@/components/VeluxWidget";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import RoofingPathFinder from "@/components/roofing/RoofingPathFinder";
import RoofingIntentRouter from "@/components/roofing/RoofingIntentRouter";
import HeroTrustLine from "@/components/hero/HeroTrustLine";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const roofingServices = [
  {
    icon: Home,
    title: "Residential Roofing",
    slug: "/roofing/residential",
    problem: "Your roof is near the end of its life and you need a replacement plan you can trust.",
    description: "Complete roof systems for mountain homes — from material selection through final walkthrough. Engineered for your elevation, exposure, and decades of WNC weather.",
    features: ["Full replacements", "New construction", "Re-roofing", "Ventilation design"],
  },
  {
    icon: Wrench,
    title: "Roof Repair",
    slug: "/roofing/roof-repair",
    problem: "You have a leak, stain, or damaged section and need it stopped before it spreads.",
    description: "Targeted repairs that stop leaks and prevent escalation. We diagnose accurately, fix it right, and document everything.",
    features: ["Leak detection", "Flashing repair", "Shingle replacement", "Chimney seals"],
  },
  {
    icon: CloudLightning,
    title: "Storm Damage & Insurance",
    slug: "/roofing/storm-damage",
    problem: "A storm hit your property and you need documented damage your insurer will accept.",
    description: "Rapid emergency response with full damage documentation, insurance coordination, and priority scheduling — not storm chasing.",
    features: ["Emergency tarping", "Insurance documentation", "Adjuster meetings", "Priority repairs"],
  },
  {
    icon: Building2,
    title: "Commercial Roofing",
    slug: "/roofing/commercial",
    problem: "You manage a building or HOA and need a low-slope system kept watertight on schedule.",
    description: "Inspections, maintenance programs, and full-scope solutions for property managers, HOAs, and facility owners across Western NC.",
    features: ["Flat & low-slope systems", "TPO & EPDM", "Maintenance programs", "Multi-property"],
  },
  {
    icon: Layers,
    title: "Metal Roofing",
    slug: "/roofing/metal",
    problem: "You want a roof that outlasts shingles in wind, snow, and mountain sun exposure.",
    description: "Standing seam and visually complex metal systems rated for 140mph winds and 50+ years of mountain performance. The premium choice.",
    features: ["Standing seam", "Concealed fastener", "Snow guards", "Custom colors"],
  },
  {
    icon: TreePine,
    title: "Specialty Roofing",
    slug: "/roofing/specialty",
    problem: "Your home's character calls for cedar, slate, or copper — installed by people who detail it right.",
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
  { q: "Are you certified to install specific roofing brands?", a: "Yes. We are CertainTeed ShingleMaster Credentialed Contractor certified — a designation held by fewer than 1% of roofing contractors nationally. This means enhanced warranties and factory-backed installation quality." },
  { q: "Do you offer warranties on your roofing work?", a: "Every project includes both the manufacturer's material warranty and Highlander's labor warranty. You receive a complete warranty package at your final walkthrough — documentation you can hold in your hands." },
  { q: "Can I finance a new roof?", a: "Yes. We offer flexible financing options to make roof replacement accessible. Ask about payment plans during your consultation — there's no obligation and no pressure." },
  { q: "How do I know if I need a repair or full replacement?", a: "We'll assess your roof honestly and explain both options with their pros, cons, and costs. We never recommend a replacement when a repair will solve the problem — and we'll document our reasoning so you can decide with confidence." },
];

const trustSignals = [
  { icon: Award, label: "CertainTeed ShingleMaster Credentialed Contractor", detail: "Top 1% nationally" },
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
    title: "CertainTeed ShingleMaster Credentialed Contractor",
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
        description="Roofing in Western North Carolina: shingle, metal, cedar, storm damage, and commercial systems from a CertainTeed ShingleMaster Credentialed Contractor."
        path="/roofing"
        jsonLd={[
          serviceSchema({ name: "Roofing Services", description: "Expert residential and commercial roofing across Western North Carolina.", url: "/roofing" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }]} />
      <main id="main-content" className="md:pt-0">
        {/* ─── HERO ─── */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 767px)" type="image/avif" srcSet={roofingMobileHeroAvif} sizes="100vw" />
              <source media="(max-width: 767px)" type="image/webp" srcSet={roofingMobileHeroSet} sizes="100vw" />
              <source type="image/avif" srcSet={metalRoofAvif} sizes="100vw" />
              <source type="image/webp" srcSet={metalRoofSet} sizes="100vw" />
              <img width={1600} height={1067} decoding="async" fetchPriority="high"
                src={metalRoof}
                alt="Premium standing seam metal roof on a mountain estate in Cashiers, NC"
                className="w-full h-full object-cover object-[50%_25%] md:object-center"
                loading="eager"
              />
            </picture>
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

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-10 md:pb-20 pt-24 md:pt-40">
            <div className="max-w-3xl flex flex-col">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="order-4 md:order-none flex flex-col gap-4 md:gap-6 mt-8 md:mt-0 mb-0 md:mb-8"
              >
                <div className="inline-flex items-center gap-4">
                  <div className="h-10 w-px bg-[hsl(var(--highland-gold)/0.5)]" />
                  <div className="flex flex-col">
                    <span className="text-body-xs font-heading font-bold text-white tracking-[0.1em]">Highlander</span>
                    <span className="text-caption font-body font-bold text-[hsl(var(--highland-gold)/0.8)] uppercase tracking-[0.2em] -mt-1">Roofing Division</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-primary/20 flex items-center justify-center">
                    <Home className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-caption md:text-caption font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">
                    Authority Since 2017
                  </span>
                </div>
              </motion.div>

              <h1 className="order-1 md:order-none mb-4 md:mb-8 text-heading md:text-5xl lg:text-6xl xl:text-8xl font-heading font-bold text-primary-foreground leading-[0.98] tracking-tight">
                <span className="block overflow-hidden mb-2">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Roofing Built for
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Western NC <span className="text-[hsl(var(--gold-ink))]">Weather.</span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="order-2 md:order-none text-body-sm md:text-body-lg text-primary-foreground/90 max-w-2xl mb-5 md:mb-12 leading-snug md:leading-relaxed font-body font-medium"
              >
                <span className="md:hidden">We inspect, spec the right system for your elevation, and put scope and price in writing first.</span>
                <span className="hidden md:inline">Wind-driven rain, ice, and ridgeline exposure end mountain roofs early. We inspect what you have, spec a shingle or standing seam metal system for your elevation, and put the scope and price in writing before work begins — CertainTeed ShingleMaster credentialed, licensed, and insured.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="order-3 md:order-none flex flex-col sm:flex-row gap-3 sm:gap-4"
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

              <HeroTrustLine className="order-3 md:order-none mt-4 md:mt-6" />
            </div>
          </div>
        </section>

        <AnswerBlock
          question="What roofing services does Highlander provide in Western North Carolina?"
          answer="Highlander Building Services, Inc. handles roof repair, full roof replacement, metal roofing, synthetic slate and shake, skylights, gutters, and storm damage response across Western North Carolina from our Franklin, NC shop."
          points={[
            "Repair, replacement, metal, and specialty roofing",
            "Storm damage inspections after mountain weather",
            "Call 828-524-7773 to reach a roofing lead",
          ]}
        />

        {/* ─── INTENT ROUTER ─── */}
        <RoofingIntentRouter />

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
                  <span className="text-caption text-primary-foreground/95 font-body">{item.detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ROOFING SERVICES ECOSYSTEM ─── */}
        <Section density="default" width="wide" className="bg-background">
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
                      <span className="text-caption font-body font-semibold uppercase tracking-[0.14em] text-primary/80 group-hover:text-primary/80 transition-opacity">
                        Roofing
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-body-xs leading-relaxed font-body text-muted-foreground mb-5">
                      {service.problem}
                    </p>
                    <div className="flex-grow" />

                    <span className="inline-flex items-center gap-1.5 font-semibold text-sm text-primary group-hover:gap-2.5 transition-all font-body mt-auto">
                      See {service.title} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ─── NOT SURE WHICH YOU NEED? ─── */}
        <RoofingPathFinder />

        {/* ─── LOCAL PROOF ─── */}
        {/* ─── EDITORIAL GALLERY ─── */}
        <Section density="default" width="wide" className="bg-background">
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
              to="/recent-projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--gold-ink))] hover:text-[hsl(var(--gold-ink))]/80 transition-colors font-body"
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
              <img width={1600} height={1067} decoding="async" src={galleryItems[0].image} alt={galleryItems[0].title} className="w-full h-full object-cover img-zoom-dramatic transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.85)] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 left-4 text-caption font-body font-semibold uppercase tracking-[0.14em] bg-[hsl(var(--highland-gold))] text-accent-foreground px-3 py-1.5 rounded-none">Featured</div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span className="text-caption font-body font-semibold uppercase tracking-[0.15em] text-white/85 mb-1 block">{galleryItems[0].category}</span>
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
                  <img width={1600} height={1067} decoding="async" src={item.image} alt={item.title} className="w-full h-full object-cover img-zoom-dramatic transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.8)] via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 left-2 text-caption font-body font-semibold uppercase tracking-[0.12em] bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-none">{item.category}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-heading font-semibold text-white text-xs">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── FAQS ─── */}
        <Section density="default" width="tight" className="bg-secondary tartan-bg">
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
                  className="bg-card border border-border rounded-none px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-flat transition-all duration-300"
                >
                  <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                    <span className="font-heading font-semibold text-foreground text-body-sm leading-snug text-left">
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
        </Section>

        <WhoShowsUp />

        <VeluxWidget
          heading="VELUX Skylights, Installed by a Certified Roofer"
          description="Daylight and fresh air for mountain homes. Browse the VELUX lineup below, then talk to our team about adding or replacing skylights during your roofing project."
          className="section-padding bg-background border-t border-border/60"
        />

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
                  <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">
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
      <RealWorkWidget />
      <ConversionTrustBlock variant="band" category="roofing" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RoofingDivision;
