import { test, expect } from '@playwright/test'
import deleteAllUsers from '../../../scripts/users/deleteAllUsers.mjs';
import deleteAllPolls from '../../../scripts/polls/deleteAllPolls.mjs';
import createPolls from '../../../scripts/polls/createPolls.mjs';
import runPythonScript from '../../../scripts/initialiser.mjs'
import setAccountAsAdmin from "../../../scripts/users/setAccountAsAdmin.mjs";

/**
This UI test aims to test the E2E flow of an admin updating an unpublished poll.
1. Admin signs in with his admin credentials.
2. Admin clicks on Polls
3. Admin clicks on an existing unpublished poll.
4. Admin edits the poll and saves the changes.
6. Admin navigates back to all polls page to check if poll changes are made.
6. Admin returns to the poll page to check that the poll changes are present.
7. Admin signs out.
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


const newPoll = {
    question: "Are you satisfied with the Singapore zoo?",
    category: "Environment",
    question_type: "MCQ",
    options: ['Satisfied', 'Unsatisfied'],
    date_created: "02-04-2025 08:00:00",
    date_published: null,
    date_closed: null,
    status: "Unpublished"
}


test.beforeEach(async ({ page }) => {
    try {
        const result = await runPythonScript();
        console.log('Python script executed successfully:', result);
      } catch (error) {
        console.error('Error running the Python script:', error);
    }

    //Set up admin account
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

    //Insert the poll
    await createPolls(polls)
})


test.afterEach(async () => {
    //Clear all the admin accounts and polls
    await deleteAllUsers()
    await deleteAllPolls()
});


test.describe('Admin should be able to update an unpublished poll', () => {
    test('by editing the poll and clicking save changes', async ({ page }) => {
        //Step 1: Login as admin
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Sign In' }).first().click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill(adminAccountCredentials.email);
        await page.getByRole('textbox', { name: 'Your password' }).click();
        await page.getByRole('textbox', { name: 'Your password' }).fill(adminAccountCredentials.password);
        await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(10000);

        //Step 2: Navigate to the Polls page and click on the poll to be updated
        await page.getByRole('link', { name: 'Polls' }).first().click();
        await page.getByRole('link', { name: polls[0].question }).click();
        await page.waitForTimeout(10000);

        //Step 3: Edit the poll
        await page.getByRole('textbox', { name: 'Enter the poll question...' }).click();
        await page.getByRole('textbox', { name: 'Enter the poll question...' }).fill(newPoll.question);
        await page.getByText('Others').click();
        await page.getByRole('option', { name: newPoll.category }).click();
        await page.getByRole('combobox').filter({ hasText: 'Open-ended' }).click();
        await page.getByRole('option', { name: 'MCQ' }).click();
        await page.getByRole('textbox', { name: 'Enter a new option...' }).click();
        await page.getByRole('textbox', { name: 'Enter a new option...' }).fill(newPoll.options[0]);
        await page.getByRole('textbox', { name: 'Enter a new option...' }).press('Enter');
        await page.getByRole('textbox', { name: 'Enter a new option...' }).fill('Very unsatisfied');
        await page.getByRole('textbox', { name: 'Enter a new option...' }).press('Enter');
        await page.getByRole('textbox', { name: 'Enter a new option...' }).fill(newPoll.options[1]);
        await page.getByRole('textbox', { name: 'Enter a new option...' }).press('Enter');
        await page.getByRole('listitem').filter({ hasText: 'Very unsatisfied' }).getByRole('img').click();

        //Step 4: Save changes
        await page.getByRole('button', { name: 'Save Changes' }).click();
        await page.waitForTimeout(10000);

        //Step 5: Navigate back to all polls page and check that the poll changes are made
        await page.getByRole('link', { name: 'Back to all polls' }).click();
        await page.waitForTimeout(10000)
        await expect(page.getByRole('link', { name: newPoll.question })).toBeVisible();

        //Step 6: Click on the poll to check that the poll changes are present
        await page.getByRole('link', { name: newPoll.question }).click();
        await page.waitForTimeout(10000)
        await expect(page.getByRole('textbox', { name: 'Enter the poll question...' })).toHaveValue(newPoll.question);
        await expect(page.getByText(newPoll.category)).toBeVisible();
        await expect(page.getByText(newPoll.question_type)).toBeVisible();
        await expect(page.locator('span.pl-4.flex-1.break-words', { hasText: /^Satisfied$/ })).toBeVisible();
        await expect(page.locator('span.pl-4.flex-1.break-words', { hasText: /^Unsatisfied$/ })).toBeVisible();
          
        //Step 7: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    });
});
