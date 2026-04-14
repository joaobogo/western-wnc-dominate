import { motion } from "framer-motion";
import { Mountain, Thermometer, Wind, Droplets, TreePine, MapPin } from "lucide-react";

const factors = [
  {
    icon: Thermometer,
    title: "Extreme Temperature Swings",
    detail: "From single digits in January to 90°F summers — materials must handle constant expansion and contraction without failing.",
  },
  {
    icon: Wind,
    title: "High-Altitude Wind Exposure",
    detail: "Ridge-top homes face sustained winds that test every fastener, flashing detail, and roof edge. Standard installations don't hold.",
  },
  {
    icon: Droplets,
    title: "Heavy Rainfall & Snow Loads",
    detail: "60+ inches of annual rainfall and significant snowfall demand proper drainage engineering, ice and water shield, and load-rated framing.",
  },
  {
    icon: Mountain,
    title: "Steep Terrain & Access",
    detail: "Mountain lots with steep grades and limited access require crews who plan logistics as carefully as they plan the build itself.",
  },
  {
    icon: TreePine,
    title: "Regional Architectural Character",
    detail: "Mountain homes aren't suburban homes. Material choices, color palettes, and design details must respect the landscape and local aesthetic.",
  },
  {
    icon: MapPin,
    title: "Local Code & Climate Knowledge",
    detail: "Every county has different permitting timelines, inspection requirements, and micro-climate realities. We know them because we work in them daily.",
  },
];

const BuiltForWNC = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left column — editorial intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            <span className="eyebrow mb-3 block">Local Expertise</span>
            <h2 className="section-heading mb-5">
              Built for<br /> Western North<br className="hidden lg:block" /> Carolina.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed font-body mb-4">
              Roofing and construction in the mountains isn't the same as roofing in the
              Piedmont or the coast. Elevation changes everything — the weather, the materials,
              the engineering, the logistics.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-body">
              Highlander was founded here. Our crews live and work in these conditions year-round.
              That means every recommendation we make and every system we install is based on what
              actually performs at 2,000–5,000 feet — not what a manufacturer's brochure says
              should work in a generic climate zone.
            </p>

            {/* Elevation callout */}
            <div className="mt-8 p-4 rounded-sm border border-border bg-card">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-heading font-bold text-[hsl(var(--highland-gold))]">2,000–5,000 ft</span>
              </div>
              <p className="text-muted-foreground text-xs font-body">
                Elevation range of our service area — from Franklin's valley floor to Cashiers' ridgelines.
              </p>
            </div>
          </motion.div>

          {/* Right column — factor cards */}
          <div className="lg:col-span-3 space-y-4">
            {factors.map((factor, i) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="group flex gap-4 p-5 md:p-6 rounded-sm bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors duration-300">
                  <factor.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
                    {factor.title}
                  </h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
                    {factor.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForWNC;
