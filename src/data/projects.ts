// EDITA ESTE ARCHIVO para agregar/quitar/modificar tus proyectos.
// EDIT THIS FILE to add/remove/edit your projects.

export type Project = {
  id: string;
  title: string;
  description: { es: string; en: string };
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  inProgress?: boolean;
  // Marks the project shown in the "Proyecto destacado" deep-dive on the
  // site. At most one project should have this set — edit it via
  // `npm run content` (Proyectos > Marcar como destacado) rather than by
  // hand, since that also clears it from any other project.
  featured?: boolean;
  // Optional documentation-style metadata, rendered as a spec block when present.
  year?: string;
  role?: string;
  version?: string;
  lastUpdate?: string;
  category?: string;
  // Optional deep-dive content, used for the featured project's architecture
  // diagram and engineering note (see Projects.tsx). Leave unset to skip both.
  architecture?: string[];
  note?: { es: string; en: string };
};

export const projects: Project[] = [
  {
    id: "p01",
    title: "Portfolio",
    description: {
      es: "(Este sitio web)",
      en: "(This website)",
    },
    tags: ["Web Application"],
    imageUrl: "/project-placeholder.svg",
    repoUrl: "https://github.com/DanteAnnetta03/portfolio",
    inProgress: true,
    year: "2026",
    category: "Web Application",
  },
  {
    id: "p02",
    title: "By People",
    description: {
      es: "Plataforma para validar ideas de negocio antes de invertir tiempo y dinero en construirlas. El producto combina una landing de captación con un backend preparado para gestionar usuarios, proyectos, perfiles de agentes de IA y corridas de simulación tipo focus group.",
      en: "A platform for validating business ideas before investing time and money in building them. The product combines a lead-capture landing page with a backend designed to manage users, projects, AI agent profiles, and focus-group-style simulation runs.",
    },
    tags: ["Web Application", "Marketing & Growth", "AI"],
    imageUrl: "/by_people.png",
    repoUrl: "https://github.com/gonzasharif/romeo-samsung",
    year: "2026",
    role: "Founder / Developer",
    architecture: ["Frontend", "backend API", "LLM API"],
    category: "AI",
    featured: true,
  },
  {
    id: "p03",
    title: "Samsung M12 PostmarketOs Install Guide",
    description: {
      es: "Una guía paso a paso, desde cero, para crear y flashear una instalación funcional de postmarketOS en el Samsung Galaxy M12 (SM-M127F, Exynos 850 / 3830).",
      en: "A from-zero, step by-step walkthrough for building and flashing a working postmarketOS install on the Samsung Galaxy M12 (SM-M127F, Exynos 850 / 3830).",
    },
    tags: ["GNU/Linux", "Android"],
    imageUrl: "/project-placeholder.svg",
    repoUrl: "https://github.com/DanteAnnetta03/postmarketOs-samsung-m12-install-guide",
    inProgress: true,
    year: "2026",
    category: "Linux",
  },
];
