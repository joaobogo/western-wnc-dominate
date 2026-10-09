import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
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
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import ServiceSubtopics from "@/components/service/ServiceSubtopics";
import { stormSubtopics } from "@/data/service-subtopics";

import heroImg from "@/assets/gallery/asphalt-005.webp";
import heroImgAvif from "@/assets/gallery/asphalt-005.webp?w=640;960;1280;1600&format=avif&as=srcset";
import heroImgWebp from "@/assets/gallery/asphalt-005.webp?w=640;960;1280;1600&format=webp&as=srcset";
import HeroImage from "@/components/media/HeroImage";
import AnswerBlock from "@/components/seo/AnswerBlock";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import TieredOffer from "@/components/conversion/TieredOffer";
import CostOfWaiting from "@/components/conversion/CostOfWaiting";
import CostContextBlock from "@/components/conversion/CostContextBlock";
import SchedulingReality from "@/components/conversion/SchedulingReality";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import AttributedReviews from "@/components/trust/AttributedReviews";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import ServiceInternalLinks from "@/components/ServiceInternalLinks";
import UrgentActionSteps from "@/components/emergency/UrgentActionSteps";
import InsuranceDocHelp from "@/components/emergency/InsuranceDocHelp";
import RepairPhotoProof from "@/components/emergency/RepairPhotoProof";
import FastLeadForm from "@/components/FastLeadForm";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const damageTypes = [
  {
    icon: Wind,
    title: "Wind Damage",
    detail: "Mountain ridgelines and exposed elevations experience sustained gusts that lift, crack, and strip shingles, weakening the seal between courses — sometimes without visible ground-level evidence. A roof damaged by high winds often shows lifted edges, creased tabs, or exposed underlayment on slopes facing prevailing weather.",
  },
  {
    icon: CloudLightning,
    title: "Hail Impact",
    detail: "Hail doesn't always punch holes. More often it bruises shingles — breaking the granule surface and accelerating UV degradation. These impacts may be invisible from the ground but are clear to a trained eye up close.",
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
    title: "Stay Safe: Assess from the Ground",
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
    description: "Call to explain what happened or send a request to have the roof looked at. Roofers get busy after major storms, so Highlander will discuss the appropriate next step based on the damage, weather, safety, and current scheduling.",
  },
  {
    number: "05",
    title: "Do Not Sign Anything from Door-Knockers",
    description: "After major storms, out-of-area storm damage roof repair contractors canvass neighborhoods aggressively. Do not sign contracts, agreements, or assignments of benefits with anyone who shows up unsolicited. Work with local pros you can verify.",
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
    detail: "You receive a clear, written summary of all damage identified — categorized by severity, location, and recommended action. We list pre-existing wear separately. No vague language, no inflated urgency.",
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
  { q: "What should I do after storm damage?", a: "If water is entering the home, protect the interior if you can do so safely and call Highlander during office hours. Outside office hours, send a request for follow-up. Do not climb onto a wet or damaged roof. Assessment and temporary protection depend on conditions, safety, and availability." },
  { q: "Will you help with my insurance claim?", a: "We provide thorough documentation — photographs, written damage reports, and material/labor scopes — that supports your claim. We'll meet with your insurance adjuster on-site and provide supplemental documentation if the initial assessment misses covered damage. We do not file claims on your behalf or act as public adjusters." },
  { q: "Should I get a tarp on my roof right away?", a: "Temporary weather protection can help limit additional water entry, but it should only be installed when conditions are safe. Call Highlander during office hours to discuss the situation, and do not climb onto a wet or damaged roof yourself." },
  { q: "How do I know if storm chasers are legitimate?", a: "Legitimate contractors don't go door-to-door pressuring you to sign contracts hours after a storm. When you compare local contractors, check for a permanent address, verifiable licensing and insurance, manufacturer certifications, and an established track record in Western North Carolina. If someone offers to 'waive your deductible,' that's a red flag — it's illegal in North Carolina." },
  { q: "What if my insurance denies the claim?", a: "If we've documented legitimate storm damage and the claim is denied, we can provide additional documentation and meet with a re-inspector. We'll give you an honest assessment of whether the denial seems justified or whether further pursuit is warranted. We never pressure homeowners to file claims for damage we don't believe exists." },
  { q: "Can hail damage be invisible from the ground?", a: "Absolutely. Hail bruising — where the impact breaks the granule bond without visibly dislodging granules — is extremely common and virtually invisible from ground level. It accelerates aging and voids certain warranty protections. A professional roof inspection is the only reliable way to identify it." },
  { q: "Do I need to replace my whole roof if only part was damaged?", a: "Not necessarily. If damage is isolated to one area and we can match your existing materials, targeted repair is often the right approach. However, if damage is widespread or your roof was already near end-of-life, the storm may have simply accelerated a timeline that was already approaching. We'll give you an honest assessment either way." },
  { q: "What if a tree fell on my roof?", a: "Keep people away from the affected area and do not climb onto the roof or attempt to remove the tree yourself. Contact the appropriate emergency service if there is an immediate safety hazard, then call Highlander during office hours to discuss roof assessment and repair options." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const StormDamage = () => {
  return (
    <>
      <SEOHead
        title="Storm Damage Roof Repair in Western NC | Highlander"
        description="Storm damage roof assessment and repair in Western North Carolina, with contractor documentation and clear repair or replacement guidance."
        path="/roofing/storm-damage"
        jsonLd={[
          serviceSchema({ name: "Storm Damage Roofing", description: "Storm damage assessment and repair guidance across Western North Carolina.", url: "/roofing/storm-damage" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Storm Damage", url: "/roofing/storm-damage" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Storm Damage", url: "/roofing/storm-damage" }]} />
      <main id="main-content">
        <ServicePageTemplate
          subtopics={
            <ServiceSubtopics
              heading="The storm damage repair process, from the storm to the settled claim"
              intro="Storm work runs in a sequence. Each stage has its own scope, and you should know which one you are in."
              items={stormSubtopics}
            />
          }
          alternateSurfaces={false}
          hero={
            <>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <HeroImage src={heroImg} avifSrcSet={heroImgAvif} webpSrcSet={heroImgWebp} alt="Storm damage roof assessment in Western North Carolina" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 0.4, delay: 0.3 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 hero-clears-header pb-24 md:pb-32">
            <div className="max-w-3xl">

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Storm Damage Roof Repair in Western NC
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  After the Storm. Before the Next One.
                </motion.h2>
              </div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="text-body-lg md:text-body-xl text-white/85 max-w-xl mb-10 leading-relaxed font-body font-medium drop-shadow-sm">
                Storm damage repair across Western North Carolina: a documented assessment of wind or hail damage, repair or replacement guidance, and a local team you can contact directly.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4" data-gtm-location="hero">
                {/* Primary action on storm pages is the phone call (see page-cta-hierarchy.ts) */}
                <a href={PHONE_TEL} className="btn btn-primary btn-lg group relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Phone className="w-4 h-4 relative" aria-hidden="true" /> <span className="relative">{PHONE_DISPLAY}</span>
                </a>
                <Link to="/request-inspection" className="btn btn-secondary btn-md btn-on-dark group">
                  Get My Storm Damage Documented
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </motion.div>
              {/* One-line reason to call instead of writing (CRO Prompt 12) */}
              <p className="mt-3 text-body-xs md:text-body-xs font-body text-white/80 max-w-xl leading-snug">
                Storm damage can be stressful. Call during office hours to explain what happened, or send a request so the team can discuss the appropriate next step.
              </p>

              {/* Emergency pulse — unique to Storm Damage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-10 flex items-center gap-4 p-4 bg-alert/20 border border-alert/20 rounded-sm max-w-md"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 bg-alert rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-alert rounded-full animate-ping opacity-75" />
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-primary-foreground">Storm Damage Support</div>
                  <div className="text-caption text-primary-foreground font-body uppercase tracking-wider">Call {PHONE_DISPLAY} during office hours for storm damage support</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
            </>
          }
          quickAnswer={
            <>
        <UrgentActionSteps variant="storm" />
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-2xl">
            <div className="mb-6 text-center">
              <span className="eyebrow mb-3 block">No Active Water Intrusion?</span>
              <h2 className="section-heading mb-3">Request a Documented Damage Assessment.</h2>
              <p className="text-muted-foreground text-body-sm font-body leading-relaxed">
                If nothing is leaking right now, send four quick fields and we&apos;ll schedule an
                inspection with photo documentation for your records or your claim.
              </p>
            </div>
            <FastLeadForm
              ctaLabel="Get My Storm Damage Documented"
              serviceLabel="Storm Damage"
              urgencyOptions={["Water coming in now", "Within 48 hours", "This week", "Documenting for insurance"]}
            />
          </div>
        </section>
        <InsuranceDocHelp />
        <AnswerBlock
          question="What is storm damage roof repair in Western NC?"
          answer="Storm damage work starts with documenting the damage caused by wind, hail, or falling trees, protecting the home from further water intrusion, and then restoring the roof system. In the mountains, damage is often concentrated on exposed slopes and at flashing points rather than spread evenly. Highlander inspects, documents, and repairs storm-related roof damage across Western North Carolina."
          points={["Damage documentation for your insurance claim", "Temporary protection to stop further water intrusion", "Full repair or replacement once scope is set"]}
        />
            </>
          }
          whatWeDo={
            <>
        {/* ─── OPENING STATEMENT ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center">
              <div className="w-12 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
              <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                Western North Carolina weather doesn't warn you. It tests your roof, and sometimes it wins.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mb-4">
                From strong winds along the Blue Ridge to summer hail in the foothills, storm damage in our region is both common and uniquely challenging. Highlander responds to storm damage calls across Western North Carolina with the same calm, thorough approach every time. No panic, no pressure: just honest answers, professional documentation, and clear options.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>
        {/* ─── HOW STORM DAMAGE SHOWS UP — Amber-accented urgency cards ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))] dark:text-highland-gold">Types of Storm Damage</span>
              <h2 className="section-heading mb-4">How Storm Damage<br className="hidden md:block" /> Shows Up on Your Roof.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Not all storm damage is obvious. Some of the most consequential damage is invisible from ground level — which is why professional assessment matters.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {damageTypes.map((type, i) => (
                <motion.div key={type.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm overflow-hidden hover:border-highland-gold/20 card-lift">
                  <div className="h-[2px] w-full bg-gradient-to-r from-highland-gold/0 via-highland-gold/30 to-highland-gold/0" />
                  <div className="p-6 md:p-7">
                    <div className="w-10 h-10 rounded-sm bg-highland-gold/6 flex items-center justify-center mb-5 group-hover:bg-highland-gold/12 transition-colors">
                      <type.icon className="w-5 h-5 text-[hsl(var(--gold-ink))] dark:text-highland-gold" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-[hsl(var(--gold-ink))] dark:group-hover:text-highland-gold transition-colors">{type.title}</h3>
                    <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{type.detail}</p>
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
                      <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{step.description}</p>
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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Storm hit your area recently?</h3>
                <p className="text-primary-foreground text-sm font-body">Call during office hours for active leaks or storm damage; outside office hours, send a request for follow-up.</p>
              </div>
              <div className="flex w-full min-w-0 flex-wrap justify-center gap-3 lg:w-auto lg:justify-end lg:flex-shrink-0">
                <a href={PHONE_TEL} className="btn btn-primary btn-md">
                  <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
                <Link to="/request-inspection" className="btn btn-secondary btn-md btn-on-dark">
                  See What My Roof Needs
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* ─── REPAIR VS. REPLACEMENT ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} />
          <div className="section-padding">
            <div className="container-tight max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Storm Recovery Guidance</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Repair the Damage.<br className="hidden md:block" /> Or Replace the Roof.
                </h2>
                <p className="text-dark-section-foreground text-base font-body max-w-lg mx-auto">
                  Whether to repair or replace depends on the extent of damage, your roof's age, and your long-term plans. Here's how we help you decide.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-5">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-dark-section-border rounded-sm overflow-hidden">
                  <div className="h-[2px] w-full bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.4)] to-[hsl(var(--heritage-green)/0)]" />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center">
                        <Wrench className="w-4 h-4 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-heading font-bold text-dark-section-foreground text-lg">Targeted Repair</h3>
                    </div>
                    <ul className="space-y-3">
                      {repairVsReplace.repair.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-primary/80 flex-shrink-0" aria-hidden="true" />
                          <span className="text-dark-section-foreground text-body-xs font-body leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/roofing/roof-repair" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary mt-5 hover:opacity-80 transition-opacity font-body">
                      Learn About Roof Repair <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="border border-dark-section-border rounded-sm overflow-hidden">
                  <div className="h-[2px] w-full bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.4)] to-[hsl(var(--highland-gold)/0)]" />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center">
                        <Replace className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      </div>
                      <h3 className="font-heading font-bold text-dark-section-foreground text-lg">Full Replacement</h3>
                    </div>
                    <ul className="space-y-3">
                      {repairVsReplace.replace.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-[hsl(var(--highland-gold)/0.85)] flex-shrink-0" aria-hidden="true" />
                          <span className="text-dark-section-foreground text-body-xs font-body leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/roofing/roof-replacement" className="group inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--gold-ink))] mt-5 hover:opacity-80 transition-opacity font-body">
                      Learn About Roof Replacement <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Need storm damage roof repair services? Start with a clear next step.</h3>
                <p className="text-primary-foreground text-sm font-body">Professional assessment, complete documentation, honest guidance — from a local team.</p>
              </div>
              <div className="flex w-full min-w-0 flex-wrap justify-center gap-3 lg:w-auto lg:justify-end lg:flex-shrink-0">
                <a href={PHONE_TEL} className="btn btn-primary btn-md">
                  <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
                <Link to="/request-inspection" className="btn btn-secondary btn-md btn-on-dark">
                  Get My Storm Damage Documented
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
            </>
          }
          costContext={
            <>
        <CostOfWaiting variant="storm" />
        <CostContextBlock serviceLabel="storm damage" variant="storm" />
        <SchedulingReality serviceLabel="storm damage" />
            </>
          }
          process={
            <>
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
                <motion.div key={step.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* ─── INSURANCE SUPPORT ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Insurance Support</span>
                <h2 className="section-heading mb-5">We Document.<br /> You Decide.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
                  Filing an insurance claim after storm damage can feel overwhelming. While we are not public adjusters and do not decide coverage, we can provide contractor documentation and on-site information about the observed damage and proposed work.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  Our goal is to document the roof condition and proposed work clearly so you have useful contractor information for conversations with your carrier or adjuster.
                </p>
              </motion.div>

              <div className="lg:col-span-3">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-lg">What We Provide for Your Claim</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {insurancePoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-primary/80 flex-shrink-0" aria-hidden="true" />
                        <span className="text-muted-foreground text-body-xs font-body leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-border">
                    <p className="text-muted-foreground text-xs font-body italic">
                      Note: Highlander Building Services provides documentation and contractor support for insurance claims. We do not act as public adjusters, and we never recommend filing claims for damage we have not verified.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        {/* ─── INTERACTIVE STORM ASSESSMENT ─── */}
        <StormResponseGuide />
            </>
          }
          proof={
            <>
        <RepairPhotoProof variant="storm" excludeImages={[heroImg]} />
        {/* ─── TRUST & URGENCY BALANCE ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-10 md:mb-12">
                <span className="eyebrow mb-3 block">Local. Trusted. Here to Stay.</span>
                <h2 className="section-heading mb-4">Why Highlander:<br className="hidden md:block" /> Especially After a Storm.</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {[
                  { icon: Shield, title: "Licensed, Insured, and Permanent", detail: "We're not a storm-chasing crew that appears after weather events and disappears after cashing checks, and we don't specialize in storm damage alone. Highlander is a licensed, insured, locally established roofing company with a permanent address in Western North Carolina." },
                  { icon: Clock, title: "Urgent Roof Guidance", detail: "For active leaks or storm damage, call during office hours to explain what is happening. Outside office hours, send a request for follow-up. Temporary protection depends on conditions, safety, and availability." },
                  { icon: BadgeCheck, title: "Manufacturer Certified", detail: "As CertainTeed certified installers, our repair and replacement work meets manufacturer standards — which matters when warranty coverage is part of the conversation after storm damage." },
                  { icon: Zap, title: "Mountain Storm Experience", detail: "Highlander works on mountain roofs exposed to wind, heavy rain, hail, fallen debris, and seasonal weather across Western North Carolina." },
                ].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                    <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        <WhoShowsUp />
        <TieredOffer context="storm-damage" primaryLabel="Get My Storm Damage Assessed" />
      <section className="section-padding bg-muted/20">
        <div className="container-tight">
          <AttributedReviews services={["storm-damage"]} heading="What homeowners say about our storm damage work" />
        </div>
      </section>
      <ConversionTrustBlock variant="band" category="storm" />
            </>
          }
          faq={
            <>
        {/* ─── FAQS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Storm Damage FAQs</span>
              <h2 className="section-heading mb-4">Frequently Asked Questions After{" "}<br className="hidden md:block" /> Storm Damage.</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-flat transition-all duration-300">
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                      <span className="font-heading font-semibold text-foreground text-body-sm leading-snug text-left">{faq.q}</span>
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
            </>
          }
          coverage={
            <>
        <ServiceInternalLinks title="Storm Damage Response" slug="storm-damage" />
            </>
          }
          cta={
            <>
        <CommonConcerns />
        {/* ─── CLOSING CTA ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">Don't Wait for the Next Storm</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    Your Roof Already Took the Hit.<br className="hidden md:block" /> Let's Make Sure It's Still Protecting You.
                  </h2>
                  <p className="text-dark-section-foreground text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    A professional storm damage assessment takes less than an hour and gives you the clarity to make confident decisions — whether that means a simple repair, a full replacement, or the reassurance that your roof came through just fine.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <a href={PHONE_TEL} className="btn btn-primary btn-lg group">
                      <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
                    </a>
                    <Link to="/request-inspection" className="btn btn-secondary btn-lg btn-on-dark group">
                      Get My Storm Damage Documented
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-border">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Clock, text: "Storm Damage Support" },
                      { icon: Award, text: "CertainTeed Certified" },
                      { icon: Star, text: "Local WNC Team" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                        <span className="text-dark-section-foreground text-xs font-body font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
            </>
          }
          afterCta={
            <>
            </>
          }
        />
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default StormDamage;
