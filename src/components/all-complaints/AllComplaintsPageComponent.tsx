"use client"

import { useEffect, useState, useRef } from "react"
import ComplaintsTable from "./ComplaintsTable"
import { Complaint } from "@/types/Complaint"
import { defaultCategories, defaultSources, getComplaintsOne, getComplaintsTwo } from "@/services/ServicesHelper"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import DeleteComplaintsButton from "./DeleteComplaintsButton"
import ComplaintsTableSkeleton from "./ComplaintsTableSkeleton"
import { Category } from "@/types/Category"
import CategoryFilterDropdown from "./CategoryFilterDropdown"
import SourceFilterDropdown from "./SourceFilterDropdown"
import { API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_GET_ALL_ENDPOINT, COMPLAINTS_SEARCH_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertCategoryDocumentsToObjects, convertComplaintDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"
import { ERROR_MESSAGE_API } from "@/constants/ConstantValues"
import SearchBar from "./SearchBar"

//Endpoints
const SEARCH_COMPLAINTS_API_ENDPOINT = API_BASE_URL_ADMIN_MANAGEMENT + '/' + COMPLAINTS_SEARCH_ENDPOINT
const FETCH_ALL_CATEGORIES_API_ENDPOINT = API_BASE_URL_ADMIN_MANAGEMENT + '/' + CATEGORIES_GET_ALL_ENDPOINT


//Constants
const PAGE_SIZE = 50


/**
This component represents the component to display all complaints. Includes table, search and filter functionality.
*/
const AllComplaintsPageComponent = () => {
    //States
    const [complaints, setComplaints] = useState<Complaint[]>([])
    const [selectedComplaints, setSelectedComplaints] = useState<Complaint[]>([])
    const [allCategories, setAllCategories] = useState<Category[]>([])
    const [categorySelected, setCategorySelected] = useState<Category>()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState<number>()
    const [totalResults, setTotalResults] = useState<number>()
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const isFirstRender = useRef(true);


    //Initialisation
    const initialisation = async () => {
        //Fetch all complaints without any filter
        const allComplaintsData = await axios.post(SEARCH_COMPLAINTS_API_ENDPOINT, 
            {
                "filter": {},
                "page_size": PAGE_SIZE,
                "page_number": 1 //Always fetch from first page for initialisation
            }
        )
        const allComplaints = convertComplaintDocumentsToObjects(allComplaintsData.data.documents)
        setComplaints(allComplaints)

        //Set pagination information
        const totalNumberOfComplaints = allComplaintsData.data.total_count
        setTotalResults(totalNumberOfComplaints)
        const totalNumberOfPages = Math.ceil(totalNumberOfComplaints / PAGE_SIZE)
        setTotalPages(totalNumberOfPages)

        //Fetch all categories available
        const allCategoriesData = await axios.post(FETCH_ALL_CATEGORIES_API_ENDPOINT)
        const allCategories = convertCategoryDocumentsToObjects(allCategoriesData.data.documents)
        setAllCategories(allCategories)
    }


    //Initialise when the component first gets mounted
    useEffect(() => {
        const init = async () => {
            try {
                await initialisation()
            } catch (error) {
                setIsThereError(true)
            } finally {
                setHasRanApi(true)
            }
        };
        init();
    }, []);


    //Fetch complaints based on current states
    const fetchComplaints = async () => {
        setHasRanApi(false)
        try {
            //Construct the filter based on the current state
            const filter: any = {};
            if (searchQuery.trim() !== "") {
                filter["$text"] = { "$search": searchQuery };
            }
            if (categorySelected) {
                filter["category"] = categorySelected;
            }

            // Make the API request with the dynamically built filter
            const filteredComplaintsData = await axios.post(SEARCH_COMPLAINTS_API_ENDPOINT, {
                filter,
                page_size: PAGE_SIZE,
                page_number: currentPage,
            });

            console.log(filteredComplaintsData)

            const filteredComplaints = convertComplaintDocumentsToObjects(filteredComplaintsData.data.documents)
            setComplaints(filteredComplaints)

            //Set pagination information
            const totalNumberOfComplaints = filteredComplaintsData.data.total_count
            setTotalResults(totalNumberOfComplaints)
            const totalNumberOfPages = Math.ceil(totalNumberOfComplaints / PAGE_SIZE)
            setTotalPages(totalNumberOfPages)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true)
        }
    }

    

    //Fetch complaints whenever page changes, except the first mount
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Mark the component as mounted
            return; // Skip the first execution
        }
        fetchComplaints();
    }, [currentPage, searchQuery]);


    // Fetch complaints with pagination, search, and category filter
    // const fetchComplaints = async () => {
    //     //Indicate that we are fetching new complaints
    //     setHasRanApi(true)
    //     console.log("Fetching complaints...", categorySelected)
    //     console.log(searchQuery)


    //     try {
    //         //   const response = await fetch(
    //         //     `/api/complaints?page=${page}&search=${search}&category=${category}`
    //         //   )
    //         //   const data = await response.json()
    //         let data : any = []
    //         if (currentPage == 1) {
    //             data = await getComplaintsOne()
    //         } else if (currentPage == 2) {
    //             data = await getComplaintsTwo()
    //         }
    //         setComplaints(data)

    //         //TODO: Set total number of pages and number of results
    //         setTotalPages(2)
    //         setTotalResults(10)
    //     } catch (error) {
    //         console.error("Error fetching complaints:", error)
    //     } finally {
    //         setHasRanApi(false)
    //     }
    // }



    //Resets all states
    // const resetStates = async () => {
    //     //Reset all the states
    //     console.log('Reseting states...')
    //     await initialisation()
    //     setSearchQuery("")
    //     setSelectedComplaints([])
    //     setCurrentPage(1)
    // }


    //Actual component
    return (
        (!hasRanApi)
        ? <ComplaintsTableSkeleton />
        : isThereError
        ? <p className='text-base bg-yap-black-800'>{ ERROR_MESSAGE_API }</p>
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
                {/* <div className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:items-center'> */}
                    {/* Filter */}
                    {/* <div className='flex flex-row items-center space-x-4'>
                        <h6 className='text-yap-gray-900'>Filter by</h6> */}
                        {/* Filter by categories dropdown */}
                        {/* {
                            hasRanApi
                            ? <Skeleton className='w-[60px] h-[20px]' />
                            : <CategoryFilterDropdown categoryOptions={ allCategories } selectedCategories={ categorySelected } stateChangeFunction={ setCategorySelected }
                                setSelectedComplaints={ setSelectedComplaints } setCurrentPage={ setCurrentPage }
                                currentPage={ currentPage} fetchComplaints={ fetchComplaints } />
                        } */}
                        {/* Filter by sources dropdown */}
                        {/* {
                            hasRanApi
                            ? <Skeleton className='w-[60px] h-[20px]' />
                            : <SourceFilterDropdown sourceOptions={ allSources} selectedSources={ sourcesSelected } stateChangeFunction={ setSourcesSelected }
                            setSelectedComplaints={ setSelectedComplaints } setCurrentPage={ setCurrentPage }
                            currentPage={ currentPage} fetchComplaints={ fetchComplaints } />
                        } */}
                    {/* </div> */}

                    {/* Deselect and delete */}
                    {/* <div className='flex space-x-2'>
                        {
                            hasRanApi
                            ? <Skeleton className='w-[60px] h-[25px]' />
                            : selectedComplaints.length !== 0 
                            ? <Button className='w-fit rounded-full self-end bg-yap-orange-900 hover:bg-yap-orange-800 duration-200'
                                onClick={ () => setSelectedComplaints([]) }>Deselect</Button>
                            : <></>
                        }
                        {
                            hasRanApi
                            ? <Skeleton className='w-[60px] h-[25px]' />
                            : selectedComplaints.length !== 0 
                            ? <DeleteComplaintsButton complaintsToDelete={ selectedComplaints } resetStates={ resetStates } />
                            : <></>
                        }
                    </div> */}
                {/* </div> */}


                
               
            </div>


            
            {/* Complaints Table */}
            <ComplaintsTable complaints={ complaints } selectedComplaints= { selectedComplaints } setSelectedComplaints={ setSelectedComplaints } allCategories={ allCategories } />
            

            {/* Pagination Controls */}
            <div className='flex flex-col space-y-4'>
                
                {/* Previous and next buttons */}
                <div className='flex flex-row space-x-8 self-center'>
                    <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1} className='cursor-pointer disabled:cursor-not-allowed text-yap-brown-900 bg-yap-gray-100 hover:bg-yap-brown-100 rounded-full px-6 py-1 duration-200'>
                        Previous
                    </button>
                    <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === totalPages } className='cursor-pointer disabled:cursor-not-allowed text-yap-brown-900 bg-yap-gray-100 hover:bg-yap-brown-100 rounded-full px-6 py-1 duration-200'>
                        Next
                    </button>
                </div>

                <div className='flex flex-row justify-between w-full'>
                    {/* Page number */}
                    <h6 className=' text-yap-brown-900 py-1'>Page { currentPage } of { totalPages }</h6>
                    <h6 className=' text-yap-brown-900 py-1 self-end'>Total results: { totalResults }</h6>
                </div>
            </div>  
    </div>
  )
}

export default AllComplaintsPageComponent
