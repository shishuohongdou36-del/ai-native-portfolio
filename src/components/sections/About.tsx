import { SECTION_IDS } from "@/lib/constants"
import { Reveal } from "@/components/ui/Reveal"

const paragraphs: readonly string[] = [
  "我在产品策略、AI 系统设计与 builder 级执行的交汇处工作 —— 把模糊的业务问题，转化成可评估、可改进、可交付的 AI 工作流。",
  "这个站点不是一份传统的产品 portfolio，更像一个数字实验室。每个 section 对应我 AI 产品实践的一部分 —— 从问题界定，到 Agent 编排，再到能力沉淀。",
  "工作覆盖：RAG 系统、多 Agent 工作流、评估闭环、AI Coding 驱动交付，以及保险行业的 B 端 AI 应用。",
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
              <h2 className="mt-6 font-display text-section-m md:text-section-d font-medium leading-[1.15] tracking-[-0.02em] text-text-primary">
                不是设计师，<br />
                也不是纯工程师，<br />
                <span className="text-gradient-cyan-violet">而是 AI 系统的构建者。</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="space-y-7">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className="text-[18px] leading-[1.85] text-text-secondary md:text-[19px]">
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
