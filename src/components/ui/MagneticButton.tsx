import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react"
import { motion, useReducedMotion as useFmReducedMotion } from "framer-motion"
import { cn } from "@/lib/cn"

interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: "primary" | "secondary"
}

/**
 * Anchor styled as a button with subtle cursor-magnetic pull.
 * Spec §12.1 Level 2 / FR-071. Magnetic effect disabled under reduced-motion.
 */
export function MagneticButton({
  children,
  variant = "primary",
  className,
  href,
  onClick,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useFmReducedMotion()

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.setProperty("--mx", `${dx * 0.18}px`)
    el.style.setProperty("--my", `${dy * 0.22}px`)
  }
  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--mx", "0px")
    el.style.setProperty("--my", "0px")
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide",
        "transition-[background,border-color,color,box-shadow] duration-300",
        variant === "primary"
          ? "border border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20 hover:shadow-glow-cyan"
          : "border border-border-subtle bg-transparent text-text-secondary hover:text-text-primary hover:border-border-active",
        className
      )}
      style={{
        transform: "translate3d(var(--mx, 0), var(--my, 0), 0)",
        transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms",
      }}
    >
      <span className="relative z-10">{children}</span>
      <svg
        className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </motion.a>
  )
}
