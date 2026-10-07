import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  acceptAllConsent,
  readConsent,
  rejectNonEssentialConsent,
} from "@/lib/consent";

/**
 * Lightweight cookie notice (opt-out model). Measurement and advertising tags
 * already run from the first paint; this tells the visitor and offers a real
 * opt-out that is honored for the rest of the session and on return visits.
 */
const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    // Show immediately after the first paint to maximize opt-in velocity.
    const t = window.setTimeout(() => setVisible(true), 50);
    return () => window.clearTimeout(t);
  }, []);

  // Footer "Cookie preferences" link: let the visitor revisit an earlier choice.
  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener("hl:consent-open", open);
    return () => window.removeEventListener("hl:consent-open", open);
  }, []);

  if (!visible) return null;

  return (
    // On phones this is a compact strip that sits ABOVE the sticky call bar
    // (see .consent-strip in index.css), so CALL stays tappable on a first
    // visit. It used to be a 249px sheet covering the bar (mobile re-audit H-1).
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="consent-strip fixed inset-x-2 z-[70] md:inset-x-auto md:right-5 md:bottom-5 md:max-w-md rounded-md md:rounded-lg border border-border bg-card text-card-foreground shadow-floating p-3 md:p-5"
    >
      <p className="hidden md:block font-heading text-base font-semibold mb-1.5">
        We use a few cookies
      </p>
      <div className="flex items-center gap-3 md:block">
        <p className="text-[13px] leading-snug md:text-sm text-muted-foreground md:mb-4 flex-1 min-w-0">
          We use cookies to measure how the site is used and to improve our advertising. You
          can opt out any time.{" "}
          <Link to="/privacy-policy" className="underline underline-offset-2 whitespace-nowrap">
            Privacy policy
          </Link>
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              acceptAllConsent();
              setVisible(false);
            }}
            className="min-h-[44px] px-3.5 md:px-4 md:py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
          >
            Got it
          </button>
          <button
            type="button"
            onClick={() => {
              rejectNonEssentialConsent();
              setVisible(false);
            }}
            className="min-h-[44px] px-3.5 md:px-4 md:py-2 rounded-md border border-border text-sm font-semibold hover:bg-muted transition"
          >
            Opt out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
