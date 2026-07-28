// Per-section reference: plain "DOC {id}" metadata. Not a link — the earlier
// click-through-to-commit easter egg was removed as an unwanted feature that
// added no real information for a reader (explicit decision, 2026-07-28).
export default function DocControl({
  id,
  className = "text-sm",
}: {
  id: string;
  className?: string;
}) {
  return <span className={`font-mono text-blue ${className}`}>DOC {id}</span>;
}
