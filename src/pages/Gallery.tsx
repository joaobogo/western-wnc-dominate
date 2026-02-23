import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

import metal005 from "@/assets/gallery/metal-005.webp";
import metal006 from "@/assets/gallery/metal-006.webp";
import metal008 from "@/assets/gallery/metal-008.webp";
import metal003 from "@/assets/gallery/metal-003.webp";
import asphalt008 from "@/assets/gallery/asphalt-008.webp";
import asphalt007 from "@/assets/gallery/asphalt-007.webp";
import asphalt006 from "@/assets/gallery/asphalt-006.webp";
import asphaltHero from "@/assets/gallery/asphalt-hero.webp";
import asphalt002 from "@/assets/gallery/asphalt-002.jpg";
import cedar004 from "@/assets/gallery/cedar-004.webp";

const projects = [
  { title: "Standing Seam Metal — Dark Bronze", type: "Metal Roofing", description: "Aerial view of a complex multi-gable standing seam metal roof in dark bronze. Precision panel work on steep pitches.", image: metal005, category: "metal" },
  { title: "Standing Seam Metal — Mountain Cabin", type: "Metal Roofing", description: "Green standing seam metal on a log cabin nestled in the WNC mountains. Built for decades of mountain weather.", image: metal006, category: "metal" },
  { title: "Metal Panel — Silver", type: "Metal Roofing", description: "Clean silver metal panel installation with complex hip-and-valley roof geometry on a country home.", image: metal008, category: "metal" },
  { title: "Metal Roof — Rural Home", type: "Metal Roofing", description: "Brown metal panel installation on a brick home in the WNC countryside with mountain views.", image: metal003, category: "metal" },
  { title: "Architectural Shingles — Brown", type: "Asphalt Shingles", description: "Full architectural shingle roof replacement with clean hip-and-ridge lines on a residential property.", image: asphalt008, category: "asphalt" },
  { title: "Asphalt & Metal Combo — Highlands", type: "Asphalt Shingles", description: "Craftsman mountain home with architectural shingles and standing seam metal accent roofing with stone accents.", image: asphalt007, category: "asphalt" },
  { title: "Architectural Shingles — Slate Gray", type: "Asphalt Shingles", description: "Aerial drone view of a large residential shingle replacement in slate gray with complex roof intersections.", image: asphalt006, category: "asphalt" },
  { title: "Architectural Shingles — Weathered Wood", type: "Asphalt Shingles", description: "CertainTeed Landmark shingles on a multi-level mountain home with screen porch. Premium materials, expert install.", image: asphaltHero, category: "asphalt" },
  { title: "Architectural Shingles — Hunter Green", type: "Asphalt Shingles", description: "Bird's-eye drone view of a large complex residential roof with hunter green CertainTeed architectural shingles.", image: asphalt002, category: "asphalt" },
  { title: "Cedar Shake — Estate Home", type: "Cedar Shake", description: "Stunning cedar shake roof on a luxury estate in Highlands. Intricate multi-gable design with copper ridge accents.", image: cedar004, category: "cedar" },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Metal Roofing", value: "metal" },
  { label: "Asphalt Shingles", value: "asphalt" },
  { label: "Cedar Shake", value: "cedar" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <Header />
      <main>
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Our Work</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">Project Gallery</h1>
              <p className="text-dark-section-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
                Real projects across Western North Carolina — from standing seam metal to cedar shake estates.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    filter === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => setLightbox(projects.indexOf(project))}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-accent uppercase">{project.type}</span>
                      <h3 className="font-heading font-semibold text-foreground mt-2 mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="text-center mt-12">
              <Link to="/request-inspection" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                Request Free Inspection <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-primary-foreground hover:text-accent transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={projects[lightbox].image}
              alt={projects[lightbox].title}
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Gallery;
