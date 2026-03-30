import { siteConfig, images } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const AboutSection = () => {
  const { about } = siteConfig;
  const { t, language } = useLanguage();

  const renderHeading = () => {
    if (language === "pt") {
      return <>O valor do tempo: pronto a <em>construir</em></>;
    }
    return <>The value of time: ready to <em>build</em></>;
  };

  return (
    <section id="propriedade" className="px-4 sm:px-6 md:px-14 py-12 sm:py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-[100px] items-center max-w-[1400px] mx-auto">
        <div>
          <ScrollReveal>
            <span className="label-upper">{t("about.label")}</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-foreground text-2xl sm:text-3xl md:text-[58px] mt-6 sm:mt-8 leading-[1.1]">
              {renderHeading()}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <blockquote className="border-l border-gold/40 pl-4 sm:pl-6 mt-8 sm:mt-10 font-display italic text-base sm:text-lg md:text-[28px] leading-relaxed" style={{ color: "rgba(30,22,14,0.65)" }}>
              {t("about.quote")}
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="body-text mt-10">{about.p1}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="body-text mt-6">{about.p2}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <p className="body-text mt-6">{about.p3}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="relative">
            <div className="absolute pointer-events-none" style={{ top: "-18px", right: "18px", bottom: "18px", left: "-18px", border: "1px solid rgba(155,130,100,0.2)" }} />
            <img
              src={images.hero}
              alt="Projeto aprovado · Herdade em Grândola"
              className="w-full object-cover"
              style={{ aspectRatio: "3/4", filter: "brightness(0.82) saturate(0.88)" }}
              loading="lazy"
            />
            <p className="label-muted mt-4 text-center">{about.imageCaption}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
