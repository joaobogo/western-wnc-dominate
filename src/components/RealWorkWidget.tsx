import { useEffect, useRef, useState } from "react";

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
  const outputWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
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
      const output = document.getElementById("rwl-output");
      // An empty iframe from the vendor is not "ready" — wait for rendered height (site audit M1).
      if (output && output.children.length > 0 && output.getBoundingClientRect().height > 80) {
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
        if (outputWrapRef.current) roots.add(outputWrapRef.current);
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

    // The RealWork loader is installed sitewide in index.html (vendor
    // instructions, 2026-06-24). This component only initialises the plugin for
    // its #rwl-output target and patches the injected markup for accessibility.
    initialize();
    window.addEventListener("rwlPluginReady", initialize, false);
    const poll = window.setInterval(() => {
      if (cancelled || checkReady()) window.clearInterval(poll);
    }, 1000);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(poll);
      if (!cancelled && !checkReady()) {
        console.error("[RealWork] project feed did not render within 12 s — check that the RealWork account has published items.");
        setStatus("error");
      }
    }, 12000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearInterval(poll);
      if (observer) observer.disconnect();
      window.removeEventListener("rwlPluginReady", initialize);
    };
  }, []);

  // If the vendor plugin never renders (account or network problem) the whole
  // section disappears instead of showing an "unavailable" notice.
  if (status === "error") return null;

  return (
    // Until the vendor has rendered real cards the section takes no vertical space —
    // no dangling label, no spinner (site audit M1). #rwl-output stays in the DOM
    // at full width so the plugin can mount into it.
    <section
      ref={sectionRef}
      className={status === "ready" ? className : "h-0 overflow-hidden"}
      aria-labelledby="realwork-project-updates-heading"
      aria-hidden={status !== "ready"}
    >
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

        <div
          className="relative w-full max-w-full overflow-x-hidden"
          ref={outputWrapRef}
          aria-live="polite"
          aria-busy={status === "loading"}
        >
          {/* RealWork requires this container to be exactly <div id="rwl-output"></div> */}
          <div id="rwl-output"></div>
        </div>
      </div>
    </section>
  );
};

export default RealWorkWidget;