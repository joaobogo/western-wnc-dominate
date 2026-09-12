import { REVIEW_STARS, REVIEW_COUNT, REVIEW_LINE_AS_OF, REVIEW_RATING } from "@/data/business";
import { motion } from "framer-motion";
import {
  Star, Quote, ArrowRight, MessageSquare,
  Hammer, Clock, Heart,
} from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { TrustBadgeStrip, ReassuranceBlock } from "@/components/trust";
import LeaveReviewLink from "@/components/trust/LeaveReviewLink";
import { GOOGLE_REVIEW_AGGREGATE, REVIEWS } from "@/data/reviews";
import ReviewsExplorer from "@/components/reviews/ReviewsExplorer";
import { BUSINESS, directionsUrl, REVIEW_AS_OF, FRANKLIN, SYLVA } from "@/data/business";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

/* ── Recurring Themes ── */

const PULL_QUOTE = REVIEWS.find((r) => r.id === "zary-m-2024") ?? REVIEWS[0];

const themes = [
  {
    icon: MessageSquare,
    title: "Communication",
    description: "Clients consistently highlight clear, proactive communication — daily updates, named contacts, and no unanswered calls.",
  },
  {
    icon: Hammer,
    title: "Workmanship",
    description: "Meticulous installation quality is the most frequently praised aspect. Clients notice the difference between average and Highlander-standard work.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Showing up when promised, finishing on schedule, and doing what was agreed — clients consistently mention reliability as a standout trait.",
  },
  {
    icon: Heart,
    title: "Professionalism",
    description: "Clean job sites, respectful crews, honest assessments, and documentation at every phase. Clients feel respected throughout the process.",
  },
];

const trustMetrics = [
  { value: REVIEW_STARS, label: "Average Rating", detail: "Google & Facebook" },
  { value: `${REVIEW_COUNT}`, label: "Verified Reviews", detail: "Across Platforms" },
  { value: "A+", label: "BBB Accredited", detail: `Since ${BUSINESS.bbbAccreditedSince}` },
  { value: BUSINESS.licenseNumber.replace(/^\D+/, "#"), label: "NC GC License", detail: "Verifiable on the state lookup" },
];

const ReviewsPage = () => {
  return (
    <>
      <SEOHead
        title="Roofing & Construction Reviews in Western NC | Highlander"
        description={`Read verified reviews from Highlander roofing and construction clients across Western North Carolina. ${REVIEW_LINE_AS_OF}.`}
        path="/reviews"
        jsonLd={buildPageSchema({ type: "reviews" })}
      />
      <Header />
      <main id="main-content">
        {/* ── HERO — Pull-quote led (unique to Reviews) ── */}
        <section className="relative section-dark pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <div className="container-tight relative z-10 px-5 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <motion.div {...fadeUp} className="max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                  ))}
                  <span className="ml-2 text-base font-heading font-bold text-[hsl(var(--dark-section-foreground))]">{REVIEW_RATING}</span>
                  <span className="text-sm text-dark-section-muted font-body font-medium ml-1.5">from {GOOGLE_REVIEW_AGGREGATE.reviewCount} verified reviews ({REVIEW_AS_OF})</span>
                </div>
                <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[0.95] tracking-tightest">
                  Trust Is Earned.
                </h1>
                <p className="text-body-lg md:text-body-xl text-white/85 leading-relaxed max-w-xl font-medium drop-shadow-sm">
                  Read what our clients say — the homeowners, property managers, and businesses who've
                  experienced our work firsthand.
                </p>
                {/* Leave a review — one link per showroom profile, Franklin first */}
                <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6">
                  <LeaveReviewLink location={FRANKLIN} className="text-[hsl(var(--gold-ink))]" />
                  <LeaveReviewLink location={SYLVA} className="text-[hsl(var(--gold-ink))]" />
                </div>
              </motion.div>
              {/* Featured pull-quote — unique to Reviews hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="max-w-sm flex-shrink-0"
              >
                <div className="border-l-2 border-[hsl(var(--highland-gold)/0.3)] pl-5">
                  <Quote className="w-4 h-4 text-[hsl(var(--highland-gold)/0.2)] mb-2 rotate-180" aria-hidden="true" />
                  <p className="text-[hsl(var(--dark-section-foreground))] text-base font-body italic leading-relaxed">
                    "{PULL_QUOTE.text}"
                  </p>
                  <p className="text-sm text-[hsl(var(--highland-gold)/0.7)] font-body font-bold mt-2">
                    — {PULL_QUOTE.name}, via {PULL_QUOTE.source}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>



        {/* ── TRUST METRICS ── */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground tartan-dark">
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))' }} />
          <div className="container-tight px-5 md:px-8 py-8 md:py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-dark-section-border">
              {trustMetrics.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex flex-col items-center text-center md:px-6 lg:px-8"
                >
                  <span className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--gold-ink))] leading-none mb-1.5">{stat.value}</span>
                  <span className="text-sm font-heading font-semibold text-primary-foreground mb-1">{stat.label}</span>
                  <span className="text-body-xs text-primary-foreground font-body tracking-wide font-bold">{stat.detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))' }} />
        </section>

        {/* ── PUBLISHED REVIEWS — real, verbatim, each linked to its source ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">Published Reviews</span>
              <h2 className="section-heading mb-4">What Our Clients Say</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-muted-foreground font-body text-body-sm max-w-2xl mx-auto leading-relaxed">
                Every review below is quoted word for word from where the customer published it. Nothing here is written by us.
              </p>
            </motion.div>

            <ReviewsExplorer />
          </div>
        </section>

        <section className="pb-16 md:pb-20 bg-background">
          <div className="container-tight">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative bg-card border border-border rounded-sm p-7 md:p-8 hover:border-[hsl(var(--highland-gold)/0.2)] hover:shadow-flat transition-all duration-300 text-center"
              >
                <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.25)] to-transparent" />
                <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-4">
                  Read every review at the source
                </h3>
                <p className="text-muted-foreground font-body text-body-sm leading-relaxed mb-6">
                  The reviews above are published customer reviews, quoted word for word, each linked to where it appears. For the complete set, visit our Franklin and Sylva Google Business Profiles.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={directionsUrl(FRANKLIN)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn btn-secondary btn-md inline-flex items-center gap-2"
                  >
                    Franklin Google reviews
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href={directionsUrl(SYLVA)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn btn-secondary btn-md inline-flex items-center gap-2"
                  >
                    Sylva Google reviews
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ── RECURRING THEMES ── */}
        <section className="section-padding section-dark tartan-dark">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Recurring Themes</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                What Clients Mention Most
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-dark-section-muted max-w-2xl mx-auto">
                Across hundreds of reviews, four themes emerge consistently. These aren't cherry-picked 
                highlights — they're patterns that define how clients experience working with Highlander.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {themes.map((theme, i) => (
                <motion.div
                  key={theme.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="border border-[hsl(var(--highland-gold)/0.1)] rounded-sm p-6 bg-[hsl(var(--dark-section-foreground)/0.03)]"
                >
                  <div className="w-11 h-11 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mb-4">
                    <theme.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-semibold text-[hsl(var(--dark-section-foreground))] mb-2">{theme.title}</h3>
                  <p className="text-dark-section-muted text-sm leading-relaxed mb-4">{theme.description}</p>
                  <div className="border-t border-[hsl(var(--highland-gold)/0.08)] pt-3">
                    <p className="text-dark-section-muted text-body-xs italic font-body font-medium">
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <ReassuranceBlock
          headline={"See Why Hundreds of WNC\nHomeowners Trust Highlander."}
          subheadline="Experience the communication, craftsmanship, and accountability our clients talk about — start a conversation today."
          ctaText="Get My Questions Answered"
        />

      </main>
      <PageCloseCTA eyebrow="Next Step" heading="Ready to become our next review?" body="Tell us about your property and we'll follow up personally with a clear next step." secondaryLabel="See recent projects" secondaryTo="/recent-projects" context="reviews" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ReviewsPage;
