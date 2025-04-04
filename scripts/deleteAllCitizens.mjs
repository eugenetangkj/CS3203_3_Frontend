import { MongoClient } from "mongodb"
import constants from "../src/constants/TestConstants.mjs";

/**
A function that will delete all citizens from the users collection of the database. Used for testing purposes
*/

const deleteAllCitizens = async () => {
    const client = new MongoClient(constants.MONGO_URI)

    try {
        //Connect to the MongoDB server
        await client.connect();
        const db = client.db(constants.DB_NAME);
        const usersCollection = db.collection(constants.COLLECTION_NAMES.users);

        //Delete all users where role == 'citizen'
        await usersCollection.deleteMany({ role: "Citizen" });
        console.log("All citizens have been deleted from the users collection.")
    } catch (error) {
        console.error("Error deleting all citizens:", error);
    } finally {
        await client.close()
    }
}


export default deleteAllCitizens