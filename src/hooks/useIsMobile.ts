import { useEffect, useState } from "react"
import { BREAKPOINT_MOBILE_PX } from "@/lib/constants"

export function useIsMobile(threshold: number = BREAKPOINT_MOBILE_PX): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < threshold
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    const onResize = () => setIsMobile(window.innerWidth < threshold)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [threshold])

  return isMobile
}
