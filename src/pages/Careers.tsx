import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle, Upload, Send, Users, ShieldCheck, Mountain, HardHat, Briefcase } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { useState } from "react";
import { toast } from "sonner";

const benefits = [
  { title: "Competitive Pay", desc: "Industry-leading wages based on skill and local mountain experience.", icon: ShieldCheck },
  { title: "Year-Round Work", desc: "No seasonal layoffs. We keep our core crews busy 12 months a year.", icon: Mountain },
  { title: "Training & Certs", desc: "Paid manufacturer certifications (GAF, CertainTeed) to advance your career.", icon: HardHat },
  { title: "Family Culture", desc: "Work for a local owner who knows your name and values your time.", icon: Users },
];

const openRoles = [
  "Roofing Crew / Installer (Asphalt & Metal)",
  "Crew Lead / Roofing Foreman",
  "Construction Lead (Additions & Decks)",
  "Project Manager / Coordinator",
  "Sales Advisor / Estimator",
];


const Careers = () => {
  return (
    <>
      <SEOHead
        title="Careers | Hiring Roofers & Crew in Western NC"
        description="Join the Highlander team. Year-round roofing and construction work across Western North Carolina with competitive pay, paid training, and a family-owned culture."
        path="/careers"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
        ])}
      />
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

            <div className="bg-secondary p-8 mb-16 border border-border">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">Apply Now</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <input type="text" className="w-full bg-background border border-border p-3 text-sm focus:border-primary outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                    <input type="tel" className="w-full bg-background border border-border p-3 text-sm focus:border-primary outline-none" placeholder="(828) 000-0000" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Position of Interest</label>
                  <select className="w-full bg-background border border-border p-3 text-sm focus:border-primary outline-none appearance-none">
                    <option>Roofing Crew / Installer</option>
                    <option>Crew Lead / Foreman</option>
                    <option>Construction Lead</option>
                    <option>Project Manager</option>
                    <option>Sales / Estimator</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Experience Summary</label>
                  <textarea rows={3} className="w-full bg-background border border-border p-3 text-sm focus:border-primary outline-none" placeholder="Briefly describe your years of experience and relevant skills." />
                </div>
                <button type="button" onClick={() => {}} className="w-full bg-primary text-primary-foreground font-bold py-4 hover:opacity-95 transition-opacity">
                  Submit Application
                </button>
              </form>
            </div>

            <div className="bg-card border border-border p-8">
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">Other Ways to Connect</h3>
              <p className="text-muted-foreground mb-6 font-body">
                We're always hiring experienced roofers, laborers, and crew leads. Call us or visit our Franklin office to learn about current openings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:8283979211" className="bg-secondary text-foreground font-semibold px-6 py-3 border border-border inline-flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                  <Phone className="w-4 h-4" /> (828) 397-9211
                </a>
                <a href="mailto:info@highlandernc.com" className="border border-border text-foreground font-semibold px-6 py-3 inline-flex items-center justify-center hover:bg-muted transition-colors">
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
