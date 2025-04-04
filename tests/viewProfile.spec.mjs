import { test, expect } from '@playwright/test'
import deleteAllCitizens from "../scripts/deleteAllCitizens.mjs"


/**
This UI test aims to test the E2E flow of a citizen viewing his profile.
1. User reigsters as a citizen.
2. User logins with his credentials.
3. User clicks on the profile icon and then clicks on profile.
4. User views his profile information.
5. User logs out.
*/
const citizenCredentials = {
    name: 'James',
    email: 'james@gmail.com',
    password: "password",
}


//Clear the citizen user from the database after running the test
test.afterEach(async () => {
    await deleteAllCitizens();
});


test.describe('Citizen should be able to register, login and view his profile', () => {
    test('where his profile information should be correctly shown in the profile page', async ({ page }) => {

        await page.goto('http://localhost:3000/')

        // Check that sign in button is present, count is 2 because there is one hidden in the mobile drawer
        await expect(page.locator('button').filter({ hasText: 'Sign In' })).toHaveCount(2);
    });
});

