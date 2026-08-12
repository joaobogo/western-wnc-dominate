import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { leadTierLabel, type LeadTierLabel } from "@/lib/lead-scoring";
import { useInternalPageHead } from "@/components/SEOHead";

type Lead = {
  id: string;
  created_at: string;
  source: string;
  lead_type: string | null;
  status: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  property_town: string | null;
  service_category: string | null;
  project_type: string | null;
  urgency: string | null;
  project_description: string | null;
  chat_summary: string | null;
  page_url: string | null;
  jobtread_synced: boolean | null;
  jobtread_sync_status: string | null;
  jobtread_id: string | null;
  jobtread_last_attempt_at: string | null;
  jobtread_error_message: string | null;
  jobtread_retry_count: number | null;
  jobtread_exhausted_at: string | null;
  lead_score: number | null;
};

/** Keeps supabase-js from parsing the select string at the type level. */
const sel = (s: string): string => s;

const SELECT_COLUMNS =
  "id,created_at,source,lead_type,status,name,phone,email,property_town,service_category,project_type,urgency,project_description,chat_summary,page_url,jobtread_synced,jobtread_sync_status,jobtread_id,jobtread_last_attempt_at,jobtread_error_message,jobtread_retry_count,jobtread_exhausted_at,lead_score";

/**
 * A lead is "dead-lettered" once the background worker has burned through all
 * of its retries without reaching the CRM. The lead itself is never lost — it
 * is stored here and needs a human to resend it or enter it manually.
 */
const MAX_SYNC_ATTEMPTS = 5;
const DEAD_LETTER_OR = `jobtread_exhausted_at.not.is.null,jobtread_retry_count.gte.${MAX_SYNC_ATTEMPTS}`;
function isDeadLetter(l: Lead): boolean {
  if (l.jobtread_synced) return false;
  return !!l.jobtread_exhausted_at || (l.jobtread_retry_count ?? 0) >= MAX_SYNC_ATTEMPTS;
}

const TIERS: LeadTierLabel[] = ["Hot", "Warm", "Engaged", "Cool"];
/** Mirrors the scoring bands in src/lib/lead-scoring.ts so the DB can filter by tier. */
const TIER_RANGE: Record<LeadTierLabel, [number, number]> = {
  Hot: [70, 100],
  Warm: [50, 69],
  Engaged: [30, 49],
  Cool: [0, 29],
};

const SYNC_STATES = ["success", "pending", "retry_needed", "failed", "dead_letter"];

const STATUSES = [
  "new",
  "contacted",
  "estimate_scheduled",
  "waiting_on_customer",
  "not_a_fit",
  "closed",
  "archived",
];

/** The four actions the office actually uses, in workflow order. */
const QUICK_STATUSES: { label: string; value: string }[] = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Scheduled", value: "estimate_scheduled" },
  { label: "Closed", value: "closed" },
];

const SORTS = {
  newest: { column: "created_at", ascending: false, label: "Newest first" },
  oldest: { column: "created_at", ascending: true, label: "Oldest first" },
  score_desc: { column: "lead_score", ascending: false, label: "Highest score" },
  score_asc: { column: "lead_score", ascending: true, label: "Lowest score" },
} as const;
type SortKey = keyof typeof SORTS;

const PAGE_SIZE = 100;

export default function AdminLeads() {
  useInternalPageHead("Lead dashboard", "Internal Highlander lead dashboard for reviewing and managing inbound requests.", "/admin/leads");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deepLinkId = searchParams.get("lead");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [deadLetterCount, setDeadLetterCount] = useState(0);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [resending, setResending] = useState<string | null>(null);
  const [retryingAll, setRetryingAll] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [tierFilter, setTierFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [townFilter, setTownFilter] = useState<string>("all");
  const [syncFilter, setSyncFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(0);

  const [sources, setSources] = useState<string[]>([]);
  const [towns, setTowns] = useState<string[]>([]);

  const deepLinkHandled = useRef(false);

  // ---- Auth gate: session + admin role, re-checked on every auth change ----
  useEffect(() => {
    let mounted = true;

    const evaluate = async (session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]) => {
      if (!mounted) return;
      if (!session) {
        setAuthed(false);
        setIsAdmin(false);
        setLeads([]);
        setSelected(null);
        setCheckingAuth(false);
        setLoading(false);
        navigate("/admin/login", { replace: true });
        return;
      }
      setAuthed(true);
      // Server-side role check: has_role() is a security-definer function and
      // user_roles is readable only for the caller's own rows.
      const { data: allowed } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (!mounted) return;
      setIsAdmin(!!allowed);
      setCheckingAuth(false);
      if (!allowed) setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => evaluate(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void evaluate(session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  // ---- Debounce the free-text search so we do not query on every keystroke ----
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Any filter change resets pagination.
  useEffect(() => {
    setPage(0);
  }, [tierFilter, sourceFilter, townFilter, syncFilter, statusFilter, fromDate, toDate, debouncedSearch, sort]);

  // ---- Server-side filtering, sorting and pagination ----
  const fetchLeads = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    setLoadError(null);

    let query = supabase
      .from("leads")
      .select(sel(SELECT_COLUMNS), { count: "exact" });

    if (tierFilter !== "all") {
      const [min, max] = TIER_RANGE[tierFilter as LeadTierLabel];
      query = query.gte("lead_score", min).lte("lead_score", max);
    }
    if (sourceFilter !== "all") query = query.eq("source", sourceFilter);
    if (townFilter !== "all") query = query.eq("property_town", townFilter);
    if (statusFilter !== "all") query = query.eq("status", statusFilter);
    if (syncFilter === "dead_letter") {
      query = query.eq("jobtread_synced", false).or(DEAD_LETTER_OR);
    } else if (syncFilter !== "all") {
      query = query.eq("jobtread_sync_status", syncFilter);
    }
    if (fromDate) query = query.gte("created_at", new Date(`${fromDate}T00:00:00`).toISOString());
    if (toDate) query = query.lte("created_at", new Date(`${toDate}T23:59:59`).toISOString());
    if (debouncedSearch) {
      const term = debouncedSearch.replace(/[%,()]/g, " ").trim();
      if (term) {
        query = query.or(
          ["name", "email", "phone", "property_town", "project_description"]
            .map((c) => `${c}.ilike.%${term}%`)
            .join(","),
        );
      }
    }

    const { column, ascending } = SORTS[sort];
    const from = page * PAGE_SIZE;
    const { data, error, count } = await query
      .order(column, { ascending, nullsFirst: false })
      .range(from, from + PAGE_SIZE - 1)
      .returns<Lead[]>();

    if (error) {
      setLoadError(error.message);
      setLeads([]);
    } else {
      setLeads(data ?? []);
      setTotalCount(count ?? 0);
    }
    setLoading(false);
  }, [isAdmin, tierFilter, sourceFilter, townFilter, statusFilter, syncFilter, fromDate, toDate, debouncedSearch, sort, page]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  // ---- Filter option lists + dead-letter count (independent of the current view) ----
  useEffect(() => {
    if (!isAdmin) return;
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("leads")
        .select(sel("source,property_town"))
        .limit(2000)
        .returns<{ source: string | null; property_town: string | null }[]>();
      if (!mounted || !data) return;
      setSources(Array.from(new Set(data.map((r) => r.source).filter(Boolean) as string[])).sort());
      setTowns(Array.from(new Set(data.map((r) => r.property_town).filter(Boolean) as string[])).sort());
    })();
    return () => { mounted = false; };
  }, [isAdmin]);

  const refreshDeadLetterCount = useCallback(async () => {
    if (!isAdmin) return;
    const { count } = await supabase
      .from("leads")
      .select(sel("id"), { count: "exact", head: true })
      .eq("jobtread_synced", false)
      .or(DEAD_LETTER_OR);
    setDeadLetterCount(count ?? 0);
  }, [isAdmin]);

  useEffect(() => {
    void refreshDeadLetterCount();
  }, [refreshDeadLetterCount]);

  // ---- Deep link from the Teams alert: /admin/leads?lead=<id> ----
  useEffect(() => {
    if (!isAdmin || !deepLinkId || deepLinkHandled.current) return;
    deepLinkHandled.current = true;
    (async () => {
      const { data } = await supabase
        .from("leads")
        .select(sel(SELECT_COLUMNS))
        .eq("id", deepLinkId)
        .maybeSingle<Lead>();
      if (data) setSelected(data);
    })();
  }, [isAdmin, deepLinkId]);

  const updateStatus = async (id: string, status: string) => {
    setSavingStatus(true);
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    setSavingStatus(false);
    if (error) {
      alert(`Could not update status: ${error.message}`);
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  const retryJobTread = async (id: string) => {
    setResending(id);
    try {
      const { data, error } = await supabase.functions.invoke("jobtread-sync", {
        body: { lead_id: id, force: true },
      });
      if (error) {
        alert(`Resend failed: ${error.message}`);
        return;
      }
      const { data: row } = await supabase
        .from("leads")
        .select(sel("jobtread_synced,jobtread_sync_status,jobtread_id,jobtread_last_attempt_at,jobtread_error_message,jobtread_retry_count,jobtread_exhausted_at"))
        .eq("id", id)
        .maybeSingle<Partial<Lead>>();
      if (row) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...row } : l)));
        setSelected((prev) => (prev && prev.id === id ? { ...prev, ...row } : prev));
      }
      const result = data as { ok?: boolean; error?: string } | null;
      if (!result?.ok) {
        alert(`JobTread not synced: ${result?.error || "check secrets"}`);
      }
    } finally {
      setResending(null);
      void refreshDeadLetterCount();
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const retryAllDeadLetters = async () => {
    setRetryingAll(true);
    try {
      const { data } = await supabase
        .from("leads")
        .select(sel("id"))
        .eq("jobtread_synced", false)
        .or(DEAD_LETTER_OR)
        .limit(200)
        .returns<{ id: string }[]>();
      for (const l of data ?? []) {
        await retryJobTread(l.id);
      }
      await fetchLeads();
    } finally {
      setRetryingAll(false);
    }
  };

  const resetFilters = () => {
    setTierFilter("all"); setSourceFilter("all"); setTownFilter("all");
    setSyncFilter("all"); setStatusFilter("all"); setFromDate(""); setToDate(""); setSearch("");
  };

  const pageCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const rangeLabel = useMemo(() => {
    if (totalCount === 0) return "0";
    const start = page * PAGE_SIZE + 1;
    const end = Math.min(totalCount, start + leads.length - 1);
    return `${start}–${end}`;
  }, [page, leads.length, totalCount]);

  if (checkingAuth) return <div className="p-10 text-sm">Checking access…</div>;
  if (!authed) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-3">
          <h1 className="text-xl font-heading font-bold">Not authorized</h1>
          <p className="text-sm text-muted-foreground">Your account is signed in but does not have the <code>admin</code> role. Ask an existing admin to grant it.</p>
          <button onClick={signOut} className="text-sm underline">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-heading font-bold">Leads — Internal</h1>
          <p className="text-xs text-muted-foreground">
            Showing {rangeLabel} of {totalCount} matching leads. Not visible to the public.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button onClick={() => void fetchLeads()} className="underline">Refresh</button>
          <Link to="/" className="underline">← Site</Link>
          <button onClick={signOut} className="underline">Sign out</button>
        </div>
      </header>
      {deadLetterCount > 0 && (
        <div className="border-b border-destructive/30 bg-destructive/10 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-destructive">
              {deadLetterCount} lead{deadLetterCount === 1 ? "" : "s"} did not reach the CRM
            </p>
            <p className="text-xs text-muted-foreground">
              Every one is stored here and safe. They ran out of automatic retries — resend them or enter them in JobTread by hand.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button onClick={() => setSyncFilter("dead_letter")} className="underline">
              Show only these
            </button>
            <button
              onClick={retryAllDeadLetters}
              disabled={retryingAll}
              className="rounded bg-destructive px-3 py-1.5 text-destructive-foreground disabled:opacity-50"
            >
              {retryingAll ? "Resending…" : "Resend all to CRM"}
            </button>
          </div>
        </div>
      )}
      <div className="border-b border-border px-6 py-3 flex flex-wrap items-end gap-3 text-xs">
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-1" htmlFor="f-search">Search</label>
          <input
            id="f-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, phone, email, town…"
            className="border border-input rounded px-2 py-1 bg-background w-56"
          />
        </div>
        <FilterSelect label="Tier" value={tierFilter} onChange={setTierFilter} options={TIERS} />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={STATUSES} />
        <FilterSelect label="Sync" value={syncFilter} onChange={setSyncFilter} options={SYNC_STATES} />
        <FilterSelect label="Source" value={sourceFilter} onChange={setSourceFilter} options={sources} />
        <FilterSelect label="Town" value={townFilter} onChange={setTownFilter} options={towns} />
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-1" htmlFor="f-from">From</label>
          <input id="f-from" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}
            className="border border-input rounded px-2 py-1 bg-background" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-1" htmlFor="f-to">To</label>
          <input id="f-to" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}
            className="border border-input rounded px-2 py-1 bg-background" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-1" htmlFor="f-sort">Sort</label>
          <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-input rounded px-2 py-1 bg-background">
            {(Object.keys(SORTS) as SortKey[]).map((k) => (
              <option key={k} value={k}>{SORTS[k].label}</option>
            ))}
          </select>
        </div>
        <button onClick={resetFilters} className="underline text-muted-foreground pb-1">Reset</button>
      </div>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-0 min-h-[calc(100vh-65px)]">
        <div className="border-r border-border overflow-auto max-h-[calc(100vh-65px)]">
          {loadError && (
            <p className="p-6 text-sm text-destructive">Could not load leads: {loadError}</p>
          )}
          {loading && <p className="p-6 text-sm text-muted-foreground">Loading leads…</p>}
          {!loading && !loadError && leads.length === 0 && (
            <p className="p-6 text-sm text-muted-foreground">
              No leads match these filters. Clear a filter or widen the date range.
            </p>
          )}
          {!loading && leads.map(l => (
            <button
              key={l.id}
              onClick={() => setSelected(l)}
              className={`w-full text-left px-4 py-3 border-b border-border hover:bg-muted/40 transition ${selected?.id === l.id ? "bg-muted/60" : ""}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{l.name || l.email || l.phone || "Anonymous"}</span>
                <div className="flex items-center gap-1">
                  <TierPill score={l.lead_score} />
                  {isDeadLetter(l) ? (
                    <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">
                      Needs resend
                    </span>
                  ) : (
                    <SyncPill status={l.jobtread_sync_status} />
                  )}
                  <span className="text-[10px] uppercase tracking-wide bg-primary/10 text-primary px-1.5 py-0.5 rounded">{l.status}</span>
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {l.source} · {l.lead_type ?? "—"} · {l.property_town ?? ""}
              </div>
              {l.jobtread_sync_status && l.jobtread_sync_status !== "success" && l.jobtread_error_message && (
                <div className="text-[10px] text-destructive mt-0.5 line-clamp-2">{l.jobtread_error_message}</div>
              )}
              <div className="text-[10px] text-muted-foreground mt-0.5">{new Date(l.created_at).toLocaleString()}</div>
            </button>
          ))}
          {totalCount > PAGE_SIZE && (
            <div className="flex items-center justify-between px-4 py-3 text-xs">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="underline disabled:opacity-40"
              >
                ← Previous
              </button>
              <span className="text-muted-foreground">Page {page + 1} of {pageCount}</span>
              <button
                onClick={() => setPage((p) => (p + 1 < pageCount ? p + 1 : p))}
                disabled={page + 1 >= pageCount}
                className="underline disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </div>
        <div className="p-6 overflow-auto max-h-[calc(100vh-65px)]">
          {!selected && <p className="text-sm text-muted-foreground">Select a lead.</p>}
          {selected && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <h2 className="text-xl font-heading font-bold">{selected.name || "Unnamed lead"}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <TierPill score={selected.lead_score} />
                  <p className="text-xs text-muted-foreground">{new Date(selected.created_at).toLocaleString()} · {selected.source}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {QUICK_STATUSES.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => updateStatus(selected.id, value)}
                    disabled={savingStatus || selected.status === value}
                    className={`text-xs rounded px-3 py-1.5 border transition disabled:opacity-60 ${
                      selected.status === value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-input hover:bg-muted"
                    }`}
                  >
                    {label}
                  </button>
                ))}
                {savingStatus && <span className="text-[11px] text-muted-foreground">Saving…</span>}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Field label="Phone" value={selected.phone} link={selected.phone ? `tel:${selected.phone}` : undefined} />
                <Field label="Email" value={selected.email} link={selected.email ? `mailto:${selected.email}` : undefined} />
                <Field label="Town" value={selected.property_town} />
                <Field label="Service" value={selected.service_category} />
                <Field label="Project type" value={selected.project_type} />
                <Field label="Urgency" value={selected.urgency} />
                <Field label="Page" value={selected.page_url} />
                <Field label="Lead type" value={selected.lead_type} />
              </div>
              <div className="border border-border rounded p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">JobTread Sync</p>
                  <SyncPill status={selected.jobtread_sync_status} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Field label="JobTread ID" value={selected.jobtread_id} />
                  <Field label="Last attempt" value={selected.jobtread_last_attempt_at ? new Date(selected.jobtread_last_attempt_at).toLocaleString() : null} />
                  <Field label="Retries" value={selected.jobtread_retry_count != null ? String(selected.jobtread_retry_count) : null} />
                  <Field label="Synced" value={selected.jobtread_synced ? "Yes" : "No"} />
                </div>
                {selected.jobtread_error_message && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Error</p>
                    <p className="text-xs whitespace-pre-wrap bg-destructive/10 text-destructive p-2 rounded">{selected.jobtread_error_message}</p>
                  </div>
                )}
                <button
                  onClick={() => retryJobTread(selected.id)}
                  disabled={resending === selected.id}
                  className="text-xs underline text-primary hover:opacity-80 disabled:opacity-50"
                >
                  {resending === selected.id ? "Resending…" : "Resend to CRM"}
                </button>
              </div>
              {selected.project_description && (
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Description</p>
                  <p className="text-sm whitespace-pre-wrap bg-muted/40 p-3 rounded">{selected.project_description}</p>
                </div>
              )}
              {selected.chat_summary && (
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Chat summary</p>
                  <pre className="text-xs whitespace-pre-wrap bg-muted/40 p-3 rounded">{selected.chat_summary}</pre>
                </div>
              )}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-muted-foreground block mb-1" htmlFor="f-status">All statuses</label>
                <select id="f-status"
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="border border-input rounded px-2 py-1 text-sm bg-background"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, link }: { label: string; value: string | null; link?: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      {link ? (
        <a href={link} className="text-sm underline break-all">{value || "—"}</a>
      ) : (
        <p className="text-sm break-all">{value || "—"}</p>
      )}
    </div>
  );
}

function SyncPill({ status }: { status: string | null }) {
  return <SyncPillInner status={status} />;
}

function FilterSelect({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-1" id={`flt-${label}`}>{label}</label>
      <select
        aria-labelledby={`flt-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-input rounded px-2 py-1 bg-background max-w-[180px]"
      >
        <option value="all">All</option>
        {options.map(o => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}
      </select>
    </div>
  );
}

function TierPill({ score }: { score: number | null }) {
  const tier = leadTierLabel(score);
  const styles: Record<LeadTierLabel, string> = {
    Hot: "bg-destructive/15 text-destructive",
    Warm: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    Engaged: "bg-primary/10 text-primary",
    Cool: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded ${styles[tier]}`}>
      {tier} {score ?? 0}
    </span>
  );
}

function SyncPillInner({ status }: { status: string | null }) {
  const s = status ?? "pending";
  const styles: Record<string, string> = {
    success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    retry_needed: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    failed: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded ${styles[s] ?? "bg-muted text-muted-foreground"}`}>
      JT: {s.replace("_", " ")}
    </span>
  );
}
