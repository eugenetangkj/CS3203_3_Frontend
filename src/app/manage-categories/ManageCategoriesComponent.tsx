"use client"

import PageTitle from "@/components/common/text/PageTitle";
import { ManageCategoriesTable } from "@/components/categories/ManageCategoriesTable";
import { getCategories } from "@/services/ServicesHelper";
import { AddCategoryButton } from "@/components/categories/AddCategoryButton";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoriesSaveChangesButton } from "@/components/categories/CategoriesSaveChangesButton";
import { CategoryInterface } from "@/types/Category";

/** 
Component for managing categories page where the authorities can view, add or delete categories.
*/
export default function ManageCategoriesComponent() {

    //States
    const [categories, setCategories] = useState<CategoryInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    //Triggers fetching of categories from backend
    const fetchCategories = async () => {
        setLoading(true);
        console.log("hello")
        try {
            const fetchedCategories = await getCategories(); //Trigger backend API
            setCategories(fetchedCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };


    //Calls fetchCategories for the first time that the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);



    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-8">

            {/* Title */}
            <PageTitle pageTitle="Manage Categories" />

            {/* Buttons */}
            <div className='flex flex-row sm:self-end space-x-4'>
                {/* Add category */}
                <AddCategoryButton fetchCategories= { fetchCategories } />

                {/* Save changes */}
                <CategoriesSaveChangesButton fetchCategories={ fetchCategories } categories={ categories } />

            </div>

            

            {/* Table of categories */}
            {
                loading
                ? <Skeleton className='w-full h-[100px]' />
                :  <ManageCategoriesTable categories={ categories } setCategories={ setCategories } fetchCategories={ fetchCategories } />       


            }
           
        </div>
    </div>
  );

}
