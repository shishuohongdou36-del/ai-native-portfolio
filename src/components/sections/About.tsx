import { SECTION_IDS } from "@/lib/constants"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"

const paragraphs: readonly string[] = [
  "I work at the intersection of product strategy, AI system design, and builder-level execution. My focus is turning ambiguous business problems into structured AI workflows that can be evaluated, improved, and shipped.",
  "Unlike traditional product portfolios, this site is designed as a digital lab. Each section maps a part of my AI product practice — from problem framing to agent orchestration and skill productization.",
  "My work spans RAG systems, multi-agent workflows, evaluation loops, AI coding practices, and B2B insurance AI applications.",
]

export function About() {
  return (
    <section id={SECTION_IDS.about} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <SectionHeader eyebrow="01 — Identity" title="An AI Product Manager who ships systems, not slides." />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Reveal>
            <aside className="surface-glass rounded-2xl p-card-m md:p-card-d">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted">
                signal
              </p>
              <p className="mt-3 font-display text-2xl leading-snug text-text-primary">
                Product clarity ×<br />
                builder execution.
              </p>
              <ul className="mt-6 space-y-2 text-[13px] text-text-secondary">
                <li className="flex gap-2"><span className="text-accent-cyan">›</span> Not a designer.</li>
                <li className="flex gap-2"><span className="text-accent-cyan">›</span> Not a pure engineer.</li>
                <li className="flex gap-2"><span className="text-accent-cyan">›</span> A builder of AI systems.</li>
              </ul>
            </aside>
          </Reveal>
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="text-base leading-[1.75] text-text-secondary md:text-[17px]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
