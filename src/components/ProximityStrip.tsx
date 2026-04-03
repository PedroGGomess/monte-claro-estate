import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const ProximityStrip = () => {
  const { language } = useLanguage();

  const items = [
    { valuePt: "25 min", valueEn: "25 min", labelPt: "Melides", labelEn: "Melides" },
    { valuePt: "30 min", valueEn: "30 min", labelPt: "Comporta", labelEn: "Comporta" },
    { valuePt: "7 min", valueEn: "7 min", labelPt: "Grândola", labelEn: "Grândola" },
    { valuePt: "1h 15", valueEn: "1h 15", labelPt: "Lisboa", labelEn: "Lisbon" },
  ];

  return (
    <section className="w-full" style={{ borderTop: "1px solid hsl(var(--gold) / 0.12)", borderBottom: "1px solid hsl(var(--gold) / 0.12)" }}>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <ScrollReveal
            key={i}
            delay={i * 0.08}
            className={`py-5 sm:py-6 md:py-8 px-4 sm:px-6 text-center ${
              i < 3 ? "md:border-r" : ""
            } ${i % 2 === 0 ? "border-r md:border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}
            style={{ borderColor: "hsl(var(--gold) / 0.12)" }}
          >
            <div
              className="font-display tracking-wide"
              style={{ fontSize: "clamp(20px, 4vw, 32px)", color: "hsl(var(--gold))" }}
            >
              {language === "pt" ? item.valuePt : item.valueEn}
            </div>
            <div
              className="mt-1"
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: "clamp(8px, 1.8vw, 10px)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(30,22,14,0.35)",
              }}
            >
              {language === "pt" ? item.labelPt : item.labelEn}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default ProximityStrip;
