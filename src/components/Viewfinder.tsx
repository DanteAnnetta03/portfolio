// Replaces the halftone/retinado treatment on photographic images (profile
// photo, project figures) — visual identity exploration, 2026-10-24.
// Reference: consumer digicams ~2000-2002 (Minolta, Olympus, Fujifilm) framed
// their viewfinder/LCD with AF corner brackets and a green/orange status LED
// (focus locked / flash charging) — the same green/orange the site already
// uses for status elsewhere, read here as "ready" rather than reinvented.
//
// Frames the image instead of filtering it: the previous dot overlay sat on
// top of the pixels and read as noise at typical web size. This wraps the
// photo in UI chrome instead, so detail stays legible.
export default function Viewfinder({
  children,
  className = "",
  showIndicator = true,
}: {
  children: React.ReactNode;
  className?: string;
  showIndicator?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Subtle soft-optics blur — period-accurate CCD softness, not a visible
          effect. Scaled up slightly so the blur never reveals a transparent
          sliver at the clipped edge. */}
      <div className="absolute inset-0 scale-[1.02]" style={{ filter: "blur(0.35px)" }}>
        {children}
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full text-blue"
        aria-hidden="true"
      >
        <polyline
          points="6,16 6,6 16,6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points="84,6 94,6 94,16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points="6,84 6,94 16,94"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points="94,84 94,94 84,94"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {showIndicator && (
        <span className="glow-green absolute right-2 bottom-2 h-1.5 w-1.5 rounded-full bg-green" />
      )}
    </div>
  );
}
