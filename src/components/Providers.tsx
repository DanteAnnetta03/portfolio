"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { DocControlProvider } from "@/lib/docControl/DocControlContext";
import type { DocControl } from "@/lib/docControl";

export default function Providers({
  docControl,
  children,
}: {
  docControl: DocControl;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DocControlProvider value={docControl}>{children}</DocControlProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
