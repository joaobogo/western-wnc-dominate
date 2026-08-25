import { useMemo, useState, type ReactNode } from "react";
import type { Option } from "./config";


export function Section({
  title,
  label,
  children,
  quiet,
}: {
  title: string;
  label: string;
  children: ReactNode;
  quiet?: boolean;
}) {
  return (
    <section
      className="hl-card p-4 sm:p-5 mb-4"
      style={quiet ? { background: "#F5F1E2" } : undefined}
    >
      <div className="flex items-baseline justify-between gap-3 border-b pb-2 mb-4" style={{ borderColor: "var(--hl-border)" }}>
        <h2 className="hl-slab text-xl">{title}</h2>
        <span className="hl-label">{label}</span>
      </div>
      {children}
    </section>
  );
}

export function Question({
  label,
  script,
  children,
}: {
  label: string;
  script?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="hl-q">{label}</div>
      {script && <div className="hl-script mt-0.5 mb-2">{script}</div>}
      <div className={script ? "" : "mt-2"}>{children}</div>
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  invalid,
  inputRef,
  inputMode,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  invalid?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  inputMode?: "text" | "tel" | "email";
}) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[13px] font-semibold mb-1">{label}</span>
      )}
      <input
        ref={inputRef}
        className="hl-input"
        data-invalid={invalid ? "true" : undefined}
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          // Enter never submits the sheet.
          if (e.key === "Enter") e.preventDefault();
        }}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[13px] font-semibold mb-1">{label}</span>
      )}
      <textarea
        className="hl-input"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

type ChoiceProps = {
  options: Option[];
  value: string | null;
  onChange: (id: string | null) => void;
  columns?: 1 | 2 | 3 | 4;
  clearable?: boolean;
  invalid?: boolean;
  groupRef?: React.Ref<HTMLDivElement>;
};

const COL_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function Choices({
  options,
  value,
  onChange,
  columns = 3,
  clearable = true,
  invalid,
  groupRef,
}: ChoiceProps) {
  return (
    <div
      ref={groupRef}
      className={`hl-choicegroup grid gap-2 ${COL_CLASS[columns]}`}
      data-invalid={invalid ? "true" : undefined}
    >
      {options.map((o) => {
        const selected = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            className="hl-choice"
            aria-pressed={selected}
            data-tone={o.tone}
            onClick={() => onChange(selected && clearable ? null : o.id)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Compact, auto-width chips that wrap. Used where the option list is long
 * (towns) so the sheet stays short instead of turning into a button wall.
 */
export function Pills({
  options,
  value,
  onChange,
  clearable = true,
}: {
  options: Option[];
  value: string | null;
  onChange: (id: string | null) => void;
  clearable?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const selected = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            className="hl-pill"
            aria-pressed={selected}
            data-tone={o.tone}
            onClick={() => onChange(selected && clearable ? null : o.id)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Town selection as a single type-to-filter field instead of ~30 stacked
 * buttons. Typing narrows every group at once; clearing restores the groups.
 */
export function TownPicker({
  core,
  nearby,
  extras,
  value,
  onChange,
  invalid,
  groupRef,
}: {
  core: Option[];
  nearby: Option[];
  extras: Option[];
  value: string | null;
  onChange: (id: string | null) => void;
  invalid?: boolean;
  groupRef?: React.Ref<HTMLDivElement>;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filter = (list: Option[]) =>
    q ? list.filter((o) => o.label.toLowerCase().includes(q)) : list;

  const coreHits = useMemo(() => filter(core), [core, q]);
  const nearbyHits = useMemo(() => filter(nearby), [nearby, q]);
  const noHits = q.length > 0 && coreHits.length === 0 && nearbyHits.length === 0;

  return (
    <div
      ref={groupRef}
      className="hl-choicegroup"
      data-invalid={invalid ? "true" : undefined}
    >
      <input
        className="hl-input"
        type="text"
        value={query}
        placeholder="Type a town to filter…"
        aria-label="Filter towns"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          // Enter picks the single remaining match — fastest path on a call.
          const hits = [...coreHits, ...nearbyHits];
          if (hits.length === 1) {
            onChange(hits[0].id);
            setQuery("");
          }
        }}
      />

      {coreHits.length > 0 && (
        <div className="mt-3">
          <div className="hl-label mb-1.5">Core — Macon &amp; Jackson counties</div>
          <Pills options={coreHits} value={value} onChange={onChange} />
        </div>
      )}

      {nearbyHits.length > 0 && (
        <div className="mt-3">
          <div className="hl-label mb-1.5">Neighboring counties</div>
          <Pills options={nearbyHits} value={value} onChange={onChange} />
        </div>
      )}

      {noHits && (
        <p className="mt-3 text-[13.5px] hl-script">
          No match — use “Other” or “Outside our area” below.
        </p>
      )}

      <div className="mt-3">
        <Pills options={extras} value={value} onChange={onChange} />
      </div>
    </div>
  );
}

export function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="hl-toggle"
      aria-pressed={value}
      onClick={() => onChange(!value)}
    >
      <span className="hl-track">
        <span className="hl-knob" />
      </span>
      <span>{label}</span>
    </button>
  );
}

