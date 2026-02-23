import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Hammer, RotateCcw, CloudLightning, Layers, Building2, Wrench } from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "Roof Repair",
    description: "Leak fixes, shingle replacement, and damage repair for mountain homes.",
    href: "/services/roof-repair",
  },
  {
    icon: RotateCcw,
    title: "Roof Replacement",
    description: "Full tear-off and installation with premium materials built for WNC weather.",
    href: "/services/roof-replacement",
  },
  {
    icon: CloudLightning,
    title: "Storm Damage",
    description: "Emergency response and insurance documentation for storm-damaged roofs.",
    href: "/services/storm-damage",
  },
  {
    icon: Layers,
    title: "Metal Roofing",
    description: "Durable, energy-efficient metal roofing designed for mountain climates.",
    href: "/services/metal-roofing",
  },
  {
    icon: Building2,
    title: "Commercial Roofing",
    description: "Inspections, maintenance plans, and repairs for commercial properties.",
    href: "/commercial-roofing",
  },
  {
    icon: Wrench,
    title: "Maintenance Programs",
    description: "Preventative roof maintenance to extend your roof's life and avoid costly repairs.",
    href: "/commercial-maintenance",
  },
];

const ServicesGrid = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">What We Do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Roofing Services Built for
            <br className="hidden md:block" /> Mountain Living
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            From emergency storm repairs to full replacements, we handle every roofing need across Western North Carolina.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                to={service.href}
                className="group block bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
