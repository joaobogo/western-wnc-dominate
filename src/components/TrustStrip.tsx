import { motion } from "framer-motion";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import GoldLine from "@/components/motion/GoldLine";

const stats = [
  { value: "500+", label: "Projects Completed", detail: "Across Western NC" },
  { value: "40+", label: "Years Combined Experience", detail: "Roofing & Construction" },
  { value: "8", label: "Counties Served", detail: "Macon · Jackson · Swain" },
  { value: "4.7★", label: "Google Rating", detail: "122+ Verified Reviews" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const TrustStrip = () => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground tartan-dark">
      {/* Top gold line — animated draw */}
      <GoldLine width="100%" centered delay={0.2} duration={1.2} className="absolute top-0 left-0 right-0 z-10" />

      <div className="container-tight px-6 md:px-10 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-primary-foreground/[0.06]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: HIGHLAND_EASE }}
              className="flex flex-col items-center text-center md:px-8 lg:px-10"
            >
              <AnimatedCounter
                value={stat.value}
                className="text-2xl md:text-[2.5rem] font-heading font-bold text-[hsl(var(--highland-gold))] leading-none mb-1.5 md:mb-2 tracking-tight"
                duration={1800}
              />
              <span className="text-sm font-heading font-bold text-primary-foreground/80 mb-1.5 tracking-tight">
                {stat.label}
              </span>
              <span className="text-[10px] text-primary-foreground/30 font-body tracking-[0.15em] uppercase">
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gold line — animated draw */}
      <GoldLine width="100%" centered delay={0.4} duration={1.2} className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
};

export default TrustStrip;
