import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

interface SiteNavProps {
  transparent?: boolean;
  heroMode?: boolean;
}

const SiteNav = ({ transparent = false, heroMode = false }: SiteNavProps) => {
  const { language, toggle, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isHero = heroMode && !scrolled;
  const textColor = isHero ? "#F2EAD8" : "hsl(var(--foreground))";
  const mutedColor = isHero ? "rgba(242,236,224,0.45)" : "rgba(30,22,14,0.45)";
  const accentColor = isHero ? "rgba(200,175,130,0.85)" : "hsl(var(--gold))";
  const dividerColor = isHero ? "rgba(242,236,224,0.2)" : "rgba(30,22,14,0.18)";

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "'Tenor Sans', sans-serif",
    fontSize: "9px",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: mutedColor,
    transition: "color 0.5s",
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/propriedade", label: t("nav.property") },
    { to: "/galeria", label: t("nav.gallery") },
    { to: "/localizacao", label: t("nav.location") },
  ];

  const languageToggle = (
    <div
      className="flex items-center gap-0 relative"
      style={{
        border: `1px solid ${dividerColor}`,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => language !== "pt" && toggle()}
        style={{
          padding: "6px 12px",
          fontSize: "10px",
          letterSpacing: "0.12em",
          fontFamily: "'Tenor Sans', sans-serif",
          background: language === "pt" ? (isHero ? "rgba(200,175,130,0.15)" : "hsl(var(--gold) / 0.1)") : "transparent",
          color: language === "pt" ? accentColor : mutedColor,
          fontWeight: language === "pt" ? 500 : 400,
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        PT
      </button>
      <div style={{ width: "1px", height: "20px", background: dividerColor }} />
      <button
        onClick={() => language !== "en" && toggle()}
        style={{
          padding: "6px 12px",
          fontSize: "10px",
          letterSpacing: "0.12em",
          fontFamily: "'Tenor Sans', sans-serif",
          background: language === "en" ? (isHero ? "rgba(200,175,130,0.15)" : "hsl(var(--gold) / 0.1)") : "transparent",
          color: language === "en" ? accentColor : mutedColor,
          fontWeight: language === "en" ? 500 : 400,
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        EN
      </button>
    </div>
  );

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

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isHero ? "nav-link-hero" : "nav-link"}
            style={{
              ...navLinkStyle,
              color: isActive(link.to) ? accentColor : mutedColor,
            }}
          >
            {link.label}
          </Link>
        ))}
        {languageToggle}
        <Link
          to="/agendar"
          className="btn-calendly"
          style={
            isHero
              ? { borderColor: "rgba(242,236,224,0.55)", color: "rgba(242,236,224,0.85)" }
              : {}
          }
        >
          {t("nav.schedule")}
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ background: "none", border: "none", color: textColor, cursor: "pointer" }}
        aria-label="Menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );

  const mobileMenu = mobileOpen && (
    <div
      className="fixed inset-0 z-[999] md:hidden"
      style={{ background: "rgba(247, 242, 235, 0.98)", backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center justify-between px-8 pt-8 pb-6">
        <Link
          to="/"
          className="font-display text-lg tracking-widest leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "hsl(var(--foreground))" }}
        >
          Herdade em
          <br />
          <em style={{ color: "hsl(var(--gold))" }}>Grândola</em>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          style={{ background: "none", border: "none", color: "hsl(var(--foreground))", cursor: "pointer" }}
          aria-label="Fechar"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-10 pt-16">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="nav-link"
            style={{
              fontSize: "11px",
              letterSpacing: "0.5em",
              color: isActive(link.to) ? "hsl(var(--gold))" : "rgba(30,22,14,0.55)",
            }}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <div style={{ width: "40px", height: "1px", background: "hsl(var(--gold) / 0.25)" }} />

        {languageToggle}

        <Link
          to="/agendar"
          className="btn-calendly"
          onClick={() => setMobileOpen(false)}
        >
          {t("nav.schedule")}
        </Link>
      </div>
    </div>
  );

  if (transparent) {
    return (
      <>
        <nav className="pointer-events-auto">{inner}</nav>
        {mobileMenu}
      </>
    );
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(247, 242, 235, 0.96)" : "rgba(247, 242, 235, 0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid rgba(30, 22, 14, ${scrolled ? "0.1" : "0.07"})`,
        }}
      >
        {inner}
      </nav>
      {mobileMenu}
    </>
  );
};

export default SiteNav;
