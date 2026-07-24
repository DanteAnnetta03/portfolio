// EDITA ESTE ARCHIVO para agregar/quitar/modificar tus logros.
// EDIT THIS FILE to add/remove/edit your achievements.

export type Achievement = {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  date: string; // ej: "2025", "Marzo 2025"
};

export const achievements: Achievement[] = [
  {
    id: "achievement-1",
    title: { es: "[Título del logro 1]", en: "[Achievement 1 title]" },
    description: {
      es: "[Descripción breve: qué lograste, dónde y por qué es relevante.]",
      en: "[Short description: what you achieved, where, and why it matters.]",
    },
    date: "[Fecha / Date]",
  },
  {
    id: "achievement-2",
    title: { es: "[Título del logro 2]", en: "[Achievement 2 title]" },
    description: {
      es: "[Descripción breve del segundo logro.]",
      en: "[Short description of the second achievement.]",
    },
    date: "[Fecha / Date]",
  },
  {
    id: "achievement-3",
    title: { es: "[Título del logro 3]", en: "[Achievement 3 title]" },
    description: {
      es: "[Descripción breve del tercer logro.]",
      en: "[Short description of the third achievement.]",
    },
    date: "[Fecha / Date]",
  },
];
