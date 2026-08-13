import { motion } from "framer-motion";
import {
  Mountain, CloudRain, Thermometer, TreePine, Home,
  Compass, Layers, type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   WNC CONSTRUCTION RELEVANCE SYSTEM
   Local insights that differentiate Highlander
   ═══════════════════════════════════════════ */

export interface LocalInsight {
  icon: LucideIcon;
  title: string;
  detail: string;
  /** How this affects construction decisions */
  implication: string;
}

export const wncInsights: LocalInsight[] = [
  {
    icon: Mountain,
    title: "Terrain & Slope",
    detail: "Most WNC properties involve grade changes, rock outcroppings, limited equipment access, and variable soil depths. Flat, clear lots are the exception — not the rule.",
    implication: "Foundation design, drainage engineering, retaining structures, and material staging all require site-specific planning that out-of-area contractors routinely underestimate.",
  },
  {
    icon: CloudRain,
    title: "Weather Exposure",
    detail: "WNC receives 40–60+ inches of rain annually, with intense summer storms, winter ice events, and rapid temperature swings that stress building materials and connections.",
    implication: "Weather barriers, flashing details, drainage design, and material selection must be specified for mountain conditions — not coastal or piedmont assumptions.",
  },
  {
    icon: Thermometer,
    title: "Elevation & Microclimates",
    detail: "Elevations range from 2,000 to 6,000+ feet across the region. A 10-mile difference can mean a 15°F temperature gap, different snow loads, and completely different moisture exposure.",
    implication: "Insulation values, ventilation design, material freeze-thaw ratings, and heating system sizing must be calibrated to your specific elevation — not regional averages.",
  },
  {
    icon: Home,
    title: "Mountain Design Theme",
    detail: "WNC homes range from 1920s bungalows and mid-century ranches to timber-frame lodges and contemporary mountain modern. Each style has distinct structural systems, material languages, and proportional rules.",
    implication: "Additions and renovations must respect the original design vocabulary. Roofline pitch, overhang proportions, window rhythm, and material palette must be matched — not approximated.",
  },
  {
    icon: TreePine,
    title: "Durability Demands",
    detail: "UV intensity at elevation, humidity-driven moss and mildew, insect pressure, and falling debris from surrounding trees create accelerated wear on exterior surfaces and exposed structures.",
    implication: "Material specifications must account for mountain-specific degradation patterns. What lasts 30 years in the piedmont may last 15–20 years at 3,500 feet without proper specification.",
  },
  {
    icon: Compass,
    title: "Property Expectations",
    detail: "WNC homeowners invest in their properties for long-term enjoyment, retirement, family legacy, and connection to the mountain landscape. Construction work must add lasting value — not just square footage.",
    implication: "Quality, craftsmanship, and design sensitivity matter more here than in markets where speed and cost dominate. WNC clients expect work that honors their investment and their setting.",
  },
];

/** Compact 4-item version for sidebars */
export const compactWNCInsights = wncInsights.slice(0, 4);

/* ═══════════════════════════════════════════
   WNC RELEVANCE SECTION COMPONENT
   ═══════════════════════════════════════════ */

interface WNCRelevanceProps {
  insights?: LocalInsight[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
  variant?: "grid" | "sidebar";
  showImplications?: boolean;
}

/** Full section — grid or sidebar layout */
const WNCRelevance = ({
  insights = wncInsights,
  heading = "Built for Western\nNorth Carolina.",
  subheading = "Local terrain, weather, design themes, and property expectations shape every construction decision we make. Here's what that means for your project.",
  eyebrow = "Local Expertise",
  className = "",
  variant = "grid",
  showImplications = true,
}: WNCRelevanceProps) => {
  if (variant === "sidebar") {
    return (
      <section className={`section-padding bg-background ${className}`}>
        <div className="container-tight max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <span className="eyebrow mb-3 block">{eyebrow}</span>
              <h2 className="section-heading mb-5 whitespace-pre-line">{heading}</h2>
              {subheading && <p className="text-muted-foreground text-sm leading-relaxed font-body">{subheading}</p>}
            </motion.div>

            <div className="lg:col-span-3 space-y-4">
              {insights.map((insight, i) => (
                <motion.div key={insight.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-primary/15 card-lift">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/12 transition-colors">
                      <insight.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{insight.title}</h3>
                      <p className="text-muted-foreground text-body-xs leading-relaxed font-body mb-2">{insight.detail}</p>
                      {showImplications && (
                        <p className="text-primary/80 text-body-xs leading-relaxed font-body italic">{insight.implication}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section-padding bg-background/50 ${className}`}>
      <div className="container-tight">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="section-heading mb-4 whitespace-pre-line">{heading}</h2>
          {subheading && <p className="text-muted-foreground text-base font-body max-w-lg mx-auto leading-relaxed">{subheading}</p>}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {insights.map((insight, i) => (
            <motion.div key={insight.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
              <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                <insight.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{insight.title}</h3>
              <p className="text-muted-foreground text-body-xs leading-relaxed font-body mb-2">{insight.detail}</p>
              {showImplications && (
                <p className="text-primary/80 text-body-xs leading-relaxed font-body italic border-t border-border pt-2 mt-3">{insight.implication}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WNCRelevance;

/* ═══════════════════════════════════════════
   DARK VARIANT — for hero-adjacent placement
   ═══════════════════════════════════════════ */

export const WNCRelevanceDark = ({
  insights = compactWNCInsights,
  heading = "Why Local Matters.",
  subheading = "Mountain construction requires mountain knowledge.",
  eyebrow = "WNC Expertise",
  className = "",
}: Omit<WNCRelevanceProps, "variant" | "showImplications">) => (
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
          <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">{eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground whitespace-pre-line">{heading}</h2>
          {subheading && <p className="text-dark-section-foreground/95 text-base font-body max-w-lg mx-auto">{subheading}</p>}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {insights.map((insight, i) => (
            <motion.div key={insight.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="border border-dark-section-foreground/6 rounded-sm p-6 hover:border-dark-section-foreground/12 transition-colors">
              <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4">
                <insight.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
              </div>
              <h3 className="font-heading font-bold text-dark-section-foreground text-sm mb-2">{insight.title}</h3>
              <p className="text-dark-section-foreground/95 text-body-xs leading-relaxed font-body">{insight.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   INTEGRATION GUIDE (data only)
   How WNC insights should appear across pages
   ═══════════════════════════════════════════ */

export const wncIntegrationGuide = {
  pageCopy: [
    "Reference specific elevations, terrain types, and weather patterns in service descriptions — not generic 'local' claims",
    "Name specific WNC conditions (freeze-thaw, summer humidity, ridgeline wind exposure) when explaining material choices",
    "Use 'at elevation' and 'mountain-specific' language to differentiate from piedmont/coastal contractors",
  ],
  visualStorytelling: [
    "Hero images should show WNC terrain — slopes, tree canopy, mountain views, not flat suburban lots",
    "Gallery projects should include terrain context — show the slope, the setting, the view the project captures",
    "Before/after pairs should highlight how construction responds to site conditions, not just aesthetic change",
  ],
  blogContent: [
    "Seasonal building guides specific to WNC (best months, weather windows, permit timing)",
    "Material performance comparisons at WNC elevations vs. lower-altitude expectations",
    "Mountain-specific construction challenges (slope building, rock excavation, access limitations)",
    "WNC design style guides — what makes mountain homes distinctive and how to preserve it",
  ],
  faqIntegration: [
    "Address WNC-specific concerns (slope building, weather delays, material durability at elevation)",
    "Reference regional permit and inspection realities by county",
    "Explain how WNC climate affects project timelines differently than other regions",
  ],
  trustMessaging: [
    "Lead with 'built hundreds of homes across WNC' — specificity over generality",
    "Reference terrain challenges overcome, not just years in business",
    "Position local knowledge as risk mitigation — 'we know what fails here'",
  ],
} as const;
