/**
 * Lightweight sequential A/B testing.
 *
 * Rules of the system:
 *  - One test at a time per element. Two variants only ("a" = control).
 *  - Assignment is sticky per visitor via localStorage, so a returning
 *    visitor always sees the same variant and conversions stay attributable.
 *  - Every assignment is published to GTM (`experiment_view`) AND attached to
 *    every later dataLayer event via `getActiveExperiments()`, so any
 *    conversion tag can be split by variant without extra instrumentation.
 *  - No third-party experiment platform. No flicker: assignment is synchronous.
 */

export type VariantKey = "a" | "b";

export interface ExperimentDef {
  /** Stable id — never reuse after a test concludes. */
  id: string;
  /** What is being tested, for the readout. */
  hypothesis: string;
  /** Human labels for the readout. */
  variants: Record<VariantKey, string>;
  /** false = everyone gets the control (test concluded / paused). */
  active: boolean;
}

/**
 * Active experiment registry. Keep this to ONE running test at a time —
 * sequential testing beats parallel tests on a site this size.
 */
export const EXPERIMENTS = {
  home_hero_cta: {
    id: "home_hero_cta",
    hypothesis:
      "Outcome-first CTA copy on the homepage hero converts better than the current process-first label.",
    variants: {
      a: "Get My Written Estimate",
      b: "See What My Roof Needs",
    },
    active: true,
  },
} as const satisfies Record<string, ExperimentDef>;

export type ExperimentId = keyof typeof EXPERIMENTS;

const STORAGE_PREFIX = "hl_ab_";

/** In-memory mirror so repeated reads never touch storage or re-push GTM. */
const assigned = new Map<string, VariantKey>();
const announced = new Set<string>();

function readStored(id: string): VariantKey | null {
  try {
    const v = localStorage.getItem(STORAGE_PREFIX + id);
    return v === "a" || v === "b" ? v : null;
  } catch {
    return null;
  }
}

function writeStored(id: string, variant: VariantKey) {
  try {
    localStorage.setItem(STORAGE_PREFIX + id, variant);
  } catch {
    /* private mode — assignment stays in memory for this page view */
  }
}

function coinFlip(): VariantKey {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const buf = new Uint8Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % 2 === 0 ? "a" : "b";
  }
  return Math.random() < 0.5 ? "a" : "b";
}

/**
 * Resolve (and persist) this visitor's variant for an experiment.
 * Always returns "a" on the server, for unknown ids, and for paused tests.
 */
export function getVariant(id: ExperimentId): VariantKey {
  const def = EXPERIMENTS[id] as ExperimentDef | undefined;
  if (!def || !def.active) return "a";
  if (typeof window === "undefined") return "a";

  const cached = assigned.get(id);
  if (cached) return cached;

  // ?ab_<id>=b forces a variant for QA without polluting the visitor pool.
  let variant: VariantKey | null = null;
  try {
    const forced = new URLSearchParams(window.location.search).get(`ab_${id}`);
    if (forced === "a" || forced === "b") variant = forced;
  } catch {
    /* ignore */
  }

  if (!variant) variant = readStored(id);
  if (!variant) {
    variant = coinFlip();
    writeStored(id, variant);
  }

  assigned.set(id, variant);
  return variant;
}

/** All resolved assignments, flattened for the dataLayer. */
export function getActiveExperiments(): Record<string, string> {
  if (assigned.size === 0) return {};
  const out: Record<string, string> = {};
  for (const [id, variant] of assigned) out[`exp_${id}`] = variant;
  return out;
}

/** Push the impression once per page view so GTM can attribute conversions. */
export function announceVariant(id: ExperimentId, variant: VariantKey) {
  if (typeof window === "undefined" || announced.has(id)) return;
  announced.add(id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "experiment_view",
    experiment_id: id,
    experiment_variant: variant,
    ...getActiveExperiments(),
  });
}

/** Convenience: pick a value by variant. */
export function variantValue<T>(variant: VariantKey, a: T, b: T): T {
  return variant === "b" ? b : a;
}