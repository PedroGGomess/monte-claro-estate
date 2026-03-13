import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface SiteNavProps {
  transparent?: boolean;
}

const SiteNav = ({ transparent = false }: SiteNavProps) => {
  const { language, toggle, t } = useLanguage();

  const inner = (
    <div className="flex items-center justify-between px-8 md:px-14 pt-8 pb-6">
      <Link
        to="/"
        className="font-display text-bone text-lg tracking-widest leading-tight hover:text-gold transition-colors duration-500"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F2EAD8" }}
      >
        Herdade em
        <br />
        <em>Grândola</em>
      </Link>
      <div className="hidden md:flex items-center gap-10">
        <Link
          to="/propriedade"
          className="label-muted hover:text-gold transition-colors duration-500 cursor-pointer"
        >
          {t("nav.property")}
        </Link>
        <Link
          to="/galeria"
          className="label-muted hover:text-gold transition-colors duration-500 cursor-pointer"
        >
          {t("nav.gallery")}
        </Link>
        <Link
          to="/localizacao"
          className="label-muted hover:text-gold transition-colors duration-500 cursor-pointer"
        >
          {t("nav.location")}
        </Link>
        <div className="flex items-center gap-1" style={{ fontSize: "11px", letterSpacing: "0.12em" }}>
          <button
            onClick={toggle}
            style={{
              color: language === "pt" ? "#C8A050" : "rgba(242,234,216,0.4)",
              fontWeight: language === "pt" ? 500 : 400,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Tenor Sans', sans-serif",
            }}
          >
            PT
          </button>
          <span style={{ color: "rgba(242,234,216,0.2)" }}>|</span>
          <button
            onClick={toggle}
            style={{
              color: language === "en" ? "#C8A050" : "rgba(242,234,216,0.4)",
              fontWeight: language === "en" ? 500 : 400,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Tenor Sans', sans-serif",
            }}
          >
            EN
          </button>
        </div>
        <Link to="/agendar" className="btn-calendly">
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
        background: "rgba(8,6,10,0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(200,160,80,0.12)",
      }}
    >
      {inner}
    </nav>
  );
};

export default SiteNav;
