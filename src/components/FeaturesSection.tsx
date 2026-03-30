import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const FeaturesSection = () => {
  const { language } = useLanguage();

  return (
    <section className="border-t gold-border-line">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {siteConfig.features.map((f, i) => (
          <ScrollReveal
            key={i}
            delay={i * 0.12}
            className={`relative px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20 group transition-colors duration-700 hover:bg-gold/[0.03] ${
              i < 3 ? "md:border-r gold-border-line" : ""
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

            <span
              className="absolute top-6 right-8 font-display leading-none"
              style={{ fontSize: "clamp(32px, 8vw, 52px)", color: "rgba(30,22,14,0.05)" }}
            >
              {f.num}
            </span>

            <h3 className="font-display text-base sm:text-lg md:text-xl mt-6 sm:mt-8" style={{ color: "hsl(var(--foreground))" }}>
              {language === "en" && f.titleEn ? f.titleEn : f.title}
            </h3>
            <p
              className="font-body mt-3 sm:mt-4"
              style={{ fontSize: "clamp(12px, 3vw, 13px)", lineHeight: 1.9, color: "rgba(30,22,14,0.58)" }}
            >
              {language === "en" && f.descEn ? f.descEn : f.desc}
            </p>
            <div className="mt-8 pt-3 border-b gold-border-line inline-block">
              <span className="label-upper text-[9px]">
                {language === "en" && f.tagEn ? f.tagEn : f.tag}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
