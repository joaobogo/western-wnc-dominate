import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Quote, ArrowRight, Phone, CheckCircle, MessageSquare,
  Hammer, Clock, Heart, Shield, Users, ThumbsUp, Award,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { TrustBadgeStrip, ReassuranceBlock } from "@/components/trust";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

/* ── Review Data ── */

interface Review {
  name: string;
  location: string;
  text: string;
  project: string;
  category: "roofing" | "construction" | "storm" | "commercial";
  outcome: string;
  featured?: boolean;
}

const reviews: Review[] = [
  {
    name: "Sarah M.",
    location: "Highlands, NC",
    text: "Highlander replaced our entire roof after storm damage. They handled our insurance claim paperwork, kept us informed daily, and the crew was professional from start to finish. The roof looks better than the original.",
    project: "Full Roof Replacement",
    category: "storm",
    outcome: "Insurance claim processed. New roof installed in 4 days.",
    featured: true,
  },
  {
    name: "Linda K.",
    location: "Cashiers, NC",
    text: "We've used Highlander for two properties now. Their standing seam metal work is exceptional and they genuinely understand the mountain climate challenges. Five stars every time.",
    project: "Standing Seam Metal — Two Properties",
    category: "roofing",
    outcome: "Both properties re-roofed with 50-year metal systems.",
    featured: true,
  },
  {
    name: "James T.",
    location: "Franklin, NC",
    text: "Fast response when we had a leak during heavy rain. They came out the next morning, found the issue, and had it repaired by afternoon. Fair pricing and honest work — exactly what you want from a local contractor.",
    project: "Emergency Leak Repair",
    category: "roofing",
    outcome: "Leak identified and permanently repaired in one visit.",
  },
  {
    name: "Robert & Anne P.",
    location: "Sylva, NC",
    text: "From the initial inspection to the final walkthrough, everything was documented and communicated clearly. The crew was respectful of our property and finished ahead of schedule. We couldn't be happier.",
    project: "Roof Replacement & Gutters",
    category: "roofing",
    outcome: "Completed 2 days ahead of schedule. Full warranty package delivered.",
  },
  {
    name: "David R.",
    location: "Bryson City, NC",
    text: "Highlander built a covered porch and replaced our deck — the craftsmanship is outstanding. Same attention to detail as their roofing work. Having one team handle both saved us time and hassle.",
    project: "Deck & Covered Porch Build",
    category: "construction",
    outcome: "New outdoor living space completed in 3 weeks.",
  },
  {
    name: "Mountain Properties LLC",
    location: "Franklin, NC",
    text: "We manage 14 rental properties across Macon County. Highlander handles all our roofing maintenance and emergency repairs. Their documentation and communication make our job easier.",
    project: "Multi-Property Maintenance Program",
    category: "commercial",
    outcome: "14 properties under a single maintenance agreement.",
  },
  {
    name: "Karen W.",
    location: "Waynesville, NC",
    text: "After three bad experiences with other contractors, we were skeptical. Highlander changed that completely. James came out personally, gave an honest assessment — no pressure, no upselling. The install crew was clean, fast, and meticulous.",
    project: "Architectural Shingle Replacement",
    category: "roofing",
    outcome: "CertainTeed Landmark installed with enhanced warranty.",
    featured: true,
  },
  {
    name: "Tom & Jill H.",
    location: "Franklin, NC",
    text: "Our home addition was a big project and a big decision. Highlander made it manageable — clear timeline, daily updates, clean job site every evening. The finished space feels like it was always part of the house.",
    project: "Home Addition — Master Suite",
    category: "construction",
    outcome: "600 sq ft addition completed on schedule and within budget.",
  },
  {
    name: "Chris D.",
    location: "Cullowhee, NC",
    text: "Hired them after a hailstorm and they walked me through the entire insurance process. Professional adjustor coordination, quality materials, fast turnaround. Could not have been easier.",
    project: "Storm Damage Roof Replacement",
    category: "storm",
    outcome: "Full roof replacement covered by insurance. Completed in 5 days.",
  },
];

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
      <Header />
      <main>
        {/* ── HERO ── */}
        <section className="relative section-dark pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 tartan-dark" />
          <div className="container-tight relative z-10 px-5 md:px-8 lg:px-16">
            <motion.div {...fadeUp} className="max-w-3xl">
              <span className="eyebrow mb-4 block text-[hsl(var(--highland-gold))]">Reviews & Reputation</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-6 leading-[1.1]">
                Trust Is Earned.<br />
                <span className="text-[hsl(var(--highland-gold))]">Here's How We've Earned It.</span>
              </h1>
              <div className="w-16 h-px bg-[hsl(var(--highland-gold)/0.4)] mb-6" />
              <p className="text-[hsl(var(--dark-section-foreground)/0.7)] text-base md:text-lg leading-relaxed max-w-2xl">
                We don't ask you to trust us because we say we're trustworthy. We ask you to read 
                what our clients say — the homeowners, property managers, and businesses who've 
                experienced our work firsthand.
              </p>
            </motion.div>
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
                <span className="font-semibold text-foreground text-sm">4.9</span>
                <span className="text-muted-foreground text-sm font-body">from 150+ Verified Reviews</span>
              </motion.div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-5 mb-5">
              {featured.map((r, i) => (
                <motion.div
                  key={r.name}
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
                  <p className="text-foreground text-[15px] leading-relaxed mb-5 font-body">"{r.text}"</p>
                  <div className="bg-secondary/60 rounded-sm px-4 py-3 mb-5">
                    <p className="text-[11px] font-body font-semibold uppercase tracking-[0.1em] text-muted-foreground/50 mb-1">Project Outcome</p>
                    <p className="text-sm font-body font-medium text-foreground/80">{r.outcome}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center text-primary font-heading font-bold text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{r.name}</p>
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
                  key={r.name + r.project}
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
                  <p className="text-foreground/80 text-[13px] leading-relaxed mb-4 font-body">"{r.text}"</p>
                  <p className="text-[11px] text-primary/60 font-body font-medium mb-4 leading-snug">{r.outcome}</p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-border">
                    <div className="w-7 h-7 rounded-sm bg-primary/6 flex items-center justify-center text-primary font-heading font-bold text-[10px]">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-xs">{r.name}</p>
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
          subheadline="Schedule a free consultation and experience the communication, craftsmanship, and accountability our clients talk about."
          ctaText="Schedule a Consultation"
        />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ReviewsPage;
