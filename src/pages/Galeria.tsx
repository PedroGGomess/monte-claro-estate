import { useState, useEffect, useCallback } from "react";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { images as herdadeImages } from "@/config/siteConfig";

type Category = "todos" | "casa" | "terra" | "paisagem";

const allImages = [
  { src: herdadeImages.hero, captionPt: "Vista Geral · Piscina", captionEn: "General View · Pool", category: "casa" as Category },
  { src: herdadeImages.arches, captionPt: "Arcadas · Exterior", captionEn: "Arches · Exterior", category: "casa" as Category },
  { src: herdadeImages.facade, captionPt: "Fachada Principal", captionEn: "Main Facade", category: "casa" as Category },
  { src: herdadeImages.kitchenMarble, captionPt: "Cozinha · Mármore", captionEn: "Kitchen · Marble", category: "casa" as Category },
  { src: herdadeImages.kitchenMinimal, captionPt: "Interior · Sala Principal", captionEn: "Interior · Main Room", category: "casa" as Category },
  { src: herdadeImages.livingRoom, captionPt: "Sala de Estar", captionEn: "Living Room", category: "casa" as Category },
  { src: herdadeImages.frontView, captionPt: "Vista Frontal · Propriedade", captionEn: "Front View · Property", category: "casa" as Category },
  { src: herdadeImages.poolPergola, captionPt: "Pérgola · Piscina", captionEn: "Pergola · Pool", category: "casa" as Category },
  { src: herdadeImages.diningKitchen, captionPt: "Sala de Jantar · Cozinha", captionEn: "Dining Room · Kitchen", category: "casa" as Category },
  { src: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=1200&q=90", captionPt: "Vista Panorâmica · Alentejo", captionEn: "Panoramic View · Alentejo", category: "paisagem" as Category },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=90", captionPt: "Paisagem Alentejana", captionEn: "Alentejo Landscape", category: "paisagem" as Category },
  { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=90", captionPt: "Pôr do Sol · Alentejo", captionEn: "Sunset · Alentejo", category: "paisagem" as Category },
  { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=90", captionPt: "Céu Alentejano", captionEn: "Alentejo Sky", category: "paisagem" as Category },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=90", captionPt: "Planície Alentejana", captionEn: "Alentejo Plain", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1560179304-6fc1d8749b23?w=800&q=90", captionPt: "Olival Centenário", captionEn: "Century Olive Grove", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=90", captionPt: "Montado de Sobro", captionEn: "Cork Oak Forest", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=90", captionPt: "Fauna Local", captionEn: "Local Wildlife", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=90", captionPt: "Floresta de Sobro", captionEn: "Cork Forest", category: "terra" as Category },
  { src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=90", captionPt: "Piscina Exterior · Luxo", captionEn: "Outdoor Pool · Luxury", category: "casa" as Category },
];

const Galeria = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = activeCategory === "todos"
    ? allImages
    : allImages.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImage = useCallback(() => setLightboxIdx((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null), [filtered.length]);
  const nextImage = useCallback(() => setLightboxIdx((prev) => prev !== null ? (prev + 1) % filtered.length : null), [filtered.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") { closeLightbox(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); prevImage(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); nextImage(); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, closeLightbox, prevImage, nextImage]);

  const categories: { key: Category; label: string }[] = [
    { key: "todos", label: t("galeria.todos") },
    { key: "casa", label: t("galeria.casa") },
    { key: "terra", label: t("galeria.terra") },
    { key: "paisagem", label: t("galeria.paisagem") },
  ];

  const caption = (img: typeof allImages[0]) =>
    language === "pt" ? img.captionPt : img.captionEn;

  return (
    <div className="bg-background" style={{ minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      {/* Hero strip */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "55vh", minHeight: 320 }}
      >
        <img
          src={herdadeImages.hero}
          alt="Herdade do Monte Claro"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.80)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-14">
          <span className="label-upper mb-6" style={{ color: "hsl(var(--gold))" }}>
            {t("gallery.label")}
          </span>
          <h1
            className="heading-display"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(242,234,216,0.94)",
              lineHeight: 1,
            }}
          >
            {t("galeria.title")}
          </h1>
          <p
            className="mt-4"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.25em",
              color: "rgba(242,234,216,0.45)",
            }}
          >
            {filtered.length} {language === "pt" ? "FOTOGRAFIAS" : "PHOTOGRAPHS"}
          </p>
        </div>
      </div>

      <div className="px-8 md:px-14">
        {/* Category filter */}
        <ScrollReveal>
          <div
            className="flex items-center gap-6 sm:gap-10 mt-10 mb-12"
            style={{ borderBottom: "1px solid hsl(var(--gold) / 0.18)", paddingBottom: "20px" }}
          >
            {categories.map(({ key, label }) => {
              const count = key === "todos" ? allImages.length : allImages.filter(i => i.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className="label-upper transition-colors duration-300 flex items-center gap-2"
                  style={{
                    color: activeCategory === key ? "hsl(var(--gold))" : "rgba(30,22,14,0.35)",
                    borderBottom: activeCategory === key ? "1px solid hsl(var(--gold))" : "1px solid transparent",
                    paddingBottom: "4px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {label}
                  <span style={{ fontSize: "8px", opacity: 0.6 }}>({count})</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-[6px] pb-28">
          {filtered.map((img, i) => (
            <ScrollReveal key={`${activeCategory}-${i}`} delay={Math.min(i * 0.05, 0.4)}>
              <div
                className="relative overflow-hidden group mb-[6px] cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={caption(img)}
                  className="w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]"
                  style={{ filter: "brightness(0.84) saturate(0.88)", display: "block" }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                  style={{ background: "linear-gradient(to top, rgba(10,8,6,0.72) 0%, transparent 55%)" }}
                >
                  <div>
                    <span className="label-upper text-[8px]" style={{ color: "rgba(242,234,216,0.75)" }}>
                      {caption(img)}
                    </span>
                  </div>
                </div>
                {/* Subtle border on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ border: "1px solid hsl(var(--gold) / 0.22)" }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(8,6,4,0.96)" }}
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5"
            style={{ borderBottom: "1px solid rgba(200,160,80,0.12)" }}
          >
            <span className="label-upper text-[8px]" style={{ color: "rgba(200,160,80,0.55)" }}>
              {lightboxIdx + 1} / {filtered.length}
            </span>
            <span className="label-upper text-[8px]" style={{ color: "rgba(200,160,80,0.55)" }}>
              {caption(filtered[lightboxIdx])}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              style={{ background: "none", border: "none", color: "rgba(200,160,80,0.7)", cursor: "pointer" }}
              aria-label="Fechar"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav: prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 z-10"
            style={{ background: "none", border: "none", color: "rgba(200,160,80,0.6)", cursor: "pointer" }}
            aria-label="Anterior"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image */}
          <div
            className="flex flex-col items-center px-16 md:px-24 max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
            style={{ marginTop: "60px" }}
          >
            <img
              src={filtered[lightboxIdx].src}
              alt={caption(filtered[lightboxIdx])}
              className="max-h-[75vh] w-auto object-contain"
              style={{
                filter: "brightness(0.96)",
                border: "1px solid rgba(200,160,80,0.12)",
              }}
            />
          </div>

          {/* Nav: next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 z-10"
            style={{ background: "none", border: "none", color: "rgba(200,160,80,0.6)", cursor: "pointer" }}
            aria-label="Próxima"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}

      <SiteFooter />
    </div>
  );
};

export default Galeria;
