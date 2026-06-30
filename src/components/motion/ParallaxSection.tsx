import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Parallax intensity — higher = more movement. Default 30 */
  speed?: number;
  /** Direction: "up" content rises, "down" content sinks */
  direction?: "up" | "down";
}

/**
 * Wraps section content with smooth parallax translation on scroll.
 * Use sparingly — 2-3 sections max for premium feel without motion fatigue.
 */
const ParallaxSection = ({
  children,
  className = "",
  speed = 30,
  direction = "up",
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = direction === "up" ? [speed, -speed] : [-speed, speed];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
