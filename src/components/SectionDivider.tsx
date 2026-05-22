import { motion } from "framer-motion";

type DividerVariant = "gold-fade" | "mountain-ridge" | "angled" | "dot-line" | "wave" | "diamond" | "heritage-bar" | "tartan-trim";

interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  className?: string;
  dark?: boolean;
}

const SectionDivider = ({ variant = "gold-fade", flip = false, className = "", dark = false }: SectionDividerProps) => {
  if (variant === "gold-fade") {
    return (
      <div className={`relative h-px w-full ${className}`}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    );
  }

  if (variant === "mountain-ridge") {
    return (
      <div className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`} style={{ height: "48px" }}>
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            d="M0,48 L0,30 Q120,12 240,24 Q360,36 480,18 Q600,0 720,14 Q840,28 960,10 Q1080,0 1200,22 Q1320,36 1440,26 L1440,48 Z"
            fill="currentColor"
            className={dark ? "text-[hsl(var(--dark-section))]" : "text-background"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M0,30 Q120,12 240,24 Q360,36 480,18 Q600,0 720,14 Q840,28 960,10 Q1080,0 1200,22 Q1320,36 1440,26"
            fill="none"
            stroke="hsl(var(--highland-gold))"
            strokeWidth="0.7"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeOut" }}
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
      <div className={`flex items-center justify-center gap-3 py-8 ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border max-w-[80px]" />
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`rounded-full ${i === 2 ? "w-2.5 h-2.5 bg-[hsl(var(--highland-gold)/0.5)]" : "w-1 h-1 bg-border"}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
          />
        ))}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border max-w-[80px]" />
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
      <div className={`flex items-center justify-center py-14 ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[hsl(var(--highland-gold)/0.12)] max-w-[160px]" />
        <motion.div
          className="relative mx-6"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        >
          {/* Outer ring */}
          <div className="w-4 h-4 rotate-45 border border-[hsl(var(--highland-gold)/0.25)]" />
          {/* Inner fill */}
          <div className="absolute inset-[3px] rotate-45 bg-[hsl(var(--highland-gold)/0.06)]" />
        </motion.div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[hsl(var(--highland-gold)/0.12)] max-w-[160px]" />
      </div>
    );
  }

  if (variant === "heritage-bar") {
    return (
      <div className={`flex items-center justify-center py-14 ${className}`}>
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.2)]" />
          <div className="w-1 h-1 rotate-45 bg-[hsl(var(--highland-gold)/0.35)]" />
          <div className="w-28 h-px bg-gradient-to-r from-[hsl(var(--highland-gold)/0.35)] to-[hsl(var(--highland-gold)/0.1)]" />
          <div className="w-1 h-1 rotate-45 bg-[hsl(var(--highland-gold)/0.35)]" />
          <div className="w-10 h-px bg-[hsl(var(--highland-gold)/0.2)]" />
        </motion.div>
      </div>
    );
  }

  if (variant === "tartan-trim") {
    return (
      <div className={`h-[4px] w-full relative overflow-hidden ${className}`}>
        <div 
          className="absolute inset-0 opacity-[0.35]" 
          style={{ 
            backgroundImage: "url('/tartan.png')",
            backgroundSize: "100px auto",
            backgroundRepeat: "repeat"
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>
    );
  }

  return null;
};

export default SectionDivider;
