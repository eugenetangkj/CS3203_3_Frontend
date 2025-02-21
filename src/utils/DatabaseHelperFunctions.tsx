import { Category } from "@/types/Category"

/**
Helper functions to convert database documents into interfaces used in frontend
*/

//Converts a list of MongoDB Category documents into a list of Category objects
export const convertCategoryDocumentsToObjects = (categories: any[]) : Category[] => {
    return categories.map(category => ({
        id: category._id.$oid,
        name: category.name,
        colour: category.color
    }));
}