import { useEffect, useState } from "react"

export type PerformanceMode = "full" | "reduced" | "static"

export interface PerformanceState {
  mode: PerformanceMode
  /** True if WebGL2 context creation succeeded at probe time. */
  webglAvailable: boolean
  /** Measured average fps from the boot probe (0 until probe completes). */
  averageFps: number
}

const PROBE_DURATION_MS = 1500
const LOW_FPS_THRESHOLD = 30

function detectWebGL(): boolean {
  if (typeof document === "undefined") return false
  try {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("webgl2") || canvas.getContext("webgl")
    return ctx != null
  } catch {
    return false
  }
}

/**
 * Three-tier performance mode (spec D3 / FR-111):
 *   full     — all motion levels active, R3F enabled
 *   reduced  — Level 1 ambient off, Canvas2D fallback for Hero
 *   static   — all decorative motion off, single static SVG
 *
 * Inputs: prefers-reduced-motion, WebGL availability, measured boot FPS.
 */
export function usePerformanceMode(initialReduced: boolean): PerformanceState {
  const initialWebgl = typeof window !== "undefined" ? detectWebGL() : false
  const [state, setState] = useState<PerformanceState>(() => ({
    mode: !initialWebgl ? "reduced" : initialReduced ? "reduced" : "full",
    webglAvailable: initialWebgl,
    averageFps: 0,
  }))

  // React to OS reduced-motion changes during session.
  useEffect(() => {
    if (initialReduced && state.mode === "full") {
      setState((s) => ({ ...s, mode: "reduced" }))
    }
  }, [initialReduced, state.mode])

  // FPS boot probe — runs once on mount.
  useEffect(() => {
    if (typeof window === "undefined") return
    let raf = 0
    let frames = 0
    const start = performance.now()

    const tick = (now: number) => {
      frames++
      if (now - start < PROBE_DURATION_MS) {
        raf = requestAnimationFrame(tick)
      } else {
        const elapsed = (now - start) / 1000
        const avg = frames / elapsed
        setState((s) => {
          let nextMode: PerformanceMode = s.mode
          if (avg < LOW_FPS_THRESHOLD) {
            // Downgrade one tier from current.
            nextMode = s.mode === "full" ? "reduced" : s.mode === "reduced" ? "static" : "static"
          }
          return { ...s, mode: nextMode, averageFps: avg }
        })
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return state
}
