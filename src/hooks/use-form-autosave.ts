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

/** True when a value holds something the visitor typed or picked. */
const filled = (v: unknown): boolean => {
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.some(filled);
  if (v && typeof v === "object") return Object.values(v).some(filled);
  return false;
};

/**
 * Fields that differ from the form's starting values and hold something.
 * Starting values can be pre-filled by the page (service type, town), so a
 * draft only counts when the visitor changed a field. Nov 2026 audit: an
 * untouched form saved a blank draft, and the next form in the session said
 * "We saved your answers from earlier" over empty fields.
 */
export function hasVisitorInput<T extends Record<string, unknown>>(data: T, initial: T): boolean {
  return Object.keys(data).some((k) => filled(data[k]) && JSON.stringify(data[k]) !== JSON.stringify(initial?.[k]));
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
  // The form's values on first render: the baseline a draft is compared with.
  const initialRef = useRef(data);

  // Restore once, before the first save runs. A draft with nothing the
  // visitor entered is dropped, and the "saved your answers" note only shows
  // when something was actually put back.
  useEffect(() => {
    if (!enabled) return;
    const draft = readDraft<T>(key, ttlMs);
    if (!draft || !draft.data) return;
    if (!hasVisitorInput(draft.data, initialRef.current)) {
      clearDraft(key);
      return;
    }
    if (restoreRef.current) {
      restoreRef.current(draft.data, draft.step);
      setRestored(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setTimeout(() => {
      try {
        // Save only once the visitor has entered something; clear a draft
        // they emptied again.
        if (!hasVisitorInput(data, initialRef.current)) {
          window.sessionStorage.removeItem(PREFIX + key);
          return;
        }
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
