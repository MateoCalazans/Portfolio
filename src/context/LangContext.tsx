import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "pt";

// ─── Translation dictionary ───────────────────────────────────────────────────
export const translations = {
  en: {
    // Navbar
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      work: "Work",
      contact: "Contact",
      downloadCV: "Download CV",
    },
    // Hero
    hero: {
      available: "Available for work ✦",
      tagline: "Crafting high-performance Shopify storefronts that convert.",
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
    },
    // About
    about: {
      eyebrow: "01 — About",
      heading: "About Me",
      p1: "I'm Mateo Calazans, a Shopify Developer based in Natal, Brazil. I hold a Technologist Degree in Systems Analysis and Development from the Federal University of Rio Grande do Norte (UFRN).",
      p2: "I specialize in building scalable, high-converting Shopify storefronts — from custom Liquid themes to Shopify Functions, Extensions, and deep API integrations. I care obsessively about performance, clean code, and pixel-perfect execution.",
      stats: {
        experience: "3+ Years Experience",
        stores: "10+ Stores Delivered",
        education: "UFRN Graduate",
      },
    },
    // Skills
    skills: {
      eyebrow: "02 — Skills",
      heading: "Tech Stack",
      categories: {
        shopify: "Shopify Ecosystem",
        frontend: "Frontend",
        performance: "Performance & Growth",
      },
    },
    // Experience
    experience: {
      eyebrow: "03 — Career",
      heading: "Experience",
      jobs: [
        {
          company: "E-smart Capitais",
          role: "Shopify Developer",
          period: "Apr 2025 – Present",
          description:
            "Maintaining and scaling storefronts for multiple brands, improving performance and accessibility, and developing custom features using Shopify Functions and Extensions.",
        },
        {
          company: "Organifi",
          role: "Shopify Developer",
          period: "",
          description:
            "Developed and customized Shopify themes focused on responsive design, performance, and SEO/CRO optimization. Integrated third-party apps and used metaobjects for tailored features.",
        },
        {
          company: "Case Mate",
          role: "Shopify Developer",
          period: "",
          description:
            "Contributed to theme development and optimization, focusing on performance, responsiveness, and conversion rate improvements. Delivered scalable, customized solutions using Shopify APIs.",
        },
      ],
    },
    // Work
    work: {
      eyebrow: "04 — Portfolio",
      heading: "Stores I've Built On",
      visitStore: "Visit Store",
      privateProject: "Private project",
      stores: [
        {
          name: "Case Mate",
          description:
            "Premium phone cases & accessories. Custom theme with advanced CRO features.",
        },
        {
          name: "Organifi",
          description:
            "Health & wellness brand. Performance-focused Liquid theme with metaobject-powered content.",
        },
        {
          name: "Crimson Agility",
          description:
            "Shopify storefront optimization and custom feature development.",
        },
      ],
    },
    // Education
    education: {
      eyebrow: "05 — Education",
      heading: "Education",
      degree: "Technologist Degree in Systems Analysis and Development",
      institution: "Federal University of Rio Grande do Norte (UFRN)",
      description:
        "Comprehensive program covering software engineering, algorithms, data structures, databases, and modern web development practices.",
    },
    // Contact
    contact: {
      eyebrow: "06 — Contact",
      heading: "Let's Work Together",
      subheading: "Have a project in mind? I'd love to hear about it.",
      downloadCV: "Download CV",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your@email.com",
        message: "Message",
        messagePlaceholder: "Tell me about your project...",
        send: "Send Message",
        sent: "Message Sent!",
      },
    },
  },

  pt: {
    // Navbar
    nav: {
      about: "Sobre",
      skills: "Habilidades",
      experience: "Experiência",
      work: "Projetos",
      contact: "Contato",
      downloadCV: "Baixar CV",
    },
    // Hero
    hero: {
      available: "Disponível para trabalho ✦",
      tagline: "Criando storefronts Shopify de alta performance que convertem.",
      viewWork: "Ver Meu Trabalho",
      getInTouch: "Entrar em Contato",
    },
    // About
    about: {
      eyebrow: "01 — Sobre",
      heading: "Sobre Mim",
      p1: "Sou Mateo Calazans, Desenvolvedor Shopify natural de Natal, Brasil. Tenho Graduação Tecnológica em Análise e Desenvolvimento de Sistemas pela Universidade Federal do Rio Grande do Norte (UFRN).",
      p2: "Sou especializado em construir storefronts Shopify escaláveis e de alta conversão — desde temas Liquid personalizados até Shopify Functions, Extensions e integrações profundas de API. Me importo obsessivamente com performance, código limpo e execução pixel-perfect.",
      stats: {
        experience: "3+ Anos de Experiência",
        stores: "10+ Lojas Entregues",
        education: "Formado pela UFRN",
      },
    },
    // Skills
    skills: {
      eyebrow: "02 — Habilidades",
      heading: "Stack Técnica",
      categories: {
        shopify: "Ecossistema Shopify",
        frontend: "Frontend",
        performance: "Performance & Crescimento",
      },
    },
    // Experience
    experience: {
      eyebrow: "03 — Carreira",
      heading: "Experiência",
      jobs: [
        {
          company: "E-smart Capitais",
          role: "Desenvolvedor Shopify",
          period: "Abr 2025 – Presente",
          description:
            "Manutenção e escalabilidade de storefronts para múltiplas marcas, melhorando performance e acessibilidade, e desenvolvendo funcionalidades customizadas com Shopify Functions e Extensions.",
        },
        {
          company: "Organifi",
          role: "Desenvolvedor Shopify",
          period: "",
          description:
            "Desenvolvimento e customização de temas Shopify focados em design responsivo, performance e otimização de SEO/CRO. Integração de apps de terceiros e uso de metaobjects para funcionalidades personalizadas.",
        },
        {
          company: "Case Mate",
          role: "Desenvolvedor Shopify",
          period: "",
          description:
            "Contribuição para desenvolvimento e otimização de temas, com foco em performance, responsividade e melhorias na taxa de conversão. Entrega de soluções escaláveis e customizadas usando as APIs do Shopify.",
        },
      ],
    },
    // Work
    work: {
      eyebrow: "04 — Portfólio",
      heading: "Lojas que Trabalhei",
      visitStore: "Visitar Loja",
      privateProject: "Projeto privado",
      stores: [
        {
          name: "Case Mate",
          description:
            "Capas premium para celular & acessórios. Tema customizado com funcionalidades avançadas de CRO.",
        },
        {
          name: "Organifi",
          description:
            "Marca de saúde & bem-estar. Tema Liquid focado em performance com conteúdo gerenciado por metaobjects.",
        },
        {
          name: "Crimson Agility",
          description:
            "Otimização de storefront Shopify e desenvolvimento de funcionalidades customizadas.",
        },
      ],
    },
    // Education
    education: {
      eyebrow: "05 — Formação",
      heading: "Formação",
      degree: "Graduação Tecnológica em Análise e Desenvolvimento de Sistemas",
      institution: "Universidade Federal do Rio Grande do Norte (UFRN)",
      description:
        "Programa abrangente cobrindo engenharia de software, algoritmos, estruturas de dados, bancos de dados e práticas modernas de desenvolvimento web.",
    },
    // Contact
    contact: {
      eyebrow: "06 — Contato",
      heading: "Vamos Trabalhar Juntos",
      subheading: "Tem um projeto em mente? Adoraria saber mais.",
      downloadCV: "Baixar CV",
      form: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "E-mail",
        emailPlaceholder: "seu@email.com",
        message: "Mensagem",
        messagePlaceholder: "Fale sobre seu projeto...",
        send: "Enviar Mensagem",
        sent: "Mensagem Enviada!",
      },
    },
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)["en"];
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <LangContext.Provider
      value={{ lang, setLang, t: translations[lang] }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
