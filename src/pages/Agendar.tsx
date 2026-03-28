import { useState, useMemo, FormEvent } from "react";
import SiteNav from "@/components/SiteNav";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { images as herdadeImages } from "@/config/siteConfig";
import {
  Phone, Mail, MessageCircle, CheckCircle,
  Calendar, Users, Clock, ChevronLeft, ChevronRight,
} from "lucide-react";

/* ───────────────────────────────────────────────
   SLOT BOOKING SYSTEM
   - visits run 9:00 → 20:00
   - each visit = 1 hour
   - 15 min buffer between visits
   - booked slots stored in localStorage as simple DB
   ─────────────────────────────────────────────── */

// Visit duration in minutes
const VISIT_DURATION = 60;
const BUFFER_MINUTES = 15;
const DAY_START_HOUR = 9;
const DAY_END_HOUR = 20;

interface BookedSlot {
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
  name: string;
  email: string;
}

const STORAGE_KEY = "herdade_booked_slots";

const loadBookedSlots = (): BookedSlot[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

const saveBookedSlot = (slot: BookedSlot) => {
  const slots = loadBookedSlots();
  slots.push(slot);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
};

const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let h = DAY_START_HOUR; h < DAY_END_HOUR; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h + 1 < DAY_END_HOUR || (h + 1 === DAY_END_HOUR)) {
      // Don't add :30 if the visit would end after 20:00
      if (h * 60 + 30 + VISIT_DURATION <= DAY_END_HOUR * 60) {
        slots.push(`${String(h).padStart(2, "0")}:30`);
      }
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

    // Check overlap including buffer
    if (slotStart < bEnd + BUFFER_MINUTES && slotEnd + BUFFER_MINUTES > bStart) {
      return false;
    }
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
  const slotDate = new Date(y, m - 1, d, hh, mm);
  return slotDate <= now;
};

/* ───────────────────────────────────────────────
   CALENDAR HELPERS
   ─────────────────────────────────────────────── */

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const formatDate = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const MONTH_NAMES_PT = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const MONTH_NAMES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAY_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const WEEKDAY_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ───────────────────────────────────────────────
   BENEFITS
   ─────────────────────────────────────────────── */

const benefits = [
  { pt: "Visita guiada privada e exclusiva", en: "Private and exclusive guided tour" },
  { pt: "Acesso completo à propriedade e ao projeto aprovado", en: "Full access to the property and approved project" },
  { pt: "Apresentação dos estudos de rentabilidade", en: "Profitability study presentation" },
  { pt: "Reunião com o arquiteto responsável pelo projeto", en: "Meeting with the project architect" },
];

/* ───────────────────────────────────────────────
   COMPONENT
   ─────────────────────────────────────────────── */

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
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", pessoas: "", mensagem: "" });

  const bookedSlots = useMemo(() => loadBookedSlots(), [submitted]);
  const allTimeSlots = useMemo(() => generateTimeSlots(), []);

  const availableSlotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    return allTimeSlots.filter(
      (t) => isSlotAvailable(selectedDate, t, bookedSlots) && !isPastSlot(selectedDate, t)
    );
  }, [selectedDate, bookedSlots, allTimeSlots]);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const isDatePast = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const handleDateSelect = (day: number) => {
    if (isDatePast(day)) return;
    const date = formatDate(calYear, calMonth, day);
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const inputBaseStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(30,22,14,0.18)",
    color: "hsl(var(--foreground))",
    fontSize: "15px",
    width: "100%",
    padding: "12px 0",
    outline: "none",
    fontFamily: "'Tenor Sans', sans-serif",
    transition: "border-color 0.3s",
  };

  const getFocusStyle = (name: string): React.CSSProperties => ({
    ...inputBaseStyle,
    borderBottom: focused === name ? "1px solid hsl(var(--gold))" : "1px solid rgba(30,22,14,0.18)",
  });

  const updateField = (name: string, value: string) =>
    setFormData(prev => ({ ...prev, [name]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.nome || !formData.email) return;

    saveBookedSlot({
      date: selectedDate,
      time: selectedTime,
      name: formData.nome,
      email: formData.email,
    });
    setSubmitted(true);
  };

  const whatsappMessage = language === "pt"
    ? `Olá! Gostaria de agendar uma visita à Herdade em Grândola${selectedDate ? ` no dia ${selectedDate}` : ""}${selectedTime ? ` às ${selectedTime}` : ""}.`
    : `Hello! I would like to schedule a visit to Herdade em Grândola${selectedDate ? ` on ${selectedDate}` : ""}${selectedTime ? ` at ${selectedTime}` : ""}.`;
  const whatsappUrl = `https://wa.me/351269000000?text=${encodeURIComponent(whatsappMessage)}`;

  // Calendar grid
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  return (
    <div className="bg-background" style={{ minHeight: "100vh" }}>
      <CustomCursor />
      <FilmGrain />
      <SiteNav />

      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ height: "42vh", minHeight: 260 }}>
        <img
          src={herdadeImages.poolPergola}
          alt="Herdade do Monte Claro"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.28) saturate(0.70)", objectPosition: "center 40%" }}
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
          <p className="mt-3" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(242,234,216,0.40)", textTransform: "uppercase" }}>
            {language === "pt" ? "Horários disponíveis das 9h às 20h · Agendamento exclusivo" : "Available hours 9am to 8pm · Exclusive booking"}
          </p>
        </div>
      </div>

      <div className="px-8 md:px-14 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-[1400px] mx-auto">
          {/* Left col — info */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <p className="font-display italic" style={{ color: "hsl(var(--gold))", fontSize: "22px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.5 }}>
                {t("agendar.subtitle")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="body-text mt-6">{t("agendar.desc")}</p>
            </ScrollReveal>

            {/* Schedule info */}
            <ScrollReveal delay={0.15}>
              <div className="mt-8 p-5" style={{ background: "hsl(var(--gold) / 0.04)", border: "1px solid hsl(var(--gold) / 0.12)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} style={{ color: "hsl(var(--gold))" }} />
                  <span className="label-upper" style={{ fontSize: "8px" }}>
                    {language === "pt" ? "Horário de Visitas" : "Visit Hours"}
                  </span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "hsl(var(--foreground))" }}>
                  09:00 — 20:00
                </p>
                <p className="mt-2" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", color: "rgba(30,22,14,0.45)" }}>
                  {language === "pt"
                    ? "Cada visita tem duração de 1 hora com intervalo de 15 minutos entre visitas."
                    : "Each visit lasts 1 hour with a 15-minute break between visits."}
                </p>
              </div>
            </ScrollReveal>

            {/* Benefits */}
            <ScrollReveal delay={0.2}>
              <div className="mt-8" style={{ borderTop: "1px solid hsl(var(--gold) / 0.18)", paddingTop: "20px" }}>
                <span className="label-upper block mb-6">
                  {language === "pt" ? "A sua visita inclui" : "Your visit includes"}
                </span>
                <ul className="space-y-4">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={14} style={{ color: "hsl(var(--gold))", marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(30,22,14,0.65)", lineHeight: 1.7 }}>
                        {language === "pt" ? b.pt : b.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Contact */}
            <ScrollReveal delay={0.3}>
              <div className="mt-8 pt-6 space-y-4" style={{ borderTop: "1px solid hsl(var(--gold) / 0.18)" }}>
                <span className="label-upper block mb-4">{language === "pt" ? "Contacto Direto" : "Direct Contact"}</span>
                <a href="tel:+351269000000" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.18)" }}>
                    <Phone size={14} style={{ color: "hsl(var(--gold))" }} />
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "hsl(var(--foreground))" }}>+351 269 000 000</span>
                </a>
                <a href="mailto:info@monteclaro.pt" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.18)" }}>
                    <Mail size={14} style={{ color: "hsl(var(--gold))" }} />
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "hsl(var(--foreground))" }}>info@monteclaro.pt</span>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.25)" }}>
                    <MessageCircle size={14} style={{ color: "#25D366" }} />
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "hsl(var(--foreground))" }}>WhatsApp</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right col — calendar + form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.15}>
              {submitted ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center text-center py-20" style={{ border: "1px solid hsl(var(--gold) / 0.22)", background: "hsl(var(--gold) / 0.02)" }}>
                  <div className="w-16 h-16 mb-8 flex items-center justify-center" style={{ border: "1px solid hsl(var(--gold))", background: "hsl(var(--gold) / 0.06)" }}>
                    <CheckCircle size={28} style={{ color: "hsl(var(--gold))" }} />
                  </div>
                  <h2 className="heading-display" style={{ fontSize: "36px", color: "hsl(var(--foreground))", fontFamily: "'Cormorant Garamond', serif" }}>
                    {language === "pt" ? "Visita Confirmada" : "Visit Confirmed"}
                  </h2>
                  <p className="mt-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "hsl(var(--gold))" }}>
                    {selectedDate} · {selectedTime}
                  </p>
                  <p className="body-text mt-4 max-w-[380px]">{t("agendar.success")}</p>
                  <p className="label-upper mt-8" style={{ color: "hsl(var(--gold))" }}>
                    {language === "pt" ? "Confirmação por email em 24h" : "Email confirmation within 24h"}
                  </p>
                  <button onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedTime(null); setFormData({ nome: "", email: "", telefone: "", pessoas: "", mensagem: "" }); }} className="btn-ghost mt-8">
                    {language === "pt" ? "Novo Agendamento" : "New Booking"}
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* ── Step 1: Calendar ── */}
                  <div className="p-6 md:p-8" style={{ border: "1px solid hsl(var(--gold) / 0.14)", background: "rgba(200,160,80,0.015)" }}>
                    <div className="flex items-center gap-2 mb-6">
                      <Calendar size={14} style={{ color: "hsl(var(--gold))" }} />
                      <span className="label-upper">
                        {language === "pt" ? "1. Escolha a Data" : "1. Choose a Date"}
                      </span>
                    </div>

                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-6">
                      <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(var(--gold))", padding: "4px" }}>
                        <ChevronLeft size={20} />
                      </button>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "hsl(var(--foreground))" }}>
                        {monthNames[calMonth]} {calYear}
                      </span>
                      <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(var(--gold))", padding: "4px" }}>
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {weekdays.map(wd => (
                        <div key={wd} className="text-center" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(30,22,14,0.35)", textTransform: "uppercase", padding: "4px 0" }}>
                          {wd}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, i) => {
                        if (day === null) return <div key={`empty-${i}`} />;
                        const dateStr = formatDate(calYear, calMonth, day);
                        const past = isDatePast(day);
                        const isSelected = selectedDate === dateStr;
                        const isToday = dateStr === formatDate(now.getFullYear(), now.getMonth(), now.getDate());
                        const bookedCount = bookedSlots.filter(s => s.date === dateStr).length;

                        return (
                          <button
                            key={day}
                            onClick={() => handleDateSelect(day)}
                            disabled={past}
                            className="transition-all duration-200"
                            style={{
                              padding: "10px 4px",
                              fontFamily: "'Tenor Sans', sans-serif",
                              fontSize: "14px",
                              background: isSelected ? "hsl(var(--gold))" : "transparent",
                              color: isSelected ? "hsl(var(--background))" : past ? "rgba(30,22,14,0.18)" : "hsl(var(--foreground))",
                              border: isToday && !isSelected ? "1px solid hsl(var(--gold) / 0.3)" : "1px solid transparent",
                              cursor: past ? "default" : "pointer",
                              position: "relative",
                            }}
                          >
                            {day}
                            {/* Availability indicator */}
                            {!past && bookedCount > 0 && (
                              <span
                                style={{
                                  position: "absolute",
                                  bottom: "3px",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  width: "4px",
                                  height: "4px",
                                  background: bookedCount >= 8 ? "rgba(220,50,50,0.6)" : "hsl(var(--gold) / 0.4)",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Step 2: Time slots ── */}
                  {selectedDate && (
                    <div className="p-6 md:p-8" style={{ border: "1px solid hsl(var(--gold) / 0.14)", background: "rgba(200,160,80,0.015)" }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock size={14} style={{ color: "hsl(var(--gold))" }} />
                        <span className="label-upper">
                          {language === "pt" ? "2. Escolha o Horário" : "2. Choose a Time"}
                        </span>
                      </div>
                      <p className="mb-5" style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "12px", color: "rgba(30,22,14,0.45)" }}>
                        {language === "pt"
                          ? `${availableSlotsForDate.length} horários disponíveis para ${selectedDate}`
                          : `${availableSlotsForDate.length} time slots available for ${selectedDate}`}
                      </p>

                      {availableSlotsForDate.length === 0 ? (
                        <div className="py-8 text-center" style={{ background: "rgba(220,50,50,0.03)", border: "1px solid rgba(220,50,50,0.1)" }}>
                          <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "13px", color: "rgba(30,22,14,0.55)" }}>
                            {language === "pt"
                              ? "Sem horários disponíveis nesta data. Por favor escolha outra data."
                              : "No available time slots for this date. Please choose another date."}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {allTimeSlots.map(time => {
                            const available = isSlotAvailable(selectedDate, time, bookedSlots) && !isPastSlot(selectedDate, time);
                            const isSelected = selectedTime === time;

                            return (
                              <button
                                key={time}
                                onClick={() => available && setSelectedTime(time)}
                                disabled={!available}
                                className="transition-all duration-200"
                                style={{
                                  padding: "12px 8px",
                                  fontFamily: "'Tenor Sans', sans-serif",
                                  fontSize: "14px",
                                  background: isSelected
                                    ? "hsl(var(--gold))"
                                    : available
                                      ? "transparent"
                                      : "rgba(30,22,14,0.03)",
                                  color: isSelected
                                    ? "hsl(var(--background))"
                                    : available
                                      ? "hsl(var(--foreground))"
                                      : "rgba(30,22,14,0.18)",
                                  border: isSelected
                                    ? "1px solid hsl(var(--gold))"
                                    : available
                                      ? "1px solid hsl(var(--gold) / 0.15)"
                                      : "1px solid rgba(30,22,14,0.06)",
                                  cursor: available ? "pointer" : "not-allowed",
                                  textDecoration: !available ? "line-through" : "none",
                                }}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Step 3: Details form ── */}
                  {selectedDate && selectedTime && (
                    <div className="p-6 md:p-8" style={{ border: "1px solid hsl(var(--gold) / 0.14)", background: "rgba(200,160,80,0.015)" }}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Users size={14} style={{ color: "hsl(var(--gold))" }} />
                          <span className="label-upper">
                            {language === "pt" ? "3. Os Seus Dados" : "3. Your Details"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2" style={{ padding: "4px 12px", background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.15)" }}>
                          <Calendar size={12} style={{ color: "hsl(var(--gold))" }} />
                          <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "11px", color: "hsl(var(--gold))" }}>
                            {selectedDate} · {selectedTime}
                          </span>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                          <div style={{ marginBottom: "28px" }}>
                            <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.50)", marginBottom: "8px", fontFamily: "'Tenor Sans', sans-serif" }}>{t("agendar.nome")} *</label>
                            <input type="text" required value={formData.nome} onChange={e => updateField("nome", e.target.value)} style={getFocusStyle("nome")} onFocus={() => setFocused("nome")} onBlur={() => setFocused(null)} placeholder={language === "pt" ? "O seu nome" : "Your name"} />
                          </div>
                          <div style={{ marginBottom: "28px" }}>
                            <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.50)", marginBottom: "8px", fontFamily: "'Tenor Sans', sans-serif" }}>{t("agendar.email")} *</label>
                            <input type="email" required value={formData.email} onChange={e => updateField("email", e.target.value)} style={getFocusStyle("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="email@exemplo.com" />
                          </div>
                          <div style={{ marginBottom: "28px" }}>
                            <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.50)", marginBottom: "8px", fontFamily: "'Tenor Sans', sans-serif" }}>{t("agendar.telefone")}</label>
                            <input type="tel" value={formData.telefone} onChange={e => updateField("telefone", e.target.value)} style={getFocusStyle("telefone")} onFocus={() => setFocused("telefone")} onBlur={() => setFocused(null)} placeholder="+351" />
                          </div>
                          <div style={{ marginBottom: "28px" }}>
                            <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.50)", marginBottom: "8px", fontFamily: "'Tenor Sans', sans-serif" }}>
                              <span className="flex items-center gap-2">
                                <Users size={10} style={{ color: "hsl(var(--gold) / 0.5)" }} />
                                {t("agendar.pessoas")}
                              </span>
                            </label>
                            <select value={formData.pessoas} onChange={e => updateField("pessoas", e.target.value)} style={{ ...getFocusStyle("pessoas"), cursor: "pointer", appearance: "none" as const }} onFocus={() => setFocused("pessoas")} onBlur={() => setFocused(null)}>
                              <option value="" style={{ background: "hsl(var(--background))" }}>—</option>
                              <option value="1" style={{ background: "hsl(var(--background))" }}>1</option>
                              <option value="2" style={{ background: "hsl(var(--background))" }}>2</option>
                              <option value="3" style={{ background: "hsl(var(--background))" }}>3</option>
                              <option value="4+" style={{ background: "hsl(var(--background))" }}>4+</option>
                            </select>
                          </div>
                        </div>
                        <div style={{ marginBottom: "28px" }}>
                          <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,22,14,0.50)", marginBottom: "8px", fontFamily: "'Tenor Sans', sans-serif" }}>{t("agendar.mensagem")}</label>
                          <textarea rows={3} value={formData.mensagem} onChange={e => updateField("mensagem", e.target.value)} style={{ ...getFocusStyle("mensagem"), resize: "vertical", paddingTop: "10px" }} onFocus={() => setFocused("mensagem")} onBlur={() => setFocused(null)} placeholder={language === "pt" ? "Partilhe qualquer detalhe relevante..." : "Share any relevant details..."} />
                        </div>
                        <div style={{ marginBottom: "28px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                          <input type="checkbox" id="comercial" checked={comercial} onChange={e => setComercial(e.target.checked)} style={{ marginTop: "2px", accentColor: "hsl(var(--gold))", width: "16px", height: "16px", cursor: "pointer", flexShrink: 0 }} />
                          <label htmlFor="comercial" style={{ fontSize: "12px", color: "rgba(30,22,14,0.55)", fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em", cursor: "pointer", lineHeight: 1.6 }}>
                            {t("agendar.comercial")}
                          </label>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button type="submit" className="btn-calendly flex-1 text-center">
                            {language === "pt" ? `Confirmar · ${selectedDate} às ${selectedTime}` : `Confirm · ${selectedDate} at ${selectedTime}`}
                          </button>
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 flex-1 text-center transition-all duration-300" style={{ border: "1px solid rgba(37,211,102,0.4)", color: "#25D366", padding: "12px 28px", letterSpacing: "0.15em", fontSize: "11px", background: "rgba(37,211,102,0.04)", textDecoration: "none", textTransform: "uppercase", fontFamily: "'Tenor Sans', sans-serif" }}>
                            <MessageCircle size={14} />
                            WhatsApp
                          </a>
                        </div>
                      </form>
                    </div>
                  )}
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
