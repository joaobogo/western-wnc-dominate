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
cover("roof-replacement-cost-factors-western-nc", "Steep, complex mountain home roof with multiple gables, dormers, valleys and a stone chimney");
cover("roof-repair-vs-replacement-highlands-nc", "One roof split between worn, faded shingles and crisp new shingles, with mountain ridges behind");
cover("best-time-of-year-replace-roof-western-north-carolina", "Roofers installing shingles on a clear early-autumn day with yellow and orange leaves around the home");
cover("roof-lifespan-western-nc-by-material", "Asphalt shingle, standing seam metal, cedar shake and slate samples side by side on a workbench");
cover("roof-lifespan-mountain-home-wnc", "Well-kept older mountain cabin with a shingle roof and stone chimney at sunset");
cover("metal-vs-dimensional-shingle-wnc-mountain-homes", "Two neighboring mountain homes, one with a green standing seam metal roof and one with dark dimensional shingles");
cover("metal-roofing-highlands-nc-benefits", "Rain on a dark standing seam metal roof with snow guards, above forested ridges and fog");
cover("metal-roofing-cost-wnc", "Standing seam metal panel beside an exposed-fastener metal panel on a roof deck");

// Gutters and water management
cover("gutter-drainage-roof-problems-franklin-nc", "Overflowing gutter spilling rainwater into a flower bed beside a downspout at a stone foundation");
cover("gutter-replacement-cashiers-nc", "Old, rusted gutter sagging away from the fascia on a timber mountain home");
cover("gutter-guards-worth-it-western-nc", "Mesh gutter guard with leaves and pine needles resting on top while the gutter stays clear");
cover("how-gutters-protect-home-wnc", "Gutter and downspout carrying rain away from a covered stone patio on a mountain home");
cover("gutter-installation-franklin-nc", "Installer on a ladder fastening a new seamless aluminum gutter to a fascia board");
cover("pre-fall-gutter-maintenance-checklist-mountain-homeowners", "Gloved hands flushing a gutter with a garden hose on a late-summer evening");
cover("seamless-gutters-highlands-nc", "Continuous dark seamless gutter and downspout along the eave of a stone mountain home");

// Skylights
cover("skylight-placement", "Mountain great room with a vaulted wood ceiling and skylights spreading soft, even daylight");
cover("velux-skylights-mountain-homes", "Venting skylight tilted open on a shingle roof with misty mountain ridges behind");
cover("skylight-installation-western-nc", "Roofer fitting flashing around a newly set skylight in an opened section of roof");
cover("skylight-replacement-wnc", "Old skylight with a fogged, failed seal and water-stained wood framing, seen from inside");
cover("skylight-leaks-roof-or-skylight-wnc", "Rainwater pooling around the flashing of a skylight on a wet shingle roof");

// Construction, additions and outdoor living
cover("roofing-construction-contractor-sylva-nc", "Contractor showing a homeowner couple roofing and siding samples on a porch with a mountain view");
cover("mountain-construction-project-cashiers-nc", "Timber-frame home under construction on a steep wooded lot above a mountain lake");
cover("property-access-terrain-mountain-construction-cashiers-nc", "Truck loaded with lumber climbing a steep gravel switchback drive to a mountain building site");
cover("design-consultation-agreement-construction-project", "Floor plan, scale ruler, pencil and material samples on a table by a window to the mountains");
cover("construction-services-franklin-nc", "Finished craftsman-style home with a covered porch and stone columns as the crew loads tools into a truck");
cover("outdoor-living-highlands-nc-porches-patios", "Stone patio with an outdoor fireplace, seating and string lights at dusk above mountain ridges");
cover("covered-porches-patios-western-nc-considerations", "Covered patio with timber beams and outdoor furniture overlooking misty mountain ridges");
cover("roofing-construction-services-western-north-carolina", "Aerial view of mountain homes in a forested neighborhood at sunrise, with layered ridges beyond");

// Local and second-home roofing
cover("roofing-project-planning-highlands-nc", "Roofer pointing out the roofline of a stone-and-shingle cottage to a homeowner on the driveway");
cover("roofing-vacation-second-homes-highlands-cashiers", "Timber vacation home with a fresh roof and rocking chairs on the porch at sunrise");
cover("roofing-mountain-homes-lake-glenville-scaly-mountain", "Lakeside mountain home with a shake-style roof beside a high mountain lake in morning mist");
