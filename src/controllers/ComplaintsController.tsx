"use server"

import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_GET_COUNT_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";


//Fetch count
export const complaintsGetCount = async (filter: object) => {
    const complaintsGetCountEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + COMPLAINTS_GET_COUNT_ENDPOINT
    const apiData = await axios.post(complaintsGetCountEndpoint, 
        {
            "filter": filter
        }
    )
    const count = apiData.data.count
    return count
};
