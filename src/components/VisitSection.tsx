import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";

const VisitSection = () => {
  const { visit } = siteConfig;
  return (
    <section
      className="border-t gold-border-line py-32 md:py-40 px-8 flex flex-col items-center text-center relative"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--gold) / 0.04) 0%, transparent 60%)",
        }}
      />

      <ScrollReveal>
        <span className="label-upper">Visita Privada</span>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <h2
          className="heading-display text-bone mt-10 max-w-[900px]"
          style={{ fontSize: "clamp(2rem, 7vw, 7rem)" }}
          dangerouslySetInnerHTML={{ __html: visit.title }}
        />
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <p className="body-text mt-8 max-w-[400px]">{visit.body}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-6 mt-12">
        <button className="btn-primary-outline">{visit.btn1}</button>
        <button className="btn-ghost">{visit.btn2}</button>
      </ScrollReveal>
    </section>
  );
};

export default VisitSection;
