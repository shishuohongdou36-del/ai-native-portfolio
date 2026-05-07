import { SECTION_IDS } from "@/lib/constants"
import { projects } from "@/data/projects"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"
import { GlassCard } from "@/components/ui/GlassCard"
import { Tag } from "@/components/ui/Tag"

export function FeaturedProjects() {
  return (
    <section id={SECTION_IDS.projects} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <SectionHeader
          eyebrow="03 — Featured Projects"
          title="Problem → design → system pattern → impact."
          description="Each card is a system, not a screenshot. Focus on how the problem was decomposed and what was actually shipped."
        />
        <ul className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={0.06 * i}>
                <GlassCard accent={p.accent} interactive className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                        case · {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1.5 font-display text-card-title font-medium leading-tight text-text-primary">
                        {p.name}
                      </h3>
                    </div>
                    <Tag accent={p.accent}>{p.category}</Tag>
                  </div>

                  <dl className="mt-5 space-y-4 text-[14px] leading-[1.65]">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                        Problem
                      </dt>
                      <dd className="mt-1 text-text-secondary">{p.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                        Designed
                      </dt>
                      <dd className="mt-1 text-text-primary/90">{p.designed}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                          Pattern
                        </dt>
                        <dd className="mt-1 text-text-secondary">{p.pattern}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                          Role
                        </dt>
                        <dd className="mt-1 text-text-secondary">{p.role}</dd>
                      </div>
                    </div>
                    <div className="border-t border-border-subtle pt-4">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                        Impact
                      </dt>
                      <dd className="mt-1 text-text-primary/85 italic">{p.impact}</dd>
                    </div>
                  </dl>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
