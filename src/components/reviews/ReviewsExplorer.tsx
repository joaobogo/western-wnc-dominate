import { useMemo, useState } from "react";
import ReviewCard from "@/components/reviews/ReviewCard";
import {
  REVIEWS,
  SERVICE_LABELS,
  availableServiceTags,
  availableTowns,
  type ServiceTag,
} from "@/data/reviews";

/**
 * The full published-review list with service and town filters (/reviews).
 *
 * Filters only ever offer values that real reviews carry, so a visitor can
 * never land on an empty result by using the controls as intended.
 */
const ReviewsExplorer = () => {
  const [service, setService] = useState<ServiceTag | "all">("all");
  const [town, setTown] = useState<string>("all");

  const serviceTags = useMemo(availableServiceTags, []);
  const towns = useMemo(availableTowns, []);

  const shown = useMemo(
    () =>
      REVIEWS.filter(
        (r) =>
          (service === "all" || r.service.includes(service)) &&
          (town === "all" || r.town === town),
      ).sort((a, b) => b.date.localeCompare(a.date)),
    [service, town],
  );

  const chip = (active: boolean) =>
    `px-3 py-2 min-h-[44px] md:min-h-0 inline-flex items-center text-caption font-body font-semibold uppercase tracking-[0.12em] border rounded-sm transition-colors ${
      active
        ? "border-foreground bg-foreground text-background"
        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <fieldset>
          <legend className="text-caption font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Filter by service
          </legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chip(service === "all")} onClick={() => setService("all")}>
              All
            </button>
            {serviceTags.map((t) => (
              <button key={t} type="button" className={chip(service === t)} onClick={() => setService(t)}>
                {SERVICE_LABELS[t]}
              </button>
            ))}
          </div>
        </fieldset>

        {towns.length > 0 && (
          <fieldset>
            <legend className="text-caption font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Filter by town
            </legend>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={chip(town === "all")} onClick={() => setTown("all")}>
                All
              </button>
              {towns.map((t) => (
                <button key={t} type="button" className={chip(town === t)} onClick={() => setTown(t)}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <p className="text-caption font-body text-muted-foreground mb-6" aria-live="polite">
        Showing {shown.length} of {REVIEWS.length} published reviews.
      </p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsExplorer;
