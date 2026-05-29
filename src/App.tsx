import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import ScrollToTop from "./components/ScrollToTop";
import { initPixels } from "./lib/analytics";

// Initialize tracking pixels
initPixels();

// Lazy-load all non-home routes for faster LCP on initial load
const NotFound = lazy(() => import("./pages/NotFound"));
const TownPage = lazy(() => import("./pages/TownPage"));
const CountyPage = lazy(() => import("./pages/CountyPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const About = lazy(() => import("./pages/About"));
const LayoutsPlanning = lazy(() => import("./pages/LayoutsPlanning"));
const Team = lazy(() => import("./pages/Team"));


const Certifications = lazy(() => import("./pages/Certifications"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Financing = lazy(() => import("./pages/Financing"));
const Careers = lazy(() => import("./pages/Careers"));
const RequestInspection = lazy(() => import("./pages/RequestInspection"));
const SEOMonitoring = lazy(() => import("./pages/SEOMonitoring"));
const RoofingDivision = lazy(() => import("./pages/RoofingDivision"));
const RoofReplacement = lazy(() => import("./pages/RoofReplacement"));
const RoofRepair = lazy(() => import("./pages/RoofRepair"));
const StormDamage = lazy(() => import("./pages/StormDamage"));
const RoofReplacementAds = lazy(() => import("./pages/RoofReplacementAds"));
const RoofRepairAds = lazy(() => import("./pages/RoofRepairAds"));
const StormDamageAds = lazy(() => import("./pages/StormDamageAds"));
const CommercialRoofing = lazy(() => import("./pages/CommercialRoofing"));
const MetalRoofing = lazy(() => import("./pages/MetalRoofing"));
const SyntheticRoofing = lazy(() => import("./pages/SyntheticRoofing"));
const Skylights = lazy(() => import("./pages/Skylights"));
const ServiceTownPage = lazy(() => import("./pages/ServiceTownPage"));
const ConstructionDivision = lazy(() => import("./pages/ConstructionDivision"));
const HomeAdditions = lazy(() => import("./pages/HomeAdditions"));
const OutdoorLiving = lazy(() => import("./pages/OutdoorLiving"));
const Renovations = lazy(() => import("./pages/Renovations"));
const Siding = lazy(() => import("./pages/Siding"));
const ConstructionConsultation = lazy(() => import("./pages/ConstructionConsultation"));
const QuoteFlow = lazy(() => import("./pages/QuoteFlow"));
const Contact = lazy(() => import("./pages/Contact"));
const RoofingIntake = lazy(() => import("./pages/RoofingIntake"));
const ConstructionIntake = lazy(() => import("./pages/ConstructionIntake"));
const IntakeChooser = lazy(() => import("./pages/IntakeChooser"));
const RoofingBuilder = lazy(() => import("./pages/RoofingBuilder"));
const ConstructionBuilder = lazy(() => import("./pages/ConstructionBuilder"));
const DesignIntake = lazy(() => import("./pages/DesignIntake"));



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
          <Route path="/" element={<Index />} />

          {/* ─── Roofing Division ─── */}
          <Route path="/roofing" element={<RoofingDivision />} />
          <Route path="/roofing/roof-replacement" element={<RoofReplacement />} />
          <Route path="/roofing/roof-repair" element={<RoofRepair />} />
          <Route path="/roofing/storm-damage" element={<StormDamage />} />
          <Route path="/roofing/commercial" element={<CommercialRoofing />} />
          {/* Redirects for retired roofing routes */}
          <Route path="/roofing/residential" element={<Navigate to="/roofing" replace />} />
          <Route path="/roofing/specialty" element={<Navigate to="/roofing" replace />} />
          {/* Tier 1 premium service pages */}
          <Route path="/roofing/metal" element={<MetalRoofing />} />
          <Route path="/roofing/brava-synthetic" element={<SyntheticRoofing />} />
          <Route path="/roofing/skylights" element={<Skylights />} />

          {/* ─── Paid landing pages (kept for ad spend, excluded from nav) ─── */}
          <Route path="/lp/roof-replacement" element={<RoofReplacementAds />} />
          <Route path="/lp/roof-repair" element={<RoofRepairAds />} />
          <Route path="/lp/storm-damage" element={<StormDamageAds />} />

          {/* ─── Construction Division ─── */}
          <Route path="/construction" element={<ConstructionDivision />} />
          <Route path="/construction/additions" element={<HomeAdditions />} />
          <Route path="/construction/outdoor-living" element={<OutdoorLiving />} />
          <Route path="/construction/consultation" element={<ConstructionConsultation />} />
          {/* Redirects for retired construction routes */}
          <Route path="/construction/renovations" element={<Renovations />} />
          <Route path="/construction/siding" element={<Siding />} />
          <Route path="/construction/exterior" element={<Navigate to="/construction/siding" replace />} />
          <Route path="/construction/custom" element={<Navigate to="/construction" replace />} />
          <Route path="/construction/flatwork" element={<Navigate to="/construction" replace />} />

          {/* ─── Layouts & Planning (Supporting Branch) ─── */}
          <Route path="/layouts-planning" element={<LayoutsPlanning />} />

          {/* ─── Legacy service routes → canonical division pages ─── */}
          <Route path="/services" element={<Navigate to="/roofing" replace />} />
          <Route path="/services/:slug" element={<Navigate to="/roofing" replace />} />
          <Route path="/commercial-roofing" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/commercial-maintenance" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/gutters" element={<Navigate to="/roofing" replace />} />
          <Route path="/outdoor-living" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction-services" element={<Navigate to="/construction" replace />} />

          {/* ─── Company ─── */}
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/service-areas/:slug" element={<TownPage />} />
          <Route path="/service-areas/county/:slug" element={<CountyPage />} />
          <Route path="/service-areas/:townSlug/:serviceSlug" element={<ServiceTownPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />

          
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/storm-center" element={<Navigate to="/roofing/storm-damage" replace />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/request-inspection" element={<RequestInspection />} />

          {/* Internal-only admin tool */}
          <Route path="/seo-monitoring" element={<SEOMonitoring />} />

          {/* Removed: /roof-designer, /free-tools, /seo-checklist, /internal-linking-qa, /keyword-map, /seo-launch-qa */}
          <Route path="/roof-designer" element={<Navigate to="/" replace />} />
          <Route path="/free-tools" element={<Navigate to="/" replace />} />

          <Route path="/consultation" element={<IntakeChooser />} />
          <Route path="/roofing-intake" element={<RoofingIntake />} />
          <Route path="/construction-intake" element={<ConstructionIntake />} />
          <Route path="/roofing-builder" element={<RoofingBuilder />} />
          <Route path="/construction-builder" element={<ConstructionBuilder />} />
          <Route path="/design-intake" element={<DesignIntake />} />

          <Route path="/design-intake" element={<DesignIntake />} />

          <Route path="/construction/consultation" element={<Navigate to="/construction-intake" replace />} />
          <Route path="/request-inspection" element={<Navigate to="/roofing-intake" replace />} />
          <Route path="/quote-flow" element={<QuoteFlow />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ChatbotWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
