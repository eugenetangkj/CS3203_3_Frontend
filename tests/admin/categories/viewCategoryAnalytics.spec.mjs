import { test, expect } from '@playwright/test'
import createUserAccount from "../../../scripts/users/createUserAccount.mjs";
import deleteAllUsers from '../../../scripts/users/deleteAllUsers.mjs';

/**
This UI test aims to test the E2E flow of an admin viewing the category analytics of a category.
1. Admin signs in with his admin credentials.
2. Admin clicks on Categories.
3. Admin clicks on view category analytics of a category.
4. Admin checks that the category analaytics is displayed.
5. Admin signs out.
*/
const adminAccountCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}


//Create original admin account before test runs
test.beforeEach(async () => {
    await createUserAccount(
        adminAccountCredentials.name,
        adminAccountCredentials.email,
        adminAccountCredentials.password,
        "Admin"
    )
})


//Clear all the admin accounts from the database after running the test
test.afterEach(async () => {
    await deleteAllUsers()
});


test.describe('Admin should be able to view the category analytics of a category', () => {
    test('by clicking view category analytics from the all categories page', async ({ page }) => {

        //Step 1: Login as admin
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(adminAccountCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(adminAccountCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000);

        //Step 2: Navigate to the the category analaytics page of the first category in the list
        await page.getByRole('link', { name: 'Categories' }).first().click();
        await page.waitForTimeout(10000);
        await page.getByRole('row', { name: 'Economy #f39c12 View Analytics' }).getByRole('link').click();
        await page.waitForTimeout(15000);

        //Step 3: Check that the important fields of category analytics are present
        //The field values are based on the current category analaytics data used for testing
        await expect(page.getByRole('heading', { name: 'Summary' })).toBeVisible();
        await expect(page.getByText('Discussions center around')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Trending Keywords' })).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Prices$/ })).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Costs$/ })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'ABSA Results' })).toBeVisible();
        await expect(page.getByText('NegativeEconomic data')).toBeVisible();
        await expect(page.getByText('NegativePrice hikes')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Concerns' })).toBeVisible();
        await expect(page.getByText('Rising costs of living due to')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Suggestions' })).toBeVisible();
        await expect(page.getByText('The government should re-')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Most Negative Complaints' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Temasek should immediately' })).toBeVisible();

        //Step 4: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
      });
    }
)
