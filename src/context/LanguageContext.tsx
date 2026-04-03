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
    "hero.label": "OPORTUNIDADE EXCLUSIVA OFF-MARKET",
    "hero.subtitle": "12 HECTARES · PROJETO APROVADO · PRONTO A CONSTRUIR · GRÂNDOLA, ALENTEJO",
    "hero.explore": "EXPLORAR",
    "about.label": "A PROPRIEDADE",
    "about.heading": "O valor do tempo: pronto a construir",
    "about.quote": "Oportunidade rara no Triângulo de Ouro Alentejano — serra, costa e exclusividade.",
    "gallery.label": "GALERIA",
    "location.label": "LOCALIZAÇÃO",
    "location.heading": "No Triângulo de Ouro do Alentejo",
    "stats.total": "ÁREA TOTAL",
    "stats.built": "ÁREA APROVADA",
    "stats.type": "TIPOLOGIA",
    "stats.founded": "FONTES DE ÁGUA",
    "stats.fromevora": "DAS PRAIAS",
    "visit.label": "Próximo Passo",
    "visit.title": "Veja com os seus próprios <em>olhos</em>",
    "visit.body": "Cada visita é uma experiência privada e exclusiva. A sua oportunidade de percorrer os 12 hectares, sentir o terreno e visualizar o potencial.",
    "visit.btn1": "Agendar Visita Privada",
    "visit.btn2": "Pedir Dossier de Investimento",
    "agendar.title": "Agendar Visita Privada",
    "agendar.subtitle": "Uma experiência exclusiva no Triângulo de Ouro alentejano",
    "agendar.desc": "Cada visita é uma experiência privada e exclusiva, adaptada ao seu ritmo. A nossa equipa irá acompanhá-lo(a) por toda a propriedade, mostrando o potencial do projeto aprovado.",
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
    "galeria.casa": "Projeto",
    "galeria.terra": "Terra",
    "galeria.paisagem": "Paisagem",
    "localizacao.title": "Localização",
    "localizacao.desc": "No Triângulo de Ouro alentejano, entre a serra e a costa",
    "localizacao.address": "Grândola, Alentejo",
    "footer.tagline": "Grândola · Alentejo · Venda Exclusiva",
  },
  en: {
    "nav.property": "Property",
    "nav.gallery": "Gallery",
    "nav.location": "Location",
    "nav.schedule": "Request Viewing",
    "hero.label": "EXCLUSIVE OFF-MARKET OPPORTUNITY",
    "hero.subtitle": "12 HECTARES · APPROVED PROJECT · READY TO BUILD · GRÂNDOLA, ALENTEJO",
    "hero.explore": "EXPLORE",
    "about.label": "THE PROPERTY",
    "about.heading": "The value of time: ready to build",
    "about.quote": "The ultimate Alentejo investment — in the sought-after Golden Triangle.",
    "gallery.label": "GALLERY",
    "location.label": "LOCATION",
    "location.heading": "In the Alentejo Golden Triangle",
    "stats.total": "TOTAL AREA",
    "stats.built": "APPROVED AREA",
    "stats.type": "TYPOLOGY",
    "stats.founded": "WATER SOURCES",
    "stats.fromevora": "FROM BEACHES",
    "visit.label": "Next Step",
    "visit.title": "See it with your own <em>eyes</em>",
    "visit.body": "Each visit is a private and exclusive experience. Your opportunity to walk the 12 hectares, feel the land and visualise the potential.",
    "visit.btn1": "Request Private Viewing",
    "visit.btn2": "Request Investment Brief",
    "agendar.title": "Schedule a Private Visit",
    "agendar.subtitle": "An exclusive experience in the Alentejo Golden Triangle",
    "agendar.desc": "Each visit is a private and exclusive experience, adapted to your pace. Our team will accompany you throughout the entire property, showcasing the approved project's potential.",
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
    "galeria.casa": "Project",
    "galeria.terra": "Land",
    "galeria.paisagem": "Landscape",
    "localizacao.title": "Location",
    "localizacao.desc": "In the Alentejo Golden Triangle, between hills and coast",
    "localizacao.address": "Grândola, Alentejo",
    "footer.tagline": "Grândola · Alentejo · Exclusive Sale",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Force English as default — clear any old Portuguese preference
    const stored = localStorage.getItem("language") as Language;
    if (stored === "pt") {
      localStorage.setItem("language", "en");
      return "en";
    }
    return stored || "en";
  });

  const toggle = () => {
    setLanguage((prev) => {
      const next = prev === "pt" ? "en" : "pt";
      localStorage.setItem("language", next);
      return next;
    });
  };

  const t = (key: string): string => {
    const value = translations[language][key] ?? translations["pt"][key];
    if (value === undefined && import.meta.env.DEV) {
      console.warn(`[i18n] Missing translation key: "${key}"`);
    }
    return value ?? key;
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
