import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

describe("useReducedMotion", () => {
  let listeners: Array<(e: MediaQueryListEvent) => void> = []
  let matches = false

  beforeEach(() => {
    listeners = []
    matches = false

    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({
        get matches() {
          return matches
        },
        addEventListener: (_event: string, handler: (e: MediaQueryListEvent) => void) => {
          listeners.push(handler)
        },
        removeEventListener: (_event: string, handler: (e: MediaQueryListEvent) => void) => {
          listeners = listeners.filter((l) => l !== handler)
        },
      }))
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("initial value matches matchMedia", () => {
    matches = true
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)

    matches = false
    const { result: result2 } = renderHook(() => useReducedMotion())
    expect(result2.current).toBe(false)
  })

  it("updates on change event", () => {
    matches = false
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)

    act(() => {
      matches = true
      listeners.forEach((l) =>
        l({ matches: true } as MediaQueryListEvent)
      )
    })

    expect(result.current).toBe(true)
  })
})
