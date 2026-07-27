"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { profile } from "@/data/profile";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between 2xl:max-w-[2368px]">
        <p className="text-ink-muted">
          © {year} {profile.name} — {t.footer.rights}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          {t.footer.builtWith}
        </p>
      </div>
    </footer>
  );
}
