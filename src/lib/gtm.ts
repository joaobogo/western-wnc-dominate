/**
 * Google Tag Manager dataLayer helpers.
 *
 * We do NOT install Google Ads, gtag, or any conversion IDs here.
 * All conversion tags are configured by the paid-media manager inside
 * GTM container GTM-W26D39LJ. This module only publishes cleanly
 * structured, PII-free events to window.dataLayer.
 *
 * Deduplication: every emitter uses a module-level guard (Set / flags)
 * so re-renders, double-clicks, and duplicate listeners cannot fire
 * the same event twice for the same underlying action.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

function push(event: AnyRecord) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(event);
}

function pagePath() {
  if (typeof window === "undefined") return "";
  return window.location.pathname + window.location.search;
}
function pageTitle() {
  return typeof document !== "undefined" ? document.title : "";
}

/** Resolve a human-readable click location by walking ancestors for
 *  a `data-gtm-location` attribute. Falls back to a generic label. */
function resolveClickLocation(el: Element | null): string {
  let node: Element | null = el;
  while (node) {
    const loc = node.getAttribute?.("data-gtm-location");
    if (loc) return loc;
    node = node.parentElement;
  }
  // Coarse fallback based on well-known landmarks.
  if (el?.closest("header")) return "header";
  if (el?.closest("footer")) return "footer";
  if (el?.closest("[data-sticky-cta]")) return "sticky_bar";
  return "content";
}

/* ---------- Phone / email ---------- */

export function trackPhoneClick(opts: {
  phone_number: string;
  link_url: string;
  click_location: string;
}) {
  push({
    event: "phone_click",
    phone_number: opts.phone_number,
    link_url: opts.link_url,
    page_path: pagePath(),
    page_title: pageTitle(),
    click_location: opts.click_location,
  });
}

export function trackEmailClick(opts: {
  link_url: string;
  click_location: string;
}) {
  push({
    event: "email_click",
    link_url: opts.link_url,
    page_path: pagePath(),
    page_title: pageTitle(),
    click_location: opts.click_location,
  });
}

/* ---------- Forms ---------- */

// Per-session dedup of form_start events keyed by stable form id/name.
const formStartFired = new Set<string>();
const formSuccessFired = new Set<string>();

export function trackFormStart(opts: {
  form_name: string;
  form_id: string;
  service_category?: string | null;
}) {
  const key = `${opts.form_id}::${opts.form_name}`;
  if (formStartFired.has(key)) return;
  formStartFired.add(key);
  push({
    event: "form_start",
    form_name: opts.form_name,
    form_id: opts.form_id,
    service_category: opts.service_category ?? null,
    page_path: pagePath(),
  });
}

export function trackFormSuccess(opts: {
  form_name: string;
  form_id: string;
  lead_type?: string | null;
  service_category?: string | null;
  property_town?: string | null;
  lead_id: string;
}) {
  // Dedup per lead_id — the same successful submission must never
  // produce two conversion events (protects against React StrictMode
  // double invokes and duplicate `.then` chains).
  if (formSuccessFired.has(opts.lead_id)) return;
  formSuccessFired.add(opts.lead_id);
  push({
    event: "form_submit_success",
    form_name: opts.form_name,
    form_id: opts.form_id,
    lead_type: opts.lead_type ?? null,
    service_category: opts.service_category ?? null,
    property_town: opts.property_town ?? null,
    page_path: pagePath(),
    lead_id: opts.lead_id,
  });
}

export function trackFormError(opts: {
  form_name: string;
  form_id: string;
  error_type: string;
}) {
  push({
    event: "form_submit_error",
    form_name: opts.form_name,
    form_id: opts.form_id,
    error_type: opts.error_type,
    page_path: pagePath(),
  });
}

/* ---------- CTAs ---------- */

export function trackRequestQuoteClick(opts: {
  click_location: string;
  destination_url: string;
}) {
  push({
    event: "request_quote_click",
    page_path: pagePath(),
    page_title: pageTitle(),
    click_location: opts.click_location,
    destination_url: opts.destination_url,
  });
}

export function trackRequestInspectionClick(opts: {
  click_location: string;
  destination_url: string;
}) {
  push({
    event: "request_inspection_click",
    page_path: pagePath(),
    page_title: pageTitle(),
    click_location: opts.click_location,
    destination_url: opts.destination_url,
  });
}

/* ---------- VELUX widget ---------- */

// Throttle duplicate fires from the vendor widget (shadow DOM can bubble the
// same activation as both a click on the anchor and on its inner span).
let lastVeluxClick = 0;

export function trackVeluxQuoteClick(opts: {
  variant: string;
  destination_url: string;
  cta_text: string;
}) {
  const now = Date.now();
  if (now - lastVeluxClick < 800) return;
  lastVeluxClick = now;

  const click_location = `velux_widget_${opts.variant}`;
  push({
    event: "velux_widget_cta_click",
    page_path: pagePath(),
    page_title: pageTitle(),
    click_location,
    widget_variant: opts.variant,
    cta_text: opts.cta_text,
    destination_url: opts.destination_url,
  });
  // Also emit the standard quote CTA event so existing conversion tags fire.
  trackRequestQuoteClick({
    click_location,
    destination_url: opts.destination_url,
  });
}

/* ---------- Chatbot ---------- */

let chatbotOpenFiredThisSession = false;
const chatbotLeadFired = new Set<string>();

export function trackChatbotOpen() {
  // One open event per browsing session is enough for conversion tags.
  if (chatbotOpenFiredThisSession) return;
  chatbotOpenFiredThisSession = true;
  push({
    event: "chatbot_open",
    page_path: pagePath(),
    page_title: pageTitle(),
  });
}

export function trackChatbotLeadSubmit(opts: {
  service_category?: string | null;
  property_town?: string | null;
  lead_id: string;
}) {
  if (chatbotLeadFired.has(opts.lead_id)) return;
  chatbotLeadFired.add(opts.lead_id);
  push({
    event: "chatbot_lead_submit",
    service_category: opts.service_category ?? null,
    property_town: opts.property_town ?? null,
    page_path: pagePath(),
    lead_id: opts.lead_id,
  });
}

/* ---------- Global delegated listeners ---------- */

let listenersInstalled = false;

/**
 * Sends a Teams alert when a visitor taps a click-to-call link.
 * Throttled to once every 10 minutes per session so a single caller who taps
 * a few times doesn't spam the channel. Fire-and-forget.
 */
function notifyTeamsOfCall(opts: { phone_number: string; click_location: string }) {
  if (typeof window === "undefined") return;
  try {
    const last = Number(window.sessionStorage.getItem("hl_call_notified") || 0);
    if (Date.now() - last < 10 * 60 * 1000) return;
    window.sessionStorage.setItem("hl_call_notified", String(Date.now()));
  } catch {
    /* ignore */
  }
  void import("@/integrations/supabase/client")
    .then(({ supabase }) =>
      supabase.functions.invoke("teams-notify", {
        body: {
          event: "phone_click",
          phone_number: opts.phone_number,
          click_location: opts.click_location,
          page_url: window.location.href,
        },
      }),
    )
    .catch((err) => console.warn("teams-notify (call) invoke failed:", err));
}

/**
 * One-time installer for global click / focus listeners.
 *
 * - `tel:` links → phone_click
 * - `mailto:` links → email_click
 * - Elements with `data-gtm-cta="request_quote"` → request_quote_click
 * - Elements with `data-gtm-cta="request_inspection"` → request_inspection_click
 * - First interaction with any <form> field → form_start
 */
export function installGtmGlobalListeners() {
  if (listenersInstalled || typeof document === "undefined") return;
  listenersInstalled = true;

  document.addEventListener(
    "click",
    (ev) => {
      const target = ev.target as Element | null;
      if (!target) return;

      // CTA data attribute takes precedence.
      const ctaEl = target.closest?.("[data-gtm-cta]") as HTMLElement | null;
      if (ctaEl) {
        const cta = ctaEl.getAttribute("data-gtm-cta");
        const dest =
          ctaEl.getAttribute("href") ||
          ctaEl.getAttribute("data-gtm-destination") ||
          pagePath();
        const loc = resolveClickLocation(ctaEl);
        if (cta === "request_quote") {
          trackRequestQuoteClick({ click_location: loc, destination_url: dest });
        } else if (cta === "request_inspection") {
          trackRequestInspectionClick({ click_location: loc, destination_url: dest });
        }
        // Do not return: a CTA can also be a tel: link.
      }

      const anchor = target.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        const rawNumber = href.replace(/^tel:/i, "").replace(/[^0-9+]/g, "");
        const display = anchor.textContent?.trim() || rawNumber;
        trackPhoneClick({
          phone_number: display,
          link_url: href,
          click_location: resolveClickLocation(anchor),
        });
        notifyTeamsOfCall({
          phone_number: rawNumber || display,
          click_location: resolveClickLocation(anchor),
        });
      } else if (href.startsWith("mailto:")) {
        trackEmailClick({
          link_url: href,
          click_location: resolveClickLocation(anchor),
        });
      }
    },
    { capture: true },
  );

  // form_start: first focus/input inside any <form>
  const onFormInteraction = (ev: Event) => {
    const target = ev.target as Element | null;
    if (!target) return;
    const field = target as HTMLElement;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) {
      return;
    }
    const form = field.closest("form") as HTMLFormElement | null;
    if (!form) return;
    const form_name =
      form.getAttribute("data-gtm-form-name") ||
      form.getAttribute("name") ||
      form.id ||
      "unnamed_form";
    const form_id =
      form.getAttribute("data-gtm-form-id") || form.id || form_name;
    const service_category =
      form.getAttribute("data-gtm-service-category") || undefined;
    trackFormStart({ form_name, form_id, service_category });
  };
  document.addEventListener("focusin", onFormInteraction, { capture: true });
  document.addEventListener("input", onFormInteraction, { capture: true });
}