import { motion } from "framer-motion";
import { Phone, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const benefits = [
  "Competitive pay",
  "Year-round work",
  "Paid training and certifications",
  "Growth opportunities",
  "Family-owned culture",
  "Work in the beautiful WNC mountains",
];

const Careers = () => {
  return (
    <>
      <Header />
      <main>
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Careers</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Join the Highlander Team
              </h1>
              <p className="text-dark-section-foreground/70 text-base md:text-lg">
                We're always looking for skilled, reliable people who take pride in their work. If you want to build a career in roofing with a company that values quality and integrity, we'd like to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">Why Work With Us</h2>
            <ul className="space-y-3 mb-10">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <div className="bg-secondary rounded-lg p-8">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">Get in Touch</h3>
              <p className="text-muted-foreground mb-4">
                We're hiring experienced roofers, laborers, and crew leads. Call us or email to learn about current openings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:8283979211" className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <Phone className="w-4 h-4" /> (828) 397-9211
                </a>
                <a href="mailto:info@highlandernc.com" className="border border-border text-foreground font-semibold px-6 py-3 rounded-md inline-flex items-center justify-center hover:bg-muted transition-colors">
                  info@highlandernc.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Careers;
