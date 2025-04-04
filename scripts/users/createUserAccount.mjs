import { MongoClient } from "mongodb"
import constants from "../../src/constants/TestConstants.mjs"

/**
A function that will create a user account into the users collection of the database. Used for testing purposes.
*/

const createUserAccount = async (name, email, password, role) => {
    const client = new MongoClient(constants.MONGO_URI)

    try {
        //Connect to the MongoDB server
        await client.connect();
        const db = client.db(constants.DB_NAME);
        const usersCollection = db.collection(constants.COLLECTION_NAMES.users);

        //Create a new user with name, email and password
        await usersCollection.insertOne({
            name: name,
            email: email,
            password: password,
            role: role,
            collectibles: []
        })

        console.log("A user account has been successfully created.")
    } catch (error) {
        console.error("Error creating a user:", error);
    } finally {
        await client.close()
    }
}


export default createUserAccount