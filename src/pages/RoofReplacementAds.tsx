import { REVIEW_COUNT_LABEL, REVIEW_STARS } from "@/data/business";
import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/asphalt-008.webp";

const RoofReplacementAds = () => (
  <PaidAdsLanding
    title="Roof Replacement in Western NC | Get a Clear Scope"
    description="Discuss a roof replacement with Highlander in Western North Carolina. Send a short request or call during business hours for a free estimate."
    path="/lp/roof-replacement"
    serviceName="Roof Replacement"
    heroImage={heroImg}
    heroAlt="Roof replacement in progress on a mountain home in Western North Carolina"
    eyebrow="Roof replacement · Western North Carolina"
    headline="Roof Replacement in Western NC: Get a Written Scope, Not a Sales Pitch"
    subheadline="We help Western North Carolina homeowners understand scope, material fit, and project considerations so replacement decisions feel informed instead of rushed."
    ctaLabel="Get My Replacement Scope"
    adVariants={{
      quote: {
        headline: "Roof Replacement Quotes in Western NC",
        subheadline: "A written scope with materials, timeline, and price — no pressure and no vague ballparks.",
        ctaLabel: "Get My Written Quote",
      },
      metal: {
        headline: "Metal Roof Replacement for Mountain Homes",
        subheadline: "Standing seam and other metal roofing options considered for mountain-home exposure, roof design, and project goals in Western North Carolina.",
        ctaLabel: "Get My Metal Roof Quote",
      },
    }}
    urgencyOptions={["Need pricing soon", "Replacing this month", "Planning ahead", "Insurance-related"]}
    trustStats={[
      { value: REVIEW_STARS, label: "Google Rating", detail: REVIEW_COUNT_LABEL },
      { value: "CertainTeed", label: "Credentialed", detail: "CertainTeed ShingleMaster PREMIER Credentialed Contractor" },
      { value: "Written", label: "Project scope", detail: "Materials and work documented" },
      { value: "Coverage", label: "Project-specific", detail: "Warranty terms confirmed for the selected system" },
    ]}
    highlights={[
      "Clear proposals with real scope language, not vague one-line estimates.",
      "Material recommendations based on mountain weather, roof pitch, and home style.",
      "A documented Highlander project process from tear-off planning through final walkthrough.",
      "Budget, financing availability, and insurance-related questions discussed before commitment.",
    ]}
    quickSteps={[
      { title: "Quick first contact", detail: "Send your first name, email, and phone. We will discuss the property and what is driving the replacement decision during follow-up." },
      { title: "On-site evaluation", detail: "We inspect the roof system and determine the correct replacement scope for your property." },
      { title: "Detailed next step", detail: "You get a clear recommendation, material direction, and the applicable written scope or estimate for your property." },
    ]}
    trustBullets={[
      "Detailed scopes instead of vague allowances",
      "Manufacturer-aligned installation standards",
      "Communication designed for homeowners making a major purchase",
    ]}
    reviewId="nate-yoder-2023"
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