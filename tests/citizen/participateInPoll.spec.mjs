import { test, expect } from '@playwright/test'
import deleteAllUsers from '../../scripts/users/deleteAllUsers.mjs'
import createUserAccount from '../../scripts/users/createUserAccount.mjs'
import createPolls from '../../scripts/polls/createPolls.mjs'
import deleteAllPolls from '../../scripts/polls/deleteAllPolls.mjs'
/**
This UI test aims to test the E2E flow of a citizen participating in an ongoing poll.
1. User signs in as a citizen.
2. User clicks on Polls.
3. User clicks on an ongoing poll.
4. User participates in the poll.
5. User views his profile as a collectible has been awarded.
6. User signs out.
*/

const citizenCredentials = {
    name: 'James',
    email: 'james@gmail.com',
    password: "Password1!",
}

const polls = [
    {
        question: "How satisfied are you with the public transportation system?",
        category: "Transport",
        question_type: "MCQ",
        options: ["Satisfied", "Unsatisfied"],
        date_created: "01-04-2025 08:00:00",
        date_published: "01-04-2025 09:00:00",
        date_closed: null,
        status: "Published"
    },
    {
        question: "What do you think of the Singapore zoo?",
        category: "Others",
        question_type: "Open-ended",
        options: [],
        date_created: "02-04-2025 08:00:00",
        date_published: "02-04-2025 09:00:00",
        date_closed: null,
        status: "Published"
    }
]

const totalNumberOfCollectibles = 6



//Set up citizen account and an ongoing poll
test.beforeEach(async ({ page }) => {
    //Set up the database
    await createUserAccount(citizenCredentials.name, citizenCredentials.email, citizenCredentials.password, "Citizen")
    await createPolls(polls)

    //Sign in with the citizen account
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Sign In' }).first().click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(citizenCredentials.email);
    await page.getByRole('textbox', { name: 'Your password' }).click();
    await page.getByRole('textbox', { name: 'Your password' }).fill(citizenCredentials.password);
    await page.locator('form').getByRole('button', { name: 'Sign In' }).click();
    await page.waitForTimeout(10000); //Introduce some delay
})


//Clear the citizen user from the database after running the test
test.afterEach(async () => {
    await deleteAllUsers()
    await deleteAllPolls()
});


test.describe('Citizen should be able to participate in a poll of type', () => {
    
    //MCQ
    test('MCQ', async ({ page }) => {
        //STEP 1: Sign in with the citizen account - already done in beforeEach
      
        //STEP 2: Navigate to polls and click on MCQ
        await page.getByRole('link', { name: 'Polls' }).first().click();
        await page.waitForTimeout(10000); //Introduce some delay to let the polls load
        await page.getByRole('link', { name: 'How satisfied are you with' }).click();

        //STEP 3: Expect that there are 2 radio options and then fill in the MCQ poll
        await page.waitForTimeout(10000); //Introduce some delay to let the current poll load
        await expect(page.getByRole('radio', { name: polls[0].options[0], exact: true })).toBeVisible();
        await expect(page.getByRole('radio', { name: polls[0].options[1], exact: true })).toBeVisible();
        await page.getByRole('radio', { name: 'Satisfied', exact: true }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.waitForTimeout(10000);
        await page.getByRole('button', { name: 'Yay! ☺️' }).click();

        //STEP 4: Expect that the citizen cannot submit another response
        await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
        await expect(page.getByText('You have already submitted a response. 🫡Thank you for participating.')).toBeVisible();

        //STEP 5: Check collectibles in profile page, ensuring that only 5 collectibles are locked, given that there are only 6 collectibles
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByLabel('', { exact: true }).getByRole('link', { name: 'Profile' }).click();
        await page.waitForTimeout(10000);
        const elements = await page.getByText('???').all();
        expect(elements).toHaveLength(totalNumberOfCollectibles - 1);
        
        //STEP 6: Logout
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    })


    //Open-ended
    test('Open-ended', async ({ page }) => {
        // STEP 1: Sign in with the citizen account - already done in beforeEach

        // STEP 2: Navigate to polls and click on open-ended poll
        await page.getByRole('link', { name: 'Polls' }).first().click();
        await page.waitForTimeout(10000); //Introduce some delay to let the polls load
        await page.getByRole('link', { name: 'What do you think of the' }).click();

        // STEP 3: Fill in the open-ended poll
        await page.getByRole('textbox', { name: 'What do you think of the' }).click();
        await page.getByRole('textbox', { name: 'What do you think of the' }).fill('I think it is great!');
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('button', { name: 'Yay! ☺️' }).click();

        //STEP 4: Expect that the citizen cannot submit another response
        await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
        await expect(page.getByText('You have already submitted a response. 🫡Thank you for participating.')).toBeVisible();
 
        //STEP 5: Check collectibles in profile page, ensuring that only 5 collectibles are locked, given that there are only 6 collectibles
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByLabel('', { exact: true }).getByRole('link', { name: 'Profile' }).click();
        await page.waitForTimeout(10000);
        const elements = await page.getByText('???').all();
        expect(elements).toHaveLength(totalNumberOfCollectibles - 1);
         
        //STEP 6: Logout
        await page.getByRole('img', { name: 'Profile image' }).first().click();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    })

})

