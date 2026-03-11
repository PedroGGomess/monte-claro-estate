import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    "nav.property": "Propriedade",
    "nav.gallery": "Galeria",
    "nav.location": "Localização",
    "nav.schedule": "Agendar Visita",
    "hero.label": "ALENTEJO · PORTUGAL · VENDA EXCLUSIVA",
    "hero.subtitle": "48 HECTARES · CASA SENHORIAL T5 · OLIVAL CENTENÁRIO",
    "hero.explore": "EXPLORAR",
    "about.label": "A PROPRIEDADE",
    "about.heading": "Onde o tempo ainda é nosso",
    "about.quote": "Uma raridade no coração do Alentejo — terra, memória e silêncio.",
    "gallery.label": "GALERIA",
    "location.label": "LOCALIZAÇÃO",
    "location.heading": "Perto de tudo, longe do mundo",
    "stats.total": "ÁREA TOTAL",
    "stats.built": "ÁREA CONSTRUÍDA",
    "stats.type": "TIPOLOGIA",
    "stats.founded": "FUNDAÇÃO",
    "stats.fromevora": "DE ÉVORA",
    "visit.label": "Visita Privada",
    "visit.title": "Venha <em>sentir</em> o que as palavras não descrevem.",
    "visit.body": "Cada visita é uma experiência privada e exclusiva. Agende o seu momento para conhecer a Herdade do Monte Claro ao ritmo do Alentejo.",
    "visit.btn1": "Agendar Visita",
    "visit.btn2": "Contactar",
    "agendar.title": "Agendar Visita Privada",
    "agendar.subtitle": "Uma experiência exclusiva no coração do Alentejo",
    "agendar.desc": "Cada visita é uma experiência privada e exclusiva, adaptada ao seu ritmo. A nossa equipa irá acompanhá-lo(a) por toda a propriedade, da casa senhorial ao olival centenário.",
    "agendar.response": "Resposta em 24 horas",
    "agendar.nome": "Nome Completo",
    "agendar.email": "Email",
    "agendar.telefone": "Telefone",
    "agendar.data": "Data Preferida",
    "agendar.periodo": "Período Preferido",
    "agendar.manha": "Manhã (10h-13h)",
    "agendar.tarde": "Tarde (14h-17h)",
    "agendar.fimdesemana": "Fim de Semana",
    "agendar.pessoas": "Número de Pessoas",
    "agendar.mensagem": "Mensagem (opcional)",
    "agendar.comercial": "Estou interessado(a) numa proposta comercial",
    "agendar.submit": "Agendar Visita",
    "agendar.success": "A sua visita foi agendada. Entraremos em contacto brevemente.",
    "propriedade.hero": "A Propriedade",
    "propriedade.cta": "Agendar uma Visita Privada",
    "galeria.title": "Galeria",
    "galeria.todos": "Todos",
    "galeria.casa": "Casa",
    "galeria.terra": "Terra",
    "galeria.paisagem": "Paisagem",
    "localizacao.title": "Localização",
    "localizacao.desc": "No coração do Alentejo, entre planícies douradas e céus infinitos",
    "localizacao.address": "Alentejo, Portugal",
    "footer.tagline": "Alentejo · Portugal · Venda Exclusiva",
  },
  en: {
    "nav.property": "Property",
    "nav.gallery": "Gallery",
    "nav.location": "Location",
    "nav.schedule": "Schedule Visit",
    "hero.label": "ALENTEJO · PORTUGAL · EXCLUSIVE SALE",
    "hero.subtitle": "48 HECTARES · MANOR HOUSE T5 · CENTURY-OLD OLIVE GROVE",
    "hero.explore": "EXPLORE",
    "about.label": "THE PROPERTY",
    "about.heading": "Where time still belongs to us",
    "about.quote": "A rarity in the heart of Alentejo — land, memory and silence.",
    "gallery.label": "GALLERY",
    "location.label": "LOCATION",
    "location.heading": "Close to everything, far from the world",
    "stats.total": "TOTAL AREA",
    "stats.built": "BUILT AREA",
    "stats.type": "TYPE",
    "stats.founded": "FOUNDED",
    "stats.fromevora": "FROM ÉVORA",
    "visit.label": "Private Visit",
    "visit.title": "Come <em>feel</em> what words cannot describe.",
    "visit.body": "Each visit is a private and exclusive experience. Schedule your moment to discover Herdade do Monte Claro at the pace of Alentejo.",
    "visit.btn1": "Schedule Visit",
    "visit.btn2": "Contact",
    "agendar.title": "Schedule a Private Visit",
    "agendar.subtitle": "An exclusive experience in the heart of Alentejo",
    "agendar.desc": "Each visit is a private and exclusive experience, adapted to your pace. Our team will accompany you throughout the entire property, from the manor house to the century-old olive grove.",
    "agendar.response": "Response within 24 hours",
    "agendar.nome": "Full Name",
    "agendar.email": "Email",
    "agendar.telefone": "Phone",
    "agendar.data": "Preferred Date",
    "agendar.periodo": "Preferred Period",
    "agendar.manha": "Morning (10am-1pm)",
    "agendar.tarde": "Afternoon (2pm-5pm)",
    "agendar.fimdesemana": "Weekend",
    "agendar.pessoas": "Number of People",
    "agendar.mensagem": "Message (optional)",
    "agendar.comercial": "I am interested in a commercial proposal",
    "agendar.submit": "Schedule Visit",
    "agendar.success": "Your visit has been scheduled. We will contact you shortly.",
    "propriedade.hero": "The Property",
    "propriedade.cta": "Schedule a Private Visit",
    "galeria.title": "Gallery",
    "galeria.todos": "All",
    "galeria.casa": "House",
    "galeria.terra": "Land",
    "galeria.paisagem": "Landscape",
    "localizacao.title": "Location",
    "localizacao.desc": "In the heart of Alentejo, between golden plains and endless skies",
    "localizacao.address": "Alentejo, Portugal",
    "footer.tagline": "Alentejo · Portugal · Exclusive Sale",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("language") as Language) || "pt";
  });

  const toggle = () => {
    setLanguage((prev) => {
      const next = prev === "pt" ? "en" : "pt";
      localStorage.setItem("language", next);
      return next;
    });
  };

  const t = (key: string): string => {
    return translations[language][key] ?? translations["pt"][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
