import { useEffect, useRef } from "react"
import { capabilities } from "@/data/capabilities"
import { ACCENT_HEX } from "@/lib/constants"
import { useMotion } from "@/context/MotionContext"
import { useMousePosition } from "@/hooks/useMousePosition"

/**
 * Canvas2D Agent Node System. Spec §9.2 Option A fallback (Phase 1 default;
 * R3F primary lands in Phase 2). Renders 6 nodes — one per capability — with
 * connecting edges, slow ambient drift, and mouse-driven parallax.
 *
 * Identity invariant (INV-3): node ids equal capabilities[*].id and order.
 */

interface NodeSeed {
  id: string
  label: string
  /** layout in unit space [-1, 1] */
  x: number
  y: number
  r: number
  color: string
}

const LAYOUT: ReadonlyArray<{ x: number; y: number; r: number }> = [
  { x: 0.0, y: -0.55, r: 1.0 }, // rag (top)
  { x: 0.65, y: -0.15, r: 0.95 }, // multi-agent (top-right)
  { x: 0.55, y: 0.55, r: 0.9 }, // workflow-design (bottom-right)
  { x: -0.55, y: 0.55, r: 0.85 }, // evaluation-loop (bottom-left)
  { x: -0.7, y: -0.1, r: 0.85 }, // ai-coding (top-left)
  { x: 0.0, y: 0.05, r: 1.15 }, // insurance-ai (center)
]

function buildSeeds(): NodeSeed[] {
  return capabilities.map((c, i) => {
    const l = LAYOUT[i]
    return {
      id: c.id,
      label: c.name,
      x: l.x,
      y: l.y,
      r: l.r,
      color: ACCENT_HEX[c.accent],
    }
  })
}

export function AgentNodeGraphFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { motionDisabled } = useMotion()
  const mouse = useMousePosition(!motionDisabled)
  const mouseRef = useRef(mouse)
  mouseRef.current = mouse

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const seeds = buildSeeds()
    let raf = 0
    let t0 = performance.now()
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = (now: number) => {
      const t = (now - t0) / 1000
      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.32

      ctx.clearRect(0, 0, w, h)

      // mouse parallax (subtle)
      const m = mouseRef.current
      const px = m.active ? m.x * 14 * dpr : 0
      const py = m.active ? m.y * 14 * dpr : 0

      // compute current node screen positions
      const nodes = seeds.map((s, i) => {
        const phase = i * 1.31 + t * 0.35
        const drift = motionDisabled
          ? { dx: 0, dy: 0 }
          : { dx: Math.cos(phase) * 4 * dpr, dy: Math.sin(phase * 0.9) * 4 * dpr }
        return {
          ...s,
          sx: cx + s.x * radius + drift.dx + px * (0.4 + i * 0.08),
          sy: cy + s.y * radius + drift.dy + py * (0.4 + i * 0.08),
          rad: 6 * dpr * s.r,
        }
      })

      // edges
      ctx.lineWidth = 1 * dpr
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.sx - b.sx
          const dy = a.sy - b.sy
          const d = Math.hypot(dx, dy)
          const maxD = radius * 1.35
          if (d > maxD) continue
          const alpha = 0.08 + (1 - d / maxD) * 0.22
          const grad = ctx.createLinearGradient(a.sx, a.sy, b.sx, b.sy)
          grad.addColorStop(0, hexToRgba(a.color, alpha))
          grad.addColorStop(1, hexToRgba(b.color, alpha))
          ctx.strokeStyle = grad
          ctx.beginPath()
          ctx.moveTo(a.sx, a.sy)
          ctx.lineTo(b.sx, b.sy)
          ctx.stroke()
        }
      }

      // nodes
      for (const n of nodes) {
        // glow
        const glow = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, n.rad * 5)
        glow.addColorStop(0, hexToRgba(n.color, 0.5))
        glow.addColorStop(1, hexToRgba(n.color, 0))
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, n.rad * 5, 0, Math.PI * 2)
        ctx.fill()

        // core
        ctx.fillStyle = n.color
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, n.rad, 0, Math.PI * 2)
        ctx.fill()

        // ring
        ctx.strokeStyle = hexToRgba(n.color, 0.55)
        ctx.lineWidth = 1 * dpr
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, n.rad * 2.2, 0, Math.PI * 2)
        ctx.stroke()
      }

      // labels
      ctx.font = `${11 * dpr}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.fillStyle = "rgba(168, 179, 199, 0.85)"
      ctx.textBaseline = "middle"
      for (const n of nodes) {
        const offsetX = n.x >= 0 ? 14 * dpr : -14 * dpr
        ctx.textAlign = n.x >= 0 ? "left" : "right"
        ctx.fillText(n.label, n.sx + offsetX, n.sy)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [motionDisabled])

  return (
    <div className="relative h-full w-full" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

function hexToRgba(hex: string, a: number): string {
  const m = hex.replace("#", "")
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}
