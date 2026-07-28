"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import DocControl from "@/components/DocControl";
import type { ContributionCalendar, ContributionLevel } from "@/lib/github";

const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: "bg-panel-2",
  1: "bg-green/25",
  2: "bg-green/50",
  3: "bg-green/75",
  4: "bg-green",
};

const CELL = 10;
const GAP = 3;

// 2023-01-01 is a Sunday — used purely as a reference date to resolve a
// locale-correct short weekday label for a given day-of-week index (0=Sun).
function shortWeekday(locale: string, dayIndex: number): string {
  const reference = new Date(Date.UTC(2023, 0, 1 + dayIndex));
  return new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(reference);
}

function shortMonth(locale: string, date: Date): string {
  return new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" }).format(date);
}

// Insight sector — DOC 02. Sits between "Sobre mí" (01) and "Logros" (now
// 03, shifted up since this took a full sequential number instead of a
// sub-letter). Insight sectors are framed (full 1px border) and intercalated
// between narrative sections, never stacked with another insight back to
// back — see skill §7.
//
// Fetched client-side, on every visit — this is meant to read as genuinely
// live, not a value baked in at the last deploy. The token stays server-side
// (src/lib/github, called only from the API route); this component only
// ever sees the resulting JSON. The frame (DocControl, heading, deck) mounts
// immediately so the section never appears/disappears/shifts layout once
// hydrated — only the total and the grid swap in when the fetch resolves.
export default function GithubActivity() {
  const { locale, t } = useLanguage();
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

  const intlLocale = locale === "es" ? "es-AR" : "en-US";

  // Skip a label if it would land within 2 columns of the previous one — the
  // calendar's first week is often a partial month (just a day or two before
  // flipping), which without this would collide with the label right after it.
  const monthLabels: { weekIndex: number; label: string }[] = [];
  let lastMonth = -1;
  let lastLabelWeekIndex = -Infinity;
  calendar?.weeks.forEach((week, weekIndex) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const date = new Date(`${firstDay.date}T00:00:00Z`);
    const month = date.getUTCMonth();
    if (month === lastMonth) return;
    lastMonth = month;
    if (weekIndex - lastLabelWeekIndex < 2) return;
    monthLabels.push({ weekIndex, label: shortMonth(intlLocale, date) });
    lastLabelWeekIndex = weekIndex;
  });

  const dayLabels = [0, 1, 2, 3, 4, 5, 6].map((dayIndex) =>
    dayIndex === 1 || dayIndex === 3 || dayIndex === 5 ? shortWeekday(intlLocale, dayIndex) : ""
  );

  return (
    <section id="github-activity" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-20">
      <div className="border border-line bg-panel">
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
            <div className="transition-opacity duration-300">
              <div className="mt-6 overflow-x-auto">
                <div
                  className="grid w-fit gap-[3px]"
                  style={{
                    gridTemplateColumns: `24px repeat(${calendar.weeks.length}, ${CELL}px)`,
                    gridTemplateRows: `14px repeat(7, ${CELL}px)`,
                    gap: `${GAP}px`,
                  }}
                >
                  {monthLabels.map(({ weekIndex, label }) => (
                    <div
                      key={`${label}-${weekIndex}`}
                      style={{ gridColumn: weekIndex + 2, gridRow: 1 }}
                      className="font-mono text-[9px] uppercase tracking-wide text-ink-muted"
                    >
                      {label}
                    </div>
                  ))}

                  {dayLabels.map((label, dayIndex) => (
                    <div
                      key={dayIndex}
                      style={{ gridColumn: 1, gridRow: dayIndex + 2 }}
                      className="pr-1 text-right font-mono text-[9px] leading-none text-ink-muted"
                    >
                      {label}
                    </div>
                  ))}

                  {calendar.weeks.map((week, weekIndex) =>
                    week.map((day, dayIndex) => (
                      <div
                        key={day.date}
                        style={{ gridColumn: weekIndex + 2, gridRow: dayIndex + 2 }}
                        title={`${day.count} ${t.github.contributions} — ${day.date}`}
                        className={LEVEL_CLASS[day.level]}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                <span>{t.github.less}</span>
                {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
                  <span key={level} className={`h-2.5 w-2.5 ${LEVEL_CLASS[level]}`} />
                ))}
                <span>{t.github.more}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
