import { motion } from "framer-motion";
import herdade05 from "@/assets/herdade-05.jpg";

const HeroScene = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={herdade05}
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.88) saturate(0.90)" }}
        fetchPriority="high"
      />
    </motion.div>
    {/* Subtle gradient vignette for text legibility */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(to bottom, rgba(20,15,10,0.38) 0%, rgba(20,15,10,0.05) 50%, rgba(20,15,10,0.25) 100%)",
      }}
    />
  </div>
);

export default HeroScene;
