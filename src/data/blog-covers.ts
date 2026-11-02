/**
 * Article covers, one per post.
 *
 * These 63 posts used to share ten stock photos, so the blog index showed the
 * same picture up to 18 times. Each now has its own cover (generated for its
 * topic, in the same style as the newest articles), stored as a /media master
 * with WebP 640/960 renditions. Alt text describes what each image shows.
 * src/test/blog-covers.test.ts keeps every indexable post on a distinct cover.
 */
export const BLOG_COVERS: Record<string, { image: string; imageAlt: string }> = {};

const cover = (slug: string, imageAlt: string) => {
  BLOG_COVERS[slug] = { image: `/media/${slug}-cover.jpg`, imageAlt };
};

// Roof inspections and maintenance
cover("roof-inspection-signs-sylva-nc", "Close-up of an aging shingle roof with curled edges, missing pieces and moss, above a small mountain town");
cover("exterior-maintenance-checklist-highlands-nc", "Well-kept cedar-shingle mountain home with a stone foundation, clean gutters and a stone path in early summer");
cover("fall-winter-preparation-cashiers-nc", "Roofer on a ladder clearing leaves from a gutter on a timber home in peak autumn color");

// Roof leaks and repair
cover("roof-leak-repair-western-nc", "Roofer's gloved hands setting new shingles over a repaired area, with a roll of underlayment beside them");

// Roof replacement and materials
cover("roof-repair-vs-replacement-highlands-nc", "One roof split between worn, faded shingles and crisp new shingles, with mountain ridges behind");
cover("best-time-of-year-replace-roof-western-north-carolina", "Roofers installing shingles on a clear early-autumn day with yellow and orange leaves around the home");
cover("roof-lifespan-western-nc-by-material", "Asphalt shingle, standing seam metal, cedar shake and slate samples side by side on a workbench");
cover("roof-lifespan-mountain-home-wnc", "Well-kept older mountain cabin with a shingle roof and stone chimney at sunset");
cover("metal-vs-dimensional-shingle-wnc-mountain-homes", "Two neighboring mountain homes, one with a green standing seam metal roof and one with dark dimensional shingles");
cover("metal-roofing-cost-wnc", "Standing seam metal panel beside an exposed-fastener metal panel on a roof deck");

// Gutters and water management
cover("gutter-drainage-roof-problems-franklin-nc", "Overflowing gutter spilling rainwater into a flower bed beside a downspout at a stone foundation");
cover("gutter-replacement-cashiers-nc", "Old, rusted gutter sagging away from the fascia on a timber mountain home");
cover("gutter-guards-worth-it-western-nc", "Mesh gutter guard with leaves and pine needles resting on top while the gutter stays clear");
cover("gutter-installation-franklin-nc", "Installer on a ladder fastening a new seamless aluminum gutter to a fascia board");
cover("pre-fall-gutter-maintenance-checklist-mountain-homeowners", "Gloved hands flushing a gutter with a garden hose on a late-summer evening");
cover("seamless-gutters-highlands-nc", "Continuous dark seamless gutter and downspout along the eave of a stone mountain home");

// Skylights
cover("skylight-placement", "Mountain great room with a vaulted wood ceiling and skylights spreading soft, even daylight");
cover("skylight-installation-western-nc", "Roofer fitting flashing around a newly set skylight in an opened section of roof");
cover("skylight-leaks-roof-or-skylight-wnc", "Rainwater pooling around the flashing of a skylight on a wet shingle roof");

// Construction, additions and outdoor living
cover("mountain-construction-project-cashiers-nc", "Timber-frame home under construction on a steep wooded lot above a mountain lake");
cover("property-access-terrain-mountain-construction-cashiers-nc", "Truck loaded with lumber climbing a steep gravel switchback drive to a mountain building site");
cover("design-consultation-agreement-construction-project", "Floor plan, scale ruler, pencil and material samples on a table by a window to the mountains");
cover("construction-services-franklin-nc", "Finished craftsman-style home with a covered porch and stone columns as the crew loads tools into a truck");

// Local and second-home roofing
cover("roofing-project-planning-highlands-nc", "Roofer pointing out the roofline of a stone-and-shingle cottage to a homeowner on the driveway");
