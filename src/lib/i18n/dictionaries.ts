export type Locale = "es" | "en";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

// UI copy that isn't part of the editable "content" data files.
// Edit the strings here to change fixed labels across the site.
export const dictionaries = {
  es: {
    nav: {
      whoami: "Sobre mí",
      achievements: "Logros",
      projects: "Proyectos",
      brandName: "Dante Annetta",
    },
    hero: {
      scale: "Escala",
      date: "Fecha",
      sheet: "Hoja",
    },
    whoami: {
      heading: "Sobre mí",
      deck: "Perfil técnico y datos de contacto.",
      downloadCv: "Descargar CV",
      specTitle: "Ficha técnica",
      specLocation: "Ubicación",
      specFocus: "Foco",
      specAvailability: "Disponibilidad",
      specLanguages: "Idiomas",
      statsTitle: "En cifras",
      statProjects: "Proyectos",
      statAchievements: "Logros",
      statYears: "Años activo",
      figureCaption: "Fig. 01 — Fotografía o ilustración de perfil.",
    },
    achievements: {
      heading: "Logros",
      deck: "Registro cronológico de hitos relevantes.",
    },
    projects: {
      heading: "Proyectos",
      deck: "Resumen comparativo y desarrollo en profundidad de un caso seleccionado.",
      liveDemo: "Ver demo",
      sourceCode: "Código fuente",
      inProgress: "En desarrollo",
      completed: "Finalizado",
      metaStatus: "Estado",
      metaYear: "Año",
      metaRole: "Rol",
      metaStack: "Stack",
      metaVersion: "Versión",
      metaLastUpdate: "Última actualización",
      metaCategory: "Categoría",
      overviewTitle: "Resumen comparativo",
      tableProject: "Proyecto",
      tableLinks: "Enlaces",
      featuredLabel: "Proyecto destacado",
      architectureLabel: "Arquitectura",
      noteLabel: "Nota técnica",
      figureCaptionPrefix: "Fig. 02 —",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      builtWith: "Hecho con Next.js y Tailwind CSS.",
    },
    theme: {
      toggleLight: "Cambiar a modo claro",
      toggleDark: "Cambiar a modo oscuro",
    },
  },
  en: {
    nav: {
      whoami: "About me",
      achievements: "Achievements",
      projects: "Projects",
      brandName: "Dante Annetta",
    },
    hero: {
      scale: "Scale",
      date: "Date",
      sheet: "Sheet",
    },
    whoami: {
      heading: "About me",
      deck: "Technical profile and contact information.",
      downloadCv: "Download CV",
      specTitle: "Technical profile",
      specLocation: "Location",
      specFocus: "Focus",
      specAvailability: "Availability",
      specLanguages: "Languages",
      statsTitle: "By the numbers",
      statProjects: "Projects",
      statAchievements: "Achievements",
      statYears: "Years active",
      figureCaption: "Fig. 01 — Profile photo or illustration.",
    },
    achievements: {
      heading: "Achievements",
      deck: "Chronological record of key milestones.",
    },
    projects: {
      heading: "Projects",
      deck: "Comparative overview and an in-depth look at one selected case.",
      liveDemo: "Live demo",
      sourceCode: "Source code",
      inProgress: "In progress",
      completed: "Completed",
      metaStatus: "Status",
      metaYear: "Year",
      metaRole: "Role",
      metaStack: "Stack",
      metaVersion: "Version",
      metaLastUpdate: "Last update",
      metaCategory: "Category",
      overviewTitle: "Comparative overview",
      tableProject: "Project",
      tableLinks: "Links",
      featuredLabel: "Featured project",
      architectureLabel: "Architecture",
      noteLabel: "Engineering note",
      figureCaptionPrefix: "Fig. 02 —",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with Next.js and Tailwind CSS.",
    },
    theme: {
      toggleLight: "Switch to light mode",
      toggleDark: "Switch to dark mode",
    },
  },
} as const;

export type Dictionary = {
  [K in keyof (typeof dictionaries)["es"]]: {
    [P in keyof (typeof dictionaries)["es"][K]]: string;
  };
};
