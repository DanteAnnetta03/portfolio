"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDocControl } from "@/lib/docControl/DocControlContext";
import DocControl from "@/components/DocControl";
import { profile } from "@/data/profile";

// The cover page: a technical-drawing title block, not a "hero banner" — the
// only place on the site with the one deliberate large type jump. No photo
// here (Sobre mí owns the sole profile photo, see WhoAmI.tsx); this is
// identification metadata only, same as the corner block of a real blueprint.
export default function Hero() {
  const { locale, t } = useLanguage();
  const { commitDate } = useDocControl();

  const formattedDate = new Intl.DateTimeFormat(locale === "es" ? "es-AR" : "en-US", {
    year: "numeric",
    month: "short",
  }).format(new Date(commitDate));

  const metadata = [
    { label: t.hero.scale, value: "1:1" },
    { label: t.hero.date, value: formattedDate },
    { label: t.hero.sheet, value: "1/1" },
  ];

  return (
    <section
      id="hero"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-20 2xl:max-w-[2368px] 2xl:grid 2xl:grid-cols-2 2xl:gap-x-8"
    >
      {/* Below 2xl: a standalone centered block, like every other section.
          At 2xl+: this sits in the grid's first cell only (nothing in the
          second), so its left edge lines up with the left column below
          instead of floating centered across the full two-column width. */}
      <div className="border border-line p-8 sm:p-10">
        <div className="border-b border-line pb-4">
          <DocControl id="00" />
        </div>

        <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div>
            <h1 className="text-4xl font-medium text-ink md:text-5xl">{profile.name}</h1>
            <p className="mt-3 font-mono text-sm uppercase tracking-wide text-blue">
              {profile.role[locale]}
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-x-6 gap-y-2 font-mono text-xs md:shrink-0 md:text-right">
            {metadata.map((entry) => (
              <div key={entry.label}>
                <dt className="uppercase tracking-wide text-ink-muted">{entry.label}</dt>
                <dd className="mt-1 text-ink">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
