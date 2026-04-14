import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Ambient background motion system — subtle blueprint lines,
 * roof pitch diagonals, mountain contours, and tartan-inspired
 * structural patterns that react subtly on scroll.
 */

interface AmbientBackgroundProps {
  variant?: "blueprint" | "contour" | "roofline" | "tartan-grid";
  className?: string;
  intensity?: "subtle" | "medium";
}

export const AmbientBackground = ({
  variant = "blueprint",
  className = "",
  intensity = "subtle",
}: AmbientBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = intensity === "subtle" ? 0.03 : 0.06;
  const translateY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -10 : -30]);

  if (isMobile && variant !== "contour") return null;

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div className="absolute inset-0" style={{ y: translateY }}>
        {variant === "blueprint" && (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Vertical structural lines */}
            {[20, 40, 60, 80].map((pct) => (
              <line key={`v-${pct}`}
                x1={`${pct}%`} y1="0" x2={`${pct}%`} y2="100%"
                stroke="hsl(var(--primary-foreground))"
                strokeOpacity={opacity * 0.6}
                strokeWidth={0.3}
                strokeDasharray="4 20"
              />
            ))}
            {/* Horizontal construction lines */}
            {[25, 50, 75].map((pct) => (
              <line key={`h-${pct}`}
                x1="0" y1={`${pct}%`} x2="100%" y2={`${pct}%`}
                stroke="hsl(var(--highland-gold))"
                strokeOpacity={opacity * 0.4}
                strokeWidth={0.3}
                strokeDasharray="2 30"
              />
            ))}
          </svg>
        )}

        {variant === "contour" && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <path
              d="M0,300 Q180,260 360,280 Q540,300 720,250 Q900,200 1080,240 Q1260,280 1440,260"
              fill="none" stroke="hsl(var(--highland-gold))" strokeOpacity={opacity} strokeWidth={0.5}
            />
            <path
              d="M0,340 Q200,300 400,320 Q600,340 800,290 Q1000,240 1200,275 Q1400,310 1440,300"
              fill="none" stroke="hsl(var(--highland-gold))" strokeOpacity={opacity * 0.7} strokeWidth={0.4}
            />
          </svg>
        )}

        {variant === "roofline" && (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Diagonal roof pitch lines */}
            <line x1="0" y1="100%" x2="35%" y2="0"
              stroke="hsl(var(--primary-foreground))" strokeOpacity={opacity * 0.5} strokeWidth={0.3} />
            <line x1="65%" y1="0" x2="100%" y2="100%"
              stroke="hsl(var(--primary-foreground))" strokeOpacity={opacity * 0.5} strokeWidth={0.3} />
          </svg>
        )}

        {variant === "tartan-grid" && (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <line x1={`${20 + i * 30}%`} y1="0" x2={`${20 + i * 30}%`} y2="100%"
                  stroke="hsl(var(--heritage-green))" strokeOpacity={opacity * 0.8} strokeWidth={0.3} />
                <line x1="0" y1={`${25 + i * 25}%`} x2="100%" y2={`${25 + i * 25}%`}
                  stroke="hsl(var(--tartan-accent))" strokeOpacity={opacity * 0.5} strokeWidth={0.3} />
              </g>
            ))}
          </svg>
        )}
      </motion.div>
    </div>
  );
};

export default AmbientBackground;
