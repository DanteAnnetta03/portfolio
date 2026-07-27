"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useTheme } from "@/lib/theme/ThemeContext";
import { useDocControl } from "@/lib/docControl/DocControlContext";

const sections = [
  { href: "#whoami", index: "01", key: "whoami" as const },
  { href: "#achievements", index: "02", key: "achievements" as const },
  { href: "#projects", index: "03", key: "projects" as const },
];

export default function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { shortHash } = useDocControl();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-panel">
      <div className="mx-auto max-w-6xl px-6 2xl:max-w-[2368px]">
        <div className="flex items-center justify-between border-b border-line py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
          <span>{t.nav.brandName} — Technical Dossier</span>
          <span>Rev. {shortHash} · {locale.toUpperCase()}</span>
        </div>

        <nav className="flex items-center justify-between py-4">
          <a href="#hero" className="text-base font-medium tracking-tight text-ink">
            {t.nav.brandName}
          </a>

          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wide sm:flex">
              {sections.map((section) => (
                <li key={section.key}>
                  <a
                    href={section.href}
                    className="text-ink-muted transition-colors hover:text-ink"
                  >
                    <span className="text-blue">{section.index}</span> {t.nav[section.key]}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "light" ? t.theme.toggleDark : t.theme.toggleLight}
                className="border border-line bg-paper px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                {theme === "light" ? "Dark" : "Light"}
              </button>

              <button
                type="button"
                onClick={toggleLocale}
                aria-label="Toggle language"
                className="border border-line bg-paper px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                {locale === "es" ? "EN" : "ES"}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
