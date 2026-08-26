import { REVIEW_STARS, REVIEW_COUNT, REVIEW_LINE_AS_OF, REVIEW_RATING } from "@/data/business";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Quote, ArrowRight, Phone, CheckCircle, MessageSquare,
  Hammer, Clock, Heart, Shield, Users, ThumbsUp, Award,
} from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { TrustBadgeStrip, ReassuranceBlock } from "@/components/trust";
import { customerReviews, GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";
import { AlertCircle, Camera, Link2, Mail } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

/* ── Review Data ── */

const reviews = customerReviews;

const categoryLabels: Record<string, string> = {
  all: "All Reviews",
  roofing: "Roofing",
  construction: "Construction",
  storm: "Storm & Insurance",
  commercial: "Commercial",
};

const categoryColors: Record<string, string> = {
  roofing: "bg-primary/10 text-primary",
  construction: "bg-[hsl(var(--highland-gold)/0.12)] text-[hsl(var(--gold-ink))]",
  storm: "bg-destructive/10 text-alert-ink",
  commercial: "bg-secondary text-muted-foreground",
};

/* ── Recurring Themes ── */

const themes = [
  {
    icon: MessageSquare,
    title: "Communication",
    description: "Clients consistently highlight clear, proactive communication — daily updates, named contacts, and no unanswered calls.",
    quote: "We always knew exactly what was happening and who to call.",
  },
  {
    icon: Hammer,
    title: "Workmanship",
    description: "Meticulous installation quality is the most frequently praised aspect. Clients notice the difference between average and Highlander-standard work.",
    quote: "The craftsmanship is outstanding — same attention to detail on everything.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Showing up when promised, finishing on schedule, and doing what was agreed — clients consistently mention reliability as a standout trait.",
    quote: "They finished ahead of schedule. That never happens with contractors.",
  },
  {
    icon: Heart,
    title: "Professionalism",
    description: "Clean job sites, respectful crews, honest assessments, and documentation at every phase. Clients feel respected throughout the process.",
    quote: "From inspection to walkthrough, everything was documented and clear.",
  },
];

const trustMetrics = [
  { value: REVIEW_STARS, label: "Average Rating", detail: "Google & Facebook" },
  { value: `${REVIEW_COUNT}+`, label: "Verified Reviews", detail: "Across Platforms" },
  { value: "98%", label: "Would Recommend", detail: "Client Survey" },
  { value: "Zero", label: "Unresolved Complaints", detail: "BBB Record" },
];

const ReviewsPage = () => {
  const [filter, setFilter] = useState("all");
  const featured = reviews.filter((r) => r.featured);
  const filtered = filter === "all" ? reviews.filter((r) => !r.featured) : reviews.filter((r) => r.category === filter && !r.featured);

  return (
    <>
      <SEOHead
        title="Reviews & Reputation | What Clients Say About Highlander"
        description={`Read verified reviews from Highlander Building Services clients across Western North Carolina. ${REVIEW_LINE_AS_OF}.`}
        path="/reviews"
        jsonLd={buildPageSchema({
          type: "reviews",
          reviews: reviews.map((review) => ({
            author: review.authorName,
            rating: review.ratingValue,
            body: review.reviewBody,
            datePublished: review.datePublished,
            location: review.location,
          })),
        })}
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
                  <span className="text-sm text-dark-section-muted font-body font-medium ml-1.5">from {GOOGLE_REVIEW_AGGREGATE.reviewCount}+ verified reviews</span>
                </div>
                <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[0.95] tracking-tightest">
                  Trust Is Earned.
                </h1>
                <p className="text-body-lg md:text-body-xl text-white/85 leading-relaxed max-w-xl font-medium drop-shadow-sm">
                  Read what our clients say — the homeowners, property managers, and businesses who've
                  experienced our work firsthand.
                </p>
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
                    "After three bad experiences with other contractors, Highlander changed everything completely."
                  </p>
                  <p className="text-sm text-[hsl(var(--highland-gold)/0.7)] font-body font-bold mt-2">— Karen W., Waynesville, NC</p>
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

        {/* ── FEATURED REVIEWS ── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="eyebrow mb-3 block">Featured Reviews</span>
              <h2 className="section-heading mb-4">What Our Clients Say</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-sm"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                  ))}
                </div>
                <div className="h-4 w-px bg-border" />
                 <span className="font-bold text-foreground text-base">{GOOGLE_REVIEW_AGGREGATE.ratingValue}</span>
                 <span className="text-muted-foreground text-base font-body font-medium">from {GOOGLE_REVIEW_AGGREGATE.reviewCount}+ Verified Reviews</span>
              </motion.div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-5 mb-5">
              {featured.map((r, i) => (
                <motion.div
                  key={r.authorName}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative bg-card border border-border rounded-sm p-7 md:p-8 hover:border-[hsl(var(--highland-gold)/0.2)] hover:shadow-flat transition-all duration-300"
                >
                  <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.25)] to-transparent" />
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-caption md:text-caption font-body font-bold uppercase tracking-[0.14em] px-2.5 py-1.5 rounded-sm ${categoryColors[r.category]}`}>
                      {categoryLabels[r.category]}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-4 h-4 fill-accent text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-[hsl(var(--highland-gold)/0.15)] mb-3 rotate-180" aria-hidden="true" />
                  <p className="text-foreground text-body-sm leading-relaxed mb-5 font-body font-medium">"{r.reviewBody}"</p>
                  <div className="bg-secondary/70 rounded-sm px-4 py-3 mb-5">
                    <p className="text-body-xs font-body font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1">Project Outcome</p>
                    <p className="text-body-sm font-body font-bold text-foreground/80">{r.outcome}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center text-primary font-heading font-bold text-sm">
                      {r.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-body-sm">{r.authorName}</p>
                      <p className="text-muted-foreground text-body-xs font-body font-semibold">{r.location} · {r.project}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIZED REVIEWS ── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div {...fadeUp} className="text-center mb-10">
              <span className="eyebrow mb-3 block">By Project Type</span>
              <h2 className="section-heading mb-4">Reviews by Category</h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto" />
            </motion.div>

            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {Object.entries(categoryLabels).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`px-5 py-2 rounded-sm text-sm font-semibold transition-all ${
                    filter === value
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-[hsl(var(--highland-gold)/0.2)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.authorName + r.project}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group bg-card border border-border rounded-sm p-5 md:p-6 hover:border-primary/15 hover:shadow-flat transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-caption font-body font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm ${categoryColors[r.category]}`}>
                      {categoryLabels[r.category]}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-4 h-4 fill-accent text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/85 text-body-sm leading-relaxed mb-4 font-body font-bold">"{r.reviewBody}"</p>
                  <p className="text-body-xs text-primary/70 font-body font-bold mb-4 leading-snug">{r.outcome}</p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-border">
                    <div className="w-7 h-7 rounded-sm bg-primary/6 flex items-center justify-center text-primary font-heading font-bold text-caption">
                      {r.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-body-xs">{r.authorName}</p>
                      <p className="text-muted-foreground text-body-xs font-body font-semibold">{r.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                      "{theme.quote}"
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

        {/* ── INTERNAL: REVIEW CONTENT TO CONFIRM ── */}
        <section className="bg-secondary border-t border-border">
          <div className="container-tight section-padding max-w-4xl">
            <div className="card-premium p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <AlertCircle className="w-6 h-6 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1" />
                <div>
                  <span className="eyebrow block mb-2">For the Highlander Team — Pre-Launch</span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                    Review Content to Confirm Before Launch
                  </h2>
                </div>
              </div>
              <p className="text-muted-foreground font-body mb-6">
                The review excerpts shown above are placeholders representing the kind of feedback Highlander clients commonly share. Before launch, please confirm or replace them with approved review content directly from Google, Facebook, or other verified sources. We do not invent reviews.
              </p>
              <p className="font-heading font-bold text-foreground mb-3">To finalize this page, please provide:</p>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-foreground/85 font-body mb-6">
                {[
                  { icon: Link2, text: "Google Business Profile review link" },
                  { icon: Mail, text: "6–12 approved review excerpts (verbatim from Google or Facebook)" },
                  { icon: Camera, text: "Permission to display customer names, initials, or town" },
                  { icon: AlertCircle, text: "Confirmation of current review counts and average ratings" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-2">
                    <Icon className="w-4 h-4 text-[hsl(var(--gold-ink))] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic">
                Once approved content is provided, placeholder reviews and aggregate counts will be replaced with verified Google/Facebook content and structured-data schema will be updated to match.
              </p>
            </div>
          </div>
        </section>
      </main>
      <PageCloseCTA eyebrow="Next Step" heading="Ready to become our next review?" body="Tell us about your property and we'll follow up personally with a clear next step." secondaryLabel="See recent projects" secondaryTo="/recent-projects" context="reviews" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ReviewsPage;
