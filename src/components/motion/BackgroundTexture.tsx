import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/* ──────────────────────────────────────
   MOUNTAIN CONTOUR LINES
   Subtle animated mountain ridgeline SVG
   ────────────────────────────────────── */

interface MountainContoursProps {
  className?: string;
  variant?: "light" | "dark";
  opacity?: number;
}

export const MountainContours = ({
  className = "",
  variant = "light",
  opacity = 0.04,
}: MountainContoursProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -8 : -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -4 : -12]);

  const stroke = variant === "dark"
    ? `hsl(45 12% 92% / ${opacity})`
    : `hsl(160 35% 16% / ${opacity})`;

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Ridge line 1 — slower parallax */}
      <motion.svg
        style={{ y: y1 }}
        viewBox="0 0 1440 200"
        fill="none"
        className="absolute bottom-0 left-0 w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 180 Q120 80 240 130 Q360 180 480 100 Q600 20 720 90 Q840 160 960 70 Q1080 -20 1200 60 Q1320 140 1440 100 L1440 200 L0 200Z"
          stroke={stroke}
          strokeWidth="1"
          fill="none"
        />
      </motion.svg>

      {/* Ridge line 2 — faster parallax */}
      <motion.svg
        style={{ y: y2 }}
        viewBox="0 0 1440 200"
        fill="none"
        className="absolute bottom-8 left-0 w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 160 Q180 100 360 140 Q540 180 720 110 Q900 40 1080 80 Q1260 120 1440 70 L1440 200 L0 200Z"
          stroke={stroke}
          strokeWidth="0.5"
          fill="none"
        />
      </motion.svg>
    </div>
  );
};

/* ──────────────────────────────────────
   BLUEPRINT GRID
   Design-led drawing-style grid overlay
   ────────────────────────────────────── */

interface BlueprintGridProps {
  className?: string;
  variant?: "light" | "dark";
  opacity?: number;
  animated?: boolean;
}

export const BlueprintGrid = ({
  className = "",
  variant = "light",
  opacity = 0.03,
  animated = true,
}: BlueprintGridProps) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -10 : -30]);

  const color = variant === "dark"
    ? `hsl(45 12% 92% / ${opacity})`
    : `hsl(160 35% 16% / ${opacity})`;

  const accentColor = variant === "dark"
    ? `hsl(var(--highland-gold) / ${opacity * 1.2})`
    : `hsl(var(--highland-gold) / ${opacity * 0.8})`;

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        style={animated ? { y: bgY } : undefined}
        className="absolute inset-0"
      >
        {/* Primary fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 59px, ${color} 59px, ${color} 60px),
              repeating-linear-gradient(90deg, transparent, transparent 59px, ${color} 59px, ${color} 60px)
            `,
          }}
        />
        {/* Accent lines at larger intervals */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 179px, ${accentColor} 179px, ${accentColor} 181px),
              repeating-linear-gradient(90deg, transparent, transparent 179px, ${accentColor} 179px, ${accentColor} 181px)
            `,
          }}
        />
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────
   DESIGN LINES
   Diagonal construction lines that
   subtly animate on scroll
   ────────────────────────────────────── */

interface DesignLinesProps {
  className?: string;
  variant?: "light" | "dark";
  direction?: "left" | "right";
  opacity?: number;
}

export const DesignLines = ({
  className = "",
  variant = "light",
  direction = "right",
  opacity = 0.025,
}: DesignLinesProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "right"
      ? [isMobile ? -1 : -2, isMobile ? 1 : 2]
      : [isMobile ? 1 : 2, isMobile ? -1 : -2]
  );

  const color = variant === "dark"
    ? `hsl(45 12% 92% / ${opacity})`
    : `hsl(160 35% 16% / ${opacity})`;

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        style={{ rotate }}
        className="absolute -inset-20"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              ${direction === "right" ? "135deg" : "45deg"},
              transparent,
              transparent 80px,
              ${color} 80px,
              ${color} 81px
            )`,
          }}
        />
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────
   ROOFLINE PATTERN
   Subtle repeating roof peak shapes
   ────────────────────────────────────── */

interface RooflinePatternProps {
  className?: string;
  variant?: "light" | "dark";
  opacity?: number;
}

export const RooflinePattern = ({
  className = "",
  variant = "light",
  opacity = 0.03,
}: RooflinePatternProps) => {
  const stroke = variant === "dark"
    ? `hsl(45 12% 92% / ${opacity})`
    : `hsl(160 35% 16% / ${opacity})`;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 400 60"
        className="absolute top-0 left-0 w-full h-auto"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 1 }}
      >
        <pattern id="roofline" x="0" y="0" width="100" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M0 60 L50 10 L100 60"
            stroke={stroke}
            strokeWidth="1"
            fill="none"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#roofline)" />
      </svg>
    </div>
  );
};

/* ──────────────────────────────────────
   MATERIAL TEXTURE OVERLAY
   Subtle noise/grain for depth
   ────────────────────────────────────── */

interface TextureOverlayProps {
  className?: string;
  opacity?: number;
}

export const TextureOverlay = ({
  className = "",
  opacity = 0.015,
}: TextureOverlayProps) => (
  <div
    className={`absolute inset-0 pointer-events-none mix-blend-overlay ${className}`}
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "256px 256px",
    }}
  />
);
