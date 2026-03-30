import { useState, useMemo, useEffect, FormEvent } from "react";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { images as herdadeImages, APPS_SCRIPT_URL } from "@/config/siteConfig";
import {
  Phone, Mail, MessageCircle, CheckCircle,
  Calendar, Users, Clock, ChevronLeft, ChevronRight, ArrowRight, Sparkles,
} from "lucide-react";

/* ───────────────────────────────────────────────
   SLOT BOOKING SYSTEM
   - visits run 9:00 → 20:00
   - each visit = 1 hour
   - 15 min buffer between visits
   - booked slots stored in localStorage as simple DB
   ─────────────────────────────────────────────── */

const VISIT_DURATION = 60;
const BUFFER_MINUTES = 15;
const DAY_START_HOUR = 9;
const DAY_END_HOUR = 20;

interface BookedSlot {
  id?: string;
  date: string;
  time: string;
  name: string;
  email?: string;
  status?: string;
}

/* Fetch booked slots from Google Sheets backend */
const fetchRemoteSlots = async (): Promise<BookedSlot[]> => {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === "REPLACE_WITH_YOUR_APPS_SCRIPT_URL") return [];
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=list`);
    const data = await res.json();
    return (data.bookings || []) as BookedSlot[];
  } catch { return []; }
};

/* localStorage as fallback / local cache */
const STORAGE_KEY = "herdade_booked_slots";

const loadLocalSlots = (): BookedSlot[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

const saveLocalSlot = (slot: BookedSlot) => {
  const slots = loadLocalSlots();
  slots.push(slot);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
};

const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let h = DAY_START_HOUR; h < DAY_END_HOUR; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h * 60 + 30 + VISIT_DURATION <= DAY_END_HOUR * 60) {
      slots.push(`${String(h).padStart(2, "0")}:30`);
    }
  }
  return slots;
};

const isSlotAvailable = (date: string, time: string, booked: BookedSlot[]): boolean => {
  const slotStart = timeToMinutes(time);
  const slotEnd = slotStart + VISIT_DURATION;
  for (const b of booked) {
    if (b.date !== date) continue;
    const bStart = timeToMinutes(b.time);
    const bEnd = bStart + VISIT_DURATION;
    if (slotStart < bEnd + BUFFER_MINUTES && slotEnd + BUFFER_MINUTES > bStart) return false;
  }
  return true;
};

const timeToMinutes = (t: string): number => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const isPastSlot = (date: string, time: string): boolean => {
  const now = new Date();
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm) <= now;
};

/* ─── CALENDAR HELPERS ─── */

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const formatDate = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const formatDateDisplay = (dateStr: string, lang: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  const months = lang === "pt"
    ? ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
};

const MONTH_NAMES_PT = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const MONTH_NAMES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAY_PT = ["D", "S", "T", "Q", "Q", "S", "S"];
const WEEKDAY_EN = ["S", "M", "T", "W", "T", "F", "S"];

/* ─── BENEFITS ─── */

const benefits = [
  { pt: "Visita guiada privada e exclusiva", en: "Private and exclusive guided tour", icon: "✦" },
  { pt: "Acesso completo à propriedade e projeto", en: "Full access to property and project", icon: "✦" },
  { pt: "Apresentação dos estudos de rentabilidade", en: "Profitability study presentation", icon: "✦" },
  { pt: "Reunião com o arquiteto do projeto", en: "Meeting with the project architect", icon: "✦" },
];

/* ─── STEP INDICATOR ─── */

const StepIndicator = ({ step, current, label }: { step: number; current: number; label: string }) => {
  const isActive = current >= step;
  const isCurrent = current === step;
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 flex items-center justify-center transition-all duration-500"
        style={{
          background: isActive ? "hsl(var(--gold))" : "transparent",
          border: `1px solid ${isActive ? "hsl(var(--gold))" : "rgba(30,22,14,0.15)"}`,
          color: isActive ? "hsl(var(--background))" : "rgba(30,22,14,0.30)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "15px",
          fontWeight: 600,
        }}
      >
        {isActive && current > step ? <CheckCircle size={14} /> : step}
      </div>
      <span
        className="transition-all duration-300"
        style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: isCurrent ? "hsl(var(--gold))" : isActive ? "rgba(30,22,14,0.55)" : "rgba(30,22,14,0.25)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

const Agendar = () => {
  const { t, language } = useLanguage();
  const monthNames = language === "pt" ? MONTH_NAMES_PT : MONTH_NAMES_EN;
  const weekdays = language === "pt" ? WEEKDAY_PT : WEEKDAY_EN;

  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [comercial, setComercial] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", pessoas: "2", mensagem: "" });

  const [remoteSlots, setRemoteSlots] = useState<BookedSlot[]>([]);

  useEffect(() => {
    fetchRemoteSlots().then(setRemoteSlots);
  }, [submitted]);

  // Merge remote slots with local slots (deduplicating by date+time)
  const bookedSlots = useMemo(() => {
    const local = loadLocalSlots();
    const merged = [...remoteSlots];
    for (const ls of local) {
      const exists = merged.some(rs => rs.date === ls.date && rs.time === ls.time);
      if (!exists) merged.push(ls);
    }
    return merged;
  }, [remoteSlots, submitted]);

  const allTimeSlots = useMemo(() => generateTimeSlots(), []);

  const availableSlotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    return allTimeSlots.filter(
      (t) => isSlotAvailable(selectedDate, t, bookedSlots) && !isPastSlot(selectedDate, t)
    );
  }, [selectedDate, bookedSlots, allTimeSlots]);

  const currentStep = !selectedDate ? 1 : !selectedTime ? 2 : 3;

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const isPrevDisabled = calYear === now.getFullYear() && calMonth <= now.getMonth();

  const isDatePast = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isSunday = (day: number) => new Date(calYear, calMonth, day).getDay() === 0;

  const handleDateSelect = (day: number) => {
    if (isDatePast(day)) return;
    const date = formatDate(calYear, calMonth, day);
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const updateField = (name: string, value: string) =>
    setFormData(prev => ({ ...prev, [name]: value }));

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.nome || !formData.email || submitting) return;
    setSubmitting(true);

    const visitDate = formatDateDisplay(selectedDate, "en");
    const [sh, sm] = selectedTime.split(":").map(Number);
    const endMin = sh * 60 + sm + VISIT_DURATION;
    const endTime = `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;
    const siteBase = window.location.origin;

    let bookingId = "";

    // 1. Save to Google Sheets (central database)
    try {
      if (APPS_SCRIPT_URL && APPS_SCRIPT_URL !== "REPLACE_WITH_YOUR_APPS_SCRIPT_URL") {
        const gsRes = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.nome,
            email: formData.email,
            phone: formData.telefone || "",
            date: selectedDate,
            time: selectedTime,
            guests: formData.pessoas,
            message: formData.mensagem || "",
            commercial: comercial ? "Yes" : "No",
          }),
        });
        const gsData = await gsRes.json();
        if (gsData.id) bookingId = gsData.id;
      }
    } catch { /* continue even if Sheets fails */ }

    // Build confirm/cancel links
    const confirmLink = bookingId ? `${siteBase}/booking?action=confirm&id=${bookingId}` : "";
    const cancelLink = bookingId ? `${siteBase}/booking?action=cancel&id=${bookingId}` : "";

    // 2. Send email notification via Formspree
    try {
      const autoReplyLines = [
        `Dear ${formData.nome},`,
        ``,
        `Thank you for scheduling a private visit to Herdade em Grândola.`,
        ``,
        `Your visit details:`,
        `  Date: ${visitDate}`,
        `  Time: ${selectedTime} – ${endTime}`,
        `  Guests: ${formData.pessoas}`,
        ``,
      ];

      if (confirmLink) {
        autoReplyLines.push(
          `Confirm your visit:`,
          confirmLink,
          ``,
          `Need to cancel? Use this link:`,
          cancelLink,
          ``,
        );
      }

      autoReplyLines.push(
        `If you have any questions, feel free to reach us at +351 919 024 221 or reply to this email.`,
        ``,
        `We look forward to welcoming you.`,
        ``,
        `Warm regards,`,
        `Herdade em Grândola`,
        `Grândola · Alentejo · Portugal`,
      );

      await fetch("https://formspree.io/f/xwvwooan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone || "—",
          date: visitDate,
          time: `${selectedTime} – ${endTime}`,
          guests: formData.pessoas,
          message: formData.mensagem || "—",
          commercial_interest: comercial ? "Yes" : "No",
          confirm_link: confirmLink || "N/A (Google Sheets not configured)",
          cancel_link: cancelLink || "N/A",
          _subject: `🏡 New Visit Request — ${formData.nome} — ${visitDate}`,
          _autoresponse: autoReplyLines.join("\n"),
        }),
      });
    } catch { /* continue */ }

    // 3. Save locally as fallback
    saveLocalSlot({ date: selectedDate, time: selectedTime, name: formData.nome, email: formData.email });
    setSubmitting(false);
    setSubmitted(true);
  };

  const whatsappMessage = language === "pt"
    ? `Olá! Gostaria de agendar uma visita à Herdade em Grândola${selectedDate ? ` no dia ${selectedDate}` : ""}${selectedTime ? ` às ${selectedTime}` : ""}.`
    : `Hello! I would like to schedule a visit to Herdade em Grândola${selectedDate ? ` on ${selectedDate}` : ""}${selectedTime ? ` at ${selectedTime}` : ""}.`;
  const whatsappUrl = `https://wa.me/351919024221?text=${encodeURIComponent(whatsappMessage)}`;

  // Calendar grid
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  // Group time slots by period
  const morningSlots = availableSlotsForDate.filter(t => timeToMinutes(t) < 13 * 60);
  const afternoonSlots = availableSlotsForDate.filter(t => timeToMinutes(t) >= 13 * 60 && timeToMinutes(t) < 17 * 60);
  const eveningSlots = availableSlotsForDate.filter(t => timeToMinutes(t) >= 17 * 60);

  /* ─── RENDER ─── */

  if (submitted) {
    return (
      <div className="bg-background" style={{ minHeight: "100vh" }}>
        <CustomCursor />
        <FilmGrain />
        <SiteNav />

        <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 80px)" }}>
          <div className="text-center px-8 py-20 max-w-[560px] mx-auto">
            <ScrollReveal>
              <div
                className="w-20 h-20 mx-auto mb-10 flex items-center justify-center"
                style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.25)" }}
              >
                <CheckCircle size={32} style={{ color: "hsl(var(--gold))" }} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
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
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div
                className="mt-8 mx-auto inline-flex items-center gap-4 px-6 py-4"
                style={{ background: "hsl(var(--gold) / 0.04)", border: "1px solid hsl(var(--gold) / 0.18)" }}
              >
                <div className="text-center">
                  <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.40)" }}>
                    {language === "pt" ? "Data" : "Date"}
                  </span>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "hsl(var(--foreground))", marginTop: "2px" }}>
                    {selectedDate && formatDateDisplay(selectedDate, language)}
                  </p>
                </div>
                <div style={{ width: "1px", height: "40px", background: "hsl(var(--gold) / 0.2)" }} />
                <div className="text-center">
                  <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.40)" }}>
                    {language === "pt" ? "Hora" : "Time"}
                  </span>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "hsl(var(--foreground))", marginTop: "2px" }}>
                    {selectedTime}
                  </p>
                </div>
                <div style={{ width: "1px", height: "40px", background: "hsl(var(--gold) / 0.2)" }} />
                <div className="text-center">
                  <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.40)" }}>
                    {language === "pt" ? "Duração" : "Duration"}
                  </span>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "hsl(var(--foreground))", marginTop: "2px" }}>
                    1h
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p
                className="mt-8"
                style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "14px", color: "rgba(30,22,14,0.55)", lineHeight: 1.8, maxWidth: "380px", margin: "32px auto 0" }}
              >
                {t("agendar.success")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedTime(null); setFormData({ nome: "", email: "", telefone: "", pessoas: "2", mensagem: "" }); }}
                  className="btn-ghost"
                >
                  {language === "pt" ? "Novo Agendamento" : "New Booking"}
                </button>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#25D366", textDecoration: "none" }}>
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="bg-background" style={{ minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      {/* ─── HERO ─── */}
      <div className="relative w-full overflow-hidden" style={{ height: "50vh", minHeight: 300 }}>
        <img
          src={herdadeImages.poolPergola}
          alt="Herdade em Grândola"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.22) saturate(0.60)", objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-12">
          <ScrollReveal>
            <span
              className="label-upper mb-5 inline-flex items-center gap-2"
              style={{ color: "hsl(var(--gold))" }}
            >
              <Sparkles size={12} />
              {language === "pt" ? "Experiência Privada" : "Private Experience"}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 7vw, 7rem)",
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(242,234,216,0.94)",
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              {language === "pt" ? <>Agendar <em>Visita</em></> : <>Schedule a <em>Visit</em></>}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="mt-4"
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: "12px",
                letterSpacing: "0.2em",
                color: "rgba(242,234,216,0.35)",
                textTransform: "uppercase",
                maxWidth: "480px",
              }}
            >
              {language === "pt"
                ? "Duração de 1 hora · Visita guiada privada · 09h–20h"
                : "1 hour duration · Private guided visit · 9am–8pm"}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="px-6 md:px-14 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">

          {/* Step progress */}
          <ScrollReveal>
            <div className="flex items-center gap-6 md:gap-10 mb-16" style={{ borderBottom: "1px solid hsl(var(--gold) / 0.10)", paddingBottom: "24px" }}>
              <StepIndicator step={1} current={currentStep} label={language === "pt" ? "Data" : "Date"} />
              <div style={{ flex: "0 0 40px", height: "1px", background: `linear-gradient(to right, ${currentStep >= 2 ? "hsl(var(--gold) / 0.4)" : "rgba(30,22,14,0.08)"}, transparent)` }} />
              <StepIndicator step={2} current={currentStep} label={language === "pt" ? "Hora" : "Time"} />
              <div style={{ flex: "0 0 40px", height: "1px", background: `linear-gradient(to right, ${currentStep >= 3 ? "hsl(var(--gold) / 0.4)" : "rgba(30,22,14,0.08)"}, transparent)` }} />
              <StepIndicator step={3} current={currentStep} label={language === "pt" ? "Dados" : "Details"} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

            {/* ─── LEFT: CALENDAR + TIME + FORM ─── */}
            <div className="lg:col-span-7 xl:col-span-8">

              {/* STEP 1: Calendar */}
              <ScrollReveal>
                <div
                  className="p-6 md:p-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(200,160,80,0.015) 0%, rgba(200,160,80,0.03) 100%)",
                    border: "1px solid hsl(var(--gold) / 0.12)",
                  }}
                >
                  {/* Month navigation */}
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={prevMonth}
                      disabled={isPrevDisabled}
                      className="w-10 h-10 flex items-center justify-center transition-all duration-300"
                      style={{
                        background: "transparent",
                        border: isPrevDisabled ? "1px solid rgba(30,22,14,0.06)" : "1px solid hsl(var(--gold) / 0.2)",
                        cursor: isPrevDisabled ? "default" : "pointer",
                        color: isPrevDisabled ? "rgba(30,22,14,0.15)" : "hsl(var(--gold))",
                      }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="text-center">
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "28px",
                          color: "hsl(var(--foreground))",
                          fontWeight: 400,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {monthNames[calMonth]}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "28px",
                          color: "rgba(30,22,14,0.30)",
                          marginLeft: "10px",
                          fontWeight: 300,
                        }}
                      >
                        {calYear}
                      </span>
                    </div>
                    <button
                      onClick={nextMonth}
                      className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-105"
                      style={{
                        background: "transparent",
                        border: "1px solid hsl(var(--gold) / 0.2)",
                        cursor: "pointer",
                        color: "hsl(var(--gold))",
                      }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 mb-3">
                    {weekdays.map((wd, i) => (
                      <div
                        key={`wd-${i}`}
                        className="text-center"
                        style={{
                          fontFamily: "'Tenor Sans', sans-serif",
                          fontSize: "10px",
                          letterSpacing: "0.2em",
                          color: i === 0 ? "rgba(30,22,14,0.20)" : "rgba(30,22,14,0.40)",
                          textTransform: "uppercase",
                          padding: "8px 0",
                        }}
                      >
                        {wd}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => {
                      if (day === null) return <div key={`empty-${i}`} />;
                      const dateStr = formatDate(calYear, calMonth, day);
                      const past = isDatePast(day);
                      const sunday = isSunday(day);
                      const isSelected = selectedDate === dateStr;
                      const isToday = dateStr === formatDate(now.getFullYear(), now.getMonth(), now.getDate());
                      const bookedCount = bookedSlots.filter(s => s.date === dateStr).length;
                      const almostFull = bookedCount >= 6;

                      return (
                        <button
                          key={day}
                          onClick={() => handleDateSelect(day)}
                          disabled={past}
                          className="relative transition-all duration-300 group"
                          style={{
                            aspectRatio: "1",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "17px",
                            fontWeight: isSelected ? 600 : 400,
                            background: isSelected
                              ? "hsl(var(--gold))"
                              : isToday
                                ? "hsl(var(--gold) / 0.04)"
                                : "transparent",
                            color: isSelected
                              ? "hsl(var(--background))"
                              : past
                                ? "rgba(30,22,14,0.15)"
                                : sunday
                                  ? "rgba(30,22,14,0.30)"
                                  : "hsl(var(--foreground))",
                            border: isSelected
                              ? "1px solid hsl(var(--gold))"
                              : isToday
                                ? "1px solid hsl(var(--gold) / 0.25)"
                                : "1px solid transparent",
                            cursor: past ? "default" : "pointer",
                          }}
                        >
                          {day}
                          {/* Availability dot */}
                          {!past && bookedCount > 0 && (
                            <span
                              style={{
                                position: "absolute",
                                bottom: "4px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: almostFull ? "6px" : "4px",
                                height: almostFull ? "6px" : "4px",
                                background: almostFull ? "rgba(180,80,60,0.5)" : "hsl(var(--gold) / 0.35)",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                          {/* Hover ring */}
                          {!past && !isSelected && (
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                              style={{ border: "1px solid hsl(var(--gold) / 0.25)" }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-6 mt-6 pt-5" style={{ borderTop: "1px solid hsl(var(--gold) / 0.08)" }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: "8px", height: "8px", background: "hsl(var(--gold))", borderRadius: "50%" }} />
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", color: "rgba(30,22,14,0.40)", letterSpacing: "0.1em" }}>
                        {language === "pt" ? "Selecionado" : "Selected"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div style={{ width: "4px", height: "4px", background: "hsl(var(--gold) / 0.4)", borderRadius: "50%" }} />
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", color: "rgba(30,22,14,0.40)", letterSpacing: "0.1em" }}>
                        {language === "pt" ? "Parcialmente reservado" : "Partially booked"}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* STEP 2: Time Slots */}
              {selectedDate && (
                <ScrollReveal delay={0.1}>
                  <div
                    className="mt-6 p-6 md:p-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(200,160,80,0.015) 0%, rgba(200,160,80,0.03) 100%)",
                      border: "1px solid hsl(var(--gold) / 0.12)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <Clock size={14} style={{ color: "hsl(var(--gold))" }} />
                        <span className="label-upper">
                          {language === "pt" ? "Horário" : "Time"}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "18px",
                          color: "hsl(var(--gold))",
                          fontStyle: "italic",
                        }}
                      >
                        {formatDateDisplay(selectedDate, language)}
                      </span>
                    </div>

                    {availableSlotsForDate.length === 0 ? (
                      <div
                        className="py-12 text-center"
                        style={{ background: "rgba(30,22,14,0.02)", border: "1px solid rgba(30,22,14,0.06)" }}
                      >
                        <Calendar size={24} style={{ color: "rgba(30,22,14,0.15)", margin: "0 auto 12px" }} />
                        <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(30,22,14,0.45)" }}>
                          {language === "pt"
                            ? "Sem horários disponíveis. Escolha outra data."
                            : "No available slots. Please choose another date."}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Morning */}
                        {morningSlots.length > 0 && (
                          <div>
                            <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(30,22,14,0.35)", display: "block", marginBottom: "10px" }}>
                              {language === "pt" ? "Manhã" : "Morning"}
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {morningSlots.map(time => (
                                <TimeButton key={time} time={time} isSelected={selectedTime === time} onClick={() => setSelectedTime(time)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Afternoon */}
                        {afternoonSlots.length > 0 && (
                          <div>
                            <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(30,22,14,0.35)", display: "block", marginBottom: "10px" }}>
                              {language === "pt" ? "Tarde" : "Afternoon"}
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {afternoonSlots.map(time => (
                                <TimeButton key={time} time={time} isSelected={selectedTime === time} onClick={() => setSelectedTime(time)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Evening */}
                        {eveningSlots.length > 0 && (
                          <div>
                            <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(30,22,14,0.35)", display: "block", marginBottom: "10px" }}>
                              {language === "pt" ? "Fim de Tarde" : "Evening"}
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {eveningSlots.map(time => (
                                <TimeButton key={time} time={time} isSelected={selectedTime === time} onClick={() => setSelectedTime(time)} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              )}

              {/* STEP 3: Details Form */}
              {selectedDate && selectedTime && (
                <ScrollReveal delay={0.15}>
                  <div
                    className="mt-6 p-6 md:p-10"
                    style={{
                      background: "linear-gradient(135deg, rgba(200,160,80,0.015) 0%, rgba(200,160,80,0.03) 100%)",
                      border: "1px solid hsl(var(--gold) / 0.12)",
                    }}
                  >
                    {/* Summary bar */}
                    <div
                      className="flex flex-wrap items-center gap-4 mb-10 px-5 py-4"
                      style={{ background: "hsl(var(--gold) / 0.04)", border: "1px solid hsl(var(--gold) / 0.12)" }}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar size={13} style={{ color: "hsl(var(--gold))" }} />
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "hsl(var(--foreground))" }}>
                          {formatDateDisplay(selectedDate, language)}
                        </span>
                      </div>
                      <div style={{ width: "1px", height: "20px", background: "hsl(var(--gold) / 0.2)" }} />
                      <div className="flex items-center gap-2">
                        <Clock size={13} style={{ color: "hsl(var(--gold))" }} />
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "hsl(var(--foreground))" }}>
                          {selectedTime} — {(() => { const [h, m] = selectedTime.split(":").map(Number); const end = h * 60 + m + VISIT_DURATION; return `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`; })()}
                        </span>
                      </div>
                      <button
                        onClick={() => { setSelectedTime(null); }}
                        style={{
                          marginLeft: "auto",
                          fontFamily: "'Tenor Sans', sans-serif",
                          fontSize: "9px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "hsl(var(--gold))",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                        }}
                      >
                        {language === "pt" ? "Alterar" : "Change"}
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        <FormField
                          label={`${t("agendar.nome")} *`}
                          type="text"
                          value={formData.nome}
                          onChange={(v) => updateField("nome", v)}
                          placeholder={language === "pt" ? "O seu nome completo" : "Your full name"}
                          focused={focused}
                          name="nome"
                          onFocus={setFocused}
                          required
                        />
                        <FormField
                          label={`${t("agendar.email")} *`}
                          type="email"
                          value={formData.email}
                          onChange={(v) => updateField("email", v)}
                          placeholder="email@exemplo.com"
                          focused={focused}
                          name="email"
                          onFocus={setFocused}
                          required
                        />
                        <FormField
                          label={t("agendar.telefone")}
                          type="tel"
                          value={formData.telefone}
                          onChange={(v) => updateField("telefone", v)}
                          placeholder="+351 9XX XXX XXX"
                          focused={focused}
                          name="telefone"
                          onFocus={setFocused}
                        />

                        {/* Number of people — custom pill selector instead of ugly dropdown */}
                        <div style={{ marginBottom: "32px" }}>
                          <label
                            style={{
                              display: "block",
                              fontSize: "10px",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "rgba(30,22,14,0.45)",
                              marginBottom: "14px",
                              fontFamily: "'Tenor Sans', sans-serif",
                            }}
                          >
                            {t("agendar.pessoas")}
                          </label>
                          <div className="flex gap-2">
                            {["1", "2", "3", "4", "5+"].map(val => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => updateField("pessoas", val)}
                                className="transition-all duration-300"
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  fontFamily: "'Cormorant Garamond', serif",
                                  fontSize: "17px",
                                  fontWeight: formData.pessoas === val ? 600 : 400,
                                  background: formData.pessoas === val ? "hsl(var(--gold))" : "transparent",
                                  color: formData.pessoas === val ? "hsl(var(--background))" : "rgba(30,22,14,0.50)",
                                  border: formData.pessoas === val ? "1px solid hsl(var(--gold))" : "1px solid rgba(30,22,14,0.12)",
                                  cursor: "pointer",
                                }}
                              >
                                {val}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div style={{ marginBottom: "32px" }}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "rgba(30,22,14,0.45)",
                            marginBottom: "14px",
                            fontFamily: "'Tenor Sans', sans-serif",
                          }}
                        >
                          {t("agendar.mensagem")}
                        </label>
                        <textarea
                          rows={3}
                          value={formData.mensagem}
                          onChange={e => updateField("mensagem", e.target.value)}
                          style={{
                            background: "transparent",
                            border: "none",
                            borderBottom: focused === "mensagem" ? "1px solid hsl(var(--gold))" : "1px solid rgba(30,22,14,0.12)",
                            color: "hsl(var(--foreground))",
                            fontSize: "15px",
                            width: "100%",
                            padding: "12px 0",
                            outline: "none",
                            fontFamily: "'Tenor Sans', sans-serif",
                            transition: "border-color 0.3s",
                            resize: "vertical",
                          }}
                          onFocus={() => setFocused("mensagem")}
                          onBlur={() => setFocused(null)}
                          placeholder={language === "pt" ? "Alguma questão ou interesse específico..." : "Any questions or specific interest..."}
                        />
                      </div>

                      {/* Commercial interest */}
                      <div style={{ marginBottom: "32px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
                        <div
                          onClick={() => setComercial(!comercial)}
                          className="shrink-0 transition-all duration-300 cursor-pointer flex items-center justify-center"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginTop: "1px",
                            border: comercial ? "1px solid hsl(var(--gold))" : "1px solid rgba(30,22,14,0.18)",
                            background: comercial ? "hsl(var(--gold))" : "transparent",
                          }}
                        >
                          {comercial && <CheckCircle size={12} style={{ color: "hsl(var(--background))" }} />}
                        </div>
                        <label
                          onClick={() => setComercial(!comercial)}
                          style={{
                            fontSize: "12px",
                            color: "rgba(30,22,14,0.50)",
                            fontFamily: "'Tenor Sans', sans-serif",
                            letterSpacing: "0.05em",
                            cursor: "pointer",
                            lineHeight: 1.7,
                          }}
                        >
                          {t("agendar.comercial")}
                        </label>
                      </div>

                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button type="submit" className="btn-calendly flex-1 text-center flex items-center justify-center gap-3">
                          <span>
                            {language === "pt" ? "Confirmar Visita" : "Confirm Visit"}
                          </span>
                          <ArrowRight size={16} />
                        </button>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 flex-shrink-0 transition-all duration-300"
                          style={{
                            border: "1px solid rgba(37,211,102,0.30)",
                            color: "#25D366",
                            padding: "14px 28px",
                            letterSpacing: "0.15em",
                            fontSize: "10px",
                            background: "rgba(37,211,102,0.03)",
                            textDecoration: "none",
                            textTransform: "uppercase",
                            fontFamily: "'Tenor Sans', sans-serif",
                          }}
                        >
                          <MessageCircle size={14} />
                          WhatsApp
                        </a>
                      </div>
                    </form>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* ─── RIGHT SIDEBAR ─── */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky" style={{ top: "100px" }}>
                {/* Quote */}
                <ScrollReveal>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "24px",
                      fontStyle: "italic",
                      color: "hsl(var(--gold))",
                      lineHeight: 1.5,
                      fontWeight: 400,
                    }}
                  >
                    {t("agendar.subtitle")}
                  </p>
                  <p
                    className="mt-5"
                    style={{
                      fontFamily: "'Tenor Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(30,22,14,0.55)",
                      lineHeight: 1.8,
                    }}
                  >
                    {t("agendar.desc")}
                  </p>
                </ScrollReveal>

                {/* Visit Info Card */}
                <ScrollReveal delay={0.1}>
                  <div
                    className="mt-10 p-6"
                    style={{
                      background: "hsl(var(--gold) / 0.03)",
                      border: "1px solid hsl(var(--gold) / 0.10)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <Clock size={13} style={{ color: "hsl(var(--gold))" }} />
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.45)" }}>
                        {language === "pt" ? "Detalhes da Visita" : "Visit Details"}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center" style={{ paddingBottom: "12px", borderBottom: "1px solid hsl(var(--gold) / 0.06)" }}>
                        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.50)" }}>
                          {language === "pt" ? "Duração" : "Duration"}
                        </span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "hsl(var(--foreground))" }}>
                          1 {language === "pt" ? "hora" : "hour"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center" style={{ paddingBottom: "12px", borderBottom: "1px solid hsl(var(--gold) / 0.06)" }}>
                        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.50)" }}>
                          {language === "pt" ? "Horário" : "Hours"}
                        </span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "hsl(var(--foreground))" }}>
                          09h — 20h
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.50)" }}>
                          {language === "pt" ? "Tipo" : "Type"}
                        </span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "hsl(var(--foreground))" }}>
                          {language === "pt" ? "Privada" : "Private"}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Benefits */}
                <ScrollReveal delay={0.2}>
                  <div className="mt-8">
                    <span
                      style={{
                        fontFamily: "'Tenor Sans', sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(30,22,14,0.40)",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    >
                      {language === "pt" ? "A sua visita inclui" : "Your visit includes"}
                    </span>
                    <div className="space-y-4">
                      {benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span style={{ color: "hsl(var(--gold))", fontSize: "8px", marginTop: "5px", flexShrink: 0 }}>{b.icon}</span>
                          <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.60)", lineHeight: 1.7 }}>
                            {language === "pt" ? b.pt : b.en}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Contact */}
                <ScrollReveal delay={0.3}>
                  <div className="mt-10 pt-8" style={{ borderTop: "1px solid hsl(var(--gold) / 0.10)" }}>
                    <span
                      style={{
                        fontFamily: "'Tenor Sans', sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(30,22,14,0.40)",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    >
                      {language === "pt" ? "Contacto Direto" : "Direct Contact"}
                    </span>
                    <div className="space-y-4">
                      <a href="tel:+351919024221" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
                        <div
                          className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{ background: "hsl(var(--gold) / 0.04)", border: "1px solid hsl(var(--gold) / 0.15)" }}
                        >
                          <Phone size={13} style={{ color: "hsl(var(--gold))" }} />
                        </div>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "hsl(var(--foreground))" }}>
                          +351 919 024 221
                        </span>
                      </a>
                      <a href="mailto:herdasantamargarida@gmail.com" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
                        <div
                          className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{ background: "hsl(var(--gold) / 0.04)", border: "1px solid hsl(var(--gold) / 0.15)" }}
                        >
                          <Mail size={13} style={{ color: "hsl(var(--gold))" }} />
                        </div>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "hsl(var(--foreground))" }}>
                          herdasantamargarida@gmail.com
                        </span>
                      </a>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
                        <div
                          className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{ background: "rgba(37,211,102,0.04)", border: "1px solid rgba(37,211,102,0.20)" }}
                        >
                          <MessageCircle size={13} style={{ color: "#25D366" }} />
                        </div>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "hsl(var(--foreground))" }}>
                          WhatsApp
                        </span>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

/* ─── TIME BUTTON COMPONENT ─── */

const TimeButton = ({ time, isSelected, onClick }: { time: string; isSelected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="transition-all duration-300 group relative"
    style={{
      padding: "12px 20px",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "16px",
      fontWeight: isSelected ? 600 : 400,
      background: isSelected ? "hsl(var(--gold))" : "transparent",
      color: isSelected ? "hsl(var(--background))" : "hsl(var(--foreground))",
      border: isSelected ? "1px solid hsl(var(--gold))" : "1px solid hsl(var(--gold) / 0.12)",
      cursor: "pointer",
      minWidth: "80px",
    }}
  >
    {time}
    {!isSelected && (
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: "1px solid hsl(var(--gold) / 0.35)" }}
      />
    )}
  </button>
);

/* ─── FORM FIELD COMPONENT ─── */

const FormField = ({
  label, type, value, onChange, placeholder, focused, name, onFocus, required,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  placeholder: string; focused: string | null; name: string;
  onFocus: (n: string | null) => void; required?: boolean;
}) => (
  <div style={{ marginBottom: "32px" }}>
    <label
      style={{
        display: "block",
        fontSize: "10px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(30,22,14,0.45)",
        marginBottom: "14px",
        fontFamily: "'Tenor Sans', sans-serif",
      }}
    >
      {label}
    </label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        background: "transparent",
        border: "none",
        borderBottom: focused === name ? "1px solid hsl(var(--gold))" : "1px solid rgba(30,22,14,0.12)",
        color: "hsl(var(--foreground))",
        fontSize: "15px",
        width: "100%",
        padding: "12px 0",
        outline: "none",
        fontFamily: "'Tenor Sans', sans-serif",
        transition: "border-color 0.3s",
      }}
      onFocus={() => onFocus(name)}
      onBlur={() => onFocus(null)}
      placeholder={placeholder}
    />
  </div>
);

export default Agendar;
