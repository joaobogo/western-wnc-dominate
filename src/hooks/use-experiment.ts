import { useEffect, useState } from "react";
import {
  announceVariant,
  getVariant,
  variantValue,
  type ExperimentId,
  type VariantKey,
} from "@/lib/ab-testing";

/**
 * Stable per-visitor variant for an experiment, announced once to GTM.
 *
 * The first render is ALWAYS the control ("a"), which is what the prerendered
 * HTML contains. The stored variant is applied after mount. Reading
 * localStorage during render produced React #418/#423 hydration errors on every
 * home load for "b" visitors (mobile re-audit H-3) — each one logged as a fake
 * "conversion" event and triggered a full client re-render that re-fetched
 * the gallery images. A one-frame switch for "b" visitors is the trade.
 */
export function useExperiment(id: ExperimentId): {
  variant: VariantKey;
  isControl: boolean;
  pick: <T>(a: T, b: T) => T;
} {
  const [variant, setVariant] = useState<VariantKey>("a");

  useEffect(() => {
    const assigned = getVariant(id);
    setVariant(assigned);
    announceVariant(id, assigned);
  }, [id]);

  return {
    variant,
    isControl: variant === "a",
    pick: <T,>(a: T, b: T) => variantValue(variant, a, b),
  };
}