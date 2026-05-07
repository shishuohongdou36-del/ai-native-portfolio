import { SECTION_IDS } from "@/lib/constants"
import { methodology } from "@/data/methodology"
import { Reveal } from "@/components/ui/Reveal"

/**
 * Methodology — single-column editorial list with display numerals.
 * Reads as a sequenced manifesto. The order matters more than any single step,
 * so we render it vertically and let typography carry the weight.
 */
export function Methodology() {
  return (
    <section id={SECTION_IDS.methodology} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <header className="mb-16 grid gap-x-16 gap-y-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-text-muted/60" />
                04 — Methodology
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-section-m md:text-section-d font-medium leading-[1.05] tracking-[-0.02em] text-text-primary">
                From ambiguity<br />
                to product.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-[16px] leading-[1.65] text-text-secondary md:text-[17px]">
                Six ordered moves I run every time, regardless of domain. The order matters more than any single step — skip one and the rest leak.
              </p>
            </Reveal>
          </div>
        </header>

        <ol className="border-t border-border-subtle">
          {methodology.map((m, i) => (
            <li key={m.step} className="group">
              <Reveal delay={0.05 * i}>
                <div className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-border-subtle py-10 transition-colors duration-500 hover:border-border-active md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1.5fr)] md:gap-x-16 md:py-14">
                  <span className="font-display text-[clamp(48px,7vw,84px)] font-medium leading-[0.95] tracking-[-0.04em] text-text-muted/30 transition-colors duration-500 group-hover:text-accent-cyan/50">
                    {m.step}
                  </span>
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.01em] text-text-primary md:text-3xl md:pt-3">
                    {m.title}
                  </h3>
                  <p className="col-start-2 mt-3 max-w-2xl text-[16px] leading-[1.7] text-text-secondary md:col-start-3 md:mt-0 md:pt-4">
                    {m.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
