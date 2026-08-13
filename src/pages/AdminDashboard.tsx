import { BarChart3 } from "lucide-react";
import EmptyState from "@/components/states/EmptyState";
import ErrorState from "@/components/states/ErrorState";
import {
  BreakdownGridSkeleton,
  LoadingAnnouncement,
  StatGridSkeleton,
  TableSkeleton,
} from "@/components/states/Skeletons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useInternalPageHead } from "@/components/SEOHead";
import { leadTierLabel } from "@/lib/lead-scoring";
import { getPageContext } from "@/lib/gtm";
import { EXPERIMENTS } from "@/lib/ab-testing";

/** Keeps supabase-js from parsing the select string at the type level. */
const sel = (s: string): string => s;

type LeadRow = {
  created_at: string;
  source: string | null;
  page_path: string | null;
  page_url: string | null;
  landing_page: string | null;
  property_town: string | null;
  service_category: string | null;
  lead_type: string | null;
  user_agent: string | null;
  lead_score: number | null;
};

type EventRow = {
  created_at: string;
  event_type: string;
  path: string;
  session_id: string | null;
};

const DAYS = 30;
const MAX_ROWS = 5000;

function deviceFromUA(ua: string | null): "Mobile" | "Tablet" | "Desktop" | "Unknown" {
  if (!ua) return "Unknown";
  if (/iPad|Tablet/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "Mobile";
  return "Desktop";
}

function pathOf(lead: LeadRow): string {
  const raw = lead.page_path || lead.page_url || lead.landing_page || "";
  if (!raw) return "(unknown)";
  try {
    return raw.startsWith("http") ? new URL(raw).pathname : raw.split("?")[0];
  } catch {
    return raw.split("?")[0];
  }
}

function tally<T>(rows: T[], key: (row: T) => string | null | undefined) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const k = (key(r) || "").trim() || "(not set)";
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

export default function AdminDashboard() {
  useInternalPageHead(
    "Conversion dashboard",
    "Internal Highlander conversion dashboard: leads by page, town, service, device and score.",
    "/admin/dashboard",
  );

  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!data.session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: allowed } = await supabase.rpc("has_role", {
        _user_id: data.session.user.id,
        _role: "admin",
      });
      if (!mounted) return;
      setIsAdmin(!!allowed);
      setCheckingAuth(false);
      if (!allowed) setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const load = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    setError(null);
    const since = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000).toISOString();

    const [leadRes, eventRes] = await Promise.all([
      supabase
        .from("leads")
        .select(
          sel("created_at,source,page_path,page_url,landing_page,property_town,service_category,lead_type,user_agent,lead_score"),
        )
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(MAX_ROWS)
        .returns<LeadRow[]>(),
      supabase
        .from("conversion_events")
        .select(sel("created_at,event_type,path,session_id"))
        .gte("created_at", since)
        .in("event_type", ["form_start", "form_submit", "lead_capture", "phone_click"])
        .order("created_at", { ascending: false })
        .limit(MAX_ROWS)
        .returns<EventRow[]>(),
    ]);

    if (leadRes.error) setError(leadRes.error.message);
    else setLeads(leadRes.data ?? []);
    if (eventRes.error) setError((prev) => prev ?? eventRes.error!.message);
    else setEvents(eventRes.data ?? []);
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => {
    void load();
  }, [load]);

  const byPage = useMemo(() => tally(leads, pathOf), [leads]);
  const byTown = useMemo(() => tally(leads, (l) => l.property_town), [leads]);
  const byService = useMemo(
    () => tally(leads, (l) => l.service_category || l.lead_type),
    [leads],
  );
  const bySource = useMemo(() => tally(leads, (l) => l.source), [leads]);
  const byDevice = useMemo(() => tally(leads, (l) => deviceFromUA(l.user_agent)), [leads]);
  const byTier = useMemo(
    () => tally(leads, (l) => leadTierLabel(l.lead_score ?? 0)),
    [leads],
  );

  /** Form start → submit, per page type, from first-party events only. */
  const funnel = useMemo(() => {
    type Cell = { starts: Set<string>; submits: Set<string>; phone: number };
    const map = new Map<string, Cell>();
    const cell = (k: string) => {
      let c = map.get(k);
      if (!c) {
        c = { starts: new Set(), submits: new Set(), phone: 0 };
        map.set(k, c);
      }
      return c;
    };
    for (const e of events) {
      const k = getPageContext(e.path).page_type;
      const c = cell(k);
      const id = e.session_id || `${e.path}-${e.created_at}`;
      if (e.event_type === "form_start") c.starts.add(id);
      else if (e.event_type === "form_submit" || e.event_type === "lead_capture") c.submits.add(id);
      else if (e.event_type === "phone_click") c.phone += 1;
    }
    return Array.from(map.entries())
      .map(([pageType, c]) => ({
        pageType,
        starts: c.starts.size,
        submits: c.submits.size,
        rate: c.starts.size ? Math.round((c.submits.size / c.starts.size) * 100) : null,
        phone: c.phone,
      }))
      .sort((a, b) => b.starts + b.phone - (a.starts + a.phone));
  }, [events]);

  const totalStarts = funnel.reduce((n, r) => n + r.starts, 0);
  const totalSubmits = funnel.reduce((n, r) => n + r.submits, 0);
  const totalPhone = funnel.reduce((n, r) => n + r.phone, 0);

  if (checkingAuth) {
    return (
      <div className="min-h-dvh bg-background p-6 space-y-8">
        <LoadingAnnouncement label="Checking access" />
        <StatGridSkeleton />
        <TableSkeleton />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-3">
          <h1 className="text-xl font-heading font-bold">Not authorized</h1>
          <p className="text-sm text-muted-foreground">
            This dashboard requires the <code>admin</code> role.
          </p>
          <Link to="/admin/login" className="text-sm underline">Sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-heading font-bold">Conversion dashboard — Internal</h1>
          <p className="text-xs text-muted-foreground">
            Last {DAYS} days · {leads.length} leads · first-party data only.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button onClick={() => void load()} className="underline">Refresh</button>
          <Link to="/admin/leads" className="underline">Leads →</Link>
          <Link to="/" className="underline">← Site</Link>
        </div>
      </header>

      {error && (
        <ErrorState
          className="mx-6 mt-4"
          title="Dashboard data didn't load"
          description="The reporting query failed or timed out. Nothing is lost — retry to pull the last 30 days again."
          detail={error}
          onRetry={() => void load()}
          showContact={false}
        />
      )}

      {loading && (
        <div className="p-6 space-y-8">
          <LoadingAnnouncement label="Loading conversion data" />
          <StatGridSkeleton />
          <TableSkeleton />
          <BreakdownGridSkeleton />
        </div>
      )}

      {!loading && !error && leads.length === 0 && events.length === 0 && (
        <div className="p-6">
          <EmptyState
            icon={BarChart3}
            title="No activity in the last 30 days"
            description="Once visitors start forms, submit leads or tap the phone number, the funnel and breakdowns will populate here automatically."
            primaryAction={{ label: "Refresh", onClick: () => void load() }}
            secondaryAction={{ label: "View leads", to: "/admin/leads" }}
          />
        </div>
      )}

      <div className={loading ? "hidden" : "p-6 space-y-8"}>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Leads" value={leads.length} />
          <Stat label="Form starts" value={totalStarts} />
          <Stat
            label="Start → submit"
            value={totalStarts ? `${Math.round((totalSubmits / totalStarts) * 100)}%` : "—"}
            hint={`${totalSubmits} submits`}
          />
          <Stat label="Phone taps" value={totalPhone} />
        </section>

        <section>
          <h2 className="text-sm font-heading font-bold mb-2">
            Form start → submit and phone taps, by page type
          </h2>
          <div className="overflow-x-auto border border-border rounded">
            <table className="w-full text-xs">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <Th>Page type</Th><Th>Starts</Th><Th>Submits</Th><Th>Rate</Th><Th>Phone taps</Th>
                </tr>
              </thead>
              <tbody>
                {funnel.length === 0 && (
                  <tr><td className="p-3 text-muted-foreground" colSpan={5}>No events in the window.</td></tr>
                )}
                {funnel.map((r) => (
                  <tr key={r.pageType} className="border-t border-border">
                    <td className="p-2 font-medium">{r.pageType}</td>
                    <td className="p-2">{r.starts}</td>
                    <td className="p-2">{r.submits}</td>
                    <td className="p-2">{r.rate === null ? "—" : `${r.rate}%`}</td>
                    <td className="p-2">{r.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Breakdown title="Leads by source page" rows={byPage} total={leads.length} />
          <Breakdown title="Leads by town" rows={byTown} total={leads.length} />
          <Breakdown title="Leads by service" rows={byService} total={leads.length} />
          <Breakdown title="Leads by intake source" rows={bySource} total={leads.length} />
          <Breakdown title="Leads by device" rows={byDevice} total={leads.length} />
          <Breakdown title="Leads by score tier" rows={byTier} total={leads.length} />
        </section>

        <section>
          <h2 className="text-sm font-heading font-bold mb-2">Running test</h2>
          <div className="border border-border rounded p-4 text-xs space-y-1">
            {Object.values(EXPERIMENTS).map((e) => (
              <div key={e.id}>
                <p className="font-semibold">
                  {e.id} — {e.active ? "running" : "paused"}
                </p>
                <p className="text-muted-foreground">{e.hypothesis}</p>
                <p className="text-muted-foreground">
                  A: “{e.variants.a}” · B: “{e.variants.b}” — split reported in GTM via{" "}
                  <code>experiment_view</code> / <code>exp_{e.id}</code>.
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="p-2 font-semibold uppercase tracking-wide text-caption">{children}</th>;
}

function Stat({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="border border-border rounded p-4">
      <p className="text-caption uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-2xl font-heading font-bold">{value}</p>
      {hint && <p className="text-caption text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Breakdown({
  title,
  rows,
  total,
}: {
  title: string;
  rows: [string, number][];
  total: number;
}) {
  const top = rows.slice(0, 12);
  return (
    <div className="border border-border rounded">
      <h3 className="text-xs font-heading font-bold px-3 py-2 border-b border-border">{title}</h3>
      <ul className="divide-y divide-border">
        {top.length === 0 && <li className="p-3 text-xs text-muted-foreground">No data yet.</li>}
        {top.map(([label, count]) => (
          <li key={label} className="px-3 py-2 text-xs flex items-center gap-3">
            <span className="flex-1 truncate" title={label}>{label}</span>
            <span className="w-24 h-1.5 bg-muted rounded overflow-hidden">
              <span
                className="block h-full bg-primary"
                style={{ width: `${total ? Math.round((count / total) * 100) : 0}%` }}
              />
            </span>
            <span className="w-8 text-right font-semibold">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}