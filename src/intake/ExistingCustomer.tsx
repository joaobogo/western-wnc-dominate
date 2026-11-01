import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type CustomerJob = { id: string; name: string; number: string; createdAt: string; open: boolean };
export type CustomerLookup = {
  found: boolean;
  accountName?: string;
  contactName?: string;
  matchedBy?: "phone" | "email";
  locations?: Array<{ name: string; address: string }>;
  jobs?: CustomerJob[];
};

type State =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "done"; result: CustomerLookup }
  | { status: "error" };

/** What to look up: a full 10-digit phone and/or a complete email, or null if neither is ready yet. */
export function lookupKey(phone: string, email: string): { phone: string; email: string } | null {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  const okPhone = digits.length === 10 ? digits : "";
  const okEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()) ? email.trim().toLowerCase() : "";
  return okPhone || okEmail ? { phone: okPhone, email: okEmail } : null;
}

/** Checks JobTread for the caller while they're still on the phone (read-only). */
export function useCustomerLookup(phone: string, email: string, name: string): State {
  const key = lookupKey(phone, email);
  const keyStr = key ? `${key.phone}|${key.email}` : "";
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    if (!keyStr) {
      setState({ status: "idle" });
      return;
    }
    let cancelled = false;
    setState({ status: "checking" });
    const timer = setTimeout(async () => {
      const [p, e] = keyStr.split("|");
      const { data, error } = await supabase.functions.invoke("jobtread-sync", {
        body: { action: "customer_lookup", phone: p, email: e, name },
      });
      if (cancelled) return;
      if (error || !data?.ok) setState({ status: "error" });
      else setState({ status: "done", result: data as CustomerLookup });
    }, 700);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // The name only helps pick the right person on a shared account; don't re-query on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyStr]);

  return state;
}

const jobDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric" });
};

export function ExistingCustomerCard({ phone, email, name }: { phone: string; email: string; name: string }) {
  const state = useCustomerLookup(phone, email, name);
  if (state.status === "idle") return null;
  if (state.status === "checking") {
    return <p className="mb-5 text-[13px] opacity-70">Checking JobTread for this caller…</p>;
  }
  if (state.status === "error") {
    return <p className="mb-5 text-[13px] opacity-70">Couldn't check JobTread right now. Fill in the sheet as usual.</p>;
  }
  const r = state.result;
  if (!r.found) {
    return <p className="mb-5 text-[13px] opacity-70">New caller. Not in JobTread yet.</p>;
  }
  const open = (r.jobs ?? []).filter((j) => j.open);
  return (
    <div className="hl-card mb-5 p-4 text-[14px]" role="status" data-testid="existing-customer">
      <p className="font-bold">
        Already a customer: {r.accountName || r.contactName}
        <span className="ml-1 font-normal opacity-70">(matched by {r.matchedBy})</span>
      </p>
      {r.locations && r.locations.length > 0 && (
        <p className="mt-1 opacity-80">{r.locations.map((l) => l.address || l.name).filter(Boolean).join(" · ")}</p>
      )}
      {r.jobs && r.jobs.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {r.jobs.map((j) => (
            <li key={j.id}>
              <a
                href={`https://app.jobtread.com/jobs/${encodeURIComponent(j.id)}`}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                {j.number ? `#${j.number} ` : ""}
                {j.name || "Job"}
              </a>
              <span className="opacity-70">
                {" "}
                · {j.open ? "open" : "closed"}
                {jobDate(j.createdAt) ? ` · ${jobDate(j.createdAt)}` : ""}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 opacity-80">No jobs on file yet.</p>
      )}
      <p className="mt-2 text-[13px]">
        {open.length > 0
          ? "If they're calling about one of these open jobs, add a note to that job in JobTread instead of saving a new lead."
          : "Saving this lead adds a new job under the same customer. No duplicate customer is created."}
      </p>
    </div>
  );
}
