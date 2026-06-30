import { ReactNode } from "react";

type Row = { label: string; value?: string | string[] | null };

const ScopeSummary = ({ rows, emptyHint }: { rows: Row[]; emptyHint?: string }) => {
  const filled = rows.filter((r) => r.value && (Array.isArray(r.value) ? r.value.length : true));
  if (filled.length === 0) {
    return (
      <p className="text-[12.5px] font-body text-foreground/80 leading-relaxed">
        {emptyHint ?? "Your selections will appear here as you build."}
      </p>
    );
  }
  return (
    <dl className="space-y-3">
      {filled.map((r) => (
        <div key={r.label}>
          <dt className="text-[10px] font-body font-bold uppercase tracking-[0.18em] text-foreground/80 mb-0.5">
            {r.label}
          </dt>
          <dd className="text-[13px] font-body text-foreground/85 leading-snug">
            {Array.isArray(r.value) ? r.value.join(" · ") : r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default ScopeSummary;