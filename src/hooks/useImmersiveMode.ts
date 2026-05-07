import { useState } from "react"

/**
 * Phase 5 stub (spec FR-090..092). Default disabled. The hook is wired so
 * downstream components can read the state, but activation is deferred until
 * Phase 5 work begins. Until then, calling enable() resolves to "unavailable".
 */
export type ImmersiveState = "off" | "requesting" | "active" | "unavailable"

export function useImmersiveMode() {
  const [state, setState] = useState<ImmersiveState>("off")

  const enable = async () => {
    setState("requesting")
    // Phase 5 will call navigator.mediaDevices.getUserMedia here.
    // Until then, declare unavailable to honour the "no repeat prompts" rule.
    setState("unavailable")
  }

  const disable = () => {
    setState("off")
  }

  return { state, enable, disable, supported: false as const }
}
