import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { APPS_SCRIPT_URL } from "@/config/siteConfig";
import {
  CheckCircle, XCircle, Loader2, Calendar, Clock,
  MapPin, Phone, Mail, MessageCircle, ArrowRight, CalendarPlus,
} from "lucide-react";

/* ─── helpers ─── */

function formatDate(raw?: string, lang: "pt" | "en" = "pt"): string {
  if (!raw) return "";
  const locale = lang === "pt" ? "pt-PT" : "en-GB";
  if (raw.includes("T")) {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    }
  }
  // try parsing YYYY-MM-DD
  const d = new Date(raw + "T00:00:00");
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }
  return raw;
}

function formatTime(raw?: string): string {
  if (!raw) return "";
  if (raw.includes("T")) {
    const match = raw.match(/T(\d{2}:\d{2})/);
    if (match) return match[1];
  }
  return raw;
}

function formatTimeRange(raw?: string): string {
  const time = formatTime(raw);
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const endH = h + 1;
  return `${time} — ${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/* ─── animation variants ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ─── component ─── */

const BookingAction = () => {
  const { language } = useLanguage();
  const [params] = useSearchParams();
  const action = params.get("action");
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

  const whatsappText = language === "pt"
    ? "Olá! Gostaria de mais informações sobre a visita à Herdade em Grândola."
    : "Hello! I would like more information about my visit to Herdade em Grândola.";

  return (
    <div className="bg-background" style={{ minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 80px)", padding: "80px 20px 40px" }}>
        <>

          {/* ───── LOADING ───── */}
          {status === "loading" && (
            <motion.div
              className="text-center max-w-[560px] mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-10 flex items-center justify-center"
                style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.18)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Loader2 size={28} style={{ color: "hsl(var(--gold))" }} className="animate-spin" />
              </motion.div>
              <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,22,14,0.45)" }}>
                {language === "pt" ? "A processar o seu pedido..." : "Processing your request..."}
              </p>
            </motion.div>
          )}

          {/* ───── CONFIRMED ───── */}
          {status === "success" && isConfirm && (
            <motion.div
              className="text-center max-w-[640px] mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Icon */}
              <motion.div variants={scaleIn} className="mb-10">
                <div
                  className="w-24 h-24 mx-auto flex items-center justify-center"
                  style={{ background: "hsl(var(--gold) / 0.08)", border: "1px solid hsl(var(--gold) / 0.22)" }}
                >
                  <CheckCircle size={36} style={{ color: "hsl(var(--gold))" }} strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* Title */}
              <motion.div variants={itemVariants}>
                <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "hsl(var(--gold))", marginBottom: "12px" }}>
                  {language === "pt" ? "EXPERIÊNCIA PRIVADA" : "PRIVATE EXPERIENCE"}
                </p>
                <h1 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  color: "hsl(var(--foreground))",
                  lineHeight: 1.05,
                  fontWeight: 400,
                }}>
                  {language === "pt" ? "Visita " : "Visit "}
                  <em style={{ fontStyle: "italic", color: "hsl(var(--gold))" }}>
                    {language === "pt" ? "Confirmada" : "Confirmed"}
                  </em>
                </h1>
              </motion.div>

              {/* Details card */}
              {result && (
                <motion.div variants={itemVariants} className="mt-10">
                  <div
                    className="mx-auto inline-block"
                    style={{ background: "hsl(var(--gold) / 0.04)", border: "1px solid hsl(var(--gold) / 0.15)", padding: "28px 36px", maxWidth: "440px", width: "100%" }}
                  >
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Calendar size={14} style={{ color: "hsl(var(--gold))" }} />
                          <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.40)" }}>
                            {language === "pt" ? "Data" : "Date"}
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "hsl(var(--foreground))" }}>
                          {formatDate(result.date, language)}
                        </p>
                      </div>
                      <div style={{ width: "1px", height: "48px", background: "hsl(var(--gold) / 0.15)" }} />
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Clock size={14} style={{ color: "hsl(var(--gold))" }} />
                          <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.40)" }}>
                            {language === "pt" ? "Horário" : "Time"}
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "hsl(var(--foreground))" }}>
                          {formatTimeRange(result.time)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Confirmation message */}
              <motion.p
                variants={itemVariants}
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", color: "rgba(30,22,14,0.50)", lineHeight: 1.9, maxWidth: "420px", margin: "32px auto 0" }}
              >
                {language === "pt"
                  ? "A sua visita privada está confirmada. Iremos contactá-lo(a) com instruções detalhadas sobre como chegar à propriedade."
                  : "Your private visit is confirmed. We will contact you with detailed instructions on how to reach the property."}
              </motion.p>

              {/* Location teaser */}
              <motion.div variants={itemVariants} className="mt-8">
                <div className="inline-flex items-center gap-2" style={{ color: "rgba(30,22,14,0.35)" }}>
                  <MapPin size={14} />
                  <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", letterSpacing: "0.1em" }}>
                    Santa Margarida da Serra, Grândola · 38°10'N 8°34'W
                  </span>
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="mt-10 mb-8">
                <div style={{ width: "40px", height: "1px", background: "hsl(var(--gold) / 0.25)", margin: "0 auto" }} />
              </motion.div>

              {/* What to expect */}
              <motion.div variants={itemVariants}>
                <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(var(--gold))", marginBottom: "16px" }}>
                  {language === "pt" ? "A SUA VISITA INCLUI" : "YOUR VISIT INCLUDES"}
                </p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2" style={{ maxWidth: "420px", margin: "0 auto" }}>
                  {(language === "pt"
                    ? ["Visita guiada privada", "Acesso total à propriedade", "Apresentação do estudo de rentabilidade", "Reunião com o arquiteto do projeto"]
                    : ["Private guided tour", "Full property access", "Profitability study presentation", "Meeting with the project architect"]
                  ).map((item, i) => (
                    <span key={i} style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.45)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "hsl(var(--gold))", display: "inline-block" }} />
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Contact CTAs */}
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/351919024221?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 transition-all hover:opacity-80"
                  style={{ background: "hsl(var(--gold))", color: "#fff", fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
                <a
                  href="tel:+351919024221"
                  className="inline-flex items-center gap-2 px-6 py-3 transition-all hover:opacity-80"
                  style={{ border: "1px solid hsl(var(--gold) / 0.3)", color: "hsl(var(--gold))", fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  <Phone size={14} />
                  {language === "pt" ? "Ligar Agora" : "Call Now"}
                </a>
              </motion.div>
            </motion.div>
          )}

          {/* ───── CANCELLED ───── */}
          {status === "success" && isCancel && (
            <motion.div
              className="text-center max-w-[640px] mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Icon */}
              <motion.div variants={scaleIn} className="mb-10">
                <div
                  className="w-24 h-24 mx-auto flex items-center justify-center"
                  style={{ background: "rgba(160,133,96,0.06)", border: "1px solid rgba(160,133,96,0.18)" }}
                >
                  <XCircle size={36} style={{ color: "rgba(160,133,96,0.55)" }} strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* Title */}
              <motion.div variants={itemVariants}>
                <h1 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  color: "hsl(var(--foreground))",
                  lineHeight: 1.05,
                  fontWeight: 400,
                }}>
                  {language === "pt" ? "Visita " : "Visit "}
                  <em style={{ fontStyle: "italic", color: "rgba(160,133,96,0.6)" }}>
                    {language === "pt" ? "Cancelada" : "Cancelled"}
                  </em>
                </h1>
              </motion.div>

              {/* Cancelled details */}
              {result && (
                <motion.div variants={itemVariants} className="mt-8">
                  <div
                    className="mx-auto inline-flex items-center gap-4 px-6 py-3"
                    style={{ background: "rgba(30,22,14,0.02)", border: "1px solid rgba(30,22,14,0.06)" }}
                  >
                    <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(30,22,14,0.35)", textDecoration: "line-through" }}>
                      {formatDate(result.date, language)} · {formatTime(result.time)}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <motion.p
                variants={itemVariants}
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", color: "rgba(30,22,14,0.50)", lineHeight: 1.9, maxWidth: "400px", margin: "28px auto 0" }}
              >
                {language === "pt"
                  ? "A sua visita foi cancelada com sucesso. O horário ficou novamente disponível. Se desejar, pode agendar uma nova visita a qualquer momento."
                  : "Your visit has been successfully cancelled. The time slot is now available again. You're welcome to schedule a new visit anytime."}
              </motion.p>

              {/* Divider */}
              <motion.div variants={itemVariants} className="mt-10 mb-10">
                <div style={{ width: "40px", height: "1px", background: "hsl(var(--gold) / 0.25)", margin: "0 auto" }} />
              </motion.div>

              {/* Reschedule CTA */}
              <motion.div variants={itemVariants}>
                <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(var(--gold))", marginBottom: "20px" }}>
                  {language === "pt" ? "MUDE DE IDEIAS?" : "CHANGED YOUR MIND?"}
                </p>
                <Link
                  to="/agendar"
                  className="inline-flex items-center gap-3 px-8 py-4 transition-all hover:opacity-80"
                  style={{ background: "hsl(var(--gold))", color: "#fff", fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  <CalendarPlus size={16} />
                  {language === "pt" ? "Agendar Nova Visita" : "Schedule a New Visit"}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Contact alternative */}
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/351919024221?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1px solid hsl(var(--gold) / 0.2)", color: "hsl(var(--gold))", fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
                <a
                  href="tel:+351919024221"
                  className="inline-flex items-center gap-2 px-5 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1px solid hsl(var(--gold) / 0.2)", color: "hsl(var(--gold))", fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  <Phone size={13} />
                  {language === "pt" ? "Ligar" : "Call"}
                </a>
                <a
                  href="mailto:herdasantamargarida@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1px solid hsl(var(--gold) / 0.2)", color: "hsl(var(--gold))", fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  <Mail size={13} />
                  Email
                </a>
              </motion.div>
            </motion.div>
          )}

          {/* ───── ERROR ───── */}
          {status === "error" && (
            <motion.div
              className="text-center max-w-[560px] mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={scaleIn} className="mb-10">
                <div
                  className="w-24 h-24 mx-auto flex items-center justify-center"
                  style={{ background: "rgba(180,80,60,0.05)", border: "1px solid rgba(180,80,60,0.18)" }}
                >
                  <XCircle size={36} style={{ color: "rgba(180,80,60,0.55)" }} strokeWidth={1.5} />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "hsl(var(--foreground))",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}>
                  {language === "pt" ? "Algo correu " : "Something went "}
                  <em style={{ fontStyle: "italic", color: "rgba(180,80,60,0.6)" }}>
                    {language === "pt" ? "mal" : "wrong"}
                  </em>
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", color: "rgba(30,22,14,0.50)", lineHeight: 1.9, maxWidth: "380px", margin: "24px auto 0" }}
              >
                {language === "pt"
                  ? "Não foi possível processar o seu pedido. Por favor, contacte-nos directamente para resolver a situação."
                  : "We were unable to process your request. Please contact us directly so we can help."}
              </motion.p>

              {/* Divider */}
              <motion.div variants={itemVariants} className="mt-8 mb-8">
                <div style={{ width: "40px", height: "1px", background: "rgba(180,80,60,0.15)", margin: "0 auto" }} />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+351919024221"
                  className="inline-flex items-center gap-2 px-6 py-3 transition-all hover:opacity-80"
                  style={{ background: "hsl(var(--gold))", color: "#fff", fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  <Phone size={14} />
                  +351 919 024 221
                </a>
                <a
                  href="mailto:herdasantamargarida@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 transition-all hover:opacity-80"
                  style={{ border: "1px solid hsl(var(--gold) / 0.3)", color: "hsl(var(--gold))", fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}
                >
                  <Mail size={14} />
                  Email
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8">
                <Link
                  to="/agendar"
                  className="inline-flex items-center gap-2 transition-all hover:opacity-70"
                  style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,22,14,0.40)", textDecoration: "none", borderBottom: "1px solid rgba(30,22,14,0.12)", paddingBottom: "2px" }}
                >
                  {language === "pt" ? "Tentar agendar novamente" : "Try scheduling again"}
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            </motion.div>
          )}

        </>
      </div>

      <SiteFooter />
    </div>
  );
};

export default BookingAction;
