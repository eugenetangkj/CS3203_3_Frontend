import { Poll } from "@/types/Poll"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_GET_MANY_ENDPOINT, POLLS_INSERT_ONE_ENDPOINT, POLLS_GET_BY_OID_ENDPOINT, POLLS_UPDATE_BY_OID_ENDPOINT, POLLS_DELETE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertPollDocumentsToObjects, convertPollDocumentToObject } from "@/utils/DatabaseHelperFunctions"
import { VERY_LARGE_NUMBER } from "@/constants/Constants"
import { ApiResponseStatus } from "@/types/ApiResponse"


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


//Function to get a poll by its oid
export const pollsGetByOid = async (oid: string): Promise<Poll> => {
    try {
        const fetchPollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_GET_BY_OID_ENDPOINT
        const response = await axios.post(fetchPollByOidEndpoint, {
            "oid": oid
            },
        )
        const poll = convertPollDocumentToObject(response.data.document)
        return poll
    } catch (error) {
        return {
            id: '',
            question: '',
            category: '',
            question_type: '',
            options: [],
            date_created: null,
            date_published: null,
            date_closed: null,
            status: ''
        }
    }
}


//Function to update a poll by its oid
export const pollsUpdateByOid = async (oid: string, setDocument: object): Promise<string> => {
    try {
        const updatePollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_UPDATE_BY_OID_ENDPOINT
        await axios.post(updatePollByOidEndpoint, {
            "oid": oid,
            "update_document": {
                "$set": setDocument
            }
        })
        return ApiResponseStatus.Success
    } catch (error) {
        return ApiResponseStatus.Failure
    }
}


//Function to delete a poll by its oid
export const pollsDeleteByOid = async (oid: string): Promise<string> => {
    try {
        const deletePollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_DELETE_BY_OID_ENDPOINT
        await axios.post(deletePollByOidEndpoint, {
            "oid": oid
        })
        return ApiResponseStatus.Success
    } catch(error) {
        return ApiResponseStatus.Failure
    }
}