import { motion } from "framer-motion";
import { ArrowRight, Home, HardHat, Shield, Hammer, Layers, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const divisions = [
  {
    icon: Home,
    label: "Roofing Division",
    tagline: "CertainTeed Master Applicator · GAF Certified",
    color: "primary",
    iconBg: "bg-primary/8",
    iconColor: "text-primary",
    borderColor: "border-primary/15 hover:border-primary/25",
    stats: [
      { value: "4.9★", label: "Google Rating" },
      { value: "Top 1%", label: "Nationally Certified" },
    ],
    href: "/roofing",
    cta: "Explore Roofing",
    ctaColor: "text-primary",
  },
  {
    icon: HardHat,
    label: "Construction Division",
    tagline: "Licensed General Contractor · Full-Scope Building",
    color: "gold",
    iconBg: "bg-[hsl(var(--highland-gold)/0.1)]",
    iconColor: "text-[hsl(var(--highland-gold))]",
    borderColor: "border-[hsl(var(--highland-gold)/0.12)] hover:border-[hsl(var(--highland-gold)/0.25)]",
    stats: [
      { value: "40+", label: "Years Combined Exp." },
      { value: "100%", label: "Licensed & Insured" },
    ],
    href: "/construction",
    cta: "Explore Construction",
    ctaColor: "text-[hsl(var(--highland-gold))]",
  },
  {
    icon: Ruler,
    label: "Design Support",
    tagline: "Pre-Construction · Layouts · Planning",
    color: "gold",
    iconBg: "bg-accent/5",
    iconColor: "text-accent",
    borderColor: "border-accent/15 hover:border-accent/25",
    stats: [
      { value: "Layout", label: "Professional support" },
      { value: "Plan", label: "Before you build" },
    ],
    href: "/layouts-planning",
    cta: "Explore Design",
    ctaColor: "text-accent",
  },
];

const NotJustRoofing = () => {
  return (
    <section className="section-padding bg-secondary/40 relative overflow-hidden">
      <div className="container-tight">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">Roofing · Construction · Design & Planning</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4 leading-snug">
              Three Disciplines.<br className="hidden md:block" />
              One Reputation on the Line.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-foreground text-lg md:text-xl font-body max-w-lg mx-auto font-bold leading-relaxed">
              Replacing your roof and renovating your kitchen shouldn't require two companies,
              two schedules, and two sets of excuses. Same crew. Same process.
              Same owner answering the phone.
            </p>
          </ScrollReveal>
          <GoldLine width="3rem" centered delay={0.35} className="mt-6" />
        </div>

        {/* Three equal division cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {divisions.map((div, i) => (
            <motion.div
              key={div.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: HIGHLAND_EASE }}
            >
              <Link
                to={div.href}
                className={`group block bg-card border ${div.borderColor} rounded-none overflow-hidden h-full card-lift transition-all duration-500`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                {/* Top accent */}
                <div className={`h-[2px] w-full bg-gradient-to-r from-transparent ${
                  div.color === "gold"
                    ? "via-[hsl(var(--highland-gold)/0.4)]"
                    : "via-[hsl(var(--heritage-green)/0.3)]"
                } to-transparent`} />

                <div className="p-7 md:p-9">
                  {/* Division header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-none flex items-center justify-center ${div.iconBg}`}>
                      <div.icon className={`w-5 h-5 ${div.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-heading font-bold text-foreground">{div.label}</h3>
                      <p className="text-[10px] font-body font-medium uppercase tracking-[0.12em] text-muted-foreground/50">
                        {div.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 py-5 border-y border-border/60">
                    {div.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <span className={`block text-xl font-heading font-bold ${div.iconColor} leading-none mb-1`}>
                          {stat.value}
                        </span>
                        <span className="text-[10px] font-body uppercase tracking-[0.1em] text-muted-foreground/50">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <span className={`inline-flex items-center gap-2 font-semibold text-sm font-body ${div.ctaColor} group-hover:gap-3 transition-all`}>
                    {div.cta} <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Shared foundation message */}
        <ScrollReveal variant="fade" delay={0.4} className="text-center mt-10">
          <div className="flex items-center justify-center gap-3 text-muted-foreground/40">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[11px] font-body font-medium uppercase tracking-[0.14em]">
              Same Crews · Same Process · Same Warranty Protection
            </span>
            <Shield className="w-3.5 h-3.5" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NotJustRoofing;
