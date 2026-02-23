import { motion } from "framer-motion";
import { Mountain, Users, ShieldCheck, Clock } from "lucide-react";

const pillars = [
  {
    icon: Mountain,
    title: "Mountain Climate Experts",
    description:
      "We understand the unique demands of WNC weather — from heavy snow loads to summer storms. Every installation is built for altitude.",
  },
  {
    icon: Users,
    title: "Family-Owned, Locally Operated",
    description:
      "Over 40 years of combined roofing experience, serving our neighbors across Franklin, Highlands, Cashiers, and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Full Warranty Protection",
    description:
      "Every project comes with labor and material warranties. Your roof investment is fully backed and documented.",
  },
  {
    icon: Clock,
    title: "Fast Storm Response",
    description:
      "When storms hit, we respond quickly with emergency tarping, insurance documentation support, and priority scheduling.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Decorative corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Why Highlander</p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
            >
              Not Just a Roofer.
              <br /> Your Neighbor.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ x: 8 }}
              className="group flex gap-4 md:gap-5 cursor-default"
            >
              <motion.div
                className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center relative overflow-hidden"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Radial pulse */}
                <div className="absolute inset-0 bg-primary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-500" />
                <pillar.icon className="w-6 h-6 text-primary relative z-10" />
              </motion.div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
