import { FRANKLIN } from "@/data/business";
import { formatHour, useOfficeStatus } from "@/lib/office-hours";

/** "Mon–Fri · 8 AM–5 PM ET", built from business.ts so it can never drift. */
export function officeHoursShort(): string {
  const block = FRANKLIN.hours[0];
  if (!block) return "";
  const first = block.days[0]?.slice(0, 3);
  const last = block.days[block.days.length - 1]?.slice(0, 3);
  const days = first === last ? first : `${first}–${last}`;
  return `${days} · ${formatHour(block.opens)}–${formatHour(block.closes)} ET`;
}

/**
 * Live "office open / opens Monday" chip. The prerendered HTML shows the
 * published hours (no time-dependent claim); the live status replaces it after
 * hydration, so crawlers and the first paint never disagree.
 */
export default function OfficeStatusChip({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const status = useOfficeStatus();
  const label = status?.label || `Franklin office · ${officeHoursShort()}`;
  const open = Boolean(status?.open);
  const toneClass =
    tone === "dark"
      ? "border-white/25 bg-white/10 text-white"
      : "border-border bg-card text-foreground";
  return (
    <span
      data-office-status={status ? (open ? "open" : "closed") : "hours"}
      className={`inline-flex min-h-8 items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${toneClass} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 rounded-full ${
          open ? "bg-[hsl(142_70%_40%)] shadow-[0_0_0_3px_hsl(142_70%_40%/0.25)]" : "bg-[hsl(var(--highland-gold))]"
        }`}
      />
      <span>{label}</span>
    </span>
  );
}
