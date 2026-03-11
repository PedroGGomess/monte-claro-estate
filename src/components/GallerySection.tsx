import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";

const GallerySection = () => (
  <section className="px-8 md:px-14 py-24 md:py-40">
    <ScrollReveal className="mb-12">
      <span className="label-upper">Galeria</span>
    </ScrollReveal>
    <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] md:grid-rows-[480px_320px] gap-[2px]">
      {siteConfig.gallery.map((img, i) => (
        <ScrollReveal
          key={i}
          delay={i * 0.1}
          className={`relative overflow-hidden group ${i === 0 ? "md:row-span-2" : ""}`}
        >
          <img
            src={img.src}
            alt={img.caption}
            className="w-full h-full object-cover transition-all duration-[1.2s] cubic-bezier(0.22,1,0.36,1) group-hover:scale-[1.04] group-hover:brightness-110"
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
