
import axios from 'axios';


/**
The handler that handles API calls to interact with the backend.

*/

//Base URL to make API calls
const API_BASE_URL = process.env.API_BASE_URL


//Makes a GET request
export const makeGetRequest = async (endpoint: string): Promise<any> => {
    try {
        //Perform the GET request
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            //Case 1: Error is caused by the Axios request, such as server error 404
            console.error("Error in GET request:", error.response?.data || error.message)
            throw new Error("Axios error during GET request")
        } else {
            //Case 2: Any unintended errors or problems within the application
            console.error("Unexpected error:", error)
            throw new Error("Unexpected error during GET request")
        }
    }
}

//Makes a POST request
export const makePostRequest = async (endpoint: string, data: object): Promise<any> => {
    try {
        //Perform the POST request with the supplied data
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            //Case 1: Error is caused by the Axios request, such as server error 404
            console.error("Error in POST request:", error.response?.data || error.message)
            throw new Error("Axios error during POST request")
        } else {
            //Case 2: Any unintended errors or problems within the application
            console.error("Unexpected error:", error)
            throw new Error("Unexpected error during POST request")
        }
    }
}