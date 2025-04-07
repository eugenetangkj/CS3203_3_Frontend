import { test, expect } from '@playwright/test'
import createUserAccount from "../../../scripts/users/createUserAccount.mjs";
import deleteAllUsers from '../../../scripts/users/deleteAllUsers.mjs';
import runPythonScript from '../../../scripts/initialiser.mjs'

/**
This UI test aims to test the E2E flow of an admin downloading the category analytics of a category.
1. Admin signs in with his admin credentials.
2. Admin clicks on Categories.
3. Admin clicks on view category analytics of a category.
4. Admin downloads the category analytics.
5. Admin checks that the category analytics is downloaded.
5. Admin signs out.
*/
const adminAccountCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}


//Create original admin account before test runs
test.beforeEach(async () => {
    try {
        const result = await runPythonScript();
        console.log('Python script executed successfully:', result);
    } catch (error) {
        console.error('Error running the Python script:', error);
    }

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


test.describe('Admin should be able to download the category analytics of a category', () => {
    test('by clicking download category analytics from a category analytics page', async ({ page }) => {

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

        //Step 3: Click download category analytics
        await page.getByRole('button', { name: 'Download Report' }).click();

        //Step 4: Assert that the category analytics PDF is downloaded
        const downloadPromise = page.waitForEvent('download');
        const download = await downloadPromise;
        const downloadPath = await download.path();
        expect(downloadPath).not.toBeNull(); 
      
        //Step 5: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    });
})
