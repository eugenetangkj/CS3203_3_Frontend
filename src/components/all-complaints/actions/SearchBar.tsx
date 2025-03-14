"use client"

import { useState } from "react"
import { Complaint } from "@/types/Complaint"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

/**
This component represents the search bar that allows users to search for a complaint by finding a word
in its title and description.
*/
interface SearchBarProps {
    currentSearchQuery: string,
    setSelectedComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
}


export default function SearchBar({ currentSearchQuery, setSelectedComplaints, currentPage, setCurrentPage, setSearchQuery }: SearchBarProps) {
    //States
    const [tempSearchQuery, setTempSearchQuery] = useState<string>(currentSearchQuery)


    //Function that runs when user searches a given search term
    const handleSearch = () => {
        //Should deselect all complaints
        setSelectedComplaints([])

        //Update search query
        setSearchQuery(tempSearchQuery)

        //Should always reset to first page when searching a new keyword
        if (currentPage != 1) {
            //Reset page to 1, automatically trigger fetching of complaints
            setCurrentPage(1)
        }
    }


    return (
        <div className="relative w-full max-w-md md:max-w-xl">
            {/* Input Field */}
            <Input
                value={ tempSearchQuery }
                type="text"
                onChange={(e) => setTempSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
                placeholder="Search by title and description"
                className="!text-base border border-yap-gray-200 rounded-full text-yap-black-800 focus:border-yap-brown-900 focus:border-2 focus-visible:ring-0 w-full pr-12 h-12"
            />

            {/* Magnifying Glass Icon */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yap-brown-900 rounded-full p-2 cursor-pointer hover:bg-yap-brown-800 duration-200">
                <Search className="text-white w-4 h-4" onClick={ handleSearch } />
            </div>
        </div>
            
  )
}
