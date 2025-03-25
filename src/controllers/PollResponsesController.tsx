"use server"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_RESPONSES_GET_COUNT_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";


//Fetch count
export const pollResponsesGetCount = async (filter: object) => {
    const pollResponsesGetCountEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + POLL_RESPONSES_GET_COUNT_ENDPOINT
    const apiData = await axios.post(pollResponsesGetCountEndpoint, 
        {
            "filter": filter
        }
    )
    const count = apiData.data.count
    return count
};
