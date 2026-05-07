import { motion, useReducedMotion as useFmReducedMotion, type Variants } from "framer-motion"
import { profile } from "@/data/profile"
import { primaryCta, secondaryCta } from "@/data/contact"
import { SECTION_IDS } from "@/lib/constants"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ScanBeam } from "@/components/visuals/ScanBeam"
import { NoiseOverlay } from "@/components/visuals/NoiseOverlay"

/**
 * Hero — Cinematic Typography Wall (spec §9.2 Option D, FR-170 rev. 3).
 * 大字以 Latin 名（Bricolage Grotesque）承载视觉冲击；副标题、ticker、meta 用中文。
 */

const splitChars = (input: string): string[] => Array.from(input)

const charContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.15 },
  },
}

const charItem: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const reduced = useFmReducedMotion()
  const chars = splitChars(text)
  if (reduced) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        {text}
      </motion.span>
    )
  }
  return (
    <motion.span
      variants={charContainer}
      initial="hidden"
      animate="visible"
      className={className}
      aria-label={text}
    >
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          variants={charItem}
          aria-hidden
          className="inline-block"
          style={c === " " ? { width: "0.32em" } : undefined}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function Hero() {
  const yearLabel = String(new Date().getFullYear())
  const tickerLines = [
    "设计能思考、决策、执行的 AI 系统。",
    "RAG · Multi-Agent · Workflow · Evaluation · AI Coding。",
    "保险级 AI，已在生产中。",
  ]

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 md:pt-32"
    >
      <NoiseOverlay />
      <ScanBeam />

      {/* Top meta strip */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="container-x relative z-10 hidden md:flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted"
      >
        <span>
          <span className="text-accent-cyan">●</span> &nbsp; {yearLabel} — portfolio · v0.1
        </span>
        <span>{profile.location}</span>
      </motion.div>

      {/* Title block — true visual subject */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-center py-12 md:py-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-text-muted md:mb-8"
        >
          <span className="mr-3 inline-block h-px w-8 align-middle bg-text-muted/60" />
          {profile.title}
        </motion.p>

        <h1 className="font-display font-bold leading-[0.86] tracking-[-0.045em] text-text-primary">
          <span className="block text-[clamp(64px,15vw,200px)]">
            <AnimatedHeading text={profile.nameLatin.split(" ")[0]} />
          </span>
          <span className="block text-[clamp(64px,15vw,200px)] text-gradient-cyan-violet">
            <AnimatedHeading text={`${profile.nameLatin.split(" ")[1] ?? ""}.`} />
          </span>
          <span className="mt-2 block font-sans text-[clamp(26px,5vw,60px)] font-medium leading-[1.1] tracking-[-0.015em] text-text-primary/85 md:mt-4">
            <AnimatedHeading text="AI 系统的构建者。" />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 grid max-w-3xl gap-2 md:mt-14"
        >
          {tickerLines.map((line, i) => (
            <p
              key={line}
              className="text-[15px] leading-[1.65] text-text-secondary md:text-[17px]"
            >
              <span className="mr-3 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
                {String(i).padStart(2, "0")}
              </span>
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-3 md:mt-14"
        >
          <MagneticButton href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </MagneticButton>
          <MagneticButton href={secondaryCta.href} variant="secondary">
            {secondaryCta.label}
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="container-x relative z-10 flex flex-col gap-3 border-t border-border-subtle/60 py-5 font-mono text-[11px] uppercase tracking-[0.26em] text-text-muted md:flex-row md:items-center md:justify-between"
      >
        <span className="flex items-center gap-2">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
          </span>
          <span className="normal-case tracking-normal text-[12px] text-text-secondary">
            正在接受 AI 原生项目合作
          </span>
        </span>
        <a
          href={`#${SECTION_IDS.about}`}
          className="inline-flex items-center gap-2 text-text-muted transition-colors hover:text-text-primary"
        >
          <span>Scroll</span>
          <span aria-hidden>↓</span>
          <span className="hidden md:inline">/&nbsp;开始</span>
        </a>
        <span className="hidden md:inline">{profile.email}</span>
      </motion.div>
    </section>
  )
}
