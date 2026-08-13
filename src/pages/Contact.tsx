import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone, Mail, Handshake, ArrowRight, Clock, Shield, Award, MapPin,
  CalendarCheck, MessageSquare,
} from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Section from "@/components/layout/Section";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ContactChannels from "@/components/contact/ContactChannels";
import ContactMinimalForm from "@/components/contact/ContactMinimalForm";
import ContactIdentity from "@/components/contact/ContactIdentity";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import PageCloseCTA from "@/components/PageCloseCTA";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const TRUST_POINTS = [
  { icon: Clock, text: "Personalized response within 24 hours" },
  { icon: Shield, text: "Licensed GC · Fully insured · Written scope on every job" },
  { icon: Award, text: "CertainTeed ShingleMaster Credentialed Contractor" },
  { icon: MapPin, text: "Locally owned — Franklin, NC" },
];

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact Highlander | Roofing & Construction Quote in WNC"
        description="Talk to Highlander Building Services in Western NC. Call, email, or request an estimate. Franklin office. Mon–Fri 8 AM – 5 PM. (828) 524-7773."
        path="/contact"
        jsonLd={buildPageSchema({
          type: "contact",
          path: "/contact",
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ],
        })}
      />
      <Header />
      <main id="main-content">
        {/* ── HERO — clear decision header ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--heritage-green))] via-[hsl(var(--heritage-green)/0.88)] to-[hsl(var(--heritage-charcoal)/0.92)] pt-20 md:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--highland-gold)/0.18),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--highland-gold)/0.08),transparent_55%)] pointer-events-none" />

          <div className="relative z-10 pt-6 md:pt-36 pb-10 md:pb-16 px-5 md:px-8 lg:px-16">
            <div className="container-tight">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
                  className="max-w-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Handshake className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                    <span className="text-caption font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">
                      Contact Highlander
                    </span>
                  </div>
                  <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-[hsl(var(--dark-section-foreground))] mb-5 leading-[0.95] tracking-tightest">
                    Talk With a Local WNC Roofing &amp; Construction Team.
                  </h1>
                  <p className="text-body-lg md:text-body-xl text-white/95 leading-relaxed max-w-xl font-medium drop-shadow-sm">
                    Call us, send a message, or request an estimate. A Highlander advisor — not a call center — handles every inquiry personally.
                  </p>
                </motion.div>

                {/* Right: direct contact cluster */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: HIGHLAND_EASE }}
                  className="flex flex-col gap-3 lg:items-end flex-shrink-0"
                >
                  <a
                    href="tel:+18285247773"
                    className="btn btn-secondary btn-md group"
                  >
                    <Phone className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                    <div>
                      <span className="text-base font-heading font-bold text-[hsl(var(--dark-section-foreground))] block">(828) 524-7773</span>
                      <span className="text-caption text-[hsl(var(--dark-section-foreground)/0.5)] font-body uppercase tracking-wider">Call Direct</span>
                    </div>
                  </a>
                  <a
                    href="mailto:info@highlandernc.com"
                    className="btn btn-secondary btn-md"
                  >
                    <Mail className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                    <span className="text-sm font-body text-[hsl(var(--dark-section-foreground)/0.7)]">info@highlandernc.com</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THREE CHANNELS — equal decision cards ── */}
        <ContactChannels />

        {/* ── MINIMUM VIABLE FORM ── */}
        <Section id="contact-form" density="default" width="wide" className="bg-surface scroll-mt-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left: form */}
            <div className="lg:col-span-7">
              <span className="text-caption font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))] block mb-3">
                Request an Estimate
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 leading-tight">
                Tell us the basics. We&apos;ll handle the rest on the call.
              </h2>
              <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                Keep it short: who you are, how to reach you, where the property is, and what you need. A Highlander advisor reviews it and calls you back to discuss next steps.
              </p>
              <ContactMinimalForm />
            </div>

            {/* Right: trust sidebar */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4, ease: HIGHLAND_EASE }}
                className="lg:sticky lg:top-28 space-y-6"
              >
                <div className="border border-border bg-card p-6 md:p-7">
                  <h3 className="text-xs font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                    Why Homeowners Trust Highlander
                  </h3>
                  <div className="space-y-4">
                    {TRUST_POINTS.map((t, i) => (
                      <motion.div
                        key={t.text}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-accent/8 flex items-center justify-center flex-shrink-0">
                          <t.icon className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))]/60" />
                        </div>
                        <span className="text-sm text-muted-foreground font-body">{t.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border border-border bg-secondary/30 p-6 md:p-7">
                  <h3 className="text-xs font-body font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    Prefer to Connect Directly?
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+18285247773"
                      className="group flex items-center gap-3 p-3 bg-card border border-border rounded-sm hover:border-primary/20 transition-all"
                    >
                      <Phone className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm font-heading font-semibold text-foreground">(828) 524-7773</p>
                        <p className="text-caption text-muted-foreground font-body">Call — a real person answers</p>
                      </div>
                    </a>
                    <a
                      href="mailto:info@highlandernc.com"
                      className="group flex items-center gap-3 p-3 bg-card border border-border rounded-sm hover:border-primary/20 transition-all"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm font-heading font-semibold text-foreground">info@highlandernc.com</p>
                        <p className="text-caption text-muted-foreground font-body">Email — reply within 24 hours</p>
                      </div>
                    </a>
                    <Link
                      to="/consultation"
                      className="group flex items-center gap-3 p-3 bg-card border border-border rounded-sm hover:border-primary/20 transition-all"
                    >
                      <CalendarCheck className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                      <div>
                        <p className="text-sm font-heading font-semibold text-foreground">Guided Consultation</p>
                        <p className="text-caption text-muted-foreground font-body">More detailed project discovery</p>
                      </div>
                    </Link>
                    <Link
                      to="/faq"
                      className="group flex items-center gap-3 p-3 bg-card border border-border rounded-sm hover:border-primary/20 transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                      <div>
                        <p className="text-sm font-heading font-semibold text-foreground">Common Questions</p>
                        <p className="text-caption text-muted-foreground font-body">Browse the FAQ first</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ── FRANKLIN ADDRESS + MAP + OFFICE HOURS ── */}
        <ContactIdentity />

        {/* ── SERVICE AREA COVERAGE ── */}
        <ServiceAreaMap />

        {/* ── CLOSING CTA ── */}
        <PageCloseCTA
          eyebrow="Ready to Start?"
          heading="Your project deserves a real partner."
          body="Tell us what's going on and a Highlander advisor will follow up personally — no obligation, no sales pressure."
          primaryLabel="Request My Estimate"
          primaryTo="/consultation"
          secondaryLabel="See the towns we serve"
          secondaryTo="/service-areas"
          context="contact"
        />

        {/* Social connect strip */}
        <section className="section-padding bg-background border-t border-border">
          <div className="container-tight text-center">
            <span className="text-caption font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))] block mb-3">
              Connect With Highlander
            </span>
            <p className="text-muted-foreground text-sm md:text-base font-body max-w-md mx-auto leading-relaxed mb-6">
              Follow along for recent work, community involvement, and roofing &amp; construction insights from across Western North Carolina.
            </p>
            <SocialLinks variant="light" size="md" className="justify-center" />
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
