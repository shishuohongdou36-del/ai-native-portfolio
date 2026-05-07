import { motion } from "framer-motion"
import { profile } from "@/data/profile"
import { primaryCta, secondaryCta } from "@/data/contact"
import { SECTION_IDS } from "@/lib/constants"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { AgentNodeGraphFallback } from "@/components/visuals/AgentNodeGraphFallback"

export function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative flex min-h-[100svh] items-center pt-24 md:pt-28"
    >
      <div className="container-x grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Left: copy. Painted before the visual subject (FR-110, FR-174). */}
        <div className="relative z-10 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-text-secondary backdrop-blur"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan/80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            </span>
            Agent Control Room — online
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-hero-title-m md:text-hero-title-d font-medium leading-[1.02] tracking-tight text-text-primary"
          >
            {profile.name}
            <br />
            <span className="text-gradient-cyan-violet">AI Native Builder.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-hero-sub-m md:text-hero-sub-d font-light text-text-primary/90"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary"
          >
            {profile.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </MagneticButton>
            <MagneticButton href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </MagneticButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border-subtle pt-6 sm:grid-cols-3 max-w-md"
          >
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Role</dt>
              <dd className="mt-1 text-[13px] text-text-primary">AI Product Manager</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Domain</dt>
              <dd className="mt-1 text-[13px] text-text-primary">Insurance · B2B</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Based</dt>
              <dd className="mt-1 text-[13px] text-text-primary">{profile.location}</dd>
            </div>
          </motion.dl>
        </div>

        {/* Right: Agent Node System visual. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square w-full max-w-xl mx-auto lg:max-w-none"
        >
          <div className="absolute inset-0 rounded-[28px] border border-border-subtle bg-bg-secondary/40 backdrop-blur-sm" />
          {/* corner brackets */}
          {[
            "left-3 top-3 border-l border-t",
            "right-3 top-3 border-r border-t",
            "left-3 bottom-3 border-l border-b",
            "right-3 bottom-3 border-r border-b",
          ].map((cls) => (
            <span
              key={cls}
              className={`pointer-events-none absolute h-4 w-4 border-accent-cyan/60 ${cls}`}
              aria-hidden
            />
          ))}
          <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            agent_network.live
          </div>
          <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            06 / 06 nodes
          </div>
          <div className="absolute inset-0 p-4">
            <AgentNodeGraphFallback />
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <a
        href={`#${SECTION_IDS.about}`}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted transition-colors hover:text-text-primary"
        aria-label="Scroll to next section"
      >
        Scroll ↓
      </a>
    </section>
  )
}
