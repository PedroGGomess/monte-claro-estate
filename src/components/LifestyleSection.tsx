import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { images } from "@/config/siteConfig";

const LifestyleSection = () => {
  const { language } = useLanguage();

  const pillars = [
    {
      iconPt: "Natureza",
      iconEn: "Nature",
      titlePt: "120.000 m² de Montado",
      titleEn: "120,000 m² of Cork Oak Forest",
      descPt: "Sobreiros centenários estrategicamente distribuídos. A mística do Alentejo sem condicionar a construção.",
      descEn: "Century-old cork oaks strategically distributed. The mystique of Alentejo without conditioning construction.",
    },
    {
      iconPt: "Privacidade",
      iconEn: "Privacy",
      titlePt: "Isolamento Total",
      titleEn: "Total Seclusion",
      descPt: "Duplo acesso por estradas independentes. Sem vizinhos visíveis. Silêncio absoluto.",
      descEn: "Dual access via independent roads. No visible neighbours. Absolute silence.",
    },
    {
      iconPt: "Costa",
      iconEn: "Coast",
      titlePt: "25 min das Praias",
      titleEn: "25 min from Beaches",
      descPt: "Melides, Comporta, Tróia — as praias mais exclusivas da Europa a menos de meia hora.",
      descEn: "Melides, Comporta, Tróia — Europe's most exclusive beaches less than half an hour away.",
    },
    {
      iconPt: "Água",
      iconEn: "Water",
      titlePt: "Autossuficiência Hídrica",
      titleEn: "Water Self-Sufficiency",
      descPt: "Furo, 2 poços tradicionais e curso de água natural. O recurso mais valioso do Alentejo — garantido.",
      descEn: "Borehole, 2 traditional wells and natural stream. The Alentejo's most valuable resource — secured.",
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-14 py-16 sm:py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-[100px] items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative">
              <div className="absolute pointer-events-none" style={{ top: "18px", right: "-18px", bottom: "-18px", left: "18px", border: "1px solid rgba(155,130,100,0.2)" }} />
              <img
                src={images.poolPergola}
                alt={language === "pt" ? "Estilo de vida · Piscina" : "Lifestyle · Pool"}
                className="w-full object-cover relative z-10"
                style={{ aspectRatio: "4/5", filter: "brightness(0.85) saturate(0.9)" }}
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <ScrollReveal>
              <span className="label-upper">
                {language === "pt" ? "ESTILO DE VIDA" : "LIFESTYLE"}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-display text-foreground text-2xl sm:text-3xl md:text-[52px] mt-6 sm:mt-8 leading-[1.1]">
                {language === "pt" ? (
                  <>Viver entre a <em>serra</em> e o <em>mar</em></>
                ) : (
                  <>Living between <em>hills</em> and <em>sea</em></>
                )}
              </h2>
            </ScrollReveal>

            <div className="mt-10 sm:mt-14 space-y-8">
              {pillars.map((p, i) => (
                <ScrollReveal key={i} delay={0.2 + i * 0.08}>
                  <div className="flex gap-4 sm:gap-6 pb-6" style={{ borderBottom: "1px solid hsl(var(--gold) / 0.1)" }}>
                    <span
                      className="label-upper shrink-0 mt-1"
                      style={{ color: "hsl(var(--gold))", fontSize: "8px", minWidth: "70px" }}
                    >
                      {language === "pt" ? p.iconPt : p.iconEn}
                    </span>
                    <div>
                      <h3
                        className="font-display text-base sm:text-lg"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        {language === "pt" ? p.titlePt : p.titleEn}
                      </h3>
                      <p
                        className="mt-2"
                        style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "clamp(12px, 3vw, 13px)", lineHeight: 1.9, color: "rgba(30,22,14,0.55)" }}
                      >
                        {language === "pt" ? p.descPt : p.descEn}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
