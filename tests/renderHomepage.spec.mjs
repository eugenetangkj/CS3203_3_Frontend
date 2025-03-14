import { test, expect } from '@playwright/test'


test('should render homepage details', async ({ page }) => {
  // Start from base URL
  await page.goto('http://localhost:3000/')

  // Check that homepage is correctly rendered with the headings
  await expect(page.locator('h1').first()).toContainText('People yap and have complaints.');
  await expect(page.locator('h1').nth(1)).toContainText('Here, we turn it into data that matters.');
})


test('should be signed out when the user first accesses the homepage ', async ({ page }) => {
  // Start from base URL
  await page.goto('http://localhost:3000/')

  // Check that sign in button is present, count is 2 because there is one hidden in the mobile drawer
  await expect(page.locator('button').filter({ hasText: 'Sign In' })).toHaveCount(2);

  // Check that nav links are correctly rendered based on the user's status where the user is not signed in
  await expect(page.locator('a').filter({ hasText: 'Polls' })).toHaveCount(2);
  await expect(page.locator('button').filter({ hasText: 'All Complaints' })).toHaveCount(0);
  await expect(page.locator('button').filter({ hasText: 'Categories' })).toHaveCount(0);
  await expect(page.locator('button').filter({ hasText: 'Analytics' })).toHaveCount(0);
})