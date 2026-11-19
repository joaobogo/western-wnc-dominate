import PaidAdsLanding from "@/components/PaidAdsLanding";
import heroImg from "@/assets/gallery/addition-franklin-vaulted-room.webp";
import roomSet from "@/assets/gallery/addition-franklin-vaulted-room.webp?w=640;960;1280&format=webp&as=srcset";
import windowsImg from "@/assets/gallery/addition-franklin-gable-windows.webp";
import windowsSet from "@/assets/gallery/addition-franklin-gable-windows.webp?w=480;800&format=webp&as=srcset";

const KITCHEN_LIVING = "/media/highlander-renovated-kitchen-living.webp";
const KITCHEN_LIVING_SET =
  "/media/highlander-renovated-kitchen-living-640.webp 640w, /media/highlander-renovated-kitchen-living-960.webp 960w, /media/highlander-renovated-kitchen-living.webp 1600w";

/** /lp/renovations: noindex paid landing page (John's 404 fix guide, HL-065). */
const RenovationsAds = () => (
  <PaidAdsLanding
    title="Home Renovations in Western NC | Highlander"
    description="Renovate your Western NC home: open layouts, kitchens, baths and full remodels by one local design-build team, with the scope and price in writing first."
    path="/lp/renovations"
    serviceName="Home Renovations"
    serviceCategory="construction"
    reviewLabel="What a customer said"
    recentWork={{
      heading: "Highlander interior work in Western NC.",
      items: [
        { town: "Western NC", title: "Kitchen and living area", image: { src: KITCHEN_LIVING, srcSet: KITCHEN_LIVING_SET, alt: "Mountain-home kitchen and living area with wood beams and a stone fireplace", width: 1600, height: 900 } },
        { town: "Franklin, NC", title: "Vaulted living room", image: { src: heroImg, srcSet: roomSet, alt: "Vaulted living room with a wall of windows by Highlander in Franklin, North Carolina", width: 1500, height: 844 } },
        { town: "Franklin, NC", title: "Gable wall of windows", image: { src: windowsImg, srcSet: windowsSet, alt: "Tall gable windows in a Highlander project in Franklin, North Carolina", width: 1200, height: 1600 } },
      ],
    }}
    heroImage={KITCHEN_LIVING}
    heroAlt="Mountain-home kitchen and living area with wood beams and a stone fireplace"
    eyebrow="Home renovations · Western North Carolina"
    headline="Renovate Your Mountain Home with One Local Team"
    subheadline="Kitchens, bathrooms, open floor plans and whole-home updates, designed and built by one local team, with the scope and price in writing first."
    ctaLabel="Plan My Renovation"
    urgencyOptions={["Ready to start planning", "Within the next few months", "This year", "Just exploring ideas"]}
    trustStats={[
      { value: "One team", label: "Design and build", detail: "Planning and construction together" },
      { value: "Written", label: "Scope and price", detail: "In writing before work starts" },
      { value: "NC GC", label: "Licensed contractor", detail: "North Carolina General Contractor" },
      { value: "2017", label: "Serving WNC", detail: "Family-owned and locally run" },
    ]}
    highlights={[
      "Kitchens: new layouts, cabinets, counters and the plumbing and electrical behind them.",
      "Bathrooms: showers, tile, vanities and accessibility updates.",
      "Open floor plans, with the structure checked before any wall comes out.",
      "Whole-home updates for older mountain houses and second homes.",
    ]}
    quickSteps={[
      { title: "Consultation", detail: "Call the office or send your contact details. Tell us which rooms you want to change." },
      { title: "Design session", detail: "Layouts, selections and feasibility planned with Highlander's design and planning team." },
      { title: "Written estimate, then build", detail: "You approve the scope and price in writing before work is scheduled." },
    ]}
    trustBullets={[
      "Design and build by one local team",
      "Structure checked before walls come out",
      "Scope and price in writing before work starts",
    ]}
    reviewId="candy-wood-2025"
    faqs={[
      {
        question: "Can you remodel while I'm away from my second home?",
        answer: "Yes. Tell us how to reach the property and how you want to hear about progress, and we can send photo updates while the work is underway.",
      },
      {
        question: "Can you open up walls to change the layout?",
        answer: "Often. Whether a wall can come out depends on what it carries. We check the structure first, and any beam or support needed is part of the written scope.",
      },
      {
        question: "Do you handle design?",
        answer: "Yes. Highlander offers in-house design and planning for remodels, including layouts and feasibility. If you already have plans, we can work from them.",
      },
      {
        question: "What will it cost?",
        answer: "It depends on the rooms, the layout changes and your selections. You get a written scope and price after we see the house.",
      },
    ]}
  />
);

export default RenovationsAds;
