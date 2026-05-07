import { createContext, useContext, useMemo, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { usePerformanceMode, type PerformanceMode } from "@/hooks/usePerformanceMode"

interface MotionContextValue {
  prefersReducedMotion: boolean
  performanceMode: PerformanceMode
  webglAvailable: boolean
  /**
   * Convenience flag — true when no decorative motion should run at all.
   * Equivalent to (reduced-motion OR performanceMode === 'static').
   */
  motionDisabled: boolean
}

const MotionCtx = createContext<MotionContextValue | null>(null)

export function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const perf = usePerformanceMode(prefersReducedMotion)

  const value = useMemo<MotionContextValue>(
    () => ({
      prefersReducedMotion,
      performanceMode: perf.mode,
      webglAvailable: perf.webglAvailable,
      motionDisabled: prefersReducedMotion || perf.mode === "static",
    }),
    [prefersReducedMotion, perf.mode, perf.webglAvailable]
  )

  return <MotionCtx.Provider value={value}>{children}</MotionCtx.Provider>
}

export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionCtx)
  if (!ctx) throw new Error("useMotion must be used within <MotionProvider>")
  return ctx
}
