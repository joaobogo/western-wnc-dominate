import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import CostContextBlock from "@/components/conversion/CostContextBlock";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Star, Home,
  ChevronRight, Eye, Ruler, Hammer, Users,
  Mountain, CalendarCheck, Sparkles, Sun, TreePine,
  Umbrella, Compass, PenTool, ClipboardCheck, Layers,
  FileCheck, Wrench, Droplets, Wind
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ConstructionClosingCTA } from "@/components/construction/ConstructionShared";
import { ProjectTypeSelector, BudgetRangeContext, TimelineExpectations } from "@/components/construction";
import { DesignProgramPromo } from "@/components/construction";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";
import outdoorMobileHero from "@/assets/heroes/outdoor-living-mobile.webp";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";

const heroImg = "/media/wnc-forest-cabin-roof.webp";
const porchContextImg = "/media/wnc-mountain-home-exterior.webp";
const timberFrameImg = "/media/wnc-mountain-home-exterior.webp";
const terrainSlopeImg = "/media/wnc-ridge-elevation-home.webp";

import proj1 from "@/assets/gallery/cedar-001.webp";
import proj2 from "@/assets/gallery/metal-006.webp";
import proj3 from "@/assets/gallery/asphalt-005.webp";
import proj4 from "@/assets/gallery/cedar-005.webp";
import RelatedLinks from "@/components/RelatedLinks";
import AnswerBlock from "@/components/seo/AnswerBlock";
import CommonConcerns from "@/components/conversion/CommonConcerns";
import TieredOffer from "@/components/conversion/TieredOffer";
import ConversionTrustBlock from "@/components/trust/ConversionTrustBlock";
import WhoShowsUp from "@/components/trust/WhoShowsUp";
import ServiceInternalLinks from "@/components/ServiceInternalLinks";
import { OUTDOOR_SUBPAGES } from "@/data/outdoor-living-subpages";

/* ═══════════════════════════════════════════ DATA ═══════════════════════════════════════════ */

const beautyFunctionDurability = [
  { icon: PenTool, title: "Design That Belongs", detail: "Every outdoor structure should complement your home's layout and style — not compete with it. We use the Highlander Design standard to match proportions and rooflines so outdoor spaces feel like intentional extensions of the home." },
  { icon: Ruler, title: "Layouts That Fit Your Life", detail: "How do you actually want to use the space? Cooking, entertaining, morning coffee, evening drinks? We design layouts around real use — not showroom photos." },
  { icon: Shield, title: "Durability for Mountain Life", detail: "WNC outdoor structures face UV, rain, freeze-thaw cycles, wind, and occasional ice loads. We specify materials and fasteners rated for these conditions and build with drainage, ventilation, and long-term maintenance in mind." },
];

const outdoorTypes = [
  { icon: Umbrella, title: "Covered Porches & Pavilions", detail: "Timber-framed, post-and-beam, or conventional covered structures that extend your living space outdoors — with roofing, lighting, electrical, and ceiling fan infrastructure built in." },
  { icon: Sun, title: "Screened Porches & Enclosures", detail: "Fully screened outdoor rooms that let you enjoy WNC evenings without the insects. Options range from simple screen-in conversions to custom-framed rooms with finished ceilings and fans." },
  { icon: TreePine, title: "Decks & Elevated Platforms", detail: "Composite, hardwood, and pressure-treated deck construction — including multi-level designs, stairs, railings, and integration with existing rooflines and entries." },
  { icon: Layers, title: "Patios & Hardscape Transitions", detail: "Stone, paver, and stamped-concrete patios built into the terrain — with proper base preparation, drainage, and clean transitions to decks, porches, and existing walkways. Sized for entertaining, dining, or a quiet morning coffee." },
  { icon: Layers, title: "Pergolas & Shade Structures", detail: "Freestanding or attached pergolas, arbors, and shade structures with optional retractable canopies, lighting, and climbing-plant infrastructure." },
  { icon: Compass, title: "Outdoor Kitchens & Living Areas", detail: "Full outdoor kitchen builds with countertops, gas/electric hookups, storage, and weather-resistant cabinetry. Designed for WNC's climate and built to handle mountain weather year-round." },
  { icon: Hammer, title: "Custom Exterior Enhancements", detail: "Retaining walls, privacy screens, built-in seating, fire pit surrounds, and custom hardscape-to-structure transitions that tie outdoor spaces together." },
];

const wncLifestyle = [
  { icon: Mountain, title: "Mountain Views & Orientation", detail: "We site and orient outdoor structures to capture your best views — whether that's a long-range mountain vista, a wooded slope, or a garden setting. Solar exposure, prevailing wind, and privacy are all factors in placement." },
  { icon: Wind, title: "Elevation & Climate Realities", detail: "At WNC elevations, outdoor living seasons are shorter and weather transitions faster. We design with three-season and four-season options, windbreaks, radiant heaters, and enclosure systems that extend usability." },
  { icon: Layers, title: "Terrain & Slope Integration", detail: "Many WNC properties involve slopes, rock, and uneven terrain. We design structures that work with the land — stepped decks, cantilevered platforms, retaining wall integration, and grade transitions that feel natural." },
  { icon: Droplets, title: "Drainage & Moisture Management", detail: "Mountain rainfall and slope dynamics create drainage challenges that flat-land builders never encounter. Every outdoor structure we build includes engineered drainage that protects both the structure and the landscape." },
];

const materials = [
  { icon: TreePine, title: "Composite Decking", detail: "Low-maintenance, fade-resistant, and available in wood-grain profiles that hold up to WNC's UV and moisture. Brands like TimberTech and Trex offer manufacturer warranties." },
  { icon: Layers, title: "Pressure-Treated Lumber", detail: "The workhorse of outdoor framing. Ground-contact rated for structural components, above-ground rated for visible elements. Cost-effective for large-scale builds." },
  { icon: Mountain, title: "Cedar & Hardwood", detail: "Natural beauty, warmth, and character. Cedar resists rot naturally; hardwoods like ipe and mahogany offer exceptional density and longevity. Requires periodic maintenance." },
  { icon: Shield, title: "Metal Roofing on Outdoor Structures", detail: "Standing seam and exposed-fastener metal roofing for covered porches and pavilions. Excellent drainage, long lifespan, and clean aesthetic that pairs well with timber framing." },
];


const processSteps = [
  { number: "01", icon: Phone, title: "Vision & Lifestyle Discussion", description: "We learn how you want to live outdoors — activities, timing, entertaining style, and aesthetic preferences. This shapes every design decision." },
  { number: "02", icon: Eye, title: "Site Evaluation", description: "We assess your property's terrain, orientation, views, drainage, access, and existing structures to identify the best location and approach." },
  { number: "03", icon: Ruler, title: "Design & Material Selection", description: "Conceptual layout, material recommendations, structural approach, and detailed proposal with defined scope, timeline, and investment." },
  { number: "04", icon: CalendarCheck, title: "Permitting & Scheduling", description: "Permit applications, engineering if required, material ordering, and production calendar confirmation." },
  { number: "05", icon: Hammer, title: "Construction", description: "Foundation, framing, roofing, electrical, finishes, and detail work — executed with daily oversight, quality checkpoints, and communication." },
  { number: "06", icon: Sparkles, title: "Completion & Enjoyment", description: "Final walk-through, cleanup, documentation, and your new outdoor space ready to use." },
];

const galleryImages = [
  { src: proj1, alt: "Covered porch with mountain views", label: "Covered Porch", location: "Mountain Estate, Asheville" },
  { src: proj2, alt: "Screened room with metal roof", label: "Screened Porch", location: "Ridge Property, Franklin" },
  { src: proj3, alt: "Multi-level deck with integrated stairs", label: "Composite Deck", location: "Hillside Build, Sylva" },
  { src: proj4, alt: "Timber-frame pavilion", label: "Timber Pavilion", location: "Custom Design, Fairview" },
];

const whyHighlander = [
  { icon: Shield, title: "Roofing Expertise Built In", detail: "Every covered outdoor structure needs a roof. As a roofing company first, we handle porch, pavilion, and enclosure roofing with the same materials, techniques, and warranty as our primary roofing work." },
  { icon: Users, title: "In-House Construction Crews", detail: "Framing, decking, and finish work runs under a Highlander project manager, with crews we know and hold to our standards from start to finish." },
  { icon: FileCheck, title: "Documented Scope & Pricing", detail: "Written proposals with transparent cost groupings, specified materials, defined timeline, and no vague allowances. You know exactly what you're getting before we mobilize." },
  { icon: Mountain, title: "WNC Terrain Experience", detail: "Steep lots, rock, variable soils, and complex drainage — we've built outdoor structures on the challenging terrain that defines Western North Carolina properties." },
];

const faqs = [
  { q: "How is an outdoor living project priced?", a: "Every project is priced from its own scope — structure type, footprint, roof system, finishes, and site access all shape the number. Rather than publish a generic range, we provide a detailed, grouped-cost proposal during the design phase so you know exactly what you're investing in." },
  { q: "How long does an outdoor living project take to build?", a: "Most projects take 4–10 weeks from permit approval to completion, depending on complexity. A simple deck may be faster; a covered structure with electrical, ceiling, and finishes takes longer. We provide a specific timeline during the proposal phase." },
  { q: "Do outdoor structures need permits in WNC?", a: "Most covered structures, decks above a certain height, and anything with electrical or plumbing requires a permit. We handle the entire permitting process as part of our standard scope." },
  { q: "What decking material do you recommend for this area?", a: "For most WNC homeowners, composite decking offers the best balance of appearance, durability, and low maintenance. For clients who prefer natural wood, cedar and ipe are excellent choices with the understanding that they require periodic sealing and maintenance." },
  { q: "Can you build on a steep or sloped lot?", a: "Yes. Many of our outdoor builds involve slopes, elevation changes, and challenging terrain. We design structures that work with the topography — cantilevered decks, stepped platforms, and retaining wall integration are all standard capabilities." },
  { q: "Do you coordinate roofing on covered outdoor structures?", a: "Absolutely — this is one of our key advantages. As a roofing and construction company, we handle the roofing on covered porches, pavilions, and screened rooms with the same materials, techniques, and warranty standards we use on primary roofing projects." },
  { q: "Can outdoor spaces be used year-round in WNC?", a: "With the right design, many outdoor spaces can be used 8–10 months per year. Screened porches with ceiling fans extend summer. Covered structures with radiant heaters and wind screens extend into fall and early spring. Four-season rooms with insulation and HVAC can be used year-round." },
  { q: "How do you protect outdoor structures from mountain weather?", a: "Material selection, fastener specification, drainage design, and structural engineering are all calibrated for WNC conditions — including wind exposure, freeze-thaw cycles, snow loads at elevation, and UV intensity. We build for the climate, not just the catalog." },
  { q: "Do you install patios as well as decks and porches?", a: "Yes. We build stone, paver, and stamped-concrete patios with proper base prep and drainage, and we coordinate the transition between the patio and any adjacent deck, porch, walkway, or entry — so the finished space reads as one project instead of separate add-ons." },
];

/* ═══════════════════════════════════════════ PAGE ═══════════════════════════════════════════ */

const OutdoorLiving = () => {
  return (
    <>
      <SEOHead
        title="Outdoor Living in WNC | Patios, Decks, Porches & Pergolas"
        description="Outdoor living in Western North Carolina: patios, covered porches, screened rooms, decks, and outdoor kitchens designed for mountain weather."
        path="/construction/outdoor-living"
        jsonLd={[
          serviceSchema({ name: "Outdoor Living", description: "Premium outdoor living construction for Western North Carolina homeowners.", url: "/construction/outdoor-living" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Outdoor Living", url: "/construction/outdoor-living" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <PageBreadcrumbs items={[{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Outdoor Living", url: "/construction/outdoor-living" }]} />
      <ServicePageTemplate
        alternateSurfaces={false}
        hero={
          <>
            {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 767px)" srcSet={outdoorMobileHero} />
              <img width={1600} height={1067} decoding="async" src={heroImg} alt="Outdoor living space in Western North Carolina" className="w-full h-full object-cover object-[50%_35%] md:object-center" loading="eager" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.65)] via-[hsl(var(--hero-overlay)/0.35)] to-[hsl(var(--hero-overlay)/0.15)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.6)] to-[hsl(var(--highland-gold)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 0.4, delay: 0.3 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 hero-clears-header pb-24 md:pb-32">
            <div className="max-w-3xl">

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Outdoor Living Construction in Western North Carolina
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h2 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
                  <span className="text-[hsl(var(--gold-ink))]">Built for the View. Built for the Weather.</span>
                </motion.h2>
              </div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="text-xl md:text-2xl text-white mb-12 max-w-2xl leading-relaxed font-body font-bold drop-shadow-md">
                Decks, covered porches, screened rooms, and outdoor kitchens — strengthened by our <Link to="/layouts-planning" className="text-[hsl(var(--gold-ink))] hover:underline underline-offset-4 decoration-[hsl(var(--highland-gold)/0.4)]">Design branch</Link> to handle mountain weather and maximize mountain life.
              </motion.p>


              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/request-inspection" className="btn btn-primary btn-md group relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Get My Project Scoped</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <a href={PHONE_TEL} className="btn btn-secondary btn-lg btn-on-dark group">
                  <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
              </motion.div>

              {/* Outdoor lifestyle badges — unique to Outdoor Living */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-10 flex items-center gap-3"
              >
                {[
                  { icon: Sun, label: "3–4 Season Use" },
                  { icon: Mountain, label: "View Optimization" },
                  { icon: Shield, label: "Mountain-Rated" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/8 rounded-sm">
                    <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.9)]" />
                    <span className="text-caption font-body text-primary-foreground uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
          </>
        }
        quickAnswer={
          <>
            <AnswerBlock
          question="What is an outdoor living project?"
          answer="Outdoor living work builds usable exterior space — covered porches, decks, screened rooms, and outdoor kitchens — engineered for mountain terrain and weather. On sloped lots, footings, drainage, and roof tie-in matter as much as the finished surface. Highlander designs and builds outdoor living spaces across Western North Carolina."
          points={["Covered porches, decks, and screened rooms", "Footings and drainage engineered for sloped lots", "Roof and structure tied into the existing home"]}
        />
          </>
        }
        whatWeDo={
          <>
            {/* ─── OPENING — Experiential with generous whitespace ─── */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-2/3 opacity-[0.03] pointer-events-none">
            <img width={1600} height={1067} loading="lazy" decoding="async" src="/media/wnc-mountain-home-exterior.webp" alt="Timber frame detail" className="w-full h-full object-cover" />
          </div>

          <div className="container-tight max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <Sun className="w-6 h-6 text-[hsl(var(--highland-gold)/0.75)] mx-auto mb-8" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl lg:text-heading-lg font-heading font-bold text-foreground leading-[1.12] mb-8 text-balance tracking-tight">
                Mountain living is meant to be lived outside — on porches, decks, and patios built to enjoy the view in every season.
              </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-[1.8] font-body max-w-2xl mx-auto">
                  Highlander designs and builds bright, comfortable outdoor living spaces scaled to your home, crafted for the Western North Carolina climate, and finished with the same care we bring to every project.
                </p>
              <div className="mt-12 relative aspect-[16/7] overflow-hidden border border-border">
                <img width={1600} height={1067} decoding="async" src={porchContextImg} alt="Sunlit mountain home with covered porch and deck overlooking the landscape" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-1000" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </section>
            {/* ─── BEAUTY, FUNCTION, DURABILITY (dark) ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Our Philosophy</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Beauty. Function.<br className="hidden md:block" /> Durability.
                </h2>
                <p className="text-dark-section-foreground text-base font-body max-w-lg mx-auto">
                  Great outdoor spaces deliver all three — and compromising on any one undermines the other two.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {beautyFunctionDurability.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
                    <p className="text-dark-section-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
          </>
        }
        whatsIncluded={
          <>
            {/* ─── OUTDOOR TYPES ─── */}
        <section className="section-padding bg-background/50 relative">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">What We Build</span>
              <h2 className="section-heading mb-4">Outdoor Spaces<br className="hidden md:block" /> Worth Living In.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {outdoorTypes.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>

            {/* Dedicated pages for the three outdoor-living services people search for by name (15 Sep 2026 SEO audit) */}
            <div className="mt-10 md:mt-12">
              <p className="text-caption font-bold uppercase tracking-widest text-[hsl(var(--gold-ink))] mb-4">Go deeper</p>
              <div className="grid gap-4 md:grid-cols-3">
                {OUTDOOR_SUBPAGES.map((sub) => (
                  <Link
                    key={sub.slug}
                    to={sub.path}
                    className="group border border-border bg-card rounded-sm p-5 hover:border-[hsl(var(--highland-gold)/0.4)] transition-colors"
                  >
                    <h3 className="font-heading font-bold text-foreground mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{sub.crumb}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{sub.answer.points[0]}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
            {/* ─── MATERIALS ─── */}
        <section className="section-padding bg-background/50 relative">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Materials & Durability</span>
              <h2 className="section-heading mb-4">Built for This Climate.</h2>
              <p className="text-muted-foreground text-base font-body max-w-lg mx-auto leading-relaxed">Materials that look great in a showroom don't always hold up at 3,500 feet. We specify for WNC conditions.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {materials.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
          </>
        }
        process={
          <>
            {/* ─── PROCESS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Our Process</span>
              <h2 className="section-heading mb-4">From Concept to<br className="hidden md:block" /> First Evening Outside.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-[hsl(var(--highland-gold)/0.1)] transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                    <step.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
          </>
        }
        proof={
          <>
            {/* ─── MID CTA ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Imagining your perfect outdoor space?</h3>
                <p className="text-primary-foreground text-sm font-body">Let's discuss what's possible for your property, your views, and your lifestyle.</p>
              </div>
              <div className="flex w-full min-w-0 flex-wrap justify-center gap-3 lg:w-auto lg:justify-end lg:flex-shrink-0">
                <Link to="/request-inspection" className="btn btn-primary btn-md group relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Get My Project Scoped</span>
                  <ArrowRight className="w-4 h-4 relative" aria-hidden="true" />
                </Link>
                <a href={PHONE_TEL} className="btn btn-secondary btn-md btn-on-dark">
                  <Phone className="w-4 h-4" aria-hidden="true" /> Call Direct
                </a>
              </div>
            </div>
          </div>
        </section>
            {/* ─── WHY HIGHLANDER ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--gold-ink))]">Why Highlander</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  A Roofing Company That<br className="hidden md:block" /> Builds Outdoor Structures.
                </h2>
                <p className="text-dark-section-foreground text-base font-body max-w-lg mx-auto leading-relaxed">
                  Every covered porch, pavilion, and screened room needs a roof. We don't subcontract that part — we built the company on it.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {whyHighlander.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.15)] transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
                    <p className="text-dark-section-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
            {/* ─── GALLERY ─── */}
        <section className="section-padding bg-background/50 relative">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Featured Projects</span>
              <h2 className="section-heading mb-3">Outdoor Spaces We've Built.</h2>
              <p className="text-muted-foreground text-base font-body max-w-md mx-auto leading-relaxed">Each project was designed for its specific property, climate exposure, and the way the homeowner lives.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img width={1600} height={1067} decoding="async" src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-sm font-heading font-bold tracking-wide mb-0.5">{img.label}</p>
                    <p className="text-white/85 text-xs font-body">{img.location}</p>
                  </div>
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[hsl(var(--highland-gold))] group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
              <Link to="/recent-projects" className="group text-sm font-heading font-semibold text-[hsl(var(--gold-ink))] inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                View Full Project Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>
            <BuilderPromoBlock mode="construction"
          variant="band"
          preset="outdoor_living"
          title="Plan Your Outdoor Living Project"
          body="Optional guided pathway for porches, decks, pergolas, outdoor kitchens, and fire features. Walk through scope, integration, and timing — we use it to prepare a sharper site conversation."
          ctaLabel="Get My Outdoor Plan"
        />
            <WhoShowsUp />
            <TieredOffer context="outdoor-living" primaryLabel="Get My Outdoor Space Planned" primaryTo="/request-inspection?context=outdoor_living&type=construction-outdoor-living" />
<ConversionTrustBlock variant="band" category="construction" />
          </>
        }
        faq={
          <>
            {/* ─── FAQs ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Outdoor Living FAQs</span>
              <h2 className="section-heading mb-4">Common Questions.</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-[hsl(var(--highland-gold)/0.2)] data-[state=open]:shadow-flat transition-all duration-300">
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                      <span className="font-heading font-semibold text-foreground text-body-sm leading-snug text-left">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pr-2">
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>
          </>
        }
        coverage={
          <>
            {/* ─── WNC LIFESTYLE (asymmetric) ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">WNC Living</span>
                <h2 className="section-heading mb-5">Designed for<br /> Mountain Property.</h2>
                <p className="text-muted-foreground text-base font-body mb-6 leading-relaxed">
                  Western North Carolina properties come with unique advantages — and unique challenges. We design outdoor spaces that leverage your views, work with your terrain, and handle your weather.
                </p>
                <div className="bg-card border border-[hsl(var(--highland-gold)/0.12)] rounded-sm p-5">
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2">Wondering what's possible on your lot?</h3>
                  <p className="text-muted-foreground text-body-xs leading-relaxed font-body mb-3">We evaluate terrain, views, drainage, and access as part of every outdoor project consultation.</p>
                  <Link to="/request-inspection" className="group text-sm font-semibold text-[hsl(var(--gold-ink))] inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity font-body">
                    Talk With Our Construction Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {wncLifestyle.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-[hsl(var(--highland-gold)/0.2)] card-lift transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors">
                        <item.icon className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{item.title}</h3>
                        <p className="text-muted-foreground text-body-xs leading-relaxed font-body">{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
            <RelatedLinks
          eyebrow="Keep Exploring"
          heading="Related pages you may find useful"
          columns={2}
          links={[
            { label: "Construction Division", href: "/construction", description: "Additions, renovations, and outdoor living" },
            { label: "Design & Planning Services", href: "/construction/design", description: "Design agreements and planning support" },
            { label: "Highlands, NC Service Area", href: "/service-areas/highlands-nc", description: "Outdoor living work in Highlands" },
            { label: "Recent Highlander Projects", href: "/recent-projects", description: "See recent porches and outdoor rooms" },
            { label: "Discuss an Outdoor Project", href: "/request-inspection?context=outdoor_related&type=construction-outdoor-living", description: "Start with the short first-contact form" },
            { label: "Get My Questions Answered", href: "/contact", description: "Reach a construction advisor" }
          ]}
        />
        <ServiceInternalLinks title="Outdoor Living" slug="outdoor-living" intent="consultation" />
          </>
        }
        cta={
          <>
            {/* ─── CLOSING CTA ─── */}
        <DesignProgramPromo
          heading="Multi-Phase Outdoor Builds Deserve Real Planning."
          subheading="Slope, drainage, roof tie-ins, and material direction shape every great outdoor space. A paid Design & Consultation Agreement turns the vision into a buildable, permit-ready plan."
          variant="band"
          className="mt-4"
        />

        {/* CRO Prompt 33 — consultative construction sequence */}
        <ProjectTypeSelector highlight="outdoor-living" />
        <TimelineExpectations />
        <BudgetRangeContext scopeLabel="outdoor living projects" />

        <CostContextBlock serviceLabel="outdoor living" variant="construction" />
        <CommonConcerns />
        <ConstructionClosingCTA
          headline={"The Best Room in Your\nHouse Doesn't Need Walls."}
          subheadline="Whether it's a covered porch for morning coffee, a screened room for summer evenings, or an outdoor kitchen for gathering — let's design the space you've been imagining."
          eyebrow="Start Your Outdoor Project"
        />
          </>
        }
      />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default OutdoorLiving;
