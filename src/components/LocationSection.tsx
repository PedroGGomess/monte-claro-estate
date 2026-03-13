import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const LocationSection = () => {
  const { t, language } = useLanguage();

  const renderHeading = () => {
    if (language === "pt") {
      return <>No <em>Triângulo de Ouro</em> do Alentejo</>;
    }
    return <>In the Alentejo <em>Golden Triangle</em></>;
  };

  return (
    <section id="localizacao" className="px-8 md:px-14 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[100px] max-w-[1400px] mx-auto">
        <div>
          <ScrollReveal>
            <span className="label-upper">{t("location.label")}</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-foreground text-4xl md:text-[58px] mt-8 leading-[1.1]">
              {renderHeading()}
            </h2>
          </ScrollReveal>
          <div className="mt-14">
            {siteConfig.distances.map((d, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.08}>
                <div className="flex items-center justify-between py-5 border-b gold-border-line">
                  <span className="font-body text-[13px]" style={{ color: "rgba(30,22,14,0.55)" }}>
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
            className="w-full overflow-hidden"
            style={{
              aspectRatio: "1/1",
              border: "1px solid hsl(var(--gold) / 0.12)",
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
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocationSection;
