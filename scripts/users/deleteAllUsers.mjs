import { MongoClient } from "mongodb"
import constants from "../../src/constants/TestConstants.mjs";

/**
A function that will delete all users from the users collection of the database. Used for testing purposes.
*/

const deleteAllUsers = async () => {
    const client = new MongoClient(constants.MONGO_URI)

    try {
        //Connect to the MongoDB server
        await client.connect();
        const db = client.db(constants.DB_NAME);
        const usersCollection = db.collection(constants.COLLECTION_NAMES.users);

        //Delete all users
        await usersCollection.deleteMany({});
        console.log("All users have been deleted from the users collection.")
    } catch (error) {
        console.error("Error deleting all users:", error);
    } finally {
        await client.close()
    }
}


export default deleteAllUsers