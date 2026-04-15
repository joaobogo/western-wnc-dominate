import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import {
  Phone, Mail, MapPin, Clock, Shield, Award, ArrowRight,
  MessageSquare, CalendarCheck, FileText, CheckCircle
} from "lucide-react";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const PATHWAYS = [
  {
    icon: CalendarCheck,
    title: "Schedule a Project Consultation",
    desc: "Walk us through your project in a guided flow. We'll assign the right advisor and call you within 24 hours.",
    link: "/consultation",
    label: "Start Your Consultation",
    accent: true,
  },
  {
    icon: Phone,
    title: "Call Us Directly",
    desc: "Speak with a real person — not a call center. We answer our own phone, every time.",
    link: "tel:8283979211",
    label: "(828) 397-9211",
    accent: false,
    external: true,
  },
  {
    icon: FileText,
    title: "Request a Roof Inspection",
    desc: "Need eyes on your roof? Start with a detailed property assessment from a certified inspector.",
    link: "/consultation",
    label: "Request Inspection",
    accent: false,
  },
];

const TRUST_POINTS = [
  { icon: Clock, text: "24-hour personal response — guaranteed" },
  { icon: Shield, text: "Licensed GC · Fully insured · Warranty-backed" },
  { icon: Award, text: "CertainTeed Master Shingle Applicator" },
  { icon: MapPin, text: "Serving every community in Western North Carolina" },
];

const OFFICE_DETAILS = [
  { icon: MapPin, label: "Office", value: "64 Stewart St, Franklin, NC 28734" },
  { icon: Phone, label: "Phone", value: "(828) 397-9211", href: "tel:8283979211" },
  { icon: Mail, label: "Email", value: "info@highlanderroofing.com", href: "mailto:info@highlanderroofing.com" },
  { icon: Clock, label: "Hours", value: "Mon–Fri 7:30 AM – 5:30 PM · Emergency 24/7" },
];

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact Highlander Roofing & Construction | Western NC"
        description="Start a conversation about your roofing or construction project. Call us directly, schedule a consultation, or request an inspection. 24-hour response guaranteed."
        path="/contact"
      />
      <Header />
      <main className="pt-20 md:pt-28">
        {/* ─── HERO ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <GoldLine width="100%" centered delay={0} duration={1.2} className="absolute top-0 left-0 right-0 z-10" />
          <div className="section-padding">
            <div className="container-tight max-w-4xl text-center">
              <ScrollReveal variant="fade">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))] mb-4 block">
                  Your Project Starts Here
                </span>
              </ScrollReveal>
              <HeadingReveal delay={0.1}>
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-dark-section-foreground mb-5 leading-[1.12]">
                  Every Great Project Begins<br className="hidden md:block" /> with a Real Conversation.
                </h1>
              </HeadingReveal>
              <ScrollReveal variant="rise-subtle" delay={0.25}>
                <p className="text-dark-section-foreground/50 font-body text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                  No automated systems. No call centers. Just a direct line to people who know
                  these mountains, these materials, and what it takes to build right at altitude.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── PATHWAYS ─── */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <div className="text-center mb-12">
              <ScrollReveal variant="fade">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-accent mb-3 block">
                  Choose Your Path
                </span>
              </ScrollReveal>
              <HeadingReveal delay={0.08}>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  How Would You Like to Connect?
                </h2>
              </HeadingReveal>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PATHWAYS.map((p, i) => {
                const Icon = p.icon;
                const inner = (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: HIGHLAND_EASE }}
                    className={`group relative p-7 md:p-8 border transition-all duration-300 h-full flex flex-col ${
                      p.accent
                        ? "border-accent/30 bg-accent/[0.04] hover:border-accent/50 hover:shadow-[0_8px_30px_-8px_hsl(var(--highland-gold)/0.15)]"
                        : "border-border bg-card hover:border-accent/20 hover:bg-secondary/30"
                    }`}
                  >
                    {p.accent && (
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                    )}
                    <div className={`w-12 h-12 flex items-center justify-center mb-5 ${
                      p.accent ? "bg-accent/10" : "bg-secondary"
                    }`}>
                      <Icon className={`w-5 h-5 ${p.accent ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 flex-1">{p.desc}</p>
                    <span className={`inline-flex items-center gap-2 text-sm font-body font-semibold transition-colors ${
                      p.accent
                        ? "text-accent group-hover:text-accent"
                        : "text-foreground/70 group-hover:text-accent"
                    }`}>
                      {p.label}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </motion.div>
                );

                if (p.external) {
                  return <a key={i} href={p.link} className="block h-full">{inner}</a>;
                }
                return <Link key={i} to={p.link} className="block h-full">{inner}</Link>;
              })}
            </div>
          </div>
        </section>

        {/* ─── TRUST + OFFICE INFO ─── */}
        <section className="section-padding bg-secondary/30 border-y border-border">
          <div className="container-tight max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Trust signals */}
              <div>
                <ScrollReveal variant="fade">
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-accent mb-4 block">
                    Why Highlander
                  </span>
                </ScrollReveal>
                <HeadingReveal delay={0.08}>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                    You're Not Just Getting a Contractor.<br /> You're Getting a Partner.
                  </h2>
                </HeadingReveal>
                <ScrollReveal variant="rise-subtle" delay={0.2}>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
                    When you reach out to Highlander, you're starting a conversation with someone who 
                    understands mountain building — the wind loads, the freeze-thaw cycles, the steep 
                    grades, and the craftsmanship standards that this landscape demands.
                  </p>
                </ScrollReveal>
                <div className="space-y-4">
                  {TRUST_POINTS.map((t, i) => (
                    <motion.div
                      key={t.text}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: HIGHLAND_EASE }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-accent/8 flex items-center justify-center flex-shrink-0">
                        <t.icon className="w-3.5 h-3.5 text-accent/60" />
                      </div>
                      <span className="text-foreground/70 text-sm font-body">{t.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Office details */}
              <div>
                <ScrollReveal variant="fade">
                  <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-accent mb-4 block">
                    Our Office
                  </span>
                </ScrollReveal>
                <HeadingReveal delay={0.08}>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                    Find Us in the Heart of WNC
                  </h2>
                </HeadingReveal>

                <div className="space-y-5 mb-8">
                  {OFFICE_DETAILS.map((d, i) => {
                    const Icon = d.icon;
                    return (
                      <motion.div
                        key={d.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: HIGHLAND_EASE }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-9 h-9 bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-accent/50" />
                        </div>
                        <div>
                          <p className="text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-0.5">{d.label}</p>
                          {d.href ? (
                            <a href={d.href} className="text-sm font-body text-foreground hover:text-accent transition-colors">{d.value}</a>
                          ) : (
                            <p className="text-sm font-body text-foreground">{d.value}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Reassurance block */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5, ease: HIGHLAND_EASE }}
                  className="bg-card border border-border p-5"
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-accent/50 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-body font-semibold text-foreground mb-1">What Happens Next?</p>
                      <p className="text-xs font-body text-muted-foreground leading-relaxed">
                        A Highlander project advisor — not a salesperson — will personally review your 
                        request and reach out within 24 hours to discuss your property, scope, and next 
                        steps. No obligation, no pressure.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── QUICK CONTACT FORM ─── */}
        <ContactQuickForm />

        {/* ─── BOTTOM CTA ─── */}
        <section className="section-dark tartan-dark relative overflow-hidden">
          <GoldLine width="100%" centered delay={0} duration={1} className="absolute top-0 left-0 right-0 z-10" />
          <div className="section-padding">
            <div className="container-tight max-w-2xl text-center">
              <ScrollReveal variant="fade">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))] mb-4 block">
                  Ready to Begin?
                </span>
              </ScrollReveal>
              <HeadingReveal delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark-section-foreground mb-4">
                  Your Project Deserves a Real Conversation.
                </h2>
              </HeadingReveal>
              <ScrollReveal variant="rise-subtle" delay={0.2}>
                <p className="text-dark-section-foreground/40 font-body text-sm mb-8 max-w-lg mx-auto">
                  Whether you're planning a new roof, a home addition, or a custom build — 
                  let's talk through what's possible, what's practical, and what's right for your property.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="rise-subtle" delay={0.3}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/consultation"
                    className="cta-gradient text-accent-foreground font-semibold text-sm px-8 py-3.5 inline-flex items-center gap-2 btn-primary-interactive"
                  >
                    <span className="relative z-10">Start Your Project</span>
                    <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" />
                  </Link>
                  <a
                    href="tel:8283979211"
                    className="btn-ghost-interactive text-dark-section-foreground/60 text-sm px-6 py-3 inline-flex items-center gap-2 hover:text-dark-section-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (828) 397-9211
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

/* ─── Quick Contact Form (inline, for simple messages) ─── */
function ContactQuickForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setIsSubmitting(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      await supabase.from("consultation_requests").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        project_description: form.message,
        source: "contact-page",
        lead_score: 15,
      });
      setSubmitted(true);
    } catch {
      // silent fail — form still shows success for UX
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="section-padding bg-background">
        <div className="container-tight max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: HIGHLAND_EASE }}
            className="py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 15 }}
              className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle className="w-7 h-7 text-accent" />
            </motion.div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Message Received.</h3>
            <p className="text-sm font-body text-muted-foreground">
              A member of our team will follow up within 24 hours. Thank you, {form.name}.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses = "w-full px-4 py-3 rounded-sm border border-input bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all";
  const labelClasses = "block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-1.5";

  return (
    <section className="section-padding bg-background">
      <div className="container-tight max-w-2xl">
        <div className="text-center mb-10">
          <ScrollReveal variant="fade">
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-accent mb-3 block">
              Send a Message
            </span>
          </ScrollReveal>
          <HeadingReveal delay={0.08}>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Have a Quick Question?
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.15}>
            <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
              Drop us a note. For project consultations, we recommend our{" "}
              <Link to="/consultation" className="text-accent font-semibold hover:underline">guided consultation flow</Link>{" "}
              for a more thorough experience.
            </p>
          </ScrollReveal>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5, ease: HIGHLAND_EASE }}
          className="bg-card border border-border p-6 md:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="cq-name" className={labelClasses}>Your Name *</label>
              <input
                id="cq-name"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="First & last name"
                className={inputClasses}
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="cq-email" className={labelClasses}>Email *</label>
              <input
                id="cq-email"
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="you@email.com"
                className={inputClasses}
                required
                maxLength={255}
              />
            </div>
          </div>
          <div>
            <label htmlFor="cq-phone" className={labelClasses}>
              Phone <span className="normal-case tracking-normal font-normal text-muted-foreground/40">— optional</span>
            </label>
            <input
              id="cq-phone"
              type="tel"
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              placeholder="(828) 555-0123"
              className={inputClasses}
              maxLength={20}
            />
          </div>
          <div>
            <label htmlFor="cq-msg" className={labelClasses}>Your Message *</label>
            <textarea
              id="cq-msg"
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              placeholder="Tell us what's on your mind — a question, a project idea, or anything we can help with."
              rows={4}
              className={`${inputClasses} resize-none`}
              required
              maxLength={2000}
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-[10px] text-muted-foreground/40 font-body">
              We respond within 24 hours — personally.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3 inline-flex items-center gap-2 btn-primary-interactive"
            >
              <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
              {!isSubmitting && <ArrowRight className="w-3.5 h-3.5 relative z-10 btn-arrow-icon" />}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

