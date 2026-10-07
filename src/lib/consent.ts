/**
 * Consent-aware third-party script gate.
 *
 * Categories:
 *   • essential   — always on (site chrome, security). Not stored.
 *   • functional  — VELUX skylight embed.
 *   • analytics   — GTM / GA4 measurement storage.
 *   • marketing   — Meta Pixel, TikTok Pixel, ad storage.
 *
 * Defaults live in index.html (Consent Mode v2, opt-out model: every category
 * is granted on load and only an explicit "Opt out" from the cookie notice
 * turns analytics/marketing off). This module is the single writer of that state.
 */

import { trackConsentUpdate } from "./gtm";

export const CONSENT_STORAGE_KEY = "hl_consent_v1";

export interface ConsentState {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the visitor's decision. */
  decidedAt: string;
}

type W = Window & {
  __hlConsent?: ConsentState | null;
  __hlApplyConsent?: (state: ConsentState) => void;
};

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

/** Opt-out model: a category is allowed unless the visitor explicitly turned it off. */
export function hasConsent(category: keyof Omit<ConsentState, "decidedAt">): boolean {
  return readConsent()?.[category] !== false;
}

/** Persist a decision, update Consent Mode, and release gated loaders. */
export function saveConsent(choice: Partial<Omit<ConsentState, "decidedAt">>): ConsentState {
  const state: ConsentState = {
    functional: choice.functional ?? true,
    analytics: choice.analytics ?? true,
    marketing: choice.marketing ?? true,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode — state stays in memory for this session only.
  }
  const w = window as W;
  w.__hlConsent = state;
  w.__hlApplyConsent?.(state);
  trackConsentUpdate(state);
  window.dispatchEvent(new CustomEvent("hl:consent", { detail: state }));
  return state;
}

export const acceptAllConsent = () =>
  saveConsent({ functional: true, analytics: true, marketing: true });

export const rejectNonEssentialConsent = () =>
  saveConsent({ functional: true, analytics: false, marketing: false });

/** Subscribe to consent changes (banner choices). Returns an unsubscribe fn. */
export function onConsentChange(cb: (state: ConsentState) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentState>).detail);
  window.addEventListener("hl:consent", handler);
  return () => window.removeEventListener("hl:consent", handler);
}

/** Reopen the cookie notice so a visitor can change an earlier choice at any time. */
export function openConsentPreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("hl:consent-open"));
}
