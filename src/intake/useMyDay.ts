import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TABLE, db } from "./save";
import { CALL_COLUMNS, addDays, dayKey, type CallRow, type MissedRow, type Outcome, type PhonePerson } from "./tracker";

export type TeamToday = { calls: number; missed: number; booked: number };

/**
 * Calls and missed calls saved under this login (60 days, enough for the
 * streak and the 30-day strip) plus the team's total for today. The office
 * shares one login, so the card narrows these to whoever is on the phone.
 */
export function useMyDay(userId: string) {
  const [calls, setCalls] = useState<CallRow[]>([]);
  const [missed, setMissed] = useState<MissedRow[]>([]);
  const [team, setTeam] = useState<TeamToday | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const sinceIso = `${addDays(dayKey(new Date()), -60)}T00:00:00Z`;
    const [callsRes, missedRes, teamRes] = await Promise.all([
      db.from(TABLE).select(CALL_COLUMNS).eq("taken_by_user", userId).gte("created_at", sinceIso).order("created_at", { ascending: false }),
      db.from("missed_calls").select("*").eq("user_id", userId).gte("created_at", sinceIso).order("created_at", { ascending: false }),
      // Added by the 20261030 migration; the generated types lag behind.
      supabase.rpc("front_desk_team_today" as never),
    ]);
    if (callsRes.error || missedRes.error) setError((callsRes.error ?? missedRes.error)!.message);
    else setError(null);
    setCalls((callsRes.data ?? []) as unknown as CallRow[]);
    setMissed((missedRes.data ?? []) as MissedRow[]);
    const teamRows: unknown = teamRes.data;
    const row = Array.isArray(teamRows) ? (teamRows[0] as TeamToday | undefined) : undefined;
    setTeam(row ?? null);
    setLoaded(true);
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setOutcome = useCallback(async (id: string, outcome: Outcome | null, callbackAt?: string | null) => {
    const patch = {
      outcome,
      outcome_at: outcome ? new Date().toISOString() : null,
      callback_at: outcome === "callback" ? callbackAt ?? null : null,
      callback_done: false,
    };
    const { error: err } = await db.from(TABLE).update(patch).eq("id", id);
    if (err) throw new Error(err.message);
    setCalls((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }, []);

  const markCallbackDone = useCallback(async (id: string) => {
    const { error: err } = await db.from(TABLE).update({ callback_done: true }).eq("id", id);
    if (err) throw new Error(err.message);
    setCalls((prev) => prev.map((c) => (c.id === id ? { ...c, callback_done: true } : c)));
  }, []);

  const logMissed = useCallback(
    async (phone: string, note: string, person: PhonePerson) => {
      const { data, error: err } = await db
        .from("missed_calls")
        .insert({
          user_id: userId,
          person_id: person.id,
          person_name: person.name,
          phone: phone.trim() || null,
          note: note.trim() || null,
        })
        .select("*")
        .single();
      if (err) throw new Error(err.message);
      setMissed((prev) => [data as MissedRow, ...prev]);
      setTeam((t) => (t ? { ...t, missed: t.missed + 1 } : t));
    },
    [userId],
  );

  const markMissedCalledBack = useCallback(async (id: string) => {
    const patch = { called_back: true, called_back_at: new Date().toISOString() };
    const { error: err } = await db.from("missed_calls").update(patch).eq("id", id);
    if (err) throw new Error(err.message);
    setMissed((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }, []);

  return { calls, missed, team, loaded, error, refresh, setOutcome, markCallbackDone, logMissed, markMissedCalledBack };
}

export type MyDay = ReturnType<typeof useMyDay>;
