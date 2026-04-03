import herdade01 from "@/assets/herdade-01.jpg";
import herdade02 from "@/assets/herdade-02.jpg";
import herdade03 from "@/assets/herdade-03.jpg";
import herdade04 from "@/assets/herdade-04.jpg";
import herdade05 from "@/assets/herdade-05.jpg";
import herdade06 from "@/assets/herdade-06.jpg";
import herdade07 from "@/assets/herdade-07.jpg";
import herdade08 from "@/assets/herdade-08.jpg";
import herdade09 from "@/assets/herdade-09.jpg";
import herdade10 from "@/assets/herdade-10.jpg";
import herdade11 from "@/assets/herdade-11.jpg";

export const images = {
  hero: herdade01,
  arches: herdade02,
  facade: herdade03,
  kitchenMarble: herdade04,
  kitchenMinimal: herdade05,
  livingRoom: herdade06,
  frontView: herdade07,
  poolPergola: herdade08,
  diningKitchen: herdade09,
  aerialClose: herdade10,
  aerialWide: herdade11,
};

/* Google Apps Script URL for booking management — replace with your deployed URL */
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz12TASUhCQr0ysAJ4I0hPan22j1cuPDoMqKCjNIIo-vzQ_H5hyS51e8EOadgufxPgP/exec";

export const siteConfig = {
  name: "Herdade em Grândola",
  nameItalic: "Grândola",
  hero: {
    label: "Exclusive Off-Market Opportunity",
    labelPt: "Oportunidade Exclusiva Off-Market",
    title: "One of the last",
    titleItalic: "untouched estates",
    titleEnd: "in Europe's most coveted coastline",
    titlePt: "Uma das últimas",
    titleItalicPt: "herdades intocadas",
    titleEndPt: "na costa mais cobiçada da Europa",
    subtitle: "12 hectares · Approved Project · Ready to Build · Grândola, Alentejo",
    subtitlePt: "12 hectares · Projeto Aprovado · Pronto a Construir · Grândola, Alentejo",
    coords: "38°10'N 8°34'W",
    location: "Grândola, Portugal",
  },
  stats: [
    { value: "12 ha", label: "Área Total" },
    { value: "500 m²", label: "Área Aprovada" },
    { value: "T3+T3 + 6 lofts", label: "Tipologia" },
    { value: "3", label: "Fontes de Água" },
    { value: "25 min", label: "Das Praias" },
  ],
  about: {
    quote: "Enquanto outros esperam anos por licenças, esta herdade está pronta a construir — amanhã.",
    quoteEn: "While others wait years for permits, this estate is ready to build — tomorrow.",
    p1: "Numa região onde cada hectare se torna mais raro e mais valioso, esta propriedade de 12 hectares representa uma oportunidade que o mercado já não oferece. Localizada no coração do Triângulo de Ouro do Alentejo — entre Grândola, Comporta e Melides — combina a privacidade absoluta da serra com a proximidade imediata das praias mais exclusivas da Europa.",
    p1En: "In a region where every hectare grows rarer and more valuable, this 12-hectare estate represents an opportunity the market no longer offers. Located in the heart of the Alentejo Golden Triangle — between Grândola, Comporta and Melides — it combines absolute privacy with immediate proximity to Europe's most exclusive beaches.",
    p2: "Projeto de Arquitetura aprovado. Licença de Construção emitida. 500m² de área construída incluindo 2 moradias T3, 6 lofts, garagem e piscina de grandes dimensões. Esqueça os 2+ anos de burocracia — comece a construir imediatamente.",
    p2En: "Approved Architectural Project. Construction License issued. 500m² of built area including 2 T3 villas, 6 lofts, garage and large pool. Skip 2+ years of bureaucracy — start building immediately.",
    p3: "Autossuficiência hídrica total com furo de água, 2 poços tradicionais e curso de água natural. Eletricidade disponível. Duplo acesso por estradas alcatroadas independentes. 120.000m² de sobreiros centenários e privacidade absoluta.",
    p3En: "Complete water self-sufficiency with borehole, 2 traditional wells and natural water stream. Electricity available. Dual access via independent paved roads. 120,000m² of century-old cork oaks and absolute privacy.",
    p4: "Numa região onde o turismo rural premium cresce a dois dígitos, esta herdade está classificada como apta para Projetos de Turismo segundo o PDM municipal. Boutique hotel, eco-retreat, co-living de luxo — a versatilidade é total.",
    p4En: "In a region where premium rural tourism grows at double digits, this estate is classified as eligible for Tourism Projects under the municipal plan. Boutique hotel, eco-retreat, luxury co-living — total versatility.",
    image: herdade01,
    imageCaption: "Projeto Aprovado · Vista Geral",
    imageCaptionEn: "Approved Project · General View",
  },
  features: [
    {
      num: "01",
      title: "Pronto a Construir",
      titleEn: "Ready to Build",
      desc: "Projeto de Arquitetura aprovado e Licença de Construção emitida. Início imediato das obras — esqueça os anos de espera por licenciamentos.",
      descEn: "Approved architectural project with construction license issued. Skip 2+ years of bureaucracy — start building immediately.",
      tag: "Licença emitida",
      tagEn: "License issued",
    },
    {
      num: "02",
      title: "500 m² Aprovados",
      titleEn: "500 m² Approved",
      desc: "2 moradias T3 (ou 1 T6), 6 lofts, garagem e zona de lazer/piscina de grandes dimensões. Versatilidade total para residência ou turismo.",
      descEn: "2 T3 houses (or 1 T6), 6 lofts, garage and large pool/leisure area. Total versatility for residence, co-living or tourism.",
      tag: "T3+T3 · 6 lofts",
      tagEn: "T3+T3 · 6 lofts",
    },
    {
      num: "03",
      title: "Água Abundante",
      titleEn: "Water Abundance",
      desc: "Furo de água, 2 poços tradicionais e curso de água natural. Autossuficiência hídrica rara numa região onde a água é o bem mais precioso.",
      descEn: "Borehole, 2 traditional wells and natural water stream. Rare self-sufficiency in a region where water is the most precious resource.",
      tag: "3 fontes",
      tagEn: "3 sources",
    },
    {
      num: "04",
      title: "Duplo Acesso",
      titleEn: "Dual Access",
      desc: "Entrada por duas estradas alcatroadas independentes em extremos opostos, garantindo privacidade total e facilidade logística.",
      descEn: "Two independent paved road entrances at opposite ends, ensuring maximum privacy and logistical ease.",
      tag: "2 entradas",
      tagEn: "2 entrances",
    },
  ],
  gallery: [
    { src: herdade10, caption: "Vista Aérea · Pátio", captionEn: "Aerial View · Courtyard" },
    { src: herdade11, caption: "Vista Aérea · Propriedade", captionEn: "Aerial View · Property" },
    { src: herdade01, caption: "Vista Geral · Piscina", captionEn: "General View · Pool" },
    { src: herdade07, caption: "Fachada Principal", captionEn: "Main Facade" },
    { src: herdade02, caption: "Arcadas · Exterior", captionEn: "Arches · Exterior" },
    { src: herdade08, caption: "Pérgola · Piscina", captionEn: "Pergola · Pool" },
    { src: herdade05, caption: "Interior · Sala Principal", captionEn: "Interior · Main Room" },
    { src: herdade09, caption: "Sala de Jantar · Cozinha", captionEn: "Dining Room · Kitchen" },
    { src: herdade04, caption: "Cozinha · Mármore", captionEn: "Kitchen · Marble" },
  ],
  distances: [
    { place: "Praia de Melides", time: "25 min" },
    { place: "Praia da Comporta", time: "30 min" },
    { place: "Grândola", time: "7 min" },
    { place: "Lisboa", time: "1h 15min" },
    { place: "Aeroporto de Lisboa", time: "1h 25min" },
    { place: "Évora (UNESCO)", time: "1h 10min" },
    { place: "Sevilha, Espanha", time: "2h 30min" },
  ],
  visit: {
    title: 'Venha <em>conhecer</em> o seu próximo investimento.',
    body: "Cada visita é uma experiência privada e exclusiva. Agende o seu momento para conhecer esta herdade única no coração do Alentejo.",
    btn1: "Agendar Visita",
    btn2: "Contactar",
  },
  footer: {
    tagline: "Grândola · Alentejo · Venda Exclusiva",
    phone: "+351 919 024 221",
    email: "herdasantamargarida@gmail.com",
  },
};
