import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Category = "todos" | "casa" | "terra" | "paisagem";

const allImages = [
  { src: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=1200&q=90", captionPt: "Vista Panorâmica", captionEn: "Panoramic View", category: "paisagem" as Category },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=90", captionPt: "Planície Alentejana", captionEn: "Alentejo Plain", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1560179304-6fc1d8749b23?w=800&q=90", captionPt: "Olival Centenário", captionEn: "Century Olive Grove", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90", captionPt: "Fachada Principal", captionEn: "Main Facade", category: "casa" as Category },
  { src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=90", captionPt: "Interior · Sala", captionEn: "Interior · Living Room", category: "casa" as Category },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=90", captionPt: "Paisagem Alentejana", captionEn: "Alentejo Landscape", category: "paisagem" as Category },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=90", captionPt: "Montado de Sobro", captionEn: "Cork Oak Forest", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=90", captionPt: "Fauna Local", captionEn: "Local Wildlife", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=90", captionPt: "Floresta de Sobro", captionEn: "Cork Forest", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=90", captionPt: "Piscina Exterior", captionEn: "Outdoor Pool", category: "casa" as Category },
  { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=90", captionPt: "Pôr do Sol", captionEn: "Sunset", category: "paisagem" as Category },
  { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=90", captionPt: "Céu Alentejano", captionEn: "Alentejo Sky", category: "paisagem" as Category },
];

const Galeria = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = activeCategory === "todos"
    ? allImages
    : allImages.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightboxIdx((prev) => prev !== null ? (prev + 1) % filtered.length : null);

  const categories: { key: Category; label: string }[] = [
    { key: "todos", label: t("galeria.todos") },
    { key: "casa", label: t("galeria.casa") },
    { key: "terra", label: t("galeria.terra") },
    { key: "paisagem", label: t("galeria.paisagem") },
  ];

  return (
    <div style={{ background: "#08060A", minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      <div className="px-8 md:px-14" style={{ paddingTop: "120px" }}>
        {/* Title */}
        <ScrollReveal>
          <h1
            className="heading-display text-bone"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("galeria.title")}
          </h1>
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-8 mt-10 mb-14" style={{ borderBottom: "1px solid rgba(200,160,80,0.18)", paddingBottom: "24px" }}>
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className="label-upper transition-colors duration-300"
                style={{
                  color: activeCategory === key ? "#C8A050" : "rgba(242,234,216,0.35)",
                  borderBottom: activeCategory === key ? "1px solid #C8A050" : "1px solid transparent",
                  paddingBottom: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 pb-24">
          {filtered.map((img, i) => (
            <ScrollReveal key={`${activeCategory}-${i}`} delay={i * 0.06}>
              <div
                className="relative overflow-hidden group mb-4 cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={language === "pt" ? img.captionPt : img.captionEn}
                  className="w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  style={{ filter: "brightness(0.82) saturate(0.88)", display: "block" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="label-upper text-[9px]">
                    {language === "pt" ? img.captionPt : img.captionEn}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(8,6,10,0.97)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6"
            style={{ background: "none", border: "none", color: "#C8A050", cursor: "pointer" }}
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6"
            style={{ background: "none", border: "none", color: "#C8A050", cursor: "pointer" }}
          >
            <ChevronLeft size={36} />
          </button>
          <div
            className="max-w-5xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIdx].src}
              alt={language === "pt" ? filtered[lightboxIdx].captionPt : filtered[lightboxIdx].captionEn}
              className="max-h-[80vh] w-auto object-contain"
              style={{ filter: "brightness(0.95)" }}
            />
            <p className="label-upper text-[10px] mt-4 text-center">
              {language === "pt" ? filtered[lightboxIdx].captionPt : filtered[lightboxIdx].captionEn}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6"
            style={{ background: "none", border: "none", color: "#C8A050", cursor: "pointer" }}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}

      <SiteFooter />
    </div>
  );
};

export default Galeria;
