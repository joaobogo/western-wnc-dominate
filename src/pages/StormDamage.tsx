import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, AlertTriangle, Wrench, Droplets, Wind,
  ChevronRight, Eye, Search, ClipboardCheck, Hammer,
  BadgeCheck, CloudLightning, TreePine, FileText, Camera,
  Replace, ShieldCheck, Layers, MessageSquare, Zap
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import StormResponseGuide from "@/components/StormResponseGuide";

import heroImg from "@/assets/gallery/asphalt-005.webp";
import RealWorkWidget from "@/components/RealWorkWidget";
import AnswerBlock from "@/components/seo/AnswerBlock";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import CostContextBlock from "@/components/conversion/CostContextBlock";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import AttributedReviews from "@/components/trust/AttributedReviews";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import ServiceInternalLinks from "@/components/ServiceInternalLinks";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const damageTypes = [
  {
    icon: Wind,
    title: "Wind Damage",
    detail: "Mountain ridgelines and exposed elevations experience sustained gusts that lift, crack, and strip shingles — sometimes without visible ground-level evidence. Wind damage often appears as lifted edges, creased shingles, or exposed underlayment on slopes facing prevailing weather.",
  },
  {
    icon: CloudLightning,
    title: "Hail Impact",
    detail: "Hail doesn't always punch holes. More often it bruises shingles — breaking the granule surface and accelerating UV degradation. These impacts may be invisible from the ground but are clearly identifiable during a professional roof inspection.",
  },
  {
    icon: Droplets,
    title: "Heavy Rain & Water Intrusion",
    detail: "Prolonged mountain rain events test every seal, flashing joint, and penetration on your roof. Water follows the path of least resistance — and after a storm, that path may have changed. Interior stains, attic moisture, and soffit dripping all indicate breach points.",
  },
  {
    icon: TreePine,
    title: "Falling Debris & Tree Impact",
    detail: "Overhanging limbs, wind-thrown branches, and fallen trees cause punctures, structural damage, and displaced flashing. Even smaller branches can crack ridge caps or dislodge vent covers, creating entry points for water during the next rain.",
  },
];

const afterStormSteps = [
  {
    number: "01",
    title: "Stay Safe — Assess from the Ground",
    description: "Do not climb onto your roof after a storm. Look for visible damage from the ground: missing shingles, displaced flashing, fallen branches, or debris in gutters. Photograph anything you notice.",
  },
  {
    number: "02",
    title: "Check Interior Spaces",
    description: "Walk your attic if accessible. Look for daylight through the decking, wet insulation, or water stains on sheathing. Check ceilings and walls in upper floors for new stains or dripping.",
  },
  {
    number: "03",
    title: "Document Everything",
    description: "Photograph damage from multiple angles — exterior and interior. Note the date, time, and type of storm. This documentation becomes critical for insurance purposes and professional assessment.",
  },
  {
    number: "04",
    title: "Call a Trusted Local Roofer",
    description: "Contact Highlander for a professional storm assessment. We respond rapidly for storm calls — and same-day for emergencies involving active water intrusion or structural compromise.",
  },
  {
    number: "05",
    title: "Do Not Sign Anything from Door-Knockers",
    description: "After major storms, out-of-area contractors canvass neighborhoods aggressively. Do not sign contracts, agreements, or assignments of benefits with anyone who shows up unsolicited. Work with a local company you can verify.",
  },
];

const assessmentProcess = [
  {
    icon: Eye,
    title: "Full Roof & Property Inspection",
    detail: "We inspect every slope, penetration, flashing point, ridge, valley, and transition — not just the area where damage is visible. Storm damage is rarely limited to one spot.",
  },
  {
    icon: Camera,
    title: "Comprehensive Photo Documentation",
    detail: "Every finding is photographed with detail and context shots. This documentation serves your insurance claim and gives you a permanent record of what was found and where.",
  },
  {
    icon: ClipboardCheck,
    title: "Written Damage Report",
    detail: "You receive a clear, written summary of all damage identified — categorized by severity, location, and recommended action. No vague language, no inflated urgency.",
  },
  {
    icon: MessageSquare,
    title: "Honest Recommendation",
    detail: "We tell you what needs immediate attention, what can be monitored, and whether repair or replacement is the better path. If your roof weathered the storm well, we'll tell you that too.",
  },
];

const repairVsReplace = {
  repair: [
    "Damage is limited to one slope or a specific area",
    "Missing shingles can be matched and replaced in-kind",
    "Flashing or penetration damage is isolated and repairable",
    "Underlying decking and structure are sound",
    "The roof is under 15 years old with no prior systemic issues",
  ],
  replace: [
    "Multiple slopes show widespread shingle damage",
    "Hail has bruised shingles across large areas, compromising granule integrity",
    "Decking is soft, water-damaged, or structurally compromised",
    "The roof was already aging and the storm accelerated its timeline",
    "Insurance assessment supports full replacement scope",
  ],
};

const insurancePoints = [
  "Complete photo documentation of all identified damage with measurements",
  "Written damage report with findings organized by location and severity",
  "Material and labor scope documentation for your adjuster's review",
  "On-site availability to walk the roof with your insurance adjuster",
  "Supplemental documentation if the initial adjuster assessment misses covered damage",
];

const faqs = [
  { q: "How quickly can you inspect my roof after a storm?", a: "For active leaks and structural damage, we offer same-day emergency response including temporary tarping. For non-emergency storm assessments, we typically schedule on a same-day or next-day basis of your call. After major regional storm events, timelines may extend slightly due to volume, but we prioritize by severity." },
  { q: "Will you help with my insurance claim?", a: "We provide thorough documentation — photographs, written damage reports, and material/labor scopes — that supports your claim. We'll meet with your insurance adjuster on-site and provide supplemental documentation if the initial assessment misses covered damage. We do not file claims on your behalf or act as public adjusters." },
  { q: "Should I get a tarp on my roof right away?", a: "If you have active water entering your home or visible structural damage, yes — temporary tarping prevents further interior damage and is typically covered by insurance as an emergency mitigation measure. Call us immediately and we'll dispatch a crew." },
  { q: "How do I know if storm chasers are legitimate?", a: "Legitimate contractors don't go door-to-door pressuring you to sign contracts hours after a storm. Check for a permanent local address, verifiable licensing and insurance, manufacturer certifications, and an established track record in Western North Carolina. If someone offers to 'waive your deductible,' that's a red flag — it's illegal in North Carolina." },
  { q: "What if my insurance denies the claim?", a: "If we've documented legitimate storm damage and the claim is denied, we can provide additional documentation and meet with a re-inspector. We'll give you an honest assessment of whether the denial seems justified or whether further pursuit is warranted. We never pressure homeowners to file claims for damage we don't believe exists." },
  { q: "Can hail damage be invisible from the ground?", a: "Absolutely. Hail bruising — where the impact breaks the granule bond without visibly dislodging granules — is extremely common and virtually invisible from ground level. It accelerates aging and voids certain warranty protections. A professional roof inspection is the only reliable way to identify it." },
  { q: "Do I need to replace my whole roof if only part was damaged?", a: "Not necessarily. If damage is isolated to one area and we can match your existing materials, targeted repair is often the right approach. However, if damage is widespread or your roof was already near end-of-life, the storm may have simply accelerated a timeline that was already approaching. We'll give you an honest assessment either way." },
  { q: "What if a tree fell on my roof?", a: "Tree impacts require immediate assessment for structural integrity. We can dispatch same-day for tree damage — including coordination with tree removal services if the tree is still in contact with the structure. Do not attempt to remove a tree from your roof yourself. Temporary tarping over the impact area prevents further water damage while permanent repairs are planned." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const StormDamage = () => {
  return (
    <>
      <SEOHead
        title="Storm Damage Roof Repair in Western NC"
        description="Rapid storm response across Western North Carolina. Professional damage assessment, insurance documentation, and honest guidance from a trusted local team."
        path="/roofing/storm-damage"
        jsonLd={[
          serviceSchema({ name: "Storm Damage Roofing", description: "Rapid storm damage response, assessment, and repair across Western North Carolina.", url: "/roofing/storm-damage" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Storm Damage", url: "/roofing/storm-damage" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Storm Damage", url: "/roofing/storm-damage" }]} />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img width={1600} height={1067} decoding="async" src={heroImg} alt="Storm damage roof assessment in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/roofing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-primary-foreground" /></div>
                  <span className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/95">Roofing</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/90" />
                <span className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))]">Storm Damage</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  After the Storm.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Before the Next One.
                </motion.h2>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-body-lg md:text-body-xl text-white/85 max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Rapid storm response across Western North Carolina. Professional damage assessment, complete documentation, and honest guidance — from a local team that's been here through every storm season.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4" data-gtm-location="hero">
                {/* Primary action on storm pages is the phone call (see page-cta-hierarchy.ts) */}
                <a href="tel:+18285247773" className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                  <Phone className="w-5 h-5" /> (828) 524-7773
                </a>
                <Link to="/consultation" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  Request Storm Assessment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              {/* One-line reason to call instead of writing (CRO Prompt 12) */}
              <p className="mt-3 text-[13px] md:text-[14px] font-body text-white/80 max-w-xl leading-snug">
                Storm damage moves fast — calling gets a real person who can prioritize your assessment and start the insurance documentation today.
              </p>

              {/* Emergency pulse — unique to Storm Damage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="mt-10 flex items-center gap-4 p-4 bg-red-900/20 border border-red-500/20 rounded-sm max-w-md"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-primary-foreground">Rapid Emergency Response Active</div>
                  <div className="text-[11px] text-primary-foreground/85 font-body uppercase tracking-wider">Call (828) 524-7773 for immediate storm assistance</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <AnswerBlock
          question="What is storm damage roofing work in Western North Carolina?"
          answer="Storm damage work starts with documenting wind, hail, or falling-tree damage, protecting the home from further water intrusion, and then restoring the roof system. In the mountains, damage is often concentrated on exposed slopes and at flashing points rather than spread evenly. Highlander inspects, documents, and repairs storm damage across the region."
          points={["Damage documentation for your insurance claim", "Temporary protection to stop further water intrusion", "Full repair or replacement once scope is set"]}
        />

        {/* ─── OPENING STATEMENT ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
              <div className="w-12 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                Western North Carolina weather doesn't warn you. It tests your roof — and sometimes it wins.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mb-4">
                From high-altitude wind events along the Blue Ridge to summer hail in the foothills, storm damage in our region is both common and uniquely challenging. Highlander has responded to hundreds of storm calls across Buncombe, McDowell, Burke, and surrounding counties — and we bring the same calm, thorough approach to every one. No panic, no pressure — just honest assessment, professional documentation, and clear options.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ─── HOW STORM DAMAGE SHOWS UP — Amber-accented urgency cards ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block text-amber-600 dark:text-amber-400">Types of Storm Damage</span>
              <h2 className="section-heading mb-4">How Storm Damage<br className="hidden md:block" /> Shows Up on Your Roof.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Not all storm damage is obvious. Some of the most consequential damage is invisible from ground level — which is why professional assessment matters.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {damageTypes.map((type, i) => (
                <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm overflow-hidden hover:border-amber-500/20 card-lift">
                  <div className="h-[2px] w-full bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0" />
                  <div className="p-6 md:p-7">
                    <div className="w-10 h-10 rounded-sm bg-amber-500/6 flex items-center justify-center mb-5 group-hover:bg-amber-500/12 transition-colors">
                      <type.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{type.title}</h3>
                    <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{type.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT TO DO AFTER A STORM ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Homeowner Guide</span>
              <h2 className="section-heading mb-4">What to Do<br className="hidden md:block" /> After a Storm.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                The first 48 hours after a storm matter. Here's what we recommend — and what to avoid.
              </p>
            </motion.div>

            <div className="space-y-4">
              {afterStormSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`group relative bg-card border rounded-sm p-5 md:p-6 card-lift ${i === 4 ? 'border-destructive/15 bg-destructive/[0.02]' : 'border-border hover:border-primary/15'}`}>
                  <div className="flex items-start gap-4 md:gap-5">
                    <span className="text-3xl font-heading font-bold text-border/60 select-none flex-shrink-0 w-8 group-hover:text-primary/15 transition-colors">{step.number}</span>
                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{step.description}</p>
                    </div>
                  </div>
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
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Storm hit your area recently?</h3>
                <p className="text-primary-foreground/85 text-sm font-body">We respond rapidly. Same-day for emergencies with active water intrusion.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a href="tel:+18285247773" className="cta-gradient text-accent-foreground font-heading font-bold text-sm px-8 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
                <Link to="/consultation" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  Request Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STORM ASSESSMENT PROCESS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Our Process</span>
              <h2 className="section-heading mb-4">How Highlander Assesses<br className="hidden md:block" /> Storm Damage.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                A structured, professional assessment designed to give you — and your insurance company — a complete picture of what happened and what needs to happen next.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {assessmentProcess.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INSURANCE SUPPORT ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Insurance Support</span>
                <h2 className="section-heading mb-5">We Document.<br /> You Decide.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
                  Filing an insurance claim after storm damage can feel overwhelming. While we are not public adjusters and don't file claims on your behalf, we provide the professional documentation and on-site support that gives your claim the best chance of reflecting the full scope of damage.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  Our documentation is thorough, accurate, and designed to communicate clearly with insurance adjusters — because we've been through this process hundreds of times with homeowners across the region.
                </p>
              </motion.div>

              <div className="lg:col-span-3">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-lg">What We Provide for Your Claim</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {insurancePoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-primary/80 flex-shrink-0" />
                        <span className="text-muted-foreground text-[13px] font-body leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-border">
                    <p className="text-muted-foreground text-xs font-body italic">
                      Note: Highlander Roofing provides documentation and contractor support for insurance claims. We do not act as public adjusters, and we never recommend filing claims for damage we have not verified.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── REPAIR VS. REPLACEMENT ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Storm Recovery Guidance</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Repair the Damage.<br className="hidden md:block" /> Or Replace the Roof.
                </h2>
                <p className="text-dark-section-foreground/95 text-base font-body max-w-lg mx-auto">
                  The right answer depends on the extent of damage, your roof's age, and your long-term plans. Here's how we help you decide.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-5">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-dark-section-foreground/6 rounded-sm overflow-hidden">
                  <div className="h-[2px] w-full bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.4)] to-[hsl(var(--heritage-green)/0)]" />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-dark-section-foreground text-lg">Targeted Repair</h3>
                    </div>
                    <ul className="space-y-3">
                      {repairVsReplace.repair.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-primary/80 flex-shrink-0" />
                          <span className="text-dark-section-foreground/85 text-[13px] font-body leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/roofing/roof-repair" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary mt-5 hover:opacity-80 transition-opacity font-body">
                      Learn About Roof Repair <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="border border-dark-section-foreground/6 rounded-sm overflow-hidden">
                  <div className="h-[2px] w-full bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.4)] to-[hsl(var(--highland-gold)/0)]" />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center">
                        <Replace className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                      </div>
                      <h3 className="font-heading font-bold text-dark-section-foreground text-lg">Full Replacement</h3>
                    </div>
                    <ul className="space-y-3">
                      {repairVsReplace.replace.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-[hsl(var(--highland-gold)/0.85)] flex-shrink-0" />
                          <span className="text-dark-section-foreground/85 text-[13px] font-body leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/roofing/roof-replacement" className="group inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--gold-ink))] mt-5 hover:opacity-80 transition-opacity font-body">
                      Learn About Roof Replacement <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MID CTA ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Storm damage? We respond rapidly.</h3>
                <p className="text-primary-foreground/85 text-sm font-body">Professional assessment, complete documentation, honest guidance — from a local team.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a href="tel:+18285247773" className="cta-gradient text-accent-foreground font-heading font-bold text-sm px-8 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <Phone className="w-4 h-4" /> (828) 524-7773
                </a>
                <Link to="/consultation" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  Request Storm Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST & URGENCY BALANCE ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="text-center mb-10 md:mb-12">
                <span className="eyebrow mb-3 block">Local. Trusted. Here to Stay.</span>
                <h2 className="section-heading mb-4">Why Highlander —<br className="hidden md:block" /> Especially After a Storm.</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {[
                  { icon: Shield, title: "Licensed, Insured, and Permanent", detail: "We're not a storm-chasing crew that appears after weather events and disappears after cashing checks. Highlander is a licensed, insured, locally established roofing company with a permanent address in Western North Carolina." },
                  { icon: Clock, title: "Rapid Emergency Response", detail: "Active leaks and structural damage don't wait for business hours. Our emergency response team is prioritized for same-day response for tarping, water mitigation, and critical stabilization — because the next rain is always coming." },
                  { icon: BadgeCheck, title: "Manufacturer Certified", detail: "As CertainTeed certified installers, our repair and replacement work meets manufacturer standards — which matters when warranty coverage is part of the conversation after storm damage." },
                  { icon: Zap, title: "Hundreds of Storm Calls Answered", detail: "From the 2020 derecho to annual summer hail events, we've assessed and repaired storm damage on hundreds of roofs across the region. We know what WNC weather does to roofs — and how to fix it properly." },
                ].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                    <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── INTERACTIVE STORM ASSESSMENT ─── */}
        <StormResponseGuide />

        {/* ─── FAQS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Storm Damage FAQs</span>
              <h2 className="section-heading mb-4">Common Questions After<br className="hidden md:block" /> Storm Damage.</h2>
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
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">Don't Wait for the Next Storm</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Roof Already Took the Hit.<br className="hidden md:block" /> Let's Make Sure It's Still Protecting You.
                  </h2>
                  <p className="text-dark-section-foreground/95 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    A professional storm assessment takes less than an hour and gives you the clarity to make confident decisions — whether that means a simple repair, a full replacement, or the reassurance that your roof came through just fine.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <a href="tel:+18285247773" className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all tracking-wide">
                      <Phone className="w-5 h-5" /> (828) 524-7773
                    </a>
                    <Link to="/consultation" className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all">
                      Request Storm Assessment
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Clock, text: "Rapid Emergency Response" },
                      { icon: Award, text: "CertainTeed Certified" },
                      { icon: Star, text: "Local WNC Team" },
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
        <ServiceInternalLinks title="Storm Damage Response" slug="storm-damage" />
      </main>
      <RealWorkWidget />
        <CommonConcerns />
        <CostContextBlock serviceLabel="storm damage" />
      <section className="section-padding bg-muted/20">
        <div className="container-tight">
          <AttributedReviews category="storm" heading="What homeowners say about our storm damage work" />
        </div>
      </section>
      <ConversionTrustBlock variant="band" category="storm" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default StormDamage;
