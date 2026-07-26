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
];
