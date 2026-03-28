import { siteConfig } from "@/config/siteConfig";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const distances = [
  { placePt: "Comporta / Melides", placeEn: "Comporta / Melides", time: "20 min", notePt: "Praias exclusivas", noteEn: "Exclusive beaches" },
  { placePt: "Grândola", placeEn: "Grândola", time: "7 min", notePt: "Cidade mais próxima", noteEn: "Nearest town" },
  { placePt: "Lisboa", placeEn: "Lisbon", time: "1h 15min", notePt: "Capital", noteEn: "Capital city" },
  { placePt: "Aeroporto de Lisboa", placeEn: "Lisbon Airport", time: "1h 25min", notePt: "Internacional", noteEn: "International" },
];

const LocationSection = () => {
  const { t, language } = useLanguage();

  const renderHeading = () => {
    if (language === "pt") {
      return <>No <em>Triângulo de Ouro</em> do Alentejo</>;
    }
    return <>In the Alentejo <em>Golden Triangle</em></>;
  };

  return (
    <section id="localizacao" className="px-8 md:px-14 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[100px] max-w-[1400px] mx-auto">
        {/* Left: heading + distances */}
        <div>
          <ScrollReveal>
            <span className="label-upper">{t("location.label")}</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-foreground text-4xl md:text-[58px] mt-8 leading-[1.1]">
              {renderHeading()}
            </h2>
          </ScrollReveal>
          <div className="mt-14">
            {distances.map((d, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.08}>
                <div className="flex items-center justify-between py-5 border-b gold-border-line group transition-all duration-300 hover:pl-1">
                  <div>
                    <span
                      className="font-body text-[14px] block"
                      style={{ color: "rgba(30,22,14,0.65)", fontFamily: "'Tenor Sans', sans-serif" }}
                    >
                      {language === "pt" ? d.placePt : d.placeEn}
                    </span>
                    <span
                      className="block mt-1"
                      style={{ fontSize: "9px", letterSpacing: "0.25em", color: "rgba(200,160,80,0.5)", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase" }}
                    >
                      {language === "pt" ? d.notePt : d.noteEn}
                    </span>
                  </div>
                  <span
                    className="font-display text-gold text-[28px] shrink-0 ml-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--gold))" }}
                  >
                    {d.time}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Coords + CTA */}
          <ScrollReveal delay={0.6}>
            <div className="mt-10 pt-8 flex items-end justify-between" style={{ borderTop: "1px solid hsl(var(--gold) / 0.15)" }}>
              <div>
                <p
                  className="font-display"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "rgba(30,22,14,0.50)", letterSpacing: "0.08em" }}
                >
                  38°10'N · 8°34'W
                </p>
                <p style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(200,160,80,0.45)", fontFamily: "'Tenor Sans', sans-serif", textTransform: "uppercase", marginTop: "4px" }}>
                  {language === "pt" ? "Grândola, Alentejo" : "Grândola, Alentejo"}
                </p>
              </div>
              <Link
                to="/localizacao"
                className="flex items-center gap-2 transition-all duration-300 group"
                style={{ textDecoration: "none" }}
              >
                <span className="label-upper" style={{ fontSize: "9px", color: "hsl(var(--gold))" }}>
                  {language === "pt" ? "Ver Mapa" : "View Map"}
                </span>
                <ArrowRight size={14} style={{ color: "hsl(var(--gold))" }} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: premium styled map visual */}
        <ScrollReveal delay={0.2}>
          <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
            {/* Map container with styled border */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ border: "1px solid hsl(var(--gold) / 0.15)" }}
            >
              {/* Google Maps static-style embed with clean styling */}
              <iframe
                title="Localização da Herdade do Monte Claro"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d-8.5645!3d38.1635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2spt!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", filter: "saturate(0.3) brightness(1.05) contrast(0.95)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Elegant overlay gradients */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, hsl(var(--background) / 0.08) 0%, transparent 15%, transparent 85%, hsl(var(--background) / 0.12) 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, hsl(var(--background) / 0.06) 0%, transparent 15%, transparent 85%, hsl(var(--background) / 0.06) 100%)",
                }}
              />

              {/* Gold line accents */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, hsl(var(--gold) / 0.3), transparent)" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, hsl(var(--gold) / 0.3), transparent)" }}
              />
            </div>

            {/* Floating address card */}
            <div
              className="absolute bottom-5 left-5 right-5 md:right-auto md:left-5 z-10"
              style={{
                background: "rgba(247,242,235,0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid hsl(var(--gold) / 0.20)",
                padding: "18px 22px",
                maxWidth: "280px",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "hsl(var(--gold) / 0.08)", border: "1px solid hsl(var(--gold) / 0.18)" }}
                >
                  <MapPin size={13} style={{ color: "hsl(var(--gold))" }} />
                </div>
                <div>
                  <p
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "hsl(var(--foreground))", lineHeight: 1.3 }}
                  >
                    Herdade em <em>Grândola</em>
                  </p>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", color: "rgba(30,22,14,0.45)", marginTop: "4px" }}>
                    Santa Margarida da Serra
                  </p>
                  <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", color: "rgba(30,22,14,0.45)" }}>
                    Alentejo · Portugal
                  </p>
                  <div style={{ borderTop: "1px solid hsl(var(--gold) / 0.12)", marginTop: "10px", paddingTop: "8px" }}>
                    <a
                      href="https://www.google.com/maps?q=38.1635,-8.5645"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 transition-all duration-300 group"
                      style={{ textDecoration: "none" }}
                    >
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(var(--gold))" }}>
                        {language === "pt" ? "Abrir no Maps" : "Open in Maps"}
                      </span>
                      <ArrowRight size={10} style={{ color: "hsl(var(--gold))" }} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocationSection;
