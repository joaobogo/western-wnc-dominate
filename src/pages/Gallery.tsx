import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const projects = [
  { title: "Shingle Replacement — Highlands", type: "Replacement", description: "Full tear-off and CertainTeed architectural shingle installation on a 3,200 sq ft mountain home." },
  { title: "Storm Damage Repair — Franklin", type: "Storm Damage", description: "Emergency tarping and complete repair after severe wind damage to ridge caps and flashing." },
  { title: "Standing Seam Metal — Cashiers", type: "Metal Roofing", description: "Premium standing seam metal roof installation on a lakefront property." },
  { title: "Commercial Flat Roof — Sylva", type: "Commercial", description: "TPO membrane installation on a 10,000 sq ft retail building." },
  { title: "Ice Dam Prevention — Highlands", type: "Maintenance", description: "Ice & water shield installation with heat cables for a repeat ice dam problem." },
  { title: "Full Replacement — Waynesville", type: "Replacement", description: "Complete roof system replacement including ventilation upgrade for energy efficiency." },
  { title: "Emergency Tarp — Bryson City", type: "Storm Damage", description: "Same-day emergency tarping after a tree fell on a residential roof during a summer storm." },
  { title: "Metal Roof — Dillsboro", type: "Metal Roofing", description: "Exposed fastener metal panel installation on a historic cottage renovation." },
  { title: "Maintenance Program — Cullowhee", type: "Commercial", description: "Ongoing bi-annual maintenance for a multi-unit rental property near WCU." },
];

const Gallery = () => {
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
                Real projects across Western North Carolina — from emergency repairs to full commercial installations.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Project Photo</span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-accent uppercase">{project.type}</span>
                    <h3 className="font-heading font-semibold text-foreground mt-2 mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/request-inspection" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                Request Free Inspection <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Gallery;
