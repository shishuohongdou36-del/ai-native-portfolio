import type { AccentKey } from "@/lib/constants"

export type CapabilityVisualWeight = "core" | "supporting" | "domain"

export interface Capability {
  id: "rag" | "multi-agent" | "workflow-design" | "evaluation-loop" | "ai-coding" | "insurance-ai"
  name: string
  description: string
  visualWeight: CapabilityVisualWeight
  accent: AccentKey
}

// Spec §10.3 — order is significant for the Hero AgentNodeGraph layout seed.
export const capabilities: readonly Capability[] = [
  {
    id: "rag",
    name: "RAG",
    description:
      "Designing retrieval-augmented systems that connect domain knowledge with reliable generation.",
    visualWeight: "core",
    accent: "cyan",
  },
  {
    id: "multi-agent",
    name: "Multi-Agent",
    description:
      "Structuring specialized agents around clear roles, tools, memory, and handoff logic.",
    visualWeight: "core",
    accent: "violet",
  },
  {
    id: "workflow-design",
    name: "Workflow Design",
    description:
      "Turning business processes into observable, controllable AI execution flows.",
    visualWeight: "core",
    accent: "blue",
  },
  {
    id: "evaluation-loop",
    name: "Evaluation Loop",
    description:
      "Building quality loops through test sets, bad case analysis, regression checks, and refinement.",
    visualWeight: "supporting",
    accent: "green",
  },
  {
    id: "ai-coding",
    name: "AI Coding",
    description:
      "Using Claude Code, Codex, Windsurf, and AI-first tooling to accelerate prototyping and delivery.",
    visualWeight: "supporting",
    accent: "cyan",
  },
  {
    id: "insurance-ai",
    name: "Insurance AI",
    description:
      "Applying large-model systems to customer service, underwriting, marketing, and sales enablement.",
    visualWeight: "domain",
    accent: "violet",
  },
] as const
