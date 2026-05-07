import { SECTION_IDS } from "@/lib/constants"
import { writing } from "@/data/writing"
import { Reveal } from "@/components/ui/Reveal"
import { ExternalLink } from "@/components/ui/ExternalLink"

/**
 * Writing — editorial article list. Replaces the 3-card grid with a vertical
 * list where each entry reads like a journal entry: tag · title · excerpt · link.
 */
export function Writing() {
  return (
    <section id={SECTION_IDS.writing} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <header className="mb-16 grid gap-x-16 gap-y-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-text-muted/60" />
                05 — Writing & Thinking
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-section-m md:text-section-d font-medium leading-[1.05] tracking-[-0.02em] text-text-primary">
                Methods,<br />
                not hot takes.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={0.1}>
              <p className="text-[16px] leading-[1.65] text-text-secondary md:text-[17px]">
                Field notes from shipping AI products: workflows, evaluation loops, attribution playbooks, builder methodology.
              </p>
            </Reveal>
          </div>
        </header>

        <ul className="border-t border-border-subtle">
          {writing.map((w, i) => (
            <li key={w.id}>
              <Reveal delay={0.05 * i}>
                <article className="group grid grid-cols-1 gap-y-4 border-b border-border-subtle py-10 transition-colors duration-500 hover:border-border-active md:grid-cols-[12rem_minmax(0,1fr)_auto] md:items-baseline md:gap-x-12 md:py-12">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.24em] text-text-muted">
                    {w.tags.map((t, j) => (
                      <span key={t}>
                        {t}
                        {j < w.tags.length - 1 && <span className="ml-3 text-text-muted/40">·</span>}
                      </span>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.01em] text-text-primary transition-colors duration-300 group-hover:text-text-primary md:text-[28px]">
                      {w.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-text-secondary md:text-[16px]">
                      {w.excerpt}
                    </p>
                  </div>
                  <div className="text-[12px]">
                    {w.url ? (
                      <ExternalLink href={w.url}>Read</ExternalLink>
                    ) : (
                      <span className="font-mono uppercase tracking-[0.22em] text-text-muted">
                        Soon
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
