"use server"

import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_RESPONSES_GET_COUNT_ENDPOINT,POLL_RESPONSES_GET_MANY_ENDPOINT,POLL_RESPONSES_GET_ONE_ENDPOINT, POLL_RESPONSES_GET_STATISTICS_ENDPOINT, POLL_RESPONSES_INSERT_ONE_ENDPOINT } from "@/constants/ApiRoutes";
import { PollResponse } from "@/types/Poll";
import axios from "axios";
import { NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE } from "@/constants/Constants";
import { convertPollResponseDocumentsToObjects, convertPollResponseDocumentToObject } from "@/utils/DatabaseHelperFunctions";
import { ApiResponseStatus } from "@/types/ApiResponse";
import createServerAxiosInstance from "@/utils/AxiosServer"; 


//Fetch count
export const pollResponsesGetCount = async (filter: object): Promise<number> => {
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
        const serverAxiosInstance = await createServerAxiosInstance()
        const insertPollResponseEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_RESPONSES_INSERT_ONE_ENDPOINT
        await serverAxiosInstance.post(insertPollResponseEndpoint,
            {
                "document": pollResponseDocument
            }
        )
        return ApiResponseStatus.Success
    } catch (error) {
        return ApiResponseStatus.Failure
    }
}

//Get poll responses statistics
export const pollResponsesGetStatistics = async(filter: object): Promise<Record<string, number>> => {
    try {
        const pollResponsesGetStatisticsEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_RESPONSES_GET_STATISTICS_ENDPOINT
        const apiData = await axios.post(pollResponsesGetStatisticsEndpoint,
            {
                "filter": filter
            }
        )
        return apiData.data.statistics
    } catch (error) {
        return {}
    }

}

//Get many poll responses
export const pollResponsesGetMany = async(filter: object, page_size: number, page_number: number, sortFilter: object): Promise<PollResponse[]> => {
    try {
        const pollResponsesGetManyEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_RESPONSES_GET_MANY_ENDPOINT
        const apiResponse = await axios.post(pollResponsesGetManyEndpoint,
            {
                "filter": filter,
                "page_size": page_size,
                "page_number": page_number,
                ...(Object.keys(sortFilter).length > 0 && { sort: sortFilter })
            }
        )
        const pollResponses = convertPollResponseDocumentsToObjects(apiResponse.data.documents)
        return pollResponses
    } catch (error) {
        throw error
    }
}