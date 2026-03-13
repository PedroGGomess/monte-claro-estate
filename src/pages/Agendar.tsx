import { useState, FormEvent } from "react";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { images as herdadeImages } from "@/config/siteConfig";

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

const benefits = [
  { pt: "Visita guiada privada e exclusiva", en: "Private and exclusive guided tour" },
  { pt: "Acesso completo à propriedade e ao projeto aprovado", en: "Full access to the property and approved project" },
  { pt: "Apresentação dos estudos de rentabilidade", en: "Profitability study presentation" },
  { pt: "Reunião com o arquiteto responsável pelo projeto", en: "Meeting with the project architect" },
];

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

      {/* Hero accent strip */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "38vh", minHeight: 240 }}
      >
        <img
          src={herdadeImages.poolPergola}
          alt="Herdade do Monte Claro"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.30) saturate(0.70)", objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-10">
          <span className="label-upper mb-4" style={{ color: "hsl(var(--gold))" }}>
            {language === "pt" ? "Visita Privada" : "Private Visit"}
          </span>
          <h1
            className="heading-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(242,234,216,0.92)",
              lineHeight: 1.05,
            }}
          >
            {t("agendar.title")}
          </h1>
        </div>
      </div>

      <div className="px-8 md:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 max-w-[1400px] mx-auto">
          {/* Left col (40%) */}
          <div className="md:col-span-2">
            <ScrollReveal>
              <p
                className="font-display italic"
                style={{ color: "hsl(var(--gold))", fontSize: "20px", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("agendar.subtitle")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="body-text mt-6">{t("agendar.desc")}</p>
            </ScrollReveal>

            {/* Benefits list */}
            <ScrollReveal delay={0.2}>
              <div className="mt-10" style={{ borderTop: "1px solid hsl(var(--gold) / 0.18)", paddingTop: "20px" }}>
                <span className="label-upper block mb-6">
                  {language === "pt" ? "A sua visita inclui" : "Your visit includes"}
                </span>
                <ul className="space-y-4">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span style={{ color: "hsl(var(--gold))", fontSize: "10px", marginTop: "5px", flexShrink: 0 }}>◆</span>
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(30,22,14,0.65)", lineHeight: 1.7 }}>
                        {language === "pt" ? b.pt : b.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Contact info */}
            <ScrollReveal delay={0.3}>
              <div
                className="mt-10 pt-8"
                style={{ borderTop: "1px solid hsl(var(--gold) / 0.18)" }}
              >
                <div className="mb-5">
                  <p className="label-upper mb-1">{language === "pt" ? "Telefone" : "Phone"}</p>
                  <p style={{ color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
                    +351 266 000 000
                  </p>
                </div>
                <div className="mb-5">
                  <p className="label-upper mb-1">Email</p>
                  <p style={{ color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
                    info@monteclaro.pt
                  </p>
                </div>
                <p className="label-muted mt-4">{t("agendar.response")}</p>
              </div>
            </ScrollReveal>

            {/* Property image teaser */}
            <ScrollReveal delay={0.35}>
              <div className="mt-10 relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                <img
                  src={herdadeImages.arches}
                  alt="Herdade do Monte Claro"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.78) saturate(0.85)" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{ background: "linear-gradient(to top, rgba(10,8,6,0.72) 0%, transparent 100%)" }}
                >
                  <span className="label-upper text-[8px]" style={{ color: "rgba(200,160,80,0.75)" }}>
                    {language === "pt" ? "Herdade do Monte Claro · Arcadas" : "Herdade do Monte Claro · Arches"}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right col (60%) — the form */}
          <div className="md:col-span-3">
            <ScrollReveal delay={0.15}>
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center text-center py-24"
                  style={{ border: "1px solid hsl(var(--gold) / 0.22)" }}
                >
                  <div
                    className="w-14 h-14 mb-8 flex items-center justify-center"
                    style={{ border: "1px solid hsl(var(--gold))" }}
                  >
                    <span style={{ color: "hsl(var(--gold))", fontSize: "26px" }}>✓</span>
                  </div>
                  <h2
                    className="heading-display"
                    style={{ fontSize: "36px", color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {language === "pt" ? "Visita Agendada" : "Visit Scheduled"}
                  </h2>
                  <p className="body-text mt-4 max-w-[380px]">{t("agendar.success")}</p>
                  <p className="label-upper mt-8" style={{ color: "hsl(var(--gold))" }}>
                    {language === "pt" ? "Resposta em 24 horas" : "Response within 24 hours"}
                  </p>
                </div>
              ) : (
                <div
                  className="p-8 md:p-10"
                  style={{ border: "1px solid hsl(var(--gold) / 0.14)", background: "rgba(200,160,80,0.015)" }}
                >
                  <span className="label-upper block mb-8">
                    {language === "pt" ? "Formulário de Agendamento" : "Booking Form"}
                  </span>
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
                </div>
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
