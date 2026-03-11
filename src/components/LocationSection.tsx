import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const LocationSection = () => {
  const { t, language } = useLanguage();

  const renderHeading = () => {
    if (language === "pt") {
      return <>Perto de tudo, <em>longe</em> do mundo</>;
    }
    return <>Close to everything, <em>far</em> from the world</>;
  };

  return (
    <section id="localizacao" className="px-8 md:px-14 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[100px] max-w-[1400px] mx-auto">
        <div>
          <ScrollReveal>
            <span className="label-upper">{t("location.label")}</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-bone text-4xl md:text-[58px] mt-8 leading-[1.1]">
              {renderHeading()}
            </h2>
          </ScrollReveal>
          <div className="mt-14">
            {siteConfig.distances.map((d, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.08}>
                <div className="flex items-center justify-between py-5 border-b gold-border-line">
                  <span className="font-body text-[13px]" style={{ color: "rgba(242,234,216,0.55)" }}>
                    {d.place}
                  </span>
                  <span className="font-display text-gold text-[26px]">{d.time}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <div
            className="w-full flex flex-col items-center justify-center"
            style={{
              aspectRatio: "1/1",
              background: "radial-gradient(circle at center, hsl(var(--gold) / 0.06) 0%, hsl(var(--ink)) 70%)",
            }}
          >
            <div className="w-3 h-3 bg-gold animate-pulse-glow" />
            <span className="label-muted mt-4 text-[9px]">Monte Claro · Alentejo</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocationSection;
