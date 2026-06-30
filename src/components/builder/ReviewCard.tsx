import { ReactNode } from "react";
import { Check } from "lucide-react";

type Row = { label: string; value?: string | string[] | null };

type Props = {
  rows: Row[];
  onEdit?: (group: string) => void;
  children?: ReactNode;
};

/**
 * Polished pre-submit review surface. Groups the brief into clean rows
 * with a quiet "Edit" affordance, then renders the contact form below.
 */
const ReviewCard = ({ rows, children }: Props) => {
  const filled = rows.filter((r) => r.value && (Array.isArray(r.value) ? r.value.length : true));
  return (
    <div className="space-y-7">
      <div className="rounded-lg border border-[hsl(var(--heritage-green)/0.22)] bg-[hsl(var(--heritage-green)/0.04)] overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[hsl(var(--heritage-green)/0.18)] bg-[hsl(var(--heritage-green)/0.06)]">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[hsl(var(--heritage-green))]">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </span>
          <span className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-[hsl(var(--heritage-green))]">
            Your project brief
          </span>
        </div>
        <dl className="divide-y divide-[hsl(var(--heritage-green)/0.12)]">
          {filled.length === 0 && (
            <div className="px-5 py-4 text-[12.5px] font-body text-foreground/80">No selections yet.</div>
          )}
          {filled.map((r) => (
            <div key={r.label} className="px-5 py-3 grid grid-cols-[120px,1fr] sm:grid-cols-[160px,1fr] gap-3 items-start">
              <dt className="text-[10.5px] font-body font-bold uppercase tracking-[0.18em] text-foreground/55 pt-0.5">
                {r.label}
              </dt>
              <dd className="text-[13px] font-body text-foreground/90 leading-snug">
                {Array.isArray(r.value) ? r.value.join(" · ") : r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {children}
    </div>
  );
};

export default ReviewCard;