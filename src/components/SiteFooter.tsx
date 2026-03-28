import { Link } from "react-router-dom";
import { siteConfig } from "@/config/siteConfig";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Mail, MapPin } from "lucide-react";

const SiteFooter = () => {
  const { t, language } = useLanguage();

  return (
    <footer style={{ borderTop: "1px solid hsl(var(--gold) / 0.15)" }}>
      {/* Main footer */}
      <div className="px-8 md:px-14 py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-xl tracking-widest leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--foreground))", textDecoration: "none" }}>
              Herdade em
              <br />
              <em style={{ color: "hsl(var(--gold))" }}>Grândola</em>
            </Link>
            <p className="mt-4" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.45)", lineHeight: 1.8 }}>
              {language === "pt"
                ? "12 hectares no Triângulo de Ouro do Alentejo. Projeto aprovado com licença de construção."
                : "12 hectares in the Alentejo Golden Triangle. Approved project with construction license."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="label-upper block mb-5" style={{ fontSize: "8px" }}>
              {language === "pt" ? "Navegação" : "Navigation"}
            </span>
            <div className="flex flex-col gap-3">
              {[
                { to: "/propriedade", label: t("nav.property") },
                { to: "/galeria", label: t("nav.gallery") },
                { to: "/localizacao", label: t("nav.location") },
                { to: "/agendar", label: t("nav.schedule") },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: "12px",
                    color: "rgba(30,22,14,0.55)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                    letterSpacing: "0.1em",
                  }}
                  className="hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="label-upper block mb-5" style={{ fontSize: "8px" }}>
              {language === "pt" ? "Contacto" : "Contact"}
            </span>
            <div className="space-y-3">
              <a href="tel:+351269000000" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
                <Phone size={12} style={{ color: "hsl(var(--gold))" }} />
                <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.55)" }}>
                  {siteConfig.footer.phone}
                </span>
              </a>
              <a href="mailto:info@monteclaro.pt" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
                <Mail size={12} style={{ color: "hsl(var(--gold))" }} />
                <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.55)" }}>
                  info@monteclaro.pt
                </span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={12} style={{ color: "hsl(var(--gold))" }} />
                <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.55)" }}>
                  Grândola, Alentejo
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <span className="label-upper block mb-5" style={{ fontSize: "8px" }}>
              {language === "pt" ? "Venda Exclusiva" : "Exclusive Sale"}
            </span>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "rgba(30,22,14,0.7)", lineHeight: 1.5, marginBottom: "16px" }}>
              {language === "pt"
                ? "Descubra a sua próxima propriedade no Alentejo."
                : "Discover your next property in the Alentejo."}
            </p>
            <Link to="/agendar" className="btn-calendly" style={{ fontSize: "10px", padding: "10px 20px" }}>
              {t("nav.schedule")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-8 md:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid hsl(var(--gold) / 0.10)" }}
      >
        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(30,22,14,0.30)", textTransform: "uppercase" }}>
          {t("footer.tagline")}
        </span>
        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(30,22,14,0.25)", textTransform: "uppercase" }}>
          38°10'N · 8°34'W
        </span>
      </div>
    </footer>
  );
};

export default SiteFooter;
