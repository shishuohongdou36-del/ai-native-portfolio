import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useMotion } from "@/context/MotionContext"
import { useIsMobile } from "@/hooks/useIsMobile"

/**
 * 1px diagonal scan beam that follows the cursor with a damped spring.
 * Spec §9.2 Option D / §12.1 Level 2 (FR-081). Pure CSS + Framer Motion,
 * no canvas. Hidden on touch / motion-disabled.
 */
export function ScanBeam() {
  const { motionDisabled } = useMotion()
  const isMobile = useIsMobile()

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 60, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 60, damping: 22, mass: 0.6 })

  const angle = useTransform([sx, sy], (latest: number[]) => {
    const [px, py] = latest
    return `${(px - 0.5) * 28 + (py - 0.5) * -10}deg`
  })
  const translateX = useTransform(sx, (v) => `${(v - 0.5) * 240}px`)
  const translateY = useTransform(sy, (v) => `${(v - 0.5) * 80}px`)

  useEffect(() => {
    if (motionDisabled || isMobile) return
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth)
      y.set(e.clientY / window.innerHeight)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [motionDisabled, isMobile, x, y])

  if (motionDisabled || isMobile) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[140%] w-px origin-center"
        style={{
          translateX,
          translateY,
          rotate: angle,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(69,230,255,0.0) 18%, rgba(69,230,255,0.55) 50%, rgba(139,92,255,0.0) 82%, transparent 100%)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
