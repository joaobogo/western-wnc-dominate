import { motion } from "framer-motion";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import GoldLine from "@/components/motion/GoldLine";
import { Shield, Award, Clock, Star, MapPin, CheckCircle2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const stats = [
  { value: "4.9★", label: "Google Rating", detail: "Across 8 WNC Counties" },
  { value: "40+", label: "Years Combined", detail: "Roofing & Construction" },
  { value: "4.9★", label: "Google Rating", detail: "150+ Verified Reviews" },
];

const credentials = [
  { icon: Award, label: "CertainTeed Master Shingle Applicator", emphasis: true },
  { icon: Shield, label: "Licensed General Contractor", emphasis: true },
  { icon: Star, label: "Brava Preferred Installer", emphasis: true },
  { icon: Clock, label: "Rapid Storm Response" },
  { icon: MapPin, label: "Locally Owned · Franklin & Sylva" },
  { icon: CheckCircle2, label: "Fully Licensed & Insured" },
];

const TrustStrip = () => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 tartan-dark opacity-50" />

      {/* Top gold line */}
      <GoldLine width="100%" centered delay={0.2} duration={1.2} className="absolute top-0 left-0 right-0 z-10" />

      <div className="relative z-10">
        {/* Editorial layout — stats + credentials side by side */}
        <div className="container-tight px-6 md:px-10 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center">

            {/* Left: Stats — large, editorial typography */}
            <div className="lg:col-span-5 lg:border-r lg:border-primary-foreground/[0.06] lg:pr-12">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[12px] md:text-[13px] font-body font-bold uppercase tracking-[0.3em] text-primary-foreground/50 mb-4"
              >
                By the Numbers
              </motion.p>

              <div className="space-y-3">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: HIGHLAND_EASE }}
                    className="flex items-baseline gap-4"
                  >
                    <AnimatedCounter
                      value={stat.value}
                      className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--highland-gold))] leading-none tracking-tight stat-glow min-w-[80px]"
                      duration={1800}
                    />
                    <div>
                      <span className="block text-base font-heading font-bold text-primary-foreground/85 tracking-tight">
                        {stat.label}
                      </span>
                      <span className="block text-[13px] md:text-[14px] text-primary-foreground/50 font-body tracking-wide font-medium">
                        {stat.detail}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Credentials — clean grid */}
            <div className="lg:col-span-7 lg:pl-12">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[12px] md:text-[13px] font-body font-bold uppercase tracking-[0.3em] text-primary-foreground/50 mb-4"
              >
                Credentials
              </motion.p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                {credentials.map((cred, i) => (
                  <motion.div
                    key={cred.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: HIGHLAND_EASE }}
                    className="flex items-start gap-2.5"
                  >
                    <cred.icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                      cred.emphasis
                        ? "text-[hsl(var(--highland-gold)/0.7)]"
                        : "text-[hsl(var(--highland-gold)/0.35)]"
                    }`} />
                    <span className={`text-[14px] md:text-[15px] font-body leading-snug font-medium ${
                      cred.emphasis
                        ? "font-bold text-white"
                        : "text-primary-foreground/75"
                    }`}>
                      {cred.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Editorial quote */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, ease: HIGHLAND_EASE }}
                className="mt-6 pt-4 border-t border-primary-foreground/[0.05]"
              >
                <p className="text-primary-foreground/45 text-[14px] md:text-[15px] font-body italic leading-relaxed max-w-md">
                  "The only company in Western NC that holds both a CertainTeed Master Applicator
                  certification and a General Contractor license under the same roof."
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <GoldLine width="100%" centered delay={0.4} duration={1.2} className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
};

export default TrustStrip;
