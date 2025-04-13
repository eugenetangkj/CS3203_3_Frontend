import { test, expect } from '@playwright/test'
import deleteAllUsers from '../../../scripts/users/deleteAllUsers.mjs';
import runPythonScript from '../../../scripts/initialiser.mjs';
import setAccountAsAdmin from "../../../scripts/users/setAccountAsAdmin.mjs";

/**
This UI test aims to test the E2E flow of an admin browsing complaints, using the pagination functions.
1. Admin signs in with his admin credentials.
2. Admin clicks on All Complaints
3. Admin views the first page of complaints.
4. Admin clicks on the next page of complaints.
5. Admin views the second page of complaints.
6. Admin navigates back to the first page of complaints.
7. Admin signs out.
*/
const adminAccountCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}

//Create admin account before test runs
test.beforeEach(async ({ page }) => {
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
    await deleteAllUsers();
});


test.describe('Admin should be able to view pages of complaints', () => {
    test('by using the pagination features in the All Complaints page', async ({ page }) => {

        //Step 1: Login as admin
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(adminAccountCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(adminAccountCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000);

        //Step 2: Navigate to the All Complaints page
        await page.getByRole('link', { name: 'All Complaints' }).first().click();
        await page.waitForTimeout(10000);

        //Step 3: Check against the first entry in Page 1 of the all complaints table. Use current latest complaint based on the available data.
        await expect(page.getByRole('link', { name: 'Why do most people walk on' })).toBeVisible(); //Current latest complaint available based on the available data 
        expect(page.getByRole('row', { name: 'Why do most people walk on' }).getByRole('paragraph').nth(1)).toBeVisible();
        expect(page.getByText('-04-2025 12:28:07')).toBeVisible();
        await expect(page.getByRole('row', { name: 'Why do most people walk on' }).locator('p').nth(3)).toHaveText('Reddit');
        await expect(page.getByRole('row', { name: 'Why do most people walk on' }).locator('p').nth(4)).toHaveText('-0.458');

        //Step 4: Assert against the page number and total number of results
        await expect(page.getByRole('heading', { name: 'Page 1 of 26' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Total Results: 2547' })).toBeVisible();

        //Step 5: Try pagination next page
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(10000);

        //Step 6: Check against the first entry in Page 2 of the all complaints table. Use the 101th latest complaint based on the available data, since each page has 100 complaints.
        await expect(page.getByRole('link', { name: 'Scam Alert 3 months later' })).toBeVisible();

        //Step 7: Assert against the page number and total number of results
        await expect(page.getByRole('heading', { name: 'Page 2 of 26' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Total Results: 2547' })).toBeVisible();

        //Step 8: Try pagination previous page
        await page.getByRole('button', { name: 'Previous' }).click();

        //Step 9: Check that the first entry in Page 1 of the all complaints table is still the same as before
        await expect(page.getByRole('link', { name: 'Why do most people walk on' })).toBeVisible();

        //Step 10: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();  
    })
})
