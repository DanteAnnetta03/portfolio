// The site's only legal use of red/orange/green: encoding a real state, never
// decoration. "Same color, same meaning everywhere" — this is the single
// source of truth other components must import instead of picking their own
// green/orange/red usage.
export type FunctionalStatus = "positive" | "attention" | "critical";

export const functionalStatusDotClass: Record<FunctionalStatus, string> = {
  positive: "bg-green",
  attention: "bg-orange",
  critical: "bg-red",
};

// Glow — the connecting thread between the glass-paneled live-data sectors
// and the rest of the (otherwise flat) site. Same meaning, same color, just
// a soft halo instead of a flat dot. Visual identity exploration, 2026-10-24.
export const functionalStatusGlowClass: Record<FunctionalStatus, string> = {
  positive: "glow-green",
  attention: "glow-orange",
  critical: "glow-red",
};
