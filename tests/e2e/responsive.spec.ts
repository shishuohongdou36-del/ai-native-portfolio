import { expect, test } from "@playwright/test"

const SECTION_IDS = ["hero", "about", "capabilities", "projects", "methodology", "writing", "contact"]

test("all sections are reachable without horizontal overflow", async ({ page }) => {
  await page.goto("/")

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(1)

  for (const id of SECTION_IDS) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await expect(page.locator(`section#${id}`)).toBeInViewport()
  }
})

