import { SECTION_IDS } from "@/lib/constants"
import { projects } from "@/data/projects"
import { Reveal } from "@/components/ui/Reveal"
import { Tag } from "@/components/ui/Tag"
import { cn } from "@/lib/cn"

const ACCENT_GLOW: Record<string, string> = {
  cyan: "group-hover:shadow-glow-cyan group-hover:border-accent-cyan/40",
  violet: "group-hover:shadow-glow-violet group-hover:border-accent-violet/40",
  blue: "group-hover:border-accent-blue/40",
  green: "group-hover:border-accent-green/40",
}

export function FeaturedProjects() {
  return (
    <section id={SECTION_IDS.projects} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <header className="mb-16 grid gap-x-16 gap-y-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-text-muted/60" />
                03 — Selected Work
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-section-m md:text-section-d font-medium leading-[1.15] tracking-[-0.02em] text-text-primary">
                把问题，<br />
                设计成一套系统。
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={0.1}>
              <p className="text-[16px] leading-[1.8] text-text-secondary md:text-[17px]">
                每张卡片是一套系统，不是一张截图。看的是问题如何被界定、最终交付了什么、之后变化了什么。
              </p>
            </Reveal>
          </div>
        </header>

        <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={0.06 * i}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/60 p-8 transition-[border-color,transform,box-shadow] duration-500 ease-out hover:-translate-y-0.5 md:p-10",
                    ACCENT_GLOW[p.accent]
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-text-muted">
                      Case · {String(i + 1).padStart(2, "0")}
                    </span>
                    <Tag accent={p.accent}>{p.category}</Tag>
                  </div>

                  <h3 className="mt-6 font-display text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-text-primary md:text-[30px]">
                    {p.name}
                  </h3>

                  <p className="mt-5 text-[15.5px] leading-[1.85] text-text-secondary">
                    {p.problem}
                  </p>

                  <p className="mt-5 text-[15.5px] leading-[1.85] text-text-primary/90">
                    <span className="text-text-muted">设计 —</span> {p.designed}
                  </p>

                  <p className="mt-3 text-[14px] italic leading-[1.75] text-text-secondary/85">
                    <span className="not-italic text-text-muted">价值 —</span> {p.impact}
                  </p>

                  <footer className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border-subtle pt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-text-muted">
                    <span>{p.pattern}</span>
                    <span className="text-text-secondary/80 normal-case tracking-normal">{p.role.split("、")[0]}</span>
                  </footer>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
