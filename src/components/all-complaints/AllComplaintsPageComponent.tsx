"use client"

import { useEffect, useState, useRef } from "react"
import ComplaintsTable from "./ComplaintsTable"
import { Complaint } from "@/types/Complaint"
import { defaultCategories, defaultSources, getComplaintsOne, getComplaintsTwo } from "@/services/ServicesHelper"
import { Input } from "../ui/input"
import MultiSelectDropdown from "./MultiSelectDropdown"
import { Skeleton } from "../ui/skeleton"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import DeleteComplaintsButton from "./DeleteComplaintsButton"
import ComplaintsTableSkeleton from "./ComplaintsTableSkeleton"
import { Category } from "@/types/Category"
import { Source } from "@/types/Source"
import CategoryFilterDropdown from "./CategoryFilterDropdown"
import SourceFilterDropdown from "./SourceFilterDropdown"

const AllComplaintsPageComponent = () => {
    //States
    const [complaints, setComplaints] = useState<Complaint[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [categoriesSelected, setCategoriesSelected] = useState<Category[]>([])
    const [allCategories, setAllCategories] = useState<Category[]>([])
    const [sourcesSelected, setSourcesSelected] = useState<Source[]>([])
    const [allSources, setAllSources] = useState<Source[]>([])
    const [selectedComplaints, setSelectedComplaints] = useState<Complaint[]>([])
    const [loading, setLoading] = useState(true)
    const isFirstRender = useRef(true);
    const [totalPages, setTotalPages] = useState<number>()
    const [totalResults, setTotalResults] = useState<number>()


    //Initialises list of categories and sources to be displayed in the dropdown
    const initialisation = async () => {
        //TODO: Make API call to fetch list of categories and sources
        const categoriesFromApi : Category[] = defaultCategories
        const sourcesFromApi: Source[] = defaultSources

        //Set states
        setAllCategories([...categoriesFromApi])
        setAllSources([...sourcesFromApi])
        setCategoriesSelected([...categoriesFromApi])
        setSourcesSelected([...sourcesFromApi])
    }



    //Initialise when the component first gets mounted
    useEffect(() => {
        const init = async () => {
            setLoading(true)

            //Set up states
            await initialisation();
            

            //Fetch all data
            try {
                //   const response = await fetch(
                //     `/api/complaints?page=${page}&search=${search}&category=${category}`
                //   )
                //   const data = await response.json()
                let data : any = []
                if (currentPage == 1) {
                    data = await getComplaintsOne()
                } else if (currentPage == 2) {
                    data = await getComplaintsTwo()
                }
                setComplaints(data)

                //TODO: Set total number of pages and number of results
                setTotalPages(2)
                setTotalResults(10)
            } catch (error) {
                console.error("Error fetching complaints:", error)
            } finally {
                setLoading(false)
            }
        };
        init();
    }, []);

    

    //Fetch complaints whenever page changes
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Mark the component as mounted
            return; // Skip the first execution
        }
        fetchComplaints();
    }, [currentPage]);


    // Fetch complaints with pagination, search, and category filter
    const fetchComplaints = async () => {
        //Indicate that we are fetching new complaints
        setLoading(true)
        console.log("Fetching complaints...", categoriesSelected)


        try {
            //   const response = await fetch(
            //     `/api/complaints?page=${page}&search=${search}&category=${category}`
            //   )
            //   const data = await response.json()
            let data : any = []
            if (currentPage == 1) {
                data = await getComplaintsOne()
            } else if (currentPage == 2) {
                data = await getComplaintsTwo()
            }
            setComplaints(data)

            //TODO: Set total number of pages and number of results
            setTotalPages(2)
            setTotalResults(10)
        } catch (error) {
            console.error("Error fetching complaints:", error)
        } finally {
            setLoading(false)
        }
    }


    //Function that runs when user searches a given search term
    const handleSearch = () => {
        //Should deselect all complaints
        setSelectedComplaints([])
        //Should always reset to first page when searching a new keyword
        if (currentPage == 1) {
            //Will not cause state to retrigger. Explicitly retrigger it
            fetchComplaints()
        } else {
            //Reset page to 1, automatically trigger fetching of complaints
            setCurrentPage(1)
        }
    }


    //Resets all states
    const resetStates = async () => {
        //Reset all the states
        console.log('Reseting states...')
        await initialisation()
        setSearchQuery("")
        setSelectedComplaints([])
        setCurrentPage(1)
    }


    //Actual component
    return (
        <div className='flex flex-col space-y-8'>


            {/* Search and filter */}
            <div className='flex flex-col space-y-4'> 
                {/* Search bar for search by title */}
                <div className="relative w-full max-w-md md:max-w-xl">
                    {/* Input Field */}
                    <Input
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSearch();
                            }
                          }}
                        placeholder="Search by title"
                        className="!text-base border border-yap-gray-200 rounded-full text-yap-black-800 focus:border-yap-brown-900 focus:border-2 focus-visible:ring-0 w-full pr-12 h-12"
                    />

                    {/* Magnifying Glass Icon */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yap-brown-900 rounded-full p-2 cursor-pointer hover:bg-yap-brown-800 duration-200">
                        <Search className="text-white w-4 h-4" onClick={ handleSearch } />
                    </div>
                </div>
                


                {/* Filter, deselect and delete */}
                <div className='flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:items-center'>
                    {/* Filter */}
                    <div className='flex flex-row items-center space-x-4'>
                        <h6 className='text-yap-gray-900'>Filter by</h6>
                        {/* Filter by categories dropdown */}
                        {
                            loading
                            ? <Skeleton className='w-[60px] h-[20px]' />
                            : <CategoryFilterDropdown categoryOptions={ allCategories } selectedCategories={ categoriesSelected } stateChangeFunction={ setCategoriesSelected }
                                setSelectedComplaints={ setSelectedComplaints } setCurrentPage={ setCurrentPage }
                                currentPage={ currentPage} fetchComplaints={ fetchComplaints } />
                        }
                        {/* Filter by sources dropdown */}
                        {
                            loading
                            ? <Skeleton className='w-[60px] h-[20px]' />
                            : <SourceFilterDropdown sourceOptions={ allSources} selectedSources={ sourcesSelected } stateChangeFunction={ setSourcesSelected }
                            setSelectedComplaints={ setSelectedComplaints } setCurrentPage={ setCurrentPage }
                            currentPage={ currentPage} fetchComplaints={ fetchComplaints } />
                        }
                    </div>

                    {/* Deselect and delete */}
                    <div className='flex space-x-2'>
                        {
                            loading
                            ? <Skeleton className='w-[60px] h-[25px]' />
                            : selectedComplaints.length !== 0 
                            ? <Button className='w-fit rounded-full self-end bg-yap-orange-900 hover:bg-yap-orange-800 duration-200'
                                onClick={ () => setSelectedComplaints([]) }>Deselect</Button>
                            : <></>
                        }
                        {
                            loading
                            ? <Skeleton className='w-[60px] h-[25px]' />
                            : selectedComplaints.length !== 0 
                            ? <DeleteComplaintsButton complaintsToDelete={ selectedComplaints } resetStates={ resetStates } />
                            : <></>
                        }
                    </div>
                    



                </div>


                
               
            </div>


            
            {/* Complaints Table */}
            { 
                loading
                ? <ComplaintsTableSkeleton />
                : <ComplaintsTable complaints={ complaints } selectedComplaints= { selectedComplaints } setSelectedComplaints={ setSelectedComplaints } allCategories={ allCategories } />
            }



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
                    {
                        loading
                        ? <Skeleton className='w-[70px] h-[20px]' />
                        : <h6 className=' text-yap-brown-900 py-1'>Page { currentPage } of { totalPages }</h6>
                    }
                    {
                        loading
                        ? <Skeleton className='w-[70px] h-[20px]' />
                        : <h6 className=' text-yap-brown-900 py-1 self-end'>Total results: { totalResults }</h6>
                    }
                </div>

               

            </div>
            
           
    </div>
  )
}

export default AllComplaintsPageComponent
