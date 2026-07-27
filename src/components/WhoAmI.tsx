"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";
import SectionHeading from "@/components/SectionHeading";

export default function WhoAmI() {
  const { locale, t } = useLanguage();

  const specs = [
    { label: t.whoami.specLocation, value: profile.location },
    { label: t.whoami.specFocus, value: profile.focus.join(" / ") },
    { label: t.whoami.specAvailability, value: profile.availability[locale] },
    { label: t.whoami.specLanguages, value: profile.languages[locale].join(" · ") },
  ];

  const stats = [
    { label: t.whoami.statProjects, value: String(projects.length).padStart(2, "0") },
    { label: t.whoami.statAchievements, value: String(achievements.length).padStart(2, "0") },
    { label: t.whoami.statYears, value: profile.yearsActive },
  ];

  return (
    <section id="whoami" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-20">
      <SectionHeading docId="01" title={t.whoami.heading} deck={t.whoami.deck} />

      {/* Below ~896px of *actual available width*: hero, then the spec/stats
          rail stacked beneath it (border-t). Past that: the rail moves beside
          the hero (border-l), so both are visible together without
          scrolling. This responds to this section's own container width
          (via @container), not the viewport — since page.tsx can place this
          section in a half-width column on very wide screens, where the
          viewport is wide but the actual space here isn't. */}
      <div className="mt-10 @container">
        <div className="@4xl:grid @4xl:grid-cols-[1fr_320px] @4xl:items-start @4xl:gap-16">
          <div className="grid gap-10 md:grid-cols-[160px_1fr] md:gap-14">
            <figure className="mx-auto w-32 shrink-0 md:mx-0 md:w-full">
              <div
                className={`aspect-square w-full border border-line bg-panel ${
                  profile.avatarUrl.endsWith(".svg") ? "" : "halftone-frame"
                }`}
              >
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                {t.whoami.figureCaption}
              </figcaption>
            </figure>

            <div className="flex flex-col gap-6">
              <p className="max-w-2xl leading-relaxed text-ink-muted">{profile.bio[locale]}</p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={profile.cvUrl[locale]}
                  download
                  className="border border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-85"
                >
                  {t.whoami.downloadCv}
                </a>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-colors hover:border-ink"
                >
                  GitHub
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-colors hover:border-ink"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.socials.email}
                  className="border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-colors hover:border-ink"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Technical sidebar (qualitative facts) + stats strip (quantitative facts). */}
          <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-2 md:gap-14 @4xl:mt-0 @4xl:grid-cols-1 @4xl:gap-10 @4xl:border-t-0 @4xl:border-l @4xl:pt-0 @4xl:pl-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                {t.whoami.specTitle}
              </p>
              <dl className="mt-3 divide-y divide-line border-y border-line">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-6 py-2.5">
                    <dt className="font-mono text-xs uppercase tracking-wide text-ink-muted">
                      {spec.label}
                    </dt>
                    <dd className="text-right text-sm text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                {t.whoami.statsTitle}
              </p>
              <div className="mt-3 grid grid-cols-3 divide-x divide-line border border-line @4xl:grid-cols-1 @4xl:divide-x-0 @4xl:divide-y">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-3 py-5 text-center @4xl:flex @4xl:items-baseline @4xl:justify-between @4xl:px-4 @4xl:py-3 @4xl:text-left"
                  >
                    <p className="font-mono text-2xl font-medium text-ink">{stat.value}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted @4xl:mt-0">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
