import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const VisitSection = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="visita"
      className="border-t gold-border-line py-24 sm:py-32 md:py-40 px-6 sm:px-8 flex flex-col items-center text-center relative"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--gold) / 0.06) 0%, transparent 60%)",
        }}
      />

      <ScrollReveal>
        <span className="label-upper">
          {language === "pt" ? "Próximo Passo" : "Next Step"}
        </span>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <h2
          className="heading-display text-foreground mt-10 max-w-[900px]"
          style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}
        >
          {language === "pt" ? (
            <>Veja com os seus próprios <em>olhos</em></>
          ) : (
            <>See it with your own <em>eyes</em></>
          )}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <p className="body-text mt-8 max-w-[500px]">
          {language === "pt"
            ? "Cada visita é uma experiência privada e exclusiva. A sua oportunidade de percorrer os 12 hectares, sentir o terreno e visualizar o potencial."
            : "Each visit is a private and exclusive experience. Your opportunity to walk the 12 hectares, feel the land and visualise the potential."}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-6 mt-12">
        <Link to="/agendar" className="btn-calendly" style={{ padding: "16px 36px" }}>
          {language === "pt" ? "Agendar Visita Privada" : "Request Private Viewing"}
        </Link>
        <a
          href="mailto:herdasantamargarida@gmail.com?subject=Investment%20Inquiry%20-%20Herdade%20Grândola"
          className="btn-ghost"
          style={{ textDecoration: "none" }}
        >
          {language === "pt" ? "Pedir Dossier de Investimento" : "Request Investment Brief"}
        </a>
      </ScrollReveal>
    </section>
  );
};

export default VisitSection;
