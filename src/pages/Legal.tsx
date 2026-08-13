import { Link } from "react-router-dom";
import { Mail, Phone, Shield, FileText, Accessibility as AccessibilityIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

type LegalKind = "privacy" | "terms" | "accessibility";

const META: Record<LegalKind, { title: string; description: string; path: string; eyebrow: string; heading: string; icon: typeof Shield }> = {
  privacy: {
    title: "Privacy Policy | Highlander Building Services",
    description: "How Highlander Building Services, Inc. collects, uses, and protects the information you share with us, including SMS/MMS, email, and call programs.",
    path: "/privacy",
    eyebrow: "Privacy",
    heading: "Privacy Policy",
    icon: Shield,
  },
  terms: {
    title: "Terms of Service | Highlander Building Services",
    description: "Terms & Conditions for Highlander Building Services, Inc., including SMS/MMS, email, and call program terms.",
    path: "/privacy-policy",
    eyebrow: "Legal",
    heading: "Terms & Conditions",
    icon: FileText,
  },
  accessibility: {
    title: "Accessibility Statement | Highlander Building Services",
    description: "Highlander Building Services is committed to providing a website that is accessible to all visitors across Western North Carolina.",
    path: "/accessibility",
    eyebrow: "Accessibility",
    heading: "Accessibility Statement",
    icon: AccessibilityIcon,
  },
};

const UPDATED = "Last updated: June 22, 2026";

function PrivacyBody() {
  return (
    <>
      <p>
        <strong>Company Name:</strong> Highlander Building Services, Inc.<br />
        <strong>Website:</strong> <a href="https://highlandernc.com/">https://highlandernc.com/</a>
      </p>
      <h2>8.1 Scope</h2>
      <p>
        This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit or
        interact with our Website or participate in any of our Programs, including our post-project survey,
        feedback, and review-request campaigns.
      </p>
      <p>
        This policy applies to information we collect through the Website, through our Programs (including
        SMS/MMS, email, and calls), and through related online interactions. It does not apply to information
        collected offline (for example, by phone or in person) unless we specifically state otherwise.
      </p>
      <p>
        The Website and Programs are intended for users located in the United States. If you access the Website
        or participate in any Program from outside the United States, your information may be transferred to,
        processed, and stored in the United States.
      </p>
      <p>By accessing or using the Website or participating in any Program, you agree to this Privacy Policy.</p>

      <h2>8.2 Information We Collect</h2>
      <p>
        We collect information in three primary ways: (a) information you provide to us, (b) information
        collected automatically when you browse the Website, and (c) information collected through cookies and
        similar technologies used for analytics, advertising, and performance measurement.
      </p>
      <h3>8.2.1 Information You Provide Voluntarily</h3>
      <p>
        When you submit information through the Website or otherwise interact with us—such as by requesting
        service, requesting an estimate, scheduling an appointment, starting a chat, contacting us, or
        participating in a Program—we may collect information you choose to provide, including:
      </p>
      <ul>
        <li>Identifiers and contact information (such as name, email address, phone number, and mailing/service address).</li>
        <li>Service request and project details (such as service type, project dates, preferred appointment windows, photos or attachments you upload, and notes you provide).</li>
        <li>Communications content (such as messages submitted through forms, chat, SMS/MMS, email, or other channels you use to contact us).</li>
        <li>Survey responses and feedback, including NPS scores, ratings, qualitative comments about completed work or your experience, and any other information you choose to share in a survey or review request.</li>
        <li>Any other information you choose to submit.</li>
      </ul>
      <p>
        You are not required to provide personal information to browse the Website. However, if you choose not
        to provide certain information, we may be unable to respond to your request, administer certain
        Programs, or provide certain services.
      </p>
      <h3>8.2.2 Information Collected Automatically</h3>
      <p>When you visit the Website, we (and our service providers) may automatically collect certain information about your device and your interaction with the Website, such as:</p>
      <ul>
        <li>IP address and general location information (such as city/state inferred from IP address).</li>
        <li>Device and browser information (such as browser type, operating system, device type, and language settings).</li>
        <li>Usage and event data (such as pages visited, links clicked, scroll activity, time spent on pages, and referring/exit pages).</li>
        <li>Approximate timestamps, session identifiers, and diagnostic data used for performance, analytics, and security monitoring.</li>
      </ul>
      <p>This information helps us operate the Website, measure performance, understand visitor engagement, detect and prevent fraud, and maintain security.</p>
      <h3>8.2.3 Cookies, Pixels, SDKs, and Similar Technologies</h3>
      <p>
        We use cookies and similar technologies (such as pixels, tags, local storage, and SDKs) to help the
        Website function, to understand how the Website is used, and to support advertising and measurement
        activities. These technologies may collect information such as your IP address, device/browser
        characteristics, and your interactions with the Website. Examples include:
      </p>
      <ul>
        <li>Analytics tools (for example, Google Analytics) to understand Website traffic and usage.</li>
        <li>Advertising and conversion measurement tools (for example, Google Ads and Meta Pixel) to help measure the effectiveness of marketing campaigns and deliver ads.</li>
        <li>Call tracking tools (for example, dynamic phone numbers) to attribute calls and leads to marketing sources and improve service.</li>
        <li>Chat and messaging tools to support customer communications and improve responsiveness.</li>
      </ul>
      <p>
        Some of these technologies may be operated by third parties and may collect information across
        different websites or online services over time, subject to those parties' privacy practices. You can
        control certain cookies through your browser settings and, where available, through any cookie
        preference controls presented on the Website. See Section 8.5 for more information.
      </p>

      <h2>8.3 How We Use Your Information</h2>
      <p>We use the information we collect for legitimate business purposes consistent with operating our business, maintaining an effective Website, and running our Programs. Depending on how you interact with us, we may use information to:</p>
      <ul>
        <li>Provide and manage services, including responding to inquiries, providing estimates, scheduling appointments, and coordinating project or service delivery.</li>
        <li>Communicate with you, including confirmations, reminders, follow-up communications, and customer support.</li>
        <li>Administer post-project survey, NPS, and feedback Programs, including sending you survey invitations, collecting and analyzing satisfaction scores and qualitative feedback, and following up on issues or questions you raise.</li>
        <li>Request that you leave reviews on public platforms, at your discretion, and track whether review requests are sent or completed.</li>
        <li>Operate, maintain, and improve the Website and Programs, including troubleshooting, testing, analytics, measuring performance, and improving user experience.</li>
        <li>Conduct marketing and advertising activities with your consent, including measuring campaign performance and attributing calls and leads.</li>
        <li>Protect against fraud, misuse, and security incidents; enforce our policies; and maintain the safety and integrity of our systems.</li>
        <li>Comply with applicable legal requirements and respond to lawful requests.</li>
      </ul>
      <p>We do not sell personal information. We do not use information collected through the Website or Programs to make decisions that produce legal or similarly significant effects solely by automated means (for example, automated denial of services).</p>

      <h2>8.4 Communications and Text Messaging Privacy</h2>
      <p>If you provide your phone number or email address, you may receive communications from us as described in our <a href="/privacy-policy">Terms &amp; Conditions</a> and in Section 8.3 above.</p>
      <h3>8.4.1 SMS / MMS Text Messages</h3>
      <p>If you opt in to receive text messages, we may send SMS/MMS messages related to:</p>
      <ul>
        <li>Your current or past projects or services.</li>
        <li>Satisfaction surveys and NPS requests.</li>
        <li>Qualitative feedback requests about work performed.</li>
        <li>Invitations to leave public reviews.</li>
        <li>Service-related messages and, where permitted, limited promotional messages related to our services.</li>
        <li>Message frequency may vary.</li>
        <li>Message and data rates may apply.</li>
        <li>You can opt out at any time by replying STOP.</li>
        <li>For help, reply HELP or contact us using the information in Section 6 of our Terms.</li>
      </ul>
      <p>
        No mobile information will be shared with third parties or affiliates for marketing or promotional
        purposes. We do not sell, rent, or share your mobile phone number, text-message consent information,
        or opt-out status with third parties or affiliates for their own marketing or promotional purposes. We
        may share this information only with service providers that help us deliver text messages (such as
        messaging platforms, phone companies, and other vendors assisting with SMS delivery) or as required
        by law.
      </p>

      <h2>8.5 Cookies, Interest-Based Advertising, and Your Choices</h2>
      <h3>8.5.1 Managing Cookies</h3>
      <p>You can control cookies through your browser settings, including refusing some or all cookies or receiving an alert when cookies are being sent. If you disable cookies, certain features of the Website may not function properly.</p>
      <p>If the Website presents a cookie banner or preference center, you can use it to manage certain categories of cookies where available.</p>
      <h3>8.5.2 Analytics and Advertising Tools</h3>
      <p>We may use third-party analytics and advertising tools (such as Google Analytics, Google Ads, and Meta Pixel). These providers may set cookies or similar technologies and collect information about your interactions with the Website to provide measurement, analytics, and advertising services. Information collected through these tools may be combined with other information collected through the Website for the purposes described in this policy.</p>
      <h3>8.5.3 Global Privacy Control (GPC)</h3>
      <p>Some browsers or extensions support the Global Privacy Control ("GPC") signal. Where required by applicable law, we will process GPC signals as a request to opt out of certain processing (such as certain types of "sharing" for targeted advertising under state law). Honoring GPC may be limited by technical constraints and may not apply to all uses of cookies (for example, cookies necessary to operate the Website).</p>
      <h3>8.5.4 Do Not Track</h3>
      <p>Some browsers include a "Do Not Track" (DNT) setting. Because there is no common industry standard for interpreting DNT signals, the Website may not respond to all DNT signals. You can use the other controls described in this section to manage cookies and tracking.</p>

      <h2>8.6 Sharing and Disclosure of Information</h2>
      <p>We may disclose information collected through the Website and Programs in limited circumstances as described below. We do not sell personal information.</p>
      <h3>8.6.1 Service Providers</h3>
      <p>We may share information with vendors and service providers that help us operate the Website, run our business, or deliver the Programs, such as website hosting providers, analytics providers, advertising and measurement vendors, call tracking providers, survey and review-request platforms, messaging platforms, and customer communication tools. These providers are permitted to use information only to perform services on our behalf and are subject to contractual confidentiality and security obligations. We do not authorize service providers to use personal information for their own independent marketing purposes.</p>
      <p>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Your mobile information will not be sold or shared with third parties or affiliates for promotional or marketing purposes. All categories of sharing described in this Section exclude mobile contact information and text messaging originator opt-in data and consent; this information will not be shared with any third parties, except service providers that assist us in delivering our text messages or as required by law.</p>
      <h3>8.6.2 Legal and Safety</h3>
      <p>We may disclose information if we believe it is necessary to: (a) comply with applicable law, regulation, legal process, or governmental request; (b) enforce our agreements or policies; (c) protect the rights, property, or safety of the Company, our customers, or others; or (d) detect, prevent, or address fraud or security issues.</p>
      <h3>8.6.3 Business Transfers</h3>
      <p>If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of all or a portion of our business or assets, information may be transferred as part of that transaction, subject to applicable law and appropriate confidentiality protections.</p>

      <h2>8.7 Data Security</h2>
      <p>We use reasonable administrative, technical, and physical safeguards designed to protect information collected through the Website and Programs from unauthorized access, use, disclosure, alteration, or destruction. No method of transmission over the Internet or method of electronic storage is completely secure, so we cannot guarantee absolute security.</p>
      <p>Email, text messages, and chat communications may not be encrypted end-to-end and may not be secure. Please do not send sensitive information through these channels.</p>
      <p>If you believe your interaction with us is no longer secure, please contact us immediately using the information in Section 6 of our Terms.</p>

      <h2>8.8 Links to Other Websites</h2>
      <p>The Website may contain links to third-party websites or services. We do not control, and are not responsible for, the content, privacy practices, or security of third-party websites. We encourage you to review the privacy policies of any website you visit.</p>

      <h2>8.9 Children's Privacy</h2>
      <p>The Website and Programs are not directed to children under 18, and we do not knowingly collect personal information from children. If you believe a child has provided personal information through the Website or a Program, please contact us so we can take appropriate steps to delete it.</p>

      <h2>8.10 Data Retention</h2>
      <p>We retain personal information collected through the Website and Programs for as long as reasonably necessary to fulfill the purposes described in this policy, including to provide services, administer Programs (including surveys and review requests), maintain business records, resolve disputes, enforce agreements, and comply with legal obligations. When information is no longer needed, we will take reasonable steps to delete, deidentify, or securely dispose of it in accordance with our retention practices and applicable law.</p>

      <h2>8.11 Changes to These Terms and This Policy</h2>
      <p>We may update these Terms &amp; Conditions and this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this document. Your continued use of the Website or participation in any Program after changes are posted means you accept the updated Terms.</p>

      <h2>8.12 Privacy Rights and Choices (U.S. Residents)</h2>
      <p>Depending on where you live, you may have certain rights regarding personal information, which may include the right to:</p>
      <ul>
        <li>Confirm whether we collect or process personal information about you and request access to it.</li>
        <li>Request correction of inaccurate personal information.</li>
        <li>Request deletion of personal information, subject to certain legal exceptions.</li>
        <li>Request a copy of personal information in a portable format.</li>
        <li>Opt out of certain uses of personal information, including certain forms of targeted advertising conducted through cookies and similar technologies.</li>
        <li>Appeal a decision regarding your privacy rights request, where required by applicable law.</li>
      </ul>
      <p>The availability and scope of these rights may vary by jurisdiction.</p>
      <h3>How to Exercise Your Rights</h3>
      <p>To submit a privacy request, contact us using the information in Section 6 of our Terms. We may need to verify your identity before completing your request. Where permitted by law, you may designate an authorized agent to submit a request on your behalf. If your request is denied, you may have the right to appeal our decision by contacting us and stating that you are submitting an appeal.</p>
      <h3>Cookie and Advertising Choices</h3>
      <p>You can control cookies and similar technologies by:</p>
      <ul>
        <li>Adjusting your browser settings to block or delete cookies.</li>
        <li>Using any cookie preference tools or banners that may be available on the Website.</li>
        <li>Using certain browser signals (such as Global Privacy Control) that communicate your preference to opt out of certain cookie-based uses, where required by applicable law.</li>
      </ul>
      <p>Please note that blocking cookies may affect the functionality of the Website, and some cookies are necessary for the Website to operate.</p>
      <h3>No Sale of Personal Information</h3>
      <p>We do not sell personal information for money. However, we may allow certain third-party partners to collect information through cookies and similar technologies for analytics, advertising, and measurement. You can opt out of certain cookie-based advertising through the controls described above.</p>

      <h2>Contact Us</h2>
      <p>
        Highlander Building Services, Inc.<br />
        76 Creative Dr, Franklin, NC 28734<br />
        Phone: <a href="tel:+18285247773">(828) 524-7773</a><br />
        Email: <a href="mailto:luke@highlandernc.com">luke@highlandernc.com</a>
      </p>
    </>
  );
}

function TermsBody() {
  return (
    <>
      <p>
        <strong>Company Name:</strong> Highlander Building Services, Inc.<br />
        <strong>Website:</strong> <a href="https://highlandernc.com/">https://highlandernc.com/</a>
      </p>
      <h2>1. Program Description and Acceptance of Terms</h2>
      <p>
        Highlander Building Services, Inc. ("Company," "we," "our," or "us") operates one or more text
        messaging, email, and call programs (collectively, the "Programs") to communicate with customers and
        prospects regarding our services. These Programs may include, without limitation:
      </p>
      <ul>
        <li>Service-related alerts and reminders.</li>
        <li>Customer support and scheduling updates.</li>
        <li>Post-project follow-up communications, including satisfaction surveys, Net Promoter Score (NPS) collection, qualitative feedback about completed work, and invitations to leave public reviews on third-party platforms.</li>
        <li>Where permitted, limited informational or promotional messages related to our services.</li>
      </ul>
      <p>
        By providing your contact information (including your mobile phone number and email address) and opting
        in to receive messages from us, or by using our Website or services, you agree to these Terms &amp;
        Conditions and our <a href="/privacy-policy">Privacy Policy</a> (together, the "Terms"). If you do not agree,
        please do not enroll in any Program or use the Website.
      </p>
      <ul>
        <li><strong>Program / Brand Name(s):</strong> "Highlander Building Services, Inc. Customer Communications"</li>
        <li><strong>Program Description:</strong> One-time and recurring communications by SMS, MMS, phone, and email related to service scheduling and support, post-project surveys (including NPS), feedback collection, and invitations to leave public reviews, as well as other service-related and, where permitted, limited promotional messages.</li>
      </ul>

      <h2>2. Message Frequency and Charges</h2>
      <ul>
        <li>Message and data rates may apply.</li>
        <li>Message frequency may vary based on your interactions with us and which Programs you join (for example, number of projects, survey requests, or inbound inquiries).</li>
        <li>Your wireless carrier may charge you for text messages according to your mobile plan. You are responsible for any such charges.</li>
      </ul>

      <h2>3. Opt-In and Opt-Out</h2>
      <p>You may opt in to receive messages from us by, for example, submitting a form on our Website that includes consent language, requesting text or email updates, providing your information during a service interaction, or otherwise agreeing to receive communications.</p>
      <p><strong>Opt-Out Instructions (STOP):</strong></p>
      <ul>
        <li>To stop receiving text messages from a Program, reply "STOP" to any message we send you.</li>
        <li>After you send "STOP," we may send you a one-time confirmation message to confirm that you have been unsubscribed from that Program. After this, you will no longer receive messages from that specific Program, but you may still receive messages from other Programs you have joined (unless and until you opt out of those Programs as well).</li>
      </ul>
      <p><strong>Help Instructions (HELP):</strong></p>
      <ul>
        <li>If you need assistance with a Program, reply "HELP" to any message or contact us using the information in Section 6 (Customer Support).</li>
      </ul>
      <p>You may also contact us directly using the information in Section 6 to request that we stop sending messages via SMS, email, or phone.</p>

      <h2>4. Carrier Disclosures</h2>
      <p>Carriers are not liable for any delayed or undelivered messages. Availability of a Program and performance of message delivery may be affected by your carrier's coverage and network conditions.</p>

      <h2>5. Post-Project Survey and Review Requests</h2>
      <p>After a project or service is completed, we may contact you by phone, SMS/MMS, or email to:</p>
      <ul>
        <li>Request that you complete a satisfaction survey.</li>
        <li>Collect a Net Promoter Score (NPS) or other rating regarding your experience.</li>
        <li>Gather qualitative feedback about the work that was performed.</li>
        <li>Ask you to leave a review on public platforms (such as online review or social media sites), at your discretion.</li>
      </ul>
      <p>Your participation in surveys, feedback requests, or public reviews is voluntary. Declining to participate will not affect your ability to receive services from us.</p>

      <h2>6. Customer Support and Contact Information</h2>
      <p>If you have questions about these Terms or any Program, or if you need help, please contact us:</p>
      <ul>
        <li>Phone: <a href="tel:+18285247773">(828) 524-7773</a></li>
        <li>Email: <a href="mailto:luke@highlandernc.com">luke@highlandernc.com</a></li>
        <li>Mailing Address: 76 Creative Dr, Franklin, NC 28734</li>
      </ul>
      <p>You may also reply HELP to any text message for assistance.</p>

      <h2>7. Link to Privacy Policy</h2>
      <p>For more information about how we collect, use, and share your information, including information collected through the Programs and the Website, please review our <a href="/privacy-policy">Privacy Policy</a>.</p>
    </>
  );
}

function AccessibilityBody() {
  return (
    <>
      <p>
        Highlander Building Services is committed to making this website usable for every visitor across
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
        email <a href="mailto:info@highlandernc.com">info@highlandernc.com</a>. We respond promptly.
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
      <main id="main-content" className="pt-32 md:pt-40 pb-20 bg-background">
        <div className="container-tight max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
            </div>
            <span className="text-caption font-body font-bold uppercase tracking-[0.22em] text-primary">{meta.eyebrow}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 tracking-tight">
            {meta.heading}
          </h1>
          <p className="text-sm text-muted-foreground font-body mb-10">{UPDATED}</p>

          <article className="prose prose-neutral max-w-none font-body text-foreground/85 leading-relaxed [&_h2]:font-heading [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-bold [&_h3]:font-heading [&_h3]:text-foreground [&_h3]:text-base [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-bold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1.5 [&_a]:text-primary [&_a]:underline [&_a:hover]:no-underline">
            <Body />
          </article>

          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-body">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><Shield className="w-4 h-4" aria-hidden="true" /> Privacy Policy</Link>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><FileText className="w-4 h-4" aria-hidden="true" /> Terms of Service</Link>
            <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><AccessibilityIcon className="w-4 h-4" aria-hidden="true" /> Accessibility</Link>
            <span className="text-border">·</span>
            <a href="tel:+18285247773" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><Phone className="w-4 h-4" aria-hidden="true" /> (828) 524-7773</a>
            <a href="mailto:info@highlandernc.com" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><Mail className="w-4 h-4" aria-hidden="true" /> info@highlandernc.com</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}