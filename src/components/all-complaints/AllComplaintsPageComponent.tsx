"use client"

import { useEffect, useState, useRef } from "react"
import ComplaintsTable from "./ComplaintsTable"
import { Complaint } from "@/types/Complaint"
import { Button } from "../ui/button"
import DeleteComplaintsButton from "./actions/DeleteComplaintsButton"
import ComplaintsTableSkeleton from "./ComplaintsTableSkeleton"
import { Category } from "@/types/Category"
import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_GET_COUNT_ENDPOINT, COMPLAINTS_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertComplaintDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"
import { ALL_CATEGORIES_CATEGORY, ERROR_MESSAGE_API, ALL_CATEGORIES_ID } from  "@/constants/Constants"
import SearchBar from "./actions/SearchBar"
import CategoryFilter from "./actions/CategoryFilter"
import useSWR, { mutate } from "swr"
import { CATEGORIES_GET_ALL_SWR_HOOK, COMPLAINTS_GET_MANY_SWR_HOOK } from "@/constants/SwrHooks"
import { categoriesGetAll } from "@/controllers/CategoriesController"
import { complaintsGetMany } from "@/controllers/ComplaintsControllerClient"

//Endpoints
const GET_MANY_COMPLAINTS_API_ENDPOINT = API_BASE_URL_ADMIN_MANAGEMENT  + COMPLAINTS_GET_MANY_ENDPOINT
const COMPLAINTS_GET_COUNT_API_ENDPOINT = API_BASE_URL_ADMIN_MANAGEMENT  + COMPLAINTS_GET_COUNT_ENDPOINT

//Constants
const PAGE_SIZE = 50

/**
This component represents the component to display all complaints. Includes table, search and filter functionality.
*/
export const AllComplaintsPageComponent = () => {
    //States
    // const [complaints, setComplaints] = useState<Complaint[]>([])
    const [selectedComplaints, setSelectedComplaints] = useState<Complaint[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalResults, setTotalResults] = useState<number>()

    //States for fetching of complaints
    const [categorySelected, setCategorySelected] = useState<Category>(ALL_CATEGORIES_CATEGORY)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [dateSort, setDateSort] = useState<number>(-1)
    const [sentimentSort, setSentimentSort] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState(1)

    //Other states
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const isFirstRender = useRef(true);


    //Fetch all categories
    const { data: allCategories, error: fetchAllCategoriesError, isLoading: fetchAllCategoriesIsLoading } = useSWR<Category[]>(
        CATEGORIES_GET_ALL_SWR_HOOK,
        categoriesGetAll,
        { revalidateOnFocus: false }
    )

    const { data: allComplaints, error: fetchAllComplaintsError, isLoading: fetchAllComplaintsIsLoading } = useSWR(
        [COMPLAINTS_GET_MANY_SWR_HOOK, categorySelected, searchQuery, dateSort, sentimentSort, currentPage],
        () => complaintsGetMany(
            {
                "$search": searchQuery,
                "category": categorySelected.name
            },
            PAGE_SIZE, currentPage,
            { "date": dateSort, "sentiment": sentimentSort }
        ),
        { revalidateOnFocus: false }
    );
    
    // Mutate function for changing category
    const handleCategoryChange = (newCategory: Category) => {
        setCategorySelected(newCategory);
        setSelectedComplaints([]); // Deselect all complaints when category changes
        setCurrentPage(1); // Go back to first page
    
        // Call mutate with updated arguments
        mutate([
            COMPLAINTS_GET_MANY_SWR_HOOK, 
            { "$search": searchQuery, "category": newCategory.name }, 
            PAGE_SIZE, 
            1, 
            { "date": dateSort, "sentiment": sentimentSort }
        ]);
    };
    

   





    // //Initialisation
    // const initialisation = async () => {
    //     //Fetch all complaints without any filter
    //     const allComplaintsData = await axios.post(GET_MANY_COMPLAINTS_API_ENDPOINT, 
    //         {
    //             "filter": {},
    //             "page_size": PAGE_SIZE,
    //             "page_number": 1, //Always fetch from first page for initialisation
    //             "sort": {
    //                 "date": dateSort,
    //                 "sentiment": sentimentSort
    //             }
    //         }
    //     )
    //     const allComplaintsCountData = await axios.post(COMPLAINTS_GET_COUNT_API_ENDPOINT,
    //         {
    //             "filter": {},
    //         }
    //     )
    //     const allComplaints = convertComplaintDocumentsToObjects(allComplaintsData.data.documents)
    //     setComplaints(allComplaints)

    //     //Set pagination information
    //     const totalNumberOfComplaints = allComplaintsCountData.data.count
    //     setTotalResults(totalNumberOfComplaints)
    //     const totalNumberOfPages = Math.ceil(totalNumberOfComplaints / PAGE_SIZE)
    //     setTotalPages(totalNumberOfPages)
    // }



    //Fetch complaints based on current states
    const fetchComplaints = async () => {
        // setHasRanApi(false)
        try {
            //Construct the filter based on the current state
            // const filter: any = {};
            // if (searchQuery.trim() !== "") {
            //     filter["$text"] = { "$search": searchQuery };
            // }
            // if (categorySelected.id !== ALL_CATEGORIES_ID ) {
            //     filter["category"] = categorySelected.name;
            // }

            // // Make the API request with the dynamically built filter
            // const filteredComplaintsData = await axios.post(GET_MANY_COMPLAINTS_API_ENDPOINT, {
            //     filter,
            //     page_size: PAGE_SIZE,
            //     page_number: currentPage,
            //     sort: {
            //         ...(dateSort !== 0 && { date: dateSort }),
            //         ...(sentimentSort !== 0 && { sentiment: sentimentSort })
            //     }
            // });
            // const filteredComplaintsCountData = await axios.post(COMPLAINTS_GET_COUNT_API_ENDPOINT,
            //     {
            //         "filter": filter
            //     }
            // )
            // const filteredComplaints = convertComplaintDocumentsToObjects(filteredComplaintsData.data.documents)
            // // setComplaints(filteredComplaints)

            // //Set pagination information
            // const totalNumberOfComplaints = filteredComplaintsCountData.data.count
            // setTotalResults(totalNumberOfComplaints)
            // const totalNumberOfPages = Math.ceil(totalNumberOfComplaints / PAGE_SIZE)
            // setTotalPages(totalNumberOfPages)
        } catch (error) {
            // setIsThereError(true)
        } finally {
            // setHasRanApi(true)
        }
    }


    //Fetch complaints whenever page changes, except the first mount
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Mark the component as mounted
            return; // Skip the first execution
        }
        fetchComplaints();
    }, [currentPage, searchQuery, categorySelected, dateSort, sentimentSort]);


    //Actual component
    return (
        (fetchAllComplaintsIsLoading || fetchAllCategoriesIsLoading)
        ? <ComplaintsTableSkeleton />
        : isThereError
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
                            ? <DeleteComplaintsButton complaintsToDelete={ selectedComplaints }
                                setSelectedComplaints={ setSelectedComplaints}
                                currentPage={ currentPage }
                                setCurrentPage={ setCurrentPage } 
                                fetchComplaints={ fetchComplaints }
                              />
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
                    <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={ currentPage >= totalPages } className='table-page-button'>
                        Next
                    </button>
                </div>

                <div className='flex flex-row justify-between w-full'>
                    {/* Page number */}
                    <h6 className=' text-yap-brown-900 py-1'>Page { currentPage } of { totalPages == 0 ? 1 : totalPages  }</h6>
                    <h6 className=' text-yap-brown-900 py-1 self-end'>Total results: { totalResults }</h6>
                </div>
            </div>  
    </div>
  )
}
