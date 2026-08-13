import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, ClipboardList, MessageSquare, ArrowRight } from "lucide-react";

// CRO Prompt 34 — Contact page opens with a choice of channel.
// Each channel states what actually happens after the visitor uses it.
// No hours or response promises beyond the 24-hour standard we keep.

type Channel = {
  icon: typeof Phone;
  eyebrow: string;
  title: string;
  body: string;
  next: string;
  action: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

const CHANNELS: Channel[] = [
  {
    icon: Phone,
    eyebrow: "Fastest",
    title: "Call us",
    body: "Best for active leaks, storm damage, and anything you'd rather explain out loud.",
    next: "A Highlander team member picks up or calls you back — no call center, no phone tree.",
    action: "(828) 524-7773",
    href: "tel:+18285247773",
    external: true,
    primary: true,
  },
  {
    icon: ClipboardList,
    eyebrow: "Most Common",
    title: "Request an estimate",
    body: "Best for a roof replacement, repair, or construction project you're ready to price.",
    next: "We confirm your details, schedule an on-site look, and send a written scope.",
    action: "Start My Estimate",
    href: "#contact-form",
  },
  {
    icon: MessageSquare,
    eyebrow: "No Pressure",
    title: "Ask a question",
    body: "Best for materials, insurance paperwork, timing, or a second opinion on a bid.",
    next: "A written answer back within 24 hours — no appointment, no sales follow-up.",
    action: "info@highlandernc.com",
    href: "mailto:info@highlandernc.com",
    external: true,
  },
];

const ContactChannels = () => (
  <section className="section-padding bg-secondary/25" aria-labelledby="contact-channels-heading">
    <div className="container-tight">
      <span className="text-[11px] font-body font-bold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))] block mb-3">
        Pick Your Channel
      </span>
      <h2 id="contact-channels-heading" className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-3 leading-tight">
        Three ways to reach a real person in Western North Carolina.
      </h2>
      <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl mb-10">
        Choose the one that fits what you need. Each one tells you exactly what happens next.
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        {CHANNELS.map((c, i) => {
          const inner = (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-muted-foreground">{c.eyebrow}</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">{c.body}</p>
              <p className="text-sm text-foreground font-body leading-relaxed mb-5 pl-3 border-l-2 border-[hsl(var(--highland-gold)/0.5)]">
                <span className="font-semibold">What happens next: </span>{c.next}
              </p>
              <span
                className={`mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-sm font-heading font-bold text-sm transition-all ${
                  c.primary
                    ? "cta-gradient text-accent-foreground"
                    : "border border-border text-foreground group-hover:border-primary/40"
                }`}
              >
                {c.action} <ArrowRight className="w-4 h-4" />
              </span>
            </>
          );

          const cardClass =
            "group flex flex-col h-full text-left p-6 md:p-7 border border-border bg-card hover:border-primary/30 hover:shadow-[0_8px_30px_-8px_hsl(var(--heritage-green)/0.12)] transition-all duration-300";

          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="h-full"
            >
              {c.external ? (
                <a href={c.href} className={cardClass}>{inner}</a>
              ) : (
                <Link to={c.href} className={cardClass}>{inner}</Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ContactChannels;
