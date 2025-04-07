"use client"

import { useState } from "react"
import ComplaintsTable from "./ComplaintsTable"
import { Complaint } from "@/types/Complaint"
import { Button } from "../ui/button"
import DeleteComplaintsButton from "./actions/DeleteComplaintsButton"
import ComplaintsTableSkeleton from "./ComplaintsTableSkeleton"
import { Category } from "@/types/Category"
import { ALL_CATEGORIES_CATEGORY, ERROR_MESSAGE_API, ALL_CATEGORIES_ID } from  "@/constants/Constants"
import SearchBar from "./actions/SearchBar"
import CategoryFilter from "./actions/CategoryFilter"
import useSWR from "swr"
import { CATEGORIES_GET_ALL_SWR_HOOK, COMPLAINTS_GET_COUNT_SWR_HOOK, COMPLAINTS_GET_MANY_SWR_HOOK } from "@/constants/SwrHooks"
import { categoriesGetAll } from "@/data-fetchers/CategoriesFunctions"
import { complaintsGetCount, complaintsGetMany } from "@/data-fetchers/ComplaintsFunctions"


//Constants
const PAGE_SIZE = 100

/**
This component represents the component to display all complaints. Includes table, search and filter functionality.
*/
export const AllComplaintsPageComponent = () => {
    //States
    const [selectedComplaints, setSelectedComplaints] = useState<Complaint[]>([])
    const [categorySelected, setCategorySelected] = useState<Category>(ALL_CATEGORIES_CATEGORY)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [dateSort, setDateSort] = useState<number>(-1)
    const [sentimentSort, setSentimentSort] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState(1)


    //Fetch all categories
    const { data: allCategories, error: fetchAllCategoriesError, isLoading: fetchAllCategoriesIsLoading } = useSWR<Category[]>(
        CATEGORIES_GET_ALL_SWR_HOOK,
        categoriesGetAll,
    )

    //Fetch complaints given the filters
    const { data: allComplaints, error: fetchAllComplaintsError, isLoading: fetchAllComplaintsIsLoading } = useSWR(
        [COMPLAINTS_GET_MANY_SWR_HOOK, categorySelected, searchQuery, dateSort, sentimentSort, currentPage],
        () =>  {
            const filter: any = {}
    
            if (searchQuery.trim() !== "") {
                filter["$text"] = { "$search": searchQuery };
            }
            if (categorySelected.id !== ALL_CATEGORIES_ID) {
                filter["category"] = categorySelected.name;
            }

            const sortFilter: any = {}
            if (dateSort != 0) {
                sortFilter['date'] = dateSort
            }
            if (sentimentSort != 0) {
                sortFilter['sentiment'] = sentimentSort
            }

            return complaintsGetMany(filter, PAGE_SIZE, currentPage, sortFilter)
        }
    )


    //Fetch count of complaints
    const { data: complaintsCount, error: fetchComplaintsCountError, isLoading: fetchComplaintsCountIsLoading } = useSWR(
        [COMPLAINTS_GET_COUNT_SWR_HOOK, categorySelected, searchQuery],
        () => {
            const filter: any = {}
    
            if (searchQuery.trim() !== "") {
                filter["$text"] = { "$search": searchQuery }
            }
            if (categorySelected.id !== ALL_CATEGORIES_ID) {
                filter["category"] = categorySelected.name
            }
            return complaintsGetCount(filter);
        }
    )
    
    // Mutate function for changing category
    const handleCategoryChange = (newCategory: Category) => {
        setCategorySelected(newCategory);
        setSelectedComplaints([]); // Deselect all complaints when category changes
        setCurrentPage(1); // Go back to first page
    };
    


    //Actual component
    return (
        (fetchAllComplaintsIsLoading || fetchAllCategoriesIsLoading || fetchComplaintsCountIsLoading)
        ? <ComplaintsTableSkeleton />
        : fetchAllCategoriesError || fetchAllComplaintsError || fetchComplaintsCountError
        ? <p className='text-base'>{ ERROR_MESSAGE_API }</p>
        : <div className='flex flex-col space-y-8'>

            {/* Search and filter */}
            <div className='flex flex-col space-y-4'> 
                {/* Search bar for search by title and description */}
                <SearchBar currentSearchQuery={ searchQuery }
                    setSelectedComplaints={ setSelectedComplaints }
                    currentPage={ currentPage }
                    setCurrentPage={ setCurrentPage }
                    setSearchQuery={ setSearchQuery }
                />
                
                {/* Filter, deselect and delete */}
                <div className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:items-center'>
                    {/* Filter */}
                    <CategoryFilter allCategories={ allCategories ? allCategories : [] }
                        categorySelected={ categorySelected }
                        handleCategoryChange={ handleCategoryChange }
                    />

                    {/* Deselect and delete */}
                    <div className='flex space-x-2'>
                        {
                            selectedComplaints.length !== 0 
                            ? <Button className='w-fit rounded-full self-end bg-yap-orange-900 hover:bg-yap-orange-800 duration-200'
                                onClick={ () => setSelectedComplaints([]) }>Deselect</Button>
                            : <></>
                        }
                        {
                            selectedComplaints.length !== 0 
                            ? <DeleteComplaintsButton complaintsToDelete={ selectedComplaints } setSelectedComplaints= { setSelectedComplaints }/>
                            : <></>
                        }
                    </div>
                </div> 
            </div>


            {/* Complaints Table */}
            <ComplaintsTable complaints={ allComplaints ? allComplaints : [] } selectedComplaints= { selectedComplaints } setSelectedComplaints={ setSelectedComplaints } allCategories={ allCategories ? allCategories : [] }
                dateSort={ dateSort } setDateSort={ setDateSort } sentimentSort={ sentimentSort } setSentimentSort={ setSentimentSort }
            />
            

            {/* Pagination Controls */}
            <div className='flex flex-col space-y-4'>
                
                {/* Previous and next buttons */}
                <div className='flex flex-row space-x-8 self-center'>
                    <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1} className='table-page-button'>
                        Previous
                    </button>
                    <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={ currentPage >= Math.ceil(complaintsCount / PAGE_SIZE) } className='table-page-button'>
                        Next
                    </button>
                </div>

                <div className='flex flex-row justify-between w-full'>
                    {/* Page number */}
                    <h6 className=' text-yap-brown-900 py-1'>Page { currentPage } of { Math.ceil(complaintsCount / PAGE_SIZE) == 0 ? 1 : Math.ceil(complaintsCount / PAGE_SIZE)  }</h6>
                    <h6 className=' text-yap-brown-900 py-1 self-end'>Total results: { complaintsCount }</h6>
                </div>
            </div>  
    </div>
  )
}
