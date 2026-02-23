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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Why Highlander</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Not Just a Roofer.
            <br /> Your Neighbor.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={itemVariants}
              className="group flex gap-4 md:gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
