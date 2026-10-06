import { Clock, Calendar, Phone, MessageCircle } from "lucide-react";

/**
 * Honest office-hours block for the Contact page.
 *
 * Mirrors the NAP and hours in the Footer so every surface stays consistent.
 * No promises beyond what the team can actually keep: calls during working
 * hours, messages returned, and storm calls handled as fast as we can.
 */
const OfficeHours = ({ className = "" }: { className?: string }) => {
  const HOURS = [
    { day: "Monday", hours: "8:00 AM – 5:00 PM" },
    { day: "Tuesday", hours: "8:00 AM – 5:00 PM" },
    { day: "Wednesday", hours: "8:00 AM – 5:00 PM" },
    { day: "Thursday", hours: "8:00 AM – 5:00 PM" },
    { day: "Friday", hours: "8:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <div className={`border border-border bg-card p-6 md:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
          <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-heading font-bold text-foreground">Office Hours</h3>
      </div>

      <dl className="space-y-3 mb-6">
        {HOURS.map((item) => (
          <div key={item.day} className="flex items-center justify-between text-body-sm font-body">
            <dt className="text-muted-foreground">{item.day}</dt>
            <dd className={`font-semibold ${item.hours === "Closed" ? "text-[hsl(var(--gold-ink))]" : "text-foreground"}`}>
              {item.hours}
            </dd>
          </div>
        ))}
      </dl>

      <div className="pt-5 border-t border-border space-y-4">
        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-body-sm font-body font-semibold text-foreground">Call us directly</p>
            <p className="text-body-xs text-muted-foreground font-body">
              During working hours you&apos;ll reach our own team. If we&apos;re on a roof, leave a message and we&apos;ll return it.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MessageCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-body-sm font-body font-semibold text-foreground">Messages &amp; forms</p>
            <p className="text-body-xs text-muted-foreground font-body">
              Messages and forms are reviewed during staffed business hours. The team will contact you to discuss the appropriate next step.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-body-sm font-body font-semibold text-foreground">Weekend appointments</p>
            <p className="text-body-xs text-muted-foreground font-body">
              Available by arrangement when your schedule or an active leak demands it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeHours;
