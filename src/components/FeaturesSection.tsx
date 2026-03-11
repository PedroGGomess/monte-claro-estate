import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";

const FeaturesSection = () => (
  <section className="border-t gold-border-line">
    <div className="grid grid-cols-1 md:grid-cols-4">
      {siteConfig.features.map((f, i) => (
        <ScrollReveal
          key={i}
          delay={i * 0.12}
          className={`relative px-8 py-14 md:py-20 group transition-colors duration-700 hover:bg-gold/[0.03] ${
            i < 3 ? "md:border-r gold-border-line" : ""
          }`}
        >
          {/* hover top border */}
          <div className="absolute top-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

          {/* ghost number */}
          <span className="absolute top-6 right-8 font-display text-[56px] text-gold/[0.08] leading-none">
            {f.num}
          </span>

          <h3 className="font-display text-bone text-xl mt-8">{f.title}</h3>
          <p className="font-body text-xs leading-[1.9] text-bone/40 mt-4">{f.desc}</p>
          <div className="mt-8 pt-3 border-b gold-border-line inline-block">
            <span className="label-upper text-[9px]">{f.tag}</span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
