import { useState, useEffect, useCallback } from "react";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { images as herdadeImages } from "@/config/siteConfig";

type Category = "todos" | "casa";

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
  { src: herdadeImages.aerialClose, captionPt: "Vista Aérea · Pátio e Piscina", captionEn: "Aerial View · Courtyard & Pool", category: "casa" as Category },
  { src: herdadeImages.aerialWide, captionPt: "Vista Aérea · Propriedade", captionEn: "Aerial View · Property", category: "casa" as Category },
];

const Galeria = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

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
        style={{ height: "50vh", minHeight: "280px" }}
      >
        <img
          src={herdadeImages.hero}
          alt="Herdade do Monte Claro"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.40) saturate(0.80)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 md:px-14 pb-10 sm:pb-12 md:pb-14">
          <span className="label-upper mb-4 sm:mb-6 text-[7px] sm:text-[9px]" style={{ color: "hsl(var(--gold))" }}>
            {t("gallery.label")}
          </span>
          <h1
            className="heading-display"
            style={{
              fontSize: "clamp(2rem, 8vw, 9rem)",
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(242,234,216,0.94)",
              lineHeight: 1,
            }}
          >
            {t("galeria.title")}
          </h1>
          <p
            className="mt-3 sm:mt-4 text-[9px] sm:text-[11px]"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              letterSpacing: "0.25em",
              color: "rgba(242,234,216,0.45)",
            }}
          >
            {filtered.length} {language === "pt" ? "FOTOGRAFIAS" : "PHOTOGRAPHS"}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-14" style={{ paddingTop: "60px" }}>
        {/* Category filter */}
        <ScrollReveal>
          <div
            className="flex flex-wrap items-center gap-3 sm:gap-6 md:gap-8 mb-10 md:mb-14"
            style={{ borderBottom: "1px solid hsl(var(--gold) / 0.18)", paddingBottom: "14px" }}
          >
            {categories.map(({ key, label }) => {
              const count = key === "todos" ? allImages.length : allImages.filter(i => i.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => { setActiveCategory(key); setImageLoaded({}); }}
                  className="label-upper transition-all duration-300 flex items-center gap-1.5 sm:gap-2 text-[7px] sm:text-[9px]"
                  style={{
                    color: activeCategory === key ? "hsl(var(--gold))" : "rgba(30,22,14,0.40)",
                    background: activeCategory === key ? "hsl(var(--gold) / 0.06)" : "none",
                    border: "none",
                    borderBottom: activeCategory === key ? "2px solid hsl(var(--gold))" : "2px solid transparent",
                    padding: "6px 3px 5px",
                    cursor: "pointer",
                  }}
                >
                  {label}
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      fontSize: "7px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: activeCategory === key ? "hsl(var(--gold) / 0.12)" : "rgba(30,22,14,0.06)",
                      color: activeCategory === key ? "hsl(var(--gold))" : "rgba(30,22,14,0.35)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3px] sm:gap-[5px] pb-20 sm:pb-28">
          {filtered.map((img, i) => (
            <ScrollReveal key={`${activeCategory}-${i}`} delay={Math.min(i * 0.04, 0.3)}>
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{
                  aspectRatio: i % 5 === 0 ? "3/4" : "4/3",
                }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={caption(img)}
                  className="w-full h-full object-cover transition-all duration-[1.6s] group-hover:scale-[1.08]"
                  style={{
                    filter: "brightness(0.82) saturate(0.90)",
                    display: "block",
                    opacity: imageLoaded[i] !== false ? 1 : 0.3,
                  }}
                  loading="lazy"
                  onLoad={() => setImageLoaded(prev => ({ ...prev, [i]: true }))}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 flex items-end justify-between p-5 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to top, rgba(10,8,6,0.65) 0%, rgba(10,8,6,0.1) 35%, transparent 60%)" }}
                >
                  <span
                    className="label-upper text-[8px] transition-all duration-500 opacity-70 group-hover:opacity-100"
                    style={{ color: "rgba(242,234,216,0.90)" }}
                  >
                    {caption(img)}
                  </span>
                  <ZoomIn
                    size={16}
                    className="opacity-0 group-hover:opacity-70 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                    style={{ color: "rgba(242,234,216,0.80)" }}
                  />
                </div>
                {/* Gold border on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ border: "1px solid hsl(var(--gold) / 0.35)" }}
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
          style={{ background: "rgba(8,6,4,0.97)" }}
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 gap-2"
            style={{ borderBottom: "1px solid rgba(200,160,80,0.12)" }}
          >
            <span className="label-upper text-[7px] sm:text-[8px] shrink-0" style={{ color: "rgba(200,160,80,0.55)" }}>
              {lightboxIdx + 1} / {filtered.length}
            </span>
            <span className="label-upper text-[7px] sm:text-[8px] flex-1 text-center truncate" style={{ color: "rgba(200,160,80,0.55)" }}>
              {caption(filtered[lightboxIdx])}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              style={{ background: "none", border: "none", color: "rgba(200,160,80,0.7)", cursor: "pointer", flexShrink: 0 }}
              aria-label="Fechar"
            >
              <X size={18} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Nav: prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 sm:left-4 md:left-8 z-10 transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(200,160,80,0.08)", border: "1px solid rgba(200,160,80,0.2)", color: "rgba(200,160,80,0.7)", cursor: "pointer", padding: "8px", minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="sm:w-7 sm:h-7" />
          </button>

          {/* Image */}
          <div
            className="flex flex-col items-center px-3 sm:px-8 md:px-24 max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
            style={{ marginTop: "60px" }}
          >
            <img
              src={filtered[lightboxIdx].src}
              alt={caption(filtered[lightboxIdx])}
              className="max-h-[60vh] sm:max-h-[75vh] w-auto object-contain"
              style={{
                filter: "brightness(0.98)",
                border: "1px solid rgba(200,160,80,0.15)",
              }}
            />
            {/* Caption below image */}
            <p
              className="mt-3 sm:mt-4 label-upper text-[7px] sm:text-[9px] px-2"
              style={{ color: "rgba(200,160,80,0.5)" }}
            >
              {caption(filtered[lightboxIdx])}
            </p>
          </div>

          {/* Nav: next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 sm:right-4 md:right-8 z-10 transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(200,160,80,0.08)", border: "1px solid rgba(200,160,80,0.2)", color: "rgba(200,160,80,0.7)", cursor: "pointer", padding: "8px", minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Próxima"
          >
            <ChevronRight size={20} className="sm:w-7 sm:h-7" />
          </button>

          {/* Thumbnail strip at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-[2px] sm:gap-[3px] px-3 sm:px-8 py-3 sm:py-4 overflow-x-auto"
            style={{ background: "rgba(8,6,4,0.8)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {filtered.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIdx(i)}
                className="shrink-0 overflow-hidden transition-all duration-300"
                style={{
                  width: i === lightboxIdx ? "clamp(32px, 6vw, 48px)" : "clamp(24px, 5vw, 36px)",
                  height: i === lightboxIdx ? "clamp(24px, 5vw, 36px)" : "clamp(20px, 4vw, 28px)",
                  opacity: i === lightboxIdx ? 1 : 0.4,
                  border: i === lightboxIdx ? "1px solid rgba(200,160,80,0.5)" : "1px solid transparent",
                  cursor: "pointer",
                  background: "none",
                  padding: 0,
                  minWidth: "20px",
                  minHeight: "20px",
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
};

export default Galeria;
