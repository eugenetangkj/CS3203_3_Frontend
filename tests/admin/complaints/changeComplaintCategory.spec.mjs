import { test, expect } from '@playwright/test'
import createUserAccount from "../../../scripts/users/createUserAccount.mjs"
import runPythonScript from '../../../scripts/initialiser.mjs'

/**
This UI test aims to test the E2E flow of an admin changing the category of a complaint from the All Complaints table.
1. Admin signs in with his admin credentials.
2. Admin clicks on All Complaints
3. Admin clicks on the category dropdown of a complaint.
4. Admin changes the category of the complaint.
5. Admin navigates back to homepage.
6. Admin clicks on All Complaints again.
7. Admin checks that the category of the complaint has been changed.
8. Admin signs out.
*/
const adminCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}

//Create admin account before test runs
test.beforeEach(async () => {
    await createUserAccount(
        adminCredentials.name,
        adminCredentials.email,
        adminCredentials.password,
        "Admin"
    )
})

//Reset the database states
test.afterEach(async () => {
    try {
        const result = await runPythonScript();
        console.log('Python script executed successfully:', result);
      } catch (error) {
        console.error('Error running the Python script:', error);
      }
});


test.describe('Admin should be able change the category of a complaint', () => {
    test('by using the category dropdown available in each row of the All Complaints table', async ({ page }) => {

        //Step 1: Login as admin
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(adminCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(adminCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000);

        //Step 2: Navigate to the All Complaints page
        await page.getByRole('link', { name: 'All Complaints' }).first().click();
        await page.waitForTimeout(10000);

        //Step 3: Change the category of a complaint
        await page.getByRole('row', { name: 'A plan for a second east-west' }).getByRole('combobox').click();
        await page.getByPlaceholder('Search category...').click();
        await page.getByPlaceholder('Search category...').fill('housing'); //Change to a random category that is different from the current category of this complaint
        await page.getByRole('option', { name: 'Housing' }).click();

        //Step 4: Assert that the category has been changed successfully
        await page.waitForTimeout(10000);
        await page.getByRole('link', { name: 'Just Yap!' }).click();
        await page.waitForTimeout(20000);
        await page.getByRole('link', { name: 'All Complaints' }).first().click();
        await page.waitForTimeout(10000);
        const comboBox = page.getByRole('row', { name: 'A plan for a second east-west' }).getByRole('combobox');
        await expect(comboBox).toHaveText('Housing');

        //Step 5: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();  
    })
})
