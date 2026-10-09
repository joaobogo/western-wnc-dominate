import { Link } from "react-router-dom";
import GalleryImage from "@/components/media/GalleryImage";
import { ArrowRight } from "lucide-react";
import chimneyDetail from "@/assets/work/roof-chimney-flashing-detail.webp";
import charcoalHip from "@/assets/work/roof-charcoal-hip-detail.webp";
import copperDormerDetail from "@/assets/work/roof-copper-dormer-detail.webp";
import tanDormersGable from "@/assets/work/roof-tan-dormers-gable.webp";
import charcoalRidge from "@/assets/work/roof-charcoal-dormer-ridge.webp";
import greenLogGables from "@/assets/work/roof-green-log-home-gables.webp";
import tanDormersAerial from "@/assets/work/roof-tan-dormers-aerial.webp";
import copperCabinAerial from "@/assets/work/roof-copper-dormer-cabin-aerial.webp";

interface Props {
  variant: "repair" | "storm";
  /** Photos already on the page (e.g. the hero); matching cards are skipped so nothing repeats. */
  excludeImages?: string[];
}

// Highlander roof photos. Captions describe only what each photo shows; no job
// story or town is claimed unless the job is documented.
const sets = {
  repair: {
    heading: "The Details That Keep Water Out.",
    intro:
      "Flashing, hips and roof-to-wall transitions are where most mountain-home leaks start, so they are where we look first. These are details from Highlander roofs.",
    items: [
      { image: chimneyDetail, alt: "Stone chimney wrapped in new black metal counter-flashing on a shingle roof", title: "New chimney counter-flashing" },
      { image: charcoalHip, alt: "Charcoal dimensional shingle hip roof with ridge cap over a dormer", title: "Hip and ridge cap detail" },
      { image: copperDormerDetail, alt: "Copper-tone metal porch roof and dormer caps against charcoal dimensional shingles", title: "Metal dormer caps and porch roof" },
      { image: tanDormersGable, alt: "Light tan dimensional shingle gable and dormers on a green board-and-batten cottage", title: "Shingle gable and dormer transitions" },
    ],
  },
  storm: {
    heading: "Roofs Built for Mountain Weather.",
    intro:
      "Completed Highlander roofs in Western North Carolina. After a storm, we photograph the damage and walk you through it before any work is scoped.",
    items: [
      { image: charcoalRidge, alt: "Charcoal shingle hips and dormer with mountains behind", title: "Charcoal dimensional shingles" },
      { image: greenLogGables, alt: "Green dimensional shingle roof with three gables on a red log home", title: "Green shingles on a log home" },
      { image: tanDormersAerial, alt: "Light tan dimensional shingle roof with two dormers on a wooded mountain cottage", title: "Dormered cottage re-roof" },
      { image: copperCabinAerial, alt: "Aerial view of charcoal shingles with copper-tone metal dormer caps and porch roof", title: "Shingles with metal accents" },
    ],
  },
};

const RepairPhotoProof = ({ variant, excludeImages = [] }: Props) => {
  const s = sets[variant];
  const items = s.items.filter((it) => !excludeImages.includes(it.image));
  // Keep the grid full: three cards sit in one row of three, four in a 2×2 / 1×4 grid.
  const gridCols = items.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4";
  return (
    <section className="section-padding bg-secondary tartan-bg">
      <div className="container-tight">
        <div className="max-w-2xl mb-8 md:mb-10">
          <span className="eyebrow mb-3 block">Photo Proof</span>
          <h2 className="section-heading mb-3">{s.heading}</h2>
          <p className="text-muted-foreground text-body-sm md:text-base font-body leading-relaxed">
            {s.intro}
          </p>
        </div>

        <div className={`grid ${gridCols} gap-3 md:gap-4`}>
          {items.map((it) => (
            <figure key={it.title} className="bg-card border border-border overflow-hidden">
              <GalleryImage
                sizes="(max-width: 1024px) 50vw, 25vw"
                src={it.image}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                width={600}
                height={400}
                className="w-full h-32 md:h-44 object-cover"
              />
              <figcaption className="p-3 md:p-4">
                <p className="font-heading font-semibold text-foreground text-body-xs md:text-sm leading-snug">
                  {it.title}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <Link
          to="/recent-projects"
          className="mt-6 inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:gap-3 transition-all"
        >
          See more Highlander roofs <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default RepairPhotoProof;