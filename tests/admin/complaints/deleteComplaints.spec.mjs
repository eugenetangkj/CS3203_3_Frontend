import { test, expect } from '@playwright/test'
import createUserAccount from "../../../scripts/users/createUserAccount.mjs"
import runPythonScript from '../../../scripts/initialiser.mjs'

/**
This UI test aims to test the E2E flow of an admin deleting complaints from the All Complaints table.
1. Admin signs in with his admin credentials.
2. Admin clicks on All Complaints
3. Admin selects multiple complaints.
4. Admin deletes the complaints.
5. Admin checks that the complaints are no longer present in the All Complaints table.
5. Admin navigates back to homepage.
6. Admin clicks on All Complaints again.
7. Admin checks that the complaints are no longer present in the All Complaints table.
8. Admin signs out.
*/
const adminCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}

//Create admin account before test runs
test.beforeEach(async () => {
    try {
        const result = await runPythonScript();
        console.log('Python script executed successfully:', result);
      } catch (error) {
        console.error('Error running the Python script:', error);
    }
    
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


test.describe('Admin should be able delete complaints', () => {
    test('by selecting and deleting them from the All Complaints table', async ({ page }) => {

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

        //Step 3: Select complaints via multiselect and delete them
        await page.getByRole('row', { name: 'What is the economic argument' }).getByRole('checkbox').click(); //Current top 2 complaints in the page
        await page.getByRole('row', { name: 'Half of workers in Singapore' }).getByRole('checkbox').click(); //Current top 2 complaints in the page
        await page.getByRole('button', { name: 'Delete' }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();
        
        //Step 4: Assert that the complaints are no longer present
        await page.waitForTimeout(10000);
        await expect(page.getByRole('link', { name: 'What is the economic argument' })).toBeHidden();
        await expect(page.getByRole('link', { name: 'Half of workers in Singapore' })).toBeHidden();

        //Step 5: Navigate to homepage and back to All Complaints to check again that the complaints are no longer present
        await page.getByRole('link', { name: 'Just Yap!' }).click();
        await page.getByRole('link', { name: 'All Complaints' }).first().click();
        await page.waitForTimeout(10000);
        await expect(page.getByRole('link', { name: 'What is the economic argument' })).toBeHidden();
        await expect(page.getByRole('link', { name: 'Half of workers in Singapore' })).toBeHidden();

        //Step 6: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();  
    })
})
