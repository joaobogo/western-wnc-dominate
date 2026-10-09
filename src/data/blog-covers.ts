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
cover("roof-inspection-frequency-cullowhee-nc", "Roofer in a safety harness checking a pipe boot on a shingle roof above a small mountain valley town");
cover("roof-inspection-signs-sylva-nc", "Close-up of an aging shingle roof with curled edges, missing pieces and moss, above a small mountain town");
cover("roof-inspection-cashiers-nc", "Gloved hand lifting a shake shingle edge during a roof inspection, with a mountain lake and misty ridges below");
cover("roof-inspection-frequency-franklin-nc", "Roofer on a ladder at the eave of a tan shingle roof, looking up the slope, with misty ridges at sunrise");
cover("roof-inspection-highlands-nc", "Drone inspecting the slate-gray roof of a stone-and-timber estate on a high, forested mountain plateau");
cover("what-a-roof-inspection-covers", "Roof inspection tools on a porch rail: clipboard, moisture meter, tape measure, shingle samples and a flashlight");
cover("spring-roof-maintenance-western-nc", "Shingle roof edge and gutter of a mountain home framed by blooming pink rhododendron in spring");
cover("exterior-maintenance-checklist-highlands-nc", "Well-kept cedar-shingle mountain home with a stone foundation, clean gutters and a stone path in early summer");
cover("mountain-weather-roofs-highlands-nc", "Mountain home roof on a high ridge under half-stormy, half-sunlit skies");
cover("fall-winter-preparation-cashiers-nc", "Roofer on a ladder clearing leaves from a gutter on a timber home in peak autumn color");
cover("exterior-repairs-before-winter-sylva-nc", "Carpenter fastening a new fascia board under a shingle roof edge on a frosty late-autumn morning");
cover("second-home-roofing-cashiers-nc", "Quiet lakeside vacation home with a dark shingle roof, a wooden dock and morning mist on the lake");

// Roof leaks and repair
cover("roof-leak-causes-cashiers-nc", "Rainwater running down a roof valley beside a stone chimney on a wet shingle roof");
cover("common-roof-leak-locations-highlands-nc", "Step flashing where a dormer wall meets a wet shingle roof, a common leak point on mountain homes");
cover("roof-leak-repair-western-nc", "Roofer's gloved hands setting new shingles over a repaired area, with a roll of underlayment beside them");
cover("water-through-ceiling-western-nc", "Bucket catching a ceiling leak in a mountain home living room with a wood ceiling and a stone fireplace");
cover("roof-repair-sylva-nc", "Roofer in a harness replacing wind-lifted shingles on a two-story home above a small mountain town");

// Roof replacement and materials
cover("roof-replacement-sylva-nc", "Roofing crew in harnesses installing new dimensional shingles over underlayment at golden hour");
cover("roof-replacement-highlands-nc", "Stone-and-timber estate with a newly installed dark roof as the crew finishes, below a granite mountain dome");
cover("roof-replacement-cashiers-nc", "Lakeside mountain home with a new shingle roof, a ladder and a roll-off dumpster in the driveway");
cover("roof-replacement-cost-factors-western-nc", "Steep, complex mountain home roof with multiple gables, dormers, valleys and a stone chimney");
cover("roof-repair-vs-replacement-highlands-nc", "One roof split between worn, faded shingles and crisp new shingles, with mountain ridges behind");
cover("roof-repair-vs-replacement-wnc", "Roofer comparing a weathered old shingle with a new shingle while standing on a roof");
cover("signs-your-roof-needs-replacement-mountain-homes", "Old shingle roof with moss, granule loss and cracked, cupped shingles on a mountain cabin");
cover("best-time-of-year-replace-roof-western-north-carolina", "Roofers installing shingles on a clear early-autumn day with yellow and orange leaves around the home");
cover("best-time-to-replace-roof-franklin-nc", "Farmhouse-style home with a new dark shingle roof in a green valley with pastures and rolling hills");
cover("roof-lifespan-western-nc-by-material", "Asphalt shingle, standing seam metal, cedar shake and slate samples side by side on a workbench");
cover("roof-lifespan-mountain-home-wnc", "Well-kept older mountain cabin with a shingle roof and stone chimney at sunset");
cover("metal-vs-dimensional-shingle-wnc-mountain-homes", "Two neighboring mountain homes, one with a green standing seam metal roof and one with dark dimensional shingles");
cover("metal-roofing-western-nc-mountain-home", "Stone-and-timber mountain home with a bronze standing seam metal roof at sunrise");
cover("metal-roofing-highlands-nc-benefits", "Rain on a dark standing seam metal roof with snow guards, above forested ridges and fog");
cover("moisture-tree-coverage-roofs-cashiers-nc", "Moss growing on a shaded shingle roof under a heavy tree canopy");
cover("metal-roofing-cost-wnc", "Standing seam metal panel beside an exposed-fastener metal panel on a roof deck");

// Gutters and water management
cover("gutter-drainage-roof-problems-franklin-nc", "Overflowing gutter spilling rainwater into a flower bed beside a downspout at a stone foundation");
cover("fall-roof-gutter-maintenance-before-winter-mountains", "Gutter packed with autumn leaves and pine needles along a shingle roof edge");
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
cover("home-renovation-exterior-project-cullowhee-nc", "Mountain home mid-renovation with new board-and-batten siding and lumber stacked on sawhorses");
cover("roofing-construction-contractor-sylva-nc", "Contractor showing a homeowner couple roofing and siding samples on a porch with a mountain view");
cover("mountain-construction-project-cashiers-nc", "Timber-frame home under construction on a steep wooded lot above a mountain lake");
cover("property-access-terrain-mountain-construction-cashiers-nc", "Truck loaded with lumber climbing a steep gravel switchback drive to a mountain building site");
cover("home-addition-renovation-franklin-nc", "New room addition framed onto the side of a home, overlooking misty mountain ridges");
cover("home-addition-without-plans-western-nc", "Couple looking over a rough floor plan sketch at a table with a mountain view");
cover("design-consultation-agreement-construction-project", "Floor plan, scale ruler, pencil and material samples on a table by a window to the mountains");
cover("design-services-vs-build-ready-plans", "Loose concept sketch on trace paper beside a detailed site and floor plan drawing on a wooden table");
cover("construction-services-franklin-nc", "Finished craftsman-style home with a covered porch and stone columns as the crew loads tools into a truck");
cover("construction-services-cashiers-nc-additions-porches", "Screened porch with a stone fireplace and wood ceiling overlooking a mountain lake");
cover("outdoor-living-highlands-nc-porches-patios", "Stone patio with an outdoor fireplace, seating and string lights at dusk above mountain ridges");
cover("covered-porches-patios-western-nc-considerations", "Covered patio with timber beams and outdoor furniture overlooking misty mountain ridges");
cover("roofing-construction-services-western-north-carolina", "Aerial view of mountain homes in a forested neighborhood at sunrise, with layered ridges beyond");

// Local and second-home roofing
cover("roofing-project-planning-highlands-nc", "Roofer pointing out the roofline of a stone-and-shingle cottage to a homeowner on the driveway");
cover("roofing-vacation-second-homes-highlands-cashiers", "Timber vacation home with a fresh roof and rocking chairs on the porch at sunrise");
cover("roofing-mountain-homes-lake-glenville-scaly-mountain", "Lakeside mountain home with a shake-style roof beside a high mountain lake in morning mist");
cover("emergency-vs-scheduled-roof-repair-wnc", "Roofer securing a blue tarp beside a fallen tree limb on a storm-damaged shingle roof");
