"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import DocControl from "@/components/DocControl";
import type { StackFrequency as StackFrequencyData } from "@/lib/github";

// Insight sector — DOC 05. Sits inside the right column, directly below
// "Proyectos" (04) and its featured deep-dive (04-A) — same column, not a
// separate full-width slot. Fetched client-side on every visit, same live
// pattern as DOC 02 (GithubActivity) — see src/lib/github's
// getStackFrequency for how the score per technology is computed.
export default function StackFrequency() {
  const { t } = useLanguage();
  const [stack, setStack] = useState<StackFrequencyData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github/stack", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { stack: StackFrequencyData | null }) => {
        if (cancelled) return;
        if (!data.stack || data.stack.technologies.length === 0) {
          setStatus("error");
          return;
        }
        setStack(data.stack);
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

  return (
    <section
      id="stack-frequency"
      className="mx-auto max-w-6xl scroll-mt-24 border-t border-line px-6 py-16 md:py-20"
    >
      <div className="border border-line bg-panel">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-6 py-4 sm:px-8">
          <div className="flex items-baseline gap-x-4">
            <DocControl id="05" />
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              {t.stack.heading}
            </p>
          </div>
          <p className="font-mono text-xs text-ink-muted">
            {stack ? (
              <>
                <span className="text-sm text-ink">{stack.repositoryCount}</span>{" "}
                {t.stack.repositories} · {t.stack.totalSuffix}
              </>
            ) : (
              "—"
            )}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{t.stack.deck}</p>

          {!stack ? (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              {t.stack.syncing}
            </p>
          ) : (
            <div className="mt-6 flex max-w-2xl flex-col gap-3">
              {stack.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="grid grid-cols-[88px_1fr_28px] items-center gap-3 sm:grid-cols-[120px_1fr_28px]"
                >
                  <span className="truncate font-mono text-xs text-ink-muted">{tech.name}</span>
                  <div className="h-2 w-full bg-panel-2">
                    <div className="h-full bg-blue" style={{ width: `${tech.score}%` }} />
                  </div>
                  <span className="text-right font-mono text-[10px] text-ink-muted">
                    {tech.score}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
