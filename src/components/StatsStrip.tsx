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
      {/* Mobile: 2-col grid, Tablet: 3-col, Desktop: row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row">
        {siteConfig.stats.map((s, i) => (
          <ScrollReveal
            key={i}
            delay={i * 0.1}
            className={`flex-1 py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 text-center border-b md:border-b-0 gold-border-line ${
              i % 2 === 0 ? "border-r gold-border-line sm:border-r" : "sm:border-r"
            } ${i < siteConfig.stats.length - 1 ? "md:border-r" : "md:border-r-0"} last:border-r-0`}
          >
            <div className="font-display text-gold text-2xl sm:text-3xl md:text-[42px] tracking-wide">
              {s.value}
            </div>
            <div className="label-muted mt-2">{getLabel(i)}</div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
