import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SiteNav from "./SiteNav";
import { siteConfig } from "@/config/siteConfig";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: ease as unknown as [number, number, number, number] },
});

const fadeDown = (delay: number) => ({
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: ease as unknown as [number, number, number, number] },
});

const HeroOverlay = () => {
  const { t, language } = useLanguage();
  const { hero } = siteConfig;

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none">
      {/* Nav */}
      <motion.div {...fadeDown(0.4)} className="pointer-events-auto">
        <SiteNav transparent heroMode />
      </motion.div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.p
          {...fadeUp(1)}
          className="mb-4 sm:mb-6 text-center"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "clamp(7px, 2vw, 9px)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(242, 236, 224, 0.72)",
          }}
        >
          {language === "pt" ? hero.labelPt : hero.label}
        </motion.p>
        <motion.h1
          {...fadeUp(1.3)}
          className="heading-display text-center max-w-[1100px]"
          style={{ fontSize: "clamp(2.2rem, 8vw, 7rem)", color: "#F5F0E8", lineHeight: 1.05 }}
        >
          {language === "pt" ? hero.titlePt : hero.title}
          <br />
          <em style={{ color: "hsl(33, 40%, 72%)" }}>{language === "pt" ? hero.titleItalicPt : hero.titleItalic}</em>
          <br />
          <span style={{ fontSize: "clamp(1.2rem, 4vw, 3.2rem)", color: "rgba(242, 236, 224, 0.55)" }}>
            {language === "pt" ? hero.titleEndPt : hero.titleEnd}
          </span>
        </motion.h1>
        <motion.p
          {...fadeUp(2)}
          className="mt-6 sm:mt-8 text-center"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: "clamp(7px, 1.8vw, 10px)",
            letterSpacing: "clamp(0.15em, 1vw, 0.4em)",
            textTransform: "uppercase",
            color: "rgba(242, 236, 224, 0.5)",
          }}
        >
          {language === "pt" ? hero.subtitlePt : hero.subtitle}
        </motion.p>

        {/* Hero CTA */}
        <motion.div {...fadeUp(2.4)} className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 pointer-events-auto items-center">
          <a
            href="#visita"
            className="btn-calendly text-center"
            style={{ fontSize: "9px", padding: "14px 32px", letterSpacing: "0.25em" }}
          >
            {language === "pt" ? "Agendar Visita Privada" : "Request Private Viewing"}
          </a>
          <a
            href="/investment-brief.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-center"
            style={{ fontSize: "9px", letterSpacing: "0.25em", color: "rgba(242,236,224,0.5)", borderBottomColor: "rgba(242,236,224,0.2)", textDecoration: "none" }}
          >
            {language === "pt" ? "Dossier de Investimento ↓" : "Investment Brief ↓"}
          </a>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-center md:justify-between px-4 sm:px-6 md:px-14 pb-6 sm:pb-8">
        <motion.span
          {...fadeUp(2.2)}
          className="label-muted hidden md:block"
          style={{ color: "rgba(242, 236, 224, 0.42)" }}
        >
          {hero.coords}
        </motion.span>

        <motion.div {...fadeUp(2.4)} className="flex flex-col items-center gap-2 sm:gap-3">
          <span
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "7px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(242, 236, 224, 0.6)",
            }}
          >
            {t("hero.explore")}
          </span>
          <div className="w-px h-10 sm:h-16 overflow-hidden" style={{ background: "rgba(242,236,224,0.2)" }}>
            <div
              className="w-full h-full animate-scroll-line"
              style={{ background: "rgba(242,236,224,0.65)" }}
            />
          </div>
        </motion.div>

        <motion.span
          {...fadeUp(2.2)}
          className="label-muted hidden md:block"
          style={{ color: "rgba(242, 236, 224, 0.42)" }}
        >
          {hero.location}
        </motion.span>
      </div>
    </div>
  );
};

export default HeroOverlay;
