export interface WritingEntry {
  id: string
  title: string
  tags: string[]
  excerpt: string
  url?: string
  publishedAt?: string
}

// REPLACE ME — placeholders until owner adds real essays.
export const writing: readonly WritingEntry[] = [
  {
    id: "agent-workflows-vs-prompts",
    title: "Agent Workflows vs. Prompts: Where the Real Engineering Lives",
    tags: ["Multi-Agent", "Workflow Design"],
    excerpt:
      "Why durable AI products are built around workflows and evaluation loops, not just prompt tuning — and how to draw that line as a product manager.",
  },
  {
    id: "evaluation-loop-as-product-asset",
    title: "Evaluation Loops Are a Product Asset, Not a QA Step",
    tags: ["Evaluation Loop", "AI Product"],
    excerpt:
      "Test sets, bad-case taxonomies, and acceptance criteria are leverage. Treating them as product artifacts changes how a team improves over time.",
  },
  {
    id: "bad-case-attribution-playbook",
    title: "A Bad-Case Attribution Playbook for AI Product Managers",
    tags: ["Bad Case Attribution", "Methodology"],
    excerpt:
      "A field-tested decomposition for tracing failures back to retrieval, reasoning, prompts, tools, data quality, or product constraints.",
  },
] as const
