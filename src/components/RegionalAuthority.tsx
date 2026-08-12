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
            transition={{ duration: 0.5 }}
            className="eyebrow mb-3 block"
          >
            Roofing & Construction · Western North Carolina
          </motion.span>

          <motion.h2
            id="regional-authority-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-display font-heading font-bold mb-5 leading-[0.98] tracking-tight"
          >
            A Roofing Company Built{" "}
            <span className="text-[hsl(var(--gold-ink))]">for Western NC.</span>
          </motion.h2>

          <div className="w-12 h-px bg-[hsl(var(--highland-gold))] mb-6" />

          <div className="space-y-5 text-foreground/90 text-[16px] md:text-[18px] leading-relaxed font-body">
            <p>
              Highlander Roofing &amp; Construction is a family-owned{" "}
              <strong>roofing company serving Western North Carolina</strong> from
              our Franklin office — the same crews handling{" "}
              <Link to="/roofing/roof-repair" className="text-primary font-semibold hover:underline">roof repair in Western NC</Link>,{" "}
              <Link to="/roofing/roof-replacement" className="text-primary font-semibold hover:underline">full roof replacement</Link>, and{" "}
              <Link to="/roofing/metal" className="text-primary font-semibold hover:underline">standing-seam metal roofing</Link>{" "}
              for mountain homes from Macon County to Jackson, Buncombe, and Haywood.
            </p>
            <p>
              We are a licensed <strong>roofing contractor</strong> and General
              Contractor, which means the same team that installs your roof can
              also plan and build your addition, porch, or renovation. That's
              rare in this market — most homeowners have to hire a{" "}
              <em>roofing company</em> and a separate builder. With Highlander,{" "}
              <Link to="/construction" className="text-primary font-semibold hover:underline">roofing and construction in Western NC</Link>{" "}
              live under one roof, one license, and one warranty.
            </p>
            <p>
              Homeowners searching for a{" "}
              <Link to="/service-areas/franklin-nc" className="text-primary font-semibold hover:underline">roofing company near Franklin, NC</Link>,
              a{" "}
              <Link to="/service-areas/highlands-nc" className="text-primary font-semibold hover:underline">roofing contractor near Highlands, NC</Link>,
              or a{" "}
              <Link to="/service-areas/cashiers-nc" className="text-primary font-semibold hover:underline">roofing contractor near Cashiers, NC</Link>{" "}
              consistently choose Highlander because we install for elevation —
              heavier flashing, upgraded fastening schedules, ice-and-water shield
              where the code doesn't require it, and details that hold at 4,000 ft.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/consultation"
              className="group cta-gradient text-accent-foreground font-body font-bold text-sm px-7 py-4 rounded-none inline-flex items-center justify-center gap-2 uppercase tracking-wider hover:opacity-90 transition-all"
            >
              Request a Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/roofing"
              className="group bg-card border border-border text-foreground font-body font-bold text-sm px-7 py-4 rounded-none inline-flex items-center justify-center gap-2 uppercase tracking-wider hover:border-primary/40 transition-all"
            >
              All Roofing Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Coverage panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 lg:sticky lg:top-28"
        >
          <div className="bg-card border border-border rounded-none p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Coverage Snapshot
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 leading-tight">
              One team. Roofing &amp; construction across the Western NC mountains.
            </h3>

            <ul className="space-y-3 mb-6 text-[15px] font-body">
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span><strong>Licensed &amp; Insured</strong> — NC General Contractor + CertainTeed ShingleMaster credentialed.</span>
              </li>
              <li className="flex items-start gap-3">
                <Wrench className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span><strong>Roof repair &amp; replacement</strong> — asphalt, metal, cedar, synthetic, and specialty low-slope systems.</span>
              </li>
              <li className="flex items-start gap-3">
                <Hammer className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span><strong>Full construction</strong> — additions, renovations, outdoor living, and design-build.</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
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