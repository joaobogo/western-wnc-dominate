import { REVIEW_STARS } from "@/data/business";
import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/asphalt-008.webp";

const RoofReplacementAds = () => (
  <PaidAdsLanding
    title="Roof Replacement in Western NC | Get a Clear Scope"
    description="Roof replacement landing page for paid traffic with a simplified lead form, stronger trust proof, and clear next-step messaging for Western North Carolina homeowners."
    path="/lp/roof-replacement"
    serviceName="Roof Replacement"
    heroImage={heroImg}
    heroAlt="Roof replacement in progress on a mountain home in Western North Carolina"
    eyebrow="Roof replacement · Western North Carolina"
    headline="Roof Replacement in Western NC — Get a Written Scope, Not a Sales Pitch"
    subheadline="We help Western North Carolina homeowners understand timing, material fit, and budget range so replacement decisions feel informed instead of rushed."
    ctaLabel="Get My Replacement Scope"
    adVariants={{
      quote: {
        headline: "Roof Replacement Quotes in Western NC",
        subheadline: "A written scope with materials, timeline, and price — no pressure and no vague ballparks.",
        ctaLabel: "Get My Written Quote",
      },
      metal: {
        headline: "Metal Roof Replacement for Mountain Homes",
        subheadline: "Standing seam and metal systems specified for elevation, wind, and ice loads in Western North Carolina.",
        ctaLabel: "Get My Metal Roof Quote",
      },
    }}
    urgencyOptions={["Need pricing soon", "Replacing this month", "Planning ahead", "Insurance-related"]}
    trustStats={[
      { value: REVIEW_STARS, label: "Google Rating", detail: "5-star roofing service" },
      { value: "CertainTeed", label: "ShingleMaster", detail: "CertainTeed ShingleMaster Credentialed Contractor" },
      { value: "2–5", label: "Typical install days", detail: "Most residential projects" },
      { value: "Warranty", label: "Protected work", detail: "Manufacturer plus Highlander labor coverage" },
    ]}
    highlights={[
      "Clear proposals with real scope language, not vague one-line estimates.",
      "Material recommendations based on mountain weather, roof pitch, and home style.",
      "Local crews and quality control from tear-off through final walkthrough.",
      "Financing and insurance-adjacent conversations handled without pressure.",
    ]}
    quickSteps={[
      { title: "Quick intake", detail: "Share your town, timing, and what is pushing the replacement decision right now." },
      { title: "On-site evaluation", detail: "We inspect the roof system and determine the correct replacement scope for your property." },
      { title: "Detailed next step", detail: "You get a clear recommendation, material direction, and what to expect on timeline and investment." },
    ]}
    trustBullets={[
      "Detailed scopes instead of vague allowances",
      "Manufacturer-aligned installation standards",
      "Communication designed for homeowners making a major purchase",
    ]}
    testimonial={{
      quote: "Their proposal was the first one that actually explained what we were buying. The crew was organized, the communication was strong, and the finished roof looks excellent.",
      name: "Karen W.",
      location: "Waynesville, NC",
    }}
    faqs={[
      {
        question: "How do I know it is time to replace instead of keep repairing?",
        answer: "When issues are spreading, the roof is aging, or recurring repairs are stacking up, replacement often becomes the smarter long-term spend. We assess that honestly before recommending it.",
      },
      {
        question: "Can you help me compare shingle versus metal options?",
        answer: "Yes. We walk through lifespan, weather performance, appearance, and budget so you can choose the system that fits your home and priorities.",
      },
      {
        question: "Will I get a detailed estimate or just a ballpark?",
        answer: "Our goal is a detailed, transparent scope after assessment so you understand the work, materials, and timeline — not just a vague number without context.",
      },
    ]}
  />
);

export default RoofReplacementAds;