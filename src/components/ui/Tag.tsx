import type { ReactNode } from "react"
import { cn } from "@/lib/cn"
import type { AccentKey } from "@/lib/constants"

interface TagProps {
  children: ReactNode
  accent?: AccentKey
  size?: "sm" | "md"
  className?: string
}

const ACCENT_BORDER: Record<AccentKey, string> = {
  cyan: "border-accent-cyan/35 text-accent-cyan",
  violet: "border-accent-violet/35 text-accent-violet",
  blue: "border-accent-blue/40 text-accent-blue",
  green: "border-accent-green/35 text-accent-green",
}

export function Tag({ children, accent, size = "sm", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-bg-elevated/60 font-medium tracking-wide",
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        accent ? ACCENT_BORDER[accent] : "border-border-subtle text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  )
}
