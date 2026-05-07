export interface MethodologyStep {
  step: "01" | "02" | "03" | "04" | "05" | "06"
  title: string
  description: string
}

export const methodology: readonly MethodologyStep[] = [
  {
    step: "01",
    title: "问题界定 / Problem Framing",
    description:
      "界定业务问题、用户上下文、决策边界与预期价值，再设计 AI 工作流。",
  },
  {
    step: "02",
    title: "工作流拆解 / Workflow Decomposition",
    description:
      "把复杂的 AI 任务拆解为可观测的步骤，明确输入、输出与失败模式。",
  },
  {
    step: "03",
    title: "评估闭环 / Evaluation Loop",
    description:
      "在规模化前，先定义测试集、指标、验收标准与回归检查机制。",
  },
  {
    step: "04",
    title: "Bad Case 归因 / Attribution",
    description:
      "把失败追溯到检索、推理、Prompt、工具使用、数据质量或产品约束。",
  },
  {
    step: "05",
    title: "策略迭代 / Strategy Refinement",
    description:
      "基于证据迭代 Prompt、流程、工具、记忆、路由逻辑与人工复核策略。",
  },
  {
    step: "06",
    title: "Skill 化 / 产品化",
    description:
      "把可复现的模式，沉淀为可复用的 Skill、模板、工作流与产品化方法论。",
  },
] as const
