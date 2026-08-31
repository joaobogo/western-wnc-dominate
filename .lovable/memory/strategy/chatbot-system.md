---
name: Website Chatbot System
description: Premium AI project assistant with personality, conversation paths, service routing, lead qualification, and visual design for roofing and construction
type: feature
---

# Website Chatbot System

## Identity & Personality

### Name: "Highland Guide"
- Not a generic chatbot — a **digital project assistant**
- Personality: Knowledgeable local professional, calm, helpful, never pushy
- Think: experienced project coordinator who genuinely wants to help you figure out the right next step

### Voice Rules
1. Conversational but professional — no slang, no corporate speak
2. Use "we" and "our team" — never "the company" or "Highlander Roofing & Construction" repeatedly
3. Reference WNC naturally: "Here in the mountains..." / "At your elevation..."
4. Acknowledge uncertainty honestly: "I'd want our team to look at that in person"
5. Never pressure: "Whenever you're ready" / "No rush at all"
6. Short messages — max 3 sentences per bubble, break into multiple if needed
7. Use the visitor's name once they provide it

---

## Visual Design

### Desktop
- **Position:** Bottom-right corner, 24px from edges
- **Collapsed state:** 56px circle with mountain/chat icon, subtle shadow
- **Expanded state:** 400px wide × 520px tall card with rounded corners
- **Header:** Deep forest green (`--primary`) with "Highland Guide" + mountain icon
- **Messages:** Cream background (`--background`), green bubbles for bot, white for user
- **Input:** Clean text input with send button, attachment icon for photos
- **Typography:** DM Sans 14px body, messages slightly smaller

### Mobile
- **Position:** Bottom-right, above sticky CTA bar (if present)
- **Collapsed:** 48px circle
- **Expanded:** Full-width bottom sheet, 70% viewport height
- **Swipe down to minimize**
- **Input stays above keyboard**

### Animations
- Open: slide up + fade in (300ms ease-out)
- Close: slide down + fade out (200ms ease-in)
- New message: subtle slide-in from left (bot) or right (user)
- Typing indicator: 3-dot pulse animation
- No bounce, no shake, no attention-grabbing animations

---

## Conversation Flow Architecture

### Opening Behavior

**First visit (after 45s on any page):**
- Notification dot appears on chat icon (no sound)
- No auto-open

**If user clicks the chat icon:**
```
Highland Guide: Hey there! 👋 I'm the Highland Guide — here to help 
you explore our roofing and construction services across Western NC.

What brings you here today?

[🏠 I need a new roof]
[🔧 Roof repair or damage]
[🏗️ Building project]
[💬 Just browsing]
```

**Context-aware opening on specific pages:**

| Page | Opening Message |
|---|---|
| Residential Roofing | "Thinking about a new roof? I can help you understand your options for [detected town or 'your area']." |
| Storm Damage | "Dealing with storm damage? Let me help you figure out the right next step." |
| Home Additions | "Planning an addition? I can help you understand what's involved." |
| Pricing/Cost pages | "Looking for cost information? I can give you some ballpark ranges or connect you with our estimator." |
| Town page | "I see you're looking at our work in [Town]. Want to know more about what we do there?" |
| Blog article | "Have questions about what you're reading? I'm happy to help." |

---

## Conversation Paths

### Path 1: Residential Roofing

```
User selects: "I need a new roof"

Bot: Great! A few quick questions to point you in the right direction.

What type of home do you have?
[Single family] [Cabin/Mountain home] [Townhome] [Multi-family]

→ User selects

Bot: And do you have a sense of what material you're interested in?
[Asphalt shingles] [Metal roofing] [Cedar/Specialty] [Not sure yet]

→ User selects

Bot: Got it. Are you planning ahead, or is this more urgent?
[Planning for the next few months] [Need it soon] [Just researching]

→ If "Just researching":
Bot: No problem at all! Here are some resources that might help:
• [Our roofing materials guide →]
• [Roof replacement cost breakdown →]
• [How our process works →]

Whenever you're ready to talk specifics, our team offers free 
consultations — no pressure. Want me to help you schedule one?
[Yes, let's schedule] [Not yet, thanks]

→ If "Need it soon" or "Planning":
Bot: Perfect. Our team can usually schedule a free inspection within 
a few days. Would you like to:
[Schedule a consultation] [Get a rough estimate first] [Call us now]
```

### Path 2: Roof Repair

```
User selects: "Roof repair or damage"

Bot: Sorry to hear you're dealing with that. Let me help.

What kind of issue are you seeing?
[Leak or water damage] [Missing/damaged shingles] [Storm damage]
[Flashing or vent issues] [Not sure — something looks wrong]

→ If "Storm damage":
Bot: Storm damage can be stressful. Here's what I'd recommend:

1. Document what you can see with photos (don't go on the roof)
2. Contact your insurance company to open a claim
3. Let our team do a professional assessment

Want to schedule an emergency inspection? We typically respond 
within 24 hours.
[Schedule emergency inspection] [Call (828) 524-7773] [Learn about storm damage claims]

→ If other repair:
Bot: Got it. A few things that'll help our team:

How urgent is this?
[Emergency — active leak] [Soon — within a week] [Can wait a bit]

→ Emergency:
Bot: For active leaks, the fastest way to get help is to call us 
directly. Our team is available for emergencies.

📞 (828) 524-7773

If you can't call right now, I can help you submit an emergency 
request form.
[Submit emergency request] [I'll call]
```

### Path 3: Storm Damage

```
User selects from context-aware storm page opening OR navigates here

Bot: Dealing with storm damage is stressful — we're here to help.

First, is anyone in danger or is there structural damage to your home?
[Yes — emergency] [No — but there's visible damage] [Not sure yet]

→ Emergency:
Bot: Please call us right away or call 911 if there's immediate danger.

📞 (828) 524-7773 — Highlander Emergency Line

Our team can be on-site quickly to assess and secure your property.

→ Visible damage:
Bot: Okay, good that everyone is safe. Here's what I'd suggest:

1. Take photos of any damage you can safely see from the ground
2. Don't go on the roof yourself
3. Note the date and time of the storm

Do you have homeowner's insurance?
[Yes] [No] [Not sure]

→ Yes:
Bot: Good. Your insurance likely covers storm damage. We work with 
insurance companies regularly and can help guide you through the 
claims process.

Want to schedule a free storm damage inspection? We'll document 
everything your insurance company needs.
[Schedule inspection] [Learn about insurance claims] [Call us]
```

### Path 4: Commercial Roofing

```
User indicates commercial property

Bot: We work with commercial property owners and managers across WNC. 

What best describes your situation?
[Roof is leaking or damaged] [Need a maintenance program] 
[Planning a roof replacement] [New construction]

→ Routes to appropriate commercial flow with B2B-appropriate language
→ Asks about property type, sq ft, number of units
→ Always routes to "Request a Property Assessment" or direct call
```

### Path 5: Home Additions

```
User selects: "Building project" → "Home addition"

Bot: Exciting! Additions are a great way to get the space you need 
without moving.

What are you thinking about adding?
[Extra bedroom/bathroom] [Kitchen expansion] [Garage]
[Second story] [Sunroom/4-season room] [Other]

→ User selects

Bot: Nice. And where's the property located?
[Dropdown of WNC towns + Other]

Bot: Are you in the early planning stages, or do you have plans drawn up?
[Just an idea right now] [Working with a designer] [Have plans ready]

→ Early:
Bot: That's a great place to start. Our construction team can help 
you think through what's possible, what it might cost, and how long 
it would take.

Here are some resources while you're exploring:
• [Home addition planning guide →]
• [Addition projects we've completed →]
• [Cost factors for WNC additions →]

When you're ready to talk, we offer free project consultations.
[Schedule a consultation] [Keep browsing]

→ Plans ready:
Bot: Perfect — you're ahead of the game! Our team would love to 
review your plans and discuss the project.

[Schedule a consultation] [Call to discuss] [Email your plans]
```

### Path 6: Renovations

```
Similar to additions flow but with:
- Scope questions: Kitchen / Bathroom / Whole home / Structural
- Age of home question (relevant for mountain homes)
- Living situation: Will you live there during renovation?
- Routes to construction consultation
```

### Path 7: Outdoor Living

```
User selects outdoor living project

Bot: Mountain living is all about the outdoors! What are you 
envisioning?
[Deck or porch] [Covered outdoor kitchen] [Screened porch]
[Pergola or pavilion] [Full outdoor living space] [Not sure yet]

→ Asks about property elevation/exposure (relevant for materials)
→ Shows inspiration projects
→ Routes to "Start Planning Your Space" consultation
```

### Path 8: Custom Construction

```
User selects custom build

Bot: Building custom in the mountains is something we're passionate 
about. A few questions to get started:

Do you have land already?
[Yes, ready to build] [Looking at lots] [Under contract]

→ Asks about size, style preferences, budget range
→ References mountain-specific considerations (slope, elevation, access)
→ Routes to "Schedule a Design Consultation"
```

---

## Lead Qualification

### Qualification Questions (woven naturally into conversation)
1. **Project type** — What do they need? (roofing vs construction)
2. **Timeline** — When are they looking to start?
3. **Location** — Where in WNC?
4. **Budget awareness** — Do they have a range in mind?
5. **Decision stage** — Researching, planning, or ready to go?
6. **Competition** — Have they gotten other quotes?

### Lead Scoring (internal, never shown to user)

| Signal | Points |
|---|---|
| Provided phone number | +20 |
| Timeline: ASAP or 1-3 months | +15 |
| Has insurance claim open | +15 |
| Has plans/drawings ready | +15 |
| Budget range provided | +10 |
| Location in primary service area | +10 |
| Requested callback or scheduled | +25 |
| Uploaded photos | +10 |
| Visited 3+ service pages | +5 |
| Returned visitor | +10 |

**Hot lead (60+):** Route to immediate callback queue
**Warm lead (30-59):** Standard follow-up within 24 hours
**Cool lead (0-29):** Email nurture sequence

---

## Fallback & Edge Cases

### When the bot can't answer:
```
Bot: That's a great question — I want to make sure you get the right 
answer from our team. Would you like to:
[Call us at (828) 524-7773] [Leave a message for our team] 
[Send us an email]
```

### When user is frustrated:
```
Bot: I understand this is important, and I want to make sure you get 
the help you need. The fastest way to talk with someone is to call us 
directly at (828) 524-7773. We're here to help.
```

### When user asks about pricing:
```
Bot: I can give you some general ranges, but every project is 
different — especially in the mountains where elevation, access, and 
weather all factor in.

For a [project type], most homeowners in WNC see costs between 
[range]. But the best way to get an accurate number is a free 
on-site assessment.

Want me to help you schedule one?
```

### After hours:
```
Bot: Our office is currently closed (we're open M-F, 8am-5pm), but 
I can still help! Leave your info and we'll reach out first thing.

For emergencies, call (828) 524-7773 — we have an after-hours line.
```

---

## Data Capture & Integration

### What the chatbot captures:
- Conversation transcript
- Project type and details
- Contact information (when provided)
- Lead score
- Page context (where they started the chat)
- Timestamp and session duration

### Storage:
- Conversations stored in `chat_conversations` table
- Messages stored in `chat_messages` table
- Lead data synced to `designer_leads` or new `consultation_requests` table
- Analytics events to `designer_metrics`

### Notifications:
- Hot leads: immediate notification to team
- Warm leads: daily digest email
- All conversations: accessible in admin dashboard

---

## Technical Implementation

### AI Backend
- Powered by Lovable AI (google/gemini-3-flash-preview)
- Edge function: `supabase/functions/chatbot/index.ts`
- System prompt includes: brand voice, service catalog, WNC knowledge, qualification logic
- Conversation history sent with each message for context
- Streaming responses for natural feel

### Components
- `ChatWidget` — floating button + expanded chat interface
- `ChatMessage` — individual message bubble with markdown support
- `QuickReplyButtons` — tappable option chips
- `ChatHeader` — branding + minimize/close controls
- `ChatInput` — text input + photo upload + send button
- `LeadCaptureInline` — embedded form within chat flow

### State Management
- Session-based conversation (localStorage for persistence across page navigations)
- Conversation context includes current page URL for relevance
- Lead qualification score calculated client-side, stored server-side

---

## Page Placement Rules

| Page Type | Chat Behavior | Auto-Message |
|---|---|---|
| Homepage | Available, no auto-message | None (hero CTA is primary) |
| Service Pages | Available, notification after 45s | Context-aware greeting |
| Storm Pages | Available + prominent, notification after 15s | Storm-specific opening |
| Town Pages | Available, notification after 30s | Town-aware greeting |
| Blog Articles | Available, no notification | "Questions about this article?" |
| Gallery/Projects | Available, no notification | None |
| About/Team | Available, no notification | None |
| Contact/Quote | Hidden (form is primary) | N/A |
| Calculator Pages | Available, notification after result | "Want a more precise estimate?" |
