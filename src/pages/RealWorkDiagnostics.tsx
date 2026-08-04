import { useEffect, useState } from "react";

declare global {
  interface Window {
    __loadRWL?: () => void;
    __rwlLoaderRequested?: boolean;
    __rwlMapsRequested?: boolean;
    rwlPlugin?: { init?: (host: string, key: string) => void; rescan?: () => unknown };
    google?: { maps?: unknown };
  }
}

type Status = "pending" | "ok" | "fail";

interface Check {
  label: string;
  status: Status;
  detail: string;
}

const HOST = "https://app.realworklabs.com";
const KEY = "SxCxaBpYsO_fVnK0";

const badge = (s: Status) => {
  const map: Record<Status, string> = {
    pending: "bg-amber-100 text-amber-900 border-amber-300",
    ok: "bg-emerald-100 text-emerald-900 border-emerald-300",
    fail: "bg-red-100 text-red-900 border-red-300",
  };
  return `inline-block px-2 py-0.5 text-xs font-mono uppercase border rounded ${map[s]}`;
};

const RealWorkDiagnostics = () => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    document.title = "RealWork Diagnostics — Highlander";
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const prev = meta?.content;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex,nofollow";

    const errors: string[] = [];
    const origError = window.console.error;
    window.console.error = (...args: unknown[]) => {
      const msg = args.map((a) => (a instanceof Error ? `${a.message}` : typeof a === "string" ? a : JSON.stringify(a))).join(" ");
      if (/rwl|realwork|maps\.google/i.test(msg)) {
        errors.push(msg.slice(0, 300));
      }
      origError.apply(window.console, args as never);
    };

    const onErr = (e: ErrorEvent) => {
      const src = (e.filename || "") + " " + (e.message || "");
      if (/realwork|rwl|maps\.google/i.test(src)) {
        errors.push(`window.error: ${e.message} @ ${e.filename}`);
      }
    };
    window.addEventListener("error", onErr, true);

    // Kick loader
    try {
      window.__loadRWL?.();
    } catch (e) {
      errors.push(`__loadRWL threw: ${(e as Error).message}`);
    }

    const start = Date.now();
    const interval = window.setInterval(() => {
      const t = Date.now() - start;
      setElapsed(t);

      const loaderScript = document.getElementById("rwl-loader") as HTMLScriptElement | null;
      const mapsScript = document.getElementById("rwl-google-maps") as HTMLScriptElement | null;
      const output = document.getElementById("rwl-output");
      const neighborhood = document.getElementById("rwl-neighborhood");

      const outputHasChildren = !!output && output.children.length > 0;
      const neighborhoodHasChildren = !!neighborhood && neighborhood.children.length > 0;

      // Try init/rescan periodically once plugin is present
      if (window.rwlPlugin) {
        try { window.rwlPlugin.init?.(HOST, KEY); } catch { /* safe */ }
        try { window.rwlPlugin.rescan?.(); } catch { /* safe */ }
      }

      const timedOut = t > 15000;

      const next: Check[] = [
        {
          label: "Loader trigger (window.__loadRWL)",
          status: typeof window.__loadRWL === "function" ? "ok" : "fail",
          detail: typeof window.__loadRWL === "function"
            ? "Defined in index.html and invoked."
            : "Missing. Check index.html RealWork loader block.",
        },
        {
          label: "Google Maps JS API",
          status: window.google?.maps ? "ok" : timedOut ? "fail" : "pending",
          detail: mapsScript
            ? `Script injected (${mapsScript.src.split("?")[0]}). google.maps = ${window.google?.maps ? "ready" : "not ready"}.`
            : "Maps script tag not injected yet.",
        },
        {
          label: "RealWork loader script",
          status: loaderScript ? (window.rwlPlugin ? "ok" : timedOut ? "fail" : "pending") : timedOut ? "fail" : "pending",
          detail: loaderScript
            ? `Injected: ${loaderScript.src.split("?")[0]}. rwlPlugin = ${window.rwlPlugin ? "present" : "not yet"}.`
            : "Loader script tag not injected.",
        },
        {
          label: "rwlPlugin.init / rescan",
          status: window.rwlPlugin?.init ? "ok" : timedOut ? "fail" : "pending",
          detail: window.rwlPlugin
            ? `init: ${typeof window.rwlPlugin.init}, rescan: ${typeof window.rwlPlugin.rescan}`
            : "Plugin not attached to window yet.",
        },
        {
          label: "#rwl-output rendered content",
          status: outputHasChildren ? "ok" : timedOut ? "fail" : "pending",
          detail: output
            ? `Element present. Children: ${output.children.length}.`
            : "Container #rwl-output missing on this page (mounted below).",
        },
        {
          label: "#rwl-neighborhood rendered content",
          status: neighborhoodHasChildren ? "ok" : timedOut ? "fail" : "pending",
          detail: neighborhood
            ? `Element present. Children: ${neighborhood.children.length}.`
            : "Container #rwl-neighborhood missing (should live in index.html body).",
        },
      ];

      setChecks(next);
      setLogs([...errors]);

      if (timedOut) window.clearInterval(interval);
    }, 500);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("error", onErr, true);
      window.console.error = origError;
      if (meta && prev !== undefined) meta.content = prev;
    };
  }, []);

  const overall: Status = checks.length === 0
    ? "pending"
    : checks.every((c) => c.status === "ok")
      ? "ok"
      : checks.some((c) => c.status === "fail")
        ? "fail"
        : "pending";

  return (
    <>
      <main className="min-h-screen bg-background pt-[96px] md:pt-[136px] pb-16">
        <div className="container-tight max-w-4xl">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))] font-bold mb-2">
              Internal Tools
            </p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              RealWork Widget Diagnostics
            </h1>
            <p className="text-foreground/70">
              Live status of the RealWork Labs loader, Google Maps dependency, and both widget
              containers. Elapsed: {(elapsed / 1000).toFixed(1)}s
            </p>
            <p className="mt-3">
              <span className={badge(overall)}>Overall: {overall}</span>
            </p>
          </div>

          <div className="space-y-3 mb-10">
            {checks.map((c) => (
              <div key={c.label} className="border border-border rounded-sm p-4 bg-card">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h2 className="font-semibold text-foreground text-sm md:text-base">{c.label}</h2>
                  <span className={badge(c.status)}>{c.status}</span>
                </div>
                <p className="text-sm text-foreground/70 font-mono">{c.detail}</p>
              </div>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="font-heading text-xl font-bold mb-3">Captured loader errors</h2>
            {logs.length === 0 ? (
              <p className="text-sm text-foreground/60 italic">No RealWork / Maps errors captured.</p>
            ) : (
              <ul className="space-y-2">
                {logs.map((l, i) => (
                  <li key={i} className="text-xs font-mono bg-red-50 border border-red-200 text-red-900 rounded-sm p-3 break-words">
                    {l}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold mb-3">Live containers</h2>
            <p className="text-sm text-foreground/70 mb-4">
              These are the exact IDs the RealWork plugin binds to. If they stay empty after 15s,
              the widget is not initializing on this page.
            </p>
            <div className="border border-border rounded-sm p-4 bg-card mb-4">
              <p className="text-xs font-mono uppercase tracking-wider text-foreground/50 mb-2">#rwl-output</p>
              <div id="rwl-output" className="min-h-[120px]" />
            </div>
            <div className="border border-border rounded-sm p-4 bg-card">
              <p className="text-xs font-mono uppercase tracking-wider text-foreground/50 mb-2">
                #rwl-neighborhood (sitewide, in index.html)
              </p>
              <p className="text-sm text-foreground/60">
                The neighborhood panel is injected into the body-level container defined in
                <code className="mx-1 px-1 bg-muted rounded">index.html</code>. Check the check above
                for its status.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default RealWorkDiagnostics;