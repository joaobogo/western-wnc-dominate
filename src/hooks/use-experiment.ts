import { useEffect, useMemo } from "react";
import {
  announceVariant,
  getVariant,
  variantValue,
  type ExperimentId,
  type VariantKey,
} from "@/lib/ab-testing";

/**
 * Stable per-visitor variant for an experiment, announced once to GTM.
 * Assignment is synchronous so there is no flicker between variants.
 */
export function useExperiment(id: ExperimentId): {
  variant: VariantKey;
  isControl: boolean;
  pick: <T>(a: T, b: T) => T;
} {
  const variant = useMemo(() => getVariant(id), [id]);

  useEffect(() => {
    announceVariant(id, variant);
  }, [id, variant]);

  return {
    variant,
    isControl: variant === "a",
    pick: <T,>(a: T, b: T) => variantValue(variant, a, b),
  };
}