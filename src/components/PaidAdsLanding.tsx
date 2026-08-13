import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, MapPin, Phone, Shield, Star } from "lucide-react";
import SEOHead, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/SEOHead";
import FastLeadForm from "@/components/FastLeadForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackPhoneClick } from "@/lib/gtm";
import logo from "@/assets/logo.svg";

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
  urgencyOptions: string[];
  trustStats: Array<{ value: string; label: string; detail: string }>;
  highlights: string[];
  quickSteps: Array<{ title: string; detail: string }>;
  trustBullets: string[];
  testimonial: { quote: string; name: string; location: string };
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
  headline,
  subheadline,
  ctaLabel,
  urgencyOptions,
  trustStats,
  highlights,
  quickSteps,
  trustBullets,
  testimonial,
  faqs,
}: PaidAdsLandingProps) => {
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
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/88 to-background/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-16 pt-4 md:px-8 md:pb-20 md:pt-8 lg:px-16 lg:pb-24">
            <div className="flex items-center justify-between border-b border-primary-foreground/10 pb-3">
              <span className="flex items-center gap-2">
                <img src={logo} alt="Highlander Roofing Services, Inc." width={160} height={48} className="h-10 w-auto md:h-12" loading="eager" decoding="sync" />
                <span className="sr-only">Highlander Roofing Services, Inc.</span>
              </span>
              <a href="tel:+18285247773" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/85 hover:text-primary-foreground transition-colors">
                <Phone className="h-4 w-4" />
                (828) 524-7773
              </a>
            </div>

            <div className="grid gap-6 pt-6 md:pt-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-8 lg:pt-12">
              <div className="order-1 lg:col-span-7 lg:col-start-1 lg:row-start-1">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="mb-3 text-[10px] font-body font-semibold uppercase tracking-[0.24em] text-[hsl(var(--gold-ink))]">
                    {eyebrow}
                  </div>
                  <h1 className="max-w-3xl text-[30px] font-heading font-bold leading-[1.06] text-primary-foreground md:text-5xl lg:text-6xl">
                    {headline}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm font-body leading-relaxed text-primary-foreground/90 md:mt-5 md:text-lg">
                    {subheadline}
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.5 }} className="mt-6 hidden flex-wrap gap-3 lg:flex">
                  <a href="#fast-lead-form" className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="tel:+18285247773" className="inline-flex items-center gap-2 border border-primary-foreground/20 bg-primary-foreground/5 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">
                    <Phone className="h-4 w-4" />
                    Call Direct: 828-524-7773
                  </a>
                </motion.div>
              </div>

              <div className="order-3 lg:col-span-7 lg:col-start-1 lg:row-start-2">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.5 }} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {trustStats.map((item) => (
                    <div key={item.label} className="border border-primary-foreground/12 bg-primary-foreground/5 px-4 py-4">
                      <div className="text-2xl font-heading font-bold text-[hsl(var(--gold-ink))]">{item.value}</div>
                      <div className="mt-1 text-sm font-semibold text-primary-foreground">{item.label}</div>
                      <div className="mt-1 text-xs font-body text-primary-foreground/85">{item.detail}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="order-2 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1" id="fast-lead-form">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }}>
                  <FastLeadForm ctaLabel={ctaLabel} serviceLabel={serviceName} urgencyOptions={urgencyOptions} />
                </motion.div>
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
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                        <p className="text-sm font-body leading-relaxed text-foreground">{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="border border-border bg-secondary/50 px-6 py-6 rounded-sm">
                  <div className="mb-4 flex items-center gap-2 text-primary">
                    <Star className="h-4 w-4" />
                    <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em]">Trust Snapshot</span>
                  </div>
                  <blockquote className="font-heading text-xl font-semibold leading-snug text-foreground">
                    “{testimonial.quote}”
                  </blockquote>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground font-body">
                    <MapPin className="h-4 w-4 text-primary" />
                    {testimonial.name} · {testimonial.location}
                  </div>
                  <div className="mt-6 space-y-3 border-t border-border pt-5">
                    {trustBullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                        <Shield className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
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
              <p className="mt-2 max-w-xl text-sm font-body text-primary-foreground/95">
                Use the short form above or call our Franklin office during business hours. One page, one action — no hunting around.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#fast-lead-form" className="inline-flex items-center justify-center gap-2 bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90">
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+18285247773" className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">
                <Phone className="h-4 w-4" />
                Call Direct: 828-524-7773
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-background pb-28 pt-8 md:pb-10">
          <div className="container-tight flex flex-col gap-2 text-xs font-body text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Highlander Roofing Services, Inc. · Franklin, NC · 828-524-7773</span>
            <span className="flex gap-4">
              <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/accessibility" className="hover:text-foreground transition-colors">Accessibility</a>
            </span>
          </div>
        </footer>

        {/* Sticky mobile call bar — one action, always reachable */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex gap-2">
            <a
              href="tel:+18285247773"
              onClick={() => trackPhoneClick({ phone_number: "828-524-7773", link_url: "tel:+18285247773", click_location: "lp_sticky_mobile", page_type: "paid_landing" })}
              className="flex flex-1 items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Call Direct: 828-524-7773
            </a>
            <a
              href="#fast-lead-form"
              className="flex items-center justify-center border border-primary/40 px-4 py-3 text-sm font-semibold text-primary"
            >
              Form
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default PaidAdsLanding;