import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackVeluxQuoteClick } from "@/lib/gtm";

const VELUX_SCRIPTS = {
  roofer: "https://veluxsolutions.com/installer-embed/velux-roofer.js",
  remodeler: "https://veluxsolutions.com/installer-embed/velux-remodeler.js",
} as const;

/**
 * Every origin the VELUX embed touches. Kept here next to the loader so the
 * hosting CSP allowlist (public/_headers) and the code can't drift apart:
 *   script-src  https://veluxsolutions.com
 *   img-src     https://veluxsolutions.com
 *   connect-src https://veluxsolutions.com
 *   style-src   'unsafe-inline'  (the widget injects a <style> block into its
 *                                 own shadow root; shadow DOM is still subject
 *                                 to the page CSP)
 */
export const VELUX_CSP_ORIGINS = ["https://veluxsolutions.com"] as const;

/** Read the page's CSP nonce, if the host is serving a nonce-based policy. */
function getCspNonce(): string | null {
  if (typeof document === "undefined") return null;
  const meta = document.querySelector<HTMLMetaElement>('meta[property="csp-nonce"], meta[name="csp-nonce"]');
  if (meta?.content) return meta.content;
  const scriptWithNonce = document.querySelector<HTMLScriptElement>("script[nonce]");
  // `nonce` is hidden from attribute reads by the browser, but the IDL
  // property still exposes it to same-origin scripts.
  return scriptWithNonce?.nonce || null;
}

interface VeluxWidgetProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  className?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: keyof typeof VELUX_SCRIPTS;
}

/**
 * VELUX Website Widget (roofer version).
 * The vendor script scans for #velux-brochure on load, so in this SPA we
 * re-append the script each time the component mounts to force a re-render.
 */
const VeluxWidget = ({
  eyebrow = "VELUX Certified Installer",
  heading = "Explore VELUX Skylights",
  description = "Browse the current VELUX skylight and Sun Tunnel lineup, straight from the manufacturer — then tell us which rooms you want daylight in.",
  className = "section-padding bg-background border-t border-border/60",
  ctaText = "Get My Written Estimate!",
  ctaLink = "/request-inspection",
  variant = "roofer",
}: VeluxWidgetProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [blocked, setBlocked] = useState(false);
  // The vendor bundle is ~229 KB — only fetch it once the block is near the
  // viewport so it never competes with the page's own critical resources.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !inView) return;
    const scriptSrc = VELUX_SCRIPTS[variant];
    setBlocked(false);

    // Clear any markup left behind by a previous mount before re-initializing.
    host.innerHTML = "";
    const target = document.createElement("div");
    target.id = "velux-brochure";
    target.setAttribute("data-cta-link", ctaLink);
    target.setAttribute("data-cta-text", ctaText);
    target.setAttribute("data-installer-domain", "https://highlandernc.com/");
    host.appendChild(target);

    document
      .querySelectorAll(`script[src^="${scriptSrc}"]`)
      .forEach((existing) => existing.remove());

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    // Nonce-based CSPs (`script-src 'nonce-…' 'strict-dynamic'`) reject
    // dynamically injected scripts unless they carry the page nonce.
    const nonce = getCspNonce();
    if (nonce) script.nonce = nonce;
    // Vendor assets are public; no credentials and no referrer leakage.
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "strict-origin-when-cross-origin";
    // A CSP refusal surfaces as a plain error event on the element.
    script.addEventListener("error", () => setBlocked(true));
    document.body.appendChild(script);

    // Belt-and-braces: if the script loads but the widget never paints
    // (blocked sub-resources, vendor outage), fall back to our own CTA.
    const renderTimer = window.setTimeout(() => {
      const painted = Boolean(target.shadowRoot?.childElementCount || target.childElementCount);
      if (!painted) setBlocked(true);
    }, 8000);

    // The vendor renders the CTA inside a shadow root, so a document-level
    // delegated listener only ever sees the host element. Listen on the host
    // and walk the composed path to find the real anchor/button.
    const onClick = (ev: Event) => {
      const path = (ev.composedPath?.() ?? []) as Element[];
      for (const node of path) {
        if (!(node instanceof Element)) continue;
        const tag = node.tagName?.toLowerCase();
        if (tag !== "a" && tag !== "button") continue;
        const href = node.getAttribute("href") || "";
        const text = (node.textContent || "").trim();
        const isCta =
          href === ctaLink ||
          text.toLowerCase() === ctaText.toLowerCase();
        if (!isCta) continue;
        trackVeluxQuoteClick({
          variant,
          destination_url: href || ctaLink,
          cta_text: text || ctaText,
        });
        return;
      }
    };
    host.addEventListener("click", onClick, { capture: true });

    return () => {
      window.clearTimeout(renderTimer);
      host.removeEventListener("click", onClick, { capture: true });
      script.remove();
      host.innerHTML = "";
    };
  }, [ctaLink, ctaText, variant, inView]);

  return (
    <section className={className}>
      <div className="container-tight">
        <div className="max-w-2xl mb-8">
          <div className="text-[hsl(var(--gold-ink))] text-sm font-semibold uppercase tracking-wider mb-3">
            {eyebrow}
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
        {/* Reserve space so the late-loading VELUX widget cannot shift content (CLS). */}
        <div ref={hostRef} hidden={blocked} className="min-h-[420px] md:min-h-[520px]" />
        {blocked && (
          <div className="rounded-lg border border-border/60 bg-muted/40 p-6">
            <p className="text-foreground/80 mb-4 leading-relaxed">
              The VELUX product brochure couldn't load in your browser. We can walk you
              through the full skylight and Sun Tunnel lineup directly.
            </p>
            <Link
              to="/contact"
              data-gtm-cta="request_quote"
              data-gtm-location={`velux_widget_${variant}_fallback`}
              className="btn btn-primary btn-sm"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default VeluxWidget;
