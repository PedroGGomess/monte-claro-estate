import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const StatsStrip = () => {
  const { t } = useLanguage();

  const getLabel = (idx: number) => {
    const keys = ["stats.total", "stats.built", "stats.type", "stats.founded", "stats.fromevora"];
    return t(keys[idx] ?? "");
  };

  /* Stats order: 0=12ha, 1=500m², 2=Tipologia, 3=Water Sources, 4=From Beaches */
  const topStats = [0, 1, 3, 4]; /* 2x2 grid */
  const wideStats = [2]; /* Tipologia spans full width */

  return (
    <section className="w-full border-b gold-border-line">
      {/* Top: 2x2 grid */}
      <div className="grid grid-cols-2">
        {topStats.map((si, idx) => {
          const s = siteConfig.stats[si];
          return (
            <ScrollReveal
              key={si}
              delay={idx * 0.1}
              className={`py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 text-center gold-border-line ${
                idx % 2 === 0 ? "border-r" : ""
              } ${idx < 2 ? "border-b" : ""}`}
            >
              <div className="font-display text-gold text-2xl sm:text-3xl md:text-[42px] tracking-wide">
                {s.value}
              </div>
              <div className="label-muted mt-2">{getLabel(si)}</div>
            </ScrollReveal>
          );
        })}
      </div>
      {/* Bottom: Tipologia full width */}
      {wideStats.map((si) => {
        const s = siteConfig.stats[si];
        return (
          <ScrollReveal
            key={si}
            delay={0.4}
            className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 text-center border-t gold-border-line"
          >
            <div className="font-display text-gold text-2xl sm:text-3xl md:text-[42px] tracking-wide">
              {s.value}
            </div>
            <div className="label-muted mt-2">{getLabel(si)}</div>
          </ScrollReveal>
        );
      })}
    </section>
  );
};

export default StatsStrip;
