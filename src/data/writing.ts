export interface WritingEntry {
  id: string
  title: string
  tags: string[]
  excerpt: string
  url?: string
  publishedAt?: string
}

// REPLACE ME — 占位文章，等站主补充真实链接与日期。
export const writing: readonly WritingEntry[] = [
  {
    id: "agent-workflows-vs-prompts",
    title: "Agent Workflow vs. Prompt：真正的工程在哪里",
    tags: ["Multi-Agent", "Workflow Design"],
    excerpt:
      "持久的 AI 产品建立在工作流与评估闭环之上，而不是 Prompt 调优 —— 以及作为产品经理如何划这条边界。",
  },
  {
    id: "evaluation-loop-as-product-asset",
    title: "评估闭环不是 QA，是产品资产",
    tags: ["Evaluation Loop", "AI Product"],
    excerpt:
      "测试集、Bad Case 分类、验收标准是杠杆。把它们当作产品 artifact 来经营，团队的迭代方式会变。",
  },
  {
    id: "bad-case-attribution-playbook",
    title: "AI 产品经理的 Bad Case 归因 Playbook",
    tags: ["Bad Case Attribution", "Methodology"],
    excerpt:
      "一份实战拆解：把失败追溯到检索、推理、Prompt、工具、数据质量或产品约束。",
  },
] as const
