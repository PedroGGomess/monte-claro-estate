import { Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import ScrollReveal from "@/components/ScrollReveal";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig, images } from "@/config/siteConfig";

const galleryImages = [
  { src: images.hero, captionPt: "Vista Geral", captionEn: "General View" },
  { src: images.frontView, captionPt: "Fachada", captionEn: "Facade" },
  { src: images.aerialClose, captionPt: "Vista Aérea · Pátio", captionEn: "Aerial View · Courtyard" },
  { src: images.aerialWide, captionPt: "Vista Aérea · Propriedade", captionEn: "Aerial View · Property" },
  { src: images.poolPergola, captionPt: "Piscina", captionEn: "Pool" },
];

const stats = [
  { value: "12 ha", labelPt: "Área Total", labelEn: "Total Area" },
  { value: "500 m²", labelPt: "Área Aprovada", labelEn: "Approved Area" },
  { value: "T3+T3 + 6 lofts", labelPt: "Tipologia", labelEn: "Typology" },
  { value: "3", labelPt: "Fontes de Água", labelEn: "Water Sources" },
  { value: "25 min", labelPt: "Melides", labelEn: "Melides" },
  { value: "30 min", labelPt: "Comporta", labelEn: "Comporta" },
  { value: "7 min", labelPt: "De Grândola", labelEn: "From Grândola" },
  { value: "1h15", labelPt: "De Lisboa", labelEn: "From Lisbon" },
  { value: "100%", labelPt: "Turismo Apto", labelEn: "Tourism Eligible" },
];

const features = [
  { titlePt: "Pronto a Construir", titleEn: "Ready to Build", image: images.facade },
  { titlePt: "Duplo Acesso", titleEn: "Dual Access", image: images.hero },
  { titlePt: "Montado de Sobreiros", titleEn: "Cork Oak Forest", image: images.frontView },
  { titlePt: "Água Abundante", titleEn: "Water Abundance", image: images.poolPergola },
  { titlePt: "Zona Turística", titleEn: "Tourism Zone", image: images.arches },
  { titlePt: "Licença Emitida", titleEn: "License Issued", image: images.kitchenMarble },
];

const Propriedade = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-background" style={{ minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ height: "60vh", minHeight: "300px", marginTop: 0 }}>
        <img
          src={images.frontView}
          alt="Herdade em Grândola"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(0.85)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <p className="label-upper mb-4 sm:mb-6 text-[7px] sm:text-[9px]">{t("propriedade.hero")}</p>
          <h1
            className="heading-display text-center"
            style={{ fontSize: "clamp(2rem, 8vw, 9rem)", color: "#F5F0E8" }}
          >
            {language === "pt" ? (
              <>A <em>Propriedade</em></>
            ) : (
              <>The <em>Property</em></>
            )}
          </h1>
        </div>
      </div>

      {/* Stats grid */}
      <ScrollReveal>
        <div
          className="grid grid-cols-2 md:grid-cols-4 border-b gold-border-line"
          style={{ borderTop: "1px solid hsl(var(--gold) / 0.18)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-6 sm:py-8 md:py-10 px-3 sm:px-5 md:px-8 text-center ${i % 4 !== 3 ? "md:border-r gold-border-line" : ""} ${i < 4 ? "border-b gold-border-line" : ""}`}
            >
              <div className="font-display text-gold text-xl sm:text-2xl md:text-[38px] tracking-wide break-words">
                {s.value}
              </div>
              <div className="label-muted mt-2 sm:mt-3 text-[7px] sm:text-[9px]">{language === "pt" ? s.labelPt : s.labelEn}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Two-column layout */}
      <div className="px-4 sm:px-6 md:px-14 py-12 sm:py-16 md:py-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-[100px]">
          <div>
            <ScrollReveal>
              <span className="label-upper">{t("about.label")}</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-display text-bone text-2xl sm:text-3xl md:text-[52px] mt-6 sm:mt-8 leading-[1.1]">
                {language === "pt" ? (
                  <>O valor do tempo: pronto a <em>construir</em></>
                ) : (
                  <>The value of time: ready to <em>build</em></>
                )}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <blockquote
                className="border-l border-gold/40 pl-4 sm:pl-6 mt-8 sm:mt-10 font-display italic text-base sm:text-lg md:text-xl leading-relaxed"
                style={{ color: "rgba(30,22,14,0.68)", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {language === "pt" ? siteConfig.about.quote : siteConfig.about.quoteEn}
              </blockquote>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="body-text mt-10">{language === "pt" ? siteConfig.about.p1 : siteConfig.about.p1En}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="body-text mt-6">{language === "pt" ? siteConfig.about.p2 : siteConfig.about.p2En}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <p className="body-text mt-6">{language === "pt" ? siteConfig.about.p3 : siteConfig.about.p3En}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <p className="body-text mt-6">{language === "pt" ? siteConfig.about.p4 : siteConfig.about.p4En}</p>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={img.src}
                    alt={language === "pt" ? img.captionPt : img.captionEn}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.82) saturate(0.88)" }}
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div style={{ borderTop: "1px solid hsl(var(--gold) / 0.18)" }}>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {features.map((f, i) => (
            <ScrollReveal
              key={i}
              delay={i * 0.1}
              className={`relative overflow-hidden group ${
                i % 3 !== 2 ? "md:border-r gold-border-line" : ""
              } ${i < 3 ? "border-b gold-border-line" : ""}`}
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={f.image}
                alt={language === "pt" ? f.titlePt : f.titleEn}
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                style={{ filter: "brightness(0.4) saturate(0.8)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3
                  className="font-display text-lg md:text-xl tracking-wide"
                  style={{ color: "#F5F0E8", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {language === "pt" ? f.titlePt : f.titleEn}
                </h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <ScrollReveal>
        <div className="py-16 sm:py-20 md:py-24 flex flex-col items-center text-center px-4 sm:px-6 md:px-8" style={{ borderTop: "1px solid hsl(var(--gold) / 0.18)" }}>
          <h2
            className="heading-display text-foreground"
            style={{ fontSize: "clamp(1.5rem, 5vw, 4rem)" }}
          >
            {language === "pt" ? <>Agendar uma <em>Visita Privada</em></> : <>Schedule a <em>Private Visit</em></>}
          </h2>
          <p className="body-text mt-4 sm:mt-6 max-w-[480px] text-sm sm:text-base px-4">
            {language === "pt"
              ? "Uma experiência exclusiva, no Triângulo de Ouro alentejano."
              : "An exclusive experience, in the Alentejo Golden Triangle."}
          </p>
          <Link to="/agendar" className="btn-calendly mt-8 sm:mt-10" style={{ fontSize: "clamp(9px, 2vw, 11px)" }}>
            {t("propriedade.cta")}
          </Link>
        </div>
      </ScrollReveal>

      <SiteFooter />
    </div>
  );
};

export default Propriedade;
