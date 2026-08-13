import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import asphalt003 from "@/assets/gallery/asphalt-003.webp";
import asphalt005 from "@/assets/gallery/asphalt-005.webp";
import metal008 from "@/assets/gallery/metal-008.webp";
import cedar002 from "@/assets/gallery/cedar-002.webp";

interface Props {
  variant: "repair" | "storm";
}

const sets = {
  repair: {
    heading: "Repairs We've Actually Completed.",
    intro:
      "Real Western North Carolina roofs. Every repair is photographed before and after, and the photos go to the homeowner.",
    items: [
      { image: asphalt003, alt: "Repaired shingle roof section on a Franklin NC home", title: "Leak traced to failed valley flashing", location: "Franklin, NC" },
      { image: metal008, alt: "Metal roof panel and fastener repair in Cashiers NC", title: "Loose panel seams and fasteners resealed", location: "Cashiers, NC" },
      { image: cedar002, alt: "Cedar shake roof repair detail in Highlands NC", title: "Rotted cedar course replaced and blended", location: "Highlands, NC" },
      { image: asphalt005, alt: "Chimney flashing repair on a Sylva NC roof", title: "Chimney flashing rebuilt to stop recurring leak", location: "Sylva, NC" },
    ],
  },
  storm: {
    heading: "Storm Work From Recent WNC Events.",
    intro:
      "Documented damage, insurer-ready photos, and completed repairs on homes across the plateau and the valleys.",
    items: [
      { image: asphalt005, alt: "Wind damaged shingle roof repaired in Sylva NC", title: "Wind-lifted shingle field replaced after storm", location: "Sylva, NC" },
      { image: asphalt003, alt: "Storm damage roof repair in Franklin NC", title: "Impact damage documented and approved by insurer", location: "Franklin, NC" },
      { image: metal008, alt: "Storm damaged metal roof repaired in Cashiers NC", title: "Displaced panels and trim re-secured", location: "Cashiers, NC" },
      { image: cedar002, alt: "Cedar roof storm repair in Highlands NC", title: "Limb strike repair on cedar shake roof", location: "Highlands, NC" },
    ],
  },
};

const RepairPhotoProof = ({ variant }: Props) => {
  const s = sets[variant];
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {s.items.map((it) => (
            <figure key={it.title} className="bg-card border border-border overflow-hidden">
              <img
                src={it.image}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                width={600}
                height={400}
                className="w-full h-32 md:h-44 object-cover"
              />
              <figcaption className="p-3 md:p-4">
                <p className="font-heading font-semibold text-foreground text-body-xs md:text-sm leading-snug mb-1">
                  {it.title}
                </p>
                <p className="text-caption md:text-xs text-muted-foreground font-body">{it.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <Link
          to="/recent-projects"
          className="mt-6 inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:gap-3 transition-all"
        >
          See more completed projects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default RepairPhotoProof;