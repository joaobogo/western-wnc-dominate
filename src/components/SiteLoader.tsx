import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EASE = [0.22, 1, 0.36, 1] as any;

/**
 * SiteLoader — premium mountain-ridge + roofline reveal.
 * A single continuous line traces the Blue Ridge silhouette, ascends into a
 * roof peak, then dissolves into the homepage. ~2.1s total.
 */
const SiteLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 650);
  }, [onComplete]);

  useEffect(() => {
    const t = setTimeout(dismiss, 2100);
    return () => clearTimeout(t);
  }, [dismiss]);

  // Ridge + roofline path: distant peaks → mid ridge → sharp roof pitch → eave
  const ridgePath =
    "M 0 145 L 60 118 L 120 132 L 190 92 L 245 110 L 310 78 L 360 96 L 420 62 L 500 100 L 560 40 L 620 100 L 680 74 L 740 110 L 800 88";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, hsl(var(--heritage-green)) 0%, hsl(var(--heritage-charcoal)) 85%)",
          }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Golden dawn wash behind the ridge */}
          <motion.div
            className="absolute inset-x-0 top-[38%] h-[45%] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0.35] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse 55% 100% at 50% 100%, hsl(var(--highland-gold) / 0.35), transparent 70%)",
            }}
          />

          {/* Top & bottom hairlines */}
          <motion.div
            className="absolute top-0 inset-x-0 h-px origin-center"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--highland-gold)/0.7), transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <motion.div
            className="absolute bottom-0 inset-x-0 h-px origin-center"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--highland-gold)/0.5), transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          />

          {/* --- Mountain ridge + roofline SVG trace --- */}
          <div className="relative z-10 w-[min(88vw,720px)]">
            <svg
              viewBox="0 0 800 200"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ridge-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--highland-gold) / 0.4)" />
                  <stop offset="50%" stopColor="hsl(var(--highland-gold))" />
                  <stop offset="100%" stopColor="hsl(var(--highland-gold) / 0.4)" />
                </linearGradient>
                <filter id="ridge-glow" x="-10%" y="-40%" width="120%" height="180%">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Faint background ridge — parallax */}
              <motion.path
                d={ridgePath}
                fill="none"
                stroke="hsl(var(--highland-gold) / 0.15)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.1, ease: EASE }}
                transform="translate(-10, 20) scale(1.02, 0.85)"
              />

              {/* Primary ridge trace */}
              <motion.path
                d={ridgePath}
                fill="none"
                stroke="url(#ridge-stroke)"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ridge-glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.7, ease: EASE }}
              />

              {/* Roof pitch highlight — the sharpest peak, drawn with a heavier
                  hairline as if the roofline emerges from the ridge */}
              <motion.path
                d="M 500 100 L 560 40 L 620 100"
                fill="none"
                stroke="hsl(var(--highland-gold))"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
              />

              {/* Peak marker dot */}
              <motion.circle
                cx={560}
                cy={40}
                r={3}
                fill="hsl(var(--highland-gold))"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.55, ease: EASE }}
              />

              {/* Baseline / horizon */}
              <motion.line
                x1={0}
                y1={175}
                x2={800}
                y2={175}
                stroke="hsl(var(--highland-gold) / 0.25)"
                strokeWidth={0.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
              />
            </svg>
          </div>

          {/* Brand tagline — reveals as the ridge completes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
            className="relative z-10 mt-6 sm:mt-8 flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-[11px] sm:text-[13px] font-heading font-semibold uppercase tracking-[0.35em] sm:tracking-[0.5em] text-primary-foreground">
                Roofing
              </span>
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--highland-gold))]" />
              <span className="text-[11px] sm:text-[13px] font-heading font-semibold uppercase tracking-[0.35em] sm:tracking-[0.5em] text-primary-foreground">
                Construction
              </span>
              <span className="w-1 h-1 rounded-full bg-[hsl(var(--highland-gold))]" />
              <span className="text-[11px] sm:text-[13px] font-heading font-semibold uppercase tracking-[0.35em] sm:tracking-[0.5em] text-primary-foreground">
                Design
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
              className="text-[9.5px] sm:text-[10.5px] font-body font-bold uppercase tracking-[0.4em] text-[hsl(var(--highland-gold))]"
            >
              Western North Carolina · Since 2017
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
