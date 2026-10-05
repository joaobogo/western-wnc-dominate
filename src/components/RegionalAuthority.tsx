import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ShieldCheck, Hammer, Wrench } from "lucide-react";

// Homepage SEO authority block — covers primary regional and service
// keywords with natural, editorial copy. Not a keyword dump.
const RegionalAuthority = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden" aria-labelledby="regional-authority-heading">
      <div className="container-tight grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Editorial column */}
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-3 block"
          >
            Roofing & Construction · Western North Carolina
          </motion.span>

          <motion.h2
            id="regional-authority-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-display font-heading font-bold mb-5 leading-[0.98] tracking-tight"
          >
            A Roofing Company Built{" "}
            <span className="text-[hsl(var(--gold-ink))]">for Western NC.</span>
          </motion.h2>

          <div className="w-12 h-px bg-[hsl(var(--highland-gold))] mb-6" />

          <div className="space-y-5 text-foreground/90 text-body-sm md:text-body leading-relaxed font-body">
            <p>
              Highlander Building Services is a family-owned{" "}
              <strong>roofing company serving Western North Carolina</strong> from
              our Franklin showroom, providing{" "}
              <Link to="/roofing/roof-repair" className="text-primary font-semibold hover:underline">roof repair in Western NC</Link>,{" "}
              <Link to="/roofing/roof-replacement" className="text-primary font-semibold hover:underline">full roof replacement</Link>, and{" "}
              <Link to="/roofing/metal" className="text-primary font-semibold hover:underline">standing-seam metal roofing</Link>{" "}
              for mountain homes from Macon County to Jackson, Buncombe, and Haywood.
            </p>
            <p>
              Highlander is a licensed North Carolina General Contractor offering both
              roofing and construction services. That lets homeowners discuss roof-to-structure
              transitions, exterior envelope work, additions, porches, and renovations with one
              company instead of starting with disconnected scopes.{" "}
              <Link to="/construction" className="text-primary font-semibold hover:underline">Roofing and construction in Western NC</Link>{" "}
              are planned within the same Highlander project system.
            </p>
            <p>
              Homeowners searching for a{" "}
              <Link to="/service-areas/franklin-nc" className="text-primary font-semibold hover:underline">roofing company near Franklin, NC</Link>,
              a{" "}
              <Link to="/service-areas/highlands-nc" className="text-primary font-semibold hover:underline">roofing contractor near Highlands, NC</Link>,
              or a{" "}
              <Link to="/service-areas/cashiers-nc" className="text-primary font-semibold hover:underline">roofing contractor near Cashiers, NC</Link>{" "}
              can use Highlander to evaluate how elevation, wind exposure, rainfall,
              drainage, roof geometry, and access should influence the written project scope.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/request-inspection"
              className="btn btn-primary btn-md group"
            >
              Get My Written Estimate
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <Link
              to="/roofing"
              className="btn btn-secondary btn-md group"
            >
              All Roofing Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Coverage panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="lg:col-span-5 lg:sticky lg:top-28"
        >
          <div className="bg-card border border-border rounded-none p-6 md:p-8 shadow-flat">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
              <span className="text-caption font-body font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Coverage Snapshot
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 leading-tight">
              One team. Roofing &amp; construction across the Western NC mountains.
            </h3>

            <ul className="space-y-3 mb-6 text-body-sm font-body">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                <span><strong>Licensed NC General Contractor</strong> — CertainTeed Credentialed Contractor.</span>
              </li>
              <li className="flex items-start gap-3">
                <Wrench className="w-4 h-4 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                <span><strong>Roof repair &amp; replacement</strong> — asphalt, metal, cedar, synthetic, and specialty low-slope systems.</span>
              </li>
              <li className="flex items-start gap-3">
                <Hammer className="w-4 h-4 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                <span><strong>Full construction</strong> — additions, renovations, outdoor living, and design-build.</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                <span><strong>Serving Western NC</strong> — Franklin, Highlands, Cashiers, Sylva, Waynesville, Brevard, Bryson City &amp; more.</span>
              </li>
            </ul>

            <div className="pt-5 border-t border-border grid grid-cols-2 gap-2 text-sm font-body">
              <Link to="/service-areas/franklin-nc" className="text-primary hover:underline font-semibold">Franklin, NC →</Link>
              <Link to="/service-areas/highlands-nc" className="text-primary hover:underline font-semibold">Highlands, NC →</Link>
              <Link to="/service-areas/cashiers-nc" className="text-primary hover:underline font-semibold">Cashiers, NC →</Link>
              <Link to="/service-areas/sylva-nc" className="text-primary hover:underline font-semibold">Sylva, NC →</Link>
              <Link to="/roofing/metal" className="text-primary hover:underline font-semibold">Metal Roofing →</Link>
              <Link to="/roofing/roof-repair" className="text-primary hover:underline font-semibold">Roof Repair →</Link>
              <Link to="/roofing/roof-replacement" className="text-primary hover:underline font-semibold">Roof Replacement →</Link>
              <Link to="/construction" className="text-primary hover:underline font-semibold">Construction →</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegionalAuthority;