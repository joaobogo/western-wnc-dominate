import { PHONE_DISPLAY, LICENSE_NUMBER, REVIEW_STARS, REVIEW_AS_OF } from "@/data/business";
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
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-[hsl(var(--highland-gold)/0.15)] border border-[hsl(var(--highland-gold)/0.4)] flex items-center justify-center">
            <CloudLightning className="w-6 h-6 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[10px] md:text-caption uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[hsl(var(--gold-ink))] mb-0.5 md:mb-1">
              Storm or Active Leak in {town.name}?
            </p>
            <p className="font-heading font-bold text-base md:text-xl leading-tight text-white">
              Rapid response tarping & insurance assessments.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="tel:+18285247773"
            className="btn btn-secondary btn-on-dark btn-md"
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> Call {PHONE_DISPLAY}
          </a>
          <Link
            to="/request-inspection"
            className="btn btn-secondary btn-md btn-on-dark"
          >
            See What My Roof Needs <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
 *  2. SERVICES GRID — town-personalized service cards w/ CTAs
 * ────────────────────────────────────────────────────────── */
/** Short lead phrase from a town's climateExposure note, e.g. "Extreme high-altitude weather". */
const exposureLead = (town: TownData) => {
  const raw = (town.climateExposure || "").split(":")[0].trim().replace(/\.$/, "");
  return raw ? raw.charAt(0).toLowerCase() + raw.slice(1) : "";
};

/** Detail clause after the colon in climateExposure, lower-cased and de-punctuated. */
const exposureDetail = (town: TownData) => {
  const parts = (town.climateExposure || "").split(":");
  const raw = (parts[1] || "").trim().replace(/\.$/, "");
  return raw ? raw.charAt(0).toLowerCase() + raw.slice(1) : "";
};

/**
 * Each card keeps its shared base sentence, plus one town-specific sentence
 * built only from data that already exists on the town record
 * (county, elevation, local exposure note). Cards with no available detail
 * fall back to the base sentence alone.
 */
const services = [
  {
    icon: Home, label: "Roof Replacement",
    desc: (t: TownData) => {
      const base = `Full tear-off and re-installs engineered for ${t.name}'s wind, snow, and UV exposure.`;
      const lead = exposureLead(t);
      return t.elevation && lead
        ? `${base} At ${t.elevation}, we spec ${t.name} tear-offs around ${lead}.`
        : base;
    },
    href: "/roofing/roof-replacement",
  },
  {
    icon: Wrench, label: "Roof Repair",
    desc: (t: TownData) => {
      const base = `Targeted leak, flashing, and boot repairs — often same-week in the ${t.name} area.`;
      return t.county
        ? `${base} Our crews work ${t.county} routinely, so ${t.name} calls don't wait on an out-of-area truck.`
        : base;
    },
    href: "/roofing/roof-repair",
  },
  {
    icon: Zap, label: "Metal Roofing",
    desc: (t: TownData) => {
      const base = `Standing-seam systems built for high-elevation ${t.name} homes and long ownership horizons.`;
      const detail = exposureDetail(t);
      return t.elevation && detail
        ? `${base} At ${t.elevation}, ${t.name} panels and fasteners are chosen for ${detail}.`
        : base;
    },
    href: "/roofing/metal",
  },
  {
    icon: CloudLightning, label: "Storm Damage",
    desc: (t: TownData) => {
      const base = "Insurance documentation, emergency tarping, and full storm restoration.";
      const lead = exposureLead(t);
      return t.county && lead
        ? `${base} In ${t.name} and the rest of ${t.county}, that means documenting ${lead} the way carriers expect.`
        : base;
    },
    href: "/roofing/storm-damage",
  },
  {
    icon: Hammer, label: "Additions & Renovations",
    desc: (t: TownData) => {
      const base = `Licensed general contractor work — master suites, kitchens, and full ${t.name} home renovations.`;
      return t.elevation
        ? `${base} ${t.name} additions are framed and sealed for the same ${t.elevation} exposure your roof already handles.`
        : base;
    },
    href: "/construction/additions",
  },
  {
    icon: Ruler, label: "Outdoor Living",
    desc: (t: TownData) => {
      const base = "Decks, covered porches, and pergolas designed for mountain views and weather.";
      const lead = exposureLead(t);
      return lead && t.county
        ? `${base} ${t.name} builds in ${t.county} are detailed for ${lead}, not flatland conditions.`
        : base;
    },
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
              className="group h-full flex flex-col bg-secondary/40 border border-border p-8 hover:border-primary/40 hover:shadow-floating transition-all duration-500 relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-primary/10 border border-primary/10 flex items-center justify-center mb-6">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3 leading-tight">{s.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body mb-8">{s.desc(town)}</p>
              <span className="mt-auto text-primary font-heading font-bold text-body-xs uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal variant="fade" delay={0.3}>
        <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/request-inspection"
            className="btn btn-primary btn-lg"
          >
            Start Your {town.name} Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <a
            href="tel:+18285247773"
            className="btn btn-secondary btn-lg"
          >
            <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> {PHONE_DISPLAY}
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
            {town.name} · {town.county}
          </span>
        </ScrollReveal>
        <HeadingReveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-dark-section-foreground leading-tight mb-8">
            Ready to talk about your <br />
            <span className="text-[hsl(var(--gold-ink))] italic">{town.name}</span> project?
          </h2>
        </HeadingReveal>
        <ScrollReveal variant="rise-subtle" delay={0.2}>
          <p className="text-dark-section-muted text-lg font-body leading-relaxed mb-10 max-w-xl mx-auto">
            A named project advisor — not a call center — will respond with a clear next step, a written scope, and no high-pressure sales tactics.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="rise" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-inspection"
              className="btn btn-primary btn-lg"
            >
              Request a {town.name} Consultation <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:+18285247773"
              className="btn btn-secondary btn-lg btn-on-dark"
            >
              <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> Call Direct
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
              About Highlander <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} variant="rise-subtle" delay={i * 0.05}>
              <div className="flex gap-5 p-7 bg-background border border-border hover:border-primary/30 hover:shadow-raised transition h-full">
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
          {
            question: `When should I clean my gutters in ${town.name}?`,
            answer: `For ${town.name} properties, we recommend a two-stage fall schedule: one baseline cleaning before heavy leaf fall and a follow-up once the canopy is bare. Since elevation and tree species vary across ${town.county}, follow the trees rather than a fixed date.`,
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
              <HelpCircle className="w-4 h-4" aria-hidden="true" /> {town.name} FAQs
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
            Still have questions? Talk with our team <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <a
            href="tel:+18285247773"
            className="inline-flex items-center gap-2 text-foreground font-heading font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors min-h-[44px]"
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
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
              <MapPin className="w-4 h-4" aria-hidden="true" /> {town.name}, {town.state}
            </span>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
              Get my written estimate in{" "}
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
                Get my written estimate in {town.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:+18285247773"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] px-6 border border-border font-heading font-bold text-body-xs uppercase tracking-[0.15em] text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
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
        · Roofing &amp; Construction · {LICENSE_NUMBER} · {REVIEW_STARS} Google ({REVIEW_AS_OF})
      </p>
      <div className="flex items-center gap-4">
        <a
          href="tel:+18285247773"
          className="inline-flex items-center gap-2 font-heading font-bold text-body-xs uppercase tracking-[0.15em] hover:opacity-90"
        >
          <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
        </a>
        <div className="w-px h-3 bg-primary-foreground/20" />
        <Link
          to="/request-inspection"
          className="inline-flex items-center gap-2 text-[hsl(var(--gold-ink))] font-heading font-bold text-body-xs uppercase tracking-[0.15em] hover:opacity-90"
        >
          Request Inspection <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.4)] to-transparent" />
  </section>
);