import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, Loader2, Phone } from "lucide-react";

const REALWORK_HOST = "https://app.realworklabs.com";
const REALWORK_KEY = "SxCxaBpYsO_fVnK0";

declare global {
  interface Window {
    __loadRWL?: () => void;
    rwlPlugin?: {
      init?: (host: string, key: string) => void;
      rescan?: () => unknown;
    };
  }
}

interface RealWorkWidgetProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  className?: string;
}

const RealWorkWidget = ({
  eyebrow = "Live Project Feed",
  heading = "Recent Project Updates",
  description = "Explore recent Highlander project activity, updates, and completed work across Western North Carolina.",
  className = "py-16 md:py-24 bg-background border-t border-border/60",
}: RealWorkWidgetProps) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;

    const checkReady = () => {
      if (cancelled) return false;
      const output = outputRef.current;
      if (output && output.children.length > 0) {
        setStatus("ready");
        return true;
      }
      return false;
    };

    const initialize = () => {
      try {
        window.rwlPlugin?.init?.(REALWORK_HOST, REALWORK_KEY);
      } catch {
        // RealWork init is one-time internally; a duplicate init is safe to ignore.
      }

      try {
        window.rwlPlugin?.rescan?.();
      } catch {
        // If rescan is unavailable, the plugin's route observer still handles placement.
      }

      window.setTimeout(checkReady, 250);
      window.setTimeout(checkReady, 1000);
    };

    if (outputRef.current) {
      observer = new MutationObserver(() => {
        if (checkReady() && observer) observer.disconnect();
      });
      observer.observe(outputRef.current, { childList: true, subtree: true });
    }

    window.__loadRWL?.();
    initialize();
    window.addEventListener("rwlPluginReady", initialize, false);

    const timeoutId = window.setTimeout(() => {
      if (!cancelled && !checkReady()) setStatus("error");
    }, 15000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      if (observer) observer.disconnect();
      window.removeEventListener("rwlPluginReady", initialize);
    };
  }, []);

  return (
    <section className={className} aria-labelledby="realwork-project-updates-heading">
      <div className="container-tight">
        <div className="max-w-3xl mb-10">
          <p className="text-[hsl(var(--highland-gold))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
            {eyebrow}
          </p>
          <h2
            id="realwork-project-updates-heading"
            className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight"
          >
            {heading}
          </h2>
          <p className="text-foreground/75 text-lg leading-relaxed">{description}</p>
        </div>

        <div className="relative">
          <div
            id="rwl-output"
            ref={outputRef}
            className="min-h-[240px]"
            aria-live="polite"
            aria-busy={status === "loading"}
          />

          {status === "loading" && (
            <div className="flex items-center justify-center gap-3 py-14 text-foreground/60 text-sm font-body">
              <Loader2 className="w-4 h-4 animate-spin text-[hsl(var(--heritage-green))]" aria-hidden="true" />
              <span>Loading recent project updates…</span>
            </div>
          )}

          {status === "error" && (
            <div className="border border-border rounded-sm bg-card p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 mt-0.5 text-[hsl(var(--heritage-green))] shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-base md:text-lg font-heading font-bold text-foreground mb-2">
                    Recent project updates are temporarily unavailable
                  </h3>
                  <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
                    You can still explore our project gallery or contact Highlander to talk through your roofing,
                    construction, gutter, or exterior project.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link
                  to="/contact"
                  className="cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  Request a Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+18285247773"
                  className="border border-[hsl(var(--heritage-green))]/30 text-[hsl(var(--heritage-green))] font-semibold text-sm px-6 py-3 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-[hsl(var(--heritage-green))]/10 transition-all"
                >
                  <Phone className="w-4 h-4" /> 828-524-7773
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealWorkWidget;