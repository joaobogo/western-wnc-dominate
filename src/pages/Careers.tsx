import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle, Upload, Send, Users, ShieldCheck, Mountain, HardHat, Briefcase } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { useState } from "react";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads";
import { fieldAttrs } from "@/lib/field-ergonomics";

const benefits = [
  { title: "Competitive Pay", desc: "Industry-leading wages based on skill and local mountain experience.", icon: ShieldCheck },
  { title: "Year-Round Work", desc: "No seasonal layoffs. We keep our core crews busy 12 months a year.", icon: Mountain },
  { title: "Training & Certs", desc: "Paid manufacturer certifications (CertainTeed ShingleMaster, VELUX, James Hardie) to advance your career.", icon: HardHat },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", role: openRoles[0], experience: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitLead({
      source: "careers_application",
      lead_type: "job_application",
      full_name: form.name,
      phone: form.phone,
      project_type: form.role,
      project_description: form.experience,
      lead_score: 0,
      metadata: { role: form.role },
    }).catch((err) => console.error("Careers submitLead failed:", err));
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
    }, 1500);
  };

  return (
    <>
      <SEOHead
        title="Careers | Join the Highlander Team in Western NC"
        description="Join Highlander Building Services. Family-owned, locally run by WNC craftspeople, with year-round work and mountain-grade craftsmanship. Apply today."
        path="/careers"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
        ])}
      />
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="section-padding section-dark pt-32 md:pt-48 relative overflow-hidden">
          <div className="absolute inset-0 tartan-dark opacity-[0.05]" />
          <div className="container-tight relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <p className="text-[hsl(var(--gold-ink))] font-bold text-xs uppercase tracking-[0.25em] mb-4">Work With Us</p>
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold mb-6 text-white tracking-tightest leading-[0.95]">
                Build a Career <br />
                <span className="text-[hsl(var(--gold-ink))]">on Higher Ground.</span>
              </h1>
              <p className="text-body-lg md:text-body-xl text-white/85 font-body leading-relaxed max-w-2xl font-medium drop-shadow-sm">
                Highlander isn't just a roofing company. We're a family-owned, locally run team where every craftsperson, project manager, and crew member plays a role in protecting and improving WNC homes. We're looking for reliable people who take pride in doing the job right.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="section-padding bg-background">
          <div className="container-tight">
            <h2 className="sr-only">Why work at Highlander Building Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="p-8 bg-secondary/30 border border-border group hover:border-[hsl(var(--highland-gold)/0.3)] transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center mb-6 transition-colors group-hover:bg-[hsl(var(--highland-gold)/0.1)]">
                    <b.icon className="w-6 h-6 text-primary group-hover:text-[hsl(var(--gold-ink))] transition-colors" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">{b.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roles & Form */}
        <section className="section-padding bg-secondary/20">
          <div className="container-tight">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Info Column */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-3xl font-heading font-bold mb-6">Who We're Looking For</h2>
                  <p className="text-muted-foreground font-body leading-relaxed mb-8 font-bold">

                    We hire for attitude and train for skill. If you're honest, hardworking, and local to Western North Carolina, we'd like to hear from you—even if you don't see a specific opening that fits.
                  </p>
                  <div className="space-y-4">
                    {openRoles.map((role) => (
                      <div key={role} className="flex items-center gap-3 p-4 bg-background border border-border">
                        <Briefcase className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                        <span className="text-sm font-heading font-bold text-foreground">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 p-8 border border-primary/10">
                  <h3 className="text-xl font-heading font-bold mb-4">Questions?</h3>
                  <p className="text-sm text-muted-foreground font-body mb-6">
                    Call our Franklin office directly to discuss current crew openings or subcontracting opportunities.
                  </p>
                  <a href="tel:+18285247773" className="inline-flex items-center gap-3 text-primary font-bold hover:text-[hsl(var(--gold-ink))] transition-colors">
                    <Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773
                  </a>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-card border border-border p-8 md:p-12 shadow-floating relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--highland-gold)/0.03)] translate-x-16 -translate-y-16 rotate-45" />
                      
                      <h3 className="text-2xl font-heading font-bold mb-8">Direct Application</h3>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-caption font-bold uppercase tracking-wider text-muted-foreground" htmlFor="f-full-name">Full Name</label>
                            <input id="f-full-name" required {...fieldAttrs.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field-input" placeholder="e.g. John Davidson" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-caption font-bold uppercase tracking-wider text-muted-foreground" htmlFor="f-phone-number">Phone Number</label>
                            <input id="f-phone-number" required {...fieldAttrs.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="field-input" placeholder="(828) 000-0000" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-caption font-bold uppercase tracking-wider text-muted-foreground" htmlFor="f-position-of-interest">Position of Interest</label>
                          <select id="f-position-of-interest" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="field-input">
                            {openRoles.map(role => (
                              <option key={role}>{role}</option>
                            ))}
                            <option>Other / General Inquiry</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-caption font-bold uppercase tracking-wider text-muted-foreground" htmlFor="f-relevant-experience">Relevant Experience</label>
                          <textarea id="f-relevant-experience" rows={4} {...fieldAttrs.notes} value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="field-input" placeholder="Tell us about your background in roofing or construction..." />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-caption font-bold uppercase tracking-wider text-muted-foreground" htmlFor="f-resume-cv-optional">Resume / CV (Optional)</label>
                          <div className="relative group cursor-pointer">
                            <input id="f-resume-cv-optional" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="w-full bg-secondary/30 border border-dashed border-border p-6 text-center group-hover:border-primary/50 transition-colors">
                              <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" aria-hidden="true" />
                              <p className="text-xs text-muted-foreground">Click or drag to upload file</p>
                            </div>
                          </div>
                        </div>

                        <button 
                          disabled={isSubmitting}
                          className="w-full bg-primary text-primary-foreground font-bold py-5 rounded-none flex items-center justify-center gap-3 hover:bg-primary/95 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                          {isSubmitting ? "Sending..." : (
                            <>
                              Submit Application <Send className="w-4 h-4" aria-hidden="true" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card border border-border p-12 text-center shadow-floating"
                    >
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4">Application Received</h3>
                      <p className="text-muted-foreground font-body leading-relaxed mb-8">
                        Thank you for your interest in joining Highlander. Luke or Christy will personally review your application and get back to you within 2-3 business days.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-primary font-bold border-b border-primary/20 pb-1 hover:border-primary transition-all"
                      >
                        Submit another application
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PageCloseCTA eyebrow="Homeowners" heading="Not here for a job? Let's talk about your property." body="Roofing, storm damage, renovations — tell us what you need and we'll follow up personally." secondaryLabel="Learn about Highlander" secondaryTo="/about" context="careers" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};


export default Careers;
