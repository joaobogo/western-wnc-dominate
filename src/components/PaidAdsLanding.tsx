import CertainTeedPremierBadge from "@/components/trust/CertainTeedPremierBadge";
import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { REVIEWS, reviewDateLabel } from "@/data/reviews";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, MapPin, Phone, Shield, Star } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import SEOHead, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/SEOHead";
import FastLeadForm from "@/components/FastLeadForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackPhoneClick } from "@/lib/gtm";
// The hero sits on a dark scrim, so the cream mark is the legible one.
import logo from "@/assets/logo-cream.svg";

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

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        path={path}
        noindex={true}
        jsonLd={[
          serviceSchema({ name: serviceName, description, url: path }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: serviceName, url: path },
          ]),
          faqSchema(faqs),
        ]}
      />

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
            <div className="flex items-center justify-between border-b border-dark-section-border pb-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold))]"
                aria-label="Highlander Building Services, Inc. — home"
              >
                <img src={logo} alt="Highlander Building Services, Inc." width={160} height={48} className="h-10 w-auto md:h-12" loading="eager" decoding="sync" />
              </Link>
              <a href={PHONE_TEL} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:text-primary-foreground transition-colors">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </div>

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

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }} className="mt-6 hidden flex-wrap gap-3 lg:flex">
                  <a href="#fast-lead-form" className="btn btn-primary btn-md">
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href={PHONE_TEL} className="btn btn-secondary btn-md btn-on-dark">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call Direct: {PHONE_PLAIN}
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
                  <div className="eyebrow mb-3 block">Why people convert here</div>
                  <h2 className="section-heading mb-4">The proof people look for before they call.</h2>
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

        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <div className="mb-10 text-center">
              <div className="eyebrow mb-3 block">Fast path</div>
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
              <div className="eyebrow mb-3 block">Questions before the form</div>
              <h2 className="section-heading mb-4">Common objections, answered.</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
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

        <section className="bg-primary py-10 text-primary-foreground">
          <div className="container-tight flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-heading text-2xl font-bold">Ready for the next step?</div>
              <p className="mt-2 max-w-xl text-sm font-body text-primary-foreground">
                Use the short form above or call our Franklin office during business hours. One page, one action — no hunting around.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#fast-lead-form" className="btn btn-ghost btn-sm">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={PHONE_TEL} className="btn btn-secondary btn-sm btn-on-dark">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Direct: {PHONE_PLAIN}
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-background pb-28 pt-8 md:pb-10">
          <div className="container-tight flex flex-col gap-2 text-xs font-body text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Highlander Building Services, Inc. · Franklin, NC · {PHONE_PLAIN}</span>
            <span className="flex gap-4">
              <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/accessibility" className="hover:text-foreground transition-colors">Accessibility</a>
            </span>
          </div>
        </footer>

        {/* Sticky mobile call bar — one action only; the form already sits above the fold. */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
          <a
              href={PHONE_TEL}
              onClick={() => trackPhoneClick({ phone_number: `${PHONE_PLAIN}`, link_url: PHONE_TEL, click_location: "lp_sticky_mobile", page_type: "paid_landing" })}
              className="flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-base font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Direct: {PHONE_PLAIN}
          </a>
        </div>
      </main>
    </>
  );
};

export default PaidAdsLanding;