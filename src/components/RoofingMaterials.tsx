import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mountain, Shield, Clock, Droplets, Layers, Gem, Star, ThermometerSun } from "lucide-react";

/* ═══════════════════════════════════════════
   MATERIAL DATA
   ═══════════════════════════════════════════ */

export interface RoofMaterial {
  id: string;
  name: string;
  subtitle: string;
  icon: typeof Layers;
  colorAccent: string;
  visualStyle: string;
  durability: string;
  lifespan: string;
  maintenance: string;
  idealFor: string;
  wncPerformance: string;
  highlights: string[];
  priceRange: string;
}

export const roofingMaterials: RoofMaterial[] = [
  {
    id: "3-tab-asphalt",
    name: "3-Tab Asphalt Shingles",
    subtitle: "Reliable, budget-conscious protection",
    icon: Shield,
    colorAccent: "hsl(var(--heritage-green))",
    visualStyle: "Clean, flat profile with a uniform, traditional appearance. Lighter weight and thinner profile than dimensional alternatives.",
    durability: "Moderate. 3-tab shingles perform reliably in standard conditions but are more susceptible to wind uplift and granule loss over time, particularly at higher elevations.",
    lifespan: "15–25 years depending on exposure, ventilation, and installation quality.",
    maintenance: "Low maintenance requirements. Periodic inspection for lifted tabs, granule loss, and flashing integrity recommended every 2–3 years.",
    idealFor: "Budget-conscious homeowners, rental properties, and situations where reliable performance matters more than visual impact.",
    wncPerformance: "Adequate for sheltered valleys and lower elevations. Exposed ridgelines and high-wind corridors may reduce effective lifespan. Not recommended for steep-slope applications where visual profile is highly visible.",
    highlights: ["Most affordable roofing option", "Proven performance history", "Wide color selection", "Easy to repair and match"],
    priceRange: "$$$",
  },
  {
    id: "dimensional-shingles",
    name: "Dimensional Shingles",
    subtitle: "The standard for premium residential roofing",
    icon: Layers,
    colorAccent: "hsl(var(--heritage-green))",
    visualStyle: "Multi-dimensional profile with shadow lines that create depth and visual texture. Available in designer colors that replicate the look of natural slate, cedar, or tile from ground level.",
    durability: "High. Laminated construction provides superior wind resistance (rated 110–130 mph), better impact performance, and significantly longer service life than 3-tab shingles.",
    lifespan: "Long service life with manufacturer warranty options available on premium lines. Actual lifespan depends on ventilation, installation quality, and exposure.",
    maintenance: "Low. Annual visual inspection recommended. Blown-off tabs can be replaced individually without disturbing surrounding material.",
    idealFor: "Homeowners who want the best balance of appearance, performance, and value. The dominant choice for custom and high-value residential properties in WNC.",
    wncPerformance: "Excellent across all WNC elevations and exposures. Enhanced wind ratings and impact resistance handle mountain weather conditions well. Premium lines with SBS-modified asphalt offer superior flexibility in freeze-thaw cycling.",
    highlights: ["Best value-to-performance ratio", "Manufacturer warranty options", "110–130 mph wind ratings", "Designer color collections", "SBS-modified options for cold weather"],
    priceRange: "$$$$",
  },
  {
    id: "standing-seam-metal",
    name: "Standing Seam Metal",
    subtitle: "Maximum lifespan, minimum maintenance",
    icon: Star,
    colorAccent: "hsl(var(--highland-gold))",
    visualStyle: "Clean, linear profile with raised seams creating strong vertical lines. Available in a wide spectrum of factory-applied colors and finishes — from traditional mountain aesthetics to modern design statements.",
    durability: "Exceptional. Standing seam metal handles wind, hail, snow load, and UV exposure better than any other residential roofing material. No granule loss, no organic degradation, no moisture absorption.",
    lifespan: "40–70+ years. Many standing seam roofs outlast the buildings they're installed on. Factory finishes carry manufacturer fade and chalk warranties.",
    maintenance: "Very low. No granules to lose, no tabs to lift. Occasional inspection of panel clips, sealant at penetrations, and gutter connections.",
    idealFor: "Homeowners planning to stay long-term, properties where steep slopes make the roof a dominant visual element, and anyone who wants to install a roof once and not think about it again.",
    wncPerformance: "Outstanding. Standing seam excels in WNC's climate — superior snow shedding, exceptional wind resistance, complete immunity to ice damming when installed with proper underlayment, and no moisture absorption during freeze-thaw cycling.",
    highlights: ["50+ year effective lifespan", "Superior wind & hail resistance", "Energy-efficient reflective coatings", "Snow shedding capability", "Zero moisture absorption", "Class A fire rating"],
    priceRange: "$$$$$",
  },
  {
    id: "cedar-shake",
    name: "Cedar Shake & Shingle",
    subtitle: "Natural beauty, timeless mountain character",
    icon: Gem,
    colorAccent: "hsl(var(--highland-gold))",
    visualStyle: "Rich, organic texture with natural color variation that weathers to a distinguished silver-gray patina over time. Each shake is unique — creating a warmth and visual depth that no synthetic material can replicate.",
    durability: "Good to excellent depending on grade, treatment, and ventilation. Premium hand-split shakes provide superior wind resistance through their thick, irregular profile.",
    lifespan: "30–40 years when properly installed with adequate ventilation and treated for moss and insect resistance. Fire-treated options available for areas with wildfire considerations.",
    maintenance: "Moderate. Cedar requires periodic treatment for moss, algae, and insect resistance. Annual inspection and cleaning recommended. Replacement of individual shakes is straightforward.",
    idealFor: "Custom mountain homes, visually distinctive properties, and homeowners who want their roof to be a design statement — not just a weather barrier.",
    wncPerformance: "Well-suited to the mountain aesthetic and performs well with proper ventilation and maintenance. Cedar's natural insulation value provides thermal benefits in cold weather. Requires attention to moisture management in high-humidity microclimates.",
    highlights: ["Unmatched natural beauty", "Natural insulation properties", "Hand-split or precision-cut options", "Develops distinguished patina", "Renewable, sustainable material"],
    priceRange: "$$$$$",
  },
  {
    id: "synthetic-slate",
    name: "Synthetic Slate",
    subtitle: "Slate aesthetics, modern engineering",
    icon: Mountain,
    colorAccent: "hsl(var(--heritage-green))",
    visualStyle: "Engineered to replicate the visual texture, color variation, and shadow profile of natural quarried slate — without the extreme weight. Available in multi-width blends that mimic authentic random-width slate installations.",
    durability: "Very high. Impact-rated (Class 4), wind-rated to 110+ mph, and engineered for UV stability. No delamination, no moisture absorption, no organic decay.",
    lifespan: "Long service life on premium lines with manufacturer warranty options available.",
    maintenance: "Very low. Similar maintenance profile to dimensional shingles — periodic visual inspection with no treatment or coating required.",
    idealFor: "Homeowners who love the look of natural slate but need a lighter-weight, more cost-effective, or more readily repairable alternative. Excellent for steep-slope applications where the roof is highly visible.",
    wncPerformance: "Excellent. Impact resistance handles hail well, wind ratings exceed mountain conditions, and the lightweight profile reduces structural load requirements on older homes.",
    highlights: ["Class 4 impact rating", "Manufacturer warranty options available", "75% lighter than natural slate", "Consistent quality, no delamination", "Environmentally recycled content"],
    priceRange: "$$$$",
  },
];

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

interface RoofingMaterialsProps {
  showHeading?: boolean;
  className?: string;
}

const RoofingMaterials = ({ showHeading = true, className = "" }: RoofingMaterialsProps) => {
  const [activeId, setActiveId] = useState(roofingMaterials[1].id);
  const active = roofingMaterials.find((m) => m.id === activeId)!;

  return (
    <section className={`section-padding ${className}`}>
      <div className="container-tight">
        {showHeading && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
            <span className="eyebrow mb-3 block">Roofing Materials</span>
            <h2 className="section-heading mb-4">
              Choose the Right Material<br className="hidden md:block" /> for Your Home & Climate.
            </h2>
            <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
              Every material has strengths. The right choice depends on your home's design theme, your long-term plans, and how your specific location in Western North Carolina affects performance.
            </p>
          </motion.div>
        )}

        {/* Material Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {roofingMaterials.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setActiveId(mat.id)}
              className={`group relative px-4 py-2.5 rounded-sm text-xs font-body font-semibold transition-all duration-200 ${
                activeId === mat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {mat.name}
            </button>
          ))}
        </div>

        {/* Active Material Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-sm overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-border">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0">
                  <active.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-lg md:text-xl">{active.name}</h3>
                  <p className="text-muted-foreground text-sm font-body">{active.subtitle}</p>
                </div>
                <div className="ml-auto hidden md:flex items-center gap-1">
                  {active.priceRange.split("").map((_, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < active.priceRange.length ? "bg-primary/30" : "bg-border"}`} />
                  ))}
                  <span className="text-caption text-muted-foreground ml-1.5 font-body">Investment Level</span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <h4 className="text-caption font-body font-bold uppercase tracking-[0.15em] text-primary/80 mb-1.5">Visual Style</h4>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{active.visualStyle}</p>
                </div>
                <div>
                  <h4 className="text-caption font-body font-bold uppercase tracking-[0.15em] text-primary/80 mb-1.5">Durability</h4>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{active.durability}</p>
                </div>
                <div>
                  <h4 className="text-caption font-body font-bold uppercase tracking-[0.15em] text-primary/80 mb-1.5">Expected Lifespan</h4>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{active.lifespan}</p>
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <h4 className="text-caption font-body font-bold uppercase tracking-[0.15em] text-primary/80 mb-1.5">Maintenance</h4>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{active.maintenance}</p>
                </div>
                <div>
                  <h4 className="text-caption font-body font-bold uppercase tracking-[0.15em] text-primary/80 mb-1.5">Ideal Homeowner</h4>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{active.idealFor}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <ThermometerSun className="w-3 h-3 text-primary/80" />
                    <h4 className="text-caption font-body font-bold uppercase tracking-[0.15em] text-primary/80">WNC Climate Performance</h4>
                  </div>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{active.wncPerformance}</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="px-6 md:px-8 py-5 bg-secondary/30 border-t border-border">
              <div className="flex flex-wrap gap-2.5">
                {active.highlights.map((h) => (
                  <span key={h} className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-muted-foreground bg-background border border-border rounded-sm px-3 py-1.5">
                    <CheckCircle className="w-3 h-3 text-primary/80" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Comparison Chips */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 text-center">
          <p className="text-muted-foreground text-xs font-body mb-4">Quick comparison — click any material above to explore</p>
          <div className="flex flex-wrap justify-center gap-3">
            {roofingMaterials.map((mat) => (
              <button
                key={mat.id}
                onClick={() => setActiveId(mat.id)}
                className={`text-caption font-body px-3 py-1 rounded-full transition-all ${
                  activeId === mat.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mat.name} · {mat.lifespan.split(" ")[0]} yrs
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoofingMaterials;
