import { motion } from "framer-motion";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import GoldLine from "@/components/motion/GoldLine";
import { Shield, Award, Clock, Star, MapPin, CheckCircle2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const stats = [
  { value: "500+", label: "Projects Completed", detail: "Across Western NC" },
  { value: "40+", label: "Years Combined Exp.", detail: "Roofing & Construction" },
  { value: "8", label: "Counties Served", detail: "Macon · Jackson · Swain" },
  { value: "4.7★", label: "Google Rating", detail: "122+ Verified Reviews" },
];

const certifications = [
  { icon: Shield, label: "Licensed & Fully Insured" },
  { icon: Award, label: "CertainTeed Master Applicator" },
  { icon: CheckCircle2, label: "Licensed General Contractor" },
  { icon: Clock, label: "24-Hour Storm Response" },
  { icon: MapPin, label: "Locally Owned Since 2017" },
  { icon: Star, label: "Top-Rated on Google" },
];

const TrustStrip = () => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Tartan background texture */}
      <div className="absolute inset-0 tartan-dark opacity-60" />

      {/* Top gold line */}
      <GoldLine width="100%" centered delay={0.2} duration={1.2} className="absolute top-0 left-0 right-0 z-10" />

      <div className="relative z-10">
        {/* === ROW 1: Stats Bar === */}
        <div className="container-tight px-6 md:px-10 pt-10 md:pt-14 pb-8 md:pb-10">
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
                  className="text-2xl md:text-[2.75rem] font-heading font-bold text-[hsl(var(--highland-gold))] leading-none mb-1.5 md:mb-2 tracking-tight"
                  duration={1800}
                />
                <span className="text-sm font-heading font-bold text-primary-foreground/80 mb-1 tracking-tight">
                  {stat.label}
                </span>
                <span className="text-[10px] text-primary-foreground/30 font-body tracking-[0.15em] uppercase">
                  {stat.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* === DIVIDER: thin gold rule === */}
        <div className="container-tight px-6 md:px-10">
          <motion.div
            className="h-px w-full mx-auto"
            style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.2), hsl(var(--highland-gold) / 0))' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: HIGHLAND_EASE }}
          />
        </div>

        {/* === ROW 2: Certifications & Trust Markers === */}
        <div className="container-tight px-6 md:px-10 pt-8 md:pt-10 pb-10 md:pb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-[0.25em] text-primary-foreground/25 mb-6 md:mb-8"
          >
            Credentials That Back Every Project
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.45, ease: HIGHLAND_EASE }}
                className="group flex flex-col items-center text-center gap-2.5 py-4 px-3 border border-primary-foreground/[0.04] hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors duration-300"
              >
                <div className="w-9 h-9 rounded-none border border-primary-foreground/[0.08] flex items-center justify-center group-hover:border-[hsl(var(--highland-gold)/0.2)] transition-colors duration-300">
                  <cert.icon className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)] group-hover:text-[hsl(var(--highland-gold)/0.8)] transition-colors duration-300" />
                </div>
                <span className="text-[11px] md:text-xs font-body font-medium text-primary-foreground/50 leading-tight">
                  {cert.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <GoldLine width="100%" centered delay={0.4} duration={1.2} className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
};

export default TrustStrip;
