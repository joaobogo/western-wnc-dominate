import { motion } from "framer-motion";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface HeadingRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Cinematic heading reveal — text rises from clipped overflow */
const HeadingReveal = ({ children, className = "", delay = 0 }: HeadingRevealProps) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: HIGHLAND_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default HeadingReveal;
