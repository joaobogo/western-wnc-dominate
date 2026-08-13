import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, ArrowRight, Loader2, CheckCircle, AlertTriangle, Home, Hammer, CloudLightning, HelpCircle, Calendar, Shield } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { submitLead, logChatbotConversation } from "@/lib/leads";
import { trackChatbotOpen } from "@/lib/gtm";
import { useIsMobile } from "@/hooks/use-mobile";
import { actionableError } from "@/lib/microcopy";
import { fieldAttrs } from "@/lib/field-ergonomics";

type Msg = { role: "user" | "assistant"; content: string };

/* ─── Context-aware quick starters ─── */
const getQuickStarters = (path: string) => {
  if (path.includes("roofing") || path.includes("roof")) return [
    { label: "Repair or Replace?", message: "How do I know if my roof needs repair or full replacement?", icon: HelpCircle },
    { label: "Storm Damage", message: "I think my roof has storm damage. What should I do?", icon: CloudLightning },
    { label: "Schedule Consultation", message: "I'd like to schedule a roofing consultation.", icon: Calendar },
  ];
  // Construction-specific starters per subpage
  if (path.includes("construction/addition")) return [
    { label: "Plan an Addition", message: "I'm thinking about expanding my home — what does that process look like with Highlander?", icon: Home },
    { label: "Do I Need Plans?", message: "Do I need professionally drawn plans before talking to you about an addition?", icon: HelpCircle },
    { label: "Start a Conversation", message: "I'd like to discuss a home addition project with your construction team.", icon: Calendar },
  ];
  if (path.includes("construction/renovation")) return [
    { label: "Kitchen or Bath", message: "I'm considering a kitchen or bathroom renovation. How does Highlander handle that?", icon: Hammer },
    { label: "Whole-Home Remodel", message: "I want to renovate multiple rooms — can you manage a larger-scope project?", icon: Home },
    { label: "Start a Conversation", message: "I'd like to discuss a renovation project with your construction team.", icon: Calendar },
  ];
  if (path.includes("construction/outdoor")) return [
    { label: "Covered Porch", message: "I'd love a covered porch or screened room. What do you recommend for mountain weather?", icon: Home },
    { label: "Deck or Pergola", message: "I'm interested in a deck or pergola — what materials work best at elevation?", icon: Hammer },
    { label: "Start a Conversation", message: "I'd like to discuss an outdoor living project with your construction team.", icon: Calendar },
  ];
  if (path.includes("construction/exterior")) return [
    { label: "Siding Options", message: "What siding options work best in WNC weather?", icon: Hammer },
    { label: "Windows & Doors", message: "I need new windows and doors — do you handle that?", icon: Home },
    { label: "Start a Conversation", message: "I'd like to discuss exterior improvements with your construction team.", icon: Calendar },
  ];
  if (path.includes("construction/custom")) return [
    { label: "Complex Project", message: "I have a complex or multi-phase project — can Highlander handle something like that?", icon: Hammer },
    { label: "Design-Build", message: "Do you offer design-build services where you help develop the plans?", icon: HelpCircle },
    { label: "Start a Conversation", message: "I'd like to discuss a custom construction project.", icon: Calendar },
  ];
  if (path.includes("construction")) return [
    { label: "Home Addition", message: "I'm thinking about adding onto my home — a master suite or extra living space.", icon: Home },
    { label: "Renovation", message: "I want to renovate part of my house — kitchen, bathroom, or a larger remodel.", icon: Hammer },
    { label: "Outdoor Living", message: "I'd like to build a covered porch, deck, or outdoor kitchen.", icon: Home },
    { label: "Start a Conversation", message: "I'd like to discuss a construction project with your team.", icon: Calendar },
  ];
  if (path.includes("storm")) return [
    { label: "Report Damage", message: "I think my roof has storm damage. What should I do?", icon: AlertTriangle },
    { label: "Insurance Help", message: "How does the insurance claim process work?", icon: Shield },
    { label: "Emergency", message: "I have an active roof leak from storm damage — this is urgent.", icon: CloudLightning },
  ];
  // Default — equal weight for all three divisions
  return [
    { label: "Roofing", message: "I need help with my roof — repair, replacement, or inspection.", icon: Home },
    { label: "Construction", message: "I'm interested in a construction project — addition, renovation, or outdoor space.", icon: Hammer },
    { label: "Storm Damage", message: "I think my roof has storm damage.", icon: CloudLightning },
    { label: "Not Sure", message: "I'm not sure where to start — can you help me figure out whether I need roofing or construction?", icon: HelpCircle },
  ];
};

/* ─── In-chat lead capture card ─── */
function LeadCaptureCard({
  onSubmit,
  onDismiss,
  transcript,
}: {
  onSubmit: () => void;
  onDismiss: () => void;
  transcript: Msg[];
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone) return;
    setSubmitting(true);
    // Mirror into legacy table for back-compat
    try {
      await supabase.from("consultation_requests").insert({
        name, phone: phone || null, email: email || null,
        town: town.trim() || null,
        source: "chatbot-inline", lead_score: 30, status: "new",
      });
    } catch { /* continue anyway */ }

    // Unified leads table
    const { id: leadId } = await submitLead({
      source: "chatbot",
      lead_type: "general_inquiry",
      full_name: name,
      phone: phone || null,
      email: email || null,
      property_town: town.trim() || null,
      property_state: "NC",
      source_context: "chat_widget",
      preferred_contact_method: "phone",
      chat_summary: transcript.slice(-6).map(m => `${m.role}: ${m.content}`).join("\n").slice(0, 2000),
      full_chat_transcript: transcript,
    });
    await logChatbotConversation({
      lead_id: leadId,
      name,
      phone: phone || null,
      email: email || null,
      summary: transcript.slice(-4).map(m => `${m.role}: ${m.content}`).join(" | ").slice(0, 500),
      full_transcript: transcript,
      contact_path: "form",
      recommended_next_step: "advisor_callback",
      converted_to_lead: !!leadId,
    });

    // Track lead capture from chatbot
    trackEvent("lead_capture", {
      label: "Chatbot Inline Lead",
      elementId: "chatbot-lead-capture",
      metadata: { name }
    });

    setSubmitted(true);
    setSubmitting(false);
    onSubmit();
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-primary/5 border border-primary/20 rounded-sm p-4 max-w-[90%]">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-4 h-4 text-primary" />
          <p className="text-sm font-heading font-semibold text-foreground">We'll be in touch shortly.</p>
        </div>
        <p className="text-xs text-muted-foreground font-body">A project advisor will call you rapidly.</p>
      </motion.div>
    );
  }

  const inputCls = "w-full px-3 py-2 text-xs font-body bg-background border border-input rounded-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-sm p-4 max-w-[90%] space-y-3">
      <div>
        <p className="text-sm font-heading font-semibold text-foreground">Ready to talk with an advisor?</p>
        <p className="text-caption text-muted-foreground font-body mt-0.5">Share your info and we'll call you — no obligation.</p>
      </div>
      <div className="space-y-2">
        <input aria-label="Your name" {...fieldAttrs.name} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John and Mary Davidson" className={inputCls} maxLength={100} />
        <input aria-label="Best phone number" {...fieldAttrs.phone} value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. (828) 555-0123" className={inputCls} maxLength={20} />
        <input aria-label="Email address (optional)" {...fieldAttrs.email} value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. john@email.com (optional)" className={inputCls} maxLength={255} />
        <input {...fieldAttrs.town} value={town} onChange={e => setTown(e.target.value)} placeholder="Property town (Franklin, Highlands, Cashiers, Sylva…)" className={inputCls} maxLength={80} aria-label="What town is the property in?" />
      </div>
      <div className="flex items-center gap-2">
        <button onClick={handleSubmit} disabled={!name || !phone || submitting} className="flex-1 text-xs font-body font-semibold px-3 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors">
          {submitting ? "Sending..." : "Request a Call"}
        </button>
        <button onClick={onDismiss} className="text-xs text-muted-foreground font-body hover:text-foreground transition-colors px-2 py-2">
          Not yet
        </button>
      </div>
      <p className="text-caption text-muted-foreground font-body flex items-start gap-1 leading-relaxed">
        <Shield className="w-3 h-3 mt-0.5 flex-shrink-0" />
        <span>
          By submitting, you agree Highlander may contact you by phone, text, or email about your inquiry. Reply STOP to opt out. See our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
        </span>
      </p>
    </motion.div>
  );
}

/* ─── Interactive tool cards ─── */
function StormChecklistCard() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false, false, false]);
  const items = [
    "Stay safe — do not climb on the roof",
    "Photograph visible damage from the ground",
    "Check interior for water stains or drips",
    "Inspect gutters and downspouts for dents",
    "Contact your insurance company",
    "Call Highlander for a professional assessment",
  ];
  const toggle = (i: number) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));
  const completed = checked.filter(Boolean).length;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-sm p-4 max-w-[90%]">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
        <p className="text-sm font-heading font-semibold text-foreground">Storm Damage Checklist</p>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button key={i} onClick={() => toggle(i)} className="flex items-start gap-2 w-full text-left group">
            <div className={`w-4 h-4 rounded-sm border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${checked[i] ? "bg-primary border-primary" : "border-input group-hover:border-primary/40"}`}>
              {checked[i] && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
            </div>
            <span className={`text-xs font-body leading-relaxed transition-all ${checked[i] ? "text-muted-foreground line-through" : "text-foreground"}`}>{item}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-border">
        <p className="text-caption text-muted-foreground font-body">{completed} of {items.length} complete</p>
      </div>
    </motion.div>
  );
}

/* ─── Main chatbot widget ─── */
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`;

type ChatCard = { type: "lead-capture" | "storm-checklist" };

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStarters, setShowStarters] = useState(true);
  const [cards, setCards] = useState<ChatCard[]>([]);
  const [leadCaptureShown, setLeadCaptureShown] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Mobile: only reveal the chatbot trigger after the user scrolls past the hero
  // so it never covers the headline, CTAs, or trust badges on first paint.
  useEffect(() => {
    const threshold = () => Math.max(window.innerHeight * 0.9, 640);
    const onScroll = () => setScrolledPastHero(window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Hide launcher when mobile nav is open so overlays don't stack.
  useEffect(() => {
    const sync = (e: Event) => setMenuOpen((e as CustomEvent).detail?.open === true);
    window.addEventListener("mobilemenu:toggle", sync);
    return () => window.removeEventListener("mobilemenu:toggle", sync);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, cards]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Broadcast open state so other floating UI (StickyMobileCTA) can hide
  // to avoid competing for the same screen real estate on mobile.
  useEffect(() => {
    document.body.dataset.chatOpen = isOpen ? "true" : "false";
    window.dispatchEvent(new CustomEvent("chatbot:toggle", { detail: { open: isOpen } }));
    return () => { delete document.body.dataset.chatOpen; };
  }, [isOpen]);

  // Show lead capture after 4 exchanges
  useEffect(() => {
    if (exchangeCount >= 4 && !leadCaptureShown) {
      setCards(prev => [...prev, { type: "lead-capture" }]);
      setLeadCaptureShown(true);
    }
  }, [exchangeCount, leadCaptureShown]);

  const streamChat = useCallback(async (allMessages: Msg[]) => {
    setIsLoading(true);
    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages,
          context: { page: location.pathname },
        }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Connection error" }));
        setMessages(prev => [...prev, { role: "assistant", content: err.error || actionableError(null, "chat") }]);
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Check if response mentions storm — show checklist
      const lower = assistantSoFar.toLowerCase();
      if ((lower.includes("storm") || lower.includes("damage checklist")) && !cards.some(c => c.type === "storm-checklist")) {
        setCards(prev => [...prev, { type: "storm-checklist" }]);
      }

      setExchangeCount(prev => prev + 1);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please call us at (828) 524-7773 and we'll be happy to help." }]);
    }
    setIsLoading(false);
  }, [location.pathname, cards]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isLoading) return;
    setShowStarters(false);
    const userMsg: Msg = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setExchangeCount(prev => prev + 1);
    streamChat(updated);
  }, [messages, isLoading, streamChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const quickStarters = getQuickStarters(location.pathname);

  // Handle markdown links to navigate within the app
  const renderMarkdown = (content: string) => (
    <div className="prose prose-sm prose-stone max-w-none [&_p]:mb-1 [&_p:last-child]:mb-0 [&_a]:text-[hsl(var(--gold-ink))] [&_a]:no-underline [&_a:hover]:underline [&_strong]:text-foreground">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("/")) {
              return (
                <Link
                  to={href}
                  onClick={() => setIsOpen(false)}
                  className="text-[hsl(var(--gold-ink))] font-semibold hover:underline inline"
                >
                  {children}
                </Link>
              );
            }
            return <a href={href} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--gold-ink))] font-semibold">{children}</a>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!isOpen && !menuOpen && (!isMobile || scrolledPastHero) && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => { setIsOpen(true); trackChatbotOpen(); }}
            className="fixed right-4 md:right-6 bottom-[calc(env(safe-area-inset-bottom,0px)+80px)] md:bottom-6 z-40 md:z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground shadow-floating hover:shadow-floating flex items-center justify-center group"
            aria-label="Open project assistant"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-background" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[400px] h-[100dvh] md:h-[580px] md:rounded-lg overflow-hidden border border-border shadow-floating flex flex-col bg-background"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shrink-0">
              <div>
                <p className="font-heading text-sm font-semibold tracking-wide">Highlander Project Assistant</p>
                <p className="text-caption opacity-60 font-body">Roofing & Construction — your guide in WNC</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-sm hover:bg-white/10 transition-colors" aria-label="Close chat">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="bg-secondary rounded-sm rounded-bl-none p-3 max-w-[85%]">
                    <p className="text-sm text-foreground font-body leading-relaxed">
                      Welcome to Highlander. Whether you're thinking about a <strong>roofing</strong> project or a <strong>construction</strong> project — additions, renovations, outdoor spaces, or something custom — I'm here to help you find the right path. What's on your mind?
                    </p>
                  </div>
                  {showStarters && (
                    <div className="flex flex-wrap gap-2">
                      {quickStarters.map(s => {
                        const Icon = s.icon;
                        return (
                          <button
                            key={s.label}
                            onClick={() => sendMessage(s.message)}
                            className="text-xs font-body font-medium px-3 py-1.5 rounded-sm border border-border bg-card hover:bg-secondary hover:border-accent/30 transition-all text-foreground inline-flex items-center gap-1.5"
                          >
                            <Icon className="w-3 h-3 text-muted-foreground" />
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-sm text-sm font-body leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-foreground rounded-bl-none"
                  }`}>
                    {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                  </div>
                </div>
              ))}

              {/* Interactive cards */}
              {cards.map((card, i) => (
                <div key={`card-${i}`} className="flex justify-start">
                  {card.type === "lead-capture" && (
                    <LeadCaptureCard
                      onSubmit={() => {}}
                      onDismiss={() => setCards(prev => prev.filter((_, idx) => idx !== i))}
                      transcript={messages}
                    />
                  )}
                  {card.type === "storm-checklist" && <StormChecklistCard />}
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-sm rounded-bl-none p-3">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer: input + phone CTA */}
            <div className="shrink-0 border-t border-border bg-card">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-2">
                <input
                  aria-label="Describe your project"
                  {...fieldAttrs.chat}
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Describe your project…"
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none py-1.5"
                  maxLength={1000}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
                  aria-label="Send message"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
              <div className="px-3 pb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-body">Prefer to talk?</span>
                <a href="tel:+18285247773" className="inline-flex items-center gap-1 font-body font-medium text-primary hover:text-[hsl(var(--gold-ink))] transition-colors">
                  <Phone className="w-3 h-3" /> (828) 524-7773
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
