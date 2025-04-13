"use server"

import { API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { convertCategoryDocumentsToObjects } from "@/utils/DatabaseHelperFunctions";
import { Category } from "@/types/Category";
import { CATEGORIES_UPDATE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import createServerAxiosInstance from "@/utils/AxiosServer";


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

//Update category by oid
export const categoriesUpdateByOid = async (oid: string, setDocument: object): Promise<boolean> => {
    try {
        const serverAxiosInstance = await createServerAxiosInstance()
        const updateCategoryEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + CATEGORIES_UPDATE_BY_OID_ENDPOINT
        const response = await serverAxiosInstance.post(updateCategoryEndpoint, 
            {
                "oid": oid,
                "update_document": {
                    "$set": setDocument
                }
            } 
        )
        return response.data.success
    } catch (error: any) {
        console.log(error.response.data)
        return false
    }
}