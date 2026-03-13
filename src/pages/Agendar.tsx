import { useState, FormEvent } from "react";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const inputStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(30,22,14,0.22)",
  color: "hsl(var(--foreground))",
  fontSize: "16px",
  width: "100%",
  padding: "10px 0",
  outline: "none",
  fontFamily: "'Tenor Sans', sans-serif",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "rgba(30,22,14,0.45)",
  marginBottom: "6px",
  fontFamily: "'Tenor Sans', sans-serif",
};

const fieldStyle: React.CSSProperties = {
  marginBottom: "28px",
};

const Agendar = () => {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [comercial, setComercial] = useState(false);

  const getFocusStyle = (name: string): React.CSSProperties => ({
    ...inputStyle,
    borderBottom: focused === name
      ? "1px solid hsl(var(--gold))"
      : "1px solid rgba(30,22,14,0.22)",
    boxShadow: focused === name ? "0 1px 0 0 hsl(var(--gold) / 0.3)" : "none",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-background" style={{ minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      <div className="px-8 md:px-14" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 max-w-[1400px] mx-auto">
          {/* Left col (40%) */}
          <div className="md:col-span-2">
            <ScrollReveal>
              <h1
                className="heading-display"
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 3rem)",
                  color: "hsl(var(--foreground))",
                  fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 1.1,
                }}
              >
                {t("agendar.title")}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p
                className="font-display italic mt-4"
                style={{ color: "hsl(var(--gold))", fontSize: "18px", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("agendar.subtitle")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="body-text mt-8">{t("agendar.desc")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div
                className="mt-12 pt-8"
                style={{ borderTop: "1px solid hsl(var(--gold) / 0.18)" }}
              >
                <div className="mb-4">
                  <p className="label-upper mb-1">{language === "pt" ? "Telefone" : "Phone"}</p>
                  <p style={{ color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
                    +351 266 000 000
                  </p>
                </div>
                <div className="mb-4">
                  <p className="label-upper mb-1">Email</p>
                  <p style={{ color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
                    info@monteclaro.pt
                  </p>
                </div>
                <p className="label-muted mt-6">{t("agendar.response")}</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right col (60%) — the form */}
          <div className="md:col-span-3">
            <ScrollReveal delay={0.2}>
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center text-center py-24"
                  style={{ border: "1px solid hsl(var(--gold) / 0.18)" }}
                >
                  <div
                    className="w-12 h-12 mb-8 flex items-center justify-center"
                    style={{ border: "1px solid hsl(var(--gold))" }}
                  >
                    <span style={{ color: "hsl(var(--gold))", fontSize: "24px" }}>✓</span>
                  </div>
                  <h2
                    className="heading-display"
                    style={{ fontSize: "32px", color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {language === "pt" ? "Visita Agendada" : "Visit Scheduled"}
                  </h2>
                  <p className="body-text mt-4 max-w-[380px]">{t("agendar.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    <div style={fieldStyle}>
                      <label style={labelStyle}>{t("agendar.nome")}</label>
                      <input
                        type="text"
                        required
                        style={getFocusStyle("nome")}
                        onFocus={() => setFocused("nome")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>{t("agendar.email")}</label>
                      <input
                        type="email"
                        required
                        style={getFocusStyle("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>{t("agendar.telefone")}</label>
                      <input
                        type="tel"
                        style={getFocusStyle("telefone")}
                        onFocus={() => setFocused("telefone")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>{t("agendar.data")}</label>
                      <input
                        type="date"
                        required
                        style={{
                          ...getFocusStyle("data"),
                          colorScheme: "light",
                        }}
                        onFocus={() => setFocused("data")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>{t("agendar.periodo")}</label>
                      <select
                        style={{
                          ...getFocusStyle("periodo"),
                          cursor: "pointer",
                          appearance: "none" as const,
                        }}
                        onFocus={() => setFocused("periodo")}
                        onBlur={() => setFocused(null)}
                      >
                        <option value="" style={{ background: "hsl(var(--background))" }}>—</option>
                        <option value="manha" style={{ background: "hsl(var(--background))" }}>{t("agendar.manha")}</option>
                        <option value="tarde" style={{ background: "hsl(var(--background))" }}>{t("agendar.tarde")}</option>
                        <option value="fimdesemana" style={{ background: "hsl(var(--background))" }}>{t("agendar.fimdesemana")}</option>
                      </select>
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>{t("agendar.pessoas")}</label>
                      <select
                        style={{
                          ...getFocusStyle("pessoas"),
                          cursor: "pointer",
                          appearance: "none" as const,
                        }}
                        onFocus={() => setFocused("pessoas")}
                        onBlur={() => setFocused(null)}
                      >
                        <option value="" style={{ background: "hsl(var(--background))" }}>—</option>
                        <option value="1" style={{ background: "hsl(var(--background))" }}>1</option>
                        <option value="2" style={{ background: "hsl(var(--background))" }}>2</option>
                        <option value="3" style={{ background: "hsl(var(--background))" }}>3</option>
                        <option value="4+" style={{ background: "hsl(var(--background))" }}>4+</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ ...fieldStyle, marginTop: "4px" }}>
                    <label style={labelStyle}>{t("agendar.mensagem")}</label>
                    <textarea
                      rows={4}
                      style={{
                        ...getFocusStyle("mensagem"),
                        resize: "vertical",
                        paddingTop: "10px",
                      }}
                      onFocus={() => setFocused("mensagem")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div style={{ marginBottom: "32px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <input
                      type="checkbox"
                      id="comercial"
                      checked={comercial}
                      onChange={(e) => setComercial(e.target.checked)}
                      style={{
                        marginTop: "2px",
                        accentColor: "hsl(var(--gold))",
                        width: "16px",
                        height: "16px",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    />
                    <label
                      htmlFor="comercial"
                      style={{
                        fontSize: "12px",
                        color: "rgba(30,22,14,0.55)",
                        fontFamily: "'Tenor Sans', sans-serif",
                        letterSpacing: "0.05em",
                        cursor: "pointer",
                        lineHeight: 1.6,
                      }}
                    >
                      {t("agendar.comercial")}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn-calendly"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    {t("agendar.submit")}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Agendar;
