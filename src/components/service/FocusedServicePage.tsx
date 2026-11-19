import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, Phone } from "lucide-react";
import SEOHead, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ProofKit from "@/components/conversion/ProofKit";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import AnswerBlock from "@/components/seo/AnswerBlock";
import OfficeStatusChip from "@/components/landing/OfficeStatusChip";
import { LICENSE_NUMBER, PHONE_TEL, PRIMARY_HOURS_LABEL } from "@/data/business";
import { CTA, CTA_SECONDARY } from "@/lib/cta-config";
import type { ProofTopic } from "@/lib/proof-kit";

export interface FocusedServicePageProps {
  path: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  parent: { name: string; url: string };
  eyebrow: string;
  h1: string;
  intro: string;
  /** Leave out until a real, matching photo exists: the hero then uses the blueprint background. */
  image?: { src: string; srcSet?: string; alt: string; width: number; height: number };
  /** Off where the review library has nothing about this kind of work. */
  showReviews?: boolean;
  quick: { question: string; answer: string };
  scopeEyebrow: string;
  scopeHeading: string;
  scope: Array<{ title: string; text: string }>;
  decisionsHeading: string;
  decisions: string[];
  steps: Array<{ title: string; text: string }>;
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
  closingHeading: string;
  topic: ProofTopic;
  ctaId: string;
}

/** One focused service, in the same call-first order as the handyman page. */
export default function FocusedServicePage({ showReviews = true, ...p }: FocusedServicePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const crumbs = [{ name: "Home", url: "/" }, p.parent, { name: p.name, url: p.path }];
  return (
    <>
      <SEOHead
        title={p.seoTitle}
        description={p.seoDescription}
        path={p.path}
        jsonLd={[serviceSchema({ name: p.name, description: p.seoDescription, url: p.path }), breadcrumbSchema(crumbs), faqSchema(p.faqs)]}
      />
      <Header />
      <PageBreadcrumbs items={crumbs} />
      <main id="main-content" className="bg-background">
        <section className={`relative isolate overflow-hidden bg-[hsl(var(--dark-section))] text-white ${p.image ? "" : "blueprint-dark"}`}>
          {p.image && (
            <div className="absolute inset-0 -z-10">
              <img src={p.image.src} srcSet={p.image.srcSet} sizes="100vw" alt={p.image.alt} width={p.image.width} height={p.image.height} loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(160_45%_6%/0.9)_0%,hsl(160_45%_6%/0.72)_50%,hsl(160_45%_6%/0.35)_100%)]" />
            </div>
          )}
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
            <OfficeStatusChip tone="dark" className="mb-5" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">{p.eyebrow}</p>
            <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.05] !text-white md:text-6xl">{p.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">{p.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_TEL} data-cta={`${p.ctaId}-hero`} data-gtm-location="hero" className="btn btn-primary btn-md w-full justify-center sm:w-auto">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CTA_SECONDARY.callLabel}
              </a>
              <a href="#estimate-form" className="btn btn-secondary btn-md btn-on-dark w-full justify-center sm:w-auto">
                {CTA.mobileSticky}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
              <li>Licensed &amp; insured · {LICENSE_NUMBER}</li>
              <li>Franklin office, {PRIMARY_HOURS_LABEL}</li>
            </ul>
          </div>
        </section>

        <AnswerBlock question={p.quick.question} answer={p.quick.answer} />

        <section aria-labelledby={`${p.ctaId}-scope`} className="section-padding bg-secondary/40">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <p className="eyebrow mb-2 block">{p.scopeEyebrow}</p>
            <h2 id={`${p.ctaId}-scope`} className="section-heading">{p.scopeHeading}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {p.scope.map((item) => (
                <div key={item.title} className="rounded-sm border border-border bg-card p-6">
                  <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
            <h2 className="font-heading text-3xl font-bold !text-primary-foreground md:text-4xl">{p.decisionsHeading}</h2>
            <ul className="grid gap-4">
              {p.decisions.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[1.02rem] leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby={`${p.ctaId}-steps`} className="section-padding">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <p className="eyebrow mb-2 block">What happens when you call</p>
            <h2 id={`${p.ctaId}-steps`} className="section-heading">From the first call to the walkthrough</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-4">
              {p.steps.map((step, i) => (
                <li key={step.title} className="rounded-sm border border-border bg-card p-6">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--highland-gold))] font-bold text-foreground">{i + 1}</span>
                  <h3 className="font-heading text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby={`${p.ctaId}-faq`} className="section-padding bg-secondary/40">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <h2 id={`${p.ctaId}-faq`} className="section-heading text-center">Common questions</h2>
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-sm border border-border bg-card">
              {p.faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.question}>
                    <h3>
                      <button type="button" id={`${p.ctaId}-q-${i}`} aria-expanded={open} aria-controls={`${p.ctaId}-a-${i}`} onClick={() => setOpenFaq(open ? null : i)} className="flex min-h-[3.5rem] w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-lg font-bold hover:bg-secondary">
                        {faq.question}
                        <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={`${p.ctaId}-a-${i}`} role="region" aria-labelledby={`${p.ctaId}-q-${i}`} hidden={!open}>
                      <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {p.related.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-border bg-card px-4 font-semibold hover:border-primary">
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProofKit topic={p.topic} reviews={showReviews} articles />
        <div id="estimate-form"><InspectionForm /></div>

        <section className="bg-[hsl(var(--dark-section))] text-white">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="font-heading text-3xl font-bold !text-white">{p.closingHeading}</h2>
              <p className="mt-2 text-white/85">The Franklin office answers {PRIMARY_HOURS_LABEL}, Eastern Time.</p>
            </div>
            <a href={PHONE_TEL} data-cta={`${p.ctaId}-closing`} data-gtm-location="closing" className="btn btn-primary btn-md justify-center">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CTA_SECONDARY.callLabel}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
