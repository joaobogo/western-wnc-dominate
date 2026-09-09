import { PHONE_DISPLAY, PHONE_TEL, REVIEW_STARS, REVIEW_COUNT_LABEL } from "@/data/business";
import CTAProofLine from "@/components/trust/CTAProofLine";
import { Link, useLocation } from "react-router-dom";
import { getPagePrimaryAction } from "@/lib/page-cta-hierarchy";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Clock, Award, Star, type LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════
   SHARED CTA BLOCKS
   ═══════════════════════════════════════════ */

interface RoofingCTAProps {
  variant: "mid" | "closing";
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  ctaText?: string;
  ctaLink?: string;
}

/** Mid-page CTA strip (primary bg) */
export const RoofingMidCTA = ({
  headline = "Ready to discuss your roof?",
  subheadline = "We respond rapidly with a direct call — not a form email.",
  ctaText = "Talk With a Roofing Advisor",
  ctaLink = "/consultation",
}: Omit<RoofingCTAProps, "variant">) => (
  <section className="bg-primary text-primary-foreground tartan-dark">
    <div className="container-tight px-5 md:px-8 py-10 md:py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="min-w-0 lg:flex-1">
          <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">{headline}</h3>
          <p className="text-primary-foreground text-sm font-body">{subheadline}</p>
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
export const RoofingClosingCTA = ({
  headline = "Let's Talk About\nYour Roof.",
  subheadline = "Whether you need a repair assessment, a replacement consultation, or just an honest opinion — we're here to help.",
  eyebrow = "Your Roof, Our Expertise",
  ctaText = "See What My Roof Needs",
  ctaLink = "/consultation",
}: Omit<RoofingCTAProps, "variant">) => {
  // Money pages lead with the phone (João, 2026-09-08); cost guides stay form-first.
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
            <p className="text-dark-section-foreground text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
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

const defaultSidebarItems: TrustSidebarItem[] = [
  { icon: Shield, label: "Licensed & Fully Insured" },
  { icon: Award, label: "CertainTeed Certified" },
  { icon: Clock, label: "Rapid Emergency Response" },
  { icon: Star, label: `${REVIEW_STARS} Google · ${REVIEW_COUNT_LABEL}` },
];

export const TrustSidebar = ({ items = defaultSidebarItems }: { items?: TrustSidebarItem[] }) => (
  <div className="bg-card border border-border rounded-sm p-5 md:p-6 space-y-4">
    <h4 className="text-caption font-body font-bold uppercase tracking-[0.15em] text-primary/80 mb-2">Why Highlander</h4>
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0">
          <item.icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-foreground text-xs font-body font-medium">{item.label}</span>
      </div>
    ))}
    <div className="pt-3 border-t border-border">
      <Link to="/consultation" className="group text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body">
        See What My Project Needs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </Link>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   CREDENTIAL STRIP (compact inline trust)
   ═══════════════════════════════════════════ */

export const CredentialStrip = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-6 py-6 ${className}`}>
    {[
      { icon: Shield, text: "Licensed & Insured" },
      { icon: Clock, text: "Rapid Response" },
      { icon: Award, text: "CertainTeed Certified" },
      { icon: Star, text: `${REVIEW_STARS} Google · ${REVIEW_COUNT_LABEL}` },
    ].map((item) => (
      <div key={item.text} className="flex items-center gap-2">
        <item.icon className="w-3.5 h-3.5 text-primary/80" />
        <span className="text-muted-foreground text-xs font-body font-medium">{item.text}</span>
      </div>
    ))}
  </div>
);
