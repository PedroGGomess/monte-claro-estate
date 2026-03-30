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
  const { t } = useLanguage();
  const { hero } = siteConfig;

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none">
      {/* Nav */}
      <motion.div {...fadeDown(0.4)} className="pointer-events-auto">
        <SiteNav transparent heroMode />
      </motion.div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.p
          {...fadeUp(1)}
          className="label-upper mb-6"
          style={{ color: "rgba(242, 236, 224, 0.72)" }}
        >
          {t("hero.label")}
        </motion.p>
        <motion.h1
          {...fadeUp(1.3)}
          className="heading-display text-center"
          style={{ fontSize: "clamp(2.5rem, 9vw, 10rem)", color: "#F5F0E8" }}
        >
          {hero.title}
          <br />
          <em style={{ color: "hsl(33, 40%, 72%)" }}>{hero.titleItalic}</em>
        </motion.h1>
        <motion.p
          {...fadeUp(2)}
          className="label-muted mt-8"
          style={{ color: "rgba(242, 236, 224, 0.5)" }}
        >
          {t("hero.subtitle")}
        </motion.p>
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between px-4 sm:px-6 md:px-14 pb-6 sm:pb-8">
        <motion.span
          {...fadeUp(2.2)}
          className="label-muted hidden md:block text-[7px] sm:text-[9px]"
          style={{ color: "rgba(242, 236, 224, 0.42)" }}
        >
          {hero.coords}
        </motion.span>

        <motion.div {...fadeUp(2.4)} className="flex flex-col items-center gap-2 sm:gap-3">
          <span className="label-upper text-[6px] sm:text-[8px]" style={{ color: "rgba(242, 236, 224, 0.6)" }}>
            {t("hero.explore")}
          </span>
          <div className="w-px h-12 sm:h-16 overflow-hidden" style={{ background: "rgba(242,236,224,0.2)" }}>
            <div
              className="w-full h-full animate-scroll-line"
              style={{ background: "rgba(242,236,224,0.65)" }}
            />
          </div>
        </motion.div>

        <motion.span
          {...fadeUp(2.2)}
          className="label-muted hidden md:block text-[7px] sm:text-[9px]"
          style={{ color: "rgba(242, 236, 224, 0.42)" }}
        >
          {hero.location}
        </motion.span>
      </div>
    </div>
  );
};

export default HeroOverlay;
