import { test, expect } from '@playwright/test'
import runPythonScript from '../../../scripts/initialiser.mjs'
import setAccountAsAdmin from "../../../scripts/users/setAccountAsAdmin.mjs";

/**
This UI test aims to test the E2E flow of an admin viewing the list of categories and updating the colour of a category.
1. Admin signs in with his admin credentials.
2. Admin clicks on Categories.
3. Admin changes the colour of a category.
4. Admin checks that the colour of the category has been updated.
5. Admin navigates to homepage and back to categories to check that the colour of the category has been updated.
6. Admin signs out.
*/
const adminAccountCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}

const originalColour = '#f39c12'
const colourToChangeTo = '#c4a573';

//Create original admin account before test runs
test.beforeEach(async ({ page }) => {
    //Reset
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

    //Manually set to an admin
    await setAccountAsAdmin(adminAccountCredentials.email)
})


//Clear all the admin accounts from the database after running the test
test.afterEach(async () => {
    try {
        const result = await runPythonScript();
        console.log('Python script executed successfully:', result);
      } catch (error) {
        console.error('Error running the Python script:', error);
      }
});


test.describe('Admin should be able to change the colour of a category', () => {
    test('in the all categories page that shows a list of categories', async ({ page }) => {

        //Step 1: Login as admin
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(adminAccountCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(adminAccountCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000);

        //Step 2: Navigate to the all categories page and check that all the categories are present
        await page.getByRole('link', { name: 'Categories' }).first().click();
        await page.waitForTimeout(10000);
        await expect(page.getByRole('cell', { name: 'Economy' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Education' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Employment' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Environment' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Healthcare' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Housing' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Infrastructure' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Legal' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Others' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Politics' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Public Health' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Public Safety' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Technology' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Transport' })).toBeVisible();

        //Step 3: Change the colour of a category
        await page.getByRole('cell', { name: originalColour }).getByRole('textbox').click();
        await page.getByRole('cell', { name: originalColour }).getByRole('textbox').fill(colourToChangeTo);
        await page.getByRole('cell', { name: 'Colour Code' }).click(); //Just to remove the focus from the colour picker

        //Step 4: Check that the colour of the category has been updated
        await page.waitForTimeout(10000);
        await expect(page.getByRole('cell', { name: colourToChangeTo })).toBeVisible();
        
        //Step 5: Navigate to homepage and back to categories to check that the colour of the category has been updated
        await page.getByRole('link', { name: 'Just Yap!' }).click();
        await page.getByRole('link', { name: 'Categories' }).first().click();
        await expect(page.getByRole('cell', { name: colourToChangeTo })).toBeVisible();

        //Step 6: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
      });
    }
)