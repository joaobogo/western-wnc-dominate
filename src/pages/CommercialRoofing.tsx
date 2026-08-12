import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, Building2, Warehouse, HardHat, Briefcase,
  ChevronRight, Eye, ClipboardCheck, Hammer, Calendar,
  BadgeCheck, Layers, Wrench, FileText, Users, BarChart3,
  Settings, HeartHandshake, ShieldCheck
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import heroImg from "@/assets/gallery/metal-006.webp";
import RealWorkWidget from "@/components/RealWorkWidget";
import AnswerBlock from "@/components/seo/AnswerBlock";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const capabilities = [
  { icon: Building2, title: "New Construction Roofing", detail: "Complete roofing systems for new commercial builds — from pre-construction coordination through final inspection. We integrate with general contractors and project managers to deliver on schedule." },
  { icon: Wrench, title: "Roof Replacement & Re-Roofing", detail: "Full tear-off and replacement or recovers for aging commercial roofs. We evaluate existing conditions, recommend the optimal system, and execute with minimal operational disruption." },
  { icon: Settings, title: "Preventive Maintenance Programs", detail: "Scheduled inspection and maintenance programs that extend roof life, preserve warranty coverage, and catch small issues before they become emergency repairs." },
  { icon: HardHat, title: "Emergency Repair & Response", detail: "Rapid emergency response for active leaks, storm damage, and critical failures. Temporary weatherproofing followed by permanent, warrantied repair." },
  { icon: Layers, title: "Roof Coatings & Restoration", detail: "Elastomeric and silicone coating systems that extend the life of existing commercial roofs by 10–15 years at a fraction of replacement cost." },
  { icon: Eye, title: "Roof Condition Assessments", detail: "Comprehensive roof evaluations with written reports, photo documentation, and capital planning recommendations for property managers and ownership groups." },
];

const roofingSystems = [
  {
    title: "TPO Single-Ply Membrane",
    description: "Thermoplastic polyolefin membrane systems — the most widely specified commercial roofing system in North America. Energy-efficient, highly reflective, and excellent for flat and low-slope applications.",
    bestFor: "Retail, office, warehouse, and institutional buildings",
    highlights: ["Heat-welded seams for superior leak resistance", "Energy Star rated reflectivity", "manufacturer system warranties available"],
  },
  {
    title: "EPDM Rubber Roofing",
    description: "Ethylene propylene diene monomer — a proven, durable rubber membrane with decades of performance history. Excellent UV and ozone resistance with low lifecycle cost.",
    bestFor: "Industrial, warehouse, and large footprint buildings",
    highlights: ["Proven 40+ year track record", "Superior flexibility in cold weather", "Low maintenance requirements"],
  },
  {
    title: "Standing Seam Metal",
    description: "Concealed-fastener and structural standing seam panels for commercial applications requiring long-term performance, aesthetic quality, and superior wind resistance.",
    bestFor: "Mixed-use, hospitality, retail, and high-visibility commercial",
    highlights: ["50+ year material lifespan", "Class A fire rating", "Exceptional wind uplift resistance"],
  },
  {
    title: "Modified Bitumen",
    description: "Multi-ply modified bitumen systems for flat and low-slope roofs requiring superior waterproofing, puncture resistance, and repairability.",
    bestFor: "Multi-tenant, mechanical equipment areas, high-traffic roofs",
    highlights: ["Excellent puncture resistance", "Multiple redundant waterproofing layers", "Easy to repair and maintain"],
  },
];

const disruptionPoints = [
  { title: "Pre-Project Planning", detail: "We develop a detailed work plan that accounts for your business hours, tenant schedules, and operational sensitivities before mobilizing." },
  { title: "Phased Execution", detail: "Large-footprint projects are executed in phases, ensuring your building remains operational and weather-tight throughout the process." },
  { title: "Noise & Access Management", detail: "We coordinate noisy operations around your peak business hours and manage material staging, equipment placement, and crew access to minimize impact." },
  { title: "Daily Communication", detail: "Your project manager provides daily progress updates and is available to address any concerns in real time — not after the fact." },
];

const propertyManagerPoints = [
  { icon: BarChart3, title: "Capital Planning Support", detail: "Detailed condition reports with remaining life estimates, recommended intervention timelines, and budget projections help you plan capital expenditures with confidence." },
  { icon: FileText, title: "Documentation & Reporting", detail: "Every inspection, repair, and project is documented with photographs, written reports, and warranty information — organized for your records and your ownership group." },
  { icon: Calendar, title: "Scheduled Maintenance Programs", detail: "Bi-annual or quarterly inspection programs that catch small issues early, extend roof life, and demonstrate due diligence to ownership and insurance carriers." },
  { icon: HeartHandshake, title: "Multi-Property Relationships", detail: "We manage roofing programs across multiple properties for several WNC property management groups — providing consistent service, consolidated reporting, and priority scheduling." },
];

const processSteps = [
  { number: "01", title: "Initial Consultation", description: "We meet on-site to understand your building, your operational constraints, and your goals. We listen before we recommend." },
  { number: "02", title: "Roof Assessment & Report", description: "A thorough inspection with detailed documentation, including current condition, identified issues, remaining life estimate, and recommended action." },
  { number: "03", title: "System Recommendation & Proposal", description: "A clear, detailed proposal specifying the recommended system, materials, scope, timeline, warranty, and cost — with alternatives if appropriate." },
  { number: "04", title: "Pre-Construction Coordination", description: "We develop a work plan accounting for your schedule, tenant communication, material staging, equipment access, and phasing strategy." },
  { number: "05", title: "Execution & Quality Control", description: "Our crews execute the scope with daily oversight, quality checkpoints, and proactive communication. We don't leave until it's right." },
  { number: "06", title: "Final Inspection & Handover", description: "Walk-through with your team, complete documentation package, warranty registration, and introduction to our ongoing maintenance program." },
];

const trustProofs = [
  { icon: Shield, value: "Licensed & Insured", label: "Full commercial liability coverage" },
  { icon: BadgeCheck, value: "Manufacturer Certified", label: "CertainTeed commercial applicator" },
  { icon: Clock, value: "Rapid Response", label: "Emergency repair availability" },
  { icon: Award, value: "15+ Years", label: "Commercial roofing experience in WNC" },
  { icon: Building2, value: "Multi-Property", label: "Programs for management groups" },
  { icon: Star, value: "Warrantied Systems", label: "Manufacturer-backed warranties" },
];

const faqs = [
  { q: "What types of commercial buildings do you work on?", a: "We work on retail centers, office buildings, warehouses, industrial facilities, churches, schools, restaurants, multi-family residential, mixed-use buildings, and HOA-managed properties across Western North Carolina. If it has a commercial roof, we're equipped to assess, maintain, repair, or replace it." },
  { q: "Can you work around our business hours?", a: "Absolutely. We develop project-specific work plans that account for your operating schedule, noise sensitivities, and tenant requirements. Many of our commercial projects involve early-morning starts, phased execution, or weekend scheduling to minimize disruption." },
  { q: "Do you offer maintenance contracts?", a: "Yes. We offer bi-annual and quarterly maintenance programs that include scheduled inspections, minor repairs, drain clearing, and detailed condition reporting. These programs extend roof life, maintain warranty compliance, and give property managers documentation for ownership reporting." },
  { q: "What commercial roofing systems do you install?", a: "We install TPO, EPDM, standing seam metal, modified bitumen, and commercial coating systems. The right system depends on your building type, slope, budget, energy goals, and expected service life. We'll recommend the best option for your specific situation." },
  { q: "How long does a commercial roof replacement take?", a: "Timeline depends on building size, system complexity, and weather. A 10,000 sq ft TPO installation typically takes 5–10 working days. Larger or more complex projects are phased accordingly. We provide a detailed timeline during the proposal phase." },
  { q: "Do you handle warranty claims for existing commercial roofs?", a: "If your commercial roof is under manufacturer warranty, we can assess the issue, determine whether it qualifies for warranty coverage, and coordinate with the manufacturer on your behalf. We'll be transparent about what's covered and what isn't." },
  { q: "Can you provide references from other commercial clients?", a: "Yes. We're happy to provide references from property managers, building owners, and general contractors we've worked with across Western North Carolina. We believe our work and our relationships speak for themselves." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const CommercialRoofing = () => {
  return (
    <>
      <SEOHead
        title="Commercial Roofing in WNC | TPO, EPDM & Metal"
        description="Commercial roofing for Western North Carolina property owners and managers. New installations, replacements, maintenance programs, and Rapid emergency response."
        path="/roofing/commercial"
        jsonLd={buildPageSchema({
          type: "commercial",
          service: {
            name: "Commercial Roofing",
            description: "Commercial roofing services for property owners and managers across Western North Carolina.",
            url: "/roofing/commercial",
            areaServed: "Western North Carolina",
          },
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Roofing", url: "/roofing" },
            { name: "Commercial", url: "/roofing/commercial" },
          ],
          faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Roofing", url: "/roofing" },
          { name: "Commercial Roofing", url: "/roofing/commercial" },
        ]}
      />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img width={1600} height={1067} decoding="async" src={heroImg} alt="Commercial roofing project in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col gap-6 mb-8">
                <div className="inline-flex items-center gap-4">
                  <div className="h-10 w-px bg-[hsl(var(--highland-gold)/0.5)]" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-heading font-bold text-white tracking-[0.1em]">Highlander</span>
                    <span className="text-[9px] font-body font-bold text-[hsl(var(--highland-gold)/0.8)] uppercase tracking-[0.2em] -mt-1">Commercial Division</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link to="/roofing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-primary-foreground" /></div>
                    <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/85">Roofing</span>
                  </Link>
                  <ChevronRight className="w-3 h-3 text-primary-foreground/90" />
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))]">Commercial</span>
                </div>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Protect the Asset.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Preserve the Operation.
                </motion.h2>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-body-lg md:text-body-xl text-white/85 max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Commercial roofing for Western North Carolina property owners and managers. New installations, replacements, maintenance programs, and emergency response — executed with operational awareness and professional coordination.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+18285247773" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
              </motion.div>

              {/* Professional credential badges — unique to Commercial */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="mt-10 flex flex-wrap gap-2.5"
              >
                {["Licensed GC", "Fully Insured", "Multi-Property Programs", "Rapid Emergency", "Maintenance Contracts"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-body font-semibold text-primary-foreground/85 border border-white/12 rounded-sm bg-white/5">
                    {badge}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <AnswerBlock
          question="What is commercial roofing, and which buildings need it?"
          answer="Commercial roofing covers low-slope and flat roof systems on business, multi-family, and institutional buildings — including maintenance, repairs, and full replacement. Scheduling around occupancy and keeping the building operational matters as much as the roof detail itself. Highlander serves commercial property owners and managers across Western North Carolina."
          points={["Low-slope and flat roof systems", "Maintenance, repair, and replacement scopes", "Work sequenced around building operations"]}
        />

        {/* ─── OPENING STATEMENT — Corporate split with stat sidebar ─── */}
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
                <div className="w-12 h-[2px] mb-8 bg-primary/30" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6">
                  A commercial roof is infrastructure. It should be managed like one — with planning, precision, and a partner who understands operations.
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body">
                  Highlander provides commercial roofing services for property owners, managers, and businesses across Western North Carolina. From new construction and full replacements to ongoing maintenance programs, we approach every commercial project with the coordination, documentation, and operational awareness that commercial clients require.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-4 bg-secondary border border-border rounded-sm p-6 space-y-5"
              >
                {[
                  { value: "15+", label: "Years Commercial Experience" },
                  { value: "Multi", label: "Property Programs Active" },
                  { value: "Rapid", label: "Emergency Response" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-body mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── CAPABILITIES — Structured grid with bottom accent ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Capabilities</span>
              <h2 className="section-heading mb-4">Commercial Roofing<br className="hidden md:block" /> Services.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {capabilities.map((cap, i) => (
                <motion.div key={cap.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <cap.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{cap.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{cap.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ROOFING SYSTEMS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Systems & Materials</span>
              <h2 className="section-heading mb-4">Commercial Roofing<br className="hidden md:block" /> Systems We Install.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                The right system depends on your building, your budget, and your long-term plan. We recommend based on performance — not margin.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {roofingSystems.map((sys, i) => (
                <motion.div key={sys.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <h3 className="font-heading font-bold text-foreground text-base mb-3 group-hover:text-primary transition-colors">{sys.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body mb-4">{sys.description}</p>
                  <p className="text-xs font-body font-semibold text-primary/80 uppercase tracking-wider mb-3">Best for: {sys.bestFor}</p>
                  <ul className="space-y-1.5">
                    {sys.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-primary/80 flex-shrink-0" />
                        <span className="text-muted-foreground text-xs font-body">{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MINIMIZING DISRUPTION ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Operational Awareness</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Your Business Keeps Running.<br className="hidden md:block" /> We Plan Around It.
                </h2>
                <p className="text-dark-section-foreground/95 text-base font-body max-w-lg mx-auto">
                  Commercial roofing happens on occupied buildings with active operations. We plan every project to minimize disruption to your tenants, customers, and daily business.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {disruptionPoints.map((point, i) => (
                  <motion.div key={point.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 hover:border-dark-section-foreground/12 transition-colors">
                    <h3 className="font-heading font-bold text-dark-section-foreground text-sm mb-2">{point.title}</h3>
                    <p className="text-dark-section-foreground/95 text-[13px] leading-relaxed font-body">{point.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOR PROPERTY MANAGERS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">For Property Owners & Managers</span>
              <h2 className="section-heading mb-4">Built for the Way<br className="hidden md:block" /> You Manage Buildings.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                We understand that property managers need more than a good roofer — you need a partner who provides documentation, communicates proactively, and helps you manage roof assets across your portfolio.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {propertyManagerPoints.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MID CTA ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Managing a commercial roof asset?</h3>
                <p className="text-primary-foreground/85 text-sm font-body">Let's discuss your building, your timeline, and your long-term plan.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Building</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a href="tel:+18285247773" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  <Phone className="w-4 h-4" /> Call Direct
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROJECT COORDINATION PROCESS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Project Coordination</span>
              <h2 className="section-heading mb-4">How a Commercial Project<br className="hidden md:block" /> Works With Highlander.</h2>
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

        {/* ─── TRUST PROOF ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
              <span className="eyebrow mb-3 block">Why Highlander</span>
              <h2 className="section-heading">Commercial Credentials.</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trustProofs.map((proof, i) => (
                <motion.div key={proof.value} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-center p-4 bg-card border border-border rounded-sm">
                  <proof.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="font-heading font-bold text-foreground text-xs mb-0.5">{proof.value}</p>
                  <p className="text-muted-foreground text-[10px] font-body">{proof.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Commercial Roofing FAQs</span>
              <h2 className="section-heading mb-4">Common Questions.</h2>
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
                  <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">Partner With Highlander</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Roof Protects Your Investment.<br className="hidden md:block" /> We Protect Your Roof.
                  </h2>
                  <p className="text-dark-section-foreground/95 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    Whether you're planning a replacement, evaluating a new building, or looking for a long-term maintenance partner — let's have a straightforward conversation about your commercial roofing needs.
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
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Clock, text: "Rapid Emergency Response" },
                      { icon: BadgeCheck, text: "Manufacturer Certified" },
                      { icon: Building2, text: "Multi-Property Programs" },
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
      <ConversionTrustBlock variant="band" category="commercial" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default CommercialRoofing;
