import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Home, Paintbrush, TreePine, Gem,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   SERVICE CATEGORY DATA
   ═══════════════════════════════════════════ */

export interface ConstructionCategory {
  icon: LucideIcon;
  title: string;
  slug: string;
  description: string;
  outcomes: string[];
  trustPoints: string[];
}

export const constructionCategories: ConstructionCategory[] = [
  {
    icon: Home,
    title: "Home Additions & Expansions",
    slug: "/construction/additions",
    description: "Guest suites, expanded living areas, garages, bonus rooms, main-level master suites, and sunrooms — designed to integrate seamlessly with your existing home's architecture.",
    outcomes: [
      "More functional living space without moving",
      "Seamless architectural integration with existing home",
      "Increased property value and livability",
      "Aging-in-place readiness",
    ],
    trustPoints: [
      "Design continuity — matching rooflines, materials, proportions",
      "Structural engineering coordination included",
      "Full permitting and inspection management",
      "In-house crews for consistent quality",
    ],
  },
  {
    icon: Paintbrush,
    title: "Renovations & Exterior Improvements",
    slug: "/construction/renovations",
    description: "Siding replacement, window upgrades, entry enhancements, trim and fascia work, structural exterior repairs, and comprehensive building envelope improvements.",
    outcomes: [
      "Transformed curb appeal and first impressions",
      "Improved energy efficiency and comfort",
      "Protected structural integrity",
      "Stronger resale positioning",
    ],
    trustPoints: [
      "Same quality standards as roofing and new construction",
      "Roofing + exterior coordination advantage",
      "Material sourcing for WNC climate conditions",
      "Hidden damage discovery and documentation protocols",
    ],
  },
  {
    icon: TreePine,
    title: "Outdoor Living & Exterior Builds",
    slug: "/construction/outdoor-living",
    description: "Covered porches, screened rooms, decks, pergolas, outdoor kitchens, and custom exterior structures built to handle mountain weather and maximize mountain life.",
    outcomes: [
      "Extended living space into the outdoors",
      "Maximized property views and orientation",
      "Year-round usability with climate-smart design",
      "Premium outdoor entertaining capability",
    ],
    trustPoints: [
      "Materials specified for WNC elevation and weather",
      "Roofing expertise on covered outdoor structures",
      "Terrain and slope integration capability",
      "Electrical, gas, and utility coordination included",
    ],
  },
  {
    icon: Gem,
    title: "Custom Construction & Specialty Projects",
    slug: "/construction/custom",
    description: "Multi-phase renovations, structural modifications, architecturally significant work, and high-coordination projects that demand precision, planning, and craft quality.",
    outcomes: [
      "Complex vision executed with precision",
      "Architectural character preserved or enhanced",
      "Transparent change management and documentation",
      "Single-source accountability for complex scopes",
    ],
    trustPoints: [
      "Selective project acceptance ensures right fit",
      "Dedicated project manager for every custom build",
      "Architect collaboration and design-build capability",
      "Daily quality verification and documented progress",
    ],
  },
];

/* ═══════════════════════════════════════════
   SERVICE GRID COMPONENT
   ═══════════════════════════════════════════ */

interface ServiceGridProps {
  categories?: ConstructionCategory[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
  variant?: "cards" | "detailed";
}

/** Compact card grid (for landing pages) */
export const ConstructionServiceGrid = ({
  categories = constructionCategories,
  heading = "What We Build.",
  subheading = "Four focused construction capabilities — each backed by the same project discipline, craft quality, and communication standards.",
  eyebrow = "Construction Services",
  className = "",
  variant = "cards",
}: ServiceGridProps) => (
  <section className={`section-padding bg-secondary tartan-bg ${className}`}>
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center mb-12 md:mb-14"
      >
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h2 className="section-heading mb-4">{heading}</h2>
        {subheading && <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">{subheading}</p>}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift"
          >
            <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
              <cat.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">
              {cat.title}
            </h3>
            <p className="text-muted-foreground text-[13px] leading-relaxed font-body mb-4">
              {cat.description}
            </p>

            {variant === "detailed" && (
              <div className="mb-4 space-y-1.5">
                {cat.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-2 text-[12px] text-muted-foreground/70 font-body">
                    <span className="text-primary/40 mt-0.5">•</span>
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            )}

            <Link
              to={cat.slug}
              className="group/link text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body"
            >
              Learn More <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   COMPARISON LAYOUT (side-by-side features)
   ═══════════════════════════════════════════ */

export const ConstructionComparison = ({
  categories = constructionCategories,
  heading = "Find the Right Service.",
  eyebrow = "Compare Options",
  className = "",
}: {
  categories?: ConstructionCategory[];
  heading?: string;
  eyebrow?: string;
  className?: string;
}) => (
  <section className={`section-padding bg-background ${className}`}>
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center mb-10 md:mb-14"
      >
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h2 className="section-heading mb-4">{heading}</h2>
      </motion.div>

      <div className="space-y-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group bg-card border border-border rounded-sm p-6 md:p-8 hover:border-primary/15 card-lift"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-sm bg-primary/6 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                    <cat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm group-hover:text-primary transition-colors">{cat.title}</h3>
                </div>
                <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{cat.description}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/50 mb-3">Client Outcomes</h4>
                <div className="space-y-1.5">
                  {cat.outcomes.map((o) => (
                    <div key={o} className="flex items-start gap-2 text-[12px] text-muted-foreground font-body">
                      <span className="text-primary/40 mt-0.5">✓</span>
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-body font-bold uppercase tracking-[0.15em] text-primary/50 mb-3">Why Highlander</h4>
                <div className="space-y-1.5">
                  {cat.trustPoints.map((t) => (
                    <div key={t} className="flex items-start gap-2 text-[12px] text-muted-foreground font-body">
                      <span className="text-primary/40 mt-0.5">•</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border">
              <Link to={cat.slug} className="group/link text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body">
                Explore {cat.title} <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   GALLERY INTRO (reusable section header for galleries)
   ═══════════════════════════════════════════ */

export const GalleryIntro = ({
  heading = "Featured Projects.",
  subheading,
  eyebrow = "Our Work",
  className = "",
}: {
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`max-w-2xl mx-auto text-center mb-10 md:mb-14 ${className}`}
  >
    <span className="eyebrow mb-3 block">{eyebrow}</span>
    <h2 className="section-heading">{heading}</h2>
    {subheading && <p className="text-muted-foreground text-sm font-body max-w-md mx-auto mt-3">{subheading}</p>}
  </motion.div>
);
