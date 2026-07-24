"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { profile } from "@/data/profile";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-muted">
          © {year} {profile.name} — {t.footer.rights}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          Doc 01-A · Rev. 1.0 · {t.footer.builtWith}
        </p>
      </div>
    </footer>
  );
}
