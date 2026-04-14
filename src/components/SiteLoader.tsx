import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CRAFT_EASE = [0.25, 0.1, 0.25, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DRAMATIC_EASE = [0.16, 1, 0.3, 1] as any;

/* ─── SVG PATHS ─── */

// Topographic contour lines — WNC mountain ridges
const contourPaths = [
  "M0,160 Q80,140 160,150 Q280,165 380,130 Q480,95 580,115 Q680,135 780,100 Q880,65 980,90 Q1080,115 1180,80 Q1280,50 1380,70 Q1440,80 1500,75",
  "M0,180 Q120,155 220,170 Q340,188 440,148 Q540,108 640,132 Q740,156 840,118 Q940,80 1040,108 Q1140,136 1240,98 Q1340,66 1440,88",
  "M0,200 Q100,185 200,195 Q320,210 440,170 Q560,130 660,155 Q760,180 860,140 Q960,100 1060,128 Q1160,156 1260,118 Q1380,82 1500,105",
];

// Blueprint grid marks
const gridMarks = [
  { x: 200, y: 40, w: 8 }, { x: 400, y: 60, w: 6 }, { x: 600, y: 35, w: 10 },
  { x: 800, y: 50, w: 7 }, { x: 1000, y: 45, w: 9 }, { x: 1200, y: 55, w: 6 },
];

// Elevation marks
const elevationTicks = [180, 360, 540, 720, 900, 1080, 1260];

// Roofline — assembles a complete home silhouette
const roofStructure = [
  // Foundation line
  "M340,220 L1160,220",
  // Left wall
  "M400,220 L400,140",
  // Main gable
  "M400,140 L600,60 L800,140",
  // Right extension
  "M800,140 L950,90 L1100,140",
  // Right wall
  "M1100,140 L1100,220",
  // Chimney
  "M680,80 L680,45 L720,45 L720,72",
];

// Tartan lattice — brief structural pattern
const tartanLines = {
  h: [80, 130, 180, 230],
  v: [450, 600, 750, 900, 1050],
};

interface SiteLoaderProps {
  onComplete: () => void;
}

const SiteLoader = ({ onComplete }: SiteLoaderProps) => {
  const [visible, setVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [phase, setPhase] = useState(0); // 0=waiting, 1=vision, 2=build, 3=brand, 4=exit
  const isMobile = useIsMobile();

  const prefersReduced = typeof window !== "undefined"
    && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Desktop: 4.8s, Mobile: 3s
  const totalDuration = prefersReduced ? 800 : isMobile ? 3000 : 4800;

  const dismiss = useCallback(() => {
    if (phase < 4) {
      setPhase(4);
      setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 500);
      }, 400);
    }
  }, [phase, onComplete]);

  const handleSkip = useCallback(() => {
    if (!canSkip) return;
    dismiss();
  }, [canSkip, dismiss]);

  useEffect(() => {
    if (prefersReduced) {
      setPhase(3);
      const t = setTimeout(() => dismiss(), 800);
      return () => clearTimeout(t);
    }

    // Phase timeline
    const t1 = setTimeout(() => setPhase(1), 100); // Vision starts
    const t2 = setTimeout(() => setPhase(2), isMobile ? 900 : 1400); // Build starts
    const t3 = setTimeout(() => setPhase(3), isMobile ? 1700 : 2800); // Brand arrives
    const t4 = setTimeout(() => setCanSkip(true), 800);
    const t5 = setTimeout(() => dismiss(), totalDuration);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [totalDuration, dismiss, isMobile, prefersReduced]);

  useEffect(() => {
    const handler = () => handleSkip();
    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    return () => { window.removeEventListener("click", handler); window.removeEventListener("keydown", handler); };
  }, [handleSkip]);

  if (prefersReduced) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ background: "hsl(var(--hero-overlay))" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <h2 className="font-heading text-xl tracking-[0.15em] uppercase" style={{ color: "hsl(var(--primary-foreground) / 0.8)" }}>
                Highlander
              </h2>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase mt-2" style={{ color: "hsl(var(--highland-gold) / 0.6)" }}>
                Roofing & Construction
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
          style={{ background: "hsl(var(--hero-overlay))" }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: DRAMATIC_EASE }}
        >
          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.018] pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* ════ ACT 1: VISION & PLANNING ════ */}
          <svg
            viewBox="0 0 1500 300"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Contour lines — topographic WNC ridgelines */}
            {phase >= 1 && contourPaths.map((d, i) => (
              <motion.path
                key={`contour-${i}`}
                d={d}
                fill="none"
                stroke="hsl(var(--highland-gold))"
                strokeOpacity={0.06 + i * 0.02}
                strokeWidth={0.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: isMobile ? 0.6 : 1, delay: i * 0.15, ease: CRAFT_EASE },
                  opacity: { duration: 0.3, delay: i * 0.1 },
                }}
              />
            ))}

            {/* Blueprint grid marks */}
            {phase >= 1 && !isMobile && gridMarks.map((mark, i) => (
              <motion.g key={`grid-${i}`}>
                <motion.line
                  x1={mark.x} y1={mark.y} x2={mark.x + mark.w} y2={mark.y}
                  stroke="hsl(var(--primary-foreground))"
                  strokeOpacity={0.08}
                  strokeWidth={0.4}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08, ease: CRAFT_EASE }}
                />
                <motion.line
                  x1={mark.x + mark.w / 2} y1={mark.y - 3} x2={mark.x + mark.w / 2} y2={mark.y + 3}
                  stroke="hsl(var(--primary-foreground))"
                  strokeOpacity={0.06}
                  strokeWidth={0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.5 + i * 0.08 }}
                />
              </motion.g>
            ))}

            {/* Elevation tick marks */}
            {phase >= 1 && !isMobile && elevationTicks.map((x, i) => (
              <motion.line
                key={`elev-${i}`}
                x1={x} y1={260} x2={x} y2={270}
                stroke="hsl(var(--primary-foreground))"
                strokeOpacity={0.05}
                strokeWidth={0.4}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.06, duration: 0.15 }}
              />
            ))}

            {/* ════ ACT 2: BUILDING & CRAFTSMANSHIP ════ */}
            {/* Structural roof assembly */}
            {phase >= 2 && roofStructure.map((d, i) => (
              <motion.path
                key={`roof-${i}`}
                d={d}
                fill="none"
                stroke="hsl(var(--primary-foreground))"
                strokeOpacity={i === 0 ? 0.12 : 0.25}
                strokeWidth={i === 0 ? 0.8 : 1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: isMobile ? 0.35 : 0.55,
                  delay: i * (isMobile ? 0.08 : 0.12),
                  ease: HIGHLAND_EASE,
                }}
              />
            ))}

            {/* Material texture — subtle cross-hatch inside the roof */}
            {phase >= 2 && !isMobile && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={`hatch-${i}`}
                    x1={500 + i * 60}
                    y1={100 + i * 8}
                    x2={540 + i * 60}
                    y2={115 + i * 8}
                    stroke="hsl(var(--highland-gold))"
                    strokeOpacity={0.06}
                    strokeWidth={0.3}
                  />
                ))}
              </motion.g>
            )}

            {/* ════ TARTAN BEAT ════ */}
            {/* Brief tartan lattice — appears for one beat then fades */}
            {phase >= 2 && !isMobile && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.12, 0.12, 0] }}
                transition={{
                  duration: 1.2,
                  delay: isMobile ? 0.4 : 0.7,
                  times: [0, 0.2, 0.7, 1],
                  ease: "easeInOut",
                }}
              >
                {tartanLines.h.map((y, i) => (
                  <line key={`th-${i}`} x1={400} y1={y} x2={1100} y2={y}
                    stroke="hsl(var(--tartan-accent))" strokeWidth={0.4} />
                ))}
                {tartanLines.v.map((x, i) => (
                  <line key={`tv-${i}`} x1={x} y1={60} x2={x} y2={240}
                    stroke="hsl(var(--heritage-green))" strokeWidth={0.4} />
                ))}
              </motion.g>
            )}

            {/* Mobile: simplified single roofline */}
            {phase >= 2 && isMobile && (
              <motion.path
                d="M400,200 L750,80 L1100,200"
                fill="none"
                stroke="hsl(var(--primary-foreground))"
                strokeOpacity={0.3}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: HIGHLAND_EASE }}
              />
            )}
          </svg>

          {/* ════ ACT 3: TRUST & ARRIVAL ════ */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Horizontal gold line — extends before brand text */}
            <motion.div
              className="h-px mb-8"
              style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }}
              initial={{ width: 0, opacity: 0 }}
              animate={phase >= 3 ? { width: isMobile ? 120 : 200, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: CRAFT_EASE }}
            />

            {/* Brand wordmark */}
            <div className="text-center overflow-hidden">
              <motion.h2
                className="font-heading text-2xl md:text-3xl lg:text-4xl tracking-[0.12em] uppercase"
                style={{ color: "hsl(var(--primary-foreground) / 0.9)" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={phase >= 3 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: DRAMATIC_EASE }}
              >
                Highlander
              </motion.h2>
            </div>

            {/* Subtitle */}
            <motion.p
              className="font-body text-[10px] md:text-xs tracking-[0.25em] uppercase mt-3"
              style={{ color: "hsl(var(--highland-gold) / 0.6)" }}
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={phase >= 3 ? { opacity: 1, letterSpacing: "0.25em" } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: CRAFT_EASE }}
            >
              Roofing & Construction
            </motion.p>

            {/* Lower accent — small diamond */}
            <motion.div
              className="mt-6 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.15)]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[hsl(var(--highland-gold)/0.3)]" />
              <div className="w-8 h-px bg-[hsl(var(--highland-gold)/0.15)]" />
            </motion.div>
          </div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-6 left-0 right-0 text-center font-body text-[9px] tracking-[0.15em] uppercase"
            style={{ color: "hsl(var(--primary-foreground) / 0.1)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {isMobile ? "Tap to skip" : "Click or press any key"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
