import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const imgStyle = { filter: "brightness(0.88) saturate(0.90)" };
const hoverOverlay = {
  background: "linear-gradient(to top, rgba(20,15,10,0.55) 0%, transparent 60%)",
};

const GallerySection = () => {
  const { t, language } = useLanguage();
  const gallery = siteConfig.gallery;

  const cap = (img: typeof gallery[0]) =>
    language === "pt" ? img.caption : img.captionEn;

  return (
    <section id="galeria" className="px-4 sm:px-6 md:px-14 py-12 sm:py-16 md:py-24">
      <ScrollReveal className="mb-8 sm:mb-12">
        <span className="label-upper">{t("gallery.label")}</span>
      </ScrollReveal>

      {/* Primary grid: first image large on left, two stacked on right */}
      <div
        className="grid gap-[2px] mb-[2px] grid-cols-1 md:grid-cols-[1.6fr_1fr]"
        style={{ gridTemplateRows: "auto" }}
      >
        {/* Large image spanning both rows */}
        <ScrollReveal
          delay={0}
          className="relative overflow-hidden group md:[grid-row:1/3]"
          style={{ aspectRatio: "4/3" }}
        >
          <img
            src={gallery[0].src}
            alt={cap(gallery[0])}
            className="w-full h-full object-cover transition-all duration-[1.2s] group-hover:scale-[1.03]"
            style={imgStyle}
            loading="lazy"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-6" style={hoverOverlay}>
            <span className="label-upper text-[10px]" style={{ color: "rgba(242,236,224,0.85)" }}>
              {cap(gallery[0])}
            </span>
          </div>
        </ScrollReveal>

        {/* Two stacked images on right */}
        {gallery.slice(1, 3).map((img, i) => (
          <ScrollReveal key={i + 1} delay={(i + 1) * 0.1} className="relative overflow-hidden group">
            <img
              src={img.src}
              alt={cap(img)}
              className="w-full h-full object-cover transition-all duration-[1.2s] group-hover:scale-[1.03]"
              style={imgStyle}
              loading="lazy"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-6" style={hoverOverlay}>
              <span className="label-upper text-[10px]" style={{ color: "rgba(242,236,224,0.85)" }}>
                {cap(img)}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Secondary row: remaining images equal width */}
      {gallery.length > 3 && (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-[2px]"
          style={{ gridTemplateRows: "auto" }}
        >
          {gallery.slice(3).map((img, i) => (
            <ScrollReveal key={i + 3} delay={(i + 3) * 0.1} className="relative overflow-hidden group">
              <img
                src={img.src}
                alt={cap(img)}
                className="w-full h-full object-cover transition-all duration-[1.2s] group-hover:scale-[1.03]"
                style={imgStyle}
                loading="lazy"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-6" style={hoverOverlay}>
                <span className="label-upper text-[10px]" style={{ color: "rgba(242,236,224,0.85)" }}>
                  {cap(img)}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
};

export default GallerySection;
