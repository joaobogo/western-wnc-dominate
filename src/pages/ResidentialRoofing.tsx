import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, AlertTriangle, Wrench, Replace, Layers,
  Eye, Ruler, ClipboardCheck, Hammer, BadgeCheck,
  Droplets, Wind, Thermometer, Mountain, ShieldCheck,
  Camera, Paintbrush, Landmark, ChevronRight, Sparkles
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import asphalt001 from "@/assets/gallery/asphalt-001.jpg";
import asphalt005 from "@/assets/gallery/asphalt-005.jpg";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-004.webp";
import cedarDetail from "@/assets/gallery/cedar-001.jpg";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const warningSignsData = [
  { icon: Droplets, title: "Interior Water Stains", detail: "Discolored patches on ceilings or walls often indicate active leaks or compromised flashing that may signal broader system failure." },
  { icon: AlertTriangle, title: "Curling, Cracking, or Missing Shingles", detail: "Shingles that curl, crack, or blow off have reached the end of their useful life. Isolated patches suggest repair; widespread damage points to replacement." },
  { icon: Layers, title: "Granule Loss in Gutters", detail: "Heavy granule accumulation in gutters means your shingles' UV protection layer is deteriorating — a sign of age-related decline." },
  { icon: Wind, title: "Sagging or Uneven Roofline", detail: "A visibly sagging roofline may indicate structural decking issues beneath the surface material — a condition that requires immediate professional assessment." },
  { icon: Thermometer, title: "Rising Energy Bills", detail: "Unexplained increases in heating or cooling costs can point to failing roof ventilation or insulation compromise beneath the roofing system." },
  { icon: Clock, title: "Roof Age (20+ Years)", detail: "If your roof is approaching or past its expected lifespan, proactive replacement prevents emergency situations and lets you choose timing and materials on your terms." },
];

const repairVsReplace = [
  {
    type: "Repair May Be Right",
    icon: Wrench,
    color: "primary",
    items: [
      "Damage is limited to a specific, isolated area",
      "Roof is under 15 years old with no systemic issues",
      "Flashing around a single penetration has failed",
      "A few shingles are missing after a localized wind event",
      "You need a short-term solution before a planned replacement",
    ],
  },
  {
    type: "Replacement Is Likely Needed",
    icon: Replace,
    color: "accent",
    items: [
      "Damage is spread across multiple sections of the roof",
      "Shingles are curling, cracking, or losing granules systemically",
      "The roof has been repaired multiple times already",
      "Decking shows signs of moisture damage or rot",
      "Your roof is 20+ years old and showing age-related decline",
    ],
  },
];

const materialsComparison = [
  {
    name: "Dimensional Asphalt Shingles",
    brand: "CertainTeed Landmark PRO",
    warranty: "Lifetime limited",
    lifespan: "30–50 years",
    priceRange: "$$",
    best: "Most WNC residential projects",
    pros: ["Impact-resistant Class 4 options", "20+ designer color profiles", "Algae-resistant technology", "Best value-to-performance ratio"],
    image: asphalt006,
  },
  {
    name: "Standing Seam Metal",
    brand: "Custom-fabricated panels",
    warranty: "40–50 year paint warranty",
    lifespan: "50–70 years",
    priceRange: "$$$$",
    best: "Premium mountain homes & estates",
    pros: ["140mph wind rating", "Zero-maintenance longevity", "Superior snow shedding", "Energy-efficient reflectivity"],
    image: metalRoof,
  },
  {
    name: "Cedar Shake",
    brand: "Premium Western Red Cedar",
    warranty: "Varies by grade",
    lifespan: "30–40 years",
    priceRange: "$$$",
    best: "Heritage & estate properties",
    pros: ["Natural insulation properties", "Distinctive mountain character", "Ages beautifully over time", "Environmentally renewable"],
    image: cedarRoof,
  },
];

const roofStyles = [
  { title: "Gable Roof", description: "The most common residential style in WNC — excellent for rain and snow shedding, straightforward to ventilate, and efficient to install." },
  { title: "Hip Roof", description: "Four-slope design offering superior wind resistance at elevation. Ideal for exposed ridge-top properties in Highlands and Cashiers." },
  { title: "Complex Multi-Gable", description: "Common on larger mountain homes with dormers, valleys, and varying rooflines. Requires experienced flashing and waterproofing detailing." },
  { title: "Steep-Slope Mountain", description: "Pitches above 8:12 — common at higher elevations for snow management. Demands specialized safety equipment and installation techniques." },
];

const processSteps = [
  { number: "01", title: "Initial Consultation", icon: Phone, description: "We start with a conversation about your roof, your concerns, and your goals. Then we schedule a convenient time for an on-site assessment — no pressure, no obligation." },
  { number: "02", title: "Property Assessment", icon: Eye, description: "We inspect every component — surface material, flashing, penetrations, ventilation, gutters, and visible decking. We photograph and document everything." },
  { number: "03", title: "Material Specification", icon: Ruler, description: "Based on your property's elevation, exposure, layout, and budget, we recommend materials engineered specifically for your conditions." },
  { number: "04", title: "Transparent Proposal", icon: ClipboardCheck, description: "You receive a detailed, grouped-cost proposal with scope, materials, timeline, warranty details, and total cost. No hidden fees. No surprises." },
  { number: "05", title: "Precision Installation", icon: Hammer, description: "Our certified crews install to exact manufacturer specifications — every fastener pattern, ice shield placement, ventilation calculation, and flashing detail." },
  { number: "06", title: "Final Walkthrough & Warranty", icon: BadgeCheck, description: "We conduct a multi-point quality inspection, then walk the project with you. You receive a complete warranty package — documentation you can hold in your hands." },
];

const qualityChecks = [
  { title: "Pre-Installation Decking Inspection", detail: "Every square foot of decking is inspected before new material goes down. Damaged or rotted sections are replaced — not covered up." },
  { title: "Ice & Water Shield Application", detail: "Full ice shield coverage in valleys, at eaves, and around all penetrations — exceeding manufacturer minimum requirements for mountain conditions." },
  { title: "Starter Strip & Drip Edge", detail: "Proper starter course and drip edge installation prevents wind uplift at the most vulnerable areas and directs water flow away from fascia." },
  { title: "Ventilation Calculation", detail: "Balanced intake-to-exhaust ventilation calculated for your specific attic volume — preventing moisture buildup and ice damming." },
  { title: "Flashing & Sealing", detail: "Step flashing, counter-flashing, and sealant at every wall intersection, chimney, pipe boot, and skylight — done right the first time." },
  { title: "Daily Cleanup & Property Protection", detail: "Tarps protect landscaping and siding. Magnetic sweeps catch every nail. Your property is left cleaner than we found it — every day." },
];

const galleryItems = [
  { image: asphaltHero, title: "Full Replacement — Highlands Plateau", category: "Shingle" },
  { image: metalRoof, title: "Standing Seam — Cashiers Estate", category: "Metal" },
  { image: cedarRoof, title: "Cedar Shake — Highlands", category: "Cedar" },
  { image: asphalt005, title: "Dimensional Shingles — Franklin", category: "Shingle" },
  { image: asphalt007, title: "Mountain Home — Sylva", category: "Shingle" },
  { image: cedarDetail, title: "Cedar Detail — Sapphire Valley", category: "Cedar" },
];

const faqs = [
  { q: "How long does a residential roof replacement take?", a: "Most residential replacements are completed in 2–5 days depending on size, complexity, pitch, and weather conditions. We'll provide a specific timeline in your proposal and keep you updated daily throughout the project." },
  { q: "What is your most popular residential roofing material?", a: "CertainTeed Landmark PRO dimensional shingles are our most-installed residential product. They offer exceptional durability, impact resistance, algae protection, and a wide range of designer colors — all at a strong value point for WNC homeowners." },
  { q: "How do I know if I need a repair or a full replacement?", a: "We'll assess your roof honestly and explain both options with their pros, cons, and costs. If a repair will solve the problem, we'll tell you. If replacement is the better long-term investment, we'll explain exactly why. You decide with full information." },
  { q: "What does a residential roof replacement cost in WNC?", a: "Replacement pricing is scope-based — it depends on size, material system, pitch complexity, and access conditions. Rather than publish a generic range, we provide a detailed, grouped-cost proposal after assessing your specific property." },
  { q: "Do you handle the full process or just the roofing?", a: "We handle everything — from initial assessment through final cleanup. That includes material delivery, old roof tear-off, decking inspection and repair, new installation, flashing, ventilation, gutters if needed, and complete debris removal." },
  { q: "What warranties do you offer on residential roofing?", a: "Every residential project includes the manufacturer's material warranty (up to lifetime limited on CertainTeed products) plus Highlander's labor warranty. You receive a complete warranty package at your final walkthrough." },
  { q: "Can I stay in my home during a roof replacement?", a: "Yes. While roof replacement is noisy, most homeowners stay in their homes throughout the process. We'll let you know what to expect each day and take every precaution to minimize disruption." },
  { q: "Do you offer financing for residential roofing?", a: "Yes. We offer flexible financing options to make roof replacement accessible. Ask about payment plans during your consultation — no obligation, no pressure." },
  { q: "Are your crews employees or subcontractors?", a: "Our roofing crews are Highlander employees — trained, certified, and directly accountable. No subcontractor roulette. The same quality standard on every project." },
  { q: "What happens if it rains during my roof replacement?", a: "We monitor weather closely and plan accordingly. If rain is expected, we ensure your roof is properly tarped and sealed before we stop for the day. Your home is never left exposed overnight." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const ResidentialRoofing = () => {
    return (
    <>
      <SEOHead
        title="Residential Roofing in Western NC"
        description="Residential roofing for mountain homes across Highlands, Cashiers, Franklin & Sylva. CertainTeed certified installation and premium materials."
        path="/roofing/residential"
        jsonLd={[
          serviceSchema({ name: "Residential Roofing", description: "Premium residential roof replacement and repair for mountain homes across Western North Carolina.", url: "/roofing/residential" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Residential", url: "/roofing/residential" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[75vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={asphaltHero}
              alt="Premium residential roof replacement on a mountain home in Western North Carolina"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.15)] to-[hsl(var(--hero-overlay)/0.3)]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />

          <motion.div
            className="absolute left-0 top-0 w-[2px] z-20"
            style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }}
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-3 mb-6"
              >
                <Link to="/roofing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center">
                    <Home className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">
                    Roofing Division
                  </span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/25" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">
                  Residential
                </span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight"
                >
                  Your Home Deserves a Roof
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight"
                >
                  Built for These Mountains.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="text-base md:text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed font-body"
              >
                Complete residential roof replacement and repair for mountain homes across
                Highlands, Cashiers, Franklin, Sylva & beyond. Certified installation.
                Premium materials. Warranties you can count on.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  to="/consultation"
                  className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Roof</span>
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

              {/* Trust micro-stats — unique to Residential */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10"
              >
                {[
                  { value: "4.9★", label: "Google Rating" },
                  { value: "4.9★", label: "Homeowner Rating" },
                  { value: "Top 1%", label: "National Certification" },
                  { value: "24hr", label: "Storm Response" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <div className="text-lg md:text-xl font-heading font-bold text-[hsl(var(--highland-gold))]">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-primary-foreground/40 font-body mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── TRUST STRIP ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-5 md:py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { icon: Award, text: "CertainTeed Master Applicator" },
                { icon: Shield, text: "Licensed & Insured" },
                { icon: Clock, text: "24-Hour Storm Response" },
                { icon: Star, text: "4.7★ Google Rating" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-[hsl(var(--highland-gold)/0.6)]" />
                  <span className="text-xs font-body font-medium text-primary-foreground/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OPENING STATEMENT — Editorial left-aligned with shield accent ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-8"
              >
                <div className="w-10 h-[3px] mb-8 bg-[hsl(var(--heritage-green)/0.5)]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6">
                  A roof replacement is one of the most significant investments you'll make in your mountain home. It should be handled with the seriousness it deserves.
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body mb-4">
                  At Highlander, residential roofing isn't a side service — it's our foundation. We've built our reputation one home at a time across Western North Carolina, earning trust through transparent communication, certified craftsmanship, and roofs that perform decade after decade at elevation.
                </p>
                <p className="text-muted-foreground/70 text-sm leading-relaxed font-body">
                  Every residential project receives the same standard: site-specific material specification, manufacturer-certified installation, daily communication, and a warranty package you can hold in your hands.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-4 flex flex-col gap-5"
              >
                {[
                  { icon: ShieldCheck, label: "Licensed & Fully Insured", sub: "NC General Contractor" },
                  { icon: Award, label: "CertainTeed Master Applicator", sub: "Top 1% nationally" },
                  { icon: Camera, label: "Documented Everything", sub: "Before, during & after" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded-sm">
                    <div className="w-9 h-9 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold text-foreground">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground font-body">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── WHEN IT'S TIME FOR A NEW ROOF ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12 md:mb-14"
            >
              <span className="eyebrow mb-3 block">Know the Signs</span>
              <h2 className="section-heading mb-4">
                When It May Be Time<br className="hidden md:block" /> for a New Roof.
              </h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Some warning signs are obvious. Others are subtle. Here's what to look for —
                and when to call a professional for an honest assessment.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {warningSignsData.map((sign, i) => (
                <motion.div
                  key={sign.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift"
                >
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <sign.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                    {sign.title}
                  </h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
                    {sign.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <Link
                to="/consultation"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-body"
              >
                Not sure? Let us assess your roof — no obligation
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── REPAIR VS. REPLACEMENT ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12"
            >
              <span className="eyebrow mb-3 block">Honest Guidance</span>
              <h2 className="section-heading mb-4">
                Repair or Replace?<br className="hidden md:block" /> We'll Help You Decide.
              </h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                We never recommend a replacement when a repair will solve the problem.
                And we'll document our reasoning so you can decide with confidence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {repairVsReplace.map((option, i) => (
                <motion.div
                  key={option.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-sm overflow-hidden"
                >
                  <div className={`h-[2px] w-full ${i === 0 ? 'bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.4)] to-[hsl(var(--heritage-green)/0)]' : 'bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.4)] to-[hsl(var(--highland-gold)/0)]'}`} />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${i === 0 ? 'bg-primary/8' : 'bg-[hsl(var(--highland-gold)/0.08)]'}`}>
                        <option.icon className={`w-5 h-5 ${i === 0 ? 'text-primary' : 'text-[hsl(var(--highland-gold))]'}`} />
                      </div>
                      <h3 className="font-heading font-bold text-foreground text-lg">{option.type}</h3>
                    </div>
                    <ul className="space-y-3">
                      {option.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === 0 ? 'text-primary/50' : 'text-[hsl(var(--highland-gold)/0.5)]'}`} />
                          <span className="text-muted-foreground text-[13px] font-body leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MATERIALS COMPARISON ─── */}
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
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Residential Materials</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Materials Specified for<br className="hidden md:block" /> Mountain Performance.
                </h2>
                <p className="text-dark-section-foreground/40 text-base font-body max-w-lg mx-auto">
                  Every material we recommend has been proven in WNC conditions.
                  Here's how the most popular residential options compare.
                </p>
              </motion.div>

              <div className="space-y-5">
                {materialsComparison.map((mat, i) => (
                  <motion.div
                    key={mat.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group border border-dark-section-foreground/6 rounded-sm overflow-hidden hover:border-[hsl(var(--highland-gold)/0.15)] bg-dark-section-foreground/[0.02] hover:bg-dark-section-foreground/[0.04] transition-all duration-300"
                  >
                    <div className="grid md:grid-cols-5 gap-0">
                      {/* Image */}
                      <div className="md:col-span-2 aspect-[16/10] md:aspect-auto">
                        <img
                          src={mat.image}
                          alt={mat.name}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      {/* Content */}
                      <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-heading font-bold text-dark-section-foreground text-lg group-hover:text-[hsl(var(--highland-gold))] transition-colors">
                            {mat.name}
                          </h3>
                          <span className="text-[10px] font-body font-semibold text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.06)] px-2.5 py-1 rounded-sm">
                            {mat.lifespan}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4 text-[11px] font-body text-dark-section-foreground/35">
                          <span><strong className="text-dark-section-foreground/50">Brand:</strong> {mat.brand}</span>
                          <span><strong className="text-dark-section-foreground/50">Warranty:</strong> {mat.warranty}</span>
                          <span><strong className="text-dark-section-foreground/50">Best For:</strong> {mat.best}</span>
                        </div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {mat.pros.map((pro) => (
                            <li key={pro} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-[hsl(var(--highland-gold)/0.4)] flex-shrink-0" />
                              <span className="text-dark-section-foreground/50 text-xs font-body">{pro}</span>
                            </li>
                          ))}
                        </ul>
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
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Need guidance on materials or timing?</h3>
                <p className="text-primary-foreground/50 text-sm font-body">We'll assess your roof honestly and recommend based on what it actually needs.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Roof</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a href="tel:8283979211" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  <Phone className="w-4 h-4" /> Call Direct
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ROOFING STYLES ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12"
            >
              <span className="eyebrow mb-3 block">Roof Systems</span>
              <h2 className="section-heading mb-4">
                Choosing a Style That<br className="hidden md:block" /> Fits Your Home.
              </h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Your roof's shape affects its performance, cost, and appearance. Here are the
                most common residential styles we install across WNC.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {roofStyles.map((style, i) => (
                <motion.div
                  key={style.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Landmark className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
                    <h3 className="font-heading font-bold text-foreground text-base group-hover:text-primary transition-colors">{style.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
                    {style.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RESIDENTIAL GALLERY ─── */}
        <section className="section-padding bg-secondary/30">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
            >
              <div>
                <span className="eyebrow mb-3 block">Residential Portfolio</span>
                <h2 className="section-heading">
                  Recent Residential<br className="hidden md:block" /> Roofing Projects.
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
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
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

        {/* ─── PROCESS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
            >
              <span className="eyebrow mb-3 block">Our Residential Process</span>
              <h2 className="section-heading mb-4">
                Six Steps to a Roof<br className="hidden md:block" /> You Can Trust.
              </h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                A clear, structured process designed to remove uncertainty and deliver
                confidence at every stage.
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
                  className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift"
                >
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
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

        {/* ─── QUALITY CONTROL ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <span className="eyebrow mb-3 block">Quality Assurance</span>
                <h2 className="section-heading mb-5">
                  Every Detail.<br /> Every Project.
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
                  Quality control isn't an afterthought — it's built into every phase of installation.
                  From the first decking inspection to the final cleanup, we follow a structured
                  checklist that ensures nothing is missed.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  These aren't suggestions — they're non-negotiable standards that apply to every
                  residential roofing project, regardless of size or material.
                </p>
              </motion.div>

              <div className="lg:col-span-3 space-y-3">
                {qualityChecks.map((check, i) => (
                  <motion.div
                    key={check.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="group flex gap-4 p-5 rounded-sm bg-card border border-border hover:border-primary/15 card-lift"
                  >
                    <div className="w-8 h-8 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {check.title}
                      </h3>
                      <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
                        {check.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              <span className="eyebrow mb-3 block">Residential Roofing FAQs</span>
              <h2 className="section-heading mb-4">
                Questions Homeowners<br className="hidden md:block" /> Ask Most Often.
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
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
                    Talk With Our Team
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Mountain Home<br className="hidden md:block" /> Deserves Mountain-Grade<br className="hidden md:block" /> Protection.
                  </h2>
                  <p className="text-dark-section-foreground/45 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    Whether you're planning ahead or responding to damage — the conversation
                    starts with a local roofing expert who knows your neighborhood, your
                    elevation, and your weather.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link
                      to="/consultation"
                      className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Schedule a Roofing Consultation</span>
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
                      { icon: Star, text: "Financing Available" },
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

export default ResidentialRoofing;
