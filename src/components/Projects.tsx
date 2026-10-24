"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects, type Project } from "@/data/projects";
import SectionHeading from "@/components/SectionHeading";
import DocControl from "@/components/DocControl";
import Viewfinder from "@/components/Viewfinder";
import { functionalStatusDotClass, functionalStatusGlowClass } from "@/lib/functionalColor";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function buildMeta(project: Project, t: Dictionary) {
  const entries: { label: string; value: string }[] = [
    {
      label: t.projects.metaStatus,
      value: project.inProgress ? t.projects.inProgress : t.projects.completed,
    },
  ];

  if (project.year) entries.push({ label: t.projects.metaYear, value: project.year });
  if (project.role) entries.push({ label: t.projects.metaRole, value: project.role });
  entries.push({ label: t.projects.metaStack, value: project.tags.join(" / ") });
  if (project.version) entries.push({ label: t.projects.metaVersion, value: project.version });
  if (project.lastUpdate)
    entries.push({ label: t.projects.metaLastUpdate, value: project.lastUpdate });
  if (project.category) entries.push({ label: t.projects.metaCategory, value: project.category });

  return entries;
}

export default function Projects() {
  const { locale, t } = useLanguage();

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const featuredMeta = featured ? buildMeta(featured, t) : [];

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 border-t border-line px-6 py-16 md:py-20 2xl:border-t-0"
    >
      <SectionHeading docId="04" title={t.projects.heading} deck={t.projects.deck} />

      {/* Comparison — "ledger" record format: name + a single metadata line
          below it, instead of a grid table. Same fields as before (status,
          year, stack, category, links), just reflowed — visual identity
          exploration, 2026-10-24. */}
      <p className="mt-10 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
        {t.projects.overviewTitle}
      </p>
      <div className="mt-3">
        {projects.map((p) => {
          const status: "attention" | "positive" = p.inProgress ? "attention" : "positive";
          return (
            <div key={p.id} className="border-b border-line py-4 last:border-b-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span
                  className={`text-lg font-medium text-ink ${
                    p.id === featured?.id ? "border-l-2 border-l-blue pl-3" : ""
                  }`}
                >
                  {p.title}
                </span>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-ink-muted">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${functionalStatusDotClass[status]} ${functionalStatusGlowClass[status]}`}
                  />
                  {p.inProgress ? t.projects.inProgress : t.projects.completed}
                </span>
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-muted">
                <span>{p.tags.join(" / ")}</span>
                {p.category && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      <span className="glow-blue inline-block h-1.5 w-1.5 rounded-full bg-blue" />
                      {p.category}
                    </span>
                  </>
                )}
                {p.year && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{p.year}</span>
                  </>
                )}
              </div>

              {(p.liveUrl || p.repoUrl) && (
                <div className="mt-2 flex gap-5 font-mono text-xs uppercase tracking-wide">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue transition-colors hover:text-ink"
                    >
                      → {t.projects.liveDemo}
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue transition-colors hover:text-ink"
                    >
                      → {t.projects.sourceCode}
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Featured deep-dive — the first entry gets the full treatment. */}
      {featured && (
        <div className="mt-12 border border-line bg-panel">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-6 py-4 sm:px-8">
            <p className="font-mono text-[11px] uppercase tracking-wide text-blue">
              {t.projects.featuredLabel}
            </p>
            <DocControl id="04-A" className="text-[11px] uppercase tracking-wide" />
          </div>

          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-6">
              <figure>
                <div className="h-56 w-full border border-line sm:h-64">
                  {featured.imageUrl.endsWith(".svg") ? (
                    <Image
                      src={featured.imageUrl}
                      alt={featured.title}
                      width={640}
                      height={360}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    // blurPx=0 — esto es una captura de UI con texto chico,
                    // no una foto; el blur ahí perjudica legibilidad real en
                    // vez de evocar óptica suave (ver Viewfinder.tsx).
                    <Viewfinder className="h-full w-full" blurPx={0}>
                      <Image
                        src={featured.imageUrl}
                        alt={featured.title}
                        width={640}
                        height={360}
                        className="h-full w-full object-cover"
                      />
                    </Viewfinder>
                  )}
                </div>
                <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                  {t.projects.figureCaptionPrefix} {featured.title}
                </figcaption>
              </figure>

              {featured.architecture && (
                <div className="border border-line bg-panel-2 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                    {t.projects.architectureLabel}
                  </p>
                  <div className="mt-4 flex flex-col items-stretch">
                    {featured.architecture.map((layer, i) => (
                      <div key={`${layer}-${i}`}>
                        <div className="border border-line bg-paper px-4 py-2.5 text-center font-mono text-xs text-ink">
                          {layer}
                        </div>
                        {i < featured.architecture!.length - 1 && (
                          <div className="py-1 text-center font-mono text-xs text-ink-muted">↓</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-xl font-medium text-ink">{featured.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  {featured.description[locale]}
                </p>
              </div>

              {featured.note && (
                <div className="border-l-2 border-blue bg-panel-2 py-3 pl-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-blue">
                    {t.projects.noteLabel}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {featured.note[locale]}
                  </p>
                </div>
              )}

              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-4 font-mono text-xs">
                {featuredMeta.map((entry) => {
                  const isStatus = entry.label === t.projects.metaStatus;
                  const isCategory = entry.label === t.projects.metaCategory;
                  const statusKind: "attention" | "positive" = featured.inProgress
                    ? "attention"
                    : "positive";
                  return (
                    <div key={entry.label}>
                      <dt className="uppercase tracking-wide text-ink-muted">{entry.label}</dt>
                      <dd className="mt-0.5 flex items-center gap-2 text-ink">
                        {isStatus && (
                          <span
                            className={`inline-block h-1.5 w-1.5 rounded-full ${functionalStatusDotClass[statusKind]} ${functionalStatusGlowClass[statusKind]}`}
                          />
                        )}
                        {isCategory && (
                          <span className="glow-blue inline-block h-1.5 w-1.5 rounded-full bg-blue" />
                        )}
                        {entry.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <div className="mt-1 flex gap-5 font-mono text-xs uppercase tracking-wide">
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue transition-colors hover:text-ink"
                  >
                    → {t.projects.liveDemo}
                  </a>
                )}
                {featured.repoUrl && (
                  <a
                    href={featured.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue transition-colors hover:text-ink"
                  >
                    → {t.projects.sourceCode}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
