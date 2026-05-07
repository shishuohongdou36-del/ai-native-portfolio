import { SECTION_IDS } from "@/lib/constants"
import { capabilities } from "@/data/capabilities"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"
import { GlassCard } from "@/components/ui/GlassCard"
import { Tag } from "@/components/ui/Tag"

const WEIGHT_LABEL: Record<string, string> = {
  core: "core",
  supporting: "supporting",
  domain: "domain",
}

export function CapabilityMap() {
  return (
    <section id={SECTION_IDS.capabilities} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <SectionHeader
          eyebrow="02 — Capability Map"
          title="Six surfaces I design across."
          description="Each capability is a reusable lens: how I decompose problems, what I build, and where I evaluate quality."
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={0.05 * i}>
                <GlassCard accent={c.accent} interactive className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="relative inline-flex h-2.5 w-2.5 rounded-full"
                        style={{ background: `var(--color-accent-${c.accent})` }}
                        aria-hidden
                      />
                      <h3 className="font-display text-card-title font-medium text-text-primary">
                        {c.name}
                      </h3>
                    </div>
                    <Tag accent={c.accent}>{WEIGHT_LABEL[c.visualWeight]}</Tag>
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.65] text-text-secondary">
                    {c.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    <span>node_{String(i + 1).padStart(2, "0")}</span>
                    <span>active</span>
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
