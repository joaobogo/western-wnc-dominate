/**
 * Curated Highlander work photography, grouped only by division (roofing or
 * construction). A town is named only when the job record documents it; every
 * other caption describes the work, never a location.
 */
import tanDormersAerial from "@/assets/work/roof-tan-dormers-aerial.webp";
import tanDormersAerialSet from "@/assets/work/roof-tan-dormers-aerial.webp?w=480;800;1280&format=webp&as=srcset";
import tanDormersGable from "@/assets/work/roof-tan-dormers-gable.webp";
import tanDormersGableSet from "@/assets/work/roof-tan-dormers-gable.webp?w=480;800;1280&format=webp&as=srcset";
import copperCabinFront from "@/assets/work/roof-copper-dormer-cabin-front.webp";
import copperCabinFrontSet from "@/assets/work/roof-copper-dormer-cabin-front.webp?w=480;800;1200;1500&format=webp&as=srcset";
import copperCabinAerial from "@/assets/work/roof-copper-dormer-cabin-aerial.webp";
import copperCabinAerialSet from "@/assets/work/roof-copper-dormer-cabin-aerial.webp?w=480;800;1280&format=webp&as=srcset";
import copperDormerDetail from "@/assets/work/roof-copper-dormer-detail.webp";
import copperDormerDetailSet from "@/assets/work/roof-copper-dormer-detail.webp?w=480;800;1280&format=webp&as=srcset";
import greenLogGables from "@/assets/work/roof-green-log-home-gables.webp";
import greenLogGablesSet from "@/assets/work/roof-green-log-home-gables.webp?w=480;800;1280&format=webp&as=srcset";
import charcoalGarage from "@/assets/work/roof-charcoal-garage-mountains.webp";
import charcoalGarageSet from "@/assets/work/roof-charcoal-garage-mountains.webp?w=480;800;1200;1600&format=webp&as=srcset";
import charcoalRidge from "@/assets/work/roof-charcoal-dormer-ridge.webp";
import charcoalRidgeSet from "@/assets/work/roof-charcoal-dormer-ridge.webp?w=480;800;1200;1600&format=webp&as=srcset";
import charcoalHip from "@/assets/work/roof-charcoal-hip-detail.webp";
import charcoalHipSet from "@/assets/work/roof-charcoal-hip-detail.webp?w=480;800;1200;1600&format=webp&as=srcset";
import gutterGuardEave from "@/assets/work/roof-gutter-guard-eave.webp";
import gutterGuardEaveSet from "@/assets/work/roof-gutter-guard-eave.webp?w=480;800;1200;1600&format=webp&as=srcset";
import chimneySkylights from "@/assets/work/roof-chimney-flashing-skylights.webp";
import chimneySkylightsSet from "@/assets/work/roof-chimney-flashing-skylights.webp?w=480;800;1200;1600&format=webp&as=srcset";
import chimneyDetail from "@/assets/work/roof-chimney-flashing-detail.webp";
import chimneyDetailSet from "@/assets/work/roof-chimney-flashing-detail.webp?w=480;800;1200;1600&format=webp&as=srcset";
import bravaLake from "@/assets/gallery/brava-glenville-aerial.webp";
import bravaLakeSet from "@/assets/gallery/brava-glenville-aerial.webp?w=480;800;1200;1600&format=webp&as=srcset";
import patioWide from "@/assets/work/patio-cashiers-wide.webp";
import patioWideSet from "@/assets/work/patio-cashiers-wide.webp?w=480;800;1200;1500&format=webp&as=srcset";
import patioPorch from "@/assets/work/patio-cashiers-screened-porch.webp";
import patioPorchSet from "@/assets/work/patio-cashiers-screened-porch.webp?w=480;800;1200;1600&format=webp&as=srcset";
import patioDeckView from "@/assets/work/patio-cashiers-deck-view.webp";
import patioDeckViewSet from "@/assets/work/patio-cashiers-deck-view.webp?w=480;800;1200;1600&format=webp&as=srcset";
import patioCover from "@/assets/work/patio-cashiers-cover.webp";
import patioCoverSet from "@/assets/work/patio-cashiers-cover.webp?w=480;800;1125&format=webp&as=srcset";
import additionWindowsExt from "@/assets/work/addition-franklin-exterior-windows.webp";
import additionWindowsExtSet from "@/assets/work/addition-franklin-exterior-windows.webp?w=480;800;1200;1600&format=webp&as=srcset";
import additionWindowWall from "@/assets/work/addition-franklin-window-wall.webp";
import additionWindowWallSet from "@/assets/work/addition-franklin-window-wall.webp?w=480;800;1200;1600&format=webp&as=srcset";
import additionRoom from "@/assets/gallery/addition-franklin-vaulted-room.webp";
import additionRoomSet from "@/assets/gallery/addition-franklin-vaulted-room.webp?w=480;800;1200;1500&format=webp&as=srcset";
import cullowheeRoofline from "@/assets/work/addition-cullowhee-roofline.webp";
import cullowheeRooflineSet from "@/assets/work/addition-cullowhee-roofline.webp?w=480;800;1125&format=webp&as=srcset";
import deckDoors from "@/assets/gallery/deck-sylva-doors-wide.webp";
import deckDoorsSet from "@/assets/gallery/deck-sylva-doors-wide.webp?w=480;800;1125&format=webp&as=srcset";

export type WorkDivision = "roofing" | "construction";

export interface WorkPhoto {
  id: string;
  division: WorkDivision;
  src: string;
  srcSet: string;
  width: number;
  height: number;
  /** Short visible caption. */
  title: string;
  /** Only when the job record documents the town. */
  town?: string;
  alt: string;
  /** Project case study this photo belongs to, when one exists. */
  href?: string;
}

const p = (x: WorkPhoto) => x;

/** Ordered best-first within each division. */
export const workPhotos: WorkPhoto[] = [
  p({ id: "brava-lake", division: "roofing", src: bravaLake, srcSet: bravaLakeSet, width: 1600, height: 900, title: "Brava synthetic shake with VELUX skylights", town: "Lake Glenville", href: "/projects/brava-synthetic-shake-glenville", alt: "Brava synthetic cedar shake roof with skylights on a lakeside home near Lake Glenville, North Carolina" }),
  p({ id: "copper-cabin-front", division: "roofing", src: copperCabinFront, srcSet: copperCabinFrontSet, width: 1500, height: 1125, title: "Charcoal shingles with copper-tone metal porch roof", alt: "Mountain cabin with charcoal dimensional shingles, three dormers and a copper-tone metal porch roof" }),
  p({ id: "charcoal-garage", division: "roofing", src: charcoalGarage, srcSet: charcoalGarageSet, width: 1600, height: 900, title: "Charcoal dimensional shingles with dormers", alt: "Charcoal dimensional shingle roof with three dormers on a garage overlooking Western North Carolina mountains" }),
  p({ id: "tan-dormers-aerial", division: "roofing", src: tanDormersAerial, srcSet: tanDormersAerialSet, width: 1280, height: 720, title: "Dimensional shingle re-roof on a dormered cottage", alt: "Light tan dimensional shingle roof with two dormers on a wooded mountain cottage" }),
  p({ id: "green-log-gables", division: "roofing", src: greenLogGables, srcSet: greenLogGablesSet, width: 1280, height: 720, title: "Green dimensional shingles on a log home", alt: "Green dimensional shingle roof with three gables on a red log home" }),
  p({ id: "copper-cabin-aerial", division: "roofing", src: copperCabinAerial, srcSet: copperCabinAerialSet, width: 1280, height: 720, title: "Metal-capped dormers and porch roof", alt: "Aerial view of charcoal shingles with copper-tone metal dormer caps and porch roof" }),
  p({ id: "charcoal-ridge", division: "roofing", src: charcoalRidge, srcSet: charcoalRidgeSet, width: 1600, height: 900, title: "Hip and dormer detailing", alt: "Close view of charcoal shingle hips and dormer with mountains behind" }),
  p({ id: "chimney-skylights", division: "roofing", src: chimneySkylights, srcSet: chimneySkylightsSet, width: 1600, height: 1200, title: "New chimney flashing and skylights", alt: "Stone chimney with new black metal flashing and four skylights on a shingle roof with a mountain view" }),
  p({ id: "tan-dormers-gable", division: "roofing", src: tanDormersGable, srcSet: tanDormersGableSet, width: 1280, height: 720, title: "Shingle gable and dormer detail", alt: "Light tan dimensional shingle gable and dormers on a green board-and-batten cottage" }),
  p({ id: "gutter-guard-eave", division: "roofing", src: gutterGuardEave, srcSet: gutterGuardEaveSet, width: 1600, height: 900, title: "Seamless gutters with guards", alt: "Charcoal shingle roof edge with seamless gutters, mesh gutter guards and a dormer" }),
  p({ id: "charcoal-hip", division: "roofing", src: charcoalHip, srcSet: charcoalHipSet, width: 1600, height: 900, title: "Hip ridge cap detail", alt: "Charcoal dimensional shingle hip roof with ridge cap over a dormer" }),
  p({ id: "copper-dormer-detail", division: "roofing", src: copperDormerDetail, srcSet: copperDormerDetailSet, width: 1280, height: 720, title: "Standing seam porch roof and dormer caps", alt: "Copper-tone metal porch roof and dormer caps against charcoal dimensional shingles" }),
  p({ id: "chimney-detail", division: "roofing", src: chimneyDetail, srcSet: chimneyDetailSet, width: 1600, height: 1200, title: "Chimney counter-flashing", alt: "Stone chimney wrapped in new black metal counter-flashing on a shingle roof" }),

  p({ id: "patio-porch", division: "construction", src: patioPorch, srcSet: patioPorchSet, width: 1600, height: 1200, title: "Screened porch with stone fireplace", town: "Cashiers", alt: "Screened porch with a stained tongue-and-groove ceiling, stone fireplace and a view of a new deck in Cashiers, North Carolina" }),
  p({ id: "addition-room", division: "construction", src: additionRoom, srcSet: additionRoomSet, width: 1500, height: 844, title: "Living room addition with vaulted wood ceiling", town: "Franklin", href: "/projects/living-room-addition-franklin", alt: "Living room addition with a stained vaulted wood ceiling and mountain-view windows in Franklin, North Carolina" }),
  p({ id: "patio-wide", division: "construction", src: patioWide, srcSet: patioWideSet, width: 1500, height: 1125, title: "Covered patio with metal roof", town: "Cashiers", alt: "Open trellis converted to a covered patio with a metal roof and wood ceiling in Cashiers, North Carolina" }),
  p({ id: "addition-windows-ext", division: "construction", src: additionWindowsExt, srcSet: additionWindowsExtSet, width: 1600, height: 1200, title: "Cedar shake gable with custom glass", town: "Franklin", href: "/projects/living-room-addition-franklin", alt: "Cedar shake siding and tall windows with custom gable glass on a living room addition in Franklin, North Carolina" }),
  p({ id: "patio-deck-view", division: "construction", src: patioDeckView, srcSet: patioDeckViewSet, width: 1600, height: 1200, title: "From the porch to the new deck", town: "Cashiers", alt: "View from a screened porch onto a new wood deck with metal balusters in Cashiers, North Carolina" }),
  p({ id: "addition-window-wall", division: "construction", src: additionWindowWall, srcSet: additionWindowWallSet, width: 1600, height: 1200, title: "Window wall under a wood vault", town: "Franklin", href: "/projects/living-room-addition-franklin", alt: "Wall of tall windows under a stained wood vaulted ceiling in a Franklin, North Carolina addition" }),
  p({ id: "deck-doors", division: "construction", src: deckDoors, srcSet: deckDoorsSet, width: 1125, height: 633, title: "Deck and railing rebuild", town: "Sylva", href: "/projects/deck-railing-rebuild-sylva", alt: "Rebuilt elevated deck with new boards and railing in Sylva, North Carolina" }),
  p({ id: "patio-cover", division: "construction", src: patioCover, srcSet: patioCoverSet, width: 1125, height: 1500, title: "Patio cover and awning", town: "Cashiers", alt: "Covered patio and awning extension with a metal roof on a gray mountain home in Cashiers, North Carolina" }),
  p({ id: "cullowhee-roofline", division: "construction", src: cullowheeRoofline, srcSet: cullowheeRooflineSet, width: 1125, height: 1500, title: "Laundry room addition tied into the roof", town: "Cullowhee", alt: "Cedar shake laundry room addition with shingles tied into the original roof in Cullowhee, North Carolina" }),
];

export const workPhotosBy = (division: WorkDivision) => workPhotos.filter((ph) => ph.division === division);
