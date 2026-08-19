import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Clock, Star, Home,
  CheckCircle, AlertTriangle, Wrench, Droplets, Wind,
  ChevronRight, Eye, Search, ClipboardCheck, Hammer,
  BadgeCheck, ShieldCheck, ThermometerSun, Layers,
  Replace, TrendingDown, Camera, MessageSquare
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageContext from "@/components/PageContext";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";

import metalRoof from "@/assets/gallery/metal-005.webp";
import asphalt003 from "@/assets/gallery/asphalt-003.webp";
import asphalt003Avif from "@/assets/gallery/asphalt-003.webp?w=640;960;1280;1600&format=avif&as=srcset";
import asphalt003Webp from "@/assets/gallery/asphalt-003.webp?w=640;960;1280;1600&format=webp&as=srcset";
import HeroImage from "@/components/media/HeroImage";
import RelatedLinks from "@/components/RelatedLinks";
import RealWorkWidget from "@/components/RealWorkWidget";
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
import HeroTrustLine from "@/components/hero/HeroTrustLine";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const commonProblems = [
  { icon: Droplets, title: "Active Leaks & Water Intrusion", detail: "Water stains on ceilings, dripping during rain, or moisture in the attic. We trace every leak to its true origin point — which is often far from where the water appears inside." },
  { icon: Wind, title: "Wind-Damaged or Missing Shingles", detail: "High-altitude gusts can lift, crack, or strip shingles entirely. Even a few missing shingles expose underlayment and decking to rapid deterioration if left unaddressed." },
  { icon: Layers, title: "Flashing Failures", detail: "Step flashing, counter-flashing, and chimney flashing are the most common failure points on mountain roofs. Improper or aged flashing is behind the majority of repair calls we receive." },
  { icon: AlertTriangle, title: "Pipe Boot & Penetration Leaks", detail: "Rubber pipe boots degrade over time, especially at elevation where UV exposure is more intense. Cracked boots are a leading cause of attic leaks on roofs that are otherwise in good condition." },
  { icon: ThermometerSun, title: "Ice Dam & Ridge Vent Issues", detail: "Inadequate ventilation causes ice damming in winter and heat buildup in summer. Both accelerate material degradation and can cause interior water damage." },
  { icon: TrendingDown, title: "Sagging, Soft Spots, or Decking Damage", detail: "Soft spots underfoot or visible sag lines indicate moisture has compromised the structural decking. This requires immediate assessment to prevent further structural damage." },
];

const escalationReasons = [
  { title: "A small flashing gap becomes interior water damage", detail: "A quarter-inch gap at a chimney base can channel gallons of water into wall cavities during a single heavy rain — damaging insulation, framing, and interior finishes." },
  { title: "A missing shingle exposes underlayment to UV breakdown", detail: "Underlayment is designed to be a secondary barrier, not a primary one. Once exposed to direct sunlight, it degrades within months — turning a small repair into a full section replacement." },
  { title: "A cracked pipe boot lets moisture into your attic for months", detail: "Slow attic leaks often go unnoticed until mold has spread across sheathing and insulation. The repair cost multiplies with every month of undetected moisture." },
  { title: "Ice damming from poor ventilation damages soffits and fascia", detail: "Recurring ice dams don't just damage shingles — they force water behind fascia boards and into soffit cavities, causing wood rot that extends well beyond the roof surface." },
];

const repairPhilosophy = [
  { icon: Search, title: "Diagnose the Root Cause", detail: "We don't patch where water appears — we trace it to where it enters. Roof leaks often travel along rafters and decking before showing up inside, making accurate diagnosis critical." },
  { icon: Camera, title: "Document Everything", detail: "Before we touch anything, we photograph and document the existing condition. You see exactly what we found, what caused it, and what we recommend — with evidence." },
  { icon: Wrench, title: "Repair Permanently, Not Temporarily", detail: "We use the same materials and methods on a repair that we'd use on a full replacement. No roofing cement cover-ups, no temporary tarps presented as solutions." },
  { icon: MessageSquare, title: "Be Honest About What You're Facing", detail: "If a repair will solve the problem, we'll tell you. If you're better served by replacement, we'll explain exactly why — and let you decide without pressure." },
];

const processSteps = [
  { number: "01", title: "You Call — We Answer", icon: Phone, description: "Describe what you're seeing. We'll ask targeted questions to understand the urgency and schedule an assessment — typically on a same-day or next-day basis, or same-day for emergencies." },
  { number: "02", title: "On-Site Diagnosis", icon: Eye, description: "We inspect the affected area and surrounding components to identify the true source of the problem. We photograph everything and explain our findings on-site." },
  { number: "03", title: "Clear Recommendation", icon: ClipboardCheck, description: "You receive a straightforward recommendation — repair, monitor, or replace — with a written scope, cost, and timeline. No ambiguity, no upselling." },
  { number: "04", title: "Precision Repair", icon: Hammer, description: "If repair is the right path, our crew executes with the same materials and standards we use on full replacements. Documented work, verified results." },
  { number: "05", title: "Verification & Documentation", icon: BadgeCheck, description: "We verify the repair has resolved the issue, photograph the completed work, and provide you with documentation of what was done and what warranty applies." },
];

const repairVsReplace = {
  repair: [
    "Damage is isolated to one area or a few specific components",
    "The roof is under 15 years old with no systemic issues",
    "A single flashing, pipe boot, or vent has failed",
    "Wind removed a small section of shingles in an otherwise sound roof",
    "The underlying decking and structure are intact",
  ],
  replace: [
    "Damage appears in multiple unrelated areas simultaneously",
    "Your roof is 20+ years old and showing widespread deterioration",
    "You've had the same area repaired more than once",
    "Decking is soft, sagging, or shows signs of rot",
    "Repair costs are approaching the amortized cost of replacement",
  ],
};

const faqs = [
  { q: "How quickly can you respond to a roof leak?", a: "For active leaks and storm damage, we offer Rapid emergency response including temporary tarping to prevent further water intrusion. Non-emergency repair assessments are typically scheduled on a same-day or next-day basis of your call." },
  { q: "How much does a roof repair cost?", a: "Repair pricing is scope-based — it depends on the type of damage, materials involved, and accessibility. Rather than publish a generic range, we provide exact, itemized pricing after an on-site assessment so the number reflects the actual work." },
  { q: "Will you try to sell me a full replacement when I only need a repair?", a: "No. We diagnose honestly and recommend based on what your roof actually needs. If a targeted repair will solve the problem, that's what we'll recommend — and we'll document our reasoning so you can verify our logic." },
  { q: "Do you warranty repair work?", a: "Yes. Every repair we perform comes with a Highlander labor warranty covering the work we completed. The duration depends on the scope of the repair, and we'll specify it clearly before work begins." },
  { q: "Can you repair a roof during rain or winter?", a: "Emergency tarping can be done in virtually any conditions to stop active water intrusion. Permanent repairs require dry conditions for proper material adhesion. We schedule accordingly and will never compromise quality to rush a timeline." },
  { q: "How do I know if the leak is coming from my roof and not somewhere else?", a: "Not all interior water stains come from roof leaks — condensation, plumbing issues, and window failures can mimic roof problems. Our diagnostic process identifies the actual source before recommending a solution. If it's not your roof, we'll tell you." },
  { q: "Do you handle insurance claims for storm damage repairs?", a: "Yes. We provide complete damage documentation with photographs and measurements, meet with your insurance adjuster on-site if needed, and coordinate the repair process through your claim." },
  { q: "What if the repair reveals bigger problems underneath?", a: "If we discover additional issues during repair — like decking damage or widespread underlayment failure — we stop, document what we've found, and discuss your options before proceeding. You always approve the scope of work." },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
const RoofRepair = () => {
  return (
    <>
      <SEOHead
        title="Roof Repair in Western NC | Leak Diagnosis & Repair"
        description="Targeted roof repairs across Western North Carolina. We diagnose the real cause, complete the fix correctly, and document the work with photos."
        path="/roofing/roof-repair"
        jsonLd={[
          serviceSchema({ name: "Roof Repair", description: "Expert roof leak diagnosis and permanent repair for Western North Carolina homes.", url: "/roofing/roof-repair" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Roof Repair", url: "/roofing/roof-repair" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Roofing", url: "/roofing" }, { name: "Roof Repair", url: "/roofing/roof-repair" }]} />
      <main id="main-content">
        <ServicePageTemplate
          alternateSurfaces={false}
          hero={
            <>
        <section className="relative min-h-[65vh] md:min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <HeroImage src={asphalt003} avifSrcSet={asphalt003Avif} webpSrcSet={asphalt003Webp} alt="Roof repair on a residential home in Western North Carolina" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 0.4, delay: 0.3 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pt-24 md:pt-40 pb-10 md:pb-20">
            <div className="max-w-3xl">

              <div className="overflow-hidden mb-3 md:mb-4">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-heading md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.0] md:leading-[1.05] tracking-tight">
                  Roof Repair Across{" "}
                  <span className="text-[hsl(var(--gold-ink))]">Western NC</span>
                </motion.h1>
                <PageContext division="Roofing Division" area="Western North Carolina" tone="dark" className="mt-3" />
              </div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="text-body-lg md:text-body-xl text-white/85 max-w-xl mb-5 md:mb-10 leading-snug md:leading-relaxed font-body font-medium drop-shadow-sm">
                We find the real cause, show you photos of the failure, and price the repair in writing first.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4" data-gtm-location="hero">
                {/* Primary action on repair pages is the phone call (see page-cta-hierarchy.ts) */}
                <a href="tel:+18285247773" className="btn btn-primary btn-lg group relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Phone className="w-4 h-4 relative" aria-hidden="true" /> <span className="relative">(828) 524-7773</span>
                </a>
                <Link to="/consultation" className="btn btn-secondary btn-md btn-on-dark group">
                  See What My Roof Needs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </motion.div>
              <HeroTrustLine className="mt-4 md:mt-6" />

              {/* One-line reason to call instead of writing (CRO Prompt 12) */}
              <p className="hidden md:block mt-3 text-body-xs md:text-body-xs font-body text-white/80 max-w-xl leading-snug">
                An active leak can&apos;t wait on email — call and we&apos;ll triage the roof on the phone and get an inspection on the schedule.
              </p>

              {/* Response commitment — unique to Repair */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-10 hidden md:flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[hsl(var(--heritage-green)/0.4)] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[hsl(var(--heritage-green))]" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-primary-foreground">Fast Repair Assessments</div>
                  <div className="text-xs text-primary-foreground font-body">We prioritize active water intrusion and answer our own phone.</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
            </>
          }
          quickAnswer={
            <>
        <UrgentActionSteps variant="repair" />
        <InsuranceDocHelp />
        <AnswerBlock
          question="What does roof repair cover, and when is repair the right call?"
          answer="Roof repair addresses a specific, contained failure — a leak, wind-lifted shingles, damaged flashing, or a compromised penetration — without replacing the whole roof. Repair is usually the right call when the roof is otherwise sound and has meaningful service life left. Highlander assesses the roof first and tells you plainly whether repair or replacement makes more sense."
          points={["Leak diagnosis before any work is quoted", "Flashing, penetrations, and storm damage repairs", "Honest repair-versus-replace recommendation"]}
        />
            </>
          }
          whatWeDo={
            <>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-2xl">
            <div className="mb-6 text-center">
              <span className="eyebrow mb-3 block">Not an Emergency?</span>
              <h2 className="section-heading mb-3">Send It Over and We'll Call You Back.</h2>
              <p className="text-muted-foreground text-body-sm font-body leading-relaxed">
                If the leak isn't active right now, four quick fields are all we need to get a
                repair assessment on the schedule.
              </p>
            </div>
            <FastLeadForm
              ctaLabel="See What My Roof Needs"
              serviceLabel="Roof Repair"
              urgencyOptions={["Active leak today", "Within a week", "Within a month", "Just planning ahead"]}
            />
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--heritage-green)/0.5)]" />
                <div className="w-16 h-px bg-border" />
                <Search className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <div className="w-16 h-px bg-border" />
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--heritage-green)/0.5)]" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                A roof leak isn't just an inconvenience — it's your home telling you something needs attention before it becomes something worse.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mb-4">
                At Highlander, we don't treat repairs as small jobs. We treat them as diagnostic opportunities — a chance to find the real cause, fix it properly, and give you an honest picture of your roof's overall condition. Every repair is documented and built to the same standard as our full replacements.
              </p>
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--heritage-green)/0.5)]" />
                <div className="w-16 h-px bg-border" />
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--heritage-green)/0.5)]" />
              </div>
            </motion.div>
          </div>
        </section>
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Common Roof Problems</span>
              <h2 className="section-heading mb-4">Issues We Diagnose<br className="hidden md:block" /> and Resolve.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                These are the most common repair calls we receive from homeowners across Western North Carolina — and the conditions we're best equipped to resolve.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {commonProblems.map((problem, i) => (
                <motion.div key={problem.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <problem.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{problem.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{problem.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">Don't Ignore It</span>
                <h2 className="section-heading mb-5">Small Problems<br /> Become Big Problems.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
                  The most expensive roof repairs we perform are the ones that should have been addressed months earlier. Water is persistent, patient, and destructive — and mountain weather accelerates every timeline.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  A small flashing repair left unaddressed for six months can easily become a full section replacement with interior damage remediation. The math always favors acting early.
                </p>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {escalationReasons.map((reason, i) => (
                  <motion.div key={reason.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-destructive/15 card-lift">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-destructive/50 mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-sm font-heading font-bold text-foreground mb-1.5">{reason.title}</h3>
                        <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{reason.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Noticed something that doesn't look right?</h3>
                <p className="text-primary-foreground text-sm font-body">The sooner it's assessed, the less it costs to fix. Call us or schedule online.</p>
              </div>
              <div className="flex w-full min-w-0 flex-wrap justify-center gap-3 lg:w-auto lg:justify-end lg:flex-shrink-0">
                <a href="tel:+18285247773" className="btn btn-primary btn-md">
                  <Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773
                </a>
                <Link to="/consultation" className="btn btn-secondary btn-md btn-on-dark">
                  See What My Roof Needs
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Our Repair Philosophy</span>
              <h2 className="section-heading mb-4">We Fix the Cause,<br className="hidden md:block" /> Not Just the Symptom.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                Too many repair jobs fail because they treat where the water shows up — not where it gets in. Our approach is diagnostic first, repair second.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {repairPhilosophy.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Noticed something on your roof?</h3>
                <p className="text-primary-foreground text-sm font-body">We diagnose accurately and recommend honestly — repair or replace, you'll know why.</p>
              </div>
              <div className="flex w-full min-w-0 flex-wrap justify-center gap-3 lg:w-auto lg:justify-end lg:flex-shrink-0">
                <a href="tel:+18285247773" className="btn btn-primary btn-md">
                  <Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773
                </a>
                <Link to="/consultation" className="btn btn-secondary btn-md btn-on-dark">
                  See What My Roof Needs
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} />
          <div className="section-padding">
            <div className="container-tight max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Honest Guidance</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  When Repair Is Enough.<br className="hidden md:block" /> When It Isn't.
                </h2>
                <p className="text-dark-section-foreground text-base font-body max-w-lg mx-auto">
                  We'll always tell you the truth about your roof's condition. Here's the framework we use to guide our recommendation.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Repair column */}
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-dark-section-border rounded-sm overflow-hidden">
                  <div className="h-[2px] w-full bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.4)] to-[hsl(var(--heritage-green)/0)]" />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center">
                        <Wrench className="w-4 h-4 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-heading font-bold text-dark-section-foreground text-lg">Repair Is Likely Sufficient</h3>
                    </div>
                    <ul className="space-y-3">
                      {repairVsReplace.repair.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-primary/80 flex-shrink-0" aria-hidden="true" />
                          <span className="text-dark-section-foreground text-body-xs font-body leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Replace column */}
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="border border-dark-section-border rounded-sm overflow-hidden">
                  <div className="h-[2px] w-full bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.4)] to-[hsl(var(--highland-gold)/0)]" />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.08)] flex items-center justify-center">
                        <Replace className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      </div>
                      <h3 className="font-heading font-bold text-dark-section-foreground text-lg">Consider Replacement</h3>
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
            </>
          }
          whatsIncluded={
            <>
        <section className="section-padding bg-muted/20">
          <div className="container-tight max-w-4xl">
            <div className="text-center mb-8">
              <span className="eyebrow mb-3 block">Ongoing Roof Care</span>
              <h2 className="section-heading mb-4">Preventive Maintenance for<br className="hidden md:block" /> Western NC Roofs.</h2>
              <p className="text-muted-foreground text-base font-body max-w-2xl mx-auto">
                Mountain weather — freeze-thaw cycles, wind-driven rain, heavy pollen and organic debris — is hard on roofs. A scheduled walk-through catches small failures at flashings, sealants, and fasteners before they turn into interior damage.
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
              {[
                "Flashing, boot, and penetration inspection",
                "Sealant refresh at exposed fasteners and terminations",
                "Valley and gutter debris clearing",
                "Documented condition report with photos",
                "Repair-vs-replace guidance you can plan around",
                "Priority scheduling on future repair calls",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-foreground/80 font-body leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
            </>
          }
          costContext={
            <>
        <CostOfWaiting variant="repair" />
        <CostContextBlock serviceLabel="roof repair" variant="repair" />
        <SchedulingReality serviceLabel="roof repair" />
            </>
          }
          process={
            <>
        <RepairPhotoProof variant="repair" />
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Repair Process</span>
              <h2 className="section-heading mb-4">How a Repair<br className="hidden md:block" /> Works With Highlander.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
                A structured, transparent process from your first call to verified resolution. No guesswork, no surprises.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className={`group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift ${i === 4 ? 'md:col-start-1 lg:col-start-2' : ''}`}>
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
            </>
          }
          proof={
            <>
        <WhoShowsUp />
        <TieredOffer context="roof-repair" primaryLabel="Get My Repair Assessed" />
        <section className="section-padding bg-muted/20">
          <div className="container-tight">
            <AttributedReviews category="roofing" heading="What homeowners say about our roof repair work" />
          </div>
        </section>
        <ConversionTrustBlock variant="band" category="roofing" />
            </>
          }
          faq={
            <>
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Roof Repair FAQs</span>
              <h2 className="section-heading mb-4">Common Questions About<br className="hidden md:block" /> Roof Repair.</h2>
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
        <RelatedLinks
          eyebrow="Keep Exploring"
          heading="Related pages you may find useful"
          columns={2}
          links={[
            { label: "Roofing Services Hub", href: "/roofing", description: "Full roofing division overview" },
            { label: "Residential Roofing Services", href: "/roofing/residential", description: "When repair becomes replacement" },
            { label: "Roof Replacement Options", href: "/roofing/roof-replacement", description: "Compare repair vs full replacement" },
            { label: "Roofing FAQ", href: "/faq", description: "Common questions about repair timelines" },
            { label: "Request an Inspection", href: "/request-inspection", description: "Get a repair scope in writing" },
            { label: "Get My Questions Answered", href: "/contact", description: "Reach a project advisor" }
          ]}
        />
        <ServiceInternalLinks title="Roof Repair" slug="roof-repair" />
            </>
          }
          cta={
            <>
        <CommonConcerns />
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">Don't Wait Until It Gets Worse</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    The Best Repair Is the One<br className="hidden md:block" /> You Don't Have to Do Twice.
                  </h2>
                  <p className="text-dark-section-foreground text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    If something doesn't look right, it probably isn't. Call us for an honest assessment — we'll tell you what's happening, what it will take to fix it, and whether repair or replacement is the better path forward.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <a href="tel:+18285247773" className="btn btn-primary btn-lg group">
                      <Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773
                    </a>
                    <Link to="/consultation" className="btn btn-secondary btn-lg btn-on-dark group">
                      See What My Roof Needs
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-border">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Clock, text: "Rapid Emergency Response" },
                      { icon: Award, text: "CertainTeed Certified" },
                      { icon: Star, text: "4.9★ Google · 150+ reviews" },
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
        <RealWorkWidget />
            </>
          }
        />
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RoofRepair;
