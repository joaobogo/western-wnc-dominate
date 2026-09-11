import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GRADE_COLORS, type Grade } from "./config";
import { formatCallBy } from "./business-time";
import { TABLE, db, type IntakeRow } from "./save";

const GRADE_ORDER: Grade[] = ["A", "B", "C", "D", "DQ"];
const FILTERS: (Grade | "ALL")[] = ["ALL", "A", "B", "C", "D", "DQ"];

export default function Queue() {
  const [rows, setRows] = useState<IntakeRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Grade | "ALL">("ALL");
  const [hideDone, setHideDone] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    db.from(TABLE)
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setRows((data ?? []) as IntakeRow[]);
      });
  }, []);

  const visible = useMemo(() => {
    if (!rows) return [];
    return rows
      .filter((r) => (filter === "ALL" ? true : r.grade === filter))
      .filter((r) => (hideDone ? r.status !== "contacted" : true))
      .sort((a, b) => {
        const g = GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade);
        if (g !== 0) return g;
        const at = a.call_by ? Date.parse(a.call_by) : Infinity;
        const bt = b.call_by ? Date.parse(b.call_by) : Infinity;
        if (at !== bt) return at - bt;
        return Date.parse(b.created_at) - Date.parse(a.created_at);
      });
  }, [rows, filter, hideDone]);

  async function markContacted(id: string) {
    setBusy(id);
    const { error: err } = await db
      .from(TABLE)
      .update({ status: "contacted" })
      .eq("id", id);
    setBusy(null);
    if (err) {
      setError(err.message);
      return;
    }
    setRows((prev) =>
      prev
        ? prev.map((r) => (r.id === id ? { ...r, status: "contacted" } : r))
        : prev,
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <h1 className="hl-slab text-2xl">Queue</h1>
        <span className="hl-label">LAST 7 DAYS</span>
      </div>

      <div className="hl-choicegroup flex flex-wrap gap-2 mb-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className="hl-choice"
            aria-pressed={filter === f}
            style={{ width: 72, flex: "0 0 auto" }}
            onClick={() => setFilter(f)}
          >
            {f === "ALL" ? "All" : f}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-[14px] mb-4">
        <input
          type="checkbox"
          checked={hideDone}
          onChange={(e) => setHideDone(e.target.checked)}
        />
        Hide leads already contacted
      </label>

      {error && (
        <p className="text-[14px] mb-3" style={{ color: "var(--hl-red)" }}>
          {error}
        </p>
      )}
      {!rows && !error && <p className="text-[15px]">Loading…</p>}
      {rows && visible.length === 0 && (
        <p className="text-[15px]">Nothing here right now.</p>
      )}

      <div className="grid gap-2">
        {visible.map((r) => {
          const colors = GRADE_COLORS[r.grade] ?? GRADE_COLORS.D;
          const overdue =
            r.status !== "contacted" &&
            r.call_by !== null &&
            Date.parse(r.call_by) < Date.now();
          return (
            <div key={r.id} className="hl-card p-3 flex items-center gap-3">
              <div
                className="hl-slab flex items-center justify-center shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  fontSize: 20,
                  background: colors.bg,
                  color: colors.fg,
                }}
              >
                {r.grade}
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/front-desk/queue/${r.id}`}
                  className="hl-slab text-[17px] hover:underline"
                >
                  {[r.first_name, r.last_name].filter(Boolean).join(" ") ||
                    "No name"}
                </Link>
                <div className="text-[13.5px] truncate" style={{ color: "#4b5563" }}>
                  {[r.town, r.phone || r.email].filter(Boolean).join(" · ")}
                </div>
                <div
                  className="text-[13px] mt-0.5"
                  style={{ color: overdue ? "var(--hl-red)" : "#4b5563" }}
                >
                  {r.call_by
                    ? `${overdue ? "Overdue — was due " : "Call by "}${formatCallBy(new Date(r.call_by))}`
                    : "No call-back required"}
                </div>
                <div className="text-[12px] mt-0.5" style={{ color: "#4b5563" }}>
                  JobTread: {r.jobtread_sync_status === "success" ? "Synced" : r.jobtread_sync_status === "exhausted" ? "Needs attention" : "Queued"}
                </div>
              </div>

              {r.status === "contacted" ? (
                <span className="hl-label shrink-0">CONTACTED</span>
              ) : (
                <button
                  type="button"
                  className="hl-btn-quiet shrink-0"
                  disabled={busy === r.id}
                  onClick={() => markContacted(r.id)}
                >
                  {busy === r.id ? "…" : "Mark contacted"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
