import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface SiteNavProps {
  transparent?: boolean;
  heroMode?: boolean;
}

const SiteNav = ({ transparent = false, heroMode = false }: SiteNavProps) => {
  const { language, toggle, t } = useLanguage();

  const textColor = heroMode ? "#F2EAD8" : "hsl(var(--foreground))";
  const mutedColor = heroMode ? "rgba(242,236,224,0.45)" : "rgba(30,22,14,0.45)";
  const accentColor = heroMode ? "rgba(200,175,130,0.85)" : "hsl(var(--gold))";
  const dividerColor = heroMode ? "rgba(242,236,224,0.2)" : "rgba(30,22,14,0.18)";

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "'Tenor Sans', sans-serif",
    fontSize: "9px",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: mutedColor,
    transition: "color 0.5s",
  };

  const inner = (
    <div className="flex items-center justify-between px-8 md:px-14 pt-8 pb-6">
      <Link
        to="/"
        className="font-display text-lg tracking-widest leading-tight transition-colors duration-500"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: textColor }}
      >
        Herdade em
        <br />
        <em style={{ color: accentColor }}>Grândola</em>
      </Link>
      <div className="hidden md:flex items-center gap-10">
        <Link
          to="/propriedade"
          className={heroMode ? "nav-link-hero" : "nav-link"}
          style={navLinkStyle}
        >
          {t("nav.property")}
        </Link>
        <Link
          to="/galeria"
          className={heroMode ? "nav-link-hero" : "nav-link"}
          style={navLinkStyle}
        >
          {t("nav.gallery")}
        </Link>
        <Link
          to="/localizacao"
          className={heroMode ? "nav-link-hero" : "nav-link"}
          style={navLinkStyle}
        >
          {t("nav.location")}
        </Link>
        <div className="flex items-center gap-1" style={{ fontSize: "11px", letterSpacing: "0.12em" }}>
          <button
            onClick={toggle}
            style={{
              color: language === "pt" ? accentColor : mutedColor,
              fontWeight: language === "pt" ? 500 : 400,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Tenor Sans', sans-serif",
              transition: "color 0.3s",
            }}
          >
            PT
          </button>
          <span style={{ color: dividerColor }}>|</span>
          <button
            onClick={toggle}
            style={{
              color: language === "en" ? accentColor : mutedColor,
              fontWeight: language === "en" ? 500 : 400,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Tenor Sans', sans-serif",
              transition: "color 0.3s",
            }}
          >
            EN
          </button>
        </div>
        <Link
          to="/agendar"
          className="btn-calendly"
          style={
            heroMode
              ? {
                  borderColor: "rgba(242,236,224,0.55)",
                  color: "rgba(242,236,224,0.85)",
                }
              : {}
          }
        >
          {t("nav.schedule")}
        </Link>
      </div>
    </div>
  );

  if (transparent) {
    return <nav className="pointer-events-auto">{inner}</nav>;
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(247, 242, 235, 0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(30, 22, 14, 0.07)",
      }}
    >
      {inner}
    </nav>
  );
};

export default SiteNav;
