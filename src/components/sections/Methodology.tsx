import { SECTION_IDS } from "@/lib/constants"
import { methodology } from "@/data/methodology"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"

export function Methodology() {
  return (
    <section id={SECTION_IDS.methodology} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <SectionHeader
          eyebrow="04 — Methodology"
          title="How AI work moves from ambiguity to product."
          description="Six ordered moves I run every time, regardless of domain. The order matters more than any single step."
        />
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {methodology.map((m, i) => (
            <li key={m.step}>
              <Reveal delay={0.07 * i}>
                <div className="relative h-full rounded-xl border border-border-subtle bg-bg-secondary/50 p-card-m transition-colors duration-300 hover:border-accent-cyan/40 md:p-card-d">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl font-medium text-accent-cyan/70">
                      {m.step}
                    </span>
                    <span className="h-px flex-1 bg-border-subtle" aria-hidden />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-medium text-text-primary">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-text-secondary">
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
