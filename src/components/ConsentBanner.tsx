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

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[70] md:inset-x-auto md:right-5 md:bottom-5 md:max-w-md rounded-lg border border-border bg-card text-card-foreground shadow-floating p-4 md:p-5"
    >
      <p className="font-heading text-base font-semibold mb-1.5">
        We use a few cookies
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        We use cookies to measure how the site is used and to improve our advertising. You
        can opt out any time. Details are in our{" "}
        <Link to="/privacy-policy" className="underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            acceptAllConsent();
            setVisible(false);
          }}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
        >
          Got it
        </button>
        <button
          type="button"
          onClick={() => {
            rejectNonEssentialConsent();
            setVisible(false);
          }}
          className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-muted transition"
        >
          Opt out
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
