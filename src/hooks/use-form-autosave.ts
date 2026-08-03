import { useEffect, useRef, useState } from "react";

/**
 * Persists in-progress form answers to sessionStorage so a refresh, an
 * accidental back-navigation, or a mobile tab eviction never loses input.
 *
 * Values are namespaced per form key and expire after `ttlMs` (default 6h)
 * so a stale draft never resurfaces days later. Nothing is written to
 * localStorage and nothing leaves the browser.
 */
const PREFIX = "hl:draft:";
const DEFAULT_TTL = 6 * 60 * 60 * 1000;

type Draft<T> = { v: 1; at: number; data: T; step?: number };

export function readDraft<T>(key: string, ttlMs = DEFAULT_TTL): Draft<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Draft<T>;
    if (!parsed || parsed.v !== 1 || typeof parsed.at !== "number") return null;
    if (Date.now() - parsed.at > ttlMs) {
      window.sessionStorage.removeItem(PREFIX + key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearDraft(key: string) {
  try {
    window.sessionStorage.removeItem(PREFIX + key);
  } catch {
    /* storage disabled — nothing to clear */
  }
}

/**
 * Restores a saved draft on mount and keeps writing subsequent changes.
 * Returns the restored step (or the fallback) plus a `clear()` to call
 * once the lead has been submitted.
 */
export function useFormAutosave<T extends Record<string, unknown>>(
  key: string,
  data: T,
  options: {
    step?: number;
    enabled?: boolean;
    ttlMs?: number;
    onRestore?: (data: T, step: number | undefined) => void;
  } = {},
) {
  const { step, enabled = true, ttlMs = DEFAULT_TTL, onRestore } = options;
  const [restored, setRestored] = useState(false);
  const restoreRef = useRef(onRestore);
  restoreRef.current = onRestore;

  // Restore once, before the first save runs.
  useEffect(() => {
    if (!enabled) return;
    const draft = readDraft<T>(key, ttlMs);
    if (draft && draft.data && restoreRef.current) {
      restoreRef.current(draft.data, draft.step);
      setRestored(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setTimeout(() => {
      try {
        const payload: Draft<T> = { v: 1, at: Date.now(), data, step };
        window.sessionStorage.setItem(PREFIX + key, JSON.stringify(payload));
      } catch {
        /* quota or private mode — autosave is best-effort */
      }
    }, 250);
    return () => window.clearTimeout(id);
  }, [key, data, step, enabled]);

  return { restored, clear: () => clearDraft(key) };
}
