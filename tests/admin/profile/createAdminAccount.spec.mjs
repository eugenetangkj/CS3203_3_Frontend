import { test, expect } from '@playwright/test'
import createUserAccount from "../../../scripts/users/createUserAccount.mjs";
import deleteAllUsers from '../../../scripts/users/deleteAllUsers.mjs';


/**
This UI test aims to test the E2E flow of an admin creating another admin account.
1. Admin signs in with his admin credentials.
2. Admin clicks on Profile.
3. Admin creates the create admin account button.
4. Admin fills in the credentials of the new admin account.
5. Admin logs out.
6. Admin signs in with his new admin account.
7. Admin clicks on Profile.
8. Admin checks that the current account has the admin role.
9. Admin signs out.
*/
const originalAdminAccountCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}
const newAdminAccountCredentials = {
    name: 'Admin 2',
    email: 'admin2@gmail.com',
    password: "Password2!",
}


//Create original admin account before test runs
test.beforeEach(async () => {
    await createUserAccount(
        originalAdminAccountCredentials.name,
        originalAdminAccountCredentials.email,
        originalAdminAccountCredentials.password,
        "Admin"
    )
})


//Clear all the admin accounts from the database after running the test
test.afterEach(async () => {
    await deleteAllUsers();
});


test.describe('Admin should be able to create a new admin account', () => {
    test('by accessing the create admin account form via the profile page', async ({ page }) => {

        //Step 1: Login as admin
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(originalAdminAccountCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(originalAdminAccountCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000); //Introduce some delay

        //Step 2: Access the create new admin account page via the profile page
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByLabel('', { exact: true }).getByRole('link', { name: 'Profile' }).click();
        await page.waitForTimeout(10000);
        await page.getByRole('button', { name: 'Create Admin Account' }).click();
        await page.waitForTimeout(10000);

        //Step 3: Fill in the create new admin account form
        await page.getByRole('textbox', { name: 'Name' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill(newAdminAccountCredentials.name);
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(newAdminAccountCredentials.email);
        await page.getByRole('textbox', { name: 'Your password', exact: true }).click();
        await page.getByRole('textbox', { name: 'Your password', exact: true }).fill(newAdminAccountCredentials.password);
        await page.getByRole('textbox', { name: 'Confirm your password' }).click();
        await page.getByRole('textbox', { name: 'Confirm your password' }).fill(newAdminAccountCredentials.password);
        await page.getByRole('button', { name: 'Create Account' }).click();
        
        //Step 4: Check that can navigate back to the profile
        await page.getByRole('link', { name: 'Back to Profile' }).click();
        await page.waitForTimeout(5000);
        await expect(page).toHaveURL('http://localhost:3000/profile');

        //Step 5: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
        await page.waitForTimeout(10000);

        //Step 6: Sign in with new admin account
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(newAdminAccountCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(newAdminAccountCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000);

        //Step 7: Navigate to profile to check that the information of the new admin account is present
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByLabel('', { exact: true }).getByRole('link', { name: 'Profile' }).click();
        await page.waitForTimeout(10000);
        expect(page.locator('div').filter({ hasText: /^Admin$/ })).toBeVisible();
        expect(page.getByText(newAdminAccountCredentials.name).nth(1)).toBeVisible();
        expect(page.getByText(`Email Address: ${ newAdminAccountCredentials.email }`)).toBeVisible();
        
        //Step 8: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();  
    })
})
