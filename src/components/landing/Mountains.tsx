import type { LandingKey } from "./config";

/**
 * Original, decorative Blue Ridge scenery: layered ridgelines, pines and small
 * homes whose roofs and decks echo the page's service. Pure SVG (no image
 * request), brand greens only, one warm gold window glow. Decorative, so it is
 * hidden from assistive technology and never carries a claim.
 */

type Tone = "ink" | "cream";

const fills: Record<Tone, { far: string; mid: string; near: string; house: string; pine: string }> = {
  ink: {
    far: "hsl(var(--primary) / 0.11)",
    mid: "hsl(var(--primary) / 0.17)",
    near: "hsl(var(--primary) / 0.26)",
    house: "hsl(var(--primary) / 0.7)",
    pine: "hsl(var(--primary) / 0.5)",
  },
  cream: {
    far: "hsl(var(--primary-foreground) / 0.05)",
    mid: "hsl(var(--primary-foreground) / 0.08)",
    near: "hsl(var(--primary-foreground) / 0.12)",
    house: "hsl(var(--primary-foreground) / 0.34)",
    pine: "hsl(var(--primary-foreground) / 0.22)",
  },
};

const GOLD = "hsl(var(--highland-gold))";

/** A small stand of pines; (x, y) is the base centre. */
const Pines = ({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
    {[
      [0, 0, 1],
      [16, 4, 0.78],
      [-15, 5, 0.7],
      [30, 7, 0.55],
    ].map(([dx, dy, k], i) => (
      <path
        key={i}
        transform={`translate(${dx} ${dy}) scale(${k})`}
        d="M0 -46 L11 -22 H5 L14 -6 H6 L16 12 H-16 L-6 -6 H-14 L-5 -22 H-11 Z"
      />
    ))}
  </g>
);

type HouseKind = "cabin" | "metal" | "frame" | "deck";

/** (x, y) is the base centre of the house on the ridge. */
const House = ({ x, y, s = 1, kind, fill, glow }: { x: number; y: number; s?: number; kind: HouseKind; fill: string; glow: boolean }) => {
  const window = glow ? <rect x="-4" y="-17" width="8" height="9" rx="1" fill={GOLD} opacity="0.95" /> : null;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      {kind === "cabin" && (
        <>
          <rect x="-26" y="-26" width="52" height="28" />
          <path d="M-32 -24 L0 -52 L32 -24 Z" />
          <rect x="14" y="-50" width="7" height="16" />
          {window}
        </>
      )}
      {kind === "metal" && (
        <>
          <rect x="-34" y="-22" width="68" height="24" />
          <path d="M-40 -20 L-26 -44 H26 L40 -20 Z" />
          {[-16, -6, 4, 14].map((lx) => (
            <path key={lx} d={`M${lx} -43 V-21`} stroke="hsl(var(--background))" strokeOpacity="0.28" strokeWidth="1" />
          ))}
          {window}
        </>
      )}
      {kind === "frame" && (
        <>
          <rect x="-30" y="-30" width="60" height="32" />
          <path d="M-36 -28 L0 -58 L36 -28 Z" />
          <path d="M-30 -30 V2 M30 -30 V2 M0 -30 V2" stroke="hsl(var(--background))" strokeOpacity="0.25" strokeWidth="1.2" />
          <rect x="-24" y="-24" width="14" height="18" rx="1" fill={glow ? GOLD : "hsl(var(--background))"} opacity="0.9" />
        </>
      )}
      {kind === "deck" && (
        <>
          <rect x="-24" y="-24" width="48" height="26" />
          <path d="M-30 -22 L0 -46 L30 -22 Z" />
          <rect x="24" y="-10" width="36" height="3" />
          <path d="M26 -7 V4 M42 -7 V4 M58 -7 V4" stroke={fill} strokeWidth="2.4" />
          {window}
        </>
      )}
    </g>
  );
};

const scenes: Record<LandingKey, Array<{ ridge: "mid" | "near"; x: number; y: number; s: number; kind: HouseKind; glow: boolean }>> = {
  roofing: [
    { ridge: "mid", x: 1160, y: 172, s: 0.8, kind: "metal", glow: true },
    { ridge: "near", x: 392, y: 272, s: 1.05, kind: "cabin", glow: true },
    { ridge: "near", x: 1112, y: 281, s: 1.15, kind: "metal", glow: false },
  ],
  construction: [
    { ridge: "mid", x: 1160, y: 172, s: 0.8, kind: "frame", glow: true },
    { ridge: "near", x: 392, y: 272, s: 1.05, kind: "deck", glow: true },
    { ridge: "near", x: 1112, y: 281, s: 1.15, kind: "frame", glow: false },
  ],
  combined: [
    { ridge: "mid", x: 1160, y: 172, s: 0.8, kind: "metal", glow: true },
    { ridge: "near", x: 392, y: 272, s: 1.05, kind: "deck", glow: true },
    { ridge: "near", x: 1112, y: 281, s: 1.15, kind: "cabin", glow: false },
  ],
};

export default function Mountains({
  variant,
  tone = "ink",
  className = "",
}: {
  variant: LandingKey;
  tone?: Tone;
  className?: string;
}) {
  const c = fills[tone];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        fill={c.far}
        d="M0 210 C120 150 220 120 330 160 C420 190 470 110 580 90 C690 70 740 130 840 150 C940 170 1010 100 1120 80 C1230 60 1320 120 1440 150 V320 H0Z"
      />
      <path
        fill={c.mid}
        d="M0 250 C100 215 200 190 300 215 C400 240 470 175 580 170 C700 165 760 215 880 225 C990 235 1050 170 1160 165 C1270 160 1350 205 1440 220 V320 H0Z"
      />
      {scenes[variant]
        .filter((h) => h.ridge === "mid")
        .map((h) => (
          <House key={`${h.x}-${h.y}`} {...h} fill={c.house} />
        ))}
      <Pines x={238} y={232} s={0.8} fill={c.pine} />
      <Pines x={930} y={236} s={0.9} fill={c.pine} />
      <path
        fill={c.near}
        d="M0 285 C150 255 260 250 380 265 C520 283 600 240 740 245 C880 250 980 285 1110 275 C1240 265 1340 250 1440 265 V320 H0Z"
      />
      {scenes[variant]
        .filter((h) => h.ridge === "near")
        .map((h) => (
          <House key={`${h.x}-${h.y}`} {...h} fill={c.house} />
        ))}
      <Pines x={520} y={268} s={1} fill={c.pine} />
      <Pines x={742} y={252} s={1.15} fill={c.pine} />
      <Pines x={1290} y={262} s={1} fill={c.pine} />
      <Pines x={90} y={274} s={1.1} fill={c.pine} />
    </svg>
  );
}
