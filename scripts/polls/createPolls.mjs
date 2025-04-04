import { MongoClient } from "mongodb"
import constants from "../../src/constants/TestConstants.mjs"

/**
A function that will create polls into the polls collection of the database. Used for testing purposes.
*/

const createPolls = async (polls) => {
    const client = new MongoClient(constants.MONGO_URI)

    try {
        //Connect to the MongoDB server
        await client.connect();
        const db = client.db(constants.DB_NAME);
        const pollsCollection = db.collection(constants.COLLECTION_NAMES.polls);

        //Create the polls
        await pollsCollection.insertMany(
            polls.map((poll) => ({
                question: poll.question,
                category: poll.category,
                question_type: poll.question_type,
                options: poll.options,
                date_created: poll.date_created,
                date_published: poll.date_published,
                date_closed: poll.date_closed,
                status: poll.status
            }))
        );        
        console.log("Polls have been successfully created")
    } catch (error) {
        console.error("Error creating polls:", error);
    } finally {
        await client.close()
    }
}


export default createPolls