import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_GET_MANY_ENDPOINT, COMPLAINTS_GET_COUNT_ENDPOINT, API_BASE_URL_ANALYTICS, COMPLAINTS_GET_STATISTICS_ENDPOINT,
    COMPLAINTS_GET_STATISTICS_OVER_TIME_ENDPOINT, COMPLAINTS_DELETE_MANY_BY_OIDS_ENDPOINT, COMPLAINTS_UPDATE_BY_OID_ENDPOINT,
    COMPLAINTS_GET_STATISTICS_GROUPED_ENDPOINT, COMPLAINTS_GET_STATISTICS_GROUPED_OVER_TIME_ENDPOINT, 
    COMPLAINTS_GET_STATISTICS_GROUPED_BY_SENTIMENT_VALUE_ENDPOINT} from "@/constants/ApiRoutes";
import { Complaint, ComplaintStatistics, ComplaintStatisticsBucket, ComplaintStatisticsByDate, MonthlyComplaintStatistics } from "@/types/Complaint";
import axios from "axios";
import { convertComplaintDocumentsToObjects } from "@/utils/DatabaseHelperFunctions";
import { ALL_CATEGORIES_CATEGORY } from "@/constants/Constants";
import { ApiResponseStatus } from "@/types/ApiResponse";


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
export const complaintsGetMany = async (filter: object, page_size: number, page_number: number, sortFilter: object): Promise<Complaint[]> => {
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

        //Prepare request data
        const requestData: any = {
            filter: cleanedFilter,
            page_size: page_size,
            page_number: page_number,
            ...(Object.keys(sortFilter).length > 0 && { sort: sortFilter })
        };

        const complaintsGetManyEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + COMPLAINTS_GET_MANY_ENDPOINT
        const complaintsData = await axios.post(complaintsGetManyEndpoint, requestData)
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

//Get complaint statistics grouped
export const complaintsGetStatisticsGrouped = async (filter: object, groupByField: string): Promise<Record<string, ComplaintStatistics>> => {
    try {
        //Call API to fetch category statistics grouped
        const apiEndPoint = API_BASE_URL_ANALYTICS  + COMPLAINTS_GET_STATISTICS_GROUPED_ENDPOINT
        const apiData = await axios.post(apiEndPoint,
            {
                "group_by_field": groupByField,
                "filter": filter
            }
        )
        return apiData.data.statistics
    } catch (error) {
        throw error
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


//Get complaint statistics grouped over time
export const complaintsGetStatisticsGroupedOverTime = async(filter: object, groupByField: string): Promise<ComplaintStatisticsByDate[]> => {
    try {
        //Call API to fetch category statistics grouped
        const apiEndPoint = API_BASE_URL_ANALYTICS  + COMPLAINTS_GET_STATISTICS_GROUPED_OVER_TIME_ENDPOINT
        const apiData = await axios.post(apiEndPoint,
            {
                "group_by_field": groupByField,
                "filter": filter
            }
        )
        return apiData.data.statistics
    } catch (error) {
        throw error
    }
}

//Get complaint statistics grouped by sentiment value
export const complaintsGetStatisticsGroupedBySentimentValue = async(bucketSize: number, filter: object): Promise<ComplaintStatisticsBucket[]> => {
    try {
        const apiEndPoint = API_BASE_URL_ANALYTICS  + COMPLAINTS_GET_STATISTICS_GROUPED_BY_SENTIMENT_VALUE_ENDPOINT
        const apiData = await axios.post(apiEndPoint,
            {
                "bucket_size": bucketSize,
                "filter": filter
            }
        )
        return apiData.data.statistics
    } catch (error) {
        console.log(error)
        throw error
    }
}


//Delete many complaints
export const complaintsDeleteManyByOids = async (oidsOfComplaintsToDelete: string[]): Promise<string> => {
    try {
        //Make API call to delete selected complaints
        const deleteComplaintsEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + COMPLAINTS_DELETE_MANY_BY_OIDS_ENDPOINT
        await axios.post(deleteComplaintsEndpoint, {
            "oids": oidsOfComplaintsToDelete
        });
        return ApiResponseStatus.Success
    } catch (error) {
        return ApiResponseStatus.Failure
    }
}

//Update a complaint
export const complaintsUpdateByOid = async (oidOfComplaint: string, setDocument: object): Promise<string> => {
    try {
        //Make API call to delete selected complaints
        const updateComplaintEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + COMPLAINTS_UPDATE_BY_OID_ENDPOINT
        await axios.post(updateComplaintEndpoint, 
            {
                "oid": oidOfComplaint,
                "update_document": {
                    "$set": setDocument
                }
            }
        )
        return ApiResponseStatus.Success
    } catch (error) {
        console.log(error)
        return ApiResponseStatus.Failure
    }
}
