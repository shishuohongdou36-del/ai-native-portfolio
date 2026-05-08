import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { usePerformanceMode } from "@/hooks/usePerformanceMode"

describe("usePerformanceMode", () => {
  let rafCallbacks: Array<(t: number) => void> = []
  let rafId = 0
  let perfNow = 0
  let getContextSpy: ReturnType<typeof vi.spyOn> | null = null

  beforeEach(() => {
    rafCallbacks = []
    rafId = 0
    perfNow = 0
    vi.useFakeTimers({ shouldAdvanceTime: true })

    vi.stubGlobal("requestAnimationFrame", (cb: (t: number) => void) => {
      rafId++
      rafCallbacks.push(cb)
      return rafId
    })
    vi.stubGlobal("cancelAnimationFrame", () => {
      rafCallbacks = []
    })
    vi.stubGlobal("performance", {
      now: () => perfNow,
    })

    // Default: WebGL available — spy on canvas getContext so document.createElement stays intact for jsdom
    getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, "getContext")
      .mockImplementation(
        (contextId: string) =>
          (contextId === "webgl2" || contextId === "webgl"
            ? ({} as WebGLRenderingContext)
            : null) as any
      )
  })

  afterEach(() => {
    getContextSpy?.mockRestore()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  function flushRafs() {
    // Advance perfNow by ~100 ms per frame so the 1500 ms probe completes in ~15 iterations.
    // Cap at 3000 ms to prevent any accidental infinite loop.
    while (rafCallbacks.length > 0 && perfNow < 3000) {
      const cbs = [...rafCallbacks]
      rafCallbacks = []
      perfNow += 100
      cbs.forEach((cb) => cb(perfNow))
    }
  }

  it("initial state reflects reduced-motion preference when true", () => {
    const { result } = renderHook(() => usePerformanceMode(true))
    expect(result.current.mode).toBe("reduced")
    expect(result.current.webglAvailable).toBe(true)
    expect(result.current.averageFps).toBe(0)
  })

  it("initial state is full when reduced-motion is false and WebGL is available", () => {
    const { result } = renderHook(() => usePerformanceMode(false))
    expect(result.current.mode).toBe("full")
  })

  it("downgrades one tier to reduced when FPS probe is below threshold from full", () => {
    const { result } = renderHook(() => usePerformanceMode(false))
    expect(result.current.mode).toBe("full")

    act(() => {
      flushRafs()
    })

    expect(result.current.mode).toBe("reduced")
    expect(result.current.averageFps).toBeLessThan(30)
  })

  it("stays at reduced when FPS probe is below threshold from reduced start", () => {
    const { result } = renderHook(() => usePerformanceMode(true))
    expect(result.current.mode).toBe("reduced")

    act(() => {
      flushRafs()
    })

    expect(result.current.mode).toBe("static")
  })

  it("detects missing WebGL and starts at reduced", () => {
    getContextSpy?.mockRestore()
    getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => null)

    const { result } = renderHook(() => usePerformanceMode(false))
    expect(result.current.mode).toBe("reduced")
    expect(result.current.webglAvailable).toBe(false)
  })
})
