import type { AccentKey } from "@/lib/constants"

export type CapabilityVisualWeight = "core" | "supporting" | "domain"

export interface Capability {
  id: "rag" | "multi-agent" | "workflow-design" | "evaluation-loop" | "ai-coding" | "insurance-ai"
  name: string
  description: string
  visualWeight: CapabilityVisualWeight
  accent: AccentKey
}

// 顺序对 Hero 的 AgentNodeGraph 布局有意义；技术名词保留英文。
export const capabilities: readonly Capability[] = [
  {
    id: "rag",
    name: "RAG",
    description:
      "构建检索增强系统，把领域知识与可靠生成连接起来。",
    visualWeight: "core",
    accent: "cyan",
  },
  {
    id: "multi-agent",
    name: "Multi-Agent",
    description:
      "围绕角色、工具、记忆与交接逻辑，组织专业化 Agent 协同。",
    visualWeight: "core",
    accent: "violet",
  },
  {
    id: "workflow-design",
    name: "Workflow Design",
    description:
      "把业务流程转化为可观测、可控的 AI 执行流。",
    visualWeight: "core",
    accent: "blue",
  },
  {
    id: "evaluation-loop",
    name: "Evaluation Loop",
    description:
      "通过测试集、Bad Case 分析、回归检查与持续打磨，建立质量闭环。",
    visualWeight: "supporting",
    accent: "green",
  },
  {
    id: "ai-coding",
    name: "AI Coding",
    description:
      "用 Claude Code、Codex、Windsurf 等 AI-first 工具，加速原型与交付。",
    visualWeight: "supporting",
    accent: "cyan",
  },
  {
    id: "insurance-ai",
    name: "Insurance AI",
    description:
      "把大模型系统应用到客户服务、核保、营销内容与销售赋能。",
    visualWeight: "domain",
    accent: "violet",
  },
] as const
