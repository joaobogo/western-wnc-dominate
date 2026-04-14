import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  /** Direction the curtain reveals from */
  direction?: "bottom" | "left" | "right";
  /** Enable subtle parallax on scroll */
  parallax?: boolean;
  /** Delay before reveal starts */
  delay?: number;
  loading?: "lazy" | "eager";
}

/**
 * Premium image reveal — curtain wipe with optional parallax.
 * Wrap in an overflow-hidden container for clean edges.
 */
const ImageReveal = ({
  src,
  alt,
  className = "",
  direction = "bottom",
  parallax = true,
  delay = 0,
  loading = "lazy",
}: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", parallax ? "8%" : "0%"]);

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    bottom: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
    left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
    right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
  };

  const clip = clipPaths[direction];

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: clip.hidden }}
        whileInView={{ clipPath: clip.visible }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, delay, ease: HIGHLAND_EASE }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          className="w-full h-full object-cover"
          style={{ y }}
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: delay + 0.1, ease: HIGHLAND_EASE }}
        />
      </motion.div>
    </div>
  );
};

export default ImageReveal;
