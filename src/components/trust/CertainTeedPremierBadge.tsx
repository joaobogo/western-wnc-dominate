import premierAsset from "@/assets/certainteed-shinglemaster-premier.jpg.asset.json";
import { cn } from "@/lib/utils";

/** Official owner-supplied artwork: preserve the original colors and proportions. */
export default function CertainTeedPremierBadge({ className = "" }: { className?: string }) {
  return (
    <img
      src={premierAsset.url}
      alt="CertainTeed ShingleMaster PREMIER Credentialed Contractor"
      width={768}
      height={768}
      loading="lazy"
      decoding="async"
      className={cn("h-16 w-16 shrink-0 object-contain", className)}
    />
  );
}