import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeDown = (delay: number) => ({
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
});

const HeroOverlay = () => {
  const { hero } = siteConfig;
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none">
      {/* Nav */}
      <motion.nav
        {...fadeDown(0.4)}
        className="flex items-center justify-between px-8 md:px-14 pt-8 pointer-events-auto"
      >
        <div className="font-display text-bone text-lg tracking-widest leading-tight">
          Herdade do<br />
          <em>Monte Claro</em>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {["Propriedade", "Galeria", "Localização"].map((l) => (
            <a key={l} className="label-muted hover:text-gold transition-colors duration-500 cursor-pointer">
              {l}
            </a>
          ))}
          <button className="btn-primary-outline pointer-events-auto">
            Agendar Visita
          </button>
        </div>
      </motion.nav>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.p {...fadeUp(1)} className="label-upper mb-6">
          {hero.label}
        </motion.p>
        <motion.h1
          {...fadeUp(1.3)}
          className="heading-display text-bone text-center"
          style={{ fontSize: "clamp(2.5rem, 9vw, 10rem)" }}
        >
          {hero.title}
          <br />
          <em>{hero.titleItalic}</em>
        </motion.h1>
        <motion.p {...fadeUp(2)} className="label-muted mt-8">
          {hero.subtitle}
        </motion.p>
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between px-8 md:px-14 pb-8">
        <motion.span {...fadeUp(2.2)} className="label-muted hidden md:block">
          {hero.coords}
        </motion.span>

        <motion.div {...fadeUp(2.4)} className="flex flex-col items-center gap-3">
          <span className="label-upper text-[8px]">Explorar</span>
          <div className="w-px h-16 bg-gold/30 overflow-hidden">
            <div className="w-full h-full bg-gold animate-scroll-line" />
          </div>
        </motion.div>

        <motion.span {...fadeUp(2.2)} className="label-muted hidden md:block">
          {hero.location}
        </motion.span>
      </div>
    </div>
  );
};

export default HeroOverlay;
