import { SECTION_IDS } from "@/lib/constants"
import { profile } from "./profile"

export interface ContactChannel {
  label: string
  value: string
  href: string
  kind: "email" | "github" | "x" | "linkedin" | "wechat" | "rss" | "other"
}

export const primaryCta = {
  label: "Explore My Work",
  href: `#${SECTION_IDS.projects}`,
} as const

export const secondaryCta = {
  label: "View Methodology",
  href: `#${SECTION_IDS.methodology}`,
} as const

export const channels: readonly ContactChannel[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    kind: "email",
  },
  {
    label: "GitHub",
    value: profile.github.replace(/^https?:\/\//, ""),
    href: profile.github,
    kind: "github",
  },
  {
    label: "X / Twitter",
    value: "@replace-me",
    href: "https://x.com/replace-me",
    kind: "x",
  },
] as const
