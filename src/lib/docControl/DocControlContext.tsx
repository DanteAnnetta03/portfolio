"use client";

import { createContext, useContext } from "react";
import type { DocControl } from "./index";

const DocControlContext = createContext<DocControl | undefined>(undefined);

// Unlike Theme/Language, this value is resolved once server-side (it's the
// build's own git commit — nothing to persist or toggle client-side), so the
// provider is just a plain pass-through, no internal state.
export function DocControlProvider({
  value,
  children,
}: {
  value: DocControl;
  children: React.ReactNode;
}) {
  return <DocControlContext.Provider value={value}>{children}</DocControlContext.Provider>;
}

export function useDocControl() {
  const ctx = useContext(DocControlContext);
  if (!ctx) throw new Error("useDocControl must be used within a DocControlProvider");
  return ctx;
}
