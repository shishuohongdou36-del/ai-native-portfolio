import { SECTION_IDS } from "@/lib/constants"
import { profile } from "@/data/profile"
import { channels } from "@/data/contact"
import { Reveal } from "@/components/ui/Reveal"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ExternalLink } from "@/components/ui/ExternalLink"

/**
 * Contact — final, calm. Massive closing statement, two CTAs, a thin
 * channel list. No "signal_open" pill, no metric strips, no boxed cards.
 */
export function Contact() {
  return (
    <section id={SECTION_IDS.contact} className="py-section-y-m md:py-section-y-d">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                <span className="mr-3 inline-block h-px w-8 align-middle bg-text-muted/60" />
                06 — Contact
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-section-m md:text-section-d font-medium leading-[1.02] tracking-[-0.025em] text-text-primary">
                Let's design AI systems that <span className="text-gradient-cyan-violet">decide and execute.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-text-secondary">
                Best for: B2B AI product design, agent and workflow systems, evaluation infrastructure, AI-coding-driven delivery.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton href={`mailto:${profile.email}`} variant="primary">
                  Email me
                </MagneticButton>
                <MagneticButton href={profile.github} variant="secondary">
                  GitHub
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:col-start-8 md:pt-2">
            <Reveal delay={0.15}>
              <ul className="border-t border-border-subtle">
                {channels.map((c) => (
                  <li
                    key={c.label}
                    className="group flex items-baseline justify-between gap-6 border-b border-border-subtle py-5 transition-colors duration-300 hover:border-border-active"
                  >
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-text-muted">
                        {c.label}
                      </p>
                      <p className="mt-1.5 text-[16px] text-text-primary">
                        <ExternalLink href={c.href} className="hover:text-text-primary">
                          {c.value}
                        </ExternalLink>
                      </p>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      ↗
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-10 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-text-muted">
                Currently based in {profile.location}. Open to remote and on-site collaborations across APAC and EU timezones.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
