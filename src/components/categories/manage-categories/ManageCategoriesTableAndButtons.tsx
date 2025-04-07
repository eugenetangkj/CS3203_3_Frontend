"use client"

import { ManageCategoriesTable } from "@/components/categories/manage-categories/ManageCategoriesTable";
import { Category } from "@/types/Category";
import CategoriesTableSkeleton from "@/components/categories/manage-categories/CategoriesTableSkeleton";
import { ERROR_MESSAGE_API } from "@/constants/Constants"
import useSWR from "swr";
import { CATEGORIES_GET_ALL_SWR_HOOK } from "@/constants/SwrHooks";
import { categoriesGetAll } from "@/data-fetchers/CategoriesFunctions";

/** 
Component that houses the manage categories table and its associated action buttons
*/
export default function ManageCategoriesTableAndButtons() {

    //States
    const { data, error, isLoading } = useSWR<Category[]>(CATEGORIES_GET_ALL_SWR_HOOK, categoriesGetAll);


    return (
        <div className="flex flex-col space-y-4">
            {/* Buttons */}
            {/* <div className='flex flex-row sm:self-end space-x-4'> */}
                {/* Add category */}
                {/* <AddCategoryButton fetchCategories= { fetchCategories } /> */}
            {/* </div> */}

            {/* Table of categories */}
            {
                isLoading
                ? <div className='grid grid-cols-6 gap-4'>
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CategoriesTableSkeleton key={ index } />
                    ))}
                  </div>
                : error || data === undefined
                ? <p className='text-base text-yap-black-800'>{ ERROR_MESSAGE_API }</p>
                :  <ManageCategoriesTable categories={ data } />       
            }
    </div>
  );
}
