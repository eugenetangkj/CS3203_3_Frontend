import { Poll } from "@/types/Poll"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_GET_MANY_ENDPOINT, POLLS_INSERT_ONE_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertPollDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"
import { VERY_LARGE_NUMBER } from "@/constants/Constants"


//Function to fetch many polls
export const pollsGetMany = async (status: string) : Promise<Poll[]> => {
    try {
        const getPollsEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_GET_MANY_ENDPOINT
        const pollsData = await axios.post(getPollsEndpoint, {
            "filter": {
                "status": status
            },
            "page_size": VERY_LARGE_NUMBER, //Fetch all
            "page_number": 1
        })
        const ongoingPolls = convertPollDocumentsToObjects(pollsData.data.documents)
        return ongoingPolls
    } catch (error) {
        return []
    }
}

//Function to create a poll
export const pollsInsertOne = async (pollDocument: object): Promise<string> => {
    try {
        const createPollEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_INSERT_ONE_ENDPOINT
        const response = await axios.post(createPollEndpoint, {
            "document": pollDocument
        })
        const pollOid = response.data.oid
        return pollOid
    } catch (error) {
        return ''
    }
}