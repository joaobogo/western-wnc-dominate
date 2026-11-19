import FocusedServicePage from "@/components/service/FocusedServicePage";

const BathroomRemodeling = () => (
  <FocusedServicePage
    path="/construction/bathroom-remodeling"
    name="Bathroom Remodeling"
    seoTitle="Bathroom Remodeling in Western NC | Highlander"
    seoDescription="Bathroom remodeling for Western NC mountain homes: showers, tubs, tile, vanities and accessibility updates. One local team from design to finish."
    parent={{ name: "Renovations", url: "/construction/renovations" }}
    eyebrow="Bathroom remodeling · Western North Carolina"
    h1="Bathroom Remodeling for Western North Carolina Homes"
    intro="Showers, tubs, tile, vanities and accessibility updates from one local team, with the moisture and ventilation details done right behind the finishes."
    showTowns
    local={{
      heading: "Bathrooms in mountain homes",
      paragraphs: [
        "Humid mountain summers put moisture into every bathroom. A remodel is the time to make sure the fan actually moves air out of the house and that the waterproofing behind the tile is done properly, so finishes and framing last.",
        "Homes that sit empty through the winter carry a frozen-pipe risk. When a bathroom is opened up, we look at where the supply lines run and how exposed they are.",
        "Many cabin bathrooms are small and dated. Others belong to owners planning to stay in the home as they get older, where a curbless shower or grab bars anchored into the framing make the room safer.",
      ],
    }}
    quick={{ question: "What does a Highlander bathroom remodel include?", answer: "A bathroom remodel can cover tile work, vanities, plumbing relocation and ventilation upgrades, for primary baths, guest baths and powder rooms. Highlander is a licensed general contractor, and the scope and price are set out in writing before work begins." }}
    scopeEyebrow="What we rebuild"
    scopeHeading="A better bathroom starts behind the tile"
    scope={[
      { title: "Showers and tub conversions", text: "New showers, including converting a tub into a walk-in shower." },
      { title: "Tile", text: "Floors and walls, planned with the waterproofing underneath them." },
      { title: "Vanities and storage", text: "Vanities, counters and storage sized for the room." },
      { title: "Lighting and ventilation", text: "Light where you need it and a fan that moves moisture out of the house." },
      { title: "Plumbing", text: "Moving or replacing fixtures when the layout calls for it." },
      { title: "Accessibility", text: "Grab bars anchored into the framing and curbless or low-threshold showers." },
    ]}
    decisionsHeading="What shapes the scope and the price"
    decisions={["Whether fixtures stay or move", "Shower, tub and tile selections", "Condition of the floor and framing once opened", "Ventilation that needs upgrading", "Whether it is the only bathroom in the home"]}
    steps={[
      { title: "Consultation", text: "Tell us what you want to change. We look at the room, the plumbing and the ventilation." },
      { title: "Design session", text: "Layout, shower, tile and fixtures planned together with Highlander's design and planning team." },
      { title: "Written estimate", text: "You get the work, the selections to make and the price in writing before anything starts." },
      { title: "Build and walkthrough", text: "The work is scheduled and built, then walked through with you at the end." },
    ]}
    faqs={[
      { question: "How long does a bathroom remodel take?", answer: "It depends on the scope: moving plumbing, the amount of tile and what we find once the room is opened all affect the schedule. Your written estimate sets out the schedule before work starts." },
      { question: "Can you convert my tub into a walk-in shower?", answer: "In most bathrooms, yes. It depends on the floor framing and where the drain can go, which we check before writing the scope." },
      { question: "Do you make bathrooms safer for aging in place?", answer: "Yes. Grab bars anchored into the framing, curbless or low-threshold showers and better lighting can all be part of the scope." },
      { question: "Will my bathroom be usable during the remodel if it's my only one?", answer: "Tell us at the start if it is the only bathroom in the home. We plan the schedule around that and tell you in advance which days the room will be out of use." },
      { question: "Do I need a permit for a bathroom remodel in Western NC?", answer: "When a permit is required and included in Highlander's scope, the project team coordinates the applicable permit and inspection steps with the county. Requirements are confirmed for your specific property before work starts." },
    ]}
    related={[{ label: "All renovations", href: "/construction/renovations" }, { label: "Kitchen remodeling", href: "/construction/kitchen-remodeling" }, { label: "Design & planning", href: "/construction/design" }, { label: "Financing", href: "/financing" }, { label: "Reviews", href: "/reviews" }]}
    closingHeading="Ready to talk through your bathroom?"
    topic="renovations"
    ctaId="bathroom"
  />
);

export default BathroomRemodeling;
