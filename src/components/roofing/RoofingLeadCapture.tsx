import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Clock, Award, Star } from "lucide-react";

/* ═══════════════════════════════════════════
   INLINE LEAD CAPTURE MODULES
   Premium, context-aware CTAs for roofing pages
   ═══════════════════════════════════════════ */

interface InlineLeadCaptureProps {
  variant?: "card" | "strip" | "editorial";
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

/** Premium card-style inline CTA — sits within content flow */
const CardCapture = ({
  headline = "Ready to discuss your roof?",
  subheadline = "Schedule a conversation with our team. No pressure, no obligation — just honest guidance from experienced local roofers.",
  ctaText = "Get My Roof Assessed",
  ctaLink = "/consultation",
}: InlineLeadCaptureProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-card border border-border rounded-sm p-6 md:p-8 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.5)] to-[hsl(var(--highland-gold)/0)]" />

    <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
      <div className="flex-1">
        <h3 className="font-heading font-bold text-foreground text-lg md:text-xl mb-2">{headline}</h3>
        <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-lg">{subheadline}</p>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:flex-shrink-0">
        <Link
          to={ctaLink}
          className="btn btn-primary btn-md group relative"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative">{ctaText}</span>
          <ArrowRight className="w-4 h-4 relative" aria-hidden="true" />
        </Link>
        <a
          href="tel:+18285247773"
          className="btn btn-secondary btn-md"
        >
          <Phone className="w-4 h-4" aria-hidden="true" /> Call Direct: 828-524-7773
        </a>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-5 mt-5 pt-5 border-t border-border">
      {[
        { icon: Shield, text: "Licensed & Insured" },
        { icon: Clock, text: "Rapid Response" },
        { icon: Award, text: "CertainTeed Certified" },
        { icon: Star, text: "4.9★ Google · 150+ reviews" },
      ].map((item) => (
        <div key={item.text} className="flex items-center gap-1.5">
          <item.icon className="w-3 h-3 text-primary/80" />
          <span className="text-muted-foreground text-caption font-body font-medium">{item.text}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

/** Full-width editorial CTA with gold accent — used between content sections */
const EditorialCapture = ({
  headline = "Let's Talk About Your Roof.",
  subheadline = "Whether you're planning ahead or responding to an issue — a straightforward conversation is always the right first step.",
  ctaText = "Get My Roof Questions Answered",
  ctaLink = "/consultation",
}: InlineLeadCaptureProps) => (
  <section className="py-12 md:py-16 bg-background relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container-tight max-w-3xl text-center"
    >
      <div className="w-10 h-px mx-auto mb-6 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 leading-tight">{headline}</h3>
      <p className="text-muted-foreground text-sm md:text-base font-body max-w-xl mx-auto mb-8 leading-relaxed">{subheadline}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to={ctaLink}
          className="btn btn-primary btn-lg group relative"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative">{ctaText}</span>
          <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
        <a
          href="tel:+18285247773"
          className="btn btn-secondary btn-lg"
        >
          <Phone className="w-4 h-4 text-muted-foreground" aria-hidden="true" /> (828) 524-7773
        </a>
      </div>
      <div className="w-10 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
    </motion.div>
  </section>
);

/** Main export — select variant */
const RoofingLeadCapture = ({
  variant = "card",
  ...props
}: InlineLeadCaptureProps) => {
  if (variant === "editorial") return <EditorialCapture {...props} />;
  return <CardCapture {...props} />;
};

export default RoofingLeadCapture;
