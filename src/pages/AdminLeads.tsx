import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { leadTierLabel, type LeadTierLabel } from "@/lib/lead-scoring";

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

const SELECT_COLUMNS =
  "id,created_at,source,lead_type,status,name,phone,email,property_town,service_category,project_type,urgency,project_description,chat_summary,page_url,jobtread_synced,jobtread_sync_status,jobtread_id,jobtread_last_attempt_at,jobtread_error_message,jobtread_retry_count,jobtread_exhausted_at,lead_score";

/**
 * A lead is "dead-lettered" once the background worker has burned through all
 * of its retries without reaching the CRM. The lead itself is never lost — it
 * is stored here and needs a human to resend it or enter it manually.
 */
const MAX_SYNC_ATTEMPTS = 5;
function isDeadLetter(l: Lead): boolean {
  if (l.jobtread_synced) return false;
  return !!l.jobtread_exhausted_at || (l.jobtread_retry_count ?? 0) >= MAX_SYNC_ATTEMPTS;
}

const TIERS: LeadTierLabel[] = ["Hot", "Warm", "Engaged", "Cool"];

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

export default function AdminLeads() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [resending, setResending] = useState<string | null>(null);
  const [retryingAll, setRetryingAll] = useState(false);
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [townFilter, setTownFilter] = useState<string>("all");
  const [syncFilter, setSyncFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      const session = data.session;
      setAuthed(!!session);
      if (!session) {
        setLoading(false);
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = (roles ?? []).some((r: { role: string }) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) {
        const { data: rows } = await supabase
          .from("leads")
          .select(SELECT_COLUMNS)
          .order("created_at", { ascending: false })
          .limit(200);
        const list = (rows ?? []) as Lead[];
        setLeads(list);
        // Deep link from the Teams alert: /admin/leads?lead=<id>
        const wanted = deepLinkId;
        if (wanted) {
          const match = list.find((l) => l.id === wanted);
          if (match) setSelected(match);
        }
      }
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [navigate]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (!error) setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
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
        .select("jobtread_synced,jobtread_sync_status,jobtread_id,jobtread_last_attempt_at,jobtread_error_message,jobtread_retry_count")
        .eq("id", id)
        .maybeSingle();
      if (row) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, ...row } as Lead : l));
        setSelected(prev => prev && prev.id === id ? { ...prev, ...row } as Lead : prev);
      }
      if (!(data as any)?.ok) {
        alert(`JobTread not synced: ${(data as any)?.error || "check secrets"}`);
      }
    } finally {
      setResending(null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const deadLetters = useMemo(() => leads.filter(isDeadLetter), [leads]);

  const retryAllDeadLetters = async () => {
    setRetryingAll(true);
    try {
      for (const l of deadLetters) {
        await retryJobTread(l.id);
      }
    } finally {
      setRetryingAll(false);
    }
  };

  const sources = useMemo(
    () => Array.from(new Set(leads.map(l => l.source).filter(Boolean))).sort(),
    [leads],
  );
  const towns = useMemo(
    () => Array.from(new Set(leads.map(l => l.property_town).filter(Boolean) as string[])).sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    const from = fromDate ? new Date(`${fromDate}T00:00:00`).getTime() : null;
    const to = toDate ? new Date(`${toDate}T23:59:59`).getTime() : null;
    return leads.filter(l => {
      if (tierFilter !== "all" && leadTierLabel(l.lead_score) !== tierFilter) return false;
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (townFilter !== "all" && (l.property_town ?? "") !== townFilter) return false;
      if (syncFilter === "dead_letter") {
        if (!isDeadLetter(l)) return false;
      } else if (syncFilter !== "all" && (l.jobtread_sync_status ?? "pending") !== syncFilter) {
        return false;
      }
      const t = new Date(l.created_at).getTime();
      if (from && t < from) return false;
      if (to && t > to) return false;
      return true;
    });
  }, [leads, tierFilter, sourceFilter, townFilter, syncFilter, fromDate, toDate]);

  const resetFilters = () => {
    setTierFilter("all"); setSourceFilter("all"); setTownFilter("all");
    setSyncFilter("all"); setFromDate(""); setToDate("");
  };

  if (loading) return <div className="p-10 text-sm">Loading leads…</div>;
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
            Showing {filtered.length} of {leads.length} (latest 200). Not visible to the public.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/" className="underline">← Site</Link>
          <button onClick={signOut} className="underline">Sign out</button>
        </div>
      </header>
      {deadLetters.length > 0 && (
        <div className="border-b border-destructive/30 bg-destructive/10 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-destructive">
              {deadLetters.length} lead{deadLetters.length === 1 ? "" : "s"} did not reach the CRM
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
        <FilterSelect label="Tier" value={tierFilter} onChange={setTierFilter} options={TIERS} />
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
        <button onClick={resetFilters} className="underline text-muted-foreground pb-1">Reset</button>
      </div>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-0 min-h-[calc(100vh-65px)]">
        <div className="border-r border-border overflow-auto max-h-[calc(100vh-65px)]">
          {filtered.length === 0 && (
            <p className="p-6 text-sm text-muted-foreground">
              {leads.length === 0 ? "No leads captured yet. New submissions appear here within seconds." : "No leads match these filters. Clear a filter or widen the date range."}
            </p>
          )}
          {filtered.map(l => (
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
                <label className="text-[11px] uppercase tracking-wide text-muted-foreground block mb-1" htmlFor="f-status">Status</label>
                <select id="f-status"
                  value={selected.status}
                  onChange={(e) => { updateStatus(selected.id, e.target.value); setSelected({ ...selected, status: e.target.value }); }}
                  className="border border-input rounded px-2 py-1 text-sm bg-background"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
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