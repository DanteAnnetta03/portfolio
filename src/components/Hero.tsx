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

  return (
    // "mx-auto" must never sit directly on a flex item (this section is a
    // child of page.tsx's flex-col wrapper): auto cross-axis margins disable
    // flexbox's default stretch, so the item would shrink-to-fit its own
    // content instead of filling up to max-w-2368px — with Hero's sparse
    // content that produced a narrower, off-center box. Centering lives on
    // an inner, non-flex-item div instead (same split Navbar/Footer use).
    <section id="hero" className="scroll-mt-24">
      <div className="2xl:mx-auto 2xl:grid 2xl:max-w-[2368px] 2xl:grid-cols-2 2xl:gap-x-8">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
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

              <dl className="font-mono text-xs md:shrink-0 md:text-right">
                <dt className="uppercase tracking-wide text-ink-muted">{t.hero.date}</dt>
                <dd className="mt-1 text-ink">{formattedDate}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
