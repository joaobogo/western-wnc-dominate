import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, HardHat, ShieldCheck, Wrench, CloudLightning, Search, Layers, PaintBucket, PlusSquare, Hammer, Ruler, Settings } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

import metalRoof from "@/assets/gallery/metal-005.webp";
import cedarRoof from "@/assets/gallery/cedar-004.webp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const pathways = [
  {
    icon: Home,
    label: "Roofing Division",
    title: "Mountain-Grade Roofing",
    description: "Roof systems specified for WNC's elevation, wind exposure, and freeze-thaw cycling — installed by certified crews who've built their careers on these ridgelines.",
    services: [
      { icon: Layers, name: "Full Roof Replacements" },
      { icon: Wrench, name: "Targeted Repairs" },
      { icon: CloudLightning, name: "Storm Damage & Insurance" },
      { icon: Search, name: "Professional Inspections" },
      { icon: PaintBucket, name: "Material Selection & Guidance" },
      { icon: ShieldCheck, name: "Long-Term Roof Performance" },
    ],
    cta: "Explore Roofing",
    href: "/services",
    accent: "primary" as const,
    image: metalRoof,
  },
  {
    icon: HardHat,
    label: "Construction Division",
    title: "Full-Scope Construction",
    description: "The same disciplined process and accountability that built our roofing reputation — now applied to additions, renovations, decks, siding, and complete exterior transformations.",
    services: [
      { icon: Hammer, name: "Renovations & Remodels" },
      { icon: PaintBucket, name: "Exterior Upgrades & Siding" },
      { icon: PlusSquare, name: "Additions & Expansions" },
      { icon: Ruler, name: "Structural Improvements" },
      { icon: Settings, name: "Custom Project Work" },
      { icon: ShieldCheck, name: "Quality-Controlled Execution" },
    ],
    cta: "Explore Construction",
    href: "/services",
    accent: "gold" as const,
    image: cedarRoof,
  },
];

const DualPathway = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight">
        <div className="max-w-2xl mx-auto text-center mb-14 md:mb-16">
          <ScrollReveal variant="fade" delay={0.05}>
            <span className="eyebrow mb-4 block">Two Disciplines. One Standard.</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-4">
              Roofing & Construction,<br className="hidden md:block" /> Built the Highlander Way.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
              Whether it's a standing seam metal roof or a full home addition, every project follows the same
              disciplined process — certified materials, documented scope, and warranty-backed results.
            </p>
          </ScrollReveal>
          <GoldLine width="4rem" centered delay={0.4} className="mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {pathways.map((path, i) => (
            <motion.div
              key={path.label}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: HIGHLAND_EASE }}
              className="group relative bg-card border border-border rounded-none overflow-hidden hover:border-[hsl(var(--highland-gold)/0.2)] hover:shadow-[0_12px_40px_-10px_hsl(var(--heritage-charcoal)/0.08)] transition-all duration-500 spotlight-hover"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              {/* Editorial image header */}
              <div className="relative h-40 md:h-48 overflow-hidden">
                <motion.img
                  src={path.image}
                  alt={path.title}
                  className="w-full h-full object-cover img-zoom-dramatic"
                  loading="lazy"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: HIGHLAND_EASE }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                
                {/* Floating label */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center backdrop-blur-sm ${
                    path.accent === "gold" ? "bg-[hsl(var(--highland-gold)/0.2)]" : "bg-primary/20"
                  }`}>
                    <path.icon className={`w-4 h-4 ${
                      path.accent === "gold" ? "text-white" : "text-white"
                    }`} />
                  </div>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm bg-black/20 px-2 py-1">
                    {path.label}
                  </span>
                </div>
              </div>

              {/* Top accent line */}
              <div
                className={`h-[2px] w-full ${
                  path.accent === "gold"
                    ? "bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.5)] to-[hsl(var(--highland-gold)/0)]"
                    : "bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.4)] to-[hsl(var(--heritage-green)/0)]"
                }`}
              />

              {/* Gold left border draw on hover */}
              <motion.div
                className="absolute left-0 top-0 w-[2px] bg-[hsl(var(--highland-gold))] z-10"
                initial={{ height: 0 }}
                whileHover={{ height: "100%" }}
                transition={{ duration: 0.4 }}
              />

              <div className="p-8 md:p-10 relative z-10">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-3 leading-snug tracking-tight">
                  {path.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-[1.7] font-body mb-8">
                  {path.description}
                </p>

                {/* Service list with stagger */}
                <div className="space-y-3 mb-8">
                  {path.services.map((service, si) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 + si * 0.05, duration: 0.35, ease: HIGHLAND_EASE }}
                      className="flex items-center gap-3 group/item"
                    >
                      <div className={`w-7 h-7 rounded-none flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        path.accent === "gold"
                          ? "bg-[hsl(var(--highland-gold)/0.06)] group-hover/item:bg-[hsl(var(--highland-gold)/0.12)]"
                          : "bg-primary/5 group-hover/item:bg-primary/10"
                      }`}>
                        <service.icon className={`w-3.5 h-3.5 ${
                          path.accent === "gold" ? "text-[hsl(var(--highland-gold)/0.7)]" : "text-primary/60"
                        }`} />
                      </div>
                      <span className="text-sm text-foreground/80 font-body font-medium">{service.name}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to={path.href}
                  className={`inline-flex items-center gap-2 font-semibold text-sm group/cta transition-colors ${
                    path.accent === "gold"
                      ? "text-[hsl(var(--highland-gold))] hover:text-[hsl(var(--highland-gold)/0.8)]"
                      : "text-primary hover:text-primary/80"
                  }`}
                >
                  {path.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DualPathway;
