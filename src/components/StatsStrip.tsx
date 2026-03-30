import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const StatsStrip = () => {
  const { t } = useLanguage();

  const getLabel = (idx: number) => {
    const keys = ["stats.total", "stats.built", "stats.type", "stats.founded", "stats.fromevora"];
    return t(keys[idx] ?? "");
  };

  return (
    <section className="w-full border-b gold-border-line">
      <div className="flex flex-col md:flex-row">
        {siteConfig.stats.map((s, i) => (
          <ScrollReveal
            key={i}
            delay={i * 0.1}
            className={`flex-1 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 text-center ${
              i < siteConfig.stats.length - 1 ? "md:border-r gold-border-line" : ""
            }`}
          >
            <div className="font-display text-gold text-3xl sm:text-4xl md:text-[42px] tracking-wide break-words">
              {s.value}
            </div>
            <div className="label-muted mt-2 sm:mt-3 text-[7px] sm:text-[9px]">{getLabel(i)}</div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
