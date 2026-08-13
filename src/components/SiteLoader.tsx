import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EASE = [0.22, 1, 0.36, 1] as any;

// Brand palette (Smith Green identity)
const SMITH_GREEN = "hsl(var(--heritage-green))";
const SMITH_LIGHT = "hsl(var(--tartan-line))";
const CREAM = "hsl(var(--dark-section-foreground))";
const GOLD = "hsl(var(--highland-gold))";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * SiteLoader — cinematic "house being built" intro in Smith Green.
 * Sequence: mountain ridge → foundation → walls → gable → roof → windows →
 * blueprint ticks → brand line → smooth dissolve. ~2.8s total.
 * Session-gated by caller; respects prefers-reduced-motion.
 */
const SiteLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [reduced] = useState(prefersReducedMotion);
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, reduced ? 0 : 450);
  }, [onComplete, reduced]);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(dismiss, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(dismiss, 2800);
    return () => clearTimeout(t);
  }, [dismiss, reduced]);

  // Distant Blue Ridge silhouette
  const ridgePath =
    "M 0 110 L 70 88 L 140 100 L 210 70 L 280 92 L 360 58 L 440 84 L 520 50 L 600 82 L 680 62 L 760 92 L 800 80";

  // House geometry (viewBox 800x320) — centered mountain home
  // Foundation line
  const FOUNDATION = "M 240 240 L 560 240";
  // Left wall, right wall
  const LEFT_WALL = "M 260 240 L 260 170";
  const RIGHT_WALL = "M 540 240 L 540 170";
  // Gable (roof triangle)
  const ROOF_LEFT = "M 250 175 L 400 100";
  const ROOF_RIGHT = "M 400 100 L 550 175";
  const ROOF_EAVE = "M 250 175 L 550 175";
  // Porch
  const PORCH = "M 260 240 L 260 220 L 340 220 L 340 240";
  // Door
  const DOOR = "M 385 240 L 385 200 L 415 200 L 415 240";
  // Windows
  const WIN_L = "M 285 195 L 325 195 L 325 220 L 285 220 Z";
  const WIN_R = "M 475 195 L 515 195 L 515 220 L 475 220 Z";
  // Chimney
  const CHIMNEY = "M 480 138 L 480 108 L 500 108 L 500 149";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          role="status"
          aria-label="Loading Highlander Building Services"
          style={{
            background:
              `radial-gradient(ellipse at 50% 55%, ${SMITH_LIGHT} 0%, ${SMITH_GREEN} 50%, hsl(var(--hero-overlay)) 100%)`,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {reduced && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3"
              style={{ color: CREAM }}
            >
              <span className="text-lg font-heading tracking-[0.3em]">HIGHLANDER</span>
              <span className="text-caption font-body uppercase tracking-[0.4em]" style={{ color: GOLD }}>
                Roofing · Construction · Design
              </span>
            </motion.div>
          )}

          {!reduced && (
            <>
              {/* Film grain */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                }}
              />

              {/* Warm dawn wash behind the scene */}
              <motion.div
                className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0.22] }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                style={{
                  background: `radial-gradient(ellipse 60% 100% at 50% 100%, ${GOLD}, transparent 70%)`,
                }}
              />

              {/* Light sweep across the completed home */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0, x: "-40%" }}
                animate={{ opacity: [0, 0.35, 0], x: "40%" }}
                transition={{ duration: 1.1, delay: 2.0, ease: "easeInOut" }}
                style={{
                  background:
                    `linear-gradient(105deg, transparent 40%, hsl(var(--dark-section-foreground) / 0.13) 50%, transparent 60%)`,
                }}
              />

              {/* Hairlines */}
              <motion.div
                className="absolute top-0 inset-x-0 h-px origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${CREAM}, transparent)`, opacity: 0.5 }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: EASE }}
              />
              <motion.div
                className="absolute bottom-0 inset-x-0 h-px origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${CREAM}, transparent)`, opacity: 0.35 }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              />

              {/* --- SCENE: mountain ridge + line-art home --- */}
              <div className="relative z-10 w-[min(92vw,780px)] px-4">
                <svg
                  viewBox="0 0 800 320"
                  preserveAspectRatio="xMidYMid meet"
                  className="w-full h-auto overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="stroke-cream" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={CREAM} stopOpacity="0.4" />
                      <stop offset="50%" stopColor={CREAM} stopOpacity="1" />
                      <stop offset="100%" stopColor={CREAM} stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="soft-glow" x="-20%" y="-40%" width="140%" height="180%">
                      <feGaussianBlur stdDeviation="1.6" result="b" />
                      <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Blueprint grid — very subtle */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.08 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    stroke={CREAM}
                    strokeWidth={0.3}
                  >
                    {Array.from({ length: 16 }).map((_, i) => (
                      <line key={`gv-${i}`} x1={i * 50} y1={0} x2={i * 50} y2={320} />
                    ))}
                    {Array.from({ length: 7 }).map((_, i) => (
                      <line key={`gh-${i}`} x1={0} y1={i * 50} x2={800} y2={i * 50} />
                    ))}
                  </motion.g>

                  {/* Distant ridge (parallax back) */}
                  <motion.path
                    d={ridgePath}
                    fill="none"
                    stroke={CREAM}
                    strokeOpacity={0.15}
                    strokeWidth={1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                    transform="translate(-20, 15) scale(1.03, 0.9)"
                  />

                  {/* Foreground mountain ridge */}
                  <motion.path
                    d={ridgePath}
                    fill="none"
                    stroke="url(#stroke-cream)"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#soft-glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
                  />

                  {/* --- HOUSE FRAME --- */}
                  {/* Foundation */}
                  <motion.path
                    d={FOUNDATION}
                    fill="none" stroke={CREAM} strokeWidth={1.6} strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.95, ease: EASE }}
                  />
                  {/* Walls */}
                  <motion.path
                    d={LEFT_WALL}
                    fill="none" stroke={CREAM} strokeWidth={1.6} strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 1.25, ease: EASE }}
                  />
                  <motion.path
                    d={RIGHT_WALL}
                    fill="none" stroke={CREAM} strokeWidth={1.6} strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 1.3, ease: EASE }}
                  />
                  {/* Eave */}
                  <motion.path
                    d={ROOF_EAVE}
                    fill="none" stroke={CREAM} strokeOpacity={0.7} strokeWidth={1.2} strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 1.55, ease: EASE }}
                  />
                  {/* Roof left/right — the hero moment */}
                  <motion.path
                    d={ROOF_LEFT}
                    fill="none" stroke={GOLD} strokeWidth={2.2} strokeLinecap="round"
                    filter="url(#soft-glow)"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 1.7, ease: EASE }}
                  />
                  <motion.path
                    d={ROOF_RIGHT}
                    fill="none" stroke={GOLD} strokeWidth={2.2} strokeLinecap="round"
                    filter="url(#soft-glow)"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 1.75, ease: EASE }}
                  />
                  {/* Peak dot */}
                  <motion.circle
                    cx={400} cy={100} r={3.5} fill={GOLD}
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, delay: 2.15, ease: EASE }}
                  />
                  {/* Chimney */}
                  <motion.path
                    d={CHIMNEY}
                    fill="none" stroke={CREAM} strokeOpacity={0.75} strokeWidth={1.2} strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 2.0, ease: EASE }}
                  />
                  {/* Door */}
                  <motion.path
                    d={DOOR}
                    fill="none" stroke={CREAM} strokeOpacity={0.8} strokeWidth={1.1} strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 1.85, ease: EASE }}
                  />
                  {/* Windows */}
                  <motion.path
                    d={WIN_L}
                    fill="none" stroke={CREAM} strokeOpacity={0.8} strokeWidth={1.1} strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 1.9, ease: EASE }}
                  />
                  <motion.path
                    d={WIN_R}
                    fill="none" stroke={CREAM} strokeOpacity={0.8} strokeWidth={1.1} strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 1.95, ease: EASE }}
                  />
                  {/* Window mullions */}
                  <motion.g
                    stroke={CREAM} strokeOpacity={0.55} strokeWidth={0.8}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 2.1 }}
                  >
                    <line x1={305} y1={195} x2={305} y2={220} />
                    <line x1={285} y1={207.5} x2={325} y2={207.5} />
                    <line x1={495} y1={195} x2={495} y2={220} />
                    <line x1={475} y1={207.5} x2={515} y2={207.5} />
                  </motion.g>
                  {/* Porch */}
                  <motion.path
                    d={PORCH}
                    fill="none" stroke={CREAM} strokeOpacity={0.6} strokeWidth={1.1} strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 2.0, ease: EASE }}
                  />
                  {/* Roof panel lines */}
                  <motion.g
                    stroke={GOLD} strokeOpacity={0.5} strokeWidth={0.7}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.2 }}
                  >
                    <line x1={288} y1={156} x2={555} y2={156} />
                    <line x1={325} y1={137} x2={520} y2={137} />
                    <line x1={362} y1={118} x2={485} y2={118} />
                  </motion.g>

                  {/* Measurement ticks — blueprint feel */}
                  <motion.g
                    stroke={CREAM} strokeOpacity={0.5} strokeWidth={0.8}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 2.25 }}
                  >
                    <line x1={240} y1={258} x2={240} y2={266} />
                    <line x1={400} y1={258} x2={400} y2={266} />
                    <line x1={560} y1={258} x2={560} y2={266} />
                    <line x1={240} y1={262} x2={560} y2={262} />
                  </motion.g>
                </svg>
              </div>

              {/* Brand line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.15, ease: EASE }}
                className="relative z-10 mt-4 sm:mt-6 flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-3 sm:gap-4" style={{ color: CREAM }}>
                  <span className="text-caption sm:text-body-xs font-heading font-semibold uppercase tracking-[0.35em] sm:tracking-[0.5em]">
                    Roofing
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: GOLD }} />
                  <span className="text-caption sm:text-body-xs font-heading font-semibold uppercase tracking-[0.35em] sm:tracking-[0.5em]">
                    Construction
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: GOLD }} />
                  <span className="text-caption sm:text-body-xs font-heading font-semibold uppercase tracking-[0.35em] sm:tracking-[0.5em]">
                    Design
                  </span>
                </div>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 2.4, ease: EASE }}
                  className="text-caption sm:text-caption font-body font-bold uppercase tracking-[0.4em]"
                  style={{ color: GOLD }}
                >
                  Western North Carolina · Since 2017
                </motion.p>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
