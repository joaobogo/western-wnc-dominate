import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import LegacyTownRedirect from "./components/LegacyTownRedirect";
import { initPixels } from "./lib/analytics";
import { captureAttribution } from "./lib/leads";

// Initialize tracking pixels
initPixels();
// Persist UTM / click-id / referrer for lead attribution
captureAttribution();

// Lazy-load all non-home routes for faster LCP on initial load
const NotFound = lazy(() => import("./pages/NotFound"));
const TownPage = lazy(() => import("./pages/TownPage"));
const CountyPage = lazy(() => import("./pages/CountyPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const About = lazy(() => import("./pages/About"));
const GivingBack = lazy(() => import("./pages/GivingBack"));
const Team = lazy(() => import("./pages/Team"));
const FAQ = lazy(() => import("./pages/FAQ"));
const LayoutsPlanning = lazy(() => import("./pages/LayoutsPlanning"));



const Certifications = lazy(() => import("./pages/Certifications"));
const RecentProjects = lazy(() => import("./pages/RecentProjects"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Financing = lazy(() => import("./pages/Financing"));
const Careers = lazy(() => import("./pages/Careers"));
const RequestInspection = lazy(() => import("./pages/RequestInspection"));
const SEOMonitoring = lazy(() => import("./pages/SEOMonitoring"));
const RoofingDivision = lazy(() => import("./pages/RoofingDivision"));
const ExteriorImprovements = lazy(() => import("./pages/ExteriorImprovements"));
const ResidentialRoofing = lazy(() => import("./pages/ResidentialRoofing"));
const SpecialtyRoofing = lazy(() => import("./pages/SpecialtyRoofing"));
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
const Gutters = lazy(() => import("./pages/Gutters"));
const ServiceTownPage = lazy(() => import("./pages/ServiceTownPage"));
const ConstructionDivision = lazy(() => import("./pages/ConstructionDivision"));
const HomeAdditions = lazy(() => import("./pages/HomeAdditions"));
const OutdoorLiving = lazy(() => import("./pages/OutdoorLiving"));
const Renovations = lazy(() => import("./pages/Renovations"));
const Siding = lazy(() => import("./pages/Siding"));
const ConstructionConsultation = lazy(() => import("./pages/ConstructionConsultation"));
const ConstructionDesign = lazy(() => import("./pages/ConstructionDesign"));
const QuoteFlow = lazy(() => import("./pages/QuoteFlow"));
const Contact = lazy(() => import("./pages/Contact"));
const RoofingIntake = lazy(() => import("./pages/RoofingIntake"));
const ConstructionIntake = lazy(() => import("./pages/ConstructionIntake"));
const IntakeChooser = lazy(() => import("./pages/IntakeChooser"));
const RoofingBuilder = lazy(() => import("./pages/RoofingBuilder"));
const ConstructionBuilder = lazy(() => import("./pages/ConstructionBuilder"));
const DesignIntake = lazy(() => import("./pages/DesignIntake"));
const LegalPage = lazy(() => import("./pages/Legal"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
});

const App = () => (
  <ErrorBoundary boundary="app-root">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <ErrorBoundary boundary="route">
              <Routes>
          <Route path="/" element={<Index />} />

          {/* ─── Roofing Division ─── */}
          <Route path="/roofing" element={<RoofingDivision />} />
          <Route path="/roofing/roof-replacement" element={<RoofReplacement />} />
          <Route path="/roofing/roof-repair" element={<RoofRepair />} />
          <Route path="/roofing/storm-damage" element={<StormDamage />} />
          <Route path="/roofing/commercial" element={<CommercialRoofing />} />
          {/* Redirects for retired roofing routes */}
          <Route path="/roofing/residential" element={<ResidentialRoofing />} />
          <Route path="/roofing/specialty" element={<SpecialtyRoofing />} />
          {/* Tier 1 premium service pages */}
          <Route path="/roofing/metal" element={<MetalRoofing />} />
          <Route path="/roofing/brava-synthetic" element={<SyntheticRoofing />} />
          <Route path="/roofing/skylights" element={<Skylights />} />
          <Route path="/roofing/gutters" element={<Gutters />} />

          {/* ─── Keyword aliases — roofing search intent → existing polished pages ─── */}
          <Route path="/roofing/emergency-repair" element={<Navigate to="/roofing/storm-damage" replace />} />
          <Route path="/roofing/emergency-roof-repair" element={<Navigate to="/roofing/storm-damage" replace />} />
          <Route path="/roofing/leak-repair" element={<Navigate to="/roofing/roof-repair" replace />} />
          <Route path="/roofing/roof-leak-repair" element={<Navigate to="/roofing/roof-repair" replace />} />
          <Route path="/roofing/inspection" element={<Navigate to="/request-inspection" replace />} />
          <Route path="/roofing/roof-inspection" element={<Navigate to="/request-inspection" replace />} />
          <Route path="/roofing/asphalt" element={<Navigate to="/roofing/residential" replace />} />
          <Route path="/roofing/asphalt-shingle" element={<Navigate to="/roofing/residential" replace />} />
          <Route path="/roofing/shingle" element={<Navigate to="/roofing/residential" replace />} />

          {/* ─── Paid landing pages (kept for ad spend, excluded from nav) ─── */}
          <Route path="/lp/roof-replacement" element={<RoofReplacementAds />} />
          <Route path="/lp/roof-repair" element={<RoofRepairAds />} />
          <Route path="/lp/storm-damage" element={<StormDamageAds />} />

          {/* ─── Construction Division ─── */}
          <Route path="/construction" element={<ConstructionDivision />} />
          <Route path="/construction/additions" element={<HomeAdditions />} />
          <Route path="/construction/outdoor-living" element={<OutdoorLiving />} />
          <Route path="/construction/consultation" element={<ConstructionConsultation />} />
          <Route path="/construction/design" element={<ConstructionDesign />} />
          {/* Redirects for retired construction routes */}
          <Route path="/construction/renovations" element={<Renovations />} />
          <Route path="/construction/siding" element={<Siding />} />
          <Route path="/construction/exterior" element={<Navigate to="/construction/siding" replace />} />
          <Route path="/construction/custom" element={<Navigate to="/construction" replace />} />
          <Route path="/construction/flatwork" element={<Navigate to="/construction" replace />} />

          {/* ─── Keyword aliases — construction search intent → existing polished pages ─── */}
          <Route path="/construction/garages" element={<Navigate to="/construction/additions" replace />} />
          <Route path="/construction/garage" element={<Navigate to="/construction/additions" replace />} />
          <Route path="/construction/in-law-suite" element={<Navigate to="/construction/additions" replace />} />
          <Route path="/construction/guest-suite" element={<Navigate to="/construction/additions" replace />} />
          <Route path="/construction/porches" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/screened-porch" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/sunrooms" element={<Navigate to="/construction/additions" replace />} />
          <Route path="/construction/sunroom" element={<Navigate to="/construction/additions" replace />} />
          <Route path="/construction/two-story-addition" element={<Navigate to="/construction/additions" replace />} />
          <Route path="/construction/decks" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/deck" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/patios" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/patio" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/pergolas" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/pergola" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/outdoor-kitchen" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/fire-pit" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/construction/retaining-walls" element={<Navigate to="/construction/outdoor-living" replace />} />

          {/* ─── Gutter keyword aliases ─── */}
          <Route path="/exterior-improvements" element={<ExteriorImprovements />} />
          <Route path="/gutters/seamless" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/gutters/guards" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/gutters/downspouts" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/gutters/copper" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/gutters/aluminum" element={<Navigate to="/roofing/gutters" replace />} />

          {/* ─── Layouts & Planning (Supporting Branch) ─── */}
          <Route path="/layouts-planning" element={<LayoutsPlanning />} />

          {/* ─── Legacy service routes → canonical division pages ─── */}
          <Route path="/services" element={<Navigate to="/roofing" replace />} />
          <Route path="/services/:slug" element={<Navigate to="/roofing" replace />} />
          <Route path="/commercial-roofing" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/commercial-maintenance" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/gutters" element={<Navigate to="/roofing/gutters" replace />} />
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
          <Route path="/giving-back" element={<GivingBack />} />
          <Route path="/community" element={<GivingBack />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faq" element={<FAQ />} />

          
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/gallery" element={<Navigate to="/recent-projects" replace />} />
          <Route path="/projects" element={<Navigate to="/recent-projects" replace />} />
          <Route path="/project-gallery" element={<Navigate to="/recent-projects" replace />} />
          <Route path="/portfolio" element={<Navigate to="/recent-projects" replace />} />
          <Route path="/our-work" element={<Navigate to="/recent-projects" replace />} />
          <Route path="/recent-projects" element={<RecentProjects />} />
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
          <Route path="/quote-flow" element={<QuoteFlow />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/accessibility" element={<LegalPage kind="accessibility" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          {/* ─── Legacy WordPress backlink redirects (Hibu migration) ─── */}
          {/* Preserve SEO value from old highlandernc.com URLs. */}
          <Route path="/residential-roofing-services" element={<Navigate to="/roofing/residential" replace />} />
          <Route path="/roof-repairs" element={<Navigate to="/roofing/roof-repair" replace />} />
          <Route path="/metal-roofs" element={<Navigate to="/roofing/metal" replace />} />
          <Route path="/re-roof-specialists" element={<Navigate to="/roofing/roof-replacement" replace />} />
          <Route path="/roof-maintenance-program" element={<Navigate to="/roofing/roof-repair" replace />} />
          <Route path="/types-of-roofs-we-install" element={<Navigate to="/roofing" replace />} />
          <Route path="/gutter-services" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/gutter-installation" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/seamless-gutters" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/seamless-gutter-installation" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/design/build-services" element={<Navigate to="/construction/design" replace />} />
          <Route path="/design-build-services" element={<Navigate to="/construction/design" replace />} />
          <Route path="/patio-installation" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/request-quote-form" element={<Navigate to="/request-inspection" replace />} />
          <Route path="/request-quote-form-page" element={<Navigate to="/request-inspection" replace />} />
          <Route path="/faqs" element={<Navigate to="/faq" replace />} />
          <Route path="/highlands-nc" element={<Navigate to="/service-areas/highlands-nc" replace />} />
          <Route path="/highlands--nc" element={<Navigate to="/service-areas/highlands-nc" replace />} />
          <Route path="/the-benefits-of-metal-roof-installation-for-your-home" element={<Navigate to="/blog/metal-vs-shingle-roof-western-nc" replace />} />
          <Route path="/why-asphalt-shingle-remains-the-most-popular-roofing-material" element={<Navigate to="/blog/best-roofing-materials-highlands-nc" replace />} />
          {/* ─── SEMrush-verified legacy URLs — high-intent service pages ─── */}
          {/* Residential */}
          <Route path="/residential-roofing-repairs" element={<Navigate to="/roofing/roof-repair" replace />} />
          <Route path="/residential-roofing-installation" element={<Navigate to="/roofing/roof-replacement" replace />} />
          <Route path="/specialized-roofing-services" element={<Navigate to="/roofing/specialty" replace />} />
          <Route path="/specialty-roof-repairs" element={<Navigate to="/roofing/roof-repair" replace />} />
          <Route path="/types-of-roofs-we-repair" element={<Navigate to="/roofing/roof-repair" replace />} />
          {/* Commercial */}
          <Route path="/commercial-roofing-services" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/commercial-roofing-installation" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/commercial-roofing-repairs" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/tpo-installation" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/roof-coating-services" element={<Navigate to="/roofing/commercial" replace />} />
          {/* Metal */}
          <Route path="/metal-roof-installation" element={<Navigate to="/roofing/metal" replace />} />
          <Route path="/metal-roof-repair" element={<Navigate to="/roofing/roof-repair" replace />} />
          {/* Slate / specialty */}
          <Route path="/slate-roof-installation" element={<Navigate to="/roofing/specialty" replace />} />
          <Route path="/slate-roof-repair" element={<Navigate to="/roofing/specialty" replace />} />
          {/* Waterproofing */}
          <Route path="/roof-waterproofing" element={<Navigate to="/roofing/roof-repair" replace />} />
          {/* Gutters & guards */}
          <Route path="/leaf-guard-installation" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/gutter-protection-installation" element={<Navigate to="/roofing/gutters" replace />} />
          <Route path="/gutter-protection-systems" element={<Navigate to="/roofing/gutters" replace />} />
          {/* Outdoor / construction */}
          <Route path="/gazebos-and-pergolas" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/patio-installation" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/deck-installation" element={<Navigate to="/construction/outdoor-living" replace />} />
          <Route path="/outdoor-kitchens-and-grills" element={<Navigate to="/construction/outdoor-living" replace />} />
          {/* Skylight */}
          <Route path="/skylight-installation" element={<Navigate to="/roofing/skylights" replace />} />
          {/* Additional commercial / replacement / asphalt legacy aliases */}
          <Route path="/commercial-re-roof-specialists" element={<Navigate to="/roofing/commercial" replace />} />
          <Route path="/asphalt-shingles-installation" element={<Navigate to="/roofing/residential" replace />} />
          {/* Root-level leak repair aliases (SEMrush intent) */}
          <Route path="/roof-leak-repair" element={<Navigate to="/roofing/roof-repair" replace />} />
          <Route path="/roof-leak-repairs" element={<Navigate to="/roofing/roof-repair" replace />} />
          <Route path="/emergency-roof-repair" element={<Navigate to="/roofing/storm-damage" replace />} />
          <Route path="/emergency-roofing" element={<Navigate to="/roofing/storm-damage" replace />} />
          <Route path="/storm-damage-repair" element={<Navigate to="/roofing/storm-damage" replace />} />
          {/* Contact town-specific pages → matching service area */}
          <Route path="/contact-franklin-nc" element={<Navigate to="/service-areas/franklin-nc" replace />} />
          <Route path="/contact-sylva-nc" element={<Navigate to="/service-areas/sylva-nc" replace />} />
          <Route path="/contact-highlands-nc" element={<Navigate to="/service-areas/highlands-nc" replace />} />
          <Route path="/contact-cashiers-nc" element={<Navigate to="/service-areas/cashiers-nc" replace />} />
          <Route path="/contact-waynesville-nc" element={<Navigate to="/service-areas/waynesville-nc" replace />} />
          <Route path="/contact-bryson-city-nc" element={<Navigate to="/service-areas/bryson-city-nc" replace />} />
          <Route path="/contact-cullowhee-nc" element={<Navigate to="/service-areas/cullowhee-nc" replace />} />
          <Route path="/contact-dillsboro-nc" element={<Navigate to="/service-areas/dillsboro-nc" replace />} />
          {/* Legacy Hibu /contact/[service]-service-area/[town] wildcard */}
          <Route path="/contact/:pattern/:town" element={<LegacyTownRedirect />} />
          <Route path="/contact/local-roofers-service-area/:town" element={<LegacyTownRedirect />} />
          {/* About/team legacy aliases (about-us already covered above; add extras) */}
          <Route path="/our-team" element={<Navigate to="/team" replace />} />
          <Route path="/testimonials" element={<Navigate to="/reviews" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <ErrorBoundary boundary="chatbot" fallback={() => null}>
            <ChatbotWidget />
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
