import { getAnalyticsPageType, getTownSlugFromPath, isUrgentIntentPath } from "@/lib/urgent-intent";
import { getActiveExperiments } from "@/lib/ab-testing";
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

/**
 * Canonical dataLayer event map. Every event this app can publish is listed
 * here once, so the GTM container and the codebase stay in sync. Never push a
 * raw string literal — reference `GTM_EVENTS.*` instead.
 */
export const GTM_EVENTS = {
  // Navigation
  PAGE_VIEW: "page_view",
  // Contact intent
  PHONE_CLICK: "phone_click",
  EMAIL_CLICK: "email_click",
  CTA_CLICK: "cta_click",
  REQUEST_QUOTE_CLICK: "request_quote_click",
  REQUEST_INSPECTION_CLICK: "request_inspection_click",
  PRIMARY_CTA_CLICK: "primary_cta_click",
  // Forms
  FORM_START: "form_start",
  FORM_STEP_COMPLETE: "form_step_complete",
  FORM_SUCCESS: "form_success",
  FORM_ERROR: "form_error",
  GENERATE_LEAD: "generate_lead",
  // Content engagement
  TOWN_FAQ_OPEN: "town_faq_open",
  TOWN_FAQ_CONVERSION_INTENT: "town_faq_conversion_intent",
  // Gallery / project proof
  GALLERY_PROJECT_OPEN: "gallery_project_open",
  GALLERY_CTA_CLICK: "gallery_cta_click",
  SCROLL_DEPTH: "scroll_depth",
  SCROLL_75: "scroll_75",
  EXIT_INTENT_SHOWN: "exit_intent_shown",
  EXIT_INTENT_DISMISSED: "exit_intent_dismissed",
  EXIT_INTENT_CONVERSION: "exit_intent_conversion",
  // Partner widgets
  VELUX_QUOTE_CLICK: "velux_quote_click",
  // Chatbot
  CHATBOT_OPEN: "chatbot_open",
  CHATBOT_LEAD_SUBMIT: "chatbot_lead_submit",
  // Consent
  CONSENT_UPDATE: "consent_update",
} as const;

export type GtmEventName = (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

/* ---------- Page context (attached to EVERY event) ----------
 * Every dataLayer event carries page_type / town / service so GTM can slice
 * any conversion by local page without extra tags. Values are derived from
 * the URL and stay PII-free.
 */

const TOWN_SERVICE_RE =
  /^\/([a-z0-9-]+?)-(roofing|roof-repair|roof-replacement|metal-roofing|gutters|siding)-(nc|[a-z0-9-]+)$/;

export interface PageContext {
  page_type: string;
  town: string | null;
  service: string | null;
}

export function getPageContext(pathnameArg?: string): PageContext {
  const raw =
    pathnameArg ??
    (typeof window === "undefined" ? "/" : window.location.pathname);
  const path = raw.replace(/\/+$/, "") || "/";

  let town: string | null = null;
  let service: string | null = null;
  let page_type = "other";

  if (path === "/") page_type = "home";
  else if (path.startsWith("/service-areas/")) {
    page_type = "town";
    town = path.split("/")[2] || null;
  } else if (path.startsWith("/counties/")) {
    page_type = "county";
  } else if (path.startsWith("/roofing")) {
    page_type = "service";
    service = path.split("/")[2] || "roofing";
  } else if (path.startsWith("/construction")) {
    page_type = "service";
    service = path.split("/")[2] || "construction";
  } else if (path.startsWith("/blog")) page_type = "blog";
  else if (path.startsWith("/storm-center")) {
    page_type = "service";
    service = "storm-damage";
  } else if (/intake|consultation|request-inspection|contact/.test(path)) {
    page_type = "conversion";
  }

  const m = TOWN_SERVICE_RE.exec(path);
  if (m) {
    page_type = "town_service";
    town = m[1];
    service = m[2];
  }

  return { page_type, town, service };
}

function push(event: AnyRecord) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  const ctx = getPageContext();
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    page_type: ctx.page_type,
    town: ctx.town,
    service: ctx.service,
    // Any active A/B assignment rides along so conversions are attributable.
    ...getActiveExperiments(),
    ...event,
    // A null town/service on the event must not erase page-derived context.
    ...(event.town == null && ctx.town ? { town: ctx.town } : {}),
    ...(event.service == null && ctx.service ? { service: ctx.service } : {}),
  });
}

function currentPath() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
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

/** Walk ancestors for `data-gtm-town` (town slug) so any click inside a
 *  town-scoped block is attributed to that town. */
function resolveTown(el: Element | null): string | null {
  let node: Element | null = el;
  while (node) {
    const t = node.getAttribute?.("data-gtm-town");
    if (t) return t;
    node = node.parentElement;
  }
  return null;
}

/* ---------- CTA position ----------
 * Every cta_click carries WHERE on the page the click happened so CRO tests
 * can compare hero vs mid-page vs closing CTA performance:
 *   - `cta_position`: explicit `data-gtm-position` if present, otherwise a
 *     fold bucket derived from the element's offset (above_fold / mid_page /
 *     page_bottom / sticky_bar).
 *   - `cta_viewport_pct`: how far down the document the CTA sits (0-100).
 */
export function resolveCtaPosition(el: Element | null): {
  cta_position: string;
  cta_viewport_pct: number | null;
} {
  if (!el || typeof window === "undefined") return { cta_position: "unknown", cta_viewport_pct: null };

  let node: Element | null = el;
  while (node) {
    const explicit = node.getAttribute?.("data-gtm-position");
    if (explicit) return { cta_position: explicit, cta_viewport_pct: null };
    node = node.parentElement;
  }

  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  if (style.position === "fixed" || el.closest("[data-sticky-cta]")) {
    return { cta_position: "sticky_bar", cta_viewport_pct: null };
  }

  const docHeight = Math.max(document.documentElement.scrollHeight, 1);
  const absoluteTop = rect.top + window.scrollY;
  const pct = Math.min(100, Math.max(0, Math.round((absoluteTop / docHeight) * 100)));

  let bucket = "mid_page";
  if (absoluteTop < window.innerHeight) bucket = "above_fold";
  else if (pct >= 80) bucket = "page_bottom";

  return { cta_position: bucket, cta_viewport_pct: pct };
}

/* ---------- Town-scoped source attribution ----------
 * A visitor who taps a CTA inside a town FAQ block usually converts on the
 * next page (the form). We stash the originating context in sessionStorage so
 * the eventual form_submit_success can be credited back to that FAQ section.
 */

const CTA_SOURCE_KEY = "hl_cta_source";
const CTA_SOURCE_TTL_MS = 30 * 60 * 1000;

export type CtaSource = {
  context: string;
  town: string | null;
  page_path: string;
  at: number;
};

export function recordCtaSource(source: Omit<CtaSource, "at">) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      CTA_SOURCE_KEY,
      JSON.stringify({ ...source, at: Date.now() } satisfies CtaSource),
    );
  } catch {
    /* storage unavailable — analytics only, safe to ignore */
  }
}

export function getCtaSource(): CtaSource | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CTA_SOURCE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CtaSource;
    if (!parsed?.context || Date.now() - parsed.at > CTA_SOURCE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

/* ---------- Town FAQ engagement ---------- */

const townFaqOpenFired = new Set<string>();

/** Fires once per town+question when a visitor expands a town FAQ item. */
export function trackTownFaqOpen(opts: { town: string; question: string; position: number }) {
  const key = `${opts.town}::${opts.question}`;
  if (townFaqOpenFired.has(key)) return;
  townFaqOpenFired.add(key);
  push({
    event: "town_faq_open",
    town: opts.town,
    faq_question: opts.question,
    faq_position: opts.position,
    page_path: pagePath(),
    page_title: pageTitle(),
  });
}

/** Conversion-intent click that originated inside a town FAQ section. */
export function trackTownFaqConversionIntent(opts: {
  town: string;
  intent: "call" | "form";
  destination_url: string;
  cta_text?: string;
}) {
  push({
    event: "town_faq_conversion_intent",
    town: opts.town,
    intent: opts.intent,
    destination_url: opts.destination_url,
    cta_text: opts.cta_text ?? null,
    page_path: pagePath(),
    page_title: pageTitle(),
  });
}

/* ---------- Phone / email ---------- */

export function trackPhoneClick(opts: {
  phone_number: string;
  link_url: string;
  click_location: string;
  town?: string | null;
  page_type?: string | null;
}) {
  push({
    event: "phone_click",
    town: opts.town ?? getTownSlugFromPath(currentPath()),
    page_type: opts.page_type ?? getAnalyticsPageType(currentPath()),
    urgent_intent: isUrgentIntentPath(currentPath()),
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
  const source = getCtaSource();
  push({
    event: "form_submit_success",
    source_context: source?.context ?? null,
    source_town: source?.town ?? null,
    source_page_path: source?.page_path ?? null,
    form_name: opts.form_name,
    form_id: opts.form_id,
    lead_type: opts.lead_type ?? null,
    service_category: opts.service_category ?? null,
    property_town: opts.property_town ?? null,
    page_path: pagePath(),
    lead_id: opts.lead_id,
  });
  trackGenerateLead({
    lead_id: opts.lead_id,
    lead_source: opts.form_id || opts.form_name,
    lead_type: opts.lead_type ?? null,
    service_category: opts.service_category ?? null,
    property_town: opts.property_town ?? null,
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

/** Generic CTA click. Fires for every tracked CTA (including the specialised
 *  quote/inspection/phone events) so GTM has one funnel-wide click event.
 *  `cta_location` is the block the CTA lives in (hero, sticky_bar, footer…). */
export function trackCtaClick(opts: {
  cta_location: string;
  cta_text?: string | null;
  cta_type?: string | null;
  destination_url: string;
  town?: string | null;
  /** Where on the page the CTA sits: above_fold | mid_page | page_bottom | sticky_bar | custom. */
  cta_position?: string | null;
  cta_viewport_pct?: number | null;
}) {
  push({
    event: GTM_EVENTS.CTA_CLICK,
    cta_location: opts.cta_location,
    cta_text: opts.cta_text ?? null,
    cta_type: opts.cta_type ?? null,
    cta_position: opts.cta_position ?? null,
    cta_viewport_pct: opts.cta_viewport_pct ?? null,
    destination_url: opts.destination_url,
    town: opts.town ?? null,
    page_path: pagePath(),
    page_title: pageTitle(),
  });
}

/* ---------- Gallery / project proof ---------- */

/** A visitor opened a project card or lightbox in any gallery. */
export function trackGalleryProjectOpen(opts: {
  gallery: string;
  project_title: string;
  project_location?: string | null;
  project_category?: string | null;
  position: number;
}) {
  push({
    event: GTM_EVENTS.GALLERY_PROJECT_OPEN,
    gallery: opts.gallery,
    project_title: opts.project_title,
    project_location: opts.project_location ?? null,
    project_category: opts.project_category ?? null,
    cta_position: `gallery_item_${opts.position + 1}`,
    page_path: pagePath(),
    page_title: pageTitle(),
  });
}

/** A CTA inside a gallery / project block was clicked. Also emits cta_click. */
export function trackGalleryCtaClick(opts: {
  gallery: string;
  cta_text: string;
  destination_url: string;
  project_title?: string | null;
  town?: string | null;
  cta_position?: string | null;
}) {
  push({
    event: GTM_EVENTS.GALLERY_CTA_CLICK,
    gallery: opts.gallery,
    cta_text: opts.cta_text,
    destination_url: opts.destination_url,
    project_title: opts.project_title ?? null,
    town: opts.town ?? null,
    cta_position: opts.cta_position ?? "gallery",
    page_path: pagePath(),
    page_title: pageTitle(),
  });
  trackCtaClick({
    cta_location: opts.gallery,
    cta_text: opts.cta_text,
    cta_type: "gallery",
    destination_url: opts.destination_url,
    town: opts.town ?? null,
    cta_position: opts.cta_position ?? "gallery",
  });
}

/** Multi-step intake progression. Deduped per form + step per session. */
const formStepFired = new Set<string>();
export function trackFormStepComplete(opts: {
  form_name: string;
  form_id: string;
  step_index: number;
  step_name?: string | null;
  total_steps?: number | null;
}) {
  const key = `${opts.form_id}::${opts.step_index}`;
  if (formStepFired.has(key)) return;
  formStepFired.add(key);
  push({
    event: GTM_EVENTS.FORM_STEP_COMPLETE,
    form_name: opts.form_name,
    form_id: opts.form_id,
    step_index: opts.step_index,
    step_number: opts.step_index + 1,
    step_name: opts.step_name ?? null,
    total_steps: opts.total_steps ?? null,
    page_path: pagePath(),
  });
}

/** Canonical conversion event. Deduped per lead_id for the whole session. */
const generateLeadFired = new Set<string>();
export function trackGenerateLead(opts: {
  lead_id: string;
  lead_source: string;
  lead_type?: string | null;
  service_category?: string | null;
  property_town?: string | null;
  value?: number | null;
}) {
  if (generateLeadFired.has(opts.lead_id)) return;
  generateLeadFired.add(opts.lead_id);
  const source = getCtaSource();
  push({
    event: GTM_EVENTS.GENERATE_LEAD,
    lead_id: opts.lead_id,
    lead_source: opts.lead_source,
    lead_type: opts.lead_type ?? null,
    service_category: opts.service_category ?? null,
    property_town: opts.property_town ?? null,
    town: opts.property_town ?? source?.town ?? null,
    source_context: source?.context ?? null,
    currency: "USD",
    value: opts.value ?? 0,
    page_path: pagePath(),
  });
}

export function trackRequestQuoteClick(opts: {
  click_location: string;
  destination_url: string;
  town?: string | null;
}) {
  push({
    event: "request_quote_click",
    town: opts.town ?? null,
    page_path: pagePath(),
    page_title: pageTitle(),
    click_location: opts.click_location,
    destination_url: opts.destination_url,
  });
}

export function trackRequestInspectionClick(opts: {
  click_location: string;
  destination_url: string;
  town?: string | null;
}) {
  push({
    event: "request_inspection_click",
    town: opts.town ?? null,
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
  trackGenerateLead({
    lead_id: opts.lead_id,
    lead_source: "chatbot",
    lead_type: "chatbot",
    service_category: opts.service_category ?? null,
    property_town: opts.property_town ?? null,
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
        const town = resolveTown(ctaEl);
        const pos = resolveCtaPosition(ctaEl);
        trackCtaClick({
          cta_location: loc,
          cta_text: ctaEl.textContent?.trim().slice(0, 80) || null,
          cta_type: cta,
          destination_url: dest,
          town,
          cta_position: pos.cta_position,
          cta_viewport_pct: pos.cta_viewport_pct,
        });
        if (cta === "request_quote") {
          trackRequestQuoteClick({ click_location: loc, destination_url: dest, town });
        } else if (cta === "request_inspection") {
          trackRequestInspectionClick({ click_location: loc, destination_url: dest, town });
        }
        recordCtaSource({ context: loc, town, page_path: pagePath() });
        if (loc === "town_faq" && town) {
          trackTownFaqConversionIntent({
            town,
            intent: "form",
            destination_url: dest,
            cta_text: ctaEl.textContent?.trim().slice(0, 80),
          });
        }
        // Do not return: a CTA can also be a tel: link.
      }

      const anchor = target.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        const rawNumber = href.replace(/^tel:/i, "").replace(/[^0-9+]/g, "");
        const display = anchor.textContent?.trim() || rawNumber;
        const phoneLoc = resolveClickLocation(anchor);
        const phoneTown = resolveTown(anchor);
        if (!anchor.closest("[data-gtm-cta]")) {
          const phonePos = resolveCtaPosition(anchor);
          trackCtaClick({
            cta_location: phoneLoc,
            cta_text: display,
            cta_type: "phone",
            destination_url: href,
            town: phoneTown,
            cta_position: phonePos.cta_position,
            cta_viewport_pct: phonePos.cta_viewport_pct,
          });
        }
        trackPhoneClick({
          phone_number: display,
          link_url: href,
          click_location: phoneLoc,
          town: phoneTown ?? getTownSlugFromPath(currentPath()),
          page_type: getAnalyticsPageType(currentPath()),
        });
        if (phoneLoc === "town_faq" && phoneTown) {
          trackTownFaqConversionIntent({
            town: phoneTown,
            intent: "call",
            destination_url: href,
            cta_text: display,
          });
        }
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

/** Publish the visitor's consent decision so GTM triggers can branch on it. */
export function trackConsentUpdate(state: {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}) {
  push({
    event: GTM_EVENTS.CONSENT_UPDATE,
    consent_functional: state.functional,
    consent_analytics: state.analytics,
    consent_marketing: state.marketing,
    page_path: pagePath(),
  });
}

/* ---------- Phase 1 CRO: engagement measurement ---------- */

/**
 * Scroll-depth + engaged-time measurement, scoped to a single route.
 *
 * Call `startPageEngagement(pathname)` on every route change; the returned
 * cleanup stops listeners and flushes the max depth reached. Milestones fire
 * at most once per route visit so depth funnels stay clean in GTM.
 */
export function startPageEngagement(pagePathValue: string) {
  if (typeof window === "undefined") return () => {};

  const milestones = [25, 50, 75, 90] as const;
  const fired = new Set<number>();
  const startedAt = Date.now();
  let maxDepth = 0;
  let ticking = false;

  const measure = () => {
    ticking = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const depth =
      scrollable <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    if (depth > maxDepth) maxDepth = depth;
    for (const m of milestones) {
      if (depth >= m && !fired.has(m)) {
        fired.add(m);
        push({
          event: "scroll_depth",
          percent_scrolled: m,
          page_path: pagePathValue,
          page_title: pageTitle(),
          seconds_on_page: Math.round((Date.now() - startedAt) / 1000),
        });
        // Dedicated 75% event: the standard "engaged reader" trigger used by
        // the conversion tags, so GTM doesn't need a value-filtered trigger.
        if (m === 75) {
          push({
            event: GTM_EVENTS.SCROLL_75,
            percent_scrolled: 75,
            page_path: pagePathValue,
            page_title: pageTitle(),
            seconds_on_page: Math.round((Date.now() - startedAt) / 1000),
          });
        }
      }
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(measure);
  };

  measure();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    push({
      event: "page_engagement",
      page_path: pagePathValue,
      page_title: pageTitle(),
      max_scroll_depth: maxDepth,
      seconds_on_page: Math.round((Date.now() - startedAt) / 1000),
    });
  };
}

/**
 * The single, page-level primary action was clicked. Paired with
 * `getPagePrimaryAction()` so every page has exactly one measurable
 * "the visitor took the intended action" signal.
 */
export function trackPrimaryCtaClick(opts: {
  page_key: string;
  intent: "call" | "form";
  cta_text: string;
  destination_url: string;
  click_location: string;
  cta_position?: string | null;
}) {
  push({
    event: "primary_cta_click",
    page_key: opts.page_key,
    intent: opts.intent,
    cta_text: opts.cta_text,
    destination_url: opts.destination_url,
    click_location: opts.click_location,
    cta_position: opts.cta_position ?? null,
    page_path: pagePath(),
    page_title: pageTitle(),
  });
  trackCtaClick({
    cta_location: opts.click_location,
    cta_text: opts.cta_text,
    cta_type: `primary_${opts.intent}`,
    destination_url: opts.destination_url,
    cta_position: opts.cta_position ?? null,
  });
}

/* ---------- Exit intent ---------- */

const EXIT_INTENT_KEY = "hl_exit_intent_shown";

/** Fires at most once per browsing session. */
export function trackExitIntentShown(opts: { trigger: string; variant?: string | null }) {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(EXIT_INTENT_KEY)) return;
    window.sessionStorage.setItem(EXIT_INTENT_KEY, "1");
  } catch {
    /* storage unavailable — still emit once per page load */
  }
  push({
    event: GTM_EVENTS.EXIT_INTENT_SHOWN,
    exit_trigger: opts.trigger,
    variant: opts.variant ?? null,
    page_path: pagePath(),
    page_title: pageTitle(),
  });
}

let exitIntentInstalled = false;

/** Visitor dismissed the recovery prompt without converting. */
export function trackExitIntentDismissed(opts: { trigger: string }) {
  push({
    event: GTM_EVENTS.EXIT_INTENT_DISMISSED,
    exit_trigger: opts.trigger,
    page_path: pagePath(),
    page_title: pageTitle(),
  });
}

/** Recovery prompt produced a callback request. */
export function trackExitIntentConversion(opts: {
  trigger: string;
  lead_id?: string | null;
  property_town?: string | null;
}) {
  push({
    event: GTM_EVENTS.EXIT_INTENT_CONVERSION,
    exit_trigger: opts.trigger,
    lead_id: opts.lead_id ?? null,
    property_town: opts.property_town ?? null,
    page_path: pagePath(),
    page_title: pageTitle(),
  });
}

/**
 * Detects abandonment signals (desktop: pointer leaving through the top of the
 * viewport; mobile/desktop: tab hidden after real engagement) and emits
 * `exit_intent_shown` once per session. Safe to call on every mount.
 */
export function installExitIntentDetection(onExitIntent?: (trigger: string) => void) {
  if (exitIntentInstalled || typeof document === "undefined") return () => {};
  exitIntentInstalled = true;
  const mountedAt = Date.now();

  const fire = (trigger: string) => {
    // Ignore instant bounces — those are not decision-stage exits.
    if (Date.now() - mountedAt < 5000) return;
    trackExitIntentShown({ trigger });
    onExitIntent?.(trigger);
  };

  const onMouseOut = (ev: MouseEvent) => {
    if (ev.clientY <= 0 && !ev.relatedTarget) fire("pointer_exit_top");
  };
  const onVisibility = () => {
    if (document.visibilityState === "hidden") fire("tab_hidden");
  };

  document.addEventListener("mouseout", onMouseOut);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    document.removeEventListener("mouseout", onMouseOut);
    document.removeEventListener("visibilitychange", onVisibility);
    exitIntentInstalled = false;
  };
}
