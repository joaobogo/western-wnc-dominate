import { motion } from "framer-motion";
import { Mountain, Thermometer, Wind, Droplets, TreePine, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const factors = [
  { icon: Thermometer, title: "Extreme Temperature Swings", detail: "Single digits in January to 90°F summers. Materials must handle constant expansion and contraction without failing." },
  { icon: Wind, title: "High-Altitude Wind Exposure", detail: "Ridge-top homes face sustained winds that test every fastener, flashing detail, and roof edge. Standard installations don't hold." },
  { icon: Droplets, title: "Heavy Rainfall & Snow Loads", detail: "60+ inches of annual rainfall and significant snowfall demand proper drainage engineering, ice and water shield, and load-rated framing." },
  { icon: Mountain, title: "Steep Terrain & Access", detail: "Mountain lots with steep grades and limited access require crews who plan logistics as carefully as they plan the build itself." },
  { icon: TreePine, title: "Regional Design Character", detail: "Mountain homes aren't suburban homes. Material choices, color palettes, and design details must respect the landscape and local aesthetic." },
  { icon: MapPin, title: "Local Code & Climate Knowledge", detail: "Focusing on 8 primary counties in Western NC, we know the permitting timelines, inspection requirements, and micro-climate realities of every mountain we serve." },
];

const BuiltForWNC = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight" id="mountain-built">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left column — editorial intro (sticky on desktop) */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">Mountain-Specific Standards</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="text-display font-heading font-bold mb-5 leading-[0.95] tracking-tightest">
                Built for the<br /> Western NC<br className="hidden lg:block" /> Mountains.
              </h2>
            </HeadingReveal>
            <GoldLine width="3rem" delay={0.3} className="mb-5" />
            <ScrollReveal variant="rise-subtle" delay={0.3}>
              <div>
                <p className="text-foreground text-body md:text-body-lg leading-relaxed font-bold mb-6">
                  Roofing and construction in the mountains isn't the same as roofing in the
                  Piedmont or the coast. Elevation changes everything — the weather, the materials,
                  the engineering, the logistics.
                </p>
                <p className="text-foreground/90 text-body-sm md:text-body leading-relaxed font-body font-bold">
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
                    className="text-2xl font-heading font-bold text-[hsl(var(--gold-ink))]"
                  />
                  <span className="text-lg font-heading text-[hsl(var(--gold-ink))]">–</span>
                  <AnimatedCounter
                    value="5,000"
                    className="text-2xl font-heading font-bold text-[hsl(var(--gold-ink))]"
                  />
                  <span className="text-lg font-heading font-bold text-[hsl(var(--gold-ink))]">ft</span>
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
              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                el.style.setProperty('--mouse-x', `${x}%`);
                el.style.setProperty('--mouse-y', `${y}%`);
              };

              return (
                <motion.div
                  key={factor.title}
                  onMouseMove={handleMouseMove}
                  initial={{ opacity: 0, x: 24, y: 8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: HIGHLAND_EASE }}
                  className="group flex gap-4 p-5 md:p-6 rounded-none bg-card border border-border hover:border-[hsl(var(--highland-gold)/0.15)] hover:shadow-[0_8px_28px_-8px_hsl(var(--heritage-charcoal)/0.05)] transition-all duration-500 spotlight-hover"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-none bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <factor.icon className="w-4.5 h-4.5 text-primary" />
                  </motion.div>
                  <div className="relative z-10">
                    <h3 className="text-body-sm md:text-body font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
                      {factor.title}
                    </h3>
                    <p className="text-muted-foreground text-body-sm md:text-body leading-relaxed font-body font-medium">
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
