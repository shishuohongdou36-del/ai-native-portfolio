import { SECTION_IDS } from "@/lib/constants"
import { writing } from "@/data/writing"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"
import { GlassCard } from "@/components/ui/GlassCard"
import { Tag } from "@/components/ui/Tag"
import { ExternalLink } from "@/components/ui/ExternalLink"

export function Writing() {
  return (
    <section id={SECTION_IDS.writing} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <SectionHeader
          eyebrow="05 — Writing & Thinking"
          title="Methods, not hot takes."
          description="Field notes from shipping AI products: workflows, evaluation loops, attribution playbooks, builder methodology."
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {writing.map((w, i) => (
            <li key={w.id}>
              <Reveal delay={0.06 * i}>
                <GlassCard interactive className="h-full">
                  <div className="flex flex-wrap items-center gap-2">
                    {w.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-medium leading-snug text-text-primary">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-text-secondary">
                    {w.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                      {w.publishedAt ?? "Draft"}
                    </span>
                    {w.url ? (
                      <ExternalLink href={w.url} className="text-[12px]">
                        Read
                      </ExternalLink>
                    ) : (
                      <span className="text-[12px] text-text-muted">Coming soon</span>
                    )}
                  </div>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
