"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { achievements } from "@/data/achievements";
import SectionHeading from "@/components/SectionHeading";

export default function Achievements() {
  const { locale, t } = useLanguage();

  return (
    <section
      id="achievements"
      className="mx-auto max-w-5xl scroll-mt-24 border-t border-line px-6 py-16 md:py-20"
    >
      <SectionHeading index="02" title={t.achievements.heading} deck={t.achievements.deck} />

      <ol className="mt-12 border-l border-line">
        {achievements.map((achievement, i) => (
          <li key={achievement.id} className="relative pb-10 pl-8 last:pb-0">
            <span className="absolute top-1.5 left-0 h-2 w-2 -translate-x-1/2 border border-blue bg-paper" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-xs uppercase tracking-wide text-ink-muted">
                {achievement.date}
              </span>
            </div>
            <h3 className="mt-1.5 font-semibold text-ink">{achievement.title[locale]}</h3>
            <p className="mt-1 leading-relaxed text-ink-muted">{achievement.description[locale]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
