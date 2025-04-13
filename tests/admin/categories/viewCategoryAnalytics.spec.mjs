import { test, expect } from '@playwright/test'
import deleteAllUsers from '../../../scripts/users/deleteAllUsers.mjs';
import runPythonScript from '../../../scripts/initialiser.mjs';
import setAccountAsAdmin from "../../../scripts/users/setAccountAsAdmin.mjs";

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
test.beforeEach(async ({ page }) => {
    //Reset database
    try {
        const result = await runPythonScript();
        console.log('Python script executed successfully:', result);
    } catch (error) {
        console.error('Error running the Python script:', error);
    }

    //Create admin account
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Sign In' }).first().click();
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill(adminAccountCredentials.name);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(adminAccountCredentials.email);
    await page.getByRole('textbox', { name: 'Your password', exact: true }).click();
    await page.getByRole('textbox', { name: 'Your password', exact: true }).fill(adminAccountCredentials.password);
    await page.getByRole('textbox', { name: 'Confirm your password' }).click();
    await page.getByRole('textbox', { name: 'Confirm your password' }).fill(adminAccountCredentials.password);
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.waitForTimeout(10000);

    await setAccountAsAdmin(adminAccountCredentials.email)
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
        await page.getByRole('row', { name: 'Economy #f39c12 View Analytics' }).getByRole('link').click()
        await page.waitForTimeout(15000);

        //Step 3: Check that the important fields of category analytics are present
        //The field values are based on the current category analaytics data used for testing
        await expect(page.getByRole('heading', { name: 'Time Period for Analytics' })).toBeVisible();
        await expect(page.getByText('10-2024 to 03-2025')).toBeVisible();

        await expect(page.getByRole('heading', { name: 'Summary' })).toBeVisible();
        await expect(page.getByText('The Reddit posts reveal a')).toBeVisible();

        await expect(page.getByRole('heading', { name: 'ABSA Results' })).toBeVisible();
        await expect(page.getByText('NegativeGovernment funding')).toBeVisible();
        await expect(page.getByText('NegativeOperating costs')).toBeVisible();

        await expect(page.getByRole('heading', { name: 'Concerns' })).toBeVisible();
        await expect(page.getByText('Increasing costs of living,')).toBeVisible();

        await expect(page.getByRole('heading', { name: 'Suggestions' })).toBeVisible();
        await expect(page.getByText('Implement policies to curb')).toBeVisible();

        await expect(page.getByRole('heading', { name: 'Statistics' })).toBeVisible();
        await expect(page.getByText('14Total no. of complaints')).toBeVisible()
        await expect(page.getByText('-0.384Average sentiment')).toBeVisible()
        await expect(page.getByText('-0.548Forecasted sentiment')).toBeVisible()

        await expect(page.getByRole('heading', { name: 'List of Complaints' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'What is the economic argument' })).toBeVisible();

        //Step 4: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
      });
    }
)
