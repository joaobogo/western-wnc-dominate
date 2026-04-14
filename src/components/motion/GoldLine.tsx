import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CRAFT_EASE = [0.25, 0.1, 0.25, 1] as any;

interface GoldLineProps {
  className?: string;
  width?: string;
  centered?: boolean;
  delay?: number;
  duration?: number;
}

/** Signature animated gold accent line — draws in on scroll */
const GoldLine = ({
  className = "",
  width = "3rem",
  centered = false,
  delay = 0,
  duration = 1,
}: GoldLineProps) => {
  return (
    <motion.div
      className={`h-px ${className}`}
      style={{
        background: centered
          ? "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))"
          : "linear-gradient(90deg, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))",
        ...(centered ? { margin: "0 auto" } : {}),
      }}
      initial={{ width: 0 }}
      whileInView={{ width }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: CRAFT_EASE }}
    />
  );
};

export default GoldLine;
