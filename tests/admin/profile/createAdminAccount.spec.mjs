// import { test, expect } from '@playwright/test'
// import deleteAllCitizens from "../../scripts/deleteAllCitizens.mjs"


// /**
// This UI test aims to test the E2E flow of an admin creating another admin account.
// 1. Admin signs in with his admin credentials.
// 2. Admin clicks on Profile.
// 3. Admin creates the create admin account button.
// 4. Admin fills in the credentials of the new admin account.
// 5. Admin logs out.
// 6. Admin signs in with his new admin account.
// 7. Admin clicks on Profile.
// 8. Admin checks that the current account has the admin role.
// 9. Admin signs out.
// */
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


//Clear all the admin accounts from the database after running the test
test.afterEach(async () => {
    await deleteAllAdmins();
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


    })
})

