import { forwardRef, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/cn"
import type { AccentKey } from "@/lib/constants"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  accent?: AccentKey
  /** Whether the card should react to hover with elevated state. */
  interactive?: boolean
  as?: "div" | "article" | "section"
}

const ACCENT_GLOW: Record<AccentKey, string> = {
  cyan: "before:bg-accent-cyan/15 hover:border-accent-cyan/40 hover:shadow-glow-cyan",
  violet: "before:bg-accent-violet/15 hover:border-accent-violet/40 hover:shadow-glow-violet",
  blue: "before:bg-accent-blue/15 hover:border-accent-blue/40",
  green: "before:bg-accent-green/15 hover:border-accent-green/40",
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { children, accent = "cyan", interactive = false, className, as = "div", ...rest },
  ref
) {
  const Component = as as "div"
  return (
    <Component
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/60 p-card-m md:p-card-d",
        "backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 ease-out",
        "before:pointer-events-none before:absolute before:-inset-px before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500",
        interactive && "cursor-default hover:-translate-y-0.5 hover:before:opacity-100",
        interactive && ACCENT_GLOW[accent],
        className
      )}
      {...rest}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  )
})
