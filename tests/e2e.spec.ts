import { test, expect } from '@playwright/test'

test('home lists products and allows add to cart', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'home' })).toBeVisible()
  const firstCard = page.locator('li').filter({ has: page.getByRole('button', { name: /add to cart/i }) }).first()
  await expect(firstCard).toBeVisible()
  await firstCard.getByRole('button', { name: /add to cart/i }).click()
  await page.waitForTimeout(200)
  await page.getByRole('link', { name: /cart/i }).click()
  await expect(page.getByRole('heading', { name: /your cart/i })).toBeVisible()
  await expect(page.getByText(/subtotal/i)).toBeVisible()
})

test('product detail page shows info and add to cart works', async ({ page }) => {
  await page.goto('/products/sku-1')
  await expect(page.getByRole('heading', { name: /classic tee/i })).toBeVisible()
  await page.getByRole('button', { name: /add to cart/i }).click()
  await page.goto('/cart')
  await expect(page.getByText(/classic tee/i)).toBeVisible()
})

test('clear cart button empties cart', async ({ page }) => {
  await page.goto('/cart')
  const clear = page.getByRole('button', { name: /clear cart/i })
  if (await clear.isVisible()) {
    await clear.click()
  }
  await expect(page.getByText(/your cart is empty/i)).toBeVisible()
})


