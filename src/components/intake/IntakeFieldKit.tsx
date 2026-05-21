import { ReactNode } from "react";

/* Small typed primitives so both intake forms feel identical. */

export const Label = ({ children, required }: { children: ReactNode; required?: boolean }) => (
  <label className="block text-[12.5px] font-body font-semibold text-foreground/80 mb-2 tracking-wide">
    {children} {required && <span className="text-[hsl(var(--highland-gold))]">*</span>}
  </label>
);

export const Helper = ({ children }: { children: ReactNode }) => (
  <p className="text-[11.5px] text-foreground/50 mt-1.5 font-body leading-snug">{children}</p>
);

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full bg-background border border-border rounded-md px-4 py-3 text-[14px] font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-[hsl(var(--highland-gold))] focus:ring-2 focus:ring-[hsl(var(--highland-gold)/0.15)] transition-colors"
  />
);

export const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full bg-background border border-border rounded-md px-4 py-3 text-[14px] font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-[hsl(var(--highland-gold))] focus:ring-2 focus:ring-[hsl(var(--highland-gold)/0.15)] transition-colors resize-none"
  />
);

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full bg-background border border-border rounded-md px-4 py-3 text-[14px] font-body text-foreground focus:outline-none focus:border-[hsl(var(--highland-gold))] focus:ring-2 focus:ring-[hsl(var(--highland-gold)/0.15)] transition-colors"
  />
);

type ChipOption = { value: string; label: string; sub?: string };

export const ChipGroup = ({
  options, value, onChange, columns = 2,
}: {
  options: ChipOption[];
  value: string;
  onChange: (v: string) => void;
  columns?: 2 | 3 | 4;
}) => {
  const cols = columns === 4 ? "sm:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 ${cols} gap-2.5`}>
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`text-left rounded-md border px-4 py-3 transition-all ${
              active
                ? "border-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.06)] text-foreground"
                : "border-border bg-background text-foreground/70 hover:border-foreground/30"
            }`}
          >
            <div className="text-[13.5px] font-body font-semibold leading-tight">{o.label}</div>
            {o.sub && <div className="text-[11.5px] text-foreground/50 mt-0.5 font-body">{o.sub}</div>}
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
  <div className="flex items-center gap-1.5">
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