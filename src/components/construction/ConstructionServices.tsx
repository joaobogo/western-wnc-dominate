import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Home, Paintbrush, TreePine, Gem,
  UtensilsCrossed, Shield, Layers, HardHat,
  Compass, type LucideIcon,
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
  designNote?: string;
}

export const constructionCategories: ConstructionCategory[] = [
  {
    icon: Compass,
    title: "Design",
    slug: "/layouts-planning",
    description: "Detailed pre-construction support including layouts, floor plans, and project scope definition before you build.",
    outcomes: [
      "Cohesive project vision",
      "Fixed construction scope",
      "Accurate budget expectations",
    ],
    trustPoints: [
      "Mountain building science",
      "Terrain-specific planning",
      "Disciplined pre-build process",
    ],
  },
  {
    icon: Home,
    title: "Home Additions & Suites",
    slug: "/construction/additions",
    description: "Guest suites, in-law apartments, and room extensions designed to integrate seamlessly with your existing home's design theme.",
    outcomes: [
      "More functional living space without moving",
      "Seamless design integration",
      "Increased property value",
    ],
    trustPoints: [
      "Design continuity — matching rooflines",
      "Structural engineering included",
      "Full permit management",
    ],
    designNote: "Need help defining the scope first? Highlander's design phases help turn ideas into buildable plans.",
  },

  {
    icon: UtensilsCrossed,
    title: "Kitchen & Bath Remodels",
    slug: "/construction/renovations",
    description: "Complete interior transformations — layout reconfiguration, cabinetry, tile work, and premium finishes for the most used rooms in your home.",
    outcomes: [
      "Improved functionality and flow",
      "Modernized aesthetic and fixtures",
      "High ROI at resale",
    ],
    trustPoints: [
      "Fixed pricing and defined timelines",
      "In-house finish crews",
      "Hidden damage discovery protocol",
    ],
    designNote: "Need help defining the scope first? Highlander's design phases help turn ideas into buildable plans.",
  },
  {
    icon: TreePine,
    title: "Outdoor Living & Decks",
    slug: "/construction/outdoor-living",
    description: "Covered porches, screened rooms, decks, and pergolas built to handle mountain weather and maximize mountain life.",
    outcomes: [
      "Extended living space into the outdoors",
      "Maximized property views",
      "Year-round usability",
    ],
    trustPoints: [
      "Materials specified for WNC elevation",
      "Roofing expertise on covered structures",
      "Terrain and slope integration",
    ],
    designNote: "Need help defining the scope first? Highlander's design phases help turn ideas into buildable plans.",
  },
  {
    icon: Shield,
    title: "Siding & Exterior Trim",
    slug: "/construction/siding",
    description: "Premium siding systems and never-rot trim that protect your home's envelope from the extreme moisture of the WNC mountains.",
    outcomes: [
      "Transformed curb appeal",
      "Superior moisture protection",
      "Reduced maintenance burden",
    ],
    trustPoints: [
      "James Hardie fiber cement specialists",
      "Moisture-proof flashing details",
      "Mountain-rated material selection",
    ],
  },
  {
    icon: Layers,
    title: "Basements & Bonus Rooms",
    slug: "/construction/renovations#basements",
    description: "Converting unfinished lower levels or attic spaces into functional, climate-controlled living areas.",
    outcomes: [
      "Maximized square footage",
      "New bedroom or office space",
      "Improved home insulation",
    ],
    trustPoints: [
      "Specialized moisture management",
      "Code-compliant egress planning",
      "Mechanical system coordination",
    ],
    designNote: "Need help defining the scope first? Highlander's design phases help turn ideas into buildable plans.",
  },
  {
    icon: HardHat,
    title: "Structural & Framing",
    slug: "/construction#structural",
    description: "Load-bearing wall removal, floor leveling, foundation repairs, and structural reinforcement to correct or adapt your home's skeleton.",
    outcomes: [
      "Safe open-concept floor plans",
      "Corrected structural failures",
      "Permitted structural modifications",
    ],
    trustPoints: [
      "Structural engineer coordination",
      "Licensed GC supervision",
      "Documented structural reports",
    ],
    designNote: "Need help defining the scope first? Highlander's design phases help turn ideas into buildable plans.",
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
  subheading = "Six focused construction capabilities — each backed by the same project discipline, craft quality, and communication standards.",
  eyebrow = "Construction Services",
  className = "",
  variant = "cards",
}: ServiceGridProps) => (
  <section className={`section-padding bg-background/50 ${className}`}>
    <div className="container-tight">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center mb-12 md:mb-14"
      >
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h2 className="section-heading mb-4">{heading}</h2>
        {subheading && <p className="text-foreground/70 text-base font-body max-w-lg mx-auto leading-relaxed">{subheading}</p>}
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
            <p className="text-foreground/80 text-base leading-relaxed font-body mb-4 group-hover:text-foreground transition-colors">
              {cat.description}
            </p>

            {variant === "detailed" && (
              <div className="mb-4 space-y-1.5">
                {cat.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-2 text-[14px] text-muted-foreground/80 font-body font-medium">
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
                <p className="text-muted-foreground text-[15px] leading-relaxed font-body">{cat.description}</p>
              </div>

              <div>
                <h4 className="text-[12px] font-body font-bold uppercase tracking-[0.15em] text-primary/70 mb-3">Client Outcomes</h4>
                <div className="space-y-1.5">
                  {cat.outcomes.map((o) => (
                    <div key={o} className="flex items-start gap-2 text-[14px] text-muted-foreground/80 font-body font-medium">
                      <span className="text-primary/40 mt-0.5">✓</span>
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[12px] font-body font-bold uppercase tracking-[0.15em] text-primary/70 mb-3">Why Highlander</h4>
                <div className="space-y-1.5">
                  {cat.trustPoints.map((t) => (
                    <div key={t} className="flex items-start gap-2 text-[14px] text-muted-foreground/80 font-body font-medium">
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
