import { PHONE_DISPLAY } from "@/data/business";
/**
 * Brand-voice microcopy: "High Authority, Low Fluff".
 *
 * Rules for every string in this file:
 *  - Say what happened, then say what to do next.
 *  - Never ship a bare "Something went wrong."
 *  - Always leave a human fallback: the office line.
 *  - No hype, no unsupported warranty claims, no 24/7 promises.
 */

export const PHONE_DISPLAY = `${PHONE_DISPLAY}`;
export const PHONE_TEL = "+18285247773";

/** Appended to failures so a lead always has a way through. */
export const CALL_FALLBACK = `Call ${PHONE_DISPLAY} and we'll take it from there.`;

export const microcopy = {
  loading: {
    submitting: "Sending your request…",
    saving: "Saving your details…",
    uploading: "Uploading your photos…",
    thinking: "Checking that for you…",
    loadingPage: "Loading…",
  },
  empty: {
    noResults: "No matches for that search. Try a town name or a service like “metal roofing”.",
    noProjects: "No projects posted for this area yet. Ask us for recent work nearby.",
    noPhotos: "No photos uploaded yet. Add up to 5 — they speed up your estimate.",
    noLeads: "No leads match these filters. Clear a filter or widen the date range.",
  },
  success: {
    leadSubmitted: "Request received. A Highlander project lead will contact you within one business day.",
    designSaved: "Design saved. You can reopen it from the link we emailed you.",
    fileUploaded: "Photos attached to your request.",
  },
} as const;

type ErrorContext = "lead" | "upload" | "save" | "chat";

const CONTEXT_LABEL: Record<ErrorContext, string> = {
  lead: "We couldn't send your request",
  upload: "That upload didn't finish",
  save: "We couldn't save that",
  chat: "The assistant couldn't answer that",
};

/**
 * Turns any thrown value into copy that names the failure and the next step.
 * Never returns "Something went wrong."
 */
export function actionableError(err: unknown, context: ErrorContext = "lead"): string {
  const raw = (err instanceof Error ? err.message : typeof err === "string" ? err : "").trim();
  const lower = raw.toLowerCase();
  const label = CONTEXT_LABEL[context];

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return `${label} — your device is offline. Reconnect and resend, or call ${PHONE_DISPLAY}.`;
  }
  if (lower.includes("failed to fetch") || lower.includes("networkerror") || lower.includes("network")) {
    return `${label} — the connection dropped. Try once more, or call ${PHONE_DISPLAY}.`;
  }
  if (lower.includes("timeout") || lower.includes("timed out") || lower.includes("aborted")) {
    return `${label} — the request timed out. Resend it, or call ${PHONE_DISPLAY}.`;
  }
  if (lower.includes("429") || lower.includes("rate limit") || lower.includes("too many")) {
    return `${label} — too many attempts in a row. Wait a minute and resend, or call ${PHONE_DISPLAY}.`;
  }
  if (lower.includes("file") || lower.includes("upload") || lower.includes("storage") || lower.includes("size")) {
    return `${label} — a photo was too large or in an unsupported format. Use JPG or PNG under 10 MB, or send it to ${PHONE_DISPLAY}.`;
  }
  if (lower.includes("email") || lower.includes("phone") || lower.includes("invalid") || lower.includes("required")) {
    return `${label} — check the highlighted fields and resend. Still stuck? Call ${PHONE_DISPLAY}.`;
  }
  // Known, human-written messages pass through with the fallback attached.
  if (raw && raw.length < 160 && /[a-z]/i.test(raw) && !lower.includes("something went wrong")) {
    return `${raw} ${CALL_FALLBACK}`;
  }
  return `${label} on our end. Nothing was lost — resend in a moment, or call ${PHONE_DISPLAY} now.`;
}

/** Short toast title paired with `actionableError` as the description. */
export function errorTitle(context: ErrorContext = "lead"): string {
  return CONTEXT_LABEL[context];
}
