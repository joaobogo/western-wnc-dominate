import { motion, useReducedMotion } from "framer-motion";

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
 * Premium image reveal — simple opacity fade. Avoids clipPath + scroll-linked
 * transforms that cause scroll jank on long pages. Hover-only zoom kept for craft.
 */
const ImageReveal = ({
  src,
  alt,
  className = "",
  // direction & parallax kept for API compatibility, no longer animated
  direction: _direction = "bottom",
  parallax: _parallax = true,
  delay = 0,
  loading = "lazy",
}: ImageRevealProps) => {
  const reduced = useReducedMotion();
  return (
    <div className={`overflow-hidden group ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, delay, ease: HIGHLAND_EASE }}
      />
    </div>
  );
};

export default ImageReveal;
