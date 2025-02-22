"use client"

import { ManageCategoriesTable } from "@/components/categories/ManageCategoriesTable";
import { AddCategoryButton } from "@/components/categories/AddCategoryButton";
import { useState, useEffect } from "react";
import { Category } from "@/types/Category";
import CategoriesTableSkeleton from "@/components/categories/CategoriesTableSkeleton";
import { API_BASE_URL_ADMIN_MANAGEMENT } from "@/constants/ApiRoutes";
import { CATEGORIES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { convertCategoryDocumentsToObjects } from "@/utils/DatabaseHelperFunctions";
import { ERROR_MESSAGE_API } from "@/constants/ConstantValues";

/** 
Component that houses the manage categories table and its associated action buttons
*/
export default function ManageCategoriesTableAndButtons() {

    //States
    const [categories, setCategories] = useState<Category[]>([]);
    const [hasRanApi, setHasRanApi] = useState<boolean>(false);
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Triggers fetching of categories from backend
    const fetchCategories = async () => {
        setHasRanApi(false)
        try {
            const categoriesApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + CATEGORIES_GET_ALL_ENDPOINT
            const categoriesData = await axios.post(categoriesApiEndPoint)
            const categories = convertCategoryDocumentsToObjects(categoriesData.data.documents)
            setCategories(categories);
        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true);
        }
    };


    //Calls fetchCategories whenever it is first mounted
    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <div className="flex flex-col space-y-4">
            {/* Buttons */}
            <div className='flex flex-row sm:self-end space-x-4'>
                {/* Add category */}
                <AddCategoryButton fetchCategories= { fetchCategories } />
            </div>

            {/* Table of categories */}
            {
                !hasRanApi
                ? <div className='grid grid-cols-6 gap-4'>
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CategoriesTableSkeleton key={ index } />
                    ))}
                  </div>
                : isThereError
                ? <p className='text-base text-yap-black-800'>{ ERROR_MESSAGE_API }</p>
                :  <ManageCategoriesTable categories={ categories } fetchCategories={ fetchCategories } />       
            }
    </div>
  );
}
