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
