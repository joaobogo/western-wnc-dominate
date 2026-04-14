import { motion, type Variants, type Transition } from "framer-motion";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

type RevealVariant = "rise" | "rise-subtle" | "scale" | "clip" | "slide-left" | "slide-right" | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof typeof motion;
  stagger?: number;
  once?: boolean;
  margin?: string;
}

const getVariants = (
  variant: RevealVariant,
  isMobile: boolean
): Variants => {
  const mobileScale = 0.6; // reduce distances on mobile

  switch (variant) {
    case "rise":
      return {
        hidden: { opacity: 0, y: isMobile ? 20 : 32 },
        visible: { opacity: 1, y: 0 },
      };
    case "rise-subtle":
      return {
        hidden: { opacity: 0, y: isMobile ? 10 : 16 },
        visible: { opacity: 1, y: 0 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
      };
    case "clip":
      return {
        hidden: { clipPath: "inset(0 0 100% 0)" },
        visible: { clipPath: "inset(0 0 0% 0)" },
      };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: isMobile ? -16 : -30 },
        visible: { opacity: 1, x: 0 },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: isMobile ? 16 : 30 },
        visible: { opacity: 1, x: 0 },
      };
    case "fade":
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
  }
};

export const ScrollReveal = ({
  children,
  variant = "rise",
  delay = 0,
  duration,
  className = "",
  stagger,
  once = true,
  margin = "-60px",
}: ScrollRevealProps) => {
  const isMobile = useIsMobile();
  const baseDuration = duration ?? (isMobile ? 0.35 : 0.6);

  const variants = getVariants(variant, isMobile);

  const transition: Transition = {
    duration: baseDuration,
    delay,
    ease: HIGHLAND_EASE,
    ...(stagger ? { staggerChildren: stagger } : {}),
  };

  // Check prefers-reduced-motion
  const prefersReduced = typeof window !== "undefined" 
    && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Container that staggers children using framer-motion variants */
interface StaggerContainerProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  once?: boolean;
  margin?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {},
};

export const StaggerContainer = ({
  children,
  stagger = 0.06,
  className = "",
  once = true,
  margin = "-50px",
}: StaggerContainerProps) => {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Individual stagger child — must be inside StaggerContainer */
interface StaggerItemProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
  duration?: number;
}

export const StaggerItem = ({
  children,
  variant = "rise",
  className = "",
  duration,
}: StaggerItemProps) => {
  const isMobile = useIsMobile();
  const baseDuration = duration ?? (isMobile ? 0.35 : 0.5);
  const variants = getVariants(variant, isMobile);

  return (
    <motion.div
      variants={{
        ...variants,
        visible: {
          ...variants.visible,
          transition: { duration: baseDuration, ease: HIGHLAND_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
