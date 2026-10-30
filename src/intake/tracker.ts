/**
 * Front-desk tracker math: daily counts, goal streaks and the team report.
 * Pure functions, Eastern Time throughout (the office's clock, not the
 * browser's), so the numbers match what Frank and Susan see on the wall clock.
 */

export const TIME_ZONE = "America/New_York";

export type Outcome = "booked" | "callback" | "not_fit" | "spam";

export const OUTCOMES: { id: Outcome; label: string; tone?: "good" | "muted" }[] = [
  { id: "booked", label: "Booked appointment", tone: "good" },
  { id: "callback", label: "Call back later" },
  { id: "not_fit", label: "Not a fit", tone: "muted" },
  { id: "spam", label: "Spam / vendor", tone: "muted" },
];

export type CallRow = {
  id: string;
  created_at: string;
  taken_by_user: string | null;
  /** Who was on the phone (front_desk_people.id); null for "Other". */
  taken_by_person: string | null;
  taken_by: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  town: string | null;
  job_type: string | null;
  source: string | null;
  grade: string | null;
  score: number | null;
  outcome: Outcome | null;
  callback_at: string | null;
  callback_done: boolean | null;
  jobtread_sync_status: string | null;
};

export type MissedRow = {
  id: string;
  created_at: string;
  user_id: string;
  person_id: string | null;
  person_name: string | null;
  phone: string | null;
  note: string | null;
  called_back: boolean;
};

/** Someone who answers the phone: a listed person, or "Other" with a typed name (id null). */
export type PhonePerson = { id: string | null; name: string; daily_goal: number };

export const OTHER_GOAL = 8;

/** Stable key for whoever took a call or logged a missed call. */
export const callPersonKey = (c: Pick<CallRow, "taken_by_person" | "taken_by">) =>
  c.taken_by_person ?? `other:${(c.taken_by ?? "").trim().toLowerCase() || "not recorded"}`;
export const missedPersonKey = (m: Pick<MissedRow, "person_id" | "person_name">) =>
  m.person_id ?? `other:${(m.person_name ?? "").trim().toLowerCase() || "not recorded"}`;
export const personKey = (p: Pick<PhonePerson, "id" | "name">) =>
  p.id ?? `other:${p.name.trim().toLowerCase() || "not recorded"}`;

export const CALL_COLUMNS =
  "id, created_at, taken_by_user, taken_by_person, taken_by, first_name, last_name, phone, town, job_type, source, grade, score, outcome, callback_at, callback_done, jobtread_sync_status";

const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const hourFmt = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "2-digit", hour12: false });

/** Office calendar day, "YYYY-MM-DD". */
export const dayKey = (value: Date | string): string => dayFmt.format(typeof value === "string" ? new Date(value) : value);

/** Office hour of day, 0–23. */
export const hourOf = (value: Date | string): number =>
  Number(hourFmt.format(typeof value === "string" ? new Date(value) : value)) % 24;

/** Calendar arithmetic on day keys (noon UTC avoids any DST edge). */
export function addDays(key: string, days: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d, 12) + days * 86_400_000);
  return t.toISOString().slice(0, 10);
}

export const weekday = (key: string): number => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
};

export const isWorkday = (key: string) => weekday(key) >= 1 && weekday(key) <= 5;

/** Start of the period as a day key: today, this week (Monday) or this month. */
export function periodStart(period: "today" | "week" | "month", today: string): string {
  if (period === "today") return today;
  if (period === "month") return `${today.slice(0, 8)}01`;
  const back = (weekday(today) + 6) % 7; // Monday = 0
  return addDays(today, -back);
}

export function lastNDays(n: number, today: string): string[] {
  return Array.from({ length: n }, (_, i) => addDays(today, i - (n - 1)));
}

/** Calls + missed calls per office day. */
export function dayCounts(calls: Pick<CallRow, "created_at">[], missed: Pick<MissedRow, "created_at">[]) {
  const counts = new Map<string, number>();
  for (const r of [...calls, ...missed]) {
    const k = dayKey(r.created_at);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return counts;
}

/**
 * Workdays in a row that hit the goal. Today counts once it is hit; until
 * then the streak runs through the last workday, so it never "breaks" at 8 AM.
 * Weekends neither add to nor break a streak.
 */
export function goalStreak(counts: Map<string, number>, goal: number, today: string): number {
  let streak = 0;
  let day = today;
  if ((counts.get(today) ?? 0) < goal) day = addDays(today, -1);
  for (let guard = 0; guard < 400; guard++, day = addDays(day, -1)) {
    if (!isWorkday(day)) {
      if ((counts.get(day) ?? 0) >= goal) streak++; // a weekend shift still counts, it just can't break the run
      continue;
    }
    if ((counts.get(day) ?? 0) >= goal) streak++;
    else break;
  }
  return streak;
}

/** "88/100", or "Disqualified" for a gated call (DQ calls carry no score). */
export function scoreLabel(c: Pick<CallRow, "grade" | "score">): string {
  if (c.grade === "DQ") return "Disqualified";
  return c.score === null || c.score === undefined ? "No score" : `${c.score}/100`;
}

export type Tally = {
  /** Mean score of the scored (non-DQ) calls, or null when none. */
  avgScore: number | null;
  calls: number;
  missed: number;
  logged: number;
  booked: number;
  callbacks: number;
  notFit: number;
  spam: number;
  strong: number;
  synced: number;
};

export function tally(calls: CallRow[], missed: MissedRow[]): Tally {
  const scored = calls.filter((c) => c.grade !== "DQ" && typeof c.score === "number").map((c) => c.score as number);
  const t: Tally = {
    avgScore: scored.length ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : null,
    calls: calls.length, missed: missed.length, logged: 0, booked: 0, callbacks: 0, notFit: 0, spam: 0, strong: 0, synced: 0 };
  for (const c of calls) {
    if (c.outcome === "booked") t.booked++;
    else if (c.outcome === "callback") t.callbacks++;
    else if (c.outcome === "not_fit") t.notFit++;
    else if (c.outcome === "spam") t.spam++;
    if (c.grade === "A" || c.grade === "B") t.strong++;
    if (c.jobtread_sync_status === "success") t.synced++;
  }
  t.logged = t.calls + t.missed;
  return t;
}

export const since = <T extends { created_at: string }>(rows: T[], startKey: string) =>
  rows.filter((r) => dayKey(r.created_at) >= startKey);

/** Callbacks that are due by the end of today (or overdue) and not done. */
export function callbacksDue(calls: CallRow[], today: string): CallRow[] {
  return calls
    .filter((c) => c.outcome === "callback" && !c.callback_done && (!c.callback_at || dayKey(c.callback_at) <= today))
    .sort((a, b) => (a.callback_at ?? a.created_at).localeCompare(b.callback_at ?? b.created_at));
}

export function hourHistogram(rows: { created_at: string }[]): number[] {
  const hours = Array.from({ length: 24 }, () => 0);
  for (const r of rows) hours[hourOf(r.created_at)]++;
  return hours;
}

export function sourceTally(calls: CallRow[]): { source: string; count: number }[] {
  const map = new Map<string, number>();
  for (const c of calls) {
    const key = c.source || "not asked";
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()].map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count);
}

/** Short, friendly line after a save: "Nice — that's 5 today." */
export function cheer(loggedToday: number, goal: number): string {
  if (loggedToday === goal) return `Daily goal reached — ${goal} calls today. Great work!`;
  if (loggedToday > goal) return `That's ${loggedToday} today, ${loggedToday - goal} past your goal.`;
  if (loggedToday === 1) return "First call of the day is in.";
  return `Nice — that's ${loggedToday} today. ${goal - loggedToday} to go.`;
}
