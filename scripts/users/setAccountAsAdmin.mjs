import { MongoClient } from "mongodb"
import constants from "../../src/constants/TestConstants.mjs"

/**
A function that will set a user account as admin role. Used for testing purposes
*/

const setAccountAsAdmin = async (userEmail) => {
    const client = new MongoClient(constants.MONGO_URI)

    try {
        //Connect to the MongoDB server
        await client.connect();
        const db = client.db(constants.DB_NAME);
        const usersCollection = db.collection(constants.COLLECTION_NAMES.users);

        //Create a new user with name, email and password
        await usersCollection.updateOne(
            { email: userEmail },
            { $set: { role: 'Admin' } }
        );
        
        console.log("Role has been successfully changed to admin")
    } catch (error) {
        console.error("Error creating a user:", error);
    } finally {
        await client.close()
    }
}


export default setAccountAsAdmin