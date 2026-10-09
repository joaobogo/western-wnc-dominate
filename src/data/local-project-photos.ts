import metal003 from "@/assets/gallery/metal-003.webp";
import metal005 from "@/assets/gallery/metal-005.webp";
import metal006 from "@/assets/gallery/metal-006.webp";
import metal008 from "@/assets/gallery/metal-008.webp";
import metal010 from "@/assets/gallery/metal-010.webp";
import asphalt002 from "@/assets/gallery/asphalt-002.webp";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import cedar005 from "@/assets/gallery/cedar-005.webp";
import gutters002 from "@/assets/gallery/gutters-002.jpg";
import siding001 from "@/assets/gallery/siding-001.webp";
import additionFranklin from "@/assets/gallery/addition-franklin-vaulted-room.webp";
import bravaGlenville from "@/assets/gallery/brava-glenville-chimney-valley.webp";

/**
 * Completed local project photography, keyed by the town the work was done in.
 * Captions name the town so the showroom pages can prove local work without
 * inventing a location. Every entry mirrors a project already published on
 * /recent-projects — no new claims are introduced here.
 */
export interface LocalProjectPhoto {
  src: string;
  /** Town or county the work was completed in, e.g. "Sylva". */
  town: string;
  /** Short caption naming the town and the work. */
  caption: string;
  alt: string;
}

export const localProjectPhotos: LocalProjectPhoto[] = [
  {
    src: additionFranklin,
    town: "Franklin",
    caption: "Franklin, NC — living room addition with a vaulted wood ceiling and mountain-view windows",
    alt: "Living room addition with a stained vaulted wood ceiling and a wall of windows in Franklin, North Carolina",
  },
  {
    src: bravaGlenville,
    town: "Lake Glenville",
    caption: "Lake Glenville, NC — Brava synthetic shake re-roof with ten VELUX skylights",
    alt: "Brava synthetic cedar shake roof with a stone chimney beside Lake Glenville, North Carolina",
  },
  {
    src: metal003,
    town: "Sylva",
    caption: "Sylva, NC — brown metal panel roof on a Jackson County brick home",
    alt: "Brown metal panel roof completed on a brick home in Sylva, North Carolina",
  },
  {
    src: metal010,
    town: "Cullowhee",
    caption: "Cullowhee, NC — standing seam metal on a Tuckasegee valley home",
    alt: "Standing seam metal roof on a home in the Tuckasegee valley near Cullowhee, North Carolina",
  },
  {
    src: asphalt008,
    town: "Bryson City",
    caption: "Bryson City, NC — dimensional shingle re-roof with ventilation upgrade",
    alt: "Dimensional shingle roof replacement with ridge ventilation in Bryson City, North Carolina",
  },
  {
    src: asphaltHero,
    town: "Waynesville",
    caption: "Waynesville, NC — CertainTeed Landmark shingles on a multi-level mountain home",
    alt: "CertainTeed Landmark dimensional shingle roof on a multi-level home in Waynesville, North Carolina",
  },
  {
    src: siding001,
    town: "Dillsboro",
    caption: "Dillsboro, NC — exterior siding and trim work on a village home",
    alt: "Exterior siding and trim replacement on a village home in Dillsboro, North Carolina",
  },
  {
    src: gutters002,
    town: "Cherokee",
    caption: "Cherokee, NC — seamless gutter run sized for heavy Smokies rainfall",
    alt: "Seamless aluminum gutter installation on a home in Cherokee, North Carolina",
  },
  {
    src: metal008,
    town: "Franklin",
    caption: "Franklin, NC — silver metal panels across a complex hip-and-valley roof",
    alt: "Silver metal panel roof with hip and valley detailing in Franklin, North Carolina",
  },
  {
    src: asphalt006,
    town: "Franklin",
    caption: "Franklin, NC — dimensional shingles in slate gray, twelve roof intersections",
    alt: "Slate gray dimensional shingle roof with multiple intersections in Franklin, North Carolina",
  },
  {
    src: metal005,
    town: "Highlands",
    caption: "Highlands, NC — dark bronze standing seam on a 12/12 pitch",
    alt: "Dark bronze standing seam metal roof on a steep-pitch home in Highlands, North Carolina",
  },
  {
    src: cedar005,
    town: "Highlands",
    caption: "Highlands, NC — cedar shake with copper ridge accents on an estate home",
    alt: "Cedar shake roof with copper ridge detailing on an estate home in Highlands, North Carolina",
  },
  {
    src: metal006,
    town: "Cashiers",
    caption: "Cashiers, NC — green standing seam on a log cabin at 4,200 feet",
    alt: "Green standing seam metal roof on a log cabin near Cashiers, North Carolina",
  },
  {
    src: asphalt007,
    town: "Scaly Mountain",
    caption: "Scaly Mountain, NC — dimensional shingle and metal accent roof on a mountain home",
    alt: "Mountain home with dimensional shingles and standing seam metal accents near Scaly Mountain, North Carolina",
  },
  {
    src: asphalt002,
    town: "Otto",
    caption: "Otto, NC — multi-dormer dimensional shingle roof in the Little Tennessee valley",
    alt: "Multi-dormer dimensional shingle roof in the Little Tennessee valley near Otto, North Carolina",
  },
];

/** Photos for a set of towns, in the order the towns are listed. */
export const photosForTowns = (towns: string[], limit = 10): LocalProjectPhoto[] => {
  const ordered = towns.flatMap((t) => localProjectPhotos.filter((p) => p.town === t));
  const seen = new Set<string>();
  return ordered.filter((p) => (seen.has(p.caption) ? false : (seen.add(p.caption), true))).slice(0, limit);
};
