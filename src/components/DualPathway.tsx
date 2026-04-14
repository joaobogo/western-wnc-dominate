import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, HardHat } from "lucide-react";

const pathways = [
  {
    icon: Home,
    label: "Roofing",
    title: "Mountain-Grade Roofing",
    description: "Engineered for elevation, wind, and heavy snow loads. Every installation is specified for your property's exposure and climate zone.",
    services: ["Asphalt Shingles", "Standing Seam Metal", "Cedar Shake", "Flat & Low-Slope", "Storm Damage & Insurance", "Gutter Systems"],
    cta: "Explore Roofing Services",
    href: "/services",
    accent: "primary",
  },
  {
    icon: HardHat,
    label: "Construction",
    title: "Full-Scope Construction",
    description: "The same precision and accountability we bring to roofing — applied to additions, exteriors, outdoor living, and commercial projects.",
    services: ["Additions & Renovations", "Decks & Outdoor Living", "Siding & Exteriors", "Windows & Doors", "Commercial Build-Outs"],
    cta: "Explore Construction Services",
    href: "/services",
    accent: "gold",
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
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6">
                  {path.description}
                </p>

                {/* Service list */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                  {path.services.map((service) => (
                    <div key={service} className="flex items-center gap-2 text-sm text-foreground/70 font-body">
                      <div className={`w-1 h-1 rounded-full flex-shrink-0 ${
                        path.accent === "gold" ? "bg-[hsl(var(--highland-gold))]" : "bg-primary"
                      }`} />
                      {service}
                    </div>
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
