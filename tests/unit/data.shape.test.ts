import { describe, expect, it } from "vitest"
import { capabilities } from "@/data/capabilities"
import { channels, primaryCta, secondaryCta } from "@/data/contact"
import { methodology } from "@/data/methodology"
import { profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { writing } from "@/data/writing"
import { ACCENT_KEYS, SECTION_IDS } from "@/lib/constants"

const CAPABILITY_IDS = [
  "rag",
  "multi-agent",
  "workflow-design",
  "evaluation-loop",
  "ai-coding",
  "insurance-ai",
] as const

describe("data contracts", () => {
  it("profile matches C1", () => {
    expect(profile.name).toEqual(expect.any(String))
    expect(profile.title).toEqual(expect.any(String))
    expect(profile.tagline).toEqual(expect.any(String))
    expect(profile.subline).toEqual(expect.any(String))
    expect(profile.location).toEqual(expect.any(String))
    expect(profile.email).toMatch(/.+@.+\..+/)
    expect(profile.github).toMatch(/^https?:\/\//)
    expect(profile.socials.length).toBeGreaterThanOrEqual(1)
    for (const social of profile.socials) {
      expect(social.label).toEqual(expect.any(String))
      expect(social.url).toMatch(/^(https?:\/\/|mailto:)/)
      expect(["github", "x", "linkedin", "wechat", "mastodon", "email", "other"]).toContain(social.kind)
    }
  })

  it("capabilities keep the locked six-item id set and optional detail contract", () => {
    expect(capabilities).toHaveLength(6)
    expect(capabilities.map((capability) => capability.id).sort()).toEqual([...CAPABILITY_IDS].sort())
    for (const capability of capabilities) {
      expect(capability.name.length).toBeGreaterThan(0)
      expect(capability.description.length).toBeGreaterThan(0)
      expect(capability.description.length).toBeLessThanOrEqual(160)
      expect(ACCENT_KEYS).toContain(capability.accent)
      if (capability.detail) {
        expect(capability.detail.length).toBeGreaterThan(0)
        expect(capability.detail.length).toBeLessThanOrEqual(180)
      }
    }
  })

  it("projects follow C3 cardinality and accent distribution", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3)
    expect(projects.length).toBeLessThanOrEqual(4)

    const accentCounts = new Map<string, number>()
    for (const project of projects) {
      expect(project.id).toMatch(/^[a-z0-9-]+$/)
      expect(project.name.length).toBeGreaterThan(0)
      expect(project.category.length).toBeGreaterThan(0)
      expect(project.problem.length).toBeGreaterThan(0)
      expect(project.designed.length).toBeGreaterThan(0)
      expect(project.pattern.length).toBeGreaterThan(0)
      expect(project.pattern.length).toBeLessThanOrEqual(120)
      expect(project.role.length).toBeGreaterThan(0)
      expect(project.impact.length).toBeGreaterThan(0)
      expect(ACCENT_KEYS).toContain(project.accent)
      accentCounts.set(project.accent, (accentCounts.get(project.accent) ?? 0) + 1)
    }

    expect(Math.max(...accentCounts.values())).toBeLessThanOrEqual(2)
  })

  it("methodology steps are ordered 01 through 06", () => {
    expect(methodology.map((step) => step.step)).toEqual(["01", "02", "03", "04", "05", "06"])
    for (const step of methodology) {
      expect(step.title.length).toBeGreaterThan(0)
      expect(step.description.length).toBeGreaterThan(0)
    }
  })

  it("writing and contact exports satisfy their contracts", () => {
    expect(writing.length).toBeGreaterThanOrEqual(3)
    for (const entry of writing) {
      expect(entry.id).toMatch(/^[a-z0-9-]+$/)
      expect(entry.title.length).toBeGreaterThan(0)
      expect(entry.tags.length).toBeGreaterThanOrEqual(1)
      expect(entry.tags.length).toBeLessThanOrEqual(4)
      expect(entry.excerpt.length).toBeGreaterThan(0)
    }

    const validAnchors = new Set(Object.values(SECTION_IDS).map((id) => `#${id}`))
    expect(validAnchors).toContain(primaryCta.href)
    expect(validAnchors).toContain(secondaryCta.href)
    expect(channels.length).toBeGreaterThanOrEqual(3)
  })
})

