import { useMemo, useState } from "react";
import { addDays, callbacksDue, callPersonKey, missedPersonKey, personKey, scoreLabel, type PhonePerson, dayCounts, dayKey, goalStreak, OUTCOMES, tally, since, type CallRow, type Outcome } from "./tracker";
import type { MyDay } from "./useMyDay";
import { formatPhone } from "./scoring";

const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit" });
const whenFmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", hour: "numeric", minute: "2-digit" });

/** A local "tomorrow at 10:00" for the callback picker. */
function defaultCallbackInput() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(10, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T10:00`;
}

const callerName = (c: Pick<CallRow, "first_name" | "last_name">) =>
  `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim() || "Caller";

/** Goal ring: fills as calls are logged, turns brass when the goal is hit. */
function GoalRing({ done, goal }: { done: number; goal: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, done / goal);
  const hit = done >= goal;
  return (
    <div className="relative h-[112px] w-[112px] shrink-0" role="img" aria-label={`${done} of ${goal} calls logged today`}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--hl-border)" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={hit ? "var(--hl-brass)" : "var(--hl-green)"}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset .6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="hl-slab text-[30px]">{done}</span>
        <span className="text-[12px] font-semibold opacity-70 mt-1">of {goal}</span>
      </div>
    </div>
  );
}

function Stat({ label, value, hint, className = "" }: { label: string; value: string | number; hint?: string; className?: string }) {
  return (
    <div className={`rounded-md border px-3 py-2.5 ${className}`} style={{ borderColor: "var(--hl-border)", background: "#fffdf6" }}>
      <div className="hl-slab text-[24px] leading-none">{value}</div>
      <div className="text-[13px] font-semibold mt-1">{label}</div>
      {hint && <div className="text-[12px] opacity-65">{hint}</div>}
    </div>
  );
}

/** Four big buttons: what happened on this call. "Call back later" asks when. */
export function OutcomePicker({
  value,
  onChoose,
  compact,
}: {
  value: Outcome | null;
  onChoose: (outcome: Outcome | null, callbackAt?: string | null) => Promise<void> | void;
  compact?: boolean;
}) {
  const [askWhen, setAskWhen] = useState(false);
  const [when, setWhen] = useState(defaultCallbackInput);
  const [busy, setBusy] = useState(false);

  const choose = async (outcome: Outcome | null, callbackAt?: string | null) => {
    setBusy(true);
    try {
      await onChoose(outcome, callbackAt);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className={`grid gap-2 ${compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
        {OUTCOMES.map((o) => (
          <button
            key={o.id}
            type="button"
            className="hl-choice"
            aria-pressed={value === o.id}
            disabled={busy}
            onClick={() => {
              if (o.id === "callback") setAskWhen(true);
              else {
                setAskWhen(false);
                void choose(value === o.id ? null : o.id);
              }
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
      {askWhen && (
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <label className="block">
            <span className="block text-[13px] font-semibold mb-1">Call them back on</span>
            <input className="hl-input" type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
          </label>
          <button
            type="button"
            className="hl-btn-primary"
            disabled={busy || !when}
            onClick={async () => {
              await choose("callback", new Date(when).toISOString());
              setAskWhen(false);
            }}
          >
            Set reminder
          </button>
        </div>
      )}
    </div>
  );
}

function MissedCallForm({ onSave, onClose }: { onSave: (phone: string, note: string) => Promise<void>; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="mt-4 rounded-md border p-3"
      style={{ borderColor: "var(--hl-border)", background: "#fffdf6" }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
          await onSave(phone, note);
          onClose();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Could not save.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
        <label className="block">
          <span className="block text-[13px] font-semibold mb-1">Their number (if shown)</span>
          <input className="hl-input" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} />
        </label>
        <label className="block">
          <span className="block text-[13px] font-semibold mb-1">Note (optional)</span>
          <input className="hl-input" value={note} placeholder="e.g. left a voicemail about a leak" onChange={(e) => setNote(e.target.value)} />
        </label>
      </div>
      {error && <p className="text-[13px] mt-2" style={{ color: "var(--hl-red)" }}>{error}</p>}
      <div className="flex gap-2 mt-3">
        <button type="submit" className="hl-btn-primary" disabled={busy}>{busy ? "Saving…" : "Save missed call"}</button>
        <button type="button" className="hl-btn-quiet" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

/**
 * "My day": the personal tracker at the top of the call sheet. Only the
 * signed-in person's own numbers, plus the team's combined total.
 */
export function MyDayCard({ myDay, person, onSwitch }: { myDay: MyDay; person: PhonePerson; onSwitch: () => void }) {
  const [missedOpen, setMissedOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const today = dayKey(new Date());

  const view = useMemo(() => {
    // Numbers and the goal are this person's; callbacks and missed calls to
    // return are the whole desk's, so nobody's follow-up is lost on a day off.
    const key = personKey(person);
    const mine = myDay.calls.filter((c) => callPersonKey(c) === key);
    const myMissed = myDay.missed.filter((m) => missedPersonKey(m) === key);
    const todayCalls = since(mine, today);
    const t = tally(todayCalls, since(myMissed, today));
    const streak = goalStreak(dayCounts(mine, myMissed), person.daily_goal, today);
    const due = callbacksDue(myDay.calls, today);
    const missedToCall = myDay.missed.filter((m) => !m.called_back && dayKey(m.created_at) >= addDays(today, -2));
    return { todayCalls, t, streak, due, missedToCall };
  }, [myDay.calls, myDay.missed, person, today]);

  if (!myDay.loaded) {
    return <div className="hl-card p-4 mb-4 text-[14px] opacity-70">Loading your day…</div>;
  }
  // Before the tracker's database setup is applied, the card stays out of the way.
  if (myDay.error && myDay.calls.length === 0 && myDay.missed.length === 0) {
    return <div className="hl-card p-4 mb-4 text-[14px] opacity-70">Your daily tracker will appear here once setup is finished.</div>;
  }

  const member = { display_name: person.name, daily_goal: person.daily_goal };
  const hit = view.t.logged >= member.daily_goal;
  const dateLabel = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "long", month: "long", day: "numeric" }).format(new Date());

  return (
    <section className="hl-card p-4 sm:p-5 mb-4" aria-label="My day">
      <div className="flex flex-wrap items-center gap-5">
        <GoalRing done={view.t.logged} goal={member.daily_goal} />
        <div className="min-w-[200px] flex-1">
          <p className="hl-label flex flex-wrap items-center gap-x-2">
            {dateLabel}
            <span aria-hidden="true">·</span>
            <span>On the phone: {person.name}</span>
            <button type="button" onClick={onSwitch} className="underline underline-offset-2 normal-case tracking-normal font-semibold" style={{ color: "var(--hl-green)" }}>
              Not {person.name}? Switch
            </button>
          </p>
          <h2 className="hl-slab text-[22px] leading-tight mt-0.5">
            {hit ? `Goal reached, ${member.display_name}! 🎉` : `Hi ${member.display_name} — your day so far`}
          </h2>
          <p className="text-[14px] mt-1 opacity-80">
            {hit
              ? "Every extra call today is a bonus."
              : `${member.daily_goal - view.t.logged} more ${member.daily_goal - view.t.logged === 1 ? "call" : "calls"} to reach today's goal of ${member.daily_goal}.`}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button type="button" className="hl-btn-quiet !py-2 !px-4 !text-[15px]" onClick={() => setMissedOpen((v) => !v)}>
              📵 Log a missed call
            </button>
            <button type="button" className="hl-btn-quiet !py-2 !px-4 !text-[15px]" onClick={() => setListOpen((v) => !v)} aria-expanded={listOpen}>
              {listOpen ? "Hide today's calls" : `Today's calls (${view.todayCalls.length})`}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
        <Stat label="Calls saved" value={view.t.calls} />
        <Stat label="Missed calls" value={view.t.missed} />
        <Stat label="Booked" value={view.t.booked} hint="appointments" />
        <Stat label="Streak" value={view.streak ? `🔥 ${view.streak}` : "0"} hint={view.streak === 1 ? "day on goal" : "days on goal"} />
        <Stat label="Whole team" value={myDay.team ? myDay.team.calls + myDay.team.missed : "—"} hint="calls today" className="col-span-2 sm:col-span-1" />
      </div>

      {missedOpen && <MissedCallForm onSave={(phone, note) => myDay.logMissed(phone, note, person)} onClose={() => setMissedOpen(false)} />}

      {view.due.length > 0 && (
        <div className="mt-4">
          <h3 className="hl-q">⏰ Call back today ({view.due.length})</h3>
          <ul className="mt-2 grid gap-2">
            {view.due.map((c) => {
              const overdue = c.callback_at ? new Date(c.callback_at) < new Date() : false;
              return (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border px-3 py-2" style={{ borderColor: overdue ? "var(--hl-red)" : "var(--hl-border)" }}>
                  <span className="text-[15px]">
                    <b>{callerName(c)}</b>
                    {c.phone && <> · <a className="underline" href={`tel:${c.phone}`}>{c.phone}</a></>}
                    {c.callback_at && <span className="opacity-70"> · {whenFmt.format(new Date(c.callback_at))}</span>}
                    {overdue && <span style={{ color: "var(--hl-red)" }}> · overdue</span>}
                    {c.taken_by && c.taken_by !== person.name && <span className="opacity-60"> · set by {c.taken_by}</span>}
                  </span>
                  <button type="button" className="hl-btn-quiet !py-1.5 !px-3 !text-[14px]" onClick={() => void myDay.markCallbackDone(c.id)}>
                    ✓ Done
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {view.missedToCall.length > 0 && (
        <div className="mt-4">
          <h3 className="hl-q">📵 Missed calls to return ({view.missedToCall.length})</h3>
          <ul className="mt-2 grid gap-2">
            {view.missedToCall.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border px-3 py-2" style={{ borderColor: "var(--hl-border)" }}>
                <span className="text-[15px]">
                  {m.phone ? <a className="underline font-semibold" href={`tel:${m.phone}`}>{m.phone}</a> : <b>No number</b>}
                  <span className="opacity-70"> · {timeFmt.format(new Date(m.created_at))}</span>
                  {m.note && <span className="opacity-80"> · {m.note}</span>}
                  {m.person_name && m.person_name !== person.name && <span className="opacity-60"> · logged by {m.person_name}</span>}
                </span>
                <button type="button" className="hl-btn-quiet !py-1.5 !px-3 !text-[14px]" onClick={() => void myDay.markMissedCalledBack(m.id)}>
                  ✓ Called back
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {listOpen && (
        <div className="mt-4">
          <h3 className="hl-q">Today's calls</h3>
          {view.todayCalls.length === 0 ? (
            <p className="text-[14px] opacity-70 mt-2">No calls saved yet today.</p>
          ) : (
            <ul className="mt-2 grid gap-3">
              {view.todayCalls.map((c) => (
                <li key={c.id} className="rounded-md border p-3" style={{ borderColor: "var(--hl-border)" }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <span className="text-[15px]">
                      <b>{callerName(c)}</b>
                      {c.town && <span className="opacity-75"> · {c.town}</span>}
                      <span className="opacity-60"> · {timeFmt.format(new Date(c.created_at))}</span>
                    </span>
                    {c.grade && <span className="hl-chip">Grade {c.grade} · {scoreLabel(c)}</span>}
                  </div>
                  <OutcomePicker compact value={c.outcome} onChoose={(o, at) => myDay.setOutcome(c.id, o, at)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {myDay.error && (
        <p className="text-[13px] mt-3" style={{ color: "var(--hl-red)" }}>
          Couldn't load everything: {myDay.error}
        </p>
      )}
    </section>
  );
}
