import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MessageCircle, X, Send, Sparkles, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Comprehensive property knowledge base for the AI
const PROPERTY_CONTEXT = `
You are the exclusive AI concierge for "Herdade em Grândola" — a premium 12-hectare estate for sale in Grândola, Alentejo, Portugal.

PROPERTY DETAILS:
- Total area: 12 hectares (120,000 m²)
- Approved construction: 500 m² (Architectural Project approved + Construction License issued)
- Buildings: 2 T3 houses (or 1 T6), 6 lofts, garage, large pool/leisure area
- Water: 3 sources (1 borehole, 2 traditional wells, 1 natural stream) — complete water self-sufficiency
- Access: Dual entry via 2 independent paved roads at opposite ends
- Land: Cork oak montado, topographic survey completed, electricity available
- Zoning: Tourism-eligible under PDM (Municipal Master Plan)
- GPS: 38°10'N 8°34'W, Santa Margarida da Serra, Grândola

DISTANCES:
- Melides beach: 25 min
- Comporta beach: 30 min
- Grândola town: 7 min
- Lisbon: 1h 15min
- Lisbon Airport: 1h 25min
- Évora (UNESCO): 1h 10min
- Seville, Spain: 2h 30min

CONTACT:
- Phone/WhatsApp: +351 919 024 221
- Email: herdasantamargarida@gmail.com
- Visits: Daily 9am–8pm, by appointment only

GUIDELINES:
- Be warm, professional, and concise (2-4 sentences max per response)
- Never reveal the exact price — say it's available upon private consultation
- Encourage scheduling a private visit for serious inquiries
- Highlight the unique selling points: ready-to-build license, water self-sufficiency, Comporta proximity, dual access
- If asked about things you don't know, politely redirect to contacting the team directly
`;

// Smart local response engine with AI-like quality
const generateLocalResponse = (input: string, lang: "pt" | "en"): string => {
  const lower = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  type ResponseMap = Record<string, { pt: string; en: string }>;

  const responses: ResponseMap = {
    price: {
      pt: "O valor da Herdade em Grândola é partilhado exclusivamente em reunião privada. Com 12 hectares e licença de construção emitida para 500 m², é um ativo singular no Triângulo de Ouro do Alentejo. Posso ajudá-lo(a) a agendar uma visita?",
      en: "The price of Herdade em Grândola is shared exclusively during a private meeting. With 12 hectares and an issued construction license for 500 m², it's a unique asset in the Alentejo Golden Triangle. May I help you schedule a visit?",
    },
    area: {
      pt: "A propriedade estende-se por 12 hectares (120.000 m²) de montado alentejano, com 500 m² de área de construção aprovada. O projeto inclui 2 moradias T3 (ou 1 T6), 6 lofts, garagem e uma generosa zona de piscina/lazer.",
      en: "The estate spans 12 hectares (120,000 m²) of Alentejo montado, with 500 m² of approved construction. The project includes 2 T3 houses (or 1 T6), 6 lofts, a garage and a generous pool/leisure area.",
    },
    location: {
      pt: "Estamos em Santa Margarida da Serra, Grândola — no coração do Triângulo de Ouro alentejano. A 25 minutos da praia de Melides, 30 minutos da Comporta, 7 minutos de Grândola e apenas 1h15 de Lisboa. A localização perfeita entre serra e mar.",
      en: "We're in Santa Margarida da Serra, Grândola — in the heart of the Alentejo Golden Triangle. 25 minutes from Melides beach, 30 minutes from Comporta, 7 minutes from Grândola and just 1h15 from Lisbon. The perfect location between hills and sea.",
    },
    water: {
      pt: "Uma das grandes raridades desta propriedade: dispõe de 3 fontes de água independentes — 1 furo, 2 poços tradicionais e 1 curso de água natural. Autossuficiência hídrica total numa região onde a água é o recurso mais precioso.",
      en: "One of this property's great rarities: it has 3 independent water sources — 1 borehole, 2 traditional wells and 1 natural stream. Complete water self-sufficiency in a region where water is the most precious resource.",
    },
    build: {
      pt: "Sim, a Herdade tem Projeto de Arquitetura aprovado e Licença de Construção emitida. As obras podem começar imediatamente — sem anos de espera por licenciamentos. Este é o nosso maior diferencial.",
      en: "Yes, the estate has an approved Architectural Project and issued Construction License. Works can begin immediately — no years of waiting for permits. This is our greatest differentiator.",
    },
    tourism: {
      pt: "Absolutamente. A propriedade está inserida em zona apta para Projetos de Turismo segundo o PDM de Grândola. Com 2 moradias T3 e 6 lofts aprovados e proximidade à Comporta, o potencial turístico é extraordinário.",
      en: "Absolutely. The property is zoned for Tourism Projects under Grândola's PDM. With 8 approved housing units and proximity to Comporta, the tourism potential is extraordinary.",
    },
    access: {
      pt: "Privacidade total garantida: a Herdade tem duas entradas independentes por estradas alcatroadas em extremos opostos do terreno. Acessibilidade premium sem comprometer a exclusividade.",
      en: "Total privacy guaranteed: the estate has two independent entrances via paved roads at opposite ends. Premium accessibility without compromising exclusivity.",
    },
    visit: {
      pt: "Cada visita é uma experiência privada e exclusiva, das 9h às 20h. A nossa equipa acompanha-o(a) por toda a propriedade e apresenta o projeto aprovado em detalhe. Pode agendar em /agendar ou pelo +351 919 024 221.",
      en: "Each visit is a private and exclusive experience, from 9am to 8pm. Our team accompanies you throughout the property and presents the approved project in detail. Book at /agendar or call +351 919 024 221.",
    },
    comporta: {
      pt: "Melides está a apenas 25 minutos — uma das zonas de praia mais exclusivas da Europa. A Comporta fica a 30 minutos, com restaurantes de referência e hotelaria de luxo.",
      en: "Melides is just 25 minutes away — one of Europe's most exclusive beach areas. Comporta is 30 minutes away, with renowned restaurants and luxury hospitality.",
    },
    project: {
      pt: "O projeto aprovado contempla: 2 moradias T3 (ou 1 T6), 6 lofts, garagem e uma ampla zona de lazer com piscina. Versatilidade total para residência, co-living ou exploração turística.",
      en: "The approved project includes: 2 T3 houses (or 1 T6), 6 lofts, garage and a spacious leisure area with pool. Total versatility for residence, co-living or tourism.",
    },
    investment: {
      pt: "Com licença de construção emitida, zona PDM turística, proximidade à Comporta e 3 fontes de água, esta é uma oportunidade rara de investimento. O mercado alentejano premium continua em forte crescimento.",
      en: "With issued construction license, PDM tourism zoning, Comporta proximity and 3 water sources, this is a rare investment opportunity. The premium Alentejo market continues to grow strongly.",
    },
    cork: {
      pt: "O terreno é povoado por sobreiros centenários distribuídos estrategicamente — a essência do montado alentejano. Foram preservados no projeto de construção, criando uma simbiose perfeita entre natureza e arquitetura.",
      en: "The land is populated by centuries-old cork oaks strategically distributed — the essence of the Alentejo montado. They've been preserved in the construction project, creating a perfect symbiosis between nature and architecture.",
    },
    hello: {
      pt: "Bem-vindo(a)! Sou o concierge digital da Herdade em Grândola. Estou aqui para responder às suas questões sobre esta propriedade exclusiva de 12 hectares no Alentejo. Em que posso ajudá-lo(a)?",
      en: "Welcome! I'm the digital concierge for Herdade em Grândola. I'm here to answer your questions about this exclusive 12-hectare estate in Alentejo. How can I help you?",
    },
  };

  // Pattern matching
  const patterns: Array<{ terms: string[]; key: string }> = [
    { terms: ["ola", "bom dia", "boa tarde", "boa noite", "hello", "hi ", "hey", "good morning", "good afternoon"], key: "hello" },
    { terms: ["preco", "quanto", "custo", "valor", "price", "cost", "how much", "expensive", "cheap", "budget"], key: "price" },
    { terms: ["hectare", "metros", "tamanho", "area", "size", "big", "large", "sqm", "m2", "dimensao"], key: "area" },
    { terms: ["onde", "where", "localiz", "mapa", "map", "situa", "address", "morada", "gps", "coordenadas"], key: "location" },
    { terms: ["agua", "poco", "furo", "water", "well", "source", "hidric", "nascente"], key: "water" },
    { terms: ["constru", "obra", "build", "work", "start", "pronto", "ready", "imediato"], key: "build" },
    { terms: ["licen", "aprovad", "permit", "approv", "camara", "municipal", "legal"], key: "build" },
    { terms: ["turism", "hotel", "alojamento", "tourism", "hospitality", "rental", "airbnb"], key: "tourism" },
    { terms: ["entrada", "estrada", "acesso", "road", "entrance", "access", "privacidade", "privacy"], key: "access" },
    { terms: ["visita", "agendar", "marcar", "visit", "schedule", "book", "appointment", "ver", "conhecer"], key: "visit" },
    { terms: ["comporta", "praia", "beach", "melides", "costa", "coast", "mar", "sea"], key: "comporta" },
    { terms: ["projeto", "casa", "estudio", "loft", "project", "house", "studio", "habitac", "dwelling", "piscina", "pool"], key: "project" },
    { terms: ["invest", "rentabil", "retorno", "roi", "profit", "return", "negocio", "business", "oportunidade"], key: "investment" },
    { terms: ["sobrei", "cortic", "arvore", "cork", "tree", "montado", "natureza", "nature"], key: "cork" },
  ];

  for (const pattern of patterns) {
    if (pattern.terms.some(term => lower.includes(term))) {
      return responses[pattern.key][lang];
    }
  }

  // Fallback
  return lang === "pt"
    ? "Obrigado pela sua questão! A Herdade em Grândola é uma propriedade verdadeiramente única — 12 hectares com licença de construção, no coração do Alentejo. Para informações mais detalhadas, sugiro agendar uma visita privada ou contactar-nos pelo +351 919 024 221. Posso ajudá-lo(a) com alguma questão específica?"
    : "Thank you for your question! Herdade em Grândola is a truly unique property — 12 hectares with a construction license, in the heart of Alentejo. For more detailed information, I suggest scheduling a private visit or contacting us at +351 919 024 221. Can I help with a specific question?";
};

const AIChatbot = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const greeting = language === "pt"
    ? "Bem-vindo(a) à Herdade em Grândola. Sou o seu concierge digital exclusivo. Como posso ajudá-lo(a) a explorar esta propriedade singular?"
    : "Welcome to Herdade em Grândola. I'm your exclusive digital concierge. How can I help you explore this singular property?";

  const suggestions = language === "pt"
    ? [
        { text: "Que área tem?", icon: "📐" },
        { text: "Onde se localiza?", icon: "📍" },
        { text: "Tem licença de construção?", icon: "🏗️" },
        { text: "Como agendar visita?", icon: "📅" },
      ]
    : [
        { text: "What's the area?", icon: "📐" },
        { text: "Where is it located?", icon: "📍" },
        { text: "Is there a building license?", icon: "🏗️" },
        { text: "How to schedule a visit?", icon: "📅" },
      ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
      if (messages.length === 0) {
        setMessages([{ role: "assistant", content: greeting }]);
      }
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Auto-show pulse after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowPulse(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = useCallback((text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    // Simulate smart response with varying delay
    const delay = 500 + Math.random() * 1000 + msg.length * 10;
    setTimeout(() => {
      const answer = generateLocalResponse(msg, language);
      setMessages(prev => [...prev, { role: "assistant", content: answer }]);
      setIsTyping(false);
    }, Math.min(delay, 2000));
  }, [input, isTyping, language]);

  return (
    <>
      {/* Floating button — premium concierge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-[900] transition-all duration-500 hover:scale-[1.03] group"
        style={{
          bottom: "16px",
          right: "16px",
          height: "44px",
          padding: isOpen ? "0 14px" : "0 14px",
          background: isOpen
            ? "hsl(var(--foreground))"
            : "hsl(var(--gold))",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: isOpen
            ? "0 6px 28px rgba(0,0,0,0.22)"
            : "0 6px 32px rgba(200,160,80,0.30)",
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X size={18} style={{ color: "hsl(var(--background))" }} />
        ) : (
          <>
            <div
              className="relative flex items-center justify-center"
              style={{ width: "24px", height: "24px" }}
            >
              <Sparkles size={17} style={{ color: "hsl(var(--background))" }} />
              {/* Pulse dot */}
              {showPulse && (
                <span
                  className="absolute -top-0.5 -right-0.5"
                  style={{
                    width: "7px",
                    height: "7px",
                    background: "#22c55e",
                    borderRadius: "50%",
                    border: "1.5px solid hsl(var(--gold))",
                    animation: "pulse 2s infinite",
                  }}
                />
              )}
            </div>
            <span
              className="hidden sm:inline"
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "hsl(var(--background))",
                fontWeight: 400,
              }}
            >
              Concierge
            </span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed z-[899] flex flex-col"
          style={{
            bottom: "70px",
            right: "16px",
            width: "min(400px, calc(100vw - 32px))",
            height: "min(560px, calc(100vh - 100px))",
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--gold) / 0.18)",
            boxShadow: "0 16px 56px rgba(0,0,0,0.14)",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4 shrink-0"
            style={{
              borderBottom: "1px solid hsl(var(--gold) / 0.12)",
              background: "linear-gradient(to right, hsl(var(--gold) / 0.04), transparent)",
            }}
          >
            <div
              className="w-9 h-9 flex items-center justify-center relative"
              style={{ background: "hsl(var(--gold) / 0.08)", border: "1px solid hsl(var(--gold) / 0.18)" }}
            >
              <Sparkles size={16} style={{ color: "hsl(var(--gold))" }} />
              {/* Online indicator */}
              <div
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5"
                style={{ background: "#22c55e", border: "2px solid hsl(var(--background))", borderRadius: "50%" }}
              />
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "hsl(var(--foreground))", lineHeight: 1.2 }}>
                Grândola <em>Concierge</em>
              </p>
              <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "8px", letterSpacing: "0.3em", color: "hsl(var(--gold))", textTransform: "uppercase" }}>
                {language === "pt" ? "Assistente Exclusivo · Online" : "Exclusive Assistant · Online"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(30,22,14,0.3)", padding: "4px" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div
                  className="max-w-[85%] px-4 py-3"
                  style={{
                    background: msg.role === "user"
                      ? "hsl(var(--gold) / 0.08)"
                      : "rgba(247,242,235,0.6)",
                    border: msg.role === "user"
                      ? "1px solid hsl(var(--gold) / 0.15)"
                      : "1px solid rgba(30,22,14,0.06)",
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.75,
                    color: "rgba(30,22,14,0.78)",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 flex items-center gap-1.5"
                  style={{ background: "rgba(247,242,235,0.6)", border: "1px solid rgba(30,22,14,0.06)" }}
                >
                  <span className="typing-dot" style={{ animationDelay: "0ms" }} />
                  <span className="typing-dot" style={{ animationDelay: "200ms" }} />
                  <span className="typing-dot" style={{ animationDelay: "400ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length <= 1 && !isTyping && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s.text)}
                  className="flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    padding: "6px 14px",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    fontFamily: "'Tenor Sans', sans-serif",
                    background: "hsl(var(--gold) / 0.05)",
                    border: "1px solid hsl(var(--gold) / 0.12)",
                    color: "rgba(30,22,14,0.65)",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>{s.icon}</span>
                  {s.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-3 px-5 py-4 shrink-0"
            style={{ borderTop: "1px solid hsl(var(--gold) / 0.10)" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={language === "pt" ? "Escreva a sua pergunta..." : "Type your question..."}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "13px",
                fontFamily: "'Tenor Sans', sans-serif",
                color: "hsl(var(--foreground))",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="transition-all duration-300"
              style={{
                background: input.trim() && !isTyping ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.12)",
                border: "none",
                cursor: input.trim() && !isTyping ? "pointer" : "default",
                padding: "9px",
              }}
            >
              <ArrowRight size={15} style={{ color: input.trim() && !isTyping ? "hsl(var(--background))" : "hsl(var(--gold) / 0.35)" }} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AIChatbot;
