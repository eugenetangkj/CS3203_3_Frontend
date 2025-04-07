import { API_BASE_URL_ANALYTICS, CATEGORY_ANALYTICS_GET_BY_NAME } from "@/constants/ApiRoutes";
import axios from "axios";
import { convertCategoryAnalyticsDocumentToObject } from "@/utils/DatabaseHelperFunctions";

import { CategoryAnalytics } from "@/types/CategoryAnalytics";


//Fetch category analytics by name
export const categoryAnalyticsGetByName = async (categoryName: string) : Promise<CategoryAnalytics> => {
    try {
        //Call API to fetch category analytics given the category name
        const getCategoryAnalyticsEndpoint = API_BASE_URL_ANALYTICS + CATEGORY_ANALYTICS_GET_BY_NAME
        const categoryAnalyticsData = await axios.post(getCategoryAnalyticsEndpoint,
            {
                "name": categoryName,
            }
        )
        return convertCategoryAnalyticsDocumentToObject(categoryAnalyticsData.data.document)

    } catch (error) {
        return {
            id: '',
            name: '',
            suggestions: [],
            keywords: [],
            summary: '',
            forecasted_sentiment: 0,
            sentiment: 0,
            concerns: [],
            absa_result: []
        }
    }
};
