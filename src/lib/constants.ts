export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  capabilities: "capabilities",
  projects: "projects",
  methodology: "methodology",
  writing: "writing",
  contact: "contact",
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const NAV_LINKS: Array<{ id: SectionId; label: string }> = [
  { id: SECTION_IDS.about, label: "关于" },
  { id: SECTION_IDS.capabilities, label: "能力" },
  { id: SECTION_IDS.projects, label: "作品" },
  { id: SECTION_IDS.methodology, label: "方法论" },
  { id: SECTION_IDS.writing, label: "写作" },
  { id: SECTION_IDS.contact, label: "联系" },
]

export const ACCENT_KEYS = ["cyan", "violet", "blue", "green"] as const
export type AccentKey = (typeof ACCENT_KEYS)[number]

export const ACCENT_HEX: Record<AccentKey, string> = {
  cyan: "#45E6FF",
  violet: "#8B5CFF",
  blue: "#3B82F6",
  green: "#5FFFB1",
}

export const BREAKPOINT_MOBILE_PX = 768

export const DATA_CONTRACT_VERSION = 1
