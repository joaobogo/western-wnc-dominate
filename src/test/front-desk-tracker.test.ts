import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  addDays,
  callbacksDue,
  cheer,
  dayCounts,
  dayKey,
  goalStreak,
  hourOf,
  periodStart,
  sourceTally,
  tally,
  type CallRow,
  type MissedRow,
} from "@/intake/tracker";

const call = (over: Partial<CallRow>): CallRow => ({
  id: Math.random().toString(36).slice(2),
  created_at: "2026-10-27T14:00:00Z",
  taken_by_user: "desk",
  taken_by_person: "frank-id",
  taken_by: "Frank",
  first_name: "Jane",
  last_name: "Doe",
  phone: "(828) 555-0100",
  town: "Franklin",
  job_type: "roof_repair",
  source: "google",
  grade: "B",
  score: 60,
  outcome: null,
  callback_at: null,
  callback_done: false,
  jobtread_sync_status: "success",
  ...over,
});

const missed = (created_at: string): MissedRow => ({ id: created_at, created_at, user_id: "desk", person_id: "frank-id", person_name: "Frank", phone: null, note: null, called_back: false });

describe("office clock (Eastern)", () => {
  it("buckets calls by the Franklin calendar day and hour, not UTC", () => {
    expect(dayKey("2026-10-28T02:30:00Z")).toBe("2026-10-27"); // 10:30 PM EDT
    expect(hourOf("2026-10-27T14:05:00Z")).toBe(10);
    expect(hourOf("2026-12-01T15:05:00Z")).toBe(10); // EST after the clock change
  });

  it("finds the start of today, this week (Monday) and this month", () => {
    expect(periodStart("today", "2026-10-29")).toBe("2026-10-29");
    expect(periodStart("week", "2026-10-29")).toBe("2026-10-26");
    expect(periodStart("week", "2026-11-01")).toBe("2026-10-26"); // Sunday belongs to the week that began Monday
    expect(periodStart("month", "2026-10-29")).toBe("2026-10-01");
    expect(addDays("2026-11-01", 1)).toBe("2026-11-02");
  });
});

describe("daily goal streak", () => {
  const counts = (entries: Record<string, number>) => new Map(Object.entries(entries));

  it("counts workdays in a row on goal and skips weekends", () => {
    // Thu 22, Fri 23, (weekend), Mon 26, Tue 27 all on goal; Wed 21 missed.
    const c = counts({ "2026-10-21": 3, "2026-10-22": 8, "2026-10-23": 9, "2026-10-26": 8, "2026-10-27": 10 });
    expect(goalStreak(c, 8, "2026-10-27")).toBe(4);
  });

  it("does not break before today's goal is reached", () => {
    const c = counts({ "2026-10-26": 8, "2026-10-27": 2 });
    expect(goalStreak(c, 8, "2026-10-27")).toBe(1);
  });

  it("is zero after a missed workday", () => {
    const c = counts({ "2026-10-23": 8, "2026-10-26": 1 });
    expect(goalStreak(c, 8, "2026-10-27")).toBe(0);
  });
});

describe("tallies", () => {
  it("adds missed calls to calls logged and counts outcomes", () => {
    const t = tally(
      [call({ outcome: "booked", grade: "A" }), call({ outcome: "callback" }), call({ outcome: "spam", grade: "DQ", jobtread_sync_status: "pending" })],
      [missed("2026-10-27T15:00:00Z")],
    );
    expect(t).toMatchObject({ avgScore: 60, calls: 3, missed: 1, logged: 4, booked: 1, callbacks: 1, spam: 1, strong: 2, synced: 2 });
  });

  it("counts both calls and missed calls toward the day", () => {
    const c = dayCounts([call({}), call({ created_at: "2026-10-27T20:00:00Z" })], [missed("2026-10-27T16:00:00Z")]);
    expect(c.get("2026-10-27")).toBe(3);
  });

  it("lists callbacks due today or overdue, oldest first, and hides done ones", () => {
    const due = callbacksDue(
      [
        call({ id: "later", outcome: "callback", callback_at: "2026-10-29T14:00:00Z" }),
        call({ id: "today", outcome: "callback", callback_at: "2026-10-27T18:00:00Z" }),
        call({ id: "overdue", outcome: "callback", callback_at: "2026-10-25T14:00:00Z" }),
        call({ id: "done", outcome: "callback", callback_at: "2026-10-26T14:00:00Z", callback_done: true }),
        call({ id: "booked", outcome: "booked" }),
      ],
      "2026-10-27",
    );
    expect(due.map((c) => c.id)).toEqual(["overdue", "today"]);
  });

  it("ranks where callers heard about us", () => {
    expect(sourceTally([call({ source: "gbp" }), call({ source: "gbp" }), call({ source: null })])).toEqual([
      { source: "gbp", count: 2 },
      { source: "not asked", count: 1 },
    ]);
  });

  it("cheers without comparing people", () => {
    expect(cheer(1, 8)).toBe("First call of the day is in.");
    expect(cheer(5, 8)).toBe("Nice — that's 5 today. 3 to go.");
    expect(cheer(8, 8)).toMatch(/Daily goal reached/);
  });
});

describe("front-desk access rules", () => {
  const sql = readFileSync("supabase/migrations/20261030120100_front_desk_tracking.sql", "utf8");

  it("lets staff save and see only their own calls", () => {
    expect(sql).toMatch(/FOR INSERT TO authenticated\s+WITH CHECK \(public\.is_front_desk\(auth\.uid\(\)\) AND taken_by_user = auth\.uid\(\)\)/);
    expect(sql).toMatch(/FOR SELECT TO authenticated\s+USING \(public\.is_front_desk\(auth\.uid\(\)\) AND taken_by_user = auth\.uid\(\)\)/);
  });

  it("keeps missed calls out of JobTread and the team total free of personal rows", () => {
    const missedTable = sql.slice(sql.indexOf("CREATE TABLE IF NOT EXISTS public.missed_calls"), sql.indexOf("CREATE INDEX IF NOT EXISTS missed_calls_user_created_idx"));
    expect(missedTable).toContain("phone text");
    expect(missedTable).not.toMatch(/jobtread/i);
    // Missed calls are logged straight to their own table; nothing hands them to the CRM.
    expect(readFileSync("src/intake/useMyDay.ts", "utf8")).not.toMatch(/jobtread-sync/);
    expect(sql).toMatch(/front_desk_team_today\(\)\s+RETURNS TABLE \(calls integer, missed integer, booked integer\)/);
  });

  it("adds the role in its own migration, before anything uses it", () => {
    const role = readFileSync("supabase/migrations/20261030120000_front_desk_role.sql", "utf8");
    expect(role).toMatch(/ADD VALUE IF NOT EXISTS 'front_desk'/);
    expect(role).not.toMatch(/CREATE|POLICY/);
  });

  it("saves every call under the signed-in login", () => {
    const save = readFileSync("src/intake/save.ts", "utf8");
    expect(save).toMatch(/taken_by_user: takenByUser/);
  });
});

describe("rollout safety", () => {
  it("recognizes the missing-column error so a call still saves before the migration lands", async () => {
    const { isMissingTrackerColumn } = await import("@/intake/save");
    expect(isMissingTrackerColumn({ code: "PGRST204", message: "Could not find the 'taken_by_user' column of 'intake_leads' in the schema cache" })).toBe(true);
    expect(isMissingTrackerColumn({ code: "42501", message: "new row violates row-level security policy" })).toBe(false);
  });
});

describe("lead score", () => {
  it("labels each call with its score, and DQ calls as disqualified", async () => {
    const { scoreLabel } = await import("@/intake/tracker");
    expect(scoreLabel({ grade: "A", score: 88 })).toBe("88/100");
    expect(scoreLabel({ grade: "DQ", score: null })).toBe("Disqualified");
    expect(scoreLabel({ grade: "C", score: null })).toBe("No score");
  });
});

describe("shared login: calls count for whoever is on the phone", () => {
  it("keys listed people by id and Other by the typed name", async () => {
    const { callPersonKey, missedPersonKey, personKey } = await import("@/intake/tracker");
    expect(callPersonKey(call({}))).toBe("frank-id");
    expect(callPersonKey(call({ taken_by_person: null, taken_by: "Luke " }))).toBe("other:luke");
    expect(missedPersonKey({ person_id: null, person_name: "Luke" })).toBe("other:luke");
    expect(personKey({ id: null, name: "luke" })).toBe(personKey({ id: null, name: "Luke" }));
    expect(personKey({ id: "frank-id", name: "Frank" })).toBe("frank-id");
  });

  it("seeds Frank and Susan and records the person on every call and missed call", () => {
    const sql = readFileSync("supabase/migrations/20261030140000_front_desk_people.sql", "utf8");
    expect(sql).toMatch(/VALUES \('Frank', 8, 1\), \('Susan', 8, 2\)/);
    expect(sql).toMatch(/ADD COLUMN IF NOT EXISTS taken_by_person uuid/);
    expect(sql).toMatch(/ADD COLUMN IF NOT EXISTS person_id uuid/);
    expect(readFileSync("src/intake/save.ts", "utf8")).toMatch(/taken_by_person: takenByPerson/);
  });

  it("asks again each morning so yesterday's name never carries over", () => {
    const src = readFileSync("src/intake/onThePhone.tsx", "utf8");
    expect(src).toMatch(/s\.day === dayKey\(new Date\(\)\)/);
  });
});
