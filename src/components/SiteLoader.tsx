import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const SMOOTH = [0.25, 0.1, 0.25, 1] as const;
const PREMIUM = [0.22, 1, 0.36, 1] as const;

interface SiteLoaderProps {
  onComplete: () => void;
}

const SiteLoader = ({ onComplete }: SiteLoaderProps) => {
  const [visible, setVisible] = useState(true);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 700);
  }, [onComplete]);

  // Safety timeout — never trap user
  useEffect(() => {
    const safety = setTimeout(dismiss, 4000);
    return () => clearTimeout(safety);
  }, [dismiss]);

  // Main sequence timer
  useEffect(() => {
    const duration = prefersReduced ? 800 : 2200;
    const t = setTimeout(dismiss, duration);
    return () => clearTimeout(t);
  }, [dismiss, prefersReduced]);

  // Skip on click/key after 600ms
  useEffect(() => {
    let canSkip = false;
    const enable = setTimeout(() => { canSkip = true; }, 600);
    const handler = () => { if (canSkip) dismiss(); };
    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    return () => {
      clearTimeout(enable);
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [dismiss]);

  // Lock scroll while visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  // Reduced motion: simple brand hold
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
              <h2 className="font-heading text-xl tracking-[0.15em] uppercase" style={{ color: "hsl(var(--primary-foreground) / 0.85)" }}>
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

  // ─── SVG House Assembly Paths ───
  // All drawn in a 200x160 viewBox for clean scaling
  const foundation = "M30,130 L170,130";
  const leftWall = "M50,130 L50,70";
  const rightWall = "M150,130 L150,70";
  const roofLeft = "M40,72 L100,28";
  const roofRight = "M100,28 L160,72";
  const chimney = "M125,55 L125,22 L140,22 L140,48";
  const door = "M88,130 L88,100 L112,100 L112,130";
  const windowLeft = "M60,85 L60,98 L76,98 L76,85 Z";
  const windowRight = "M124,85 L124,98 L140,98 L140,85 Z";
  // Accent: ridge cap line
  const ridgeCap = "M95,30 L105,30";
  // Accent: ground line extension
  const groundLine = "M15,130 L185,130";

  const strokeColor = "hsl(var(--primary-foreground))";
  const goldColor = "hsl(var(--highland-gold))";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = SMOOTH as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = PREMIUM as any;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "hsl(var(--hero-overlay))" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: p }}
        >
          {/* Subtle radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, hsl(var(--hero-overlay) / 0.6) 100%)",
            }}
          />

          {/* ═══ HOUSE ASSEMBLY SVG ═══ */}
          <motion.svg
            viewBox="0 0 200 160"
            className="w-[140px] h-[112px] md:w-[180px] md:h-[144px]"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Phase 1: Ground/Foundation (0–0.3s) */}
            <motion.path
              d={groundLine}
              stroke={goldColor}
              strokeOpacity={0.2}
              strokeWidth={0.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: s }}
            />
            <motion.path
              d={foundation}
              stroke={strokeColor}
              strokeOpacity={0.6}
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.05, ease: s }}
            />

            {/* Phase 2: Walls rise (0.3–0.7s) */}
            <motion.path
              d={leftWall}
              stroke={strokeColor}
              strokeOpacity={0.5}
              strokeWidth={1.2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.3, ease: p }}
            />
            <motion.path
              d={rightWall}
              stroke={strokeColor}
              strokeOpacity={0.5}
              strokeWidth={1.2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.38, ease: p }}
            />

            {/* Phase 3: Roof draws (0.6–1.0s) */}
            <motion.path
              d={roofLeft}
              stroke={strokeColor}
              strokeOpacity={0.7}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.6, ease: p }}
            />
            <motion.path
              d={roofRight}
              stroke={strokeColor}
              strokeOpacity={0.7}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.7, ease: p }}
            />
            <motion.path
              d={ridgeCap}
              stroke={goldColor}
              strokeOpacity={0.5}
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, delay: 0.95, ease: s }}
            />

            {/* Phase 4: Details — chimney, door, windows (1.0–1.3s) */}
            <motion.path
              d={chimney}
              stroke={strokeColor}
              strokeOpacity={0.35}
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, delay: 1.0, ease: s }}
            />
            <motion.path
              d={door}
              stroke={strokeColor}
              strokeOpacity={0.25}
              strokeWidth={0.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, delay: 1.05, ease: s }}
            />
            <motion.path
              d={windowLeft}
              stroke={strokeColor}
              strokeOpacity={0.2}
              strokeWidth={0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, delay: 1.1, ease: s }}
            />
            <motion.path
              d={windowRight}
              stroke={strokeColor}
              strokeOpacity={0.2}
              strokeWidth={0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, delay: 1.15, ease: s }}
            />

            {/* Phase 5: Completion glow sweep (1.3–1.5s) */}
            <motion.path
              d={`M40,72 L100,28 L160,72`}
              stroke={goldColor}
              strokeOpacity={0}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ strokeOpacity: 0 }}
              animate={{ strokeOpacity: [0, 0.35, 0] }}
              transition={{ duration: 0.6, delay: 1.3, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* ═══ BRAND LOCKUP ═══ */}
          <div className="relative z-10 flex flex-col items-center mt-6 md:mt-8">
            {/* Gold accent line */}
            <motion.div
              className="h-px mb-4"
              style={{ background: `linear-gradient(90deg, transparent, ${goldColor}, transparent)` }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 0.4 }}
              transition={{ duration: 0.4, delay: 1.4, ease: s }}
            />

            {/* HIGHLANDER */}
            <motion.h2
              className="font-heading text-xl md:text-2xl tracking-[0.18em] uppercase leading-none"
              style={{ color: "hsl(var(--primary-foreground) / 0.9)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.45, ease: p }}
            >
              Highlander
            </motion.h2>

            {/* ROOFING & CONSTRUCTION */}
            <motion.p
              className="font-body text-[9px] md:text-[10px] tracking-[0.25em] uppercase mt-2"
              style={{ color: "hsl(var(--highland-gold) / 0.55)" }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.6, ease: s }}
            >
              Roofing & Construction
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
