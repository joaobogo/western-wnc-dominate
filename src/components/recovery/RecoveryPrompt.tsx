import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Phone, X } from "lucide-react";
import {
  trackExitIntentShown,
  trackExitIntentDismissed,
  trackExitIntentConversion,
  trackFormSuccess,
} from "@/lib/gtm";
import { normalizePhoneE164 } from "@/lib/lead-validation";
import { getAnalyticsPageType, getTownSlugFromPath } from "@/lib/urgent-intent";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/microcopy";
import { fieldAttrs } from "@/lib/field-ergonomics";

const SESSION_KEY = "hl_recovery_prompt_seen";

/** Pages where a recovery prompt is worth the interruption. */
function isHighIntentPath(pathname: string): boolean {
  const type = getAnalyticsPageType(pathname);
  return ["home", "service_roofing", "service_construction", "storm", "town", "town_service"].includes(type);
}

/** A visitor typing in a form should never be interrupted. */
function isMidForm(): boolean {
  const el = document.activeElement as HTMLElement | null;
  if (el && /^(input|textarea|select)$/i.test(el.tagName)) return true;
  return Array.from(document.querySelectorAll<HTMLInputElement>("form input, form textarea")).some(
    (i) => i.type !== "hidden" && i.value.trim().length > 0,
  );
}

const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

/**
 * Single, dismissible recovery prompt (CRO Prompt 39).
 *
 * Triggers: desktop pointer-exit through the top of the viewport, or 75%
 * scroll depth on high-intent pages. Shows at most once per session, never
 * on mobile while a form is being filled, and offers a two-field callback.
 */
const RecoveryPrompt = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState("pointer_exit_top");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const shownRef = useRef(false);
  const mountedAt = useRef(Date.now());

  const eligible = isHighIntentPath(pathname);

  const show = useCallback(
    (why: string) => {
      if (shownRef.current) return;
      if (Date.now() - mountedAt.current < 5000) return;
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return;
      } catch { /* storage blocked — still cap per page load */ }
      if (isMobile() && isMidForm()) return;
      shownRef.current = true;
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
      setTrigger(why);
      setOpen(true);
      trackExitIntentShown({ trigger: why });
    },
    [],
  );

  // Desktop exit intent
  useEffect(() => {
    if (!eligible || isMobile()) return;
    const onMouseOut = (ev: MouseEvent) => {
      if (ev.clientY <= 0 && !ev.relatedTarget) show("pointer_exit_top");
    };
    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, [eligible, show]);

  // 75% scroll depth
  useEffect(() => {
    if (!eligible) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= 0.75) show("scroll_75");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [eligible, show]);

  const dismiss = () => {
    setOpen(false);
    if (!done) trackExitIntentDismissed({ trigger });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (cleanName.length < 2) { setError("Please add your name so we know who to ask for."); return; }
    const p = normalizePhoneE164(phone);
    if (p.ok !== true) { setError(p.error); return; }
    setError(null);
    setSending(true);

    const { submitLead } = await import("@/lib/leads");
    const result = await submitLead({
      source: "recovery_prompt",
      lead_type: "callback_request",
      full_name: cleanName,
      phone: p.e164,
      property_town: getTownSlugFromPath(pathname),
      property_state: "NC",
      project_description: `Callback request from recovery prompt (${trigger}) on ${pathname}`,
      source_context: `recovery_prompt:${getAnalyticsPageType(pathname)}`,
    }).catch((err) => {
      console.error("RecoveryPrompt submitLead failed:", err);
      return { id: null, error: err } as const;
    });

    if (result && "error" in result && result.error) {
      setSending(false);
      setError(`We couldn't send that just now — call us at ${PHONE_DISPLAY} and we'll take it directly.`);
      return;
    }

    const leadId = (result as { id?: string | null })?.id ?? null;
    setSending(false);
    setDone(true);
    trackExitIntentConversion({ trigger, lead_id: leadId, property_town: getTownSlugFromPath(pathname) });
    if (leadId) {
      trackFormSuccess({
        form_name: "Recovery Callback",
        form_id: "recovery_prompt",
        lead_type: "callback_request",
        lead_id: leadId,
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-foreground/50 px-4 pb-4 sm:pb-0" role="presentation" onClick={dismiss}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="recovery-prompt-title"
        className="relative w-full max-w-md rounded-sm bg-background border border-border shadow-floating p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 p-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {done ? (
          <div>
            <h2 id="recovery-prompt-title" className="font-heading text-2xl text-foreground">Got it — we'll call you.</h2>
            <p className="mt-2 font-body text-body-sm text-muted-foreground">
              A Highlander estimator will reach out during office hours. Need us sooner? Call {PHONE_DISPLAY}.
            </p>
            <button type="button" onClick={() => setOpen(false)} className="mt-5 font-body font-semibold text-body-sm underline">
              Back to the site
            </button>
          </div>
        ) : (
          <>
            <h2 id="recovery-prompt-title" className="font-heading text-2xl text-foreground pr-8">
              Want us to call you instead?
            </h2>
            <p className="mt-2 font-body text-body-sm text-muted-foreground">
              Two fields. A local estimator calls you back — no forms to finish, no pressure.
            </p>
            <form onSubmit={submit} className="mt-5 space-y-3" noValidate>
              <div>
                <label htmlFor="recovery-name" className="sr-only">Your name</label>
                <input
                  id="recovery-name"
                  {...fieldAttrs.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="recovery-phone" className="sr-only">Phone number</label>
                <input
                  id="recovery-phone"
                  {...fieldAttrs.phoneLast}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="field-input"
                />
              </div>
              {error && <p className="font-body text-body-xs text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="btn btn-primary btn-md btn-block"
              >
                {sending ? "Sending…" : "Request a callback"}
              </button>
            </form>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-4 inline-flex items-center gap-2 font-body font-semibold text-body-sm text-foreground"
              data-gtm-location="recovery_prompt"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Or call {PHONE_DISPLAY}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default RecoveryPrompt;
