import { Link } from "react-router-dom";
import { Mail, Phone, Shield, FileText, Accessibility as AccessibilityIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

type LegalKind = "privacy" | "terms" | "accessibility";

const META: Record<LegalKind, { title: string; description: string; path: string; eyebrow: string; heading: string; icon: typeof Shield }> = {
  privacy: {
    title: "Privacy Policy | Highlander Roofing & Construction",
    description: "How Highlander Roofing & Construction collects, uses, and protects the information you share with us.",
    path: "/privacy",
    eyebrow: "Privacy",
    heading: "Privacy Policy",
    icon: Shield,
  },
  terms: {
    title: "Terms of Service | Highlander Roofing & Construction",
    description: "The terms that govern your use of the Highlander Roofing & Construction website and online services.",
    path: "/terms",
    eyebrow: "Legal",
    heading: "Terms of Service",
    icon: FileText,
  },
  accessibility: {
    title: "Accessibility Statement | Highlander Roofing & Construction",
    description: "Highlander Roofing & Construction is committed to providing a website that is accessible to all visitors across Western North Carolina.",
    path: "/accessibility",
    eyebrow: "Accessibility",
    heading: "Accessibility Statement",
    icon: AccessibilityIcon,
  },
};

const UPDATED = "Last updated: November 2026";

function PrivacyBody() {
  return (
    <>
      <p>
        Highlander Roofing &amp; Construction ("we," "us," "our") respects the privacy of every homeowner, property
        manager, and business that contacts us about a roofing, construction, or design project in Western North
        Carolina. This page explains what we collect on this website and how we use it.
      </p>
      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Contact and project details</strong> you provide through forms — name, phone, email, project
          address or town, project type (roofing or construction), timeline, and any description or photos you
          choose to share.</li>
        <li><strong>Basic technical data</strong> your browser sends automatically — pages viewed, referring page,
          device type, and approximate location — used to keep the site working and to improve it.</li>
      </ul>
      <h2>How We Use It</h2>
      <ul>
        <li>To respond to your project inquiry, schedule an inspection or consultation, and prepare an estimate.</li>
        <li>To follow up with information about your project, financing options, or scheduled work.</li>
        <li>To maintain warranty and service records on completed projects.</li>
        <li>To improve the website and our services.</li>
      </ul>
      <h2>Who We Share It With</h2>
      <p>
        We do not sell your information. We share it only with the people who need it to complete your project —
        our own crews and project advisors, the manufacturers and suppliers handling warranty registration on your
        materials, and trusted service providers (such as our hosting, email, and scheduling tools) bound to keep
        it confidential. We may disclose information if required by law or to enforce our agreements.
      </p>
      <h2>Retention</h2>
      <p>
        We keep project records for as long as needed to support your warranty and to meet our legal and accounting
        obligations. You may ask us to delete contact information that is no longer tied to an active project or
        warranty.
      </p>
      <h2>Your Choices</h2>
      <ul>
        <li>You can ask us to stop contacting you by phone, email, or text at any time.</li>
        <li>You can request a copy of the contact information we hold for you, or ask us to correct or delete it.</li>
      </ul>
      <h2>Contact Us About Privacy</h2>
      <p>
        Questions, requests, or concerns? Reach the Highlander office at <a href="tel:+18285247773">(828) 524-7773</a> or
        email <a href="mailto:info@highlanderroofing.com">info@highlanderroofing.com</a> and we will respond promptly.
      </p>
    </>
  );
}

function TermsBody() {
  return (
    <>
      <p>
        These terms govern your use of the Highlander Roofing &amp; Construction website. They do not replace the
        written estimate, proposal, or contract for any roofing, construction, or design project — those documents
        are the binding agreement for the work itself.
      </p>
      <h2>Use of the Site</h2>
      <p>
        You may use this site to learn about our services, review project galleries, request estimates, and
        communicate with our team. Please do not attempt to disrupt the site, scrape it at scale, or use it to send
        spam or unlawful content.
      </p>
      <h2>Information Accuracy</h2>
      <p>
        We work to keep service descriptions, pricing references, certifications, and service-area lists accurate
        and current. Photos and project examples represent past Highlander work in Western North Carolina; actual
        results vary by property, materials selected, and conditions. Nothing on this site is a binding quote — a
        binding price comes only from a written estimate signed by a Highlander advisor.
      </p>
      <h2>Intellectual Property</h2>
      <p>
        The Highlander name, logo, photography, and written content on this site are owned by Highlander Roofing
        &amp; Construction. You may share links to public pages; please do not copy content, photos, or branding
        without written permission.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        We provide the website "as is." We are not liable for indirect or incidental losses arising from website
        availability or content. Project-specific obligations are covered by the project contract and applicable
        manufacturer and workmanship warranties.
      </p>
      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the State of North Carolina.
      </p>
      <h2>Questions</h2>
      <p>
        Reach us at <a href="tel:+18285247773">(828) 524-7773</a> or
        <a href="mailto:info@highlanderroofing.com"> info@highlanderroofing.com</a>.
      </p>
    </>
  );
}

function AccessibilityBody() {
  return (
    <>
      <p>
        Highlander Roofing &amp; Construction is committed to making this website usable for every visitor across
        Western North Carolina, including people who rely on assistive technology. We want homeowners in Franklin,
        Highlands, Cashiers, Sylva, Asheville, and the surrounding mountain communities to be able to learn about
        our work and reach our team without barriers.
      </p>
      <h2>Standards We Aim For</h2>
      <p>
        We design and review the site against the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. That
        includes keyboard navigation, descriptive link and button labels, alt text on meaningful images, sufficient
        color contrast, and responsive layouts that work on phones, tablets, and desktop screens.
      </p>
      <h2>What We Do</h2>
      <ul>
        <li>Use semantic HTML and ARIA labels so screen readers can announce content correctly.</li>
        <li>Provide clear focus indicators and skip-to-content behavior for keyboard users.</li>
        <li>Caption or describe images and project photography that carry meaning.</li>
        <li>Test new pages on mobile and desktop before publishing.</li>
      </ul>
      <h2>Known Limitations</h2>
      <p>
        Some embedded third-party content (maps, video players, social feeds) may not fully meet our standards. We
        work with our vendors to improve these areas and offer alternative ways to access the same information by
        phone or email.
      </p>
      <h2>Tell Us What's Not Working</h2>
      <p>
        If you encounter a page, form, or feature that is difficult to use with assistive technology, please let us
        know so we can fix it and help you directly in the meantime. Call <a href="tel:+18285247773">(828) 524-7773</a> or
        email <a href="mailto:info@highlanderroofing.com">info@highlanderroofing.com</a>. We respond promptly.
      </p>
    </>
  );
}

const BODIES: Record<LegalKind, () => JSX.Element> = {
  privacy: PrivacyBody,
  terms: TermsBody,
  accessibility: AccessibilityBody,
};

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const meta = META[kind];
  const Body = BODIES[kind];
  const Icon = meta.icon;
  return (
    <>
      <SEOHead title={meta.title} description={meta.description} path={meta.path} />
      <Header />
      <main className="pt-32 md:pt-40 pb-20 bg-background">
        <div className="container-tight max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[11px] font-body font-bold uppercase tracking-[0.22em] text-primary">{meta.eyebrow}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 tracking-tight">
            {meta.heading}
          </h1>
          <p className="text-sm text-muted-foreground font-body mb-10">{UPDATED}</p>

          {/* Pre-launch placeholder — pending client/legal review */}
          <div className="mb-10 p-4 border-l-4 border-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.06)] rounded-sm">
            <p className="text-xs font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--highland-gold))] mb-1.5">
              Pending Legal Review
            </p>
            <p className="text-sm text-foreground/75 font-body leading-relaxed">
              This {meta.heading.toLowerCase()} is a working draft prepared for Highlander Roofing &amp; Construction.
              Final copy must be reviewed and approved by the company's attorney before publication.
              Nothing on this page should be relied on as a binding legal commitment until that review is complete.
            </p>
          </div>

          <article className="prose prose-neutral max-w-none font-body text-foreground/85 leading-relaxed [&_h2]:font-heading [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-bold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1.5 [&_a]:text-primary [&_a]:underline [&_a:hover]:no-underline">
            <Body />
          </article>

          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-body">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Terms of Service</Link>
            <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><AccessibilityIcon className="w-3.5 h-3.5" /> Accessibility</Link>
            <span className="text-border">·</span>
            <a href="tel:+18285247773" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> (828) 524-7773</a>
            <a href="mailto:info@highlanderroofing.com" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> info@highlanderroofing.com</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}