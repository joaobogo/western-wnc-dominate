import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  acceptAllConsent,
  readConsent,
  rejectNonEssentialConsent,
} from "@/lib/consent";

/**
 * Lightweight consent notice. Renders only until the visitor decides, and is
 * mounted late so it never competes with the hero for paint budget.
 */
const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    const t = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[70] md:inset-x-auto md:right-5 md:bottom-5 md:max-w-md rounded-lg border border-border bg-card text-card-foreground shadow-xl p-4 md:p-5"
    >
      <p className="font-heading text-base font-semibold mb-1.5">
        We use a few cookies
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        Measurement and advertising cookies stay off until you allow them. Details are in
        our{" "}
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
          Allow all
        </button>
        <button
          type="button"
          onClick={() => {
            rejectNonEssentialConsent();
            setVisible(false);
          }}
          className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-muted transition"
        >
          Essential only
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
