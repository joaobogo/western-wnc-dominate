---
name: Analytics & Conversion Tracking Framework
description: Complete tracking plan with conversion events, engagement metrics, attribution model, reporting structure, and iteration guidance
type: feature
---

# Analytics & Conversion Tracking Framework

## I. Conversion Event Hierarchy

### Tier 1: PRIMARY CONVERSIONS (Revenue-direct)
| Event | Trigger | Value | Priority |
|-------|---------|-------|----------|
| `quote_form_complete` | Quote/inspection form submitted | Highest | 🔴 Critical |
| `phone_call_click` | Click-to-call on any phone link | High | 🔴 Critical |
| `chatbot_handoff` | Chatbot routes to form/call | High | 🔴 Critical |
| `schedule_consultation` | Scheduling action completed | Highest | 🔴 Critical |

### Tier 2: MICRO-CONVERSIONS (Intent signals)
| Event | Trigger | Value | Priority |
|-------|---------|-------|----------|
| `quote_form_start` | First field interaction in quote form | Medium | 🟡 High |
| `quote_step_advance` | Each step completed in multi-step form | Medium | 🟡 High |
| `chatbot_open` | Chatbot widget opened | Low-Med | 🟡 High |
| `chatbot_message_sent` | User sends message in chatbot | Medium | 🟡 High |
| `tool_result_viewed` | Calculator/quiz result displayed | Medium | 🟡 High |
| `lead_magnet_download` | Guide/resource downloaded | Medium | 🟡 High |
| `service_cta_click` | Any CTA click on service pages | Medium | 🟡 High |

### Tier 3: ENGAGEMENT SIGNALS (Quality indicators)
| Event | Trigger | Value | Priority |
|-------|---------|-------|----------|
| `project_gallery_view` | Gallery page opened | Low | 🟢 Medium |
| `project_detail_view` | Individual project page opened | Low-Med | 🟢 Medium |
| `lightbox_open` | Gallery lightbox triggered | Low | 🟢 Medium |
| `before_after_interact` | Before/after slider used | Low | 🟢 Medium |
| `review_section_scroll` | Reviews section enters viewport | Low | 🟢 Medium |
| `blog_to_service_click` | Blog article → service page navigation | Medium | 🟢 Medium |
| `town_page_cta_click` | CTA click on location page | Medium | 🟢 Medium |
| `scroll_depth_75` | User scrolls past 75% of page | Low | 🟢 Medium |
| `time_on_page_60s` | User stays 60+ seconds | Low | 🟢 Medium |
| `pages_per_session_3` | User views 3+ pages | Low | 🟢 Medium |

---

## II. Event Data Structure

### Standard Event Payload
```typescript
interface TrackingEvent {
  event_name: string;
  event_category: 'conversion' | 'micro_conversion' | 'engagement';
  page_path: string;
  page_type: 'homepage' | 'service' | 'town' | 'blog' | 'project' | 'quote' | 'about' | 'tool';
  division: 'roofing' | 'construction' | 'general';
  device_type: 'mobile' | 'tablet' | 'desktop';
  traffic_source: string;
  session_page_count: number;
  timestamp: string;
  // Event-specific data
  metadata?: Record<string, string | number | boolean>;
}
```

### Event-Specific Metadata
| Event | Additional Data |
|-------|----------------|
| `quote_form_complete` | `{ service_type, town, project_timeline, source_page }` |
| `quote_step_advance` | `{ step_number, step_name, time_on_step_ms }` |
| `phone_call_click` | `{ source_component: 'header' | 'sticky_bar' | 'cta_block' | 'footer' }` |
| `chatbot_handoff` | `{ conversation_path, messages_exchanged, qualification_score }` |
| `tool_result_viewed` | `{ tool_name, result_value, lead_captured: boolean }` |
| `blog_to_service_click` | `{ article_slug, target_service, read_percentage }` |
| `service_cta_click` | `{ cta_text, cta_position: 'hero' | 'mid' | 'end', service_name }` |

---

## III. Tracking Implementation

### Client-Side Event Firing
```typescript
// Utility function
export const trackEvent = (
  name: string,
  category: TrackingEvent['event_category'],
  metadata?: Record<string, string | number | boolean>
) => {
  const event: TrackingEvent = {
    event_name: name,
    event_category: category,
    page_path: window.location.pathname,
    page_type: getPageType(window.location.pathname),
    division: getDivision(window.location.pathname),
    device_type: getDeviceType(),
    traffic_source: getTrafficSource(),
    session_page_count: getSessionPageCount(),
    timestamp: new Date().toISOString(),
    metadata,
  };

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', name, { ...metadata, event_category: category });
  }

  // Optional: Supabase analytics table
  // supabase.from('analytics_events').insert(event);
};
```

### Automatic Tracking (No Manual Triggers)
| Signal | Implementation |
|--------|---------------|
| Scroll depth | IntersectionObserver at 25%, 50%, 75%, 100% markers |
| Time on page | `setTimeout` at 30s, 60s, 120s marks |
| Pages per session | `sessionStorage` counter, increment on route change |
| Rage clicks | Detect 3+ clicks on same element within 1s |
| Form abandonment | `beforeunload` if form started but not submitted |

---

## IV. Attribution Model

### Multi-Touch Attribution
Track the full journey, not just last click:

```
Session 1: Google "roofing Franklin NC" → Town page → Service page (exit)
Session 2: Direct → Homepage → Gallery → Quote form (convert!)
```

**Attribution:** First touch = organic/town page. Last touch = homepage. Assist = gallery.

### Data Points to Capture
| Touchpoint | Storage | Purpose |
|------------|---------|---------|
| Landing page | `sessionStorage` | First-touch attribution |
| Referrer | `document.referrer` | Traffic source |
| UTM parameters | `sessionStorage` | Campaign tracking |
| Pages visited before conversion | `sessionStorage` array | Journey mapping |
| Time between first visit and conversion | `localStorage` timestamp | Sales cycle length |
| Device on first vs converting visit | Compare sessions | Cross-device behavior |

### Source Categorization
| Source | Category | Notes |
|--------|----------|-------|
| Google organic | `organic_search` | Track landing page + query if available |
| Google Maps/GBP | `local_search` | Referrer contains google.com/maps |
| Direct | `direct` | No referrer |
| Facebook/Instagram | `social` | UTM or referrer |
| Referral (Angi, BBB, etc.) | `directory` | Track which directory |
| Paid search | `paid_search` | UTM tagged |

---

## V. Reporting Structure

### Weekly Dashboard
| Metric | What It Shows |
|--------|--------------|
| Total form submissions | Volume of leads |
| Phone call clicks | Call-preference leads |
| Form start → complete rate | Funnel efficiency |
| Top converting pages | Which content drives action |
| Top entry pages | Where people arrive |
| Mobile vs desktop conversion rate | Device performance gap |
| Average pages before conversion | Journey length |

### Monthly Deep Dive
| Analysis | Questions Answered |
|----------|-------------------|
| Service demand mix | Which services generate most inquiries? |
| Town page performance | Which locations drive leads? Expand or improve? |
| Blog → conversion paths | Which articles produce qualified traffic? |
| CTA performance by position | Hero vs mid-page vs end CTAs — which converts? |
| Tool engagement | Do calculators/quizzes produce leads? |
| Chatbot effectiveness | Handoff rate, qualification accuracy |
| Scroll depth vs conversion | Do deeper readers convert more? |
| Mobile form completion | Where do mobile users abandon? |

### Quarterly Strategic Review
| Topic | Action |
|-------|--------|
| Content ROI | Double down on converting blog topics, sunset low-performers |
| Page hierarchy adjustment | Promote high-converting pages in navigation |
| CTA language testing | Rotate CTA copy based on CTR data |
| Town page expansion | Add pages for towns showing organic traffic potential |
| Tool iteration | Improve tools with low completion rates |
| Chatbot flow optimization | Refine paths with high drop-off |

---

## VI. Iteration Framework

### Data → Decision Rules

**If form start rate is high but completion rate is low:**
- Reduce form fields
- Add progress indicator
- Add trust copy near submit
- Test single-page vs multi-step

**If blog gets traffic but no service clicks:**
- Add in-content CTA blocks (not just end-of-article)
- Strengthen internal links to service pages
- Add "Related Service" card after key paragraphs

**If town page gets traffic but no conversions:**
- Add local project photos (proof gap)
- Add local testimonial
- Strengthen CTA copy with town name
- Check: is the CTA visible without scrolling?

**If mobile conversion rate is significantly lower than desktop:**
- Audit form usability with keyboard open
- Check StickyMobileCTA visibility
- Verify phone CTA prominence
- Test simplified mobile form variant

**If chatbot opens but no handoff:**
- Review conversation flow for dead ends
- Add quick-reply buttons for common intents
- Shorten path to form/phone handoff
- Check: does bot sound helpful or generic?

**If calculator/tool is used but no lead captured:**
- Gate detailed results behind email capture
- Add "Get this estimate by email" after results
- Strengthen CTA in ResultReveal component

---

## VII. Privacy & Compliance

### Data Collection Rules
- No PII in analytics events (no names, emails, phone numbers in tracking data)
- Cookie consent: implement banner for EU visitors (GDPR)
- Analytics: GA4 with consent mode enabled
- Form data: stored in Supabase with RLS, not in analytics
- IP addresses: anonymized in GA4 settings
- Retention: analytics data auto-purged after 14 months (GA4 default)

### Tracking Opt-Out
- Respect `Do Not Track` browser header
- Cookie preferences: functional vs analytics vs marketing
- Easy opt-out link in privacy policy
