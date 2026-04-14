import { motion } from "framer-motion";
import { Mountain, Thermometer, Wind, Droplets, TreePine, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const factors = [
  { icon: Thermometer, title: "Extreme Temperature Swings", detail: "From single digits in January to 90°F summers — materials must handle constant expansion and contraction without failing." },
  { icon: Wind, title: "High-Altitude Wind Exposure", detail: "Ridge-top homes face sustained winds that test every fastener, flashing detail, and roof edge. Standard installations don't hold." },
  { icon: Droplets, title: "Heavy Rainfall & Snow Loads", detail: "60+ inches of annual rainfall and significant snowfall demand proper drainage engineering, ice and water shield, and load-rated framing." },
  { icon: Mountain, title: "Steep Terrain & Access", detail: "Mountain lots with steep grades and limited access require crews who plan logistics as carefully as they plan the build itself." },
  { icon: TreePine, title: "Regional Architectural Character", detail: "Mountain homes aren't suburban homes. Material choices, color palettes, and design details must respect the landscape and local aesthetic." },
  { icon: MapPin, title: "Local Code & Climate Knowledge", detail: "Every county has different permitting timelines, inspection requirements, and micro-climate realities. We know them because we work in them daily." },
];

const BuiltForWNC = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left column — editorial intro (sticky on desktop) */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">Local Expertise</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading mb-5">
                Built for<br /> Western North<br className="hidden lg:block" /> Carolina.
              </h2>
            </HeadingReveal>
            <GoldLine width="3rem" delay={0.3} className="mb-5" />
            <ScrollReveal variant="rise-subtle" delay={0.3}>
              <div>
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
              </div>
            </ScrollReveal>

            {/* Elevation callout with animated counter */}
            <ScrollReveal variant="scale" delay={0.5}>
              <div className="mt-8 p-4 rounded-none border border-border bg-card">
                <div className="flex items-baseline gap-2 mb-1">
                  <AnimatedCounter
                    value="2,000"
                    className="text-2xl font-heading font-bold text-[hsl(var(--highland-gold))]"
                  />
                  <span className="text-lg font-heading text-[hsl(var(--highland-gold))]">–</span>
                  <AnimatedCounter
                    value="5,000"
                    className="text-2xl font-heading font-bold text-[hsl(var(--highland-gold))]"
                  />
                  <span className="text-lg font-heading font-bold text-[hsl(var(--highland-gold))]">ft</span>
                </div>
                <p className="text-muted-foreground text-xs font-body">
                  Elevation range of our service area — from Franklin's valley floor to Cashiers' ridgelines.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — factor cards */}
          <div className="lg:col-span-3 space-y-4">
            {factors.map((factor, i) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const handleMouseMove = (e: React.MouseEvent) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                cardRef.current.style.setProperty('--mouse-x', `${x}%`);
                cardRef.current.style.setProperty('--mouse-y', `${y}%`);
              };

              return (
                <motion.div
                  key={factor.title}
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  initial={{ opacity: 0, x: 24, y: 8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: HIGHLAND_EASE }}
                  className="group flex gap-4 p-5 md:p-6 rounded-none bg-card border border-border hover:border-[hsl(var(--highland-gold)/0.2)] hover:shadow-sm transition-all duration-300 spotlight-hover"
                >
                  <motion.div
                    className="w-10 h-10 rounded-none bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <factor.icon className="w-4.5 h-4.5 text-primary" />
                  </motion.div>
                  <div className="relative z-10">
                    <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
                      {factor.title}
                    </h3>
                    <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
                      {factor.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForWNC;
