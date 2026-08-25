import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GRADE_COLORS } from "./config";
import { formatCallBy } from "./business-time";
import { TABLE, db, type IntakeRow } from "./save";

function Row({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-1.5 border-b" style={{ borderColor: "var(--hl-border)" }}>
      <div className="hl-label shrink-0" style={{ width: 150 }}>
        {label}
      </div>
      <div className="text-[15px] min-w-0 break-words">{value}</div>
    </div>
  );
}

export default function LeadView() {
  const { id } = useParams();
  const [row, setRow] = useState<IntakeRow | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    db.from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else if (!data) setError("That lead no longer exists.");
        else setRow(data as IntakeRow);
      });
  }, [id]);

  if (error)
    return (
      <div className="mx-auto max-w-[720px] px-4 py-6">
        <p style={{ color: "var(--hl-red)" }}>{error}</p>
        <Link to="/intake/queue" className="hl-btn-quiet inline-block mt-4">
          Back to queue
        </Link>
      </div>
    );

  if (!row)
    return <div className="mx-auto max-w-[720px] px-4 py-6">Loading…</div>;

  const colors = GRADE_COLORS[row.grade] ?? GRADE_COLORS.D;
  const appt = row.appointment ?? {};
  const apptEntries = Object.entries(appt).filter(([, v]) => v);

  return (
    <div className="mx-auto max-w-[720px] px-4 py-5">
      <Link to="/intake/queue" className="hl-label hover:underline">
        ← QUEUE
      </Link>

      <div className="hl-card p-4 sm:p-5 mt-3">
        <div className="flex items-center gap-4">
          <div
            className="hl-slab flex items-center justify-center shrink-0"
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              fontSize: 26,
              background: colors.bg,
              color: colors.fg,
            }}
          >
            {row.grade}
          </div>
          <div>
            <h1 className="hl-slab text-2xl">
              {[row.first_name, row.last_name].filter(Boolean).join(" ") || "No name"}
            </h1>
            <p className="text-[14px]" style={{ color: "#4b5563" }}>
              {row.score !== null ? `${row.score}/100 · ` : ""}
              {row.call_by
                ? `Call by ${formatCallBy(new Date(row.call_by))}`
                : "No call-back required"}
            </p>
          </div>
        </div>

        {row.gates?.length > 0 && (
          <div className="mt-4">
            {row.gates.map((g) => (
              <p key={g.id} className="text-[14.5px]" style={{ color: "var(--hl-red)" }}>
                {g.reason} — {g.say}
              </p>
            ))}
          </div>
        )}
        {row.flags?.length > 0 && (
          <ul className="mt-3 text-[14.5px] list-disc pl-5">
            {row.flags.map((f) => (
              <li key={f.id}>{f.text}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="hl-card p-4 sm:p-5 mt-4">
        <h2 className="hl-slab text-lg mb-3">Details</h2>
        <Row label="PHONE" value={row.phone} />
        <Row label="EMAIL" value={row.email} />
        <Row label="PREFERS" value={row.preferred_contact} />
        <Row label="BEST TIME" value={row.best_time} />
        <Row label="ADDRESS" value={row.address} />
        <Row label="TOWN" value={row.town} />
        <Row label="TIER" value={row.location_tier} />
        <Row label="RELATIONSHIP" value={row.relationship} />
        <Row label="OWNER" value={row.owner_name} />
        <Row label="OWNER CONTACT" value={row.owner_contact} />
        <Row label="PROPERTY" value={row.property_type} />
        <Row label="JOB" value={row.job_type} />
        <Row label="TIMING" value={row.timing} />
        <Row label="BUDGET" value={row.budget_range} />
        <Row label="NOTES" value={row.details} />
        <Row label="SOURCE" value={[row.source, row.source_detail].filter(Boolean).join(" — ") || null} />
        <Row label="CHANNEL" value={row.channel} />
        <Row label="TAKEN BY" value={row.taken_by} />
        <Row label="STATUS" value={row.status} />
        <Row label="RECEIVED" value={formatCallBy(new Date(row.created_at))} />
        <Row label="SCORING" value={row.score_version} />
      </div>

      {apptEntries.length > 0 && (
        <div className="hl-card p-4 sm:p-5 mt-4">
          <h2 className="hl-slab text-lg mb-3">Appointment details</h2>
          {apptEntries.map(([k, v]) => (
            <Row key={k} label={k.replace(/([A-Z])/g, " $1").toUpperCase()} value={v} />
          ))}
        </div>
      )}
    </div>
  );
}
