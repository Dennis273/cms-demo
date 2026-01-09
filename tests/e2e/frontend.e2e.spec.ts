import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('http://localhost:3000/en')
    await expect(page).toHaveTitle(/CloudFlow/)
  })

  test('homepage has hero section', async ({ page }) => {
    await page.goto('http://localhost:3000/en')
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('plans page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/en/plans')
    await expect(page).toHaveTitle(/Plans/)
  })

  test('docs page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/en/docs')
    await expect(page).toHaveTitle(/Docs/)
  })

  test('showcase page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/en/showcase')
    await expect(page).toHaveTitle(/Customer/)
  })

  test('locale switching works', async ({ page }) => {
    await page.goto('http://localhost:3000/zh')
    await expect(page).toHaveTitle(/CloudFlow/)

    await page.goto('http://localhost:3000/ja')
    await expect(page).toHaveTitle(/CloudFlow/)
  })
})
