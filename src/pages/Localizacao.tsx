import { useState } from "react";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { images as herdadeImages } from "@/config/siteConfig";
import { MapPin, Clock, Car, Plane, Navigation } from "lucide-react";

const distances = [
  { placePt: "Praia de Melides", placeEn: "Melides Beach", time: "25 min", notePt: "Praia exclusiva", noteEn: "Exclusive beach", icon: "beach" },
  { placePt: "Praia da Comporta", placeEn: "Comporta Beach", time: "30 min", notePt: "Praia premium", noteEn: "Premium beach", icon: "beach" },
  { placePt: "Grândola", placeEn: "Grândola", time: "7 min", notePt: "Cidade mais próxima", noteEn: "Nearest town", icon: "town" },
  { placePt: "Lisboa", placeEn: "Lisbon", time: "1h 15min", notePt: "Capital", noteEn: "Capital city", icon: "city" },
  { placePt: "Aeroporto de Lisboa", placeEn: "Lisbon Airport", time: "1h 25min", notePt: "Internacional", noteEn: "International", icon: "airport" },
  { placePt: "Évora", placeEn: "Évora", time: "1h 10min", notePt: "Património UNESCO", noteEn: "UNESCO Heritage", icon: "heritage" },
  { placePt: "Sevilha", placeEn: "Seville", time: "2h 30min", notePt: "Espanha", noteEn: "Spain", icon: "border" },
];

const pois = [
  { icon: "🏖️", namePt: "Praia da Comporta", nameEn: "Comporta Beach", descPt: "Uma das praias mais exclusivas da Europa, com areia dourada e água cristalina", descEn: "One of Europe's most exclusive beaches, with golden sand and crystal-clear water", dist: "30 min", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85" },
  { icon: "🏰", namePt: "Castelo de Alcácer do Sal", nameEn: "Alcácer do Sal Castle", descPt: "Vila histórica medieval à beira do Sado, com pousada de charme", descEn: "Historic medieval town on the Sado river, with a charming pousada", dist: "25 min", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=85" },
  { icon: "🌿", namePt: "Reserva Natural do Sado", nameEn: "Sado Natural Reserve", descPt: "Golfinhos residentes, aves migratórias e paisagens de tirar o fôlego", descEn: "Resident dolphins, migratory birds and breathtaking landscapes", dist: "30 min", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=85" },
  { icon: "🏖️", namePt: "Praia de Melides", nameEn: "Melides Beach", descPt: "Aldeia costeira com hotelaria de luxo e restaurantes exclusivos", descEn: "Coastal village with luxury hospitality and exclusive restaurants", dist: "25 min", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=85" },
];

const highlights = [
  {
    numPt: "01", numEn: "01",
    titlePt: "Pronto a Construir",
    titleEn: "Ready to Build",
    descPt: "Projeto de Arquitetura aprovado e Licença de Construção emitida. Início imediato das obras, sem anos de espera por licenciamentos.",
    descEn: "Approved Architectural Project with issued Construction License. Immediate start of works, no years of waiting for permits.",
    tagPt: "Licença emitida",
    tagEn: "License issued",
  },
  {
    numPt: "02", numEn: "02",
    titlePt: "Duplo Acesso",
    titleEn: "Dual Access",
    descPt: "Entrada por duas estradas alcatroadas independentes em extremos opostos do terreno, garantindo privacidade total e facilidade logística.",
    descEn: "Two independent paved road entrances at opposite ends of the land, ensuring total privacy and logistical ease.",
    tagPt: "2 estradas alcatroadas",
    tagEn: "2 paved roads",
  },
  {
    numPt: "03", numEn: "03",
    titlePt: "Água Abundante",
    titleEn: "Water Abundance",
    descPt: "Furo de água, 2 poços tradicionais e curso de água natural. Autossuficiência hídrica rara numa região onde a água é o bem mais precioso.",
    descEn: "Water borehole, 2 traditional wells and a natural water stream. Rare water self-sufficiency in a region where water is the most precious resource.",
    tagPt: "3 fontes hídricas",
    tagEn: "3 water sources",
  },
  {
    numPt: "04", numEn: "04",
    titlePt: "Potencial Turístico",
    titleEn: "Tourism Potential",
    descPt: "Inserido em zona apta para Projetos de Turismo segundo o PDM, com escala para expandir ou diversificar o investimento.",
    descEn: "Zoned for Tourism Projects under the Municipal Master Plan, offering scale to expand or diversify the investment.",
    tagPt: "PDM · Turismo",
    tagEn: "PDM · Tourism",
  },
];

type MapStyle = "roadmap" | "satellite";

const Localizacao = () => {
  const { t, language } = useLanguage();
  const [mapStyle, setMapStyle] = useState<MapStyle>("roadmap");

  // Google Maps embed — satellite or roadmap view
  const mapUrl = mapStyle === "satellite"
    ? "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25000!2d-8.5645!3d38.1635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2spt!4v1700000000000"
    : "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d-8.5645!3d38.1635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2spt!4v1700000000000";

  return (
    <div className="bg-background" style={{ minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      {/* Hero image strip */}
      <div className="relative w-full overflow-hidden" style={{ height: "50vh", minHeight: 280 }}>
        <img
          src={herdadeImages.frontView}
          alt={language === "pt" ? "Localização da Herdade" : "Estate Location"}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.30) saturate(0.65)" }}
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
              <div className="flex items-center gap-3 mb-8">
                <Navigation size={14} style={{ color: "hsl(var(--gold))" }} />
                <span className="label-upper">{language === "pt" ? "Distâncias" : "Distances"}</span>
              </div>
            </ScrollReveal>
            {distances.map((d, i) => (
              <ScrollReveal key={i} delay={0.08 + i * 0.07}>
                <div
                  className="flex items-center justify-between py-5 group transition-all duration-300 hover:pl-2"
                  style={{ borderBottom: "1px solid hsl(var(--gold) / 0.12)" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.12)" }}
                    >
                      {d.icon === "airport" ? <Plane size={13} style={{ color: "hsl(var(--gold))" }} /> :
                       d.icon === "city" || d.icon === "town" ? <MapPin size={13} style={{ color: "hsl(var(--gold))" }} /> :
                       <Car size={13} style={{ color: "hsl(var(--gold))" }} />}
                    </div>
                    <div>
                      <span
                        className="block font-body text-[14px]"
                        style={{ color: "rgba(30,22,14,0.75)", fontFamily: "'Tenor Sans', sans-serif" }}
                      >
                        {language === "pt" ? d.placePt : d.placeEn}
                      </span>
                      <span
                        className="block mt-1"
                        style={{ fontSize: "9px", letterSpacing: "0.25em", color: "rgba(200,160,80,0.6)", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase" }}
                      >
                        {language === "pt" ? d.notePt : d.noteEn}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <Clock size={12} style={{ color: "hsl(var(--gold) / 0.4)" }} />
                    <span
                      className="font-display text-gold"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", color: "hsl(var(--gold))" }}
                    >
                      {d.time}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Coords */}
            <ScrollReveal delay={0.6}>
              <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(200,160,80,0.18)" }}>
                <p
                  className="font-display"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "rgba(30,22,14,0.55)", letterSpacing: "0.08em" }}
                >
                  38°10'N · 8°34'W
                </p>
                <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(200,160,80,0.55)", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase", marginTop: "6px" }}>
                  {language === "pt" ? "Coordenadas GPS · Grândola, Alentejo" : "GPS Coordinates · Grândola, Alentejo"}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: map + address card */}
          <div className="flex flex-col gap-6">
            <ScrollReveal delay={0.15}>
              <div className="relative">
                {/* Map style toggle */}
                <div className="absolute top-4 right-4 z-10 flex gap-[1px]" style={{ background: "rgba(200,160,80,0.2)" }}>
                  <button
                    onClick={() => setMapStyle("roadmap")}
                    style={{
                      padding: "6px 14px",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "'Tenor Sans', sans-serif",
                      background: mapStyle === "roadmap" ? "rgba(247,242,235,0.95)" : "rgba(247,242,235,0.75)",
                      color: mapStyle === "roadmap" ? "hsl(var(--gold))" : "rgba(30,22,14,0.45)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {language === "pt" ? "Mapa" : "Map"}
                  </button>
                  <button
                    onClick={() => setMapStyle("satellite")}
                    style={{
                      padding: "6px 14px",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "'Tenor Sans', sans-serif",
                      background: mapStyle === "satellite" ? "rgba(247,242,235,0.95)" : "rgba(247,242,235,0.75)",
                      color: mapStyle === "satellite" ? "hsl(var(--gold))" : "rgba(30,22,14,0.45)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {language === "pt" ? "Satélite" : "Satellite"}
                  </button>
                </div>

                <div
                  className="w-full overflow-hidden relative"
                  style={{
                    aspectRatio: "4/3",
                    border: "1px solid rgba(200,160,80,0.20)",
                  }}
                >
                  <iframe
                    title="Localização da Herdade do Monte Claro"
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  {/* Gold overlay on top edge */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                    style={{ background: "linear-gradient(to right, transparent, hsl(var(--gold) / 0.4), transparent)" }}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Open in Google Maps button */}
            <ScrollReveal delay={0.22}>
              <a
                href="https://www.google.com/maps?q=38.1635,-8.5645"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-calendly w-full text-center block"
                style={{ fontSize: "10px" }}
              >
                {language === "pt" ? "Abrir no Google Maps" : "Open in Google Maps"}
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.28}>
              <div
                className="p-7"
                style={{ background: "rgba(200,160,80,0.05)", border: "1px solid rgba(200,160,80,0.18)" }}
              >
                <span className="label-upper block mb-5" style={{ color: "hsl(var(--gold))" }}>
                  {language === "pt" ? "Morada" : "Address"}
                </span>
                <div className="space-y-2">
                  <p className="font-display text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(30,22,14,0.88)" }}>
                    Herdade do Monte Claro
                  </p>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(30,22,14,0.55)" }}>
                    Santa Margarida da Serra · Grândola
                  </p>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(30,22,14,0.55)" }}>
                    Alentejo · Portugal
                  </p>
                  <div style={{ borderTop: "1px solid rgba(200,160,80,0.18)", marginTop: "14px", paddingTop: "14px" }}>
                    <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(200,160,80,0.65)", textTransform: "uppercase" }}>
                      {language === "pt" ? "25 min de Melides · 30 min da Comporta" : "25 min from Melides · 30 min from Comporta"}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Terrain & Dual Access section */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-[1400px] mx-auto mt-24" style={{ borderTop: "1px solid rgba(200,160,80,0.18)", paddingTop: "72px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[80px] items-center">
              <div>
                <span className="label-upper block mb-8" style={{ color: "hsl(var(--gold))" }}>
                  {language === "pt" ? "O Terreno" : "The Land"}
                </span>
                <h2
                  className="heading-display"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "rgba(30,22,14,0.88)", lineHeight: 1.1, marginBottom: "24px" }}
                >
                  {language === "pt" ? (
                    <>120.000 m² de <em>privacidade absoluta</em></>
                  ) : (
                    <>120,000 m² of <em>absolute privacy</em></>
                  )}
                </h2>
                <p
                  style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", lineHeight: 2.1, color: "rgba(30,22,14,0.62)", marginBottom: "32px" }}
                >
                  {language === "pt"
                    ? "O terreno é ladeado por duas estradas alcatroadas independentes em extremos opostos, garantindo acessibilidade premium e privacidade total. Povoado por sobreiros estrategicamente distribuídos, confere a mística do montado alentejano sem condicionar as áreas de construção aprovadas."
                    : "The land is flanked by two independent paved roads at opposite ends, guaranteeing premium accessibility and total privacy. Populated by strategically distributed cork oaks, it imparts the mystique of the Alentejo montado without conditioning the approved construction areas."}
                </p>
                <div
                  className="grid grid-cols-2 gap-[1px]"
                  style={{ background: "rgba(200,160,80,0.12)" }}
                >
                  {[
                    { valuePt: "2 Entradas", valueEn: "2 Entrances", labelPt: "Estradas Alcatroadas", labelEn: "Paved Roads" },
                    { valuePt: "12 ha", valueEn: "12 ha", labelPt: "Área Total", labelEn: "Total Area" },
                    { valuePt: "Sobreiros", valueEn: "Cork Oaks", labelPt: "Montado Alentejano", labelEn: "Alentejo Montado" },
                    { valuePt: "100%", valueEn: "100%", labelPt: "Turismo Apto · PDM", labelEn: "Tourism Eligible · PDM" },
                  ].map((item, i) => (
                    <div key={i} className="p-6" style={{ background: "hsl(var(--background))" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "hsl(var(--gold))", marginBottom: "6px" }}>
                        {language === "pt" ? item.valuePt : item.valueEn}
                      </div>
                      <div style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(30,22,14,0.45)" }}>
                        {language === "pt" ? item.labelPt : item.labelEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=90"
                  alt={language === "pt" ? "Vista aérea do terreno ladeado por duas estradas" : "Aerial view of the land flanked by two roads"}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.82) saturate(0.85)" }}
                  loading="lazy"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(8,6,4,0.6) 0%, transparent 100%)" }}
                >
                  <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(242,234,216,0.75)" }}>
                    {language === "pt" ? "Terreno · Ladeado por Duas Estradas" : "Land · Flanked by Two Roads"}
                  </span>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: "1px solid rgba(200,160,80,0.18)" }}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Property highlights */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-[1400px] mx-auto mt-24" style={{ borderTop: "1px solid rgba(200,160,80,0.18)", paddingTop: "72px" }}>
            <span className="label-upper block mb-10" style={{ color: "hsl(var(--gold))" }}>
              {language === "pt" ? "Características Fundamentais" : "Key Features"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px]" style={{ background: "rgba(200,160,80,0.12)" }}>
              {highlights.map((h, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                  <div className="p-8 h-full" style={{ background: "hsl(var(--background))" }}>
                    <span
                      className="font-display block mb-6"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", color: "rgba(200,160,80,0.25)", lineHeight: 1 }}
                    >
                      {language === "pt" ? h.numPt : h.numEn}
                    </span>
                    <p className="font-display" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "rgba(30,22,14,0.85)", marginBottom: "12px" }}>
                      {language === "pt" ? h.titlePt : h.titleEn}
                    </p>
                    <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.5)", lineHeight: 1.9, marginBottom: "20px" }}>
                      {language === "pt" ? h.descPt : h.descEn}
                    </p>
                    <span style={{ fontSize: "9px", letterSpacing: "0.35em", color: "hsl(var(--gold))", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase" }}>
                      {language === "pt" ? h.tagPt : h.tagEn}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Points of interest — now with images */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-[1400px] mx-auto mt-24" style={{ borderTop: "1px solid rgba(200,160,80,0.18)", paddingTop: "72px" }}>
            <span className="label-upper block mb-10" style={{ color: "hsl(var(--gold))" }}>
              {language === "pt" ? "Pontos de Interesse" : "Points of Interest"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px]" style={{ background: "rgba(200,160,80,0.12)" }}>
              {pois.map((poi, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                  <div
                    className="h-full group"
                    style={{ background: "hsl(var(--background))" }}
                  >
                    {/* POI image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={poi.image}
                        alt={language === "pt" ? poi.namePt : poi.nameEn}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                        style={{ filter: "brightness(0.75) saturate(0.85)" }}
                        loading="lazy"
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 px-4 py-2"
                        style={{ background: "linear-gradient(to top, rgba(8,6,4,0.5) 0%, transparent 100%)" }}
                      >
                        <span style={{ fontSize: "9px", letterSpacing: "0.3em", color: "hsl(var(--gold))", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase" }}>
                          {poi.dist}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="font-display" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "rgba(30,22,14,0.85)", marginBottom: "8px" }}>
                        {language === "pt" ? poi.namePt : poi.nameEn}
                      </p>
                      <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.5)", lineHeight: 1.8 }}>
                        {language === "pt" ? poi.descPt : poi.descEn}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom image strip */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-[1400px] mx-auto mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[4px]">
              {[herdadeImages.arches, herdadeImages.poolPergola, herdadeImages.livingRoom].map((src, i) => (
                <div key={i} className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={src}
                    alt="Herdade do Monte Claro"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.82) saturate(0.88)" }}
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
