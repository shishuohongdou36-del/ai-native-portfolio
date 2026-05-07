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
    name: "AI Customer Service Agent",
    category: "Insurance AI / Customer Support",
    problem:
      "Traditional customer service workflows struggled with repetitive inquiries, fragmented knowledge, and inconsistent response quality.",
    designed:
      "Designed an AI-assisted customer service workflow combining intent recognition, retrieval, response generation, and human escalation.",
    pattern: "RAG + Workflow Orchestration + Human-in-the-loop Review",
    role: "Product workflow design, knowledge structure, evaluation loop, and bad case analysis.",
    impact: "Placeholder for response efficiency, quality improvement, or coverage expansion.",
    accent: "cyan",
  },
  {
    id: "ai-underwriting-decision-chain",
    name: "AI Underwriting Decision Chain",
    category: "Insurance AI / Decision Workflow",
    problem:
      "Legacy rule-based underwriting struggled with long medical records, multi-source materials, and complex disease reasoning.",
    designed:
      "Designed a layered workflow from material parsing to field extraction, disease deduplication, code mapping, and underwriting reasoning.",
    pattern: "Document Parsing + Information Extraction + Rule Reasoning + Human Review",
    role: "Layered decision chain design, evaluation criteria, workflow boundary definition, and reasoning process structuring.",
    impact: "Placeholder for accuracy improvement, processing efficiency, or review reduction.",
    accent: "violet",
  },
  {
    id: "ai-marketing-content-workflow",
    name: "AI Marketing Content Workflow",
    category: "Insurance AI / Marketing Enablement",
    problem:
      "Sales teams needed faster and more consistent generation of compliant, scenario-based marketing content.",
    designed:
      "Designed a structured content generation workflow with scenario templates, brand constraints, review logic, and reusable prompt patterns.",
    pattern: "Prompt Workflow + Content Template + Review Loop",
    role: "Product logic design, scenario decomposition, content workflow design, and quality control.",
    impact: "Placeholder for content production efficiency, adoption rate, or sales enablement value.",
    accent: "blue",
  },
  {
    id: "agent-workflow-skills-system",
    name: "Agent Workflow & Skills System",
    category: "AI Native Builder / Workflow System",
    problem:
      "Repeated AI tasks were difficult to standardize, evaluate, and reuse across different product scenarios.",
    designed:
      "Built a reusable workflow and skills methodology to transform repeated AI work into structured, executable patterns.",
    pattern: "Agent Workflow + Skills + Evaluation + Iteration Loop",
    role: "AI workflow design, skill abstraction, tool usage strategy, and builder methodology development.",
    impact: "Placeholder for prototype speed, delivery efficiency, or workflow reuse.",
    accent: "green",
  },
] as const
