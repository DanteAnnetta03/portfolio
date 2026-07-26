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
    id: "01",
    title: {
      es: "QuantumJam y Qiskit Fall Fest 2025",
      en: "QuantumJam & Qiskit Fall Fest 2025",
    },
    description: {
      es: "Participé en las primeras dos competencias de Computación Cuántica que se realizaron en Argentia. Comencé mi formación en esta área meses antes de la primera competencia y es al día de hoy que sigo aprendiendo por mi cuenta.",
      en: "I participated in the first two quantum computing competitions held in Argentina. I began my training in this field months before the first competition, and to this day, I continue to learn on my own.",
    },
    date: "2025",
  },
  {
    id: "02",
    title: {
      es: "Hacklab 2025",
      en: "Hacklab 2025",
    },
    description: {
      es: "Junto com mi equipo, participé de una serie de desafíos del tipo CTF en donde logramos estar en el top 26%.",
      en: "Together with my team, I participated in a series of CTF-style challenges, where we managed to rank in the top 26%.",
    },
    date: "2025",
  },
  {
    id: "03",
    title: {
      es: "HackITBA 2026",
      en: "HackITBA 2026",
    },
    description: {
      es: "Obtuve el cuarto puesto en la categoría de Marketing y Crecimiento (undécimo lugar en la clasificación general) en el Hackathon del ITBA, compitiendo contra más de 200 participantes. El equipo se desenvolvió con éxito en la competición y logró una posición destacada.",
      en: "I secured fourth place in the Marketing and Growth category (eleventh place overall) at the ITBA Hackathon, competing against more than 200 participants. The team performed successfully in the competition and achieved a notable ranking.",
    },
    date: "2026",
  },
];
