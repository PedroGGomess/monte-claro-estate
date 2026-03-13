import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { images as herdadeImages } from "@/config/siteConfig";

const distances = [
  { placePt: "Comporta / Melides", placeEn: "Comporta / Melides", time: "20 min", notePt: "Praias exclusivas", noteEn: "Exclusive beaches" },
  { placePt: "Grândola", placeEn: "Grândola", time: "7 min", notePt: "Cidade mais próxima", noteEn: "Nearest town" },
  { placePt: "Lisboa", placeEn: "Lisbon", time: "1h 15min", notePt: "Capital", noteEn: "Capital city" },
  { placePt: "Aeroporto de Lisboa", placeEn: "Lisbon Airport", time: "1h 25min", notePt: "Internacional", noteEn: "International" },
  { placePt: "Évora", placeEn: "Évora", time: "1h 10min", notePt: "Património UNESCO", noteEn: "UNESCO Heritage" },
  { placePt: "Sevilha", placeEn: "Seville", time: "2h 30min", notePt: "Espanha", noteEn: "Spain" },
];

const pois = [
  { icon: "🏖️", namePt: "Praia da Comporta", nameEn: "Comporta Beach", descPt: "Uma das praias mais exclusivas da Europa", descEn: "One of Europe's most exclusive beaches", dist: "20 min" },
  { icon: "🏰", namePt: "Castelo de Alcácer do Sal", nameEn: "Alcácer do Sal Castle", descPt: "Vila histórica medieval à beira do Sado", descEn: "Historic medieval town on the Sado river", dist: "25 min" },
  { icon: "🌿", namePt: "Reserva Natural do Sado", nameEn: "Sado Natural Reserve", descPt: "Golfinhos, aves e paisagens únicas", descEn: "Dolphins, birds and unique landscapes", dist: "30 min" },
  { icon: "🏖️", namePt: "Praia de Melides", nameEn: "Melides Beach", descPt: "Aldeia costeira com hotelaria de luxo", descEn: "Coastal village with luxury hospitality", dist: "25 min" },
];

const Localizacao = () => {
  const { t, language } = useLanguage();

  return (
    <div style={{ background: "#08060A", minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      {/* Hero image strip */}
      <div className="relative w-full overflow-hidden" style={{ height: "50vh", minHeight: 280 }}>
        <img
          src={herdadeImages.frontView}
          alt={language === "pt" ? "Localização da Herdade" : "Estate Location"}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.32) saturate(0.65)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-12">
          <span className="label-upper mb-5" style={{ color: "hsl(var(--gold))" }}>
            {t("location.label")}
          </span>
          <h1
            className="heading-display"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(242,234,216,0.93)",
              lineHeight: 1,
            }}
          >
            {t("localizacao.title")}
          </h1>
          <p
            className="mt-4 max-w-[560px]"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.18em",
              color: "rgba(242,234,216,0.38)",
              textTransform: "uppercase",
            }}
          >
            {t("localizacao.desc")}
          </p>
        </div>
      </div>

      <div className="px-8 md:px-14" style={{ paddingTop: "72px", paddingBottom: "80px" }}>

        {/* Map + distances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[80px] max-w-[1400px] mx-auto">
          {/* Left: distance table */}
          <div>
            <ScrollReveal>
              <span className="label-upper mb-8 block">{language === "pt" ? "Distâncias" : "Distances"}</span>
            </ScrollReveal>
            {distances.map((d, i) => (
              <ScrollReveal key={i} delay={0.08 + i * 0.07}>
                <div className="flex items-center justify-between py-5 gold-border-line" style={{ borderBottomWidth: "1px", borderBottomStyle: "solid" }}>
                  <div>
                    <span
                      className="block font-body text-[14px]"
                      style={{ color: "rgba(242,234,216,0.75)", fontFamily: "'Tenor Sans', sans-serif" }}
                    >
                      {language === "pt" ? d.placePt : d.placeEn}
                    </span>
                    <span
                      className="block mt-1"
                      style={{ fontSize: "9px", letterSpacing: "0.25em", color: "rgba(200,160,80,0.45)", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase" }}
                    >
                      {language === "pt" ? d.notePt : d.noteEn}
                    </span>
                  </div>
                  <span
                    className="font-display text-gold text-[28px] shrink-0 ml-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--gold))" }}
                  >
                    {d.time}
                  </span>
                </div>
              </ScrollReveal>
            ))}

            {/* Coords */}
            <ScrollReveal delay={0.6}>
              <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(200,160,80,0.12)" }}>
                <p
                  className="font-display"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "rgba(242,234,216,0.55)", letterSpacing: "0.08em" }}
                >
                  38°10'N · 8°34'W
                </p>
                <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(200,160,80,0.4)", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase", marginTop: "6px" }}>
                  {language === "pt" ? "Coordenadas GPS · Grândola, Alentejo" : "GPS Coordinates · Grândola, Alentejo"}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: map + address card */}
          <div className="flex flex-col gap-6">
            <ScrollReveal delay={0.15}>
              <div
                className="w-full overflow-hidden relative"
                style={{
                  aspectRatio: "4/3",
                  border: "1px solid rgba(200,160,80,0.20)",
                }}
              >
                <iframe
                  title="Localização da Herdade do Monte Claro"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-8.68%2C38.10%2C-8.45%2C38.24&layer=mapnik&marker=38.1635%2C-8.5645"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {/* Subtle gold overlay on top edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                  style={{ background: "linear-gradient(to right, transparent, hsl(var(--gold) / 0.4), transparent)" }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.28}>
              <div
                className="p-7"
                style={{ background: "rgba(200,160,80,0.04)", border: "1px solid rgba(200,160,80,0.15)" }}
              >
                <span className="label-upper block mb-5" style={{ color: "hsl(var(--gold))" }}>
                  {language === "pt" ? "Morada" : "Address"}
                </span>
                <div className="space-y-2">
                  <p className="font-display text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(242,234,216,0.88)" }}>
                    Herdade do Monte Claro
                  </p>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(242,234,216,0.45)" }}>
                    Santa Margarida da Serra · Grândola
                  </p>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(242,234,216,0.45)" }}>
                    Alentejo · Portugal
                  </p>
                  <div style={{ borderTop: "1px solid rgba(200,160,80,0.12)", marginTop: "14px", paddingTop: "14px" }}>
                    <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(200,160,80,0.45)", textTransform: "uppercase" }}>
                      {language === "pt" ? "20 min da Comporta · 1h15 de Lisboa" : "20 min from Comporta · 1h15 from Lisbon"}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Points of interest */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-[1400px] mx-auto mt-24">
            <span className="label-upper block mb-10" style={{ color: "hsl(var(--gold))" }}>
              {language === "pt" ? "Pontos de Interesse" : "Points of Interest"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px]" style={{ background: "rgba(200,160,80,0.10)" }}>
              {pois.map((poi, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                  <div
                    className="p-8 h-full"
                    style={{ background: "#08060A" }}
                  >
                    <span style={{ fontSize: "28px", display: "block", marginBottom: "16px" }}>{poi.icon}</span>
                    <p className="font-display" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "rgba(242,234,216,0.85)", marginBottom: "8px" }}>
                      {language === "pt" ? poi.namePt : poi.nameEn}
                    </p>
                    <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(242,234,216,0.38)", lineHeight: 1.8, marginBottom: "16px" }}>
                      {language === "pt" ? poi.descPt : poi.descEn}
                    </p>
                    <span style={{ fontSize: "9px", letterSpacing: "0.35em", color: "hsl(var(--gold))", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase" }}>
                      {poi.dist}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom image strip */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-[1400px] mx-auto mt-20">
            <div className="grid grid-cols-3 gap-[4px]">
              {[herdadeImages.arches, herdadeImages.poolPergola, herdadeImages.livingRoom].map((src, i) => (
                <div key={i} className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={src}
                    alt="Herdade do Monte Claro"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.5) saturate(0.7)" }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Localizacao;
