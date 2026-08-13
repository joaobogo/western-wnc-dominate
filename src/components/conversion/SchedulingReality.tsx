import { CalendarClock, CloudSnow, AlertTriangle } from "lucide-react";

interface SchedulingRealityProps {
  serviceLabel?: string;
  className?: string;
}

/**
 * Truthful seasonal urgency: real lead times, real mountain weather windows,
 * real risk of postponing a compromised roof. No timers, scarcity, or discounts.
 */
const SchedulingReality = ({ serviceLabel = "roofing work", className = "" }: SchedulingRealityProps) => (
  <section className={`py-10 ${className}`}>
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto rounded-sm border border-border bg-card p-6 sm:p-8">
        <h2 className="font-heading text-xl sm:text-2xl text-foreground mb-4">
          Scheduling reality in the mountains
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="flex gap-3">
            <CalendarClock className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold block mb-1">Current lead time</span>
              Inspections are typically scheduled within a few business days. Scheduled {serviceLabel} usually starts a few weeks out, and that queue lengthens after every significant storm.
            </p>
          </div>
          <div className="flex gap-3">
            <CloudSnow className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold block mb-1">Weather windows narrow</span>
              At Western NC elevations, late fall and winter bring cold mornings, ice, and wind. Shingle sealing and safe steep-slope access both depend on dry, warmer days, so usable install days get scarce.
            </p>
          </div>
          <div className="flex gap-3">
            <AlertTriangle className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold block mb-1">Cost of waiting</span>
              If a roof is already compromised, water keeps moving through it. Small leaks turn into wet decking, insulation, and drywall, which widens the repair scope and the price.
            </p>
          </div>
        </div>
        <p className="text-xs font-body text-muted-foreground mt-5">
          We do not run countdown offers. If the roof can safely wait until spring, we will tell you that during the inspection.
        </p>
      </div>
    </div>
  </section>
);

export default SchedulingReality;