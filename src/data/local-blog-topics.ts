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
      }
    ]
  }
];
