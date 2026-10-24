// VU meter — codificación de magnitud para DOC 02 (actividad de GitHub),
// reemplaza la grilla de calendario. Refactor 2026-10-24, acorde a la
// Iteración 4 explorada en canvas: columnas de 10 segmentos, verde→naranja→
// rojo por posición (igual semántica que el resto del sitio — ver
// functionalColor.ts), segmentos apagados visibles (15% de opacidad) en vez
// de invisibles, para que se vea la escala completa del instrumento.
const SEGMENTS = 10;

// Posición 1 = segmento más bajo de la columna. Mismo corte 6/8/10 que se
// validó en la exploración: 6 verdes, 2 naranjas, 2 rojos.
const TIERS = [
  { lit: "bg-green glow-green", dim: "bg-green/15" },
  { lit: "bg-orange glow-orange", dim: "bg-orange/15" },
  { lit: "bg-red glow-red", dim: "bg-red/15" },
] as const;

function tierForPosition(positionFromBottom: number) {
  if (positionFromBottom <= 6) return TIERS[0];
  if (positionFromBottom <= 8) return TIERS[1];
  return TIERS[2];
}

export default function VuMeter({
  values,
  titles,
  className = "",
}: {
  /** Segmentos prendidos por columna, 0-10. */
  values: number[];
  /** Tooltip opcional por columna (ej. fecha y conteo real). */
  titles?: string[];
  className?: string;
}) {
  return (
    <div className={`flex items-stretch gap-1.5 bg-[#0c1416] p-4 ${className}`}>
      {values.map((lit, barIndex) => (
        <div
          key={barIndex}
          title={titles?.[barIndex]}
          className="flex flex-1 flex-col gap-[2px]"
        >
          {Array.from({ length: SEGMENTS }, (_, i) => {
            const positionFromBottom = SEGMENTS - i;
            const isLit = positionFromBottom <= lit;
            const tier = tierForPosition(positionFromBottom);
            return <span key={i} className={`flex-1 ${isLit ? tier.lit : tier.dim}`} />;
          })}
        </div>
      ))}
    </div>
  );
}
