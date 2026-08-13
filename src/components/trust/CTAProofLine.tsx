import { Star, ShieldCheck, MapPin } from "lucide-react";
import { GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";

/**
 * One-line sourced proof designed to sit directly beside a primary CTA.
 * Every claim is verifiable: the Google aggregate comes from src/data/reviews,
 * the license/insurance status and the 2017 start date are company facts, and
 * the county count comes from the towns we publish service pages for.
 * No invented statistics, reviews, warranties, or response guarantees.
 */
interface CTAProofLineProps {
  /** Optional area to name instead of the county count, e.g. "Macon County". */
  area?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}

const CTAProofLine = ({ area, tone = "light", align = "center", className = "" }: CTAProofLineProps) => {
  const { ratingValue, reviewCount } = GOOGLE_REVIEW_AGGREGATE;
  const text = tone === "dark" ? "text-dark-section-foreground" : "text-muted-foreground";

  const items = [
    { icon: Star, label: `${ratingValue}★ Google · ${reviewCount}+ reviews`, strong: true },
    { icon: ShieldCheck, label: "Licensed & insured · family-owned since 2017" },
    { icon: MapPin, label: area ? `Franklin-based crews serving ${area}` : "Franklin-based crews across 9 WNC counties" },
  ];

  return (
    <ul
      aria-label="Proof points"
      className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 ${align === "center" ? "justify-center" : "justify-start"} ${className}`}
    >
      {items.map((item) => (
        <li key={item.label} className={`flex items-center gap-1.5 text-body-xs font-body ${text}`}>
          <item.icon className="w-4 h-4 flex-shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
          <span className={item.strong ? "font-semibold" : ""}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default CTAProofLine;
