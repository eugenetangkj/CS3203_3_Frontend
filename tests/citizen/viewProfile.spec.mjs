import { test, expect } from '@playwright/test'
import deleteAllUsers from '../../scripts/users/deleteAllUsers.mjs'
import runPythonScript from '../../scripts/initialiser.mjs'


/**
This UI test aims to test the E2E flow of a citizen viewing his profile.
1. User registers as a citizen.
2. User signs in with his credentials.
3. User clicks on the profile icon and then clicks on profile.
4. User views his profile information.
5. User logs out.
*/
const citizenCredentials = {
    name: 'James',
    email: 'james@gmail.com',
    password: "Password1!",
}


test.beforeEach(async () => {
    try {
        const result = await runPythonScript();
        console.log('Python script executed successfully:', result);
    } catch (error) {
        console.error('Error running the Python script:', error);
    }
});

//Clear the citizen user from the database after running the test
test.afterEach(async () => {
    await deleteAllUsers();
});


test.describe('Citizen should be able to register, login and view his profile', () => {
    test('where his profile information should be correctly shown in the profile page', async ({ page }) => {

        //Step 1: Register for a new citizen account
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByRole('textbox', { name: 'Name' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill(citizenCredentials.name);
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(citizenCredentials.email);
        await page.getByRole('textbox', { name: 'Your password', exact: true }).click();
        await page.getByRole('textbox', { name: 'Your password', exact: true }).fill(citizenCredentials.password);
        await page.getByRole('textbox', { name: 'Confirm your password' }).click();
        await page.getByRole('textbox', { name: 'Confirm your password' }).fill(citizenCredentials.password);
        await page.getByRole('button', { name: 'Sign Up' }).click();

        //Step 2: Sign in with the citizen credentials and check that user is redirected to homepage after signing in
        await page.getByRole('link', { name: 'Sign in', exact: true }).click();
        await page.waitForTimeout(10000); //Introduce some delay
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(citizenCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(citizenCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000); //Introduce some delay
        await expect(page).toHaveURL('http://localhost:3000/');

        //Step 3: View profile page and check that profile information is rendered correctly
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByLabel('', { exact: true }).getByRole('link', { name: 'Profile' }).click();
        await expect(page.locator('div').filter({ hasText: /^Citizen$/ })).toBeVisible();
        await expect(page.getByText(citizenCredentials.name).nth(1)).toBeVisible();
        await expect(page.getByText(`Email Address: ${ citizenCredentials.email }`)).toBeVisible();

        //Step 4: Sign out and check that user is redirected to homepage after signing out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();  
        await expect(page).toHaveURL('http://localhost:3000/');
    })
})

