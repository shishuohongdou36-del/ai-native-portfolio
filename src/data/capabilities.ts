import type { AccentKey } from "@/lib/constants"

export type CapabilityVisualWeight = "core" | "supporting" | "domain"

export interface Capability {
  id: "rag" | "multi-agent" | "workflow-design" | "evaluation-loop" | "ai-coding" | "insurance-ai"
  name: string
  description: string
  detail?: string
  visualWeight: CapabilityVisualWeight
  accent: AccentKey
}

// 顺序对 Hero 的 AgentNodeGraph 布局有意义；技术名词保留英文。
export const capabilities: readonly Capability[] = [
  {
    id: "rag",
    name: "RAG",
    detail:
      "关键是把知识结构、检索策略与回答边界放在同一个可评估的流程中。",
    description:
      "构建检索增强系统，把领域知识与可靠生成连接起来。",
    visualWeight: "core",
    accent: "cyan",
  },
  {
    id: "multi-agent",
    name: "Multi-Agent",
    detail:
      "让每个 Agent 只负责清晰的判断或执行环节，避免把复杂度塞回单一 prompt。",
    description:
      "围绕角色、工具、记忆与交接逻辑，组织专业化 Agent 协同。",
    visualWeight: "core",
    accent: "violet",
  },
  {
    id: "workflow-design",
    name: "Workflow Design",
    detail:
      "从输入、工具、人审、失败路径到输出，每个节点都应该能被追踪。",
    description:
      "把业务流程转化为可观测、可控的 AI 执行流。",
    visualWeight: "core",
    accent: "blue",
  },
  {
    id: "evaluation-loop",
    name: "Evaluation Loop",
    detail:
      "不只看一次效果，而是把错例变成可回放、可对比、可防止回归的资产。",
    description:
      "通过测试集、Bad Case 分析、回归检查与持续打磨，建立质量闭环。",
    visualWeight: "supporting",
    accent: "green",
  },
  {
    id: "ai-coding",
    name: "AI Coding",
    detail:
      "把 AI 当作协作工程系统，而不是一个生成代码的输入框。",
    description:
      "用 Claude Code、Codex、Windsurf 等 AI-first 工具，加速原型与交付。",
    visualWeight: "supporting",
    accent: "cyan",
  },
  {
    id: "insurance-ai",
    name: "Insurance AI",
    detail:
      "保险场景的重点不是炫技，而是合规、知识、判断责任与人工复核边界。",
    description:
      "把大模型系统应用到客户服务、核保、营销内容与销售赋能。",
    visualWeight: "domain",
    accent: "violet",
  },
] as const
