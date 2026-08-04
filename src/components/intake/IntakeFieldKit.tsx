import { ReactNode } from "react";

/* Small typed primitives so both intake forms feel identical. */

export const Label = ({
  children,
  required,
  htmlFor,
  id,
}: {
  children: ReactNode;
  required?: boolean;
  /** Associates the label with its control so screen readers announce it. */
  htmlFor?: string;
  id?: string;
}) => (
  <label
    htmlFor={htmlFor}
    id={id}
    className="block text-[14px] md:text-[15px] font-body font-bold text-foreground/90 mb-2 tracking-wide"
  >
    {children}{" "}
    {required && (
      <span className="text-[hsl(var(--gold-ink))]" aria-hidden="true">
        *
      </span>
    )}
    {required && <span className="sr-only">(required)</span>}
  </label>
);

export const Helper = ({ children }: { children: ReactNode }) => (
  <p className="text-[13px] md:text-[14px] text-muted-foreground mt-1.5 font-body leading-snug">{children}</p>
);

/** Inline, per-field validation message. Always rendered under the input. */
export const FieldError = ({ id, children }: { id?: string; children?: ReactNode }) =>
  children ? (
    <p
      id={id}
      role="alert"
      className="text-[13px] md:text-[14px] text-destructive mt-1.5 font-body leading-snug"
    >
      {children}
    </p>
  ) : null;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = ({ invalid, ...props }: InputProps) => (
  <input
    {...props}
    aria-invalid={invalid || undefined}
    className={`w-full bg-background border rounded-none px-5 py-4 text-[16px] md:text-[18px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
      invalid
        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
        : "border-border focus:border-[hsl(var(--highland-gold))] focus:ring-[hsl(var(--highland-gold)/0.15)]"
    }`}
  />
);

export const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full bg-background border border-border rounded-none px-5 py-4 text-[16px] md:text-[18px] font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--highland-gold))] focus:ring-2 focus:ring-[hsl(var(--highland-gold)/0.15)] transition-colors resize-none"
  />
);

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full bg-background border border-border rounded-none px-5 py-4 text-[16px] md:text-[18px] font-body text-foreground focus:outline-none focus:border-[hsl(var(--highland-gold))] focus:ring-2 focus:ring-[hsl(var(--highland-gold)/0.15)] transition-colors"
  />
);

type ChipOption = { value: string; label: string; sub?: string };

export const ChipGroup = ({
  options, value, onChange, columns = 2, ariaLabel, labelledBy,
}: {
  options: ChipOption[];
  value: string;
  onChange: (v: string) => void;
  columns?: 2 | 3 | 4;
  /** Accessible name when there is no associated visible label element. */
  ariaLabel?: string;
  /** id of the visible label element describing this choice group. */
  labelledBy?: string;
}) => {
  const cols = columns === 4 ? "sm:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div
      className={`grid grid-cols-1 ${cols} gap-2.5`}
      role="radiogroup"
      aria-label={labelledBy ? undefined : ariaLabel}
      aria-labelledby={labelledBy}
    >
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`text-left rounded-none border px-5 py-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              active
                ? "border-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.06)] text-foreground"
                : "border-border bg-background text-muted-foreground hover:border-foreground/30"
            }`}
          >
            <div className="text-[15px] md:text-[16px] font-body font-bold leading-tight">{o.label}</div>
            {o.sub && <div className="text-[11.5px] text-muted-foreground mt-0.5 font-body">{o.sub}</div>}
          </button>
        );
      })}
    </div>
  );
};

export const FieldRow = ({ children }: { children: ReactNode }) => (
  <div className="grid sm:grid-cols-2 gap-4">{children}</div>
);

export const StepDots = ({ total, current }: { total: number; current: number }) => (
  <div
    className="flex items-center gap-1.5"
    role="progressbar"
    aria-valuemin={1}
    aria-valuemax={total}
    aria-valuenow={current + 1}
    aria-label={`Step ${current + 1} of ${total}`}
  >
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1 rounded-full transition-all duration-300 ${
          i === current ? "w-8 bg-[hsl(var(--highland-gold))]" : i < current ? "w-4 bg-[hsl(var(--highland-gold)/0.5)]" : "w-4 bg-border"
        }`}
      />
    ))}
  </div>
);

/**
 * Continuous progress bar for longer flows. Pairs with StepDots on wide
 * layouts and replaces it where horizontal room is tight (mobile).
 */
export const ProgressIndicator = ({
  total,
  current,
  label,
}: {
  total: number;
  current: number;
  label?: string;
}) => {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-foreground/80">
          Step {current + 1} of {total}
        </span>
        {label && <span className="text-[11px] font-body text-muted-foreground">{label}</span>}
      </div>
      <div
        className="h-1 w-full rounded-full bg-border overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={`Form progress: step ${current + 1} of ${total}`}
      >
        <div
          className="h-full bg-[hsl(var(--highland-gold))] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};