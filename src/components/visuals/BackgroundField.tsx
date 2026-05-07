import { useMotion } from "@/context/MotionContext"

/**
 * Ambient backdrop: subtle grid + two soft accent glows. Spec §12.1 Level 1.
 * Pure CSS / SVG — zero JS animation cost. Disabled when motionDisabled.
 */
export function BackgroundField() {
  const { motionDisabled } = useMotion()
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 35%, #000 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 35%, #000 35%, transparent 75%)",
        }}
      />
      {/* accent glows */}
      <div
        className={`absolute -top-40 left-[10%] h-[480px] w-[480px] rounded-full bg-accent-violet/20 blur-[120px] ${
          motionDisabled ? "" : "animate-drift-slow"
        }`}
      />
      <div
        className={`absolute top-[40%] right-[5%] h-[420px] w-[420px] rounded-full bg-accent-cyan/15 blur-[120px] ${
          motionDisabled ? "" : "animate-drift-slow [animation-delay:-6s]"
        }`}
      />
      {/* horizon line */}
      <div className="absolute inset-x-0 top-[68%] h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
    </div>
  )
}
