import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, ShieldCheck, Clock, Users, Award, Mountain,
  Home, Hammer, Wrench, CloudLightning, Ruler, Zap, MapPin, CheckCircle2,
  DollarSign, Sparkles, HelpCircle,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import TartanBackground from "@/components/TartanBackground";
import type { TownData } from "@/data/towns";
import { getFaqServiceLink, getTownCountyLink } from "@/lib/town-faq-links";
import { trackTownFaqOpen } from "@/lib/gtm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EASE = [0.22, 1, 0.36, 1] as any;

/* ─────────────────────────────────────────────────────────────
 *  1. STORM / EMERGENCY BAND — thin, high-urgency, no fake 24/7
 * ────────────────────────────────────────────────────────── */
export const TownEmergencyBand = ({ town }: { town: TownData }) => (
  <section className="relative bg-primary text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <TartanBackground opacity={0.08} />
    </div>
    <div className="container-tight relative z-10 px-6 py-8 md:py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 shrink-0 bg-[hsl(var(--highland-gold)/0.15)] border border-[hsl(var(--highland-gold)/0.4)] flex items-center justify-center">
            <CloudLightning className="w-6 h-6 text-[hsl(var(--gold-ink))]" />
          </div>
          <div>
            <p className="text-caption uppercase tracking-[0.25em] font-bold text-[hsl(var(--gold-ink))] mb-1">
              Storm or Active Leak in {town.name}?
            </p>
            <p className="font-heading font-bold text-lg md:text-xl leading-tight">
              Rapid response tarping, documentation & insurance-ready assessments.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="tel:+18285247773"
            className="inline-flex items-center justify-center gap-2 bg-[hsl(var(--highland-gold))] text-accent-foreground font-heading font-bold text-sm px-6 py-4 uppercase tracking-widest hover:brightness-110 transition"
          >
            <Phone className="w-4 h-4" /> Call (828) 524-7773
          </a>
          <Link
            to="/request-inspection"
            className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground font-heading font-bold text-sm px-6 py-4 uppercase tracking-widest hover:bg-primary-foreground/10 transition"
          >
            Request Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
 *  2. SERVICES GRID — town-personalized service cards w/ CTAs
 * ────────────────────────────────────────────────────────── */
const services = [
  {
    icon: Home, label: "Roof Replacement",
    desc: (t: string) => `Full tear-off and re-installs engineered for ${t}'s wind, snow, and UV exposure.`,
    href: "/roofing/roof-replacement",
  },
  {
    icon: Wrench, label: "Roof Repair",
    desc: (t: string) => `Targeted leak, flashing, and boot repairs — often same-week in the ${t} area.`,
    href: "/roofing/roof-repair",
  },
  {
    icon: Zap, label: "Metal Roofing",
    desc: (t: string) => `Standing-seam systems built for high-elevation ${t} homes and long ownership horizons.`,
    href: "/roofing/metal",
  },
  {
    icon: CloudLightning, label: "Storm Damage",
    desc: () => "Insurance documentation, emergency tarping, and full storm restoration.",
    href: "/roofing/storm-damage",
  },
  {
    icon: Hammer, label: "Additions & Renovations",
    desc: (t: string) => `Licensed general contractor work — master suites, kitchens, and full ${t} home renovations.`,
    href: "/construction/additions",
  },
  {
    icon: Ruler, label: "Outdoor Living",
    desc: () => "Decks, covered porches, and pergolas designed for mountain views and weather.",
    href: "/construction/outdoor-living",
  },
];

export const TownServicesGrid = ({ town }: { town: TownData }) => (
  <section className="section-padding bg-background relative overflow-hidden">
    <TartanBackground opacity={0.02} />
    <div className="container-tight relative z-10">
      <div className="max-w-3xl mb-14">
        <ScrollReveal variant="fade">
          <span className="eyebrow mb-4 block">Services in {town.name}</span>
        </ScrollReveal>
        <HeadingReveal>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-5">
            Everything your <span className="italic text-primary">{town.name}</span> home needs — under one roof.
          </h2>
        </HeadingReveal>
        <ScrollReveal variant="rise-subtle" delay={0.1}>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Roofing, construction, and design — coordinated by a single local team so {town.name} homeowners don't manage three contractors.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={s.label} variant="rise-subtle" delay={i * 0.05}>
            <Link
              to={s.href}
              className="group h-full flex flex-col bg-secondary/40 border border-border p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-primary/10 border border-primary/10 flex items-center justify-center mb-6">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3 leading-tight">{s.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body mb-8">{s.desc(town.name)}</p>
              <span className="mt-auto text-primary font-heading font-bold text-body-xs uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal variant="fade" delay={0.3}>
        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/request-inspection"
            className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-body-sm px-10 py-5 uppercase tracking-widest inline-flex items-center justify-center gap-3 hover:scale-[1.02] transition"
          >
            Start Your {town.name} Project <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+18285247773"
            className="border-2 border-foreground/15 text-foreground font-heading font-bold text-body-sm px-10 py-5 uppercase tracking-widest inline-flex items-center justify-center gap-3 hover:border-primary/40 transition"
          >
            <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" /> (828) 524-7773
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
 *  3. MID-PAGE CTA BAND (dark, cinematic)
 * ────────────────────────────────────────────────────────── */
export const TownCTABand = ({ town }: { town: TownData }) => (
  <section className="section-dark tartan-dark relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--highland-gold)/0.04)] rounded-full blur-[160px] pointer-events-none" />
    <div className="section-padding relative z-10">
      <div className="container-tight max-w-3xl text-center">
        <ScrollReveal variant="fade">
          <span className="text-caption uppercase tracking-[0.3em] font-bold text-[hsl(var(--gold-ink))] mb-6 block">
            {town.name} · {town.county} County
          </span>
        </ScrollReveal>
        <HeadingReveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-dark-section-foreground leading-tight mb-8">
            Ready to talk about your <br />
            <span className="text-[hsl(var(--gold-ink))] italic">{town.name}</span> project?
          </h2>
        </HeadingReveal>
        <ScrollReveal variant="rise-subtle" delay={0.2}>
          <p className="text-dark-section-foreground/70 text-lg font-body leading-relaxed mb-10 max-w-xl mx-auto">
            A named project advisor — not a call center — will respond with a clear next step, a written scope, and no high-pressure sales tactics.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="rise" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-inspection"
              className="cta-gradient cta-glow text-accent-foreground font-heading font-bold text-body-sm px-12 py-5 uppercase tracking-widest inline-flex items-center justify-center gap-3 hover:scale-[1.02] transition shadow-2xl"
            >
              Request a {town.name} Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+18285247773"
              className="border-2 border-dark-section-foreground/20 text-dark-section-foreground font-heading font-bold text-body-sm px-10 py-5 uppercase tracking-widest inline-flex items-center justify-center gap-3 hover:border-[hsl(var(--highland-gold)/0.4)] hover:bg-dark-section-foreground/[0.05] transition"
            >
              <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" /> Call Direct
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
 *  4. WHY CHOOSE HIGHLANDER IN {town}
 * ────────────────────────────────────────────────────────── */
const reasons = [
  { icon: Mountain, title: "Local, not visiting", desc: (t: string) => `Our crews live and work in Western NC — ${t} isn't a “drive-out” job for a Charlotte franchise.` },
  { icon: ShieldCheck, title: "Licensed general contractor", desc: () => "Full roofing and construction credentials, workers' comp, and liability — verifiable on every proposal." },
  { icon: Award, title: "CertainTeed ShingleMaster", desc: () => "Credentialed contractor status with material-backed warranty options most local competitors can't offer." },
  { icon: Users, title: "Team-led project delivery", desc: () => "A named project manager, inspector, and crew lead — you always know who to call." },
  { icon: Clock, title: "Rapid response", desc: (t: string) => `Most ${t}-area inspections booked on a same-day or next-day basis.` },
  { icon: DollarSign, title: "Financing available", desc: () => "Structured payment options for approved buyers so major roofing or construction work fits your plan." },
];

export const TownWhyChoose = ({ town }: { town: TownData }) => (
  <section className="section-padding bg-secondary/40 relative">
    <div className="container-tight">
      <div className="grid lg:grid-cols-12 gap-14 items-start">
        <div className="lg:col-span-4">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-4 block">Why Highlander</span>
          </ScrollReveal>
          <HeadingReveal>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-6">
              Why homeowners in <span className="italic text-primary">{town.name}</span> choose us.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.1}>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              We're a Western NC roofing and construction firm — not a national franchise. Here's what changes when your project is run by a team that actually lives on the Plateau.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all"
            >
              About Highlander <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} variant="rise-subtle" delay={i * 0.05}>
              <div className="flex gap-5 p-7 bg-background border border-border hover:border-primary/30 hover:shadow-md transition h-full">
                <div className="w-11 h-11 shrink-0 bg-primary/10 border border-primary/10 flex items-center justify-center">
                  <r.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2 leading-tight">{r.title}</h3>
                  <p className="text-body-xs text-muted-foreground leading-relaxed font-body">{r.desc(town.name)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
 *  5. TOWN FAQ — pulls town-specific FAQ list or falls back
 * ────────────────────────────────────────────────────────── */
/**
 * Contextual internal links rendered inside every town FAQ answer:
 * the most relevant service page for that specific question plus the
 * town's county hub. Keeps the answer text itself unchanged so the
 * FAQPage schema still matches the visible copy.
 */
const TownFAQAnswerLinks = ({
  town,
  question,
  answer,
}: {
  town: TownData;
  question: string;
  answer: string;
}) => {
  const service = getFaqServiceLink(question, answer);
  const county = getTownCountyLink(town);

  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-body-xs">
      <span className="uppercase tracking-widest text-foreground/50 font-heading text-caption">
        Related
      </span>
      <Link
        to={service.href}
        className="text-primary font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
      >
        {service.label} in {town.name}
      </Link>
      {county && (
        <>
          <span aria-hidden="true" className="text-foreground/30">·</span>
          <Link
            to={county.href}
            className="text-primary font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            {county.label} service hub
          </Link>
        </>
      )}
    </p>
  );
};

export const TownFAQ = ({
  town,
  faqs,
}: {
  town: TownData;
  faqs?: { question: string; answer: string }[];
}) => {
  const items =
    faqs && faqs.length > 0
      ? faqs
      : [
          {
            question: `How quickly can Highlander get to my home in ${town.name}?`,
            answer: `Most ${town.name}-area inspections are booked on a same-day or next-day basis. Storm and active-leak calls are prioritized ahead of standard scheduling.`,
          },
          {
            question: `What roofing materials do you recommend for ${town.name}?`,
            answer: `In ${town.name}, we most often specify Class 4 impact-rated shingle systems, standing-seam metal, and premium synthetics like Brava — chosen against elevation, wind, UV, and moisture exposure at your specific address.`,
          },
          {
            question: `Do you handle both roofing and construction projects in ${town.name}?`,
            answer: `Yes. Highlander is a licensed general contractor. We deliver roofing, additions, renovations, and outdoor living work under one project team — so ${town.name} homeowners aren't managing three separate contractors.`,
          },
          {
            question: `Is financing available for ${town.name} projects?`,
            answer: `Yes. Structured financing options are available for approved buyers on qualifying roofing and construction projects. Ask your project advisor during your consultation.`,
          },
        ];

  const handleOpen = (value: string) => {
    if (!value) return;
    const index = Number(value.replace("item-", ""));
    const item = items[index];
    if (!item) return;
    trackTownFaqOpen({ town: town.slug, question: item.question, position: index + 1 });
  };

  return (
    <section
      className="section-padding bg-background relative"
      data-gtm-location="town_faq"
      data-gtm-town={town.slug}
    >
      <div className="container-tight max-w-4xl">
        <div className="mb-12 text-center">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-4 block flex items-center justify-center gap-2">
              <HelpCircle className="w-3.5 h-3.5" /> {town.name} FAQs
            </span>
          </ScrollReveal>
          <HeadingReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              Answers for <span className="italic text-primary">{town.name}</span> homeowners.
            </h2>
          </HeadingReveal>
        </div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          onValueChange={handleOpen}
        >
          {items.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border bg-secondary/30 px-6 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left font-heading font-bold text-foreground text-base md:text-lg hover:no-underline py-5">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body leading-relaxed text-body-sm pb-6">
                <p>{f.answer}</p>
                <TownFAQAnswerLinks town={town} question={f.question} answer={f.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
          <Link
            to="/request-inspection"
            data-gtm-cta="request_inspection"
            className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all min-h-[44px]"
          >
            Still have questions? Talk with our team <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+18285247773"
            className="inline-flex items-center gap-2 text-foreground font-heading font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors min-h-[44px]"
          >
            <Phone className="w-4 h-4" /> (828) 524-7773
          </a>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
 *  5.5 TOWN ESTIMATE CTA — sits directly under the localized FAQs
 * ────────────────────────────────────────────────────────── */
export const TownEstimateCTA = ({ town }: { town: TownData }) => {
  const county = getTownCountyLink(town);
  // Town-mapped destination: the estimate form reads ?town= and pre-fills it.
  const estimateHref = `/request-inspection?town=${town.slug}#request-inspection`;

  return (
    <section
      className="pb-16 md:pb-24 bg-background"
      data-gtm-location="town_estimate_cta"
      data-gtm-town={town.slug}
    >
      <div className="container-tight max-w-4xl">
        <ScrollReveal variant="fade">
          <div className="border border-primary/25 bg-secondary/40 px-6 py-10 md:px-12 md:py-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.5)] to-transparent" />

            <span className="eyebrow mb-4 flex items-center justify-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> {town.name}, {town.state}
            </span>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
              Request an estimate in{" "}
              <span className="italic text-primary">{town.name}</span>
            </h2>

            <p className="mt-4 text-body-sm font-body text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Tell us what you&rsquo;re seeing at the property. A local Highlander team
              member responds within one business day with a scheduled on-site visit
              and a written, transparent estimate — no obligation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to={estimateHref}
                data-gtm-cta="request_quote"
                className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-8"
              >
                Request an estimate in {town.name} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+18285247773"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-6 border border-border font-heading font-bold text-body-xs uppercase tracking-[0.15em] text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" /> (828) 524-7773
              </a>
            </div>

            {county && (
              <p className="mt-6 text-body-xs font-body text-muted-foreground">
                Also serving the rest of{" "}
                <Link
                  to={county.href}
                  className="text-primary font-semibold underline underline-offset-4 hover:opacity-80"
                >
                  {county.label}
                </Link>
                .
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
 *  6. THIN CTA STRIP — town identity + phone
 * ────────────────────────────────────────────────────────── */
export const TownCTAStrip = ({ town }: { town: TownData }) => (
  <section className="bg-primary text-primary-foreground relative">
    <div className="container-tight px-6 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
      <p className="text-body-xs font-body text-center md:text-left text-primary-foreground">
        <span className="font-heading font-bold">Serving {town.name}, {town.state}</span>{" "}
        · Roofing &amp; Construction · Licensed GC · 4.9★ Rated
      </p>
      <div className="flex items-center gap-4">
        <a
          href="tel:+18285247773"
          className="inline-flex items-center gap-2 font-heading font-bold text-body-xs uppercase tracking-[0.15em] hover:opacity-90"
        >
          <Phone className="w-3.5 h-3.5" /> (828) 524-7773
        </a>
        <div className="w-px h-3 bg-primary-foreground/20" />
        <Link
          to="/request-inspection"
          className="inline-flex items-center gap-2 text-[hsl(var(--gold-ink))] font-heading font-bold text-body-xs uppercase tracking-[0.15em] hover:opacity-90"
        >
          Request Inspection <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.4)] to-transparent" />
  </section>
);