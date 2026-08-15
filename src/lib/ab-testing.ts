/**
 * Sequential A/B testing with a test queue.
 *
 * Rules of the system:
 *  - ONE test runs at a time. Everything else sits in the queue with an
 *    explicit order. Parallel tests on a site this size produce noise, not
 *    learning, so `getVariant` hard-returns the control for any test that is
 *    not the current running test.
 *  - Two variants only ("a" = control, "b" = challenger).
 *  - Assignment is sticky per visitor via localStorage, so a returning
 *    visitor always sees the same variant and conversions stay attributable.
 *  - Every test declares its success metric, minimum run length in days, and
 *    minimum conversions per variant BEFORE it starts. A test is not readable
 *    (and must not be shipped) until both thresholds are met.
 *  - Every assignment is published to GTM (`experiment_view`) AND attached to
 *    every later dataLayer event via `getActiveExperiments()`, so any
 *    conversion tag can be split by variant without extra instrumentation.
 *  - No third-party experiment platform. No flicker: assignment is synchronous.
 */

export type VariantKey = "a" | "b";

export type ExperimentStatus = "running" | "queued" | "concluded";

/** Success metrics map 1:1 to GTM events (see docs/analytics-events.md). */
export type SuccessMetric =
  | "generate_lead"
  | "form_start"
  | "phone_click"
  | "cta_click";

export interface ExperimentDef {
  /** Stable id — never reuse after a test concludes. */
  id: string;
  /** Position in the sequential queue. 1 = runs first. */
  order: number;
  /** Only ONE experiment may be "running" at any time. */
  status: ExperimentStatus;
  /** What is being tested, for the readout. */
  hypothesis: string;
  /** Human labels for the readout. */
  variants: Record<VariantKey, string>;
  /** The single metric this test is judged on. Secondary metrics are context only. */
  successMetric: SuccessMetric;
  /** Secondary metrics watched for damage, never for the ship decision. */
  guardrailMetrics: SuccessMetric[];
  /** Minimum days the test must run — covers weekday/weekend traffic mix. */
  minRunDays: number;
  /** Minimum conversions on the success metric PER VARIANT before reading. */
  minConversionsPerVariant: number;
  /** ISO date the test started. null while queued. */
  startedAt: string | null;
  /** Filled in when the test concludes, for the learning log. */
  outcome?: string;
}

/**
 * Sequential test queue. Add new tests as "queued"; when the running test
 * finishes, mark it "concluded" with an `outcome` and promote the next one.
 */
export const EXPERIMENTS = {
  home_hero_layout: {
    id: "home_hero_layout",
    order: 1,
    status: "running",
    hypothesis:
      "A text-led homepage hero (copy and CTA on a solid panel, photography reduced to a supporting column) gets the offer read and acted on faster than the current image-led hero, where copy sits over full-bleed photography.",
    variants: {
      a: "Image-led — full-bleed WNC roof photography, copy overlaid",
      b: "Text-led — solid panel with headline, offer and CTA; photo as a side column",
    },
    successMetric: "generate_lead",
    guardrailMetrics: ["form_start", "phone_click"],
    minRunDays: 14,
    minConversionsPerVariant: 60,
    startedAt: "2026-08-13",
  },
  home_hero_cta: {
    id: "home_hero_cta",
    order: 2,
    status: "queued",
    hypothesis:
      "Outcome-first CTA copy on the homepage hero converts better than the current process-first label.",
    variants: {
      a: "Get My Written Estimate",
      b: "See What My Roof Needs",
    },
    successMetric: "generate_lead",
    guardrailMetrics: ["cta_click"],
    minRunDays: 14,
    minConversionsPerVariant: 60,
    startedAt: null,
  },
  roof_repair_form_placement: {
    id: "roof_repair_form_placement",
    order: 3,
    status: "queued",
    hypothesis:
      "Putting the fast lead form directly in the roof repair hero beats the call-first hero for visitors who arrive outside office hours.",
    variants: {
      a: "Call-first hero, form below",
      b: "Form in the hero",
    },
    successMetric: "generate_lead",
    guardrailMetrics: ["phone_click"],
    minRunDays: 21,
    minConversionsPerVariant: 40,
    startedAt: null,
  },
} as const satisfies Record<string, ExperimentDef>;

export type ExperimentId = keyof typeof EXPERIMENTS;

/** The queue, ordered. Use this for the readout / admin panel. */
export function getExperimentQueue(): ExperimentDef[] {
  return (Object.values(EXPERIMENTS) as ExperimentDef[])
    .slice()
    .sort((a, b) => a.order - b.order);
}

/** The single test currently collecting data, if any. */
export function getRunningExperiment(): ExperimentDef | null {
  return getExperimentQueue().find((e) => e.status === "running") ?? null;
}

/** Next test to promote once the running one concludes. */
export function getNextQueuedExperiment(): ExperimentDef | null {
  return getExperimentQueue().find((e) => e.status === "queued") ?? null;
}

/** Days the running test has been live. */
export function daysRunning(def: ExperimentDef, now = new Date()): number {
  if (!def.startedAt) return 0;
  const start = new Date(`${def.startedAt}T00:00:00Z`).getTime();
  return Math.max(0, Math.floor((now.getTime() - start) / 86_400_000));
}

/**
 * Minimum-run-length gate. A test may only be read once BOTH the calendar
 * minimum and the per-variant conversion minimum are satisfied.
 */
export function isReadyToRead(
  def: ExperimentDef,
  conversions: { a: number; b: number },
  now = new Date(),
): { ready: boolean; reason: string } {
  const days = daysRunning(def, now);
  if (days < def.minRunDays) {
    return {
      ready: false,
      reason: `${def.minRunDays - days} more day(s) of runtime required (minimum ${def.minRunDays}).`,
    };
  }
  const short = Math.min(conversions.a, conversions.b);
  if (short < def.minConversionsPerVariant) {
    return {
      ready: false,
      reason: `${def.minConversionsPerVariant - short} more ${def.successMetric} conversion(s) needed on the smaller variant (minimum ${def.minConversionsPerVariant} each).`,
    };
  }
  return { ready: true, reason: "Minimum runtime and sample size met — safe to read." };
}

const STORAGE_PREFIX = "hl_ab_";

/** Ids whose variant came from a ?ab_ QA override — excluded from the readout. */
const qaForced = new Set<string>();

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
 * Always returns "a" on the server, for unknown ids, and for any test that is
 * queued or concluded — only the running test splits traffic.
 */
export function getVariant(id: ExperimentId): VariantKey {
  const def = EXPERIMENTS[id] as ExperimentDef | undefined;
  if (!def || def.status !== "running") return "a";
  if (typeof window === "undefined") return "a";

  const cached = assigned.get(id);
  if (cached) return cached;

  // ?ab_<id>=b forces a variant for QA without polluting the visitor pool.
  let variant: VariantKey | null = null;
  let forcedForQa = false;
  try {
    const forced = new URLSearchParams(window.location.search).get(`ab_${id}`);
    if (forced === "a" || forced === "b") {
      variant = forced;
      forcedForQa = true;
    }
  } catch {
    /* ignore */
  }

  if (!variant) variant = readStored(id);
  if (!variant) {
    variant = coinFlip();
    writeStored(id, variant);
  }
  if (forcedForQa) qaForced.add(id);

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
  if (typeof window === "undefined") return;
  
  // StrictMode or route-changes: Check if we already announced this in this session to avoid GTM bloat.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  const alreadyAnnounced = w.dataLayer.some(
    (item: any) => item.event === "experiment_view" && item.experiment_id === id
  );

  if (alreadyAnnounced || announced.has(id)) return;
  
  const def = EXPERIMENTS[id] as ExperimentDef | undefined;
  // Queued and concluded tests serve the control only — no impression, so the
  // readout never mixes real exposure with placeholder control traffic.
  if (!def || def.status !== "running") return;
  announced.add(id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "experiment_view",
    experiment_id: id,
    experiment_variant: variant,
    experiment_metric: def?.successMetric ?? null,
    experiment_qa: qaForced.has(id) || null,
    ...getActiveExperiments(),
  });
}

/** Convenience: pick a value by variant. */
export function variantValue<T>(variant: VariantKey, a: T, b: T): T {
  return variant === "b" ? b : a;
}
