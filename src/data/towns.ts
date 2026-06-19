export interface TownData {
  slug: string;
  name: string;
  county: string;
  state: string;
  elevation: string;
  population?: string;
  description: string;
  features: string[];
  metaTitle: string;
  metaDescription: string;
  
  // VARIABLE LOCALITY ELEMENTS
  housingProfile: string;
  climateExposure: string;
  localVibe: string;
  constructionContext: string;
  serviceDemandMix: string[];
  styleTendency: string;
  notableNeighborhoods: string[];
  marketAuthorityAngle: string;
  heroImage: string;
}

/**
 * Tight, conversion-focused 2–4 sentence local-relevance block per town.
 * Names the town, names the work Highlander does there, stays accurate
 * (no fabricated stats, no claimed projects without proof).
 * Keyed by town slug. Use `getLocalRelevance(slug)` from the helper below.
 */
export const townLocalRelevance: Record<string, string> = {
  "highlands-nc":
    "Highlands homes sit above 4,000 feet, where steep rooflines, heavy rainfall, ice loading, and high UV punish standard roofing systems. Highlander Roofing & Construction supports Plateau homeowners with premium synthetic and standing-seam metal systems, high-velocity flashing details, and exterior work built for Western North Carolina's harshest mountain conditions.",
  "cashiers-nc":
    "Cashiers properties sit in a temperate rainforest zone — wooded lots, premium finishes, 80+ inches of rain, and persistent fog. Highlander helps Cashiers homeowners with roof replacement, moisture management, gutter optimization, and exterior construction designed to protect mountain home design and high-end home investments across the Plateau.",
  "franklin-nc":
    "Based in Franklin, Highlander Roofing & Construction serves homeowners across Macon County with roofing, repairs, gutters, and exterior construction built for mountain weather. Our crews live here, so most Franklin inspections happen within 24–48 hours and the same team-led team is on site from first call to final walkthrough.",
  "sylva-nc":
    "Sylva blends historic downtown homes, university rentals, and hillside residences across Jackson County — and valley moisture, fog, and humidity make roof and exterior choices matter. Highlander supports Sylva homeowners and property owners with roof repair and replacement, gutter work, historic-sensitive exterior renovations, and reliable commercial maintenance.",
  "bryson-city-nc":
    "Bryson City sits at the gateway to the Smokies, where vacation rentals, cabins, and family homes face sudden mountain deluges and heavy seasonal use. Highlander helps Swain County homeowners and short-term-rental operators with metal roofing, fast roof repair, deck and porch work, and exterior construction scheduled around the rental calendar.",
  "waynesville-nc":
    "Waynesville's historic districts and hillside neighborhoods need roofing and exterior work that respects character while modernizing the building envelope. Highlander serves Haywood County homeowners with attic-ventilation correction, standing-seam metal, structural home additions, and renovation work designed for mountain freeze-thaw cycles.",
  "cullowhee-nc":
    "Cullowhee's mix of WCU-area rentals, faculty homes, and Tuckasegee valley properties calls for roofing and exterior work that's reliable, budget-conscious, and scheduled around the academic calendar. Highlander supports Jackson County landlords and homeowners with rental roof repairs, deck safety updates, exterior siding work, and algae-resistant shingle systems.",
  "dillsboro-nc":
    "Dillsboro is a historic riverfront village where every roof, porch, and exterior detail is visible to neighbors and visitors. Highlander serves Dillsboro homeowners with preservation-sensitive roofing, designer shingle systems, artisan porch detailing, and exterior repairs that integrate with the village's century-old mountain character.",
  "asheville-nc":
    "Asheville's housing stock runs from historic Montford and Biltmore Forest to modern Town Mountain builds — each with its own roofing and exterior demands. Highlander serves Buncombe County homeowners with standing-seam metal, Brava synthetic systems, luxury additions, and mountain-modern renovations, with on-site coordination from a Western NC–based team. (See our Service Areas page for current Asheville scheduling availability.)",
  "hendersonville-nc":
    "Hendersonville's historic Main Street district and established Henderson County neighborhoods reward roofing and exterior work built to last decades, not seasons. Highlander supports Hendersonville homeowners with Class 4 impact-resistant shingle systems, exterior siding updates, deck safety repairs, and age-in-place exterior modifications.",
  "brevard-nc":
    "Brevard sits in the Land of Waterfalls, where record rainfall makes gutter sizing, underlayment, and flashing details a moisture-management problem first and an aesthetics decision second. Highlander serves Transylvania County homeowners with advanced gutter systems, synthetic shake roofing, deck and porch additions, and exterior siding work built to stay dry.",
  "murphy-nc":
    "Murphy and the far western counties get a real local roofing and construction partner instead of a Friday-only crew. Highlander serves Cherokee County homeowners with dimensional shingle systems, deck repairs, siding replacement, storm-damage mitigation, and exterior work scoped to the long-term value of family homes and vacation properties.",
  "hayesville-nc":
    "Hayesville and the Lake Chatuge area run on lakefront living — homes built for views, decks, and water-adjacent durability. Highlander serves Clay County homeowners with standing-seam metal roofing, luxury decking, exterior modernization, and residential replacement work designed to protect lakefront investments season after season.",
};

export const getLocalRelevance = (slug: string): string | undefined =>
  townLocalRelevance[slug];

// ──────────────────────────────────────────────────────────────────────────────
// 📸 IMAGE STAGING NOTE — read before launch
// ──────────────────────────────────────────────────────────────────────────────
// The `heroImage` URLs below are temporary, regionally-themed stock photos
// (mountain landscapes, forested cabins, residential homes). They are NOT
// taken in the towns they represent.
//
// Alt text across the site is intentionally written as "mountain home in
// Western North Carolina" — never as "{Town}, NC project" — so we do not
// imply ownership or location of any photo we have not verified.
//
// ACTION REQUIRED BEFORE LAUNCH: the Highlander team should provide
// real Highlander project photos per town (Franklin, Highlands, Cashiers,
// Sylva first; then secondary towns). Once supplied, swap each `heroImage`
// here and update alt text in `TownPage.tsx` / `ServiceTownPage.tsx` to
// reference the actual project location.
// ──────────────────────────────────────────────────────────────────────────────

export const towns: TownData[] = [
  {
    slug: "highlands-nc",
    name: "Highlands",
    county: "Macon County",
    state: "NC",
    elevation: "4,118 ft",
    population: "~1,100 (Full-time)",
    description: "At over 4,118 feet elevation, Highlands estates face some of the Southeast's most aggressive weather patterns. We specialize in high-velocity wind protection and premium synthetic systems designed for the plateau's unique exposure.",
    features: ["Elevation-rated systems", "Design", "Storm damage recovery", "Premium Brava installers"],
    metaTitle: "Roofing & Construction in Highlands, NC | Highlander",
    metaDescription: "High-elevation roofing and construction for Highlands Plateau estates. Specialized in Brava synthetic systems and master suite additions. Licensed & Insured.",
    housingProfile: "High-end estate homes, historic summer cottages, and gated club communities on the Highlands Plateau.",
    climateExposure: "Extreme high-altitude weather: 80+ inches of rain, heavy ice loading, and high UV levels that test standard roofing systems.",
    localVibe: "A world-class resort destination where design integrity and high-performance materials are the baseline expectation for every project.",
    constructionContext: "We specialize in 'mountain rooms' — high-end screened porches with fireplaces — that capture valley views while shielding from heavy plateau rain.",
    serviceDemandMix: ["Standing Seam Metal Roofing", "Brava Synthetic Shake", "Luxury Master Suite Additions", "Storm Damage Recovery"],
    styleTendency: "Traditional mountain rustic with heavy timber accents, natural stone, and premium shake/slate aesthetics.",
    notableNeighborhoods: ["Wildcat Cliffs", "Highlands Country Club", "Cullasaja Club", "Mounttop"],
    marketAuthorityAngle: "Highlands estates require commercial-grade flashing details and high-velocity wind ratings. We build to the standard the Plateau demands.",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "cashiers-nc",
    name: "Cashiers",
    county: "Jackson County",
    state: "NC",
    elevation: "3,484 ft",
    description: "Cashiers sits in a temperate rainforest zone, demanding superior moisture management. Our systems are engineered to handle 80+ inches of rain while maintaining the high-end rustic aesthetic of the plateau.",
    features: ["Design", "Engineered deck expansions", "Moisture-resistant materials", "Gutter optimization"],
    metaTitle: "Roofing & Construction in Cashiers, NC | Highlander",
    metaDescription: "Waterproofing-focused roofing and construction for Cashiers, NC estates. Moisture-resistant materials and engineered decks. Licensed & insured.",
    housingProfile: "Rustic luxury residences and expansive seasonal mountain estates across the Cashiers Plateau.",
    climateExposure: "Temperate rainforest conditions: Persistent moisture, 80+ inches of rain, and low-visibility fog that requires advanced drainage.",
    localVibe: "Low-density mountain living centered around the plateau's natural waterfalls and lake communities like Lake Glenville.",
    constructionContext: "We specialize in deck expansions and view-optimization, replacing older outdoor spaces with engineered multi-level entertainment zones.",
    serviceDemandMix: ["Synthetic Slate Roofing", "Advanced Moisture Management", "Engineered Deck Expansions", "Gutter Optimization"],
    styleTendency: "Elevated rustic featuring bark siding, cedar shingles, and massive window walls for indoor-outdoor integration.",
    notableNeighborhoods: ["High Hampton", "Cedar Creek", "Lonesome Valley", "Chinquapin", "Lake Glenville"],
    marketAuthorityAngle: "In the Southeast's wettest high-elevation town, we treat every project as a complex water-management system rather than just a build.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "franklin-nc",
    name: "Franklin",
    county: "Macon County",
    state: "NC",
    elevation: "2,119 ft",
    description: "Our hometown market. Based in Franklin, we provide the region's fastest response times for family homes, valley farms, and ridge-top residences across Macon County.",
    features: ["Locally based crews", "Design", "Residential specialists", "Family-owned, team-driven"],
    metaTitle: "Roofing & Construction in Franklin, NC | Highlander",
    metaDescription: "Local roofing and construction for Franklin, NC families and farms. Family-owned and locally run by a team of WNC pros for residential roofing and home additions. Licensed & insured.",
    housingProfile: "Traditional single-family homes, ridgetop residences, and historic valley farmhouses across Macon County.",
    climateExposure: "Challenging seasonal swings and high-wind events channeled through the Little Tennessee River valley.",
    localVibe: "A stable, year-round community where local accountability and family-business reliability are the primary priorities.",
    constructionContext: "We specialize in expanding primary residences — adding garage apartments, master suites, or full interior kitchen and bath transformations.",
    serviceDemandMix: ["Dimensional Asphalt Roofing", "Residential Repairs", "Master Suite Additions", "Interior Renovations"],
    styleTendency: "Classic Appalachian styles, including craftsman bungalows and modern farmhouses built for local conditions.",
    notableNeighborhoods: ["Cartoogechaye", "Iotla", "Holly Springs", "Burningtown", "Otto"],
    marketAuthorityAngle: "Franklin is our home. Our crews live here, meaning we offer the fastest response times and local accountability for Macon County neighbors.",
    heroImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "sylva-nc",
    name: "Sylva",
    county: "Jackson County",
    state: "NC",
    elevation: "2,037 ft",
    description: "From historic downtown renovations to commercial maintenance programs, our Sylva operations serve as a critical hub for Jackson County's diverse roofing and construction needs.",
    features: ["Historic home expertise", "Commercial maintenance", "Jackson County hub", "Rental property service"],
    metaTitle: "Roofing & Construction in Sylva, NC | Highlander",
    metaDescription: "Expert roofing and construction for Sylva, NC's historic homes and Jackson County properties. Preservation and renovation focus. Licensed & insured.",
    housingProfile: "Historic downtown homes, university rentals, and hillside residential properties across the Sylva valley.",
    climateExposure: "Heavy valley moisture traps and fog create persistent humidity that accelerates biological growth on aging roof systems.",
    localVibe: "A mix of vibrant historic downtown character and modern growth driven by commerce and university regionalism.",
    constructionContext: "We specialize in modernizing older downtown homes into open-concept floor plans while meticulously preserving historic exterior aesthetics.",
    serviceDemandMix: ["Commercial Roof Maintenance", "Algae-Resistant Systems", "Historic Home Renovations", "Commercial Roof Replacement"],
    styleTendency: "Historic preservation mixed with functional modern mountain design tailored for Jackson County's valleys.",
    notableNeighborhoods: ["Historic Downtown", "Tuckasegee River Corridor", "Cope Creek", "Fisher Creek", "Webster"],
    marketAuthorityAngle: "From Jackson County commercial centers to Main Street historic estates, we manage complex projects that balance modernization with preservation.",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "bryson-city-nc",
    name: "Bryson City",
    county: "Swain County",
    state: "NC",
    elevation: "1,752 ft",
    description: "The gateway to the Smokies. We specialize in fast-turnaround roofing and deck expansions for vacation rental owners who need reliability between guest stays.",
    features: ["Vacation rental focus", "Fast turnaround work", "Smoky Mountain experts", "Deck safety upgrades"],
    metaTitle: "Roofing & Construction in Bryson City, NC | Highlander",
    metaDescription: "Durable roofing and construction for Bryson City homes and vacation rentals. Specialized services for the gateway to the Smokies. Licensed & Insured.",
    housingProfile: "Log cabins, high-traffic vacation rentals, and traditional mountain bungalows.",
    climateExposure: "Sudden Smoky Mountain deluges and high humidity that requires superior flashing at all wood-to-metal transitions.",
    localVibe: "Outdoor-centric tourism hub where property owners need low-maintenance materials that can withstand heavy seasonal usage.",
    constructionContext: "We specialize in porch repairs and deck expansions for short-term rental properties that must meet rigorous safety and durability standards.",
    serviceDemandMix: ["Standing Seam Metal Roofing", "Deck & Porch expansions", "Tree-Damage Repair", "Vacation Rental Maintenance"],
    styleTendency: "Classic Smoky Mountain log and timber styles emphasizing durability and natural finishes.",
    notableNeighborhoods: ["Alarka", "Deep Creek", "Lands Creek", "Fontana Lake area"],
    marketAuthorityAngle: "We understand that in Bryson City, your home is often your business. We complete major projects in the tight windows between guest stays.",
    heroImage: "https://images.unsplash.com/photo-1449156001437-3a144f0073bc?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "waynesville-nc",
    name: "Waynesville",
    county: "Haywood County",
    state: "NC",
    elevation: "2,753 ft",
    description: "Serving Waynesville's historic districts and established Haywood County neighborhoods with expert roofing modernization and whole-home additions.",
    features: ["Historic district care", "Whole-home renovations", "Haywood County authority", "Structural modernization"],
    metaTitle: "Roofing & Construction in Waynesville, NC | Highlander",
    metaDescription: "Professional roofing and construction for Waynesville's historic districts and hillside developments. Haywood County expertise. Licensed & Insured.",
    housingProfile: "Historic district estates, mid-century residential neighborhoods, and newer hillside builds in Haywood County.",
    climateExposure: "Regular freeze-thaw cycles and winter snow accumulation that tests attic ventilation and older roof deck integrity.",
    localVibe: "One of WNC's most established residential markets, featuring deep historic roots and a growing modern residential base.",
    constructionContext: "We specialize in home additions and structural modernization for Waynesville properties that need modern efficiency without losing character.",
    serviceDemandMix: ["Historic Roof Restoration", "Hillside Home Additions", "Attic Ventilation Correction", "Standing Seam Metal"],
    styleTendency: "Elegant historic home design (Queen Anne, Colonial) transitioning into contemporary mountain modern styles.",
    notableNeighborhoods: ["Main Street Historic District", "Frog Level", "Pigeon Street", "Hyatt Creek", "Lake Junaluska"],
    marketAuthorityAngle: "Haywood County projects require a balance of technical modernization and visual sensitivity. We protect Waynesville's historic integrity.",
    heroImage: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "cullowhee-nc",
    name: "Cullowhee",
    county: "Jackson County",
    state: "NC",
    elevation: "2,100 ft",
    description: "Home to WCU, our Cullowhee services prioritize fast, budget-conscious solutions for student housing, local staff residences, and multi-unit rental assets.",
    features: ["Student housing timing", "Rental property repairs", "Budget-conscious plans", "Reliable maintenance"],
    metaTitle: "Roofing & Construction in Cullowhee, NC | Highlander",
    metaDescription: "Reliable roofing and construction for Cullowhee student housing and residential properties. Fast response for WCU area landlords. Licensed & Insured.",
    housingProfile: "Multi-unit rentals, student housing, and faculty residences near WCU.",
    climateExposure: "Heavy valley fog and humidity typical of the Tuckasegee basin that accelerates biological growth.",
    localVibe: "A university-centric community where property maintenance windows are often tied to the academic calendar transitions.",
    constructionContext: "We focus on maximizing rental occupancy by updating older housing stock near the university with modern decks and master-suite expansions.",
    serviceDemandMix: ["Rental Roof Repairs", "Deck Safety Inspections", "Exterior Siding Updates", "Algae-Resistant Shingles"],
    styleTendency: "Functional residential and multi-unit home design prioritizing longevity, value, and tenant safety.",
    notableNeighborhoods: ["WCU Campus Area", "Old Cullowhee Road", "Caney Fork", "Speedwell"],
    marketAuthorityAngle: "We understand Cullowhee's academic rhythm. We coordinate with Jackson County property managers to ensure projects finish before the semester starts.",
    heroImage: "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "dillsboro-nc",
    name: "Dillsboro",
    county: "Jackson County",
    state: "NC",
    elevation: "2,041 ft",
    description: "A historic village where precision matters. We provide preservation-sensitive roofing and construction for Dillsboro's unique cottages and tourism properties.",
    features: ["Historic village care", "Precision flashing", "Tourism-ready cleanup", "Mountain cottage charm"],
    metaTitle: "Roofing & Construction in Dillsboro, NC | Highlander",
    metaDescription: "Preservation-sensitive roofing and construction for Dillsboro. Expert care for historic mountain cottages and village properties. Licensed & Insured.",
    housingProfile: "Historic village cottages, artisan shops, and riverfront residences in Dillsboro.",
    climateExposure: "River-proximate moisture and valley fog that demands algae-resistant materials and precise flashing.",
    localVibe: "A walkable, historic artisan community where the aesthetic impact of every project is carefully considered by neighbors and visitors.",
    constructionContext: "We specialize in preservation-focused renovations and small-scale additions that integrate with 100-year-old mountain home design.",
    serviceDemandMix: ["Designer Shingle Systems", "Artisan Porch Detailing", "Historic Exterior Repairs", "Gutter Copper Accents"],
    styleTendency: "Quaint Appalachian village style with a focus on charm, historic accuracy, and river-resistant structural details.",
    notableNeighborhoods: ["Historic Village Center", "Tuckasegee Riverfront", "Monteith Park area"],
    marketAuthorityAngle: "Dillsboro is a destination. We keep our job sites tourism-ready and our craftsmanship village-compliant to protect Dillsboro's unique mountain character.",
    heroImage: "https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "asheville-nc",
    name: "Asheville",
    county: "Buncombe County",
    state: "NC",
    elevation: "2,134 ft",
    description: "From historic Biltmore Forest estates to modern design masterpieces on Town Mountain, we provide Asheville with the highest standard of roofing and construction.",
    features: ["Historic preservation", "Modern mountain design", "Biltmore area experts", "Luxury master suites"],
    metaTitle: "Roofing & Construction in Asheville, NC | Highlander",
    metaDescription: "Premium roofing and construction for Asheville's historic districts and modern mountain homes. Licensed GC, master-class craftsmanship. Licensed & Insured.",
    housingProfile: "A mix of historic urban estates, luxury ridgetop moderns, and established suburban neighborhoods.",
    climateExposure: "High UV intensity on ridgetops and localized wind tunneling between mountain gaps that tests standard shingle adhesion.",
    localVibe: "A world-class arts and design hub where homeowners value both high-performance engineering and visual design excellence.",
    constructionContext: "We specialize in 'mountain modern' additions and luxury kitchen/bath transformations that integrate with Asheville's unique design landscape.",
    serviceDemandMix: ["Standing Seam Metal Roofing", "Brava Synthetic Slate", "Luxury Additions", "Modern Renovations"],
    styleTendency: "Eclectic mix of Tudor, Craftsman, and ultra-modern mountain home design featuring glass and steel.",
    notableNeighborhoods: ["Biltmore Forest", "Town Mountain", "Montford", "Grove Park", "Kenilworth"],
    marketAuthorityAngle: "Asheville projects demand a higher level of design sensitivity and structural precision. We build for the city's most discerning homeowners.",
    heroImage: "https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "hendersonville-nc",
    name: "Hendersonville",
    county: "Henderson County",
    state: "NC",
    elevation: "2,152 ft",
    description: "Serving Hendersonville's historic Main Street district and established plateau neighborhoods with high-reliability roofing and residential additions.",
    features: ["Retirement community focus", "Historic district care", "Reliable maintenance", "Deck safety upgrades"],
    metaTitle: "Roofing & Construction in Hendersonville, NC | Highlander",
    metaDescription: "Professional roofing and construction for Hendersonville's historic and residential properties. Specialized in longevity and reliability. Licensed & Insured.",
    housingProfile: "Historic downtown residences, expansive retirement communities, and newer multi-generational family developments.",
    climateExposure: "Regular thermal cycling and summer hail potential that requires Class 4 impact-rated shingle recommendations.",
    localVibe: "A stable, established community that values long-term property maintenance and traditional craftsman reliability.",
    constructionContext: "We focus on age-in-place modifications and exterior updates that ensure long-term home accessibility and durability.",
    serviceDemandMix: ["Impact-Resistant Shingles", "Exterior Siding Updates", "Deck Safety Repairs", "Residential Replacements"],
    styleTendency: "Classic Southern Appalachian styles including brick ranch, colonial revival, and modern craftsman.",
    notableNeighborhoods: ["Druid Hills", "Laurel Park", "Champion Hills", "Flat Rock area"],
    marketAuthorityAngle: "Hendersonville homeowners value longevity. we specify systems and build additions that are designed to last for decades, not just years.",
    heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "brevard-nc",
    name: "Brevard",
    county: "Transylvania County",
    state: "NC",
    elevation: "2,231 ft",
    description: "The gateway to Pisgah Forest. We specialize in moisture-resistant roofing and outdoor living expansions for Brevard's active, outdoor-centric homeowners.",
    features: ["Moisture management", "Outdoor living focus", "Pisgah area experts", "Gutter optimization"],
    metaTitle: "Roofing & Construction in Brevard, NC | Highlander",
    metaDescription: "Expert roofing and construction for Brevard and the Land of Waterfalls. Specialized in moisture management and outdoor living. Licensed & Insured.",
    housingProfile: "Traditional mountain bungalows, outdoor-centric residential neighborhoods, and ridgetop retreats near Pisgah.",
    climateExposure: "Persistent humidity and record-setting rainfall that requires double-underlayment and oversized gutter systems.",
    localVibe: "A vibrant, outdoor-focused community where homes are expected to integrate seamlessly with the natural environment.",
    constructionContext: "We specialize in deck expansions and 'mudroom' additions that help homeowners transition from the trails to the home.",
    serviceDemandMix: ["Advanced Gutter Systems", "Synthetic Shake Roofing", "Deck & Porch Additions", "Siding Modernization"],
    styleTendency: "Rustic modern and traditional mountain cottage styles emphasizing wood, stone, and natural finishes.",
    notableNeighborhoods: ["Deerwoode", "Straus Park", "Connestee Falls", "Sherwood Forest"],
    marketAuthorityAngle: "In the Land of Waterfalls, we treat every project as an exercise in precision moisture management. We build to stay dry in the rainiest county in NC.",
    heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "murphy-nc",
    name: "Murphy",
    county: "Cherokee County",
    state: "NC",
    elevation: "1,604 ft",
    description: "Serving the far west with reliable roofing and construction. We focus on durability and local accountability for Murphy's growing residential market.",
    features: ["Local crew presence", "Fast turnaround", "Residential specialists", "Vacation home care"],
    metaTitle: "Roofing & Construction in Murphy, NC | Highlander",
    metaDescription: "Reliable roofing and construction for Murphy and Cherokee County. Locally based crews, durable materials, and honest service. Licensed & Insured.",
    housingProfile: "Traditional family homes, retirement retreats, and high-traffic vacation rentals.",
    climateExposure: "Heavy seasonal humidity and wind-driven rain that requires high-quality underlayment and precise flashing details.",
    localVibe: "A friendly, community-oriented hub where local reliability and straight-forward pricing are the top priorities.",
    constructionContext: "We focus on whole-home exterior updates and deck expansions that add value to both primary and seasonal residences.",
    serviceDemandMix: ["Dimensional Shingle Systems", "Deck Repairs", "Siding Replacement", "Storm Damage Mitigation"],
    styleTendency: "Functional mountain residential and classic ranch styles built for durability and ease of maintenance.",
    notableNeighborhoods: ["Bear Paw", "Hiwassee Dam area", "Hanging Dog", "Murphy Town Center"],
    marketAuthorityAngle: "Murphy is where we offer Western North Carolina's most dependable local service. We're your neighbors, building for your long-term value.",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
  },
  {
    slug: "hayesville-nc",
    name: "Hayesville",
    county: "Clay County",
    state: "NC",
    elevation: "1,893 ft",
    description: "Serving Clay County and the Lake Chatuge area with premium roofing and lakefront residential construction. We build for longevity and lake-life durability.",
    features: ["Lake Chatuge experts", "Clay County focus", "Lakefront construction", "Durable roof systems"],
    metaTitle: "Roofing & Construction in Hayesville, NC | Highlander",
    metaDescription: "Professional roofing and construction for Hayesville and Clay County. Specialized in lakefront homes and mountain residences. Licensed & Insured.",
    housingProfile: "Lakefront vacation homes, rural residential properties, and retirement retreats.",
    climateExposure: "Lake-effect humidity and seasonal wind patterns across the Chatuge basin.",
    localVibe: "A relaxed, water-centric mountain community where homes are built for both recreation and long-term value.",
    constructionContext: "We specialize in lakefront deck expansions and 'outdoor kitchens' that maximize the Hayesville lifestyle.",
    serviceDemandMix: ["Standing Seam Metal", "Luxury Decking", "Exterior Modernization", "Residential Replacement"],
    styleTendency: "Lakefront Rustic and Traditional Mountain styles emphasizing views and outdoor living.",
    notableNeighborhoods: ["Lake Chatuge", "Tusquittee", "Shooting Creek", "Hayesville Center"],
    marketAuthorityAngle: "Hayesville homes are for living. We build systems that protect your investment so you can focus on the lake.",
    heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000"
  }
];

export const getTownBySlug = (slug: string) => towns.find(t => t.slug === slug);
