---
name: Schema & Structured Data Strategy
description: Complete JSON-LD schema system with LocalBusiness, Service, FAQ, Article, Breadcrumb, Review, Organization, and WebPage markup per page type
type: feature
---

# Schema & Structured Data Strategy — Highlander Roofing & Construction

## Philosophy

Structured data makes the site machine-readable without being machine-written. Every schema type serves a specific search feature (rich snippets, knowledge panel, local pack) and is only applied where content genuinely supports it.

---

## I. Schema Types & Placement Map

| Schema Type | Pages Applied | Search Feature Targeted |
|-------------|--------------|------------------------|
| LocalBusiness | Homepage, Contact, Town pages | Local pack, knowledge panel |
| Organization | Homepage (sitewide via script) | Knowledge panel, brand SERP |
| Service | Service pages | Service rich results |
| FAQPage | Any page with FAQ section | FAQ rich snippets |
| Article | Blog posts | Article rich results |
| BreadcrumbList | All pages except homepage | Breadcrumb display in SERPs |
| AggregateRating | Homepage, service pages | Star rating in SERPs |
| WebPage | All pages | General page understanding |
| HowTo | Process/guide content | How-to rich results |
| ImageObject | Project pages, gallery | Image search enhancement |

---

## II. Schema Definitions Per Page Type

### Homepage

```json
[
  {
    "@context": "https://schema.org",
    "@type": ["RoofingContractor", "GeneralContractor"],
    "name": "Highlander Roofing & Construction",
    "url": "https://highlanderroofingwnc.com",
    "logo": "https://highlanderroofingwnc.com/logo.png",
    "image": "https://highlanderroofingwnc.com/og-image.jpg",
    "description": "Western North Carolina's trusted roofing and construction company. CertainTeed Master Shingle Applicator serving Franklin, Sylva, and the Blue Ridge region.",
    "telephone": "+1-828-524-7773",
    "email": "info@highlanderroofingwnc.com",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "[Franklin Office Address]",
        "addressLocality": "Franklin",
        "addressRegion": "NC",
        "postalCode": "[ZIP]",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "[Sylva Office Address]",
        "addressLocality": "Sylva",
        "addressRegion": "NC",
        "postalCode": "[ZIP]",
        "addressCountry": "US"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "[lat]",
      "longitude": "[lng]"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "[lat]", "longitude": "[lng]" },
      "geoRadius": "50 mi"
    },
    "openingHours": "Mo-Fr 07:00-18:00, Sa 08:00-14:00",
    "priceRange": "$$-$$$",
    "sameAs": [
      "https://www.facebook.com/highlanderroofing",
      "https://www.instagram.com/highlanderroofing",
      "https://www.google.com/maps/place/..."
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Certification",
        "name": "CertainTeed Master Shingle Applicator"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "License",
        "name": "NC Licensed General Contractor"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200",
      "bestRating": "5"
    }
  },
  {
    "@type": "WebPage",
    "name": "Highlander Roofing & Construction — Franklin & Sylva, NC",
    "description": "...",
    "url": "https://highlanderroofingwnc.com"
  }
]
```

### Service Pages (e.g., Roof Replacement)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Residential Roof Replacement",
    "description": "Complete tear-off and replacement of residential roofing systems in Western NC. Asphalt, metal, cedar shake options available.",
    "provider": {
      "@type": "RoofingContractor",
      "name": "Highlander Roofing & Construction",
      "url": "https://highlanderroofingwnc.com"
    },
    "areaServed": {
      "@type": "State",
      "name": "North Carolina",
      "containsPlace": [
        { "@type": "City", "name": "Franklin" },
        { "@type": "City", "name": "Sylva" },
        { "@type": "City", "name": "Waynesville" }
      ]
    },
    "serviceType": "Roof Replacement",
    "category": "Roofing"
  },
  {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does a roof replacement take in WNC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most residential roof replacements take 2-4 days depending on roof size, pitch, and weather conditions in the Western NC mountains."
        }
      }
    ]
  },
  {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://highlanderroofingwnc.com" },
      { "@type": "ListItem", "position": 2, "name": "Roofing", "item": "https://highlanderroofingwnc.com/roofing" },
      { "@type": "ListItem", "position": 3, "name": "Roof Replacement", "item": "https://highlanderroofingwnc.com/services/roof-replacement" }
    ]
  }
]
```

### Town/Location Pages

```json
[
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Highlander Roofing & Construction — Franklin, NC",
    "description": "Roofing and construction services in Franklin, NC. Serving Macon County with roof replacement, repair, additions, and renovations.",
    "telephone": "+1-828-524-7773",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Franklin",
      "addressRegion": "NC",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "[Franklin lat]",
      "longitude": "[Franklin lng]"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Highlander Roofing & Construction",
      "url": "https://highlanderroofingwnc.com"
    }
  },
  {
    "@type": "FAQPage",
    "mainEntity": [...]
  },
  {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "position": 1, "name": "Home", "item": "..." },
      { "position": 2, "name": "Service Areas", "item": ".../service-areas" },
      { "position": 3, "name": "Franklin, NC", "item": ".../service-areas/franklin-nc" }
    ]
  }
]
```

### Blog Articles

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Metal vs Asphalt Roofing: Which is Right for Your Mountain Home?",
    "description": "Compare metal and asphalt roofing for Western NC mountain homes. Cost, lifespan, performance, and which works best at elevation.",
    "author": {
      "@type": "Person",
      "name": "[Author Name]",
      "jobTitle": "[Role]",
      "worksFor": {
        "@type": "Organization",
        "name": "Highlander Roofing & Construction"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Highlander Roofing & Construction",
      "logo": { "@type": "ImageObject", "url": "https://highlanderroofingwnc.com/logo.png" }
    },
    "datePublished": "2026-03-15",
    "dateModified": "2026-03-15",
    "image": "https://highlanderroofingwnc.com/blog/metal-vs-asphalt.webp",
    "mainEntityOfPage": "https://highlanderroofingwnc.com/blog/metal-vs-asphalt-roofing"
  },
  {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "position": 1, "name": "Home", "item": "..." },
      { "position": 2, "name": "Blog", "item": ".../blog" },
      { "position": 3, "name": "Metal vs Asphalt Roofing", "item": ".../blog/metal-vs-asphalt-roofing" }
    ]
  }
]
```

### Project / Case Study Pages

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Complete Roof Replacement — Mountain Home in Franklin, NC",
  "description": "Full tear-off and CertainTeed Landmark Pro installation on a 2,800 sq ft home in Franklin, NC.",
  "creator": {
    "@type": "Organization",
    "name": "Highlander Roofing & Construction"
  },
  "locationCreated": {
    "@type": "Place",
    "address": { "@type": "PostalAddress", "addressLocality": "Franklin", "addressRegion": "NC" }
  },
  "image": ["photo1.webp", "photo2.webp"],
  "dateCreated": "2026-02-10"
}
```

### About / Team Page

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Highlander Roofing & Construction",
  "description": "Learn about Highlander's team, history, certifications, and commitment to Western NC homeowners.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Highlander Roofing & Construction",
    "foundingDate": "[year]",
    "foundingLocation": "Franklin, NC",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": "[count]" },
    "member": [
      {
        "@type": "Person",
        "name": "[Owner Name]",
        "jobTitle": "Owner",
        "image": "..."
      }
    ]
  }
}
```

### Quote / Contact Pages

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Request a Free Roof Assessment",
  "description": "Schedule a free, no-obligation roofing or construction consultation with Highlander. Serving Franklin, Sylva, and Western NC.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Highlander Roofing & Construction",
    "telephone": "+1-828-524-7773",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-828-524-7773",
      "contactType": "Sales",
      "availableLanguage": "English",
      "areaServed": "Western North Carolina"
    }
  }
}
```

---

## III. Implementation Guidelines

### Injection Method
- Use `<script type="application/ld+json">` in `<head>` via React Helmet or a `useEffect` in page components
- One `<script>` tag per schema graph (can contain array of types)
- Validate with Google's Rich Results Test before deploying

### Schema Rules
1. **Only mark up visible content** — don't add schema for content not on the page
2. **AggregateRating** only on pages that display reviews or ratings
3. **FAQPage** only on pages with visible FAQ accordion
4. **No review schema for individual reviews** unless they're first-party and verifiable
5. **Keep schema updated** — if review count changes, update the schema
6. **Test quarterly** with Google Search Console's "Enhancements" reports

### Schema NOT to Use
- ❌ `Product` (Highlander sells services, not products)
- ❌ `Offer` with specific prices (prices vary by project)
- ❌ `Event` (unless hosting actual events)
- ❌ `VideoObject` (unless hosting actual video content)
- ❌ Self-serving `Review` markup (Google penalizes this)

---

## IV. Rich Result Targets

| Feature | Schema Required | Expected Pages |
|---------|----------------|----------------|
| Local Pack | LocalBusiness + GBP | Homepage, town pages |
| FAQ Snippets | FAQPage | Service pages, town pages |
| Breadcrumbs | BreadcrumbList | All pages except homepage |
| Article Results | Article | Blog posts |
| Star Rating | AggregateRating | Homepage, service pages |
| Knowledge Panel | Organization + sameAs | Brand SERP |
| How-To Snippets | HowTo | Process/guide blog posts |
| Image Pack | ImageObject + alt text | Project pages, gallery |
