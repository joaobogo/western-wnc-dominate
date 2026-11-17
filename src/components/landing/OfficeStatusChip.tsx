import { useOfficeStatus } from "@/lib/office-hours";

/**
 * Live "office open / opens Monday" chip.
 *
 * Hydration rule (see scripts/prerender.mjs and hydration-safety.test): the
 * prerendered page is a browser snapshot, so anything that only appears after
 * mount must be tagged `data-client-only` (the snapshot drops it). The first
 * client render then matches the HTML exactly. An earlier version changed its
 * text after mount without the tag; the snapshot kept the live text, React
 * hit #425/#418/#423 and re-rendered the whole page on load.
 *
 * The outer slot is always rendered and reserves the chip's height, so nothing
 * shifts when the chip appears.
 */
export default function OfficeStatusChip({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const status = useOfficeStatus();
  const open = Boolean(status?.open);
  const toneClass = tone === "dark" ? "border-white/25 bg-white/10 text-white" : "border-border bg-card text-foreground";
  return (
    <span data-office-status-slot className={`flex min-h-8 items-center ${className}`}>
      {status?.label && (
        <span
          data-client-only
          data-office-status={open ? "open" : "closed"}
          className={`inline-flex min-h-8 items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${toneClass}`}
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rounded-full ${
              open ? "bg-[hsl(142_70%_40%)] shadow-[0_0_0_3px_hsl(142_70%_40%/0.25)]" : "bg-[hsl(var(--highland-gold))]"
            }`}
          />
          <span>{status.label}</span>
        </span>
      )}
    </span>
  );
}
