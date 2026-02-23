import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Highlands, NC",
    rating: 5,
    text: "Highlander replaced our entire roof after storm damage. They handled our insurance claim paperwork and the crew was professional from start to finish. Highly recommend.",
  },
  {
    name: "James T.",
    location: "Franklin, NC",
    rating: 5,
    text: "Fast response when we had a leak during heavy rain. They came out the next morning, found the issue, and had it repaired by afternoon. Fair pricing and honest work.",
  },
  {
    name: "Linda K.",
    location: "Cashiers, NC",
    rating: 5,
    text: "We've used Highlander for two properties now. Their metal roofing work is top notch and they really understand the mountain climate challenges. Five stars every time.",
  },
];

const Reviews = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative floating shapes */}
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/5"
        animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary/5"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Reviews</p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
            >
              Trusted by Homeowners
              <br className="hidden md:block" /> Across Western NC
            </motion.h2>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 400 }}
                >
                  <Star className="w-5 h-5 fill-accent text-accent" />
                </motion.div>
              ))}
            </div>
            <span className="font-semibold text-foreground">4.7</span>
            <span className="text-muted-foreground text-sm">from 122+ Google Reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.15)" }}
              className="group bg-card border border-border rounded-lg p-6 md:p-8 transition-colors duration-300 hover:border-primary/20 relative overflow-hidden"
            >
              {/* Gradient shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    {review.name.charAt(0)}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    <p className="text-muted-foreground text-xs">{review.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
