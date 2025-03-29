import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_GET_MANY_ENDPOINT, COMPLAINTS_GET_COUNT_ENDPOINT, API_BASE_URL_ANALYTICS, COMPLAINTS_GET_STATISTICS_ENDPOINT, COMPLAINTS_GET_STATISTICS_OVER_TIME_ENDPOINT } from "@/constants/ApiRoutes";
import { Complaint, ComplaintStatistics, MonthlyComplaintStatistics } from "@/types/Complaint";
import axios from "axios";
import { convertComplaintDocumentsToObjects } from "@/utils/DatabaseHelperFunctions";
import { ALL_CATEGORIES_CATEGORY } from "@/constants/Constants";


//Fetch count
export const complaintsGetCount = async (filter: object) => {
    try {
        const complaintsGetCountEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + COMPLAINTS_GET_COUNT_ENDPOINT
        const apiData = await axios.post(complaintsGetCountEndpoint, 
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


//Get many complaints
export const complaintsGetMany = async (filter: object, page_size: number, page_number: number, sort: object): Promise<Complaint[]> => {
    try {
        //Pre-process filter
        const cleanedFilter: any = { ...filter };

        // Remove the $search key if searchQuery is empty
        if (!cleanedFilter["$search"] || cleanedFilter["$search"] === "") {
            delete cleanedFilter["$search"];
        }

        // Remove the category key if categorySelected is 'ALL'
        if (cleanedFilter["category"] === ALL_CATEGORIES_CATEGORY.name) {
            delete cleanedFilter["category"];
        }

        const complaintsGetManyEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + COMPLAINTS_GET_MANY_ENDPOINT
        const complaintsData = await axios.post(complaintsGetManyEndpoint, 
            {
                "filter": cleanedFilter,
                "page_size": page_size,
                "page_number": page_number,
                "sort": sort
            }
        )
        const filteredComplaints = convertComplaintDocumentsToObjects(complaintsData.data.documents)
        return filteredComplaints
    } catch (error) {
        console.log(error)
        return []
    }
}

//Get complaint statistics, which include number of complaints and average sentiment
export const complaintsGetStatistics = async (filter: object): Promise<ComplaintStatistics> => {
    try {
        //Call API to fetch category statistics given its name
        const apiEndPoint = API_BASE_URL_ANALYTICS  + COMPLAINTS_GET_STATISTICS_ENDPOINT
        const apiData = await axios.post(apiEndPoint,
            {
                "filter": filter
            }
        )
        return apiData.data.statistics
    } catch (error) {
        return {
            count: -1,
            avg_sentiment: -2,
        }
    }
}


//Get complaint statistics over time, which include number of complaints and average sentiment for each month
export const complaintsGetStatisticsOverTime = async (filter: object): Promise<MonthlyComplaintStatistics[]> => {
    try {
        //Call API to fetch category statistics given its name
        const apiEndPoint = API_BASE_URL_ANALYTICS  + COMPLAINTS_GET_STATISTICS_OVER_TIME_ENDPOINT
        const apiResult = await axios.post(apiEndPoint,
            {
                "filter": filter 
            }
        )
        return apiResult.data.statistics
    } catch (error) {
        return []
    }
}
