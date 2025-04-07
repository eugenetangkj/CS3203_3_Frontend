import { test, expect } from '@playwright/test'
import createUserAccount from "../../../scripts/users/createUserAccount.mjs";
import deleteAllUsers from '../../../scripts/users/deleteAllUsers.mjs';
import deleteAllPolls from '../../../scripts/polls/deleteAllPolls.mjs';
import createPolls from '../../../scripts/polls/createPolls.mjs';
import runPythonScript from '../../../scripts/initialiser.mjs'

/**
This UI test aims to test the E2E flow of an admin publishing a poll.
1. Admin signs in with his admin credentials.
2. Admin clicks on Polls
3. Admin clicks on an existing unpublished poll.
4. Admin publishes the poll.
5. Admin checks that the poll is published.
6. Admin signs out.
*/
const adminAccountCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}

const polls = [
    {
        question: "What do you think of the Singapore zoo?",
        category: "Others",
        question_type: "Open-ended",
        options: [],
        date_created: "02-04-2025 08:00:00",
        date_published: null,
        date_closed: null,
        status: "Unpublished"
    }
]


test.beforeEach(async () => {
    try {
        const result = await runPythonScript();
        console.log('Python script executed successfully:', result);
    } catch (error) {
        console.error('Error running the Python script:', error);
    }

    //Set up admin account
    await createUserAccount(
        adminAccountCredentials.name,
        adminAccountCredentials.email,
        adminAccountCredentials.password,
        "Admin"
    )

    //Insert the poll
    await createPolls(polls)
})


test.afterEach(async () => {
    //Clear all the admin accounts and polls
    await deleteAllUsers()
    await deleteAllPolls()
});


test.describe('Admin should be able to publish a poll', () => {
    test('by clicking on the publish poll button from the polls page', async ({ page }) => {
        //Step 1: Login as admin
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(adminAccountCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(adminAccountCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000);

        //Step 2: Navigate to the Polls page and click on the poll to be published
        await page.getByRole('link', { name: 'Polls' }).first().click();
        await page.waitForTimeout(10000);
        await page.getByRole('link', { name: polls[0].question }).click();
        await page.waitForTimeout(10000);
        await expect(page.getByRole('heading', { name: 'Poll Responses' })).not.toBeVisible();
        await expect(page.getByText('There is no poll response.')).not.toBeVisible();
        await expect(page.getByText('Status:Unpublished')).toBeVisible();

        //Step 3: Click on the publish poll button
        await page.getByRole('button', { name: 'Publish Poll' }).click();
        await page.getByRole('button', { name: 'Publish' }).click();

        //Step 4: Check that the poll is published where poll responses section is now available
        await page.waitForTimeout(10000);
        await expect(page.getByText('Status:Published')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Poll Responses' })).toBeVisible();
        await expect(page.getByText('There is no poll response.')).toBeVisible();

        //Step 5: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    });
});
