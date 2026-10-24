"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import DocControl from "@/components/DocControl";
import VuMeter from "@/components/VuMeter";
import type { ContributionCalendar, ContributionDay } from "@/lib/github";

const WINDOW_WEEKS = 12;
const SEGMENTS = 10;

type WeekTotal = { total: number; weekStart: string };

// Agregado por semana, no por día — a granularidad diaria, 14 columnas caen
// casi todas en 0 para un patrón de commits bursty (días sueltos activos,
// la mayoría en cero), que es exactamente lo que mostró el primer intento.
// Sumando los 7 días de cada semana se suaviza esa dispersión sin inventar
// nada: sigue siendo la cuenta real, solo con mejor granularidad para un
// instrumento de pocas columnas. calendar.weeks ya viene agrupado así.
function recentWeekTotals(calendar: ContributionCalendar, windowWeeks: number): WeekTotal[] {
  return calendar.weeks.slice(-windowWeeks).map((week) => ({
    total: week.reduce((sum: number, d: ContributionDay) => sum + d.count, 0),
    weekStart: week[0]?.date ?? "",
  }));
}

// Relativo al máximo de la ventana — con totales semanales (no diarios) una
// semana sin ningún commit es información real ("semana floja"), no un
// artefacto de ventana angosta.
function litSegments(weeks: WeekTotal[]): number[] {
  const max = Math.max(1, ...weeks.map((w) => w.total));
  return weeks.map((w) => (w.total === 0 ? 0 : Math.max(1, Math.round((w.total / max) * SEGMENTS))));
}

// Insight sector — DOC 02. Sits between "Sobre mí" (01) and "Logros" (03).
// Insight sectors viven en vidrio (.glass-panel) e intercalados entre
// secciones narrativas, nunca dos seguidos — ver skill §4 y §6.
//
// Fetched client-side, on every visit — este fetch sigue traendo el año
// completo de datos (misma API, sin cambios), pero desde el refactor visual
// de 2026-10-24 solo se visualizan las últimas WINDOW_WEEKS semanas como VU
// meter — ver skill §7. Se probaron antes 14 días a granularidad diaria
// (demasiado disperso, casi todo apagado) y el `level` por día (seguía
// disperso): la agregación semanal fue lo que finalmente dio variación real.
export default function GithubActivity() {
  const { t } = useLanguage();
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github/contributions", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { calendar: ContributionCalendar | null }) => {
        if (cancelled) return;
        if (!data.calendar || data.calendar.weeks.length === 0) {
          setStatus("error");
          return;
        }
        setCalendar(data.calendar);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "error") return null;

  const weeks = calendar ? recentWeekTotals(calendar, WINDOW_WEEKS) : [];
  const values = litSegments(weeks);
  const titles = weeks.map((w) => `${w.total} ${t.github.contributions} — ${w.weekStart}`);

  return (
    <section id="github-activity" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-20">
      {/* Vidrio — reservado a sectores de datos en vivo, ver skill §4. */}
      <div className="glass-panel">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-6 py-4 sm:px-8">
          <div className="flex items-baseline gap-x-4">
            <DocControl id="02" />
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              {t.github.heading}
            </p>
          </div>
          <p className="font-mono text-xs text-ink-muted">
            {calendar ? (
              <>
                <span className="text-sm text-ink">{calendar.totalContributions}</span>{" "}
                {t.github.contributions} · {t.github.totalSuffix}
              </>
            ) : (
              "—"
            )}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{t.github.deck}</p>

          {!calendar ? (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              {t.github.syncing}
            </p>
          ) : (
            <div className="mt-6 transition-opacity duration-300">
              <VuMeter values={values} titles={titles} className="h-36 max-w-2xl" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                {t.github.perWeekCaption} · {t.github.recentWindow}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
