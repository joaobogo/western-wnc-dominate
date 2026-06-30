import lukeImg from "@/assets/team/luke-smith.png";
import kristyImg from "@/assets/team/kristy-smith.png";
import davidImg from "@/assets/team/david-bourque.png";
import derekImg from "@/assets/team/derek-wallace.png";
import robertImg from "@/assets/team/robert-harrison.png";
import kyleImg from "@/assets/team/kyle-poindexter.png";
import prestonImg from "@/assets/team/preston-lopes.png";
import alexImg from "@/assets/team/alex-hurst.png";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string[];
  details: { label: string; value: string }[];
  note?: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "luke-smith",
    name: "Luke Smith",
    role: "Owner & Founder",
    image: lukeImg,
    alt: "Luke Smith, Owner & Founder at Highlander Roofing Services",
    bio: [
      "Luke's roots in roofing and construction go back to the 1980s, when he first started learning the trades hands-on. That decades-long foundation shaped the standards, craftsmanship, and work ethic that define Highlander Roofing Services today.",
      "Across decades in the trade, Luke has built and led Highlander locally throughout Western North Carolina, delivering dependable roofing and construction solutions with a focus on quality workmanship, honest communication, and lasting relationships in the communities Highlander serves.",
      "As the company owner, Luke remains actively involved in daily operations, customer relations, and ensuring every project reflects Highlander's standards. Beyond the business, he is deeply involved in local organizations and community service initiatives across Franklin, Highlands, Cashiers, and the surrounding areas.",
      "When he's not working with customers or managing projects, Luke enjoys training for and running marathons and spending time with family and friends in the mountains of Western North Carolina.",
    ],
    details: [
      { label: "Industry Experience", value: "Roofing & Construction Since the 1980s" },
      { label: "Leading Highlander Locally", value: "Decades in Western NC" },
      { label: "Specialty", value: "Customer Relations & Company Leadership" },
      { label: "Favorite Part of the Job", value: "Helping homeowners protect their most valuable investment" },
      { label: "Community Involvement", value: "Active in local organizations and community service initiatives" },
    ],
  },
  {
    slug: "kristy-smith",
    name: "Kristy Smith",
    role: "Owner & Financial Manager",
    image: kristyImg,
    alt: "Kristy Smith, Owner & Financial Manager at Highlander Roofing Services",
    bio: [
      "Kristy plays a vital role in the daily operations of Highlander Roofing Services, overseeing the company's bookkeeping, accounting, and financial management. Her attention to detail and organizational skills help ensure the company operates efficiently while maintaining the high standards customers have come to expect.",
      "Outside of the office, Kristy is deeply committed to serving the local community. She is actively involved with numerous organizations throughout Franklin and Highlands and has a strong passion for community service. Her involvement with Rotary and other local initiatives reflects her dedication to making a positive impact throughout Western North Carolina.",
      "When she isn't managing the financial side of the business, Kristy enjoys volunteering and supporting projects that strengthen the communities Highlander Roofing Services proudly serves.",
    ],
    details: [
      { label: "Specialty", value: "Accounting & Financial Management" },
      { label: "Favorite Part of the Job", value: "Supporting the growth of a locally owned business" },
      { label: "Community Involvement", value: "Rotary and local service organizations" },
      { label: "Focus", value: "Operational Excellence & Customer Support" },
    ],
  },
  {
    slug: "david-bourque",
    name: "David Bourque",
    role: "Sales Manager",
    image: davidImg,
    alt: "David Bourque, Sales Manager at Highlander Roofing Services",
    bio: [
      "David leads Highlander Roofing Services' sales team and works directly with homeowners to help them navigate roofing projects with confidence. His focus is on understanding each customer's needs, providing clear recommendations, and ensuring every client receives the information necessary to make informed decisions about their property.",
      "As Sales Manager, David is committed to creating a positive customer experience from the initial consultation through project completion. He takes pride in building strong relationships and helping homeowners find solutions that best fit their homes and long-term goals.",
      "David's dedication to communication, professionalism, and customer service helps make the roofing process straightforward and stress-free for Highlander's clients.",
    ],
    details: [
      { label: "Specialty", value: "Roofing Consultations & Customer Solutions" },
      { label: "Role", value: "Sales Team Leadership" },
      { label: "Favorite Part of the Job", value: "Helping homeowners make informed decisions" },
      { label: "Focus", value: "Customer Experience & Communication" },
    ],
  },
  {
    slug: "derek-wallace",
    name: "Derek Wallace",
    role: "Roofing Consultant",
    image: derekImg,
    alt: "Derek Wallace, Roofing Consultant at Highlander Roofing Services",
    bio: [
      "Derek works closely with homeowners throughout Western North Carolina to evaluate roofing needs, explain available options, and provide practical solutions tailored to each property. He believes in honest communication and helping customers feel comfortable throughout every stage of the roofing process.",
      "His commitment to teamwork extends beyond the workplace. Derek is actively involved in youth sports, coaching baseball and football teams and helping young athletes develop skills, confidence, and sportsmanship. Those same values of leadership and dedication carry over into his work with Highlander Roofing Services.",
      "When he's not meeting with customers, Derek can often be found on the ball field supporting and coaching local youth sports programs.",
    ],
    details: [
      { label: "Specialty", value: "Residential Roofing Consultations" },
      { label: "Favorite Part of the Job", value: "Building relationships with homeowners" },
      { label: "Community Involvement", value: "Youth Baseball & Football Coach" },
      { label: "Focus", value: "Honest Guidance & Customer Service" },
    ],
  },
  {
    slug: "robert-harrison",
    name: "Robert Harrison",
    role: "Commercial Roofing Specialist & Inspector",
    image: robertImg,
    alt: "Robert Harrison, Commercial Roofing Specialist & Inspector at Highlander Roofing Services",
    bio: [
      "With more than 40 years of experience in the roofing industry, Robert brings a wealth of knowledge and expertise to Highlander Roofing Services. Before relocating to the mountains of Western North Carolina, he successfully owned and operated his own roofing company in Florida, gaining extensive experience across a wide range of residential and commercial roofing systems.",
      "Today, Robert serves as Highlander's commercial roofing expert, safety coordinator, and roof inspection specialist. Whether evaluating complex commercial roofing projects, conducting detailed roof inspections, or helping maintain safety standards across job sites, Robert's experience provides tremendous value to both customers and the company.",
      "His decades of industry knowledge make him a trusted resource for property owners seeking professional evaluations and expert guidance.",
    ],
    details: [
      { label: "Experience", value: "40+ Years in Roofing" },
      { label: "Specialty", value: "Commercial Roofing Systems" },
      { label: "Additional Roles", value: "Safety Coordinator & Roof Inspector" },
      { label: "Favorite Part of the Job", value: "Solving challenging roofing problems" },
    ],
  },
  {
    slug: "kyle-poindexter",
    name: "Kyle Poindexter",
    role: "Senior Roofing Project Manager",
    image: kyleImg,
    alt: "Kyle Poindexter, Senior Roofing Project Manager at Highlander Roofing Services",
    bio: [
      "Kyle serves as Highlander Roofing Services' Senior Roofing Project Manager and Scheduling Coordinator. With five years of industry experience, he plays a key role in coordinating projects, managing schedules, and ensuring roofing installations are completed efficiently and to Highlander's quality standards.",
      "Kyle works closely with homeowners, crews, suppliers, and office staff to keep projects organized and moving forward smoothly. His ability to coordinate multiple moving parts helps provide customers with a positive experience from material delivery through project completion.",
      "His attention to detail and commitment to communication help ensure that every project receives the care and oversight it deserves.",
    ],
    details: [
      { label: "Experience", value: "5 Years" },
      { label: "Specialty", value: "Project Coordination & Scheduling" },
      { label: "Role", value: "Senior Roofing Project Manager" },
      { label: "Favorite Part of the Job", value: "Seeing projects successfully completed" },
    ],
  },
  {
    slug: "preston-lopes",
    name: "Preston Lopes",
    role: "Roofing Project Manager",
    image: prestonImg,
    alt: "Preston Lopes, Roofing Project Manager at Highlander Roofing Services",
    bio: [
      "Preston helps oversee roofing projects from start to finish, ensuring customers receive the quality workmanship and service Highlander Roofing Services is known for. With two years of industry experience, he works closely with crews and homeowners to keep projects running smoothly and efficiently.",
      "In addition to his project management responsibilities, Preston is our drone pilot who assists with aerial inspections, project documentation, and roof evaluations. His use of drone technology helps provide customers with detailed views of their roofing systems while improving project planning and communication.",
      "Outside of work, Preston enjoys cooking and experimenting with new recipes whenever he has the opportunity.",
    ],
    details: [
      { label: "Experience", value: "2 Years" },
      { label: "Specialty", value: "Project Management & Drone Operations" },
      { label: "Favorite Part of the Job", value: "Seeing projects come together from start to finish" },
      { label: "Personal Interest", value: "Cooking & Culinary Exploration" },
    ],
  },
  {
    slug: "alex-hurst",
    name: "Alex Hurst",
    role: "Roofing Repairs Project Manager",
    image: alexImg,
    alt: "Alex Hurst, Roofing Repairs Project Manager at Highlander Roofing Services",
    bio: [
      "Alex specializes in managing roofing repair projects, helping homeowners address everything from leaks and storm damage to general roofing concerns. With three years of industry experience, he works diligently to ensure repair projects are completed efficiently while maintaining Highlander's commitment to quality and customer service.",
      "Alex understands that roof repairs often occur during stressful situations, which is why he focuses on clear communication and helping homeowners feel informed throughout the repair process.",
      "Away from work, Alex enjoys coaching baseball and football for his son and is known around the office for his appreciation of a good donut. His dedication to family, community involvement, and teamwork carries over into every project he manages.",
    ],
    details: [
      { label: "Experience", value: "3 Years" },
      { label: "Specialty", value: "Roof Repairs & Service Projects" },
      { label: "Community Involvement", value: "Youth Baseball & Football Coach" },
      { label: "Favorite Part of the Job", value: "Helping homeowners solve roofing problems quickly and effectively" },
    ],
  },
];

export const getTeamMember = (slug: string) =>
  teamMembers.find((m) => m.slug === slug);