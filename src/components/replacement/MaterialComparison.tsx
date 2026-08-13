import { motion } from "framer-motion";

const rows = [
  {
    material: "Dimensional Asphalt Shingle",
    best: "Most WNC homes wanting proven performance at a reasonable budget",
    lifespan: "20–30 years in mountain conditions",
    upside: "Widest color range, straightforward repairs, fastest install, lowest upfront cost",
    tradeoff: "Shorter service life than metal; granule loss accelerates on hot, sun-exposed slopes",
  },
  {
    material: "Standing Seam Metal",
    best: "Steep-pitch, high-wind, or heavy-snow properties and long-hold homes",
    lifespan: "Longest service life of the three",
    upside: "Concealed fasteners, excellent snow shedding, very low maintenance, reflective in summer",
    tradeoff: "Highest upfront cost; panel work is specialized, so future modifications cost more",
  },
  {
    material: "Western Red Cedar Shake",
    best: "Estate and heritage homes where appearance drives the decision",
    lifespan: "30–40 years with upkeep",
    upside: "Natural insulation value and a character no manufactured product replicates",
    tradeoff: "Requires periodic maintenance; moss and moisture pressure is real at elevation",
  },
];

/** Side-by-side material comparison with honest tradeoffs for a considered purchase. */
const MaterialComparison = () => (
  <section className="section-padding bg-background">
    <div className="container-tight">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
        <span className="eyebrow mb-3 block">Compare Materials</span>
        <h2 className="section-heading mb-4">The Tradeoffs, Stated Plainly.</h2>
        <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
          Every material gives something up. Here is what each one costs you, not only what it gives you.
        </p>
      </motion.div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Roof replacement material comparison for Western North Carolina</caption>
          <thead>
            <tr className="border-b border-border">
              {["Material", "Best for", "Expected life", "Upside", "Tradeoff"].map((h) => (
                <th key={h} scope="col" className="py-3 pr-5 text-caption font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.material} className="border-b border-border align-top">
                <th scope="row" className="py-5 pr-5 font-heading font-bold text-foreground text-sm w-[18%]">{r.material}</th>
                <td className="py-5 pr-5 text-body-xs font-body text-muted-foreground w-[20%]">{r.best}</td>
                <td className="py-5 pr-5 text-body-xs font-body text-muted-foreground w-[16%]">{r.lifespan}</td>
                <td className="py-5 pr-5 text-body-xs font-body text-muted-foreground w-[23%]">{r.upside}</td>
                <td className="py-5 text-body-xs font-body text-foreground/80 w-[23%]">{r.tradeoff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {rows.map((r) => (
          <div key={r.material} className="bg-card border border-border rounded-sm p-5">
            <h3 className="font-heading font-bold text-foreground text-base mb-3">{r.material}</h3>
            <dl className="space-y-2.5 text-body-xs font-body">
              {[["Best for", r.best], ["Expected life", r.lifespan], ["Upside", r.upside], ["Tradeoff", r.tradeoff]].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-caption uppercase tracking-[0.12em] text-muted-foreground font-semibold">{k}</dt>
                  <dd className="text-foreground/85 leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-body-xs font-body mt-8 max-w-xl mx-auto">
        Material coverage follows each manufacturer's published terms for the product line we specify, and your written scope names the exact product.
      </p>
    </div>
  </section>
);

export default MaterialComparison;