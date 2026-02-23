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
    title: "5x Best of Macon County",
    description: "Franklin's Press Readers' Choice",
  },
  {
    icon: FileCheck,
    title: "Labor & Material Warranty",
    description: "Your investment, protected",
  },
  {
    icon: Star,
    title: "4.7 ★ Google Rating",
    description: "122+ verified reviews",
  },
];

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const TrustStrip = () => {
  return (
    <section className="bg-primary text-primary-foreground py-8 md:py-12 relative overflow-hidden">
      {/* Decorative moving gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-tight px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {credentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="group flex flex-col items-center text-center gap-2 cursor-default"
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-1 relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {/* Pulse ring on hover */}
                <div className="absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" />
                <item.icon className="w-7 h-7 text-accent relative z-10" />
              </motion.div>
              <h3 className="font-heading font-semibold text-sm md:text-base">{item.title}</h3>
              <p className="text-primary-foreground/70 text-xs md:text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
