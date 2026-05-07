import { useEffect, useRef, useState } from "react"

export interface NormalizedMouse {
  /** -1 (left) to 1 (right), 0 = center */
  x: number
  /** -1 (top) to 1 (bottom), 0 = center */
  y: number
  /** has the user moved at least once */
  active: boolean
}

const INITIAL: NormalizedMouse = { x: 0, y: 0, active: false }

/**
 * Tracks normalized pointer position relative to the viewport, rAF-throttled.
 * Touch events map to the latest touch point. Spec FR-011 / FR-081.
 */
export function useMousePosition(enabled: boolean = true): NormalizedMouse {
  const [pos, setPos] = useState<NormalizedMouse>(INITIAL)
  const rafRef = useRef<number | null>(null)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const flush = () => {
      rafRef.current = null
      const p = pendingRef.current
      if (!p) return
      pendingRef.current = null
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      const nx = (p.x / w) * 2 - 1
      const ny = (p.y / h) * 2 - 1
      setPos({ x: nx, y: ny, active: true })
    }

    const queue = (x: number, y: number) => {
      pendingRef.current = { x, y }
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(flush)
      }
    }

    const onMove = (e: MouseEvent) => queue(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) queue(t.clientX, t.clientY)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onTouch)
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [enabled])

  return pos
}
