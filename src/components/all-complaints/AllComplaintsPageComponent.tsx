"use client"

import { useEffect, useState } from "react"
import { ComplaintsTable } from "./ComplaintsTable"
import { ComplaintInterface } from "@/types/Complaint"
import { getComplaintsOne, getComplaintsTwo } from "@/services/ServicesHelper"
import { Input } from "../ui/input"
import MultiSelectDropdown from "./MultiSelectDropdown"
import { Skeleton } from "../ui/skeleton"

const AllComplaintsPageComponent = () => {
    //State for complaints that are currently displayed
    const [complaints, setComplaints] = useState<ComplaintInterface[]>([])

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


    //State to track whether data is still in the midst of being fetched
    const [loading, setLoading] = useState(true)





    //API calls for only when the component mounts
    useEffect(() => {
        setLoading(true)
        //TODO: Make API call to fetch list of categories and sources
        setAllCategories(["Education", "Environment", "Health"])
        setAllSources(["Reddit"])
        setCategoriesSelected(allCategories)
        setSourcesSelected(allSources)
        setLoading(false)
    }, [])






    // Fetch complaints with pagination, search, and category filter
    const fetchComplaints = async (page: number, search: string, categories: string[], sourcesSelected: string[]) => {
        console.log("hello")
        setLoading(true)

        //Set categories that are selected
        setCategoriesSelected(categories)

        //Set sources that are selected
        setSourcesSelected(sourcesSelected)


        try {
        //   const response = await fetch(
        //     `/api/complaints?page=${page}&search=${search}&category=${category}`
        //   )
        //   const data = await response.json()
        let data : any = []
        if (page == 1) {
            data = await getComplaintsOne()
        } else if (page == 2) {
            data = await getComplaintsTwo()

        }
        setComplaints(data)
        } catch (error) {
        console.error("Error fetching complaints:", error)
        } finally {
            setLoading(false)
        }
    }

    //Effect to refetch complaints when the page, search, or category filter changes
    useEffect(() => {
        fetchComplaints(currentPage, searchQuery, categoriesSelected, sourcesSelected)
    }, [currentPage, searchQuery, categoriesSelected, sourcesSelected])






    return (
        <div className='flex flex-col space-y-8'>


            {/* Search and filter */}
            <div className='flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0'> 
                {/* Search bar for search by title */}
                <Input type="text" value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value) }
                    placeholder="Search by title"
                    className='!text-base border border-yap-gray-200 rounded-full text-yap-black-800 focus:border-yap-brown-900 focus:border-2 focus-visible:ring-0 max-w-md xl:max-w-xl'
                />

                <div className='flex flex-row items-center space-x-4'>
                    {/* Filter by categories dropdown */}
                    {
                        loading
                        ? <Skeleton className='w-[60px] h-[20px]' />
                        : <MultiSelectDropdown options={ allCategories }  stateChangeFunction={ setCategoriesSelected } label="Category" />
                    }
                    {/* Filter by sources dropdown */}
                    {
                        loading
                        ? <Skeleton className='w-[60px] h-[20px]' />
                        : <MultiSelectDropdown options={ allSources }  stateChangeFunction={ setSourcesSelected } label="Source" />
                    }
                  
                </div>


                
               
            </div>


            
            {/* Table */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ComplaintsTable complaints={complaints} currentPage={currentPage} />
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
