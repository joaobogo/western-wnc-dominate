import CertainTeedPremierBadge from "@/components/trust/CertainTeedPremierBadge";
import { PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { REVIEWS, reviewDateLabel } from "@/data/reviews";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Phone, Shield, Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import SEOHead, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/SEOHead";
import FastLeadForm from "@/components/FastLeadForm";
import Header from "@/components/Header";
import OfficeStatusChip from "@/components/landing/OfficeStatusChip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackPhoneClick } from "@/lib/gtm";
import ProofKit from "@/components/conversion/ProofKit";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { CTA, CTA_SECONDARY } from "@/lib/cta-config";
import { ROOF_PROJECT_PHOTOS } from "@/components/landing/config";
import { smallSrc } from "@/lib/gallery-srcset";

interface PaidAdsLandingProps {
  title: string;
  description: string;
  path: string;
  serviceName: string;
  heroImage: string;
  heroAlt: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  /**
   * Message match (Prompt 40): the landing headline must repeat the ad promise
   * word for word. Each ad variant passes `?v=<key>`; unknown keys fall back to
   * the default headline, so the page can never render arbitrary ad copy.
   */
  adVariants?: Record<string, { headline: string; subheadline?: string; ctaLabel?: string }>;
  urgencyOptions: string[];
  trustStats: Array<{ value: string; label: string; detail: string }>;
  highlights: string[];
  quickSteps: Array<{ title: string; detail: string }>;
  trustBullets: string[];
  /** id of a published review in src/data/reviews.ts. Never free text. */
  reviewId: string;
  faqs: Array<{ question: string; answer: string }>;
}

const PaidAdsLanding = ({
  title,
  description,
  path,
  serviceName,
  heroImage,
  heroAlt,
  eyebrow,
  headline: defaultHeadline,
  subheadline: defaultSubheadline,
  ctaLabel: defaultCtaLabel,
  adVariants,
  urgencyOptions,
  trustStats,
  highlights,
  quickSteps,
  trustBullets,
  reviewId,
  faqs,
}: PaidAdsLandingProps) => {
  const review = REVIEWS.find((r) => r.id === reviewId) ?? REVIEWS[0];
  const [searchParams] = useSearchParams();
  const variant = adVariants?.[searchParams.get("v") ?? ""];
  const headline = variant?.headline ?? defaultHeadline;
  const subheadline = variant?.subheadline ?? defaultSubheadline;
  const ctaLabel = variant?.ctaLabel ?? defaultCtaLabel;
  const slug = path.split("/").filter(Boolean).pop() ?? "lp";
  /** Each call button reports its placement (phone_click is de-duplicated per tap). */
  const trackCall = (placement: string) =>
    trackPhoneClick({ phone_number: PHONE_PLAIN, link_url: PHONE_TEL, click_location: `lp_${slug}_${placement}`, page_type: "paid_landing" });
  // Build Brief B10: every landing page answers "what happens after I call?" first.
  const allFaqs = [
    {
      question: "What happens after I call or send the form?",
      answer:
        "The Franklin office answers Monday to Friday, 8 AM to 5 PM Eastern. We ask what you're seeing and set up a visit to look at the roof. You get the scope and price in writing before any work starts. Calling is the fastest way onto the schedule.",
    },
    ...faqs.filter((f) => !/^What happens after/i.test(f.question)),
  ];
  const proofTopic = slug === "roof-replacement" ? "replacement" : slug === "roof-repair" ? "repair" : slug === "storm-damage" ? "storm" : "roofing";
  const scrollToForm = () => {
    const el = document.getElementById("fast-lead-form");
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        path={path}
        // Paid pages stay out of the index but pass link equity, matching the
        // prerendered shell from emit-landing-shells (noindex,follow).
        noindex="follow"
        jsonLd={[
          serviceSchema({ name: serviceName, description, url: path }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: serviceName, url: path },
          ]),
          faqSchema(allFaqs),
        ]}
      />

      {/* Full site header and menu (John, 17 Nov 2026). The estimate buttons
          scroll to this page's form so ad leads keep their form and tracking. */}
      <Header onEstimateClick={scrollToForm} />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: serviceName, url: path }]} />

      <main id="main-content" className="bg-background">
        <section className="relative overflow-hidden section-dark">
          <div className="absolute inset-0">
            <img width={1600} height={1067} decoding="async" src={heroImage} alt={heroAlt} className="h-full w-full object-cover" loading="eager" />
            {/* Dark scrim. The hero content uses the dark-section tokens (near-white
                text, gold accents), so the photo must sit under a dark wash, not the
                white one that used to be here — `from-background/97` also silently
                failed to compile, leaving light text on an unscrimmed photo. */}
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--dark-section)/0.94)] via-[hsl(var(--dark-section)/0.8)] to-[hsl(var(--dark-section)/0.45)]" />
            <div className="absolute inset-0 bg-[hsl(var(--dark-section)/0.4)] md:bg-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--dark-section)/0.9)] via-transparent to-[hsl(var(--dark-section)/0.55)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-16 pt-4 md:px-8 md:pb-20 md:pt-8 lg:px-16 lg:pb-24">
            <OfficeStatusChip tone="dark" />

            <div className="grid gap-6 pt-6 md:pt-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-8 lg:pt-12">
              <div className="order-1 lg:col-span-7 lg:col-start-1 lg:row-start-1">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div className="mb-3 text-caption font-body font-semibold uppercase tracking-[0.24em] text-[hsl(var(--gold-ink))]">
                    {eyebrow}
                  </div>
                  <h1 className="max-w-3xl text-heading-sm font-heading font-bold leading-[1.06] text-primary-foreground md:text-5xl lg:text-6xl">
                    {headline}
                  </h1>
                  {/* Hidden on phones so the form clears the fold; repeated under the form below. */}
                  <p className="mt-3 hidden max-w-2xl text-sm font-body leading-relaxed text-primary-foreground md:mt-5 md:block md:text-lg">
                    {subheadline}
                  </p>
                </motion.div>

                {/* Calls first (Build Brief B2): full-width call on phones, then the form. */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={PHONE_TEL} data-cta="hero" onClick={() => trackCall("hero")} className="btn btn-primary btn-md w-full justify-center sm:w-auto">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {CTA_SECONDARY.callLabel}
                  </a>
                  <a href="#fast-lead-form" className="btn btn-secondary btn-md btn-on-dark w-full justify-center sm:w-auto">
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.div>
              </div>

              <div className="order-3 lg:col-span-7 lg:col-start-1 lg:row-start-2">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.4 }} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {trustStats.map((item) => (
                    <div key={item.label} className="border border-dark-section-border bg-primary-foreground/5 px-4 py-4">
                      {item.value.includes("CertainTeed") && <CertainTeedPremierBadge className="mb-2 h-20 w-20" />}
                      <div className="text-2xl font-heading font-bold text-[hsl(var(--gold-ink))]">{item.value}</div>
                      <div className="mt-1 text-sm font-semibold text-primary-foreground">{item.label}</div>
                      <div className="mt-1 text-xs font-body text-primary-foreground">{item.detail}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="order-2 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1" id="fast-lead-form">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4 }}>
                  <FastLeadForm ctaLabel={ctaLabel} serviceLabel={serviceName} urgencyOptions={urgencyOptions} />
                </motion.div>
                <p className="mt-4 text-sm font-body leading-relaxed text-primary-foreground md:hidden">
                  {subheadline}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="mb-8">
                  <div className="eyebrow mb-3 block">Why homeowners call Highlander</div>
                  <h2 className="section-heading mb-4">What you get when you call.</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {highlights.map((highlight) => (
                    <div key={highlight} className="border border-border bg-card px-5 py-5 rounded-sm">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                        <p className="text-sm font-body leading-relaxed text-foreground">{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="border border-border bg-secondary/50 px-6 py-6 rounded-sm">
                  <div className="mb-4 flex items-center gap-2 text-primary">
                    <Star className="h-4 w-4" aria-hidden="true" />
                    <span className="text-caption font-body font-semibold uppercase tracking-[0.2em]">Trust Snapshot</span>
                  </div>
                  {/* Real published review, clamped in CSS only. */}
                  <blockquote className="font-heading text-xl font-semibold leading-snug text-foreground line-clamp-6">
                    “{review.text}”
                  </blockquote>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground font-body">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    {review.name}{reviewDateLabel(review) ? ` · ${reviewDateLabel(review)}` : ""} ·{" "}
                    <a
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-foreground transition-colors"
                    >
                      via {review.source}
                    </a>
                  </div>
                  <div className="mt-6 space-y-3 border-t border-border pt-5">
                    {trustBullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                        <Shield className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real, documented Highlander roofs: photos before the process. */}
        <section aria-labelledby="recent-roofs" className="section-padding bg-background">
          <div className="container-tight">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="eyebrow mb-3 block">Recent work</div>
                <h2 id="recent-roofs" className="section-heading">Highlander roofs across Western NC.</h2>
              </div>
              <a
                href="/recent-projects"
                target="_blank"
                rel="noopener"
                data-gtm-cta="lp_explore"
                data-gtm-location="proof_projects"
                className="inline-flex min-h-12 items-center gap-1.5 font-bold text-primary underline-offset-4 hover:underline"
              >
                See recent projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="grid gap-5 md:grid-cols-3">
              {ROOF_PROJECT_PHOTOS().map((project) => (
                <li key={project.town} className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
                  <div className="relative">
                    <img
                      src={project.image.srcSet ? smallSrc(project.image.src) : project.image.src}
                      srcSet={project.image.srcSet}
                      sizes="(min-width:768px) 380px, 100vw"
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-xs font-bold shadow">
                      <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      {project.town}
                    </span>
                  </div>
                  <p className="border-t-4 border-[hsl(var(--highland-gold))] px-5 py-4 font-heading text-lg font-bold">{project.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <div className="mb-10 text-center">
              <div className="eyebrow mb-3 block">What happens when you call</div>
              <h2 className="section-heading mb-4">What happens after you reach out.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {quickSteps.map((step, index) => (
                <div key={step.title} className="border border-border bg-card px-5 py-6 rounded-sm">
                  <div className="mb-3 text-sm font-heading font-bold text-primary">0{index + 1}</div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm font-body leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <div className="mb-10 text-center">
              <div className="eyebrow mb-3 block">Before you call</div>
              <h2 className="section-heading mb-4">Common questions, answered.</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {allFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-sm border border-border bg-card px-5">
                  <AccordionTrigger className="gap-4 py-5 text-left">
                    <span className="font-heading text-base font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-sm font-body leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* More proof before the last call to action: reviews and related reading (new tab). */}
        <ProofKit topic={proofTopic} reviews articles newTab />

        <section className="bg-primary py-10 text-primary-foreground">
          <div className="container-tight flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-heading text-2xl font-bold">Ready for the next step?</div>
              <p className="mt-2 max-w-xl text-sm font-body text-primary-foreground">
                Call the Franklin office, Monday to Friday, 8 AM to 5 PM Eastern, or use the short form above and we call you back.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_TEL} data-cta="closing" onClick={() => trackCall("closing")} className="btn btn-secondary btn-sm btn-on-dark">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CTA_SECONDARY.callLabel}
              </a>
              <a href="#fast-lead-form" className="btn btn-ghost btn-sm">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Sticky mobile bar: call (70%) + written estimate (30%). The call keeps
            its existing GTM label lp_sticky_mobile so reports stay comparable. */}
        <div
          data-sticky-cta="mobile"
          className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[7fr_3fr] gap-2 border-t border-border bg-background/95 px-3 py-3 backdrop-blur md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <a
            href={PHONE_TEL}
            data-cta="sticky-mobile"
            onClick={() => trackPhoneClick({ phone_number: `${PHONE_PLAIN}`, link_url: PHONE_TEL, click_location: "lp_sticky_mobile", page_type: "paid_landing" })}
            className="flex min-h-12 w-full items-center justify-center gap-1.5 bg-primary px-2 text-[0.85rem] font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {CTA_SECONDARY.callLabel}
          </a>
          <button
            type="button"
            onClick={scrollToForm}
            className="flex min-h-12 w-full items-center justify-center border border-border bg-card px-1 text-center text-[0.75rem] font-semibold leading-tight text-foreground"
          >
            {CTA.mobileSticky}
          </button>
        </div>
      </main>

      {/* Site footer, as on every other page; its estimate button scrolls to the form. */}
      <Footer onEstimateClick={scrollToForm} />
    </>
  );
};

export default PaidAdsLanding;