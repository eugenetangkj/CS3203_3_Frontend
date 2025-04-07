import { MongoClient } from "mongodb"
import constants from "../../src/constants/TestConstants.mjs"

/**
A function that will delete all poll responses from the poll responses collection of the database. Used for testing purposes.
*/

const deleteAllPollResponses = async () => {
    const client = new MongoClient(constants.MONGO_URI)

    try {
        //Connect to the MongoDB server
        await client.connect();
        const db = client.db(constants.DB_NAME);
        const pollsCollection = db.collection(constants.COLLECTION_NAMES.pollResponses);

        //Delete all polls
        await pollsCollection.drop()
        console.log("All polls have been deleted from the poll_responses collection.")
    } catch (error) {
        console.error("Error deleting all poll responses:", error);
    } finally {
        await client.close()
    }
}


export default deleteAllPollResponses