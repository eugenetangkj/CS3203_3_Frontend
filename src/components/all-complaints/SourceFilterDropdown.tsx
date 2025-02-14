"use client";

import { checkIfArraysAreEqual, doesSourceExistInList } from "@/utils/HelperFunctions";
import { useState, useRef, useEffect } from "react";
import { Complaint } from "@/types/Complaint";
import { Source } from "@/types/Source";
import { areSourceListsEqual } from "@/utils/HelperFunctions";

/**
This component represents a multiselect filter dropdown for source
*/
interface SourceFilterDropdown {
    sourceOptions: Source[],
    selectedSources: Source[]
    stateChangeFunction: (selectedValues: Source[]) => void,
    setSelectedComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    fetchComplaints: () => void
}


export default function SourceFilterDropdown({ 
    sourceOptions,
    selectedSources,
    stateChangeFunction,
    setSelectedComplaints,
    currentPage,
    setCurrentPage,
    fetchComplaints} : SourceFilterDropdown) {

        //States
        const [isOpen, setIsOpen] = useState(false);
        const [selectedSourcesLocal, setSelectedSourcesLocal] = useState<Source[]>(selectedSources);
        const [previousSelectedSources, setPreviousSelectedSources] = useState<Source[]>(selectedSources);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const allOptions = sourceOptions


        // Toggle dropdown
        const toggleDropdown = () => setIsOpen(!isOpen);

        // Handle checkbox selection
        const handleCheckboxChange = (option: Source) => {
            // Function that adds the option if it is missing, else removes it
            const filterSources = (prev: Source[]) => {

                return prev.some((s) => s.id === option.id)
                    ? prev.filter((s) => s.id !== option.id) // Remove if already selected
                    : [...prev, option]; // Add if not selected
            };


            // Get the new selected options
            const newSelectedOptions = filterSources(selectedSources);
        
            // Update local state
            setSelectedSourcesLocal(newSelectedOptions);
        
            //Update global state
            stateChangeFunction(newSelectedOptions);
        };


    return (
        <div className="relative w-fit" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
            onClick={ () => {
                toggleDropdown()
                if (isOpen) {
                    if (areSourceListsEqual(previousSelectedSources, selectedSourcesLocal)) {
                        //No changes compared to previous selection
                    } else {
                        //Got changes compared to previous selection
                        setSelectedComplaints([])
                        if (currentPage == 1) {
                            fetchComplaints()
                        } else {
                            setCurrentPage(1)
                        }
                    }
                }
            }}
            className="w-full flex justify-between items-center bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full px-4 py-0.5 text-white shadow-sm"
        >
            Source
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 ml-2"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
            <div className="absolute left-0 mt-2 w-36 border border-gray-300 bg-white rounded-md shadow-lg z-10 multiselectdropdown">
            <ul className="py-1">
                {allOptions.map((currentOption) => (
                <li key={currentOption.id} className="px-4 py-2 text-sm text-yap-gray-900 hover:bg-gray-100 flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    id={ currentOption.id }
                    checked={doesSourceExistInList(selectedSourcesLocal, currentOption)}
                    onChange={() => handleCheckboxChange(currentOption)}
                    className="mr-2 rounded-md ring-1 ring-yap-brown-900 checked:ring-yap-brown-900 checked:bg-yap-brown-900 cursor-pointer"
                    />
                    <label htmlFor={currentOption.name}>{currentOption.name}</label>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
}
