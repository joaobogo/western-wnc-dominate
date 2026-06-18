import { Link } from "react-router-dom";
import { Mail, Phone, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const LAST_UPDATED = "[CLIENT TO CONFIRM LAST UPDATED DATE]";
const WEBSITE_URL = "[CLIENT TO CONFIRM FINAL WEBSITE URL]";
const EMAIL = "[CLIENT TO CONFIRM EMAIL ADDRESS]";
const ADDRESS = "[CLIENT TO CONFIRM PHYSICAL BUSINESS ADDRESS]";
const COMPANY = "Highlander Roofing Services, Inc.";
const PHONE = "828-524-7773";
const PROGRAM = "Highlander Roofing Services Customer Communications";

const TOC: { id: string; label: string }[] = [
  { id: "program", label: "1. Program Description and Acceptance of Terms" },
  { id: "frequency", label: "2. Message Frequency and Charges" },
  { id: "opt", label: "3. Opt-In and Opt-Out" },
  { id: "carrier", label: "4. Carrier Disclosures" },
  { id: "surveys", label: "5. Post-Project Survey and Review Requests" },
  { id: "support", label: "6. Customer Support and Contact Information" },
  { id: "privacy", label: "7. Privacy Policy" },
  { id: "scope", label: "8. Scope" },
  { id: "collect", label: "9. Information We Collect" },
  { id: "voluntary", label: "10. Information You Provide Voluntarily" },
  { id: "automatic", label: "11. Information Collected Automatically" },
  { id: "cookies", label: "12. Cookies, Pixels, SDKs, and Similar Technologies" },
  { id: "use", label: "13. How We Use Your Information" },
  { id: "comm-privacy", label: "14. Communications and Text Messaging Privacy" },
  { id: "sms", label: "15. SMS/MMS Text Messages" },
  { id: "ad-choices", label: "16. Cookies, Interest-Based Advertising, and Your Choices" },
  { id: "sharing", label: "17. Sharing and Disclosure of Information" },
  { id: "providers", label: "18. Service Providers" },
  { id: "legal", label: "19. Legal and Safety" },
  { id: "transfers", label: "20. Business Transfers" },
  { id: "security", label: "21. Data Security" },
  { id: "links", label: "22. Links to Other Websites" },
  { id: "children", label: "23. Children's Privacy" },
  { id: "retention", label: "24. Data Retention" },
  { id: "changes", label: "25. Changes to These Terms and This Policy" },
  { id: "us-rights", label: "26. Privacy Rights and Choices for U.S. Residents" },
  { id: "no-sale", label: "27. No Sale of Personal Information" },
];

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy & Terms | Highlander Roofing Services"
        description="Privacy Policy, Terms & Conditions, SMS/MMS program disclosures, and cookie information for Highlander Roofing Services, Inc."
        path="/privacy-policy"
      />
      <Header />
      <main className="pt-32 md:pt-40 pb-20 bg-background">
        <div className="container-tight max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[11px] font-body font-bold uppercase tracking-[0.22em] text-primary">
              Legal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 tracking-tight">
            Terms &amp; Conditions and Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground font-body mb-10">
            Last updated: {LAST_UPDATED}
          </p>

          {/* Table of Contents */}
          <nav
            aria-label="Table of contents"
            className="mb-12 p-5 md:p-6 border border-border rounded-sm bg-muted/30"
          >
            <p className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-primary mb-3">
              Contents
            </p>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm font-body list-none p-0">
              {TOC.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-foreground/80 hover:text-primary transition-colors">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="prose prose-neutral max-w-none font-body text-foreground/85 leading-relaxed [&_h2]:font-heading [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:font-bold [&_h2]:scroll-mt-32 [&_h3]:font-heading [&_h3]:text-foreground [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1.5 [&_a]:text-primary [&_a]:underline [&_a:hover]:no-underline">
            <p>
              These Terms &amp; Conditions and Privacy Policy ("Terms") govern your use of the
              website operated by {COMPANY} ("Highlander," "we," "us," or "our") and your
              participation in the {PROGRAM} program. By using our website, submitting a form,
              or opting in to receive communications from us, you agree to these Terms.
            </p>

            <h2 id="program">1. Program Description and Acceptance of Terms</h2>
            <p>
              The {PROGRAM} program allows {COMPANY} to communicate with current and
              prospective customers about roofing, construction, gutter, outdoor living, and
              related services. Communications may include scheduling, estimates, project
              updates, follow-ups, satisfaction surveys, and review requests. By providing your
              contact information or opting in, you accept these Terms.
            </p>

            <h2 id="frequency">2. Message Frequency and Charges</h2>
            <p>
              Message frequency may vary based on your interactions with us and the stage of
              your project. <strong>Message and data rates may apply</strong> according to your
              mobile carrier plan. Highlander is not responsible for carrier charges.
            </p>

            <h2 id="opt">3. Opt-In and Opt-Out</h2>
            <p>
              You opt in to receive communications by submitting a form, providing your phone
              number to a Highlander representative, or replying to a message confirming your
              consent.
            </p>
            <p>
              You may opt out of text messages at any time by replying <strong>STOP</strong> to
              any message. After a STOP request, you may receive one final confirmation
              message. To receive assistance, reply <strong>HELP</strong> or contact us at{" "}
              <a href={`tel:+1${PHONE.replace(/-/g, "")}`}>{PHONE}</a>. Opting out of text
              messages does not opt you out of other programs you may have separately
              subscribed to; you must opt out of each program individually.
            </p>

            <h2 id="carrier">4. Carrier Disclosures</h2>
            <p>
              Mobile carriers are not liable for delayed or undelivered messages. Supported
              carriers may change without notice.
            </p>

            <h2 id="surveys">5. Post-Project Survey and Review Requests</h2>
            <p>
              After a project or service is completed, Highlander may contact you by phone,
              SMS/MMS, or email to request a satisfaction survey, collect Net Promoter Score
              (NPS) feedback, gather qualitative feedback about completed work, or invite you
              to leave a review on a public platform at your discretion.
            </p>
            <p>
              Participation in surveys, feedback requests, and public reviews is entirely
              voluntary. Declining to participate will not affect your ability to receive
              services from Highlander.
            </p>

            <h2 id="support">6. Customer Support and Contact Information</h2>
            <p>
              For questions about communications, opt-out status, or these Terms, contact:
            </p>
            <ul>
              <li>Phone: <a href={`tel:+1${PHONE.replace(/-/g, "")}`}>{PHONE}</a></li>
              <li>Email: {EMAIL}</li>
              <li>Mailing address: {ADDRESS}</li>
              <li>Website: {WEBSITE_URL}</li>
            </ul>

            <h2 id="privacy">7. Privacy Policy</h2>
            <p>
              This Privacy Policy explains how {COMPANY} collects, uses, shares, and protects
              information about you when you use our website, submit a form, contact us, or
              receive services from us.
            </p>

            <h2 id="scope">8. Scope</h2>
            <p>
              This policy applies to information collected through our website, forms,
              communications (phone, SMS/MMS, email), and the {PROGRAM} program. It does not
              cover the practices of third parties we do not own or control.
            </p>

            <h2 id="collect">9. Information We Collect</h2>
            <p>
              We collect information you provide directly to us and information collected
              automatically when you interact with our website or messages.
            </p>

            <h2 id="voluntary">10. Information You Provide Voluntarily</h2>
            <ul>
              <li>Name, phone number, email, and mailing/project address</li>
              <li>Project details (type, scope, timeline, budget range, photos)</li>
              <li>Preferred contact method and best time to reach you</li>
              <li>Feedback, survey responses, NPS ratings, and reviews</li>
              <li>Information shared in communications with our team</li>
            </ul>

            <h2 id="automatic">11. Information Collected Automatically</h2>
            <ul>
              <li>Device, browser, operating system, and IP address (approximate location)</li>
              <li>Pages viewed, referring page, time on site, and interaction events</li>
              <li>Message delivery, open, and click metadata for emails and texts</li>
            </ul>

            <h2 id="cookies">12. Cookies, Pixels, SDKs, and Similar Technologies</h2>
            <p>
              Our website and communications may use cookies, pixels, tags, local storage,
              SDKs, and similar technologies, including:
            </p>
            <ul>
              <li>Analytics tools such as Google Analytics</li>
              <li>Advertising tools such as Google Ads and Meta Pixel</li>
              <li>Call tracking tools</li>
              <li>Chat or messaging tools</li>
              <li>Survey and review request platforms such as RealWork</li>
            </ul>

            <h2 id="use">13. How We Use Your Information</h2>
            <ul>
              <li>Respond to inquiries, schedule consultations, and provide estimates</li>
              <li>Deliver, manage, and follow up on projects and services</li>
              <li>Send service updates, scheduling, and project completion communications</li>
              <li>Request feedback, NPS, and reviews after work is completed</li>
              <li>Maintain warranty, service, and accounting records</li>
              <li>Improve our website, services, and marketing</li>
              <li>Comply with legal obligations and enforce our agreements</li>
            </ul>

            <h2 id="comm-privacy">14. Communications and Text Messaging Privacy</h2>
            <p>
              <strong>
                No mobile information will be shared with third parties or affiliates for
                marketing or promotional purposes.
              </strong>{" "}
              {COMPANY} does not sell, rent, or share mobile phone numbers, text-message
              consent information, or opt-out status with third parties or affiliates for their
              own marketing or promotional purposes. This information may only be shared with
              service providers that help us deliver messages or as required by law.
            </p>

            <h2 id="sms">15. SMS/MMS Text Messages</h2>
            <ul>
              <li>Message and data rates may apply.</li>
              <li>Message frequency may vary.</li>
              <li>Reply STOP to opt out. Reply HELP for help.</li>
              <li>Carriers are not liable for delayed or undelivered messages.</li>
              <li>One confirmation message may be sent after a STOP request.</li>
              <li>Opting out of one program does not opt you out of other programs.</li>
            </ul>

            <h2 id="ad-choices">16. Cookies, Interest-Based Advertising, and Your Choices</h2>
            <p>You may control tracking and advertising technologies in several ways:</p>
            <ul>
              <li>Adjust browser cookie and tracking settings</li>
              <li>Use any cookie preference controls offered on our site</li>
              <li>
                We honor Global Privacy Control (GPC) signals where legally required. Browsers
                may also send a Do Not Track (DNT) signal; because there is no industry
                standard for DNT, we treat valid GPC signals as the preferred opt-out signal.
              </li>
              <li>
                Opt out of interest-based advertising through the
                {" "}<a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a>{" "}
                or
                {" "}<a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a>.
              </li>
              <li>Submit applicable privacy rights requests as described below.</li>
            </ul>

            <h2 id="sharing">17. Sharing and Disclosure of Information</h2>
            <p>
              We share information only as needed to operate our business and deliver your
              project, as described in the sections below.
            </p>

            <h2 id="providers">18. Service Providers</h2>
            <p>
              We share information with vendors that help us run our business and deliver
              services — for example, hosting, email and SMS delivery, scheduling, CRM,
              analytics, advertising measurement, and survey/review platforms such as
              RealWork. These vendors are bound by contract to use information only to perform
              services for us.
            </p>

            <h2 id="legal">19. Legal and Safety</h2>
            <p>
              We may disclose information when required by law, subpoena, or other legal
              process, or when we believe disclosure is necessary to protect rights, safety,
              or property of {COMPANY}, our customers, or others.
            </p>

            <h2 id="transfers">20. Business Transfers</h2>
            <p>
              If {COMPANY} is involved in a merger, acquisition, financing, reorganization,
              bankruptcy, or sale of assets, information may be transferred as part of that
              transaction, subject to applicable law.
            </p>

            <h2 id="security">21. Data Security</h2>
            <p>
              We use reasonable administrative, technical, and physical safeguards to protect
              information. No method of transmission or storage is completely secure; we
              cannot guarantee absolute security.
            </p>

            <h2 id="links">22. Links to Other Websites</h2>
            <p>
              Our website may link to third-party websites or platforms. We are not
              responsible for the privacy practices of those sites. Please review their
              policies before providing information.
            </p>

            <h2 id="children">23. Children's Privacy</h2>
            <p>
              Our services are directed to adults. We do not knowingly collect personal
              information from children under 13. If you believe a child has provided us with
              personal information, contact us and we will delete it.
            </p>

            <h2 id="retention">24. Data Retention</h2>
            <p>
              We retain information for as long as needed to provide services, support
              warranties, meet legal and accounting obligations, and resolve disputes. You may
              request deletion of contact information that is no longer tied to an active
              project or warranty.
            </p>

            <h2 id="changes">25. Changes to These Terms and This Policy</h2>
            <p>
              We may update these Terms and this Privacy Policy from time to time. Changes
              take effect when posted on this page. The "Last updated" date at the top of this
              page reflects the most recent revision.
            </p>

            <h2 id="us-rights">26. Privacy Rights and Choices for U.S. Residents</h2>
            <p>
              Depending on your state of residence, you may have rights to access, correct,
              delete, or obtain a copy of personal information we hold about you, and to opt
              out of certain processing activities. To exercise these rights, contact us using
              the information in Section 6. We will respond as required by applicable law and
              may need to verify your identity before fulfilling the request.
            </p>

            <h2 id="no-sale">27. No Sale of Personal Information</h2>
            <p>
              {COMPANY} does not sell personal information as that term is commonly defined,
              and we do not sell or share mobile phone numbers, SMS opt-in data, or
              text-messaging consent for third-party marketing or promotional purposes.
            </p>
          </article>

          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-body">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Privacy Policy &amp; Terms
            </Link>
            <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">
              Accessibility
            </Link>
            <span className="text-border">·</span>
            <a href={`tel:+1${PHONE.replace(/-/g, "")}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> {PHONE}
            </a>
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {EMAIL}
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;