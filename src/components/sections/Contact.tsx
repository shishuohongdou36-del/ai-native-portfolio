import { SECTION_IDS } from "@/lib/constants"
import { profile } from "@/data/profile"
import { channels } from "@/data/contact"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Reveal } from "@/components/ui/Reveal"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ExternalLink } from "@/components/ui/ExternalLink"

export function Contact() {
  return (
    <section id={SECTION_IDS.contact} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <SectionHeader
          eyebrow="06 — Contact"
          title="Open to AI-native product collaborations."
          description="Best for: B2B AI product design, agent / workflow systems, evaluation infrastructure, and AI-coding-driven delivery."
        />
        <Reveal>
          <div className="surface-glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent-cyan/15 blur-[100px]" aria-hidden />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-accent-violet/15 blur-[100px]" aria-hidden />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted">
                  signal_open · accepting_inbound
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-text-primary md:text-4xl">
                  Let's design AI systems that <span className="text-gradient-cyan-violet">decide and execute.</span>
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">
                  If you're building an AI-native product and need a partner who can frame the problem, design the workflow, run the evaluation loop, and ship — get in touch.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <MagneticButton href={`mailto:${profile.email}`} variant="primary">
                    Email me
                  </MagneticButton>
                  <MagneticButton href={profile.github} variant="secondary">
                    GitHub
                  </MagneticButton>
                </div>
              </div>
              <ul className="space-y-3 self-end">
                {channels.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center justify-between rounded-xl border border-border-subtle bg-bg-elevated/40 px-4 py-3"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-[13px] text-text-primary">{c.value}</p>
                    </div>
                    <ExternalLink href={c.href} aria-label={`Open ${c.label}`}>
                      <span className="sr-only">Open</span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
