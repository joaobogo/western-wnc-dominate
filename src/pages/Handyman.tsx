import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bug, CheckCircle2, ChevronDown, ClipboardList, DoorOpen, Droplets, Home, Layers, Phone, Wrench } from "lucide-react";
import SEOHead, { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ProofKit from "@/components/conversion/ProofKit";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import AnswerBlock from "@/components/seo/AnswerBlock";
import OfficeStatusChip from "@/components/landing/OfficeStatusChip";
import { LICENSE_NUMBER, PHONE_DISPLAY, PHONE_TEL, PRIMARY_HOURS_LABEL, REVIEW_COUNT, REVIEW_RATING } from "@/data/business";
import { CTA, CTA_SECONDARY } from "@/lib/cta-config";
import { smallSrc } from "@/lib/gallery-srcset";
import deckImg from "@/assets/gallery/deck-sylva-doors-wide.webp";
import deckSet from "@/assets/gallery/deck-sylva-doors-wide.webp?w=640;960;1280&format=webp&as=srcset";
import flashingImg from "@/assets/work/roof-chimney-flashing-detail.webp";
import flashingSet from "@/assets/work/roof-chimney-flashing-detail.webp?w=480;800&format=webp&as=srcset";
import gutterImg from "@/assets/work/roof-gutter-guard-eave.webp";
import gutterSet from "@/assets/work/roof-gutter-guard-eave.webp?w=480;800&format=webp&as=srcset";
import trimImg from "@/assets/work/addition-cullowhee-roofline.webp";
import trimSet from "@/assets/work/addition-cullowhee-roofline.webp?w=480;800&format=webp&as=srcset";

const PATH = "/construction/handyman";
const TITLE = "Handyman & Small Home Repairs";

/**
 * Handyman / small-projects page (Nov 2026). Every task listed here is work
 * Highlander's own calls, reviews or documented jobs show it does: deck and
 * railing repair (Sylva job 26-00436), gutter and downspout fixes, fascia /
 * soffit / trim, vent boots and flashing, siding patches, sealing animal entry
 * points, and punch lists. Leads route to the JobTread "Small Projects"
 * division (form-service-context: handyman).
 */
const PHOTO_JOBS = [
  {
    title: "Deck boards, railings & steps",
    text: "Soft boards, wobbly railings and worn steps replaced before someone gets hurt.",
    image: { src: deckImg, srcSet: deckSet, alt: "Rebuilt elevated deck with new boards and railing by Highlander in Sylva, North Carolina", width: 1125, height: 633 },
  },
  {
    title: "Gutter fixes & downspouts",
    text: "Leaking seams, sagging runs and missing downspouts put right so water goes where it should.",
    image: { src: gutterImg, srcSet: gutterSet, alt: "Highlander gutter work: a seamless gutter and downspout along the eave of a shingle roof", width: 1600, height: 900 },
  },
  {
    title: "Vent boots, flashing & small leaks",
    text: "Cracked vent boots, loose flashing and the small drip you keep meaning to deal with.",
    image: { src: flashingImg, srcSet: flashingSet, alt: "Stone chimney with new black metal counter-flashing on a shingle roof", width: 1600, height: 1200 },
  },
  {
    title: "Fascia, soffit, trim & siding",
    text: "Rotted fascia, open soffits, split trim and damaged siding boards repaired and sealed.",
    image: { src: trimImg, srcSet: trimSet, alt: "Lap siding and trim on a Highlander addition in Cullowhee, North Carolina, with its roof tied into the original roofline", width: 1125, height: 1500 },
  },
];

const MORE_JOBS = [
  { icon: Bug, title: "Keeping critters out", text: "Gaps at vents, eaves and rooflines sealed so squirrels and other animals stay out of the attic." },
  { icon: DoorOpen, title: "Doors & exterior carpentry", text: "Sticking or damaged exterior doors, thresholds and small carpentry around the house." },
  { icon: ClipboardList, title: "Home-inspection punch lists", text: "The repair list from a home inspection, handled by one licensed contractor." },
  { icon: Home, title: "Second-home check-ups", text: "Repairs handled while you're away: tell us how to get in and what you've noticed." },
  { icon: Droplets, title: "After-the-leak repairs", text: "Once the source is fixed, the damaged trim, boards and exterior finishes put back right." },
  { icon: Layers, title: "Caulking & sealing", text: "Windows, trim joints and exterior penetrations resealed before the next wet season." },
];

const STEPS = [
  { title: "Call with your list", text: "Tell the Franklin office what needs doing. One item or ten, start with the list you have." },
  { title: "We look at it", text: "We set up a visit to see the work, or tell you on the call if it's a better fit for another team." },
  { title: "Written scope and price", text: "You get the work and the price in writing before anything starts." },
  { title: "Done and checked", text: "The work is scheduled, done and walked through with you, or reported back if you're away." },
];

const FAQS = [
  {
    question: "What happens after I call or send the form?",
    answer: `The Franklin office answers ${PRIMARY_HOURS_LABEL}, Eastern Time. We go through your list, set up a visit if one is needed, and give you the scope and price in writing before any work starts.`,
  },
  {
    question: "Is any job too small?",
    answer: "Call and tell us what's on the list. The office will tell you on the call whether a job is a fit and how it would be scheduled. Several small items on one property are often easiest to handle together.",
  },
  {
    question: "Can you handle repairs while I'm out of town?",
    answer: "Yes, for many exterior repairs. Tell us how to access the property and what you've noticed, and we'll report back with what we found and what we did.",
  },
  {
    question: "How is handyman work priced?",
    answer: "From a written scope for your list: what needs doing, materials and access. There's no surprise add-on; you see the price before the work is scheduled.",
  },
  {
    question: "What if the small repair turns out to be a bigger problem?",
    answer: "Then you'll hear it straight. Highlander is a roofing company and licensed general contractor, so the same team can scope the bigger repair if you want it, with no pressure to do more than you need.",
  },
];

const Handyman = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const description =
    "Handyman and small home repairs in Western North Carolina: deck and railing fixes, gutters, flashing, trim, siding and punch lists from a licensed local contractor.";

  return (
    <>
      <SEOHead
        title="Handyman & Small Home Repairs in WNC | Highlander"
        description={description}
        path={PATH}
        jsonLd={[
          serviceSchema({ name: TITLE, description, url: PATH }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: TITLE, url: PATH },
          ]),
          faqSchema(FAQS),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: TITLE, url: PATH }]} />

      <main id="main-content" className="bg-background">
        {/* Hero: real Highlander job, call first */}
        <section className="relative isolate overflow-hidden bg-[hsl(var(--dark-section))] text-white">
          <div className="absolute inset-0 -z-10">
            <img
              src={deckImg}
              srcSet={deckSet}
              sizes="100vw"
              alt="Rebuilt elevated deck with new boards and railing by Highlander in Sylva, North Carolina"
              width={1125}
              height={633}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(160_45%_6%/0.9)_0%,hsl(160_45%_6%/0.7)_45%,hsl(160_45%_6%/0.3)_100%)]" />
          </div>
          <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
            <OfficeStatusChip tone="dark" className="mb-5" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Small jobs · Western North Carolina</p>
            <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.05] !text-white md:text-6xl">
              Handyman &amp; Small Home Repairs in Western NC
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              The deck board that gives, the gutter that drips, the trim that's started to rot. Call with your list and a licensed local contractor takes care of it, in writing, start to finish.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_TEL} data-cta="handyman-hero" data-gtm-location="hero" className="btn btn-primary btn-md w-full justify-center sm:w-auto">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CTA_SECONDARY.callLabel}
              </a>
              <a href="#estimate-form" className="btn btn-secondary btn-md btn-on-dark w-full justify-center sm:w-auto">
                {CTA.mobileSticky}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
              <li>{REVIEW_RATING}★ · {REVIEW_COUNT} Google reviews</li>
              <li>Licensed &amp; insured · {LICENSE_NUMBER}</li>
              <li>Franklin office, {PRIMARY_HOURS_LABEL}</li>
            </ul>
          </div>
        </section>

        <AnswerBlock
          question="Does Highlander do handyman work?"
          answer="Yes. Highlander handles small repairs around the house across Western North Carolina: deck boards and railings, gutter fixes and downspouts, vent boots and flashing, fascia, soffit, trim and siding, sealing animal entry points and home-inspection punch lists. You call with your list and get the scope and price in writing before work starts."
        />

        {/* Most-requested small jobs, with photos of real Highlander work */}
        <section aria-labelledby="small-jobs" className="section-padding bg-secondary/40">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <p className="eyebrow mb-2 block">What we fix</p>
            <h2 id="small-jobs" className="section-heading">The small jobs homeowners call us for</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PHOTO_JOBS.map((job) => (
                <li key={job.title} className="flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-sm">
                  <img
                    src={smallSrc(job.image.src)}
                    srcSet={job.image.srcSet}
                    sizes="(min-width:1024px) 290px, (min-width:640px) 50vw, 100vw"
                    alt={job.image.alt}
                    width={job.image.width}
                    height={job.image.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col border-t-4 border-[hsl(var(--highland-gold))] p-5">
                    <h3 className="font-heading text-xl font-bold">{job.title}</h3>
                    <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{job.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MORE_JOBS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4 rounded-sm border border-border bg-card p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-heading text-lg font-bold">{title}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-muted-foreground">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_TEL} data-cta="handyman-list" data-gtm-location="content" className="btn btn-primary btn-md justify-center">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call with your list: {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* Process */}
        <section aria-labelledby="how-it-works" className="section-padding">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <p className="eyebrow mb-2 block">What happens when you call</p>
            <h2 id="how-it-works" className="section-heading">One call, one list, one contractor</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-4">
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative rounded-sm border border-border bg-card p-6">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--highland-gold))] font-bold text-foreground">{i + 1}</span>
                  <h3 className="font-heading text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why a licensed contractor */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Why Highlander for small jobs</p>
              <h2 className="font-heading text-3xl font-bold !text-primary-foreground md:text-4xl">Small repairs, done by the people who build the whole house.</h2>
            </div>
            <ul className="grid gap-4">
              {[
                "A roofing company and licensed general contractor, so a small fix never hides a bigger problem.",
                "Scope and price in writing before work starts.",
                "One Franklin office to call, Monday to Friday, 8 AM to 5 PM Eastern.",
                "Licensed and insured, with real reviews from your neighbors.",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[1.02rem] leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="handyman-faq" className="section-padding">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <h2 id="handyman-faq" className="section-heading text-center">Questions about small jobs</h2>
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-sm border border-border bg-card">
              {FAQS.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.question}>
                    <h3>
                      <button
                        type="button"
                        id={`hm-faq-q-${i}`}
                        aria-expanded={open}
                        aria-controls={`hm-faq-a-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex min-h-[3.5rem] w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-lg font-bold hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                      >
                        {faq.question}
                        <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={`hm-faq-a-${i}`} role="region" aria-labelledby={`hm-faq-q-${i}`} hidden={!open}>
                      <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bigger project? */}
        <section className="section-padding bg-secondary/40">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">Bigger than a fix?</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">The same team handles full repairs and projects.</p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {[
                { label: "Roof repair", href: "/roofing/roof-repair" },
                { label: "Seamless gutters", href: "/roofing/gutters" },
                { label: "Decks & outdoor living", href: "/construction/outdoor-living" },
                { label: "Siding & exterior", href: "/construction/siding" },
                { label: "All services", href: "/services" },
              ].map((link) => (
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

        <ProofKit topic="handyman" reviews articles />

        {/* Form: 3 fields, routed to the JobTread Small Projects division */}
        <div id="estimate-form">
          <InspectionForm />
        </div>

        <section className="bg-[hsl(var(--dark-section))] text-white">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="font-heading text-3xl font-bold !text-white">Got a list? Call it in.</h2>
              <p className="mt-2 text-white/85">The Franklin office answers {PRIMARY_HOURS_LABEL}, Eastern Time.</p>
            </div>
            <a href={PHONE_TEL} data-cta="handyman-closing" data-gtm-location="closing" className="btn btn-primary btn-md justify-center">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              {CTA_SECONDARY.callLabel}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Handyman;
