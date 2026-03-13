import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import HeroScene from "@/components/HeroScene";
import HeroOverlay from "@/components/HeroOverlay";
import StatsStrip from "@/components/StatsStrip";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import VisitSection from "@/components/VisitSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <div className="bg-background min-h-screen">
    <CustomCursor />
    <FilmGrain />

    {/* Hero */}
    <section className="relative w-full h-screen overflow-hidden">
      <HeroScene />
      <HeroOverlay />
    </section>

    <StatsStrip />
    <AboutSection />
    <FeaturesSection />
    <GallerySection />
    <LocationSection />
    <VisitSection />
    <SiteFooter />
  </div>
);

export default Index;
