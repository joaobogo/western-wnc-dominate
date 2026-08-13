import { GalleryGridSkeleton, LoadingAnnouncement } from "@/components/states/Skeletons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight, Phone } from "lucide-react";

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

  /*
   * The RealWork embed injects markup we don't control, and it ships icon-only
   * controls and placeholder images with no accessible names. Patch the injected
   * subtree so the widget doesn't fail WCAG on our pages.
   */
  const patchInjectedA11y = (root: HTMLElement) => {
    root.querySelectorAll<HTMLImageElement>("img:not([alt])").forEach((img) => {
      img.setAttribute("alt", "");
      img.setAttribute("role", "presentation");
    });

    root
      .querySelectorAll<HTMLElement>('button, a[role="button"], [role="button"]')
      .forEach((el) => {
        if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return;
        if ((el.textContent || "").trim().length > 0) return;
        el.setAttribute("aria-label", "Recent project updates control");
      });

    // Their carousel exposes role="list" on a node whose children aren't listitems.
    root.querySelectorAll<HTMLElement>('[role="list"]').forEach((el) => {
      const hasListItems = el.querySelector('[role="listitem"], li');
      if (!hasListItems) el.setAttribute("role", "group");
    });

    // Horizontally scrollable panes must be keyboard reachable.
    root.querySelectorAll<HTMLElement>("div").forEach((el) => {
      if (el.hasAttribute("tabindex")) return;
      const style = window.getComputedStyle(el);
      const scrolls =
        (style.overflowX === "auto" || style.overflowX === "scroll") &&
        el.scrollWidth > el.clientWidth;
      if (scrolls) {
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", "region");
        el.setAttribute("aria-label", "Recent project updates, scrollable");
      }
    });
  };

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

    // The plugin can mount its UI outside #rwl-output, so watch the document
    // and re-patch on every injection. patchInjectedA11y only fills in missing
    // accessible names, so it never overrides our own markup.
    let patchScheduled = false;
    const schedulePatch = () => {
      if (patchScheduled) return;
      patchScheduled = true;
      window.setTimeout(() => {
        patchScheduled = false;
        if (cancelled) return;
        // The plugin injects into its own containers anywhere in the document,
        // so patch every RealWork-owned root — never the rest of our UI.
        const roots = new Set<HTMLElement>();
        if (outputRef.current) roots.add(outputRef.current);
        document
          .querySelectorAll<HTMLElement>('[id^="rwl"], [id^="rwlContentContainer"], [class*="rwl"]')
          .forEach((el) => roots.add(el));
        roots.forEach((root) => patchInjectedA11y(root));
        checkReady();
      }, 120);
    };

    const startObserver = () => {
      observer = new MutationObserver(schedulePatch);
      observer.observe(document.body, { childList: true, subtree: true });
    };
    startObserver();
    schedulePatch();

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
          <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">
            {eyebrow}
          </p>
          <h2
            id="realwork-project-updates-heading"
            className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-tight"
          >
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
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
            <>
              <LoadingAnnouncement label="Loading recent project updates" />
              <GalleryGridSkeleton count={3} />
            </>
          )}

          {status === "error" && (
            <div className="border border-border rounded-sm bg-card p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 mt-0.5 text-[hsl(var(--heritage-green))] shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-base md:text-lg font-heading font-bold text-foreground mb-2">
                    Recent project updates are temporarily unavailable
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    You can still explore our project gallery or contact Highlander to talk through your roofing,
                    construction, gutter, or exterior project.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link
                  to="/contact"
                  className="btn btn-primary btn-sm"
                >
                  Request an Estimate <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+18285247773"
                  className="btn btn-secondary btn-sm"
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