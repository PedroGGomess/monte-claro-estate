import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { APPS_SCRIPT_URL } from "@/config/siteConfig";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

/** Format a value that may be an ISO date string or a plain "YYYY-MM-DD" string */
function formatDate(raw?: string): string {
  if (!raw) return "";
  // If it looks like an ISO date, parse and format
  if (raw.includes("T")) {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("pt-PT", { day: "numeric", month: "short", year: "numeric" });
    }
  }
  return raw;
}

/** Format a value that may be an ISO time string (Google Sheets epoch) or "HH:MM" */
function formatTime(raw?: string): string {
  if (!raw) return "";
  // Google Sheets stores time as "1899-12-30THH:MM:SS.000Z"
  if (raw.includes("T")) {
    const match = raw.match(/T(\d{2}:\d{2})/);
    if (match) return match[1];
  }
  return raw;
}

const BookingAction = () => {
  const { language } = useLanguage();
  const [params] = useSearchParams();
  const action = params.get("action"); // "confirm" or "cancel"
  const id = params.get("id");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [result, setResult] = useState<{ name?: string; date?: string; time?: string; status?: string } | null>(null);

  useEffect(() => {
    if (!action || !id || !APPS_SCRIPT_URL || APPS_SCRIPT_URL === "REPLACE_WITH_YOUR_APPS_SCRIPT_URL") {
      setStatus("error");
      return;
    }

    const url = `${APPS_SCRIPT_URL}?action=${action}&id=${id}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setResult(data);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [action, id]);

  const isConfirm = action === "confirm";
  const isCancel = action === "cancel";

  return (
    <div className="bg-background" style={{ minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="text-center px-8 py-20 max-w-[560px] mx-auto">

          {status === "loading" && (
            <>
              <div
                className="w-20 h-20 mx-auto mb-10 flex items-center justify-center animate-pulse"
                style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.25)" }}
              >
                <Loader2 size={32} style={{ color: "hsl(var(--gold))" }} className="animate-spin" />
              </div>
              <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", color: "rgba(30,22,14,0.55)" }}>
                {language === "pt" ? "A processar..." : "Processing..."}
              </p>
            </>
          )}

          {status === "success" && isConfirm && (
            <>
              <div
                className="w-20 h-20 mx-auto mb-10 flex items-center justify-center"
                style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.25)" }}
              >
                <CheckCircle size={32} style={{ color: "hsl(var(--gold))" }} />
              </div>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "hsl(var(--foreground))",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                {language === "pt" ? "Visita " : "Visit "}
                <em style={{ fontStyle: "italic", color: "hsl(var(--gold))" }}>
                  {language === "pt" ? "Confirmada" : "Confirmed"}
                </em>
              </h1>

              {result && (
                <div
                  className="mt-8 mx-auto inline-flex items-center gap-4 px-6 py-4"
                  style={{ background: "hsl(var(--gold) / 0.04)", border: "1px solid hsl(var(--gold) / 0.18)" }}
                >
                  <div className="text-center">
                    <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.40)" }}>
                      {language === "pt" ? "Data" : "Date"}
                    </span>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "hsl(var(--foreground))", marginTop: "2px" }}>
                      {formatDate(result.date)}
                    </p>
                  </div>
                  <div style={{ width: "1px", height: "40px", background: "hsl(var(--gold) / 0.2)" }} />
                  <div className="text-center">
                    <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.40)" }}>
                      {language === "pt" ? "Hora" : "Time"}
                    </span>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "hsl(var(--foreground))", marginTop: "2px" }}>
                      {formatTime(result.time)}
                    </p>
                  </div>
                </div>
              )}

              <p
                className="mt-8"
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", color: "rgba(30,22,14,0.55)", lineHeight: 1.8, maxWidth: "380px", margin: "32px auto 0" }}
              >
                {language === "pt"
                  ? "A sua visita está confirmada. Iremos contactá-lo com instruções detalhadas."
                  : "Your visit has been confirmed. We will contact you with detailed instructions."}
              </p>
            </>
          )}

          {status === "success" && isCancel && (
            <>
              <div
                className="w-20 h-20 mx-auto mb-10 flex items-center justify-center"
                style={{ background: "rgba(180,80,60,0.06)", border: "1px solid rgba(180,80,60,0.25)" }}
              >
                <XCircle size={32} style={{ color: "rgba(180,80,60,0.7)" }} />
              </div>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "hsl(var(--foreground))",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                {language === "pt" ? "Visita " : "Visit "}
                <em style={{ fontStyle: "italic", color: "rgba(180,80,60,0.7)" }}>
                  {language === "pt" ? "Cancelada" : "Cancelled"}
                </em>
              </h1>

              <p
                className="mt-8"
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", color: "rgba(30,22,14,0.55)", lineHeight: 1.8, maxWidth: "380px", margin: "32px auto 0" }}
              >
                {language === "pt"
                  ? "A sua visita foi cancelada com sucesso. O horário ficou novamente disponível."
                  : "Your visit has been successfully cancelled. The time slot is now available again."}
              </p>

              <a
                href="/agendar"
                className="mt-8 inline-block"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "hsl(var(--gold))",
                  borderBottom: "1px solid hsl(var(--gold) / 0.3)",
                  paddingBottom: "2px",
                  textDecoration: "none",
                }}
              >
                {language === "pt" ? "Agendar Nova Visita" : "Schedule a New Visit"}
              </a>
            </>
          )}

          {status === "error" && (
            <>
              <div
                className="w-20 h-20 mx-auto mb-10 flex items-center justify-center"
                style={{ background: "rgba(180,80,60,0.06)", border: "1px solid rgba(180,80,60,0.25)" }}
              >
                <XCircle size={32} style={{ color: "rgba(180,80,60,0.7)" }} />
              </div>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "hsl(var(--foreground))",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                {language === "pt" ? "Erro" : "Error"}
              </h1>
              <p
                className="mt-6"
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", color: "rgba(30,22,14,0.55)", lineHeight: 1.8 }}
              >
                {language === "pt"
                  ? "Não foi possível processar o seu pedido. Contacte-nos directamente."
                  : "Unable to process your request. Please contact us directly."}
              </p>
              <p className="mt-4" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "hsl(var(--gold))" }}>
                +351 919 024 221 · herdasantamargarida@gmail.com
              </p>
            </>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default BookingAction;
