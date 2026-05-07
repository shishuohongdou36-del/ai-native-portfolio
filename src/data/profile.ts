// REPLACE ME — placeholder content. Owner can swap any string.
export const profile = {
  name: "姚鑫",
  nameLatin: "Yao Xin",
  title: "AI 产品经理 / AI Native Builder",
  tagline: "设计能思考、决策、执行的 AI 系统。",
  subline:
    "围绕 RAG、多 Agent 工作流、评估闭环和工业级自动化，构建 AI 原生产品。",
  location: "上海 / Remote",
  email: "replace-with-your-email@example.com",
  github: "https://github.com/replace-me",
  socials: [
    { label: "GitHub", url: "https://github.com/replace-me", kind: "github" as const },
    { label: "Email", url: "mailto:replace-with-your-email@example.com", kind: "email" as const },
  ],
} as const

export type Profile = typeof profile
