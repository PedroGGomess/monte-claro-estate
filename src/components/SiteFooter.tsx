import { Link } from "react-router-dom";
import { siteConfig } from "@/config/siteConfig";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const SiteFooter = () => {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid hsl(var(--gold) / 0.15)" }}>
      {/* Pre-footer CTA band */}
      <div
        className="px-8 md:px-14 py-14 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ background: "hsl(var(--gold) / 0.02)" }}
      >
        <div>
          <span
            className="label-upper block mb-3"
            style={{ color: "hsl(var(--gold))", fontSize: "9px" }}
          >
            {language === "pt" ? "Venda Exclusiva" : "Exclusive Sale"}
          </span>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: "hsl(var(--foreground))",
              lineHeight: 1.3,
              fontWeight: 400,
              maxWidth: "480px",
            }}
          >
            {language === "pt" ? (
              <>Descubra a sua <em style={{ color: "hsl(var(--gold))", fontStyle: "italic" }}>próxima propriedade</em> no Alentejo.</>
            ) : (
              <>Discover your <em style={{ color: "hsl(var(--gold))", fontStyle: "italic" }}>next property</em> in the Alentejo.</>
            )}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/agendar" className="btn-calendly flex items-center gap-2" style={{ fontSize: "10px", padding: "12px 24px" }}>
            {t("nav.schedule")}
            <ArrowUpRight size={12} />
          </Link>
          <a
            href="tel:+351269000000"
            className="btn-ghost flex items-center gap-2"
            style={{ fontSize: "10px", padding: "12px 24px" }}
          >
            <Phone size={12} />
            {language === "pt" ? "Ligar Agora" : "Call Now"}
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div
        className="px-8 md:px-14 py-16 md:py-20"
        style={{ borderTop: "1px solid hsl(var(--gold) / 0.08)" }}
      >
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
              <a href="mailto:info@herdadegrandola.pt" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
                <Mail size={12} style={{ color: "hsl(var(--gold))" }} />
                <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.55)" }}>
                  info@herdadegrandola.pt
                </span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={12} style={{ color: "hsl(var(--gold))" }} />
                <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.55)" }}>
                  Santa Margarida da Serra, Grândola
                </span>
              </div>
            </div>
          </div>

          {/* Property highlights */}
          <div>
            <span className="label-upper block mb-5" style={{ fontSize: "8px" }}>
              {language === "pt" ? "Propriedade" : "Property"}
            </span>
            <div className="space-y-3">
              {[
                { label: language === "pt" ? "Área Total" : "Total Area", value: "12 ha" },
                { label: language === "pt" ? "Construção Aprovada" : "Approved Construction", value: "500 m²" },
                { label: language === "pt" ? "Tipologia" : "Typology", value: "T3+T3" },
                { label: language === "pt" ? "Fontes de Água" : "Water Sources", value: "3" },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center" style={{ paddingBottom: "6px", borderBottom: "1px solid hsl(var(--gold) / 0.05)" }}>
                  <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", color: "rgba(30,22,14,0.40)", letterSpacing: "0.05em" }}>
                    {stat.label}
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "hsl(var(--foreground))", fontWeight: 500 }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-8 md:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid hsl(var(--gold) / 0.08)" }}
      >
        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(30,22,14,0.30)", textTransform: "uppercase" }}>
          {t("footer.tagline")}
        </span>
        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(30,22,14,0.20)", textTransform: "uppercase" }}>
          © {year} · 38°10'N 8°34'W
        </span>
      </div>
    </footer>
  );
};

export default SiteFooter;
