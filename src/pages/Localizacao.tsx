import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const distances = [
  { placePt: "Évora", placeEn: "Évora", time: "35 min" },
  { placePt: "Lisboa", placeEn: "Lisbon", time: "1h 45min" },
  { placePt: "Aeroporto de Lisboa", placeEn: "Lisbon Airport", time: "1h 50min" },
  { placePt: "Porto", placeEn: "Porto", time: "3h" },
  { placePt: "Sevilha", placeEn: "Seville", time: "2h 30min" },
  { placePt: "Madrid", placeEn: "Madrid", time: "4h 30min" },
];

const Localizacao = () => {
  const { t, language } = useLanguage();

  return (
    <div style={{ background: "#08060A", minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      <div className="px-8 md:px-14" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        {/* Title */}
        <ScrollReveal>
          <h1
            className="heading-display text-bone mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("localizacao.title")}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="body-text mb-16 max-w-[600px]">{t("localizacao.desc")}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[100px] max-w-[1400px] mx-auto">
          {/* Left: distance table */}
          <div>
            <ScrollReveal>
              <span className="label-upper mb-8 block">{t("location.label")}</span>
            </ScrollReveal>
            {distances.map((d, i) => (
              <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                <div className="flex items-center justify-between py-5 border-b gold-border-line">
                  <span className="font-body text-[13px]" style={{ color: "rgba(242,234,216,0.55)", fontFamily: "'Tenor Sans', sans-serif" }}>
                    {language === "pt" ? d.placePt : d.placeEn}
                  </span>
                  <span className="font-display text-gold text-[26px]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{d.time}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: map placeholder + address card */}
          <div className="flex flex-col gap-8">
            <ScrollReveal delay={0.2}>
              <div
                className="w-full flex flex-col items-center justify-center p-8"
                style={{
                  aspectRatio: "4/3",
                  background: "radial-gradient(circle at center, rgba(200,160,80,0.08) 0%, rgba(8,6,10,1) 75%)",
                  border: "1px solid rgba(200,160,80,0.18)",
                }}
              >
                <div className="w-3 h-3 bg-gold mb-6" style={{ animation: "pulse 2s infinite" }} />
                <p className="label-upper text-center mb-4">Monte Claro</p>
                <p
                  className="font-display text-center mb-2"
                  style={{ fontSize: "32px", color: "#F2EAD8", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  38°34'N 7°54'W
                </p>
                <p className="label-muted text-center">{t("localizacao.address")}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div
                className="p-8"
                style={{ background: "rgba(200,160,80,0.04)", border: "1px solid rgba(200,160,80,0.18)" }}
              >
                <span className="label-upper block mb-6">
                  {language === "pt" ? "Morada" : "Address"}
                </span>
                <div className="space-y-3">
                  <p className="font-display text-bone text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Herdade do Monte Claro
                  </p>
                  <p className="body-text">Alentejo, Portugal</p>
                  <p className="body-text">38°34'N 7°54'W</p>
                  <div style={{ borderTop: "1px solid rgba(200,160,80,0.18)", marginTop: "16px", paddingTop: "16px" }}>
                    <p className="label-muted">{language === "pt" ? "A 35 min de Évora · 1h45 de Lisboa" : "35 min from Évora · 1h45 from Lisbon"}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Localizacao;
