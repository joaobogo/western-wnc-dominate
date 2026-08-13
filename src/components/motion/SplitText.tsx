import { motion } from "framer-motion";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  /** Split by "word" or "char" */
  mode?: "word" | "char";
  stagger?: number;
}

/**
 * Cinematic split-text reveal — each word/char rises from below.
 * Best used sparingly on hero headlines or key section titles.
 */
const SplitText = ({
  children,
  className = "",
  delay = 0,
  mode = "word",
  stagger = 0.04,
}: SplitTextProps) => {
  const units = mode === "word" ? children.split(" ") : children.split("");

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {units.map((unit, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.4, ease: HIGHLAND_EASE },
              },
            }}
          >
            {unit}
            {mode === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default SplitText;
