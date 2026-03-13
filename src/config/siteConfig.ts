import herdade01 from "@/assets/herdade-01.jpg";
import herdade02 from "@/assets/herdade-02.jpg";
import herdade03 from "@/assets/herdade-03.jpg";
import herdade04 from "@/assets/herdade-04.jpg";
import herdade05 from "@/assets/herdade-05.jpg";
import herdade06 from "@/assets/herdade-06.jpg";
import herdade07 from "@/assets/herdade-07.jpg";
import herdade08 from "@/assets/herdade-08.jpg";
import herdade09 from "@/assets/herdade-09.jpg";

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
};

export const siteConfig = {
  name: "Herdade em Grândola",
  nameItalic: "Grândola",
  hero: {
    label: "Grândola · Alentejo · Venda Exclusiva",
    title: "Herdade em",
    titleItalic: "Grândola",
    subtitle: "12 hectares · Projeto Aprovado · Licença de Construção",
    coords: "38°10'N 8°34'W",
    location: "Grândola, Portugal",
  },
  stats: [
    { value: "12 ha", label: "Área Total" },
    { value: "500 m²", label: "Área Aprovada" },
    { value: "2+6", label: "Habitações" },
    { value: "3", label: "Fontes de Água" },
    { value: "20 min", label: "Da Comporta" },
  ],
  about: {
    quote: "No Triângulo de Ouro alentejano — serra, costa e exclusividade.",
    quoteEn: "In the Alentejo Golden Triangle — hills, coast and exclusivity.",
    p1: "Esta propriedade de 12 hectares, situada na prestigiada zona de Santa Margarida da Serra, oferece o equilíbrio perfeito entre a serenidade da serra e a sofisticação da costa. Com uma localização estratégica a apenas 20 minutos das praias da Comporta e Melides, 7 minutos de Grândola e 1h15 de Lisboa, este é o ativo ideal para quem procura exclusividade e rapidez de execução.",
    p1En: "This 12-hectare property, located in the prestigious Santa Margarida da Serra area, offers the perfect balance between the serenity of the hills and the sophistication of the coast. Strategically located just 20 minutes from the beaches of Comporta and Melides, 7 minutes from Grândola and 1h15 from Lisbon, this is the ideal asset for those seeking exclusivity and speed of execution.",
    p2: "O terreno possui Projeto de Arquitetura aprovado e Licença de Construção emitida, permitindo o início imediato das obras. A área de construção de 500m² inclui 2 habitações gémeas, 5 estúdios contíguos, 1 estúdio independente, garagem e uma zona de lazer/piscina de grandes dimensões. Versatilidade total para residência familiar numerosa, projeto de co-living de luxo ou exploração turística imediata.",
    p2En: "The land has an approved Architectural Project and issued Construction License, allowing the immediate start of works. The 500m² construction area includes 2 twin houses, 5 adjoining studios, 1 independent studio, garage and a large leisure/pool area. Total versatility for large family residence, luxury co-living project or immediate tourism operation.",
    p3: "A autossuficiência hídrica é garantida por furo de água, 2 poços tradicionais e um curso de água natural numa das extremidades. O terreno é povoado por sobreiros estrategicamente distribuídos, conferindo a mística do montado alentejano sem condicionar as áreas de construção. Inserido em zona apta para Projetos de Turismo segundo o PDM, com escala para expandir ou diversificar o investimento.",
    p3En: "Water self-sufficiency is guaranteed by a water borehole, 2 traditional wells and a natural water stream at one of its boundaries. The land is populated by strategically distributed cork oaks, giving the mystique of the Alentejo montado without conditioning the construction areas. Zoned for Tourism Projects under the Municipal Master Plan, offering scale to expand or diversify the investment.",
    p4: "Acessibilidade premium: entrada por duas estradas alcatroadas independentes em extremos opostos do terreno, garantindo privacidade total e facilidade logística. Com 120.000 m² de privacidade absoluta e eletricidade disponível com levantamento topográfico integral efetuado, esta herdade está pronta para transformar a sua visão em realidade.",
    p4En: "Premium accessibility: two independent paved road entrances at opposite ends of the land, ensuring total privacy and logistical ease. With 120,000 m² of absolute privacy, available electricity and a complete topographic survey already carried out, this estate is ready to turn your vision into reality.",
    image: herdade01,
    imageCaption: "Projeto Aprovado · Vista Geral",
    imageCaptionEn: "Approved Project · General View",
  },
  features: [
    {
      num: "01",
      title: "Pronto a Construir",
      desc: "Projeto de Arquitetura aprovado e Licença de Construção emitida. Início imediato das obras, sem anos de espera por licenciamentos.",
      tag: "Licença emitida",
    },
    {
      num: "02",
      title: "500 m² Aprovados",
      desc: "2 habitações gémeas, 6 estúdios (5+1), garagem e zona de lazer/piscina de grandes dimensões. Versatilidade total para residência ou turismo.",
      tag: "2 casas · 6 estúdios",
    },
    {
      num: "03",
      title: "Água Abundante",
      desc: "Furo de água, 2 poços tradicionais e curso de água natural. Autossuficiência hídrica rara numa região onde a água é o bem mais precioso.",
      tag: "3 fontes",
    },
    {
      num: "04",
      title: "Duplo Acesso",
      desc: "Entrada por duas estradas alcatroadas independentes em extremos opostos, garantindo privacidade total e facilidade logística.",
      tag: "2 entradas",
    },
  ],
  gallery: [
    { src: herdade05, caption: "Interior · Sala Principal" },
    { src: herdade01, caption: "Vista Geral · Piscina" },
    { src: herdade07, caption: "Fachada Principal" },
    { src: herdade02, caption: "Arcadas · Exterior" },
    { src: herdade08, caption: "Pérgola · Piscina" },
    { src: herdade09, caption: "Sala de Jantar · Cozinha" },
    { src: herdade04, caption: "Cozinha · Mármore" },
  ],
  distances: [
    { place: "Comporta / Melides", time: "20 min" },
    { place: "Grândola", time: "7 min" },
    { place: "Lisboa", time: "1h 15min" },
    { place: "Aeroporto de Lisboa", time: "1h 25min" },
  ],
  visit: {
    title: 'Venha <em>conhecer</em> o seu próximo investimento.',
    body: "Cada visita é uma experiência privada e exclusiva. Agende o seu momento para conhecer esta herdade única no coração do Alentejo.",
    btn1: "Agendar Visita",
    btn2: "Contactar",
  },
  footer: {
    tagline: "Grândola · Alentejo · Venda Exclusiva",
    phone: "+351 269 000 000",
  },
};
