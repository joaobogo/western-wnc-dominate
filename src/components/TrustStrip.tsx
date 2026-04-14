import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Projects Completed", detail: "Across Western NC" },
  { value: "40+", label: "Years Combined Experience", detail: "Roofing & Construction" },
  { value: "8", label: "Counties Served", detail: "Macon · Jackson · Swain" },
  { value: "4.7★", label: "Google Rating", detail: "122+ Verified Reviews" },
];

const TrustStrip = () => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground tartan-dark">
      {/* Top gold line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))' }} />

      <div className="container-tight px-5 md:px-8 py-8 md:py-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-primary-foreground/8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center text-center md:px-6 lg:px-8"
            >
              <span className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--highland-gold))] leading-none mb-1.5 tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-heading font-semibold text-primary-foreground/85 mb-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-primary-foreground/35 font-body tracking-wide">
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))' }} />
    </section>
  );
};

export default TrustStrip;
