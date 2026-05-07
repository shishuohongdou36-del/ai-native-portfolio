import { motion, useReducedMotion as useFmReducedMotion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  /** Stagger delay in seconds. */
  delay?: number
  /** y-translate distance in px. */
  y?: number
  /** Duration in seconds. Spec §12.1 Level 3 caps at 0.6. */
  duration?: number
}

/**
 * Generic scroll-triggered reveal wrapper. Spec FR-163 / §12.1 Level 3.
 * Honours prefers-reduced-motion via Framer Motion's built-in helper.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  duration = 0.5,
  ...rest
}: RevealProps) {
  const reduced = useFmReducedMotion()
  const cappedDuration = Math.min(duration, 0.6)

  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.2, delay }}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: cappedDuration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
