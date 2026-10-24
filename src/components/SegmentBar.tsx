// Replaces the solid-fill bar in StackFrequency (DOC 05) — visual identity
// exploration, 2026-10-24. Reads as a hardware level-meter ladder: lit
// segments carry the value, unlit segments stay visible (low opacity) rather
// than disappearing, so the full scale of the instrument is always legible,
// not just the current reading.
export default function SegmentBar({
  value,
  segments = 20,
  className = "",
}: {
  value: number;
  segments?: number;
  className?: string;
}) {
  const lit = Math.round((value / 100) * segments);

  return (
    <div className={`flex gap-[2px] ${className}`}>
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={`h-2 flex-1 ${i < lit ? "bg-blue" : "bg-blue/15"}`} />
      ))}
    </div>
  );
}
