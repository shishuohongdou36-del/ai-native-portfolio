import "@testing-library/jest-dom/vitest"
import { render, type RenderOptions } from "@testing-library/react"
import { type ReactElement } from "react"
import { MotionProvider } from "@/context/MotionContext"

export function renderWithMotion(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: MotionProvider, ...options })
}

