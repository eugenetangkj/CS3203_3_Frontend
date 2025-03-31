import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_RESPONSES_GET_COUNT_ENDPOINT,POLL_RESPONSES_GET_ONE_ENDPOINT, POLL_RESPONSES_INSERT_ONE_ENDPOINT } from "@/constants/ApiRoutes";
import { PollResponse } from "@/types/Poll";
import axios from "axios";
import { NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE } from "@/constants/Constants";
import { convertPollResponseDocumentToObject } from "@/utils/DatabaseHelperFunctions";
import { ApiResponseStatus } from "@/types/ApiResponse";


//Fetch count
export const pollResponsesGetCount = async (filter: object) => {
    try {
        const pollResponsesGetCountEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + POLL_RESPONSES_GET_COUNT_ENDPOINT
        const apiData = await axios.post(pollResponsesGetCountEndpoint, 
            {
                "filter": filter
            }
        )
        const count = apiData.data.count
        return count
    } catch (error) {
        throw error
    }
};


//Get one poll response
export const pollResponsesGetOne = async (filter: object): Promise<PollResponse> => {
    const emptyPollResponse = {
        id: '',
        poll_id: '',
        response: '',
        date_submitted: '',
        user_id: ''
    }
    try {
        const fetchOnePollApiEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_RESPONSES_GET_ONE_ENDPOINT
        const response = await axios.post(fetchOnePollApiEndpoint,
            {
                "filter": filter, 
            },
        )
        if (response.data.message === NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE) {
            return emptyPollResponse
        } else {
            return convertPollResponseDocumentToObject(response.data.document)
        }
    } catch (error) {
        return {
            id: '',
            poll_id: '',
            response: '',
            date_submitted: '',
            user_id: ''
        }
    }
}


//Insert one poll response
export const pollResponsesInsertOne = async(pollResponseDocument: object): Promise<string> => {
    try {
        const insertPollResponseEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_RESPONSES_INSERT_ONE_ENDPOINT
        await axios.post(insertPollResponseEndpoint,
            {
                "document": pollResponseDocument
            }
        )
        return ApiResponseStatus.Success
    } catch (error) {
        return ApiResponseStatus.Failure
    }
}
