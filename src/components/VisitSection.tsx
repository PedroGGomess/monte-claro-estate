import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const VisitSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="visita"
      className="border-t gold-border-line py-32 md:py-40 px-8 flex flex-col items-center text-center relative"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--gold) / 0.06) 0%, transparent 60%)",
        }}
      />

      <ScrollReveal>
        <span className="label-upper">{t("visit.label")}</span>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <h2
          className="heading-display text-foreground mt-10 max-w-[900px]"
          style={{ fontSize: "clamp(2rem, 7vw, 7rem)" }}
          dangerouslySetInnerHTML={{ __html: t("visit.title") }}
        />
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <p className="body-text mt-8 max-w-[400px]">{t("visit.body")}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-6 mt-12">
        <Link to="/agendar" className="btn-calendly">
          {t("visit.btn1")}
        </Link>
        <a href="mailto:herdasantamargarida@gmail.com" className="btn-ghost" style={{ textDecoration: "none" }}>{t("visit.btn2")}</a>
      </ScrollReveal>
    </section>
  );
};

export default VisitSection;
