import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import HeroScene from "@/components/HeroScene";
import HeroOverlay from "@/components/HeroOverlay";
import AboutSection from "@/components/AboutSection";
import LifestyleSection from "@/components/LifestyleSection";
import InvestmentSection from "@/components/InvestmentSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import StatsStrip from "@/components/StatsStrip";
import FeaturesSection from "@/components/FeaturesSection";
import VisitSection from "@/components/VisitSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <div className="bg-background min-h-screen">
    <CustomCursor />
    <FilmGrain />

    {/* Hero — aspirational headline */}
    <section className="relative w-full h-screen overflow-hidden">
      <HeroScene />
      <HeroOverlay />
    </section>

    {/* Narrative flow: story first, data last */}
    <AboutSection />
    <LifestyleSection />
    <InvestmentSection />
    <GallerySection />
    <LocationSection />

    {/* Technical details — at the bottom */}
    <StatsStrip />
    <FeaturesSection />

    <VisitSection />
    <SiteFooter />
  </div>
);

export default Index;
