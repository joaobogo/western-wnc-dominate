import { Shield, Award, FileCheck, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const credentials = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full coverage on every project",
  },
  {
    icon: Award,
    title: "Best of Macon County",
    description: "5-time readers' choice winner",
  },
  {
    icon: FileCheck,
    title: "Workmanship Guarantee",
    description: "Labor & material warranty included",
  },
  {
    icon: Star,
    title: "4.7 ★ Google Rating",
    description: "122+ verified reviews",
  },
];

const TrustStrip = () => {
  return (
    <section className="bg-primary text-primary-foreground py-8 md:py-10 relative overflow-hidden">
      <div className="container-tight px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {credentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-11 h-11 rounded-full bg-primary-foreground/8 flex items-center justify-center mb-1">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-sm md:text-base">{item.title}</h3>
              <p className="text-primary-foreground/55 text-xs md:text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;