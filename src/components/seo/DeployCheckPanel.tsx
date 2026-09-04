import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle, RefreshCw, XCircle } from "lucide-react";

/**
 * P6.2 — "Deploy check" panel for the internal /seo-monitoring page.
 *
 * Everything runs in the browser against the origin the page is served from:
 * fetch() + DOMParser, no server code, no dependencies, no tracking. Each row
 * is graded against the P6.1 rule set so a deploy can be signed off from the
 * live site in one glance.
 */

const CANONICAL_ORIGIN = "https://highlandernc.com";

/** Fixed list: homepage, 4 core towns, 4 division pages, reviews, contact, one blog post. */
export const DEPLOY_CHECK_URLS = [
  "/",
  "/service-areas/franklin-nc",
  "/service-areas/highlands-nc",
  "/service-areas/cashiers-nc",
  "/service-areas/sylva-nc",
  "/roofing/roof-replacement",
  "/roofing/roof-repair",
  "/roofing/metal",
  "/roofing/storm-damage",
  "/reviews",
  "/contact",
  "/blog/western-north-carolina-mountain-roofing-guide",
] as const;

interface BuildInfo {
  commit?: string;
  shortCommit?: string;
  branch?: string;
  builtAt?: string;
  context?: string;
}

interface Check {
  label: string;
  ok: boolean;
  detail: string;
}

export interface PageRow {
  path: string;
  status: number | null;
  finalUrl: string;
  title: string;
  description: string;
  canonicals: string[];
  robots: string;
  h1Count: number;
  ldTypes: string[];
  ldErrors: number;
  ratingMarkup: boolean;
  error?: string;
  checks: Check[];
}

const typesOf = (node: unknown): string[] => {
  if (!node || typeof node !== "object") return [];
  const t = (node as { "@type"?: unknown })["@type"];
  return Array.isArray(t) ? t.map(String) : t ? [String(t)] : [];
};

/** Collect every @type in a JSON-LD document (top level and inside @graph). */
const collectTypes = (value: unknown, out: Set<string>) => {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) return value.forEach((v) => collectTypes(v, out));
  typesOf(value).forEach((t) => out.add(t));
  const graph = (value as { "@graph"?: unknown })["@graph"];
  if (graph) collectTypes(graph, out);
};

/** aggregateRating or a Review node anywhere in the document. */
const hasRatingMarkup = (value: unknown): boolean => {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some(hasRatingMarkup);
  const obj = value as Record<string, unknown>;
  if (obj.aggregateRating || typesOf(obj).includes("Review")) return true;
  return Object.values(obj).some(hasRatingMarkup);
};

/** Parse one HTML document into the facts we grade. */
export const inspectHtml = (path: string, html: string, status: number, finalUrl: string): Omit<PageRow, "checks"> => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const types = new Set<string>();
  let ldErrors = 0;
  let ratingMarkup = false;
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    try {
      const parsed = JSON.parse(script.textContent || "");
      collectTypes(parsed, types);
      if (hasRatingMarkup(parsed)) ratingMarkup = true;
    } catch {
      ldErrors += 1;
    }
  });
  return {
    path,
    status,
    finalUrl,
    title: doc.title.trim(),
    description: doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "",
    canonicals: Array.from(doc.querySelectorAll('link[rel="canonical"]')).map((l) => l.getAttribute("href") ?? ""),
    robots: doc.querySelector('meta[name="robots"]')?.getAttribute("content")?.trim() ?? "",
    h1Count: doc.querySelectorAll("h1").length,
    ldTypes: Array.from(types).sort(),
    ldErrors,
    ratingMarkup,
  };
};

/** Grade a page against the P6.1 rules. `home` is the homepage row (for duplicate title/description). */
export const gradeRow = (row: Omit<PageRow, "checks">, home: Omit<PageRow, "checks"> | null): Check[] => {
  const finalPath = (() => {
    try {
      return new URL(row.finalUrl).pathname.replace(/\/+$/, "") || "/";
    } catch {
      return row.finalUrl;
    }
  })();
  const expectedCanonical = `${CANONICAL_ORIGIN}${row.path === "/" ? "/" : row.path}`;
  const isHome = row.path === "/";
  const checks: Check[] = [
    { label: "200", ok: row.status === 200, detail: `HTTP ${row.status ?? "—"}` },
    { label: "no redirect", ok: finalPath === row.path, detail: finalPath === row.path ? "served at requested URL" : `redirected to ${finalPath}` },
    {
      label: "one canonical, self-referencing",
      ok: row.canonicals.length === 1 && row.canonicals[0] === expectedCanonical,
      detail: row.canonicals.length ? row.canonicals.join(" · ") : "no canonical",
    },
    { label: "one h1", ok: row.h1Count === 1, detail: `${row.h1Count} h1` },
    { label: "indexable", ok: !/noindex/i.test(row.robots), detail: row.robots || "no robots meta (indexable)" },
    {
      label: "unique title",
      ok: isHome ? row.title.length > 0 : !!home && row.title.length > 0 && row.title !== home.title,
      detail: row.title || "no title",
    },
    {
      label: "unique description",
      ok: isHome ? row.description.length > 0 : !!home && row.description.length > 0 && row.description !== home.description,
      detail: row.description ? `${row.description.slice(0, 90)}${row.description.length > 90 ? "…" : ""}` : "no description",
    },
    { label: "JSON-LD parses", ok: row.ldErrors === 0, detail: row.ldErrors ? `${row.ldErrors} block(s) failed to parse` : `${row.ldTypes.length} type(s)` },
    {
      label: "rating markup only on /reviews",
      ok: row.path === "/reviews" || !row.ratingMarkup,
      detail: row.ratingMarkup ? "aggregateRating / Review present" : "none",
    },
  ];
  return checks;
};

const Dot = ({ ok }: { ok: boolean }) =>
  ok ? (
    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-label="pass" />
  ) : (
    <XCircle className="h-4 w-4 text-destructive" aria-label="fail" />
  );

const DeployCheckPanel = () => {
  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);
  const [sitemap, setSitemap] = useState<{ count: number; first: string[] } | null>(null);
  const [manifestCount, setManifestCount] = useState<number | null>(null);
  const [rows, setRows] = useState<PageRow[]>([]);
  const [running, setRunning] = useState(false);
  const [ranAt, setRanAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setRunning(true);
    setError(null);
    try {
      const [infoRes, sitemapRes, manifestRes] = await Promise.all([
        fetch("/build-info.json", { cache: "no-store" }),
        fetch("/sitemap.xml", { cache: "no-store" }),
        fetch("/prerender-manifest.json", { cache: "no-store" }),
      ]);
      setBuildInfo(infoRes.ok ? ((await infoRes.json()) as BuildInfo) : null);
      if (sitemapRes.ok) {
        const xml = new DOMParser().parseFromString(await sitemapRes.text(), "application/xml");
        const locs = Array.from(xml.getElementsByTagName("loc")).map((l) => l.textContent?.trim() ?? "");
        setSitemap({ count: locs.length, first: locs.slice(0, 20) });
      } else {
        setSitemap(null);
      }
      if (manifestRes.ok) {
        const manifest = (await manifestRes.json()) as { routes?: unknown[] };
        setManifestCount(Array.isArray(manifest.routes) ? manifest.routes.length : null);
      } else {
        setManifestCount(null);
      }

      const fetched = await Promise.all(
        DEPLOY_CHECK_URLS.map(async (path): Promise<Omit<PageRow, "checks">> => {
          try {
            const res = await fetch(path, { redirect: "follow", cache: "no-store", headers: { Accept: "text/html" } });
            const html = await res.text();
            return inspectHtml(path, html, res.status, res.url);
          } catch (e) {
            return {
              path,
              status: null,
              finalUrl: "",
              title: "",
              description: "",
              canonicals: [],
              robots: "",
              h1Count: 0,
              ldTypes: [],
              ldErrors: 0,
              ratingMarkup: false,
              error: e instanceof Error ? e.message : String(e),
            };
          }
        }),
      );
      const home = fetched.find((r) => r.path === "/") ?? null;
      setRows(fetched.map((r) => ({ ...r, checks: gradeRow(r, home) })));
      setRanAt(new Date().toLocaleString());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    void run();
  }, [run]);

  const failing = rows.filter((r) => r.checks.some((c) => !c.ok)).length;

  return (
    <section className="rounded-sm border border-border bg-card p-6" aria-labelledby="deploy-check-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Deploy check</p>
          <h2 id="deploy-check-heading" className="mt-2 text-2xl font-heading font-bold text-foreground">
            What this deploy is actually serving
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fetched from {typeof window !== "undefined" ? window.location.origin : "this origin"} in your browser and graded against the seo:check
            rules. {ranAt ? `Last run ${ranAt}.` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void run()}
          disabled={running}
          className="btn btn-secondary btn-sm inline-flex items-center gap-2"
        >
          {running ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <RefreshCw className="h-4 w-4" aria-hidden="true" />}
          {running ? "Checking…" : "Re-run"}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-destructive">Deploy check failed to run: {error}</p>}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-sm border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Build</p>
          {buildInfo ? (
            <>
              <p className="mt-2 font-mono text-sm text-foreground">
                {buildInfo.shortCommit ?? buildInfo.commit?.slice(0, 7) ?? "—"} · {buildInfo.branch ?? "—"} · {buildInfo.context ?? "—"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                built {buildInfo.builtAt ? new Date(buildInfo.builtAt).toLocaleString() : "—"}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-destructive">/build-info.json not available</p>
          )}
        </div>
        <div className="rounded-sm border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Sitemap</p>
          <p className="mt-2 text-3xl font-heading font-bold text-foreground">{sitemap ? sitemap.count : "—"}</p>
          <p className="text-sm text-muted-foreground">URLs in /sitemap.xml</p>
        </div>
        <div className="rounded-sm border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Prerender manifest</p>
          <p className="mt-2 text-3xl font-heading font-bold text-foreground">{manifestCount ?? "—"}</p>
          <p className="text-sm text-muted-foreground">routes in /prerender-manifest.json</p>
        </div>
      </div>

      {sitemap && sitemap.first.length > 0 && (
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer font-semibold text-foreground">First 20 sitemap entries</summary>
          <ol className="mt-2 list-decimal space-y-1 pl-6 font-mono text-xs text-muted-foreground">
            {sitemap.first.map((loc) => (
              <li key={loc}>{loc}</li>
            ))}
          </ol>
        </details>
      )}

      <div className="mt-6 flex items-center gap-3 text-sm">
        <span className={`inline-flex items-center gap-2 font-semibold ${failing ? "text-destructive" : "text-emerald-700"}`}>
          {rows.length ? (failing ? `${failing} of ${rows.length} URLs failing` : `${rows.length} of ${rows.length} URLs passing`) : "No results yet"}
        </span>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <th className="py-2 pr-4">URL</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Canonical</th>
              <th className="py-2 pr-4">Robots</th>
              <th className="py-2 pr-4">JSON-LD @types</th>
              <th className="py-2">Checks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const ok = row.checks.every((c) => c.ok);
              return (
                <tr key={row.path} className={`border-b border-border/60 align-top ${ok ? "" : "bg-destructive/5"}`}>
                  <td className="py-3 pr-4 font-mono text-xs">
                    <span className="inline-flex items-center gap-2">
                      <Dot ok={ok} />
                      {row.path}
                    </span>
                    {row.error && <p className="mt-1 text-destructive">{row.error}</p>}
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs">
                    {row.status ?? "—"}
                    {row.finalUrl && (
                      <p className="mt-1 max-w-[16rem] truncate text-muted-foreground" title={row.finalUrl}>
                        {row.finalUrl.replace(/^https?:\/\/[^/]+/, "") || "/"}
                      </p>
                    )}
                  </td>
                  <td className="py-3 pr-4 max-w-[18rem]">
                    <p className="text-foreground">{row.title || "—"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{row.description ? `${row.description.slice(0, 80)}…` : ""}</p>
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs break-all">{row.canonicals.join(" · ") || "—"}</td>
                  <td className="py-3 pr-4 text-xs">{row.robots || "—"}</td>
                  <td className="py-3 pr-4 text-xs">{row.ldTypes.join(", ") || "—"}</td>
                  <td className="py-3">
                    <ul className="space-y-1">
                      {row.checks.map((c) => (
                        <li key={c.label} className="flex items-start gap-2 text-xs" title={c.detail}>
                          <Dot ok={c.ok} />
                          <span className={c.ok ? "text-muted-foreground" : "text-destructive"}>
                            {c.label}
                            {!c.ok && <span className="block text-[11px] opacity-90">{c.detail}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DeployCheckPanel;
