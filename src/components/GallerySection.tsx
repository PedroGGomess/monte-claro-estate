import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";

const GallerySection = () => (
  <section className="px-8 md:px-14 py-16 md:py-24">
    <ScrollReveal className="mb-12">
      <span className="label-upper">Galeria</span>
    </ScrollReveal>
    <div
      className="grid gap-[2px]"
      style={{
        gridTemplateColumns: "1.6fr 1fr",
        gridTemplateRows: "480px 320px",
      }}
    >
      {siteConfig.gallery.map((img, i) => (
        <ScrollReveal
          key={i}
          delay={i * 0.1}
          className={`relative overflow-hidden group ${i === 0 ? "[grid-row:1/3]" : ""}`}
        >
          <img
            src={img.src}
            alt={img.caption}
            className="w-full h-full object-cover transition-all duration-[1.2s]"
            style={{ filter: "brightness(0.82) saturate(0.88)" }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-6">
            <span className="label-upper text-[10px]">{img.caption}</span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default GallerySection;
