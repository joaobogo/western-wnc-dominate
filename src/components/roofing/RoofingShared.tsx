import { Link } from "react-router-dom";
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">{headline}</h3>
          <p className="text-primary-foreground/50 text-sm font-body">{subheadline}</p>
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
export const RoofingClosingCTA = ({
  headline = "Let's Talk About\nYour Roof.",
  subheadline = "Whether you need a repair assessment, a replacement consultation, or just an honest opinion — we're here to help.",
  eyebrow = "Your Roof, Our Expertise",
  ctaText = "Request a Roof Consultation",
  ctaLink = "/consultation",
}: Omit<RoofingCTAProps, "variant">) => (
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
            <p className="text-dark-section-foreground/80 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to={ctaLink} className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{ctaText}</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:+18285247773" className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all">
                <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" /> (828) 524-7773
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: Clock, text: "Rapid Emergency Response" },
                { icon: Award, text: "CertainTeed Certified" },
                { icon: Star, text: "Warrantied Work" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                  <span className="text-dark-section-foreground/70 text-xs font-body font-medium">{item.text}</span>
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

const defaultSidebarItems: TrustSidebarItem[] = [
  { icon: Shield, label: "Licensed & Fully Insured" },
  { icon: Award, label: "CertainTeed Certified" },
  { icon: Clock, label: "Rapid Emergency Response" },
  { icon: Star, label: "Warrantied Workmanship" },
];

export const TrustSidebar = ({ items = defaultSidebarItems }: { items?: TrustSidebarItem[] }) => (
  <div className="bg-card border border-border rounded-sm p-5 md:p-6 space-y-4">
    <h4 className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/60 mb-2">Why Highlander</h4>
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
        Request a Consultation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
      { icon: Star, text: "Warrantied Work" },
    ].map((item) => (
      <div key={item.text} className="flex items-center gap-2">
        <item.icon className="w-3.5 h-3.5 text-primary/30" />
        <span className="text-muted-foreground text-xs font-body font-medium">{item.text}</span>
      </div>
    ))}
  </div>
);
