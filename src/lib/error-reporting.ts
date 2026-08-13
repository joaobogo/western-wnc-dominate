/**
 * Centralized error reporting for Highlander Building Services.
 *
 * Every uncaught error, promise rejection, React render throw, and manually
 * caught exception should flow through `logError()`. It:
 *   1. Always writes to console with the raw Error (preserves stack in devtools)
 *   2. Emits a `client_error` analytics event to Supabase + GA + Meta
 *   3. Dedupes identical fingerprints within a 30s window (avoids spamming
 *      the analytics table when a broken render loops)
 *
 * Never throws — callers can wrap unsafe code without a second try/catch.
 */
import { trackEvent } from "./analytics";

export type ErrorContext = {
  /** Where in the app the error came from (component name, function, route). */
  source?: string;
  /** Free-form extra data — request payload, prop snapshot, etc. */
  extra?: Record<string, unknown>;
  /** Optional short label surfaced in analytics dashboards. */
  label?: string;
};

const DEDUPE_WINDOW_MS = 30_000;
const recentFingerprints = new Map<string, number>();

const truncate = (value: string, max = 500) =>
  value.length > max ? `${value.slice(0, max)}…` : value;

const buildFingerprint = (message: string, source?: string) =>
  `${source ?? "unknown"}::${message.slice(0, 120)}`;

const isDuplicate = (fingerprint: string) => {
  const now = Date.now();
  for (const [key, ts] of recentFingerprints) {
    if (now - ts > DEDUPE_WINDOW_MS) recentFingerprints.delete(key);
  }
  const prev = recentFingerprints.get(fingerprint);
  recentFingerprints.set(fingerprint, now);
  return prev !== undefined && now - prev < DEDUPE_WINDOW_MS;
};

const normalize = (err: unknown): { message: string; name: string; stack?: string } => {
  if (err instanceof Error) {
    return { message: err.message || err.name, name: err.name, stack: err.stack };
  }
  if (typeof err === "string") return { message: err, name: "StringError" };
  try {
    return { message: JSON.stringify(err) || String(err), name: "UnknownError" };
  } catch {
    return { message: String(err), name: "UnknownError" };
  }
};

export function logError(err: unknown, ctx: ErrorContext = {}): void {
  try {
    const { message, name, stack } = normalize(err);
    // Always surface in the console with the original error so devtools keeps
    // its rich stack trace and source-map linking.
    console.error(`[error:${ctx.source ?? "app"}]`, err);

    const fingerprint = buildFingerprint(message, ctx.source);
    if (isDuplicate(fingerprint)) return;

    void trackEvent("client_error", {
      label: ctx.label ?? name,
      metadata: {
        source: ctx.source,
        name,
        message: truncate(message),
        stack: stack ? truncate(stack, 2000) : undefined,
        ...(ctx.extra ?? {}),
      },
    });
  } catch {
    // Reporting must never throw.
  }
}

/**
 * Wrap an async function so any rejection is logged and swallowed. Returns
 * `undefined` on failure. Use for fire-and-forget side effects.
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  ctx: ErrorContext = {},
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (err) {
    logError(err, ctx);
    return undefined;
  }
}

/**
 * Install global listeners for uncaught errors and unhandled rejections.
 * Idempotent — safe to call more than once.
 */
let installed = false;
export function installGlobalErrorHandlers(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    // Ignore ResizeObserver noise (benign, non-actionable) and cross-origin
    // script errors that browsers surface without any context.
    const msg = event.message || "";
    if (msg.includes("ResizeObserver loop")) return;
    if (msg === "Script error." && !event.error) return;

    logError(event.error ?? new Error(msg), {
      source: "window.error",
      extra: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    logError(event.reason, { source: "unhandledrejection" });
  });
}