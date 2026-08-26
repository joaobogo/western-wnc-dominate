import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mountain, Snowflake } from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TrustStrip from "@/components/TrustStrip";
import InspectionForm from "@/components/InspectionForm";
import AnswerBlock from "@/components/seo/AnswerBlock";
import RelatedLinks from "@/components/RelatedLinks";
import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import {
  metalSystems,
  metalCostFactors,
  metalCostAnswer,
  METAL_COST_YEAR,
} from "@/data/metal-roof-cost";

const faqs = [
  {
    q: "How much does a metal roof cost in Western North Carolina?",
    a: `In ${METAL_COST_YEAR}, installed metal roofing in Western NC generally runs $650–$1,100 per square for exposed-fastener panels, $1,000–$1,700 per square for metal shingles, and $1,300–$2,100 per square for standing seam. A square is 100 square feet of roof surface, which is more than 100 square feet of floor area once pitch is counted.`,
  },
  {
    q: "Is metal more expensive than a shingle roof here?",
    a: "On quote day, yes — standing seam commonly runs two to three times a dimensional asphalt roof on the same house. Over a 40-year window the math narrows considerably, because a metal roof typically outlives two shingle roofs and holds up better to ice loading and wind at elevation.",
  },
  {
    q: "Do I need snow guards on a mountain metal roof?",
    a: "Anywhere the roof sheds over an entry, walkway, deck, driveway, or gas meter, yes. Metal releases snow in sheets rather than melting it off gradually. Engineered retention is sized to the elevation-driven snow load and generally adds $12–$25 per linear foot.",
  },
  {
    q: "Why do two similar homes get very different metal quotes?",
    a: "Pitch, access, and detail count. A 9/12 roof on a switchback drive with four dormers and two valleys takes far more staging and custom flashing than a walkable 5/12 gable of the same square footage — even with identical panels.",
  },
  {
    q: "Can metal go over an existing shingle roof?",
    a: "Sometimes, on a sound single-layer deck with the right framing. We inspect the decking first. If the deck is soft or already carries two layers, we tear off — laying metal over a compromised deck buys a few dollars now and costs a roof later.",
  },
  {
    q: "Are these prices a quote?",
    a: `No. They are honest ${METAL_COST_YEAR} ranges for Western North Carolina so you can budget. Your number is confirmed in writing after a measured on-site inspection, including a per-sheet decking rate agreed before tear-off.`,
  },
];

const MetalRoofingCost = () => (
  <>
    <SEOHead
      title={`Metal Roofing Cost in Western NC (${METAL_COST_YEAR} Guide) | Highlander`}
      description={`What a metal roof costs in Western North Carolina in ${METAL_COST_YEAR}: installed price per square for standing seam, exposed fastener, and metal shingles, plus mountain-specific cost factors.`}
      path="/roofing/metal/cost"
      jsonLd={buildPageSchema({
        type: "service",
        service: {
          name: "Metal Roofing Cost Estimating",
          description:
            "Measured, written metal roofing estimates for homeowners across Western North Carolina — standing seam, exposed fastener, and metal shingle systems.",
          url: "/roofing/metal/cost",
          areaServed: "Western North Carolina",
        },
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Roofing", url: "/roofing" },
          { name: "Metal Roofing", url: "/roofing/metal" },
          { name: "Metal Roofing Cost", url: "/roofing/metal/cost" },
        ],
        faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
      })}
    />
    <Header />
    <PageBreadcrumbs
      items={[
        { name: "Home", url: "/" },
        { name: "Roofing", url: "/roofing" },
        { name: "Metal Roofing", url: "/roofing/metal" },
        { name: "Metal Roofing Cost", url: "/roofing/metal/cost" },
      ]}
    />

    <main id="main-content">
      {/* HERO */}
      <section className="bg-heritage-charcoal hero-clears-header pb-14 md:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }}
        />
        <div className="container-tight relative z-10">
          <span className="text-caption md:text-body-xs font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))] block mb-4">
            {METAL_COST_YEAR} Cost Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 max-w-4xl">
            Metal Roofing Cost in{" "}
            <span className="text-[hsl(var(--gold-ink))]">Western NC</span> ({METAL_COST_YEAR})
          </h1>
          <p className="text-white/95 text-lg md:text-xl max-w-2xl leading-relaxed font-body mb-8">
            Installed price ranges per square by system, and the mountain conditions — pitch, access,
            and snow retention — that decide where inside the range your roof lands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/request-inspection" className="btn btn-primary btn-md">
              Get My Written Estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={PHONE_TEL}
              aria-label={`Call Highlander Building Services at ${PHONE_PLAIN}`}
              className="btn btn-secondary btn-md btn-on-dark"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ANSWER-FIRST */}
      <section className="section-padding bg-background">
        <div className="container-tight max-w-4xl">
          <AnswerBlock
            question={`How much does a metal roof cost in Western North Carolina in ${METAL_COST_YEAR}?`}
            answer={metalCostAnswer}
            points={[
              "Exposed fastener: $650–$1,100 per installed square",
              "Metal shingles: $1,000–$1,700 per installed square",
              "Standing seam: $1,300–$2,100 per installed square",
              "Ranges, not quotes — your number is measured and written",
            ]}
          />
        </div>
      </section>

      {/* SYSTEMS */}
      <section className="section-padding bg-secondary">
        <div className="container-tight max-w-5xl">
          <span className="text-caption font-body font-bold uppercase tracking-[0.3em] text-primary block mb-3">
            System by system
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Metal roofing prices per square
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mb-10 leading-relaxed">
            One roofing square is 100 square feet of roof surface. A 2,000 sq ft mountain home with a
            steep pitch commonly carries 24–30 squares once the roof planes are measured.
          </p>

          <div className="space-y-6">
            {metalSystems.map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-background border border-border rounded-sm p-6 md:p-8"
              >
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">{m.name}</h3>
                <p className="text-lg font-body font-bold text-primary mb-1">{m.rangePerSquare}</p>
                <p className="text-sm text-muted-foreground font-body mb-1">{m.rangePerSqFt}</p>
                <p className="text-sm text-muted-foreground font-body mb-4">Service life: {m.lifespan}</p>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">{m.body}</p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  <span className="font-bold text-foreground">Best fit: </span>
                  {m.bestFor}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* MOUNTAIN FACTORS */}
      <section className="section-padding bg-heritage-charcoal">
        <div className="container-tight max-w-5xl">
          <span className="text-caption font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))] block mb-3 flex items-center gap-2">
            <Mountain className="w-4 h-4" aria-hidden="true" /> Mountain-specific factors
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-10">
            What moves a metal roof inside the range
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {metalCostFactors.map((f) => (
              <div key={f.title} className="flex gap-4">
                <Snowflake
                  className="w-5 h-5 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2">{f.title}</h3>
                  <p className="text-white/80 font-body leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-tight max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
            Metal roofing cost questions
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-l-2 border-primary/30 pl-5 py-1">
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InspectionForm />

      <RelatedLinks
        heading="Keep reading"
        links={[
          { label: "Metal roofing in Western North Carolina", href: "/roofing/metal" },
          { label: "Full Western NC roofing cost guide", href: "/roofing-cost-western-nc" },
          { label: "Metal vs. shingle roofs in Western NC", href: "/blog/metal-vs-shingle-roof-western-nc" },
          { label: "Roof replacement in Western NC", href: "/roofing/roof-replacement" },
          { label: "Roof financing options", href: "/financing" },
        ]}
      />
    </main>

    <Footer />
    <StickyMobileCTA />
  </>
);

export default MetalRoofingCost;
