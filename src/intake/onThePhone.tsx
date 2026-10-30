import { useCallback, useEffect, useState } from "react";
import { db } from "./save";
import { dayKey, OTHER_GOAL, type PhonePerson } from "./tracker";

export type ListedPerson = { id: string; name: string; daily_goal: number; active: boolean; sort: number };

const STORAGE_KEY = "hl_on_the_phone";

/** The people who answer the phone (Frank, Susan, …), managed on the Team page. */
export function usePeople(includeInactive = false) {
  const [people, setPeople] = useState<ListedPerson[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    const query = db.from("front_desk_people").select("id, name, daily_goal, active, sort").order("sort").order("name");
    const { data, error: err } = await (includeInactive ? query : query.eq("active", true));
    if (err) setError(err.message);
    setPeople((data ?? []) as ListedPerson[]);
  }, [includeInactive]);
  useEffect(() => {
    void load();
  }, [load]);
  return { people, error, reload: load };
}

type Stored = { id: string | null; name: string; day: string };

const read = (): Stored | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
};

/**
 * Who is answering the phone on this computer. The office shares one login,
 * so every call is credited to the person picked here. The choice is kept for
 * the day and asked again each morning, so yesterday's name never carries over.
 */
export function useOnThePhone(people: ListedPerson[] | null) {
  const [stored, setStored] = useState<Stored | null>(() => {
    const s = read();
    return s && s.day === dayKey(new Date()) ? s : null;
  });

  const choose = useCallback((id: string | null, name: string) => {
    const next = { id, name: name.trim(), day: dayKey(new Date()) };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* private window: the choice lasts until the tab closes */
    }
    setStored(next);
  }, []);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setStored(null);
  }, []);

  // A listed person who was removed (or renamed) since the choice was made is asked again.
  let person: PhonePerson | null = null;
  if (stored && people) {
    if (stored.id === null) person = { id: null, name: stored.name, daily_goal: OTHER_GOAL };
    else {
      const p = people.find((x) => x.id === stored.id);
      if (p) person = { id: p.id, name: p.name, daily_goal: p.daily_goal };
    }
  }
  return { person, choose, clear };
}

export type OnThePhone = ReturnType<typeof useOnThePhone>;

/** Big, simple "Who's on the phone?" buttons: each listed person, plus Other with a name. */
export function PersonPicker({ people, onChoose }: { people: ListedPerson[]; onChoose: (id: string | null, name: string) => void }) {
  const [otherOpen, setOtherOpen] = useState(false);
  const [otherName, setOtherName] = useState("");
  return (
    <section className="hl-card p-5 sm:p-6 mb-4" aria-label="Who's on the phone?" style={{ borderColor: "var(--hl-brass)", borderWidth: 2 }}>
      <h2 className="hl-slab text-[24px]">Who's on the phone?</h2>
      <p className="text-[15px] mt-1 opacity-80">Pick your name so your calls count for you today.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {people.map((p) => (
          <button key={p.id} type="button" className="hl-choice !py-5 !text-[19px] font-semibold" onClick={() => onChoose(p.id, p.name)}>
            {p.name}
          </button>
        ))}
        <button type="button" className="hl-choice !py-5 !text-[19px] font-semibold" aria-pressed={otherOpen} onClick={() => setOtherOpen(true)}>
          Other
        </button>
      </div>
      {otherOpen && (
        <form
          className="mt-4 flex flex-wrap items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (otherName.trim()) onChoose(null, otherName);
          }}
        >
          <label className="block min-w-[220px] flex-1 sm:flex-none">
            <span className="block text-[14px] font-semibold mb-1">Your name</span>
            <input className="hl-input" autoFocus value={otherName} maxLength={40} onChange={(e) => setOtherName(e.target.value)} />
          </label>
          <button type="submit" className="hl-btn-primary" disabled={!otherName.trim()}>
            Start
          </button>
        </form>
      )}
    </section>
  );
}
