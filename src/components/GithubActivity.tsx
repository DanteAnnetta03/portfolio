"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import DocControl from "@/components/DocControl";
import VuMeter from "@/components/VuMeter";
import type { ContributionCalendar, ContributionDay } from "@/lib/github";

const WINDOW_DAYS = 14;
const SEGMENTS = 10;

// Días reales más recientes, no inventados — toma los últimos N días de la
// misma respuesta de la API que antes alimentaba la grilla (calendar.weeks
// ya viene en orden cronológico, semana por semana, día por día).
function recentDays(calendar: ContributionCalendar, windowDays: number): ContributionDay[] {
  return calendar.weeks.flat().slice(-windowDays);
}

// Normaliza cada día contra el máximo de la ventana — un día con actividad
// real nunca queda en 0 segmentos (se ve apagado del todo = "sin actividad",
// que es distinto de "poca actividad").
function litSegments(days: ContributionDay[]): number[] {
  const max = Math.max(1, ...days.map((d) => d.count));
  return days.map((d) => (d.count === 0 ? 0 : Math.max(1, Math.round((d.count / max) * SEGMENTS))));
}

// Insight sector — DOC 02. Sits between "Sobre mí" (01) and "Logros" (03).
// Insight sectors viven en vidrio (.glass-panel) e intercalados entre
// secciones narrativas, nunca dos seguidos — ver skill §4 y §6.
//
// Fetched client-side, on every visit — este fetch sigue traendo el año
// completo de datos (misma API, sin cambios), pero desde el refactor visual
// de 2026-10-24 solo se visualizan los últimos WINDOW_DAYS días como VU
// meter — ver skill §7 para el porqué (la grilla semana×día no se
// reemplazaba bien por un VU meter de pocas columnas sin perder
// información; se optó por mostrar la ventana reciente como instrumento en
// vez de forzar 365 días en 10-14 columnas).
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

  const days = calendar ? recentDays(calendar, WINDOW_DAYS) : [];
  const values = litSegments(days);
  const titles = days.map((d) => `${d.count} ${t.github.contributions} — ${d.date}`);

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
                {t.github.perDayCaption} · {t.github.recentWindow}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
