import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CRAFT_EASE = [0.25, 0.1, 0.25, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DRAMATIC_EASE = [0.16, 1, 0.3, 1] as any;

/* ─── TOPOGRAPHIC CONTOURS — layered WNC ridgelines ─── */
const contourPaths = [
  "M-50,200 Q120,170 280,185 Q440,200 580,155 Q720,110 860,135 Q1000,160 1140,120 Q1280,80 1420,100 Q1520,110 1560,108",
  "M-50,230 Q100,205 240,218 Q400,235 560,185 Q700,140 840,165 Q980,190 1100,145 Q1240,100 1380,125 Q1500,140 1560,135",
  "M-50,260 Q150,238 300,250 Q460,268 620,215 Q760,168 900,195 Q1040,222 1160,175 Q1300,130 1440,155 Q1540,168 1560,165",
  "M-50,280 Q180,260 340,270 Q500,285 660,240 Q800,198 940,220 Q1080,244 1200,200 Q1340,158 1460,180 Q1540,192 1560,188",
  "M-50,310 Q130,295 290,305 Q450,318 610,270 Q750,228 890,250 Q1030,272 1170,230 Q1310,190 1430,210 Q1540,222 1560,218",
];

/* ─── BLUEPRINT DIMENSION MARKS ─── */
const dimensionMarks = [
  { x1: 340, y1: 255, x2: 1160, y2: 255, label: "62'-0\"" },
  { x1: 400, y1: 75, x2: 400, y2: 250, label: "28'-6\"" },
];

/* ─── CROSS-HAIR SURVEY MARKS ─── */
const surveyMarks = [
  { cx: 200, cy: 50, r: 4 }, { cx: 750, cy: 40, r: 5 },
  { cx: 1300, cy: 55, r: 4 }, { cx: 450, cy: 270, r: 3 },
  { cx: 1050, cy: 265, r: 3 },
];

/* ─── ROOFLINE — detailed home assembly ─── */
const roofStructure = [
  // Foundation slab
  { d: "M320,250 L1180,250", w: 1.0, op: 0.15, delay: 0 },
  // Left wall
  { d: "M380,250 L380,150", w: 0.8, op: 0.2, delay: 0.08 },
  // Right wall
  { d: "M1120,250 L1120,150", w: 0.8, op: 0.2, delay: 0.1 },
  // Main ridge beam
  { d: "M380,150 L600,60", w: 1.2, op: 0.35, delay: 0.16 },
  { d: "M600,60 L820,150", w: 1.2, op: 0.35, delay: 0.22 },
  // Secondary gable
  { d: "M820,150 L970,85 L1120,150", w: 1.0, op: 0.3, delay: 0.30 },
  // Ridge cap emphasis
  { d: "M585,65 L615,65", w: 1.6, op: 0.4, delay: 0.38 },
  // Chimney
  { d: "M680,80 L680,38 L725,38 L725,74", w: 0.9, op: 0.28, delay: 0.42 },
  // Left eave overhang
  { d: "M360,155 L380,150", w: 0.6, op: 0.18, delay: 0.35 },
  // Right eave overhang
  { d: "M1120,150 L1140,155", w: 0.6, op: 0.18, delay: 0.37 },
  // Interior wall hint
  { d: "M700,250 L700,150", w: 0.4, op: 0.1, delay: 0.44 },
  // Window openings
  { d: "M440,190 L440,175 L480,175 L480,190", w: 0.5, op: 0.15, delay: 0.48 },
  { d: "M850,190 L850,175 L890,175 L890,190", w: 0.5, op: 0.15, delay: 0.50 },
  // Rafter marks
  { d: "M430,135 L440,130", w: 0.3, op: 0.08, delay: 0.52 },
  { d: "M490,110 L500,105", w: 0.3, op: 0.08, delay: 0.54 },
  { d: "M550,85 L560,80", w: 0.3, op: 0.08, delay: 0.56 },
  { d: "M650,75 L660,80", w: 0.3, op: 0.08, delay: 0.58 },
  { d: "M710,90 L720,95", w: 0.3, op: 0.08, delay: 0.60 },
  { d: "M770,120 L780,125", w: 0.3, op: 0.08, delay: 0.62 },
];

/* ─── TARTAN LATTICE ─── */
const tartanH = [85, 125, 165, 205, 245];
const tartanV = [420, 540, 660, 780, 900, 1020, 1080];

/* ─── FLOATING PARTICLES ─── */
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 100 + Math.random() * 1300,
  y: 30 + Math.random() * 240,
  size: 0.8 + Math.random() * 1.2,
  delay: Math.random() * 2,
  drift: 15 + Math.random() * 30,
}));

interface SiteLoaderProps {
  onComplete: () => void;
}

const SiteLoader = ({ onComplete }: SiteLoaderProps) => {
  const [visible, setVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [phase, setPhase] = useState(0);
  const isMobile = useIsMobile();

  const prefersReduced = typeof window !== "undefined"
    && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const totalDuration = prefersReduced ? 800 : isMobile ? 3400 : 5200;

  const dismiss = useCallback(() => {
    if (phase < 4) {
      setPhase(4);
      setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 600);
      }, 500);
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

    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), isMobile ? 1000 : 1600),
      setTimeout(() => setPhase(3), isMobile ? 2000 : 3200),
      setTimeout(() => setCanSkip(true), 600),
      setTimeout(() => dismiss(), totalDuration),
    ];

    return () => timers.forEach(clearTimeout);
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
          exit={{ opacity: 0, scale: 1.03, y: -8 }}
          transition={{ duration: 0.65, ease: DRAMATIC_EASE }}
        >
          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, hsl(var(--hero-overlay) / 0.4) 100%)",
            }}
          />

          {/* ════ MAIN SVG CANVAS ════ */}
          <svg
            viewBox="0 0 1500 320"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* ── ACT 1: TOPOGRAPHIC VISION ── */}
            {phase >= 1 && contourPaths.map((d, i) => (
              <motion.path
                key={`c-${i}`}
                d={d}
                fill="none"
                stroke="hsl(var(--highland-gold))"
                strokeOpacity={0.04 + i * 0.015}
                strokeWidth={0.4 + i * 0.05}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: isMobile ? 0.7 : 1.2, delay: i * 0.12, ease: CRAFT_EASE },
                  opacity: { duration: 0.25, delay: i * 0.08 },
                }}
              />
            ))}

            {/* Survey crosshair marks */}
            {phase >= 1 && !isMobile && surveyMarks.map((m, i) => (
              <motion.g key={`sv-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.1, duration: 0.2 }}>
                <circle cx={m.cx} cy={m.cy} r={m.r} fill="none" stroke="hsl(var(--primary-foreground))" strokeOpacity={0.05} strokeWidth={0.3} />
                <line x1={m.cx - m.r - 2} y1={m.cy} x2={m.cx + m.r + 2} y2={m.cy} stroke="hsl(var(--primary-foreground))" strokeOpacity={0.04} strokeWidth={0.25} />
                <line x1={m.cx} y1={m.cy - m.r - 2} x2={m.cx} y2={m.cy + m.r + 2} stroke="hsl(var(--primary-foreground))" strokeOpacity={0.04} strokeWidth={0.25} />
              </motion.g>
            ))}

            {/* ── ACT 2: STRUCTURAL ASSEMBLY ── */}
            {phase >= 2 && roofStructure.map((seg, i) => (
              <motion.path
                key={`r-${i}`}
                d={seg.d}
                fill="none"
                stroke="hsl(var(--primary-foreground))"
                strokeOpacity={seg.op}
                strokeWidth={seg.w}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: isMobile ? 0.3 : 0.5,
                  delay: seg.delay * (isMobile ? 0.6 : 1),
                  ease: HIGHLAND_EASE,
                }}
              />
            ))}

            {/* Dimension annotations */}
            {phase >= 2 && !isMobile && dimensionMarks.map((dm, i) => (
              <motion.g key={`dm-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}>
                <line x1={dm.x1} y1={dm.y1} x2={dm.x2} y2={dm.y2} stroke="hsl(var(--highland-gold))" strokeOpacity={0.06} strokeWidth={0.3} strokeDasharray="4 4" />
                {i === 0 && (
                  <text x={(dm.x1 + dm.x2) / 2} y={dm.y1 + 12} textAnchor="middle" fill="hsl(var(--highland-gold))" fillOpacity={0.08} fontSize={6} fontFamily="monospace">{dm.label}</text>
                )}
              </motion.g>
            ))}

            {/* Material texture — shingle pattern hint */}
            {phase >= 2 && !isMobile && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={`sh-${i}`}
                    x1={460 + i * 50} y1={108 + i * 6}
                    x2={490 + i * 50} y2={118 + i * 6}
                    stroke="hsl(var(--highland-gold))" strokeOpacity={0.04} strokeWidth={0.25} />
                ))}
              </motion.g>
            )}

            {/* ── TARTAN HERITAGE BEAT ── */}
            {phase >= 2 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, isMobile ? 0.08 : 0.1, isMobile ? 0.08 : 0.1, 0] }}
                transition={{
                  duration: isMobile ? 0.8 : 1.4,
                  delay: isMobile ? 0.5 : 0.8,
                  times: [0, 0.15, 0.65, 1],
                  ease: "easeInOut",
                }}
              >
                {tartanH.map((y, i) => (
                  <motion.line
                    key={`th-${i}`}
                    x1={380} y1={y} x2={1120} y2={y}
                    stroke="hsl(var(--tartan-accent))"
                    strokeWidth={i % 2 === 0 ? 0.5 : 0.25}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: (isMobile ? 0.5 : 0.8) + i * 0.04 }}
                  />
                ))}
                {tartanV.map((x, i) => (
                  <motion.line
                    key={`tv-${i}`}
                    x1={x} y1={60} x2={x} y2={260}
                    stroke="hsl(var(--heritage-green))"
                    strokeWidth={i % 3 === 0 ? 0.5 : 0.25}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: (isMobile ? 0.55 : 0.85) + i * 0.03 }}
                  />
                ))}
              </motion.g>
            )}

            {/* Floating architectural dust particles */}
            {phase >= 1 && !isMobile && particles.map((p) => (
              <motion.circle
                key={`p-${p.id}`}
                cx={p.x} cy={p.y} r={p.size * 0.4}
                fill="hsl(var(--highland-gold))"
                fillOpacity={0.06}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.08, 0.04, 0], y: -p.drift }}
                transition={{
                  duration: 3,
                  delay: p.delay,
                  ease: "easeOut",
                  repeat: 0,
                }}
              />
            ))}

            {/* Mobile: simplified bold roofline */}
            {phase >= 2 && isMobile && (
              <>
                <motion.path
                  d="M350,240 L1150,240"
                  fill="none" stroke="hsl(var(--primary-foreground))" strokeOpacity={0.12} strokeWidth={0.8}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
                />
                <motion.path
                  d="M400,240 L400,160 L620,70 L840,160 L980,95 L1100,160 L1100,240"
                  fill="none" stroke="hsl(var(--primary-foreground))" strokeOpacity={0.3} strokeWidth={1.2}
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: HIGHLAND_EASE }}
                />
              </>
            )}
          </svg>

          {/* ════ ACT 3: BRAND ARRIVAL ════ */}
          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Top gold line — draws before brand */}
            <motion.div
              className="h-px mb-7 md:mb-9"
              style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.45), hsl(var(--highland-gold) / 0))" }}
              initial={{ width: 0, opacity: 0 }}
              animate={phase >= 3 ? { width: isMobile ? 100 : 180, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: CRAFT_EASE }}
            />

            {/* HIGHLANDER wordmark */}
            <div className="text-center overflow-hidden">
              <motion.h2
                className="font-heading text-[1.6rem] md:text-3xl lg:text-[2.7rem] tracking-[0.14em] md:tracking-[0.18em] uppercase leading-none"
                style={{ color: "hsl(var(--primary-foreground) / 0.92)" }}
                initial={{ y: "120%", opacity: 0 }}
                animate={phase >= 3 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: DRAMATIC_EASE }}
              >
                Highlander
              </motion.h2>
            </div>

            {/* Subtitle with staggered reveal */}
            <motion.div
              className="overflow-hidden mt-2.5 md:mt-3.5"
              initial={{ height: 0 }}
              animate={phase >= 3 ? { height: "auto" } : {}}
              transition={{ duration: 0.4, delay: 0.25, ease: CRAFT_EASE }}
            >
              <motion.p
                className="font-body text-[9px] md:text-[11px] tracking-[0.28em] uppercase"
                style={{ color: "hsl(var(--highland-gold) / 0.55)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: CRAFT_EASE }}
              >
                Roofing & Construction
              </motion.p>
            </motion.div>

            {/* Heritage diamond accent */}
            <motion.div
              className="mt-6 md:mt-8 flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease: HIGHLAND_EASE }}
            >
              <motion.div
                className="h-px bg-[hsl(var(--highland-gold)/0.12)]"
                initial={{ width: 0 }}
                animate={phase >= 3 ? { width: 32 } : {}}
                transition={{ delay: 0.55, duration: 0.4 }}
              />
              <div className="w-1.5 h-1.5 rotate-45 border border-[hsl(var(--highland-gold)/0.25)] bg-[hsl(var(--highland-gold)/0.05)]" />
              <motion.div
                className="h-px bg-[hsl(var(--highland-gold)/0.12)]"
                initial={{ width: 0 }}
                animate={phase >= 3 ? { width: 32 } : {}}
                transition={{ delay: 0.55, duration: 0.4 }}
              />
            </motion.div>

            {/* Tagline — appears last */}
            <motion.p
              className="mt-5 font-body text-[8px] md:text-[9px] tracking-[0.18em] uppercase"
              style={{ color: "hsl(var(--primary-foreground) / 0.15)" }}
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Western North Carolina
            </motion.p>
          </div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-5 md:bottom-6 left-0 right-0 text-center font-body text-[8px] md:text-[9px] tracking-[0.12em] uppercase"
            style={{ color: "hsl(var(--primary-foreground) / 0.08)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {isMobile ? "Tap to skip" : "Click or press any key"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
