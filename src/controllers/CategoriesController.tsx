"use server"

import { API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { convertCategoryDocumentsToObjects } from "@/utils/DatabaseHelperFunctions";
import { Category } from "@/types/Category";


//Get all categories
export const categoriesGetAll = async () : Promise<Category[]> => {
    try {
        const categoriesGetAllEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + CATEGORIES_GET_ALL_ENDPOINT
        const apiData = await axios.post(categoriesGetAllEndpoint)
        const allCategories = convertCategoryDocumentsToObjects(apiData.data.documents)
        return allCategories
    } catch (error) {
        return []
    }
};