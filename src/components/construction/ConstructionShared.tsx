import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import CTAProofLine from "@/components/trust/CTAProofLine";
import { Link, useLocation } from "react-router-dom";
import { getPagePrimaryAction } from "@/lib/page-cta-hierarchy";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Award, Star, Users,
  Mountain, type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   SHARED CTA BLOCKS — CONSTRUCTION
   ═══════════════════════════════════════════ */

interface ConstructionCTAProps {
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  ctaText?: string;
  ctaLink?: string;
}

/** Mid-page CTA strip (primary bg) */
export const ConstructionMidCTA = ({
  headline = "Ready to discuss your project?",
  subheadline = "Start with the short inquiry or call during staffed business hours. We will explain the appropriate next step before you commit.",
  ctaText = "Start Your Project Conversation",
  ctaLink = "/request-inspection?context=construction&type=construction",
}: ConstructionCTAProps) => (
  <section className="bg-primary text-primary-foreground tartan-dark">
    <div className="container-tight px-5 md:px-8 py-10 md:py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="min-w-0 lg:flex-1">
          <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">{headline}</h3>
          <p className="text-primary-foreground text-base md:text-lg font-body">{subheadline}</p>
        </div>
        <div className="flex w-full min-w-0 flex-wrap justify-center gap-3 lg:w-auto lg:max-w-2xl lg:justify-end">
          <Link to={ctaLink} className="btn btn-primary btn-md group relative">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">{ctaText}</span>
            <ArrowRight className="w-4 h-4 relative" aria-hidden="true" />
          </Link>
          <a href={PHONE_TEL} className="btn btn-secondary btn-md btn-on-dark">
            <Phone className="w-4 h-4" aria-hidden="true" /> Call Direct
          </a>
          <CTAProofLine tone="dark" align="center" className="basis-full lg:justify-end" />
        </div>
      </div>
    </div>
  </section>
);

/** Full closing CTA (dark section) */
export const ConstructionClosingCTA = ({
  headline = "Let's Talk About\nYour Project.",
  subheadline = "Whether you're planning an addition, a renovation, an outdoor space, or a custom build — we're here to help you think it through.",
  eyebrow = "Start Planning",
  ctaText = "Discuss My Project",
  ctaLink = "/request-inspection?context=construction&type=construction",
}: ConstructionCTAProps) => {
  // Construction money pages keep phone access prominent while the short estimate form remains the shared form path.
  const callIsPrimary = getPagePrimaryAction(useLocation().pathname).intent === "call";
  return (
  <section className="section-dark tartan-dark relative overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 w-full h-px"
      style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    />
    <div className="section-padding">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="eyebrow mb-5 block text-[hsl(var(--gold-ink))]">{eyebrow}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground whitespace-pre-line">
              {headline}
            </h2>
            <p className="text-dark-section-foreground text-base md:text-xl max-w-xl mx-auto mb-10 font-body leading-relaxed">
              {subheadline}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 ${callIsPrimary ? "sm:flex-row-reverse" : ""}`}>
              <Link to={ctaLink} className={`btn btn-lg group relative ${callIsPrimary ? "btn-secondary btn-on-dark" : "btn-primary"}`}>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{ctaText}</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a href={PHONE_TEL} className={`btn btn-lg group ${callIsPrimary ? "btn-primary" : "btn-secondary btn-on-dark"}`}>
                <Phone className={`w-4 h-4 ${callIsPrimary ? "" : "text-[hsl(var(--highland-gold)/0.9)]"}`} aria-hidden="true" />{" "}
                {callIsPrimary ? `Call ${PHONE_DISPLAY}` : PHONE_DISPLAY}
              </a>
            </div>

            <CTAProofLine tone="dark" className="pt-8 border-t border-dark-section-border" />
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

/* ═══════════════════════════════════════════
   TRUST SIDEBAR (for sidebar layouts)
   ═══════════════════════════════════════════ */

interface TrustSidebarItem {
  icon: LucideIcon;
  label: string;
}

const defaultItems: TrustSidebarItem[] = [
  { icon: Shield, label: "Licensed & Fully Insured" },
  { icon: Users, label: "Named Project Contact" },
  { icon: Mountain, label: "WNC Property Specialists" },
  { icon: Star, label: "Design-Build Capability" },
];

export const ConstructionTrustSidebar = ({ items = defaultItems }: { items?: TrustSidebarItem[] }) => (
  <div className="bg-card border border-border rounded-sm p-5 md:p-6 space-y-4">
    <h4 className="text-body-xs font-body font-bold uppercase tracking-[0.15em] text-primary/70 mb-3">Why Highlander</h4>
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0">
          <item.icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-foreground text-sm font-body font-bold">{item.label}</span>
      </div>
    ))}
    <div className="pt-3 border-t border-border">
      <Link to="/request-inspection" className="group text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body">
        Get My Project Scoped <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   CREDENTIAL STRIP (compact inline trust)
   ═══════════════════════════════════════════ */

export const ConstructionCredentialStrip = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-6 py-6 ${className}`}>
    {[
      { icon: Shield, text: "Licensed & Insured" },
      { icon: Users, text: "In-House Crews" },
      { icon: Mountain, text: "WNC Specialists" },
      { icon: Star, text: "Design-Build" },
    ].map((item) => (
      <div key={item.text} className="flex items-center gap-2">
        <item.icon className="w-3.5 h-3.5 text-primary/80" />
        <span className="text-muted-foreground text-xs font-body font-medium">{item.text}</span>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════
   PLANNING CALLOUT (inline sidebar-style)
   ═══════════════════════════════════════════ */

export const PlanningCallout = ({
  headline = "Not sure where to start?",
  body = "We offer complimentary project consultations. Describe what you're thinking, and we'll help you evaluate feasibility, approach, and budget range — before you commit to anything.",
  ctaText = "Get My Questions Answered",
  ctaLink = "/request-inspection",
}: {
  headline?: string;
  body?: string;
  ctaText?: string;
  ctaLink?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-card border border-primary/10 rounded-sm p-6 md:p-8"
  >
    <h4 className="font-heading font-bold text-foreground text-base mb-2">{headline}</h4>
    <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">{body}</p>
    <Link
      to={ctaLink}
      className="group text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body"
    >
      {ctaText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
    </Link>
  </motion.div>
);
