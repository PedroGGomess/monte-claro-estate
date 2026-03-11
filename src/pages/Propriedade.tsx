import { Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import ScrollReveal from "@/components/ScrollReveal";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/siteConfig";

const galleryImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=90",
  "https://images.unsplash.com/photo-1560179304-6fc1d8749b23?w=900&q=90",
];

const stats = [
  { value: "48 ha", labelPt: "Área Total", labelEn: "Total Area" },
  { value: "580 m²", labelPt: "Área Construída", labelEn: "Built Area" },
  { value: "T5", labelPt: "Tipologia", labelEn: "Type" },
  { value: "1873", labelPt: "Fundação", labelEn: "Founded" },
  { value: "12 ha", labelPt: "Olival", labelEn: "Olive Grove" },
  { value: "20 ha", labelPt: "Montado de Sobro", labelEn: "Cork Oak Forest" },
  { value: "∞", labelPt: "Água Própria", labelEn: "Own Water Source" },
  { value: "100%", labelPt: "Autossuficiente", labelEn: "Self-Sufficient" },
];

const features = [
  {
    titlePt: "Olival Centenário",
    titleEn: "Century-Old Olive Grove",
    icon: "🫒",
  },
  {
    titlePt: "Casa Senhorial",
    titleEn: "Manor House",
    icon: "🏛️",
  },
  {
    titlePt: "Montado de Sobro",
    titleEn: "Cork Oak Forest",
    icon: "🌳",
  },
  {
    titlePt: "Água Própria",
    titleEn: "Own Water Source",
    icon: "💧",
  },
  {
    titlePt: "Autossuficiente",
    titleEn: "Self-Sufficient",
    icon: "⚡",
  },
  {
    titlePt: "Fundada 1873",
    titleEn: "Founded 1873",
    icon: "📜",
  },
];

const Propriedade = () => {
  const { t, language } = useLanguage();

  return (
    <div style={{ background: "#08060A", minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ height: "70vh", marginTop: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90"
          alt="A Propriedade"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.5) saturate(0.8)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="label-upper mb-6">{t("propriedade.hero")}</p>
          <h1
            className="heading-display text-center"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)", color: "#F2EAD8" }}
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
          style={{ borderTop: "1px solid rgba(200,160,80,0.18)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-10 px-8 text-center ${i % 4 !== 3 ? "md:border-r gold-border-line" : ""} ${i < 4 ? "border-b gold-border-line" : ""}`}
            >
              <div className="font-display text-gold text-3xl md:text-[38px] tracking-wide">
                {s.value}
              </div>
              <div className="label-muted mt-3">{language === "pt" ? s.labelPt : s.labelEn}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Two-column layout */}
      <div className="px-8 md:px-14 py-16 md:py-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[100px]">
          {/* Left: text */}
          <div>
            <ScrollReveal>
              <span className="label-upper">{t("about.label")}</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-display text-bone text-4xl md:text-[52px] mt-8 leading-[1.1]">
                {language === "pt" ? (
                  <>Onde o tempo ainda é <em>nosso</em></>
                ) : (
                  <>Where time still <em>belongs</em> to us</>
                )}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <blockquote
                className="border-l border-gold/40 pl-6 mt-10 font-display italic text-xl leading-relaxed"
                style={{ color: "rgba(242,234,216,0.7)", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("about.quote")}
              </blockquote>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="body-text mt-10">{siteConfig.about.p1}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="body-text mt-6">{siteConfig.about.p2}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <p className="body-text mt-6">{siteConfig.about.p3}</p>
            </ScrollReveal>
          </div>

          {/* Right: stacked images */}
          <div className="flex flex-col gap-4">
            {galleryImages.map((src, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={src}
                    alt=""
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
      <div style={{ borderTop: "1px solid rgba(200,160,80,0.18)" }}>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {features.map((f, i) => (
            <ScrollReveal
              key={i}
              delay={i * 0.1}
              className={`px-8 py-14 flex flex-col items-center text-center group ${
                i % 3 !== 2 ? "md:border-r gold-border-line" : ""
              } ${i < 3 ? "border-b gold-border-line" : ""}`}
            >
              <span style={{ fontSize: "2rem" }}>{f.icon}</span>
              <h3
                className="font-display mt-4 text-lg"
                style={{ color: "#F2EAD8", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {language === "pt" ? f.titlePt : f.titleEn}
              </h3>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <ScrollReveal>
        <div className="py-24 flex flex-col items-center text-center px-8" style={{ borderTop: "1px solid rgba(200,160,80,0.18)" }}>
          <h2
            className="heading-display text-bone"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {language === "pt" ? <>Agendar uma <em>Visita Privada</em></> : <>Schedule a <em>Private Visit</em></>}
          </h2>
          <p className="body-text mt-6 max-w-[480px]">
            {language === "pt"
              ? "Uma experiência exclusiva, ao ritmo do Alentejo."
              : "An exclusive experience, at the pace of Alentejo."}
          </p>
          <Link to="/agendar" className="btn-calendly mt-10">
            {t("propriedade.cta")}
          </Link>
        </div>
      </ScrollReveal>

      <SiteFooter />
    </div>
  );
};

export default Propriedade;
