import { expect, test } from "@playwright/test"

const SECTION_IDS = ["hero", "about", "capabilities", "projects", "methodology", "writing", "contact"]

test("renders all required sections and anchor navigation works", async ({ page }) => {
  await page.goto("/")

  for (const id of SECTION_IDS) {
    await expect(page.locator(`section#${id}`)).toBeVisible()
  }

  await page.locator('a[href="#contact"]').first().click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.locator("section#contact")).toBeInViewport()
})

test("project card hover exposes both motion layers", async ({ page }) => {
  await page.goto("/#projects")
  const card = page.locator("#projects article").first()
  const footer = card.locator("footer")
  const dot = card.locator("span[aria-hidden]").first()

  await card.hover()
  await page.waitForTimeout(450)

  const cardTransform = await card.evaluate((element) => getComputedStyle(element).transform)
  const footerTransform = await footer.evaluate((element) => getComputedStyle(element).transform)
  const dotShadow = await dot.evaluate((element) => getComputedStyle(element).boxShadow)

  expect(cardTransform).not.toBe("none")
  expect(footerTransform).not.toBe("none")
  expect(dotShadow).not.toBe("none")
})

