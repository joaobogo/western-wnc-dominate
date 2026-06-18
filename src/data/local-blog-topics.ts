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
        title: "Highlands Roofing: Why Shingle Lifespan Is Shorter on the Plateau",
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
        description: "Expanding your square footage while honoring the unique design DNA of Waynesville.",
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
  },
  {
    townSlug: "asheville-nc",
    topics: [
      {
        title: "Asheville's Historic Districts: A Guide to ARB-Approved Roofing",
        description: "Navigating the complexities of Biltmore Forest and Montford design reviews for your next roof project.",
        serviceCategory: "roofing"
      },
      {
        title: "Mountain Modern Additions: Expanding Your Asheville Estate",
        description: "How to integrate sleek, modern footprints with the rugged topography of Western North Carolina.",
        serviceCategory: "construction"
      }
    ]
  },
  {
    townSlug: "hendersonville-nc",
    topics: [
      {
        title: "Hail-Resistant Roofing for the Hendersonville Plateau",
        description: "Why Class 4 shingles are the smartest investment for homes in Henderson County's storm-prone corridors.",
        serviceCategory: "roofing"
      },
      {
        title: "Aging in Place: Accessibility Renovations for Hendersonville Homes",
        description: "Transforming established residences into long-term accessible spaces without losing craftsman charm.",
        serviceCategory: "construction"
      }
    ]
  },
  {
    townSlug: "brevard-nc",
    topics: [
      {
        title: "The 90-Inch Reality: Waterproofing for the Land of Waterfalls",
        description: "Advanced underlayment and drainage strategies for Transylvania County's extreme rainfall profile.",
        serviceCategory: "roofing"
      },
      {
        title: "Trailside Living: Designing the Perfect Brevard Mudroom Addition",
        description: "Creating functional transitions for active Pisgah Forest mountain bikers and hikers.",
        serviceCategory: "construction"
      }
    ]
  },
  {
    townSlug: "lake-toxaway-nc",
    topics: [
      {
        title: "Luxury Roofing Systems for Lake Toxaway Estates",
        description: "Why Brava synthetic slate and copper accents are the preferred choice for premier private lake communities.",
        serviceCategory: "roofing"
      }
    ]
  },
  {
    townSlug: "murphy-nc",
    topics: [
      {
        title: "Durable Roofing for Western NC: Murphy's Best Material Choices",
        description: "A guide to selecting low-maintenance, high-performance systems for Cherokee County residences.",
        serviceCategory: "roofing"
      }
    ]
  },
  {
    townSlug: "black-mountain-nc",
    topics: [
      {
        title: "Artisan Construction: The Black Mountain Timber-Frame Legacy",
        description: "How we incorporate traditional joinery and heavy timber into modern mountain home expansions.",
        serviceCategory: "construction"
      }
    ]
  },
  {
    townSlug: "weaverville-nc",
    topics: [
      {
        title: "North Buncombe Ridgetop Roofing: Defending Against High Winds",
        description: "Engineering your roof for the specific physics of Weaverville's exposed ridgelines.",
        serviceCategory: "roofing"
      }
    ]
  },
  {
    townSlug: "marshall-nc",
    topics: [
      {
        title: "Preserving Madison County: Historic Riverside Renovations",
        description: "Challenges and strategies for structural modernization in Marshall's historic downtown core.",
        serviceCategory: "both"
      }
    ]
  },
  {
    townSlug: "hayesville-nc",
    topics: [
      {
        title: "Lakefront Life: Decking and Roofing for the Chatuge Basin",
        description: "Preventing rot and biological growth in Hayesville's high-humidity lake environments.",
        serviceCategory: "both"
      }
    ]
  }
];


