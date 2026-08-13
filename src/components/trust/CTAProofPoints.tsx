import { Star, ShieldCheck, MapPin } from "lucide-react";
import { GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";

/**
 * Three compact proof points designed to sit within one screen of a primary CTA:
 * Google rating + count (from src/data/reviews), licensing, and one local
 * specificity signal. No invented credentials, ratings, or guarantees.
 */
interface CTAProofPointsProps {
  /** County or area to name in the local signal, e.g. "Macon County". */
  area?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}

const CTAProofPoints = ({
  area = "Western North Carolina",
  tone = "light",
  align = "center",
  className = "",
}: CTAProofPointsProps) => {
  const { ratingValue, reviewCount } = GOOGLE_REVIEW_AGGREGATE;
  const text = tone === "dark" ? "text-dark-section-foreground" : "text-muted-foreground";
  const strong = tone === "dark" ? "text-dark-section-foreground" : "text-foreground";

  const items = [
    {
      icon: Star,
      label: `${ratingValue}★ Google · ${reviewCount}+ reviews`,
    },
    { icon: ShieldCheck, label: "Licensed and insured" },
    { icon: MapPin, label: `Crews based in Franklin, serving ${area}` },
  ];

  return (
    <ul
      aria-label="Reasons to trust Highlander"
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${align === "center" ? "justify-center" : "justify-start"} ${className}`}
    >
      {items.map((item) => (
        <li key={item.label} className={`flex items-center gap-1.5 text-body-xs md:text-body-xs font-body ${text}`}>
          <item.icon className="w-3.5 h-3.5 flex-shrink-0 text-[hsl(var(--gold-ink))]" />
          <span className={item.icon === Star ? `font-semibold ${strong}` : ""}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default CTAProofPoints;
