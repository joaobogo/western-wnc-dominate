import { Link } from "react-router-dom";
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
  subheadline = "We respond rapidly with a direct call — not a form email.",
  ctaText = "Start Your Project Conversation",
  ctaLink = "/construction/consultation",
}: ConstructionCTAProps) => (
  <section className="bg-primary text-primary-foreground tartan-dark">
    <div className="container-tight px-5 md:px-8 py-10 md:py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">{headline}</h3>
          <p className="text-primary-foreground/90 text-base md:text-lg font-body">{subheadline}</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link to={ctaLink} className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">{ctaText}</span>
            <ArrowRight className="w-4 h-4 relative" />
          </Link>
          <a href="tel:+18285247773" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
            <Phone className="w-4 h-4" /> Call Direct
          </a>
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
  ctaText = "Schedule a Construction Consultation",
  ctaLink = "/construction/consultation",
}: ConstructionCTAProps) => (
  <section className="section-dark tartan-dark relative overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 w-full h-px"
      style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    />
    <div className="section-padding">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">{eyebrow}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground whitespace-pre-line">
              {headline}
            </h2>
            <p className="text-dark-section-foreground/90 text-base md:text-xl max-w-xl mx-auto mb-10 font-body leading-relaxed">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to={ctaLink} className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{ctaText}</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:+18285247773" className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all">
                <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.9)]" /> (828) 524-7773
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: Users, text: "In-House Crews" },
                { icon: Mountain, text: "WNC Specialists" },
                { icon: Star, text: "Design-Build Capable" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                  <span className="text-dark-section-foreground/85 text-[13px] font-body font-bold">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   TRUST SIDEBAR (for sidebar layouts)
   ═══════════════════════════════════════════ */

interface TrustSidebarItem {
  icon: LucideIcon;
  label: string;
}

const defaultItems: TrustSidebarItem[] = [
  { icon: Shield, label: "Licensed & Fully Insured" },
  { icon: Users, label: "In-House Construction Crews" },
  { icon: Mountain, label: "WNC Property Specialists" },
  { icon: Star, label: "Design-Build Capability" },
];

export const ConstructionTrustSidebar = ({ items = defaultItems }: { items?: TrustSidebarItem[] }) => (
  <div className="bg-card border border-border rounded-sm p-5 md:p-6 space-y-4">
    <h4 className="text-[12px] font-body font-bold uppercase tracking-[0.15em] text-primary/70 mb-3">Why Highlander</h4>
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0">
          <item.icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-foreground text-sm font-body font-bold">{item.label}</span>
      </div>
    ))}
    <div className="pt-3 border-t border-border">
      <Link to="/consultation" className="group text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body">
        Discuss Your Project <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
        <item.icon className="w-3.5 h-3.5 text-primary/30" />
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
  ctaText = "Talk With Our Team",
  ctaLink = "/consultation",
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
      {ctaText} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);
