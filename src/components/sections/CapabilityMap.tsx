import { SECTION_IDS } from "@/lib/constants"
import { capabilities } from "@/data/capabilities"
import { Reveal } from "@/components/ui/Reveal"
import { cn } from "@/lib/cn"

const ACCENT_DOT: Record<string, string> = {
  cyan: "bg-accent-cyan",
  violet: "bg-accent-violet",
  blue: "bg-accent-blue",
  green: "bg-accent-green",
}

export function CapabilityMap() {
  return (
    <section id={SECTION_IDS.capabilities} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <header className="mb-16 grid gap-x-16 gap-y-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-text-muted/60" />
                02 — Capability Map
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-section-m md:text-section-d font-medium leading-[1.15] tracking-[-0.02em] text-text-primary">
                我设计的<br />
                六个能力面。
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-[16px] leading-[1.8] text-text-secondary md:text-[17px]">
                每一项能力都是一把可复用的透镜 —— 我如何拆解问题、构建什么、在哪里评估质量。它们彼此组合，而非各自孤立。
              </p>
            </Reveal>
          </div>
        </header>

        <ul className="border-t border-border-subtle">
          {capabilities.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={0.04 * i}>
                <div className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-b border-border-subtle py-7 transition-colors duration-300 hover:border-border-active md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.4fr)] md:gap-x-12 md:py-9">
                  <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-text-muted md:pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-medium leading-tight text-text-primary md:text-3xl">
                    <span className="inline-flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-block h-1.5 w-1.5 rounded-full transition-transform duration-500 group-hover:scale-150",
                          ACCENT_DOT[c.accent]
                        )}
                        aria-hidden
                      />
                      {c.name}
                    </span>
                  </h3>
                  <p className="col-start-2 text-[15px] leading-[1.8] text-text-secondary md:col-start-3 md:text-[16px] md:pt-2">
                    {c.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
