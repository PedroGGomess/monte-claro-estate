import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed z-[800] transition-all duration-500"
      style={{
        bottom: "32px",
        left: "32px",
        width: "44px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: visible ? "hsl(var(--gold))" : "transparent",
        border: visible ? "1px solid hsl(var(--gold))" : "1px solid transparent",
        color: visible ? "hsl(var(--background))" : "transparent",
        cursor: visible ? "pointer" : "default",
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        boxShadow: visible ? "0 4px 24px rgba(200,160,80,0.20)" : "none",
      }}
    >
      <ArrowUp size={18} strokeWidth={1.5} />
    </button>
  );
};

export default BackToTop;
