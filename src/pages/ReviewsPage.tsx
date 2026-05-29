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
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { TrustBadgeStrip, ReassuranceBlock } from "@/components/trust";
import { customerReviews, GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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
  construction: "bg-[hsl(var(--highland-gold)/0.12)] text-[hsl(var(--highland-gold))]",
  storm: "bg-destructive/10 text-destructive",
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
  { value: "4.9★", label: "Average Rating", detail: "Google & Facebook" },
  { value: "150+", label: "Verified Reviews", detail: "Across Platforms" },
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
        description="Read verified reviews from Highlander Roofing & Construction clients across Western North Carolina. 4.9★ average rating from 150+ reviews."
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
          aggregate: GOOGLE_REVIEW_AGGREGATE,
        })}
      />
      <Header />
      <main>
        {/* ── HERO — Pull-quote led (unique to Reviews) ── */}
        <section className="relative section-dark pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <div className="container-tight relative z-10 px-5 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <motion.div {...fadeUp} className="max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                  <span className="ml-2 text-sm font-heading font-bold text-[hsl(var(--dark-section-foreground))]">4.9</span>
                  <span className="text-xs text-[hsl(var(--dark-section-foreground)/0.4)] font-body ml-1">from {GOOGLE_REVIEW_AGGREGATE.reviewCount}+ verified reviews</span>
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
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm flex-shrink-0"
              >
                <div className="border-l-2 border-[hsl(var(--highland-gold)/0.3)] pl-5">
                  <Quote className="w-5 h-5 text-[hsl(var(--highland-gold)/0.2)] mb-2 rotate-180" />
                  <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-sm font-body italic leading-relaxed">
                    "After three bad experiences with other contractors, Highlander changed everything completely."
                  </p>
                  <p className="text-xs text-[hsl(var(--highland-gold)/0.5)] font-body mt-2">— Karen W., Waynesville, NC</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TRUST METRICS ── */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground tartan-dark">
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))' }} />
          <div className="container-tight px-5 md:px-8 py-8 md:py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-primary-foreground/8">
              {trustMetrics.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex flex-col items-center text-center md:px-6 lg:px-8"
                >
                  <span className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--highland-gold))] leading-none mb-1.5">{stat.value}</span>
                  <span className="text-sm font-heading font-semibold text-primary-foreground/85 mb-1">{stat.label}</span>
                  <span className="text-[11px] text-primary-foreground/35 font-body tracking-wide">{stat.detail}</span>
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
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="h-4 w-px bg-border" />
                 <span className="font-semibold text-foreground text-sm">{GOOGLE_REVIEW_AGGREGATE.ratingValue}</span>
                 <span className="text-muted-foreground text-sm font-body">from {GOOGLE_REVIEW_AGGREGATE.reviewCount}+ Verified Reviews</span>
              </motion.div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-5 mb-5">
              {featured.map((r, i) => (
                <motion.div
                  key={r.authorName}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative bg-card border border-border rounded-sm p-7 md:p-8 hover:border-[hsl(var(--highland-gold)/0.2)] hover:shadow-sm transition-all duration-300"
                >
                  <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.25)] to-transparent" />
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm ${categoryColors[r.category]}`}>
                      {categoryLabels[r.category]}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-[hsl(var(--highland-gold)/0.15)] mb-3 rotate-180" />
                  <p className="text-foreground text-[15px] leading-relaxed mb-5 font-body">"{r.reviewBody}"</p>
                  <div className="bg-secondary/60 rounded-sm px-4 py-3 mb-5">
                    <p className="text-[11px] font-body font-semibold uppercase tracking-[0.1em] text-muted-foreground/50 mb-1">Project Outcome</p>
                    <p className="text-sm font-body font-medium text-foreground/80">{r.outcome}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center text-primary font-heading font-bold text-sm">
                      {r.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{r.authorName}</p>
                      <p className="text-muted-foreground text-xs font-body">{r.location} · {r.project}</p>
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  className="group bg-card border border-border rounded-sm p-5 md:p-6 hover:border-primary/15 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[8px] font-body font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm ${categoryColors[r.category]}`}>
                      {categoryLabels[r.category]}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-2.5 h-2.5 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/80 text-[13px] leading-relaxed mb-4 font-body">"{r.reviewBody}"</p>
                  <p className="text-[11px] text-primary/60 font-body font-medium mb-4 leading-snug">{r.outcome}</p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-border">
                    <div className="w-7 h-7 rounded-sm bg-primary/6 flex items-center justify-center text-primary font-heading font-bold text-[10px]">
                      {r.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-xs">{r.authorName}</p>
                      <p className="text-muted-foreground text-[10px] font-body">{r.location}</p>
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
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Recurring Themes</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-4 leading-tight">
                What Clients Mention Most
              </h2>
              <div className="w-12 h-px bg-[hsl(var(--highland-gold)/0.4)] mx-auto mb-4" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.6)] max-w-2xl mx-auto">
                Across hundreds of reviews, four themes emerge consistently. These aren't cherry-picked 
                highlights — they're patterns that define how clients experience working with Highlander.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {themes.map((theme, i) => (
                <motion.div
                  key={theme.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="border border-[hsl(var(--highland-gold)/0.1)] rounded-sm p-6 bg-[hsl(var(--dark-section-foreground)/0.03)]"
                >
                  <div className="w-11 h-11 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mb-4">
                    <theme.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-semibold text-[hsl(var(--dark-section-foreground))] mb-2">{theme.title}</h3>
                  <p className="text-[hsl(var(--dark-section-foreground)/0.6)] text-sm leading-relaxed mb-4">{theme.description}</p>
                  <div className="border-t border-[hsl(var(--highland-gold)/0.08)] pt-3">
                    <p className="text-[hsl(var(--dark-section-foreground)/0.4)] text-[12px] italic font-body">
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
          ctaText="Talk With Our Team"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ReviewsPage;
