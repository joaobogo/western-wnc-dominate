import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/work/roof-chimney-flashing-detail.webp";

/**
 * /lp/roof-check: noindex paid landing page for seasonal owners (John's 404 fix
 * guide, HL-043; Andrew's winter Meta campaign, PA-010). John, Nov 19: the roof
 * check is a paid visit, so no "free" wording and no price on the page; the
 * office gives the price on the call.
 */
const RoofCheckAds = () => (
  <PaidAdsLanding
    title="Roof Check for Second Homes | Highlander"
    description="Away for the winter? Highlander checks the roof and gutters on your Western NC home and sends you photos. A paid visit, priced on the call."
    path="/lp/roof-check"
    serviceName="Roof Check"
    formEyebrow="Paid visit · photos sent to you"
    formHeading="Request a roof check."
    reviewLabel="What a customer said"
    heroImage={heroImg}
    heroAlt="Stone chimney with new metal counter-flashing on a shingle roof, checked by Highlander"
    eyebrow="Roof checks for second homes · Western North Carolina"
    headline="Away for the Winter? We'll Check Your Roof and Send You Photos"
    subheadline="A Highlander roofer looks over the roof, flashing and gutters while you are away and sends you photos of what we found. It is a paid visit; the office gives you the price on the call."
    ctaLabel="Request My Roof Check"
    urgencyOptions={["Before I leave for the winter", "While I'm away", "After a storm", "Just planning ahead"]}
    trustStats={[
      { value: "Photos", label: "Sent to you", detail: "See what we found without being there" },
      { value: "Paid visit", label: "Priced on the call", detail: "You know the price before it is scheduled" },
      { value: "NC GC", label: "Licensed contractor", detail: "North Carolina General Contractor" },
      { value: "Written", label: "Repair scope", detail: "Nothing is repaired without your approval" },
    ]}
    highlights={[
      "Roof surface: missing, lifted or damaged shingles and panels.",
      "Flashing at chimneys, walls and vents, where most leaks start.",
      "Gutters and downspouts: clogs, sagging runs and water near the house.",
      "Signs of leaks and storm damage, including fallen limbs.",
    ]}
    quickSteps={[
      { title: "Tell us about the property", detail: "Call the office or send your contact details. Tell us when you are away and how to reach the house." },
      { title: "We check the roof", detail: "A Highlander roofer looks over the roof, flashing and gutters and photographs what we find." },
      { title: "You get the photos", detail: "If anything needs work, you get a written scope and price. Nothing is repaired without your approval." },
    ]}
    trustBullets={[
      "Ice, wind and fallen limbs do the most damage while nobody is home",
      "Photos of what we found, sent to you",
      "A written scope and price before any repair",
    ]}
    reviewId="david-christopher-2026"
    faqs={[
      {
        question: "Is the roof check free?",
        answer: "No. It is a paid visit. The office gives you the price on the call, before the check is scheduled.",
      },
      {
        question: "Do I need to be there?",
        answer: "No. Tell us how to reach the property and how you want to receive the photos, by email or text.",
      },
      {
        question: "What happens if you find a problem?",
        answer: "You get photos and a written scope and price for the repair. Nothing is repaired without your approval.",
      },
      {
        question: "Can you check the roof after a storm?",
        answer: "Yes. Call the office after a storm and tell us what happened. Storm damage is documented with photos you can use in the conversation with your insurer.",
      },
    ]}
  />
);

export default RoofCheckAds;
