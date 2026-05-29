import { Check } from "lucide-react";

export type VisualChoice = {
  value: string;
  label: string;
  sub?: string;
  image?: string;
  badge?: string;
};

type Props = {
  options: VisualChoice[];
  value: string | string[];
  onChange: (v: string) => void;
  multi?: boolean;
  columns?: 2 | 3;
};

/**
 * Premium image-led selection grid for material / scope choices.
 * Single or multi-select. Falls back to typography cards if no image.
 */
const VisualChoiceGrid = ({ options, value, onChange, multi, columns = 2 }: Props) => {
  const cols = columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  const isActive = (v: string) => (Array.isArray(value) ? value.includes(v) : value === v);

  return (
    <div className={`grid grid-cols-1 ${cols} gap-3`}>
      {options.map((o) => {
        const active = isActive(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`group relative text-left rounded-lg border overflow-hidden transition-all ${
              active
                ? "border-[hsl(var(--highland-gold))] ring-2 ring-[hsl(var(--highland-gold)/0.25)]"
                : "border-border hover:border-foreground/30"
            }`}
          >
            {o.image && (
              <div className="relative aspect-[5/3] overflow-hidden bg-secondary/30">
                <img
                  src={o.image}
                  alt={o.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--heritage-charcoal)/0.45)] via-transparent to-transparent" />
                {o.badge && (
                  <span className="absolute top-2 left-2 bg-[hsl(var(--heritage-charcoal)/0.78)] backdrop-blur-sm text-white text-[9.5px] font-body font-semibold uppercase tracking-[0.14em] px-2 py-1 rounded-sm">
                    {o.badge}
                  </span>
                )}
                {active && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[hsl(var(--highland-gold))] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[hsl(var(--heritage-charcoal))]" strokeWidth={3} />
                  </span>
                )}
              </div>
            )}
            <div className="p-4 bg-card">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[16px] md:text-[18px] font-heading font-bold text-foreground tracking-tight leading-tight">
                  {o.label}
                </span>
                {!o.image && active && (
                  <Check className="w-4 h-4 text-[hsl(var(--highland-gold))]" strokeWidth={3} />
                )}
              </div>
              {o.sub && (
                <p className="text-[11.5px] text-foreground/55 mt-1 font-body leading-snug">{o.sub}</p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default VisualChoiceGrid;