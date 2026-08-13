import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/**
 * Signature brand motion element — diagonal roofline sweep.
 * Used in heroes, dividers, page transitions, hover details, and CTA entrances.
 */

type MotifVariant = "roofline-sweep" | "contour-wave" | "structural-reveal" | "gold-accent";

interface BrandMotifProps {
  variant?: MotifVariant;
  className?: string;
  delay?: number;
}

export const BrandMotif = ({ variant = "roofline-sweep", className = "", delay = 0 }: BrandMotifProps) => {
  if (variant === "roofline-sweep") {
    return (
      <div className={`relative overflow-hidden h-8 w-full ${className}`}>
        <motion.svg
          viewBox="0 0 1440 32"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.3 }}
        >
          <motion.path
            d="M0,28 L360,28 L540,8 L720,28 L1440,28"
            fill="none"
            stroke="hsl(var(--highland-gold))"
            strokeOpacity={0.2}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.1, duration: 0.4, ease: HIGHLAND_EASE }}
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === "contour-wave") {
    return (
      <div className={`relative overflow-hidden h-6 w-full ${className}`}>
        <motion.svg
          viewBox="0 0 1440 24"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,16 Q180,4 360,14 Q540,24 720,10 Q900,0 1080,12 Q1260,22 1440,8"
            fill="none"
            stroke="hsl(var(--highland-gold))"
            strokeOpacity={0.12}
            strokeWidth={0.6}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4, ease: HIGHLAND_EASE }}
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === "structural-reveal") {
    return (
      <motion.div
        className={`h-px w-full ${className}`}
        style={{
          background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.3), hsl(var(--highland-gold) / 0))",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4, ease: HIGHLAND_EASE }}
      />
    );
  }

  if (variant === "gold-accent") {
    return (
      <motion.div
        className={`flex items-center gap-2 ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
      >
        <motion.div
          className="h-px bg-[hsl(var(--highland-gold)/0.3)]"
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1, duration: 0.4, ease: HIGHLAND_EASE }}
        />
        <div className="w-1 h-1 rotate-45 bg-[hsl(var(--highland-gold)/0.4)]" />
      </motion.div>
    );
  }

  return null;
};

export default BrandMotif;
