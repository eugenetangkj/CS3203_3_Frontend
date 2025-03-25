import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes";
import { Complaint } from "@/types/Complaint";
import axios from "axios";
import { convertComplaintDocumentsToObjects } from "@/utils/DatabaseHelperFunctions";
import { ALL_CATEGORIES_CATEGORY } from "@/constants/Constants";


//Get many
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
