import { motion } from "framer-motion";
import {
  Shield, Hammer, MessageSquare, Mountain, CloudSun,
  ClipboardCheck, Briefcase, type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   TRUST DATA
   ═══════════════════════════════════════════ */

export interface TrustPillar {
  icon: LucideIcon;
  title: string;
  detail: string;
}

export const trustPillars: TrustPillar[] = [
  {
    icon: Hammer,
    title: "Craftsmanship First",
    detail: "Every project is built to outlast the warranty — not just meet it. Our crews are trained, supervised, and held to the same quality standard whether it's a $500 repair or a $50,000 replacement.",
  },
  {
    icon: Shield,
    title: "Material Integrity",
    detail: "We use manufacturer-specified materials, installed exactly to specification. No substitutions, no shortcuts, no leftover inventory from previous jobs. Your materials are ordered for your project.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    detail: "You'll know what's happening, when it's happening, and why. Daily updates during active work, immediate notification if anything changes, and a single point of contact throughout your project.",
  },
  {
    icon: Mountain,
    title: "Local Understanding",
    detail: "We've roofed hundreds of homes across Western North Carolina's unique microclimates — from sheltered valleys to exposed ridgelines. We know what works here because we've tested it here.",
  },
  {
    icon: CloudSun,
    title: "Weather Readiness",
    detail: "Mountain weather doesn't wait. We monitor conditions daily, stage work to maintain weather-tight integrity at all times, and have emergency response capability for active projects and existing clients.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Control",
    detail: "Multi-point quality verification at critical stages — underlayment, flashing, penetrations, ridge, and final. Every checkpoint is documented and available for your review.",
  },
  {
    icon: Briefcase,
    title: "Project Professionalism",
    detail: "Clean job sites, on-time starts, uniformed crews, protected landscaping, magnetic nail sweeps, and complete site restoration. Your property is treated with the same care as the roof itself.",
  },
];

/** Compact version for sidebars and smaller sections */
export const compactTrust = trustPillars.slice(0, 4);

/* ═══════════════════════════════════════════
   TRUST SECTION COMPONENT
   ═══════════════════════════════════════════ */

interface TrustFrameworkProps {
  pillars?: TrustPillar[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
  variant?: "light" | "dark";
  columns?: 2 | 3 | 4;
}

const TrustFramework = ({
  pillars = trustPillars,
  heading = "The Highlander Standard.",
  subheading = "What separates a good roofing company from one you'd actually recommend — and call again.",
  eyebrow = "Why Highlander",
  className = "",
  variant = "light",
  columns = 3,
}: TrustFrameworkProps) => {
  const isDark = variant === "dark";
  const colClass =
    columns === 2 ? "md:grid-cols-2" :
    columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" :
    "md:grid-cols-2 lg:grid-cols-3";

  if (isDark) {
    return (
      <section className={`section-dark tartan-dark relative overflow-hidden ${className}`}>
        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <div className="section-padding">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
              <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">{eyebrow}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">{heading}</h2>
              {subheading && <p className="text-dark-section-foreground/40 text-base font-body max-w-lg mx-auto">{subheading}</p>}
            </motion.div>

            <div className={`grid grid-cols-1 ${colClass} gap-4 md:gap-5`}>
              {pillars.map((pillar, i) => (
                <motion.div key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="border border-dark-section-foreground/6 rounded-sm p-6 hover:border-dark-section-foreground/12 transition-colors">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4">
                    <pillar.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                  </div>
                  <h3 className="font-heading font-bold text-dark-section-foreground text-sm mb-2">{pillar.title}</h3>
                  <p className="text-dark-section-foreground/40 text-[13px] leading-relaxed font-body">{pillar.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section-padding bg-background ${className}`}>
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="section-heading mb-4">{heading}</h2>
          {subheading && <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">{subheading}</p>}
        </motion.div>

        <div className={`grid grid-cols-1 ${colClass} gap-4 md:gap-5`}>
          {pillars.map((pillar, i) => (
            <motion.div key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
              <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{pillar.title}</h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{pillar.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustFramework;
