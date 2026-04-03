import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { images } from "@/config/siteConfig";

const InvestmentSection = () => {
  const { language } = useLanguage();

  const scenarios = [
    {
      titlePt: "Boutique Hotel",
      titleEn: "Boutique Hotel",
      descPt: "6 lofts + 2 moradias T3 com piscina, inseridos em 12ha de montado alentejano. Classificação turística garantida pelo PDM.",
      descEn: "6 lofts + 2 T3 villas with pool, set within 12ha of Alentejo cork oak forest. Tourism classification guaranteed by municipal plan.",
      tagPt: "Turismo Rural Premium",
      tagEn: "Premium Rural Tourism",
    },
    {
      titlePt: "Eco-Retreat de Luxo",
      titleEn: "Luxury Eco-Retreat",
      descPt: "Autossuficiência hídrica, sobreiros centenários e privacidade total. O cenário perfeito para wellness, yoga ou experiências imersivas.",
      descEn: "Water self-sufficiency, century-old cork oaks and total privacy. The perfect setting for wellness, yoga or immersive experiences.",
      tagPt: "Wellness & Natureza",
      tagEn: "Wellness & Nature",
    },
    {
      titlePt: "Residência Familiar",
      titleEn: "Family Compound",
      descPt: "2 moradias independentes T3 (ou 1 T6) com 6 lofts para convidados. Espaço para gerações — a 25 min da praia.",
      descEn: "2 independent T3 villas (or 1 T6) with 6 guest lofts. Space for generations — 25 min from the beach.",
      tagPt: "Privacidade Total",
      tagEn: "Total Privacy",
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-14 py-16 sm:py-20 md:py-32" style={{ background: "hsl(var(--gold) / 0.03)" }}>
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <span className="label-upper">
            {language === "pt" ? "POTENCIAL DE INVESTIMENTO" : "INVESTMENT POTENTIAL"}
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-display text-foreground text-2xl sm:text-3xl md:text-[52px] mt-6 sm:mt-8 leading-[1.1] max-w-[800px]">
            {language === "pt" ? (
              <>O que pode <em>construir</em> aqui</>
            ) : (
              <>What you can <em>build</em> here</>
            )}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="body-text mt-6 max-w-[600px]">
            {language === "pt"
              ? "Com projeto aprovado e licença emitida, esta herdade oferece múltiplos cenários de desenvolvimento. Cada um com retorno comprovado na região."
              : "With an approved project and license issued, this estate offers multiple development scenarios. Each with proven returns in the region."}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-12 sm:mt-16" style={{ background: "hsl(var(--gold) / 0.12)" }}>
          {scenarios.map((s, i) => (
            <ScrollReveal key={i} delay={0.2 + i * 0.1}>
              <div className="bg-background p-6 sm:p-8 md:p-10 h-full flex flex-col">
                <span
                  className="font-display leading-none mb-6"
                  style={{ fontSize: "clamp(32px, 6vw, 48px)", color: "rgba(30,22,14,0.06)" }}
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl" style={{ color: "hsl(var(--foreground))" }}>
                  {language === "pt" ? s.titlePt : s.titleEn}
                </h3>
                <p
                  className="font-body mt-4 flex-1"
                  style={{ fontSize: "clamp(12px, 3vw, 13px)", lineHeight: 1.9, color: "rgba(30,22,14,0.58)" }}
                >
                  {language === "pt" ? s.descPt : s.descEn}
                </p>
                <div className="mt-6 pt-3 border-b gold-border-line inline-block self-start">
                  <span className="label-upper text-[9px]">
                    {language === "pt" ? s.tagPt : s.tagEn}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Key numbers — at a glance */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px mt-12 sm:mt-16" style={{ background: "hsl(var(--gold) / 0.10)" }}>
          {[
            { value: "12 ha", labelPt: "Área Total", labelEn: "Total Area" },
            { value: "500 m²", labelPt: "Construção Aprovada", labelEn: "Approved Construction" },
            { value: "T3+T3", labelPt: "2 Moradias", labelEn: "2 Villas" },
            { value: "6", labelPt: "Lofts", labelEn: "Lofts" },
            { value: "3", labelPt: "Fontes de Água", labelEn: "Water Sources" },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.06}>
              <div className="bg-background py-6 sm:py-8 px-4 text-center">
                <div className="font-display text-gold text-xl sm:text-2xl md:text-[32px] tracking-wide">
                  {stat.value}
                </div>
                <div className="label-muted mt-1" style={{ fontSize: "8px" }}>
                  {language === "pt" ? stat.labelPt : stat.labelEn}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Scarcity / urgency callout */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-10 text-center" style={{ border: "1px solid hsl(var(--gold) / 0.2)", background: "hsl(var(--gold) / 0.02)" }}>
            <p className="font-display italic text-lg sm:text-xl md:text-2xl" style={{ color: "rgba(30,22,14,0.7)" }}>
              {language === "pt"
                ? "Na região de Grândola-Comporta, as propriedades com licença de construção emitida são cada vez mais raras. Esta é uma das últimas."
                : "In the Grândola-Comporta region, properties with issued construction licenses grow rarer every year. This is one of the last."}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InvestmentSection;
