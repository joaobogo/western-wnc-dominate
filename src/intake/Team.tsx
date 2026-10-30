import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GRADE_COLORS, SOURCES, type Grade } from "./config";
import { TABLE, db } from "./save";
import {
  CALL_COLUMNS,
  OUTCOMES,
  addDays,
  dayCounts,
  dayKey,
  hourHistogram,
  isWorkday,
  lastNDays,
  periodStart,
  scoreLabel,
  since,
  sourceTally,
  tally,
  type CallRow,
  type MissedRow,
} from "./tracker";

type Period = "today" | "week" | "month";
const PERIODS: { id: Period; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
];

type ManagedMember = {
  user_id: string;
  display_name: string;
  daily_goal: number;
  active: boolean;
  email: string | null;
  last_sign_in_at: string | null;
  is_admin: boolean;
};

type Person = { key: string; name: string; goal: number; active: boolean };

const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const sourceLabel = (id: string) => SOURCES.find((s) => s.id === id)?.label ?? (id === "not asked" ? "Not asked" : id);
const outcomeLabel = (id: string | null) => OUTCOMES.find((o) => o.id === id)?.label ?? "No outcome yet";
const callerName = (c: CallRow) => `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim() || "Caller";

async function teamAction(body: Record<string, unknown>): Promise<ManagedMember[]> {
  const { data, error } = await supabase.functions.invoke("front-desk-team", { body });
  if (error) throw new Error(error.message);
  if (!data?.ok) throw new Error(data?.error ?? "Something went wrong.");
  return data.members as ManagedMember[];
}

function Tile({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="hl-card px-4 py-3">
      <div className="hl-slab text-[28px] leading-none">{value}</div>
      <div className="text-[13px] font-semibold mt-1">{label}</div>
      {hint && <div className="text-[12px] opacity-65">{hint}</div>}
    </div>
  );
}

/**
 * Admin team page: who logged what, by day, week and month; the last 30 days
 * per person; busiest hours; how callers found us; and team logins.
 */
export default function Team() {
  const [period, setPeriod] = useState<Period>("today");
  const [calls, setCalls] = useState<CallRow[] | null>(null);
  const [missed, setMissed] = useState<MissedRow[]>([]);
  const [members, setMembers] = useState<ManagedMember[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [personFilter, setPersonFilter] = useState<string>("all");

  const today = dayKey(new Date());

  const load = useCallback(async () => {
    const sinceIso = `${addDays(today, -95)}T00:00:00Z`;
    const [c, m] = await Promise.all([
      db.from(TABLE).select(CALL_COLUMNS).gte("created_at", sinceIso).order("created_at", { ascending: false }),
      db.from("missed_calls").select("*").gte("created_at", sinceIso).order("created_at", { ascending: false }),
    ]);
    if (c.error || m.error) setError((c.error ?? m.error)!.message);
    setCalls((c.data ?? []) as unknown as CallRow[]);
    setMissed((m.data ?? []) as MissedRow[]);
    try {
      setMembers(await teamAction({ action: "list" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the team.");
    }
  }, [today]);

  useEffect(() => {
    void load();
  }, [load]);

  /** Everyone who appears: team logins first, then older calls typed under a name. */
  const people = useMemo<Person[]>(() => {
    const list: Person[] = members.map((m) => ({ key: m.user_id, name: m.display_name, goal: m.daily_goal, active: m.active }));
    const known = new Set(list.map((p) => p.key));
    for (const c of calls ?? []) {
      const key = c.taken_by_user ?? `name:${(c.taken_by ?? "Not recorded").trim()}`;
      if (!known.has(key)) {
        known.add(key);
        // A login without a team row (an admin taking a call) shows under the name saved on the call.
        list.push({ key, name: (c.taken_by ?? "").trim() || "Not recorded", goal: 8, active: false });
      }
    }
    return list;
  }, [members, calls]);

  const keyOfCall = (c: CallRow) => c.taken_by_user ?? `name:${(c.taken_by ?? "Not recorded").trim()}`;

  const view = useMemo(() => {
    if (!calls) return null;
    const start = periodStart(period, today);
    const pCalls = since(calls, start);
    const pMissed = since(missed, start);
    const perPerson = people.map((p) => {
      const mine = pCalls.filter((c) => keyOfCall(c) === p.key);
      const myMissed = pMissed.filter((m) => m.user_id === p.key);
      const counts = dayCounts(calls.filter((c) => keyOfCall(c) === p.key), missed.filter((m) => m.user_id === p.key));
      const days = lastNDays(30, today);
      const goalDays = days.filter((d) => d >= start && (counts.get(d) ?? 0) >= p.goal).length;
      return { person: p, t: tally(mine, myMissed), counts, days, goalDays };
    });
    return {
      total: tally(pCalls, pMissed),
      perPerson: perPerson.filter((r) => r.person.active || r.t.logged > 0 || r.counts.size > 0),
      hours: hourHistogram([...pCalls, ...pMissed]),
      sources: sourceTally(pCalls),
      recent: pCalls.filter((c) => personFilter === "all" || keyOfCall(c) === personFilter).slice(0, 60),
    };
  }, [calls, missed, people, period, today, personFilter]);

  if (!view) {
    return <div className="mx-auto max-w-[1180px] px-4 py-8 text-[14px] opacity-70">{error ?? "Loading the team…"}</div>;
  }

  const busiestHours = view.hours.slice(7, 20);
  const maxHour = Math.max(1, ...busiestHours);
  const maxSource = Math.max(1, ...view.sources.map((s) => s.count));

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <p className="hl-label">Front desk</p>
          <h1 className="hl-slab text-2xl">Team tracker</h1>
        </div>
        <div className="flex gap-2" role="group" aria-label="Period">
          {PERIODS.map((p) => (
            <button key={p.id} type="button" className="hl-pill" aria-pressed={period === p.id} onClick={() => setPeriod(p.id)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mb-3 text-[14px]" style={{ color: "var(--hl-red)" }}>{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <Tile label="Calls saved" value={view.total.calls} />
        <Tile label="Missed calls" value={view.total.missed} />
        <Tile label="Appointments booked" value={view.total.booked} />
        <Tile label="A / B leads" value={view.total.strong} hint="best-scored calls" />
        <Tile label="Average lead score" value={view.total.avgScore === null ? "—" : view.total.avgScore} hint="out of 100" />
        <Tile label="Sent to JobTread" value={view.total.synced} hint={`of ${view.total.calls}`} />
      </div>

      {/* Per person */}
      <section className="hl-card p-4 sm:p-5 mb-6 overflow-x-auto">
        <h2 className="hl-slab text-xl mb-3">By person</h2>
        <table className="w-full min-w-[700px] text-[14px]">
          <thead>
            <tr className="text-left hl-label">
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Calls</th>
              <th className="py-2 pr-3">Missed</th>
              <th className="py-2 pr-3">Booked</th>
              <th className="py-2 pr-3">Call back</th>
              <th className="py-2 pr-3">Not a fit / spam</th>
              <th className="py-2 pr-3">A / B</th>
              <th className="py-2 pr-3">Avg score</th>
              <th className="py-2 pr-3">Goal days</th>
            </tr>
          </thead>
          <tbody>
            {view.perPerson.map(({ person, t, goalDays }) => (
              <tr key={person.key} className="border-t" style={{ borderColor: "var(--hl-border)" }}>
                <td className="py-2 pr-3 font-semibold">
                  {person.name}
                  {!person.active && person.key.startsWith("name:") && <span className="opacity-60 font-normal"> (typed name)</span>}
                </td>
                <td className="py-2 pr-3">{t.calls}</td>
                <td className="py-2 pr-3">{t.missed}</td>
                <td className="py-2 pr-3">{t.booked}</td>
                <td className="py-2 pr-3">{t.callbacks}</td>
                <td className="py-2 pr-3">{t.notFit + t.spam}</td>
                <td className="py-2 pr-3">{t.strong}</td>
                <td className="py-2 pr-3">{t.avgScore === null ? "—" : t.avgScore}</td>
                <td className="py-2 pr-3">{person.key.startsWith("name:") ? "—" : `${goalDays} (goal ${person.goal})`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 30-day daily tracker */}
      <section className="hl-card p-4 sm:p-5 mb-6 overflow-x-auto">
        <h2 className="hl-slab text-xl">Last 30 days</h2>
        <p className="text-[13px] opacity-70 mb-3">Calls logged each day. Green = daily goal reached. Weekends are faded.</p>
        <div className="grid gap-2 min-w-[760px]">
          {view.perPerson.filter((r) => !r.person.key.startsWith("name:")).map(({ person, counts, days }) => (
            <div key={person.key} className="grid grid-cols-[120px_1fr] items-center gap-3">
              <span className="text-[14px] font-semibold truncate">{person.name}</span>
              <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px]">
                {days.map((d) => {
                  const n = counts.get(d) ?? 0;
                  const hit = n >= person.goal;
                  return (
                    <span
                      key={d}
                      title={`${d}: ${n} calls`}
                      className="flex h-7 items-center justify-center rounded-[3px] text-[11px] font-semibold"
                      style={{
                        background: hit ? "var(--hl-green)" : n > 0 ? "#dfe7d2" : "#f1ece0",
                        color: hit ? "var(--hl-cream)" : "var(--hl-ink)",
                        opacity: isWorkday(d) ? 1 : 0.45,
                      }}
                    >
                      {n || ""}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <section className="hl-card p-4 sm:p-5">
          <h2 className="hl-slab text-xl">Busiest hours</h2>
          <p className="text-[13px] opacity-70 mb-3">Calls and missed calls by hour, {PERIODS.find((p) => p.id === period)!.label.toLowerCase()}.</p>
          <div className="flex h-40 items-end gap-1.5">
            {busiestHours.map((n, i) => {
              const hour = i + 7;
              return (
                <div key={hour} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[11px] font-semibold">{n || ""}</span>
                  <span className="w-full rounded-t-[3px]" style={{ height: `${(n / maxHour) * 110}px`, minHeight: n ? 4 : 1, background: "var(--hl-green)" }} />
                  <span className="text-[10.5px] opacity-70">{hour > 12 ? hour - 12 : hour}{hour >= 12 ? "p" : "a"}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="hl-card p-4 sm:p-5">
          <h2 className="hl-slab text-xl">How callers found us</h2>
          <p className="text-[13px] opacity-70 mb-3">From "How did you hear about us?" on the call sheet.</p>
          {view.sources.length === 0 ? (
            <p className="text-[14px] opacity-70">No calls in this period.</p>
          ) : (
            <ul className="grid gap-2">
              {view.sources.map((s) => (
                <li key={s.source} className="grid grid-cols-[150px_1fr_32px] items-center gap-2 text-[14px]">
                  <span className="truncate">{sourceLabel(s.source)}</span>
                  <span className="h-3 rounded-full" style={{ width: `${(s.count / maxSource) * 100}%`, background: "var(--hl-brass)" }} />
                  <span className="text-right font-semibold">{s.count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Calls list */}
      <section className="hl-card p-4 sm:p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h2 className="hl-slab text-xl">Calls</h2>
          <select className="hl-input !w-auto" value={personFilter} onChange={(e) => setPersonFilter(e.target.value)} aria-label="Show calls by">
            <option value="all">Everyone</option>
            {view.perPerson.map(({ person }) => (
              <option key={person.key} value={person.key}>{person.name}</option>
            ))}
          </select>
        </div>
        {view.recent.length === 0 ? (
          <p className="text-[14px] opacity-70">No calls in this period.</p>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--hl-border)" }}>
            {view.recent.map((c) => {
              const grade = (c.grade ?? "D") as Grade;
              return (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-[14px]">
                  <span>
                    <span className="hl-grade-sm mr-2" style={{ background: GRADE_COLORS[grade]?.bg, color: GRADE_COLORS[grade]?.fg }}>{grade}</span>
                    <Link to={`/front-desk/queue/${c.id}`} className="font-semibold underline-offset-2 hover:underline">{callerName(c)}</Link>
                    <span className="font-semibold"> · {scoreLabel(c)}</span>
                    {c.town && <span className="opacity-75"> · {c.town}</span>}
                    <span className="opacity-60"> · {timeFmt.format(new Date(c.created_at))}</span>
                  </span>
                  <span className="text-[13px]">
                    <span className="opacity-70">{people.find((p) => p.key === keyOfCall(c))?.name ?? "—"} · </span>
                    {outcomeLabel(c.outcome)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <TeamLogins members={members} onChange={setMembers} />
    </div>
  );
}

/** Add people and set their daily goals. Logins themselves are created in Lovable Cloud → Users. */
function TeamLogins({ members, onChange }: { members: ManagedMember[]; onChange: (m: ManagedMember[]) => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("8");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const run = async (body: Record<string, unknown>, success: string) => {
    setBusy(true);
    setMessage(null);
    try {
      onChange(await teamAction(body));
      setMessage({ ok: true, text: success });
      return true;
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Something went wrong." });
      return false;
    } finally {
      setBusy(false);
    }
  };

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (await run({ action: "add", email, display_name: name, daily_goal: Number(goal) }, `${name} is on the team.`)) {
      setEmail("");
      setName("");
      setGoal("8");
    }
  };

  return (
    <section className="hl-card p-4 sm:p-5">
      <h2 className="hl-slab text-xl">Team logins</h2>
      <p className="text-[13px] opacity-75 mt-1">
        First create the login (email + password) in Lovable Cloud → Users. Then add the person here with their name and daily goal.
      </p>

      <ul className="mt-4 grid gap-2">
        {members.map((m) => (
          <li key={m.user_id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-2" style={{ borderColor: "var(--hl-border)", opacity: m.active ? 1 : 0.6 }}>
            <span className="text-[14px]">
              <b>{m.display_name}</b> <span className="opacity-70">· {m.email ?? "no email"}</span>
              {m.is_admin && <span className="hl-chip ml-2">Admin</span>}
              <span className="block text-[12px] opacity-60">
                {m.last_sign_in_at ? `Last signed in ${timeFmt.format(new Date(m.last_sign_in_at))}` : "Hasn't signed in yet"}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <label className="text-[13px] flex items-center gap-1.5">
                Daily goal
                <input
                  className="hl-input !w-[70px] !py-1.5"
                  type="number"
                  min={1}
                  max={100}
                  defaultValue={m.daily_goal}
                  onBlur={(e) => {
                    const v = Number(e.target.value);
                    if (v && v !== m.daily_goal) void run({ action: "update", user_id: m.user_id, daily_goal: v }, `Goal updated for ${m.display_name}.`);
                  }}
                />
              </label>
              <button
                type="button"
                className="hl-btn-quiet !py-1.5 !px-3 !text-[13px]"
                disabled={busy}
                onClick={() => void run({ action: "update", user_id: m.user_id, active: !m.active }, m.active ? `${m.display_name} can no longer use the call sheet.` : `${m.display_name} is back on the team.`)}
              >
                {m.active ? "Remove access" : "Restore access"}
              </button>
            </span>
          </li>
        ))}
        {members.length === 0 && <li className="text-[14px] opacity-70">Nobody added yet.</li>}
      </ul>

      <form onSubmit={add} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_110px_auto] sm:items-end">
        <label className="block">
          <span className="block text-[13px] font-semibold mb-1">Login email</span>
          <input className="hl-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="block text-[13px] font-semibold mb-1">Name shown</span>
          <input className="hl-input" value={name} placeholder="Frank" onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block">
          <span className="block text-[13px] font-semibold mb-1">Daily goal</span>
          <input className="hl-input" type="number" min={1} max={100} value={goal} onChange={(e) => setGoal(e.target.value)} />
        </label>
        <button type="submit" className="hl-btn-primary" disabled={busy || !email || !name}>Add to team</button>
      </form>
      {message && (
        <p className="mt-3 text-[14px] font-semibold" style={{ color: message.ok ? "var(--hl-green)" : "var(--hl-red)" }}>{message.text}</p>
      )}
    </section>
  );
}
