/**
 * Client-side idempotency for lead submissions.
 *
 * Every submission gets a stable key derived from the form + the contact data.
 * If the same key is submitted again inside the 10-minute window (double click,
 * refresh + resubmit, retry after a flaky network), we reuse the original lead
 * id instead of creating a second lead and a second CRM record.
 */

export const IDEMPOTENCY_WINDOW_MS = 10 * 60_000;
const STORE_KEY = "hr_lead_idem_v1";

type Entry = { key: string; lead_id: string | null; ts: number };

function readStore(): Record<string, Entry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, Entry>) : {};
    const now = Date.now();
    // Drop anything outside the window so the store never grows unbounded.
    return Object.fromEntries(
      Object.entries(parsed).filter(([, v]) => now - (v?.ts ?? 0) < IDEMPOTENCY_WINDOW_MS),
    );
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, Entry>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* storage disabled — idempotency degrades to per-request only */
  }
}

/** Stable, non-cryptographic hash of the submission's identifying fields. */
export function fingerprintSubmission(parts: Array<string | null | undefined>): string {
  const input = parts.map((p) => (p ?? "").toString().trim().toLowerCase()).join("|");
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
    h2 = Math.imul(h2 + c, 2654435761) >>> 0;
  }
  return `${h1.toString(36)}${h2.toString(36)}`;
}

export function randomKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Returns the idempotency key for this submission.
 * `duplicate` is true when the identical submission was already stored inside
 * the window — the caller should skip the insert and reuse `lead_id`.
 */
export function resolveIdempotency(fingerprint: string): {
  key: string;
  duplicate: boolean;
  lead_id: string | null;
} {
  const store = readStore();
  const existing = store[fingerprint];
  if (existing && Date.now() - existing.ts < IDEMPOTENCY_WINDOW_MS) {
    return { key: existing.key, duplicate: true, lead_id: existing.lead_id };
  }
  const key = randomKey();
  store[fingerprint] = { key, lead_id: null, ts: Date.now() };
  writeStore(store);
  return { key, duplicate: false, lead_id: null };
}

/** Records the lead id once the durable write succeeded. */
export function rememberSubmission(fingerprint: string, key: string, leadId: string | null) {
  const store = readStore();
  store[fingerprint] = { key, lead_id: leadId, ts: Date.now() };
  writeStore(store);
}

/** Clears the entry so a genuinely new attempt is allowed after a failure. */
export function forgetSubmission(fingerprint: string) {
  const store = readStore();
  delete store[fingerprint];
  writeStore(store);
}
