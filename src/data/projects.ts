import type { AccentKey } from "@/lib/constants"

export interface Project {
  id: string
  name: string
  category: string
  problem: string
  designed: string
  pattern: string
  role: string
  impact: string
  accent: AccentKey
  link?: string
}

export const projects: readonly Project[] = [
  {
    id: "ai-customer-service-agent",
    name: "AI 智能客服 Agent",
    category: "Insurance AI · 客服",
    problem:
      "传统客服流程难以应对高频重复问询、知识碎片化与回复质量不稳定的挑战。",
    designed:
      "设计 AI 辅助客服工作流，组合意图识别、检索、回复生成与人工兜底。",
    pattern: "RAG · Workflow Orchestration · Human-in-the-loop",
    role: "工作流设计、知识结构、评估闭环、Bad Case 分析",
    impact: "占位指标：响应效率 / 回复质量 / 覆盖范围。",
    accent: "cyan",
  },
  {
    id: "ai-underwriting-decision-chain",
    name: "AI 核保决策链",
    category: "Insurance AI · 核保",
    problem:
      "传统规则核保难以处理长病史材料、多源资料与复杂疾病推理。",
    designed:
      "设计层级式工作流：从材料解析到字段抽取、疾病去重、编码映射、核保推理。",
    pattern: "Document Parsing · Information Extraction · Rule Reasoning · Human Review",
    role: "决策链设计、评估标准、流程边界定义、推理过程结构化",
    impact: "占位指标：准确率 / 处理效率 / 复核率。",
    accent: "violet",
  },
  {
    id: "ai-marketing-content-workflow",
    name: "AI 营销内容工作流",
    category: "Insurance AI · 营销赋能",
    problem:
      "销售团队需要更快、更一致地生成合规、场景化的营销内容。",
    designed:
      "设计结构化内容生成流程：场景模板、品牌约束、复核逻辑、可复用 Prompt 模式。",
    pattern: "Prompt Workflow · Content Template · Review Loop",
    role: "产品逻辑、场景拆解、内容工作流、质量控制",
    impact: "占位指标：内容产能 / 采纳率 / 销售赋能价值。",
    accent: "blue",
  },
  {
    id: "agent-workflow-skills-system",
    name: "Agent 工作流与 Skill 沉淀体系",
    category: "AI Native Builder · 体系",
    problem:
      "重复出现的 AI 任务，难以在不同产品场景间标准化、评估、复用。",
    designed:
      "构建可复用的工作流与 Skill 方法论，把重复 AI 工作转化为结构化、可执行的模式。",
    pattern: "Agent Workflow · Skills · Evaluation · Iteration Loop",
    role: "AI 工作流设计、Skill 抽象、工具策略、Builder 方法论沉淀",
    impact: "占位指标：原型速度 / 交付效率 / 流程复用率。",
    accent: "green",
  },
] as const
