import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "@/components/reviews/ReviewCard";
import { REVIEWS, type Review, type ServiceTag } from "@/data/reviews";

/**
 * Horizontal carousel of published reviews.
 *
 * Built on CSS scroll-snap rather than a JS carousel so that every review is
 * in the prerendered HTML (crawlable, readable without JS) and swiping works
 * natively on touch. The arrows are a progressive enhancement on top.
 */
interface ReviewsCarouselProps {
  /** Restrict to these service tags. Omit to show every published review. */
  services?: ServiceTag[];
  heading?: string;
  subheading?: string;
  tone?: "light" | "dark";
  className?: string;
}

const ReviewsCarousel = ({
  services,
  heading,
  subheading,
  tone = "light",
  className = "",
}: ReviewsCarouselProps) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const reviews: Review[] = services?.length
    ? REVIEWS.filter((r) => r.service.some((s) => services.includes(s)))
    : REVIEWS;

  const sorted = [...reviews].sort((a, b) => b.date.localeCompare(a.date));

  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      el.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [syncArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (sorted.length === 0) return null;

  const dark = tone === "dark";
  const arrowBase =
    "inline-flex h-11 w-11 items-center justify-center rounded-sm border transition-colors disabled:opacity-30 disabled:cursor-not-allowed";
  const arrowTone = dark
    ? "border-dark-section-border text-dark-section-foreground hover:bg-dark-section-foreground/10"
    : "border-border text-foreground hover:bg-muted";

  return (
    <section
      aria-label="Customer reviews"
      aria-roledescription="carousel"
      className={className}
    >
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          {heading && (
            <h2
              className={`text-2xl md:text-3xl font-heading font-bold leading-tight ${
                dark ? "text-dark-section-foreground" : "text-foreground"
              }`}
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p
              className={`mt-2 font-body text-sm ${
                dark ? "text-dark-section-muted" : "text-muted-foreground"
              }`}
            >
              {subheading}
            </p>
          )}
        </div>

        {/* Touch devices swipe; the arrows are for pointer users. */}
        <div className="hidden md:flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous reviews"
            className={`${arrowBase} ${arrowTone}`}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next reviews"
            className={`${arrowBase} ${arrowTone}`}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={`${sorted.length} published customer reviews, scrollable`}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 -mx-1 px-1 scroll-smooth [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold))]"
      >
        {sorted.map((r) => (
          <li
            key={r.id}
            className="snap-start shrink-0 w-[86%] sm:w-[380px] lg:w-[400px]"
          >
            <ReviewCard review={r} tone={tone} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReviewsCarousel;
