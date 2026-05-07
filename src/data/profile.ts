// REPLACE ME — owner can swap any string here.
export const profile = {
  name: "Yao Xin",
  title: "AI Product Manager / AI Native Builder",
  tagline: "Designing AI systems that think, decide, and execute.",
  subline:
    "I build AI-native products across RAG, multi-agent workflows, evaluation loops, and industry-grade automation.",
  location: "Shanghai / Remote",
  email: "replace-with-your-email@example.com",
  github: "https://github.com/replace-me",
  socials: [
    { label: "GitHub", url: "https://github.com/replace-me", kind: "github" as const },
    { label: "Email", url: "mailto:replace-with-your-email@example.com", kind: "email" as const },
  ],
} as const

export type Profile = typeof profile
