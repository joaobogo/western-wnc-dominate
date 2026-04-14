import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, HardHat, ShieldCheck, Wrench, CloudLightning, Search, Layers, PaintBucket, PlusSquare, Hammer, Ruler, Settings } from "lucide-react";

const pathways = [
  {
    icon: Home,
    label: "Roofing Division",
    title: "Mountain-Grade Roofing",
    description: "Engineered for elevation, wind, and heavy snow loads. From premium replacements to storm restoration, every system is specified for your property's exposure, climate zone, and long-term performance.",
    services: [
      { icon: Layers, name: "Full Roof Replacements" },
      { icon: Wrench, name: "Targeted Repairs" },
      { icon: CloudLightning, name: "Storm Damage & Insurance" },
      { icon: Search, name: "Professional Inspections" },
      { icon: PaintBucket, name: "Material Selection & Options" },
      { icon: ShieldCheck, name: "Long-Term Roof Performance" },
    ],
    cta: "Explore Roofing Services",
    href: "/services",
    accent: "primary" as const,
  },
  {
    icon: HardHat,
    label: "Construction Division",
    title: "Full-Scope Construction",
    description: "The same precision and accountability we bring to roofing — applied to renovations, additions, exterior transformations, and structural improvements. One team, one standard.",
    services: [
      { icon: Hammer, name: "Renovations & Remodels" },
      { icon: PaintBucket, name: "Exterior Upgrades & Siding" },
      { icon: PlusSquare, name: "Additions & Expansions" },
      { icon: Ruler, name: "Structural Improvements" },
      { icon: Settings, name: "Custom Project Work" },
      { icon: ShieldCheck, name: "Quality-Controlled Execution" },
    ],
    cta: "Explore Construction Services",
    href: "/services",
    accent: "gold" as const,
  },
];

const DualPathway = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12 md:mb-14"
        >
          <span className="eyebrow mb-3 block">Two Disciplines. One Standard.</span>
          <h2 className="section-heading mb-4">
            Roofing & Construction,<br className="hidden md:block" /> Built the Highlander Way.
          </h2>
          <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
            Whether it's a roof replacement or a full renovation, every project follows the same 
            disciplined process — certified materials, transparent pricing, and warranty-backed results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {pathways.map((path, i) => (
            <motion.div
              key={path.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group relative bg-card border border-border rounded-sm overflow-hidden hover:border-[hsl(var(--highland-gold)/0.25)] hover:shadow-[0_12px_40px_-10px_hsl(var(--heritage-charcoal)/0.08)] transition-all duration-300"
            >
              {/* Top accent line */}
              <div
                className={`h-[2px] w-full ${
                  path.accent === "gold"
                    ? "bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.5)] to-[hsl(var(--highland-gold)/0)]"
                    : "bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.4)] to-[hsl(var(--heritage-green)/0)]"
                }`}
              />

              <div className="p-7 md:p-9">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                    path.accent === "gold" ? "bg-[hsl(var(--highland-gold)/0.1)]" : "bg-primary/8"
                  }`}>
                    <path.icon className={`w-5 h-5 ${
                      path.accent === "gold" ? "text-[hsl(var(--highland-gold))]" : "text-primary"
                    }`} />
                  </div>
                  <span className={`text-[10px] font-body font-semibold uppercase tracking-[0.15em] ${
                    path.accent === "gold" ? "text-[hsl(var(--highland-gold))]" : "text-primary"
                  }`}>
                    {path.label}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-3 leading-snug">
                  {path.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-7">
                  {path.description}
                </p>

                {/* Service list with icons */}
                <div className="space-y-3 mb-8">
                  {path.services.map((service, si) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + si * 0.04, duration: 0.35 }}
                      className="flex items-center gap-3 group/item"
                    >
                      <div className={`w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
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
