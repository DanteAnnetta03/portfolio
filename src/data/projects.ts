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
    id: "project-1",
    title: "[Nombre del Proyecto 1]",
    description: {
      es: "[Descripción del proyecto: qué problema resuelve, qué tecnologías usaste y tu rol en él.]",
      en: "[Project description: what problem it solves, which technologies you used, and your role in it.]",
    },
    tags: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    imageUrl: "/project-placeholder.svg",
    liveUrl: "https://ejemplo.com",
    repoUrl: "https://github.com/tu-usuario/proyecto-1",
    year: "[2026]",
    role: "[Full Stack]",
    version: "[1.0]",
    lastUpdate: "[Mayo 2026]",
    category: "[Web Application]",
    architecture: ["[Cliente — Next.js]", "[API — Node.js]", "[Base de datos — PostgreSQL]"],
    note: {
      es: "[Nota técnica: una decisión de arquitectura, un trade-off o un detalle de implementación que valga la pena destacar.]",
      en: "[Engineering note: an architecture decision, trade-off, or implementation detail worth highlighting.]",
    },
  },
  {
    id: "project-2",
    title: "[Nombre del Proyecto 2]",
    description: {
      es: "[Descripción del segundo proyecto.]",
      en: "[Description of the second project.]",
    },
    tags: ["[Tech 1]", "[Tech 2]"],
    imageUrl: "/project-placeholder.svg",
    repoUrl: "https://github.com/tu-usuario/proyecto-2",
    inProgress: true,
    year: "[2026]",
    version: "[0.4]",
  },
  {
    id: "project-3",
    title: "[Nombre del Proyecto 3]",
    description: {
      es: "[Descripción del tercer proyecto.]",
      en: "[Description of the third project.]",
    },
    tags: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
    imageUrl: "/project-placeholder.svg",
    liveUrl: "https://ejemplo.com",
    repoUrl: "https://github.com/tu-usuario/proyecto-3",
    year: "[2025]",
    role: "[Backend]",
    category: "[CLI Tool]",
  },
];
