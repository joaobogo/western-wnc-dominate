export interface LocalBlogTopic {
  townSlug: string;
  topics: {
    title: string;
    description: string;
    serviceCategory: 'roofing' | 'construction' | 'both';
  }[];
}

export const localBlogTopics: LocalBlogTopic[] = [
  {
    townSlug: "highlands-nc",
    topics: [
      {
        title: "Building at 4,000 Feet: The Reality of Highlands Construction",
        description: "Why standard building codes aren't enough for the Highlands microclimate and what we do differently.",
        serviceCategory: "construction"
      },
      {
        title: "Highlands Roofing: Why 30-Year Shingles Only Last 20 Years on the Plateau",
        description: "An honest look at UV and moisture degradation on the plateau and how to extend your roof's life.",
        serviceCategory: "roofing"
      }
    ]
  },
  {
    townSlug: "cashiers-nc",
    topics: [
      {
        title: "Managing 80 Inches of Rain: Cashiers Drainage and Roofing Systems",
        description: "How to prevent foundation issues and roof leaks in one of America's wettest towns.",
        serviceCategory: "both"
      },
      {
        title: "The 'Mountain Room': Why Screened Porches are Essential in Cashiers",
        description: "Maximizing the rainforest vibe while staying dry and comfortable.",
        serviceCategory: "construction"
      }
    ]
  },
  {
    townSlug: "franklin-nc",
    topics: [
      {
        title: "Franklin Home Additions: Macon County Permitting and Process",
        description: "A local's guide to expanding your footprint in the Little Tennessee River Valley.",
        serviceCategory: "construction"
      },
      {
        title: "Storm Ready: Common Roof Weak Points in Franklin Valley Homes",
        description: "How valley wind patterns affect shingle lifespan and how to prepare for seasonal storms.",
        serviceCategory: "roofing"
      }
    ]
  },
  {
    townSlug: "sylva-nc",
    topics: [
      {
        title: "Historic Preservation in Sylva: Roofing & Facade Standards",
        description: "Navigating Jackson County's historic district requirements while modernizing your property.",
        serviceCategory: "both"
      },
      {
        title: "Combating Algae: Why Sylva Valley Roofs Turn Black",
        description: "Understanding the science of roof streaks in humid valley environments and how to prevent them.",
        serviceCategory: "roofing"
      }
    ]
  },
  {
    townSlug: "bryson-city-nc",
    topics: [
      {
        title: "The Rental-Ready Roof: Bryson City Maintenance Strategies",
        description: "How to minimize guest disruption with proactive inspections between Smoky Mountain booking seasons.",
        serviceCategory: "roofing"
      },
      {
        title: "Smoky Mountain Porch Upgrades: Safety & Durability for Rentals",
        description: "Ensuring your high-traffic vacation home meets structural safety standards for mountain terrain.",
        serviceCategory: "construction"
      }
    ]
  },
  {
    townSlug: "waynesville-nc",
    topics: [
      {
        title: "Waynesville Winter Prep: Attic Ventilation and Ice Damming",
        description: "Why Haywood County winters demand specialized attic airflow to prevent interior water damage.",
        serviceCategory: "roofing"
      },
      {
        title: "Master Suite Additions in Waynesville's Historic Neighborhoods",
        description: "Expanding your square footage while honoring the unique architectural DNA of Waynesville.",
        serviceCategory: "construction"
      }
    ]
  },
  {
    townSlug: "cullowhee-nc",
    topics: [
      {
        title: "Cullowhee Multi-Unit Maintenance: Maximizing Asset Longevity",
        description: "A property manager's guide to roofing and deck safety in university-proximate rental markets.",
        serviceCategory: "both"
      }
    ]
  },
  {
    townSlug: "dillsboro-nc",
    topics: [
      {
        title: "Cottage Charm & Structural Integrity: Dillsboro Renovation Tips",
        description: "Balancing artisan village aesthetics with modern moisture-management systems.",
        serviceCategory: "both"
      }
    ]
  }
];

