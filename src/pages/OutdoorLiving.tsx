import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Shield, Star, Home,
  ChevronRight, Eye, Ruler, Hammer, Users,
  Mountain, CalendarCheck, Sparkles, Sun, TreePine,
  CloudRain, Thermometer, Umbrella, Compass, PenTool,
  ClipboardCheck, Layers
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import heroImg from "@/assets/gallery/cedar-003.jpg";
import proj1 from "@/assets/gallery/cedar-001.jpg";
import proj2 from "@/assets/gallery/metal-006.webp";
import proj3 from "@/assets/gallery/asphalt-005.jpg";
import proj4 from "@/assets/gallery/cedar-004.webp";

/* ═══════════════════════════════════════════ */

const outdoorTypes = [
  { icon: Umbrella, title: "Covered Porches & Pavilions", detail: "Timber-framed, post-and-beam, or conventional covered structures that extend your living space outdoors — with roofing, lighting, electrical, and ceiling fan infrastructure built in." },
  { icon: Sun, title: "Screened Porches & Enclosures", detail: "Fully screened outdoor rooms that let you enjoy WNC evenings without the insects. Options range from simple screen-in conversions to custom-framed rooms with finished ceilings and fans." },
  { icon: TreePine, title: "Decks & Elevated Platforms", detail: "Composite, hardwood, and pressure-treated deck construction — including multi-level designs, stairs, railings, and integration with existing rooflines and entries." },
  { icon: Layers, title: "Pergolas & Shade Structures", detail: "Freestanding or attached pergolas, arbors, and shade structures with optional retractable canopies, lighting, and climbing-plant infrastructure." },
  { icon: Compass, title: "Outdoor Kitchens & Living Areas", detail: "Full outdoor kitchen builds with countertops, gas/electric hookups, storage, and weather-resistant cabinetry. Designed for WNC's climate and built to handle mountain weather year-round." },
  { icon: Hammer, title: "Custom Exterior Enhancements", detail: "Retaining walls, privacy screens, built-in seating, fire pit surrounds, and custom hardscape-to-structure transitions that tie outdoor spaces together." },
];

const beautyFunctionDurability = [
  { icon: PenTool, title: "Beauty That Belongs", detail: "Every outdoor structure should complement your home's architecture — not compete with it. We match materials, proportions, and rooflines so outdoor spaces feel like intentional extensions of the home." },
  { icon: Ruler, title: "Function That Fits Your Life", detail: "How do you actually want to use the space? Cooking, entertaining, morning coffee, evening drinks, reading, watching the mountains? We design around real use — not showroom photos." },
  { icon: Shield, title: "Durability for Mountain Life", detail: "WNC outdoor structures face UV, rain, freeze-thaw cycles, wind, and occasional ice loads. We specify materials and fasteners rated for these conditions and build with drainage, ventilation, and long-term maintenance in mind." },
];

const wncLifestyle = [
  { title: "Mountain Views & Orientation", detail: "We site and orient outdoor structures to capture your best views — whether that's a long-range mountain vista, a wooded slope, or a garden setting. Solar exposure, prevailing wind, and privacy are all factors in placement." },
  { title: "Elevation & Climate Realities", detail: "At WNC elevations, outdoor living seasons are shorter and weather transitions faster. We design with three-season and four-season options, windbreaks, radiant heaters, and enclosure systems that extend usability." },
  { title: "Terrain & Slope Integration", detail: "Many WNC properties involve slopes, rock, and uneven terrain. We design structures that work with the land — stepped decks, cantilevered platforms, retaining wall integration, and grade transitions that feel natural." },
  { title: "Wildlife & Nature Coexistence", detail: "Screened enclosures, secure storage, and thoughtful lighting that lets you enjoy the natural setting without attracting or displacing the wildlife that makes these mountains special." },
];

const materials = [
  { icon: TreePine, title: "Composite Decking", detail: "Low-maintenance, fade-resistant, and available in wood-grain profiles that hold up to WNC's UV and moisture. Brands like TimberTech and Trex offer 25–50 year warranties." },
  { icon: Layers, title: "Pressure-Treated Lumber", detail: "The workhorse of outdoor framing. Ground-contact rated for structural components, above-ground rated for visible elements. Cost-effective for large-scale builds." },
  { icon: Mountain, title: "Cedar & Hardwood", detail: "Natural beauty, warmth, and character. Cedar resists rot naturally; hardwoods like ipe and mahogany offer exceptional density and longevity. Requires periodic maintenance." },
  { icon: Shield, title: "Metal Roofing on Outdoor Structures", detail: "Standing seam and exposed-fastener metal roofing for covered porches and pavilions. Excellent drainage, long lifespan, and clean aesthetic that pairs well with timber framing." },
];

const designGuidance = [
  { title: "Start With How You'll Use It", detail: "Before sketching layouts, define the activities. Cooking requires utilities. Entertaining requires flow. Relaxation requires privacy. The use case drives the design — not the other way around." },
  { title: "Connect Inside and Outside", detail: "The transition from interior to exterior space should feel effortless. Door placement, floor-level alignment, sightlines, and material continuity all contribute to a connected experience." },
  { title: "Plan for Evening & Off-Season", detail: "The best outdoor spaces work after sunset and beyond summer. Lighting design, heating options, wind protection, and enclosure flexibility extend your investment across more months and more hours." },
  { title: "Think About Maintenance Honestly", detail: "Every material has a maintenance reality. We'll help you choose based on how much upkeep you're willing to do — not just how something looks in a catalog." },
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
  { src: proj1, alt: "Covered porch with mountain views", label: "Covered Porch — Mountain Estate" },
  { src: proj2, alt: "Screened room with metal roof", label: "Screened Porch — Ridge Property" },
  { src: proj3, alt: "Multi-level deck with integrated stairs", label: "Composite Deck — Hillside Build" },
  { src: proj4, alt: "Timber-frame pavilion", label: "Timber Pavilion — Custom Design" },
];

const faqs = [
  { q: "What's the typical cost range for an outdoor living project?", a: "Costs vary widely by scope. A basic deck starts around $15,000–$30,000. Screened porches range from $25,000–$60,000. Covered pavilions and outdoor kitchens typically run $40,000–$100,000+. We provide detailed, line-item proposals during the design phase so you know exactly what you're investing." },
  { q: "How long does an outdoor living project take to build?", a: "Most projects take 4–10 weeks from permit approval to completion, depending on complexity. A simple deck may be faster; a covered structure with electrical, ceiling, and finishes takes longer. We provide a specific timeline during the proposal phase." },
  { q: "Do outdoor structures need permits in WNC?", a: "Most covered structures, decks above a certain height, and anything with electrical or plumbing requires a permit. We handle the entire permitting process as part of our standard scope." },
  { q: "What decking material do you recommend for this area?", a: "For most WNC homeowners, composite decking offers the best balance of appearance, durability, and low maintenance. For clients who prefer natural wood, cedar and ipe are excellent choices with the understanding that they require periodic sealing and maintenance." },
  { q: "Can you build on a steep or sloped lot?", a: "Yes. Many of our outdoor builds involve slopes, elevation changes, and challenging terrain. We design structures that work with the topography — cantilevered decks, stepped platforms, and retaining wall integration are all standard capabilities." },
  { q: "Do you coordinate roofing on covered outdoor structures?", a: "Absolutely — this is one of our key advantages. As a roofing and construction company, we handle the roofing on covered porches, pavilions, and screened rooms with the same materials, techniques, and warranty standards we use on primary roofing projects." },
  { q: "Can outdoor spaces be used year-round in WNC?", a: "With the right design, many outdoor spaces can be used 8–10 months per year. Screened porches with ceiling fans extend summer. Covered structures with radiant heaters and wind screens extend into fall and early spring. Four-season rooms with insulation and HVAC can be used year-round." },
  { q: "How do you protect outdoor structures from mountain weather?", a: "Material selection, fastener specification, drainage design, and structural engineering are all calibrated for WNC conditions — including wind exposure, freeze-thaw cycles, snow loads at elevation, and UV intensity. We build for the climate, not just the catalog." },
];

/* ═══════════════════════════════════════════ */
const OutdoorLiving = () => {
  return (
    <>
      <SEOHead
        title="Outdoor Living | Covered Porches, Decks, Screened Rooms & Pavilions in WNC"
        description="Premium outdoor living spaces for Western North Carolina. Covered porches, screened rooms, decks, pavilions, and outdoor kitchens designed for mountain weather and mountain life."
        path="/construction/outdoor-living"
        jsonLd={[
          serviceSchema({ name: "Outdoor Living", description: "Premium outdoor living construction for Western North Carolina homeowners.", url: "/construction/outdoor-living" }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction", url: "/construction" }, { name: "Outdoor Living", url: "/construction/outdoor-living" }]),
          faqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Outdoor living space in Western North Carolina" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.15)] to-[hsl(var(--hero-overlay)/0.3)]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.6)] to-[hsl(var(--heritage-green)/0)] z-10" />
          <motion.div className="absolute left-0 top-0 w-[2px] z-20" style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))" }} initial={{ height: "0%" }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} />

          <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-14 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
                <Link to="/construction" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-sm bg-primary/20 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-primary-foreground" /></div>
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Construction</span>
                </Link>
                <ChevronRight className="w-3 h-3 text-primary-foreground/25" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Outdoor Living</span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Built for the View.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight">
                  Built for the Weather.
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }} className="text-base md:text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed font-body">
                Premium outdoor living spaces for Western North Carolina — covered porches, screened rooms, decks, pavilions, and custom exterior builds designed to handle mountain weather and maximize mountain life.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Outdoor Project</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:8283979211" className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> (828) 397-9211
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── OPENING ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="w-12 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.2] mb-6 text-balance">
                The mountains are the reason you live here. Your outdoor space should be the reason you stay outside.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto">
                Highlander builds outdoor living spaces that are designed for the Western North Carolina climate, scaled to your property, and finished with the same quality we bring to every roofing and construction project. From covered porches that handle afternoon storms to screened rooms that extend your evenings — we build spaces that work as hard as they look.
              </p>
              <div className="w-12 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold))] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ─── BEAUTY, FUNCTION, DURABILITY ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Our Philosophy</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Beauty. Function.<br className="hidden md:block" /> Durability.
                </h2>
                <p className="text-dark-section-foreground/40 text-base font-body max-w-lg mx-auto">
                  Great outdoor spaces deliver all three — and compromising on any one undermines the other two.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {beautyFunctionDurability.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-dark-section-foreground/12 transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-5">
                      <item.icon className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                    </div>
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
                    <p className="text-dark-section-foreground/40 text-[13px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── OUTDOOR TYPES ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">What We Build</span>
              <h2 className="section-heading mb-4">Outdoor Spaces<br className="hidden md:block" /> Worth Living In.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {outdoorTypes.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WNC LIFESTYLE ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
                <span className="eyebrow mb-3 block">WNC Living</span>
                <h2 className="section-heading mb-5">Designed for<br /> Mountain Property.</h2>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  Western North Carolina properties come with unique advantages — and unique challenges. We design outdoor spaces that leverage your views, work with your terrain, and handle your weather.
                </p>
              </motion.div>

              <div className="lg:col-span-3 space-y-4">
                {wncLifestyle.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group p-5 md:p-6 rounded-sm bg-card border border-border hover:border-primary/15 card-lift">
                    <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── MID CTA ─── */}
        <section className="bg-primary text-primary-foreground tartan-dark">
          <div className="container-tight px-5 md:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-xl md:text-2xl mb-1.5">Imagining your perfect outdoor space?</h3>
                <p className="text-primary-foreground/50 text-sm font-body">Let's discuss what's possible for your property, your views, and your lifestyle.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link to="/consultation" className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a href="tel:8283979211" className="border border-primary-foreground/15 text-primary-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center gap-2 hover:bg-primary-foreground/5 transition-all">
                  <Phone className="w-4 h-4" /> Call Direct
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MATERIALS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
              <span className="eyebrow mb-3 block">Materials & Weather</span>
              <h2 className="section-heading mb-4">Built for This Climate.</h2>
              <p className="text-muted-foreground text-sm font-body max-w-lg mx-auto">Materials that look great in a showroom don't always hold up at 3,500 feet. We specify for WNC conditions.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {materials.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2.5 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Featured Projects</span>
              <h2 className="section-heading">Outdoor Spaces<br className="hidden md:block" /> We've Built.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {galleryImages.map((img, i) => (
                <motion.div key={img.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[4/3] rounded-sm overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-xs font-body font-medium tracking-wide">{img.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="section-padding bg-secondary tartan-bg">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="eyebrow mb-3 block">Our Process</span>
              <h2 className="section-heading mb-4">From Concept to<br className="hidden md:block" /> First Evening Outside.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift">
                  <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">{step.number}</span>
                  <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DESIGN GUIDANCE ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
                <span className="eyebrow mb-3 block text-[hsl(var(--highland-gold))]">Design Guidance</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-[1.15] text-dark-section-foreground">
                  Before You Build,<br className="hidden md:block" /> Think About This.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {designGuidance.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="border border-dark-section-foreground/6 rounded-sm p-6 md:p-7 hover:border-dark-section-foreground/12 transition-colors">
                    <h3 className="font-heading font-bold text-dark-section-foreground text-base mb-2.5">{item.title}</h3>
                    <p className="text-dark-section-foreground/40 text-[13px] leading-relaxed font-body">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
              <span className="eyebrow mb-3 block">Outdoor Living FAQs</span>
              <h2 className="section-heading mb-4">Common Questions.</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300">
                    <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                      <span className="font-heading font-semibold text-foreground text-[15px] leading-snug text-left">{faq.q}</span>
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

        {/* ─── CLOSING CTA ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.5), hsl(var(--highland-gold) / 0))" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <div className="section-padding">
            <div className="container-tight">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="eyebrow mb-5 block text-[hsl(var(--highland-gold))]">Start Your Outdoor Project</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1] text-dark-section-foreground">
                    The Best Room in Your<br className="hidden md:block" /> House Doesn't Need Walls.
                  </h2>
                  <p className="text-dark-section-foreground/45 text-base md:text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
                    Whether it's a covered porch for morning coffee, a screened room for summer evenings, or an outdoor kitchen for gathering — let's design the space you've been imagining.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Link to="/consultation" className="group cta-gradient text-accent-foreground font-heading font-bold text-base px-10 py-4.5 rounded-sm inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden tracking-wide">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Schedule a Project Consultation</span>
                      <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="tel:8283979211" className="group border border-dark-section-foreground/12 text-dark-section-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2.5 hover:bg-dark-section-foreground/5 transition-all">
                      <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.5)]" /> (828) 397-9211
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-dark-section-foreground/6">
                    {[
                      { icon: Shield, text: "Licensed & Insured" },
                      { icon: Users, text: "In-House Crews" },
                      { icon: Mountain, text: "WNC Specialists" },
                      { icon: Star, text: "Roofing + Construction" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.35)]" />
                        <span className="text-dark-section-foreground/25 text-xs font-body font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default OutdoorLiving;
