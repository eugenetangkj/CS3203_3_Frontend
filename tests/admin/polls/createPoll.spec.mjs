import { test, expect } from '@playwright/test'
import createUserAccount from "../../../scripts/users/createUserAccount.mjs";
import deleteAllUsers from '../../../scripts/users/deleteAllUsers.mjs';
import deleteAllPolls from '../../../scripts/polls/deleteAllPolls.mjs';
import runPythonScript from '../../../scripts/initialiser.mjs'

/**
This UI test aims to test the E2E flow of an admin creating a poll.
1. Admin signs in with his admin credentials.
2. Admin clicks on Polls
3a. Admin clicks on an existing poll template and use the poll template.
3b. Admin clicks on the create poll button in the all polls page and creates a poll from scratch.
4. Admin checks that the poll is created.
5. Admin signs out.
*/
const adminAccountCredentials = {
    name: 'Admin 1',
    email: 'admin1@gmail.com',
    password: "Password1!",
}

const chosenPollTemplateQuestion = 'How satisfied are you with your current employment situation in Singapore?'
const customPollQuestion = 'What do you think of the GST hike?'
const customPollOptions = ['Good', 'Bad']


test.beforeEach(async ({ page }) => {
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

    //Sign in with the citizen account
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Sign In' }).first().click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(adminAccountCredentials.email);
    await page.getByRole('textbox', { name: 'Your password' }).click();
    await page.getByRole('textbox', { name: 'Your password' }).fill(adminAccountCredentials.password);
    await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
    await page.waitForTimeout(10000);
})


test.afterEach(async () => {
    //Clear all the admin accounts and polls
    await deleteAllUsers()
    await deleteAllPolls()
});


test.describe('Admin should be able to create a poll', () => {
    test('from an existing poll template', async ({ page }) => {
        //Step 1: Login as admin done in beforeEach
        
        //Step 2: Navigate to the Polls page and click on a poll template. Poll template is based on the existing poll templates in the test data.
        await page.getByRole('link', { name: 'Polls' }).first().click();
        await page.waitForTimeout(10000);
        await page.getByRole('link', { name: chosenPollTemplateQuestion }).click();

        //Step 3: Click on the use template button
        await page.waitForTimeout(10000);
        await page.getByRole('button', { name: 'Use Template' }).click();

        //Step 4: Check that the poll is created, with default status of Unpublished after creating
        await page.waitForTimeout(10000);
        await expect(page.getByRole('textbox', { name: 'Enter the poll question...' })).toHaveValue(chosenPollTemplateQuestion);
        await expect(page.getByText('Status:Unpublished')).toBeVisible();

        //Step 5: Sign out
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    });


    test.describe('from scratch by clicking the create poll button in all polls page', () => {
        test('for a MCQ poll', async ({ page }) => {
            //Step 1: Login as admin done in beforeEach

            //Step 2: Navigate to the Polls page and click on the create poll button
            await page.getByRole('link', { name: 'Polls' }).first().click();
            await page.waitForTimeout(10000);
            await page.getByRole('button', { name: 'Create new poll' }).click();

            //Step 3: Fill in the poll details and click on create poll button
            await page.getByRole('textbox', { name: 'Enter the poll question...' }).click();
            await page.getByRole('textbox', { name: 'Enter the poll question...' }).fill(customPollQuestion);
            await page.getByText('Select a category').click();
            await page.getByRole('option', { name: 'Economy' }).click();
            await page.getByRole('textbox', { name: 'Enter a new option...' }).click();
            await page.getByRole('textbox', { name: 'Enter a new option...' }).fill(customPollOptions[0]);
            await page.locator('div').filter({ hasText: /^Options$/ }).getByRole('button').click();
            await page.getByRole('textbox', { name: 'Enter a new option...' }).click();
            await page.getByRole('textbox', { name: 'Enter a new option...' }).fill(customPollOptions[1]);
            await page.locator('div').filter({ hasText: /^OptionsGood$/ }).getByRole('button').click();
            await page.getByRole('button', { name: 'Create Poll' }).click();

            //Step 4: Check that the poll is created, with default status of Unpublished after creating
            await page.waitForTimeout(10000);
            await page.waitForTimeout(10000);
            await expect(page.getByRole('textbox', { name: 'Enter the poll question...' })).toHaveValue(customPollQuestion);
            await expect(page.getByText('Status:Unpublished')).toBeVisible();
            await expect(page.getByRole('listitem').filter({ hasText: customPollOptions[0] })).toBeVisible();
            await expect(page.getByRole('listitem').filter({ hasText: customPollOptions[1] })).toBeVisible();

            //Step 5: Sign out
            await page.getByRole('img', { name: 'Profile image' }).first().click();
            await page.getByRole('button', { name: 'Sign Out' }).click();
        });


        test('for an open-ended poll', async ({ page }) => {
            //Step 1: Login as admin done in beforeEach

            //Step 2: Navigate to the Polls page and click on the create poll button
            await page.getByRole('link', { name: 'Polls' }).first().click();
            await page.waitForTimeout(10000);
            await page.getByRole('button', { name: 'Create new poll' }).click();

            //Step 3: Fill in the poll details and click on create poll button
            await page.getByRole('textbox', { name: 'Enter the poll question...' }).click();
            await page.getByRole('textbox', { name: 'Enter the poll question...' }).fill(customPollQuestion);
            await page.getByText('Select a category').click();
            await page.getByRole('option', { name: 'Economy' }).click();
            await page.getByRole('combobox').filter({ hasText: 'MCQ' }).click();
            await page.getByText('Open-ended').click();
            await page.getByRole('button', { name: 'Create Poll' }).click();

            //Step 4: Check that the poll is created, with default status of Unpublished after creating
            await page.waitForTimeout(10000);
            await expect(page.getByRole('textbox', { name: 'Enter the poll question...' })).toHaveValue(customPollQuestion);
            await expect(page.getByText('Status:Unpublished')).toBeVisible();

            //Step 5: Sign out
            await page.getByRole('img', { name: 'Profile image' }).first().click();
            await page.getByRole('button', { name: 'Sign Out' }).click();
        });
    });
});
