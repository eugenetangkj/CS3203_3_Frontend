"use client"

import { useEffect, useState } from "react"
import ComplaintsTable from "./ComplaintsTable"
import { Complaint } from "@/types/Complaint"
import { getComplaintsOne, getComplaintsTwo } from "@/services/ServicesHelper"
import { Input } from "../ui/input"
import MultiSelectDropdown from "./MultiSelectDropdown"
import { Skeleton } from "../ui/skeleton"
import { Search } from "lucide-react"
import { Button } from "../ui/button"

const AllComplaintsPageComponent = () => {
    //State for complaints that are currently displayed
    const [complaints, setComplaints] = useState<Complaint[]>([])

    //State for pagination
    const [currentPage, setCurrentPage] = useState(1)

    //State for search query
    const [searchQuery, setSearchQuery] = useState("")

    //State for categories being filtered
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([])
    const [allCategories, setAllCategories] = useState<string[]>([])


    //State for sources being filtered
    const [sourcesSelected, setSourcesSelected] = useState<string[]>([])
    const [allSources, setAllSources] = useState<string[]>([])


    //State for selected complaints
    const [selectedComplaints, setSelectedComplaints] = useState<number[]>([])



    //State to track whether data is still in the midst of being fetched
    const [loading, setLoading] = useState(true)







    //API calls for only when the component mounts
    useEffect(() => {
        setLoading(true)
        //TODO: Make API call to fetch list of categories and sources
        const categoriesFromApi = ["Education", "Environment", "Health"]
        const sourcesFromApi = ["Reddit"]

        setAllCategories(categoriesFromApi)
        setAllSources(["Reddit"])
        setCategoriesSelected(categoriesFromApi)
        setSourcesSelected(sourcesFromApi)
        setLoading(false)
    }, [])





    // Fetch complaints with pagination, search, and category filter
    const fetchComplaints = async () => {
        //Indicate that we are fetching new complaints
        setLoading(true)
        console.log(categoriesSelected)


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

   







    //First fetch
    useEffect(() => {
        fetchComplaints()
    }, [currentPage] )








    return (
        <div className='flex flex-col space-y-8'>


            {/* Search and filter */}
            <div className='flex flex-col space-y-4'> 
                {/* Search bar for search by title */}
                <div className="relative w-full max-w-md xl:max-w-xl">
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
                            : <MultiSelectDropdown options={ allCategories } selectedOptions={ categoriesSelected } 
                            stateChangeFunction={ setCategoriesSelected } label="Category" fetchComplaints={ fetchComplaints }
                            setSelectedComplaints={ setSelectedComplaints } />
                        }
                        {/* Filter by sources dropdown */}
                        {
                            loading
                            ? <Skeleton className='w-[60px] h-[20px]' />
                            : <MultiSelectDropdown options={ allSources } selectedOptions={ sourcesSelected } 
                            stateChangeFunction={ setSourcesSelected } label="Source" fetchComplaints={ fetchComplaints }
                            setSelectedComplaints={ setSelectedComplaints } />
                        }
                    </div>

                    {/* Deselect and delete */}
                    <div className='flex space-x-2'>
                    {
                        loading
                        ? <Skeleton className='w-[60px] h-[25px]' />
                        : selectedComplaints.length !== 0 
                        ? <Button className='w-fit rounded-full self-end bg-yap-orange-900 hover:bg-yap-orange-800 duration-200' onClick={ () => setSelectedComplaints([]) }>Deselect</Button>
                        : <></>
                    }
                    {
                        loading
                        ? <Skeleton className='w-[60px] h-[25px]' />
                        : selectedComplaints.length !== 0 
                        ? <Button className='w-fit rounded-full self-end bg-red-500 hover:bg-red-400 duration-200'>Delete</Button>
                        : <></>
                    }


                    </div>
                    



                </div>


                
               
            </div>


            
            {/* Table */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ComplaintsTable complaints={ complaints } selectedComplaints= { selectedComplaints } setSelectedComplaints={ setSelectedComplaints } />
            )}



            {/* Pagination Controls */}
            <div className='flex flex-row justify-between items-center'>
                {/* Page number */}
                <h6 className=' text-yap-brown-900 py-1'>Page { currentPage } of 100</h6>

                {/* Previous and next buttons */}
                <div className='flex space-x-8'>
                    <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1} className='cursor-pointer disabled:cursor-not-allowed text-yap-brown-900 hover:bg-yap-gray-100 rounded-full px-6 py-1 duration-200'>
                        Previous
                    </button>
                    <button onClick={() => setCurrentPage((prev) => prev + 1)} className='cursor-pointer text-yap-brown-900 hover:bg-yap-gray-100 rounded-full px-6 py-1 duration-200'>
                        Next
                    </button>
                </div>

                {/* Total number of results */}
                <h6 className=' text-yap-brown-900 py-1'>Total results: 100</h6>

            </div>
            
           
    </div>
  )
}

export default AllComplaintsPageComponent
