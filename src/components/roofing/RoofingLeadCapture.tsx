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
  ctaText = "Schedule a Roofing Consultation",
  ctaLink = "/request-inspection",
}: InlineLeadCaptureProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
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
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <Link
          to={ctaLink}
          className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative">{ctaText}</span>
          <ArrowRight className="w-4 h-4 relative" />
        </Link>
        <a
          href="tel:8283979211"
          className="border border-border text-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-secondary transition-all"
        >
          <Phone className="w-4 h-4" /> Call Direct
        </a>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-5 mt-5 pt-5 border-t border-border">
      {[
        { icon: Shield, text: "Licensed & Insured" },
        { icon: Clock, text: "24-Hour Response" },
        { icon: Award, text: "CertainTeed Certified" },
        { icon: Star, text: "Warrantied Work" },
      ].map((item) => (
        <div key={item.text} className="flex items-center gap-1.5">
          <item.icon className="w-3 h-3 text-primary/30" />
          <span className="text-muted-foreground text-[10px] font-body font-medium">{item.text}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

/** Full-width editorial CTA with gold accent — used between content sections */
const EditorialCapture = ({
  headline = "Let's Talk About Your Roof.",
  subheadline = "Whether you're planning ahead or responding to an issue — a straightforward conversation is always the right first step.",
  ctaText = "Discuss Your Roof",
  ctaLink = "/request-inspection",
}: InlineLeadCaptureProps) => (
  <section className="py-12 md:py-16 bg-background relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
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
          className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative">{ctaText}</span>
          <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="tel:8283979211"
          className="border border-border text-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-secondary transition-all"
        >
          <Phone className="w-4 h-4 text-muted-foreground" /> (828) 397-9211
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
