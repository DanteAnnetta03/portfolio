"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects, type Project } from "@/data/projects";
import SectionHeading from "@/components/SectionHeading";
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

  const featured = projects[0];
  const featuredMeta = featured ? buildMeta(featured, t) : [];

  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl scroll-mt-24 border-t border-line px-6 py-16 md:py-20"
    >
      <SectionHeading index="03" title={t.projects.heading} deck={t.projects.deck} />

      {/* Comparison table — scan all entries at a glance. */}
      <p className="mt-10 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
        {t.projects.overviewTitle}
      </p>
      <div className="mt-3 overflow-x-auto border border-line">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-panel-2 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">{t.projects.tableRef}</th>
              <th className="px-4 py-3 font-medium">{t.projects.tableProject}</th>
              <th className="px-4 py-3 font-medium">{t.projects.metaStatus}</th>
              <th className="px-4 py-3 font-medium">{t.projects.metaYear}</th>
              <th className="px-4 py-3 font-medium">{t.projects.metaStack}</th>
              <th className="px-4 py-3 font-medium">{t.projects.metaCategory}</th>
              <th className="px-4 py-3 font-medium">{t.projects.tableLinks}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr
                key={p.id}
                className="border-b border-line transition-colors last:border-b-0 hover:bg-panel-2"
              >
                <td className="px-4 py-3 font-mono text-xs text-blue">
                  P.{String(i + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3 font-medium text-ink">{p.title}</td>
                <td className="px-4 py-3 text-ink-muted">
                  {p.inProgress ? t.projects.inProgress : t.projects.completed}
                </td>
                <td className="px-4 py-3 font-mono text-ink-muted">{p.year ?? "—"}</td>
                <td className="px-4 py-3 text-ink-muted">{p.tags.join(" / ")}</td>
                <td className="px-4 py-3 text-ink-muted">{p.category ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3 font-mono text-xs uppercase tracking-wide">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue transition-colors hover:text-ink"
                      >
                        {t.projects.liveDemo}
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue transition-colors hover:text-ink"
                      >
                        {t.projects.sourceCode}
                      </a>
                    )}
                    {!p.liveUrl && !p.repoUrl && <span className="text-ink-muted">—</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Featured deep-dive — the first entry gets the full treatment. */}
      {featured && (
        <div className="mt-12 border border-line bg-panel">
          <div className="border-b border-line px-6 py-4 sm:px-8">
            <p className="font-mono text-[11px] uppercase tracking-wide text-blue">
              {t.projects.featuredLabel}
            </p>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-6">
              <figure>
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  width={640}
                  height={360}
                  className="h-56 w-full border border-line object-cover sm:h-64"
                />
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
                <h3 className="text-xl font-semibold text-ink">{featured.title}</h3>
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
                {featuredMeta.map((entry) => (
                  <div key={entry.label}>
                    <dt className="uppercase tracking-wide text-ink-muted">{entry.label}</dt>
                    <dd className="mt-0.5 text-ink">{entry.value}</dd>
                  </div>
                ))}
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
