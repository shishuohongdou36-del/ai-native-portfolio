import { useEffect, useState } from "react"
import { useMotion } from "@/context/MotionContext"

/**
 * Soft cursor halo — Level 2 global feedback. Spec FR-081.
 * Hidden on touch / motion-disabled. Uses pointer-events: none so it never
 * intercepts clicks or text selection.
 */
export function CursorGlow() {
  const { motionDisabled } = useMotion()
  const [hasCoarsePointer, setHasCoarsePointer] = useState(false)
  const [pos, setPos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)")
    setHasCoarsePointer(media.matches)
    const onChange = (event: MediaQueryListEvent) => setHasCoarsePointer(event.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (motionDisabled || hasCoarsePointer) return
    let raf = 0
    let pending: { x: number; y: number } | null = null
    const flush = () => {
      raf = 0
      if (pending) {
        setPos(pending)
        pending = null
      }
    }
    const onMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY }
      if (!raf) raf = requestAnimationFrame(flush)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [motionDisabled, hasCoarsePointer])

  if (motionDisabled || hasCoarsePointer) return null

  return (
    <div
      className="pointer-events-none fixed z-30 h-[420px] w-[420px] rounded-full mix-blend-screen"
      style={{
        left: pos.x - 210,
        top: pos.y - 210,
        background:
          "radial-gradient(circle, rgba(69,230,255,0.10) 0%, rgba(69,230,255,0) 60%)",
        transition: "left 80ms linear, top 80ms linear",
      }}
      aria-hidden
    />
  )
}
