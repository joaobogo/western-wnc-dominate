---
name: Chatbot Conversation Library
description: Complete conversation scripts for welcome, routing, quote invitation, urgency, storm, materials, service area, commercial, budget, and objection handling
type: feature
---

# Chatbot Conversation Library

## Flow 1: Welcome & Opening

### First-Time Visitor
```
Bot: Welcome to Highlander. 👋 I'm here to help you explore our 
roofing and construction services across Western North Carolina.

What can I help you with today?

[I need roofing help]
[I'm planning a building project]
[I had storm damage]
[Just looking around]
```

### Returning Visitor
```
Bot: Welcome back! Anything I can help you with today?

[Pick up where I left off]
[Something new]
[Talk to someone]
```

### "Just looking around"
```
Bot: No problem at all — take your time. Here are a few popular 
starting points:

• [Our roofing services →] — residential, commercial, repair, specialty
• [Construction & additions →] — additions, renovations, outdoor living
• [Recent projects →] — see what we've been building across WNC
• [Our story →] — 40+ years of combined mountain building experience

I'm here if anything comes up. 🏔️
```

---

## Flow 2: Service Discovery

```
User: "What do you do?" / "What services do you offer?"

Bot: We're a full-service roofing and construction company based in 
Western North Carolina. Two main divisions:

🏠 **Roofing Division**
Residential, commercial, repair, replacement, storm damage, and 
specialty materials like metal and cedar.

🏗️ **Construction Division**
Home additions, renovations, outdoor living spaces, and custom 
construction — built for mountain living.

Which side interests you more?

[Roofing] [Construction] [Both, actually] [Not sure yet]
```

### "Both, actually"
```
Bot: That's more common than you'd think — especially in the 
mountains where roofing and structural work often go hand in hand.

Are you looking at a project that involves both? Or separate needs?

[One project, multiple needs] [Separate projects] [Just exploring]

→ "One project":
Bot: That's exactly the kind of work we're set up for. Having one 
team handle both roofing and construction means better coordination, 
fewer delays, and one point of contact.

Want to tell me more about what you're thinking?
[Describe my project] [Schedule a consultation] [See examples]
```

---

## Flow 3: Roofing vs. Construction Routing

### Roofing Path
```
User selects: "Roofing"

Bot: Great. What's going on with your roof?

[Need a full replacement] [Repair or maintenance] [Storm damage]
[New construction roof] [Commercial property] [Just researching]

→ Each routes to specific sub-flow with tailored questions
```

### Construction Path
```
User selects: "Construction"

Bot: What kind of project are you considering?

[Home addition] [Kitchen or bath renovation] [Outdoor living space]
[Garage or workshop] [Custom new build] [Something else]

→ Each routes to construction sub-flow
```

---

## Flow 4: Quote Call Invitation

### Soft Invitation (after providing info)
```
Bot: Based on what you've told me, this sounds like a project our 
team would be excited about.

The best next step is a quick call with one of our project leads. 
It's completely free, no obligation, and usually takes about 
10-15 minutes. They'll ask a few questions, give you honest feedback, 
and outline what comes next if you want to move forward.

Would you like to set that up?

[Yes, schedule a call] [I'd prefer email first] [Not ready yet]
```

### "I'd prefer email first"
```
Bot: Totally fine. Drop your email and a brief note about your 
project, and someone from our team will follow up within one 
business day.

[Open email form]

Bot: Got it — we'll be in touch soon. In the meantime, here are 
some resources that might help:
• [How our process works →]
• [Similar projects we've completed →]
```

### "Not ready yet"
```
Bot: No rush at all. When you're ready, you can:

• Call us directly at (828) 524-7773
• Fill out a consultation request on any service page
• Come back here and pick up where we left off

Is there anything else I can help with right now?
```

---

## Flow 5: Project Urgency

```
Bot: How urgent is your project?

[Emergency — needs immediate attention]
[Soon — within the next few weeks]
[Planning — 1 to 3 months out]
[Future — just getting informed]
```

### Emergency
```
Bot: I understand — let's get you help fast.

For emergencies, the quickest way to reach our team is by phone:

📞 **(828) 524-7773**

We have crews available for emergency response across Western NC.

If you can't call right now, I can submit an emergency request with 
your details and someone will reach out within the hour.

[Submit emergency request] [I'll call now]
```

### Soon
```
Bot: Good timing. We can usually schedule an initial assessment 
within a few days.

A couple quick things that'll help our team prepare:

What type of project is this?
[Roof issue] [Construction project] [Storm related]

→ Routes to appropriate qualification then schedules
```

### Planning
```
Bot: Smart to plan ahead — especially in the mountains where 
weather and scheduling matter.

Let me point you toward some resources while you're in the 
planning stage:

[Relevant planning resources based on project type]

And when you're ready to talk specifics, we're here.
[Schedule for later] [Keep browsing]
```

### Future
```
Bot: Great that you're thinking ahead. Here are some things worth 
exploring:

• [Roof maintenance checklist →] — for keeping your current roof healthy
• [Planning guides →] — budgets, timelines, and what to expect
• [Material guides →] — compare your options before deciding

I'm here whenever you have questions. 🏔️
```

---

## Flow 6: Storm Damage

```
User indicates storm damage (click or typed)

Bot: I'm sorry you're dealing with this. Let's figure out the 
best path forward.

First — is there active damage happening right now, like water 
coming in?

[Yes, it's active] [No, but I see damage] [I'm not sure]
```

### Active damage
```
Bot: Please call us right away:

📞 **(828) 524-7773**

While you wait:
• Place buckets or towels under any leaks
• Move valuables away from wet areas
• Don't go on the roof — it's not safe after a storm

If you can't call, I'll flag this as urgent and get someone 
reaching out to you ASAP.

[Submit emergency — they should call me]
[I'll call now]
```

### Visible damage, not active
```
Bot: Okay, good that it's not actively leaking. Here's what I'd 
recommend:

1. **Take photos** from the ground — don't climb up
2. **Note the date** of the storm that caused it
3. **Call your insurance** to open a claim if you haven't already

Have you contacted your insurance company yet?

[Yes, claim is open] [Not yet] [Don't have insurance]
```

### Claim is open
```
Bot: Perfect. We work with insurance companies regularly and can 
help make sure everything is properly documented.

Our inspection will include:
• Detailed damage assessment
• Photo documentation for your adjuster
• Written scope of work your insurance can reference

This is a free service — we want to make sure you get what your 
policy covers.

[Schedule a storm damage inspection]
[Learn more about our insurance process →]
```

### No insurance
```
Bot: That's okay — we can still help. We'll assess the damage 
honestly and give you options that work within your budget.

Some repairs are simpler and more affordable than you might expect.

[Schedule an assessment] [Get a rough idea of repair costs]
```

---

## Flow 7: Materials Guidance

```
User asks about materials or selects from service discovery

Bot: Materials are one of the most important decisions for any 
roofing project — especially at elevation. Here in WNC, the right 
choice depends on your home, your location, and what matters most 
to you.

What's most important for your roof?

[Longevity — I want it to last] [Appearance — it needs to look great]
[Budget — I need the best value] [Weather performance — we get hammered]
```

### Longevity
```
Bot: For maximum lifespan in the mountains, here's how materials 
stack up:

🥇 **Standing seam metal** — 50+ years, best snow/ice performance
🥈 **Architectural shingles (premium)** — 30-50 years with proper install
🥉 **Cedar shake** — 30-40 years, beautiful but needs maintenance

At higher elevations (3,000+ ft), metal tends to outperform 
everything else because of the freeze-thaw cycles.

Want to dive deeper into any of these?

[Tell me more about metal] [Tell me more about shingles]
[Tell me more about cedar] [What do you recommend for my area?]
```

### "What do you recommend for my area?"
```
Bot: Great question — it really depends on where you are.

What town or area are you in?

[Town selector]

→ Bot gives elevation-specific advice:
Bot: At [elevation] feet in [town], you're dealing with [specific 
challenges]. Most homeowners in your area go with [recommendation] 
because [reason].

That said, every home is different. Want to explore options with our 
team?

[Schedule a material consultation] [Read our material guide →]
[See projects with this material →]
```

---

## Flow 8: Service Area Qualification

```
User mentions a location or bot asks

Bot: Where's your property located?

[Highlands] [Cashiers] [Franklin] [Sylva] [Waynesville]
[Brevard] [Hendersonville] [Somewhere else in WNC]
```

### Primary service area
```
Bot: [Town] — we know that area well! We've completed [X]+ projects 
in [County] County.

[Continue with their project inquiry]
```

### "Somewhere else in WNC"
```
Bot: We serve most of Western North Carolina. What town or county 
are you in?

[Text input]

→ If recognized area:
Bot: Yes, we serve [area]! Let's keep going.

→ If outside service area:
Bot: We don't currently serve that area regularly, but depending 
on the project scope, we sometimes take on work outside our usual 
range.

Would you like to tell me more about your project? I can check with 
our team.

[Describe my project] [That's okay, thanks]
```

---

## Flow 9: Commercial Inquiry

```
User indicates commercial property

Bot: We work with commercial property owners, managers, and 
investors across WNC. What's your situation?

[Active roof issue] [Preventive maintenance] [Roof replacement]
[New commercial build] [Multi-unit residential]
```

### Any commercial selection
```
Bot: A few details that'll help us prepare:

What type of property?
[Retail/office] [Industrial/warehouse] [Multi-family residential]
[HOA/community] [Hospitality/restaurant] [Other]

Approximate roof area?
[Under 5,000 sq ft] [5,000-15,000] [15,000-50,000] [50,000+] [Not sure]

Bot: Thanks. Commercial projects require a different approach — 
we'll want to do a thorough property assessment before discussing 
options.

[Schedule a property assessment]
[Call to discuss: (828) 524-7773]
[Email details to our commercial team]
```

---

## Flow 10: Budget Sensitivity

### When user asks about cost
```
User: "How much does a new roof cost?" / "What's your pricing?"

Bot: That's always the first question — and a fair one.

Roof costs in WNC vary quite a bit depending on size, pitch, 
material, and access. For a typical residential roof in our area:

• **Asphalt shingles:** $8,000 – $15,000
• **Metal roofing:** $15,000 – $35,000+
• **Cedar or specialty:** $20,000 – $40,000+

These are ballpark ranges — your actual cost depends on your 
specific home and situation.

The best way to get a real number? A free inspection. No obligation, 
no pressure — just an honest assessment.

[Schedule a free inspection]
[Use our cost estimator →]
[What affects the price?]
```

### "That's more than I expected"
```
Bot: I hear you — roofing is a significant investment, especially 
when you want it done right.

A few things worth knowing:

1. **Financing is available** — we work with options that make 
   quality roofing accessible without cutting corners
2. **Material choice matters** — sometimes the most expensive option 
   isn't the best fit for your situation
3. **We'll be honest** — if a repair can buy you 5-10 more years, 
   we'll tell you that

Would you like to explore financing, or talk through options with 
our team?

[Learn about financing →] [Talk with our team]
[Is repair an option for me?]
```

### Budget for construction
```
User asks about addition/renovation costs

Bot: Construction budgets in WNC depend heavily on scope, materials, 
site access, and the level of finish you're looking for.

General ranges for our area:

• **Deck/outdoor living:** $15,000 – $80,000+
• **Home addition:** $50,000 – $200,000+
• **Full renovation:** varies widely by scope

Rather than guess, our team can sit down with you, understand what 
you want, and help you build a realistic budget that aligns with 
your goals.

[Schedule a project consultation]
[Read our planning guide →]
```

---

## Flow 11: Objection Handling

### Timing objection: "I'm not ready yet"
```
Bot: That's completely fine — there's no timeline on our end.

Here are some things you can do in the meantime:
• [Download our planning checklist →]
• [Browse projects for inspiration →]
• [Read homeowner guides →]

When you're ready, we're here. No expiration on that offer. 🏔️
```

### Complexity objection: "This project seems complicated"
```
Bot: Mountain projects can feel that way — steep lots, weather 
considerations, permits, access roads. It's a lot to think about.

That's exactly why having a team that knows this terrain matters. 
We've built on slopes, at 4,000+ feet, in communities with strict 
HOA rules, and through every kind of mountain weather.

A consultation is the best way to cut through the complexity. We'll 
walk through everything with you — no jargon, no pressure.

[Schedule a consultation] [See a similar project we've done]
```

### Trust objection: "How do I know you're legit?"
```
Bot: Fair question — you should always vet your contractor carefully. 
Here's what sets us apart:

✓ **GAF Master Elite certified** — top 2% of roofers nationwide
✓ **Licensed and fully insured** in North Carolina
✓ **40+ years combined experience** in WNC specifically
✓ **100+ verified reviews** from local homeowners
✓ **Real project photos** — not stock images

You can also:
• [Read our reviews →]
• [See our certifications →]
• [Meet our team →]
• [View completed projects →]

We're happy to provide references from homeowners in your area too.
```

### Price objection: "I got a cheaper quote"
```
Bot: We're not always the lowest price — and honestly, we wouldn't 
want to be. Here's why:

• We use premium materials with manufacturer-backed warranties
• Our crews are trained specifically for mountain conditions
• We handle permits, inspections, and cleanup — everything
• Our work is backed by workmanship warranties

The cheapest option often costs more in the long run, especially 
at elevation where poor installation shows up faster.

That said, we're always competitive for the quality level we 
deliver. If you'd like, our team can review the other quote with 
you — sometimes the differences aren't obvious at first glance.

[Have someone review my other quote]
[Tell me more about your warranties]
[I'd like to move forward with Highlander]
```

### "Do you do free estimates?"
```
Bot: Yes — every consultation and on-site assessment is completely 
free, with no obligation.

Here's what's included:
• Full inspection of the project area
• Honest assessment of what's needed
• Written estimate with material and labor details
• Answers to any questions you have

We'll never pressure you to decide on the spot.

[Schedule my free assessment]
```

---

## Conversation Closers

### After successful qualification
```
Bot: Great — I've got everything I need to get you connected with 
our team.

Here's what happens next:
1. Our team reviews your project details (usually same day)
2. Someone will reach out to schedule your [inspection/consultation]
3. They'll confirm a time that works for you

Thanks for choosing Highlander. We look forward to working with you.

Is there anything else I can help with?
```

### After user decides not to proceed
```
Bot: No problem at all. If anything changes or you have questions 
down the road, we're always here.

📞 (828) 524-7773
🌐 You can find us at any of our service pages

Have a great day! 🏔️
```
