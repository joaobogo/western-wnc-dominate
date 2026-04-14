import { motion } from "framer-motion";

type DividerVariant = "gold-fade" | "mountain-ridge" | "angled" | "dot-line" | "wave" | "diamond";

interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  className?: string;
  dark?: boolean;
}

const SectionDivider = ({ variant = "gold-fade", flip = false, className = "", dark = false }: SectionDividerProps) => {
  const base = dark
    ? "text-dark-section-foreground"
    : "text-foreground";

  if (variant === "gold-fade") {
    return (
      <div className={`relative h-px w-full ${className}`}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    );
  }

  if (variant === "mountain-ridge") {
    return (
      <div className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`} style={{ height: "40px" }}>
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            d="M0,40 L0,25 Q120,10 240,20 Q360,30 480,15 Q600,0 720,12 Q840,24 960,8 Q1080,0 1200,18 Q1320,30 1440,22 L1440,40 Z"
            fill="currentColor"
            className={dark ? "text-[hsl(var(--dark-section))]" : "text-background"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M0,25 Q120,10 240,20 Q360,30 480,15 Q600,0 720,12 Q840,24 960,8 Q1080,0 1200,18 Q1320,30 1440,22"
            fill="none"
            stroke="hsl(var(--highland-gold))"
            strokeWidth="0.5"
            strokeOpacity="0.25"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "angled") {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ height: "48px" }}>
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <motion.polygon
            points={flip ? "0,0 1440,48 1440,0" : "0,48 1440,0 1440,48"}
            className={dark ? "fill-[hsl(var(--dark-section))]" : "fill-background"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "dot-line") {
    return (
      <div className={`flex items-center justify-center gap-2 py-6 ${className}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`rounded-full ${i === 2 ? "w-2 h-2 bg-[hsl(var(--highland-gold)/0.5)]" : "w-1 h-1 bg-border"}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`} style={{ height: "32px" }}>
        <svg
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            d="M0,32 L0,16 Q180,0 360,16 Q540,32 720,16 Q900,0 1080,16 Q1260,32 1440,16 L1440,32 Z"
            className={dark ? "fill-[hsl(var(--dark-section))]" : "fill-secondary"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border max-w-[120px]" />
        <motion.div
          className="w-3 h-3 rotate-45 border border-[hsl(var(--highland-gold)/0.4)] mx-4"
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 1, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border max-w-[120px]" />
      </div>
    );
  }

  return null;
};

export default SectionDivider;
