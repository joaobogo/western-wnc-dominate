import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";
import { towns } from "@/data/towns";

const ServiceAreas = () => {
  return (
    <>
      <Header />
      <main>
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Service Areas</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Serving Western North Carolina
              </h1>
              <p className="text-dark-section-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
                Locally operated with crews across the region. We know these mountains — and the roofs that protect the homes in them.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {towns.map((town, i) => (
                <motion.div
                  key={town.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/service-areas/${town.slug}`}
                    className="group block bg-card border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    <MapPin className="w-8 h-8 text-primary mb-3" />
                    <h2 className="font-heading font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">{town.name}, NC</h2>
                    <p className="text-muted-foreground text-xs mb-3">{town.county}</p>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{town.description.slice(0, 120)}…</p>
                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      View Services <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <InspectionForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default ServiceAreas;
