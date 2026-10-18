
// Perfil
export const profile = {
  name: "Erick Victor",
  firstName: "Erick",
  lastName: "Victor",
  role: "Desenvolvedor Full Stack",
  description:
    "Desenvolvo websites, sistemas e softwares que melhoram os resultados das empresas, do front-end ao back-end.",
  location: "Bálsamo, SP, Brasil",
  focus: "Aplicações que facilitam processos",
  available: true,
  email: "erickvert159@gmail.com",
  cvUrl: "",
};

// Sobre
export const about = {
  lead: "Sou o Erick, desenvolvedor de sistemas e softwares focado em criar soluções digitais que melhoram os resultados das empresas.",
  paragraphs: [
    "Hoje, ser desenvolvedor vai além de escrever código: é saber escolher as tecnologias certas para cada projeto. Estou há quase dois anos na área de tecnologia e me desenvolvi tanto no front-end quanto no back-end, atuando como full stack.",
    "Também me aprofundei no uso de inteligência artificial no desenvolvimento, estudando de forma técnica como os modelos entendem e executam tarefas. Com isso, entrego projetos em menos tempo, sem abrir mão da qualidade em cada etapa.",
  ],
};

export type SocialKey = "github" | "linkedin" | "instagram";

export const socials: { key: SocialKey; label: string; href: string; handle: string }[] = [
  { key: "github", label: "GitHub", href: "https://github.com/Er1ckVictor", handle: "@Er1ckVictor" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/erick-victor-67661a374", handle: "in/erick-victor" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/er1ck.v1ctor/", handle: "@er1ck.v1ctor" },
];

export type Project = {
  slug: string;
  name: string;
  year: string;
  summary: string;
  role: string;
  stack: string[];
  highlights: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
};

// Projetos
export const projects: Project[] = [
  {
    slug: "Landing page",
    name: "Brasa burguers",
    year: "2026",
    summary: "Site de hamburgueria com animações, cardápio e contatos",
    role: "Front-end",
    stack: ["Next.js", "TypeScript", "CSS", "Gsap"],
    highlights: ["Animação profissional e interativa", "Escalável para sistema de gestão (pedidos, funcionários, etc)", "Cardápio digital"],
    repo: "https://github.com/Er1ckVictor/Brasa-Burguers",
    live: "https://er1ckvictor.github.io/Brasa-Burguers",
    featured: true,
  },
  {
    slug: "Saas",
    name: "Barber Navalha",
    year: "2026",
    summary: "Site para barbeiros com animação e agendamentos",
    role: "front-end",
    stack: ["Next.js", "TypeScript", "CSS", "Gsap", "Three.js"],
    highlights: [
      "Animação profissional e interativa", 
      "Escalável para agendamento, relatórios e controle de gestão", 
      "Facilita tempo de organização e apresentação de serviços"
    ],
    repo: "https://github.com/Er1ckVictor/Barber-navalha",
    live: "https://er1ckvictor.github.io/Barber-navalha/",
    featured: true,
  },
];

export const stack = [
  { group: "Front-end", icon: "frontend", items: ["React", "Next.js", "JavaScript", "TypeScript"] },
  { group: "Back-end", icon: "backend", items: ["Node.js", "Express", "APIs REST"] },
  { group: "Dados", icon: "data", items: ["Supabase", "Firebase"] },
  { group: "Infra e ferramentas", icon: "infra", items: ["Git", "Vercel"] },
] as const;

export type TimelineIcon = "start" | "growth" | "work" | "now";

export const timeline: { key: string; period: string; title: string; place: string; text: string; icon: TimelineIcon }[] = [
  {
    key: "2024",
    period: "2024",
    title: "Aprendendo o básico",
    place: "Início nos estudos",
    text: "Comecei por HTML, CSS e JavaScript para entender como construir interfaces e integrar código, criando as primeiras experiências interativas.",
    icon: "start",
  },
  {
    key: "2025-02",
    period: "Fevereiro de 2025",
    title: "Além do básico",
    place: "Projetos em produção",
    text: "Os desafios passaram a ir além do código: segurança, deploy em produção, manter aplicações no ar com muitos usuários e lidar com sobrecarga. Comecei a pensar em escalabilidade fácil em sistemas.",
    icon: "growth",
  },
  {
    key: "2025-04",
    period: "Abril de 2025",
    title: "Primeira experiência profissional",
    place: "Betta",
    text: "Contratado pela Betta para aprender e desenvolver projetos na plataforma NICE CXone, minha primeira atuação em uma empresa de tecnologia.",
    icon: "work",
  },
  {
    key: "2026",
    period: "2026 — hoje",
    title: "Desenvolvedor na Betta e projetos próprios",
    place: "Betta",
    text: "Sigo na Betta e, em paralelo, desenvolvo projetos próprios, aprimorando minhas habilidades a cada entrega.",
    icon: "now",
  },
];
