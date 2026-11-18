import FocusedServicePage from "@/components/service/FocusedServicePage";
import roomImg from "@/assets/gallery/addition-franklin-vaulted-room.webp";

const BathroomRemodeling = () => (
  <FocusedServicePage
    path="/construction/bathroom-remodeling"
    name="Bathroom Remodeling"
    seoTitle="Bathroom Remodeling in Western NC | Highlander"
    seoDescription="Bathroom remodels for Western North Carolina homes: primary baths, guest baths, tile, vanities, plumbing changes and ventilation from a licensed contractor."
    parent={{ name: "Renovations", url: "/construction/renovations" }}
    eyebrow="Bathroom remodeling · Western North Carolina"
    h1="Bathroom Remodeling in Western NC"
    intro="Primary baths, guest baths and powder rooms rebuilt to work better, with the moisture and ventilation details done right behind the finishes."
    image={{ src: roomImg, alt: "Finished vaulted room inside a Highlander home project in Franklin, North Carolina", width: 1500, height: 844 }}
    quick={{ question: "What does a Highlander bathroom remodel include?", answer: "A bathroom remodel can cover tile work, vanities, plumbing relocation and ventilation upgrades, for primary baths, guest baths and powder rooms. Highlander is a licensed general contractor, and the scope and price are set out in writing before work begins." }}
    scopeEyebrow="What we rebuild"
    scopeHeading="A better bathroom starts behind the tile"
    scope={[
      { title: "Primary baths", text: "Larger rework of the shower, vanity and layout for the room you use every day." },
      { title: "Guest baths", text: "Durable updates for family, visitors or a second home." },
      { title: "Powder rooms", text: "Small rooms where layout and finishes make the difference." },
      { title: "Tile and showers", text: "Tile work planned with the waterproofing underneath it." },
      { title: "Plumbing changes", text: "Moving fixtures when the layout calls for it." },
      { title: "Ventilation", text: "Moving moisture out of the room so finishes and framing last." },
    ]}
    decisionsHeading="What shapes the scope and the price"
    decisions={["Whether fixtures stay or move", "Shower, tub and tile selections", "Condition of the floor and framing once opened", "Ventilation that needs upgrading", "Whether it is the only bathroom in the home"]}
    steps={[
      { title: "Call the office", text: "Tell us what you want to change and how the space works today." },
      { title: "We see the space", text: "We look at the room, the structure and the systems behind the walls." },
      { title: "Written scope", text: "You get the work, the selections to make and the price in writing." },
      { title: "Build and walkthrough", text: "The work is scheduled, built and walked through with you at the end." },
    ]}
    faqs={[
      { question: "Can you move the shower or toilet?", answer: "Often, yes. It depends on the framing and plumbing in your home, which we check before writing the scope." },
      { question: "What if you find damage behind the walls?", answer: "We show you what we found and what it changes before going further, so there are no quiet additions to the job." },
      { question: "Can you remodel a bathroom in a second home?", answer: "Yes. Tell us how to reach the property and how you would like updates while you are away." },
      { question: "What will it cost?", answer: "It depends on the size of the room, plumbing changes and selections. You get a written scope and price after we see the space." },
    ]}
    related={[{ label: "All renovations", href: "/construction/renovations" }, { label: "Kitchen remodeling", href: "/construction/kitchen-remodeling" }, { label: "Design & planning", href: "/construction/design" }, { label: "Financing", href: "/financing" }]}
    closingHeading="Ready to talk through your bathroom?"
    topic="renovations"
    ctaId="bathroom"
  />
);

export default BathroomRemodeling;
