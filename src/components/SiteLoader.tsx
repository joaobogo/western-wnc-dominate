import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CRAFT_EASE = [0.25, 0.1, 0.25, 1] as const;
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as const;

/* Mountain contour — simplified WNC ridgeline */
const mountainPathDesktop = "M0,140 Q60,110 120,125 Q180,140 250,100 Q320,60 400,90 Q460,110 520,70 Q580,35 640,60 Q700,85 760,45 Q820,15 880,40 Q940,65 1000,30";
const mountainPathMobile = "M0,140 Q150,90 300,110 Q450,50 600,80 Q750,30 900,55";

/* Roofline — 3 architectural gable peaks */
const rooflinePath = "M120,120 L220,50 L320,120 M340,120 L460,35 L580,120 M600,120 L720,45 L840,120";

/* Tick marks under peaks */
const ticks = [220, 460, 720];

interface SiteLoaderProps {
  onComplete: () => void;
}

const SiteLoader = ({ onComplete }: SiteLoaderProps) => {
  const [visible, setVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const isMobile = useIsMobile();

  const prefersReduced = typeof window !== "undefined" 
    && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const totalDuration = prefersReduced ? 800 : isMobile ? 2000 : 3200;

  const handleSkip = useCallback(() => {
    if (!canSkip) return;
    setVisible(false);
    setTimeout(onComplete, 400);
  }, [canSkip, onComplete]);

  useEffect(() => {
    // Allow skip after 1s
    const skipTimer = setTimeout(() => setCanSkip(true), 1000);
    
    // Auto-complete
    const completeTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, totalDuration);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(completeTimer);
    };
  }, [totalDuration, onComplete]);

  // Skip on click/key
  useEffect(() => {
    const handler = () => handleSkip();
    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [handleSkip]);

  if (prefersReduced) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
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

  const mountainPath = isMobile ? mountainPathMobile : mountainPathDesktop;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "hsl(var(--hero-overlay))" }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: HIGHLAND_EASE as unknown as number[] }}
        >
          {/* Grain overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' 
            }} 
          />

          <div className="relative w-full max-w-md px-8">
            {/* SVG Scene */}
            <svg 
              viewBox="0 0 1000 200" 
              className="w-full h-auto mb-8"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Phase 1: Mountain contour */}
              <motion.path
                d={mountainPath}
                fill="none"
                stroke="hsl(var(--highland-gold))"
                strokeOpacity={0.15}
                strokeWidth={1}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: isMobile ? 0.5 : 0.8, 
                  ease: CRAFT_EASE as unknown as number[] 
                }}
              />

              {/* Phase 2: Roofline */}
              {!isMobile && (
                <>
                  <motion.path
                    d={rooflinePath}
                    fill="none"
                    stroke="hsl(var(--primary-foreground))"
                    strokeOpacity={0.4}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.6, 
                      ease: HIGHLAND_EASE as unknown as number[] 
                    }}
                  />
                  
                  {/* Measurement ticks */}
                  {ticks.map((x, i) => (
                    <motion.line
                      key={x}
                      x1={x} y1={125}
                      x2={x} y2={140}
                      stroke="hsl(var(--primary-foreground))"
                      strokeOpacity={0.2}
                      strokeWidth={0.5}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 + i * 0.15, duration: 0.2 }}
                    />
                  ))}
                </>
              )}

              {/* Mobile: Single peak */}
              {isMobile && (
                <motion.path
                  d="M300,120 L500,40 L700,120"
                  fill="none"
                  stroke="hsl(var(--primary-foreground))"
                  strokeOpacity={0.4}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.5, 
                    ease: HIGHLAND_EASE as unknown as number[] 
                  }}
                />
              )}
            </svg>

            {/* Phase 3: Brand text */}
            <div className="text-center">
              <motion.h2
                className="font-heading text-xl md:text-2xl tracking-[0.15em] uppercase"
                style={{ color: "hsl(var(--primary-foreground) / 0.8)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: isMobile ? 1.2 : 1.5, 
                  ease: HIGHLAND_EASE as unknown as number[] 
                }}
              >
                Highlander
              </motion.h2>

              <motion.p
                className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2"
                style={{ color: "hsl(var(--highland-gold) / 0.6)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: isMobile ? 1.4 : 1.7 
                }}
              >
                Roofing & Construction
              </motion.p>

              {/* Phase 4: Gold accent line */}
              <motion.div
                className="mx-auto mt-4 h-px"
                style={{ background: "hsl(var(--highland-gold))" }}
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ 
                  duration: 0.4, 
                  delay: isMobile ? 1.6 : 2.2, 
                  ease: CRAFT_EASE as unknown as number[] 
                }}
              />
            </div>
          </div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 left-0 right-0 text-center font-body text-[10px] tracking-[0.15em] uppercase"
            style={{ color: "hsl(var(--primary-foreground) / 0.15)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {isMobile ? "Tap to skip" : "Click or press any key to skip"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
