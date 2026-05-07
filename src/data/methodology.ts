export interface MethodologyStep {
  step: "01" | "02" | "03" | "04" | "05" | "06"
  title: string
  description: string
}

export const methodology: readonly MethodologyStep[] = [
  {
    step: "01",
    title: "Problem Framing",
    description:
      "Clarify the business problem, user context, decision boundaries, and expected value before designing the AI workflow.",
  },
  {
    step: "02",
    title: "Workflow Decomposition",
    description:
      "Break complex AI tasks into observable steps with clear inputs, outputs, and failure modes.",
  },
  {
    step: "03",
    title: "Evaluation Loop",
    description:
      "Define test sets, metrics, acceptance criteria, and regression checks before scaling the solution.",
  },
  {
    step: "04",
    title: "Bad Case Attribution",
    description:
      "Trace failures back to retrieval, reasoning, prompt design, tool use, data quality, or product constraints.",
  },
  {
    step: "05",
    title: "Strategy Refinement",
    description:
      "Improve prompts, workflows, tools, memory, routing logic, and human review policies based on evidence.",
  },
  {
    step: "06",
    title: "Skill / Productization",
    description:
      "Turn repeated patterns into reusable skills, templates, workflows, and productized operating methods.",
  },
] as const
