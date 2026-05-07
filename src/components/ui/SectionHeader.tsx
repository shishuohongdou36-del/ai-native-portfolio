import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: ReactNode
  align?: "left" | "center"
}

export function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <header
      className={
        align === "center"
          ? "mx-auto mb-14 max-w-2xl text-center"
          : "mb-14 max-w-3xl"
      }
    >
      {eyebrow && (
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
            <span className="mr-2 inline-block h-px w-6 align-middle bg-text-muted/60" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-section-m md:text-section-d font-medium tracking-tight text-text-primary">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <div className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            {description}
          </div>
        </Reveal>
      )}
    </header>
  )
}
