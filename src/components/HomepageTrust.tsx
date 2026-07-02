import { motion } from "framer-motion";
import { Star, Shield, Award, MapPin, CheckCircle2, Quote, Mountain, Clock, Users, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── DATA ─── */

const credentials = [
  { icon: Award, title: "CertainTeed ShingleMaster Credentialed Contractor", detail: "Top 1% nationally certified — the highest residential roofing credential available." },
  { icon: Shield, title: "Licensed General Contractor", detail: "Full NC general contractor license — additions, renovations, and structural work." },
  { icon: FileCheck, title: "Fully Insured & Bonded", detail: "Comprehensive liability and workers' comp coverage on every project." },
  { icon: Clock, title: "Rapid Storm Response", detail: "Emergency tarping and damage assessment rapidly of your call." },
];

const reviewHighlights = [
  {
    quote: "Highlander replaced our entire roof after storm damage. They handled insurance, kept us informed daily, and finished in four days.",
    name: "Sarah M.",
    location: "Highlands, NC",
    project: "Storm Damage — Full Replacement",
  },
  {
    quote: "Their standing seam metalwork is exceptional — these are the only crews I'd trust at 3,800 feet. They genuinely understand what mountain weather demands.",
    name: "Linda K.",
    location: "Cashiers, NC",
    project: "Standing Seam Metal — Two Properties",
  },
  {
    quote: "Having one team handle roofing and construction meant a single point of contact, one timeline, and zero coordination headaches.",
    name: "David R.",
    location: "Bryson City, NC",
    project: "Deck & Covered Porch Build",
  },
];

const proofPoints = [
  { value: "4.9★", label: "Google Rating" },
  { value: "8", label: "WNC Counties" },
  { value: "150+", label: "Verified Reviews" },
  { value: "40+", label: "Years Combined Exp." },
];

const localExpertise = [
  "Materials specified for your actual elevation and wind exposure",
  "Crews who live and work in mountain conditions year-round",
  "Every county's permitting timeline and inspection requirements known",
  "Ice loads, freeze-thaw, and horizontal rain engineered into every project",
];

/* ─── COMPONENT ─── */

const HomepageTrust = () => {
  return (
    <section className="relative overflow-hidden">
      {/* ═══ PART 1: Credentials + Stats (Dark) ═══ */}
      <div className="section-padding section-dark relative">
        <div className="absolute inset-0 tartan-dark opacity-40" />
        <div className="container-tight relative z-10">
          <div className="text-center mb-14 md:mb-18">
            <ScrollReveal variant="fade">
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold)/0.6)] mb-4 block">
                Credentials & Record
              </span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-heading font-bold text-dark-section-foreground leading-snug mb-5 tracking-tight">
                Every Claim Backed by<br className="hidden md:block" />
                <span className="text-[hsl(var(--highland-gold))]"> Documentation You Can Hold.</span>
              </h2>
            </HeadingReveal>
            <ScrollReveal variant="rise-subtle" delay={0.25}>
              <p className="text-dark-section-foreground/95 text-[15px] font-body max-w-xl mx-auto leading-relaxed">
                Certifications are verifiable. Reviews are public. Project photos are real.
                We don't ask for trust — we earn it with evidence.
              </p>
            </ScrollReveal>
            <GoldLine width="4rem" centered delay={0.35} className="mt-7" />
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-dark-section-foreground/[0.06] mb-14 md:mb-18">
            {proofPoints.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: HIGHLAND_EASE }}
                className="flex flex-col items-center text-center md:px-8"
              >
                <AnimatedCounter
                  value={stat.value}
                  className="text-2xl md:text-[2.5rem] font-heading font-bold text-[hsl(var(--highland-gold))] leading-none mb-1.5 tracking-tight stat-glow"
                  duration={1800}
                />
                <span className="text-xs font-heading font-bold text-dark-section-foreground/85 tracking-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Credentials grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: HIGHLAND_EASE }}
                className="group relative bg-dark-section-foreground/[0.03] border border-dark-section-foreground/[0.06] rounded-none p-5 md:p-6 hover:border-[hsl(var(--highland-gold)/0.15)] transition-all duration-500"
              >
                <div className="absolute left-0 top-0 w-[2px] h-0 bg-[hsl(var(--highland-gold))] group-hover:h-full transition-all duration-600 z-10" />
                <div className="w-10 h-10 rounded-none border border-dark-section-foreground/[0.08] flex items-center justify-center mb-4 group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors duration-300">
                  <cred.icon className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)] group-hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-heading font-bold text-dark-section-foreground/85 mb-2 tracking-tight">
                  {cred.title}
                </h3>
                <p className="text-dark-section-foreground/95 text-[12.5px] leading-[1.7] font-body">
                  {cred.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ PART 2: Review Highlights (Light) ═══ */}
      <div className="section-padding bg-background relative">
        <div className="absolute inset-0 tartan-bg opacity-20" />
        <div className="container-tight relative z-10">
          {/* Google badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-14"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-card border border-border rounded-none">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <div className="h-5 w-px bg-border" />
              <span className="font-heading font-bold text-foreground text-lg">4.9</span>
              <span className="text-muted-foreground text-xs font-body">on Google · 150+ reviews</span>
            </div>
          </motion.div>

          {/* Review cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            {reviewHighlights.map((review, i) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const handleMouseMove = (e: React.MouseEvent) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                cardRef.current.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                cardRef.current.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
              };

              return (
                <motion.div
                  key={review.name}
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: HIGHLAND_EASE }}
                  className="group relative bg-card border border-border rounded-none p-6 md:p-8 hover:border-[hsl(var(--highland-gold)/0.18)] transition-all duration-500 spotlight-hover overflow-hidden"
                >
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.2)] to-transparent" />

                  {/* Quote mark watermark */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-foreground/[0.03] rotate-180" />

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-foreground/80 text-[14px] leading-[1.8] font-body mb-6 relative z-10">
                    "{review.quote}"
                  </p>

                  {/* Project tag */}
                  <div className="bg-secondary/60 rounded-none px-3 py-2 mb-5">
                    <span className="text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                      {review.project}
                    </span>
                  </div>

                  {/* Attribution */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-none bg-primary/8 flex items-center justify-center text-primary font-heading font-bold text-xs">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground text-sm">{review.name}</p>
                      <p className="text-muted-foreground text-[11px] font-body flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" />
                        {review.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View all reviews CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link
              to="/reviews"
              className="group inline-flex items-center gap-2 text-sm font-heading font-bold text-foreground hover:text-[hsl(var(--highland-gold))] transition-colors"
            >
              Read All Reviews
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ═══ PART 3: Local Expertise Strip (Dark) ═══ */}
      <div className="py-12 md:py-16 section-dark relative">
        <div className="absolute inset-0 tartan-dark opacity-30" />
        <div className="container-tight relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — headline */}
            <div>
              <ScrollReveal variant="fade">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-[hsl(var(--highland-gold)/0.9)] mb-3 block">
                  Local Knowledge
                </span>
              </ScrollReveal>
              <HeadingReveal delay={0.1}>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-dark-section-foreground leading-snug mb-4 tracking-tight">
                  Built for Western<br className="hidden md:block" /> North Carolina.
                </h3>
              </HeadingReveal>
              <p className="text-dark-section-foreground/95 text-[13.5px] font-body leading-relaxed max-w-md">
                Coastal specs don't work at 3,800 feet. Our crews live in these conditions —
                every material recommendation comes from direct experience, not a manufacturer's data sheet.
              </p>
            </div>

            {/* Right — expertise checklist */}
            <div className="space-y-3">
              {localExpertise.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: HIGHLAND_EASE }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)] flex-shrink-0 mt-0.5" />
                  <span className="text-dark-section-foreground/85 text-[13px] font-body leading-relaxed">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageTrust;
