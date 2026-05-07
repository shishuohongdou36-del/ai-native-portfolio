import { SECTION_IDS } from "@/lib/constants"
import { Reveal } from "@/components/ui/Reveal"

const paragraphs: readonly string[] = [
  "I work at the intersection of product strategy, AI system design, and builder-level execution — turning ambiguous business problems into structured AI workflows that can be evaluated, improved, and shipped.",
  "Unlike a traditional product portfolio, this site is laid out as a digital lab. Each section maps a part of my AI product practice — from problem framing to agent orchestration to skill productization.",
  "My work spans RAG systems, multi-agent workflows, evaluation loops, AI-coding-driven delivery, and B2B insurance AI applications.",
]

export function About() {
  return (
    <section id={SECTION_IDS.about} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-text-muted/60" />
                01 — Identity
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-section-m md:text-section-d font-medium leading-[1.05] tracking-[-0.02em] text-text-primary">
                Not a designer.<br />
                Not a pure engineer.<br />
                <span className="text-gradient-cyan-violet">A builder of AI systems.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="space-y-7">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className="text-[18px] leading-[1.65] text-text-secondary md:text-[19px]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
