import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

type CardAccent = "green" | "gold" | "none";

interface PremiumCardProps {
  /** Division accent color for left border & top line */
  accent?: CardAccent;
  /** Enable cursor-tracking spotlight glow */
  spotlight?: boolean;
  /** Enable tartan hover overlay */
  tartan?: boolean;
  /** Optional link — wraps entire card */
  href?: string;
  /** Children content */
  children: React.ReactNode;
  className?: string;
}

const accentStyles: Record<CardAccent, { top: string; left: string }> = {
  green: {
    top: "bg-gradient-to-r from-transparent via-[hsl(var(--heritage-green)/0.3)] to-transparent",
    left: "bg-[hsl(var(--heritage-green))]",
  },
  gold: {
    top: "bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.35)] to-transparent",
    left: "bg-[hsl(var(--highland-gold))]",
  },
  none: {
    top: "bg-gradient-to-r from-transparent via-border to-transparent",
    left: "bg-border",
  },
};

export const PremiumCard = ({
  accent = "none",
  spotlight = true,
  tartan = false,
  href,
  children,
  className,
}: PremiumCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const styles = accentStyles[accent];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !spotlight) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    cardRef.current.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const cardClasses = cn(
    "group relative bg-card border border-border rounded-none overflow-hidden",
    "card-lift",
    spotlight && "spotlight-hover",
    tartan && "tartan-hover",
    className,
  );

  const inner = (
    <div ref={cardRef} onMouseMove={handleMouseMove} className={cardClasses}>
      {/* Top accent line */}
      {accent !== "none" && <div className={cn("h-[2px] w-full", styles.top)} />}

      {/* Left accent on hover */}
      {accent !== "none" && (
        <div className={cn("absolute left-0 top-0 w-[2px] h-0 group-hover:h-full transition-all duration-500", styles.left)} />
      )}

      {children}
    </div>
  );

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
      >
        <Link to={href} className="block h-full">
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
    >
      {inner}
    </motion.div>
  );
};
